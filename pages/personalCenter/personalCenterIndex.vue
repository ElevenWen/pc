<template>
  <div class="personal">
	  <div class="c-header">
      <div class="c-hdTopWrap">
          <personalCenterHead ref="indexTriangle"></personalCenterHead>
		  <publicPendantR></publicPendantR>
      </div>
	  </div>
       <div class="margin1200">
	    	<personalCenterSlide></personalCenterSlide>
	    	<div class="right_frame">
	    		<div class="head_top">
	    			<div class="name_div">
		    			<span @mouseenter="changeAvater" @mouseleave="noAvater">
							<img :src="HeadPicPath" class="head"/>
							<nuxt-link tag="div" class="adater1" to="/account_setting/information">修改头像</nuxt-link>
						</span>
		    			<div class="head_name">
		    				<p class="name_row name_h" ><span class="hi">Hi~</span><nuxt-link to="/account_setting/information" tag="a">{{Name}}</nuxt-link></p>
		    				<p class="name_row" ><a href="javascript:void(0)">会员等级：</a><span class="">{{CompanyLevel}}</span></p>
							<!-- vip_img -->
							<br>
		    				<p class="name_row" ><nuxt-link to="/account_setting/safeCenter" tag="a">账户安全：</nuxt-link>
							<img src="~assets/images/personalCenter/index/lel2.png" v-if="this.levelMiddle">
							<img src="~assets/images/personalCenter/index/lel1.png" v-if="this.levelLow">
							<img src="~assets/images/personalCenter/index/lel3.png" v-if="this.levelHigh">
							</p>
		    			</div>
	    			</div>
	    			<div class="fund_div">
	    				<nuxt-link to="/personalCenter/waitPay">
		    				<div class="funds">
		    					<img src="~assets/images/personalCenter/index/waitPay.png" height="40" width="40" class="funds_icon">
		    					<p class="funds_item">待付款<span >{{waitPay}}</span></p>
		    				</div>
	    				</nuxt-link>
	    				<nuxt-link to="/personalCenter/goingOn">
		    				<div class="funds">
		    					<img src="~assets/images/personalCenter/index/going.png" height="40" width="40" class="funds_icon">
		    					<p class="funds_item">办理中<span >{{inProcess}}</span></p>
		    				</div>
	    				</nuxt-link>
	    				<nuxt-link to="/personalCenter/done">
		    				<div class="funds">
		    					<img src="~assets/images/personalCenter/index/done.png" height="40" width="40" class="funds_icon">
		    					<p class="funds_item">已完成<span >{{done}}</span></p>
		    				</div>
	    				</nuxt-link>
	    				<nuxt-link to="/personalCenter/waitEvaluate">
		    				<div class="funds">
		    					<img src="~assets/images/personalCenter/index/wait_commoned.png" height="40" width="40" class="funds_icon">
		    					<p class="funds_item">待评价<span >{{waitCommend}}</span></p>
		    				</div>
	    				</nuxt-link>
	    			</div>
	    			<div class="score_div">
	    				<nuxt-link to="/personalCenter/balance">
	    					<div class="score_item">
	    					    <img src="~assets/images/cart/order/balance.png" height="36" width="36">
	    					    <span class="my_score">余额：<span>{{balance}}</span></span>
	    					</div>
	    				</nuxt-link>
	    				<nuxt-link to="/personalCenter/currency">
	    					<div class="score_item">
	    					    <img src="~assets/images/cart/order/coin.png">
	    					    <span class="my_score">记账币：<span>{{currency}}</span></span>
	    					</div>
	    				</nuxt-link>
	    				<nuxt-link to="/personalCenter/coupon">
	    					<div class="score_item">
	    					    <img src="~assets/images/cart/order/coupon.png">
	    					    <span class="my_score">优惠券：{{discountC}} 张</span>
	    					</div>
	    				</nuxt-link>
	    				<nuxt-link to="/account_setting/information">
	    					<span>
		    					<div class="score_item">
		    					    <img src="~assets/images/cart/order/basicData.png">
		    					    <span class="my_score">基本资料</span>
		    					</div>
	    					</span>
	    				</nuxt-link>
	    			</div>
	    		</div>
	    		<div class="bottom_piece">
	    			<div class="bottom_left">
		    			<div class="order_div">
		    				<h2>我的订单<nuxt-link to="/personalCenter/allOrder" v-if="orderArr.length">查看全部订单</nuxt-link> </h2>
		    				<div class="buy_div" v-if="!orderArr.length">
		    					<img src="~assets/images/personalCenter/index/emptyCar.png">
		    					您买的东西太少了，这里都空空的，快去挑选合适的商品吧！
		    				</div>
		    				<div class="my_order_div" v-if="orderArr.length">
		    					<table>
		    						<tbody>
			    						<tr v-for="(item,index) in orderArr" :key="item.Id">
			    							<td>
												<span v-for="(items,index) in item.OrderDetails" :key="items.Id">
													<span @click="toProduct(items.ProductIdd,items.type=='产品'?0:1)" class="proImg">
														<img :src="items.PCThumbImgURL" height="54" width="54"/>
													</span>
													<!-- <span v-for="(itemss,index) in items.ProductDetails" :key="itemss.Id" v-if="items.type=='套餐'">
														<img :src="itemss.Img" height="54" width="54"/>
													</span> -->
												</span>
											</td>
			    							<td>{{item.ConsigneeName}}</td>
			    							<td>￥{{item.Amount}}</td>
			    							<td>{{item.timer}}</td>
			    							<td class="status">{{item.OrderStatus}}</td>
			    							<td><a @click="toDetail(item.Id)">查看</a> </td>
			    						</tr>
		    						</tbody>
		    					</table>
		    				</div>
		    			</div>
	    			</div>
	    			<div class="bottom_right">
	    				<div class="sign_div clearfix">
	    					<div class="sign_title">当前日期</div>
	    					<h1 id="d523_d">{{date}}</h1>
	    					<p class="week" id="d523_w">星期{{days}}</p>
    						<!-- <a href=""><div class="sign_button">立即签到</div></a> -->
    						<div class="gift_div">
    							<p class="gift_title">新手大礼包</p>
    							<div class="gift">
    								<img src="~assets/images/personalCenter/index/giftBag.png" height="55" width="56">
    								<div class="gift_text">
    									主人，快去领取新手大礼包！ 优惠券、积分、现金红包...统统可以领回家！
    								</div>
    							</div>
    						</div>
	    				</div>
						<span v-for="(item,index) in adImgArr" :key="item.Id">
							<a :href="item.LinkWebSite">
								<img :src="item.PosterImgURL" class="taste" width="260" height="140"/>
							</a>
						</span>
	    			</div>
	    		</div>
	    	</div>
	    </div>
     <div class="c-ftContainWrapindex">
			<publicBottom></publicBottom>
	</div>

  </div>
</template>

<style lang="less" type="stylesheet/css" scoped>
@import "~assets/common/index.less";
@import "../home.less";
@import "./personalCenter_index.less";
</style>

<script>
import personalCenterHead from "~/components/common/personalCenterHead";
import personalCenterSlide from "~/components/common/personalCenterSlide";
import publicBottom from '~/components/common/publicBottom'
import publicPendantR from '~/components/common/publicPendantR'
import getData from '~/store/ajaxAPI/getData.js'
import fmt from '~/assets/lib/tool.js'
export default {
  data() {
    return {
		//当前时间
		date:'',
		days:'',
		//订单数组
		orderArr:[],
		//优惠券数量
		CouponNum:'',
		//积分数量
		integral:'',
		//姓名
		Name:'',
		CompanyLevel:'',//会员等级
		//安全等级
		levelLow:false,
		levelMiddle:false,
		levelHigh:false,
		//用户头像
		HeadPicPath:'',
		//订单数
		waitPay:'',
		inProcess:'',
		done:'',
		waitCommend:'',
		//广告图数组
			adImgArr:[],
			currency:"" ,//记账币
			balance:"", //余额
			discountC:"", //优惠券
	}
  },
  mounted(){
	  this.getDate();
	  this.getOrder();
	  this.getCouponNum();
	  this.getIntegralNum();
	  this.getName();
	  this.getHomeBanner();
		//   获取  余额  优惠券  记账币
		this.getInfo();
  },
  updated(){
	  this.$refs.indexTriangle.$refs.indexTriangle.style.display = 'block';
  },
  methods:{
	  //移入出现修改头像
	  changeAvater(){
		  $('.adater1').css('display','block')
	  },
	  //移出修改头像消失
	  noAvater(){
		  $('.adater1').css('display','none')
	  },
	  //获取当前时间
	  getDate(){
	  	var week=new Array(7)
			week[0]="日"
			week[1]="一"
			week[2]="二"
			week[3]="三"
			week[4]="四"
			week[5]="五"
			week[6]="六"
		  this.date = new Date().getDate()
		  this.days = week[new Date().getDay()]
	  },
	  //获取订单数据
	  getOrder(){
		  var params = {
			 type:'',
			 orderType:'PC'
		}
		   getData.allOrder(params).then(res=>{
			   //console.log('订单订单订单',res.data)
			   let arr = res.data.list
			   //获取订单列表前三
			   let newArr = []
			   if(arr.length>3){
				   for(var i=0;i<3;i++){
					   let str = arr[i].CreateTime.replace(/[^0-9]/ig,"")
						  arr[i].timer = fmt.formatDate(str,"yyyy-MM-dd hh:mm:ss")
					      newArr[i] = arr[i]
				   }
				   this.orderArr = newArr
			   }else{
				   for(var i=0;i<arr.length;i++){
					   let str = arr[i].CreateTime.replace(/[^0-9]/ig,"")
						  arr[i].timer = fmt.formatDate(str,"yyyy-MM-dd hh:mm:ss")
					      newArr[i] = arr[i]
				   }
				   this.orderArr = newArr
			   }
			   //获取订单状态的数
			   	var lArr = []
				var hArr = []
				var bArr = []
				var pArr = []
				for(var i=0;i<arr.length;i++){
					if(arr[i].OrderStatus == '待付款'){
						//待付款数目
						lArr.push(arr[i])
						this.waitPay = lArr.length
					}
					//办理中数目
					if(arr[i].OrderStatus == '办理中'){
						hArr.push(arr[i])
						this.inProcess = hArr.length
					}
					//已完成数目
					if(arr[i].OrderStatus == '已完成'){
						bArr.push(arr[i])
						this.done = bArr.length
					}
					//待评价数目
					if(arr[i].OrderStatus == '待评价'){
						pArr.push(arr[i])
						this.waitCommend = pArr.length
					}
				}
			   //console.log(this.orderArr)
		   }).catch(err=>{
			   //console.log(err)
		   })
	  },
	  //点击查看带Id进入订单详情
	  toDetail(id){
		  this.$router.push({path:'/personalCenter/orderDetail',query:{id:id}})
	  },
	  //获取优惠券数量
	  getCouponNum(){
		  let params = {
			  state:1,
			  dataType:'json'
		  }
		  getData.couponList(params).then(res=>{
			//   //console.log(res.data);
			  this.CouponNum = res.data.list.length;
		  }).catch(err=>{
			  //console.log(err);
		  })
	  },
	  //获取积分数量
	  getIntegralNum(){
		  getData.myScore().then(res=>{
			//   //console.log(res.data)

			  this.integral = res.data.Score;
			  this.CompanyLevel = res.data.LevelDes;
		  }).catch(err=>{
			  //console.log(err)
		  })



	  },
	  //获取客户姓名,及账户安全等级
	  getName(){
		  getData.getcustorInfor().then(res=>{
			//   //console.log(res.data)
			  this.Name = res.data.Nickname;

			  this.levelLow = (res.data.IsEmailVerification==0&&res.data.IsMobileVerification==0)?true:false;
			  this.levelMiddle = (res.data.IsEmailVerification==1&&res.data.IsMobileVerification==0)||(res.data.IsEmailVerification==0&&res.data.IsMobileVerification==1)?true:false;
			  this.levelHigh = (res.data.IsEmailVerification==1&&res.data.IsMobileVerification==1)?true:false;
			  this.HeadPicPath = res.data.HeadPicPath;
		  }).catch(err=>{
			  //console.log(err)
		  })
	  },
	  //跳转商品详情
	  toProduct(id,type){
		//   this.$router.push({path:'/productDetails',query:{id:id,type:type}});
		  this.$router.push({
			path:'/productDetails/' + id + '/' + type
		  });
	  },
	  //获取活动banner
	  getHomeBanner(){
		  var params = {
			  params:{
				code:'YCGGW03',
			  	dataType:'json',
			  	type:0
			  }
		  }
		  getData.getHomeBanner(params).then(res=>{
			  //console.log(res.data.list,'----------')
			  this.adImgArr = res.data.list;
		  }).catch(err=>{
			  //console.log(err)
		  })
		},
		getInfo(){
			getData.GetMyAssets().then((res) => {
				this.currency = res.data.Coin;
				this.balance = res.data.Balance;
				this.discountC = res.data.Coupons;
			})
	  }
  },
  components: {
	personalCenterHead,
	personalCenterSlide,
	publicBottom,
	publicPendantR
  }
};
</script>

