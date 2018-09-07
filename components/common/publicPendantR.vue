<template><!--左边挂件-->
	<div class="c-header">
		<div class="c-sildeBarRWrap">
			<!--<i class="line"></i>-->
			<div class="c-sideBarR">
				<dl class="c-sildeWrap" data-user="" @mouseenter="enterFn(this,$event)" @mouseleave="leaveFn(this,$event)" v-if="$route.path != '/'">
					<dt class="sildeShow">
						<a href="http://html.ecqun.com/kf/sdk/openwin.html?corpid=7331675&cstype=rand&mode=0&cskey=SqGFFE7Glw76x6szdw&scheme=0" target="_blank">
							<img src="~assets/images/common/service.png" />
	                    	<span>在线服务</span>
						</a>
	                </dt>
					<!-- <dd class="sildeHide">
						<div class="sildeHide_region">
							<span>专业顾问，免费咨询</span>
							<ul>
								<li @mouseenter="enterLi(this,$event)" @mouseleave="leaveLi(this,$event)">宝安区</li>
								<li @mouseenter="enterLi(this,$event)" @mouseleave="leaveLi(this,$event)">罗湖区</li>
								<li @mouseenter="enterLi(this,$event)" @mouseleave="leaveLi(this,$event)">龙岗区</li>
								<li @mouseenter="enterLi(this,$event)" @mouseleave="leaveLi(this,$event)">福田区</li>
								<li @mouseenter="enterLi(this,$event)" @mouseleave="leaveLi(this,$event)">南山区</li>
								<li @mouseenter="enterLi(this,$event)" @mouseleave="leaveLi(this,$event)">盐田区</li>
								<li @mouseenter="enterLi(this,$event)" @mouseleave="leaveLi(this,$event)">光明新区</li>
								<li @mouseenter="enterLi(this,$event)" @mouseleave="leaveLi(this,$event)">坪山新区</li>
								<li @mouseenter="enterLi(this,$event)" @mouseleave="leaveLi(this,$event)">龙华区</li>
							</ul>
						</div>
					</dd> -->
				</dl>
				<dl class="c-sildeWrap" data-cart=""  @mouseenter="enterFn(this,$event)" @mouseleave="leaveFn(this,$event)">
					<dt class="sildeShow">
						<img src="~assets/images/common/phone.png" />
	                    <a>免费通话</a>
	                </dt>
					<dd class="sildeHide ">
						<div class="sildeHide_phone">
							<span>24小时电话咨询</span>
							<input placeholder="请输入您的手机号码" ref="telphone"/>
							<button @click="telphone">免费通话</button>
						</div>
					</dd>
				</dl>
				<dl class="c-sildeWrap" data-love=""  @mouseenter="enterFn(this,$event)" @mouseleave="leaveFn(this,$event)">
					<dt class="sildeShow" @click="cart">
						<img src="~assets/images/common/shopping.png" />
	                    <a>购物车</a>
	                    <div class="number">{{num}}</div>
	                </dt>
				</dl>
				<dl class="c-sildeWrap" data-msg=""  @mouseenter="enterFn(this,$event)" @mouseleave="leaveFn(this,$event)" @click="download">
					<dt class="sildeShow">
						<img src="~assets/images/common/downloadAPP.png" />
	                    <a>下载APP</a>
	                </dt>
					<dd class="sildeHide">
						<div class="sildeQR">
							<img src="~assets/images/tabBar/QR_code.png">
							<span>手机微企宝</span>
							<span>新人专享大礼包</span>
							<span><img src="~assets/images/tabBar/RichScan.png">&nbsp;&nbsp;扫一扫下载</span>
						</div>
					</dd>
				</dl>
				<dl class="c-sildeWrap top" data-cart="" @click="top" id="top" @mouseenter="enterFn(this,$event)" @mouseleave="leaveFn(this,$event)" >
					<dt class="sildeShow  ">
						<img src="~assets/images/common/top.png" />
	                    <a href="javascript:void(0)">返回顶部</a>
	                </dt>
				</dl>
			</div>
		</div>
	</div>
</template>

<script>
	import getD from '~/store/ajaxAPI/getData.js'
	import tool from '~/assets/lib/tool'
	// import {MonitorLogin} from '../../util/isLogin'
	export default {
		data() {
			return {
				num:0,//显示购物车数量
				_addCart:false, //是否加入了购物车
			}
		},
		mounted(){
			tool.loadFromLocal('CustomerMesg','ALL')


			// 请求购物车数量
			if(tool.loadFromLocal('CustomerMesg','ALL')){
				    // 请求购物车列表数据
				   	this.requestCart();
		   	 }
			//监听商品详情页是否购买了商品
			this.$eventHandle.$on("add_cart",(val) => {
				this._addCart = val;
				if(tool.loadFromLocal('CustomerMesg','ALL')){
				    // 请求购物车列表数据
				   	this.requestCart();
		   		 }
			})
			// 监听是否删除了商品
			this.$eventHandle.$on("delet_cart",(val) => {

				if(tool.loadFromLocal('CustomerMesg','ALL')){
				    // 请求购物车列表数据
				   	this.requestCart();
		   		 }

			})

		},
		methods: {
			requestCart(){
				// 请求购物车数量
				getD.ShoppingCarList().then((res) => {
					this.num = res.data.list.length;
					// 修改购物车数量
          
        		})
				.catch((err) => {
					// //console.log("err",err);
				})
			},
			//购物车
			cart(){
				this.$router.push("/cart/cart");
			},
			download(){
				this.$router.push('/home/download');
			},
			//公用导航右侧style 显示
			enterFn(data, data1) {
				$(data1.target).children(".sildeHide").css({"display":"block"});
				$(data1.target).children(".sildeShow ").css({"background": "#ffae00"});
				$(data1.target).children(".sildeHide ").addClass("sanjiao");
			},
			leaveFn(data, data1) {
				$(data1.target).children(".sildeHide").css({"display":"none"});
				$(data1.target).children(".sildeShow ").css({"background": "#c3c7cd"});
			},
			enterLi(data,data1){
				$(data1.target).css({"background":"#359af8","color":"#FFF"});
			},
			leaveLi(data,data1){
				$(data1.target).css({"background":"#FFF","color":"#333"})
			},
			// 右侧悬浮导航栏 返回顶部
			top(){
				$("html , body").animate({
					scrollTop: '0px'
				}, 800);
			},
			telphone(){ //免费通话
				//console.log(this.$refs.telphone.value);
				var param = {
					params:{
						datatype:"json",
						mobile:this.$refs.telphone.value,
						type: 0
					}
				}
				getD.freeTel(param).then((res) => {
					//console.log("0000",res);
					this.$message({
			        	message: '我们将立即回电，请保持通讯畅通',
			            type: 'success'
			        });
				})
			}
		}
	}
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "~assets/common/common.less";
	.number{
		min-width: 18px;
	    height: 18px;
	    text-align: center;
	    border: 1px solid #ff3308;
	    position: absolute;
	    top: 2px;
	    right: 7px;
	    border-radius: 50%;
	    color: #fff;
	    background: #ff3308;
	    font-size: 12px;
	    line-height: 16px;
	    padding: 0px 1px;
	}
	.sildeShow{
		cursor: pointer;
		span{
			display: block;
		    width: 100%;
		    height: 100%;
		    color: #fff;
		}
	}
	.c-header{
		height: 1px;
		background: #f0f0f5;
	}
</style>
