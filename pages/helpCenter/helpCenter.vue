<template>
	<div id="helpCenter">
		<navigationBar :topShopData="topShopData" :serverList="serverList"></navigationBar>
		<div class="helpCenter">
			<div class="helpCenterL">
				<h2>帮助中心</h2>
				<span>help center</span>
				<ul>
					<li>
						<span>服务指南</span>
						<ul>
							<li class="helpCenterLi" @click="helpCenter(this,$event)">下单流程</li>
							<li class="helpCenterLi" @click="helpCenter(this,$event)">常见问题</li>
							<li class="helpCenterLi" @click="helpCenter(this,$event)">发票说明</li>
						</ul>
					</li>
					<li>
						<span>支付方式</span>
						<ul>
							<li class="helpCenterLi" @click="helpCenter(this,$event)">在线支付</li>
							<li class="helpCenterLi" @click="helpCenter(this,$event)">其它支付</li>
						</ul>
					</li>
					<li>
						<span>特色服务</span>
						<ul>
							<li class="helpCenterLi" @click="helpCenter(this,$event)">商事查询</li>
							<li class="helpCenterLi" @click="helpCenter(this,$event)">满意评分</li>
							<li class="helpCenterLi" @click="helpCenter(this,$event)">业务进度</li>
						</ul>
					</li>
				</ul>
			</div>
			<div class="helpCenterR">
				<div class="flowPath">
					<!--<h2>下单流程</h2>-->
					<img src="~assets/images/helpCenter/flowPath.png">
				</div>
				<div class="issue">
					<!--<h2>常见问题</h2>-->
					<img src="~assets/images/helpCenter/issue.png">
				</div>
				<div class="explain">
					<!--<h2>发票说明</h2>-->
					<img src="~assets/images/helpCenter/explain.png">
				</div>
				<div class="onlinePayment">
					<!--<h2>在线支付</h2>-->
					<img src="~assets/images/helpCenter/onlinePayment.png">
				</div>
				<div class="elsePayment">
					<!--<h2>其它支付</h2>-->
					<img src="~assets/images/helpCenter/elsePayment.png">
				</div>
				<div class="commercialQuery">
					<!--<h2>商事查询</h2>-->
					<img src="~assets/images/helpCenter/commercialQuery.png">
				</div>
				<div class="satisfaction">
					<!--<h2>满意评分</h2>-->
					<img src="~assets/images/helpCenter/satisfaction.png">
				</div>
				<div class="businessProgress">
					<!--<h2>业务进度</h2>-->
					<img src="~assets/images/helpCenter/businessProgress.png">
				</div>
			</div>
		</div>
		<div class="c-ftContainWrapindex">
			<publicBottom></publicBottom>
		</div>
	</div>
</template>

<script>
	import navigationBar from "../../components/common/navigationBar";
	import publicBottom from "../../components/common/publicBottom";
	import getd from "~/store/ajaxAPI/getData.js";
	export default {
   data() {
      return {
		topShopData: [],//顶部nav导航
	        serverList: [],//商品三级分类
		}
    },
    components:{
    	navigationBar,
    	publicBottom,
		},
		created() {
			let mealParam = {
		        params: {}
			}
	      getd.getTopList(mealParam)
	      	.then((res)=>{
	      		this.topShopData = res.data.list;
	      	})
	      	.catch(error => {
//		        console.log(error)
	        });

	        getd.getServerClass()
	      	.then((res)=>{
	      		this.serverList = res.data.list;
	      	})
	      	.catch((e)=>{
//		      	console.log('报错',e)
		      })
		},
    methods:{
    	helpCenter(data,data1){
    		var indexT = $(data1.target).text();
    		var indexL = $(".helpCenterR").children("div").length;
    		$(".helpCenterLi").css({"color":"#4d4d4d"});
    		$(data1.target).css({"color":"#ff3e08"});
    		if(indexT == "下单流程"){
    			$(".flowPath").show();
    			$(".flowPath").siblings('div').hide();
    		}else if(indexT == "常见问题"){
    			$(".issue").show();
    			$(".issue").siblings('div').hide();
    		}else if(indexT == "发票说明"){
    			$(".explain").show();
    			$(".explain").siblings('div').hide();
    		}else if(indexT == "在线支付"){
    			$(".onlinePayment").show();
    			$(".onlinePayment").siblings('div').hide();
    		}else if(indexT == "其它支付"){
    			$(".elsePayment").show();
    			$(".elsePayment").siblings('div').hide();
    		}else if(indexT == "商事查询"){
    			$(".commercialQuery").show();
    			$(".commercialQuery").siblings('div').hide();
    		}else if(indexT == "满意评分"){
    			$(".satisfaction").show();
    			$(".satisfaction").siblings('div').hide();
    		}else if(indexT == "业务进度"){
    			$(".businessProgress").show();
    			$(".businessProgress").siblings('div').hide();
    		}
    	}
    },
    filters:{

    }
}
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "~assets/common/index.less";
    @import "./helpCenter.less";
</style>
