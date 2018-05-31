import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from './layout'
import Calendar from './calendar'
import Time from './time'

Vue.use(VueRouter)

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
