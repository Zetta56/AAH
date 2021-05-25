const WebSocket = require('ws'),
      jwt = require('jsonwebtoken'),
      querystring = require('querystring'),
      { v4: uuid } = require('uuid'),
      wss = new WebSocket.Server({ noServer: true }),
      rooms = [],
      connectedUsers = [];

wss.on('connection', function connection(ws, req) {
  const token = querystring.parse(req.url.substring(2)).token;
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  connectedUsers.push(id);

  ws.on('message', (payload) => {
    const { type, roomId, body } = JSON.parse(payload);
    const roomIndex = rooms.findIndex(room => room.id === roomId);

    switch(type) {
      case 'createRoom':
        const password = body.access === 'private' ? body.password : '';
        rooms.push({
          name: body.name,
          id: uuid(),
          access: body.access,
          password: password,
          participants: { [id]: ws }
        });
        console.log(rooms)
        break;
      case 'joinRoom':
        // Stop if room doesn't exist or user entered wrong password
        if(roomIndex === -1 || (rooms[roomIndex].access === 'private' && 
            body.password !== rooms[roomIndex].password)) {
          return;
        }
        rooms[roomIndex]['participants'][id] = ws;
        console.log(rooms)
        break;
      // default:
      //   Object.entries(rooms[room]).forEach(client => {
      //     client.send(body);
      //   });
    }
  })

  ws.on('close', () => {
    // Pull user from rooms
    for(let i = 0; i < rooms.length; i++) {
      if(id in rooms[i].participants) {
        delete rooms[i]['participants'][id];
        if(Object.keys(rooms[i].participants).length === 0) {
          rooms.splice(i, 1);
        }
        break;
      }
    }
    // Pull user from connectedUsers
    const index = connectedUsers.indexOf(id);
    connectedUsers.splice(index, 1);
  })
})

module.exports.wss = wss;
module.exports.rooms = rooms;
module.exports.connectedUsers = connectedUsers;