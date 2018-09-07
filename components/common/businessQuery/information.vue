<template>
	<div id="elementCustom" class="information">
		<ul class="content-wrap-list">
	    	<li><a href="#industry">工商信息</a></li>
	    	<li><a href="#shareholder">股东信息&nbsp;{{tempmainKeyData.total}}</a></li>
	    	<li><a href="#mainKey">主要人员&nbsp;{{total}}</a></li>
	    	<li><a href="#branch">分支机构&nbsp;{{branchData.total}}</a></li>
	    	<li><a href="#modify">变更记录&nbsp;{{modifyData.total}}</a></li>
	    	<!--<li>公司简介</li>-->
	    </ul>
	    <!--工商信息-->
	    <div class="industry" id="industry" v-if="basicData">
	    	<div class="title"><h4>工商信息</h4><div class="icon"></div></div>
	    	<table class="industry-table" cellspacing="0" cellpadding="0">
	    		<tbody>
		    		<tr>
		    			<td>统一社会信用代码</td><td>{{basicData.creditCode?basicData.creditCode:'-'}}</td>
		    			<td>组织机构代码</td><td>{{basicData.orgNumber?basicData.orgNumber:'-'}}</td>
		    		</tr>
		    		<tr>
		    			<td>注册号</td><td>{{basicData.regNumber?basicData.regNumber:'-'}}</td>
		    			<td>经营状态</td><td>{{basicData.regStatus?basicData.regStatus:'-'}}</td>
		    		</tr>
		    		<tr>
		    			<td>所属行业</td><td>{{basicData.industry?basicData.industry:'-'}}</td>
		    			<td>成立日期</td><td>{{estiblishTime?estiblishTime:'-'}}</td>
		    		</tr>
		    		<tr>
		    			<td>公司类型</td><td>{{basicData.companyOrgType?basicData.companyOrgType:'-'}}</td>
		    			<td>营业期限</td><td>{{fromTime?fromTime:'-'}}-{{toTime?toTime:'-'}}</td>
		    		</tr>
		    		<tr>
		    			<td>法定代表人</td><td>{{basicData.legalPersonName?basicData.legalPersonName:'-'}}</td>
		    			<td>发照日期</td><td>-</td>
		    		</tr>
		    		<tr>
		    			<td>注册资本</td><td>{{basicData.regCapital?basicData.regCapital:'-'}}</td>
		    			<td>登记机关</td><td>{{basicData.regInstitute?basicData.regInstitute:'-'}}</td>
		    		</tr>
		    		<tr>
		    			<td>人员规模</td><td>-</td>
		    			<td>核准日期</td><td>{{approvedTime?approvedTime:'-'}}</td>
		    		</tr>
		    		<tr><td>企业地址</td><td colspan="3">{{basicData.regLocation?basicData.regLocation:'-'}}</td></tr>
		    		<tr><td>经营范围</td><td colspan="3" class="last">{{basicData.businessScope?basicData.businessScope:'-'}}</td></tr>
	    		</tbody>
	    	</table>
	    </div>
	    <!--股东信息-->
	    <div class="shareholder" v-if="tempmainKeyData.total" id="shareholder">
	    	<div class="title"><h4>股东信息</h4><div class="icon">{{tempmainKeyData.total?tempmainKeyData.total:'-'}}</div></div>
	    	<table class="shareholder-table" cellspacing="0" cellpadding="0">
	    		<tbody>
		    		<tr>
		    			<td>股东</td><td class="active">认缴出资额（万元）</td><td class="active">持股比例</td><td class="active">股东类型</td>
		    		</tr>
		    		<tr v-for="(data,index) in mainKeyData">
		    			<td class="first" @click="toMainKey(data.name,'股东')">{{data.name?data.name:'-'}}</td><td v-for="(item,index) in data.capital">{{item.amomon?item.amomon:'-'}}</td><td v-for="(item,index) in data.capital">{{item.percent?item.percent:'-'}}</td><td>-</td>
		    		</tr>
	    		</tbody>
	    	</table>
	    	<el-pagination
				  background
				  layout="prev, pager, next"
				  prev-text="上一页"
				  next-text="下一页"
				  :page-size="20"
				  :total="tempmainKeyData.total"
				  @size-change="handleSizeChangeShareholder"
     			  @current-change="handleCurrentChangeShareholder"
     			  v-if="tempmainKeyData.total>20"
			>
			</el-pagination>
	    </div>
	    <!--主要人员-->
	    <div class="mainKey" v-if="total" id="mainKey">
	    	<div class="title"><h4>主要人员</h4>
	    		<div class="icon">{{total?total:'-'}}</div>
	    	</div>
	    	<dl class="mainKey-table" cellspacing="0" cellpadding="0">
	    		<dt v-for="(data,index) in arr" :key="index+data.name">
	    			<dd>{{data.typeJoin[0]}}</dd>
	    			<dd><span @click="toMainKey(data.name,'主要人员')">{{data.name}}</span><div class="mainKey-table-active">对外投资任职></div></dd>
	    		</dt>
	    		<dt v-if="(arr.length%2)!=0">
	    			<dd></dd>
	    			<dd></dd>
	    		</dt>
	    	</dl>
	    </div>
	    <!--分支机构-->
	    <div class="branch" v-if="branchData.total" id="branch">
	    	<div class="title"><h4>分支机构</h4><div class="icon">{{branchData.total?branchData.total:"-"}}</div></div>
	    	<dl class="branch-table" cellspacing="0" cellpadding="0">
	    		<dt v-for="(data,i) in branchData.items" :key="i+data.name">
	    			<dd>{{i+1}}</dd>
	    			<dd>{{data.name?data.name:'-'}}</dd>
	    		</dt>
	    		<dt v-if="(branchData.total%2)!=0">
	    			<dd></dd>
	    			<dd></dd>
	    		</dt>
	    	</dl>
	    	<el-pagination
				  background
				  layout="prev, pager, next"
				  prev-text="上一页"
				  next-text="下一页"
				  :page-size="20"
				  :total="branchData.total"
     			  @current-change="handleCurrentChangeBranch"
     			  v-if="branchData.total>20"
			>
			</el-pagination>
	    </div>
	    <!--历史信息-->
	    <!--<div class="history">
	    	<div class="title"><h4>历史信息</h4></div>
	    	<table class="history-table" cellspacing="0" cellpadding="0">
	    		<tbody>
	    		<tr>
	    			<td rowspan="7" class="first">历史股东</td><td class="selected"><span>王春成</span><div class="history-table-active">对外投资任职></div></td>
	    		</tr>
	    		<tr>
	    			<td class="selected"><span>王春成</span><div class="history-table-active">对外投资任职></div></td>
	    		</tr>
	    		<tr>
	    			<td class="selected"><span>王春成</span><div class="history-table-active">对外投资任职></div></td>
	    		</tr>
	    		<tr>
	    			<td class="selected"><span>王春成</span><div class="history-table-active">对外投资任职></div></td>
	    		</tr>
	    		<tr>
	    			<td class="selected"><span>王春成</span><div class="history-table-active">对外投资任职></div></td>
	    		</tr>
	    		<tr>
	    			<td class="selected"><span>王春成</span><div class="history-table-active">对外投资任职></div></td>
	    		</tr>
	    		<tr>
	    			<td class="selected"><span>王春成</span><div class="history-table-active">对外投资任职></div></td>
	    		</tr>
	    		</tbody>
	    	</table>
	    </div>-->
	    <!--变更记录-->
	    <div class="modify" v-if="modifyData.total" id="modify">
	    	<div class="title"><h4>变更记录</h4><div class="icon">{{modifyData.total?modifyData.total:'-'}}</div></div>
	    	<table class="modify-table" cellspacing="0" cellpadding="0" v-for="(data,i) in modifyData.items" :key="i+data.changeItem">
	    		<tbody>
		    		<tr>
		    			<td colspan="4">{{data.changeItem?data.changeItem:'-'}}</td>
		    		</tr>
		    		<tr>
		    			<td>序号</td><td>变更日期</td><td>变更前</td><td>变更后</td>
		    		</tr>
		    		<tr>
		    			<td>{{i+1+modifyNum*20}}</td><td>{{data.changeTime?data.changeTime:'-'}}</td><td>{{data.contentBefore?data.contentBefore:'-'}}</td><td>{{data.contentAfter?data.contentAfter:'-'}}</td>
		    		</tr>
	    		</tbody>
	    	</table>
	    	<el-pagination
				  background
				  layout="prev, pager, next"
				  prev-text="上一页"
				  next-text="下一页"
				  :page-size="20"
				  :total="modifyData.total"
     			  @current-change="handleCurrentChangeModify"
     			  v-if="modifyData.total>20"
			>
			</el-pagination>
	    </div>
	    <detailEmpty v-if="!basicData&&!tempmainKeyData.total&&!total&&!branchData.total&&!modifyData.total"></detailEmpty>
	    <!--公司简介-->
	    <!--<div class="inf">
	    	<div class="title"><h4>公司简介</h4></div>
	    	<div class="inf-content">
	    		132
	    	</div>
	    </div>-->
	</div>
</template>

<script>
	import { mapState,mapActions,mapGetters} from 'vuex';
	import tool from '~/assets/lib/tool.js';
	import axios from 'axios';
	import detailEmpty from './detailEmpty.vue';
	export default{
		data(){
			return{
				estiblishTime:"-",//基本信息成立日期
				fromTime:"",//基本信息营业期限成立
				toTime:"",//基本信息营业期限结束
				approvedTime:"",//基本信息核准日期
				total:"",//主要人员信息数量
				arr:[],//主要人员
				modifyNum:0,//变更记录序号
				basicData:'',
				tempmainKeyData:'',//用来储存mainKeyData的临时变量
				mainKeyData:'',  //股东数
				branchData:'',
				modifyData:''//变更记录
			}
		},
		components:{
			detailEmpty
		},
		computed:{
		   ...mapGetters({
			   'basicDataGet':'businessQuery/businessQuery/basicDataGet'
		   })
		},
		mounted(){
			//公司详情 基本信息
			let args = "name="+this.$route.query.searchName;
			var param = {
	            method:'get',
	            params:{
		            "params":{
		                api:'4',
		                args:encodeURI(args) 
		            } 
		        }
			}
			//公司详情 股东信息
			var data = {
	            method:'get',
	            params:{
		            "params":{
		                api:'6',
		                args:encodeURI(args) 
		            } 
		        }
			}
			//公司详情 分支机构
			var branchData = {
	            method:'get',
	            params:{
		            "params":{
		                api:'10',
		                args:encodeURI(args) 
		            } 
		        }
			}
			//公司详情 变更记录
			var modifyData = {
	            method:'get',
	            params:{
		            "params":{
		                api:'8',
		                args:encodeURI(args) 
		            } 
		        }
			};
			// 一次性并发多个请求
			axios.all([
				this.getCompanyDetail(param),
				this.getCompanyMainKey(data),
				this.getCompanyBranch(branchData),
				this.getCompanyModify(modifyData)
				])
				
			.then(axios.spread((acct,perms)=>{
				//公司详情 基本信息
				this.basicData = this.basicDataGet.basicData;
				this.tempmainKeyData = this.basicDataGet.mainKeyData
				// console.log('哈哈哈',this.basicDataGet.mainKeyData)
				this.mainKeyData = this.basicDataGet.mainKeyData.items;
				this.branchData = this.basicDataGet.branchData
				this.modifyData = this.basicDataGet.modifyData
				// console.log('hahahahha',this.basicData)
			    this.estiblishTime = tool.formatDate(this.basicData.estiblishTime,"yyyy年MM月dd日");
				this.fromTime = tool.formatDate(this.basicData.fromTime,"yyyy年MM月dd日");
				this.toTime = tool.formatDate(this.basicData.toTime,"yyyy年MM月dd日");
				this.approvedTime = tool.formatDate(this.basicData.approvedTime,"yyyy年MM月dd日");
				this.total = this.basicData.staffList.total;
				// console.log(this.basicData.staffList.result,'上海市是谁')
				this.arr = this.basicData.staffList.result;
				//股东信息
				if (!this.tempmainKeyData.total) {
					this.tempmainKeyData.total = 0;
				}
				
				// console.log(this.modifyData)
				//公司详情 变更记录
				// if (this.modifyData.total) {
				// 	this.modifyData.items.forEach((val)=>{
				// 		//  console.log(val)
				// 		var contentBefore = val.contentBefore.replace(/\<em\>/g,"");
				// 		val.contentAfter = val.contentAfter.replace(/\<em\>/g,"");
				// 	})
				// } else{
				// 	this.modifyData.total = 0;
				// }
				// console.log(this.mainKeyData.total);
				// 分支机构
				if(!this.branchData.total){
					this.branchData.total = 0;
				}
				
				//基本信息总条数
				var total = this.tempmainKeyData.total+this.total+this.branchData.total+this.modifyData.total;
				var obj = {};
				obj.total = total;
				obj.phoneNumber = this.basicData.phoneNumber;
				obj.logo = this.basicData.logo;
				obj.websiteList = this.basicData.websiteList;
				obj.regLocation = this.basicData.regLocation;
				obj.mainKeyData = this.mainKeyData;
				obj.mainPerData = this.arr;
				// console.log('头疼',obj)
				this.getTotal(obj);
			}))
		},
		methods:{
			...mapActions({
				'getCompanyDetail':'businessQuery/businessQuery/getCompanyDetail',
				'getCompanyMainKey':'businessQuery/businessQuery/getCompanyMainKey',
				'getCompanyBranch':'businessQuery/businessQuery/getCompanyBranch',
				'getCompanyModify':'businessQuery/businessQuery/getCompanyModify',
			}),
			//跳转股东
			toMainKey(val,info){
				this.$router.push({path:"/business/mainKey",query:{name:val,searchName:this.$route.query.searchName,info:info}});
			},
			//传值给父组件
			getTotal(val){
				// console.log('传值传值hihi',val)
				this.$emit("getTotal",val)
			},
			handleSizeChangeShareholder(val){//pageSize 改变时会触发 
				
			},
			handleCurrentChangeShareholder(val){//股东信息
				location.href = "#shareholder";
				
				let args = "name="+this.$route.query.searchName+"&pageNum="+val;
				//公司详情 股东信息
				var data = {
		            method:'get',
		            params:{
			            "params":{
			                api:'6',
			                args:encodeURI(args) 
			            } 
			        }
				}
				this.getCompanyMainKey(data).then(res=>{
					this.mainKeyData = this.basicDataGet.mainKeyData.items;
				})
			},
			handleCurrentChangeBranch(val){//分支机构
				location.href = "#branch";
				
				let args = "name="+this.$route.query.searchName+"&pageNum="+val;
				//公司详情 分支机构
				var branchData = {
		            method:'get',
		            params:{
			            "params":{
			                api:'10',
			                args:encodeURI(args) 
			            } 
			        }
				}
				this.getCompanyBranch(branchData).then(res=>{
					this.branchData = this.basicDataGet.branchData
				})
			},
			handleCurrentChangeModify(val){//点击下一页, 变更数据
				location.href = "#modify";
				
				//序号递增
				// console.log(val,'val' )
				this.modifyNum = val-1;
				
				let args = "name="+this.$route.query.searchName+"&pageNum="+val;
				//公司详情 变更记录
				var modifyData = {
		            method:'get',
		            params:{
			            "params":{
			                api:'8',
			                args:encodeURI(args) 
			            } 
			        }
				}
				this.getCompanyModify(modifyData).then(res=>{
					this.modifyData = this.basicDataGet.modifyData
				})
			}
		},
		
	}
</script>

<style lang="less" scoped>
	@import "~assets/common/index.less";
	@import "../../../pages/business/business.less";
</style>