// Packages
require('dotenv').config();
const http = require('http'),
      express = require('express'),
      WebSocket = require('ws'),
      cors = require('cors'),
      jwt = require('jsonwebtoken'),
      path = require('path'),
      { v4: uuid } = require('uuid');

// Initialization
const app = express(),
      server = http.createServer(app),
      wss = new WebSocket.Server({ server: server }),
      rooms = {};

// Settings
app.use(cors());
app.use(express.json({limit: '30mb'}));
app.use(express.urlencoded({extended: true}));
app.use(express.static('client/dist'));

// HTTP Routes
app.post('/api/login', (req, res) => {
  const user = { username: req.body.username, id: uuid() }
  const token = jwt.sign(user, process.env.JWT_SECRET);
  res.json({ token: token, user: user });
})
app.post('/api/authenticate', (req, res) => {
  try {
    const payload = jwt.verify(req.body.token, process.env.JWT_SECRET);
    res.json({verified: true, ...payload});
  } catch(err) {
    res.json({verified: false});
  }
})
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/dist/index.html'));
})

// Web Sockets
wss.on('connection', function connection(ws) {
  ws.on('message', ({ type, room, userId, body }) => {
    switch(type) {
      case "join":
        // Creates room if it doesn't exist
        if(!rooms[room]) {
          rooms[room] = {};
        }
        // Joins room if user isn't already in it
        if(!rooms[room][userId]) {
          rooms[room][userId] = ws;
        }
      case "leave":
        // Does nothing if user isn't in room
        if(!rooms[room][userId]) {
          return;
        // Delete room if user was last person in room
        } else if(Objects.keys(rooms[rooms]).length === 1) {
          delete rooms[room];
        // Disconnect user from room
        } else {
          delete rooms[room][userId];
        }
      default:
        Object.entries(rooms[room]).forEach(client => {
          client.send(body);
        });
    }
  })
})

// Start Server
server.listen(process.env.PORT || 3001, () => {
  console.log('Server Started');
})