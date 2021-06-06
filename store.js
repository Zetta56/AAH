// Structure: [ room, room, room... ]
const rooms = [];
// Structure: { userId: websocket }
const users = {};
// Structure: { roomId: password }
const passwords = {};

// CommonJS modules act like singletons; they are created once and
// imported wherever needed (makes store work properly).
module.exports.rooms = rooms;
module.exports.users = users;
module.exports.passwords = passwords;