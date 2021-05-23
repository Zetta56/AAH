const WebSocket = require('ws'),
      jwt = require('jsonwebtoken'),
      querystring = require('querystring'),
      wss = new WebSocket.Server({ noServer: true }),
      rooms = {},
      connectedUsers = [];

wss.on('connection', function connection(ws, req) {
  const token = querystring.parse(req.url.substring(2)).token;
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  connectedUsers.push(id);

  ws.on('message', (payload) => {
    const { type, room, userId, body } = JSON.parse(payload);
    switch(type) {
      case "join":
        // Creates room if it doesn't exist
        if(!rooms[room]) {
          password = body.access === 'private' ? body.password : '';
          rooms[room] = {
            access: body.access,
            password: password,
            participants: {}
          };
          rooms[room]['participants'][userId] = ws;
        // Joins room if user isn't already in it
        } else if(!rooms[room]['participants'][userId]) {
          rooms[room]['participants'][userId] = ws;
        }
        break;
      // case "leave":
      //   // Does nothing if user isn't in room
      //   if(!rooms[room][userId]) {
      //     return;
      //   // Delete room if user was last person in room
      //   } else if(Objects.keys(rooms[rooms]).length === 1) {
      //     delete rooms[room];
      //   // Disconnect user from room
      //   } else {
      //     delete rooms[room][userId];
      //   }
      // default:
      //   Object.entries(rooms[room]).forEach(client => {
      //     client.send(body);
      //   });
    }
  })

  // Pull user from connectedUsers array when they disconnect
  ws.on('close', () => {
    const index = connectedUsers.indexOf(id);
    connectedUsers.splice(index, 1);
  })
})

module.exports.wss = wss;
module.exports.connectedUsers = connectedUsers;