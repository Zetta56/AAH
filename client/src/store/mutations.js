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
  updatePlayers (state, players) {
    state.players = players
  },
  updatePhase (state, phase) {
    state.phase = phase
  },
  updateHand (state, hand) {
    state.hand = hand
  },
  updateSubmitted (state, submitted) {
    state.submitted = submitted
  }
}
