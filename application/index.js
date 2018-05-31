import Vue from 'vue'
import VueRouter from 'vue-router'
import { DateTime } from 'luxon'

import Layout from './layout'
import Calendar from './calendar'
import Time from './time'

Vue.use(VueRouter)

Vue.filter(`hoursMinutesSeconds`, value => {
  const isLuxonDateTime = value instanceof DateTime
  if (!isLuxonDateTime) return `00:00:00`
  return value.toLocaleString(DateTime.TIME_24_WITH_SECONDS)
})

const routes = [
  {
    path: `/`,
    component: Time,
  },
  {
    path: `/calendar`,
    component: Calendar,
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
