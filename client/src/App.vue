<template>
  <div id="app">
    <Navbar v-if="isLoggedIn" />
    <div v-if="isLoggedIn !== null" :style="bgColor" class="content">
      <Login v-if="isLoggedIn === false" />
      <RoomList v-else-if="!room" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import api from './api'
import Navbar from './components/Navbar'
import Login from './components/Login'
import RoomList from './components/RoomList'

export default {
  name: 'App',
  components: {
    Navbar,
    Login,
    RoomList
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
    ...mapActions(['updateUser', 'updateLoginStatus'])
  },
  async created () {
    const response = await api('/authenticate', {
      method: 'POST',
      body: JSON.stringify({
        token: localStorage.getItem('token')
      })
    })
    if (response.verified) {
      this.updateUser({ username: response.username, id: response.id })
      this.updateLoginStatus(true)
    } else {
      this.updateLoginStatus(false)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
