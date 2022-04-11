import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
// import Test from '../components/tsTest.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/tsTest',
    name: 'Test',
    // component: Test
    component:() => import('../components/tsTest.vue')
  },
  {
    path: '/dragMoveTest',
    name: 'dragMoveTest',
    // component: Test
    component:() => import('../components/dragMoveTest.vue')
  },
  {
    path: '/transitionDemo',
    name: 'transitionDemo',
    component:() => import('../components/transitionDemo.vue')
  },
  {
    path: '/messageNotice',
    name: 'messageNotice',
    component:() => import('../components/messageNotice.vue')
  },
  {
    path: '/stepsDemo',
    name: 'stepsDemo',
    component:() => import('../components/stepsDemo.vue')
  },
  {
    path: '/timeLine',
    name: 'timeLine',
    component:() => import('../components/timeLine.vue')
  },
  {
    path: '/visualMap',
    name: 'visualMap',
    component:() => import('../components/visualMap.vue')
  },
  {
    path: '/testMap',
    name: 'testMap',
    component:() => import('../components/testMap.vue')
  },
  {
    path: '/flexibleTest',
    name: 'flexibleTest',
    component:() => import('../components/flexibleTest.vue')
  },{
    path: '/elementTable',
    name: 'elementTable',
    component:() => import('../components/elementTable.vue')
  },{
    path: '/gridLayout',
    name: 'gridLayout',
    component:() => import('../components/gridLayout.vue')
  },{
    path: '/carouserDemo',
    name: 'carouserDemo',
    component:() => import('../components/carouserDemo.vue')
  },{
    path: '/scrollDemo',
    name: 'scrollDemo',
    component:() => import('../components/scrollDemo.vue')
  } ,{
    path: '/seamlessScroll',
    name: 'seamlessScroll',
    component:() => import('../components/seamlessScroll.vue')
  },{
    path: '/demoTest',
    name: 'demoTest',
    component:() => import('../components/demoTest.vue')
  },{
    path: '/calendarDemo',
    name: 'calendarDemo',
    component:() => import('../components/calendarDemo.vue')
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
