<template>
  <form @submit.prevent="onSubmit" class="text-input-container">
    <b-input-group>
      <b-input-group-prepend v-if="this.$slots.prepend">
        <slot name="prepend"></slot>
      </b-input-group-prepend>
      <b-form-input
        type="text"
        :placeholder="placeholder"
        :value="text"
        @keyup="$emit('update:text', $event.target.value)"
      />
      <b-input-group-append v-if="showBtn">
        <b-button type="submit" :variant="btnColor" :disabled="this.text.length < minLength">
          <b-icon-check />
        </b-button>
      </b-input-group-append>
    </b-input-group>
  </form>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    onSubmit: Function,
    text: String,
    placeholder: String,
    minLength: {
      type: Number,
      default: 1
    },
    btnColor: {
      type: String,
      default: 'dark'
    },
    showBtn: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
>>> .input-group-prepend {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
