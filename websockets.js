const WebSocket = require('ws'),
      jwt = require('jsonwebtoken'),
      querystring = require('querystring'),
      { v4: uuid } = require('uuid'),
      wss = new WebSocket.Server({ noServer: true }),
      { deleteObject, omit, broadcast, leaveRoom } = require('./helpers'),
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
        const room = {
          name: body.name,
          id: uuid(),
          started: false,
          submittedCards: [],
          access: body.access,
          players: [{ id: id, username: username, isBot: false }]
        };
        rooms.push(room);
        if(room.access === 'private') {
          passwords[room.id] = body.password;
        }
        ws.send(JSON.stringify({
          type: 'join',
          room: omit(room, 'players'),
          players: room['players']
        }));
        break;

      case 'joinRoom':
        // Stop if room doesn't exist or user entered wrong password
        if(roomIndex === -1 || (rooms[roomIndex].access === 'private' && 
            body.password !== passwords[rooms[roomIndex].id])) {
          return;
        }
        rooms[roomIndex]['players'].push({
          id: id,
          username: username,
          isBot: false
        });
        broadcast(rooms[roomIndex], connectedUsers, {
          type: 'join',
          room: omit(rooms[roomIndex], 'players'),
          players: rooms[roomIndex]['players']
        });
        break;

      case 'addBot':
        rooms[roomIndex]['players'].push({
          id: uuid(),
          username: body,
          isBot: true
        });
        broadcast(rooms[roomIndex], connectedUsers, {
          type: 'updateBots',
          players: rooms[roomIndex]['players']
        });
        break;

      case 'deleteBot':
        deleteObject(rooms[roomIndex]['players'], 'id', body);
        broadcast(rooms[roomIndex], connectedUsers, {
          type: 'updateBots',
          players: rooms[roomIndex]['players']
        });
        break;

      case 'startGame':
        rooms[roomIndex]['started'] = true;
        broadcast(rooms[roomIndex], connectedUsers, {
          type: 'startGame',
          room: omit(rooms[roomIndex], 'players')
        })
        break;

      case 'updatePhase':
        broadcast(rooms[roomIndex], connectedUsers, {
          type: 'updatePhase',
          phase: body
        })
        break;

      case 'submitCard':
        rooms[roomIndex]['submittedCards'].push({ text: body, id: id });
        connectedUsers[id].send(JSON.stringify({
          type: 'updatePhase',
          phase: 'waiting'
        }));
        broadcast(rooms[roomIndex], connectedUsers, {
          type: 'submitCard',
          cards: rooms[roomIndex]['submittedCards']
        });
        if(rooms[roomIndex]['submittedCards'].length === rooms[roomIndex]['players'].length) {
          broadcast(rooms[roomIndex], connectedUsers, {
            type: 'updatePhase',
            phase: 'displaying'
          });
        }
        break;

      case 'leaveRoom': {
        leaveRoom(rooms, roomIndex, connectedUsers, id);
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
        leaveRoom(rooms, i, connectedUsers, id);
        break;
      }
    }
    delete connectedUsers[id]
  })
})

module.exports.wss = wss;
module.exports.rooms = rooms;
module.exports.connectedUsers = connectedUsers;