import Tag from 'element-ui/lib/tag'
import localStorage2 from '../'
import Demo from './Demo'
import Vue from 'vue'

import 'element-ui/lib/theme-chalk/tag.css'

Vue.use(Tag)
Vue.use(localStorage2)

new Vue({
  el: '#app',
  render: h => h(Demo)
})

