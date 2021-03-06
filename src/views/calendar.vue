<script>
import { DateTime } from 'luxon'

import THAI_NUMBERS from '~/utils/thai-numbers'
import { days, months } from '~/utils/day-month-names'
import DayOrMonthItem from '~/components/day-month-item'

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

<template lang="pug">
.page-content
  t-page-title(title="days & months")
  .content-body
    section.curent-date
      p.curent-date__text.curent-date__text--en
        | {{englishDate}}
      p.curent-date__text.curent-date__text--rtgs.thai-text
        | {{rtgsDate}}
      p.curent-date__text.curent-date__text--th.thai-text
        | {{thaiDate}}
    section.day-month-listing
      t-category(title="days")
        thaime-list-transition.listing.listing--days(tag="ul")
          t-day-or-month-item(
            v-for="(day, index) in days"
            :key="day.rtgs"
            :dayOrMonth="day"
            :data-index="index / 7"
            :isCurrentDayOrMonth="currentDay === index + 1"
          )
      t-category(title="months")
        thaime-list-transition.listing.listing--months(tag="ul")
          t-day-or-month-item(
            v-for="(month, index) in months"
            :key="month.rtgs"
            :dayOrMonth="month"
            :data-index="index / 12"
            :isCurrentDayOrMonth="currentMonth === index + 1"
          )
</template>

<style scoped lang="scss">
@import '../config';

$listing-max-size: 700px;

.page-content {
  padding-bottom: var(--navigation-total-height);
  text-align: center;
}
.curent-date {
  padding: var(--gutter) 0 calc(var(--gutter) * 1.5);
  background: white;
  margin-bottom: calc(var(--half-gutter) * -1);

  &__text {
    &--en {
      font-weight: 300;
    }
    &--rtgs {
      font-size: 1.35em;
      padding: 0.5em 0;
      margin: 0.25em var(--half-gutter);
      border-radius: var(--border-radius-small);
    }
    &--th {
      color: var(--c-text-lighter);
    }
  }
}
.day-month-listing {
  @media (max-width: #{($listing-max-size * 2) - 1}) {
    .category:first-child {
      margin-top: 0;
    }
  }
  @media (min-width: #{($listing-max-size * 2)}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}
.listing {
  list-style: none;
  margin: 0;
  padding: 0 var(--half-gutter);
  margin: 0 auto;
  display: grid;
  grid-gap: 0.25em;
  counter-reset: dayOrMonthlisting;

  &--days {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    max-width: $listing-max-size;
  }
  &--months {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    max-width: $listing-max-size;
  }
}
</style>
