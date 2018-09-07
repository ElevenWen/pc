import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import myFilter from './filter'
Vue.use(myFilter)

import axios from 'axios'
Vue.prototype.$http = axios;

import tool from '~/assets/lib/tool';
Vue.prototype.commonTool = tool;



//关键字变红 参数1关键字 ,参数2匹配后需要替换的字
String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.replace(new RegExp(search, 'g'), replacement);
};


Vue.directive('keyWordChange', {
  bind: function (el, binding, vnode) {
	var dataHTML = el.innerHTML;

   // el.innerHTML = dataHTML.replaceAll(binding.value,"<strong  class='keyWordColor'>"+binding.value+"</strong>")
  }
})

Vue.directive('customTimeInter', {
	bind: function (el, binding, vnode) {
// CreateTime":"\/Date(1517297290820)\/"

		var str =  el.innerHTML.trim();
		var tempStr = str.split(';');//[0]开始时间  【1】结束时间


		// console.log(str)
		// 	console.log(tempStr)
		var time = null;
		if(str.indexOf("Date")!=-1){
			time = +tempStr[0].substring((str.indexOf("(")+1),str.lastIndexOf(')') ) - (new Date().getTime()+2000); //23小时59分58秒

		}
		// console.log(tempStr[0].substring(str.indexOf("("),(str.lastIndexOf(')')+1) ))
		// console.log(time)
		//console.log('标记标记',time)
		daojishi(time.toString(),el); //传入倒数计时 时间 和元素
	},
	update:()=>{
		// //console.log("改变ineret")
	}
  })



// 倒计时  cha:倒计时时间
function miaosha(cha){
	 if(cha >= 0) {
		var obj = {
			// 秒转换为分   秒 == 秒/60 取余
			//分 = 秒 /60 取整
			//时 = 分/60 取整
			"s": Math.floor(cha / 1000 % 60),
			"fen": Math.floor(cha / 1000 / 60 % 60),
			"h": Math.floor(cha / 1000 / 60 / 60 % 24),
		};
	} else {
		var obj = {
			"s": 0,
			"fen": 0,
			"h": 0
		};

	}
	// //console.log('obj',obj)
	return obj;
}
//保持2位数
function toTwo(x) {
	var x = x < 10 ? ("0" + x) : x;
	return x;
};




// 倒计时  cha:倒计时时间
function daojishi(cha,el){
	//支付倒计时-- --格式化时间
			var self = {};
			var timerMiao = "timerMiao"+cha;//保证定时器唯一
			//console.log("我在这里啦3333",timerMiao)
			var str = 0;
			var tempTime =  miaosha(cha) ;
			el.innerHTML =  toTwo(tempTime.h)+'时'+toTwo(tempTime.fen)+"分钟"+ toTwo(tempTime.s) +"秒"
			;
			timerMiao = setInterval(()=>{
				var x11 = miaosha(cha);
				var timeS = toTwo(x11.s);
				var timeM = toTwo(x11.fen);
				var timeH = toTwo(x11.h);
				if(x11.h == 0  && x11.fen ==0  && x11.s==0) {
					clearInterval(timerMiao);
				};
				cha-=1000;
		 	    self.hour = timeH ;
		 	    self.minutes  = timeM ;
				self.second1   = timeS ;
				str = `${self.hour}时${self.minutes}分钟${self.second1}秒`
				el.innerHTML = str;
			}, 1000);


}





Vue.prototype.getToken = function(){
      var mes = this.commonTool.loadFromLocal('login_user_id', 'login_user_id', 'login_user_id', false).Token;
      return mes

}

import  WXJSSDKOBJ from "~/store/ajaxAPI/ajax"; //微信授权


Vue.prototype.wxAuth = function({method,code,type,success,url},WXJSSDK=WXJSSDKOBJ){


	//console.log( method,code,type,success,url,'我是成功函数哦')
// const  _ajax = function (method, data, success,title,desc,link,customURL,imgUrl,url="http://112.74.135.230:27078/share/Share") {
	return WXJSSDK._ajax({method:method,data:code,type:type,success:success},url);
}

//创建空实例
var Event = new Vue();
Vue.prototype.$eventHandle = Event;
