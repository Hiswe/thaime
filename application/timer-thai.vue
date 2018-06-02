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

import { toThaiTime } from './thai-hours'

export default {
  name: `timer-thai`,
  props: {
    currentTime: DateTime,
  },
  data: function() {
    const thaiTime = toThaiTime(this.currentTime)
    return {
      rtgs: thaiTime.rtgs,
      thai: thaiTime.thai,
    }
  },
}
</script>

