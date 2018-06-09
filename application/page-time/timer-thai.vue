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

<style scope lang="scss">
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
      const thaiTime = getThaiTime(this.currentTime)
      return thaiTime.rtgs()
    },
    thai() {
      const thaiTime = getThaiTime(this.currentTime)
      return thaiTime.thai()
    },
  },
}
</script>

