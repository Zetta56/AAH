export default {
  userPlayer: state => {
    if (state.user) {
      return state.players.find(player => player.id === state.user.id)
    } else {
      return null
    }
  },
  winner: state => {
    return state.players.find(player => player.isWinner === true)
  }
}
