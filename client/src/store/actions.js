export default {
  updateUser (context, user) {
    context.commit('updateUser', user)
  },
  updateLoginStatus (context, loginStatus) {
    context.commit('updateLoginStatus', loginStatus)
  },
  connectWebSocket (context, { token, callback, error }) {
    let baseUrl = process.env.VUE_APP_BACKEND_URL || window.location.origin
    if (baseUrl.substring(0, 4) === 'http') {
      baseUrl = baseUrl.replace('http', 'ws')
    }
    const ws = new WebSocket(baseUrl + `?token=${token}`)
    ws.onerror = () => {
      context.commit('updateWebSocket', null)
      if (error) {
        error()
      }
    }
    ws.onopen = () => {
      context.commit('updateWebSocket', ws)
      if (callback) {
        callback()
      }
    }
    ws.onmessage = (event) => {
      console.log(event)
    }
  },
  updateRoom (context, room) {
    context.commit('updateRoom', room)
  }
}
