<template>
	<div id="prePayment" v-if="isWechat">
		<!-- 公用top  -->
		<div class="c-headerContainWrap">
			<div class="c-header">
				<div class="c-hdTopWrap">
					<topState :isPrePayment = "isPrePayment"></topState>
				</div>
			</div>
		</div>
		<!--头部-->
		<paymentHead :title="title" :completed = "completed"></paymentHead>
		<!--支付-->
		<!--内容-->
		<div class="wrap">
			<!--联系人信息-->
			<div class="mes">
				<div class="icon"></div>
				<div class="title">
					<p>{{orderDetailsNo.OrderMessage}}</p>
					<div class="order-status" :class="{canc:cancStatus,completed:completedStatus,payment:paymentStatus}"></div>
				</div>
				<div class="mes-right">
					<div class="price">
						<span>应付金额：</span>
						<span>¥ {{(orderDetailsNo.Amount)}}</span>
					</div>
					<div class="contacts">联系人：{{orderDetailsNo.ConsigneeName?orderDetailsNo.ConsigneeName:"--"}}</div>
				</div>
			</div>
			
			<!--代付订单信息-->
			<div class="order-mes">
				<h3>代付订单信息</h3>
				<ul class="order-list-name">
					<li>商品名称</li>
					<li>商品信息</li>
					<li>单价(元)</li>
					<li>数量</li>
					<li>小计(元)</li>
				</ul>
				<ul class="order-list">
					<li v-for="(items,index) in orderDetailsNo.OrderDetails">
						<!--商品图片-->
						<div class="img">
							<img :src="items.PCThumbImgURL ? items.PCThumbImgURL : 'https://host.wqbol.com/hetongCommon.png'" alt="" @click="toProduct(items)">
						</div>
						<!--商品名字-->
						<div class="proName" @click="toProduct(items)">{{items.Name}}</div>
						<!--商品类型-->
						<div class="type">
							<span>{{items.type == 1 ? "套餐" : "产品"}}</span>
							<span v-if="items.type == 0">{{items.ProductType}}</span>
							<span v-if="items.type == 1">{{items._productType}}</span>
						</div>
						<!--商品价格-->
						<div class="price">
							<s>￥{{(items.OldPrice)}}</s>
							<span>￥{{(items.Price)}}</span>
						</div>
						<!--商品数量-->
						<div class="num">
							{{items.Num}}
						</div>
						<!--商品小计-->
						<div class="subtotal">
							￥{{(Number(items.Num)*Number(items.Price)).toFixed(2)}}
						</div>
					</li>
				</ul>
				<div class="pay-column" ref="payColumn">
					<div class="pay" @click="payMoney">微企宝付款</div>
					<div class="price">
						<span>应付金额：</span>
						<span>¥ {{(orderDetailsNo.Amount)}}</span>
					</div>
				</div>
			</div>
			<!--代付说明-->
			<div class="pay-inf">
				<h4>代付说明：</h4>
				<p>1：付款前请和好友再次确认，避免遇到诈骗行为。<br/>
					2：如果发生退款，已支付金额将原路退回付款人。<br/>
					3：付款金额以当前页面展示为准。
				</p>
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
	import topState from "~/components/common/topState";
	import publicBottom from "~/components/common/publicBottom";
	import paymentHead from "~/components/cart/paymentHead";
	import { mapState,mapActions,mapGetters} from 'vuex';
	import tool from '~/assets/lib/tool';
	import {prePayment_link} from '~/store/ajaxAPI/vueDynamicParams';
	
	export default {  
	    data() {
		    return {
		    	title:'帮TA付款',//给paymentHead传值
		    	cancStatus:false,//已取消状态
		    	completedStatus:false,//已完成状态
				paymentStatus:false,//已支付状态
				paidId:"", //代付页面传过来的参数  == id
				paidOrderNum:"", //代付页面传过来的参数  == orderNum
				// content:"亲，江湖告急，帮忙付个款，滴水之恩，定当涌泉相报！", //留言内容
				isPrePayment:true,
				isWechat:false, //判断是否是微信打开
				completed:false,
				allMoney:"", //总金额
		    }
	    },
	    components:{
	    	topState,
	    	publicBottom,
	    	paymentHead
		},
		computed:{
		    ...mapGetters({
				orderDetailsNo:'otherPay/otherPay/orderDetailsNo',
			})
		},
		beforeRouteEnter: (to, from, next) => {
			next(vm => {
				// 判断设备
				if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
					// 对接订单详情接口（不需登录）
					let param = {
						params : {
							orderNum : vm.paidOrderNum
						}
					}
					// 判断当前订单状态
					vm.request_orderdetailno(param).then(() => {
						vm.allMoney = vm.orderDetailsNo.Amount;
						// location.href = "http://192.168.1.215:12000/helpFriendPay?orderNum="+vm.paidOrderNum+"&actPrice="+vm.allMoney+"&flag=help";
						location.href = `${prePayment_link}/helpFriendPay?orderNum=${vm.paidOrderNum}&actPrice=${vm.finallyMoney}&flag=help`;
					});
					
				} else {
					vm.isWechat = true;
				}
			})
		},
		mounted(){
			this.paidId = this.$route.query.id;
			this.paidOrderNum = this.$route.query.orderNum;
			// console.log("this.paidOrderNum",this.paidOrderNum)
			let objP = {};
			objP.orderNum = this.paidOrderNum;
			tool.saveToLocal("prepayment",objP);
			// console.log(tool.loadFromLocal("prepayment","ALL"));
			// 对接订单详情接口（不需登录）
			let param = {
				params : {
					// id : this.paidId,
					orderNum : this.paidOrderNum
				}
			}
			// 判断当前订单状态
			this.request_orderdetailno(param).then(res => {
				// console.log(this.orderDetailsNo);
				// console.log("2222",this.producttype)
				if(this.orderDetailsNo.ProcessingState == "已取消"){
					this.cancStatus = true;
					// this.completed = true;
				}else if(this.orderDetailsNo.ProcessingState == "已完成"){
					this.completedStatus = true;
					this.completed = true;
				}else if(this.orderDetailsNo.ProcessingState == "办理中"){
					this.paymentStatus = true;
					this.completed = true;
				}else if(this.orderDetailsNo.ProcessingState == "待评价"){
					this.completedStatus = true;
					this.completed = true;
				}

				if(this.orderDetailsNo.ProcessingState != "待付款"){
					this.$refs.payColumn.style.display = "none";
				}
			});
		},
	    methods:{
			...mapActions(
				{
					"request_orderdetailno":"otherPay/otherPay/request_orderdetailno",
				}
			),
			// 付款
	    	payMoney(){
				// 把订单信息存本地
				let obj = {};
				obj.list = this.orderDetailsNo.OrderDetails;
				obj.orderNum = this.orderDetailsNo.OrderNumber;
				obj.money = this.orderDetailsNo.Amount;
				obj.id = this.orderDetailsNo.CustomerId;
				tool.saveToLocal('orderMesg',obj);
				// console.log("obj",obj)
				// 判断客户是否登录
				if(tool.loadFromLocal("CustomerMesg","ALL")){
					//去付款
	    			this.$router.push({path:'/cart/newPayment',query:{type:1}});
				}else{
					this.$router.push({name:"loginAndRegister-login",query:{otherPay:1}});
				}
			},
			// 点击去到商品详情页
			toProduct(val){
				let _type;
				if(val.type == "产品"){
					_type = 0;
				}else if(val.type == "套餐"){
					_type = 1;
				}
				this.$router.push("/productDetails/" + val.ProductIdd + "/" + _type)
			}
	    	
	    }
	}
</script>

<style lang="less" type="stylesheet/css" scoped>
  @import "~assets/common/index.less";
  @import "~assets/common/common.less";
  @import "./paid.less";
</style>