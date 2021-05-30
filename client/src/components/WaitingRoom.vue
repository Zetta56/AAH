<template>
  <div class="waiting-room-container">
    <div class="players">
      <div class="header">Players</div>
      <div v-for="player in this.players" :key="player.id" class="username">
        {{ player.username }}
        <span class="delete" @click="deleteBot(player.id)" v-if="player.isBot">&times;</span>
      </div>
      <div v-if="this.players.length < 4">
        <b-button variant="primary" @click="addBot">Add Bot +</b-button>
      </div>
    </div>
    <b-button variant="dark" :disabled="this.players.length < 3" @click="startGame">
      Start Game
    </b-button>
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
    ...mapState(['websocket', 'room', 'players'])
  },
  methods: {
    addBot: function () {
      this.websocket.send(JSON.stringify({
        type: 'addBot',
        roomId: this.room.id,
        body: 'Bot'
      }))
    },
    deleteBot: function (id) {
      this.websocket.send(JSON.stringify({
        type: 'deleteBot',
        roomId: this.room.id,
        body: id
      }))
    },
    startGame: function () {
      this.websocket.send(JSON.stringify({
        type: 'startGame',
        roomId: this.room.id
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
  height: 350px;
}

.header {
  font-size: 36px;
  border-bottom: 1px solid gray;
}

.username {
  font-size: 28px;
  padding: 1rem;
}

.delete {
  cursor: pointer;
}

>>> .btn-dark {
  width: 100%;
}
</style>
