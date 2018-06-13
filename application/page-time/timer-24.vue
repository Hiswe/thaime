<template>
  <div
    :class="[`timer-24`, `timer-24--${timeFormat}`]"
    @click="toggleFormat"
  >{{ displayedTime }}</div>
</template>

<style scoped lang="scss">
.timer-24 {
  font-size: 2rem;
  margin-top: var(--half-gutter);
  text-align: center;
  font-weight: 300;
  color: var(--c-primary-lighter);
  // https://www.client9.com/css-system-font-stack-monospace-v2/
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier,
    monospace;
  text-transform: lowercase;

  // try to keep the hour centered
  &--time::before {
    content: '   ';
    white-space: pre;
  }
}
</style>

<script>
import { DateTime } from 'luxon'

const formats = {
  time: DateTime.TIME_WITH_SECONDS,
  'time-24': DateTime.TIME_24_WITH_SECONDS,
}

export default {
  name: `timer-24`,
  props: {
    currentTime: DateTime,
  },
  data() {
    return {
      timeFormat: `time-24`,
    }
  },
  computed: {
    displayedTime() {
      const isLuxonDateTime = this.currentTime instanceof DateTime
      if (!isLuxonDateTime) return `00:00:00`
      return this.currentTime
        .setLocale(`en`)
        .toLocaleString(formats[this.timeFormat])
    },
  },
  methods: {
    toggleFormat() {
      this.timeFormat = this.timeFormat === `time-24` ? `time` : `time-24`
    },
  },
}
</script>
