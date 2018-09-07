<template>
	<div id="elementCustom" class="knowledgeRight">
		<ul class="content-wrap-list">
	    	<li><a href="#brandInf">商标信息&nbsp;{{brandData.total}}</a></li>
	    	<li><a href="#patentInf">专利信息&nbsp;{{patentDate.total}}</a></li>
	    	<li><a href="#certificateInf">证书信息&nbsp;{{certificateInfData.total}}</a></li>
	    	<li><a href="#copyrightInf">著作权信息&nbsp;{{copyrightDate.total}}</a></li>
	    	<!--<li>软件著作权信息&nbsp;833</li>-->
	    	<!--<li>网站信息&nbsp;833</li>-->
	    </ul>
	    <!--商标信息-->
	    <div class="brandInf" id="brandInf" v-if="brandData.total">
	    	<div class="title"><h4>商标信息</h4><div class="icon">{{brandData.total?brandData.total:'-'}}</div></div>
	    	<table class="brandInf-table" cellspacing="0" cellpadding="0">
	    		<tbody>
		    		<tr>
		    			<td>商标</td><td>商标名</td>
		    			<td>状态</td><td>类别</td>
		    			<td>申请时间</td><td>注册号</td>
		    			<td>详情</td>
		    		</tr>
		    		<tr v-for="(data,index) in brandData.items" :key="index">
		    			<td><img :src="data.tmPic"/></td><td>{{data.tmName?data.tmName:'-'}}</td>
		    			<td>{{data.category?data.category:'-'}}</td><td>{{data.intCls?data.intCls:'-'}}</td>
		    			<td>{{data.appDate?data.appDate:'-'}}</td><td>{{data.regNo?data.regNo:'-'}}</td>
		    			<td @click="toShow(data)" class="active">详情</td>
		    		</tr>
	    		</tbody>
	    	</table>
	    	<el-pagination
				  background
				  layout="prev, pager, next"
				  prev-text="上一页"
				  next-text="下一页"
				  :page-size="20"
				  :total="Number(brandData.total)"
     			  @current-change="handleCurrentChangeBrand"
     			  v-if="Number(brandData.total)>20"
			>
			</el-pagination>
	    </div>
	    <!--专利信息-->
	    <div class="patentInf" id="patentInf" v-if="patentDate.total">
	    	<div class="title"><h4>专利信息</h4><div class="icon">{{patentDate.total?patentDate.total:'-'}}</div></div>
	    	<table class="patentInf-table" cellspacing="0" cellpadding="0">
	    		<tbody>
		    		<tr>
		    			<td>序号</td><td>专利类型</td><td>申请号</td><td>发布日期</td><td>摘要</td>
		    		</tr>
		    		<tr v-for="(val,i) in patentDate.items" :key="i">
		    			<td>{{i+1+patentInfNum*20}}</td><td>{{val.patentType?val.patentType:'-'}}</td><td>{{val.patentNum?val.patentNum:'-'}}</td>
		    			<td>{{val.applicationPublishTime?val.applicationPublishTime:'-'}}</td><td class="active"><p>{{val.abstracts?val.abstracts:'-'}}</p></td>
		    		</tr>
	    		</tbody>
	    	</table>
	    	<el-pagination
				  background
				  layout="prev, pager, next"
				  prev-text="上一页"
				  next-text="下一页"
				  :page-size="20"
				  :total="Number(patentDate.total)"
     			  @current-change="handleCurrentChangePatentInf"
     			  v-if="Number(patentDate.total)>20"
			>
			</el-pagination>
	    </div>
	    <!--证书信息-->
	    <div class="certificateInf" v-if="certificateInfData.total" id="certificateInf">
	    	<div class="title"><h4>证书信息</h4><div class="icon">{{certificateInfData.total?certificateInfData.total:'-'}}</div></div>
	    	<table class="certificateInf-table" cellspacing="0" cellpadding="0">
	    		<tbody>
		    		<tr>
		    			<td>序号</td><td>名称</td><td>发证日期</td><td>截止日期</td>
		    		</tr>
		    		<tr v-for="(val,i) in certificateInfData.items">
		    			<td>{{i+1+certificateInfNum*20}}</td><td class="active">{{val.certificateName?val.certificateName:'-'}}</td><td>{{val.startDate?val.startDate:'-'}}</td><td>{{val.endDate?val.endDate:'-'}}</td>
		    		</tr>
	    		</tbody>
	    	</table>
	    	<el-pagination
				  background
				  layout="prev, pager, next"
				  prev-text="上一页"
				  next-text="下一页"
				  :page-size="20"
				  :total="Number(certificateInfData.total)"
     			  @current-change="handleCurrentChangeCertificateInf"
     			  v-if="Number(certificateInfData.total)>20"
			>
			</el-pagination>
	    </div>
	    <!--著作权信息-->
	    <div class="copyrightInf" v-if="copyrightDate.total" id="copyrightInf">
	    	<div class="title"><h4>著作权信息</h4><div class="icon">{{copyrightDate.total?copyrightDate.total:'-'}}</div></div>
	    	<table class="copyrightInf-table" cellspacing="0" cellpadding="0">
	    		<tbody>
		    		<tr>
		    			<td>序号</td><td>名称</td><td>登记号</td><td>登记类别</td><td>登记时间</td>
		    		</tr>
		    		<tr v-for="(val,i) in copyrightDate.items">
		    			<td>{{i+1+copyrightInfNum*20}}</td><td>{{val.fullname?val.fullname:'-'}}</td><td>{{val.regnum?val.regnum:'-'}}</td><td>-</td>
		    			<td>{{val.regtime?val.regtime:'-'}}</td>
		    		</tr>
	    		</tbody>
	    	</table>
	    	<el-pagination
				  background
				  layout="prev, pager, next"
				  prev-text="上一页"
				  next-text="下一页"
				  :page-size="20"
				  :total="Number(copyrightDate.total)"
     			  @current-change="handleCurrentChangeCopyrightInf"
     			  v-if="Number(copyrightDate.total)>20"
			>
			</el-pagination>
	    </div>
	    <!--软件著作权信息-->
	    <!--<div class="sfCopyrightInf">
	    	<div class="title"><h4>软件著作权信息</h4><div class="icon">21</div></div>
	    	<table class="sfCopyrightInf-table" cellspacing="0" cellpadding="0">
	    		<tbody>
	    		<tr>
	    			<td>序号</td><td>名称</td><td>版本号</td><td>登记号</td><td>分类号</td><td>登记时间</td>
	    		</tr>
	    		<tr v-for="(v,i) in 4">
	    			<td>{{i}}</td><td>2016-07-28 09:00:00</td><td>V1.2</td><td>Data案件名称案件名称案件名称案件名称</td>
	    			<td>2016-07-28</td><td>2016-07-28</td>
	    		</tr>
	    		</tbody>
	    	</table>
	    </div>-->
	    <!--网站信息-->
	    <!--<div class="websiteInf">
	    	<div class="title"><h4>网站信息</h4><div class="icon">21</div></div>
	    	<table class="websiteInf-table" cellspacing="0" cellpadding="0">
	    		<tbody>
	    		<tr>
	    			<td>序号</td><td>网址</td><td>域名</td><td>网站备案/许可证号</td><td>登记时间</td>
	    		</tr>
	    		<tr v-for="(v,i) in 4">
	    			<td>{{i}}</td><td class="active">2016-07-28 09:00:00</td><td>V1.2</td>
	    			<td>2016-07-28</td><td>2016-07-28</td>
	    		</tr>
	    		</tbody>
	    	</table>
	    </div>-->
	    <detailEmpty v-if="!brandData.total&&!patentDate.total&&!certificateInfData.total&&!copyrightDate.total"></detailEmpty>
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
				brandPageSize:20,
				patentInfNum:0,//专利序号
				certificateInfNum:0,//证书序号
				copyrightInfNum:0,//著作权序号
				brandData:'', //商标
				patentDate:'', //专利
				copyrightDate:'', //著作权
				certificateInfData:'', //证书
			}
		},
		components:{
			detailEmpty
		},
		computed:{
			...mapGetters({
				'initBrandGet':'businessQuery/businessQuery/initBrandGet',
				'patentDateGet':'businessQuery/businessQuery/patentDateGet',
				'copyrightGet':'businessQuery/businessQuery/copyrightGet',
				'certificateInfGet':'businessQuery/businessQuery/certificateInfGet'
			})
		},
		mounted(){
			let args = "name="+this.$route.query.searchName;
			//商标详情
			var data = {
				num:'1',
				method:'get',
				params:{
				"params":{
					api:'34',
						args:encodeURI(args) 
					} 
				}
			}  
			//专利详情
			var data2 = {
				num:'2',
				method:'get',
				params:{
				"params":{
					api:'35',
						args:encodeURI(args) 
					} 
				}
			}  
			
			//著作权详情
			var data3 = {
				num:'3',
				method:'get',
				params:{
				"params":{
					api:'36',
						args:encodeURI(args) 
					} 
				}
			}
			//证书详情
			var data4 = {
				num:'4',
				method:'get',
				params:{
				"params":{
					api:'58',
						args:encodeURI(args) 
					} 
				}
			}
			
			// 一次性并发多个请求
			axios.all([this.REQUESTDATA_KNOWLEAGE(data),this.REQUESTDATA_KNOWLEAGE(data2),this.REQUESTDATA_KNOWLEAGE(data3),this.REQUESTDATA_KNOWLEAGE(data4)])
			.then(axios.spread((acct,perms)=>{
				this.certificateInfData = this.certificateInfGet.certificateInfData
				this.brandData = this.initBrandGet.brandData
				this.patentDate = this.patentDateGet.patentDate
				this.copyrightDate = this.copyrightGet.copyrightDate
				//console.log(this.brandData,"alhsckaijhsclkaisjnhcklsanckljsanbck")
			    //商标详情
			    // if (this.brandData.total) {
			    // 	this.brandData.items.forEach((val)=>{
				// 		val.appDate = tool.formatDate(val.appDate,"yyyy-MM-dd");
				// 	})
			    // }else{
			    // 	this.brandData.total = 0;
			    // }
			    
			    //专利详情
			    // if(!this.patentDate.total){
			    // 	this.patentDate.total = 0;
			    // }
			    
				//著作权详情
				// if(this.copyrightDate.total){
				// 	this.copyrightDate.items.forEach((val)=>{
				// 		val.regtime = tool.formatDate(val.regtime,"yyyy-MM-dd");
				// 	})
				// }else{
			    // 	this.copyrightDate.total = 0;
			    // }
				
				//证书详情
				// if (!this.certificateInfData.total) {
				// 	this.certificateInfData.total = 0;
				// }
				
				//基本信息总条数
				var total = Number(this.brandData.total)+Number(this.patentDate.total)+Number(this.copyrightDate.total)+Number(this.certificateInfData.total);
				this.getKnowTotal(total);
			}))
		},
		methods:{
			...mapActions({
				'REQUESTDATA_KNOWLEAGE':'businessQuery/businessQuery/REQUESTDATA_KNOWLEAGE'
			}),
			handleCurrentChangeBrand(val){//商标
				//锚点跳转
				location.href="#brandInf";
				
				let args = "name="+this.$route.query.searchName+"&pageNum="+val;
				//商标详情
				var data = {
					num:'1',
					method:'get',
					params:{
					"params":{
						api:'34',
							args:encodeURI(args) 
						} 
					}
				}    
				this.REQUESTDATA_KNOWLEAGE(data)
				.then((res)=>{
					this.brandData.items.forEach((val)=>{
						val.appDate = tool.formatDate(val.appDate,"yyyy-MM-dd");
					})
					this.brandData = this.initBrandGet.brandData
				})
			},
			handleCurrentChangePatentInf(val){//专利
				location.href="#patentInf";
				
				this.patentInfNum = val-1;
				let args = "name="+this.$route.query.searchName+"&pageNum="+val;
				//专利详情
				var data2 = {
					num:'2',
					method:'get',
					params:{
					"params":{
						api:'35',
							args:encodeURI(args) 
						} 
					}
				}   
				this.REQUESTDATA_KNOWLEAGE(data2).then(res=>{
					this.patentDate = this.patentDateGet.patentDate
				})
			},
			handleCurrentChangeCertificateInf(val){//证书详情
				location.href="#certificateInf";
				
				this.certificateInfNum = val-1;
				let args = "name="+this.$route.query.searchName+"&pageNum="+val;
				//证书详情
				var data4 = {
					num:'4',
					method:'get',
					params:{
					"params":{
						api:'58',
							args:encodeURI(args) 
						} 
					}
				}   
				this.REQUESTDATA_KNOWLEAGE(data4).then(res=>{
					this.certificateInfData = this.certificateInfGet.certificateInfData
				})
			},
			handleCurrentChangeCopyrightInf(val){//著作权详情
				location.href = "#copyrightInf";
				
				this.copyrightInfNum = val-1;
				let args = "name="+this.$route.query.searchName+"&pageNum="+val;
				//著作权详情
				var data3 = {
					num:'3',
					method:'get',
					params:{
					"params":{
						api:'36',
							args:encodeURI(args) 
						} 
					}
				}   
				this.REQUESTDATA_KNOWLEAGE(data3)
				.then((res)=>{
					this.copyrightDate.items.forEach((val)=>{
						val.regtime = tool.formatDate(val.regtime,"yyyy-MM-dd");
					})
					this.copyrightDate = this.copyrightGet.copyrightDate
				})
			},
			//传值给父组件
			getKnowTotal(val){
				this.$emit("getKnowTotal",val)
			},
	        //查看商标详情
	        toShow(data){
	        	//商标名字
	        	var name = data.tmName?data.tmName:'-';
	        	//注册号
	        	var regNo = data.regNo?data.regNo:'-';
	        	//商标状态
	        	var category = data.category?data.category:'-';
	        	//商标分类
	        	var intCls = data.intCls?data.intCls:'-';
	        	//申请日期
	        	var appDate = data.appDate?data.appDate:'-';
	        	//调用element组件的message
	        	this.$alert(
	        		"<div class='brandImg'><img src='"+data.tmPic+"'/></div>"+
					'<table class="brandInfDetail-table" cellspacing="0" cellpadding="0">'+
						'<tbody><tr><td>商标名称</td><td>'+name+'</td></tr>'+
						'<tr><td>注册号</td><td>'+regNo+'</td></tr>'+
						'<tr><td>商标状态</td><td>'+category+'</td></tr>'+
						'<tr><td>商标分类</td><td>'+intCls+'</td></tr>'+
						'<tr><td>申请日期</td><td>'+appDate+'</td></tr></tbody>'+
					'</table>'+
					'<table class="brandInfDetail-table2" cellspacing="0" cellpadding="0">'+
						'<tbody><tr><td>商品服务列表</td><td>-</td></tr>'+
						'<tr><td>商标流程</td><td>-</td></tr>'+
						'<tr><td>使用期限</td><td>-</td></tr>'+
						'<tr><td class="last">代理机构</td><td class="last">-</td></tr></tbody>'+
					'</table>',
					'商标详情', {
		          	dangerouslyUseHTMLString: true,
		          	showConfirmButton:false,
		        });
	        }
		},
	}
</script>

<style lang="less" scoped>
	@import "~assets/common/index.less";
	@import "../../../pages/business/knowledgeRight.less";
</style>