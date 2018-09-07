<template>
<!-- 侧边栏 -->
  <div class="slide">
		<div class="left_div clearfix">
			<h3>账号设置</h3>
			<nuxt-link to="/account_setting/information"><div class="nav" @click="information">基本资料<img src="~assets/images/account-setting/right_arrow_white.png" ></div></nuxt-link>
			<nuxt-link to="/account_setting/receiverAddress"><div class="nav" @click="receiverAddress">收货地址<img src="~assets/images/account-setting/right_arrow_white.png"></div></nuxt-link>
			<nuxt-link to="/account_setting/safeCenter"><div class="nav" @click="safeCenter">安全中心<img src="~assets/images/account-setting/right_arrow_white.png" ></div></nuxt-link>
		</div>
  </div>
</template>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../pages/personalCenter/personalCenterCommon.less";

	.slide .left_div .nuxt-link-active{
		color: white !important;
		width: 130px;
		height: 30px;
		line-height: 30px;
		border-radius: 4px;
		background: #FF3E08;
		display: block;
		&:hover{
			color: white;
		}
		.nav{
			color: white;
		}
	}
	.margin1200 .left_div .nav:hover{
		color: #FF3E08;
	}
	.slide .left_div .nuxt-link-active .nav:hover{
		color: #fff;
	}
</style>
<script>
export default {
  data(){
      return{
				
      }
  },
  methods:{
  	//安全中心
  	safeCenter(){
  		this.$router.push('/account_setting/safeCenter');
  	},
  	//收货地址
  	receiverAddress(){
  		this.$router.push('/account_setting/receiverAddress');
  	},
  	//基本资料
  	information(){
  		this.$router.push('/account_setting/information');
  	},
  	aTab(data,data1){
  		$(".nav").css({"background":"#fff","color":"#666",});
  		$(data1.target).css({"background":"#ff3e08","color":"#fff"});
  	}
  }
}
</script>
