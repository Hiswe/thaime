<template>
  <div class="page-content">
    <t-page-title>
      Days & months
    </t-page-title>
    <section class="curent-date">
      <p class="curent-date__text curent-date__text--en">
        {{englishDate}}
      </p>
      <p class="curent-date__text curent-date__text--th thai-text">
        {{thaiDate}}
      </p>
      <p class="curent-date__text curent-date__text--rtgs thai-text">
        {{rtgsDate}}
      </p>
    </section>

    <section class="day-month-listing">
      <t-category title="days">
        <ul class="listing listing--days">
          <t-day-or-month-item
            v-for="(day, index) in days"
            :key="day.rtgs"
            :dayOrMonth="day"
            :isCurrentDayOrMonth="currentDay === index + 1"
          />
        </ul>
      </t-category>
      <t-category title="months">
        <ul class="listing listing--months">
          <t-day-or-month-item
            v-for="(month, index) in months"
            :key="month.rtgs"
            :dayOrMonth="month"
            :isCurrentDayOrMonth="currentMonth === index + 1"
          />
        </ul>
      </t-category>
    </section>
  </div>
</template>

<style scoped lang="scss">
.page-content {
  padding-bottom: var(--navigation-total-height);
}
.curent-date {
  padding: var(--gutter) 0 calc(var(--gutter) * 1.5);
  background: white;
  margin-bottom: calc(var(--half-gutter) * -1);

  &__text {
    &--en {
      font-weight: 300;
    }
    &--th {
      font-size: 1.35em;
      padding: 0.5em 0;
      margin: 0.25em var(--half-gutter);
      // background: white;
      border-radius: var(--border-radius-small);
    }
    &--rtgs {
      color: var(--c-text-lighter);
    }
  }
}
.day-month-listing {
  .category:first-child {
    padding-top: 0;
  }
}
.listing {
  list-style: none;
  margin: 0;
  padding: 0 var(--half-gutter);
  margin: 0 auto;
  display: grid;
  grid-gap: 0.25em;

  &--days {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  &--months {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}
</style>

<script>
import { DateTime } from 'luxon'

import THAI_NUMBERS from '../thai-numbers'
import DayOrMonthItem from './day-month-item'
import { days, months } from './day-month-names'

const YEAR_DIFFERENCE = 2561 - 2018

export default {
  name: `page-calendar`,
  components: {
    't-day-or-month-item': DayOrMonthItem,
  },
  data() {
    return {
      days,
      months,
      currentDate: false,
    }
  },
  computed: {
    englishDate() {
      if (!this.currentDate) return ``
      return this.currentDate.toLocaleString(DateTime.DATE_HUGE)
    },
    thaiDate() {
      if (!this.currentDate) return ``
      return this.currentDate.setLocale(`th`).toLocaleString(DateTime.DATE_HUGE)
    },
    rtgsDate() {
      if (!this.currentDate) return ``
      const { weekday, day, month } = this.currentDate
      return `${days[weekday - 1].rtgs} ${THAI_NUMBERS[day].rtgs} ${
        months[month - 1].rtgs
      }`
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
