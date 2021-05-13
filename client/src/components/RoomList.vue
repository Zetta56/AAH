<template>
  <div class="roomlist-container">
    <b-button variant="primary" @click="create">+ Create Room</b-button>
  </div>
</template>

<script>
export default {
  methods: {
    create: function () {
      console.log('a')
    }
  }
}
</script>

<style>
.roomlist-container {
  height: 100px;
  color: white;
}
</style>
