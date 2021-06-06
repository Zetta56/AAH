const { v4: uuid } = require('uuid');

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
    do {
      winnerIndex = Math.floor(Math.random() * room['players'].length);
    } while(room['players'][winnerIndex]['isCzar']);
    return room['players'][winnerIndex];
  }
}

module.exports.Room = Room;
module.exports.Player = Player;
module.exports.Bot = Bot;