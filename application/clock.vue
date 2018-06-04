<template>
<div>
  <svg :viewBox="viewbox" class="svg-clock">
    <defs>
      <clipPath id="clip-clock">
        <circle cx="0" cy="0" r="100" />
      </clipPath>
    </defs>
    <g id="arcs-with-marker" clip-path="url(#clip-clock)">
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
          `svg-clock__marker`,
          `svg-clock__marker--${marker.name}`,
          `${ marker.isFirstPeriodMarker ? `svg-clock__marker--is-first` : `` }`
        ]"
        :d="marker.pathData"
      />
    </g>
    <circle
      class="svg-clock__current-time"
      :cx="nowCoordinates.x"
      :cy="nowCoordinates.y"
      r="5"
    />
    <g id="thai-numbers">
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
    </g>
    <g id="24-hour-numbers">
      <circle
        v-for="i18nHour of internationalHours"
        :key="`${i18nHour.id}-bg`"
        class="svg-clock__24-hour-background"
        :cx="i18nHour.cx"
        :cy="i18nHour.cy"
        :r="i18nHour.bgSize"
      />
      <text
        v-for="i18nHour of internationalHours"
        :key="`${i18nHour.id}`"
        class="svg-clock__24-hour"
        :x="i18nHour.x"
        :y="i18nHour.y"
        text-anchor="middle"
      >
        {{i18nHour.hour}}
      </text>
    </g>
    <g id="periods-name">
      <path
        v-for="periodName of periodNames"
        :id="periodName.pathId"
        :key="periodName.pathId"
        :class="[
          `svg-clock__period-name_path`,
        ]"
        :d="periodName.pathData"
      />
      <text
        v-for="periodName of periodNames"
        :key="periodName.nameId"
        :class="[
          `svg-clock__period-name_text`,
          `svg-clock__period-name_text--${periodName.id}`,
        ]"
        text-anchor="middle"
      >
        <textPath
          :href="`#${periodName.pathId}`"
          startOffset="50%"
        >
          <tspan
            v-if="periodName.text.length > 1"
            v-for="(line, index) of periodName.text"
            x="9.5%"
            :dy="`${index * 1 }em`"
            :key="`${line}-${index}`"
          >
            {{line}}
          </tspan>
          <tspan v-if="periodName.text.length < 2">
            {{periodName.text[0]}}
          </tspan>
        </textPath>
      </text>
    </g>
  </svg>
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

<style scoped lang="scss">
$periods: 'midnight', 'late-night', 'morning', 'noon', 'afternoon', 'sunset',
  'night';
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

  &__current-time {
    fill: red;
    stroke-width: 1px;
    stroke: white;
  }
  &__background {
    fill: #dcf5ff;
  }
  &__arc {
    stroke-width: 50;
    fill: none;

    @each $period in $periods {
      &--arc-#{$period} {
        stroke: var(--c-#{$period});
      }
    }
  }
  &__marker {
    stroke-width: 1;
    fill: none;

    @each $period in $periods {
      &--#{$period} {
        stroke: var(--c-#{$period}-darker);
      }
    }
    &--is-first {
      stroke-width: 2;
      stroke: white;
    }
  }
  &__thai-hour {
    font-size: 0.6em;
    /* translate for taking care of the letter height */
    transform: translateY(0.4em);

    @each $period in $periods {
      &--#{$period} {
        fill: var(--c-#{$period}-darker);
      }
    }

    &--is-first {
      font-size: 0.8em;
      font-weight: bold;
    }
  }
  &__24-hour {
    font-size: 0.6em;
    /* translate for taking care of the letter height */
    transform: translateY(0.35em);
    &-background {
      fill: white;
    }
  }
  &__period-name {
    &_path {
      fill: none;
      stroke-width: 0;
    }
    &_text {
      text-align: center;
      text-transform: uppercase;
      font-size: 0.7em;
      font-weight: bold;

      @each $period in $periods {
        &--#{$period} {
          fill: var(--c-#{$period}-darker);
        }
      }
    }
  }
}
</style>

<script>
import { DateTime } from 'luxon'
import round from 'lodash.round'

import * as clockSegments from './clock-segments'
import { thaiPeriods } from './thai-hours'

const SVG_MARGIN = 0.5
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
      viewbox: viewbox.join(` `),
      arcs: clockSegments.arcs,
      hourMarkers: clockSegments.hourMarkers,
      internationalHours: clockSegments.internationalHours,
      periodNames: clockSegments.periodNames,
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
