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

// Generates a random card
const generateCard = () => {
  return 'card1';
}

// If all players have played a card, moves to picking phase (and pick card if czar is a bot)
const checkPlayingFinished = (room, websockets) => {
  if(room['players'].every(player => player.card !== '' || player.czar)) {
    broadcast(room, websockets, {
      type: 'updatePhase',
      phase: 'picking'
    });
  }
  for(let player of room['players']) {
    if(player.czar && player.isBot) {
      let winnerIndex;
      do {
        winnerIndex = Math.floor(Math.random() * room['players'].length);
      } while(room['players'][winnerIndex]['czar']);
      pickWinner(room, websockets, room['players'][winnerIndex]);
      break;
    }
  }
}

const pickWinner = (room, websockets, player) => {
  player.winner = true;
  player.score += 1;
  
  broadcast(room, websockets, {
    type: 'updatePlayers',
    players: room.players
  });
  broadcast(room, websockets, {
    type: 'updatePhase',
    phase: `results`
  });
}

module.exports.deleteObject = deleteObject;
module.exports.omit = omit;
module.exports.broadcast = broadcast;
module.exports.leaveRoom = leaveRoom;
module.exports.rotateCzar = rotateCzar;
module.exports.generateCard = generateCard;
module.exports.checkPlayingFinished = checkPlayingFinished;
module.exports.pickWinner = pickWinner;