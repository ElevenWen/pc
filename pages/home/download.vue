<template><!--APP下载-->
	<div id="download">
		<div class="download_top">
			<div class="download_logo" @click="home">
				<img src="~assets/images/common/wqb.png">
			</div>
			<ul>
				<li @click="home">首页</li>
				<li>关于我们</li>
				<li>新闻动态</li>
				<li>登录&nbsp;&nbsp;&nbsp;丨&nbsp;&nbsp;&nbsp;注册</li>
			</ul>
		</div>
		<div class="download_body">
			<span>微企宝 —— 一站式商事服务平台</span>
			<span>有网就能记 让天下没有难记的帐</span>
			<div class="download_QR">
				<img src="~assets/images/home/QR.png">
				<span>扫二维码下载</span>
			</div>
			<div class="download_but">
				<a :href="download_iosAPK"></a>
				<a :href="download_apk"></a>
			</div>
			<div class="download_mobile"></div>
		</div>
		<div class="download_bottom">
			<span>粤ICP备15004929号 XPP . All Rights Reserved</span>
			<span>深圳微企宝计算机有限公司 版权所有</span>
		</div>
	</div>
</template>

<script>

    import { download_iosAPK, download_apk }  from  '~/store/ajaxAPI/vueDynamicParams.js'

  
	export default {
		data() {
			return {
				download_iosAPK:download_iosAPK, // 下载苹果 
				download_apk:download_apk // 下载安卓
			}
		},
		methods: {
			home(){
				this.$router.push('/')
			}
		}
	}
</script>

<style lang="less" type="stylesheet/css" scoped>
*{
	margin: 0px;
	padding: 0px;
}
#download{
	width: 100%;
	background: #FFF;
}
.download_top{
	height: 100px;
	width: 100%;
}
.download_logo{
	height: 100px;
	line-height: 100px;
	float: left;
	margin-left: 15%;
	cursor: pointer;
}
.download_logo img{
	margin-top: 20px;
}
.download_top ul{
	float: right;
	margin-right: 15%;
}
.download_top li{
	float: left;
	font-size: 18px;
    padding: 40px 40px;
    cursor: pointer;
}

.download_body{
	width: 100%;
	height: 650px;
	padding: 90px 15% 0 15%;
	background-image: url(~assets/images/home/bg.png);
}
.download_body span{
	color: #FFF;
    font-size: 60px;
    display: block;
    margin-bottom: 30px;
    width: 80%;
}
.download_body span:nth-child(2){
	font-size: 34px;
}

.download_QR{
	width: 220px;
	height: 300px;
	margin-top: 75px;
	float: left;
}
.download_QR img{
	width: 220px;
	height: 220px;
}
.download_QR span{
	width: 220px;
    height: 32px;
    font-size: 30px !important;
    display: block;
    text-align: center;
    margin-top: 20px;
}
.download_but{
	margin:75px 0 0 55px;
    width: 178px;
    height: 210px;
    float: left;
}
.download_but a{
	display: block;
	width: 178px;
	height: 46px;
	margin: 40px 0;
}
.download_but a:nth-child(1){
	background-image: url(~assets/images/home/ios.png);
}
.download_but a:nth-child(2){
	background-image: url(~assets/images/home/android.png);
}
.download_mobile{
	height: 562px;
    width: 295px;
    float: right;
    margin-top: -45px;
	background-image: url(~assets/images/home/zu5.png);
}
.download_bottom{
	width: 100%;
	height: 80px;
	margin-top: 140px;
}
.download_bottom span{
	display: block;
	text-align: center;
	color: #322720;
	font-size: 24px;
	line-height: 38px;
}
</style>