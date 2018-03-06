module.exports = (options, req) => ({
  entry: './examples/index.js',
  dist: './docs/',
  webpack (config) {
    config.output.publicPath = '/' + require('./package').name + '/'
    return config
  }
})
