<script>
export default {
  name: `input-number`,
  props: {
    title: String,
    value: Number,
  },
  computed: {
    id() {
      return this.title
        .trim()
        .toLowerCase()
        .replace(/\s/g, `-`)
    },
    localValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit(`input`, value)
      },
    },
  },
  methods: {
    removeInputFocus() {
      this.$refs.input.blur()
    },
  },
}
</script>

<template lang="pug">
form(@submit.prevent="removeInputFocus")
  label(:for="id") {{title}}
  .input
    input(
      :id="id"
      type="number"
      v-model.number="localValue"
      ref="input"
      @focus="$event.target.select()"
      min="0"
    )
    t-button-icon.decrease(icon="remove-circle" @click="localValue -= 1")
    t-button-icon.increase(icon="add-circle" @click="localValue += 1")
</template>

<style lang="scss" scoped>
label {
  display: block;
  text-align: center;
  font-size: 1.25rem;
  text-transform: uppercase;
  font-weight: 300;
  color: var(--c-text-lighter);
}
.input {
  display: grid;
  grid-template-columns: 3rem 1fr 3rem;
  width: 95%;
  max-width: 400px;
  margin: 0.5rem auto 0;
}
.decrease {
  grid-column: 1;
  grid-row: 1;
}
input {
  text-align: center;
  display: block;
  font-size: 2rem;
  font-family: monospace;
  width: 100%;
  grid-column: 2;
  border: 0;
  border-radius: var(--border-radius-small);
  -moz-appearance: textfield;

  &:focus {
    outline: none;
    color: var(--c-primary-lighter);
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>
