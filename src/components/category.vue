<script>
export default {
  name: `category`,
  props: {
    title: String,
  },
}
</script>

<template lang="pug">
dl.category
  dt.category__title {{title}}
  dd.category__content
    slot
</template>

<style lang="scss" scoped>
@import '~/config';

.category,
.category__content {
  margin: 0;
  padding: 0;
}
.category {
  margin-top: var(--gutter);
  background: var(--c-primary-white);
  position: relative;

  &::before {
    content: '';
    z-index: 1;
    position: absolute;
    top: -6px;
    left: -4px;
    right: -4px;
    height: 3rem;
    background: var(--c-primary-lightest);
    border-radius: calc(var(--border-radius) + 2px);
    @media #{$mq-big} {
      display: none;
    }
  }
  &__title,
  &__content {
    z-index: 2;
    position: relative;
  }
  &__title {
    font-size: 1.5rem;
    text-align: center;
    background: var(--c-primary-white);
    padding: var(--half-gutter) 0 var(--gutter);
    border-radius: var(--border-radius);
    color: var(--c-accent-darker);
    text-transform: uppercase;
    font-weight: 300;
  }
}
</style>
