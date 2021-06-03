// Deletes object from array of objects
const deleteObject = (array, key, target) => {
  const index = array.findIndex(el => el[key] === target);
  if(index >= 0) {
    array.splice(index, 1);
  }
}

// Returns object without specific key
const omit = (obj, key) => {
  const { [key]: omitted, ...rest } = obj;
  return rest;
}

// Sends message to everyone in a specific room
const broadcast = (room, websockets, message) => {
  room['players'].forEach(player => {
    if(!player.isBot) {
      websockets[player.id].send(JSON.stringify(message));
    }
  });
}

// Removes player from room and broadcasts their disconnection to other players
const leaveRoom = (rooms, roomIndex, websockets, passwords, id) => {
  if(rooms[roomIndex]['players'].find(player => player.id === id).czar) {
    rotateCzar(rooms[roomIndex]);
  }
  deleteObject(rooms[roomIndex]['players'], 'id', id);
  const humans = rooms[roomIndex].players.filter(player => !player.isBot);
  if(humans.length === 0) {
    if(rooms[roomIndex].access === 'private') {
      delete passwords[rooms[roomIndex].id]
    }
    rooms.splice(roomIndex, 1);
  } else {
    broadcast(rooms[roomIndex], websockets, {
      type: 'leave',
      players: rooms[roomIndex]['players'],
      id: id
    });
    if(rooms[roomIndex]['players'].every(player => player.card !== '' || player.isBot || player.czar)) {
      broadcast(rooms[roomIndex], websockets, {
        type: 'updatePhase',
        phase: 'picking'
      });
    }
  }
}

// Makes the next player in a room the czar
const rotateCzar = (room) => {
  // currentCzar will be -1 on the first call
  const currentCzar = room['players'].findIndex(user => user.czar);
  const nextCzar = currentCzar + 1 < room['players'].length ? currentCzar + 1 : 0;
  room['players'].forEach(player => {
    player.czar = false;
  });
  room['players'][nextCzar]['czar'] = true;
}

module.exports.deleteObject = deleteObject;
module.exports.omit = omit;
module.exports.broadcast = broadcast;
module.exports.leaveRoom = leaveRoom;
module.exports.rotateCzar = rotateCzar;