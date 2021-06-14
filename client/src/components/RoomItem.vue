<template>
  <div class="room-item-container">
    <div v-b-toggle="`collapse-${index}`" @click="onRoomClick" class="top">
      <span class="access">
        <b-icon-lock-fill v-if="room.access === 'private'" />
        <b-icon-unlock-fill v-else />
      </span>
      <span class="name">{{ room.name }}</span>
      <span class="population">{{ population }}/4</span>
    </div>
    <b-collapse v-if="room.access === 'private'" :id="`collapse-${index}`" class="bottom">
      <TextInput :onSubmit="joinPrivate" :text.sync="password" :placeholder="'Password'">
        <template #prepend>
          <b-icon-arrow-return-right />
        </template>
      </TextInput>
    </b-collapse>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TextInput from './TextInput'

export default {
  name: 'RoomItem',
  components: {
    TextInput
  },
  props: {
    room: Object,
    index: Number
  },
  data: function () {
    return {
      password: ''
    }
  },
  computed: {
    ...mapState(['websocket']),
    population: function () {
      return Object.keys(this.room.players).length
    }
  },
  methods: {
    onRoomClick: function () {
      if (this.room.access === 'public') {
        this.websocket.send(JSON.stringify({
          type: 'joinRoom',
          roomId: this.room.id
        }))
      }
    },
    joinPrivate: function () {
      this.websocket.send(JSON.stringify({
        type: 'joinRoom',
        roomId: this.room.id,
        password: this.password
      }))
    }
  }
}
</script>

<style scoped>
.top {
  padding: 1rem;
}

.top > * {
  padding: 0 1rem;
}

.population {
  float: right;
  letter-spacing: 2px;
}
</style>
