<template>
  <section>
    <h1>Days & Months</h1>
    <h2>days</h2>
    <ul>
      <li v-for="(day, index) in days" :key="day.rtgs" :class="{ active: currentDay === index + 1 }">
        <!-- {{ index }} -->
        <span>{{ day.en }}</span>
        <span>{{ day.th }} <small>{{ day.rtgs }}</small>  </span>
      </li>
    </ul>
    <h2>months</h2>
    <ul>
      <li v-for="(month, index) in months" :key="month.rtgs" :class="{ active: currentMonth  === index + 1}">
        <!-- {{ index }} -->
        <span>{{ month.en }}</span>
        <span>{{ month.th }} <small>{{ month.rtgs }}</small>  </span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.active {
  color: red;
}
</style>


<script>
import { DateTime } from 'luxon'

import { days, months } from './day-month-names'

export default {
  name: `page-day-month`,
  data() {
    const currentDay = DateTime.local()
    return {
      days,
      months,
      currentDay: currentDay.weekday,
      currentMonth: currentDay.month,
    }
  },
}
</script>

