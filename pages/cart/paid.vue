<template>
	<div id="paid">
		<!-- 公用top  -->
		<div class="c-headerContainWrap">
			<div class="c-header">
				<div class="c-hdTopWrap">
					<topState></topState>
				</div>
			</div>
		</div>
		<!--头部-->
		<paymentHead :title="title"></paymentHead>
		<!--支付-->
		
		<!--内容-->
		<div class="paid-content">
			<!--详情-->
			<div class="paid-detail">
				<div class="paid-head">
					<div class="icon"></div>
					<div class="title">
						<p>您正在为以下  笔交易申请代付</p>
						<p>赶紧提醒TA去帮你支付吧，我们将为您保留<i>24小时</i></p>
					</div>
					<div class="price">
						<span>应付金额：</span>
						<span>¥ {{finallyMoney}}</span>
					</div>
				</div>
				<ul class="paid-list">
					<li><img src="~assets/images/cart/order/triangular.png"/></li>
					<!--商城-->
					<li v-for="(items,index) in orderDetails.OrderDetails" :key="index" v-if="isShow">
						<span v-if="items.type == 0">
							{{items.Name}} &nbsp;&nbsp; {{items.ProductType}}
						</span>
						<span v-if="items.type == 1">
							{{items.Name}} &nbsp;&nbsp; {{items._productType}}
						</span>
						<span>
							￥ {{items.Price}}
						</span>
					</li>
					
					<!--电子合同-->
					<li v-for="(items,index) in orderDetail.OrderDetails" :key="index" v-if="!isShow">
						<span>
							{{items.Title}}
						</span>
						<span>
							￥ {{items.Price}}
						</span>
					</li>
				</ul>
			</div>
			
			<!--代付方式-->
			<div class="paid-way">
				<div class="words">
					<span>捎句话呗：</span>
					<div class="fill" @click.stop.prevent="toFill" v-if="isEntry">亲，江湖告急，帮忙付个款，滴水之恩，定当涌泉相报<i>（点击输入）</i></div>
					<textarea id="mes" rows="3" cols="133" maxlength="80" v-model="mesValue" v-else  @blur.stop.prevent="textBlur"></textarea>
					<span>{{mesValue.length}}/80</span>
				</div>
				
				<div class="methods">
					<div class="chooseWay">
						<!--方法一-->
						<div class="chooseWay-left">
							<div class="chooseWay-head">
								<i>方法一：</i>
								<span>微企宝App/微信扫描二维码，请好友帮忙付款</span>
							</div>
							<div class="code">
								<!--二维码生成-->
								<div id="qr-code"></div>
							</div>
						</div>
						<!--方法二-->
						<div class="chooseWay-right">
							<div class="chooseWay-head">
								<i>方法二：</i>
								<span>你可以将以下链接发送给好友，完成支付</span>
							</div>
							<div class="copy">
								<div class="interlinkage" @click="selectAll">{{payUrl}}</div>
								<button type="button" @click="copyUrl">复制代付链接</button>
								<p>如您的浏览器不支持复制，请手动复制此链接。</p>
							</div>
						</div>
						<div class="either">或</div>
					</div>
					<div class="choose-change">
						<div class="online-payment">
							<span>我改变主意了，我要</span><span @click="onPay">自己在线支付</span>
						</div>
						<div class="payment-other">
							<span>完成代付申请后，您可以：</span>
							<span @click="toMyOrder">查看订单状态&nbsp;&nbsp;</span>
							<span @click="toHome">继续购物&nbsp;&nbsp;</span>
							<span @click="toHelpCenter">问题反馈</span>
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
	import topState from "~/components/common/topState";
	import publicBottom from "~/components/common/publicBottom";
	import paymentHead from "~/components/cart/paymentHead";
	import getData from '~/store/ajaxAPI/getData';
	import { mapState,mapActions,mapGetters} from 'vuex';
	import {paid_scanIng,paid_link,ec_link} from '~/store/ajaxAPI/vueDynamicParams';
	import tool from '~/assets/lib/tool';
	
	export default {  
	    data() {
		    return {
		    	isEntry:true,//是否点击输入留言
		    	title:'找人代付',//给paymentHead传值
		    	mesValue:'亲，江湖告急，帮忙付个款，滴水之恩，定当涌泉相报',//留言内容
				payUrl:'',//代付链接
				orderParamsId:"",//订单页传过来的参数==id
				orderParamsNum:"",//订单页传过来的参数==orderNum
				// orderDetails:{}, //订单详情数据
				finallyMoney:0,
				orderDetail:{},//记录电子合同套餐数据
				isShow:true,//区分是商城还是电子合同
		    }
	    },
	    components:{
	    	topState,
	    	publicBottom,
	    	paymentHead
		},
		computed:{
		    ...mapGetters({
				orderDetails:'otherPay/otherPay/orderDetails',
			})
		},
	    mounted(){
			// 接收订单页传过来的参数
			this.orderParamsId = this.$route.query.id;
			this.orderParamsNum = this.$route.query.orderNum;
			// console.log(this.orderParamsId,this.orderParamsNum);
			// 对接订单详情接口
			let param = {
				id : this.orderParamsId,
				orderNum : this.orderParamsNum
			}
			// getData.orderDetail(param).then((res) => {
			// 	this.orderDetails = res.data;
			// }).catch(err => {
			// 	console.log(err);
			// })
			//来自电子合同支付页
			if(this.$route.query.type == 1){
				//获取订单详情
				let orderParams = {
					orderNum:this.orderParamsNum
				}
				getData.getECPackageInfo(orderParams)
				.then((res)=>{
					this.orderDetail = res.data;
					res.data.OrderDetails.forEach((val)=>{
						this.finallyMoney += val.Price;
					})
					
					// 制作二维码 
					var qrcode = new QRCode(document.getElementById("qr-code"), {
						// text: "http://192.168.1.215:12000/findFriendPay?orderNum="+this.orderParamsNum+"&actPrice="+this.finallyMoney+"flag=help",
						text: `${paid_scanIng}/findFriendPay?orderNum=${this.orderParamsNum}&actPrice=${this.finallyMoney}&flag=help`,
						width:230,
						height:230,
						colorDark : "#000000",   
						colorLight : "#ffffff",
						correctLevel : QRCode.CorrectLevel.L,
					});
				})
			}else{
				this.request_orderdetail(param).then(() => {
					this.finallyMoney = this.orderDetails.Amount;
					// 制作二维码 
					var qrcode = new QRCode(document.getElementById("qr-code"), {
						// text: "http://192.168.1.215:12000/findFriendPay?orderNum="+this.orderParamsNum+"&actPrice="+this.finallyMoney+"flag=help",
						text: `${paid_scanIng}/findFriendPay?orderNum=${this.orderParamsNum}&actPrice=${this.finallyMoney}&flag=help`,
						width:230,
						height:230,
						colorDark : "#000000",   
						colorLight : "#ffffff",
						correctLevel : QRCode.CorrectLevel.L,
					});
				});
			}
			
			
			// 链接
			// this.payUrl = "http://192.168.1.216:15000/cart/prePayment/" + "?orderNum=" + this.orderParamsNum ;
			this.payUrl = `${paid_link}/cart/prePayment/?orderNum=${this.orderParamsNum}`;
	    },
	    methods:{
			...mapActions(
				{
					"request_orderdetail":"otherPay/otherPay/request_orderdetail",
				}
			),
	    	//点击留言
	    	toFill(){
	    		this.isEntry = false;
	    		this.mesValue = '';
	    		this.$nextTick(()=>{ 
	    			document.getElementById('mes').focus();
	    		})
	    	},
	    	//留言失焦
	    	textBlur(){
	    		if(this.mesValue.length == 0){
	    			this.isEntry = true;
	    			this.mesValue = '亲，江湖告急，帮忙付个款，滴水之恩，定当涌泉相报';
	    		}
	    	},
	    	//在线支付
	    	onPay(){
	    		//来自电子合同
	    		if(this.$route.query.type == 1){
	    			location.href = `${ec_link}/customerCenter/meal/newPayment?id=${this.orderParamsNum}`;
	    		}else{
	    			this.$router.replace('/cart/newPayment')
	    		}
	    	},
	    	//查看我的订单
	    	toMyOrder(){
	    		this.$router.replace('/personalCenter/allOrder')
	    	},
	    	//继续购物
	    	toHome(){
	    		this.$router.replace('/')
	    	},
	    	//意见反馈
	    	toHelpCenter(){
	    		this.$router.replace('/helpCenter/helpCenter')
	    	},
	    	//点击div全选内容
	    	selectAll(){
	    		var text = document.getElementsByClassName('interlinkage')[0];
                if(window.getSelection().toString().length>0){
                    return false;
                }else{
                    if (document.body.createTextRange) {
                        var range = document.body.createTextRange();
                        range.moveToElementText(text);
                        range.select();
                    } else if (window.getSelection) {
                        var selection = window.getSelection();
                        var range = document.createRange();
                        range.selectNodeContents(text);
                        selection.removeAllRanges();
                        selection.addRange(range);
                    } else {
                        console.log("none");
                    }
                }
	    	},
	    	//点击复制
	    	copyUrl(){
				let param = {
					params : {
						orderNum : this.orderParamsNum,
						content : this.mesValue
					}
				}
				getData.message(param).then((res) => {
					// console.log(this.mesValue,res);
				}).catch(err => {
//					console.log(err);
				})
	    		// var copyDOM = document.getElementsByClassName('interlinkage')[0];
				// var range = document.createRange();    
				// // 选中需要复制的节点  
				// range.selectNode(copyDOM);  
				// // 执行选中元素  
				// window.getSelection().addRange(range);  
				// // 执行 copy 操作  
				// var successful = document.execCommand('copy');    
				// try {    
				//     var msg = successful ? 'successful' : 'unsuccessful';    
				//     this.$message({
			    //       	message: '复制成功',
			    //       	type: 'success'
			    //     });
				// } catch(err) {    
				//     this.$message.error('复制失败，请手动复制');
				// }  
				// // 移除选中的元素  
				// window.getSelection().removeAllRanges();

				// 动态创建 input 元素  
				var aux = document.createElement("input");  
				// 获得需要复制的内容  
				aux.setAttribute("value", document.getElementsByClassName('interlinkage')[0].innerHTML);  
				// 添加到 DOM 元素中  
				document.body.appendChild(aux);  
				// 执行选中  
				// 注意: 只有 input 和 textarea 可以执行 select() 方法.  
				aux.select();  
				// 获得选中的内容  
				var content = window.getSelection().toString();  
				// 执行复制命令  
				var successful = document.execCommand("copy");  
				try {    
				    var msg = successful ? 'successful' : 'unsuccessful';    
				    this.$message({
			          	message: '复制成功',
			          	type: 'success'
			        });
				} catch(err) {    
				    this.$message.error('复制失败，请手动复制');
				}  				
				// 将 input 元素移除  
				document.body.removeChild(aux);  
	    	}
	    	
	    },
	    directives: {
			focus: {
			    // 指令的定义
			    inserted: function (el) {
			      el.focus()
			    }
			}
		}
	}
</script>

<style lang="less" type="stylesheet/css" scoped>
  @import "~assets/common/index.less";
  @import "~assets/common/common.less";
  @import "./paid.less";
</style>