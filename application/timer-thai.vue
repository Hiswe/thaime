<template>
  <dl>
    <dt>RTGS</dt>
    <dd>{{ rtgs }}</dd>
    <dt>Thaï</dt>
    <dd>{{ thai }}</dd>
  </dl>
</template>

<script>
import { DateTime } from 'luxon'

import { toThaiTime } from './thai-hours'

export default {
  props: {
    currentTime: DateTime,
  },
  data: function() {
    const thaiTime = toThaiTime(this.currentTime)
    console.log(thaiTime)
    return {
      rtgs: thaiTime.rtgs,
      thai: thaiTime.thai,
    }
  },
}
</script>

