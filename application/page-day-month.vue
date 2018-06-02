<template>
  <section>
    <h1>Days & Months</h1>
    <h2>days</h2>
    <ul>
      <li v-for="(day, index) in days" :key="day.rtgs">
        {{ index }}
        {{ day.en }}
        {{ day.th }}
        {{ day.rtgs }}
      </li>
    </ul>
    <h2>months</h2>
    <ul>
      <li v-for="(month, index) in months" :key="month.rtgs">
        {{ index }}
        {{ month.en }}
        {{ month.th }}
        {{ month.rtgs }}
      </li>
    </ul>
  </section>
</template>

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

