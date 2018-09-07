<template>
<!-- 侧边栏 -->
  <div class="slide">
		<div class="left_div clearfix">
			<h3>消息分类</h3>
			<router-link to="/systemMessage"><div class="nav">系统消息<img src="~assets/images/account-setting/right_arrow_white.png" ></div></router-link>
			<router-link to="/account_setting/receiverAddress"><div class="nav">活动消息<img src="~assets/images/account-setting/right_arrow_white.png"></div></router-link>
		</div>
  </div>
</template>

<style lang="less" type="stylesheet/css" scoped>
	@import "./personalCenterCommon.less";
	.slide .left_div .router-link-active{
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
</style>

