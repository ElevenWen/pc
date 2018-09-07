
 




import axios from 'axios'
import qs from 'qs'
import { urlShortPort  } from './perPort.js'

import tool from "~/assets/lib/tool";

var port = process.env._custom; 
var _host = process.env._host === '0.0.0.0'  ? "localhost" : process.env._host; 


var baseURL = null;
 
// console.log('正式运行环境==urlShort   =登陆的',_host,baseURL)
var urlShort = axios.create({
	baseURL:urlShortPort,  
	timeout: 123123,
});



 

urlShort.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

 
//POST传参序列化
urlShort.interceptors.request.use((config) => {
	// console.log( config )
	return config;
}, (error) => {});

//返回状态判断
urlShort.interceptors.response.use((res) => {
	return res; 
}, (error) => {
	// console.log('Promise.reject(res) ',error)
 
});

export default {
	fetch(type, url , params  ) {
		return new Promise((resolve, reject) => {
			switch (type) {
				case 'post':
				    // console.log(url, params)
					urlShort.post(url, params)
						.then(response => {
							// console.log(response)
							resolve(response.data); 
						})
						.catch((error) => {
							reject(error)
						})
					break;
				case 'get':
					urlShort.get(url, params)
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
