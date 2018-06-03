<template>
  <section>
    <div>
      <h2>set a current time</h2>
      <input type="time" v-model="userTime" />
      <button type="button" @click="restartAutomaticUpdate">
        now
      </button>
    </div>
    <t-timer-24 :currentTime="currentTime"></t-timer-24>
    <t-timer-thai :currentTime="currentTime"></t-timer-thai>
    <t-clock :currentTime="currentTime"></t-clock>
  </section>
</template>

<style scoped>
input {
  font-size: 1.5rem;
}
button {
  font-size: 1.5rem;
  background: var(--c-primary);
  color: white;
}
</style>

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
      userTime: void 0,
    }
  },
  watch: {
    userTime: function(newVal, oldVal) {
      if (!newVal) return this.beginAutomaticTimeUpdate()
      this.stopTimers()
      const [hour, minute] = newVal.split(`:`).map(val => ~~val)
      // console.log({ hour, minute })
      this.currentTime = DateTime.fromObject({ hour, minute })
    },
  },
  created() {
    this.beginAutomaticTimeUpdate()
  },
  beforeDestroy() {
    this.stopTimers()
  },
  methods: {
    setCurrentTime() {
      this.currentTime = DateTime.local()
    },
    beginAutomaticTimeUpdate() {
      this.setCurrentTime()
      // first minute may not be full
      this.timerId = window.setTimeout(() => {
        this.setCurrentTime()
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
        this.setCurrentTime()
      }, 1000)
    },
    stopTimers() {
      if (this.timerId) window.clearTimeout(this.timerId)
      if (this.intervalId) window.clearInterval(this.intervalId)
    },
  },
}
</script>

