<template>
  <section class="page-content">
    <t-page-title>
      Clock
    </t-page-title>
    <div>
      <t-timer-24 :currentTime="currentTime"></t-timer-24>
      <t-clock
        :currentTime="currentTime"
        @change="setHour"
      >
        <transition name="fade">
          <t-svg-icons
            name="restore"
            class="restore-button"
            :scale="3"
            v-if="isManualHour"
          />
        </transition>
      </t-clock>
      <t-timer-thai :currentTime="currentTime"></t-timer-thai>
    </div>
  </section>
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

  path {
    stroke-width: 0.5;
    stroke: white;
  }
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
  height: calc(100vh - var(--navigation-height));
}
div {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
}
.clock {
  width: 100%;
}
.timer-24 {
  margin-bottom: auto;
}
.timer-text {
  margin-top: auto;
}
</style>

<script>
import { DateTime } from 'luxon'

import svgIcons from '../ui/svg-icons'
import pageTitle from '../ui/page-title'
import Timer24 from './timer-24'
import Clock from './clock'
import TimerThai from './timer-thai'

export default {
  name: `page-time`,
  components: {
    't-timer-24': Timer24,
    't-clock': Clock,
    't-timer-thai': TimerThai,
    't-svg-icons': svgIcons,
    't-page-title': pageTitle,
  },
  data() {
    return {
      currentTime: DateTime.local(),
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
    setCurrentTime() {
      this.currentTime = DateTime.local()
    },
    setHour(hour) {
      if (hour === false) return this.beginAutomaticTimeUpdate()
      const isValidHour = Number.isInteger(hour) && hour >= 0 && hour < 24
      if (!isValidHour) return
      this.stopTimers()
      this.currentTime = DateTime.fromObject({ hour, minutes: 30 })
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
      this.timerId = false
      this.intervalId = false
    },
  },
}
</script>

