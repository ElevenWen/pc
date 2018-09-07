import axios from 'axios'
import { getDataPort   } from './perPort.js'

 

var seo = axios.create({
	baseURL: getDataPort, // 线上开发环境
	timeout: 123123,
});

seo.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
 

//POST传参序列化
seo.interceptors.request.use((config) => {
	//console.log('用来判断天眼查接11111111111111111111111111111111111111111111111',config)
	return config;
}, (error) => {});

//返回状态判断
seo.interceptors.response.use((res) => {
	//console.log('用来判断天眼查接口222222222222222222222222222222222',res)
	//用来判断天眼查接口 不可随意变动  
	return res;
}, (error) => {
	Promise.reject(error)
});

export default {
	fetch(type,  url ,  params) {
		//console.log( url ,'url',params)
		return new Promise((resolve, reject) => {
			switch (type) {
				case 'post':
					seo.post(url, params)
						.then(response => {
						//	console.log('seoAJAXpostpostpostpostpostpostpostpostpostpost',response )
							resolve(response.data);
						}, err => {
							reject(err);
						})
						.catch((error) => {
							reject(error)
						})
					break;
				case 'get':
					seo.get(url, params)
						.then(response => {
                            // console.log('SEOSEOSEOSEOSEOSEOSEOSEOSEOSEOSEOSEOSEOSEOSEOSEOSEOSEOSEOSEOSEOSEOSEOSEOSEOSEOSEOSEOSEO')
                            // console.log(process.client,response )
                            if(response  == undefined){ //处理接口返回undefined 不稳定情况
                                resolve({data:{list:[]}})
                            }
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
