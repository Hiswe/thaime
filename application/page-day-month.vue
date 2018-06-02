<template>
  <section>
    <h2>days</h2>
    <ul>
      <li v-for="(day, index) in days" :key="day.rtgs" :class="{ active: currentDay === index + 1 }">
        <p class="english-name">{{ day.en }}</p>
        <p class="thai-name">
          <span class="thai-text">{{ day.th }} </span>
          <small class="rtgs">{{ day.rtgs }}</small>
        </p>
      </li>
    </ul>
    <h2>months</h2>
    <ul>
      <li v-for="(month, index) in months" :key="month.rtgs" :class="{ active: currentMonth  === index + 1}">
        <p class="english-name">{{ month.en }}</p>
        <p class="thai-name">{{ month.th }} <small>{{ month.rtgs }}</small>  </p>
      </li>
    </ul>
  </section>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  padding: 0.25rem 0;
  display: flex;
}
p {
  margin: 0;
}
p:first-child {
  width: 6rem;
  color: var(--c-primary);
}
small {
  display: block;
}
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

