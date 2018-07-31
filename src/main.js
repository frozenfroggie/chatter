// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuelidate from 'vuelidate'
import Icon from 'vue-awesome/components/Icon'
import { store } from './store/store'
import 'vue-awesome/icons'
import registerServiceWorker from './config/registerServiceWorker'
import moment from 'moment'

Vue.config.productionTip = false

Vue.component('icon', Icon)
Vue.use(Vuelidate)

Vue.filter('toData', function (value) {
  return moment(value).format('MMMM Do HH:MM')
})

Vue.filter('toShortData', function (value) {
  return moment(value).format('D MMMM')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
registerServiceWorker()
