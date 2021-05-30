<template>
  <b-container class="login-container">
    <div>
      <h1>Algorithms Against Humanity</h1>
      <TextInput
        :onSubmit="onSubmit"
        :text.sync="username"
        :validate="validate"
        :placeholder="'Enter a username...'"
        :minLength=3
      />
    </div>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'
import api from '../api'
import TextInput from './TextInput'

export default {
  name: 'Login',
  components: {
    TextInput
  },
  data: function () {
    return {
      username: ''
    }
  },
  methods: {
    ...mapActions(['updateUser', 'updateLoginStatus', 'connectWebsocket']),
    validate: function () {
      return this.username.length >= 3
    },
    onSubmit: async function () {
      const response = await api('/api/login', {
        method: 'POST',
        body: JSON.stringify({ username: this.username })
      })
      localStorage.setItem('token', response.token)
      this.connectWebsocket({
        token: localStorage.getItem('token'),
        callback: () => {
          this.updateUser(response.user)
          this.updateLoginStatus(true)
        }
      })
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 100%;
}

h1 {
  color: #dddddd;
  font-size: 72px;
  line-height: 5.5rem;
  letter-spacing: 1.5px;
  text-align: center;
  margin-bottom: 4rem;
}

>>> .input-group {
  border-radius: 20px;
  overflow: hidden; /* hides parts cut by border-radius */
  flex-wrap: nowrap;
  width: 80%;
  margin: 0 auto;
}

>>> .form-control {
  font-size: 42px;
  width: 80%;
  padding: 3rem 2rem;
}

>>> .b-icon {
  font-size: 40px !important;
}

@media only screen and (max-width: 768px) {
  h1 {
    font-size: 60px;
  }
  >>> .form-control {
    font-size: 26px;
    padding: 2rem 1.5rem;
  }
}
</style>
