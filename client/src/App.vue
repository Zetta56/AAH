<template>
  <div id="app">
    <Navbar v-if="user.isLoggedIn" @update:user="onUpdateUser" />
    <router-view :user="user" @update:user="onUpdateUser" />
  </div>
</template>

<script>
import api from './api'
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data () {
    return {
      user: { username: null, isLoggedIn: null }
    }
  },
  methods: {
    onUpdateUser: function (newUser) {
      this.user = newUser
    }
  },
  async created () {
    const token = localStorage.getItem('token')
    const response = await api('/api/authenticate', {
      method: 'POST',
      body: JSON.stringify({
        token: token
      })
    })
    if (response.verified) {
      this.user = { username: response.username, isLoggedIn: true }
    } else {
      this.user = { username: null, isLoggedIn: false }
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

#app > *:not(.nav-container) {
  flex-grow: 1;
}
</style>
