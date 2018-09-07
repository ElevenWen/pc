<template>
	<div class="c-hd">
		<div class="c-hd-nav"  >
			<div class="left">
				<span class="c-nowCity"><i class="geog"></i><i>{{defaultCity}}  </i><img src="~assets/images/common/xiala.png" alt=""></span>
				<ul class="c-city">
					<!--<li class="c-city-items">
						<a data-id="1" href="javascript:void(0)" class="selected">深圳市</a>
					</li>-->
					<li class="c-city-items" v-for="(data,index) in cityData" :key='index'>
						<a data-id="index+1" href="javascript:void(0)" @click="toChoose(data.ShortName)">{{data.ShortName}}</a>
					</li>
				</ul>
			</div>
			<div class="c-nowCitys">微企宝一站式服务平台</div>
			<div class="right">
				<ul class="itemWrap"   >
					<!-- <li class="items userMesgJ" style="min-width:150px" v-if="!userMesgInfo"></li> -->
			        <li class="items userMesgJ"   v-if="userMesgInfo" @mouseenter="userMesgJ(this, $event)" @mouseleave="userMesgC(this, $event)">
			            <a @click="toMyCenter" :class="userMesg.Nickname?'nickName' :''" >{{userMesg.Nickname}}</a>
			            <a @click="toMyCenter"  :style="score.LevelDes ? 'background: #cccccc; color: #fff;': 'background:tranparent!important'">{{score.LevelDes}}</a>
			            <i class="xiala"><img src="~assets/images/common/xiala.png" alt=""></i>
			            <div class="userMesg" @click="toPersonalCenter">
			            	<img :src="userMesg.HeadPicPath" v-if="userMesg.HeadPicPath" class="userMesg_img">
			            	<img src="~assets/images/tabBar/default_head.png" class="userMesg_img" v-else>
			            	<div class="CompanyLevel">{{score.LevelDes}}</div>
			            	<div class="integral">积分：<label>{{score.Score}}</label></div>
			            	<span @click.stop.prevent="quitLogin">退出</span>
			            </div>
          			</li>
					<li class="items" v-else>
						<a @click="login">您好,请登录</a>
						<a @click="register" >未注册</a>
					</li>
					<li class="items">
						<a @click="goToOrder">我的订单 </a>
					</li>
					<li class="items" id="shoppingCar" @mouseenter="shoppingCarIn" @mouseleave="shoppingCarOut">
						<a href="javascript:;" class="shoppingCarWrap">
							<i class="gouwuche"></i>&nbsp;购物车&nbsp;
							<span>&nbsp;&nbsp;{{shoppingCarList.length}}</span>
							<i class="xiala"></i>
						</a>
						<!-- 隐藏的购物车列表start -->
						<div  class="show" v-if='hideCar'>
							<!-- 购物车有商品时 -->
							<div v-if="shoppingCarList.length" class="showCarWrap">
								<div class="carWord">最近加入的宝贝：</div>
								<div class="babyList" v-for="(items,index) in shoppingCarList.slice(0,5)" :key="index">
									<img :src="items.PCThumbImgURL" @click="toProductDetail(items)">
									<div class="babyDesWrap">
										<div class="desFirst" @click="toProductDetail(items)">
											<span class="redWord">{{items.ProductName}}</span>
											<span>{{items.Price}}</span>
											<span>¥</span>
										</div>
										<div class="babySecond">
											<span>{{items.ProductType}}</span>
											<span @click="delCarPro(shoppingCarList,index)">删除</span>
										</div>
									</div>
								</div>
								<div class="line"></div>
								<div class="carFooter">
									<div class="babyNum" v-if="residueNum > 0">购物车里还有 {{residueNum}} 件商品</div>
									<div class="babyNum" v-else>购物车里还有 0 件商品</div>
									<div class="toCar" @click="toShoppingCar">查看我的购物车</div>
								</div>

							</div>
							<!-- 购物车为空时 -->
							<div class="empty" v-else><span>您的购物车中没有商品，先去选购吧！</span></div>
						</div>
						<!-- 隐藏的购物车列表end -->
					</li>
					<li class="items">
						<nuxt-link to="/helpCenter/helpCenter" rel="nofollow">帮助中心</nuxt-link>
					</li>
					<li class="items">
						<a style="cursor: auto;">咨询电话:<span class="tel">400-8822-991</span></a>
					</li>
					<li class="items" @mouseenter="enterFn(this,$event)" @mouseleave="leaveFn(this,$event)">
						<a><img src="~assets/images/common/mobile.png">手机版<i class="xiala"></i></a>
						<div class="QR_code" ref="QR_code">
							<div><img src="~assets/images/tabBar/QR_code.png"></div>
							<div class="QR_code_R">
								<span>手机微企宝</span>
								<span>新人专享大礼包</span>
								<span><img src="~assets/images/tabBar/RichScan.png" />扫一扫下载</span>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import getD from '~/store/ajaxAPI/getData.js'
	import tool from '~/assets/lib/tool'
	import {mapActions, mapState } from 'vuex'
	import axios from "axios";
	import { getDataPort } from "~/store/ajaxAPI/perPort.js";
	export default {

		data() {
			return {
				// showCar:false,  //是否展示购物车列表
				hideCar:false,   //是否展示购物车列表
				have:true, //判断购物车是否有商品（后期有接口后根据接口条件来写，可删掉这行）
				shoppingCarList:[],//购物车列表数据
				residueNum:0, //购物车列表剩余没有展示的数量
				defaultCity:"深圳",//默认显示城市
                userMesg: {},     //当前登录用户信息
                score: {}, //积分
                userMesgInfo:true,
                addCart:false, //是否加入了购物车
				onlyFive:0, //只让展示前五条数据
				cityData:[],//城市列表
			}
		},
		props:{
			isHome:Boolean,
			isPrePayment:Boolean,
			isActivities:Boolean
		},
		computed: {
			...mapState({
				'authUser':'authUser'
			})
		},
		mounted(){
			//当cookie不存在时删除本地信息
			if(tool.loadFromLocal("CustomerMesg","ALL")){
				if(!tool.getSSOCookie()){
		       		tool.removeLocal('CustomerMesg');
		       		getD.loginOut()
		       		.then((res)=>{
						this.lognOut_X();
					})
		       	}else{
		       		//获取积分
	   		        getD.myScore()
	   		        .then((res) => {
	   		        	this.score = res.data;
	   		        })
	   		        
	   		        //获取用户信息
	   		        getD.getcustorInfor()
	   				.then((res)=>{
	   					this.userMesg = res.data;
	   				})
	   				.catch((error)=>{
	   					if(error.data.code == "300001"){
	   						//触发空实例的自定义事件
							this.$eventHandle.$emit('get-login',false);
							this.userMesgInfo = false;
							$(".right .itemWrap .items").css({"background":"none","border":"1px solid #dedede","border-bottom":"none"});
							//调用退出接口
							getD.loginOut()
							.then((res)=>{
								this.lognOut_X();
								this.$router.push("/loginAndRegister/login");
							})
	   					}
	   				})
		       	}
			}else{
				//本地存储不存在删除cookie
	       		getD.loginOut()
	       		.then((res)=>{
					this.lognOut_X();
				})
	       		
	       		this.userMesgInfo = false;
			}
	       	
			
			if(!this.isHome){
				$(".QR_code").css({"display":"none"});
			}

		    if( this.authUser == null || this.authUser == undefined){ //当来自服务器端 且 登录状态为0 删除本地存储
		       	//   console.log('我在topState中哦')
		          tool.removeLocal("CustomerMesg") ;
		          tool.delCookie();
		          $('#login .loginframe .loginForm').css('transform',"translateX("+ 0 +"%)");
		          $('#login .loginframe .loginSuccessed').css('left',100+'%');
		    }


		 	let loadingInstance = this.$loading({ fullscreen: true })

	 		//监听home登录状态
	 		this.$eventHandle.$on('get-login',(val)=>{
	 			this.userMesgInfo = val;
	 			if (this.userMesgInfo) {
	 				getD.getcustorInfor()
	 				.then((res)=>{
	 					this.userMesg = res.data;
	 				})
	 				//获取积分
	 		        getD.myScore()
	 		        .then((res) => {
						// this.userMesg.CompanyLevel
	 		        	this.score = res.data;
	 		        })
	 			}
	 		})

		 	

		    //监听第三方登录状态
		 	this.$eventHandle.$on('otherlogin',(val)=>{
		 		tool.loadFromLocal("CustomerMesg","ALL")
		 		// alert("已经登录了")
		 	})

		 	if(tool.loadFromLocal("CustomerMesg","ALL")){
	 		    // 请求购物车列表数据
	 		   	this.requestCart();
		     }

	        //监听商品详情页是否购买了商品 购买则调接口刷新视图
		 	this.$eventHandle.$on("add_cart",(val) => {
		 		this.addCart = val;
		 		if(tool.loadFromLocal("CustomerMesg","ALL")){
		 		    // 请求购物车列表数据
		 		   	this.requestCart();
		    	}
		 	})

		 	// 监听是否删除了商品
		 	this.$eventHandle.$on("delet_cart",(val) => {
		 		if(tool.loadFromLocal("CustomerMesg","ALL")){
		 		    // 请求购物车列表数据
		 		   	this.requestCart();
		    	}
		 	})

	 		//获取城市列表
		 	getD.getAreaList()
		 	.then((res)=>{
		 		res.data.list.forEach((val)=>{
		 			if (val.IsHot) {
		 				this.cityData.push(val);
		 			}
		 		});
		 		this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭  首页加载完毕后停止loading 界面
	               loadingInstance.close();
	             });
		 	})
		},
		methods: {
			//我的订单路由跳转
			goToOrder(){
				if(tool.loadFromLocal("CustomerMesg","ALL")){
					this.$router.push('/personalCenter/allOrder')
				}else{
					this.$router.push('/loginAndRegister/login')
				}
			},
			...mapActions({
				'lognOut_X':'lognOut_X'
			}),
			requestCart(){ // 请求购物车列表数据
				getD.ShoppingCarList().then((response) => {
					this.shoppingCarList = response.data.list;
					// console.log("000",response.data.list)
				    // 赋值给购物车列表剩余没有展示的数量
				    this.residueNum = this.shoppingCarList.length - 5;
				})
				.catch((err) => {
					// //console.log("err",err);
				})
			},
			userMesgJ(data,data1){ //显示客户信息
				$(data1.target).css({"background":"#FFF","border":"1px solid #ccc","border-bottom":"none"});
				$(data1.target).children('a:nth-child(2)').css('color','#ff3e08')
					$(".userMesg").show();
			},
			userMesgC(data,data1){ //隐藏客户信息
				// $(data1.target).css({"background":"none","border":"1px solid #dedede","border-bottom":"none"});
				$(data1.target).css({"background":"none","border":'none',"border-bottom":"none"});
				$(data1.target).children('a:nth-child(2)').css('color','#fff')
				$(".userMesg").hide();
			},
			quitLogin(){ //退出登录
				//触发空实例的自定义事件
				this.$eventHandle.$emit('get-login',false);
				this.userMesgInfo = false;
				$(".right .itemWrap .items").css({"background":"none","border":"1px solid #dedede","border-bottom":"none"});
				tool.removeLocal("CustomerMesg");
				//调用退出接口

				getD.loginOut().then((res)=>{
					// console.log(res,'退出退出 ')
					this.lognOut_X();
					if(this.isPrePayment){
						this.$router.push({path:"/loginAndRegister/login",query:{prepayment:1}});
					}else{
						this.$router.push("/loginAndRegister/login");//退出后进入login 页面
					}

				})
				//
			},
			//二维码滑过效果
			enterFn(data, data1){
				$(data1.target).children(".QR_code").css({"width":"210px","right":"0px"});
				$(".QR_code").css({"display":"block"});
				$(".QR_code_R").css({"display":"block"});
			},
			leaveFn(data, data1){
				$(data1.target).children(".QR_code").css({"width":"90px","right":"0px"});
				$(".QR_code").css({"display":"none"});
				$("#home .QR_code").css({"display":"block"});
				$(".QR_code_R").css({"display":"none"});
			},
			// 购物车列表
			shoppingCarIn(){
				console.log('shoppingCarIn显示购物车')
				// this.showCar = !this.showCar;
				// this.hideCar = !this.hideCar;

				this.hideCar = true;
			},
			shoppingCarOut(){
				console.log('shoppingCarIn隐藏购物车')
				// this.showCar = !this.showCar;
				// this.hideCar = !this.hideCar;
				this.hideCar = false ;
			},
			// 删除购物车列表里的商品
			delCarPro(val,index){
				//console.log("val",val);
				var param = {
					params : {
						ids: val[index].Id
					}
				}
				getD.ShoppingCartRemove(param).then((res) => {
					// //console.log("res",res);
					val.splice(index,1);
					this.residueNum--;
				});
				//触发空实例的自定义事件
		        this.$eventHandle.$emit("delet_cart",true);
			},
			//帮助中心
			helpCenter(){
				this.$router.push("/helpCenter/helpCenter");
			},
			// 跳转到购物车页面
			toShoppingCar(){
				this.$router.push("/cart/cart");
			},
			//注册
			register(){
				this.$router.push("/loginAndRegister/register");
			},
			//登录
			login(){
				if(this.isPrePayment){
					this.$router.push({path:"/loginAndRegister/login",query:{prepayment:1}});
				}else if(this.isActivities){
					this.$router.push({path:"/loginAndRegister/login",query:{activities:1}});
				}else{
					this.$router.push("/loginAndRegister/login");
				}
			},
			//选择城市
			toChoose(name){
				this.defaultCity = name;
			},
			toMyCenter(){ //跳转到账户设置个人中心
				this.$router.push("/personalCenter/personalCenterIndex");
			},
			// 跳转到详情页
			toProductDetail(val){
				// this.$router.push({path:'/productDetails',query:{id:val.ProductId,type:val.Type}});
				//this.$router.push({path:'/productDetails',params:{id:val.ProductId,type:val.Type}});
				this.$router.push({
					path:'/productDetails/' + val.ProductId + '/' + val.Type
				});
			},
			// 跳转到个人中心首页
			toPersonalCenter(){
				this.$router.push("/personalCenter/personalCenterIndex");
			},
			_router(){
				if(this.$route.path!='/'){
					this.$refs.QR_code.style.display = 'none'
				}
			}
		},
		watch:{
			'$route':'_router'
		}
	}
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "~assets/common/index.less";
	@import "~assets/common/common.less";
	.userMesg{
		height: 98px;
	    width: 230px;
	    display: none;
	    position: absolute;
	    margin: 6px 0 0 -1px;
	    background: #FFF;
	    z-index: 99;
	    border: 1px solid #ccc;
		border-top: none;
		cursor: pointer;
	}
	.userMesg span{
	    color: #666;
	    position: absolute;
	    right: 0;
	    margin: 12px;
	    cursor: pointer;
	}
	// .userMesg{
	// 	width: 60px;
	//     height: 60px;
	//     border-radius: 50%;
	//     border: 1px solid #ccc;
	//     float: left;
	//     margin: 19px 12px 19px 11px;
	//     background-image: url(../../assets/images/tabBar/default_head.png);
	//     background-size: 100% 100%;
	// }
	.userMesg_img{
		width: 60px;
	    height: 60px;
	    border-radius: 50%;
	    border: 1px solid #ccc;
	    float: left;
	    margin: 19px 12px 19px 11px;
	    background-size: 100% 100%;
	}
	.userMesg .CompanyLevel{
		width: 60px;
		height: 18px;
		line-height: 18px;
		float: right;
    	margin: 30px 82px 0 0;
		color: #fff;
		font-size: 12px;
		text-align: center;
		background: #ccc;
	}
	.userMesg .integral{
		width: 100px;
	    height: 18px;
	    line-height: 18px;
	    float: right;
	    font-size: 12px;
	    margin: 8px 42px 0 0;
	    color: #999;
	}
	.userMesg .integral label{
		color: #ff3e08;
	}
	.show{
		width: 320px;
		display: block;
		position: absolute;
	    border: 1px solid rgb(204,204,204);
	    border-top: none;
	    /*// height: 44px;*/
	    z-index: 99999;
	    margin-top: 6px;
	    background-color: #fff;
	    margin-left: -1px;
	}
	.hide{
		display: none;
	}
	#shoppingCar:hover{
		border:1px solid rgb(204,204,204);
		border-bottom: none;
		background-color: #fff;
	}
	.empty{
		margin: 15px 0 15px 29px;
	}
	.empty span{
		font-size: 12px;
		color: rgb(103,103,103);
		color: black !important;

	}
	.carWord{
		margin: 24px 0 0 12px;
		font-weight: 600;
	}
	.babyList{
		margin: 10px auto;
		cursor: pointer;
	}
	.babyList img{
		display: inline-block;
		width: 40px;
		height: 40px;
		margin: 15px 0 0 12px;
		cursor: pointer;
	}
	.babyDesWrap{
		display: inline-block;
		width: 70%;
		vertical-align: top;
		margin: 15px 0 0 10px;
	}
	.redWord:hover{
		color:  rgb(255,62,8);
	}
	.redWord{
		font-size: 14px;
		font-weight: 600;
		color: rgb(0,0,0) ;
	}
	.desFirst span:nth-child(3){
		float: right;
		color: black !important;
	}
	.desFirst span:nth-child(2){
		float: right;
		margin-left: 5px;
	}
	.babySecond{
		margin-top: 8px;
	}
	.babySecond span:nth-child(1){
		font-size: 12px;
		color: rgb(153,153,153) !important;
	}
	.babySecond span:nth-child(2){
		float: right;
		font-size: 12px;
		color: black !important;
		cursor: pointer;
	}
	.line{
		width: 92%;
		height: 1px;
		margin: 5px auto;
		background: rgb(204,204,204);

	}
	.carFooter{
		float: right;
	}
	.babyNum{
		padding: 5px 10px;
		font-weight: 600;
	}
	.toCar{
		width: 104px;
		height: 26px;
		background-color: rgb(255,62,8);
		border-radius: 3px;
		color: white;
		font-size: 12px;
		text-align: center;
		line-height: 26px;
		float: right;
		cursor: pointer;
		margin: 5px 10px 10px 0;
	}
	.tel{
		color: #ff3e08;
	}
	.nickName{
		padding-right: 10px !important;
	}
</style>
