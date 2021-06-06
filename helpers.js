const { rooms, users, passwords } = require('./store');

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
const broadcast = (roomIndex, message) => {
  rooms[roomIndex]['players'].forEach(player => {
    if(!player.isBot) {
      users.find(user => user.id === player.id).ws.send(JSON.stringify(message));
    }
  });
}

// Broadcast room creation/deletion to those still selecting rooms
const updateWaitingRooms = (room, adding) => {
  users.forEach(user => {
    if(!user.inRoom) {
      user.ws.send(JSON.stringify({
        type: 'updateRooms',
        room: room,
        adding: adding
      }))
    }
  })
}

// Removes player from room
const leaveRoom = (roomIndex, id) => {
  // If player was the czar, set another player to be the czar
  if(rooms[roomIndex]['players'].find(player => player.id === id).isCzar) {
    rotateCzar(roomIndex);
  }
  deleteObject(rooms[roomIndex]['players'], 'id', id);
  users.find(user => user.id === id).inRoom = false;
  // If player was the last in room, delete the room
  const humans = rooms[roomIndex].players.filter(player => !player.isBot);
  if(humans.length === 0) {
    updateWaitingRooms(rooms[roomIndex], false);
    if(rooms[roomIndex].access === 'private') {
      delete passwords[rooms[roomIndex].id]
    }
    rooms.splice(roomIndex, 1);
  // Otherwise, broadcast player disconnection
  } else {
    broadcast(roomIndex, {
      type: 'leave',
      players: rooms[roomIndex]['players'],
      id: id
    });
    // If player was the last one who didn't play a card, move to next phase
    if(rooms[roomIndex]['players'].every(player => player.card !== '' || player.isCzar)) {
      rooms[roomIndex]['phase'] = 'picking';
      broadcast(roomIndex, {
        type: 'updatePhase',
        phase: 'picking'
      });
    }
  }
}

// Makes the next player in a room the czar
const rotateCzar = (roomIndex) => {
  // currentCzar will be -1 on the first call
  const currentCzar = rooms[roomIndex]['players'].findIndex(user => user.isCzar);
  const nextCzar = currentCzar + 1 < rooms[roomIndex]['players'].length ? currentCzar + 1 : 0;
  rooms[roomIndex]['players'].forEach(player => {
    player.isCzar = false;
  });
  rooms[roomIndex]['players'][nextCzar]['isCzar'] = true;
}

// Generates a random card
const generateCard = () => {
  return 'card1';
}

// If all players have played a card, moves to picking phase
const checkPlayingFinished = (roomIndex) => {
  const finished = rooms[roomIndex]['players'].every(player => {
    return player.card !== '' || player.isCzar
  })
  if(finished) {
    broadcast(roomIndex, {
      type: 'updatePhase',
      phase: 'picking'
    });
    // Automatically pick card if czar is a bot
    for(let player of rooms[roomIndex]['players']) {
      if(player.isCzar && player.isBot) {
        const winner = player.pickWinner(rooms[roomIndex]);
        winner.isWinner = true;
        winner.score += 1;
        broadcast(roomIndex, {
          type: 'updatePlayers',
          players: rooms[roomIndex]['players']
        });
        broadcast(roomIndex, {
          type: 'updatePhase',
          phase: `results`
        });
        break;
      }
    }
  }
}

module.exports.deleteObject = deleteObject;
module.exports.omit = omit;
module.exports.broadcast = broadcast;
module.exports.leaveRoom = leaveRoom;
module.exports.rotateCzar = rotateCzar;
module.exports.generateCard = generateCard;
module.exports.checkPlayingFinished = checkPlayingFinished;
module.exports.updateWaitingRooms = updateWaitingRooms;