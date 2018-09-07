<template>
	<div id="eContract">
		<!--头部公用部分-->
		<div class="c-headerContainWrap">
			<navigationBar :recordList="recordList" :topShopData="topShopData" :serverList="serverList"></navigationBar>
		</div>
		
		<!--主体-->
		<!-- 头部banner -->
		<div class="banner">
			<div class="des">
				<h1>微企宝电子合同平台</h1>
				<div class="desText">
					一站式电子合同签署平台，完全符合《合同法》、《电子签名法》要求，法律效力=纸质合同。
				</div>
				<div class="openSysteam" @click="toContract">免费开启签署体验</div>
			</div>
		</div>
		<!-- 合同服务 -->
		<div class="contractService">
			<h2>专业的电子合同服务</h2>
			<div class="themLine"></div>
			<div class="conten">				
				<ul>
					<li>
						<img src="../../assets/images/eContract/htqs.png" alt="">
						<p class="midletext">合同签署</p>
						<p>无需面对面，极速签发有效电子合同;</p>
						<p>实名认证+数字证书，确保身份真实;</p>
						<p>领先的数字签名技术，有效防篡改</p>
					</li>
					<li>
						<img src="../../assets/images/eContract/htgl.png" alt="">
						<p class="midletext">合同管理</p>
						<p>提供合同检索、归档、下载等免费功能; </p>
						<p>降低合同管理的仓储成本和人力成本; </p>
						<p>海量存储空间，合同管理一站解决</p>
					</li>
					<li>
						<img src="../../assets/images/eContract/zxby.png" alt="">
						<p class="midletext">在线编辑</p>
						<p>云端合同编辑，省心又省时; </p>
						<p>合同模板上传，在线修改更方便; </p>
						<p>500+合同模板，满足各类签署需求</p>
					</li>
					<li>
						<img src="../../assets/images/eContract/qylcz.png" alt="">
						<p class="midletext">区域链存证</p>
						<p>领先的区块链存证平台;</p>
						<p>为客户提供专业的电子合同证据链;</p>
						<p>与微软(中国) 、Onchain联合成立法链</p>
					</li>
				</ul>		
			</div>
		</div>
		<!-- 分析图 -->
		<div class="analysisWrap">
			<div class="contenWrap">
				<h2>微企宝，让签约更高效</h2>
				<div class="themLine"></div>
				<div class="left_top desItem">
					<p>便捷高效</p>
					支持电脑网页、手机网页、微信、APP随时签发、查阅合同，高效协同。
				</div>
				<div class="left_bottom desItem">
					<p>安全稳定</p>
					领先的信息运维机制严守数据安全；数据传输军用级别加密防止信息泄露。
				</div>
				<div class="right_top desItem">
					<p>合法合规</p>
					严格遵照《电子签名法》相关规定，平台电子合同法律效力获得仲裁/司法机构认可。
				</div>
				<div class="right_bottom desItem">
					<p>应用广泛</p>
					标准API接入，完美兼容各类系统。法大大平台在线签署，满足个性化需求。
				</div>

			</div>
			
		</div>

		<!-- 合作商轮播 -->
		<div class="cursors">
			<h2>他们都在用</h2>
			<div class="themLine"></div>
			<div class="carouselWrap">
				<el-carousel height="108px" >
					<el-carousel-item v-for="(item,index) in imgArr" :key="index">
						<div class="partnerCarousel">
							<a v-for="data in item"><img :data-src="data.img" class="parenterImg lazyload"></a>
						</div>
					</el-carousel-item>
				</el-carousel>
			</div>
		</div>

		<!-- 底部 -->
		<div class="contenFoot">
			<p>即刻注册，开启电子合同新时代！</p>
			<div class="openSysteam" @click="toContract">免费开启签署体验</div>
		</div>

	</div>
</template>

<script>
	import navigationBar from "~/components/common/navigationBar";
	import getd from "~/store/ajaxAPI/getData.js";
	import {ecPort} from "~/store/ajaxAPI/perPort.js";
	import tool from "~/assets/lib/tool.js";
	export default{
		data(){
			return{
				recordList:[],//获取访问记录
				topShopData:[],//顶部商品列表
				serverList:[],//全部分类
				imgArr:[
					[{img:'/images/logo/partner_pic1.jpg'},{img:'/images/logo/partner_pic2.jpg'},	{img:'/images/logo/partner_pic3.jpg'},{img:'/images/logo/partner_pic4.jpg'},{img:'/images/logo/partner_pic5.jpg'}],
					[{img:'/images/logo/partner_pic6.jpg'},{img:'/images/logo/partner_pic7.jpg'},{img:'/images/logo/partner_pic8.jpg'},{img:'/images/logo/partner_pic9.jpg'},{img:'/images/logo/partner_pic10.jpg'}],
					[{img:'/images/logo/partner_pic11.jpg'},{img:'/images/logo/partner_pic12.jpg'},{img:'/images/logo/partner_pic13.jpg'},{img:'/images/logo/partner_pic14.jpg'},{img:'/images/logo/partner_pic15.jpg'}],
					[{img:'/images/logo/partner_pic16.jpg'},{img:'/images/logo/partner_pic17.jpg'},{img:'/images/logo/partner_pic18.jpg'},{img:'/images/logo/partner_pic19.jpg'}]
				]
			}
		},
		components:{
			navigationBar
		},
		mounted(){
			let mealParam = {
		      	params:{
		
		      	}
		      }
			//获取访问记录
			getd.getSearchRecordList(mealParam)
	      	.then((res)=>{
	      		this.recordList = res.data.list.slice(0,4);
	      	})
	      	.catch(error => {
//		        console.log(error)
		    });
		    
		    //顶部商品列表
		    getd.getTopList(mealParam)
	      	.then((res)=>{
	      		this.topShopData = res.data.list;
	      	})
	      	.catch(error => {
//		        console.log(error)
		    });
		    
		    //全部分类
		    getd.getServerClass()
	      	.then((res)=>{
	      		this.serverList = res.data.list;
	      	})
	      	.catch((e)=>{
//		      	console.log('报错',e)
		    })
		},
		methods:{
			toContract(){
				if(tool.loadFromLocal("CustomerMesg","ALL")){
					//设置cookie
					let obj = tool.loadFromLocal("CustomerMesg","ALL");
					tool.addCookie(JSON.stringify(obj),24);
					location.href = `${ecPort}`;
				}else{
					this.$router.push({path:'/loginAndRegister/login',query:{ec:1}});
				}
				
				
			}
		}
	}
</script>

<style type="stylesheet/css" scoped lang="less">
	@import "~assets/common/index.less";
	@import "./eContract.less";
	
</style>