<template>
<nav>
  <router-link to="/" exact>
    <t-svg-icons name="access-time"/>
  </router-link>

  <router-link to="/calendar">
    <t-svg-icons name="insert-invitation"/>
  </router-link>

  <router-link class="year" to="/year">{{i10lYear}}<br />{{thaiYear}}</router-link>

  <router-link to="/information">
    <t-svg-icons name="info"/>
  </router-link>
</nav>
</template>

<style lang="scss" scoped>
nav {
  --nav-border-radius: var(--border-radius-small);
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  background: var(--c-primary);
  position: fixed;
  bottom: var(--navigation-margin);
  left: var(--navigation-margin);
  right: var(--navigation-margin);
  height: var(--navigation-height);
  border-radius: var(--nav-border-radius);
}
a {
  height: var(--navigation-height);
  display: flex;
  flex: 1 0 25%;
  align-items: center;
  justify-content: center;
  padding: 0;
  text-decoration: none;
  color: var(--c-primary-contrast);

  &:first-child {
    border-radius: var(--nav-border-radius) 0 0 var(--nav-border-radius);
  }
  &:last-child {
    border-radius: 0 var(--nav-border-radius) var(--nav-border-radius) 0;
  }
}
.year {
  font-family: monospace;
  font-size: 0.8em;
  text-align: center;
}
.router-link-active {
  background: var(--c-primary-lighter);
}
</style>

<script>
import { DateTime } from 'luxon'

import * as YEARS from './thai-years'
import svgIcons from './ui/svg-icons'

const now = DateTime.local()
const currentYear = now.year
// const

export default {
  name: `main-navigation`,
  components: {
    't-svg-icons': svgIcons,
  },
  data() {
    return {
      i10lYear: YEARS.i10l,
      thaiYear: YEARS.thai,
    }
  },
}
</script>
