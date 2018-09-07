<template><!--头部广告-->
	<div class="c-header" id="c-header" v-if="topAdData.length">
		<!-- 广告悬浮栏 -->
		<a :href="data.LinkWebSite" v-for="data in topAdData" @click.prevent>
			<img :src="data.PosterImgURL">
			<div class="title">
				<span @click="toDetail">查询详情</span>
				<button class="close" @click="closeAd">×</button>
			</div>
		</a>
	</div>
</template>

<script>
export default {
	data(){
		return {

		}
	},
	props:{
		topAdData:Array//首页顶部广告
	},
	methods:{
		closeAd(){
			$("#c-header").css("display","none");
		},
		toDetail(){
			//查看详情
			location.href = this.topAdData[0].LinkWebSite;
		}
	}
}
</script>

<style lang="less" type="stylesheet/css" scoped>
	.c-header{
		width: 100%;
		// height: 57px;
		img{
			width: 99.81%;
			height: 100%;
		}
	}
	.title{
		position: relative;
	    float: right;
	    right: 300px;
	    top: -37px;
	    z-index: 999;
	}
	.title span{
		color: white;
		cursor: pointer;
	}
	.close{
		position: absolute;
		right: -15px;
    	top: -12px;
		background: transparent;
		color: #ffffff;
		z-index: 999;
	}
</style>