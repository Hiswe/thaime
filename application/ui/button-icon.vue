<template>
  <button type="button" @click="$emit(`click`)">
    <t-icon :name="icon"></t-icon>
  </button>
</template>

<style lang="scss" scoped>
button {
  --svg-icon-scale: 1.5;
  color: var(--c-accent);
  background: none;
  border: none;
  text-align: center;
  padding: 0;

  &:active {
    color: var(--c-accent-darker);
  }
}
</style>


<script>
export default {
  name: `button-icon`,
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
}
</script>

