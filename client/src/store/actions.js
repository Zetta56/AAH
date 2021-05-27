export default {
  updateUser (context, user) {
    context.commit('updateUser', user)
  },
  updateLoginStatus (context, loginStatus) {
    context.commit('updateLoginStatus', loginStatus)
  },
  connectWebSocket (context, { token, callback, error }) {
    // Don't connect to room if user is already in one
    if (context.state.room) {
      return
    }

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
      const data = JSON.parse(event.data)
      switch (data.type) {
        case 'join':
          context.commit('updateRoom', data.id)
          break
        case 'leave':
          context.commit('updateRoom', null)
          break
      }
    }
  }
}
