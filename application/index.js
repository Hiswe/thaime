import Vue from 'vue'
import VueRouter from 'vue-router'
import { DateTime } from 'luxon'

import Layout from './layout'
import TimePage from './page-time'
import CalendarPage from './page-calendar'
import InformationPage from './page-information'
import NotFound from './page-not-found'

Vue.use(VueRouter)

Vue.filter(`hoursMinutesSeconds`, value => {
  const isLuxonDateTime = value instanceof DateTime
  if (!isLuxonDateTime) return `00:00:00`
  return value.toLocaleString(DateTime.TIME_24_WITH_SECONDS)
})

const routes = [
  {
    path: `/`,
    component: TimePage,
  },
  {
    path: `/calendar`,
    component: CalendarPage,
  },
  {
    path: `/information`,
    component: InformationPage,
  },
  {
    path: `/*`,
    component: NotFound,
  },
]

const router = new VueRouter({
  routes,
  base: `/`,
})

const application = new Vue({
  el: `#vue-root`,
  render: h => h(Layout),
  router,
})
