<template>
  <b-container class="game-container">
    <Carousel
      :paginationEnabled="false"
      :perPageCustom="[[1100, 4], [991, 3], [580, 2], [0, 1]]"
      :navigationEnabled="true"
      :centerMode="true"
      class="shownCards"
    >
      <slide>
        <div class="dark card">{{ prompt }}</div>
      </slide>
      <slide v-for="i in playedCards" :key="i">
        <div class="gray card"></div>
      </slide>
    </Carousel>
    <Carousel
      :paginationEnabled="false"
      :perPageCustom="[[1100, 4], [991, 3], [580, 2], [0, 1]]"
      :navigationEnabled="true"
      class="hand"
    >
      <slide v-for="card, index in hand" :key="index">
        <div class="light card">{{ card }}</div>
      </slide>
    </Carousel>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
import { Carousel, Slide } from 'vue-carousel'

export default {
  components: {
    Carousel,
    Slide
  },
  data: function () {
    return {
      prompt: 'Default Prompt',
      playedCards: 3,
      hand: [
        'card 1',
        'card 2',
        'card 3',
        'card 4',
        'card 5'
      ]
    }
  },
  computed: {
    ...mapState(['websocket', 'room'])
  }
}
</script>

<style scoped>
.shownCards {
  width: 90%;
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

.light.card {
  border: 1px solid #222222;
}

.hand {
  width: 90%;
  margin: auto;
}

.card {
  width: calc(100% - 1rem);
  height: 300px;
  padding: 1rem;
  font-size: 24px;
  margin: auto;
}

>>> .VueCarousel-navigation-button {
  outline: none !important;
  font-size: 24px;
}

@media only screen and (max-width: 580px) {
  .hand,
  .shownCards {
    width: 60%;
  }
}
</style>
