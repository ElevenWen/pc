
<template>
	<div id="unionpay">
		<!-- 网银支付 --> 
 		<div>
 			网银支付
 		</div>
	    <!-- <form action="http://www.wqbol.com/Payment/Unionpay"  novalidate="novalidate"    class="form-horizontal" id="profile-form" method="post"  target="unionpayFrame" enctype="application/x-www-form-urlencoded"   >         -->
		 
	    <form :action='action'  novalidate="novalidate"    class="form-horizontal" id="profile-form" method="post"  target="unionpayFrame" enctype="application/x-www-form-urlencoded"   >        
	         <input value="/personalCenter/allOrder" name="frontUrl" id="frontUrl"  type="hidden">
	         <input :value="this.$router.currentRoute.query.orderId" name="orderId" id="orderId"  type="hidden">
	          <input :value="this.$router.currentRoute.query.txnAmt" name="txnAmt" id="txnAmt"  type="hidden">
	    </form>

	   <iframe name="aliFrame"  id="unionpayFrame"></iframe> 


		
	</div>
</template>

<!-- 
frontUrl:'/personalCenter/allOrder',//前端回调地址
orderId:this.$router.currentRoute.query.orderId,//
txnAmt: (this.orderInfo.amount*100) ,//交易金额，单位分

    			 -->
<script>
	import getD from "~/store/ajaxAPI/getData";
    import { payment_wxCode  }  from  '~/store/ajaxAPI/vueDynamicParams.js'
	 
	export default {  
	    data() {
		    return {
				action: `${payment_wxCode}/Payment/Unionpay`,//form提交链接
		    	orderInfo:{
		    		endPayTime:"",//倒计时
		    		amount:'',//应付金额：
		    		num:"",//订单数量 
		    		productName:[],//产品名称
		    	},//订单信息
		    	wxCode:'',//微信支付二维吗
		    }
	    },
	     mounted () {  

	     	//console.log(this.$router)
	  	//自动提交表单
	  	this.ordBtnPayFn();
		  },
		  methods:{
		   ordBtnPayFn(){

    		let data = {
    			frontUrl:'/personalCenter/allOrder',//前端回调地址
    			orderId:this.$router.currentRoute.query.orderId,//
    			txnAmt: this.$router.currentRoute.query.txnAmt ,//交易金额，单位分

    		}
    		// orderInfo.amount 
    		getD.unionpay(data).then((res)=>{
    			//console.log(res,'跳转网银支付');
    		});

		        //表单自动提交
		         // if(this.$router.currentRoute.query.txnAmt && this.$router.currentRoute.query.orderId){

		         // 	//console.log(this.$router.currentRoute.query.txnAmt , this.$router.currentRoute.query.orderId )
		        	//  document.getElementById("profile-form").submit();
		         // }
		     }, //生成订单 END
		     closePay(){
		     	//返回我的订单界面
		     	this.$router.push({"path":"/mine/toMyOrder"}); 
		     }
		  },
		     
	}
</script>

<style lang="less" type="stylesheet/css" scoped>
  
</style>