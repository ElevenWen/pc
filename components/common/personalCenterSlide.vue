<template>
<!-- 侧边栏 -->
  <div class="slide">
				<div class="left_div clearfix" style="padding-bottom:0px">
	    		<h3>我的订单</h3>
				<div class="nav"><nuxt-link to="/personalCenter/allOrder">全部订单<img src="~assets/images/account-setting/right_arrow_white.png" ></nuxt-link></div>
				<div class="nav"><nuxt-link to="/personalCenter/waitPay">待付款&nbsp;&nbsp;<span class="orderNum">{{waitPay}}</span><img src="~assets/images/account-setting/right_arrow_white.png" ></nuxt-link></div>
				<div class="nav"><nuxt-link to="/personalCenter/goingOn">办理中&nbsp;&nbsp;<span class="orderNum">{{inProcess}}</span><img src="~assets/images/account-setting/right_arrow_white.png" ></nuxt-link></div>
				<div class="nav"><nuxt-link to="/personalCenter/done">已完成&nbsp;&nbsp;<span class="orderNum">{{done}}</span><img src="~assets/images/account-setting/right_arrow_white.png" ></nuxt-link></div>
				<div class="nav"><nuxt-link to="/personalCenter/waitEvaluate">待评价&nbsp;&nbsp;<span class="orderNum">{{waitCommend}}</span><img src="~assets/images/account-setting/right_arrow_white.png" ></nuxt-link></div>
	    		<div class="dashed_line_nav"></div>
				<div class="nav nav_collect"><nuxt-link to="/personalCenter/mycompany">我的公司<img src="~assets/images/account-setting/right_arrow_white.png" ></nuxt-link></div>
                <div class="dashed_line_nav"></div>
				<div class="nav nav_collect"><nuxt-link to="/personalCenter/myserver">我的服务<img src="~assets/images/account-setting/right_arrow_white.png" ></nuxt-link></div>
                <div class="dashed_line_nav"></div>
				<div class="nav nav_collect"><nuxt-link to="/personalCenter/recommend/">我的推荐<img src="~assets/images/account-setting/right_arrow_white.png" ></nuxt-link></div>
                <div class="dashed_line_nav"></div>
				<div class="nav nav_collect"><nuxt-link to="/personalCenter/collect">我的收藏<img src="~assets/images/account-setting/right_arrow_white.png" ></nuxt-link></div>
	    		<div class="dashed_line_nav"></div>
	    		<h3 style="margin-top:20px;">资产中心</h3>
				<div class="nav"><nuxt-link to="/personalCenter/balance">余额<img src="~assets/images/account-setting/right_arrow_white.png" ></nuxt-link></div>
				<div class="nav"><nuxt-link to="/personalCenter/currency">记账币<img src="~assets/images/account-setting/right_arrow_white.png" ></nuxt-link></div>
				<div class="nav"><nuxt-link to="/personalCenter/coupon">优惠券<img src="~assets/images/account-setting/right_arrow_white.png" ></nuxt-link></div>
				<div class="nav"><nuxt-link to="/personalCenter/integral">积分<img src="~assets/images/account-setting/right_arrow_white.png" ></nuxt-link></div>
                <div class="dashed_line_nav"></div>
	    		<h3 style="margin-top:20px;" >客户服务</h3>
				<div class="nav"><nuxt-link to="/personalCenter/suggestion">投诉建议<img src="~assets/images/account-setting/right_arrow_white.png" ></nuxt-link></div>
				<div class="nav"><nuxt-link to="/personalCenter/myInvoice">我的发票<img src="~assets/images/account-setting/right_arrow_white.png" ></nuxt-link></div>
                <div class="dashed_line_nav"></div>
	    		<h3 style="margin-top:20px;" >设置</h3>
				<div class="nav"><nuxt-link to="/account_setting/information">个人信息<img src="~assets/images/account-setting/right_arrow_white.png" ></nuxt-link></div>
				<div class="nav"><nuxt-link to="/account_setting/receiverAddress">收货地址<img src="~assets/images/account-setting/right_arrow_white.png" ></nuxt-link></div>
	    	</div>
            </div>
</template>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../pages/personalCenter/personalCenterCommon.less";
	/*#slide_myCompany{
	 	background-color: #ff3e08;
	 	color: #fff;
	}*/
	.margin1200 .left_div .nav{
		padding-left: 0;
		position: relative;
	}
	.margin1200 .left_div .nav a{
		display: block;
		width: 130px;
		height: 30px;
		line-height: 30px;
	}
	.orderNum{
		font-size: 12px;
		color: #FF3E08;
		position: absolute;
		right: 40px;
		top: 0;
	}
	.margin1200 .left_div .nav .nuxt-link-exact-active{
		color: white;
		width: 130px;
		height: 30px;
		line-height: 30px;
		border-radius: 4px;
		background: #FF3E08;
		display: block;
		.orderNum{
			font-size: 12px;
			color: #fff;
		}
		&:hover{
			color: white;
			.orderNum{
				font-size: 12px;
				color: #fff;
			}
		}
	}
	.margin1200 .left_div .nav_collect a{
		color: #333;
		font-size: 14px;
	}
	
</style>

<script>
import getData from '~/store/ajaxAPI/getData.js'
export default {
  data(){
	  return {
		isSideActive:false,
		waitPay:'',
		inProcess:'',
		waitCommend:'',
		done:''
	}
  },
  mounted(){
	  this.getOrder();
  },
  methods:{
	//获取侧边栏订单数量
	getOrder(){
		  var params = {
			 dataType:'json',
			 type:'',
			 orderType:'PC'
		}
		   getData.allOrder(params).then(res=>{
			//    //console.log(res.data)
			   let arr = res.data.list
			   //获取订单状态的数
			   	var lArr = []
				var hArr = []
				var bArr = []
				var pArr = []
				for(var i=0;i<arr.length;i++){ 
					if(arr[i].OrderStatus == '待付款'){
						//待付款数目
						lArr.push(arr[i])
						this.waitPay = lArr.length
					}
					//办理中数目
					if(arr[i].OrderStatus == '办理中'){
						hArr.push(arr[i])
						this.inProcess = hArr.length
					}
					//已完成数目
					if(arr[i].OrderStatus == '已完成'){
						bArr.push(arr[i])
						this.done = bArr.length
					}
					//待评价数目
					if(arr[i].OrderStatus == '待评价'){
						pArr.push(arr[i])
						this.waitCommend = pArr.length
					}
				}
			//    //console.log(this.orderArr)
		   }).catch(err=>{
			   //console.log(err)
		   })
	  },
  }
}
</script>

