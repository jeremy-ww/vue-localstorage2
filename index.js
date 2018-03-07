import cache from 'sewing/dist/cache'
import Storage from './Storage'

function localStorage2 (Vue, { namespace = true, prefix } = {}) {
  const cachedStorageInstance = cache(function (name) {
    return new Storage(name, prefix)
  })

  Object.defineProperties(Vue.prototype, {
    '$localStorage': {
      get () {
        const name = namespace ? this.$options.name : ''
        return cachedStorageInstance(name)
      }
    }
  })
}

export default localStorage2
export { Storage }

if (typeof window !== 'undefined' && window.Vue) {
  localStorage2(window.Vue)
}
