<template>
  <b-container class="game-container" ref="test">
    <b-modal
      id="scoreboard"
      ref="scoreboard"
      title="Scoreboard"
      :hide-footer="true"
      centered
    >
      <div v-for="player, index in players" :key="index" class="row">
        <span class="username">
          {{ player.username }} <b-icon-gem v-if="player.isCzar" />
        </span>
        <span class="score">{{ player.score }}</span>
      </div>
    </b-modal>
    <div class="top-row">
      <b-button variant="dark" class="scoreboard-button" v-b-modal.scoreboard>
        Scoreboard
      </b-button>
    </div>
    <SharedCards />
    <Hand v-if="!userPlayer.isCzar" />
    <div v-else class="czar-message">
      <span>
        You are the Card Czar <b-icon-gem />
      </span>
    </div>
    <b-button variant="dark" class="next-button" @click="endGame" v-if="finished">
      Replay
    </b-button>
    <b-button variant="dark" class="next-button" @click="startRound" v-else-if="room.phase === 'results'">
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
      finished: false,
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
    },
    endGame: function () {
      this.websocket.send(JSON.stringify({
        type: 'endGame',
        roomId: this.room.id
      }))
    }
  },
  watch: {
    '$store.state.players': function () {
      this.players.forEach(player => {
        if (player.score >= 3) {
          this.$refs.scoreboard.show()
          this.finished = true
        }
      })
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

.scoreboard-button {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  font-size: 20px;
}

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
