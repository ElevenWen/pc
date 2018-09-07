<style lang="less" scoped>
@import './personalCenter_index.less';
    #myServer {
      background-color: #F0F0F5;
    }
    .content {
      width: 1020px;
      background-color: #fff;
      margin-left: 185px;
    }
    .border-bottom {
      border-bottom: 1px solid #ebebeb;
    }
    .title {
      padding: 0 20px;
      line-height: 45px;
      height: 45px;
      font-size: 16px;
      color: #4d4d4d;
    }
    .service-help {
      float: right;
      padding-left: 26px;
      font-size: 14px;
      cursor: pointer;
      color: #359af8;
      background: url(~static/images/common/myServer3.png) no-repeat 0 center;
    }
    .service-item {
      position: relative;
      padding: 50px 120px;
      font-size: 14px;
      color: #666;
    }
    .service-item img {
      position: absolute;
      top: 25px;
      margin-left: -100px;
      width: 80px;
      height: 80px;
    }
    .service-item h6 {
      font-size: 16px;
      line-height: 26px;
      color: #333;
    }
    .service-item p {
      line-height: 36px;
      margin-top:18px;
    }
    .service-item .last {
      padding-bottom: 3px;
      line-height: 1;
    }
    .service-item .btn {
      position: absolute;
      right: 20px;
      text-align: center;
      cursor: pointer;
    }
    .service-item .btn-normal {
      top: 44px;
      padding: 0 11px;
      font-size: 12px;
      line-height: 28px;
      border-radius: 2px;
      color: #fff;
      background-color: #359af8;
    }
    .service-item .btn-sm {
      top: 84px;
      padding: 0 21px;
      line-height: 1;
      color: #30a1f8;
    }
    .service-list-empty {
      height: 829px;
      font-size: 14px;
      text-align: center;
    }
    .service-list-empty>div {
      display: inline-block;
      padding-top: 356px;
      text-align: left;
      background-image: url();
      background-repeat: no-repeat;
      background-position: center 100px;
    }
    .service-list-empty p {
      line-height: 1;
      color: #666;
    }
    .service-list-empty span {
      line-height: 34px;
      color: #ff3e08;
      text-decoration: none;
      cursor:pointer;
    }
    .tryOutC{
      margin-top: -36px;
      float: right;
      margin-right: 110px;
      width: 70px;
      height: 28px;
      background: #359af8;
      color: #fff;
      border-radius: 3px;
      text-align: center;
      line-height: 28px;
    }
    .world{
      font-size: 14px;
    }
</style>
<template>
    <div id="myServer">
        <!-- 个人中心公共头部 -->
        <personalCenterHead ref="indexTriangle"></personalCenterHead>
        <publicPendantR></publicPendantR>
        <!-- 公共侧边栏   -->
        <div class="margin1200">
          <personalCenterSlide></personalCenterSlide>
          <!-- 内容部分 -->
           <div class="content">
                <div class="title border-bottom">我的服务
                  <a :href="myserver_operation" download="用户操作手册">
                    <span class="service-help">新手指导</span>
                  </a>
                  <!-- 测试环境 需要调用此段代码 -->
                  <!--<form v-if='componentsDataIsNet == "Net"'  :action="reportPort" method="get" target="_blank">-->
                   <form  :action="reportPort" method="get" target="_blank"> 
                    <input type="text"  style="display: none;" name="token" :value="token">
                    <input type="submit" value="试用" class="tryOutC" v-if="tryOut">
                    <span @click="tryoutA" class="tryOutC world" v-if="!tryOut && tryOutShow">试用</span>
                  </form>
                </div>
                <ul class="service-list">
                 <!-- <form action=" http://acct.wqbol.net/wqb/toSystem/index" method="get" target="_blank"> -->
                  <form :action="reportPort"  method="get" target="_blank">
                    <input type="text"  style="display: none;" name="token" :value="token">
                    <li class="service-item border-bottom">
                      <img src="~static/images/common/myServer1.png" alt="云代账小规模">
                      <h6>云代账</h6>
                      <!-- <p>服务编号：123456</p> -->
                      <!-- <p class="last">有效期：1年（2018-3-28 10:26:29 至 2019-3-28 10:26:40）</p> -->
                      <input type="submit" value="进入系统" class="btn btn-normal" v-if="isShowD">
                      <div class="btn btn-normal"  v-if="!isShowD" @click="nobuyD">进入系统</div>
                      <span class="btn btn-sm" @click="addMoney">续费</span>
                    </li>
                    <li class="service-item border-bottom">
                        <img src="~static/images/common/myServer2.png" alt="云代账一般纳税人">
                        <h6>云记账</h6>
                        <!-- 服务编号：123456 -->
                        <!-- 有效期：1年（2018-3-28 10:26:29 至 2019-3-28 10:26:40） -->
                        <!-- <p></p>
                        <p class="last"></p> -->
                        <input type="submit" value="进入系统" class="btn btn-normal" v-if="isShowJ">
                        <div class="btn btn-normal" v-if="!isShowJ" @click="nobuyJ">进入系统</div>
                        <span class="btn btn-sm" @click="addMoney">续费</span>
                    </li>
                  </form>
                </ul>
            </div>

        </div>
        <!-- 公共底部 -->
        <publicBottom></publicBottom>
    </div>
</template>
<script>
  import personalCenterHead from '~/components/common/personalCenterHead'
  import personalCenterSlide from "~/components/common/personalCenterSlide"
  import publicBottom from '~/components/common/publicBottom'
  import publicPendantR from '~/components/common/publicPendantR'
  import getData from "~/store/ajaxAPI/getData"
  import tool from "~/assets/lib/tool"
	import {myserver_operation,reportPort  } from '~/store/ajaxAPI/vueDynamicParams.js';


export default {
    asyncData (context) {
      let componentsData = null ;
      if(process.env._NODE_ENV.indexOf('Net')>=0){
         componentsData = 'Net';
      }else{
         componentsData = 'Com';
      }
      //Net 环境渲染
      return { componentsDataIsNet: componentsData }
    },
    data(){
        return {
          isShowJ:false,
          isShowD:false,
          token:"",
          _id:"", //用户id
          tryOut:false, //试用账号
          tryOutShow:false,
          myserver_operation:myserver_operation,//操作手册
          reportPort:`${reportPort}/wqb/toSystem/index` ,//记账报税接口
        }
    },
    components:{
        personalCenterHead,
        personalCenterSlide,
        publicBottom,
        publicPendantR
    },
    mounted(){
      this.token = tool.loadFromLocal("CustomerMesg","ALL").Token;
      getData.getcustorInfor().then((res) => {
        // console.log("res",res);
        this._id = res.data.Id;
        let params = {
          params : {
            id: this._id,
          }
        }
        getData.isDisabled(params).then((secondRes) => {
//        console.log("禁用",secondRes);
//        console.log("res",res);
          // 三个条件 只要有一个为true  则可以查看代账和记账系统
          	if(res.data.IsStaff){
	            if(secondRes.empty == "true"){
	              	this.isShowJ = true;
	              	this.isShowD = true;
	              	this.tryOut = false;
	            }else if(secondRes.empty == "false"){
		            if(secondRes.manager == "true"){ //管理员
		                if(secondRes.timeout == "false" && secondRes.state == "true" ){
		                   this.isShowJ = true;
		                  this.isShowD = true;
		                  this.tryOut = false;
		                }else if(secondRes.timeout == "true"){
		                  this.$message("服务已到期");
		                }else if(secondRes.state == "false"){
		                  this.$message("您的账号已被禁用");
		                }
		            }else if(secondRes.manager == "false"){ //员工
		                if(secondRes.timeout == "false" && secondRes.state == "true" && secondRes.sonstate == "true"){
		                   this.isShowJ = true;
		                  this.isShowD = true;
		                  this.tryOut = false;
		                }else if(secondRes.timeout == "true"){
		                  this.$message("管理员服务已到期");
		                }else if(secondRes.state == "false"){
		                  this.$message("管理员账号已被禁用");
		                }else if(secondRes.sonstate == "false"){
		                  this.$message("您的账号已被禁用");
		                }
		            }
	            }
	        }
          	if(res.data.JZFW){
	            if(secondRes.empty == "true"){
	              	this.isShowJ = true;
	              	// this.isShowD = true;
	              	this.tryOut = false;
	            }else if(secondRes.empty == "false"){
		            if(secondRes.manager == "true"){ //管理员
		                if(secondRes.timeout == "false" && secondRes.state == "true" ){
		                  this.isShowJ = true;
		                  // this.isShowD = true;
		                  this.tryOut = false;
		                }else if(secondRes.timeout == "true"){
		                  this.$message("服务已到期");
		                }else if(secondRes.state == "false"){
		                  this.$message("您的账号已被禁用");
		                }
		            }else if(secondRes.manager == "false"){ //员工
		                if(secondRes.timeout == "false" && secondRes.state == "true" && secondRes.sonstate == "true"){
		                  this.isShowJ = true;
		                  // this.isShowD = true;
		                  this.tryOut = false;
		                }else if(secondRes.timeout == "true"){
		                  this.$message("管理员服务已到期");
		                }else if(secondRes.state == "false"){
		                  this.$message("管理员账号已被禁用");
		                }else if(secondRes.sonstate == "false"){
		                  this.$message("您的账号已被禁用");
		                }
		            }
	            }
          	}
	        if(res.data.DZFW){
	            if(secondRes.empty == "true"){
//	              	this.isShowJ = true;
	              	this.isShowD = true;
	              	this.tryOut = false;
	            }else if(secondRes.empty == "false"){
		            if(secondRes.manager == "true"){ //管理员
		                if(secondRes.timeout == "false" && secondRes.state == "true" ){
//		                   this.isShowJ = true;
		                  this.isShowD = true;
		                  this.tryOut = false;
		                }else if(secondRes.timeout == "true"){
		                  this.$message("服务已到期");
		                }else if(secondRes.state == "false"){
		                  this.$message("您的账号已被禁用");
		                }
		            }else if(secondRes.manager == "false"){ //员工
		                if(secondRes.timeout == "false" && secondRes.state == "true" && secondRes.sonstate == "true"){
//		                   this.isShowJ = true;
		                  this.isShowD = true;
		                  this.tryOut = false;
		                }else if(secondRes.timeout == "true"){
		                  this.$message("管理员服务已到期");
		                }else if(secondRes.state == "false"){
		                  this.$message("管理员账号已被禁用");
		                }else if(secondRes.sonstate == "false"){
		                  this.$message("您的账号已被禁用");
		                }
		            }
	            }
	        }
        })


        // 都为false  则进入试用账号
        if(!res.data.IsStaff && !res.data.JZFW && !res.data.DZFW){
          let params = {
            params:{
              id:this._id,
            }
          }
          getData.tryoutAccount(params).then((res) => {
            if(res.empty == "true"){
              this.tryOut = true;
              // this.tryOutShow = false;
            }else if(res.empty == "false") {
              let timerr = res.timeout;
              if(timerr == 'false'){
                this.tryOut = true;
                // this.tryOutShow = false;
              }else{
                this.tryOut = false;
                this.tryOutShow = true;
                return
              }
            }
          })
        }


      })
    },
    methods:{
      toProduct(){ //选服务
        this.$router.push({path:'/productList',query:{typeIndex:"All",productName:'All'}});
      },
      addMoney(){ //续费
        getData.addMoney().then((res) => {
          this.$router.push("/productDetails/"+res.data.Id+"/0");
        })
      },
      nobuyD(){
        this.$message.error("请先购买服务！！");
      },
      nobuyJ(){
        this.$message.error("请先购买服务！！");
      },
      tryoutA(){ //试用入口
        this.$message.error("未购买记账代账服务只能试用3天！");
        this.$router.push({path:'/productList',query:{typeIndex:2,productName:'All'}});
      },
    }
}
</script>
