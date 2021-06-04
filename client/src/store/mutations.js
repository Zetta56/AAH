export default {
  updateUser (state, user) {
    state.user = user
  },
  updateLoginStatus (state, loginStatus) {
    state.isLoggedIn = loginStatus
  },
  updateWebsocket (state, websocket) {
    state.websocket = websocket
  },
  updateRoom (state, room) {
    state.room = room
  },
  updatePhase (state, phase) {
    state.room.phase = phase
  },
  updatePlayers (state, players) {
    state.players = players
  },
  updateHand (state, hand) {
    state.hand = hand
  }
}
