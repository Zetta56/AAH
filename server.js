/** Packages */
require('dotenv').config();
const http = require('http'),
      express = require('express'),
      cors = require('cors'),
      jwt = require('jsonwebtoken'),
      path = require('path'),
      querystring = require('querystring'),
      { v4: uuid } = require('uuid'),
      wss = require('./websockets'),
      { Store } = require("./models");

/** Settings */
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json({limit: '30mb'}));
app.use(express.urlencoded({extended: true}));
app.use(express.static('client/dist'));

/** HTTP Routes */
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
app.get('/api/rooms', (req, res) => {
  res.json(Store.rooms.filter(room => room.phase === 'waiting'));
})
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/dist/index.html'));
})

server.on('upgrade', (req, socket, head) => {
  try {
    jwt.verify(querystring.parse(req.url.substring(2)).token, process.env.JWT_SECRET);
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit('connection', ws, req);
    });
  } catch(err) {
    // Prevent user from connecting with invalid token
    socket.destroy();
  }
})

/** Start Server */
server.listen(process.env.PORT || 3001, () => {
  console.log('Server Started');
});