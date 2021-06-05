<template>
  <b-modal
    id="scoreboard"
    ref="scoreboard"
    title="Scoreboard"
    :hide-footer="true"
    :visible="true"
    centered
  >
    <div v-for="player, index in players" :key="index" class="row">
      <span class="username">{{ player.username }}</span>
      <span class="score">{{ player.score }}</span>
    </div>
  </b-modal>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['players'])
  }
}
</script>

<style scoped>
>>> #scoreboard {
  font-size: 20px;
  align-items: center;
}

>>> #scoreboard .modal-dialog {
  width: 350px;
}

>>> #scoreboard .row {
  padding: 0.5rem 1rem;
}

>>> #scoreboard .score {
  margin-left: auto;
}
</style>
