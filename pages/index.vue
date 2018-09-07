<style type="stylesheet/css" scoped lang="less">
  @import "~assets/common/index.less";
  @import "./home.less";


</style>

<template>
  <div id="home">
		<!-- 公用top 整体 -->
		<div class="c-headerContainWrap">
			<topAdvertising :topAdData="topAdData"></topAdvertising>
			<publicPendantR></publicPendantR>
			<navigationBar :isTrue="true" :recordList="recordList" :topShopData="topShopData" :serverList="serverList"></navigationBar>

		</div>
		<!-- 主页开始 -->
		<div class="indexWrap">
			<!-- 主页内容主体外层 -->
			<div class="mainWrap">
				<div class="main">
					<!-- 主页轮播/广告外层 -->
					<div class="main-adWrap">
						<div class="main-bannerWrap">
							<!-- 轮播图 -->
							<div class="bannerSwiperWrap">
								<div class="main-banner swiper-container">
									<no-ssr>
									  <el-carousel :interval="5000" arrow="hover">
									    <el-carousel-item :key="index" v-for="(data,index) in datas" >
									      <a :href="data.LinkWebSite" @click.prevent>
									       	<img :data-src="data.PosterImgURL"  class="lazyload" alt="" @click="toDetail(data.LinkWebSite)"/>
									      </a>
									    </el-carousel-item>
									  </el-carousel>
									</no-ssr>
								</div>
							</div>
							<!-- /轮播图 -->
						</div>
						<div class="otherWrap">
							<!-- 用户登录 -->
							<div class="otherWrap_img">
								 <a :href="data.LinkWebSite" v-for="data in loginBanner" @click.prevent>
								 	<img @click="toDetail(data.LinkWebSite)" :data-src="data.PosterImgURL" class="lazyload">
								 </a>
							</div>
							<!--登录状态-->
							<div class="registerIs" v-if="isLogin">
								<div class="logOut" @click="quitLogin">退出</div>
								<div class="registerMessage">
									<div class="registerImg">
										<img v-if="userMesg.HeadPicPath" class="lazyload" :data-src="userMesg.HeadPicPath" @click="toOrder"/>
                    <img v-else src="~assets/images/tabBar/default_head.png" @click="toOrder"  />
									</div>
									<span @click="toOrder">你好，{{userMesg.Nickname}}</span>
									<span>欢迎来到微企宝！</span>
								</div>
								<div class="orderFormMessage">
									<ul>
										<li @click="toPaid">
											<span>{{paidNum}}</span>
											<span>待支付</span>
										</li>
										<li @click="toHand">
											<span>{{handNum}}</span>
											<span>处理中</span>
										</li>
										<li @click="toEvaluated">
											<span>{{evaluatedNum}}</span>
											<span>待评价</span>
										</li>
									</ul>
								</div>
							</div>
							<!--未登录状态    end-->
							<!--未登录状态-->
							<div class="otherWrap_register" else>
								<div class="otherWrap_QR" @click="otherWrap(this,$event)">
									<img class="otherWrap_show" src="~assets/images/tabBar/QR_code1.png">
									<img class="otherWrap_hide" src="~assets/images/tabBar/computer.png">
								</div>
								<form>
									<div class="otherWrap_input otherWrap_show">
										<input type="text" placeholder="请输入你的手机号码" v-model="loginForm.Mobile"/>
										<label><img src="~assets/images/home/name.png" /></label>
										<input type="password" placeholder="请输入账号密码" v-model="loginForm.password" @keyup.enter="submitLogin()"/>
										<label><img src="~assets/images/home/password.png" /></label>
										<input class="otherWrap_sbt" type="button" value="登录" @keydown.enter="submitLogin()" @click="submitLogin()" :class="{'active': loginForm.Mobile&&loginForm.password}"/>
										<!-- <input class="otherWrap_sbt" type="button" value="登录" @click="submitLogin()" :class="loginForm.Mobile&&loginForm.password?'active':''"/> -->
										<span @click="register"  class="left">立即注册</span>
										<span  @click="forgetPW()"  class="right">忘记密码</span>
									</div>
									<div class="otherWrap_input otherWrap_hide">
										<div class="QR_code123">
											<!-- <img v-if="getQR_code != false" :src="getQR_code" /> -->
											<img class="lazyload" :data-src="getQR_code" />
										</div>
										<div class="openWqb">打开<label>微企宝</label>扫一扫登录</div>
										<span @click="register" class="left">立即注册</span>
										<span  @click="forgetPW()"  class="right">忘记密码</span>
									</div>
								</form>
								<div class="thirdParty">
									<span @click="qqLogin">QQ</span>
									<span @click="wxAccredit">微信</span>
									<span @click="allowWeiboLogin">微博</span>
								</div>
							</div>
							<!--未登录状态  end-->
							<!-- /用户登录 -->
						</div>
						<!--公司核名-->
						<div class="CompanyNameCheck">
							<input type="text" placeholder="公司注册，免费核名，抢先注册" v-model="nuclearName"/>
							<span class="heming">公司核名</span>
							<button @click="message(this,$event)">免费查询</button>
							<div class="message">
								<div class="messageWrap">
									<div class="messageWrap_top">
										<div>公司核名</div>
										<span @click="close"></span>
									</div>
									<div class="messageWrap_C">今日已有<label>{{accessNum.DayCount}}</label>人获取查询结果，总查询人数已达<label>{{accessNum.Count}}</label>人</div>
									<form @submit.prevent="submitCelect">
										<ul>
											<li><i>*</i>企业名称：<input type="text" id="companyName" placeholder="请输入企业名称" v-model="nuclearName"></li>
											<li><i>*</i>联系电话：<input type="number" id="contactNumber" placeholder="请输入联系电话" v-model="tel" @blur="checkTel(tel)" ></li>
											<li>
												<input type="submit" value="查询">
												<input type="button" @click="close" value="取消">
											</li>
										</ul>
									</form>
								</div>
							</div>
						</div>
						 <!-- /公司核名     end-->
						<div id="carousel" class="carousel">
			        <ul class="scroll-content" :style="{ top }">
		            <li v-for="item in prizeList" ref="activeLi">{{item.name}}</li >
			        </ul>
				    </div>
					</div>
					<!-- /主页轮播/广告外层 -->

					<!--精选套餐-->
					<div class="choicenessCombo">
						<div class="choiceness_one choiceness">
							<span>精选套餐</span>
							<span>省去选择烦恼</span>
						</div>
						<div class="choiceness" v-for="(data,i) in mealData">
							<nuxt-link class="redirect" :to="'/productDetails/'+data.Id+'/'+data.Type">
								<div class="choiceness_img"><img class="lazyload" :data-src="data.PCThumbImgURL"></div>
								<div class="choiceness_content">
									<span>{{data.Name}}</span>
									<span>{{data.Title}}</span>
									<div class="content_bottom">
										<span><label>￥</label>{{data.Price}}</span>
										<span class="buyNow" :class="i == mealIndex ? 'active' : ''" @mouseenter="buyNowEnter(i)" @mouseleave="buyNowLeave">立即抢购</span>
									</div>
								</div>
							</nuxt-link>
						</div>
					</div>
					<!-- /精选套餐-->

					<!--1F 我要创业-->
					<div class="startUpBusiness">
						<div class="startUpBusiness_top">
							<span>1F</span>
							{{oneF.Name}}
						</div>
						<div class="startUpBusiness_list">
							<span>{{oneChildName1}}</span>
							<div class="startUpBusiness_color business">
								<nuxt-link class="redirect" :to="'/productDetails/'+oneLeftCol.ProductId+'/0'">
									<div class="business_left">
										<span>{{oneLeftCol.Name}}</span>
										<span>{{oneLeftCol.Title}}</span>
										<span>￥{{oneLeftCol.Price}}</span>
										<span :class="oneFLeftIndex? 'active':''" @mouseenter="oneFEnter(1)" @mouseleave="oneFLeave(1)">立即查看</span>
									</div>
									<div class="business_right">
										<!-- <img :src="oneLeftCol.PCImage"> -->
										<img src="~static/images/column/1-1.png" alt="">
									</div>
								</nuxt-link>
							</div>
							<div class="registerSite">
								<ul>
									<li v-for="(data,i) in oneLeftColPro" :key="data.id" @mouseenter="oneEnter(i,1)" @mouseleave="oneLeave(1)">
										<nuxt-link class="redirect" :to="'/productDetails/'+data.ProductId+'/0'">
											<span :class="i == oneIndex? 'active':''">{{data.Name}}</span>
											<span>{{data.Title}}</span>
											<span>￥{{data.Price}}</span>
										</nuxt-link>
									</li>
								</ul>
							</div>
						</div>
						<div class="startUpBusiness_list">
							<span>{{oneChildName2}}</span>
							<div class="startUpBusiness_color1 business">
								<nuxt-link class="redirect" :to="'/productDetails/'+oneMidCol.ProductId+'/0'">
									<div class="business_left">
										<span>{{oneMidCol.Name}}</span>
										<span>{{oneMidCol.Title}}</span>
										<span>￥{{oneMidCol.Price}}</span>
										<span :class="oneFMidIndex? 'active':''" @mouseenter="oneFEnter(2)" @mouseleave="oneFLeave(2)">立即查看</span>
									</div>
									<div class="business_right">
										<!-- <img :src="oneMidCol.PCImage"> -->
										<img src="~static/images/column/1-2.png" alt="">
									</div>
								</nuxt-link>
							</div>
							<div class="registerSite">
								<ul>
									<li v-for="(data,i) in oneMidColPro" :key="data.id" @mouseenter="oneEnter(i,2)" @mouseleave="oneLeave(2)">
										<nuxt-link class="redirect" :to="'/productDetails/'+data.ProductId+'/0'">
											<span :class="i == oneChildrenIndex? 'active':''">{{data.Name}}</span>
											<span>{{data.Title}}</span>
											<span>￥{{data.Price}}</span>
										</nuxt-link>
									</li>
								</ul>
							</div>
						</div>
						<div class="startUpBusiness_list">
							<span>{{oneChildName3}}</span>
							<div class="startUpBusiness_color2 business">
								<nuxt-link class="redirect" :to="'/productDetails/'+oneRightCol.ProductId+'/0'">
									<div class="business_left">
										<span>{{oneRightCol.Name}}</span>
										<span>{{oneRightCol.Title}}</span>
										<span>￥{{oneRightCol.Price}}</span>
										<span :class="oneFRightIndex? 'active':''" @mouseenter="oneFEnter(3)" @mouseleave="oneFLeave(3)">立即查看</span>
									</div>
									<div class="business_right">
										<!-- <img :src="oneRightCol.PCImage"> -->
										<img src="~static/images/column/1-3.png" alt="">
									</div>
								</nuxt-link>
							</div>
							<div class="registerSite">
								<ul>
									<li v-for="(data,i) in oneRightColPro" :key="data.id" @mouseenter="oneEnter(i,3)" @mouseleave="oneLeave(3)">
										<nuxt-link class="redirect" :to="'/productDetails/'+data.ProductId+'/0'">
											<span :class="i == oneRightIndex? 'active':''">{{data.Name}}</span>
											<span>{{data.Title}}</span>
											<span>￥{{data.Price}}</span>
										</nuxt-link>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<!--/1F 我要创业-->

					<!--广告1-->
					<div class="advertising" v-for="data in midAdData1">
						<a :href="data.LinkWebSite">
							<img class="lazyload" :data-src="data.PosterImgURL" @click="toDetail(data.LinkWebSite)">
						</a>
					</div>
					<!--广告1 end-->

					<!-- 限时抢购 -->
					<div class="limiteTimeWrap"  @mouseenter="purchaseFn(this,$event)" @mouseleave="purchaseFd(this,$event)" v-if="false">
						<div class="limiteTimeWrap_left">
							<span>限时抢购</span>
							<span>本场剩余</span>
							<span class="timeSpan">{{hours}}</span>:
							<span class="timeSpan">{{min}}</span>:
							<span class="timeSpan">{{seconds}}</span>
						</div>
						<div class="limiteTimeWrap_right" @mouseenter="toChange" @mouseleave="toChangeHide">
							<div class="previousPage" v-show="arrowShow" @click.stop="prevPga"></div>
							<div class="nextPage" v-show="arrowShow" @click.stop="nextPga"></div>
							<ul id="limiteTimeWrap_right_list" :style="styleObject">
					      <li v-for="(data,i) in saleData.Pro_SalesPromotionListViewModels" :key="data.id">
					      	<a href="/cart/settleAccounts?isNowBuy=yes" @click.prevent>
										<div class="limiteContent">
											<span>{{data.Name}}</span>
											<span>￥{{data.Price}}</span>
											<span @click="onNowBuy(data.ProductId,data.Price,saleData.Id)" :class="i == saleIndex ? 'active' : ''" @mouseenter="onNowBuyEnter(i)" @mouseleave="onNowBuyLeave">立即购买</span>
										</div>
										<div class="limiteImg"><img class="lazyload" :data-src="data.Img"></div>
										<div class="sold">
											<span>已售</span>
											<span>{{parseInt(data.SalesAmount/data.Amount)}}%</span>
										</div>
									</a>
								</li>
							</ul>
						</div>
					</div>
					<!-- 限时抢购 end -->

					<!--2F 创业发展模块-->
					<div class="startCommonality">
						<div class="startUpBusiness_top">
							<span>2F</span>
							{{twoF.Name}}
							<!--<div class="startLi">
								<li @mouseenter="startLiJ(this,$event)" @mouseleave="startLiC(this,$event)">注册公司</li>
								<li @mouseenter="startLiJ(this,$event)" @mouseleave="startLiC(this,$event)">公司服务</li>
								<li @mouseenter="startLiJ(this,$event)" @mouseleave="startLiC(this,$event)">变更服务</li>
							</div>-->
						</div>
						<div class="startCommonality_content">
							<div class="content_L" @mouseover="pause(1)" @mouseout="bannerBegin(1)" >
								<span>{{twoF.Name}}</span>
								<span>{{twoFList.Title}}</span>
								<div class="content_roll">
									<ul id="lunboWrap">
										<li :class="arr1[index]" v-for="(data,index) in arr1" :key="data.id">
											<nuxt-link class="redirect" :to="'/productDetails/'+columnObj1.ProductId+'/0'" >
												<span>{{columnObj1.Name}}</span>
												<span>{{columnObj1.Title}}</span>
												<div style="width: 112px; height: 92px;margin: 0 auto;">
													<img class="lazyload" :data-src="columnObj1.PCImage"/>
												</div>
											</nuxt-link>
										</li>
										<li></li>
									</ul>
									<p id="lunboWrapIndex">
										<strong class="preBtn" @click="preFn(1)">ㄑ</strong>{{arrCurrentIndexOne}}/{{leftColPro.length}}<strong  class="nextBtn" @click="nextFn(1)">ㄑ</strong>
									</p>
								</div>
							</div>
							<div class="content_C">
								<div class="content_C_T" @mouseenter="contentJ(this,$event,i,2)" @mouseleave="contentC(this,$event,2)" v-for="(data,i) in midColPro" :key="data.id">
									<nuxt-link class="redirect" :to="'/productDetails/'+data.ProductId+'/0'">
										<div class="content_C_text">
											<span :class="i == secondIndex ? 'active' : ''">{{data.Name}}</span>
											<span>{{data.Title}}</span>
											<span>￥{{data.Price}}</span>
											<span>￥{{data.OldPrice}}</span>
										</div>
										<div class="content_C_img">
											<img class="lazyload" :data-src="data.img">
										</div>
									</nuxt-link>
								</div>
							</div>
							<div class="content_R" v-for="data in rightColPro" :key="data.id">
								<nuxt-link class="redirect" :to="'/productDetails/'+data.ProductId+'/0'">
									<div class="content_R_img">
										<img class="lazyload" :data-src="twoFList.RightPosterImageUrl">
									</div>
									<div class="content_R_text">
										<span>{{data.Name}}</span>
										<span>{{data.Title}}</span>
										<span :class="secondRightIndex?'active':''" @mouseenter="lookEnter(2)" @mouseleave="lookLeave(2)">查看详情</span>
									</div>
								</nuxt-link>
							</div>
						</div>
					</div>
					<!--2F 创业发展模块 end-->

					<!--3F 创业发展模块-->
					<div class="startCommonality startCommonality_3F">
						<div class="startUpBusiness_top"><span>3F</span>{{threeF.Name}}
							<!--<div class="startLi">
								<li @mouseenter="startLiJ(this,$event)" @mouseleave="startLiC(this,$event)">商标注册</li>
								<li @mouseenter="startLiJ(this,$event)" @mouseleave="startLiC(this,$event)">高新服务</li>
								<li @mouseenter="startLiJ(this,$event)" @mouseleave="startLiC(this,$event)">专利服务</li>
								<li @mouseenter="startLiJ(this,$event)" @mouseleave="startLiC(this,$event)">版权服务</li>
							</div>-->
						</div>
						<div class="startCommonality_content">
							<div class="content_L" @mouseover="pause(2)" @mouseout="bannerBegin(2)">
								<span>{{threeF.Name}}</span>
								<span>{{threeFList.Title}}</span>
								<div class="content_roll">
									<ul id="lunboWrap">
										<li :class="arr2[index]" v-for="(data,index) in arr2" :key="data.id">
											<nuxt-link class="redirect" :to="'/productDetails/'+columnObj2.ProductId+'/0'">
												<span>{{columnObj2.Name}}</span>
												<span>{{columnObj2.Title}}</span>
												<div style="width: 112px; height: 92px;margin: 0 auto;"><img class="lazyload" :data-src="columnObj2.PCImage"/></div>
											</nuxt-link>
										</li>
										<li></li>
									</ul>
									<p id="lunboWrapIndex">
										<strong class="preBtn" @click="preFn(2)">ㄑ</strong>{{arrCurrentIndexTwo}}/{{threeLeftColPro.length}}<strong  class="nextBtn" @click="nextFn(2)">ㄑ</strong>
									</p>
								</div>
							</div>
							<div class="content_C">
								<div class="content_C_T" @mouseenter="contentJ(this,$event,i,3)" @mouseleave="contentC(this,$event,3)" v-for="(data,i) in threeMidColPro" :key="data.id">
									<nuxt-link class="redirect" :to="'/productDetails/'+data.ProductId+'/0'">
										<div class="content_C_text">
											<span :class="i == thirdIndex ? 'active' : ''">{{data.Name}}</span>
											<span>{{data.Title}}</span>
											<span>￥{{data.Price}}</span>
											<span>￥{{data.OldPrice}}</span>
										</div>
										<div class="content_C_img">
											<img class="lazyload" :data-src="data.img">
										</div>
									</nuxt-link>
								</div>
							</div>
							<div class="content_R" v-for="data in threeRightColPro" :key="data.id">
								<nuxt-link class="redirect" :to="'/productDetails/'+data.ProductId+'/0'">
									<div class="content_R_img">
										<img class="lazyload" :data-src="threeFList.RightPosterImageUrl">
									</div>
									<div class="content_R_text">
										<span>{{data.Name}}</span>
										<span>{{data.Title}}</span>
										<span :class="thirdRightIndex?'active':''" @mouseenter="lookEnter(3)" @mouseleave="lookLeave(3)">查看详情</span>
									</div>
								</nuxt-link>
							</div>
						</div>
					</div>
					<!--3F 创业发展模块 end-->

					<!--4F 创业发展模块-->
					<div class="startCommonality startCommonality_4F">
						<div class="startUpBusiness_top"><span>4F</span>{{fourF.Name}}
							<!--<div class="startLi">
								<li @mouseenter="startLiJ(this,$event)" @mouseleave="startLiC(this,$event)">记账报税</li>
								<li @mouseenter="startLiJ(this,$event)" @mouseleave="startLiC(this,$event)">财税服务</li>
								<li @mouseenter="startLiJ(this,$event)" @mouseleave="startLiC(this,$event)">出具各类报告</li>
								<li @mouseenter="startLiJ(this,$event)" @mouseleave="startLiC(this,$event)">其他服务</li>
							</div>-->
						</div>
						<div class="startCommonality_content">
							<div class="content_L" @mouseover="pause(3)" @mouseout="bannerBegin(3)">
								<span>{{fourF.Name}}</span>
								<span>{{fourFList.Title}}</span>
								<div class="content_roll">
									<ul id="lunboWrap">
										<li :class="arr3[index]" v-for="(data,index) in arr3" :key="data.id">
											<nuxt-link class="redirect" :to="'/productDetails/'+columnObj3.ProductId+'/0'">
												<span>{{columnObj3.Name}}</span>
												<span>{{columnObj3.Title}}</span>
												<div style="width: 112px; height: 92px;margin: 0 auto;"><img class="lazyload" :data-src="columnObj3.PCImage"/></div>
											</nuxt-link>
										</li>
										<li></li>
									</ul>
									<p id="lunboWrapIndex">
										<strong class="preBtn" @click="preFn(3)">ㄑ</strong>{{arrCurrentIndexThird}}/{{fourLeftColPro.length}}<strong  class="nextBtn" @click="nextFn(3)">ㄑ</strong>
									</p>
								</div>
							</div>
							<div class="content_C">
								<div class="content_C_T" @mouseenter="contentJ(this,$event,i,4)" @mouseleave="contentC(this,$event,4)" v-for="(data,i) in fourMidColPro" :key="data.id">
									<nuxt-link class="redirect" :to="'/productDetails/'+data.ProductId+'/0'">
										<div class="content_C_text">
											<span :class="i == fourIndex ? 'active' : ''">{{data.Name}}</span>
											<span>{{data.Title}}</span>
											<span>￥{{data.Price}}</span>
											<span>￥{{data.OldPrice}}</span>
										</div>
										<div class="content_C_img">
											<img class="lazyload" :data-src="data.img">
										</div>
									</nuxt-link>
								</div>
							</div>
							<div class="content_R" v-for="data in fourRightColPro" :key="data.id">
								<nuxt-link class="redirect" :to="'/productDetails/'+data.ProductId+'/0'">
									<div class="content_R_img">
										<img class="lazyload" :data-src="fourFList.RightPosterImageUrl">
									</div>
									<div class="content_R_text" >
										<span>{{data.Name}}</span>
										<span>{{data.Title}}</span>
										<span :class="fourRightIndex?'active':''" @mouseenter="lookEnter(4)" @mouseleave="lookLeave(4)">查看详情</span>
									</div>
								</nuxt-link>
							</div>
						</div>
					</div>
					<!--4F 创业发展模块 end-->

					<!--广告2-->
					<div class="advertising" v-for="data in midAdData2">
						<img class="lazyload" :data-src="data.PosterImgURL" @click="toDetail(data.LinkWebSite)">
					</div>
					<!--广告2 end-->

					<!-- 金牌顾问 提供全方位企业服务-->
					<div class="recommendWrap">
						<hr />
						<span>金牌顾问 提供全方位企业服务</span>
						<div class="recommendText">数千人专业顾问团队，全程为你省力！统一咨询电话：<label>400-8822-991</label></div>
						<div class="information" @mouseenter="enterRc(this,$event)" @mouseleave="leaveRc(this,$event)">
							<div class="information_min">
								<div class="information_img">
									<img src="~assets/images/home/gao.jpg" />
								</div>
								<div class="information_name">
									高顾问
								</div>
								<div class="_ZH">综合顾问</div>
								<div class="information_text">10年工商财税经验。专长：记账报税、财税疑难、审计税审等服务。</div>
								<!-- <button @mouseenter="enterBut(this,$event)" @mouseleave="leaveBut(this,$event)">在线咨询</button> -->
							</div>
						</div>
						<div class="information" @mouseenter="enterRc(this,$event)" @mouseleave="leaveRc(this,$event)">
							<div class="information_min">
								<div class="information_img">
									<img src="~assets/images/home/tan.jpg" />
								</div>
								<div class="information_name">
									谭顾问
								</div>
								<div class="_ZH">综合顾问</div>
								<div class="information_text">8年报税记账经验。专长：记账报税、财税疑难、年检年报等服务。</div>
								<!-- <button @mouseenter="enterBut(this,$event)" @mouseleave="leaveBut(this,$event)">在线咨询</button> -->
							</div>
						</div>
						<div class="information" @mouseenter="enterRc(this,$event)" @mouseleave="leaveRc(this,$event)">
							<div class="information_min">
								<div class="information_img">
									<img src="~assets/images/home/deng.jpg" />
								</div>
								<div class="information_name">
									邓顾问
								</div>
								<div class="_ZH">综合顾问</div>
								<div class="information_text">5年财税顾问经验。专长：工商注册、知识产权、银行开户等服务。</div>
								<!-- <button @mouseenter="enterBut(this,$event)" @mouseleave="leaveBut(this,$event)">在线咨询</button> -->
							</div>
						</div>
						<div class="information" @mouseenter="enterRc(this,$event)" @mouseleave="leaveRc(this,$event)">
							<div class="information_min">
								<div class="information_img">
									<img src="~assets/images/home/huang.jpg" />
								</div>
								<div class="information_name">
									易顾问
								</div>
								<div class="_ZH">综合顾问</div>
								<div class="information_text">8年财务和税务经验。专长：税务筹划、项目预算，财税疑难等服务。</div>
								<!-- <button @mouseenter="enterBut(this,$event)" @mouseleave="leaveBut(this,$event)">在线咨询</button> -->
							</div>
						</div>
					</div>
					<!-- /专业顾问 一对一VIP服务 end-->

					<!-- 微企宝数据模块 -->
					<div class="giftData">
						<hr />
						<span>微企宝数据</span>
						<div class="dataList">
							<ul>
								<li>{{webData.EnterpriseCustomerNum>9999?"9999":webData.EnterpriseCustomerNum}} <label v-show="webData.EnterpriseCustomerNum>9999">+</label></li>
								<li>{{webData.CooperativePartner>9999?"9999":webData.CooperativePartner}} <label v-show="webData.CooperativePartner>9999">+</label></li>
								<li>{{webData.TransactionTotal>9999?"9999":webData.TransactionTotal}} <label v-show="webData.TransactionTotal>9999">+</label></li>
								<li>{{webData.NumberParks>9999?"9999":webData.NumberParks}} <label v-show="webData.NumberParks>9999">+</label></li>
							</ul>
							<ul>
								<li>企业客户数</li>
								<li>合作伙伴数</li>
								<li>成交总数</li>
								<li>入驻工业园数</li>
							</ul>
						</div>
					</div>
					<!-- /微企宝数据模块 end -->

					<!-- 新闻资讯模块 -->
					<div class="coreWrap">
						<div class="coreWrap_title">
							<span>最新新闻</span>
							<a href="/news" target="_blank">
								更多新闻&gt;&gt;
							</a>
						</div>
						<div class="journalism">
							<div class="journalism_left" @mouseleave="journalism(this,$event,'0','left')">
								<ul>
									<li @mouseenter="enterLism(this,$event,index,'left')" class="journalismLi " :class="{'currentCheck':currentIndexL === index, 'video': data.NewsType}" v-for="(data,index) in comNewsList">
										<a :href="'/news/newsDetail?id='+data.Id" target="_blank">
											<div class="journalism_img"><img class="lazyload" :data-src="data.ThumbImgURL"></div>
											<div class="journalism_title">{{data.Title}}</div>
											<div class="journalism_text">{{data.Subtitle}}</div>
											<div class="journalism_date">{{data.ReviewDateTime | simpleDateFormat }}</div>
										</a>
									</li>
								</ul>
							</div>
							<div class="journalism_right" @mouseleave="journalism(this,$event,'0','right')">
								<ul>
									<li @mouseenter="enterLism(this,$event,index,'right')" class="journalismLi" :class="{'currentCheck':currentIndexR === index, 'video': data.NewsType}" v-for="(data,index) in indNewsList">
										<a :href="'/news/newsDetail?id='+data.Id" target="_blank">
											<div class="journalism_img"><img class="lazyload" :data-src="data.ThumbImgURL"></div>
											<div class="journalism_title">{{data.Title}}</div>
											<div class="journalism_text">{{data.Subtitle}}</div>
											<div class="journalism_date">{{data.ReviewDateTime | simpleDateFormat }}</div>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<!-- /新闻资讯模块 end-->

					<!--合作伙伴-->
					<div class="partner">
						<hr />
						<span>合 作 伙 伴</span>
							<el-carousel height="108px">
								<el-carousel-item v-for="(item,index) in imgArr" :key="index">
									<div class="partnerCarousel">
										<a v-for="data in item"><img :data-src="data.img" class="parenterImg lazyload"></a>
									</div>
								</el-carousel-item>
							</el-carousel>
					</div>
					<!--合作伙伴 end-->
				</div>
				<!-- /主页内容主体外层 -->
			</div>
		</div>
		<!-- /主页结束 -->

		<!-- 公用bottom 整体 -->
		<div class="c-ftContainWrapindex">
			<publicBottom></publicBottom>
		</div>
		<!--/公用bottom 整体 -->

		<!--跳转商置查询-->
  </div>
</template>

<script>

	import publicPendantR from "~/components/common/publicPendantR";
	import navigationBar from "~/components/common/navigationBar";
	import publicBottom from "~/components/common/publicBottom";
	import topAdvertising from "~/components/common/topAdvertising";

	import getd from "~/store/ajaxAPI/getData.js"
	import { mapState,mapActions,mapGetters} from 'vuex';
	import tool from '~/assets/lib/tool.js'
	import CryptoJS from 'crypto-js'

	import {loginDialog_scanIng , loginDialog_qqLogin,loginDialog_wxAccredit,loginDialog_allowWeiboLogin} from '~/store/ajaxAPI/vueDynamicParams.js';
	import axios from "axios";
	import { getDataPort } from "~/store/ajaxAPI/perPort.js";

	var setTimeoutIdLogin = null;
	var count = 0;
	var lunboTimeIdOne = null;
	var lunboTimeIdTwo = null;
	var lunboTimeIdThird = null;
	var  ii = 0 ;
	var  jj = 0 ;
	var  xx = 0 ;
	var globalID;

	export default {
		head () {
			return {
				title: this.Title,
				meta: [
							{ hid: 'description', name: 'description', content: this.Description },
							{ hid: 'keywords', name: 'keywords', content: this.KeyWords },
				],
			}
		},

		asyncData ({ params }) {

    	var Description = '微企宝' //seo
    	var KeyWords = '微企宝' //seo
    	var Title = '微企宝' //seo

      let mealParam = {
      	params:{

      	}
      }

      var mealData = [] //套餐数据
			var topAdData = [] //顶部广告
			var datas = [] //轮播图
			var midAdData1 = [] //中部广告1
			var midAdData2 = [] //中部广告2
			var loginBanner = [] //登陆广告
      var webData = {}//获取访问数量
			var saleData = {}//限时抢购
			var comNewsList = []//公司新闻
      let indNewsList = [] //行业新闻
			var recordList = [] //获取访问记录
			var topShopData = [] //顶部商品列表
      var serverList = [] //全部分类3级导航

      //首页获取第一个栏目
      let oneF = {};//1F父栏目
      let oneChildName1 = "";//1F子栏目1
      let oneChildName2 = "";//1F子栏目2
      let oneChildName3 = "";//1F子栏目3
      let	oneLeftColPro = [];//1F栏目左侧
      let	oneMidColPro = [];//1F栏目中间
      let	oneRightColPro = [];//1F栏目右侧
      let oneLeftCol = {};
      let oneMidCol = {};
      let oneRightCol = {};

      //首页获取第一个栏目
      let twoF = {};//2F栏目列表
      let threeF = {};//3F
      let fourF = {};//4F
      let twoFList = {};//2F栏目列表
      let leftColPro = [];//2F栏目左侧
			let midColPro = [];//2F栏目中间
			let rightColPro = [];//2F栏目右侧
      let threeFList = {};//3F栏目列表
			let threeLeftColPro = [];//3F栏目左侧
			let threeMidColPro = [];//3F栏目中间
			let threeRightColPro = [];//3F栏目右侧
			let fourFList = {};//4F栏目列表
	    let fourLeftColPro = [];//4F栏目左侧
	    let fourMidColPro = [];//4F栏目中间
	    let fourRightColPro = [];//4F栏目右侧

      return axios.all([seo(), getMealData(),getHomeBanner5(),getHomeBanner4(),getHomeBanner3(),getHomeBanner2(),getHomeBanner(),getServerClass(),getWebSites(),getSalesList(),getTopList(),getSearchRecordList(),getHomeNewsList(),getComNewsList(),getFirstList(),getColList()])
		  .then(axios.spread(function (acct, perms) {
		    //返回数据
	      return{
	      	Description : Description,
					KeyWords : KeyWords,
					Title  : Title,

					mealData: mealData,//套餐数据

					topAdData: topAdData,//顶部广告

					datas: datas,//轮播图

					midAdData1: midAdData1,//中部广告1
					midAdData2: midAdData2,//中部广告2
					loginBanner: loginBanner,//登陆广告

					webData: webData,//获取访问数量

					saleData: saleData,//限时抢购

					comNewsList: comNewsList,//公司新闻
					indNewsList: indNewsList,//行业新闻

					oneF: oneF,//首页获取第一个栏目
					oneChildName1: oneChildName1,//1F子栏目1
					oneChildName2: oneChildName2,//1F子栏目2
					oneChildName3: oneChildName3,//1F子栏目3
					oneLeftColPro: oneLeftColPro,//1F栏目左侧
					oneMidColPro: oneMidColPro,//1F栏目中侧
					oneRightColPro: oneRightColPro,//1F栏目右侧
					oneLeftCol: oneLeftCol,//1F栏目右侧
					oneMidCol: oneMidCol,//1F栏目右侧
					oneRightCol: oneRightCol,//1F栏目右侧

					twoF: twoF,//2F栏目列表
					threeF: threeF,//3F栏目列表
					fourF: fourF,//4F栏目列表

					twoFList: twoFList,//2F栏目列表
					leftColPro: leftColPro,//2F栏目左侧
					midColPro: midColPro,//2F栏目中侧
					rightColPro: rightColPro,//2F栏目右侧

					threeFList: threeFList,//3F栏目列表
					threeLeftColPro: threeLeftColPro,//3F栏目左侧
					threeMidColPro: threeMidColPro,//3F栏目中侧
					threeRightColPro: threeRightColPro,//3F栏目右侧

					fourFList: fourFList,//4F栏目列表
					fourLeftColPro: fourLeftColPro,//4F栏目左侧
					fourMidColPro: fourMidColPro,//4F栏目中侧
					fourRightColPro: fourRightColPro,//4F栏目右侧

					//获取访问记录
					recordList: recordList,

					//顶部商品列表
					topShopData : topShopData,

					//全部分类3级导航
					serverList: serverList,
	      }
		  }));

      //seo
      function seo(){
      	// seo列表
		    let param = {
			    	params:{
		        code:'Index',//根据数据字典传递：商品-Product,套餐-Package，新闻-News，首页—Index
						tempId: '',//商品/套餐/新闻Id
		      }
		    }
      	return getd.seo(param)
      	.then((res)=>{
      		if (res.data.list.length) {
						Description = res.data.list[0].Description;
						KeyWords = res.data.list[0].KeyWords;
						Title = res.data.list[0].Title;
					} else {
						Description = '微企宝首页' //seo
						KeyWords = '微企宝' //seo
						Title = '微企宝'
					}
      	})
      	.catch((e)=>{
//	    		console.log(e)
	    	})
      }
      //套餐数据
      function getMealData(){
      	return getd.getMealData(mealParam)
      	.then((res)=>{
      		mealData = res.data.list;
      	})
      	.catch(error => {
//	        console.log(error)
	      });
      }

      function getHomeBanner5(){
      	//顶部广告：DBGGW
				let topParams = {
					params:{
						type:0,//pc 成为0  app 为1
						code:"DBGGW"
					}
				};
      	return getd.getHomeBanner(topParams)
      	.then((res)=>{
      		topAdData = res.data.list;
      	})
      	.catch(error => {
//	        console.log(error)
	      });
      }
      function getHomeBanner4(){
      	//轮播图：GG00101
				let topParam = {
					params:{
						type:0,//pc 成为0  app 为1
						code:"GG00101"
					}
				};
      	return getd.getHomeBanner(topParam)
      	.then((res)=>{
      		datas = res.data.list;
      	})
      	.catch(error => {
//	        console.log(error)
	      });
      }
      function getHomeBanner3(){
      	//中部广告1：ZBGGW1
				let midParams1 = {
					params:{
						type:0,//pc 成为0  app 为1
						code:"ZBGGW1"
					}
				};
      	return getd.getHomeBanner(midParams1)
      	.then((res)=>{
      		midAdData1 = res.data.list;
      	})
      	.catch(error => {
//	        console.log(error)
	      });
      }
      function getHomeBanner2(){
      	//中部广告2：ZBGGW2
				let midParams2 = {
					params:{
						type:0,//pc 成为0  app 为1
						code:"ZBGGW2"
					}
				};
      	return getd.getHomeBanner(midParams2)
      	.then((res)=>{
      		midAdData2 = res.data.list;
      	})
      	.catch(error => {
//	        console.log(error)
	      });
      }
      function getHomeBanner(){
      	//登陆广告：SYDLSFGGW
				let midParams3 = {
					params:{
						type:0,//pc 成为0  app 为1
						code:"SYDLSFGGW"
					}
				};
      	return getd.getHomeBanner(midParams3)
      	.then((res)=>{
      		loginBanner = res.data.list;
      	})
      	.catch(error => {
//	        console.log(error)
	      });
      }
      //获取访问数量
      function getWebSites(){
      	return getd.getWebSites(mealParam)
      	.then((res)=>{
      		webData = res.data.list;
      	})
      	.catch(error => {
//	        console.log(error)
	      });
      }
      //限时抢购
      function getSalesList(){
      	return getd.getSalesList(mealParam)
      	.then((res)=>{
      		saleData = res.data.list[0];
      	})
      	.catch(error => {
//	        console.log(error)
	      });
      }
      //全部分类
      function getServerClass(){
      	return getd.getServerClass()
      	.then((res)=>{
      		serverList = res ? res.data.list : [];
      	})
      	.catch((e)=>{
//	      	console.log('报错',e)
	      })
      }
      //顶部商品列表
      function getTopList(){
      	return getd.getTopList(mealParam)
      	.then((res)=>{
      		topShopData = res.data.list;
      	})
      	.catch(error => {
//	        console.log(error)
	      });
      }
      //获取访问记录
      function getSearchRecordList(){
      	return getd.getSearchRecordList(mealParam)
      	.then((res)=>{
      		recordList = res.data.list.slice(0,4);
      	})
      	.catch(error => {
//	        console.log(error)
	      });
      }
      function getHomeNewsList(){
      	//请求最新新闻前十条(行业新闻)
      	let newData = {
					params:{
						pageSize: 5,
	      		pageIndex: 2
					}
				}
      	return getd.getHomeNewsList(newData)
      	.then((res)=>{
      		indNewsList = res.data.list;
      	})
      	.catch(error => {
//	        console.log(error)
	      });
      }
      function getComNewsList(){
      	//请求最新新闻前十条(公司新闻)
				let newParam = {
					params:{
						pageSize: 5,
	      		pageIndex: 1
					}
				}
      	return getd.getHomeNewsList(newParam)
      	.then((res)=>{
      		comNewsList = res.data.list;
      	})
      	.catch(error => {
//	        console.log(error)
	      });
      }

      function getFirstList(){
      	return getd.getFirstList(mealParam)
      	.then((res)=>{
      		//一级栏目标题
	      	oneF = res.data.list[0];
	      	let onefParam = {
								params:{
									Id:res.data.list[0].Id
								}
						}

	      	//获取第一个栏目下的子栏目
	      	return getd.getFirstDetailList(onefParam)
	      	.then((result)=>{
	      		oneChildName1 = result.data.list[0].Name;
	      		oneChildName2 = result.data.list[1].Name;
	      		oneChildName3 = result.data.list[2].Name;


	      		function GetColumnListOne(){
	      			//1F左
							let param1 = {
				    			params:{
				    				Id:result.data.list[0].Id
				    			}
				    		}
							return getd.GetColumnList(param1)
		      		.then((response)=>{
		      			oneLeftCol = response.data.list[0].ProColumnListPCModels.slice(0,1)[0];
		      			oneLeftColPro = response.data.list[0].ProColumnListPCModels.slice(1,3);
		      		})
							.catch((e)=>{
//			      		console.log(e)
			      	})
	      		}

	      		function GetColumnListSec(){
	      			//1F中
							let param2 = {
				    			params:{
				    				Id:result.data.list[1].Id
				    			}
				    		}
							return getd.GetColumnList(param2)
		      		.then((val)=>{
		      			oneMidCol = val.data.list[0].ProColumnListPCModels.slice(0,1)[0];
		      			oneMidColPro = val.data.list[0].ProColumnListPCModels.slice(1,3);
		      		})
							.catch((e)=>{
//			      		console.log(e)
			      	})
	      		}

						function GetColumnListThird(){
	      			//1F右
							let param3 = {
				    			params:{
				    				Id:result.data.list[2].Id
				    			}
				    		}
							return getd.GetColumnList(param3)
		      		.then((response)=>{
		      			oneRightCol = response.data.list[0].ProColumnListPCModels.slice(0,1)[0];
		      			oneRightColPro = response.data.list[0].ProColumnListPCModels.slice(1,3);
		      		})
							.catch((e)=>{
//			      		console.log(e)
			      	})
	      		}

						return axios.all([GetColumnListOne(),GetColumnListSec(),GetColumnListThird()])
					  .then(axios.spread(function(acct,perms){

					  }))

	      	})
	      	.catch((e)=>{
//	      		console.log(e)
	      	})
      	})
      	.catch(error => {
//	        console.log(error)
	      });
      }


      function getColList(){
      	return getd.getColList(mealParam)
      	.then((res)=>{
      		twoF = res.data.list[0];
	      	threeF = res.data.list[1];
	      	fourF = res.data.list[2];

	      		function GetColumnOne(){
			  			//2F
							let param1 = {
				    			params:{
				    				Id:res.data.list[0].Id
				    			}
				    		}
							return getd.GetColumnList(param1)
		      		.then((response)=>{
		      			twoFList = response.data.list[0];
		      			leftColPro = response.data.list[0].ProColumnListPCModels.slice(6);
		      			midColPro = response.data.list[0].ProColumnListPCModels.slice(0,5);
		      			rightColPro = response.data.list[0].ProColumnListPCModels.slice(5,6);
		      		})
							.catch((e)=>{
//			      		console.log(e)
			     		})
			  		}

			  		function GetColumnSec(){
			  			//3F
							let param2 = {
					  			params:{
					  				Id:res.data.list[1].Id
					  			}
					  		}
							return getd.GetColumnList(param2)
		      		.then((val)=>{
		      			threeFList = val.data.list[0];
		      			threeLeftColPro = val.data.list[0].ProColumnListPCModels.slice(6);
		      			threeMidColPro = val.data.list[0].ProColumnListPCModels.slice(0,5);
		      			threeRightColPro = val.data.list[0].ProColumnListPCModels.slice(5,6);
		      		})
							.catch((e)=>{
//			      		console.log(e)
			      	})
			  		}

						function GetColumnThird(){
			  			//4F
							let param3 = {
					  			params:{
					  				Id:res.data.list[2].Id
					  			}
					  		}
							return getd.GetColumnList(param3)
		      		.then((response)=>{
		      			fourFList = response.data.list[0];
		      			fourLeftColPro = response.data.list[0].ProColumnListPCModels.slice(6);
		      			fourMidColPro = response.data.list[0].ProColumnListPCModels.slice(0,5);
		      			fourRightColPro = response.data.list[0].ProColumnListPCModels.slice(5,6);
		      		})
							.catch((e)=>{
//			      		console.log(e)
			      	})
			  		}

						return axios.all([GetColumnOne(),GetColumnSec(),GetColumnThird()])
					  .then(axios.spread(function(acct,perms){

					  }))
      	})
      	.catch(error => {
//	        console.log(error)
	      });
      }
	  },

		data() {
			return {
				getQR_code:false,//二维码图片
				prizeList: [
					{ name: "136****9405 办理了 股份公司注册"},
					{ name: "137****1111 办理了 深圳公司注册"},
					{ name: "138****5989 办理了 新四板挂牌"},
					{ name: "139****0904 办理了 企业社保开户"},
					{ name: "130****2458 办理了 前海公司注册" },
					{ name: "136****5978 办理了 个体工商户注册"},
					{ name: "137****6451 办理了 高新认定"},
					{ name: "138****6751 办理了 审计报告"},
					{ name: "139****3302 办理了 自动记账报税"},
					{ name: "130****2405 办理了 税审报告"},
					{ name: "136****5152 办理了 验资报告"},
					{ name: "137****8888 办理了 香港公司变更"},
					{ name: "138****1235 办理了 环保批文"},
					{ name: "139****2267 办理了 发票章"},
					{ name: "130****0260 办理了 登报服务"},
					{ name: "136****1114 办理了 自动记账报税"},
					{ name: "137****2561 办理了 高新认定"},
					{ name: "138****5551 办理了 个体工商户注册"},
					{ name: "139****8876 办理了 新四板挂牌"},
					{ name: "130****1015 办理了 自动记账报税"},
					{ name: "131****0411 办理了 深圳公司注册"}
				],
				activeIndex: 0,
				arr1 :["lunbo_first","lunbo_second","lunbo_third"],//活动数组class
				arr2 :["lunbo_first","lunbo_second","lunbo_third"],//活动数组class
				arr3 :["lunbo_first","lunbo_second","lunbo_third"],//活动数组class
				columnObj1:{},//栏目2F对象
				columnObj2:{},//栏目3F对象
				columnObj3:{},//栏目4F对象
				arrCurrentIndexOne:1,//活动索引
				arrCurrentIndexTwo:1,//活动索引
				arrCurrentIndexThird:1,//活动索引
				autoControl:false,

				nuclearName:"",//公司核名
				tel:"",//公司核名电话
				len:4,//限时抢购长度
				hours:"",//时
				min:"",//分
				seconds:"",//秒
				arrowShow:false,//促销箭头隐藏
					currentIndexL:0,//新闻咨询默认选择
					currentIndexR:0,//新闻咨询默认选择
				styleObject: {
					transition:"1s",
					transform:"translateX(0px)"
				},

				loginForm: {
					Mobile:'',
					password: '',
				},
				isLogin: false,
				imgArr:[
					[{img:'/images/logo/partner_pic1.jpg'},{img:'/images/logo/partner_pic2.jpg'},	{img:'/images/logo/partner_pic3.jpg'},{img:'/images/logo/partner_pic4.jpg'},{img:'/images/logo/partner_pic5.jpg'}],
					[{img:'/images/logo/partner_pic6.jpg'},{img:'/images/logo/partner_pic7.jpg'},{img:'/images/logo/partner_pic8.jpg'},{img:'/images/logo/partner_pic9.jpg'},{img:'/images/logo/partner_pic10.jpg'}],
					[{img:'/images/logo/partner_pic11.jpg'},{img:'/images/logo/partner_pic12.jpg'},{img:'/images/logo/partner_pic13.jpg'},{img:'/images/logo/partner_pic14.jpg'},{img:'/images/logo/partner_pic15.jpg'}],
					[{img:'/images/logo/partner_pic16.jpg'},{img:'/images/logo/partner_pic17.jpg'},{img:'/images/logo/partner_pic18.jpg'},{img:'/images/logo/partner_pic19.jpg'}]
				],
				mealIndex:5,//精选套餐记录下标
				saleIndex:-1,//限时抢购记录下标
				secondIndex:-1,//2F记录下标
				thirdIndex:-1,//3F记录下标
				fourIndex:-1,//4F记录下标
				oneIndex:-1,//1F记录下标
				oneChildrenIndex:-1,//1F中部记录下标
				oneRightIndex:-1,//1F右边记录下标
				secondRightIndex:false,//2F右边记录下标
				thirdRightIndex:false,//3F右边记录下标
				fourRightIndex:false,//4F右边记录下标
				oneFLeftIndex:false,//1F左侧立即查看记录下标
				oneFMidIndex:false,//1F中间立即查看记录下标
				oneFRightIndex:false,//1F右侧立即查看记录下标
			}
		},
		components:{
			publicPendantR,
			topAdvertising,
			navigationBar,
			publicBottom,
		},
		computed:{
			//返回顶部
			...mapGetters({
				immediateList:'home/home/immediateList',
				codeObj:'home/home/codeObj',
			}),
			top() {
			return - this.activeIndex * 30 + 'px';
			},
			userMesg(){
				if(this.$store.state.home.home.userMesg == undefined){
					return  false;
				}else{
					return this.$store.state.home.home.userMesg;
				}
			},//当前登录用户信息
			//待评价
			evaluatedNum(){
				return this.$store.state.home.home.evaluatedNum;
			},//待支付
			paidNum(){
				return this.$store.state.home.home.paidNum;
			},//处理中数量
			handNum(){
				return this.$store.state.home.home.handNum;
			},//公司核名访问数量
			accessNum(){
				return this.$store.state.home.home.accessNum;
			}
		},
		mounted(){
			//聊天弹窗
			;(function (W, D) {
			W.ec_corpid = '7331675';
			W.ec_cskey = 'SqGFFE7Glw76x6szdw';
			W.ec_scheme = '0';
			var s = D.createElement('script');
			s.charset = 'utf-8';
			s.src = '//1.staticec.com/kf/sdk/js/ec_cs.js';
			D.getElementsByTagName('head')[0].appendChild(s);
			})(window, document);
			
			//			ec
			var ecDom = document.getElementById("ec--session-wrapper");
			var ecsDom = document.getElementById("ec--cs-wrapper");
			if(ecDom){
				ecDom.style.display = "block";
			}
			if(ecsDom){
				ecsDom.style.display = "block";
			}
			
			//百度统计
			var _hmt = _hmt || [];
			(function() {
			  var hm = document.createElement("script");
			  hm.src = "https://hm.baidu.com/hm.js?11cd4dc7b1a8d7a17257474d9f845065";
			  var s = document.getElementsByTagName("script")[0]; 
			  s.parentNode.insertBefore(hm, s);
			})();
			

			//限时抢购倒计时处理
			if (this.saleData) {
				var timer = setInterval(()=>{
					let t1 = new Date(this.saleData.EndTime).getTime();
					let t2 = new Date().getTime();
					let t3 = new Date(t1-t2);//结束时间与当前时间差值
					let t4 = Math.floor(t3 / 1000 / 60 / 60 % 24);//时
					let t5 = t3.getMinutes();//分
					let t6 = t3.getSeconds();//秒
					let t7 = t3.getDate();//天
					this.hours = (t4+t7*24).toString().length>1?(t4+t7*24):"0"+(t4+t7*24);
					this.min = t5.toString().length>1?t5:"0"+t5;
					this.seconds = t6.toString().length>1?t6:"0"+t6;
					if (t7==0&&t4==0&&t5==0&&t6==0) {
						clearInterval(timer);
					}
				},1000)
			}

			//2F、3F、4F栏目轮播图处理
			// 2f初始数据
			if(this.leftColPro.length!=0){
				this.columnObj1 = this.leftColPro[0];
				//添加静态图
				this.midColPro.forEach((val,i)=>{
					var num = i+1;
					val.img = '/images/column/2-'+ num +'.png';
				})
				// 当商品数小于3个时
				if(this.leftColPro.length==2){
					this.arr1 = ["lunbo_first","lunbo_second"];
				}else if (this.leftColPro.length==1) {
					this.arr1 = ["lunbo_first"];
				}
				// 3f初始数据
				this.columnObj2 = this.threeLeftColPro[0];
				//添加静态图
				this.threeMidColPro.forEach((val,i)=>{
					var num = i+1;
					val.img = '/images/column/3-'+ num +'.png';
				})
				// 当商品数小于3个时
				if(this.threeLeftColPro.length==2){
					this.arr2 = ["lunbo_first","lunbo_second"];
				}else if (this.threeLeftColPro.length==1) {
					this.arr2 = ["lunbo_first"];
				}
				// 4f初始数据
				this.columnObj3 = this.fourLeftColPro[0];
				//添加静态图
				this.fourMidColPro.forEach((val,i)=>{
					var num = i+1;
					val.img = '/images/column/4-'+ num +'.png';
				})
				// 当商品数小于3个时
				if(this.fourLeftColPro.length==2){
					this.arr3 = ["lunbo_first","lunbo_second"];
				}else if (this.fourLeftColPro.length==1) {
					this.arr3 = ["lunbo_first"];
				}

				this.bannerBegin();//开启 轮播图
			}




			//交换dom 位置
			this.$nextTick(() => {
				var $uList = $(".scroll-content");

				function scrollList() {

					//获得当前<li>的高度
					var scrollHeight = $(".scroll-content li:first").height();

					//滚动出一个<li>的高度
					$uList.animate({marginTop: -scrollHeight}, 500, function() {
						//动画结束后，将当前<ul>marginTop置为初始值0状态，再将第一个<li>拼接到末尾。                
						$uList.css({marginTop: 0}).find("li:first").appendTo($uList);                        
					});   
					                     
					setTimeout(() => {                            
						globalID = requestAnimationFrame(scrollList);                        
					}, 1000)                    
				}                    
				globalID = requestAnimationFrame(scrollList);
			});

			//监测登录状态
			if(tool.loadFromLocal("CustomerMesg","ALL")){
 				//获取用户信息
				this.getUserMesg();
				//获取订单信息
				this.getOrderMes();
				this.isLogin = true;
			}else {
				this.isLogin = false;
			}

			//监听topState退出状态
			this.$eventHandle.$on('get-login',(val)=>{
				this.isLogin = val;
			});
		},
		methods:{
			...mapActions({
					"getUserMesg":"home/home/getUserMesg",
					"getOrderList":"home/home/getOrderList",
					"GetOrderListByProductId":"home/home/GetOrderListByProductId",
					"getCode":"home/home/getCode",
					"getCompanyCheck":"home/home/getCompanyCheck",
					"createCheckCompany":"home/home/createCheckCompany",
					"toLogin":"home/home/toLogin",
					"loginDVisible":"loginDVisible",
					'lognOut_X':'lognOut_X'
				}),
				//栏目轮播 start
				//开启轮播图
				bannerBegin(num){
					var that = this;
					switch (num){
						case 1:
							//开启栏目2的轮播图
							that.openBannerTwo();
							break;
						case 2:
							//开启栏目3的轮播图
							that.openBannerThree();
							break;
						case 3:
							//开启栏目4的轮播图
							that.openBannerFour();
							break;
						default:
							//开启所有的轮播图
							// 2F
							that.openBannerTwo();
							//3F
							that.openBannerThree();
							//4F
							that.openBannerFour();
							break;
					}
				},
				//开启栏目2的轮播图
				openBannerTwo(){
					var that = this;
					lunboTimeIdOne = setInterval(function(){
						// 更换class以改变效果
						var delectTempArr = that.arr1.splice(that.arr1.length-1,1);
						that.arr1.unshift(delectTempArr[0]);

						ii++;
						if(ii >that.leftColPro.length-1){
							ii = 0;
						}
						that.columnObj1 = that.leftColPro[ii];
						that.arrCurrentIndexOne = ii+1;

					}.bind(that),2500);
				},
				//开启栏目3的轮播图
				openBannerThree(){
					var that = this;
					lunboTimeIdTwo = setInterval(function(){
						var delectTempArr = that.arr2.splice(that.arr2.length-1,1);
						that.arr2.unshift(delectTempArr[0]);
						jj++;
						if(jj >that.threeLeftColPro.length-1){
							jj = 0;
						}
						// 修改当前对象数据
						that.columnObj2 = that.threeLeftColPro[jj];
						that.arrCurrentIndexTwo = jj+1;
					}.bind(that),2500);
				},
				//开启栏目4的轮播图
				openBannerFour(){
					var that = this;
					lunboTimeIdThird = setInterval(function(){
						var delectTempArr = that.arr3.splice(that.arr3.length-1,1);
						that.arr3.unshift(delectTempArr[0]);
						xx++;
						if(xx >that.fourLeftColPro.length-1){
							xx = 0;
						}
						that.columnObj3 = that.fourLeftColPro[xx];
						that.arrCurrentIndexThird = xx+1;
					}.bind(that),2500);
				},
				//鼠标悬浮暂停
				pause(num){
					switch (num){
						case 1:
							clearInterval(lunboTimeIdOne);
							break;
						case 2:
						clearInterval(lunboTimeIdTwo);
							break;
						case 3:
						clearInterval(lunboTimeIdThird);
							break;
						default:
							break;
					}
				},
				//上一页
				preFn(num){
					switch (num){
						case 1:
							// 清除定时器
							clearInterval(lunboTimeIdOne);
							//  修改class顺序
							var delectTempArr = this.arr1.splice(length-1,1);
							this.arr1.unshift(delectTempArr[0]);

							this.arrCurrentIndexOne -=1;
							ii-=1;
							if(this.arrCurrentIndexOne<=0){
								this.arrCurrentIndexOne =this.leftColPro.length;
								ii = this.leftColPro.length;
							}
							// 修改当前对象数据
							this.columnObj1 = this.leftColPro[this.arrCurrentIndexOne-1];
							break;
						case 2:
							clearInterval(lunboTimeIdTwo);
							var delectTempArr = this.arr2.splice(length-1,1);
							this.arr2.unshift(delectTempArr[0]);
							this.arrCurrentIndexTwo -=1;
							jj-=1;
							if(this.arrCurrentIndexTwo<=0){
								this.arrCurrentIndexTwo =this.threeLeftColPro.length;
								jj = this.threeLeftColPro.length;
							}
							this.columnObj2 = this.threeLeftColPro[this.arrCurrentIndexTwo-1];
							break;
						case 3:
							clearInterval(lunboTimeIdThird);
							var delectTempArr = this.arr3.splice(length-1,1);
						this.arr3.unshift(delectTempArr[0]);
							this.arrCurrentIndexThird -=1;
							xx-=1;
							if(this.arrCurrentIndexThird<=0){
								this.arrCurrentIndexThird = this.fourLeftColPro.length;
								xx = this.fourLeftColPro.length;
							}
							this.columnObj3 = this.fourLeftColPro[this.arrCurrentIndexThird-1];
							break;
						default:
							break;
					}
				},
				//下一页
				nextFn(num){
					switch (num){
						case 1:
							// 清除定时器
							clearInterval(lunboTimeIdOne);
							//  修改class顺序
							var delectTempArr = this.arr1.splice(0,1);
							this.arr1.push(delectTempArr[0]);
							this.arrCurrentIndexOne +=1;
							ii+=1;
							if(this.arrCurrentIndexOne>this.leftColPro.length){
								this.arrCurrentIndexOne =1;
								ii = 0;
							}
							// 修改当前对象数据
							this.columnObj1 = this.leftColPro[this.arrCurrentIndexOne-1];
							break;
						case 2:
							clearInterval(lunboTimeIdTwo);
							var delectTempArr = this.arr2.splice(0,1);
							this.arr2.push(delectTempArr[0]);
							this.arrCurrentIndexTwo +=1;
							jj +=1;
							if(this.arrCurrentIndexTwo>this.threeLeftColPro.length){
								this.arrCurrentIndexTwo =1;
								jj = 0;
							}
							this.columnObj2 = this.threeLeftColPro[this.arrCurrentIndexTwo-1];
							break;
						case 3:
							clearInterval(lunboTimeIdThird);
							var delectTempArr = this.arr3.splice(0,1);
							this.arr3.push(delectTempArr[0]);
							this.arrCurrentIndexThird +=1;
							xx+=1;
							if(this.arrCurrentIndexThird>this.fourLeftColPro.length){
								this.arrCurrentIndexThird =1;
								xx = 0;
							}
							this.columnObj3 = this.fourLeftColPro[this.arrCurrentIndexThird-1];
							break;
						default:
							break;
					}
				},
			//栏目轮播 end
			//获取订单相关信息
			getOrderMes(){
				//获取订单信息(待评价)
				var data = {
					type:5,
					orderType:"PC"
				};
				this.getOrderList(data)
				//获取订单信息(待支付)
				var data = {
						type:0,
						orderType:"PC"
					};
					this.getOrderList(data)
				//获取订单信息(处理中)
				var data = {
						type:1,
						orderType:"PC"
					};
					this.getOrderList(data)
				},
				//跳转个人中心首页
				toOrder(){
					this.$router.push('/personalCenter/personalCenterIndex')
				},
				//跳转待支付
				toPaid(){
					this.$router.push('/personalCenter/waitPay')
				},
				//跳转处理中
				toHand(){
					this.$router.push('/personalCenter/goingOn')
				},
				//跳转待评价
				toEvaluated(){
					this.$router.push('/personalCenter/waitEvaluate')
				},
				//更多新闻
				toNews(){
					this.$router.push("/news")
				},
				//促销箭头显示
				toChange(){
					this.arrowShow = true;
				},
				//促销箭头隐藏
				toChangeHide(){
					this.arrowShow = false;
				},
				//上一页
				prevPga(){
					if(count>=1){
						count--;
						this.styleObject.transform = 'translateX(-'+250*count+'px)';
					}
				},
				//下一页
				nextPga(){
					if(count<this.saleData.Pro_SalesPromotionListViewModels.length-4){
						count++;
						this.styleObject.transform = 'translateX(-'+250*count+'px)';
					}
				},
				//轮播图跳转
				toDetail(url){
					//判断是否是活动页面
					var str = /home\/activities/
					if(str.test(url)){
						window.open(url);
					}else{
						location.href = url;
					}

				},
				//立即抢购
				onNowBuy(id,price,activeId){
					var params = {
						id:id,
						amount:price,
						oldAmount:"",
						productType:"",
						SalesPromotionId:activeId,
					}
					this.GetOrderListByProductId(params)
					.then((res)=>{
						let obj ={list:this.immediateList};
						tool.saveToLocal('orderMesg',obj);
						this.$router.push({path:'/cart/settleAccounts',query:{isNowBuy:'yes'}})
					} )
					.catch(err=>{
					this.$message.error(err.data.msg)
				})
				},
			register(){
				this.$router.push("/loginAndRegister/register");
			},
			//用户登录方式切换
			otherWrap(data,data1){
				if($(".otherWrap_show").css("display")=='none'){
					$(".otherWrap_show").css({"display":"block"});
					$(".otherWrap_hide").css({"display":"none"});
				}else{
					$(".otherWrap_show").css({"display":"none"});
					$(".otherWrap_hide").css({"display":"block"});
					//展示二维码

					var params = {
					params :{
							id:''
						}
					}
					this.getCode(params)
					.then(()=>{
						// this.getQR_code ="http://112.74.135.230:3215/OpenPlatform/GetLoginQRCodeImage?id="+this.codeObj.Id;
						this.getQR_code =`${loginDialog_scanIng}/OpenPlatform/GetLoginQRCodeImage?id=${this.codeObj.Id}`;
						let params = {
								params :{
									id:this.codeObj.Id
								}
							}

//							console.log('第暗涌二维码',params,this.getQR_code)


						if(!this.codeObj.IsScan){//IsScan :true  表示已经扫码
							//开启定时器自动检测是否手机app 有扫码
							setTimeout(()=>{
								this.scanRecursion(params);
							},3000)
						}
					})
				}
			},
			scanRecursion(params){//扫码递归
				this.getCode(params)
				.then(()=>{
					//开启定时器自动检测是否手机app 有扫码
				if(  this.codeObj.Data == null ){//判断是否返回token
					setTimeoutIdLogin = setTimeout(()=>{
						// //console.log("递归")
						this.scanRecursion(params);
				},3000)
				}else{
				let dataArr = this.codeObj.Data.split("|");
				this.loginForm.Mobile = dataArr[0];
				this.loginForm.password = dataArr[1];
				this.submitLogin(true);
				return
				}
				})
		},
			//用户登录
		submitLogin(flag){
				let  passwordEncrypt =  CryptoJS.AES.encrypt(this.loginForm.password, '59964e5d540e446cf98bc2af78a2ea58');//密码加密

			if(flag){
				var params = {
					LoginName: this.loginForm.Mobile,
					Password:encodeURI(passwordEncrypt.toString()),
					isBackLogin:true,
					openSSL:true,
				}

				getd.login(params)
				.then((res)=>{

					//获取用户系统信息
					this.getUserMesg();

					this.isLogin = true;
					//获取订单信息
					this.getOrderMes();
					this.loginDVisible(res);// 发送store/index.js 共享登录
					this.$message({
						message: '登录成功',
						type: 'success',
					});

					//触发空实例的自定义事件
					this.$eventHandle.$emit('get-login',true);

					clearTimeout(setTimeoutIdLogin );//关闭模态化窗口调用登陆的定时器
					setTimeoutIdLogin = null
				},(err)=>{
					this.$message({
						showClose: true,
						message: '登录失败，请检查账号密码输入是否正确',
						type: 'error',
						duration: 5000
					});
				})
			}else{
				var params = {
					LoginName: this.loginForm.Mobile,
					Password:encodeURI(passwordEncrypt.toString()),
					openSSL:true,
				}

				getd.login(params)
				.then((res)=>{
					if (res.code === 402) { //登录超时
							this.$message({
								showClose: true,
								message: res.data.message,
								type: 'error',
								duration: 5000
							});
							// throw new Error('Bad credentials')
					}else if(res.code === 401){ // 密码错误
						//throw new Error(res.message)
						this.$message({
								showClose: true,
								message: res.data.message,
								type: 'error',
								duration: 5000
							});
					}else if(res.code === 403){ //暂时未用到
					// throw new Error(res.message)
						this.$message({
								showClose: true,
								message: res.data.message,
								type: 'error',
								duration: 5000
							});
					}
					else {
						this.loginDVisible( res);//存入vuex  保存本地
						// this.loginOut()//退出demo
						clearTimeout(setTimeoutIdLogin );//关闭模态化窗口调用登陆的定时器
               			setTimeoutIdLogin = null
					}

					//获取用户系统信息
					this.getUserMesg();

					this.isLogin = true;
					//获取订单信息
					this.getOrderMes();
						//触发空实例的自定义事件
								this.$eventHandle.$emit('get-login',true);
					},(err)=>{
					this.$message({
						showClose: true,
						message: '登录失败，请检查账号密码输入是否正确',
						type: 'error',
						duration: 5000
					});
				})
			}
		},
		quitLogin(){ //退出登录
			//触发空实例的自定义事件
			this.$eventHandle.$emit('get-login',false);
			this.isLogin = false;
			tool.removeLocal("CustomerMesg");
					
			//调用退出接口
			getd.loginOut()
			.then((res)=>{
				// console.log(res,'退出退出 ')
				this.lognOut_X();
			})
		},
		//公司核名弹出框
		message(data,data1){
			//获取访问数量
			this.getCompanyCheck()
			var width = window.innerWidth;
					var height = window.innerHeight;
			$(data1.target).siblings(".message")
			.css({"display":"block"
					,"width":width
					,"height":height
			})
			$("body").css({"overflow":"hidden"})
		},
		// 免费核名电话验证
			checkTel(val){
				let tel = tool.regularJudgement('phone',val);
				if(!tel){
					this.$message.error('请输入正确的手机号');
				}
			},
		//公司核名提交
		submitCelect() {
			var companyName = document.getElementById("companyName").value;
			var contactNumber = document.getElementById("contactNumber").value;
			if(companyName == "" && contactNumber == ""){
				this.$message.error('请完善所填项');
			}else{
				if(tool.regularJudgement('phone',this.tel)){
						var param = {
								params:{
									name:this.nuclearName,
									tel:this.tel
								}
							}

							this.createCheckCompany(param)
							.then((res)=>{
								this.$message.success('新增成功！稍后工作人员与您联系！');
							})
					}
			}
			},
		//公司核名关闭
		close(){
			$(".message").css({"display":"none"});
			$("body").css({"overflow":"auto"});
		},
			//在线咨询移入效果
			enterRc(data,data1){
				$(data1.target).css({"border":"1px solid #359af8"});
				$(data1.target).children(".information_min").css({"border":"none"})
			},
			enterBut(data,data1){
				$(data1.target).css({"color":"#fff","background":"#359af8"});
			},
			//在线咨询移出效果
			leaveRc(data,data1){
				$(data1.target).css({"border":"none"});
				$(data1.target).children(".information_min").css({"border":"1px solid #ebebeb"})
			},
			leaveBut(data,data1){
				$(data1.target).css({"color":"#359af8","background":"none"});
			},
			//限时抢购移入效果
			purchaseFn(data,data1){
				$(".el-carousel__arrow").show();
			},
			//限时抢购移出效果
			purchaseFd(data,data1){
				$(".el-carousel__arrow").hide();
			},
			//2F、3F、4F分类移入效果
			startLiJ(data,data1){
				$(data1.target).css({"color":"red"});
			},
			//2F、3F、4F分类移出效果
			startLiC(data,data1){
				$(data1.target).css({"color":"#333"});
			},
			contentJ(data,data1,i,num){
				$(data1.target).children(".content_C_img").css({"margin-right":"5px"});
				if(num == 2){
					this.secondIndex = i;
				}else if(num == 3){
					this.thirdIndex = i;
				}else if(num == 4){
					this.fourIndex = i;
				}
			},
			contentC(data,data1,num){
				$(data1.target).children(".content_C_img").css({"margin-right":"0px"});
				if(num == 2){
					this.secondIndex = -1;
				}else if(num == 3){
					this.thirdIndex = -1
				}else if(num == 4){
					this.fourIndex = -1;
				}

			},

			//套餐立即抢购移入
			buyNowEnter(i){
				this.mealIndex = i;
			},
			//套餐立即抢购移出
			buyNowLeave(){
				this.mealIndex = 5;
			},
			//限时抢购移入
			onNowBuyEnter(i){
				this.saleIndex = i;
			},
			//限时抢购移出
			onNowBuyLeave(){
				this.saleIndex = -1;
			},
			//1f移入
			oneEnter(i,num){
				if(num == 1){
					this.oneIndex = i;
				}else if(num == 2){
					this.oneChildrenIndex = i;
				}else if(num == 3){
					this.oneRightIndex = i;
				}
			},
			//1f移出
			oneLeave(num){
				if(num == 1){
					this.oneIndex = -1;
				}else if(num == 2){
					this.oneChildrenIndex = -1;
				}else if(num == 3){
					this.oneRightIndex = -1;
				}
			},
			//栏目查看详情移入
			lookEnter(num){
				if(num==2){
					this.secondRightIndex = true;
				}else if(num==3){
					this.thirdRightIndex = true;
				}else if(num==4){
					this.fourRightIndex = true;
				}
			},
			//栏目查看详情移出
			lookLeave(num){
				if(num==2){
					this.secondRightIndex = false;
				}else if(num==3){
					this.thirdRightIndex = false;
				}else if(num==4){
					this.fourRightIndex = false;
				}
			},
			//1f查看详情移入
			oneFEnter(num){
				if(num==1){
					this.oneFLeftIndex = true;
				}else if(num==2){
					this.oneFMidIndex = true;
				}else if(num==3){
					this.oneFRightIndex = true;
				}
			},
			//1f查看详情移出
			oneFLeave(num){
				if(num==1){
					this.oneFLeftIndex = false;
				}else if(num==2){
					this.oneFMidIndex = false;
				}else if(num==3){
					this.oneFRightIndex = false;
				}
			},


			//新闻移入效果
			enterLism(data,data1,index,position ){
				if(position == 'left'){
					this.currentIndexL = index;
					this.currentIndexR = 0;
				}else{
					this.currentIndexR = index;
					this.currentIndexL = 0;
				}
			},
			//新闻移出效果
			journalism(data,data1,index,position){
				if(position == 'left'){
					this.currentIndexL = 0;
				}else{
					this.currentIndexR = 0;
				}
			},
			newsDetail(val){ //跳转到新闻详情页
				this.$router.push({path:"/news/newsDetail",query:{id:val}});
			},
			qqLogin(){
				let appId = "101448991";
				let sercet = "c87389b2ee2333c80915e7bc0a216951";
				//that.scanImg =`${loginDialog_scanIng}/OpenPlatform/GetLoginQRCodeImage?id=`+res.data.Id;
				let redirectUri = encodeURI(`${loginDialog_qqLogin}/loginAndRegister/otherLoginBind?type=0`); //这里要加上http://  不然会报错
				// let redirectUri = encodeURI('http://www.wqbol.com/loginAndRegister/otherLoginBind?type=0'); //这里要加上http://  不然会报错
				window.location.href = `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=${appId}&redirect_uri=${redirectUri}&state=df34535hg5657j`

			},
			//微信授权登录
			wxAccredit(){
				//console.log('微信授权登录')
				let redirectUri = encodeURI(`${loginDialog_wxAccredit}/loginAndRegister/otherLoginBind?type=1`); //这里要加上http://  不然会报错
				//let redirect_uri = 'http://www.wqbol.com/loginAndRegister/otherLoginBind?type=1';
				let appid = 'wxc4584fc463354878';
				window.location.href = `https://open.weixin.qq.com/connect/qrconnect?appid=${appid}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect`;

			},
			//微博登录授权
			allowWeiboLogin(){
				let AppKey = 3687585485;
				let calbackUrl = encodeURI(`${loginDialog_allowWeiboLogin}/loginAndRegister/otherLoginBind?type=2`); //授权后 跳回的页面
				// let calbackUrl = 'http://www.wqbol.com/loginAndRegister/otherLoginBind?type=2' ;
				window.location.href = `https://api.weibo.com/oauth2/authorize?client_id=${AppKey}&redirect_uri=${calbackUrl}&response_type=code`;
			},

			// 忘记密码
			forgetPW(){
				this.$router.push("/loginAndRegister/forgetPassword");
			}
		},
		beforeDestroy(){
			clearInterval(lunboTimeIdOne);
			clearInterval(lunboTimeIdTwo);
			clearInterval(lunboTimeIdThird);
			clearTimeout(setTimeoutIdLogin);//清楚登陆定时器
			ii=0;
			jj=0;
			xx=0;
			cancelAnimationFrame(globalID);

			//删除聊天标签
			var len = document.getElementsByTagName("script").length;
			for(let i=0;i<len;i++){
				let sDom = document.getElementsByTagName("script")[i];
				if(sDom){
					if(sDom.getAttribute("src") ==='//1.staticec.com/kf/sdk/js/ec_cs.js'){
						let hDom = document.getElementsByTagName("head")[0];
						hDom.removeChild(sDom)
					}
				}
			}
//			ec
			var ecDom = document.getElementById("ec--session-wrapper");
			var ecsDom = document.getElementById("ec--cs-wrapper");
			if(ecDom){
				ecDom.style.display = "none";
			}
			if(ecsDom){
				ecsDom.style.display = "none";
			}
			
			

		},
		filters:{

		}
	}
</script>
