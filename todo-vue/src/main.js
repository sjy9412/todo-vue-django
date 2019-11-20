import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSession from 'vue-session' // 자동으로 추가되지 않아 넣어줘야함
import store from './store' // vuex

Vue.use(VueSession)
Vue.config.productionTip = false

new Vue({
  router,
  store, // vuex
  render: h => h(App)
}).$mount('#app')
