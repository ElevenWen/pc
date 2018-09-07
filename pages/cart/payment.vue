<template>
	<div id="payment">
		<!-- 公用top  -->
		<div class="c-headerContainWrap">
			<div class="c-header">
				<div class="c-hdTopWrap">
					<topState></topState>
				</div>
			</div>
			<publicPendantR></publicPendantR>
		</div>
		<!--头部-->
		<div id="search">
			<div class="search">
				<div class="search_L">
					<div class="search_logo" @click="home">
						<img src="/images/logo.png">
					</div>
					<span>支付页</span>
				</div>
				<div class="search_R">
					<div class="border_one">
						<div class="border_oneL">
							<span>1</span>
							<span>购物车</span>
						</div>
						<div class="border_oneR">
							<span>2</span>
							<span>确认订单</span>
						</div>
					</div>
					<div class="border_tow">
						<div class="border_oneR">
							<span>3</span>
							<span>支付</span>
						</div>
					</div>
					<div class="border_three">
						<div class="border_oneR">
							<span>√</span>
							<span>完成</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--支付-->


		<div class="payment">
			<div class="paymentWrap">
				<!--提交支付-->
				<div class="payment_top">支付提交</div>
				<div class="payment_sbt">
					<div class="payment_L">
						<img src="~assets/images/cart/payment_icon.png">
						<span>订单提交成功，请尽快付款</span>
						<span>请您于<label v-customTimeInter  v-if="orderInfo.endPayTime">{{orderInfo.endPayTime }}</label>内完成支付 (逾期将被取消)</span>
					</div>
					<div class="payment_R">
						<div>
							<span>应付金额：</span>
							<span class="money">￥{{orderInfo.amount}}</span>
						</div>
						<div>
							<span class="payment_S">{{orderInfo.num}}个商品</span>
							<span v-for="(item,index) in  orderInfo.productName">{{item}}</span>
						</div>
					</div>
				</div>
				<!--选择支付方式-->
				<div class="pattern_Of_Payment">
					<div class="payment_T">请选择支付方式</div>
					<!--微信支付-->
					<div class="weChat_Pay" @click="pattern(this,$event)">
						<div class="weChat_Pay_T">
							<img src="~assets/images/cart/payment_t.png">微信支付
							<span class="pay_Money">应付金额：<label>￥2588.00</label></span>
						</div>
						<div class="alipay_Pay_W">
							<div class="alipay_Pay_L">
								<div class="alipay_QR_Code"><img v-if='wxCode' :src="wxCode"></div>
							</div>
							<div class="alipay_Pay_R">
								<div class="sanjiao"></div>
								<div class="tishi">
									<span>请使用微信扫描二维码以完成支付</span>
								</div>
							</div>
						</div>
					</div>
					<!--支付宝支付-->
					<div class="alipay_Pay" @click="alipayPay(this,$event)">
						<div class="alipay_Pay_T">
							<img src="~assets/images/cart/payment.png">支付宝支付
							<!-- <span class="pay_Money">应付金额：<label>￥2588.00</label></span> -->
						</div>
						<div class="alipay_Pay_C">
							<!-- <div class="alipay_Pay_L">
								<div class="alipay_Pay_QR">使用支付宝钱包扫码支付</div>
								<div class="alipay_QR_Code"><img src="~assets/images/tabBar/QR_code.png"></div>
							</div>
							<div class="alipay_Pay_R">
								<div class="alipay_Pay_hint">使用电脑支付</div>
								<div class="alipay_PC">
									<span><img src="~assets/images/cart/alipay.png"></span>
									<span @click="submitAlibabaPay">确认并支付</span>
								</div>
							</div> -->
							<ul>
								<li  @click="submitAlibabaPay">
									<img src="~assets/images/cart/alibabaImg.png">
								</li>
							</ul>
						</div>
					</div>
					<!--网银支付-->
					<div class="Internetbank" @click="Internetbank(this,$event)" v-if="false">
						<div class="alipay_Pay_T">
							<img src="~assets/images/cart/payment_w.png">网银支付
						</div>
						<div class="Internetbank_Pay_C">
							<ul>
								<li @click='unionPay'>
									<img src="~assets/images/cart/Internetbank.png">
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 公用bottom 整体 -->
		<div class="c-ftContainWrapindex">
			<publicBottom></publicBottom>
		</div>
		<!--/公用bottom 整体 -->
	</div>
</template>

<script>
	import publicPendantR from "~/components/common/publicPendantR";
	import topState from "~/components/common/topState";
	import publicBottom from "~/components/common/publicBottom";
	import getD from "~/store/ajaxAPI/getData";
    import { payment_wxCode  }  from  '~/store/ajaxAPI/vueDynamicParams.js'


//console.log('payment_wxCodepayment_wxCodepayment_wxCode' ,payment_wxCode)

export default {
    data() {
	    return {
	    	orderInfo:{
	    		endPayTime:"",//结束倒计时
	    		startPayTime:"",//开始倒计时
	    		amount:'',//应付金额：
	    		num:"",//订单数量
	    		productName:[],//产品名称
	    	},//订单信息
	    	wxCode:'',//微信支付二维吗
	    	wxTimeId:""//定时器
	    }
    },
    components:{
    	publicPendantR,
    	topState,
    	publicBottom,
    },
    computed:{

    },
    mounted(){
    	// console.log("???",this.$router);
    	//获取订单信息
    	let data = {
    		orderNum:this.$router.currentRoute.query.orderId
    	}
    	getD.payMethodCheck(data).then((res)=>{
    		let sumNum = 0 ;
    		//console.log("Res",res);
    		this.orderInfo.startPayTime = res.data.CreateTime;
    		this.orderInfo.endPayTime = res.data.EndTime;
    		this.orderInfo.amount = res.data.Amount;
    		res.data.OrderDetails.forEach((items)=>{
    			// //console.log(items,'ddddd')
    			sumNum += items.Num ;
    			this.orderInfo.productName.push( items.Name);
    		})
    		this.orderInfo.num = sumNum;
    	});

    	//微信二维码生成器  ====测试环境
    	let wxData = {
    		out_trade_no:this.$router.currentRoute.query.orderId,
    		// dataType:'json'
    	}
    	// //console.log( )
    	// this.wxCode = `http://112.74.135.230:3215/Payment/MakeActivityPayQRCode?out_trade_no=${this.$router.currentRoute.query.orderId}`;
    	this.wxCode = `${payment_wxCode}/Payment/MakeActivityPayQRCode?out_trade_no=${this.$router.currentRoute.query.orderId}`;

    	var that = this;

    	this.wxTimeId = setInterval( ()=>{
    		getD.wxPayCode(wxData).then((res)=>{
	    	}).catch((res)=>{
	    		// console.log("我是在 ",res,res.data.msg)
	    		if(res.data.msg == "订单状态必须为待支付"){
	    			that.wxCode = ``;
                    this.$message({
                      message: '该订单已经支付,稍后跳转我的订单界面',
                      type: 'success'
                    });
	    			clearInterval(that.wxTimeId);
	    			that.$router.push('/personalCenter/allOrder')
	    			return
	    			//自动跳转 我的订单界面
	    		}else if(res.data.msg  == undefined){
					// console.log(' undefined ',this.$router.currentRoute.query.orderId)
	    			// that.wxCode = `http://112.74.135.230:3215/Payment/MakeActivityPayQRCode?out_trade_no=${this.$router.currentRoute.query.orderId}`;
	    			that.wxCode = `${payment_wxCode}/Payment/MakeActivityPayQRCode?out_trade_no=${this.$router.currentRoute.query.orderId}`;
	    		}
	    	});

    	},5000)

    },
    destroyed(){

    	//清楚定时器
    	clearInterval(this.wxTimeId);
    },
    methods:{
    	home(){
    		this.$router.push("/");
    	},
    	//支付结果
    	status(){
    		this.$router.push("/cart/status");
    	},
    	//支付切换
    	pattern(data,data1){
    		$(".weChat_Pay").css({"border":"2px solid #ccc"});
    		$(".alipay_Pay").css({"border":"1px solid #ebebeb"});
    		$(".Internetbank").css({"border":"1px solid #ebebeb"});
    		$(".alipay_Pay_W").show();
    		$(".weChat_Pay .pay_Money").show();
    		$(".alipay_Pay_C").hide();
    		$(".pay_Money").hide();
    		$(".Internetbank_Pay_C").hide();
    	},
    	alipayPay(data,data1){
    		$(".alipay_Pay").css({"border":"2px solid #ccc"});
    		$(".weChat_Pay").css({"border":"1px solid #ebebeb"});
    		$(".Internetbank").css({"border":"1px solid #ebebeb"});
    		$(".alipay_Pay_W").hide();
    		$(".alipay_Pay_C").show();
    		$(".pay_Money").hide();
    		$(".Internetbank_Pay_C").hide();
    		$(".alipay_Pay .pay_Money").show();
    	},
    	Internetbank(){
    		$(".Internetbank").css({"border":"2px solid #ccc"});
    		$(".weChat_Pay").css({"border":"1px solid #ebebeb"});
    		$(".alipay_Pay").css({"border":"1px solid #ebebeb"});
    		$(".alipay_Pay_W").hide();
    		$(".alipay_Pay_C").hide();
    		$(".pay_Money").hide();
    		$(".Internetbank_Pay_C").show();
    	},
    	//网银支付
    	unionPay(){


    		let orderId = this.$router.currentRoute.query.orderId;
    		let amount = this.orderInfo.amount;
    		//console.log(amount)
    		// this.$router.push({'name':'unionpay',query:{'orderId':orderId,'txnAmt':amount*100}});

    		let data = {
    			frontUrl:'/personalCenter/allOrder',//前端回调地址
    			orderId:orderId,//
    			txnAmt: amount*100 ,//交易金额，单位分

    		}
    		// orderInfo.amount


    		// getD.unionPay(data).then((res)=>{
    		// 	let ab = `http://112.74.135.230:3215/payment/unionpay?orderId=${orderId}&txnAmt=${amount*100}&frontUrl=${data.frontUrl}`
    		// 	//console.log(ab,'跳转网银支付');
    		// 	window.location.href = ab;
    		// }).catch((error)=>{
    		// 	//console.log('英联接口报错',error);
    		// 	let ab = `http://112.74.135.230:3215/payment/unionpay?orderId=${orderId}&txnAmt=${amount*100}&frontUrl=${data.frontUrl}`
    		// 	//console.log(ab,'跳转网银支付');

    		// 	window.location.href = ab;
    		// });

    		getD.unionPay(data).then((res)=>{
    			let ab = `${payment_wxCode}/payment/unionpay?orderId=${orderId}&txnAmt=${amount*100}&frontUrl=${data.frontUrl}`
    			//console.log(ab,'跳转网银支付');
    			window.location.href = ab;
    		}).catch((error)=>{
    			//console.log('英联接口报错',error);
    			let ab = `${payment_wxCode}/payment/unionpay?orderId=${orderId}&txnAmt=${amount*100}&frontUrl=${data.frontUrl}`
    			//console.log(ab,'跳转网银支付');

    			window.location.href = ab;
    		});

    	},
    	submitAlibabaPay(){
    		let data = {
    			frontUrl:'/personalCenter/allOrder',//前端回调地址
    			orderId:this.$router.currentRoute.query.orderId,//
    			txnAmt: this.orderInfo.amount ,//交易金额，单位元

    		}

    		//console.log(data)


    		// getD.alibabaPay(data).then((res)=>{
    		// 	let ab = `http://112.74.135.230:3215//payment/AlipayScanCode?orderId=${data.orderId}&txnAmt=${data.txnAmt}&frontUrl=${data.frontUrl}`
    		// 	//console.log(ab,'跳转网银支付');
    		// 	window.location.href = ab;
    		// }).catch((error)=>{
    		// 	//console.log('英联接口报错',error);
    		// 	let ab = `http://112.74.135.230:3215//payment/AlipayScanCode?orderId=${data.orderId}&txnAmt=${data.txnAmt}&frontUrl=${data.frontUrl}`
    		// 	//console.log(ab,'跳转网银支付');

    		// 	window.location.href = ab;
    		// });

    		getD.alibabaPay(data).then((res)=>{
    			let ab = `${payment_wxCode}/payment/AlipayScanCode?orderId=${data.orderId}&txnAmt=${data.txnAmt}&frontUrl=${data.frontUrl}`
    			//console.log(ab,'跳转网银支付');
    			window.location.href = ab;
    		}).catch((error)=>{
    			//console.log('英联接口报错',error);
    			let ab = `${payment_wxCode}/payment/AlipayScanCode?orderId=${data.orderId}&txnAmt=${data.txnAmt}&frontUrl=${data.frontUrl}`
    			//console.log(ab,'跳转网银支付');

    			window.location.href = ab;
    		});
    	}
    },
    filters:{

    }
}
</script>

<style lang="less" type="stylesheet/css" scoped>
  @import "~assets/common/index.less";
  @import "~assets/common/common.less";
  @import "./cart.less";
</style>
