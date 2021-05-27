<template>
  <div class="nav-container">
    <span class="brand" @click="onBrandClick">
      <strong>AAH</strong>
    </span>
    <div class="right">
      <span class="logout" @click="logout">Logout</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['webSocket', 'room'])
  },
  methods: {
    ...mapActions(['updateUser', 'updateLoginStatus', 'connectWebSocket']),
    onBrandClick: function () {
      if (this.room) {
        this.webSocket.send(JSON.stringify({
          type: 'leaveRoom',
          roomId: this.room
        }))
      }
    },
    logout: function () {
      localStorage.removeItem('token')
      this.updateUser(null)
      this.updateLoginStatus(false)
      this.connectWebSocket({ token: null })
    }
  }
}
</script>

<style scoped>
.nav-container {
  padding: 0.75rem 7.5%;
  background-color: #2a2a2a;
}

.nav-container .right {
  float: right;
}

.nav-container span {
  color: #eeeeee;
  font-size: 22px;
  padding: 0 10px;
  cursor: pointer;
}
</style>
