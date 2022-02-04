import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from "./router"
import store from "./store"

Vue.config.productionTip = false
Vue.use(VueRouter)

// 注册事件总线
Vue.prototype.$EventBus = new Vue()



new Vue({
  store: store,
  router,
  render: h => h(App),
}).$mount('#app')
