const WebSocket = require('ws'),
      jwt = require('jsonwebtoken'),
      querystring = require('querystring'),
      { v4: uuid } = require('uuid'),
      wss = new WebSocket.Server({ noServer: true }),
      h = require('./helpers'),
      { Room, Player, Bot } = require('./schemas'),
      { rooms, users, passwords } = require('./store');

wss.on('connection', function connection(ws, req) {
  // Connection Initialization
  const token = querystring.parse(req.url.substring(2)).token;
  const { username, id } = jwt.verify(token, process.env.JWT_SECRET);
  h.updateUsers(id, ws);
  
  ws.on('message', (payload) => {
    // Parsing request
    const { type, roomId, ...body } = JSON.parse(payload);
    const roomIndex = rooms.findIndex(room => room.id === roomId);
    const currentRoom = rooms.find(room => room.id === users.find(user => user.id === id).roomId);
    
    switch(type) {
      case 'createRoom':
        // Create and push room to rooms and passwords
        const room = new Room(body.name, body.access, new Player(id, username, false));
        rooms.push(room);
        if(room.access === 'private') {
          passwords[room.id] = body.password;
        }
        users.find(user => user.id === id).roomId = room.id;
        ws.send(JSON.stringify({
          type: 'join',
          room: h.omit(room, 'players'),
          players: room['players']
        }));
        h.updateWaitingRooms(room, true);
        break;

      case 'joinRoom':
        // Stop if room doesn't exist or user entered wrong password
        if(roomIndex === -1 || (rooms[roomIndex].access === 'private' && 
            body.password !== passwords[rooms[roomIndex].id])) {
          return;
        }
        rooms[roomIndex]['players'].push(new Player(id, username, false));
        users.find(user => user.id === id).roomId = rooms[roomIndex].id;
        h.broadcast(roomIndex, {
          type: 'join',
          room: h.omit(rooms[roomIndex], 'players'),
          players: rooms[roomIndex]['players']
        });
        break;

      case 'addBot':
        currentRoom['players'].push(new Bot(uuid(), body.name));
        h.broadcast(roomIndex, {
          type: 'updatePlayers',
          players: currentRoom['players']
        });
        break;

      case 'deleteBot':
        h.deleteObject(currentRoom['players'], 'id', body.botId);
        h.broadcast(roomIndex, {
          type: 'updatePlayers',
          players: currentRoom['players']
        });
        break;

      case 'startRound': {
        // Removes room from roomlist if this is the first round
        if(rooms[roomIndex]['phase'] === 'waiting') {
          h.updateWaitingRooms(rooms[roomIndex], false);
        }
        // Reset game state to the start of a round
        h.rotateCzar(roomIndex);
        rooms[roomIndex]['phase'] = 'playing';
        rooms[roomIndex]['prompt'] = h.generateCard();
        rooms[roomIndex]['players'].forEach(player => {
          player.card = '';
          player.isWinner = false;
          if(!player.isBot) {
            while(player.hand.length < 5) {
              player.hand.push(h.generateCard());
            }
          }
        });
        h.broadcast(roomIndex, {
          type: 'startRound',
          room: h.omit(rooms[roomIndex], 'players'),
          players: rooms[roomIndex]['players']
        })
        // Bots randomly play a card
        rooms[roomIndex]['players'].forEach(player => {
          if(player.isBot && !player.isCzar) {
            player.card = h.generateCard();
            h.broadcast(roomIndex, {
              type: 'updatePlayers',
              players: rooms[roomIndex]['players']
            });
            h.checkPlayingFinished(roomIndex);
          }
        })
        break;
      }

      case 'submitCard':
        // Move card from hand to played cards
        const foundPlayer = rooms[roomIndex]['players'].find(player => player.id === id);
        foundPlayer.card = body.card;
        foundPlayer.hand.splice(foundPlayer.hand.indexOf(body.card), 1);
        h.broadcast(roomIndex, {
          type: 'updatePlayers',
          players: rooms[roomIndex]['players']
        });
        h.checkPlayingFinished(roomIndex);
        break;

      case 'pickCard':
        // Make picked card's owner the winner of the round
        const winner = rooms[roomIndex]['players'].find(player => player.id === body.winnerId);
        winner.isWinner = true;
        winner.score += 1;
        
        h.broadcast(roomIndex, {
          type: 'updatePlayers',
          players: rooms[roomIndex]['players']
        });
        h.broadcast(roomIndex, {
          type: 'updatePhase',
          phase: `results`
        });
        break;

      case 'endGame':
        // Resets game state to start of game
        rooms[roomIndex]['phase'] = 'waiting';
        rooms[roomIndex]['players'].forEach(player => {
          player.score = 0;
        })
        h.updateWaitingRooms(rooms[roomIndex], true);
        h.broadcast(roomIndex, {
          type: 'updatePhase',
          phase: `waiting`
        });
        break;

      case 'leaveRoom': {
        h.leaveRoom(roomIndex, id);
        users.find(user => user.id === id).ws.send(JSON.stringify({
          type: 'leave',
          id: id
        }))
        break;
      }
    }
  })

  ws.on('close', () => {
    const user = users.find(user => user.id === id);
    // Remove user from store if they don't reconnect on another websocket
    if(user && user.ws.readyState === WebSocket.CLOSED) {
      user.disconnect = setTimeout(() => {
        console.log('Disconnected')
        roomIndex = rooms.findIndex(room => room.id === user.roomId);
        h.leaveRoom(roomIndex, id);
        h.deleteObject(users, 'id', id);
      }, 3000);
    }
  })
})

module.exports = wss;