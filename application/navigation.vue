<template lang="pug">
nav.main-navigation
  router-link.main-navigation__link(to="/" exact)
    t-icon(name="access-time")
  router-link.main-navigation__link(to="/calendar")
    t-icon(name="insert-invitation")
  router-link.main-navigation__link.main-navigation__link--year(to="/year")
    //- have to keep it on a single line for better styling
    | {{i10lYear}}<br />{{thaiYear}}
  router-link.main-navigation__link(to="/information")
    t-icon(name="info")
</template>

<style lang="scss" scoped>
@import './config';

.main-navigation {
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
  z-index: 2;

  @media #{$mq-big} {
    position: absolute;
    display: block;
    top: 5px;
    bottom: auto;
    right: 5px;
    left: auto;
    background: none;
  }

  &__link {
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
    @media #{$mq-big} {
      display: inline-flex;
      vertical-align: middle;
      margin-left: var(--half-gutter);
      color: var(--c-primary);
      width: var(--navigation-height);

      &,
      &:first-child,
      &:last-child {
        border-radius: var(--navigation-height);
      }
    }

    &--year {
      font-family: var(--monospace);
      font-size: 0.7em;
      text-align: center;
    }
  }
}

.router-link-active {
  background: var(--c-primary-lighter);

  @media #{$mq-big} {
    color: white;
  }
}
</style>

<script>
import { DateTime } from 'luxon'

import * as years from './thai-years'

const now = DateTime.local()
const currentYear = now.year

export default {
  name: `main-navigation`,
  data() {
    return {
      i10lYear: years.i10l,
      thaiYear: years.thai,
    }
  },
}
</script>
