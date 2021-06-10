const Player = require('./Player');
const Markov = require('../markov');

class Bot extends Player {
  constructor(id, username) {
    super(id, username, true);
  }

  submitCard(room) {
    this.card = Markov.generateCard();
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