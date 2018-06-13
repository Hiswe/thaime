<template>
  <header>
    <transition
      name="title"
      mode="out-in"
      appear
    >
      <h1 :key="title">
        {{title}}
      </h1>
    </transition>
    <slot></slot>
  </header>
</template>

<style scoped lang="scss">
@import '../config';

.title {
  &-enter-active,
  &-leave-active {
    transition: transform 0.75s ease, opacity 0.75s ease;
  }
  &-enter,
  &-leave-active {
    opacity: 0.5;
    transform: translateY(-10px);

    @media #{$mq-big} {
      transform: translateX(10px);
    }
  }
}

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


