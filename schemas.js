const { v4: uuid } = require('uuid');

class Room {
  constructor(name, access, initialPlayer) {
    this.id = uuid(),
    this.name = name,
    this.phase = 'waiting',
    this.access = access,
    this.winner = '',
    this.players = [initialPlayer]
  }
};

class Player {
  constructor(id, username, isBot) {
    this.id = id,
    this.username = username,
    this.isBot = isBot,
    this.czar = false,
    this.winner = false,
    this.score = 0,
    this.card = ''
  }
}

module.exports.Room = Room;
module.exports.Player = Player;