import cache from 'sewing/dist/cache'
import Storage from './Storage'

declare global {
  interface Window { Vue?: any }
}

export interface VueStorage {
  namespace?: boolean
  prefix?: string
}

function localStorage2 (
  Vue: any,
  { namespace = true, prefix }: VueStorage = {}
) {
  const cachedStorageInstance = cache(function (name: string): Storage {
    return new Storage(name, prefix)
  })

  Object.defineProperties(Vue.prototype, {
    '$localStorage': {
      get (): () => Storage {
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
