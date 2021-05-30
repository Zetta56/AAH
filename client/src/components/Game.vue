<template>
  <div class="game-container">
    game
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['websocket', 'room'])
  }
}
</script>

<style scoped>
</style>
