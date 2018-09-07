<template><!--头部导航-->
  <div class="c-header">
    <div class="c-hdTopWrap">
			<topState :isHome="isHome" :isActivities="isactivities"></topState>
      <!-- /头部顶部 -->
      <!-- 头部主体 -->
      <div class="c-mainWrap">
        <!-- 头部主体top -->
        <div class="c-main-top">
          <nuxt-link to="/" title="微企宝一站式企业服务平台">
            <img class="logo" src="/images/logo.png" alt="微企宝深圳前海公司注册">
          </nuxt-link>
          <div v-if="$route.path === '/'" v-show="0">
            <div>深圳微企宝计算机系统有限公司</div>
            <div>
            <p>深圳微企宝计算机系统有限公司于2013年11月成立，隶属于荣灿集团，由深圳荣灿大数据技术有限公司投资兴办，是一家专业从事信息化管理软件研发、互联网应用软件开发以及综合大数据服务的创新型科技企业。提供深圳集团公司注册代理、深圳前海公司登记注册、深圳前海公司注册代办、深圳前海注册公司代理、在深圳前海注册公司、在深圳注册公司流程、注册深圳前海公司、注册深圳市公司、集团公司注册代办、深圳代理注销公司、深圳公司注销代办、深圳注册合伙企业代办、深圳前海注册公司流程、深圳前海公司注册价格、深圳公司注册资金、深圳注册资本变更。目前深圳微企宝自主研发的“微企宝”线上系统，集云记账、云代账、云报税于一体，涵盖工商服务、知识产权、资质审批、挂牌服务、电子发票、“扫票”(扫描二维码)自动生成凭证、一键报税、线上下单、智能派单等9大功能，旨在以更高效的速度和更便捷的方式为企业解决“记账难、记账慢”的问题，为企业提供从初创、发展到永续经营全过程中所需要的一系列服务。未来微企宝平台将本着共享、分享的理念，整合各方资源，实现利益共享、多方共赢，打造一个综合的企业服务大数据平台。荣灿集团总部坐落于深圳宝安区西乡智谷科技园，至今已有近十年历史，旗下拥有深圳荣灿大数据、深圳微企宝等9家分支机构，涵盖互联网、金融、房地产、影视传媒等多个领域。</p>
            <p>深圳荣灿大数据技术有限公司是一家创新型金融企业，可为企业提供顶层商业模式设计、股权激励方案、融资方案、并购重组方案、IpO、“新三板”及“新四板”上市辅导、股权投资等一系列市值运作服务。</p>
            <p>深圳微企宝计算机系统有限公司是一家创新型科技企业，其研发的“微企宝”线上系统，涵盖工商服务、记账报税、知识产权、资质审批、挂牌服务、电子发票、“扫票”自动生成凭证、线上下单、智能派单等9大功能，可为企业提供从初创、发展到永续经营全过程中的所有服务。</p>
            </div>
          </div>
          <nuxt-link to="/couponsCenter" rel="nofollow">
            <img src="~assets/images/tabBar/ticket.png" alt="去领券" class="ticket">
          </nuxt-link>
          <div class="c-main-center">
            <!--引入ui框架  在引入页面 做layui引入-->
            <ul class="tab-searFrom">
              <li @mouseenter="searchEnter($event,0)" @mouseleave="searchLeave($event,0)" @click="searLi(this,$event,0)">搜服务</li>
              <li @mouseenter="searchEnter($event,1)" @mouseleave="searchLeave($event,1)" @click="searLi(this,$event,1)">查公司</li>
              <li @mouseenter="searchEnter($event,2)" @mouseleave="searchLeave($event,2)" @click="searLi(this,$event,2)">查商标</li>
              <li @mouseenter="searchEnter($event,3)" @mouseleave="searchLeave($event,3)" @click="searLi(this,$event,3)">查专利</li>
            </ul>
            <form class='layui-form layui-form-pane1 main-searFrom' onsubmit="return false">
              <div class='layui-inline'>
                <div class='layui-input-block querySear'>
                  <input type='text' placeholder='请输入关键字' id='querySear_input' v-model="words" @keyup.enter="businessQuery">
                   <div class='searchBtn' @click="businessQuery">搜索</div>
                </div>
              </div>
            </form>
            <p class="c-main-hot">
              <a :href="'/productList?typeIndex=all&productName='+data.Name" @click="toSearchList(data.Name)" v-for="data in recordList">{{data.Name}}&nbsp;&nbsp;</a>
            </p>
          </div>
        </div>
        <!-- /头部主体top -->
        <!-- 头部主导航外层 -->
        <div class="c-main-navWrap">
          <div class="c-main-nav">
            <!-- 头部导航主体 -->
            <div class="c-main-nav-centerTitle serverNavHover" @mouseenter="serverNavHoverJ()"  @mouseleave="serverNavHoverC()"><i class="dd"></i><span>全部分类</span></div>
            <ul class="c-main-nav-center">
              <li class="items"  @click="home">
                <a data-href="" href="https://www.wqbol.com/" @click.prevent>首页</a>
              </li>
              <li class="items" v-for="data in topShopData">
                <a data-href="" :href="'/productDetails/'+data.Id+'/'+data.Type" @click="toDetail(data.Id,data.Type)">{{data.Name}}</a>
                <!--<i class="hot"></i>-->
              </li>
              <li class="items signature" @click="toSignature">
                <a data-href="" href="/eContract" @click.prevent>电子合同</a>
                <i></i>
              </li>
              <li class="items" @click="journalism">
                <a data-href="" href="/news" @click.prevent>新闻中心</a>
              </li>
              <li class="items" @click="inRegardTo">
                <a data-href="" href="/inRegardTo/inRegardTo?style=0" @click.prevent>关于微企宝</a>
              </li>
            </ul>
            <!-- /头部导航主体 -->
            <!-- <div class="hebdomad">
              <img src="~assets/images/common/days.png">
              七天无理由退款
            </div> -->
          </div>
        </div>
        <!-- /主导航外层 -->

        <!-- 公用子导航左侧 -->
        <div class="c-submenu serverNavHover" @mouseenter="serverNavHoverJ()" @mouseleave="serverNavHoverC()" v-show="isMove">
          <div class="c-submenu-left">
            <ul class="itemWrap">
              <li class="items" @mouseenter="enterFn(this,$event,data.Id)" @mouseleave="leaveFn(this,$event)" v-for="(data,sIndex) in serverList">
                <!-- <img :src="data.img" class="bigSortImg"> -->
                <img :src="'/images/bigSort/' + (sIndex + 1) + '.png'" class="bigSortImg">
                <a :href="'/productList?typeIndex='+sIndex+'&productName=All'" data-des="" @click="toProductList(sIndex)">{{data.Name}}</a><i class="li"></i>
                <!--<span class="line"></span>-->
                <div class="c-main-nav-left-noneWrap">
                  <dl class="c-main-nav-left-none">

                    <div class="title-div" v-for="(val,i) in data.ClassiList">
                      <div  style=" overflow: hidden;">
                        <dt class="title" @click="toProductList(sIndex)">
                          <a :href="'/productList?typeIndex='+sIndex+'&productName=All'" @click.prevent>
                            <i class="dd">{{val.Name}}</i><i class="titleImg" v-if='false'></i>
                          </a>
                        </dt>
                        <dd class="itemwrap">
                          <ul class="item">
                            <li class="items" v-for="(inf) in  val.ProductList">
                              <nuxt-link :to="'/productDetails/'+inf.Id+'/'+inf.Type">{{inf.Name}}</nuxt-link>
                            </li>
                          </ul>
                        </dd>
                         </div>
                    </div>

                  </dl>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- /公用子导航左侧 -->
        <!-- /侧边导航 -->
      </div>
      <!--<p class="link"></p>-->
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import topState from "../common/topState";
  import getd from "~/store/ajaxAPI/getData.js";
  export default {
    data() {
      return {
        num:0,//搜索的类型
        words:"",//搜索词
        scrollTop: "",  //获取距离顶部高度
        isMove:false,//是否移入
        abc:[],
        isHome:false,
      }
    },
    props:{
      isTrue:{
        type:Boolean,
        default: () => false
      },
      isNews:{
        type:Boolean,
        default: () => false
      },
      recordList:{//访问记录
        type: Array,
        default: () => []
      },
      topShopData:{//顶部商品列表
        type: Array,
        default: () => []
      },
      serverList: {//商品三级分类
        type: Array,
        default: () => []
			},
			isactivities:{//活动页面
				type: Boolean,
				default: () => false
      }
    },
    mounted(){

      if(this.isTrue){
        this.isMove = true;
      }
//	        getd.SERVERLIST()
//	        .then((res)=>{
//	          	this.serverList = res.data.list;
//	          	this.serverList.forEach((data,index)=>{
//	          		//添加静态图
//					var num = index+1;
//					data.img = '/images/bigSort/'+ num +'.png';
//
//		          	var param={
//	    				params:{
//	    					classId:data.Id
//	    				}
//	    			}
//	    			var that = this;
//	    			var k = 0;
//  				async  function test(data){
//							 try {
// 							await  new Promise((resolve,reject)=>{//二层
//	    						 	getd.SERVER_PRODUCT_LIST(param)
//					    			.then((res)=>{
//					    				that.$set(that.serverList[index] ,'secondData' , res.data.list )
//					    				resolve()
//					    			})
//					        });
//
//	    					await  new Promise((resolve,reject)=>{ //三层
//	    						that.serverListSecond = that.serverList;
//	    						that.serverList[index].secondData.forEach((secondE,secondI)=>{
//	    							var item={
//					    				params:{
//					    					classId:secondE.Id
//					    				}
//					    			};
//	    							  getd.SERVER_PRODUCT_INFOR(item)
//						    			.then((response)=>{//三层
//						    				that.$set( that.serverList[index].secondData[secondI],'thirdData',response.data)
//						    				 resolve()
//						    			})
//	    						})
//	    					});
//
//	    					await  new Promise((resolve,reject)=>{
//	    						 that.serverListSecond = that.serverList;
//	    						 // console.log('获取第三层',that.serverList )
//	    						that.abc = [];
//	    							for(var i = 0 ; i < that.serverListSecond.length ; i++){
//	    								// console.log(that.serverListSecond[i].secondData)
//		    									that.abc.push(that.serverListSecond[i].secondData);
//		    							//	console.log(  elem.thirdData )
//		    						}
//
//	    					        // if(index == 0 ){
//	    					        // 	console.log(that.abc)
//	    					        // 	return
//	    					        // }
//					        });
//	    				}catch(error){
//	    					// console.log('报错了哦',error)
//	    				}
//  				}
//	    		 	test(data);
//	          	})
//	        })


      //当滚动条滚动到距离顶部300px的时候出现返回顶部按钮
      var self =this;
      window.onscroll = function(){
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        self.scrollTop = scrollTop;
        if(scrollTop > 290) { //如果滚动高度大于300px，则导航栏固定在顶部
          $(".c-main-navWrap").css({"position":"fixed","top":"0px","z-index":"1999","border-bottom":"1px solid #dcdcdc"});
          if(self.isTrue){
            if(scrollTop >590){
              $(".c-submenu-left").css({"position":"fixed","top":"41px"});
              self.isMove = false;
            }else {
              $(".c-submenu-left").css({"position":"absolute","top":"0"});
              self.isMove = true;
            }
          }else{
            $(".c-submenu-left").css({"position":"fixed","top":"41px"});
          }
        }else { //否则恢复默认值
          if(self.isNews){
            $(".c-main-navWrap").css({"position":"absolute","top":"150px","z-index":"1999","border-bottom":"none"});
            $(".c-submenu").css({"top":"33px"});
          }else{
            $(".c-main-navWrap").css({"position":"static","top":"0","z-index":"1999","border-bottom":"none"});
          }
          $(".c-submenu-left").css({"position":"absolute","top":"0"});
        }

        if(scrollTop > 300) { //如果滚动高度大于300px，则显示回到顶部按钮
          // console.log('3333' )
          if(document.querySelector("#top")){
            document.querySelector("#top").style.display = "block";
          }
        } else { //否则隐藏
          // console.log('4444' )
          if(document.querySelector("#top")){
            document.querySelector("#top").style.display = "none";
          }
        }
      }

    },
    destroyed(){
      window.onscroll = null;
    },
    components:{
      topState,
    },
    watch: {
      //路由变化刷新
        '$route': function (route) {
          //console.log(route)
//			  	location.reload()
        },
    },
    methods: {
      serverNavHoverJ(){
        // console.log('mouse')
        if(this.isTrue){
          if(this.scrollTop >590){
            this.isMove = true;
          }
        }else{
          this.isMove = true;
        }
      },
      serverNavHoverC(){
        if(this.isTrue){
          if(this.scrollTop > 590){
            this.isMove = false;
          }
        }else{
          this.isMove = false;
        }
      },
      //返回首页
      home(){
        this.$router.push('/')
      },
      //跳转商品列表
      toDetail(id,type){
        this.$router.push({
          path:'/productDetails/' + id + '/' + type
        });
      },
      //商品列表跳转
        toProductList(typeIndex){
            this.$router.push({path:'/productList',query:{typeIndex:typeIndex,productName:'All'}});
        },
        //跳转到详情
//		    toRuoterDetail(pathId,ProductType){
//				this.$router.push({name: "productDetails-id-type",params:{id:pathId,type:ProductType}});
//		    },
      //关于微企宝
      inRegardTo(){
        this.$router.push({path:'/inRegardTo/inRegardTo',query:{style:0}})
        this.$emit("toChange","0")
      },
      //新闻中心
      journalism(){
        this.$router.push("/news")
      },
      //跳转搜索列表
      toSearchList(name){
        this.$router.push({path:'/productList',query:{typeIndex:"all",productName:name}});
      },
      //电子合同
      toSignature(){
      	this.$router.push("/eContract")
      },
      //商事查询路由
      businessQuery(){
        if (this.words) {
          //查服务
          if(this.num == 0){
            //新增访问记录
            var params = {
              params:{
                Keyword:this.words
              }
            }
            getd.createSearchRecord(params)
            .then((res)=>{
              //console.log(res)
            });
            this.$router.push({path:'/productList',query:{typeIndex:"all",productName:this.words}});
          }else if (this.num == 1) {
            //查公司
            this.$router.push({path:"/business/business",query:{category:"公司",type:0,searchName:this.words}});
          }else if (this.num == 2) {
            //查商标
            this.$router.push({path:"/business/business",query:{category:"知识产权",type:0,searchName:this.words}});
          }else{
            //查专利
            this.$router.push({path:"/business/business",query:{category:"知识产权",type:1,searchName:this.words}});
          }
        }else{

        }
      },
      //商品分类滑过效果
      enterFn(data, data1,classId){
        //移入时请求数据
        $(data1.target).css({"background":"#fff"});
        $(data1.target).siblings().removeClass("active");
        $(data1.target).children('.c-main-nav-left-noneWrap').css({"display":'block'});
        $(data1.target).siblings().css({"border-right":"1px solid #e5e5e5"});
      },
      leaveFn(data, data1){
        $(data1.target).css({"background":"#fafafa"});
        $(data1.target).siblings().css({"border-right":"none"});
        $(data1.target).children('.c-main-nav-left-noneWrap').css({"display":'none'});
      },
      //搜索切换
      searLi(data,data1,num){
        this.num = num;
        $(data1.target).css({"background":"#ff3e08","color":"#fff"});
        $(data1.target).siblings().css({"background":"#fff","color":"#666"});
        if($(data1.target).index() == 0){
          $(".c-main-center .c-main-hot").css({"display":'block'});
        }else{
          $(".c-main-center .c-main-hot").css({"display":'none'});
        }
      },
      // 移入搜索切换
      searchEnter(data1,num){
        $(data1.target).css({"background":"#ff3e08","color":"#fff"});
      },
      // 移出搜索切换
      searchLeave(data1,num){
        if(this.num!=num){
          $(data1.target).css({"background":"#fff","color":"#666"});
        }
      }
    }
  }
</script>

<style lang="less" type="stylesheet/css" scoped>
    @import "~assets/common/index.less";
  @import "~assets/common/common.less";
  @import "../../pages/home.less";
  /*内联样式删除谨慎!*/
  /*.c-headerContainWrap .c-header .c-hdTopWrap .c-mainWrap .c-submenu {
    display: block;
  }*/

  /*// .c-header .c-hdTopWrap .c-mainWrap .c-submenu .c-main-nav-left-noneWrap{
  // 	display:none
  // }
  // .c-header .c-hdTopWrap .c-mainWrap .c-submenu .c-main-nav-left-noneWrap{
  // 	display: auto
  // }
  // .c-header .c-hdTopWrap .c-mainWrap .c-submenu .c-main-nav-left-noneWrap{
  // 	background: red;
  // 	display: block;
  // }*/
  .title-div{
    width: 100%;
    overflow: hidden;
      margin-top: 23px;
  }
  .searchBtn{
    cursor: pointer;
  }
  .serverNavHover{
    cursor: pointer;
  }
  .serverNavH{
    width: 210px;
      height: 43px;
      border: 1px solid #ff3308;
      float: left;
      position: absolute;
      z-index: 999;
  }
  .c-main-nav-center li{
    border: none !important;
  }
  .c-main-hot a{
    cursor: pointer;
  }
  .tab-searFrom li{
    width: 70px;
  }

  .c-main-navWrap{
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
  
  /*电子合同*/
 	.c-main-nav .signature{
 		position: relative;
 	}
 	.c-main-nav .items i{
 		width: 27px;
 		height: 14px;
 		background: url('~/assets/images/eContract/hot.png') no-repeat;
 		position: absolute;
 		right: -8px;
 		top: 0;
 	}
</style>
