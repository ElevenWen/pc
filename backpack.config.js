const opn = require('opn')
const host = process.env.HOST || 'http://localhost:'
const port = process.env.PORT || 3000

module.exports = {
  webpack: (config, options, webpack) => {
  	 
  	process.env._NODE_ENV = process.env.NODE_ENV
    config.entry.main = './server/index.js'
    if (options.env === 'development') {
      opn(host + port)
    }

    return config
  }
}
