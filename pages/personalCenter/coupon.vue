<template>
  <div class="mycompanyModify">
      <!-- 模态框 -->
      <div class="alert_bg" style="display: none;" v-show="rule" id="alert_bg">
			<div class="alert_div clearfix" onClick="event.cancelBubble = true">
				<h3>
					优惠券￥{{Price}}
					<a href="javascript:void(0)" id="alert_close" onClick="event.cancelBubble = false" @click="modelHide">
						<img src="~assets/images/personalCenter/asset/coupon/温馨提示框x.png" alt="">
					</a>
				</h3>
				<h4>【满{{Money}}元可用{{Price}}元】</h4>
				<div class="solid_line"></div>
				<div class="bottom_div clearfix">
					<div class="alert_row">
						<div class="row_title">使用原则：</div>
						<div class="row_content">单笔订单使用1张，每张券限用1次</div>
					</div>
					<div class="alert_row">
						<div class="row_title">使用场景：</div>
						<div class="row_content">微企宝网站，APP</div>
					</div>
					<div class="alert_row">
						<div class="row_title">商品限制：</div>
						<div class="row_content">满{{Money}}元可用</div>
					</div>
				</div>
			</div>
		</div>
      <!-- 个人中心公共头部 -->
          <personalCenterHead ref="indexTriangle"></personalCenterHead>
          <publicPendantR></publicPendantR>
          <!-- 公共侧边 -->
          <div class="margin1200">
              <personalCenterSlide></personalCenterSlide>
              <!-- 右侧 -->
              <div class="right_frame">
                  <div class="right_frame">
	    		<div class="coupon_top">
	    			我的优惠券
	    		</div>
	    		<div class="bottom_piece clearfix">
	    			<div class="bottom_tab clearfix">
	    				<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
						  <ul class="layui-tab-title">
						    <li :class="{layuiThis:active1}" @click="couponList(1,1)">未使用（{{noUseNum}}）</li>
						    <li :class="{layuiThis:active2}" @click="couponList(0,1)">已使用（{{usedNum}}）</li>
						    <li :class="{layuiThis:active3}" @click="couponList(3,1)">已过期（{{overTimeNum}}）</li>
						    <!-- <li>回收站（0）</li> -->
						  </ul>
						  <div class="sort_div">
						  	<span @click="couponList(state,1)">默认时间 </span>
						  	<span @click="couponList(state,2)">到期时间<img src="~assets/images/personalCenter/asset/coupon/arrow.png" /></span>
						  	<span @click="couponList(state,3)">生效时间<img src="~assets/images/personalCenter/asset/coupon/arrowCopy.png" /></span>
						  </div>
						  <div class="layui-tab-content">
						  	<div class="layui-tab-item layui-show">
							  	<div class="coupon clearfix" :class="{Imgcoupon:isCoupon,grayCoupon:isGrayCoupon}" v-for="(item,index) in productLists" :key="item.Id">
							  		<h1><span class="yuan">￥</span>{{item.Price}}</h1>
							  		<h5>【满{{item.Money}}元可用{{item.Price}}】</h5>
							  		<p class="valid">{{item.ExpiryDate}}</p>
							  		<p class="ticketno"><span class="ticketrule">券号：</span>{{item.CouponId.toUpperCase()}}</p>
							  		<p class="ticketno"><span class="ticketrule">规则：</span>{{item.ProductName}}商品使用</p>
							  		<p class="button_row">
							  			<a href="javascript:void(0)" class="btn_instruction" ><span class="p_fl" @click="useRule(this,$event,item.Money,item.Price,item.Des)">券使用说明</span><img src="~assets/images/personalCenter/asset/coupon/copy.png"/> </a>
							  			<span class="btn_a">
							  				<img :src="btn_src" class="button_now" v-show="buttonNow" width="76px" height="24px" @mouseenter="imgChange(this,$event)" @mouseleave="imgChangeBack(this,$event)" alt="立刻使用" @click="toProduct(item.CouponId)"/>
							  			</span>
										  <img class="overTimeImg" v-show="overTimeImg" src="~assets/images/personalCenter/asset/coupon/overTime.png" alt="已过期">
										  <img class="usedImg" v-show="usedImg" src="~assets/images/personalCenter/asset/coupon/used.png" alt="已使用">
							  		</p>
									  <!-- 即将过期 -->
									  <input type="hidden" class="hideData" :value="item.overTimeInterval">
							  		<img src="~assets/images/personalCenter/asset/coupon/overdue.png" v-if="(item.overTimeInterval<=3)" class="isBlock"/>
									  <!-- 删除优惠券 -->
							  		<!-- <a href="javascript:void(0)"> <img src="~assets/images/personalCenter/asset/coupon/delete.png" class="label_delete"/></a> -->
							  	</div>
								  <div class="noTikect" v-show="noTikect1">
									  <p>嗷~您暂时没有优惠券哟~</p>
									  <nuxt-link to="/couponsCenter" tag="p">去领券中心&nbsp;>></nuxt-link>
								  </div>
								  <div class="noTikect" v-show="noTikect2">
									  <p>嗷~您暂时没有优惠券哟~</p>
									  <nuxt-link to="/couponsCenter" tag="p">去领券中心&nbsp;>></nuxt-link>
								  </div>
								  <div class="noTikect" v-show="noTikect3">
									  <p>嗷~您暂时没有优惠券哟~</p>
									  <nuxt-link to="/couponsCenter" tag="p">去领券中心&nbsp;>></nuxt-link>
								  </div>
						  	</div>
						  </div>
						   <div class="pagination">
									<el-pagination v-if="CountPage"
									@current-change="handleCurrentChange"
									background layout="prev, pager, next" :total="CountPage" 
									:current-page="NowPage"
									:page-size="pagesize"
									prev-text='上一页' next-text='下一页'>
									</el-pagination>
								</div>
						</div> 
	    			</div>
	    			<div style="clear: both;"></div>
	    			<div class="rule_div clearfix">
	    				<h4>优惠券使用规则</h4>
	    				<p>1.本优惠券在购买微企宝的所有线上服务产品时，可以冲抵相应金额。（官费等第三方产生的费用不在冲抵范围之内） </p>
	    				<p>2.本优惠券抵扣部分的货款不开具发票。</p>
	    				<p>3.本优惠券仅能使用一次，不能兑换现金，不找零，不退换。</p>
	    				<p> 4.一个订单只能使用一张优惠券，且在使用优惠券时不可同时享受微企宝公司其它活动优惠或折扣。</p>
	    			</div>
	    			
	    		</div>
	    	</div>
              </div>
          </div>
          <publicBottom></publicBottom>
  </div>
</template>

<style lang="less" scoped>
 @import './personalCenter_index.less';
 .margin1200{
	 margin-top: 10px;
 }
 .layui-tab-title{
     border-bottom: 1px solid #eee;
     li{
         float: left;
         &.layui-this{
             height: 50px;
             border-bottom: 2px solid #FF3E08;;
         }
     }
 }
 .sort_div a{
         color: #4d4d4d;
	 }
.layui-tab-content{
		 background-color: none !important;
	 }
 .noTikect{
		 width: 450px;
		 height: 110px;
		 text-align: center;
		 background: url(~assets/images/personalCenter/asset/coupon/empty.png) no-repeat;
		 padding-top: 32px;
		 margin: 0 auto;
		 margin-top: 80px;
		 margin-bottom: 85px;
		 >p{
			 cursor: pointer;
		 }
		 p:nth-child(1){
			 margin-bottom: 20px;
		 }
		 p:nth-child(2){
			 margin-left: -72px;
			 color: #FF3E08;
			 font-size: 13px;
		 }
	 }
	 .btn_a{
		 height: 24px;
	 }
	 .overTimeImg,
	 .usedImg{
		 position: absolute;
		 right: 12px;
		 bottom: 12px;
	 }
	 .isBlock{
		 position: absolute;
		 top: 0;
		 left: 88px;
	 }
	 .layui-tab-item{
		 overflow: hidden;
	 }
	 .el-pagination{
		 text-align: center;
	 }
</style>


<script>
import personalCenterHead from '~/components/common/personalCenterHead'
import personalCenterSlide from "~/components/common/personalCenterSlide";
import publicBottom from '~/components/common/publicBottom'
import publicPendantR from '~/components/common/publicPendantR'
import getData from '~/store/ajaxAPI/getData.js'

export default {
  data(){
      return{
		  rule:false,
		  //优惠券数组
		  couponArr:[],
		  //未使用的数量
		  noUseNum:'',
		  //已使用的数量
		  usedNum:'',
		  //已过期的数量
		  overTimeNum:'',
		  //没有券状态的显示隐藏
		  noTikect1:false,
		  noTikect2:false,
		  noTikect3:false,
		  //tab栏Li标签是否高亮
		  active1:false,
		  active2:false,
		  active3:false,
		  btn_src:require("~/assets/images/personalCenter/asset/coupon/1_08.png"),
		  //用券规则的数据
		  Money:'',
		  Price:'',
		  Des:'',
		  //是否显示即将过期
		  isBlock:true,
		  //是否显示立即使用按钮
		  buttonNow:true,
		  //已过期图标是否显示
		  overTimeImg:false,
		  //已使用图标是否显示
		  usedImg:false,
		  //优惠券背景图-蓝
		  isCoupon:true,
		  //优惠券背景图-灰
		  isGrayCoupon:false,
		  //获取到的状态
		  state:'',
		  CountPage:'',   //总商品条数
          NowPage: 1,     //当前页数
          pagesize: 12,   //每页条数
      }
  },
  mounted(){
	  this.modelHide()
	  this.couponList(1)
	  this.couponList(0)
	  this.couponList(3)
  },
  methods:{
	  //用券规则显示隐藏
      useRule(data,data1,Money,Price,Des){
		  this.Money = Money
		  this.Price = Price
		  this.Des = Des
          this.rule = true;
	  },
	  //模态框显示隐藏
      modelHide(){
          this.rule = false;
	  },
	  //获取-未使用-优惠券列表数据
	  couponList(state,isData){
		  var params = {
			  state:state,
			  dataType:'json'
		  } 
		  //不点击时获取
		  if(arguments.length == 1){ 
			  getData.couponList(params).then(res=>{
			  if(params.state == 1){ //未使用的
			      this.state = 1  //点击默认时间的状态
				  this.noUseNum = res.data.list.length
				  this.$store.dispatch('saveCouponNum',res.data.list.length)
				//   this.couponArr = res.data.list
				  this.active1 = true
				  //console.log('未使用成功',res.data.list)
				  var arr = res.data.list
				  for(var item in arr) { //现在时间与即将到期时间的差，超过三天，显示即将过期
					var date = new Date(Date.parse(arr[item].EndTime))
					var newDate = new Date(); 
					var time = date.getTime() - newDate.getTime()
					var day = parseInt(time / (24 * 60 * 60 * 1000))
					arr[item].overTimeInterval = day
				  }
				//   //console.log('添加后的',res.data.list)
				  this.couponArr = res.data.list
				  this.CountPage = res.data.list.length
				//   //console.log('数组',this.couponArr)
				  if(res.data.list.length == 0){
				  this.noTikect1 = true;
				  this.noTikect2 = false;
				  this.noTikect3 = false;
			  	}
			  }else if(params.state == 0){ //已使用的
				  this.usedNum = res.data.list.length
				  //console.log('已使用成功',res.data.list)
				  if(res.data.list.length == 0){
				//   this.noTikect = true;
			  	}
			  }else if(params.state == 3){ //已过期的
				  this.overTimeNum = res.data.list.length
				  //console.log('已过期成功',res.data.list)
				  if(res.data.list.length == 0){
				//   this.noTikect = true;
			  	}
			  }
		  }).catch(err=>{
			  //console.log('优惠券失败',err)
		  })
		  //点击时获取，li高亮
		  }else if(arguments.length == 2){
			  getData.couponList(params).then(res=>{
			  if(params.state == 1){ //未使用的
			  	  this.state = 1  //点击默认时间的状态
				  this.noUseNum = res.data.list.length;
				  this.couponArr = res.data.list;
				  this.CountPage = res.data.list.length;
				  this.active1 = true;
				  this.active2 = false;
				  this.active3 = false;
				  this.buttonNow = true;
				  this.overTimeImg = false;
				  this.usedImg = false;
				  this.isCoupon = true;
				  this.isGrayCoupon = false;
				  this.noTikect2 = false;
				  this.noTikect3 = false;
				  //console.log('未使用成功',res.data.list)
				  var arr = res.data.list
				for(var i=0;i<arr.length;i++) { //现在时间与即将到期时间的差,超过三天，显示即将过期
					if(isData == 2){ //按到期时间排序
						// //console.log('到期时间进来了')
						for(var j=0;j<arr.length-1-i;j++){
						if((new Date(Date.parse(arr[j].EndTime))).getTime()>(new Date(Date.parse(arr[j+1].EndTime))).getTime()){
							var temp=arr[j];
							arr[j]=arr[j+1];
							arr[j+1]=temp;
						}
					}
					}else if(isData == 3){ //按生效时间排序
						//console.log('生效时间进来了')
						for(var j=0;j<arr.length-1-i;j++){
						if((new Date(Date.parse(arr[j].StartTime))).getTime()>(new Date(Date.parse(arr[j+1].StartTime))).getTime()){
							var temp=arr[j];
							arr[j]=arr[j+1];
							arr[j+1]=temp;
						}
					}
					}
					var date = new Date(Date.parse(arr[i].EndTime))
					// //console.log(date)
					var newDate = new Date(); 
					var time = date.getTime() - newDate.getTime()
					var day = parseInt(time / (24 * 60 * 60 * 1000))
					arr[i].overTimeInterval = day
				  }
				//   //console.log('添加后的',res.data.list)
				  this.couponArr = res.data.list
				  this.CountPage = res.data.list.length
				//   //console.log('数组',this.couponArr)
				  if(res.data.list.length == 0){
				  this.noTikect1 = true;
				  this.noTikect2 = false;
				  this.noTikect3 = false;
			  	}
			  }else if(params.state == 0){ //已使用的
			      this.state = 0 //点击默认时间的状态
				  this.usedNum = res.data.list.length;
				  this.couponArr = res.data.list;
				  this.CountPage = res.data.list.length;
				  this.active2 = true;
				  this.active1 = false;
				  this.active3 = false;
				  this.buttonNow = false;
				  this.overTimeImg = false;
				  this.usedImg = true;
				  this.isCoupon = false;
				  this.isGrayCoupon = true;
				  this.noTikect1 = false;
				  this.noTikect3 = false;
				  //console.log('已使用成功',res.data.list)
				  var arr = res.data.list
				for(var i=0;i<arr.length;i++) { //现在时间与即将到期时间的差,超过三天，显示即将过期
					if(isData == 2){ //按到期时间排序
						//console.log('到期时间进来了')
						for(var j=0;j<arr.length-1-i;j++){
						if((new Date(Date.parse(arr[j].EndTime))).getTime()>(new Date(Date.parse(arr[j+1].EndTime))).getTime()){
							var temp=arr[j];
							arr[j]=arr[j+1];
							arr[j+1]=temp;
						}
					}
					}else if(isData == 3){ //按生效时间排序
						//console.log('生效时间进来了')
						for(var j=0;j<arr.length-1-i;j++){
						if((new Date(Date.parse(arr[j].StartTime))).getTime()>(new Date(Date.parse(arr[j+1].StartTime))).getTime()){
							var temp=arr[j];
							arr[j]=arr[j+1];
							arr[j+1]=temp;
						}
					}
					}
				  }
				//   //console.log('添加后的',res.data.list)
				  this.couponArr = res.data.list
				  this.CountPage = res.data.list.length
				  if(res.data.list.length == 0){
				  this.noTikect2 = true;
				  this.noTikect1 = false;
				  this.noTikect3 = false;
			  	}
			  }else if(params.state == 3){ //已过期的
			      this.state = 3;
				  this.overTimeNum = res.data.list.length;
				  this.couponArr = res.data.list;
				  this.CountPage = res.data.list.length;
				  this.active3 = true;
				  this.active1 = false;
				  this.active2 = false;
				  this.buttonNow = false;
				  this.overTimeImg = true;
				  this.usedImg = false;
				  this.isCoupon = false;
				  this.isGrayCoupon = true;
				  this.noTikect2 = false;
				  this.noTikect1 = false;
				  //console.log('已过期成功',res.data.list)
				  var arr = res.data.list
				for(var i=0;i<arr.length;i++) { //现在时间与即将到期时间的差,超过三天，显示即将过期
					if(isData == 2){ //按到期时间排序
						//console.log('到期时间进来了')
						for(var j=0;j<arr.length-1-i;j++){
						if((new Date(Date.parse(arr[j].EndTime))).getTime()>(new Date(Date.parse(arr[j+1].EndTime))).getTime()){
							var temp=arr[j];
							arr[j]=arr[j+1];
							arr[j+1]=temp;
						}
					}
					}else if(isData == 3){ //按生效时间排序
						//console.log('生效时间进来了')
						for(var j=0;j<arr.length-1-i;j++){
						if((new Date(Date.parse(arr[j].StartTime))).getTime()>(new Date(Date.parse(arr[j+1].StartTime))).getTime()){
							var temp=arr[j];
							arr[j]=arr[j+1];
							arr[j+1]=temp;
						}
					}
					}
				  }
				//   //console.log('添加后的',res.data.list)
				  this.couponArr = res.data.list
				  this.CountPage = res.data.list.length
				  if(res.data.list.length == 0){
				  this.noTikect3 = true;
				  this.noTikect1 = false;
				  this.noTikect2 = false;
			  	}
			  }
		  }).catch(err=>{
			  //console.log('优惠券失败',err)
		  })
		  }
	  },
	  //鼠标移入改变图片
	  imgChange(data,data1){
		  $(data1.target).attr('src',require('~/assets/images/personalCenter/asset/coupon/22.png'))
	  },
	  //鼠标移出改变图片
	  imgChangeBack(data,data1){
		  $(data1.target).attr('src',require('~/assets/images/personalCenter/asset/coupon/1_08.png'))
	  },
	  //当前页
      handleCurrentChange(val) {
          this.NowPage = val;
        ////console.log(`当前页: ${val}`);
	  },
	  //点击立刻使用，带productName去商品页面
	  toProduct(id){
		  var params = {
			  id:id,
			  dataType:'json'
		  }
		  getData.GetProductListByCouponType(params).then(res=>{
			  //console.log('立即使用成功',res)
			  let prodlistData = res.data.list;
			  this.$store.dispatch('setProductListData',prodlistData)
			  this.$router.push({path:'/productList',query:{typeIndex:"all",productName:'all'}});
		  }).catch(err=>{
			  //console.log('立即使用失败',err)
		  })
	  }
  },
   computed:{
	   //计算当前显示页的商品数组
      productLists: function(){
        return this.couponArr.slice((this.NowPage-1)*this.pagesize,this.NowPage*this.pagesize)
      },
  },
  updated(){
	  this.$refs.indexTriangle.$refs.indexTriangle.style.display = 'block';
  },
  components:{
   personalCenterHead,
   personalCenterSlide,
   publicBottom,
   publicPendantR
  }
}
</script>

