<template>
  <div class="room-list-container">
    <div class="headers">
      <span><b-icon-shield-lock-fill /></span>
      <span>Room Name</span>
      <span><b-icon-person-fill /></span>
    </div>
    <div class="room-list">
      <RoomItem
        v-for="room, index in rooms"
        :key="index"
        :room="room"
        :index="index"
      />
    </div>
    <div class="room-create">
      <div class="access-container" @click="onAccessClick">
        <b-icon-lock-fill v-if="newRoom.access === 'private'" />
        <b-icon-unlock-fill v-else />
      </div>
      <TextInput
        :text.sync="newRoom.name"
        :placeholder="'Create a room...'"
        class="name-input"
      />
      <div v-if="newRoom.access === 'private'" class="password-container">
        <div class="arrow-container">
          <b-icon-arrow-return-right />
        </div>
        <TextInput
          :text.sync="newRoom.password"
          :placeholder="'Enter a password...'"
          :show-btn="false"
          class="password-input"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import RoomItem from './RoomItem'
import TextInput from './TextInput'

export default {
  data: function () {
    return {
      rooms: [
        { access: 'public', name: 'test 1', population: '1' },
        { access: 'private', name: 'test 2', population: '3' },
        { access: 'public', name: 'test 3', population: '2' },
        { access: 'public', name: 'test 1', population: '1' },
        { access: 'private', name: 'test 2', population: '3' },
        { access: 'public', name: 'test 3', population: '2' },
        { access: 'public', name: 'test 1', population: '1' },
        { access: 'private', name: 'test 2', population: '3' },
        { access: 'public', name: 'test 3', population: '2' },
        { access: 'public', name: 'test 1', population: '1' },
        { access: 'private', name: 'test 2', population: '3' },
        { access: 'public', name: 'test 3', population: '2' }
      ],
      newRoom: {
        name: '',
        access: 'public',
        password: ''
      }
    }
  },
  components: {
    RoomItem,
    TextInput
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onAccessClick: function () {
      if (this.newRoom.access === 'public') {
        this.newRoom.access = 'private'
      } else {
        this.newRoom.access = 'public'
      }
    },
    createWebSocket: function () {
      const ws = new WebSocket(this.getWebSocketURL())
      ws.onopen = (event) => {
        console.log('connected')
        // ws.send(JSON.stringify({ room: 'testroom', body: this.user.username }))
      }
      ws.onmessage = (event) => {
        console.log(JSON.parse(event.data))
      }
    },
    getWebSocketURL: function () {
      let baseUrl = process.env.VUE_APP_BACKEND_URL || window.location.origin
      if (baseUrl.substring(0, 4) === 'http') {
        baseUrl = baseUrl.replace('http', 'ws')
      }
      return baseUrl
    }
  }
}
</script>

<style scoped>
/* List */
.room-list-container {
  width: 50%;
  margin: 15vh auto 0 auto;
  color: white;
  font-size: 24px;
  background-color: #444444;
}

.room-list {
  height: 500px;
  overflow-y: scroll;
}

.headers {
  background-color: #2a2a2a;
  padding: 1rem;
}

.headers span {
  padding: 0 1rem;
}

.headers :nth-child(3) {
  float: right;
  margin-right: 22px;
}

/* Create Form (Top) */
.room-create {
  display: flex;
  flex-wrap: wrap;
}

.room-create .b-icon {
  height: 100%;
}

.room-create .access-container {
  background-color: #555555;
  align-self: stretch;
  text-align: center;
  cursor: pointer;
  flex-basis: 5.5rem;
}

.room-create .name-input,
.room-create .password-input {
  flex-grow: 1;
  margin-left: -1rem;
}

.name-input >>> .form-control {
  background-color: #555555;
}

/* Create Form (Bottom) */
.room-create .password-container {
  display: flex;
  width: 100%;
}

.room-create .arrow-container {
  background-color: #777777;
  align-self: stretch;
  text-align: center;
  flex-basis: 5.5rem;
}

.room-create .password-input {
  flex-grow: 1;
}

/* Input Settings */
>>> .form-control {
  color: #eeeeee;
  font-size: 22px;
  padding: 1.5rem 1rem;
  background-color: #777777;
  border: none;
  border-radius: 0;
}

>>> ::placeholder {
  color: #cccccc;
}

>>> :-ms-input-placeholder {
  color: #cccccc;
}

>>> ::-ms-input-placeholder {
  color: #cccccc;
}

>>> .btn {
  font-size: 20px;
}

@media only screen and (max-width: 768px) {
  .room-list-container {
    width: 90%;
  }
}
</style>
