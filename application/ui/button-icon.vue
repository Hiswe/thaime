<template lang="pug">
button.button-icon(type="button" @click="$emit(`click`)")
  t-icon(:name="icon" :scale="1.5")
</template>

<style lang="scss" scoped>
.button-icon {
  color: var(--c-accent);
  background: none;
  border: none;
  text-align: center;
  padding: 0;

  &:active {
    color: var(--c-accent-darker);

    .svg-symbol {
      transform: scale(1.2);
    }
  }
  .svg-symbol {
    transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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

