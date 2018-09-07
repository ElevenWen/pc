<template>
	<div id="status">
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
		<div class="payment">
			<div class="paymentWrap">
				<div class="payment_top">支付结果</div>
				<!--支付成功-->
				<div class="payment_succeed">
					<img src="~assets/images/cart/payment_icon.png">
					<div class="explain">
						<h2>{{docText}}</h2>
						<div class="companyForm" v-if="isClose">							
							<div class="entering" >														
								<span>公司名称:</span>
								<input type="text" v-model="userFromData.companyName" @keyup="toDeleted($event)" maxlength="50" class="company_Input"/>
								<el-select v-model="userFromData.companyName" placeholder="" @change="toChange" popper-class="selectedList">
									<el-option
										v-for="item in options"
										:key="item.Id"
										:label="item.CompanyName"
										:value="item">
									</el-option>
								</el-select>
							</div>
							
							<div class="entering">							
								<span>联&nbsp;&nbsp;系&nbsp;&nbsp;人:</span>
								<input type="text" v-model="userFromData.name" maxlength="30"/>
							</div>
							
							<div class="entering">															
								<span>联系人电话:</span>								
								<input type="text" v-model="userFromData.phoneNumber"/>
							</div>
						
							<div class="btn">
								<button type="button" @click="toEnter">完善资料</button>
							</div>
							
						</div>
						<!--自己支付-->
						<div v-if="!isDf">查看订单状态？ <label style="cursor: pointer;" class="searchOrder" @click="toOrder">查看订单 &gt;</label></div>
						<!--代付-->
						<div v-if="isDf">您已为好友成功付款 <label>{{totalMoney}}</label>元，赶快微信通知一下吧！</div>
						
						<p><label>重要提醒：</label>本网站不会以任何借口向你索取银行卡号与密码等信息，这些都是骗子哦！亲们，不要上当哦！</p>
					</div>
					<div class="richScan">
						<img src="~assets/images/home/QR.png">
						<span>扫码下载客服端</span>
						<span>随时随地查进度</span>
					</div>
				</div>
				<!--支付失败-->
				<!--<div class="payment_defeated">
					<img src="~assets/images/cart/defeated.png">
					<div class="explain">
						<h2>订单未支付</h2>
						<p>请及时处理您的订单，并尽快完成付款。</p>
						<div>应付金额: <label class="amountPayable">￥{{totalMoney}}</label></div>
						<p>请在&nbsp;<label>17分50秒</label>&nbsp;内完成付款，超时将自动取消订单。</p>
						<button>重新付款</button>
					</div>
					<div class="richScan">
						<img src="~assets/images/home/QR.png">
						<span>扫码下载客服端</span>
						<span>随时随地查进度</span>
					</div>
				</div>-->
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
	import tool from "~/assets/lib/tool.js";
	import getData from '~/store/ajaxAPI/getData.js'
export default {  
    data() {
	    return {
	    	title:'',//给paymentHead传值
	    	totalMoney:0,
			isDf:false,//是否为代付
			
			isSuccessSubmit: false,
			downSecond: 2,
			userFromData:{
				companyName: '',
				name: '',
				phoneNumber: ''
			},
			options: [],
        	docText:'支付成功！ 为了更好的为您提供服务，请完善公司信息',//提示文字
			isDeleted:false,//点击backspace是否一键删除
			cusId:"",//用户id
			isClose:true,//代付成功关闭公司信息
			orderId:"",//订单编号
	    }
    },
    components:{
    	topState,
    	publicBottom,
    	paymentHead
    },
    computed:{
	    
    },
    mounted(){
    	this.totalMoney = tool.loadFromLocal('orderMoney','ALL').orderMoney.orderMoney;
    	
    	let param = {};
    	//1为代付，0为自己支付
    	if(this.$route.query.type == 1){
    		this.isDf = true;
    		this.title = '帮TA付款';
    		this.cusId = tool.loadFromLocal('orderMesg','ALL').id;
    		
    		this.orderId = tool.loadFromLocal('orderMesg','ALL').orderNum;
    		
    		param.Id = this.orderId
    	}else{
    		this.isDf = false;
    		this.title = '支付页';
    		this.cusId = tool.loadFromLocal('CustomerMesg','ALL').Id;
    		
    		param.UserId = this.cusId
    	}
    	
    	//获取最近公司信息
    	
    	getData.getInfo(param)
    	.then((res)=>{
			//填写默认公司
			this.userFromData.companyName = res.data.CompanyName;
			this.userFromData.name = res.data.Name;
			this.userFromData.phoneNumber = res.data.Mobile;
			
			//是否有默认公司
			if(res.data.CompanyName){
				this.docText = '支付成功！为了更好的为您提供服务，请确认公司信息';
			}
			
    		// 获取我的公司列表
    		this.getCusCompanyList();
    	})
    	
    	
    },
    methods:{
    	home(){
    		this.$router.push("/");
    	},
    	// 获取我的公司列表
    	getCusCompanyList(){
    		// 获取我的公司列表
	    	let params = {
	    		Id:this.cusId,
	    		CompanyName:"",
	    		pageIndex:"",
	    		pageSize:""
	    	}
	    	getData.getCusCompanyList(params)
	    	.then((res)=>{
	    		this.options = res.data.list;
	    	})
    	},
    	//查看订单
    	toOrder(){
    		this.$router.replace('/personalCenter/allOrder')
		},
		toEnter(){	
			let that = this;
			//表单校验
		 	var isRegPhone =	tool.regularJudgement('telephone',this.userFromData.phoneNumber);
		 	if(this.userFromData.companyName.trim() ==''){
				this.$message.error('公司名称不能为空！');
				return false;
			}else if(this.userFromData.name.trim() == ''){
				this.$message.error('联系人姓名不能为空！');
				return false;
			}else if(!isRegPhone){
				this.$message.error('请检查手机号码是否填入正确！');
				return false;
			}else{
				// 完善我的公司
		    	let params = {
		    		CompanyName:this.userFromData.companyName,
		    		Name:this.userFromData.name,
		    		Mobile :this.userFromData.phoneNumber,
		    		OrderId:tool.loadFromLocal('orderMesg','ALL').orderNum
		    	}
				getData.editCompanyInfo(params)
				.then((res)=>{
					this.$message({
			          	message: '您提交的信息已保存成功。',
			          	type: 'success',
			          	duration:2000,
			          	onClose(){
			          		//代付
			          		if(that.$route.query.type == 1){
			          			that.isClose = false;
			          			that.docText = '支付成功！';
			          		}else{
			          			that.$router.replace({path: '/personalCenter/orderDetail', query: {id: res.data.Id,orderId:""}})
			          		}
				        }
			        });
				})
				.catch((error)=>{
					this.$message({
			          	message: error.data.msg,
			          	type: 'error',
			          	duration:2000
			        });
				})
			}
		},
		//监听backspace
		toDeleted(e){
			if (e.keyCode == 8 && this.isDeleted) {
				this.userFromData.companyName = '';
				this.isDeleted = false;
			}
		},
		//选中值
		toChange(e){
			this.isDeleted = true;
			this.userFromData.companyName = e.CompanyName;
			this.userFromData.name = e.Name;
			this.userFromData.phoneNumber = e.Mobile;
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
	#status .companyForm{
		padding-top: 10px;
		margin: 20px 0 !important;
		width: 450px;
		height: 240px;
		background-color: #ffffff;
		border: solid 1px #cccccc;
		.entering{
			position: relative;
			width: 400px;
			height: 28px;
			line-height: 28px !important;		
			margin: 20px auto !important;	
			span{
					font-size: 12px;
					color: #545454;
			}
			input{	
				position: absolute;	
				top: 0;
				right: 0;
				padding-left: 5px;
				border: 1px solid #cccccc;
				width: 300px;
				height: 28px;
			}
			.company_Input{
				top: 1px;
				right: 39px;
				border: none;
				width: 260px;
				height: 26px;				
				z-index: 10;
			}
			/deep/ .el-select{
				position: absolute;
				top: 0;
				right: 0;
				margin: 0 !important;	
				.el-input__inner{
					width: 300px;
					height: 28px;
					line-height: 28px;
					border: 1px solid #cccccc;
					border-radius: 0px
				 // box-sizing: ;
				}
				
			}
		}	
		.btn{
			text-align: center;
			button{
				width: 80px;
				height: 30px;
				background: #ff3e08;
				color: #fff;
			}
		}
	}
	.payment_succeed{
		height: 450px !important;
		margin-bottom: 82px !important;
	}
	.selectedList .el-select-dropdown__item.selected{
		color: #606266;
	}
	.selectedList .el-select-dropdown__item.hover,.selectedList .el-select-dropdown__item:hover{
		background-color: inherit;
	}
</style>