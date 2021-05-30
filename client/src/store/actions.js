export default {
  updateUser (context, user) {
    context.commit('updateUser', user)
  },
  updateLoginStatus (context, loginStatus) {
    context.commit('updateLoginStatus', loginStatus)
  },
  connectWebsocket (context, { token, callback, error }) {
    if (token) {
      let baseUrl = process.env.VUE_APP_BACKEND_URL || window.location.origin
      if (baseUrl.substring(0, 4) === 'http') {
        baseUrl = baseUrl.replace('http', 'ws')
      }
      const ws = new WebSocket(baseUrl + `?token=${token}`)
      ws.onerror = () => {
        context.commit('updateWebsocket', null)
        if (error) {
          error()
        }
      }
      ws.onopen = () => {
        context.commit('updateWebsocket', ws)
        if (callback) {
          callback()
        }
      }
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        switch (data.type) {
          case 'join': {
            if (!context.state.room) {
              context.commit('updateRoom', data.room)
            }
            context.commit('updatePlayers', data.players)
            break
          }
          case 'updateBots':
            context.commit('updatePlayers', data.players)
            break
          case 'startGame': {
            context.commit('updateRoom', data.room)
            break
          }
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
}
