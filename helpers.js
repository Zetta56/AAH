// Deletes object from array of objects
const deleteObject = (array, key, target) => {
  const index = array.findIndex(el => el[key] === target);
  if(index >= 0) {
    array.splice(index, 1);
  }
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
const leaveRoom = (rooms, roomIndex, websockets, id) => {
  deleteObject(rooms[roomIndex]['players'], 'id', id);
  const humans = rooms[roomIndex].players.filter(player => !('isBot' in player));
  if(humans.length === 0) {
    if(rooms[roomIndex].access === 'private') {
      delete passwords[rooms[roomIndex].id]
    }
    rooms.splice(roomIndex, 1);
    return true;
  } else {
    broadcast(rooms[roomIndex], websockets, {
      type: 'leave',
      players: rooms[roomIndex]['players'],
      id: id
    });
  }
}

module.exports.deleteObject = deleteObject;
module.exports.broadcast = broadcast;
module.exports.leaveRoom = leaveRoom;