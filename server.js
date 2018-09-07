const express = require('express')
const nuxtObj = require('nuxt')
const Nuxt = nuxtObj.Nuxt;
const Builder = nuxtObj.Builder;
const axios = require('axios')
const fs = require("fs");

const hostConfig = require('./package.json');
const app = express()


const host = process.env.HOST || hostConfig.config.nuxt.host
const port = process.env.PORT || hostConfig.config.nuxt.port

// Import and set Nuxt.js options
let config = require('./nuxt.config.js')


config.dev = !(process.env._NODE_ENV.indexOf('start') >= 0)
const nuxt = new Nuxt(config)

// Start build process in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}
let url = '';
if(process.env._NODE_ENV.indexOf('Net') >= 0){
	url = 'https://api.wqbol.net/Product/GetServerClass';
	getServerList(url)
}else{
	url = 'https://api.wqbol.com/Product/GetServerClass';
	getServerList(url)
}

//请求首页全部分类
function getServerList(url){
	axios.get(url)
	.then((res)=>{
		//同步写入
		fs.writeFileSync('serverList.json', JSON.stringify(res.data.data.list));

	})
	.catch((e)=>{
//		console.log(e)
	})
}

//3分钟定时读取数据更新serverList.json
setInterval(function(){
	axios.get(url)
	.then((res)=>{
		var data = fs.readFileSync('serverList.json', 'utf8');
//		console.log('定时读取成功')
		var jsonA = {'list':res.data.data.list};
  	var jsonB = {'list':JSON.parse(data)};
  	var result = Compare(jsonA, jsonB);
  	if(!result){
  		fs.writeFileSync('serverList.json', JSON.stringify(res.data.data.list));
//		console.log('定时写入成功')
  	}
	})
},300000)

//对比json数据start
function isObj(object) {
    return object && typeof(object) == 'object' && Object.prototype.toString.call(object).toLowerCase() == "[object object]";
}

function isArray(object) {
    return object && typeof(object) == 'object' && object.constructor == Array;
}

function getLength(object) {
    var count = 0;
    for(var i in object) count++;
    return count;
}
function Compare(objA, objB) {
    if(!isObj(objA) || !isObj(objB)) return false; //判断类型是否正确
    if(getLength(objA) != getLength(objB)) return false; //判断长度是否一致
    return CompareObj(objA, objB, true); //默认为true
}
function CompareObj(objA, objB, flag) {
    for(var key in objA) {
        if(!flag) //跳出整个循环
            break;
        if(!objB.hasOwnProperty(key)) {
            flag = false;
            break;
        }
        if(!isArray(objA[key])) { //子级不是数组时,比较属性值
            if(objB[key] != objA[key]) {
                flag = false;
                break;
            }
        } else {
            if(!isArray(objB[key])) {
                flag = false;
                break;
            }
            var oA = objA[key],
                oB = objB[key];
            if(oA.length != oB.length) {
                flag = false;
                break;
            }
            for(var k in oA) {
                if(!flag) //这里跳出循环是为了不让递归继续
                    break;
                flag = CompareObj(oA[k], oB[k], flag);
            }
        }
    }
    return flag;
}
//对比json数据end
// Give nuxt middleware to express
app.use(nuxt.render)

// Start express server
app.listen(port, host,function(){
	console.log(host+':'+port)
})
