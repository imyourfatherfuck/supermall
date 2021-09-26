import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import toast from 'components/common/toast'

Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false
Vue.use(toast)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
