import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import i18n from '@/i18n'

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

// import owlsight from 'owlsight/src/tailwind.js'
import 'owlsight/dist/main.css'
import 'owlsight/icons/css/owl.css'
import 'owlsight/icons/css/animation.css'

Vue.component('v-select', vSelect)

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
