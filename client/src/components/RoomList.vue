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
      <TextInput
        :text.sync="newRoom.name"
        :onSubmit="onRoomCreate"
        :validate="validateCreate"
        :placeholder="'Create a room...'"
        class="name-input"
      >
        <template v-slot:prepend>
          <div class="access-container" @click="onAccessClick">
            <b-icon-lock-fill v-if="newRoom.access === 'private'" />
            <b-icon-unlock-fill v-else />
          </div>
        </template>
      </TextInput>
      <div v-if="newRoom.access === 'private'" class="password-container">
        <TextInput
          :text.sync="newRoom.password"
          :placeholder="'Enter a password...'"
          :btnVisible="false"
          class="password-input"
        >
          <template #prepend>
            <b-icon-arrow-return-right />
          </template>
        </TextInput>
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
    validateCreate: function () {
      if (this.newRoom.name.length < 1) {
        return false
      }
      if (this.newRoom.access === 'private' && this.newRoom.password.length < 1) {
        return false
      }
      return true
    },
    onRoomCreate: function () {
      // ws.onopen = () => {
      //   ws.send(JSON.stringify({
      //     type: 'join',
      //     room: this.newRoom.name,
      //     userId: this.user.id,
      //     body: this.newRoom
      //   }))
      // }
      console.log('creating')
    }
  }
}
</script>

<style scoped>
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

.access-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.name-input >>> .input-group-prepend {
  background-color: #3a3a3a;
}

.name-input >>> .form-control {
  background-color: #646464;
}

>>> .form-control {
  color: #eeeeee;
  font-size: 22px;
  padding: 1.5rem 1rem;
  background-color: #777777;
  border: none;
  border-radius: 0;
}

>>> .btn {
  font-size: 20px;
}

>>> .input-group-prepend {
  width: 5rem;
  background-color: #777777;
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

@media only screen and (max-width: 768px) {
  .room-list-container {
    width: 90%;
  }
}
</style>
