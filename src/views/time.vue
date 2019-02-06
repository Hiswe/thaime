<script>
import { DateTime } from 'luxon'

import { getThaiTime } from '~/utils/thai-hours'
import Timer24 from '~/components/timer-24'
import Clock from '~/components/clock'
import TimerThai from '~/components/timer-thai'

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
      currentPeriod: {},
      timerId: false,
      intervalId: false,
    }
  },
  computed: {
    isManualHour() {
      return !this.timerId && !this.intervalId
    },
  },
  created() {
    this.beginAutomaticTimeUpdate()
  },
  beforeDestroy() {
    this.stopTimers()
  },
  methods: {
    setCurrentTime(luxonTime) {
      this.currentTime = luxonTime
      this.currentPeriod = getThaiTime(luxonTime)
    },
    setHour(hour) {
      if (hour === false) return this.beginAutomaticTimeUpdate()
      const isValidHour = Number.isInteger(hour) && hour >= 0 && hour < 24
      if (!isValidHour) return
      this.stopTimers()
      this.setCurrentTime(DateTime.fromObject({ hour, minutes: 0 }))
    },
    beginAutomaticTimeUpdate() {
      this.setCurrentTime(DateTime.local())
      // first minute may not be full
      this.timerId = window.setTimeout(() => {
        this.setCurrentTime(DateTime.local())
        this.planReccuringTimeUpdate()
        this.timerId = false
      }, this.currentTime.millisecond)
    },
    restartAutomaticUpdate() {
      if (!this.userTime) return
      this.userTime = void 0
    },
    planReccuringTimeUpdate() {
      this.intervalId = window.setInterval(() => {
        this.setCurrentTime(DateTime.local())
      }, 1000)
    },
    stopTimers() {
      if (this.timerId) window.clearTimeout(this.timerId)
      if (this.intervalId) window.clearInterval(this.intervalId)
      this.timerId = false
      this.intervalId = false
    },
  },
}
</script>

<template lang="pug">
section.page-content
  t-page-title(title="clock")
  .content-body
    t-timer-24(:currentTime="currentTime" @change="setHour")
    t-clock(
      :currentTime="currentTime"
      @change="setHour"
    )
      transition(name="fade")
        t-icon.restore-button(
          name="restore"
          v-if="isManualHour"
          :scale="3"
        )
    t-timer-thai(
      :currentTime="currentTime"
      :currentPeriod="currentPeriod"
    )
</template>

<style lang="scss">
.restore-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 2;
  color: var(--c-accent);
  stroke-width: 0.5;
  stroke: white;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

<style scoped lang="scss">
.page-content {
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--vh-offset));
}
.content-body {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
}
.clock {
  width: 100%;
  flex: 1 1 auto;
  height: calc(100vh - 250px - var(--vh-offset));
}
.restore-button {
  --svg-icon-scale: 3;
}
</style>
