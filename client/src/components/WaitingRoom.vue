<template>
  <div class="waiting-room-container">
    <div class="players">
      <div class="header">Players</div>
      <div v-for="player in this.players" :key="player.id" class="username">
        {{ player.username }}
        <span class="delete" @click="deleteBot(player.id)" v-if="player.isBot">&times;</span>
      </div>
      <!-- <div v-for="bot, index in this.bots" :key="`bot-${index}`" class="username">
        {{ bot }}
        <span class="delete" @click="deleteBot(index)">&times;</span>
      </div> -->
      <div v-if="this.players.length < 4">
        <b-button variant="primary" @click="addBot">Add Bot +</b-button>
      </div>
    </div>
    <b-button variant="dark" :disabled="this.players.length < 2">Start Game</b-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: function () {
    return {
      bots: []
    }
  },
  computed: {
    ...mapState(['webSocket', 'room', 'players'])
  },
  methods: {
    addBot: function () {
      this.webSocket.send(JSON.stringify({
        type: 'addBot',
        roomId: this.room.id,
        body: 'Bot'
      }))
    },
    deleteBot: function (id) {
      this.webSocket.send(JSON.stringify({
        type: 'deleteBot',
        roomId: this.room.id,
        body: id
      }))
    }
  }
}
</script>

<style scoped>
.waiting-room-container {
  margin: 1rem auto;
  width: min(90%, 500px);
}

.players {
  height: 330px;
}

.header {
  font-size: 36px;
  border-bottom: 1px solid gray;
}

.username {
  font-size: 24px;
  padding: 1rem;
}

.delete {
  cursor: pointer;
}

>>> .btn-dark {
  width: 100%;
}
</style>
