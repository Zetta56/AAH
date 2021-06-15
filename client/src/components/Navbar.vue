<template>
  <div class="nav-container">
    <span class="brand" @click="onBrandClick">
      <strong>AAH</strong>
    </span>
    <div class="right">
      <span class="logout" @click="onLogoutClick">Logout</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['websocket', 'room'])
  },
  methods: {
    ...mapActions(['logout', 'connectWebsocket']),
    onBrandClick: function () {
      if (this.room) {
        this.websocket.send(JSON.stringify({
          type: 'leaveRoom',
          roomId: this.room.id
        }))
      }
    },
    onLogoutClick: function () {
      localStorage.removeItem('token')
      this.websocket.close()
      this.logout()
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
