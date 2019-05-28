import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
// 初始化样式
import './assets/styles/reset.css'
// 边框1px问题
// import './assets/styles/border.css'
// 移动端适配
import 'amfe-flexible/index.js'
// 移动端点击300ms延迟问题
import fastClick from 'fastclick'

Vue.config.productionTip = false
fastClick.attach(document.body) //使用
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
