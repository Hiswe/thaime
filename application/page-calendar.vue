<template>
  <section>
    <dl>
      <dt>english</dt>
      <dd>{{englishDate}}</dd>
      <dt>Thai</dt>
      <dd class="thai-text">{{thaiDate}}</dd>
    </dl>
  </section>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  name: `page-calendar`,
  data() {
    return {
      currentDate: false,
    }
  },
  computed: {
    // a computed getter
    englishDate: function() {
      if (!this.currentDate) return ``
      return this.currentDate.toLocaleString(DateTime.DATE_HUGE)
    },
    thaiDate: function() {
      if (!this.currentDate) return ``
      return this.currentDate.setLocale(`th`).toLocaleString(DateTime.DATE_HUGE)
    },
  },
  created() {
    this.currentDate = DateTime.local()
  },
}
</script>
