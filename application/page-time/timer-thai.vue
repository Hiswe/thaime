<template>
  <div :class="[`timer-text`, `timer-text--${currentPeriod.id}`]">
    <p class="timer-text__rtgs">{{ rtgs }}</p>
    <p :class="[
      `thai-text`,
      `timer-text__thai`,
      `timer-text__thai--${currentPeriod.id}`,
      ]"
    >
      {{ thai }}
    </p>
  </div>
</template>

<style scoped lang="scss">
@import '../config.scss';
p {
  margin: 0;
  text-align: center;
  font-size: 1.2rem;
}
.timer-text {
  &__thai {
    font-size: 1.4em;
    @each $period in $periods {
      &--#{$period} {
        color: var(--c-#{$period}-darker);
      }
    }
  }
}
</style>

<script>
import { DateTime } from 'luxon'

import { getThaiTime } from '../thai-hours'

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

