import 'jest-localstorage-mock'
import Vue from 'vue'
import { config } from '@vue/test-utils'
import moment from 'moment'

config.stubs['icon'] = '<div />'

Vue.filter('toData', function (value) {
  return moment(value).calendar()
})

Vue.filter('toShortData', function (value) {
  return moment(value).format('D MMMM')
})

Vue.filter('toHour', function (value) {
  return moment(value).format('HH:mm')
})

Vue.filter('deleteNbsp', function (value) {
  if (value) {
    return value.replace(/&nbsp;/gi, ' ')
  }
})

Vue.config.productionTip = false
