import Button from 'element-ui/lib/button'
import Input from 'element-ui/lib/input'
import Tag from 'element-ui/lib/tag'
import localStorage2 from '../'
import Demo from './Demo'
import Vue from 'vue'

import 'element-ui/lib/theme-chalk/button.css'
import 'element-ui/lib/theme-chalk/input.css'
import 'element-ui/lib/theme-chalk/tag.css'

;[Button, Tag, Input].forEach(component => Vue.use(component))

Vue.use(localStorage2)

new Vue({
  el: '#app',
  render: h => h(Demo)
})

