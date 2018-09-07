import axios from 'axios'
import {  businessLicensePort  } from './perPort.js'
var businessLicense = axios.create({
	baseURL: businessLicensePort, // 阿里巴巴营业执照接口
	timeout: 123123,
});

businessLicense.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
//businessLicense.defaults.headers.common['Authorization'] = 'APPCODE d941f350729443bfb8e1c6884d66dfab';




//POST传参序列化
businessLicense.interceptors.request.use((config) => {
	config.headers.Authorization = 'APPCODE d941f350729443bfb8e1c6884d66dfab'
    // if(config.method == 'get'){
    //   config.params.datatype = 'json';
    // }else {
    //   config.data.params.datatype = 'json' 
    // }
	return config;
}, (error) => {});

//返回状态判断
businessLicense.interceptors.response.use((res) => {
	//用来判断营业执照返回接口 
	if (res.status == '200') {
		return res;
	} else {
		return Promise.reject(res);
	}


}, (error) => {
	// console.log('Promise.reject(res) ',error)
});

export default {
	fetch(type, url , params  ) {
		return new Promise((resolve, reject) => {
			switch (type) {
				case 'post':
					businessLicense.post(url, params)
						.then(response => {
							// console.log('营业执照返回值111111111111',response)
							resolve(response.data);
						}, err => {
							reject(err);
						})
						.catch((error) => {
							reject(error)
						})
					break;
				case 'get':
					businessLicense.get(url, params)
						.then(response => {
							// console.log('营业执照返回值===============',response)
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