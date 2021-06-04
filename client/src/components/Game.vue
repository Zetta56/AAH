<template>
  <b-container class="game-container">
    <div class="top-row">
      <b-button variant="dark" class="scoreboard-button">Scoreboard</b-button>
      <span class="timer">30</span>
    </div>
    <SharedCards />
    <Hand v-if="!userPlayer.czar" />
    <div v-else class="czar-message">
      <span>
        You are the Card Czar <b-icon-gem />
      </span>
    </div>
    <b-button variant="dark" class="next-button" @click="startRound" v-if="room.phase === 'results'">
      Next Round
    </b-button>
  </b-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Hand from './Hand'
import SharedCards from './SharedCards'

export default {
  components: {
    SharedCards,
    Hand
  },
  data: function () {
    return {
      prompt: 'Default Prompt'
    }
  },
  computed: {
    ...mapState(['websocket', 'user', 'room', 'hand', 'players']),
    ...mapGetters(['userPlayer'])
  },
  methods: {
    startRound: function () {
      this.websocket.send(JSON.stringify({
        type: 'startRound',
        roomId: this.room.id
      }))
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

.czar-message {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 275px;
  padding: 1rem;
  background-color: #eeeeee;
  font-size: 32px;
}

.bi-gem {
  margin: 0 0.75rem;
}

.next-button {
  display: block;
  margin: 1rem auto;
}

>>> .VueCarousel-navigation-button {
  outline: none !important;
  font-size: 24px;
}

@media only screen and (max-width: 580px) {
  .game-container {
    width: 60%;
  }
  .czar-message {
    font-size: 26px;
  }
  .bi-gem {
    margin: 0 0.25rem;
  }
}

@media only screen and (max-width: 400px) {
  .game-container {
    width: 90%;
  }
}
</style>
