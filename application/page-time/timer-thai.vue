<template>
  <div class="timer-text">
    <p>{{ rtgs }}</p>
    <p class="thai-text">{{ thai }}</p>
  </div>
</template>

<style scope lang="scss">
p {
  margin: 0;
  text-align: center;
  font-size: 1.2rem;
}
</style>

<script>
import { DateTime } from 'luxon'

import { getThaiTime } from '../thai-hours'

export default {
  name: `timer-thai`,
  props: {
    currentTime: DateTime,
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

