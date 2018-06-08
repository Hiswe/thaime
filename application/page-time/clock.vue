<template>
<div class="clock">
  <svg :viewBox="viewbox" class="clock-svg">
    <defs>
      <clipPath id="clip-clock">
        <circle cx="0" cy="0" r="100" />
      </clipPath>
    </defs>
    <g class="clock-center" clip-path="url(#clip-clock)">
      <circle cx="0" cy="0" r="75" class="clock-center__day-sky" />
      <path
        class="clock-center__night-sky"
        :d="nightSky"
      />
      <path class="clock-center__moon" d="M5,0.862c-2.284,0 -4.138,1.854 -4.138,4.138c0,2.284 1.854,4.138 4.138,4.138c-1.142,-0.69 -2.069,-2.306 -2.069,-4.138c0,-1.832 0.927,-3.448 2.069,-4.138Z"/>
      <g class="clock-center__stars">
        <path class="star" d="M5,0.914c0.622,0 1.009,3.106 1.009,3.106c0,0 3.073,-0.596 3.266,0c0.192,0.591 -2.642,1.92 -2.642,1.92c0,0 1.516,2.738 1.009,3.106c-0.503,0.365 -2.642,-1.92 -2.642,-1.92c0,0 -2.135,2.288 -2.642,1.92c-0.503,-0.365 1.009,-3.106 1.009,-3.106c0,0 -2.836,-1.324 -2.642,-1.92c0.192,-0.591 3.266,0 3.266,0c0,0 0.382,-3.106 1.009,-3.106Z"/>
        <path class="star" d="M5,0.914c0.622,0 1.009,3.106 1.009,3.106c0,0 3.073,-0.596 3.266,0c0.192,0.591 -2.642,1.92 -2.642,1.92c0,0 1.516,2.738 1.009,3.106c-0.503,0.365 -2.642,-1.92 -2.642,-1.92c0,0 -2.135,2.288 -2.642,1.92c-0.503,-0.365 1.009,-3.106 1.009,-3.106c0,0 -2.836,-1.324 -2.642,-1.92c0.192,-0.591 3.266,0 3.266,0c0,0 0.382,-3.106 1.009,-3.106Z"/>
        <path class="star" d="M5,0.914c0.622,0 1.009,3.106 1.009,3.106c0,0 3.073,-0.596 3.266,0c0.192,0.591 -2.642,1.92 -2.642,1.92c0,0 1.516,2.738 1.009,3.106c-0.503,0.365 -2.642,-1.92 -2.642,-1.92c0,0 -2.135,2.288 -2.642,1.92c-0.503,-0.365 1.009,-3.106 1.009,-3.106c0,0 -2.836,-1.324 -2.642,-1.92c0.192,-0.591 3.266,0 3.266,0c0,0 0.382,-3.106 1.009,-3.106Z"/>
        <path class="star" d="M5,0.914c0.622,0 1.009,3.106 1.009,3.106c0,0 3.073,-0.596 3.266,0c0.192,0.591 -2.642,1.92 -2.642,1.92c0,0 1.516,2.738 1.009,3.106c-0.503,0.365 -2.642,-1.92 -2.642,-1.92c0,0 -2.135,2.288 -2.642,1.92c-0.503,-0.365 1.009,-3.106 1.009,-3.106c0,0 -2.836,-1.324 -2.642,-1.92c0.192,-0.591 3.266,0 3.266,0c0,0 0.382,-3.106 1.009,-3.106Z"/>
        <path class="star" d="M5,0.914c0.622,0 1.009,3.106 1.009,3.106c0,0 3.073,-0.596 3.266,0c0.192,0.591 -2.642,1.92 -2.642,1.92c0,0 1.516,2.738 1.009,3.106c-0.503,0.365 -2.642,-1.92 -2.642,-1.92c0,0 -2.135,2.288 -2.642,1.92c-0.503,-0.365 1.009,-3.106 1.009,-3.106c0,0 -2.836,-1.324 -2.642,-1.92c0.192,-0.591 3.266,0 3.266,0c0,0 0.382,-3.106 1.009,-3.106Z"/>
        <path class="star" d="M5,0.914c0.622,0 1.009,3.106 1.009,3.106c0,0 3.073,-0.596 3.266,0c0.192,0.591 -2.642,1.92 -2.642,1.92c0,0 1.516,2.738 1.009,3.106c-0.503,0.365 -2.642,-1.92 -2.642,-1.92c0,0 -2.135,2.288 -2.642,1.92c-0.503,-0.365 1.009,-3.106 1.009,-3.106c0,0 -2.836,-1.324 -2.642,-1.92c0.192,-0.591 3.266,0 3.266,0c0,0 0.382,-3.106 1.009,-3.106Z"/>
      </g>
      <g class="clock-center__sun">
        <path d="M5.769,0.68l0,8.64" />
        <path d="M10.004,5l-8.469,0" />
        <path d="M8.53,2.184l-5.521,5.632" />
        <path d="M8.41,7.693l-5.281,-5.386" />
        <ellipse cx="5.769" cy="5" rx="2.761" ry="2.816"/>
      </g>
      <circle cx="0" cy="0" r="75" class="clock-center__inner-ring" />
    </g>
    <g id="arcs-with-marker" clip-path="url(#clip-clock)">
      <path
        v-for="arc of arcs"
        :key="arc.id"
        :class="[
          `period-arc`,
          `period-arc--${arc.id}`
        ]"
        :d="arc.pathData"
      />
      <path
        v-for="marker of hourMarkers"
        :key="marker.id"
        :class="[
          `period-marker`,
          `period-marker--${marker.name}`,
          `${ marker.isFirstPeriodMarker ? `period-marker--is-first` : `` }`
        ]"
        :d="marker.pathData"
      />
    </g>
    <circle
      class="current-time"
      :cx="nowCoordinates.x"
      :cy="nowCoordinates.y"
      r="5"
    />
    <g id="thai-hours">
      <text
        v-for="(marker) of hourMarkers"
        :key="`${marker.id}-th`"
        :class="[
          `thai-hour`,
          `thai-hour--${marker.name}`,
          `${ marker.isFirstPeriodMarker ? `thai-hour--is-first` : `` }`
        ]"
        :x="marker.textX"
        :y="marker.textY"
        text-anchor="middle"
      >
        {{marker.thaiHour}}
      </text>
    </g>
    <g id="military-time">
      <circle
        v-for="i18nHour of internationalHours"
        :key="`${i18nHour.id}-bg`"
        class="military-time__background"
        :cx="i18nHour.cx"
        :cy="i18nHour.cy"
        :r="i18nHour.bgSize"
      />
      <text
        v-for="i18nHour of internationalHours"
        :key="`${i18nHour.id}`"
        class="military-time__text"
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
          `period-name__path`,
        ]"
        :d="periodName.pathData"
      />
      <text
        v-for="periodName of periodNames"
        :key="periodName.nameId"
        :class="[
          `period-name__text`,
          `period-name__text--${periodName.id}`,
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
    <g id="interactive-shapes">
      <path
        v-for="i18nArc of internationalHoursArcs"
        :key="i18nArc.id"
        class="interactive-arc"
        :d="i18nArc.pathData"
        @click="$emit(`change`, i18nArc.hour)"
      />
      <circle
        cx="0"
        cy="0"
        r="60"
        class="interactive-center"
        @click="$emit(`change`, false)"
      />
    </g>
  </svg>
  <slot></slot>
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

.clock {
  position: relative;
  max-width: 400px;
  margin: 0 auto;
}
.clock-svg {
  width: 100%;
}
.period {
  &-arc {
    stroke-width: 50;
    fill: none;

    @each $period in $periods {
      &--arc-#{$period} {
        stroke: var(--c-#{$period});
      }
    }
  }
  &-marker {
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
}
.military-time {
  &__text {
    font-size: 0.6em;
    /* translate for taking care of the letter height */
    transform: translateY(0.35em);
  }
  &__background {
    fill: white;
  }
}
.current-time {
  fill: red;
  stroke-width: 1px;
  stroke: white;
}
.period-name {
  &__path {
    fill: none;
    stroke-width: 0;
  }
  &__text {
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
.thai-hour {
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
.clock-center {
  &__inner-ring {
    stroke: white;
    fill: none;
    stroke-width: 3;
  }
  &__day-sky {
    fill: hsl(39, 100%, 92%);
  }
  &__night-sky {
    fill: hsl(197, 100%, 93%);
  }
  &__moon {
    fill: white;
    transform: translate(-45px, -45px) scale(4.5) rotate(-15deg);
  }
  &__sun {
    --sun-color: hsl(51, 98%, 66%);
    transform: translate(10px, 18px) scale(6.5) rotate(2deg);
    path {
      stroke: var(--sun-color);
      stroke-width: 1px;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-miterlimit: 1.5;
    }
    ellipse {
      fill: var(--sun-color);
    }
  }
  &__stars {
    path {
      fill: white;
    }
    path:nth-child(1) {
      transform: translate(25px, -35px) scale(1.5) rotate(-15deg);
    }
    path:nth-child(2) {
      transform: translate(-40px, -60px) scale(1) rotate(-5deg);
    }
    path:nth-child(3) {
      transform: translate(11px, -27px) scale(2) rotate(24deg);
    }
    path:nth-child(4) {
      transform: translate(57px, -27px) scale(1.2) rotate(28deg);
    }
    path:nth-child(5) {
      transform: translate(-3px, -57px) scale(1) rotate(3deg);
    }
    path:nth-child(6) {
      transform: translate(-53px, -42px) scale(1.5) rotate(32deg);
    }
  }
}

.interactive {
  &-arc {
    fill: none;
    stroke: red;
    stroke-width: 60;
    opacity: 0;
  }
  &-center {
    fill: greenyellow;
    fill-opacity: 0;
  }
}
</style>

<script>
import { DateTime } from 'luxon'

import * as clockSegments from './clock-segments'

const SVG_MARGIN = 0.45
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
      nightSky: clockSegments.nightSky,
      internationalHoursArcs: clockSegments.internationalHoursArcs,
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
