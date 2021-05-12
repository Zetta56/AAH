<template>
  <b-container class="login-container">
    <h1>Algorithms Against Humanity</h1>
    <form>
      <!-- <input type="text" placeholder="Enter a username..." v-model="text" />
      <button class="submitBtn">></button> -->
       <b-input-group>
        <b-form-input type="text" placeholder="Enter a username..." v-model="text" />
        <b-input-group-append>
          <b-button type="submit" variant="success" :disabled="this.text.length < 3">
            <b-icon-check />
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </form>
  </b-container>
</template>

<script>
export default {
  name: 'Login',
  data: function () {
    return {
      text: ''
    }
  }

}
</script>

<style>
h1 {
  color: #dddddd;
  font-size: 72px;
  text-align: center;
  margin-bottom: 4rem;
  line-height: 5.5rem;
  letter-spacing: 1.5px;
}

.input-group {
  border-radius: 20px;
  overflow: hidden;
  width: 80%;
  margin: 0 auto;
}

.form-control {
  border: none;
  font-size: 42px;
  padding: 3rem 2rem;
  outline: none;
  width: 80%;
}

.b-icon {
  font-size: 40px !important;
}

@media only screen and (max-width: 768px) {
  h1 {
    font-size: 60px;
  }
  .form-control {
    font-size: 26px;
    padding: 2rem 1.5rem;
  }
}
</style>
