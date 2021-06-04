export default {
  userPlayer: state => {
    return state.players.find(player => player.id === state.user.id)
  },
  winner: state => {
    return state.players.find(player => player.winner === true)
  }
}
