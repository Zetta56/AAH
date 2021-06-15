const Player = require('./Player');
const markov = require('./Markov');

class Bot extends Player {
  constructor(id, username) {
    super(id, username, true);
  }

  submitCard(room) {
    this.card = markov.generate(2, 4);
    room.broadcast('updatePlayers', { players: room.players });
  }

  pickWinner(room) {
    let winner;
    do {
      winner = room.players[Math.floor(Math.random() * room.players.length)];
    } while(winner.isCzar && room.players.length > 1);
    super.pickWinner(room, winner);
  }
}

module.exports = Bot;