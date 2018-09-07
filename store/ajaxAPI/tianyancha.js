import axios from 'axios'
import { getDataPort  } from './perPort.js'

var instance1 = axios.create({
	baseURL: getDataPort, // 线上开发环境
	timeout: 123123,
});

instance1.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
delete instance1.defaults.headers.common.Authorization;

//POST传参序列化
instance1.interceptors.request.use((config) => {
  if(config.method == 'get'){
    config.params.datatype = 'json';
  }else {
    config.data.params.datatype = 'json'
  }

	return config;
}, (error) => {});

//返回状态判断
instance1.interceptors.response.use((res) => {
	// console.log(res)
	//用来判断天眼查接口 不可随意变动
	if (res.data.error_code == '0') {
		return res;
	} else {
		return Promise.reject(res);
	}


}, (error) => {

	Promise.reject(error)
});

export default {
	fetch(type,  url ,  params) {
		return new Promise((resolve, reject) => {
			switch (type) {
				case 'post':
					instance1.post(url, params)
						.then(response => {
							resolve(response.data);
						}, err => {
							reject(err);
						})
						.catch((error) => {
							reject(error)
						})
					break;
				case 'get':
					instance1.get(url, params)
						.then(response => {
							resolve(response.data);
						}, err => {
							reject(err);
						})
						.catch((error) => {
							reject(error)
						})
					break;

			}

		})
	}
}
