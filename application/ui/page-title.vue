<template>
  <header>
      <h1 :key="title">
        {{title}}
      </h1>
    <slot></slot>
  </header>
</template>

<style scoped lang="scss">
@import '../config';

header {
  --c-background: var(--c-primary-lightest);
  background: var(--c-background);
  position: relative;

  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 100%;
    width: var(--border-radius);
    height: var(--border-radius);
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
      circle at bottom left,
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

  .page-enter-active &,
  .page-leave-active & {
    transition-duration: var(--page-transition);
  }

  .page-enter & {
    transform: translateY(10px);
  }

  .page-enter-active & {
    transition-delay: var(--page-transition);
  }

  .page-enter &,
  .page-leave-active & {
    opacity: 0;
  }

  .page-leave-active & {
    transform: translateY(-10px);
  }

  @media #{$mq-big} {
    text-align: left;
  }
}
</style>

<script>
export default {
  name: `page-title`,
  props: {
    title: String,
  },
}
</script>


