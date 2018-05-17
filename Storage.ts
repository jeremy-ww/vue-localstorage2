import isType from 'sewing/libs/isType'
import get from 'sewing/libs/get'

interface StorageTarget {
  [propName: string]: any
  [propName: number]: any
}

export default class Storage {
  private prefix: string

  static parse (value: any) {
    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  }

  static update <T extends StorageTarget> (obj: T, path: string[], value: any): T {
    const temp = obj

    while (path.length > 1) {
      obj = obj[path.shift()!]
    }
    obj[path.shift()!] = value
    return temp
  }

  constructor (name = '', prefix = 'app') {
    this.prefix = `${prefix}_${name ? name + '_' : ''}`
  }

  split (path: string) {
    const [target, ...route] = path.split(/\./)
    return { target: this.prefix + target, route }
  }

  get (path: string, defaultValue: any) {
    const { target, route } = this.split(path)
    const item = Storage.parse(localStorage.getItem(target))
    return get(item, route.join('.'), defaultValue)
  }

  set (path: string, value: any) {
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

  remove (item: string) {
    const { target } = this.split(item)
    localStorage.removeItem(target)
  }

  clear () {
    Object.keys(localStorage).forEach(storage => {
      if (storage.startsWith(this.prefix)) localStorage.removeItem(storage)
    })
  }
}
