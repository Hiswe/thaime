<template>
  <section class="page-content">
    <t-page-title>
      years
    </t-page-title>
    <div>
      <label for="i10lYear">International</label>
      <input
        id="i10lYear"
        type="number"
        v-model.number="i10lYear"
      >
      <label for="thaiYear">Thai</label>
      <input
        id="thaiYear"
        type="number"
        v-model.number="thaiYear"
      >
      <label for="age">age</label>
      <input
        id="age"
        type="number"
        v-model.number="age"
      >
    </div>
  </section>
</template>

<style lang="scss" scoped>
div {
  display: grid;
  grid-template-columns: 8em 1fr;
  padding: var(--gutter) var(--half-gutter) 0;
}
label {
  // gir
}
input {
  font-size: 2rem;
  font-family: monospace;
  width: 100%;
}
</style>


<script>
import pageTitle from './ui/page-title'

import * as years from './thai-years'

export default {
  name: `page-year`,
  components: {
    't-page-title': pageTitle,
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
        this.i10lYear = years.toI10lYear(thaiYear)
      },
    },
    age: {
      get() {
        return years.toAge(this.i10lYear)
      },
      set(age) {
        this.i10lYear = years.fromAge(age)
      },
    },
  },
}
</script>

