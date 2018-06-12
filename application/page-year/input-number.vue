<template>
  <div>
    <label :for="id">
      {{title}}
    </label>
    <div class="input">
      <input
        :id="id"
        type="number"
        v-model.number="localValue"
        min="0"
      />
      <button class="decrease" type="button"  @click="localValue -= 1">
        <t-icon name="remove-circle" />
      </button>
      <button class="increase" type="button" @click="localValue += 1">
        <t-icon name="add-circle" />
      </button>
    </div>
  </div>
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
  grid-template-columns: 2rem 1fr 2rem;
  width: 65%;
  max-width: 400px;
  margin: 0.5rem auto 0;
}
.decrease {
  grid-column: 1;
  grid-row: 1;
}
button {
  color: var(--c-accent);
  background: none;
  border: none;
  text-align: center;
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
        console.log({ value })
        this.$emit(`input`, value)
      },
    },
  },
}
</script>

