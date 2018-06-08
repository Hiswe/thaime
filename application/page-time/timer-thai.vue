<template>
  <dl>
    <dt>RTGS</dt>
    <dd>{{ rtgs }}</dd>
    <dt>Thaï</dt>
    <dd class="thai-text">{{ thai }}</dd>
  </dl>
</template>

<script>
import { DateTime } from 'luxon'

import { getThaiTime } from '../thai-hours'

export default {
  name: `timer-thai`,
  props: {
    currentTime: DateTime,
  },
  // data: function() {
  //   const thaiTime = getThaiTime(this.currentTime)
  //   return {
  //     rtgs: thaiTime.rtgs(),
  //     thai: thaiTime.thai(),
  //   }
  // },
  computed: {
    rtgs() {
      const thaiTime = getThaiTime(this.currentTime)
      return thaiTime.rtgs()
    },
    thai() {
      const thaiTime = getThaiTime(this.currentTime)
      return thaiTime.thai()
    },
  },
}
</script>

