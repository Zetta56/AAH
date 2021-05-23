<template>
  <div class="nav-container">
    <span class="brand">
      <strong>AAH</strong>
    </span>
    <div class="right">
      <span class="logout" @click="logout">Logout</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['updateUser', 'updateLoginStatus', 'connectWebSocket']),
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
