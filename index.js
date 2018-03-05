import Storage from './Storage'

function localStorage2 (Vue, { namespace = true, prefix } = {}) {
  Vue.mixin({
    created () {
      const name = namespace ? this.$options.name : ''
      this.$localStorage = new Storage(name, prefix)
    }
  })
}

export default localStorage2

if (typeof window !== 'undefined' && window.Vue) {
  localStorage2(window.Vue)
}
