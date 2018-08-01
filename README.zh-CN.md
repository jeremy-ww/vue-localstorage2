# vue-localstorage2 [![Build Status](https://img.shields.io/circleci/project/github/Army-U/vue-localstorage2.svg?style=flat-square)](https://circleci.com/gh/Army-U/vue-localstorage2) [![npm package](https://img.shields.io/npm/v/vue-localstorage2.svg?style=flat-square)](https://www.npmjs.com/package/vue-localstorage2)

轻量级适用于 Vue2.0 的 localStorage 插件. [（English Doc）](README.md)

## 特性

* 可根据组件名自动添加 namespace
* 对象存储友好化
* 获取存储值时可以使用类似 [lodash/get](https://github.com/Army-U/sewing/blob/dev/libs/get.js) 方法
* 可直接修改存储对象的单个属性

## 安装

```bash
$ npm i vue-localstorage2 -S
```

## 使用

在 Vue.js 中使用:

```js
import localStorage2 from 'vue-localstorage2'
import Vue from 'vue'

Vue.use(localStorage2)
```

在其他框架中使用, 如 React:
```js
import { Storage } from 'vue-localstorage2'

const storage = new Storage('app_name', 'app_prefix')
storage.set('item', 'value')
storage.get('item', 'default_value')
```

## 配置项

```js
Vue.use(localStorage2, {
  prefix: '<storage_prefix>', // default `app`
  namespace: false            // default `true`
})
```

### 方法

#### `get(path, defaultValue)`

通过类似 [lodash/get](https://github.com/Army-U/sewing/blob/dev/libs/get.js) 的方式获取存储在 storage 中的值.

```js
this.$localStorage.get('name', 'tom')
this.$localStorage.get('list.0.name', 'tom')
```

`get('list.0.name', 'tom')` 其实相当于:

```js
const _list = this.$localStorage.get('list')
get(_list, '0.name', 'tom')
```

#### `set(path, value)`

```js
this.$localStorage.set('name', 'tom')
this.$localStorage.set('list', [{ name: 'mary' }])
```

可直接修改对象的某一个键值, 但应该先保证获取对象 `list.0` 是否存在.

```js
this.$localStorage.set('list.0.name', 'mary')
```

#### `remove(item)`

根据名称删除单个键值.

```js
this.$localStorage.remove('name')
```

#### `clear()`

clear 方法并不会清除该域名下的所有 localStorage, 只会清楚通过 vue-localstorage2 生成的值(即存储值的名称是以 `prefix` + `component name` 开始的键值对).

```js
this.$localStorage.clear()
```

## License

Copyright (c) 2017-present, Army-U. Released under the [MIT](https://opensource.org/licenses/MIT) License.