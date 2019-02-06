import vhCheck from 'vh-check'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueNotifications from 'vue-notification'
import focusRing from '@hiswe/focus-ring'

import Layout from '~/layout'
// pages
import TimePage from '~/views/time'
import CalendarPage from '~/views/calendar'
import InformationPage from '~/views/information'
import YearPage from '~/views/year'
import NotFound from '~/views/not-found'
// SW
import registerServiceWorker from '~/register-service-worker'
// Application global components
import svgIcon from '~/components/svg-symbols'
import pageTitle from '~/components/page-title'
import category from '~/components/category'
import buttonIcon from '~/components/button-icon'
import ListTransition from '~/components/list-transition'

vhCheck()
focusRing()
registerServiceWorker()

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
