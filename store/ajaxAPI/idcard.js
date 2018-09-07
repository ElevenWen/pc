import axios from 'axios'
import qs from 'qs'
import tool from '~/assets/lib/tool';
import {  idCardPort    } from './perPort.js'

// 自定义设置创建一个新的实例
var idCard = axios.create({
    baseURL:idCardPort,
    timeout:11111,
});

idCard.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
//添加一个请求拦截器
idCard.interceptors.request.use((config)=>{
    //在请求发送之前做以下操作
    var localS = tool.loadFromLocal("CustomerMesg","ALL").Token;
    if(localS){ //判断客户是否登录
        if(config.method == 'get'){
            
        }else if(config.method == 'post'){
            config.headers.Authorization = 'APPCODE 9f604f01b44a46b09c78a32a4242fc43';
        }
    }
    return config;
},function(error){
    //当出现请求错误时做以下操作
    return Promise.reject(error);
});

//添加一个返回拦截器
idCard.interceptors.response.use(function(response){
    //对返回的数据进行一些处理
    return response;
},function(error){
    //对返回的错误进行一些处理
    return Promise.reject(error);
});


export default {
    fetch(type, url, params){
        return new Promise((resolve,reject) => {
            switch(type){
                case 'post':
                idCard.post(url, params).then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                })
                break;
            }
        })
    }
}