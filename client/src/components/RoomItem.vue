<template>
  <div class="room-item-container">
    <div v-b-toggle="`collapse-${index}`" @click="onRoomClick" class="top">
      <span class="access">
        <b-icon-lock-fill v-if="room.access === 'private'" />
        <b-icon-unlock-fill v-else />
      </span>
      <span class="name">{{ room.name }}</span>
      <span class="population">{{ room.population }}/4</span>
    </div>
    <b-collapse v-if="room.access === 'private'" :id="`collapse-${index}`" class="bottom">
      <TextInput :text.sync="password" :placeholder="'Password'" />
    </b-collapse>
  </div>
</template>

<script>
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
  methods: {
    onRoomClick: function () {
      if (this.room.access === 'public') {
        console.log('public room')
      }
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
