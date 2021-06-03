<template>
  <div class="hand-container">
    <!-- Mouse/touch drag is a bit buggy -->
    <Carousel
      :paginationEnabled="false"
      :navigationEnabled="true"
      :mouseDrag="false"
      :touchDrag="false"
      :perPageCustom="[[1200, 4], [991, 3], [580, 2], [0, 1]]"
      :speed="250"
      class="hand"
    >
      <slide v-for="card, index in cards" :key="index">
        <div
          class="light card"
          :class="{ outlined: pickedCard && pickedCard.text === card }"
          @click="pickCard(card, index)"
        >
          {{ card }}
        </div>
      </slide>
    </Carousel>
    <b-button
      variant="dark"
      :disabled="!pickedCard"
      v-if="players.find(player => player.id === user.id)['card'] === ''"
      @click="submitCard"
      class="submit-button"
    >
      Select
    </b-button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Carousel, Slide } from 'vue-carousel'

export default {
  components: {
    Carousel,
    Slide
  },
  props: {
    cards: Array
  },
  data: function () {
    return {
      pickedCard: null
    }
  },
  computed: {
    ...mapState(['websocket', 'user', 'room', 'players'])
  },
  methods: {
    ...mapActions(['updateHand']),
    pickCard: function (text, index) {
      if (this.room.phase === 'playing') {
        if (this.pickedCard !== text) {
          this.pickedCard = { text: text, index: index }
        } else {
          this.pickedCard = null
        }
      }
    },
    submitCard: function () {
      // Separated from websocket action to gain access to index
      const newHand = this.cards.filter((el, i) => i !== this.pickedCard.index)
      this.updateHand(newHand)
      this.websocket.send(JSON.stringify({
        type: 'submitCard',
        roomId: this.room.id,
        body: this.pickedCard.text
      }))
    }
  }
}
</script>

<style scoped>
.hand-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.hand {
  width: 100%;
}

.submit-button {
  padding: 0.5rem 1rem;
}

.light.card {
  border: 1px solid #222222;
  cursor: pointer;
}

.card {
  width: calc(100% - 1rem);
  height: 275px;
  padding: 1rem;
  margin: 0.5rem auto;
}

.outlined {
  box-shadow: 0 0 10px black;
}
</style>
