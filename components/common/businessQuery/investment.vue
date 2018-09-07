<template>
	<div id="elementCustom">
		<!--对外投资-->
	    <div class="investment" id="investment" v-if="investmentData.total">
	    	<div class="title"><h4>对外投资</h4><div class="icon">{{investmentData.total?investmentData.total:'-'}}</div></div>
	    	<table class="investment-table" cellspacing="0" cellpadding="0">
	    		<tbody>
		    		<tr>
		    			<td>被投资企业名称</td><td>被投资法定代表人</td>
		    			<td>注册资本</td><td>出资比例</td>
		    			<td>成立日期</td><td>状态</td>
		    		</tr>
		    		<tr v-for="(data,i) in investmentData.items" :key="i">
		    			<td class="active">{{data.name?data.name:'-'}}</td>
		    			<td><span>{{data.legalPersonName?data.legalPersonName:'-'}}</span><span>对外投资任职</span></td>
		    			<td>{{data.regCapital?data.regCapital:'-'}}</td><td>{{data.percent?data.percent:'-'}}</td><td>{{data.estiblishTime?data.estiblishTime:'-'}}</td>
		    			<td style="color: #5EAEF9;">{{data.regStatus?data.regStatus:'-'}}</td>
		    			<!--<td style="color: #FF7D59;" v-if="data.isShow=='注销'">注销</td>-->
		    		</tr>
	    		</tbody>
	    	</table>
	    	<el-pagination
				  background
				  layout="prev, pager, next"
				  prev-text="上一页"
				  next-text="下一页"
				  :page-size="20"
				  :total="investmentData.total"
				  @size-change="handleSizeChangeBrand"
     			  @current-change="handleCurrentChangeBrand"
     			  v-if="investmentData.total>20"
			>
			</el-pagination>
	    </div>
	    <detailEmpty v-if="!investmentData.total"></detailEmpty>
	</div>
</template>

<script>
	import detailEmpty from './detailEmpty.vue';
	import { mapState,mapActions,mapGetters} from 'vuex';
	import tool from '~/assets/lib/tool.js';
	import getd from '~/store/ajaxAPI/getData.js';
	export default{
		data(){
			return{
				investmentData:''
			}
		},
		components:{
			detailEmpty
		},
		computed:{
			...mapGetters({
				'investmentGet':'businessQuery/businessQuery/investmentGet'
			})
		},
		mounted(){
			this.requestData(1);
		},
		methods:{
			//请求数据
			requestData(num){
				let args = "name="+this.$route.query.searchName+"&pageNum="+num;
				//公司详情 对外投资
				var data = {
		            method:'get',
		            params:{
			            "params":{
			                api:'7',
			                args:encodeURI(args) 
			            } 
			        }
				}
				this.getCompanyInvestment(data)
				.then((res)=>{
					this.investmentData = this.investmentGet.investmentData
					if (this.investmentData.total) {
						this.getInvestmentTotal(this.investmentData.total);
					}else{
						this.getInvestmentTotal(0);
					}
				})
			},
			...mapActions({
				'getCompanyInvestment':'businessQuery/businessQuery/getCompanyInvestment'
			}),
	        //传值给父组件
			getInvestmentTotal(val){
				this.$emit("getInvestmentTotal",val)
			},
			handleSizeChangeBrand(val){//pageSize 改变时会触发 
				
			},
			handleCurrentChangeBrand(val){//页数变化触发
				//锚点跳转
				location.href = "#investment";
				
				this.requestData(val)
			},
		}
	}
</script>

<style lang="less" scoped>
	@import "~assets/common/index.less";
	@import "../../../pages/business/business.less";
	.el-pagination{
		margin-bottom: 75px;
	}
</style>