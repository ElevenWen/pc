require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _nuxt = __webpack_require__(2);

var _api = __webpack_require__(3);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || 3000;

app.set('port', port);

// Import API Routes
app.use('/api', _api2.default);

// Import and Set Nuxt.js options
var config = __webpack_require__(5);

config.dev = !("development" === 'production');

// Init Nuxt.js
var nuxt = new _nuxt.Nuxt(config);

// Give nuxt middleware to express
app.use(nuxt.render);

// Build only in dev mode
if (config.dev) {
  var builder = new _nuxt.Builder(nuxt);
  builder.build();
}

// Listen the server
app.listen(port, host);
console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _express = __webpack_require__(0);

var _users = __webpack_require__(4);

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

// Add USERS Routes
router.use(_users2.default);

exports.default = router;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _express = __webpack_require__(0);

var router = (0, _express.Router)();

// Mock Users
var users = [{ name: 'Alexandre' }, { name: 'Pooya' }, { name: 'Sébastien' }];

/* GET users listing. */
router.get('/users', function (req, res, next) {
  res.json(users);
});

/* GET user by ID. */
router.get('/users/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  if (id >= 0 && id < users.length) {
    res.json(users[id]);
  } else {
    res.sendStatus(404);
  }
});

exports.default = router;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var webpack = __webpack_require__(6);

module.exports = {
	/*
  ** Headers of the page
  */
	env: {
		_NODE_ENV: process.env._NODE_ENV
	},
	head: {
		title: 'busycenter',
		meta: [{
			charset: 'utf-8'
		}, {
			name: 'viewport',
			content: 'width=device-width, initial-scale=1'
		}, {
			hid: 'description',
			name: 'description',
			content: 'Nuxt.js project'
		}],
		link: [{
			rel: 'icon',
			type: 'image/x-icon',
			href: '/favicon.ico'
		}, {
			rel: 'stylesheet',
			type: 'text/css',
			href: '/reset.css'
		}]
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
		/*
   ** Run ESLint on save
   */
		extend: function extend(config, _ref) {
			var isDev = _ref.isDev,
			    isClient = _ref.isClient;

			//			if(isDev && isClient) {
			//				config.module.rules.push({
			//					enforce: 'pre',
			//					test: /\.(js|vue)$/,
			//					loader: 'eslint-loader',
			//					exclude: /(node_modules)/
			//				})
			//			}

			var sassResourcesLoader = {
				loader: 'sass-resources-loader',
				options: {
					resources: ['assets/common/mixin.less', 'assets/common/base.less']
				}
				// 遍历nuxt定义的loader配置，向里面添加新的配置。  
			};config.module.rules.forEach(function (rule) {
				if (rule.test.toString() === '/\\.vue$/') {
					rule.options.loaders.sass.push(sassResourcesLoader);
					rule.options.loaders.scss.push(sassResourcesLoader);
					rule.options.loaders.less.push(sassResourcesLoader);
				}
				if (['/\\.sass$/', '/\\.scss$/', '/\\.less$/'].indexOf(rule.test.toString()) !== -1) {
					rule.use.push(sassResourcesLoader);
				}
			});
		},

		/*
   ** include axios only once in our application
   */
		vendor: ['axios'],
		plugins: [new webpack.ProvidePlugin({
			'$': 'jquery',
			'window.jquery': 'jquery',
			jQuery: 'jquery'
		})]
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
	plugins: ['~plugins/main']
	//router: {
	//   
	//}
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map