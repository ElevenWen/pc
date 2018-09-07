const webpack = require('webpack')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')

module.exports = {
  render: {
    bundleRenderer: {
      cache: require('lru-cache')({
        max: 100,
        maxAge: 1000
      })
    }
  },
  router: {
    middleware: ['auth'],
    scrollBehavior: function (to, from, savedPosition) {
      return {
        x: 0,
        y: 0
      }
    }
  },
  serverMiddleware: [
    // body-parser middleware
    bodyParser.json(),
    // session middleware
    session({
      name: 'login',
      secret: 'super-secret-key',
      resave: false,
      saveUninitialized: false,
      // cookie: { maxAge: 0}
    }),
    // Api middleware
    // We add /api/login & /api/logout routes
    '~/api'
  ],
  /*
   ** Headers of the page
   */
  env: {
    _NODE_ENV: process.env._NODE_ENV,
    _custom: process.env.npm_package_config_nuxt_port,
    _host: process.env.npm_package_config_nuxt_host
  },

  head: {
    title: '微企宝',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        'http-equiv': 'cleartype',
        content: 'on'
      },
      /*优先使用 IE 最新版本和 Chrome  */
      {
        name: 'renderer',
        content: 'webkit'
      }, {
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=edge'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: '微企宝'
      },
      {
        hid: 'description',
        name: 'description',
        content: '微企宝'
      },
      {
        name: '360-site-verification',
        content: '5b1919e005b1477dd045e4e165858d8c'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }, {
      rel: 'stylesheet',
      type: 'text/css',
      href: '/reset.css'
    }],
    script: [{
        src: '/lazysizes.min.js'
      }, {
        src: '/erweima.js'
      },
      {
        src: 'https://hm.baidu.com/hm.js?0969011550bdcf7492b059bcc2123f71'
      }, {
        type: 'text/javascript',
        src: 'https://api.map.baidu.com/api?v=2.0&ak=QGylEuPVGa3SR3bX7EkYVBDERVxTiCsh&s=1'
      }, {
        type: 'text/javascript',
        src: 'http://widget.renren.com/js/rrshare.js'
      }, {
        charset: 'utf-8',
        src: 'https://qzonestyle.gtimg.cn/qzone/app/qzlike/qzopensl.js#jsdate=20111201'
      }
    ]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },
  /*
   ** Build configuration
   */
  build: {
    // 生成环境提取css
    extractCSS: {
      allChunks: true
    },
    /*
     ** Run ESLint on save
     */
    extend(config, {
      isDev,
      isClient
    }) {
      // if(isDev && isClient) {
      //  config.module.rules.push({
      //    enforce: 'pre',
      //    test: /\.(js|vue)$/,
      //    loader: 'eslint-loader',
      //    exclude: /(node_modules)/
      //  })
      // }
      const sassResourcesLoader = {
        loader: 'sass-resources-loader',
        options: {
          resources: [
            'assets/common/mixin.less',
            'assets/common/base.less'
          ]
        }
      };



      // 遍历nuxt定义的loader配置，向里面添加新的配置。
      config.module.rules.forEach((rule) => {
        if (rule.test.toString() === '/\\.vue$/') {
          rule.options.loaders.sass.push(sassResourcesLoader)
          rule.options.loaders.scss.push(sassResourcesLoader)
          rule.options.loaders.less.push(sassResourcesLoader)
        }
        if (['/\\.sass$/', '/\\.scss$/', '/\\.less$/'].indexOf(rule.test.toString()) !== -1) {
          rule.use.push(sassResourcesLoader)
        }
      })

    },
    /*
     ** include axios only once in our application
     */
    vendor: ['axios', 'element-ui'],
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery',
        'window.jquery': 'jquery',
        jQuery: 'jquery'
      })
    ]
  },

  css: [
    // 加载一个 node.js 模块
    // '~assets/reset.css',
    // {
    //   src: '~assets/common/mixin.less',
    //   lang: 'less'
    // }
  ],
  /*
   **
   *getData, getDataPack : axios-customsJS
   */
  plugins: ['~plugins/main'],
}
