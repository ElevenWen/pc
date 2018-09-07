<template>
	<div id="elementCustom" class="operation">

		<ul class="operation-wrap-list">
	    	<li><a href="#abnormalOperation">经营异常&nbsp;{{abnormalOperationData.total}}</a></li>
	    	<!--<li>股权出质&nbsp;3</li>-->
	    	<!--<li>行政处罚&nbsp;3</li>-->
	    	<!--<li>行政许可&nbsp;3</li>-->
	    	<!--<li>抽查检查&nbsp;3</li>-->
	    	<!--<li>税务信息&nbsp;3</li>-->
	    	<li><a href="#proInf">产品信息&nbsp;{{proInfData.total}}</a></li>
	    	<!--<li>融资信息&nbsp;3</li>-->
	    	<!--<li>动产信息&nbsp;3</li>-->
	    	<!--<li>清算信息&nbsp;3</li>-->
	    	<!--<li>招投标信息&nbsp;3</li>-->
	    	<!--<li>公司员工&nbsp;3</li>-->
	    	<li><a href="#recruit">招聘&nbsp;{{recruitData.total}}</a></li>
	    	<!--<li>财务总览&nbsp;3</li>-->
	    	<!--<li>司法拍卖&nbsp;3</li>-->
	    	<li><a href="#creditInf">进出口信用信息&nbsp;</a></li>
	    </ul>
	    <!--经营异常-->
	    <div class="abnormalOperation" v-if="abnormalOperationData.total" id="abnormalOperation">
	    	<div class="title"><h4>经营异常</h4><div class="icon">{{abnormalOperationData.total?abnormalOperationData.total:'-'}}</div></div>
	    	<ul class="abnormalOperation-list" v-for="(item,index) in abnormalOperationData.items" :key="index">
	    		<li><div>列入日期：<span>{{item.putDate?item.putDate:'-'}}</span></div><div>移出日期：<span>{{item.removeDate?item.removeDate:'-'}}</span></div></li>
	    		<li><div>作出决定机关：<span>{{item.putDepartment?item.putDepartment:'-'}}</span></div><div>移出决定机关：<span>{{item.removeDepartment?item.removeDepartment:'-'}}</span></div></li>
	    		<li>列入经营异常名录原因：<span>{{item.putReason?item.putReason:'-'}}</span></li>
	    		<li>移出经营异常名录原因：<span>{{item.removeReason?item.removeReason:'-'}}</span></li>
	    	</ul>
	    	<el-pagination
				  background
				  layout="prev, pager, next"
				  prev-text="上一页"
				  next-text="下一页"
				  :page-size="20"
				  :total="abnormalOperationData.total"
     			  @current-change="handleCurrentChangeSessionAbnormalOperation"
     			  v-if="abnormalOperationData.total>20"
			>
			</el-pagination>
	    </div>
	    <!--股权出质-->
	    <!--<div class="equityPledged">
	    	<div class="title"><h4>股权出质</h4><div class="icon">{{equityPledgedData.total}}</div></div>
	    	<table class="equityPledged-table" cellspacing="0" cellpadding="0">
	    		<tbody>
	    		<tr>
	    			<td>序号</td><td>出质股权数额</td><td>登记编号</td><td>出质人</td><td>质权人</td><td>登记日期</td><td>状态</td>
	    		</tr>
	    		<tr v-for="(val,i) in equityPledgedData.items">
	    			<td>{{i+1}}</td><td>{{val.equityAmount}}</td><td>{{val.regNumber}}</td><td>{{val.pledgor}}</td>
	    			<td class="active">{{val.pledgee}}</td><td>{{val.regDate}}</td><td>{{val.state}}</td>
	    		</tr>
	    		</tbody>
	    	</table>
	    </div>-->
	    <!--行政处罚-->
	    <!--<div class="administrative">
	    	<div class="title"><h4>行政处罚【工商局】</h4><div class="icon">2123</div></div>
	    	<table class="administrative-table" cellspacing="0" cellpadding="0">
	    		<tbody>
	    		<tr>
	    			<td>序号</td><td>文号</td><td>类型</td><td>处罚内容</td><td>决定机关</td><td>登记日期</td>
	    		</tr>
	    		<tr v-for="(v,i) in 4">
	    			<td>{{i}}</td><td>2016-07-28</td><td>深圳市腾讯计算机系统有限公司被告深圳市腾讯计算机系统有限公司深圳市腾讯计算机系统有限公司被告深圳市腾讯计算机系统有限公司</td><td>-</td>
	    			<td>海定分局</td>
	    			<td>2016-07-28</td>
	    		</tr>
	    		</tbody>
	    	</table>
	    </div>-->
	    <!--行政许可-->
	    <!--<div class="administrativeLicensing">
	    	<div class="title"><h4>行政许可</h4><div class="icon">21</div></div>
	    	<table class="administrativeLicensing-table" cellspacing="0" cellpadding="0">
	    		<tbody>
	    		<tr>
	    			<td>序号</td><td>项目名称</td><td>地域</td><td>决定日期</td><td>详情</td>
	    		</tr>
	    		<tr v-for="(v,i) in 4">
	    			<td>{{i}}</td><td>软件企业认定证书</td><td>总局</td><td>2016-07-28</td>
	    			<td @click="toShow" class="active">详情</td>
	    		</tr>
	    		</tbody>
	    	</table>
	    </div>-->
	    <!--抽查检查-->
	    <!--<div class="examination">
	    	<div class="title"><h4>抽查检查</h4><div class="icon">21</div></div>
	    	<table class="examination-table" cellspacing="0" cellpadding="0">
	    		<tbody>
	    		<tr>
	    			<td>序号</td><td>检查实施机关</td><td>类型</td><td>日期</td><td>结果</td>
	    		</tr>
	    		<tr v-for="(v,i) in 2">
	    			<td>{{i}}</td><td>-</td><td>总局</td><td>2016-07-28</td><td>正常</td>
	    		</tr>
	    		</tbody>
	    	</table>
	    </div>-->
	    <!--税务信息-->
	    <!--<div class="taxInf">
	    	<div class="title"><h4>税务信息</h4><div class="icon">21</div></div>
	    	<table class="taxInf-table" cellspacing="0" cellpadding="0">
	    		<tbody>
	    		<tr>
	    			<td>序号</td><td>评价年度</td><td>纳税人识别号</td><td>纳税信用等级</td><td>评价单位</td><td>是否正常纳税</td><td>是否欠税</td><td>欠税余额</td>
	    		</tr>
	    		<tr v-for="(v,i) in 2">
	    			<td>{{i}}</td><td>2014</td><td>654654651</td><td>A</td><td>国家税务中举</td><td>-</td><td>-</td><td>-</td>
	    		</tr>
	    		</tbody>
	    	</table>
	    </div>-->
	    <!--产品信息-->
	    <div class="proInf" id="proInf" v-if="proInfData.total">
	    	<div class="title"><h4>产品信息</h4><div class="icon">{{proInfData.total}}</div></div>
	    	<table class="proInf-table" cellspacing="0" cellpadding="0">
	    		<tbody>
		    		<tr>
		    			<td>名称</td><td>网址</td><td>领域</td><td>分类</td><td>描述</td>
		    		</tr>
		    		<tr v-for="val in proInfData.items">
		    			<td>{{val.filterName}}</td><td>-</td><td>{{val.classes?val.classes:'-'}}</td><td>{{val.type?val.type:'-'}}</td><td><p>{{val.brief?val.brief:'-'}}</p></td>
		    		</tr>
	    		</tbody>
	    	</table>
	    	<el-pagination
				  background
				  layout="prev, pager, next"
				  prev-text="上一页"
				  next-text="下一页"
				  :page-size="20"
				  :total="proInfData.total"
     			  @current-change="handleCurrentChangeProInf"
     			  v-if="proInfData.total>20"
			>
			</el-pagination>
	    </div>
	    <!--融资信息-->
	    <!--<div class="financingInf">
	    	<div class="title"><h4>融资信息</h4><div class="icon">21</div></div>
	    	<table class="financingInf-table" cellspacing="0" cellpadding="0">
	    		<tbody>
	    		<tr>
	    			<td>日期</td><td>级别</td><td>金额</td><td>投资方</td>
	    		</tr>
	    		<tr v-for="item in 2">
	    			<td>小米手机</td><td>F轮</td><td>shenghuofuw</td><td>顺为资金<br/>dtt</td>
	    		</tr>
	    		</tbody>
	    	</table>
	    </div>-->
	    <!--动产抵押-->
	    <!--<div class="chattelMortgage">
	    	<div class="title"><h4>动产抵押</h4><div class="icon">21</div></div>
	    	<table class="chattelMortgage-table" cellspacing="0" cellpadding="0">
	    		<tbody>
	    		<tr>
	    			<td>序号</td><td>登记编号</td><td>登记机关</td><td>被担保债权数额</td><td>登记时间</td><td>状态</td>
	    		</tr>
	    		<tr v-for="(item,i) in 2">
	    			<td>{{i}}</td><td>F轮</td><td>shenghuofuw</td><td>shenghuofuw</td><td>顺为资金<br/>2013-15-15</td><td>有效</td>
	    		</tr>
	    		</tbody>
	    	</table>
	    </div>-->
	    <!--清算信息-->
	    <!--<div class="clearInf">
	    	<div class="title"><h4>清算信息</h4><div class="icon">21</div></div>
	    	<ul class="clearInf-list">
	    		<li>清算组负责人：<span>huangxueju</span></li>
	    		<li>清算组成员：<span>huangxueju，黄血管</span></li>
	    	</ul>
	    </div>-->
	    <!--招投标信息-->
	    <!--<div class="biddingInf">
	    	<div class="title"><h4>招投标信息</h4><div class="icon">21</div></div>
	    	<table class="biddingInf-table" cellspacing="0" cellpadding="0">
	    		<tbody>
	    		<tr>
	    			<td>序号</td><td>项目分类</td><td>所属地区</td><td>发布时间</td><td>描述</td>
	    		</tr>
	    		<tr v-for="(item,i) in 2">
	    			<td>{{i}}</td><td>F轮</td><td>shenghuofuw</td><td>2013-15-15</td><td>爱说话撒翻江倒海撒娇的哈桑净化大师考虑好大叔大婶打卡机啥</td>
	    		</tr>
	    		</tbody>
	    	</table>
	    </div>-->
	    <!--招聘-->
	    <div class="recruit" v-if="recruitData.total" id="recruit">
	    	<div class="title"><h4>招聘</h4><div class="icon">{{recruitData.total?recruitData.total:'-'}}</div></div>
	    	<table class="recruit-table" cellspacing="0" cellpadding="0">
	    		<tbody>
		    		<tr>
		    			<td>发布时间</td><td>招聘职位</td><td>月薪</td><td>所在城市</td><td>来源</td>
		    		</tr>
		    		<tr v-for="(val,i) in recruitData.items" :key="i">
		    			<td>{{val.startdate?val.startdate:'-'}}</td><td>{{val.title?val.title:'-'}}</td><td>{{val.oriSalary?val.oriSalary:'-'}}</td><td>{{val.city?val.city:'-'}}</td><td>{{val.source?val.source:'-'}}</td>
		    		</tr>
	    		</tbody>
	    	</table>
	    	<el-pagination
				  background
				  layout="prev, pager, next"
				  prev-text="上一页"
				  next-text="下一页"
				  :page-size="20"
				  :total="recruitData.total"
     			  @current-change="handleCurrentChangeRecruit"
     			  v-if="recruitData.total>20"
			>
			</el-pagination>
	    </div>
	    <!--财务总览-->
	    <!--<div class="financialOverview">
	    	<div class="title"><h4>财务总览</h4><div class="icon">21</div></div>
	    	<table class="financialOverview-table" cellspacing="0" cellpadding="0">
	    		<tbody>
	    		<tr>
	    			<td>公司实力等级</td><td>100亿以上</td><td>纳税区间</td><td>1亿以上</td>
	    		</tr>
	    		<tr>
	    			<td>销售净利润率</td><td>10%到10%</td><td>销售毛利率</td><td>10%到10%</td>
	    		</tr>
	    		</tbody>
	    	</table>
	    </div>-->
	    <!--司法拍卖-->
	    <!--<div class="judicialSale">
	    	<div class="title"><h4>司法拍卖</h4><div class="icon">21</div></div>
	    	<table class="judicialSale-table" cellspacing="0" cellpadding="0">
	    		<tbody>
	    		<tr>
	    			<td>序号</td><td>标题</td><td>拍卖时间</td><td>委托法院</td><td>查看详情</td>
	    		</tr>
	    		<tr v-for="(item,i) in 2">
	    			<td>{{i}}</td><td>销售毛利率销售毛利率销售毛利率销售毛利率销售毛利率</td><td>2017年5月5日起至2017年5月5日止</td><td>少女杀手法院</td><td @click="toShowJudicialSale" class="active">详情</td>
	    		</tr>
	    		</tbody>
	    	</table>
	    </div>-->
	    <!--进出口信用信息-->
	    <div class="creditInf" v-if="creditInfData.baseInfo" id="creditInf">
	    	<div class="title"><h4>进出口信用信息</h4></div>
	    	<table class="creditInf-table" cellspacing="0" cellpadding="0">
	    		<tbody>
		    		<tr>
		    			<td>序号</td><td>注册海关</td><td>经营类别</td><td>注册日期</td><td>查看详情</td>
		    		</tr>
		    		<tr>
		    			<td>1</td><td>{{creditInfData.baseInfo.customsRegisteredAddress?creditInfData.baseInfo.customsRegisteredAddress:'-'}}</td><td>{{creditInfData.baseInfo.managementCategory?creditInfData.baseInfo.managementCategory:'-'}}</td>
		    			<td>{{creditInfData.baseInfo.recordDate?creditInfData.baseInfo.recordDate:'-'}}</td><td @click="toShow" class="active">详情</td>
		    		</tr>
	    		</tbody>
	    	</table>
	    </div>
	    <!--模态框-->
	    <div class="message" v-if="isShow">
			<div class="messageWrap">
				<div class="messageWrap_top">
					<div>海关进出口信用信息详情</div>
					<span @click="close"></span>
				</div>
				<table class="creditInfDetail-table" cellspacing="0" cellpadding="0">
					<tbody>
						<tr><td>公司</td><td colspan="3">审计那就公司</td></tr>
						<tr><td>海关注册编码</td><td>{{creditInfData.baseInfo.crCode?creditInfData.baseInfo.crCode:'-'}}</td><td>注册海关</td><td>{{creditInfData.baseInfo.customsRegisteredAddress?creditInfData.baseInfo.customsRegisteredAddress:'-'}}</td></tr>
						<tr><td>行政地区</td><td>{{creditInfData.baseInfo.administrativeDivision?creditInfData.baseInfo.administrativeDivision:'-'}}</td><td>经济地区</td><td>{{creditInfData.baseInfo.economicDivision?creditInfData.baseInfo.economicDivision:'-'}}</td></tr>
						<tr><td>经营类别</td><td>{{creditInfData.baseInfo.managementCategory?creditInfData.baseInfo.managementCategory:'-'}}</td><td>特殊贸易区域</td><td>{{creditInfData.baseInfo.specialTradeArea?creditInfData.baseInfo.specialTradeArea:'-'}}</td></tr>
						<tr><td>海关注销标志</td><td>{{creditInfData.baseInfo.status?creditInfData.baseInfo.status:'-'}}</td><td>年报情况</td><td>{{creditInfData.baseInfo.annualReport?creditInfData.baseInfo.annualReport:'-'}}</td></tr>
						<tr><td>注册日期</td><td>{{creditInfData.baseInfo.recordDate?creditInfData.baseInfo.recordDate:'-'}}</td><td>报关有效期</td><td>{{creditInfData.baseInfo.validityDate?creditInfData.baseInfo.validityDate:'-'}}</td></tr>
						<tr><td>行业种类</td><td>{{creditInfData.baseInfo.industryCategory?creditInfData.baseInfo.industryCategory:'-'}}</td><td>电子商务类型</td><td>{{creditInfData.baseInfo.types?creditInfData.baseInfo.types:'-'}}</td></tr>
						<tr><td>信用等级</td><td colspan="3"><span v-for="(data,index) in creditInfData.creditRating" :key="index">{{data.creditRating?data.creditRating:'-'}}</span></td></tr>
						<tr><td>认定时间</td><td><span v-for="(data,index) in creditInfData.creditRating" :key="index">{{data.identificationTime?data.identificationTime:'-'}}</span></td><td>认证证书编码</td><td><span v-for="(data,index) in creditInfData.creditRating" :key="index">{{data.authenticationCode?data.authenticationCode:'-'}}</span></td></tr>
						<tr><td>海关行政处罚编号</td><td colspan="3"><span v-for="(data,index) in creditInfData.sanction" :key="index">{{data.decisionNumber?data.decisionNumber:'-'}}</span></td></tr>
					</tbody>
				</table>
			</div>
		</div>
		<detailEmpty v-if="!abnormalOperationData.total&&!proInfData.total&&!recruitData.total&&!creditInfData.baseInfo"></detailEmpty>
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
				isShow:false,//模态框显示
				creditData:{},//进出口信用数据
				abnormalOperationData:'', //经营异常
				recruitData:'', //招聘
				creditInfData:'', //进出口信用
				proInfData:'',    //产品信息
			}
		},
		components:{
			detailEmpty
		},
		computed:{
		    // ...mapState(
		    //     "businessQuery",{
		    //         'abnormalOperationData':'abnormalOperationData',
		    //         'recruitData':'recruitData',
		    //         'creditInfData':'creditInfData',
		    //         'proInfData':'proInfData',
		    //     },
			// ),
			...mapGetters({
				'operationGet':'businessQuery/businessQuery/operationGet',
			})
		},
		mounted(){
			let args = "name="+this.$route.query.searchName;
			//经营异常详情
			var data = {
				num:'10',
				method:'get',
				params:{
				"params":{
					api:'20',
						args:encodeURI(args) 
					} 
				}
			}  
			//招聘
			var data2 = {
				num:'11',
				method:'get',
				params:{
				"params":{
					api:'29',
						args:encodeURI(args) 
					} 
				}
			}  
			//进出口信用
			var data3 = {
				num:'12',
				method:'get',
				params:{
				"params":{
					api:'55',
						args:encodeURI(args) 
					} 
				}
			}
			//产品信息
			var data4 = {
				num:'13',
				method:'get',
				params:{
				"params":{
					api:'32',
						args:encodeURI(args) 
					} 
				}
			} 
			// 一次性并发多个请求
			axios.all([this.REQUESTDATA_KNOWLEAGE(data),this.REQUESTDATA_KNOWLEAGE(data2),this.REQUESTDATA_KNOWLEAGE(data3),this.REQUESTDATA_KNOWLEAGE(data4)])
			.then(axios.spread((acct,perms)=>{
				this.abnormalOperationData = this.operationGet.abnormalOperationData
				this.recruitData = this.operationGet.recruitData
				this.creditInfData = this.operationGet.creditInfData
				this.proInfData = this.operationGet.proInfData
			    //招聘
			    // if (this.recruitData.total) {
			    // 	this.recruitData.items.forEach((val)=>{
				// 		val.startdate = tool.formatDate(val.startdate,"yyyy-MM-dd");
				// 	})
			    // }else{
			    // 	this.recruitData.total = 0;
			    // }
			    //经营异常
			    // if (!this.abnormalOperationData.total) {
			    // 	this.abnormalOperationData.total = 0;
			    // }
			    //产品信息
			    // if(!this.proInfData.total){
			    // 	this.proInfData.total = 0;
			    // }else{
			    // 	this.proInfData.items.forEach((val)=>{
			    // 		val.brief = val.brief.replace(/\<br\/\>/g,"  ");
			    // 	})
			    // }
			    
				//进出口
				// if (this.creditInfData.baseInfo) {
				// 	this.creditData = this.creditInfData.baseInfo;
				// }
				
				//基本信息总条数
				var total = this.abnormalOperationData.total+this.recruitData.total+this.proInfData.total;
				this.getOperationTotal(total);
			}))
		},
		methods:{
			...mapActions({
				'REQUESTDATA_KNOWLEAGE':'businessQuery/businessQuery/REQUESTDATA_KNOWLEAGE'
			}),
	        //关闭模态框
			close(){
				this.isShow = false;
				$("body").css({"overflow":"auto"});
			},
	        //查看进出口信用信息详情
	        toShow(){
	        	this.isShow = true;
	        	$("body").css({"overflow":"hidden"});
	        },
	        //传值给父组件
			getOperationTotal(val){
				this.$emit("getOperationTotal",val)
			},
			handleCurrentChangeSessionAbnormalOperation(val){//经营异常详情
				//锚点跳转
				location.href = "#abnormalOperation";
				
				let args = "name="+this.$route.query.searchName+"&pageNum="+val;
				//经营异常详情
				var data = {
					num:'10',
					method:'get',
					params:{
					"params":{
						api:'20',
							args:encodeURI(args) 
						} 
					}
				}    
				this.REQUESTDATA_KNOWLEAGE(data).then(res=>{
					this.abnormalOperationData = this.operationGet.abnormalOperationData
					this.recruitData = this.operationGet.recruitData
					this.creditInfData = this.operationGet.creditInfData
					this.proInfData = this.operationGet.proInfData
				})
			},
			handleCurrentChangeProInf(val){//产品信息
				location.href = "#proInf";
				
				let args = "name="+this.$route.query.searchName+"&pageNum="+val;
				//产品信息
				var data4 = {
					num:'13',
					method:'get',
					params:{
					"params":{
						api:'32',
							args:encodeURI(args) 
						} 
					}
				}    
				this.REQUESTDATA_KNOWLEAGE(data4)
				.then((res)=>{
					this.abnormalOperationData = this.operationGet.abnormalOperationData
					this.recruitData = this.operationGet.recruitData
					this.creditInfData = this.operationGet.creditInfData
					this.proInfData = this.operationGet.proInfData
					this.proInfData.items.forEach((val)=>{
			    		val.brief = val.brief.replace(/\<br\/\>/g,"  ");
			    	})
				})
			},
			handleCurrentChangeRecruit(val){//招聘
				location.href = "#recruit";
				// console.log(val,'凡是加价哦想')
				let args = "name="+this.$route.query.searchName+"&pageNum="+val;
				//招聘
				var data2 = {
					num:'11',
					method:'get',
					params:{
					"params":{
						api:'29',
							args:encodeURI(args) 
						} 
					}
				}    
				this.REQUESTDATA_KNOWLEAGE(data2)
				.then((res)=>{
					this.abnormalOperationData = this.operationGet.abnormalOperationData
					this.recruitData = this.operationGet.recruitData
					this.creditInfData = this.operationGet.creditInfData
					this.proInfData = this.operationGet.proInfData
					this.recruitData.items.forEach((val)=>{
						val.startdate = tool.formatDate(val.startdate,"yyyy-MM-dd");
					})
				})
			},
	        //查看司法详情
//	        toShowJudicialSale(){
//	        	//调用element组件的message
//	        	this.$alert(
//					'<table class="judicialSaleDetail-table" cellspacing="0" cellpadding="0">'+
//						'<tbody><tr><td>案由</td><td colspan="3">开庭日期</td></tr>'+
//						'<tr><td>案号</td><td>2016-07-28 09:00:00</td><td>开庭日期</td><td>深圳市腾</td></tr>'+
//						'<tr><td>地区</td><td>2016-07-28 09:00:00</td><td>排期日期</td><td>深圳市腾</td></tr>'+
//						'<tr><td>承办部门</td><td>2016-07-28 09:00:00</td><td>审判长/主审人</td><td>深圳市腾</td></tr>'+
//						'<tr><td>法院</td><td>2016-07-28 09:00:00</td><td>法庭</td><td>深圳市腾</td></tr>'+
//						'<tr><td>被上诉人</td><td colspan="3">2016-07-28 09:00:00</td></tr></tbody>'+
//					'</table>',
//					'司法拍卖详情', {
//		          	dangerouslyUseHTMLString: true,
//		          	showConfirmButton:false,
//		        });
//	        }
		}
	}
</script>

<style lang="less" scoped>
	@import "~assets/common/index.less";
	@import "../../../pages/business/operation.less";
</style>