<template>
  <section class="page-content">
    <t-page-title title="years"></t-page-title>
    <div>
      <t-input
        title="international"
        v-model="i10lYear"
      ></t-input>
      <t-input
        title="thai"
        v-model="thaiYear"
      ></t-input>
      <t-input
        title="age"
        v-model="age"
      ></t-input>
      <transition name="fade">
        <button
          v-if="isNotCurrentYear"
          @click="reset"
        >
          <t-icon
            name="restore"
            class="restore-year"
          ></t-icon>
        </button>
      </transition>
    </div>
  </section>
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
</style>

<style>
.restore-year svg {
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

