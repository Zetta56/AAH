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
      users[player.id].send(JSON.stringify(message));
    }
  });
}

// Removes player from room and broadcasts their disconnection to other players
const leaveRoom = (roomIndex, id) => {
  if(rooms[roomIndex]['players'].find(player => player.id === id).isCzar) {
    rotateCzar(roomIndex);
  }
  deleteObject(rooms[roomIndex]['players'], 'id', id);
  const humans = rooms[roomIndex].players.filter(player => !player.isBot);
  if(humans.length === 0) {
    if(rooms[roomIndex].access === 'private') {
      delete passwords[rooms[roomIndex].id]
    }
    rooms.splice(roomIndex, 1);
  } else {
    broadcast(roomIndex, {
      type: 'leave',
      players: rooms[roomIndex]['players'],
      id: id
    });
    if(rooms[roomIndex]['players'].every(player => player.card !== '' || player.isCzar)) {
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