<style lang="less" scoped>
@import "./cart.less";
</style>

<template>
    <div id="newPayment">
        <!-- 公用top  -->
		<div class="c-headerContainWrap">
			<div class="c-header">
				<div class="c-hdTopWrap">
					<topState></topState>
				</div>
			</div>
		</div>
        <!--头部-->
		<div id="search">
			<div class="search">
				<div class="search_L">
					<div class="search_logo" @click="home">
						<img src="/images/logo.png">
					</div>
					<span v-if="!isShowJZ">支付页面</span>
                    <!-- 帮他付款页面 -->
                    <span v-if="isShowJZ">帮TA付款</span>
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
        <!-- 主体部分 -->
        <div class="bodyContent">
            <!-- 顶部信息 -->
            <div class="productInfoWrap">
                <span class="orderPay">订单支付</span>
                <span class="line">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                <span class="productNum">共{{orderLength}}个商品</span>
                <span class="pDetail" @click="detailP">详情</span>
                <span class="moneyWord">应付金额：</span>
                <span class="money">¥{{orderDetail.money}}</span>
            </div>
            <!-- 详情隐藏部分 -->
            <div class="detailWrap" v-if="isShowDetail">
                <div class="point"></div>
                <div class="detailTitle">
                    <span>商品信息</span>
                    <span>订单号</span>
                    <span>金额</span>
                </div>
                <div class="detailContent" v-for="item in orderDetail.list">
					<span>{{item.ProductName}}&nbsp;&nbsp;{{item.orderType}}</span>
                    <span>{{orderDetail.orderNum}}</span>
                    <span>¥{{item.Price}}</span>
                </div>
            </div>
            <!-- 支付部分 -->
            <div class="paymentWrap">
                <ul class="pay-list">
                	<!--记账币-->
                	<li class="zeroPay" v-if="isShowJZ && isShowCoin">
	                    <div class="img" :class="selectedJzb ? 'active' : ''" @click="toSelectedJzb()"></div>
	                    <span class="payIcon0"></span>
	                    <span class="payStyle">记账币</span>
	                    <span class="payStyleDes">本次可用{{coinMoney}}记账币<span v-show="selectedJzb">抵用{{usableCoin}}元</span></span>
	                    <span class="shouldGiveM" v-show="selectedJzb">支付&nbsp;&nbsp;<i>{{usableCoin}}</i>元</span>
	                </li>

                	<li v-for="(data,i) in payArr" v-if="data.isisBalacne">
                		<div class="img forbidden" v-if="data.type==0 && data.AccountBalance<orderDetail.money"></div>
                		<div class="img" :class="selectedIndex==i ? 'active' : ''" @click="toSelected(i,data.type)" v-else></div>

	                    <span class="payIcon0" :style="{background:'url('+data.icon+')'}"></span>
	                    <span class="payStyle">{{data.way}}</span>
	                    <!--余额才有-->
	                    <!--<span class="payStyleDes" v-if="data.type==0 && selectedIndex==0">本次可用&nbsp;{{data.AccountBalance}}元</span>-->
	                    <span class="payStyleDes" v-if="data.type==0">可用&nbsp;{{data.AccountBalance}}元</span>
	                    <span class="shouldGiveM" v-if="data.type==0 && balanceMoney && selectedIndex==0">
	                    	支付&nbsp;&nbsp;<i>{{totalMoney}}</i>元
	                    </span>
	                    <span class="noPay" v-if="data.type==0 && data.AccountBalance<orderDetail.money">可用余额不足</span>
	                    <!--余额才有-->

	                    <!--点击出现-->
	                    <span class="shouldGiveM" v-if="selectedIndex==i && data.type!=0">支付&nbsp;&nbsp;<i>{{totalMoney}}</i>元</span>
                	</li>
                </ul>
                <!-- 付款按钮 -->
                <!--判断支付状态-->
                <div class="payBtnBlackWrap">
                    <div class="payBtn" :class="isViablePay ? 'payBtnBlack' : ''" @click="payImmediately">立即支付</div>
                    <span class="noMoney" v-show="isShowDisparity">您还差{{totalMoney}}元，请继续选择支付方式</span>
                </div>
            </div>
        </div>
        <!-- 微信支付弹窗 -->
        <div class="wechatPayWrap" v-show="wechatWindows">
            <div class="wechatPay">
                <div class="wechatPtitle">
                    <span>微信支付</span>
                    <span @click="closeWechatPay"></span>
                </div>
                <!-- 二维码 -->
                <div id="qr-code"><img :src="wxCode"/></div>
                <div class="paymoney">支付 <span>{{totalMoney}}</span> 元</div>
                <div class="paydes">打开微信扫一扫进行扫码支付</div>
            </div>
        </div>
        <publicBottom></publicBottom>
    </div>
</template>
<script>
import topState from "../../components/common/topState";
import publicBottom from "../../components/common/publicBottom";
import getData from '~/store/ajaxAPI/getData.js';
import tool from "~/assets/lib/tool.js";
import { payment_wxCode,urlShortPort  }  from  '~/store/ajaxAPI/vueDynamicParams.js'
export default {
    data(){
        return {
            isShowJZ:false, //是否显示记账币的结算方式
            selectedJzb:false,//是否选择记账币

            payArr:[],//支付方式选择
            isShowDetail:false, //是否展示详情内容
            selectedIndex:-1,//记录当前选中下标
            wechatWindows:false, //微信支付弹窗
            orderDetail:[],//订单详情
            orderLength:0,//订单商品数量
			orderType:"",//订单商品规格
            currentType:-1,//当前选择方式
            isShowCoin:false,//记账币是否可用
            coinMoney:0,//可用记账币
            usableCoin:0,//抵扣多少记账币
            viableBalance:0,//可使用的余额
            wxCode:'',//微信支付二维吗
            wxTimeId:"",//定时器
            balance:0,//余额
            coin:0,//记账币
            isShowDisparity:false,//是否显示差多少钱
            isViablePay:false,//是否可以支付
        }
    },
    components:{
        topState,
        publicBottom,
    },
    mounted(){
    	//取本地订单详情
		var arr = [];
    	this.orderDetail = tool.loadFromLocal('orderMesg','ALL');
    	this.orderLength = this.orderDetail.list.length;//订单商品数量
		//对商品服务类型做处理
    	this.orderDetail.list.forEach((val,i)=>{
			if(val.Type == 0 || val.type == 0){ //产品
				val.orderType = val.ProductType.replace(/,/g,"*");
			}
			if(val.Type == 1 || val.type == 1){ //套餐
				val.ProductDetails.forEach((item,index)=>{
					arr.push(item.Name);
				})
			}
			if(val.ProductDetails.length>0){
	    		val.orderType = arr.join('*');
	    		arr = [];
	    	}
		})

//  	type：1代表从'帮TA付款'页面进来的
    	if(this.$route.query.type == 1){
    		this.isShowJZ = true;
			//判断是否可使用记账币
			var params = {
				orderNo:this.orderDetail.orderNum
			}

			getData.getCoinByOrderId(params)
			.then((result)=>{
				this.coinMoney = result.data.Coin;
				this.isShowCoin = result.data.isUsed;
				this.usableCoin = result.data.RMB;
				this.coin = result.data.RMB;
				if(this.isShowCoin && this.coinMoney!=0){
					this.selectedJzb = true;
					//是否可以全部支付
					if(this.usableCoin < this.orderDetail.money){
						this.isViablePay = true;
        				this.isShowDisparity = true;
					}
				}
				//请求支付方式
    			this.requestData()
			})

    	}else{
    		//请求支付方式
    		this.requestData()
    	}

    	//监听是否没选择支付方式
    	this.$watch('currentType',(n,o)=>{
    		//若小于0则没有选择除记账币的所有支付方式
    		if(n<0){
    			//再判断是否选择记账币
    			if(this.selectedJzb){
    				if(this.usableCoin < this.orderDetail.money){
    					this.isViablePay = true;
        				this.isShowDisparity = true;
    				}else{
    					this.isViablePay = false;
        				this.isShowDisparity = false;
    				}
    			}else{
    				this.isViablePay = true;
        			this.isShowDisparity = false;
    			}
    		}else{
    			if(n == 0){
    				this.viableBalance = this.balance;

    				this.isShowDisparity = false;
    				//判断此时余额是否能支付
    				if(this.viableBalance < this.totalMoney){
    					this.isViablePay = true;
    				}else{
    					this.isViablePay = false;
    				}
    			}else{
    				this.viableBalance = 0;

    				this.isViablePay = false;
        			this.isShowDisparity = false;
    			}
    		}
    	})
    },
    computed:{
    	//支付方式选择后应付
    	totalMoney(){
    		let tempPayTotalMoney = (this.orderDetail.money*10000 - this.usableCoin*10000)/10000;
    		let _tempPayTotalMoney = tempPayTotalMoney > 0 ? tempPayTotalMoney : 0;
    		return _tempPayTotalMoney.toFixed(2);
    	},
    	//余额支付金额
    	balanceMoney(){
    		//是否选择记账币
			var m = this.orderDetail.money-this.usableCoin;
			if(this.viableBalance >= m){
				return true;
			}else{
				return false;
			}
    	},
    },
    methods:{
    	//比较大小
    	compared(val){
    		return function(o, p){
			   var a, b;
			   if (typeof o === "object" && typeof p === "object" && o && p) {
			     a = o[val];
			     b = p[val];
			     if (a === b) {
			       return 0;
			     }
			     if (typeof a === typeof b) {
			       return a < b ? -1 : 1;
			     }
			     return typeof a < typeof b ? -1 : 1;
			   }
			   else {
//			   	console.log("error")
			   }
			}
    	},
    	//请求支付方式
    	requestData(){
	    	//支付方式列表
	    	var params = {
	    		orderNum:this.orderDetail.orderNum
	    	}
	    	getData.getPayTypeList(params)
	    	.then((res)=>{
	    		res.data.list.forEach((val)=>{
	    			switch (val.Type){
	    				case 0:
	    					this.payArr.push({way:'支付宝支付',icon:'/images/news/alipay-mode.png',type:2,isisBalacne:true});
	    					break;
	    				case 1:
	    					this.payArr.push({way:'微信支付',icon:'/images/news/wx-mode.png',type:1,isisBalacne:true});
	    					break;
	    				case 2:
	    					this.payArr.push({way:'中国银联',icon:'/images/news/unionpay-mode.png',type:3,isisBalacne:true});
	    					break;
	    				case 3:
	    					//若记账币不可用才判断余额是否可用
	    					if(!this.isShowCoin){
	    						//判断默认支付方式
		    					if(!val.IsisBalacne || val.AccountBalance<this.orderDetail.money){
		    						//默认微信
		    						this.selectedIndex = 1;

		    						this.currentType = 1

		    						this.isViablePay = true;
		    					}else{
		    						//默认余额
		    						this.selectedIndex = 0;

		    						this.currentType = 0

		    					}
	    					}
	    					this.viableBalance = val.AccountBalance;
	    					this.balance = val.AccountBalance;
	    					//type排序判断，isisBalacne是否能用余额，AccountBalance可用余额
	    					this.payArr.push({way:'账户余额',icon:'/images/news/banlance-mode.png',type:0,isisBalacne:val.IsisBalacne,AccountBalance:val.AccountBalance});
	    					break;
	    				case 5:
	    					//判断是否为代付页面跳转过来的
	    					if(this.isShowJZ){
	    						this.payArr.push({way:'找人代付',icon:'/images/news/paid-mode.png',type:4,isisBalacne:false});
	    					}else{
	    						this.payArr.push({way:'找人代付',icon:'/images/news/paid-mode.png',type:4,isisBalacne:true});
	    					}

	    					break;
	    				default:
	    					break;
	    			}
	    		})
	    		//对支付方式进行排序
	    		var self = this;
	    		this.payArr.sort(self.compared('type'));
	    	})
    	},
        // 点击详情
        detailP(){
            this.isShowDetail = !this.isShowDetail;
        },
        // 关闭微信支付弹窗
        closeWechatPay(){
            this.wechatWindows = false;
        },
        home(){
            this.$router.push("/");
        },
        //立即支付
        payImmediately(){
        	//是否可以支付
        	if(this.isViablePay){
        		return;
        	}

        	//记账币可用一次性支付并只选择记账币
        	if(this.selectedJzb && this.orderDetail.money <= this.usableCoin && this.currentType < 0){
        		let params = {
            			orderNo:this.orderDetail.orderNum,
            			cid:tool.loadFromLocal('CustomerMesg','ALL').Id,
            			bookkeepCurrency:this.coinMoney
            		}

            		getData.getBalancePay(params)
            		.then((res)=>{
//          			console.log(res);
            			//存储金额
            			tool.saveToLocal('orderMoney','orderMoney','orderMoney',this.orderDetail.money);
            			this.$router.replace({path:'/cart/status',query:{type:1}})
            		})
            		.catch((error)=>{
//          			console.log(error)
            		})
        	}

    		switch (this.currentType){
            	case 0://余额
            		let dfBalance = this.isShowJZ ? 1 : 0 ;
            		let params = {
            			orderNo:this.orderDetail.orderNum,
            			cid:tool.loadFromLocal('CustomerMesg','ALL').Id,
            			bookkeepCurrency:this.coinMoney
            		}

            		getData.getBalancePay(params)
            		.then((res)=>{
//          			console.log(res);
            			//存储金额
            			tool.saveToLocal('orderMoney','orderMoney','orderMoney',this.orderDetail.money);
            			this.$router.replace({path:'/cart/status',query:{type:dfBalance}})
            		})
            		.catch((error)=>{
//          			console.log(error)
            		})

            		break;
            	case 1://微信
            		this.wechatWindows = true;

            		let dfWx = this.isShowJZ ? 1 : 0 ;
	                // 生成二维码
	                let wxData = {
			    		out_trade_no:this.orderDetail.orderNum,
			    		cid:tool.loadFromLocal('CustomerMesg','ALL').Id,
            			bookkeepCurrency:this.coinMoney
			    	}
	                this.wxCode = `${payment_wxCode}/Payment/MakeActivityPayQRCode?out_trade_no=${this.orderDetail.orderNum}`;

	                var that = this;

			    	this.wxTimeId = setInterval( ()=>{
			    		getData.wxPayCode(wxData)
			    		.then((res)=>{

				    	})
			    		.catch((res)=>{
//				    		 console.log("我是在 ",res,res.data.msg)
				    		if(res.data.msg == "订单状态必须为待支付"){
				    			that.wxCode = ``;
				    			clearInterval(that.wxTimeId);
				    			tool.saveToLocal('orderMoney','orderMoney','orderMoney',this.orderDetail.money);
				    			that.$router.replace({path:'/cart/status',query:{type:dfWx}})
//								that.$router.push('/personalCenter/allOrder')
				    			return
				    			//自动跳转 我的订单界面
				    		}else if(res.data.msg  == undefined){
				    			// that.wxCode = `http://112.74.135.230:3215/Payment/MakeActivityPayQRCode?out_trade_no=${this.$router.currentRoute.query.orderId}`;
				    			that.wxCode = `${payment_wxCode}/Payment/MakeActivityPayQRCode?out_trade_no=${this.orderDetail.orderNum}`;
				    		}
				    	});

			    	},5000)
            		break;
            	case 2://支付宝
            		let id = tool.loadFromLocal('CustomerMesg','ALL').Id;
            		let dfAlipay = this.isShowJZ ? 1 : 0 ;
            		let data = {
		    			frontUrl:'/cart/status?type='+dfAlipay,//前端回调地址
		    			orderId:this.orderDetail.orderNum,//订单号
		    			txnAmt: this.totalMoney,//交易金额，单位元
						cid:id,
            			bookkeepCurrency:this.coinMoney
		    		}

		    		getData.alibabaPay(data)
		    		.then((res)=>{
		    			let ab = `${payment_wxCode}/payment/AlipayScanCode?orderId=${data.orderId}&txnAmt=${data.txnAmt}&frontUrl=${data.frontUrl}&cid=${data.cid}&bookkeepCurrency=${data.bookkeepCurrency}`
		    			//console.log(ab,'跳转网银支付');
		    			window.location.href = ab;
		    		})
		    		.catch((error)=>{
		    			//console.log('英联接口报错',error);
		    			let ab = `${payment_wxCode}/payment/AlipayScanCode?orderId=${data.orderId}&txnAmt=${data.txnAmt}&frontUrl=${data.frontUrl}&cid=${data.cid}&bookkeepCurrency=${data.bookkeepCurrency}`
		    			//console.log(ab,'跳转网银支付');

		    			window.location.href = ab;
		    		});
            		break;
            	case 3://银联
            		let orderId = this.orderDetail.orderNum;
		    		let dfUnionPay = this.isShowJZ ? 1 : 0 ;
		    		let data1 = {
		    			frontUrl:`${urlShortPort}/cart/status?type=${dfUnionPay}`,//前端回调地址
		    			// frontUrl:`http://www.wqbol.com/cart/status?type=${dfUnionPay}`,//前端回调地址
		    			orderId:this.orderDetail.orderNum,//订单号
		    			txnAmt: this.totalMoney*100,//交易金额，单位分
						cid:tool.loadFromLocal('CustomerMesg','ALL').Id,
            			bookkeepCurrency:this.coinMoney
		    		}
		    		getData.unionPay(data1).then((res)=>{
		    			let ab = `${payment_wxCode}/payment/unionpay?orderId=${data1.orderId}&txnAmt=${data1.txnAmt}&frontUrl=${data1.frontUrl}&cid=${data1.cid}&bookkeepCurrency=${data1.bookkeepCurrency}`
						window.location.href = ab;
		    		}).catch((error)=>{
		    			let ab = `${payment_wxCode}/payment/unionpay?orderId=${data1.orderId}&txnAmt=${data1.txnAmt}&frontUrl=${data1.frontUrl}&cid=${data1.cid}&bookkeepCurrency=${data1.bookkeepCurrency}`
						window.location.href = ab;
		    		});
            		break;
            	case 4:
            		//找人代付
          	 		this.$router.push({path:'/cart/paid',query:{orderNum:this.orderDetail.orderNum}})
            		break;
            	default:
            		break;
            }
        },
        //选择支付方式(除记账币)
        toSelected(num,type){
            // 记住上一次选中的下标，如相同则取消选中
        	if(this.selectedIndex == num){
        		this.selectedIndex = -1;

        		this.currentType = -1;
        	}else{
        		this.selectedIndex = num;

        		this.currentType = type
            }
        },
        //选择记账币
        toSelectedJzb(){
        	this.selectedJzb = !this.selectedJzb;
        	//不选择记账币，将数值归0
        	if(!this.selectedJzb){
        		this.usableCoin = 0;

        		//不显示差多少
        		this.isShowDisparity = false;

        		//是否选择其他支付方式
        		if(this.currentType < 0){
        			this.isViablePay = true;
        		}else{
        			this.isViablePay = false;
        		}
        	}else{
        		this.usableCoin = this.coin;
        		if(this.currentType >= 0){
        			this.isViablePay = false;
        			this.isShowDisparity = false;
        		}else{
        			//是否显示相差多少钱
	        		if(this.usableCoin < this.orderDetail.money){
	        			this.isViablePay = true;
	        			this.isShowDisparity = true;
	        		}else{
	        			this.isViablePay = false;
	        			this.isShowDisparity = false;
	        		}
        		}
        	}
        }
    },
    beforeDestroy(){
    	clearInterval(this.wxTimeId);
    }
}
</script>

