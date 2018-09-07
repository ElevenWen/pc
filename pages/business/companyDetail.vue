<template>
	<div id="companyDetail">
		<!--顶部-->
		<div class="c-header">
            <div class="c-hdTopWrap">
                <topState></topState>
            </div>
        </div>
        <!--标题logo-->
        <search name="商事查询"></search>
        <!--公司内容-->
        <div class="company-content">
        	<!--公司头部-->
        	<div class="company-head">
        		<div class="company-head-top">
        			<div class="img"><img :src="headInf.logo"/></div>
        			<div class="company-name">
        				<h3>{{$route.query.searchName}}</h3>
        				<div class="company-mes">
        					<span>电话：</span>
        					<span>{{headInf.phoneNumber}}</span>
        					<span>邮箱：</span>
        					<span>-</span>
        				</div>
        				<div class="company-address">
        					<span>官网：</span>
        					<a @click="toHref(headInf.websiteList)">{{headInf.websiteList}}</a>
        					<span>地址：</span>
        					<span>{{headInf.regLocation}}</span>
        				</div>
        			</div>
        			<!--<div class="company-update">
        				<div class="company-pad">
        					<div class="base"><span></span></div>
        					<span @click="toReload" class="reload">更新数据</span>
        					<span>更新时间：</span>
        					<span>10天前</span>
        				</div>
        			</div>-->
        		</div>
        		<div class="company-head-bot">
        			<span>分享到：</span>
        			<div><a target="_blank" :href="'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?'+qParams"></a></div>
        			<div><a @mouseenter="toShowWx" @mouseleave="toLeaveWx"></a><div id="qr-code" v-show="wxShow"></div></div>
        			<div><a target="_blank" :href="'https://v.t.sina.com.cn/share/share.php?'+xParams"></a></div>
        		</div>
        	</div>

        	<div class="content-wrap">
        		<el-tabs class="content-body" v-model="activeName" type="card" @tab-click="handleClick">
        			<el-tab-pane name="first">
					    <span slot="label">基本信息&nbsp;<i>{{infNum}}</i></span>
					    <information @getTotal="getTotal"></information>
					</el-tab-pane>
					<el-tab-pane name="second">
					    <span slot="label">法律诉讼&nbsp;<i>{{lawNum}}</i></span>
					   	<law @getLawTotal="getLawTotal"></law>
					</el-tab-pane>
					<el-tab-pane name="third">
					    <span slot="label">经营状况&nbsp;<i>{{operationNum}}</i></span>
					   	<operation @getOperationTotal="getOperationTotal"></operation>
					</el-tab-pane>
					<el-tab-pane name="fourth">
					    <span slot="label">对外投资&nbsp;<i>{{investmentNum}}</i></span>
					    <investment @getInvestmentTotal="getInvestmentTotal"></investment>
					</el-tab-pane>
					<el-tab-pane name="fifth">
					    <span slot="label">企业年报&nbsp;<i>{{reportNum}}</i></span>
					    <reports @getReportTotal="getReportTotal"></reports>
					</el-tab-pane>
					<el-tab-pane name="six">
					    <span slot="label">知识产权&nbsp;<i>{{knowNum}}</i></span>
					    <knowledgeRight @getKnowTotal="getKnowTotal"></knowledgeRight>
					</el-tab-pane>
				</el-tabs>

				<div class="content-aside">
	    			<div class="content-aside-top">
	    				<ul class="content-aside-list">
	    					<li :class="num==0?'active':''" @click="toSelected(0)">自然人股东</li>
	    					<li :class="num==1?'active':''" @click="toSelected(1)">董监高</li>
	    				</ul>
	    				<div class="top-manager" v-if="num==0">
	    					<el-carousel type="card" height="136px" :autoplay="isTrue" indicator-position="none" arrow="always">
							    <el-carousel-item v-for="(val,i) in mainKeyData" :key="i+val.name">
							    	<div class="img"><img :src="val.logo"/></div>
							    	<div class="inf"><h3>{{val.name}}</h3>
							    		<!--<p>他有<span style="color: red">2</span>家公司，分布如下</p>-->
							    	</div>
							    	<!--<div class="top-manager-com">广东&nbsp;1家&nbsp;&nbsp;<span>深圳市腾讯计算机系统有限公司</span></div>-->
							    </el-carousel-item>
							</el-carousel>
							<!--<div class="arrow"><span>&lt;</span><span>&gt;</span></div>-->
	    				</div>
	    				<div class="top-manager" v-if="num==1">
	    					<el-carousel type="card" height="136px" :autoplay="isTrue" indicator-position="none" arrow="always">
							    <el-carousel-item v-for="(val,i) in mainPerData" :key="i+val.name">
							    	<div class="img"><img :src="val.logo"/></div>
							    	<div class="inf"><h3>{{val.name}}</h3>
							    		<!--<p>他有<span style="color: red">2</span>家公司，分布如下</p>-->
							    	</div>
							    	<!--<div class="top-manager-com">广东&nbsp;1家&nbsp;&nbsp;<span>深圳市腾讯计算机系统有限公司</span></div>-->
							    </el-carousel-item>
							</el-carousel>
							<!--<div class="arrow"><span @click="prev">&lt;</span><span>&gt;</span></div>-->
	    				</div>
	    			</div>
	    			<div class="content-aside-mid" v-for="(val,index) in datas" :key="index+val.PosterImgURL" @click="toBannerOne"><img :src="val.PosterImgURL"/></div>
	    			<div class="content-aside-bot" v-for="(val,index) in bannerData" :key="index+val.PosterImgURL" @click="toBannerTwo"><img :src="val.PosterImgURL"/></div>
	        	</div>
        	</div>

        </div>
        <!--底部-->
        <publicBottom></publicBottom>
	</div>
</template>

<script>
	import topState from "~/components/common/topState";
	import search from "~/components/common/search";
	import publicBottom from "~/components/common/publicBottom";
	import getd from "~/store/ajaxAPI/getData.js";
	//引入相应组件
	import information from "~/components/common/businessQuery/information";
	import law from "~/components/common/businessQuery/law";
	import investment from "~/components/common/businessQuery/investment";
	import reports from "~/components/common/businessQuery/reports";
	import operation from "~/components/common/businessQuery/operation";
	import knowledgeRight from "~/components/common/businessQuery/knowledgeRight";
	export default{
		data(){
			return{
				activeName:"first",
				num:0,//0：自然人股东，1：董监高
				isTrue:false,
				isShowDetail:false, //开庭公告是否展示
				infNum:0,//基本信息条数
				lawNum:0,//法律诉讼条数
				operationNum:0,//经营状况条数
				investmentNum:0,//对外投资条数
				reportNum:0,//企业年报条数
				knowNum:0,//知识产权条数
				headInf:{},//头部基本信息
				mainKeyData:[],//自然人股东
				mainPerData:[],//董监高
				datas:[],//轮播图1
				bannerData:[],//轮播图2
				qParams:"",//qq分享参数
				xParams:"",//新浪分享参数
				wxShow:false,//微信分享二维码是否显示
			}
		},
		components:{
			topState,
	    	search,
	    	publicBottom,
	    	information,//基本信息
	    	law,//法律诉讼
	    	investment,//对外投资
	    	reports,//企业年报
	    	operation,//经营状况
	    	knowledgeRight//知识产权
	    },
//	    computed:{
//		    ...mapState(
//		        "businessQuery",{
//		            'personAllCompany':'personAllCompany',
//		        },
//		    ),
//		},
	    mounted(){
			//添加qq
	    	var p = {
					url:location.href,
					summary:'',/*分享摘要(可选)*/
					title:'【分享来自@微企宝】'+this.$route.query.searchName,/*分享标题(可选)*/
					pics:'', /*分享图片的路径(可选)*/
				};
			var s = [];
			for(var i in p){
				if (i=="pics") {
					s.push(i + '=' + p[i]);
				}else{
					s.push(i + '=' + encodeURIComponent(p[i]||''));
				}
			}
			this.qParams = s.join('&');
			//添加新浪
			var params = {
				title:'【分享来自@微企宝】'+this.$route.query.searchName,//分享标题
				url:location.href,//分享链接
				content:'utf-8',//页面编码
				pic:"",//分享图片
			}
			var a =[];
			for(var i in params){
				a.push(i + '=' + encodeURIComponent(params[i]||''));
			}
			this.xParams = a.join('&');
			//生成微信分享二维码
			var qrcode = new QRCode(document.getElementById("qr-code"), {
			    text: location.href,
			    width:120,
			    height:120,
			    colorDark : "#000000",
			    colorLight : "#ffffff",
			    correctLevel : QRCode.CorrectLevel.L,
			});
	    	// 轮播图：YCGGW01
			var params = {
				params:{
					type:'0',//pc 为0  app 为1
					code:"YCGGW01"
				}
			};
			getd.getHomeBanner(params)
			.then((res) => {
				this.datas = res.data.list;
			})
			//轮播图：YCGGW02
			var param = {
				params:{
					type:'0',//pc 为0  app 为1
					code:"YCGGW02"
				}
			};
			getd.getHomeBanner(param)
			.then((res) => {
				this.bannerData = res.data.list;
			})
	    	//人所有公司
//			let args = "name="+this.$route.query.comName+"&humanName="+;
//			var param = {
//	            method:'get',
//	            params:{
//		            "params":{
//		                api:'4',
//		                args:encodeURI(args)
//		            }
//		        }
//			}
	    },
		methods:{
//			...mapActions(
//	            "businessQuery",{
//	                'business_personAllCompany':'business_personAllCompany',
//	            },
//	        ),
			//跳转链接
			toHref(url){
				// window.open("http://"+url);
				if(url.indexOf("https")==-1){
					window.open("https://"+url);
				}else{
					window.open(url);
				}

			},
			//微信分享二维码隐藏
			toLeaveWx(){
				this.wxShow = false;
			},
			//微信分享二维码是否显示
	    	toShowWx(){
	    		this.wxShow = true;
	    	},
			//广告1
			toBannerOne(){
				location.href = this.datas[0].LinkWebSite;
			},
			//广告2
			toBannerTwo(){
				location.href = this.bannerData[0].LinkWebSite;
			},
	        //侧边栏下一页
//			prev(){
//
//			},
			//基本信息传值
			getTotal(num){
				// console.log(num,'嘻嘻I嘻嘻嘻')
				this.mainKeyData = num.mainKeyData;
				this.mainPerData = num.mainPerData;
				this.infNum = num.total;
				this.headInf = num;
			},
			//法律诉讼传值
			getLawTotal(num){
				this.lawNum = num;
			},
			//经营状况传值
			getOperationTotal(num){
				this.operationNum = num;
			},
			//对外投资传值
			getInvestmentTotal(num){
				this.investmentNum = num;
			},
			//企业年报传值
			getReportTotal(num){
				this.reportNum = num;
			},
			//知识产权传值
			getKnowTotal(num){
				this.knowNum = num;
			},
			//tab点击事件
			handleClick(){

			},
			//刷新
			toReload(){
				this.$router.go(0);
			},
			//侧边栏tab切换
			toSelected(num){
				this.num = num;
			},
	        //开庭公告页面传值
		}
	}
</script>

<style lang="less" scoped>
	@import "~assets/common/index.less";
	@import "./business.less";
	.el-carousel__item{
	    background: url(../../assets/images/businessQuery/person-back.png);
	}
	.top-manager .is-active{
		border: 0;
		height: 136px!important;
		background: url(../../assets/images/businessQuery/person-back.png)!important;
		width: 225px;
		left: -40px;
	}
	.top-manager .el-carousel__item{
		width: 225px;
		padding-left: 15px;
	}
</style>
