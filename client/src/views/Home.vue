<template>
  <div v-if="user.isLoggedIn !== null" class="home-container">
    <RoomList v-if="user.isLoggedIn" :user="user" />
    <Login v-else :user="user" />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '../components/Login.vue'
import RoomList from '../components/RoomList.vue'

export default {
  name: 'Home',
  components: {
    Login,
    RoomList
  },
  props: {
    user: Object
  }
}
</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: #222222;
}
</style>
