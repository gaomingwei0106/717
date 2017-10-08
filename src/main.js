//引用common style
import './css/reset.css'
import './font/iconfont.css'
import './css/swiper.min.css'
import './css/swiper.min.js'
import axios from 'axios'
Vue.prototype.$http = axios;
//引用框架和配置文件
import Vue from 'vue'
import Store from './store/store'
import Router from './routes/router.config'
import App from './App.vue'

import '../mock/mock'
new Vue({
  el: '#app',
  store:Store,
  router:Router,
  render: h => h(App)
})
