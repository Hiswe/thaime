<template>
<div>
  <svg viewBox="-1 -1 2 2" class="svg-clock">
    <defs>
      <clipPath id="clip-clock">
        <circle cx="0" cy="0" r="1" />
      </clipPath>
    </defs>
    <g clip-path="url(#clip-clock)">
      <circle cx="0" cy="0" r="1" class="svg-clock__background" />
      <path
        :class="`svg-clock__arc svg-clock__arc--${index + 1}`"
        v-for="(arc, index) of arcs"
        :key="index"
        :d="arc.pathData"
      />
      <path
        :class="`svg-clock__marker`"
        v-for="marker of hourMarkers"
        :key="marker.id"
        :d="marker.pathData"
      />
      <circle
        class="svg-clock__current-time"
        :cx="nowCoordinates.x"
        :cy="nowCoordinates.y"
        r=".05"
      />
    </g>
  </svg>
  <ul>
    <li
      v-for="period of periods"
      :key="period.name"
      :class="{active: period.isHourInPeriod(currentTime.hour)}"
    >
      <h3>{{ period.name }}</h3>
      <dl>
        <dt>period</dt>
        <dd>{{ period.start }} – {{ period.end }}</dd>
        <dt>RTGS</dt>
        <dd>{{ period.rtgs() }}</dd>
        <dt>Thaï</dt>
        <dd class="thai-text">{{ period.thai() }}</dd>
      </dl>
    </li>
  </ul>

</div>
</template>

<style scoped>
ul {
  display: grid;
  list-style: none;
  padding: 0;
  grid-gap: var(--gutter);
  grid-template-columns: repeat(4, 1fr);
}
li {
  border: 1px solid #eee;
  padding: 0 var(--gutter) var(--gutter);
}
.svg-defs {
  border: 0 !important;
  clip: rect(0 0 0 0) !important;
  height: 1px !important;
  margin: -1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
}
.svg-clock {
  width: 100%;
  max-width: 400px;
  transform: rotate(-90deg);
}
.svg-clock__background {
  fill: aliceblue;
}
.svg-clock__arc {
  stroke-width: 0.5;
  fill: none;
}
.svg-clock__arc--1 {
  stroke: hsl(261, 53%, 34%);
}
.svg-clock__arc--2 {
  stroke: hsl(283, 47%, 53%);
}
.svg-clock__arc--3 {
  stroke: hsl(73, 67%, 53%);
}
.svg-clock__arc--4 {
  stroke: hsl(12, 100%, 55%);
}
.svg-clock__arc--5 {
  stroke: hsl(34, 100%, 55%);
}
.svg-clock__arc--6 {
  stroke: hsl(199, 90%, 68%);
}
.svg-clock__arc--7 {
  stroke: hsl(226, 53%, 51%);
}
.svg-clock__current-time {
  fill: black;
}
.svg-clock__marker {
  stroke-width: 0.01;
  stroke: black;
  fill: none;
}
.active {
  background: var(--c-accent-lightest);
}
</style>

<script>
import { DateTime } from 'luxon'
import round from 'lodash.round'

import * as clockSegments from './clock-segments'
import { thaiPeriods } from './thai-hours'

function getCoordinates(percent) {
  const x = Math.cos(2 * Math.PI * percent)
  const y = Math.sin(2 * Math.PI * percent)
  return [round(x, 8), round(y, 8)]
}

const DAY_LENGTH = 24 * 60
const CURRENT_TIME_SHIFT = 0.8775
function currentTimeToCoordinates(currentTime) {
  const minutesSinceMidnight = currentTime.hour * 60 + currentTime.minute
  const [x, y] = getCoordinates(minutesSinceMidnight / DAY_LENGTH)
  return { x: x * CURRENT_TIME_SHIFT, y: y * CURRENT_TIME_SHIFT }
}

export default {
  name: `clock`,
  props: {
    currentTime: DateTime,
  },
  data() {
    return {
      periods: thaiPeriods,
      arcs: clockSegments.arcs,
      hourMarkers: clockSegments.hourMarkers,
    }
  },
  computed: {
    nowCoordinates() {
      if (!this.currentTime) return { x: 0, y: 0 }
      return currentTimeToCoordinates(this.currentTime)
    },
  },
}
</script>
