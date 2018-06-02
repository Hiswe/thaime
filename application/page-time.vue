<template>
  <section>
    <t-timer-24 :currentTime="currentTime"></t-timer-24>
    <t-clock :currentTime="currentTime"></t-clock>
    <t-timer-thai :currentTime="currentTime"></t-timer-thai>
  </section>
</template>

<script>
import { DateTime } from 'luxon'

import Timer24 from './timer-24'
import Clock from './clock'
import TimerThai from './timer-thai'

export default {
  name: `page-time`,
  components: {
    't-timer-24': Timer24,
    't-clock': Clock,
    't-timer-thai': TimerThai,
  },
  data() {
    return {
      currentTime: DateTime.local(),
      timerId: false,
      intervalId: false,
    }
  },
  created() {
    this.planFirstTimeUpdate()
  },
  beforeDestroy() {
    if (this.timerId) window.clearTimeout(this.timerId)
    if (this.intervalId) window.clearInterval(this.intervalId)
  },
  methods: {
    setCurrentTime() {
      this.currentTime = DateTime.local()
    },
    planFirstTimeUpdate() {
      this.timerId = window.setTimeout(() => {
        this.setCurrentTime()
        this.planReccuringTimeUpdate()
        this.timerId = false
      }, this.currentTime.millisecond)
    },
    planReccuringTimeUpdate() {
      this.intervalId = window.setInterval(() => {
        this.setCurrentTime()
      }, 1000)
    },
  },
}
</script>

