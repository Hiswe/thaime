<template>
  <div>
    {{ currentTime | hoursMinutesSeconds }}
  </div>
</template>

<style scoped>
div {
  font-family: monospace;
  font-size: 2rem;
  margin-top: var(--gutter);
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
