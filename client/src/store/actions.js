export default {
  updateUser (context, user) {
    context.commit('updateUser', user)
  },
  updateLoginStatus (context, loginStatus) {
    context.commit('updateLoginStatus', loginStatus)
  },
  connectWebSocket (context, { token, callback, error }) {
    if (token == null) {
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
        case 'join': {
          const { players, ...room } = data.room
          if (!context.state.room) {
            context.commit('updateRoom', room)
          }
          context.commit('updatePlayers', players)
          break
        }
        case 'updateBots':
          context.commit('updatePlayers', data.players)
          break
        case 'leave':
          if (data.id === context.state.user.id) {
            context.commit('updateRoom', null)
            context.commit('updatePlayers', [])
          } else {
            context.commit('updatePlayers', data.players)
          }
          break
      }
    }
  }
}
