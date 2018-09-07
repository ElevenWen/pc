import axios from 'axios'
import qs from 'qs'
import { serverPort   } from './perPort.js'

var baseURL = null;
var login = axios.create({
	baseURL:serverPort,  
	timeout: 123123,
});
login.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';


//POST传参序列化
login.interceptors.request.use((config) => {
	return config;
}, (error) => {
	
});

//返回状态判断
login.interceptors.response.use((res) => {
	return new Promise(function(resolve, reject) { 
	 	resolve(res.data);
	})
	
}, (error) => {
 
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
							reject(error)
						})
					break;
				case 'get':
					login.get(url, params)
						.then(response => {
							resolve(response);
						})
						.catch((error) => {
							reject(error)
						})
					break;

			}

		})
	}
}