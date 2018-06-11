<template>
  <dl class="category">
    <dt class="category__title">
      {{title}}
    </dt>
    <dd class="category__content">
      <slot />
    </dd>
  </dl>
</template>

<style lang="scss" scoped>
dl,
dd {
  margin: 0;
  padding: 0;
}
dl {
  padding-top: var(--gutter);
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
