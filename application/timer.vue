<template>
  <div>
    {{ currentTime | hoursMinutesSeconds }}
  </div>
</template>

<script>
import { DateTime } from 'luxon'
export default {
  data() {
    return {
      currentTime: false,
      timerId: false,
      intervalId: false,
    }
  },
  created() {
    this.setCurrentTime()
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
