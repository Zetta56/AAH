<template>
  <b-container class="game-container">
    <div class="top-row">
      <b-button variant="dark" class="scoreboard-button">Scoreboard</b-button>
      <span class="timer">30</span>
    </div>
    <Carousel
      :paginationEnabled="false"
      :navigationEnabled="true"
      :centerMode="true"
      :mouseDrag="false"
      :touchDrag="false"
      :perPageCustom="[[1200, 4], [991, 3], [580, 2], [0, 1]]"
      :speed="250"
      class="shown-cards"
    >
      <slide>
        <div class="dark card">{{ prompt }}</div>
      </slide>
      <slide v-for="card, index in submitted" :key="index">
        <div class="gray card">
          {{ room.phase === 'displaying' ? card : '' }}
        </div>
      </slide>
    </Carousel>
    <Hand :cards="hand" />
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
import { Carousel, Slide } from 'vue-carousel'
import Hand from './Hand'

export default {
  components: {
    Carousel,
    Slide,
    Hand
  },
  data: function () {
    return {
      prompt: 'Default Prompt'
    }
  },
  computed: {
    ...mapState(['websocket', 'room', 'hand', 'players']),
    submitted: function () {
      const cards = []
      this.players.forEach(player => {
        if (player.card !== '') {
          cards.push(player.card)
        }
      })
      return cards
    }
  }
}
</script>

<style scoped>
.game-container {
  width: 70%;
  font-size: 20px;
}

.top-row {
  display: flex;
  margin: 10px 0;
}

.scoreboard-button,
.timer {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  font-size: 20px;
}

.timer {
  margin-left: auto;
  background-color: #343a40;
  color: #ffffff;
  border-radius: 0.25rem;
}

.shown-cards {
  margin: 1rem auto;
}

.dark.card {
  background-color: #222222;
  color: white;
}

.gray.card {
  background-color: #dddddd;
  border: none;
}

.card {
  width: calc(100% - 1rem);
  height: 275px;
  padding: 1rem;
  margin: auto;
}

>>> .VueCarousel-navigation-button {
  outline: none !important;
  font-size: 24px;
}

@media only screen and (max-width: 580px) {
  .game-container {
    width: 60%;
  }
}

@media only screen and (max-width: 400px) {
  .game-container {
    width: 90%;
  }
}
</style>
