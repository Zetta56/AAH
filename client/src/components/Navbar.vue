<template>
  <div class="nav-container">
    <router-link to="/" class="brand">
      <strong>AAH</strong>
    </router-link>
    <div class="nav-right">
      <router-link to="/" class="logout" @click.native="logout">Logout</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object
  },
  methods: {
    logout: function () {
      localStorage.removeItem('token')
      this.$emit('update:user', { username: null, isLoggedIn: false })
    }
  }
}
</script>

<style scoped>
.nav-container {
  padding: 0.75rem 7.5%;
  background-color: #2a2a2a;
}

.nav-right {
  float: right;
}

a {
  color: #eeeeee;
  font-size: 22px;
  text-decoration: none;
  padding: 0 10px;
}
</style>
