<template>
  <section class="page-content">
    <t-page-title>
      years
    </t-page-title>
    <div>
      <t-input
        title="international"
        v-model="i10lYear"
      />
      <t-input
        title="thai"
        v-model="thaiYear"
      />
      <t-input
        title="age"
        v-model="age"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
div {
  // display: grid;
  // grid-template-columns: 8em 1fr;
  padding: var(--gutter) var(--half-gutter) 0;
}
</style>

<script>
import pageTitle from '../ui/page-title'
import inputNumber from './input-number'

import * as years from '../thai-years'

export default {
  name: `page-year`,
  components: {
    't-page-title': pageTitle,
    't-input': inputNumber,
  },
  data() {
    return {
      i10lYear: years.i10l,
    }
  },
  computed: {
    thaiYear: {
      get() {
        return years.toThaiYear(this.i10lYear)
      },
      set(thaiYear) {
        console.log({ thaiYear })
        this.i10lYear = years.toI10lYear(thaiYear)
      },
    },
    age: {
      get() {
        return years.toAge(this.i10lYear)
      },
      set(age) {
        console.log({ age })
        this.i10lYear = years.fromAge(age)
      },
    },
  },
}
</script>

