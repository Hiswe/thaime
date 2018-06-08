<template>
  <header>
    <h1>
      <slot></slot>
    </h1>
  </header>
</template>

<style scoped lang="scss">
header {
  --round-size: 1rem;
  --c-background: var(--c-primary-lightest);
  background: var(--c-background);
  position: relative;

  &::before,
  &::after {
    content: '';
    display: block;

    position: absolute;
    top: 100%;
    width: var(--round-size);
    height: var(--round-size);
  }
  &::before {
    left: 0;
    background: radial-gradient(
      circle at bottom right,
      transparent 68%,
      var(--c-background) 70%
    );
  }
  &::after {
    right: 0;
    background: radial-gradient(
      circle farthest-corner at bottom left,
      transparent 68%,
      var(--c-background) 70%
    );
  }
}
h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 300;
  text-transform: uppercase;
  padding: var(--half-gutter) var(--gutter);
  text-align: center;
  color: var(--c-primary);
}
</style>

<script>
export default {
  name: `page-title`,
}
</script>


