const { v4: uuid } = require('uuid');

class User {
  constructor(id, ws) {
    this.id = id;
    this.ws = ws;
    this.roomId = null;
    this.disconnect = null;
  }
}

class Player {
  constructor(id, username, isBot) {
    this.id = id,
    this.username = username,
    this.isBot = isBot,
    this.isCzar = false,
    this.isWinner = false,
    this.score = 0,
    this.card = ''
    this.hand = []
  }
}

class Bot extends Player {
  constructor(id, username) {
    super(id, username, true);
  }

  pickWinner(room) {
    let winnerIndex;
    let attempts;
    do {
      winnerIndex = Math.floor(Math.random() * room['players'].length);
      attempts++;
    } while(room['players'][winnerIndex]['isCzar'] && room['players'].length > 1);
    return room['players'][winnerIndex];
  }
}

class Room {
  constructor(name, access, initialPlayer) {
    this.id = uuid(),
    this.name = name,
    this.access = access,
    this.phase = 'waiting',
    this.prompt = '',
    this.players = [initialPlayer]
  }
};

module.exports.User = User;
module.exports.Player = Player;
module.exports.Bot = Bot;
module.exports.Room = Room;