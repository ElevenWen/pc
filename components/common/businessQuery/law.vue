<template>
	<div id="elementCustom" class="law">
		<ul class="content-wrap-list">
	    	<li><a href="#subjected">被执行人信息&nbsp;{{subjectedData.total}}</a></li>
	    	<!--<li>失信被执行人&nbsp;3</li>-->
	    	<li><a href="#adjudicative">裁判文书&nbsp;{{lawData.total}}</a></li>
	    	<li><a href="#courtAnnouncement">法院公告&nbsp;{{courtAnnouncementData.total}}</a></li>
	    	<li><a href="#sessionAnnouncement">开庭公告&nbsp;{{sessionAnnouncementData.total}}</a></li>
	    </ul>
	    <!--被执行人-->
	    <div class="subjected" v-if="subjectedData.total" id="subjected">
	    	<div class="title"><h4>被执行人</h4><div class="icon">{{subjectedData.total?subjectedData.total:'-'}}</div></div>
	    	<table class="subjected-table" cellspacing="0" cellpadding="0">
	    		<tbody>
		    		<tr>
		    			<td>序号</td><td>名称</td>
		    			<td>立案时间</td><td>执行法院</td>
		    			<td>执行标的</td>
		    		</tr>
		    		<tr v-for="(val,i) in subjectedData.items" :key="i">
		    			<td>{{i+1+subjectedNum*20}}</td><td>{{val.pname?val.pname:'-'}}</td>
		    			<td>{{val.caseCreateTime?val.caseCreateTime:'-'}}</td><td>{{val.execCourtName?val.execCourtName:'-'}}</td>
		    			<td>{{val.execMoney?val.execMoney:'-'}}</td>
		    		</tr>
	    		</tbody>
	    	</table>
	    	<el-pagination
				  background
				  layout="prev, pager, next"
				  prev-text="上一页"
				  next-text="下一页"
				  :page-size="20"
				  :total="subjectedData.total"
     			  @current-change="handleCurrentChangeSubjected"
     			  v-if="subjectedData.total>20"
			>
			</el-pagination>
	    </div>
	    <!--裁判文书-->
	    <div class="adjudicative" v-if="lawData.total" id="adjudicative">
	    	<div class="title"><h4>裁判文书</h4><div class="icon">{{lawData.total?lawData.total:'-'}}</div></div>
	    	<table class="adjudicative-table" cellspacing="0" cellpadding="0">
	    		<tbody>
		    		<tr>
		    			<td>序号</td><td>案件名称</td><td>发布时间</td><td>案件编号</td><td>案件身份</td><td>执行法院</td>
		    		</tr>
		    		<tr v-for="(val,i) in lawData.items">
		    			<td>{{i+1+adjudicativeNum*20}}</td><td>{{val.title?val.title:'-'}}</td><td>{{val.submittime?val.submittime:'-'}}</td><td>{{val.caseno?val.caseno:'-'}}</td>
		    			<td><div>被告&nbsp;-&nbsp;<span></span></div></td><td>{{val.court?val.court:'-'}}</td>
		    		</tr>
	    		</tbody>
	    	</table>
	    	<el-pagination
				  background
				  layout="prev, pager, next"
				  prev-text="上一页"
				  next-text="下一页"
				  :page-size="20"
				  :total="lawData.total"
     			  @current-change="handleCurrentChangeAdjudicative"
     			  v-if="lawData.total>20"
			>
			</el-pagination>
	    </div>
	    <!--法院公告-->
	    <div class="courtAnnouncement" v-if="courtAnnouncementData.total" id="courtAnnouncement">
	    	<div class="title"><h4>法院公告</h4><div class="icon">{{courtAnnouncementData.total?courtAnnouncementData.total:'-'}}</div></div>
	    	<table class="courtAnnouncement-table" cellspacing="0" cellpadding="0">
	    		<tbody>
		    		<tr>
		    			<td>序号</td><td>公示时间</td><td>分类</td><td>当事人</td><td>公告内容</td>
		    		</tr>
		    		<tr v-for="(val,i) in courtAnnouncementData.items">
		    			<td>{{i+1+courtAnnouncementNum*20}}</td><td>{{val.publishdate?val.publishdate:'-'}}</td><td>{{val.bltntypename?val.bltntypename:'-'}}</td><td>{{val.party2?val.party2:'-'}}</td>
		    			<td><p>{{val.content?val.content:'-'}}</p></td>
		    		</tr>
	    		</tbody>
	    	</table>
	    	<el-pagination
				  background
				  layout="prev, pager, next"
				  prev-text="上一页"
				  next-text="下一页"
				  :page-size="20"
				  :total="courtAnnouncementData.total"
     			  @current-change="handleCurrentChangeCourtAnnouncement"
     			  v-if="courtAnnouncementData.total>20"
			>
			</el-pagination>
	    </div>
	    <!--开庭公告-->
	    <div class="sessionAnnouncement" v-if="sessionAnnouncementData.total" id="sessionAnnouncement">
	    	<div class="title"><h4>开庭公告</h4><div class="icon">{{sessionAnnouncementData.total?sessionAnnouncementData.total:'-'}}</div></div>
	    	<table class="sessionAnnouncement-table" cellspacing="0" cellpadding="0">
	    		<tbody>
		    		<tr>
		    			<td>序号</td><td>开庭日期</td><td>案由</td><td>公诉人/原告/上诉人/申请人</td><td>被告/被告人/被上诉人/被申请人</td><td>查看详情</td>
		    		</tr>
		    		<tr v-for="(val,i) in sessionAnnouncementData.items">
		    			<td>{{i+1+sessionAnnouncementNum*10}}</td>
						<td>{{val.startDate?val.startDate:'-'}}</td><td>{{val.caseReason?val.caseReason:'-'}}</td>
						<td><span v-for="data in val.plaintiff">{{data.name?data.name:'-'}}</span></td>
		    			<td><span v-for="data in val.defendant">{{data.name?data.name:'-'}}</span></td>
		    			<td @click="toShow(val)" class="active">详情</td>
		    		</tr>
	    		</tbody>
	    	</table>
	    	<el-pagination
				  background
				  layout="prev, pager, next"
				  prev-text="上一页"
				  next-text="下一页"
				  :page-size="10"
				  :total="sessionAnnouncementData.total"
     			  @current-change="handleCurrentChangeSessionAnnouncement"
     			  v-if="sessionAnnouncementData.total>20"
			>
			</el-pagination>
	    </div>
	    <!--模态框-->
	    <div class="message" v-if="isShow">
			<div class="messageWrap">
				<div class="messageWrap_top">
					<div>开庭公告详情</div>
					<span @click="close"></span>
				</div>
				<table class="sessionAnnouncement-table" cellspacing="0" cellpadding="0">
					<tbody>
						<tr><td>案由</td><td colspan="3" style="background: white;">{{popObj.caseReason?popObj.caseReason:'-'}}</td></tr>
						<tr><td>案号</td><td>{{popObj.caseNo?popObj.caseNo:'-'}}</td><td>开庭日期</td><td>{{popObj.startDate?popObj.startDate:'-'}}</td></tr>
						<tr><td>地区</td><td>-</td><td>排期日期</td><td>-</td></tr>
						<tr><td>承办部门</td><td>{{popObj.contractors?popObj.contractors:'-'}}</td><td>审判长/主审人</td><td>{{popObj.judge?popObj.judge:'-'}}</td></tr>
						<tr><td>法院</td><td>{{popObj.court?popObj.court:'-'}}</td><td>法庭</td><td>{{popObj.courtroom?popObj.courtroom:'-'}}</td></tr>
						<tr><td>被上诉人</td><td colspan='3' class='selected'><span v-for="(data,index) in popObj.defendant" :key="index">{{data.name?data.name:'-'}}</span></td></tr>
					</tbody>
				</table>
			</div>
		</div>
		<detailEmpty v-if="!subjectedData.total&&!lawData.total&&!courtAnnouncementData.total&&!sessionAnnouncementData.total"></detailEmpty>
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
				popObj:{},//弹出框数据
				adjudicativeNum:0,//裁判文书序号
				subjectedNum:0,//被执行人序号
				courtAnnouncementNum:0,//法院公告序号
				sessionAnnouncementNum:0,//开庭公告序号
				lawData:'', //法律诉讼
				subjectedData:'',  //被执行人
				courtAnnouncementData:'',  //法院公告
				sessionAnnouncementData:''  //开庭公告
			}
		},
		components:{
			detailEmpty
		},
		computed:{
		    // ...mapState(
		    //     "businessQuery",{
		    //         'lawData':'lawData',
		    //         'subjectedData':'subjectedData',
		    //         'courtAnnouncementData':'courtAnnouncementData',
		    //         'sessionAnnouncementData':'sessionAnnouncementData'
		    //     },
			// ),
			...mapGetters({
				'lawGet':'businessQuery/businessQuery/lawGet'
			})
		},
		mounted(){
			let args = "name="+this.$route.query.searchName;
			//法律诉讼详情
			var data = {
				num:'6',
				method:'get',
				params:{
				"params":{
					api:'16',
						args:encodeURI(args) 
					} 
				}
			}  
			//被执行人详情
			var data2 = {
				num:'7',
				method:'get',
				params:{
				"params":{
					api:'19',
						args:encodeURI(args) 
					} 
				}
			}  
			//法院公告详情
			var data3 = {
				num:'8',
				method:'get',
				params:{
				"params":{
					api:'17',
						args:encodeURI(args) 
					} 
				}
			}  
			//开庭公告详情
			var data4 = {
				num:'9',
				method:'get',
				params:{
				"params":{
					api:'57',
						args:encodeURI(args) 
					} 
				}
			}  
			// 一次性并发多个请求
			axios.all([this.REQUESTDATA_KNOWLEAGE(data),this.REQUESTDATA_KNOWLEAGE(data2),this.REQUESTDATA_KNOWLEAGE(data3),this.REQUESTDATA_KNOWLEAGE(data4)])
			.then(axios.spread((acct,perms)=>{
				this.lawData = this.lawGet.lawData
				this.subjectedData = this.lawGet.subjectedData
				this.courtAnnouncementData = this.lawGet.courtAnnouncementData
				this.sessionAnnouncementData = this.lawGet.sessionAnnouncementData
			    //法律诉讼详情
			    // if (this.lawData.total) {
			    // 	this.lawData.items.forEach((val)=>{
				// 		val.submittime = tool.formatDate(val.submittime,"yyyy-MM-dd");
				// 	})
			    // }else{
			    // 	this.lawData.total = 0;
			    // }
			    
			    //被执行人
			    // if(this.subjectedData.total){
			    // 	this.subjectedData.items.forEach((val)=>{
				// 		val.caseCreateTime = tool.formatDate(val.caseCreateTime,"yyyy-MM-dd");
				// 	})
			    // }else{
			    // 	this.subjectedData.total = 0;
			    // }
				//法院公告
				// if(!this.courtAnnouncementData.total){
				// 	this.courtAnnouncementData.total = 0;
				// }
				
				//开庭公告详情
				// if (this.sessionAnnouncementData.total) {
				// 	this.sessionAnnouncementData.items.forEach((val)=>{
				// 		val.startDate = tool.formatDate(val.startDate,"yyyy-MM-dd hh:mm:ss");
				// 	})
				// }else{
				// 	this.sessionAnnouncementData.total = 0;
				// }
				
				//基本信息总条数
				var total = this.subjectedData.total+this.lawData.total+this.courtAnnouncementData.total+this.sessionAnnouncementData.total;
				this.getLawTotal(total);
			}))
		},
		methods:{
			...mapActions({
				'REQUESTDATA_KNOWLEAGE':'businessQuery/businessQuery/REQUESTDATA_KNOWLEAGE'
			}),
			handleCurrentChangeAdjudicative(val){//法律诉讼详情
				//锚点跳转
				location.href = "#adjudicative";
				
				this.adjudicativeNum = val-1;
				let args = "name="+this.$route.query.searchName+"&pageNum="+val;
				//法律诉讼详情
				var data = {
					num:'6',
					method:'get',
					params:{
					"params":{
						api:'16',
							args:encodeURI(args) 
						} 
					}
				} 
				this.REQUESTDATA_KNOWLEAGE(data)
				.then((res)=>{
					this.lawData.items.forEach((val)=>{
						val.submittime = tool.formatDate(val.submittime,"yyyy-MM-dd");
					})
					this.lawData = this.lawGet.lawData
				})
			},
			//关闭模态框
			close(){
				this.isShow = false;
				$("body").css({"overflow":"auto"});
			},
	        //查看开庭公告详情
	        toShow(data){
	        	this.isShow = true;
	        	this.popObj = data;
			    $("body").css({"overflow":"hidden"});
	        },
	        //传值给父组件
			getLawTotal(val){
				this.$emit("getLawTotal",val)
			},
			handleCurrentChangeSubjected(val){//被执行人
				location.href = "#subjected";
				
				this.subjectedNum = val-1;
				let args = "name="+this.$route.query.searchName+"&pageNum="+val;
				//被执行人详情
				var data2 = {
					num:'7',
					method:'get',
					params:{
					"params":{
						api:'19',
							args:encodeURI(args) 
						} 
					}
				}
				this.REQUESTDATA_KNOWLEAGE(data2)
				.then((res)=>{
					this.subjectedData.items.forEach((val)=>{
						val.caseCreateTime = tool.formatDate(val.caseCreateTime,"yyyy-MM-dd");
					})
					this.subjectedData = this.lawGet.subjectedData
				})
			},
			handleCurrentChangeCourtAnnouncement(val){//法院公告详情
				location.href = "#courtAnnouncement";
				
				this.courtAnnouncementNum = val-1;
				let args = "name="+this.$route.query.searchName+"&pageNum="+val;
				//法院公告详情
				var data3 = {
					num:'8',
					method:'get',
					params:{
					"params":{
						api:'17',
							args:encodeURI(args) 
						} 
					}
				}  
				this.REQUESTDATA_KNOWLEAGE(data3).then(res=>{
					this.courtAnnouncementData = this.lawGet.courtAnnouncementData
				})
			},
			handleCurrentChangeSessionAnnouncement(val){//开庭公告详情
				location.href = "#sessionAnnouncement";
				
				this.sessionAnnouncementNum = val-1;
				let args = "name="+this.$route.query.searchName+"&pageNum="+val;
				//开庭公告详情
				var data4 = {
					num:'9',
					method:'get',
					params:{
					"params":{
						api:'57',
							args:encodeURI(args) 
						} 
					}
				}    
				this.REQUESTDATA_KNOWLEAGE(data4)
				.then((res)=>{
					// this.sessionAnnouncementData.items.forEach((val)=>{
					// 	val.startDate = tool.formatDate(val.startDate,"yyyy-MM-dd hh:mm:ss");
					// })
					this.sessionAnnouncementData = this.lawGet.sessionAnnouncementData
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	@import "~assets/common/index.less";
	@import "../../../pages/business/business.less";
</style>