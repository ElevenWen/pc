import axios from 'axios'
import qs from 'qs'
import { loginPort   } from './perPort.js'
import tool from "~/assets/lib/tool";

var port = process.env._custom; 
var _host = process.env._host === '0.0.0.0'  ? "localhost" : process.env._host; 

// console.log(loginPort ,'登陆扽牢固')
var baseURL = null;
// if(process.env._NODE_ENV.indexOf('Net') > 0){
// 	baseURL = `http://${_host}:${port}`; //本地请求不能加https
// }else{ 
// 	baseURL = loginPort; 
// }
// console.log('正式运行环境===登陆的',_host,baseURL)
var login = axios.create({
	baseURL:loginPort,  
	timeout: 123123,
});

login.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';


//POST传参序列化
login.interceptors.request.use((config) => {
	return config;
}, (error) => {});

//返回状态判断
login.interceptors.response.use((res) => {
	return new Promise(function(resolve, reject) { 
 
		if(res.data.code==400){
			tool.saveToLocal('CustomerMesg',res.data.data);//用来存放用户信息
	 		resolve(res.data);
		}else{
			reject(res.data);
		}
	})
	
}, (error) => {
	// console.log('Promise.reject(res) ',error)
 
});

export default {
	fetch(type, url , params  ) {
		return new Promise((resolve, reject) => {
			switch (type) {
				case 'post':
					login.post(url, params)
						.then(response => {
							resolve(response.data); 
						})
						.catch((error) => {
//							console.log(error,'error' )
							reject(error)
						})
					break;
				case 'get':
					login.get(url, params)
						.then(response => {
							resolve(response.data);
						})
						.catch((error) => {
							reject(error)
						})
					break;

			}

		})
	}
}