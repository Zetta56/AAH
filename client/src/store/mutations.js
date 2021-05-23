export default {
  updateUser (state, user) {
    state.user = user
  },
  updateLoginStatus (state, loginStatus) {
    state.isLoggedIn = loginStatus
  },
  updateWebSocket (state, webSocket) {
    state.webSocket = webSocket
  },
  updateRoom (state, room) {
    state.room = room
  }
}
