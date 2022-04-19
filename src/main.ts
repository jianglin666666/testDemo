import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts;

import scroll from 'vue-seamless-scroll';
Vue.use(scroll)

import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

new Vue({
  router,
  store,
  render: h =>{
   let root =  h(App)
   console.log('root',root)
   return root
  } 
}).$mount('#app')
