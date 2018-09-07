import axios from 'axios'
import qs from 'qs'
import { reportPort  } from './perPort.js'

var report = axios.create({
	baseURL: reportPort, // 记账报税java后台
	// baseURL: 'http://acct.wqbol.net', // 记账报税java后台
	timeout: 123123,
});



//POST传参序列化
report.interceptors.request.use((config) => {
//	config.data = qs.stringify(config.data);
	return config;
}, (error) => {});

//返回状态判断
report.interceptors.response.use((res) => {
	
	if(res.data.info == -1){
		return Promise.reject(res);
	}
	return res;

}, (error) => {
});

export default {
	fetch(type, url , params  ) {
		return new Promise((resolve, reject) => {
			switch (type) {
				case 'post':
					report.post(url, params)
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
					report.get(url, params)
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