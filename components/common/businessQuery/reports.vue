<template>
	<div id="reports">
		<ul class="reports-wrap-list">
	    	<li :class="num==i?'active':''" v-for="(data,i) in reportsData.items" :key="i" @click="toChooose(i)">{{data.baseInfo.reportYear?data.baseInfo.reportYear:'-'}}年度报告</li>
	    </ul>
	    <!--企业基本信息-->
	    <div class="generalInf" v-if="reportData.baseInfo">
	    	<div class="title"><h4>企业基本信息</h4></div>
	    	<table class="generalInf-table" cellspacing="0" cellpadding="0">
	    		<tbody>
		    		<tr>
		    			<td>注册号</td><td>{{reportObj.regNumber?reportObj.regNumber:'-'}}</td>
		    			<td>企业经营状况</td><td>{{reportObj.manageState?reportObj.manageState:'-'}}</td>
		    		</tr>
		    		<tr>
		    			<td>企业联系电话</td><td>{{reportObj.phoneNumber?reportObj.phoneNumber:'-'}}</td>
		    			<td>电子邮箱</td><td>{{reportObj.email?reportObj.email:'-'}}</td>
		    		</tr>
		    		<tr>
		    			<td>邮政编码</td><td>{{reportObj.postcode?reportObj.postcode:'-'}}</td>
		    			<td>从业人数</td><td>{{reportObj.employeeNum?reportObj.employeeNum:'-'}}</td>
		    		</tr>
		    		<tr>
		    			<td>股东股权转让</td><td>-</td>
		    			<td>企业是否有投资信息或购买其他公司股权</td><td>-</td>
		    		</tr>
		    		<tr>
		    			<td>企业地址</td><td colspan="3">{{reportObj.postalAddress?reportObj.postalAddress:'-'}}</td>
		    		</tr>
	    		</tbody>
	    	</table>
	    </div>
	    <!--网站或网店信息-->
	    <div class="webStore" v-if="webLength">
	    	<div class="title"><h4>网站或网店信息</h4><div class="icon">{{webLength?webLength:'-'}}</div></div>
	    	<table class="webStore-table" cellspacing="0" cellpadding="0">
	    		<tbody>
		    		<tr>
		    			<td>类型</td><td>名称</td><td>网址</td>
		    		</tr>
		    		<tr v-for="(data,index) in reportData.webInfoList" :key="index">
		    			<td>{{data.webType?data.webType:'-'}}</td><td>{{data.name?data.name:'-'}}</td><td class="active">{{data.website?data.website:'-'}}</td>
		    		</tr>
	    		</tbody>
	    	</table>
	    </div>
	    <!--发起人及出资信息-->
	    <div class="initiator" v-if="length">
	    	<div class="title"><h4>发起人及出资信息</h4><div class="icon">{{length?length:'-'}}</div></div>
	    	<table class="initiator-table" cellspacing="0" cellpadding="0">
	    		<tbody>
		    		<tr>
		    			<td>发起人</td><td>认缴出资额（万元）</td><td>认缴出资时间</td><td>认缴出资方式</td><td>实缴出资额（万元）</td><td>出资时间</td><td>出资方式</td>
		    		</tr>
		    		<tr v-for="(val,i) in reportData.shareholderList" :key="i">
		    			<td>{{val.investorName?val.investorName:'-'}}</td><td>{{val.subscribeAmount?val.subscribeAmount:'-'}}</td><td>{{val.subscribeTime?val.subscribeTime:'-'}}</td><td>{{val.subscribeType?val.subscribeType:'-'}}</td>
		    			<td>{{val.paidAmount?val.paidAmount:'-'}}</td><td>{{val.paidTime?val.paidTime:'-'}}</td><td>{{val.paidType?val.paidType:'-'}}</td>
		    		</tr>
	    		</tbody>
	    	</table>
	    </div>
	    <!--企业资产状况信息-->
	    <div class="enterpriseAssets" v-if="reportData.baseInfo">
	    	<div class="title"><h4>企业资产状况信息</h4></div>
	    	<table class="enterpriseAssets-table" cellspacing="0" cellpadding="0">
	    		<tbody>
		    		<tr>
		    			<td>资产总额</td><td>{{reportObj.totalAssets?reportObj.totalAssets:'-'}}</td><td>所有者权益合计</td><td>{{reportObj.totalEquity?reportObj.totalEquity:'-'}}</td>
		    		</tr>
		    		<tr>
		    			<td>营业总收入</td><td>{{reportObj.totalSales?reportObj.totalSales:'-'}}</td><td>利润总额</td><td>{{reportObj.totalProfit?reportObj.totalProfit:'-'}}</td>
		    		</tr>
		    		<tr>
		    			<td>营业总收入中主营业务收入</td><td>{{reportObj.primeBusProfit?reportObj.primeBusProfit:'-'}}</td><td>净利润</td><td>{{reportObj.retainedProfit?reportObj.retainedProfit:'-'}}</td>
		    		</tr>
		    		<tr>
		    			<td>纳税总额</td><td>{{reportObj.totalTax?reportObj.totalTax:'-'}}</td><td>负债总额</td><td>{{reportObj.totalLiability?reportObj.totalLiability:'-'}}</td>
		    		</tr>
	    		</tbody>
	    	</table>
	    </div>
	    <detailEmpty v-if="!reportData.baseInfo&&!length&&!webLength&&!reportData.baseInfo"></detailEmpty>
	</div>
</template>

<script>
	import { mapState,mapActions,mapGetters} from 'vuex';
	import detailEmpty from './detailEmpty.vue';
	export default{
		data(){
			return{
				brandPageSize:20,
				num:0,//选中的年度
				reportData:{},//选中的年度数据
				reportObj:{},//选中的年度基本信息
				length:"",//发起人出资数据数量
				webLength:"",//网站或网店数据数量
				reportsData:''
			}
		},
		components:{
			detailEmpty
		},
		computed:{
			...mapGetters({
				'reportsGet':'businessQuery/businessQuery/reportsGet'
			})
		},
		mounted(){
			let args = "name="+this.$route.query.searchName;
			//商标详情
			var data = {
				num:'5',
				method:'get',
				params:{
				"params":{
					api:'9',
						args:encodeURI(args) 
					} 
				}
			}  
			this.REQUESTDATA_KNOWLEAGE(data)
			.then((res)=>{
				//console.log(this.reportsData)
				this.reportsData = this.reportsGet.reportsData
				if (this.reportsData.items.length>0) {
					this.reportData = this.reportsData.items[0];
					this.reportObj = this.reportData.baseInfo;
					this.length = this.reportData.shareholderList.length;
					this.webLength = this.reportData.webInfoList.length;
					//基本信息总条数
					var total = this.reportData.webInfoList.length+this.length;
					this.getReportTotal(total);
				}else{
					this.getReportTotal(0);
				}
			})
		},
		methods:{
			...mapActions({
				'REQUESTDATA_KNOWLEAGE':'businessQuery/businessQuery/REQUESTDATA_KNOWLEAGE'
			}),
	        //传值给父组件
			getReportTotal(val){
				this.$emit("getReportTotal",val)
			},
	        //选择年度
	        toChooose(i){
	        	this.num = i;
	        	this.reportData = this.reportsData.items[i];
	        	this.length = this.reportData.shareholderList.length;
	        	//基本信息总条数
				var total = this.reportData.webInfoList.length+this.length;
				this.getReportTotal(total);
	        }
		}
	}
</script>

<style lang="less" scoped>
	@import "~assets/common/index.less";
	@import "../../../pages/business/reports.less";
</style>