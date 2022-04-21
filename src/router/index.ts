import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../components/layout.vue'
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
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },{
    path: '/preview/:name',
    name: 'preview',
    component:()=> import('../components/preview.vue')
  },{
    path: '/main',
    name: 'main',
    component: Layout,
    children:[{
      path:"/demoTest",
      name:'demoTest',
      component:() => import('../components/demoTest.vue')
    }]
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
