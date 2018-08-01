# vue-localstorage2 [![Build Status](https://img.shields.io/circleci/project/github/Army-U/vue-localstorage2.svg?style=flat-square)](https://circleci.com/gh/Army-U/vue-localstorage2) [![npm package](https://img.shields.io/npm/v/vue-localstorage2.svg?style=flat-square)](https://www.npmjs.com/package/vue-localstorage2)

Lightweight localStorage plug-in for Vue2.0. [（中文文档）](README.zh-CN.md)

## Features

* Add namespace automatically according to the component name
* Object storage friendly
* similar [lodash/get](https://github.com/Army-U/sewing/blob/dev/libs/get.js) method can be used when obtaining storage values
* could modify single property of the storaged object directly

## Install

```bash
$ npm i vue-localstorage2 -S
```

## Usage

In Vue.js:

```js
import localStorage2 from 'vue-localstorage2'
import Vue from 'vue'

Vue.use(localStorage2)
```

In other framework, such as React:

```js
import { Storage } from 'vue-localstorage2'

const storage = new Storage('app_name', 'app_prefix')
storage.set('item', 'value')
storage.get('item', 'default_value')
```

## Options

```js
Vue.use(localStorage2, {
  prefix: '<storage_prefix>', // default `app`
  namespace: false            // default `true`
})
```

### Methods

#### `get(path, defaultValue)`

Get the value stored in storage by method similar to [lodash/get](https://github.com/Army-U/sewing/blob/dev/libs/get.js).

```js
this.$localStorage.get('name', 'tom')
this.$localStorage.get('list.0.name', 'tom')
```

`get('list.0.name', 'tom')` that is equals:

```js
const _list = this.$localStorage.get('list')
get(_list, '0.name', 'tom')
```

#### `set(path, value)`

```js
this.$localStorage.set('name', 'tom')
this.$localStorage.set('list', [{ name: 'mary' }])
```

A key value of an object can be modified directly, but it should be guaranteed whether the object `list.0` exists or not.

```js
this.$localStorage.set('list.0.name', 'mary')
```

#### `remove(item)`

Delete a single key value based on the name.

```js
this.$localStorage.remove('name')
```

#### `clear()`

The clear method does not clear all of the localStorage under the domain name, It is only clear that the value generated through the vue-localstorage2 (that is, the name of the stored value is the value pair that starts with the `prefix` + `component name`).

```js
this.$localStorage.clear()
```

## License

Copyright (c) 2017-present, Army-U. Released under the [MIT](https://opensource.org/licenses/MIT) License.