<template>
	<div id="activities">
		<navigationBar :isactivities="true" :topShopData="topShopData" :serverList="serverList" @toChange="toChange"></navigationBar>
		<div class="header"></div>
		<div class="content">
			<div class="content-middle">
				<div class="bgImg"><img src="~assets/images/home/activities/saika.png"/></div>
				<form :action="reportPort"  method="get" target="_self" id="reportSystem">
					<input type="text"  style="display: none;" name="token" :value="token">
					<div class="list">
						<div class="img">
							<img src="~assets/images/home/activities/groupOne.png"/>
						</div>
						<div class="characters">
							<h3>云记账（一般纳税人）</h3>
							<p>3分钟完成一套账</p>
							<p>一般纳税人的优质之选</p>
							<div class="btn" @click="nobuyJ(0)">免费试用3天</div>
							<!--<button type="submit" class="btn" form="reportSystem" @click="nobuyJ(0)">免费试用3天</button>-->
						</div>
					</div>
					<div class="list">
						<div class="img">
							<img src="~assets/images/home/activities/groupTwo.png"/>
						</div>
						<div class="characters">
							<h3>云记账（小规模）</h3>
							<p>每月仅需39.9元</p>
							<p>小规模纳税人的优惠之选</p>
							<div class="btn" @click="nobuyJ(1)">免费试用3天</div>
							<!--<button type="submit" class="btn" form="reportSystem" @click="nobuyJ(1)">免费试用3天</button>-->
						</div>
					</div>
					<div class="list">
						<div class="img">
							<img src="~assets/images/home/activities/groupThree.png"/>
						</div>
						<div class="characters">
							<h3>云代账</h3>
							<p>专业会计团队</p>
							<p>高效代账流程</p>
							<p>您的优秀之选</p>
							<div class="btn" @click="nobuyJ(2)">免费试用3天</div>
							<!--<button type="submit" class="btn" form="reportSystem" @click="nobuyJ(2)">免费试用3天</button>-->
						</div>
					</div>
				</form>
				<div class="remark">
					<p>备注：云记账（一般纳税人/小规模），仅限1个账套单独使用;</p>
					<p>云代账，可供多个账套共同使用。</p>
				</div>
			</div>
		</div>
		
		<!--弹窗-->
		<el-dialog class="collectionDialogWrap"
                title="温馨提示"
                :visible.sync="collectionDialogVisible"
                width="380px">
	        <div class="colleSuccessed" >
	          <img src="~assets/images/product/flaseicon.png" alt="">
	          <div class="text">
	            <p class="p1">{{popText.content}}</p>
	            <p class="p2">
	            	<button type="submit" form="reportSystem" v-if="!purchaseService">{{popText.btn}}</button>
	            	<span @click="tryoutA" v-if="purchaseService">{{popText.btn}}</span>
	            </p>
	          </div>
	        </div>
	    </el-dialog>
	</div>
</template>

<script>
	import navigationBar from "~/components/common/navigationBar";
	import getData from "~/store/ajaxAPI/getData";
	import {reportPort  } from '~/store/ajaxAPI/vueDynamicParams.js';
	import tool from "~/assets/lib/tool"
	export default{
		data(){
			return{
				topShopData: [],//顶部nav导航
				serverList: [],//商品三级分类
				token:"",
				_id:"", //用户id
				collectionDialogVisible: false, //前往系统弹窗
				reportPort:`${reportPort}/wqb/toSystem/index` ,//记账报税接口
				popText:{
					content:"",
					btn:""
				},//弹窗文字
				purchaseService:false,//购买服务弹窗
				num:0
			}
		},
		components:{
	    	navigationBar,
	    },
	    created(){
		  	let mealParam = {
	        	params: {}
	      	}
	      	getData.getTopList(mealParam)
	      	.then((res)=>{
	      		this.topShopData = res.data.list;
	      	})
	      	.catch(error => {
//		        console.log(error)
	        });

	      	getData.getServerClass()
	      	.then((res)=>{
	      		this.serverList = res.data.list;
	      	})
	      	.catch((e)=>{
//		      	console.log('报错',e)
		    })
		},
		mounted(){
			if(tool.loadFromLocal("CustomerMesg","ALL")){
				this.token = tool.loadFromLocal("CustomerMesg","ALL").Token;
			}
		},
		methods:{
			nobuyJ(num){
				this.num = num;
				if(tool.loadFromLocal("CustomerMesg","ALL")){
				    getData.getcustorInfor()
				    .then((res) => {
				        this._id = res.data.Id;
				        
				        let params = {
					            params:{
					              id:this._id,
					            }
					        }
				        
				        let param = {
					            params:{
					              ptID:this._id,
					            }
					        }
				        
				        //告诉后台哪些用户是财税试用
				        getData.markCustomer(params)
				        .then((res)=>{
//				        	console.log(res)
				        })
				        .catch((error)=>{
//				        	console.log(error)
				        })
				        
				        // 都为false  则进入试用账号
				        if(!res.data.IsStaff && !res.data.JZFW && !res.data.DZFW){
					        getData.tryoutAccount(params)
					        .then((res) => {
					        	//没有此用户
					            if(res.empty == "true"){
					            	//提交表单
					              	document.getElementById("reportSystem").submit();
					            }else if(res.empty == "false") {//有此用户
					              	let timerr = res.timeout;
					              	if(timerr == "true"){
					              		this.popText.content = "试用账号已到期，请购买服务";
					              		this.popText.btn = "我要购买服务";
					                	this.purchaseService = true;
					                	this.collectionDialogVisible = true;
					              	}else{
					              		//提交表单
					              		document.getElementById("reportSystem").submit();
					              	}
					            }
					        })
				        }else{
					        getData.isDisabled(params)
					        .then((secondRes) => {
					          	// 三个条件 只要有一个为true  则可以查看代账和记账系统
					          	//购买的是云记账-一般纳税人服务
					          	if(res.data.JZFWGeneral){ 
						            if(secondRes.empty == "true"){
						              	this.popText.content = "您已购买“云记账--一般纳税人”产品！";
					              		this.popText.btn = "前往该系统";
					                	this.collectionDialogVisible = true;
						            }else if(secondRes.empty == "false"){
							            if(secondRes.manager == "true"){ //管理员
							                if(secondRes.timeout == "false" && secondRes.state == "true" ){
							                  	this.popText.content = "您已购买“云记账--一般纳税人”产品！";
							              		this.popText.btn = "前往该系统";
							                	this.collectionDialogVisible = true;
							                }else if(secondRes.timeout == "true"){
							                  	this.$message("服务已到期");
							                }else if(secondRes.state == "false"){
							                  	this.$message("您的账号已被禁用");
							                }
							            }else if(secondRes.manager == "false"){ //员工
							                if(secondRes.timeout == "false" && secondRes.state == "true" && secondRes.sonstate == "true"){
							                  	getData.markCustomer(param)
							                	.then((result)=>{
							                		//员工买的是代账服务
							                		if(result.type == 1){
							                			this.popText.content = "您已购买“云代账”产品！";
									              		this.popText.btn = "前往该系统";
									                	this.collectionDialogVisible = true;
							                		}else if(result.type == 2){//员工买的是记账服务
//							                			if(result.ssType == 0 || result.ssType == 1){
//							                				//买的是一般纳税人
//							                				if(result.ssType == 0){
//							                					this.popText.content = "您已购买“云记账--一般纳税人”产品！";
//											              		this.popText.btn = "前往该系统";
//											                	this.collectionDialogVisible = true;
//							                				}else if(result.ssType == 1){//买的是小规模
//							                					this.popText.content = "您已购买“云记账--小规模”产品！";
//											              		this.popText.btn = "前往该系统";
//											                	this.collectionDialogVisible = true;
//							                				}
//							                			}else{
//							                				this.popText.content = "您已购买“云记账”产品！";
//										              		this.popText.btn = "前往该系统";
//										                	this.collectionDialogVisible = true;
//							                			}
														this.popText.content = "您的管理员已购买“云记账”产品！";
									              		this.popText.btn = "前往该系统";
									                	this.collectionDialogVisible = true;
							                		}
							                	})
							                	.catch((error)=>{
//							                		console.log(error)
							                	})
							                }else if(secondRes.timeout == "true"){
							                  	this.$message("管理员服务已到期");
							                }else if(secondRes.state == "false"){
							                  	this.$message("管理员账号已被禁用");
							                }else if(secondRes.sonstate == "false"){
							                  	this.$message("您的账号已被禁用");
							                }
							            }
						            }
					          	}else if(res.data.JZFWSmall){ //购买的是云记账-小规模服务
						            if(secondRes.empty == "true"){
						              	this.popText.content = "您已购买“云记账--小规模”产品！";
					              		this.popText.btn = "前往该系统";
					                	this.collectionDialogVisible = true;
						            }else if(secondRes.empty == "false"){
							            if(secondRes.manager == "true"){ //管理员
							                if(secondRes.timeout == "false" && secondRes.state == "true" ){
							                  	this.popText.content = "您已购买“云记账--小规模”产品！";
							              		this.popText.btn = "前往该系统";
							                	this.collectionDialogVisible = true;
							                }else if(secondRes.timeout == "true"){
							                  	this.$message("服务已到期");
							                }else if(secondRes.state == "false"){
							                  	this.$message("您的账号已被禁用");
							                }
							            }else if(secondRes.manager == "false"){ //员工
							                if(secondRes.timeout == "false" && secondRes.state == "true" && secondRes.sonstate == "true"){
							                  	getData.markCustomer(param)
							                	.then((result)=>{
							                		//员工买的是代账服务
							                		if(result.type == 1){
							                			this.popText.content = "您已购买“云代账”产品！";
									              		this.popText.btn = "前往该系统";
									                	this.collectionDialogVisible = true;
							                		}else if(result.type == 2){//员工买的是记账服务
//							                			if(result.ssType == 0 || result.ssType == 1){
//							                				//买的是一般纳税人
//							                				if(result.ssType == 0){
//							                					this.popText.content = "您已购买“云记账--一般纳税人”产品！";
//											              		this.popText.btn = "前往该系统";
//											                	this.collectionDialogVisible = true;
//							                				}else if(result.ssType == 1){//买的是小规模
//							                					this.popText.content = "您已购买“云记账--小规模”产品！";
//											              		this.popText.btn = "前往该系统";
//											                	this.collectionDialogVisible = true;
//							                				}
//							                			}else{
//							                				this.popText.content = "您已购买“云记账”产品！";
//										              		this.popText.btn = "前往该系统";
//										                	this.collectionDialogVisible = true;
//							                			}
														this.popText.content = "您的管理员已购买“云记账”产品！";
									              		this.popText.btn = "前往该系统";
									                	this.collectionDialogVisible = true;
							                		}
							                	})
							                	.catch((error)=>{
//							                		console.log(error)
							                	})
							                }else if(secondRes.timeout == "true"){
							                  	this.$message("管理员服务已到期");
							                }else if(secondRes.state == "false"){
							                  	this.$message("管理员账号已被禁用");
							                }else if(secondRes.sonstate == "false"){
							                  	this.$message("您的账号已被禁用");
							                }
							            }
						            }
					          	}else if(res.data.DZFW){//购买的是云代账服务
					        		if(secondRes.empty == "true"){
						              	this.popText.content = "您已购买“云代账”产品！";
					              		this.popText.btn = "前往该系统";
					                	this.collectionDialogVisible = true;
						            }else if(secondRes.empty == "false"){
							            if(secondRes.manager == "true"){ //管理员
							                if(secondRes.timeout == "false" && secondRes.state == "true" ){
							                  	this.popText.content = "您已购买“云代账”产品！";
							              		this.popText.btn = "前往该系统";
							                	this.collectionDialogVisible = true;
							                }else if(secondRes.timeout == "true"){
							                  this.$message("服务已到期");
							                }else if(secondRes.state == "false"){
							                  this.$message("您的账号已被禁用");
							                }
							            }else if(secondRes.manager == "false"){ //员工
							                if(secondRes.timeout == "false" && secondRes.state == "true" && secondRes.sonstate == "true"){
							                  	getData.markCustomer(param)
							                	.then((result)=>{
							                		//员工买的是代账服务
							                		if(result.type == 1){
							                			this.popText.content = "您已购买“云代账”产品！";
									              		this.popText.btn = "前往该系统";
									                	this.collectionDialogVisible = true;
							                		}else if(result.type == 2){//员工买的是记账服务
//							                			if(result.ssType == 0 || result.ssType == 1){
//							                				//买的是一般纳税人
//							                				if(result.ssType == 0){
//							                					this.popText.content = "您已购买“云记账--一般纳税人”产品！";
//											              		this.popText.btn = "前往该系统";
//											                	this.collectionDialogVisible = true;
//							                				}else if(result.ssType == 1){//买的是小规模
//							                					this.popText.content = "您已购买“云记账--小规模”产品！";
//											              		this.popText.btn = "前往该系统";
//											                	this.collectionDialogVisible = true;
//							                				}
//							                			}else{
//							                				this.popText.content = "您已购买“云记账”产品！";
//										              		this.popText.btn = "前往该系统";
//										                	this.collectionDialogVisible = true;
//							                			}
														this.popText.content = "您的管理员已购买“云记账”产品！";
									              		this.popText.btn = "前往该系统";
									                	this.collectionDialogVisible = true;
							                		}
							                	})
							                	.catch((error)=>{
//							                		console.log(error)
							                	})
							                }else if(secondRes.timeout == "true"){
							                  	this.$message("管理员服务已到期");
							                }else if(secondRes.state == "false"){
							                  	this.$message("管理员账号已被禁用");
							                }else if(secondRes.sonstate == "false"){
							                  	this.$message("您的账号已被禁用");
							                }
							            }
						            }
						        }else if(res.data.IsStaff){
						        	if(secondRes.timeout == "false" && secondRes.state == "true" && secondRes.sonstate == "true"){
					                 	getData.markCustomer(param)
					                	.then((result)=>{
					                		//员工买的是代账服务
					                		if(result.type == 1){
					                			this.popText.content = "您已购买“云代账”产品！";
							              		this.popText.btn = "前往该系统";
							                	this.collectionDialogVisible = true;
					                		}else if(result.type == 2){//员工买的是记账服务
					                			this.popText.content = "您的管理员已购买“云记账”产品！";
							              		this.popText.btn = "前往该系统";
							                	this.collectionDialogVisible = true;
//					                			if(result.ssType == 0 || result.ssType == 1){
//					                				//买的是一般纳税人
//					                				if(result.ssType == 0){
//					                					this.popText.content = "您已购买“云记账--一般纳税人”产品！";
//									              		this.popText.btn = "前往该系统";
//									                	this.collectionDialogVisible = true;
//					                				}else if(result.ssType == 1){//买的是小规模
//					                					this.popText.content = "您已购买“云记账--小规模”产品！";
//									              		this.popText.btn = "前往该系统";
//									                	this.collectionDialogVisible = true;
//					                				}
//					                			}else{
//					                				this.popText.content = "您已购买“云记账”产品！";
//								              		this.popText.btn = "前往该系统";
//								                	this.collectionDialogVisible = true;
//					                			}
					                		}
					                	})
					                	.catch((error)=>{
//					                		console.log(error)
					                	})
					                }else if(secondRes.timeout == "true"){
					                  	this.$message("管理员服务已到期");
					                }else if(secondRes.state == "false"){
					                  	this.$message("管理员账号已被禁用");
					                }else if(secondRes.sonstate == "false"){
					                  	this.$message("您的账号已被禁用");
					                }
						        }
					        })
				        }
				    })
				}else{
					this.$router.push({path:"/loginAndRegister/login",query:{activities:1}});
				}
			},
			//navigation传值接收
	        toChange(val){
	        	this.num = val;
	        },
	        tryoutA(){ //试用入口
	        	//一般纳税人
	        	if (this.num == 0) {
	        		this.$router.push({path:'/productDetails/49f12e77-2259-42f9-869f-18295cef5c04/0'});
	        	} else if(this.num == 1){
	        		//小规模
	        		this.$router.push({path:'/productDetails/121378aa-a0d0-4079-8805-1f5c6f38f47f/0'});
	        	}else if(this.num == 2){
	        		//云代账
	        		this.$router.push({path:'/productDetails/cbf7ea00-20fe-4053-89a4-58275567551a/0'});
	        	}
	        	
		    },
		}
	}
</script>

<style type="stylesheet/css" scoped lang="less">
  @import "./activities.less";
</style>