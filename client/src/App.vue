<template>
  <div id="app">
    <Navbar v-if="isLoggedIn" />
    <div v-if="isLoggedIn !== null" :style="bgColor" class="content">
      <Login v-if="isLoggedIn === false" />
      <RoomList v-else-if="!room" />
      <WaitingRoom v-else-if="!room.started" />
      <Game v-else-if="!room.finished" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import api from './api'
import Navbar from './components/Navbar'
import Login from './components/Login'
import RoomList from './components/RoomList'
import WaitingRoom from './components/WaitingRoom'
import Game from './components/Game'

export default {
  name: 'App',
  components: {
    Navbar,
    Login,
    RoomList,
    WaitingRoom,
    Game
  },
  computed: {
    ...mapState(['user', 'isLoggedIn', 'room']),
    bgColor: function () {
      if (this.isLoggedIn === false || !this.room) {
        return { backgroundColor: '#222222' }
      } else {
        return { backgroundColor: '#ffffff' }
      }
    }
  },
  methods: {
    ...mapActions(['updateUser', 'updateLoginStatus', 'connectWebsocket'])
  },
  async created () {
    const response = await api('/api/authenticate', {
      method: 'POST',
      body: JSON.stringify({ token: localStorage.getItem('token') })
    })
    if (response.verified) {
      this.connectWebsocket({
        token: localStorage.getItem('token'),
        callback: () => {
          this.updateUser({ username: response.username, id: response.id })
          this.updateLoginStatus(true)
        },
        error: () => {
          this.updateLoginStatus(false)
        }
      })
    } else {
      this.updateLoginStatus(false)
    }
  }
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  flex-grow: 1;
}
</style>
