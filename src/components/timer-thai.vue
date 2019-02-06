<script>
import { DateTime } from 'luxon'

import { getThaiTime } from '~/utils/thai-hours'

export default {
  name: `timer-thai`,
  props: {
    currentTime: DateTime,
    currentPeriod: Object,
  },
  computed: {
    rtgs() {
      return getThaiTime(this.currentTime).rtgs()
    },
    thai() {
      return getThaiTime(this.currentTime).thai()
    },
  },
}
</script>

<template lang="pug">
.timer-text(:class="`timer-text--${currentPeriod.id}`")
  p.timer-text__rtgs {{ rtgs }}
  p.thai-text.timer-text__thai(
    :class="`timer-text__thai--${currentPeriod.id}`"
  ) {{ thai }}
</template>

<style scoped lang="scss">
@import '../config.scss';

.timer-text {
  --timer-color: var(--c-primary-lihtest);
  padding-top: var(--quarter-gutter);
  padding-bottom: calc(var(--navigation-height) + var(--navigation-margin));
  position: relative;
  background: var(--timer-color);

  @media #{$mq-big} {
    padding-top: var(--half-gutter);
    padding-bottom: var(--half-gutter);
  }

  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 100%;
    width: var(--border-radius);
    height: var(--border-radius);
  }
  &::before {
    left: 0;
    background: radial-gradient(
      circle at top right,
      transparent 68%,
      var(--timer-color) 70%
    );
  }
  &::after {
    right: 0;
    background: radial-gradient(
      circle at top left,
      transparent 68%,
      var(--timer-color) 70%
    );
  }

  @each $period in $periods {
    &--#{$period} {
      --timer-color: var(--c-#{$period}-lighter);
    }
  }

  &__rtgs {
    font-size: 1.5em;
    color: var(--c-text);
  }
  &__thai {
    font-size: 1.2em;
    // add this tiny padding for Thai descendant in “ทุ่ม”
    padding-bottom: 3px;

    @each $period in $periods {
      &--#{$period} {
        color: var(--c-#{$period}-darker);
      }
    }
  }
}
p {
  margin: 0;
  text-align: center;
  font-size: 1.2rem;
}
</style>
