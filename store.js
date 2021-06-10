const User = require('./models/User');

class Store {
  static rooms = [];
  static users = [];
  static passwords = {};

  static getUser(userId) {
    return Store.users.find(user => user.id === userId);
  }

  static getRoom(roomId) {
    return Store.rooms.find(room => room.id === roomId);
  }

  static connectUser(id, ws) {
    // Updates users
    const foundUser = Store.getUser(id);
    if(foundUser) {
      clearTimeout(foundUser.disconnect);
      foundUser.ws.close();
      foundUser.ws = ws;
    } else {
      Store.users.push(new User(id, ws));
    }
  
    // Sends user's room (if it exists)
    if(foundUser && Store.getRoom(foundUser.roomId)) {
      ws.send(JSON.stringify({
        type: 'connect',
        room: Store.getRoom(foundUser.roomId),
        reconnecting: true
      }));
    } else {
      ws.send(JSON.stringify({
        type: 'connect',
        reconnecting: false
      }))
    }
  }

  static removeRoom(room) {
    if(room.access === 'private') {
      delete Store.passwords[room.id];
    }
    Store.updateWaitingRooms(room, false);
    Store.rooms.splice(Store.rooms.findIndex(el => el.id === room.id), 1);
  }

  static updateWaitingRooms(room, adding) {
    Store.users.forEach(user => {
      if(user.roomId === null) {
        user.ws.send(JSON.stringify({
          type: 'updateRooms',
          room: room,
          adding: adding
        }))
      }
    })
  }
}

module.exports = Store;