<template>
  <section>
    <h2>days</h2>
    <ul>
      <t-day-or-month-item
        v-for="(day, index) in days"
        :key="day.rtgs"
        :dayOrMonth="day"
        :isCurrentDayOrMonth="currentDay === index + 1"
      ></t-day-or-month-item>
    </ul>
    <h2>months</h2>
    <ul>
      <t-day-or-month-item
        v-for="(month, index) in months"
        :key="month.rtgs"
        :dayOrMonth="month"
        :isCurrentDayOrMonth="currentDay === index + 1"
      ></t-day-or-month-item>
    </ul>
  </section>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>


<script>
import { DateTime } from 'luxon'

import { days, months } from './day-month-names'
import DayOrMonthItem from './day-month-item'

export default {
  name: `page-day-month`,
  components: {
    't-day-or-month-item': DayOrMonthItem,
  },
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

