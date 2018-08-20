<template lang="pug">
section.page-content
  t-page-title(title="years")
  .content-body
    thaime-list-transition(tag="div")
      t-input(
        key="international"
        title="international"
        v-model="i10lYear"
        :data-index="1 / 3"
      )
      t-input(
        key="thai"
        title="thai"
        v-model="thaiYear"
        :data-index="2 / 3"
      )
      t-input(
        key="age"
        title="age"
        v-model="age"
        :data-index="3 / 3"
      )
    transition(name="fade")
      button(
        v-if="isNotCurrentYear"
        @click="reset"
      )
        t-icon.restore-year(
          name="restore"
          :scale="3"
        )
</template>

<style lang="scss" scoped>
div {
  padding: var(--half-gutter) var(--half-gutter) 0;
}
button {
  --svg-icon-scale: 3;
  margin: 0 auto;
  display: block;
  margin-top: var(--c-half-gutter);
  background: none;
  border: 0;
  text-align: center;
}
.restore-year {
  fill: var(--c-accent);
  stroke-width: 0.5;
  stroke: white;
}
</style>

<script>
import pageTitle from '../ui/page-title'
import inputNumber from './input-number'

import * as years from '../thai-years'

export default {
  name: `page-year`,
  components: {
    't-input': inputNumber,
  },
  data() {
    return {
      i10lYear: years.i10l,
    }
  },
  methods: {
    reset() {
      this.i10lYear = years.i10l
    },
  },
  computed: {
    isNotCurrentYear() {
      return this.i10lYear !== years.i10l
    },
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

