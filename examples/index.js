import ElementUI from 'element-ui'
import localStorage2 from '../'
import Demo from './Demo'
import Vue from 'vue'

import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(localStorage2)

new Vue({
  el: '#app',
  render: h => h(Demo)
})

