<template>
	<div class="impliedContract">
		<!-- 默认合同公共头部 -->
          <personalCenterHead></personalCenterHead>
          <publicPendantR></publicPendantR>
          <div class="announcement">
			<div>特别声明：本合同为平台自动生成的默认合同，仅供参考，如有需要请签署具有法律效力的电子合同（右侧签署电子合同）。</div>
		</div>
		<div class="margin1200">
              <div class="location">
              	<nuxt-link to="/personalCenter/personalCenterIndex">我的微企宝</nuxt-link> &gt; 
              	<nuxt-link to="/personalCenter/allOrder">订单中心</nuxt-link> &gt; 
              	<span class="first" @click="toDetail">订单详情页</span> &gt; 
              	<span>默认合同</span>
              </div>
              
              <!--内容-->
              <div class="detail">
              	<header class="detail-head">
              		<h1>合同详情</h1>
              		<span class="contract" @click="toContract"><i class="iconSee"></i>签署电子合同</span>
              	</header>
              	<!--合同内容-->
              	<div class="contract-content" id="contractContent">
              		<iframe name="frame" id="frame" :src="'/web/viewer.html?url='+ecPdfUrl" style="width:100%;height:100%;"></iframe>
              		<!--<img style="margin-left: 58px;" src="https://manage.wqbol.com/Upload/contractTemplate/Img/7abb8fb5-8974-4986-88a2-273f5a7b7e87.png"/>
              		<img style="margin-left: 58px;" src="https://manage.wqbol.com/Upload/contractTemplate/Img/a45abee8-2d27-4976-b5d7-3309a936b97b.png"/>-->
              	</div>
              	<div class="footer">
              		<div class="mediacy">
	              		<div id="print" class="btn first" @click="printEc">打印</div>
	              		<div class="btn" @click="downloadEc">下载</div>
              		</div>
              	</div>
              </div>
		</div>
		<publicBottom></publicBottom>
	</div>
</template>

<script>
	import personalCenterHead from "~/components/common/personalCenterHead";
	import publicBottom from "~/components/common/publicBottom";
	import publicPendantR from "~/components/common/publicPendantR";
	import getData from '~/store/ajaxAPI/getData.js';
	
	export default{
		data(){
			return{
				ecPdfUrl:"",//pdf地址
			}
		},
		mounted(){
			//默认合同
			let params = {
				Id:this.$route.query.id
			}
			getData.getDefaultContractByOrderId(params)
			.then((res)=>{
				this.ecPdfUrl = res.data.PdfUrl;
			})
		},
		methods:{
			//返回订单详情
			toDetail(){
				this.$router.go(-1);
			},
			//签署电子合同
		    toContract(){
		        let _id = this.$route.query.id;
		        if(this.$route.query.isSignContract){
		            this.$router.push({path:"/contract/contract",query:{id:_id,isSign:0}});
		        }else{
		            this.$router.push({path:"/contract/contract",query:{id:_id,isSign:1}});
		        }
		    },
		    //打印
		    printEc(){
//				this.Printpart('contractContent')
				window.frames["frame"].document.getElementById("print").click();  
		    },
		    //下载
		    downloadEc(){
		    	window.frames["frame"].document.getElementById("download").click();  
		    },
		    //打印局部区域
		    Printpart(id_str){
				var el = document.getElementById(id_str);
				var iframe = document.createElement('IFRAME');
				var doc = null;
				iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;');
				document.body.appendChild(iframe);
				doc = iframe.contentWindow.document;
				doc.write('<div>' + el.innerHTML + '</div>');
				doc.close();
				iframe.contentWindow.focus();
				iframe.contentWindow.print();
				if (navigator.userAgent.indexOf("MSIE") > 0){
					document.body.removeChild(iframe);
				}
			}
		},
		components: {
		    personalCenterHead,
		    publicBottom,
		    publicPendantR
		}
	}
</script>

<style lang="less" scoped>
	@import "./personalCenter_index.less";
	@import "./impliedContract.less";
</style>