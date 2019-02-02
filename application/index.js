import vhCheck from 'vh-check'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueNotifications from 'vue-notification'

import Layout from './layout'
import TimePage from './page-time'
import CalendarPage from './page-calendar'
import InformationPage from './page-information'
import YearPage from './page-year'
import NotFound from './page-not-found'

import svgIcon from './ui/svg-symbols'
import pageTitle from './ui/page-title'
import category from './ui/category'
import buttonIcon from './ui/button-icon'
import ListTransition from './ui/list-transition'

vhCheck()

Vue.use(VueRouter)
Vue.use(VueNotifications)

Vue.component(`t-icon`, svgIcon)
Vue.component(`t-page-title`, pageTitle)
Vue.component(`t-category`, category)
Vue.component(`t-button-icon`, buttonIcon)
Vue.component(`thaime-list-transition`, ListTransition)

const routes = [
  {
    path: `/`,
    component: TimePage,
    meta: {
      title: `clock`,
    },
  },
  {
    path: `/calendar`,
    component: CalendarPage,
    meta: {
      title: `days & months`,
    },
  },
  {
    path: `/year`,
    component: YearPage,
    meta: {
      title: `years`,
    },
  },
  {
    path: `/information`,
    component: InformationPage,
    meta: {
      title: `about thaime`,
    },
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

new Vue({
  el: `#vue-root`,
  render: h => h(Layout),
  router,
})

// enable focus ring when user press tab
// https://hackernoon.com/removing-that-ugly-focus-ring-and-keeping-it-too-6c8727fefcd2
function handleFirstTab(e) {
  if (e.keyCode === 9) {
    // the "I am a keyboard user" key
    document.body.classList.add(`user-is-tabbing`)
    window.removeEventListener(`keydown`, handleFirstTab, { passive: true })
  }
}
window.addEventListener(`keydown`, handleFirstTab)
