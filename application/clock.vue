<template>
<div>
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

.active {
  background: var(--c-accent-lightest);
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
