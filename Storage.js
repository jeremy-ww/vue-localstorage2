import isType from 'sewing/dist/isType'
import get from 'sewing/dist/get'

export default class Storage {
  static parse (value) {
    try {
      return JSON.parse(value)
    } catch (e) {}
  }

  static update (obj, path, value) {
    const temp = obj
    while (path.length > 1) {
      obj = obj[path.shift()]
    }
    obj[path.shift()] = value
    return temp
  }

  constructor (name = '', prefix = 'app') {
    this.prefix = `${prefix}_${name ? name + '_' : ''}`
  }

  split (path) {
    const [target, ...route] = path.split(/\./)
    return { target: this.prefix + target, route }
  }

  get (path, defaultValue) {
    const { target, route } = this.split(path)
    const item = Storage.parse(localStorage.getItem(target))
    return get(item, route.join('.'), defaultValue)
  }

  set (path, value) {
    const { target, route } = this.split(path)
    const preItemValue = Storage.parse(localStorage.getItem(target))

    const item = route.length > 1
      ? Storage.update(preItemValue, route, value)
      : value

    localStorage.setItem(target,
      isType(item, ['Object', 'Array'])
        ? JSON.stringify(item)
        : item
    )
  }

  remove (item) {
    const { target } = this.split(item)
    localStorage.removeItem(target)
  }

  clear () {
    for (let i = 0, iLength = localStorage.length; i < iLength; i++) {
      const item = localStorage.key(i)
      if (item.startsWith(this.prefix)) localStorage.removeItem(item)
    }
  }
}
