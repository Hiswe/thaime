<template>
  <div class="timer-24">
    {{ currentTime | hoursMinutesSeconds }}
  </div>
</template>

<style scoped lang="scss">
.timer-24 {
  font-size: 2rem;
  margin-top: var(--half-gutter);
  text-align: center;
  font-weight: 200;
}
</style>

<script>
import { DateTime } from 'luxon'

export default {
  name: `timer-24`,
  props: {
    currentTime: DateTime,
  },
}
</script>
