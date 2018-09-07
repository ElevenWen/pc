

const express = require('express')
var qs = require('querystring')
// Create express router
const router = express.Router()
var request = require('request');
// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
var app = express();
const fs = require("fs");


//     "devNet"  : "cross-env _NODE_ENV=devNet nuxt",
//     "buildNet": "cross-env _NODE_ENV=startNet   nuxt build",
//     "startNet": "cross-env _NODE_ENV=startNet  nuxt start",
//     "devCom"  : "cross-env _NODE_ENV=devCom nuxt",
//     "buildCom": "cross-env _NODE_ENV=startCom   nuxt build",
//     "startCom": "cross-env _NODE_ENV=startCom   nuxt start",
//     "generateNet": "cross-env _NODE_ENV=generateNet nuxt generate",
//     "generateCom": "cross-env _NODE_ENV=generateCom nuxt generate",
//     "lint": "eslint --ext .js,.vue --ignore-path .gitignore .",
//     "precommit": "npm run lint"

let  loginPort = null;                 //net 后台端口号  天眼查接口 seo接口 登陆接口
let xinlang = 'https://api.t.sina.com.cn/short_url/shorten.json'; // 短链接转换接口
let _NODE_ENV = process.env._NODE_ENV;
// let port = process.env.npm_package_config_nuxt_port ;  //本地端口
// let _host = process.env.npm_package_config_nuxt_host === '0.0.0.0'  ? "localhost" : process.env.npm_package_config_nuxt_host; //本地ip


// console.log( process.env )

if(( _NODE_ENV.indexOf('Net') >= 0)){
  loginPort = `https://api.wqbol.net`; //case 'devNet' || 'startNet'  ||  'generateNet':// net开发环境 || net生产环境 || net静态站点

  // loginPort = `//api.wqbol.net`; //case 'devNet' || 'startNet'  ||  'generateNet':// net开发环境 || net生产环境 || net静态站点

}else if(( _NODE_ENV.indexOf('Com') >= 0)){
  loginPort =  `https://api.wqbol.com`; // case 'devCom' || 'startCom' || 'generateCom':// com开发环境 || com生产环境 || com静态站点
}


// console.log( "environmentenvironmentenvironmentenvironment"   );
// console.log('loginPortloginPort' , loginPort)
// console.log( _NODE_ENV,'运行环境' )

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
});
// Add POST - /api/login

function getHeader() {
  return {
    "Content-type": "application/json;text/html;text/plain; charset=UTF-8",//发送头 不能少否则后台可能无法解析
    "Accept": "text/html,text/plain,*/*",
  };
}

router.post('/urlShort', (req, res) => {  //长链接转短链接

  // console.log( "environmentenvironmentenvironmentenvironment"   );
  // console.log(process.env._NODE_ENV )
  var bodyTemp =  req.body;
  let url = req.body.url;
  // console.log('===?????????????????????????====');


  // console.log(`${xinlang}?source=4110768210&url_long=${url}`)
  //request.get() ============================= 开始
  request.get(`${xinlang}?source=4110768210&url_long=${url}`,
  // request.get(`https://api.t.sina.com.cn/short_url/shorten.json?source=4110768210&url_long=当前链接地址`,
    headers=  getHeader(),
    function(error, response, body) {
      // console.log('error',   error  );
      // console.log('11111111111111111111111111111111111111111111111')
      // console.log('error',  typeof body  );

      if(typeof body  == 'undefined'){
        return res.json({
            code: 401 ,
            data:{
              msg: '输入的网址不合法'
            }
        })
      }
      // console.log('AAA', JSON.parse(body ))
      // console.log('=222222222222222222222222222222222222222222222222222')
      if( JSON.parse(body).error  != undefined){
        return res.json({
                code: 401 ,
                data:{
                   msg: '输入的网址不合法'
                }
            })

      }
      return  res.json({
          code: 400 ,
          data:{
              url_short:JSON.parse(body)[0].url_short
          }
      })
  })
})

//request.get()  ============================= 结束



router.post('/login', (req, res) => {
  var bodyTemp =  req.body;
  bodyTemp.dataType = 'json';
  let option1 = {
    json: true, //参数格式
    header : getHeader(),
    body: bodyTemp//参数
  };


  // request.post(`${_url}/Customer/Login`, option1, function(error, response, body) {
  request.post(`${loginPort}/Customer/Login`, option1, function(error, response, body) {
//


//  console.log('error',   body  ,typeof body  );
    if(typeof body  == 'undefined'){
      return res.json({
          code: 401 ,
          data:{
           message: '登录失败，请检查账号密码输入是否正确'
          }
      })
    }

    // console.log('登陆请求地址:', `${loginPort}/Customer/Login`)


    if(typeof body != 'object'){
      // var error = body.indexOf('错误提示');
      var abc = body.indexOf("用户名或密码")
      var edf = body.indexOf("执行加密")
        if(abc > 0){
          req.session.authUser = null;

          return  res.json({
              code: 401 ,
              data:{
                 message: '登录失败，请检查账号密码输入是否正确'
              }
            })
        }else if( edf > 0 ){
           req.session.authUser = null;
           return  res.json({
            code: 402 ,
            data:{
                 message: '登录超时'
               }
            })
        }else {
           req.session.authUser = null;
           return  res.json({
            code: 403 ,
            data:{
                 message: '未知错误'
               }
            })
        }
    }
    else{
      req.session.authUser = body.data
      body.code = 400
      // console.log(' req.session.authUser', req.session.authUser)
      return res.json(body)
    }
  })
})

// Add POST - /api/logout
router.post('/logout', (req, res) => {
//   console.log('退出')
  delete req.session.authUser
  return res.json({
    code:400,
    data:{
      logout:true
    }
  })
})

//首页全部分类
router.get('/Product/GetServerClass', (req, res) => {

	let serverList = fs.readFileSync('serverList.json', 'utf8');
	serverList = JSON.parse(serverList);
  	return res.json({
	    code:200,
	    data:{
	      list:serverList
	    }
	})
})

// Export the server middleware
module.exports = {
  path: '/api',
  handler: router
}
