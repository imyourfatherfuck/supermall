import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";

//全局总线
Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false
Vue.use(toast)

//图片懒加载 loading 图片占位符
Vue.use(VueLazyload,{
  loading: require('./assets/img/common/placeholder.png')
})

//解决移动端300毫秒延迟
FastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
