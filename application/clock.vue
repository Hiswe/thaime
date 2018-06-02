<template>
<div>
  <ul>
    <li
      v-for="period of periods"
      :key="period.name"
      :class="{active: period.isHourInPeriod(currentTime.hour)}"
    >
      <h3>{{ period.name }}</h3>
      <h4>{{ period.start }} – {{ period.end }}</h4>
      <dl>
        <dt>RTGS</dt>
        <dd>{{ period.rtgs }}</dd>
        <dt>Thaï</dt>
        <dd class="thai-text">{{ period.thai }}</dd>
      </dl>
    </li>
  </ul>
</div>
</template>

<style scoped>
.active {
  color: red;
}
</style>

<script>
import { DateTime } from 'luxon'

import { thaiPeriods } from './thai-hours'

export default {
  name: `clock`,
  props: {
    currentTime: DateTime,
  },
  data: function() {
    return {
      periods: thaiPeriods,
    }
  },
}
</script>
