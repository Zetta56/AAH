import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App.vue'
import store from './store'

// Config
Vue.config.productionTip = false

// Plugins
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

// Vue Instance
new Vue({
  store: store,
  render: h => h(App)
}).$mount('#app')
