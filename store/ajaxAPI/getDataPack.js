import axios from 'axios'
import qs from 'qs'
import { getDataPort } from './perPort.js'
import tool from "~/assets/lib/tool";

var axios_hub = axios.create({
	baseURL: getDataPort, // 线上开发环境
	timeout: 123123,
});




axios_hub.defaults.timeout = 123123;
axios_hub.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios_hub.defaults.retry = 2;
axios_hub.defaults.retryDelay = 1000;

var CancelToken = axios.CancelToken;
var source = CancelToken.source();

// delete axios_hub.defaults.headers.common.Authorization;

// 线上开发环境
axios_hub.defaults.baseURL = getDataPort;
//
// 线上生产环境

//POST传参序列化
axios_hub.interceptors.request.use((config) => {
	var token = "";
	if(process.client && tool.loadFromLocal("CustomerMesg","ALL")){
		token = tool.loadFromLocal("CustomerMesg","ALL").Token;
	}

  if(config.method  === 'post'){
	  	var patt2 = new RegExp("/Upload/Save");
	  	if(!patt2.test(config.url)){
		    config.data.datatype = 'json';
		    config.data.Token = token;
		    config.data = qs.stringify(config.data);
		    // console.log(config)
	   	}
	}else if (config.method  === 'get') {
		if (config.params) {
     //当属性存在覆盖
			config.params.Token = token;
			config.params.datatype = "json";
		}else{
     //不存在添加
			config.params = {
				"Token" :token,
				"datatype":"json"
			}
		}
    }


    if(!token){ //不存在token过滤
        // console.log("?2222222222222?")
        if(config.method  === 'post'){
            delete config.data.Token;
        }else{
            delete config.params.Token;
        }
    }

    return config;
},(error) =>{

    // console.log(error,"qqqq")
    return Promise.reject(error);
});

//返回状态判断
axios_hub.interceptors.response.use((res) =>{
    if(!res.data.success){
       if(res.data.msg == '用户还未登录，请登录后重试'){
        res.errorCode = '10001'//手动添加用户未登录错误码
       }else if(res.data.msg == "该手机号已被注册！"){
        res.errorCode = '10002'//手动添加用户未登录错误码
       }else if(res.data.code == "300001"){//用户未登录
       	
       }
       return Promise.reject(res)
    }
    return res;
}, (error) => {
    var config = error.config;
	if (!config || !config.retry) return Promise.reject(error);

	config.__retryCount = config.__retryCount || 0;

	if (config.__retryCount >= config.retry) {
	    return Promise.reject(error);
	}

	config.__retryCount += 1;

	return new Promise(function(resolve) {
	    setTimeout(function() {
	      resolve();
	    }, config.retryDelay || 1);
	}).then(function() {
	    return axios(config);
	});


//  return Promise.reject(error).then(function(reason) {
//          // 未被调用
//        }, function(reason) {
//        });
});
export default{
    fetch(type, url, params) {
        return new Promise((resolve, reject) => {
            switch(type){
                case 'post':
                    axios_hub.post(url, params)
                    .then(response => {
                      resolve(response.data);
                    } )
                    .catch((error) => {
                       reject(error)
                    })
                    break;
                case 'get':
                    axios_hub.get(url, params)
                    .then(response => {
                      resolve(response.data);
                    })
                    .catch((error) => {
//                  	//取消请求cancel token
//                  	if(params.params.cancelToken){
//                  		source.cancel(); //执行取消请求, 可以带msg
//                  		reject(error)
//                  	}else{
//                  		reject(error)
//                  	}
						reject(error)
                    })
                    break;
                case 'all':
               		axios_hub.all(url, params)
                    .then(response => {
                      resolve(response.data);
                    },err =>{
                      reject(err);
                    })
                    .catch((error) => {
                        reject(error)
                    })
                    break;
            }

        })
    },
    //取消请求cancel token
    source
}

