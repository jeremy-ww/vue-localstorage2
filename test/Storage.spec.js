const path = require('path').join(__dirname, '../dist/vue-localstorage2.js')
const localStorage2 = require('fs').readFileSync(path, 'utf-8')

describe('Storage', () => {
  beforeAll(async () => {
    await page.goto('https://google.com')
  })

  beforeEach(async () => {
    await page.evaluate(() => localStorage.clear())
    await page.evaluate(localStorage2)
    await page.evaluate('var { Storage } = vueLocalstorage2')
  })

  it('should save storage with number', async () => {
    const value = await page.evaluate(() => {
      const storage = new Storage()
      storage.set('number', Math.PI)
      return storage.get('number')
    })
    await expect(value).toBe(Math.PI)
  })

  it('should save storage with boolean', async () => {
    const value = await page.evaluate(() => {
      const storage = new Storage()
      storage.set('boolean', false)
      return storage.get('boolean')
    })
    await expect(value).toBe(false)
  })

  it('should save storage with object', async () => {
    const value = await page.evaluate(() => {
      const storage = new Storage()
      storage.set('object', { name: 'tom', age: 18, sex: 'female' })
      return storage.get('object')
    })
    await expect(value).toEqual({ name: 'tom', age: 18, sex: 'female' })
  })

  it('should save storage with array', async () => {
    const value = await page.evaluate(() => {
      const storage = new Storage()
      storage.set('array', ['Eldon Blanda', 'Abner Roberts', 'Dave Schiller'])
      return storage.get('array')
    })
    await expect(value).toEqual(['Eldon Blanda', 'Abner Roberts', 'Dave Schiller'])
  })

  it('should save storage with json', async () => {
    const value = await page.evaluate(() => {
      const storage = new Storage()
      storage.set('json', { name: 'mary', age: 20, adult: false, score: [10, 20, 30, 40] })
      return storage.get('json')
    })
    await expect(value).toEqual({ name: 'mary', age: 20, adult: false, score: [10, 20, 30, 40] })
  })

  it('should get storage with path', async () => {
    const value = await page.evaluate(() => {
      const storage = new Storage()
      storage.set('json', { list: [undefined, { name: 'jack' }, { name: 'bush' }], score: [10, 20, 30, 40] })
      return [storage.get('json.list.1.name'), storage.get('json.score.2')]
    })
    await expect(value).toEqual(['jack', 30])
  })

  it('should return the default value', async () => {
    const value = await page.evaluate(() => {
      const storage = new Storage()
      return storage.get('never_appeared_key', [{ name: 'MaRin' }])
    })
    await expect(value).toEqual([{ name: 'MaRin' }])
  })

  it('should remove storage item', async () => {
    const value = await page.evaluate(() => {
      const storage = new Storage()
      storage.set('map', { name: 'tom' })
      storage.remove('map')
      return storage.get('map')
    })
    await expect(value).toBe(undefined)
  })

  it('should work with native localStorage', async () => {
    const value = await page.evaluate(() => {
      localStorage.setItem('first', 'foo')
      localStorage.setItem('second', 'bar')
      const storage = new Storage()
      storage.set('first', 'foo')
      storage.set('second', 'bar')
      return JSON.parse(JSON.stringify(localStorage))
    })
    await expect(value).toEqual({ app_first: 'foo', app_second: 'bar', first: 'foo', second: 'bar' })
  })

  it('should save storage with options', async () => {
    const value = await page.evaluate(() => {
      const storage = new Storage('test', 'unit')
      storage.set('foo', 'bar')
      return JSON.parse(JSON.stringify(localStorage))
    })
    await expect(value).toEqual({ unit_test_foo: 'bar' })
  })
})
