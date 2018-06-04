<template>
<div>
  <svg :viewBox="viewbox" class="svg-clock">
    <defs>
      <clipPath id="clip-clock">
        <circle cx="0" cy="0" r="100" />
      </clipPath>
    </defs>
    <g clip-path="url(#clip-clock)">
      <circle cx="0" cy="0" r="100" class="svg-clock__background" />
      <path
        v-for="arc of arcs"
        :key="arc.id"
        :class="[
          `svg-clock__arc`,
          `svg-clock__arc--${arc.id}`
        ]"
        :d="arc.pathData"
      />
      <path
        v-for="marker of hourMarkers"
        :key="marker.id"
        :class="[
          `svg-clock__marker `,
          `svg-clock__marker--${marker.name}`,
          `${ marker.isFirstPeriodMarker ? `svg-clock__marker--is-first` : `` }`
        ]"
        :d="marker.pathData"
      />
      <circle
        class="svg-clock__current-time"
        :cx="nowCoordinates.x"
        :cy="nowCoordinates.y"
        r="5"
      />
    </g>
    <text
      v-for="(marker) of hourMarkers"
      :key="`${marker.id}-th`"
      :class="[
        `svg-clock__thai-hour`,
        `svg-clock__thai-hour--${marker.name}`,
        `${ marker.isFirstPeriodMarker ? `svg-clock__thai-hour--is-first` : `` }`
      ]"
      :x="marker.textX"
      :y="marker.textY"
      text-anchor="middle"
    >
      {{marker.thaiHour}}
    </text>
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

<style>
:root {
  --c-midnight: rgb(60, 57, 125);
  --c-midnight-darker: hsl(243, 37%, 36%);
  --c-late-night: hsl(266, 37%, 56%);
  --c-late-night-darker: hsl(266, 37%, 45%);
  --c-morning: hsl(55, 53%, 58%);
  --c-morning-darker: hsl(55, 53%, 45%);
  --c-noon: hsl(12, 68%, 56%);
  --c-noon-darker: hsl(12, 68%, 40%);
  --c-afternoon: hsl(32, 77%, 61%);
  --c-afternoon-darker: hsl(32, 76%, 55%);
  --c-sunset: hsl(339, 91%, 83%);
  --c-sunset-darker: hsl(339, 94%, 75%);
  --c-night: hsl(209, 47%, 50%);
  --c-night-darker: hsl(209, 48%, 40%);
}
</style>

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
  border: 1px solid black;
}
.svg-clock__background {
  fill: aliceblue;
}
.svg-clock__arc {
  stroke-width: 50;
  fill: none;
}
.svg-clock__arc--arc-midnight {
  stroke: var(--c-midnight);
}
.svg-clock__arc--arc-late-night {
  stroke: var(--c-late-night);
}
.svg-clock__arc--arc-morning {
  stroke: var(--c-morning);
}
.svg-clock__arc--arc-noon {
  stroke: var(--c-noon);
}
.svg-clock__arc--arc-afternoon {
  stroke: var(--c-afternoon);
}
.svg-clock__arc--arc-sunset {
  stroke: var(--c-sunset);
}
.svg-clock__arc--arc-night {
  stroke: var(--c-night);
}
.svg-clock__current-time {
  fill: black;
}
.svg-clock__marker {
  stroke-width: 1;
  fill: none;
}
.svg-clock__marker--midnight {
  stroke: var(--c-midnight-darker);
}
.svg-clock__marker--late-night {
  stroke: var(--c-late-night-darker);
}
.svg-clock__marker--morning {
  stroke: var(--c-morning-darker);
}
.svg-clock__marker--noon {
  stroke: var(--c-noon-darker);
}
.svg-clock__marker--afternoon {
  stroke: var(--c-afternoon-darker);
}
.svg-clock__marker--sunset {
  stroke: var(--c-sunset-darker);
}
.svg-clock__marker--night {
  stroke: var(--c-night-darker);
}
.svg-clock__marker--is-first {
  stroke-width: 2;
  stroke: white;
}
.svg-clock__thai-hour {
  font-size: 0.8em;
  /* translate fro taking care of the letter height */
  transform: translateY(0.4em);
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

const SVG_MARGIN = 0.25
const viewbox = [-1, -1, 2, 2].map(
  val => val * clockSegments.SVG_SIZE * (1 + SVG_MARGIN)
)

export default {
  name: `clock`,
  props: {
    currentTime: DateTime,
  },
  data() {
    return {
      periods: thaiPeriods,
      viewbox: viewbox.join(` `),
      arcs: clockSegments.arcs,
      hourMarkers: clockSegments.hourMarkers,
    }
  },
  computed: {
    nowCoordinates() {
      if (!this.currentTime) return { x: 0, y: 0 }
      return clockSegments.currentTimeToCoordinates(this.currentTime)
    },
  },
}
</script>
