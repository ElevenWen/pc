//ajax 
import { ajaxAPI_ajaxShareJS } from '~/store/ajaxAPI/vueDynamicParams.js';

// console.log('我在分享页面哦 ' ,ajaxAPI_ajaxShareJS)

// http://share.wqbol.com/share/Share
const  _ajax = function ({method, data, type,success,title,desc,link,customURL,imgUrl},url=`${ajaxAPI_ajaxShareJS}`) {  //正式 
// const  _ajax = function ({method, data, type,success,title,desc,link,customURL,imgUrl},url="http://112.74.135.230:27078/share/Share") {  //测试 

	 // //console.log(   method, data,type, success  ); 
	 // 	//console.log( url  );
	var xhr = null;
	try {
		xhr = new XMLHttpRequest();
	} catch (e) {
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	if (method.toLowerCase() == 'get' && data) {
		//console.log(data)
		//alert(data)
		url +="?"+encodeURIComponent(data);
		//alert(url)
	};
 
	xhr.onreadystatechange = function() { 
		if ( xhr.readyState == 4 ) {
			if ( xhr.status == 200 ) { 
				// //console.log("成功成功成功成功成功成功成功成功")
				//  //console.log(xhr.response)
				 if(xhr == null ||  JSON.parse(xhr.response) ==null){
				 	return 
				 }else{
				 	let tempData = JSON.parse(xhr.response)
					return success(  tempData  );
				 }
			} else {

				alert('出错了,Err：' + xhr.status);
				//console.log(  xhr )
			}
		} 
	} 
  
	xhr.open(method,url,false); 

	if (method == 'get') {
		xhr.send();
	} else {
		xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');//post请求
		let temp = 'code=' + data+'&type='+type;
		xhr.send( temp  );
	} 
	 
}//_ajax==>END 




	//定义一些常量
var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
var PI = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;

//地理定位 精确位置
function gcj02tobd09(lng, lat) {
    var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
    var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
    var bd_lng = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    return [bd_lng, bd_lat]
}

//bd09(百度)坐标转换具体地址函数(逆地址解析)
function get_address(lat,lng) {
	//console.log(lat, lng,"经纬度");
	//经纬度
	var point = new BMap.Point(lng,lat);
	///逆地址解析  经纬==> 具体地址
	var geoc = new BMap.Geocoder();    
	geoc.getLocation(point, function(rs){

		var addComp = rs.addressComponents;
		var o = {
			province:addComp.province,
			city:addComp.city,
			district:addComp.district,
			street:addComp.street,
			streetNumber:addComp.streetNumber
		};

		//把 obj 转换成 str
		var address = JSON.stringify(o);
		//console.log(address,"逆地址解析  具体地址");
		//位置信息存储到本地(localStorage)，后面的页面调用；
		localStorage.address = address;
	});  
};






//_wxShare 微信分享接口 
const  _wxShare = function  (title,desc,customURL,imgUrl,Data){ 
				            if(Data == undefined){
				             	return 
				            }
				           // alert( Data.signature )

					        wx.config({
					            debug: true,					            
					            appId: Data.appId,
					            timestamp: Data.timestamp,
					            nonceStr: Data.nonceStr,
					            signature: Data.signature,
					            jsApiList: [
					              'checkJsApi',
					              'onMenuShareTimeline',
					              'onMenuShareAppMessage',
					              'onMenuShareQQ',
					              'onMenuShareWeibo',
					              'onMenuShareQZone',
					              'hideMenuItems',
					              'showMenuItems',
					              'hideAllNonBaseMenuItem',
					              'showAllNonBaseMenuItem',
					              'translateVoice',
					              'startRecord',
					              'stopRecord',
					              'onVoiceRecordEnd',
					              'playVoice',
					              'onVoicePlayEnd',
					              'pauseVoice',
					              'stopVoice',
					              'uploadVoice',
					              'downloadVoice',
					              'chooseImage',
					              'previewImage',
					              'uploadImage',
					              'downloadImage',
					              'getNetworkType',
					              'openLocation',
					              'getLocation',
					              'hideOptionMenu',
					              'showOptionMenu',
					              'closeWindow',
					              'scanQRCode',
					              'chooseWXPay',
					              'openProductSpecificView',
					              'addCard',
					              'chooseCard',
					              'openCard'
					            ]
					        });

					      	

				            wx.ready(function() {
						  		//alert("测试格式化ready里面")  
					            wx.onMenuShareAppMessage({
					                title: title,
					                desc: desc,
					                link: customURL,//自定义分享url 
					                imgUrl: imgUrl,
					    //             "img_width": "160", 
									// "img_height": "160",
					                trigger: function(res) { 
					                	// alert('trigger'); 
					                  //    alert(link);
					                    // window.location.href = link;
					                },
					                success: function(res) {
					                	//console.log(" 成功")
					                	//alert('成功');
					                },
					                cancel: function(res) {
					                  // alert('失败');
					                  // alert("  点击我微信圈=== 取消 ") 
					                },
					                fail: function(res) { 
					                  // alert("我fail") 
					                }
					            });




					            wx.onMenuShareTimeline({
								    title: title, 
					                link: customURL,//自定义分享url 
					                imgUrl: imgUrl,
					                "img_width": "160", 
									"img_height": "160",
								    success: function () { 
								        // 用户确认分享后执行的回调函数
								    },
								    cancel: function () { 
								        // 用户取消分享后执行的回调函数
								    }
								});	



					           
					           	 wx.getLocation({
						            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标(中国标坐标)，可传入'gcj02'
						            success: function (res) {
						            	//console.log("我在地理定位里面")
						            	//console.log(res)
						            	// alert(res)
						            	// alert(1)
						                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
						                var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
						                var speed = res.speed; // 速度，以米/每秒计
						                var accuracy = res.accuracy; // 位置精度
										//注意整个setTimeout不能够在pc使用
						               
										/*
										 *gcj02tobd09 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
										 * 第一返回维度  第二返回 经度
										 * */ 
									 
							            var arr = gcj02tobd09(longitude,latitude);
							            latitude = arr[1];
							            longitude = arr[0];
							            get_address(latitude,longitude);

						            },
						            cancel: function(res) {
					                 // alert('失败');
					                  // alert("  点击我微信圈=== 取消 ") 
					                },
					                fail: function(res) { 
					                 // alert("我fail ==>地理定位") 
					                },
					                error:function(){
					                	//alert("error")
					                }
						        });
					           
					           

					        })// ready==>END

					        wx.error(function(res) { 
					          	//alert("签名失败") 
					        });
			   	
	         	  
 
}  //_wxShare==>END





export default{
	_ajax,
	_wxShare
}