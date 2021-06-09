export default {
  updateUser (context, user) {
    context.commit('updateUser', user)
  },
  updateLoginStatus (context, loginStatus) {
    context.commit('updateLoginStatus', loginStatus)
  },
  updateRooms (context, rooms) {
    context.commit('updateRooms', rooms)
  },
  updateLoading (context, loading) {
    context.commit('updateLoading', loading)
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
          case 'connect': {
            if (data.reconnecting) {
              const { players, ...room } = data.room
              context.commit('updateRoom', room)
              context.commit('updatePlayers', players)
            }
            context.commit('updateLoading', false)
            break
          }
          case 'join': {
            if (!context.state.room) {
              context.commit('updateRoom', data.room)
            }
            context.commit('updatePlayers', data.players)
            break
          }
          case 'updateRooms': {
            if (data.adding) {
              context.commit('updateRooms', [...context.state.rooms, data.room])
            } else {
              context.commit('updateRooms', context.state.rooms.filter(room => room.id !== data.room.id))
            }
            break
          }
          case 'updatePlayers':
            context.commit('updatePlayers', data.players)
            break
          case 'updatePhase':
            context.commit('updatePhase', data.phase)
            break
          case 'startRound':
            context.commit('updateRoom', data.room)
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

      ws.onclose = () => {
        if (context.state.user) {
          context.commit('updateError', 'disconnect')
        }
      }
    }
  }
}
