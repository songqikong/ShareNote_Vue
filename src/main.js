import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import axios from 'axios'
import "element-ui/lib/theme-chalk/index.css"
import './axios.js' // 请求拦截
import waterfall from 'vue-waterfall2'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)
Vue.use(waterfall)
Vue.use(Element)

Vue.config.productionTip = false

Vue.prototype.$axios = axios //

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
