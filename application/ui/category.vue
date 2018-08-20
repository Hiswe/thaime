<template lang="pug">
dl.category
  dt.category__title {{title}}
  dd.category__content
    slot
</template>

<style lang="scss" scoped>
@import '../config';

dl,
dd {
  margin: 0;
  padding: 0;
}
dl {
  padding-top: var(--gutter);
  background: var(--c-primary-white);
}
dt {
  font-size: 1.5rem;
  text-align: center;
  box-shadow: 0 -3px 0px 2px var(--c-primary-lightest);
  padding: var(--half-gutter) 0 var(--gutter);
  border-radius: var(--border-radius);
  color: var(--c-accent-darker);
  text-transform: uppercase;
  font-weight: 300;
  @media #{$mq-big} {
    box-shadow: none;
  }
}
</style>

<script>
export default {
  name: `category`,
  props: {
    title: String,
  },
}
</script>
