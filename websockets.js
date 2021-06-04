const WebSocket = require('ws'),
      jwt = require('jsonwebtoken'),
      querystring = require('querystring'),
      { v4: uuid } = require('uuid'),
      wss = new WebSocket.Server({ noServer: true }),
      { Room, Player } = require('./schemas'),
      h = require('./helpers'),
      rooms = [],
      connectedUsers = {}, // { userId: websocket }
      passwords = {};      // { roomId: password }

wss.on('connection', function connection(ws, req) {
  // Connection Initialization
  const token = querystring.parse(req.url.substring(2)).token;
  const { username, id } = jwt.verify(token, process.env.JWT_SECRET);
  connectedUsers[id] = ws;

  ws.on('message', (payload) => {
    // Parsing request
    const { type, roomId, body } = JSON.parse(payload);
    const roomIndex = rooms.findIndex(room => room.id === roomId);
    
    switch(type) {
      case 'createRoom':
        const room = new Room(body.name, body.access, new Player(id, username, false));
        rooms.push(room);
        if(room.access === 'private') {
          passwords[room.id] = body.password;
        }
        ws.send(JSON.stringify({
          type: 'join',
          room: h.omit(room, 'players'),
          players: room['players']
        }));
        break;

      case 'joinRoom':
        // Stop if room doesn't exist or user entered wrong password
        if(roomIndex === -1 || (rooms[roomIndex].access === 'private' && 
            body.password !== passwords[rooms[roomIndex].id])) {
          return;
        }
        rooms[roomIndex]['players'].push(new Player(id, username, false));
        h.broadcast(rooms[roomIndex], connectedUsers, {
          type: 'join',
          room: h.omit(rooms[roomIndex], 'players'),
          players: rooms[roomIndex]['players']
        });
        break;

      case 'addBot':
        rooms[roomIndex]['players'].push(new Player(uuid(), body, true));
        h.broadcast(rooms[roomIndex], connectedUsers, {
          type: 'updatePlayers',
          players: rooms[roomIndex]['players']
        });
        break;

      case 'deleteBot':
        h.deleteObject(rooms[roomIndex]['players'], 'id', body);
        h.broadcast(rooms[roomIndex], connectedUsers, {
          type: 'updatePlayers',
          players: rooms[roomIndex]['players']
        });
        break;

      case 'startRound': {
        h.rotateCzar(rooms[roomIndex]);
        rooms[roomIndex]['winner'] = '';
        rooms[roomIndex]['phase'] = 'playing';
        rooms[roomIndex]['players'].forEach(player => {
          player.card = '';
        });
        h.broadcast(rooms[roomIndex], connectedUsers, {
          type: 'startRound',
          phase: rooms[roomIndex]['phase'],
          winner: rooms[roomIndex]['winner'],
          players: rooms[roomIndex]['players']
        })
        break;
      }

      case 'submitCard':
        rooms[roomIndex]['players'].find(user => user.id === id).card = body;
        h.broadcast(rooms[roomIndex], connectedUsers, {
          type: 'updatePlayers',
          players: rooms[roomIndex]['players']
        });
        if(rooms[roomIndex]['players'].every(player => player.card !== '' || player.isBot || player.czar)) {
          h.broadcast(rooms[roomIndex], connectedUsers, {
            type: 'updatePhase',
            phase: 'picking'
          });
        }
        break;

      case 'pickCard':
        const cardOwner = rooms[roomIndex]['players'].find(player => player.id === body);
        cardOwner['winner'] = true;
        cardOwner['score'] += 1
        
        h.broadcast(rooms[roomIndex], connectedUsers, {
          type: 'updatePlayers',
          players: rooms[roomIndex]['players']
        });
        h.broadcast(rooms[roomIndex], connectedUsers, {
          type: 'updatePhase',
          phase: `results`
        });
        break;

      case 'leaveRoom': {
        h.leaveRoom(rooms, roomIndex, connectedUsers, passwords, id);
        connectedUsers[id].send(JSON.stringify({
          type: 'leave',
          id: id
        }))
        break;
      }
    }
  })

  ws.on('close', () => {
    // Pull user from room
    for(let i = 0; i < rooms.length; i++) {
      if(rooms[i]['players'].some(player => player.id === id)) {
        h.leaveRoom(rooms, i, connectedUsers, passwords, id);
        break;
      }
    }
    delete connectedUsers[id]
  })
})

module.exports.wss = wss;
module.exports.rooms = rooms;
module.exports.connectedUsers = connectedUsers;