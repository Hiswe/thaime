<template>
  <div class="page-content">
    <t-page-title>
      Days & months
    </t-page-title>
    <section class="curent-date">
      <p class="curent-date__text curent-date__text--en">{{englishDate}}</p>
      <p class="curent-date__text curent-date__text--th thai-text">{{thaiDate}}</p>
    </section>
    <section class="day-month-listing">
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
          :isCurrentDayOrMonth="currentMonth === index + 1"
        ></t-day-or-month-item>
      </ul>
    </section>
  </div>
</template>

<style scoped lang="scss">
.day-month-listing {
  // display: grid;
  grid-template-areas:
    'titleDay titleMonth'
    'listDay listMonth';
  grid-column-gap: var(--two-gutter);
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  h2 {
    grid-area: titleDay;
  }
  h2 ~ h2 {
    grid-area: titleMonth;
  }
}
</style>

<script>
import { DateTime } from 'luxon'

import pageTitle from '../ui/page-title'
import DayOrMonthItem from './day-month-item'
import { days, months } from './day-month-names'

export default {
  name: `page-calendar`,
  components: {
    't-day-or-month-item': DayOrMonthItem,
    't-page-title': pageTitle,
  },
  data() {
    return {
      days,
      months,
      currentDate: false,
    }
  },
  computed: {
    // a computed getter
    englishDate() {
      if (!this.currentDate) return ``
      return this.currentDate.toLocaleString(DateTime.DATE_HUGE)
    },
    thaiDate() {
      if (!this.currentDate) return ``
      return this.currentDate.setLocale(`th`).toLocaleString(DateTime.DATE_HUGE)
    },
    currentDay() {
      if (!this.currentDate) return 0
      return this.currentDate.weekday
    },
    currentMonth() {
      if (!this.currentDate) return 0
      return this.currentDate.month
    },
  },
  created() {
    this.currentDate = DateTime.local()
  },
}
</script>
