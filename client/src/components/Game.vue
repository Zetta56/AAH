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
        <div v-if="room.phase === 'results'">
          <div class="results card" :class="resultColor(card)">
            {{ card.text }}
          </div>
          <div class="username">
            {{ players.find(player => player.id === card.id).username }}'s Card
          </div>
        </div>
        <div class="gray picking card" v-else-if="room.phase === 'picking'" @click="pickCard(card.id)">
          {{ card.text }}
        </div>
        <div class="gray card" v-else>
          {{ card.id === user.id ? card.text : '' }}
        </div>
      </slide>
    </Carousel>
    <Hand :cards="hand" v-if="!userPlayer.czar" />
    <div class="czar-message" v-else>
      <span>
        You are the Card Czar <b-icon-gem />
      </span>
    </div>
  </b-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
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
    ...mapState(['websocket', 'user', 'room', 'hand', 'players']),
    ...mapGetters(['userPlayer']),
    submitted: function () {
      const cards = []
      this.players.forEach(player => {
        if (player.card !== '') {
          cards.push({ text: player.card, id: player.id })
        }
      })
      return cards
    }
  },
  methods: {
    pickCard: function (id) {
      this.websocket.send(JSON.stringify({
        type: 'pickCard',
        roomId: this.room.id,
        body: id
      }))
    },
    resultColor: function (card) {
      if (this.room.winner === card.id) {
        return 'green'
      } else {
        return 'red'
      }
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

.shown-cards .username {
  text-align: center;
  padding: 0.5rem 0;
}

.dark.card {
  background-color: #222222;
  color: white;
}

.gray.card {
  background-color: #dddddd;
  border: none;
}

.red.card {
  background-color: #ebbab7;
}

.green.card {
  background-color: #bbedbd;
}

.gray.picking.card {
  cursor: pointer;
}

.card {
  width: calc(100% - 1rem);
  height: 275px;
  padding: 1rem;
  margin: auto;
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
