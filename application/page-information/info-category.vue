<template>
  <dl class="category">
    <dt>{{title}}</dt>
    <dd>
      <slot />
    </dd>
  </dl>
</template>

<style lang="scss" scoped>
dt,
dd {
  margin: 0;
  padding: 0;
}
dt {
  font-size: 1.25rem;
  text-align: center;
  font-weight: 300;
  text-transform: uppercase;
  padding-bottom: var(--half-gutter);
}
</style>

<script>
export default {
  name: `info-category`,
  props: {
    title: String,
  },
}
</script>
