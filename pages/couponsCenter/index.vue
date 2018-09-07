<template>
  <div id="couponsCenter">
    <!--头部-->
    <div class="c-header">
      <div class="c-hdTopWrap">
        <topState></topState>
        <div class="c-headerContent">
          <div class="headerSeach">
            <nuxt-link to="/" title="微企宝一站式企业服务平台">
              <img class="logo" src="/images/logo.png" alt="微企宝深圳前海公司注册">
            </nuxt-link>
            <span class="logoText" >领券中心</span>
            <div class="search">
              <el-select v-model="checkedValue" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <!-- <div class="selectType">优惠券</div> -->
              <!-- 隐藏部分 -->
              <!-- <div>
                <li>优惠券</li>
                <li>商品</li>
              </div> -->
              <input type="text" class="searchText" ref="searchText" @keyup.enter="onTextSearch()" placeholder="请输入关键字">
              <span class="onSearch" @click="onTextSearch()">搜索</span>
            </div>
            <span class="toMyCenter" @click="toMycoupons(userId)"><img src="~assets/images/couponslCenter/couposnIcon.png" alt="">我的优惠券 ></span>
          </div>
          <div class="headerMenu">
            <!--<span class="allType"><img src="" alt="">全部服务分类</span>
            <span class="home" @click="toRouter('/')">首页</span>
            <span class="myCoupons" @click="toMycoupons(userId)">我的优惠券</span>-->
            <couponServerNav></couponServerNav>
          </div>
          <div class="bannerBg">
            <img src="~assets/images/couponslCenter/banner.png" alt="">
          </div>
          <div class="headerNav">
            <ul class="showNav">
              <li @click="getcouponsTypeListData(0)" class="navActive">通用</li>
              <li v-for="(item, index) in couponsTypeListOne" :key="index" @click="getcouponsTypeListData(index+1,item.Id)">{{item.Name}}</li>
              <li class="moreTypelist" @click="moreNav =! moreNav">更多
                <img src="~assets/images/couponslCenter/Down (1).png" alt="" class="moreImg" v-if="!moreNav">
                <img src="~assets/images/couponslCenter/Down (2).png" alt="" class="moreImg" v-if="moreNav">
              </li>

            </ul>
            <ul class="moreNav" v-show="moreNav">
              <li v-for="(item, mIndex) in couponsTypeListMore" :key="mIndex" @click="getcouponsTypeListData(mIndex+8,item.Id)">{{item.Name}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!--内容区-列表-->
    <div class="c-content">
      <ul class="couponsWrap">
        <li v-for="(couItem, index) in couponsAllList" :key="index" class="couItem_couponsWrap">
          <div class="couponsDes">
            <img src="~assets/images/couponslCenter/tongyongSS.png" alt="" class="moveIconMg" v-if="couItem.CouType == '通用卷'&&couItem.Amount && couItem.ActivatedAmount/couItem.Amount!=1">
            <img src="~assets/images/couponslCenter/tongyon.png" alt="" class="moveIconMg" v-if="couItem.CouType == '通用卷'&&couItem.Amount && couItem.ActivatedAmount/couItem.Amount==1">
            <img src="~assets/images/couponslCenter/type1.png" alt="" class="moveIconMg" v-if="couItem.CouType == '品类卷' ">
            <img src="~assets/images/couponslCenter/type1.png" alt="" class="moveIconMg" v-if="couItem.CouType == '单品卷' ">
            <img src="~assets/images/couponslCenter/tongyon.png" alt="" class="moveIconMg" v-if="couItem.CouType == '通用卷'&& !couItem.Amount">
            <div class="text">
              <p :class="{textdes:couItem.ActivatedAmount/couItem.Amount!=1,endBg:couItem.ActivatedAmount/couItem.Amount==1}"><span class="yico">￥</span><span class="money">{{couItem.Price}}</span><span class="reduce reduceEndBg">{{couItem.Des}}</span></p>
              <div class="limitText">
                <div v-if="couItem.CouType == '品类卷'">{{couItem.ProductName}}</div>
                <div v-if="couItem.CouType == '单品卷'">{{couItem.ProductName}}</div>
                <div v-if="couItem.CouType == '通用卷'">通用商品类(除特殊商品),限量抢购</div>
              </div>
              <div class="stepDesWrap">
                <!--抢光情况-->
                <span v-if="!couItem.Amount">今日已抢光</span>
                <!--进度库存情况-->
                <div class="stepDesWrap VisbleOld" v-if="couItem.Amount">
                  <span >已抢{{parseInt((couItem.ActivatedAmount/couItem.Amount)*100)}}%</span>
                  <el-progress :percentage="parseInt((couItem.ActivatedAmount/couItem.Amount)*100)" status="exception"></el-progress>
                </div>
                <!--已领用背景-->
                <img src="~assets/images/couponslCenter/pulled.png" alt="已领用" class="pulledImg VisbleNow" style="display: none">
              </div>
            </div>
          </div>
          <div class="pullCoupons" >
            <img v-if="couItem.ActivatedAmount/couItem.Amount==1" src="~assets/images/couponslCenter/tosite.png" alt="领完" class="VisbleOld" @click="receiveCoupons(couItem.Id, couItem.ActivatedAmount/couItem.Amount,index)">
            <img src="~assets/images/couponslCenter/pull.png" alt="未领取" class="VisbleOld" @click="receiveCoupons(couItem.Id, couItem.ActivatedAmount/couItem.Amount,index)" v-else>
            <img src="~assets/images/couponslCenter/usercou.png" alt="已领" class="VisbleNow"  @click="nowUseCoupon = true" style="display: none">
          </div>
        </li>
      </ul>
      <!--点击获取下一个分类-->
      <div class="nextTypeList">
        <span class="icon1"><img src="~assets/images/couponslCenter/优惠券.png" alt=""></span>
        <p ><span @click="onCouponsMore(navIndex,couponsTypeListAll)">点击查看下一个分类</span></p>
        <span class="icon2"><img src="~assets/images/couponslCenter/trueIcon.png" alt=""></span>
      </div>
    </div>

    <!--公共底部-->
    <div class="c-bottom">
      <div class="ServiceDesList">
        <ul>
          <li>
            <img src="~assets/images/couponslCenter/priceIcon.png" alt="">
            <div class="text">
              <p class="title">价格透明</p>
              <p class="des">服务无差价，无忧省心</p>
            </div>
          </li>
          <li>
            <img src="~assets/images/couponslCenter/timeIcon.png" alt="">
            <div class="text">
              <p class="title">及时响应</p>
              <p class="des">在线咨询，及时响应</p>
            </div>
          </li>
          <li>
            <img src="~assets/images/couponslCenter/systeam.png" alt="">
            <div class="text">
              <p class="title">系统管理</p>
              <p class="des">实时监控，办理流程化！</p>
            </div>
          </li>
          <li>
            <img src="~assets/images/couponslCenter/afterSaleIcon.png" alt="">
            <div class="text">
              <p class="title">服务售后</p>
              <p class="des">退款100%受理，100%解决</p>
            </div>
          </li>
        </ul>
      </div>
      <publicBottom></publicBottom>
    </div>

    <!--公共弹窗部分-->
    <!--领取成功-->
    <el-dialog class="pullsuccessedWrap"
      title="温馨提示"
      :visible.sync="pullsuccessedDialogVisible"
      width="380px">
      <img src="~assets/images/couponslCenter/compilt.png" alt="">
      <p class="des">恭喜你，领取优惠券成功！！</p>
      <p class="btn"><span class="yesBtn" @click="nowUseCoupon = true">立即使用</span><span class="noBtn" @click="pullsuccessedDialogVisible=false">取消</span></p>
    </el-dialog>
    <!--领取失败-->
    <el-dialog class="pulllosedWrap"
               title="温馨提示"
               :visible.sync="pulllosedDialogVisible"
               width="380px">
      <img src="~assets/images/couponslCenter/flaseicon.png" alt="">
      <!--<p class="des">不好意思，领取失败了呦，请您过会再来吧~</p>-->
      <p class="des">该优惠券您已领取，不能重复领取！</p>
      <p class="btn"><span class="yesBtn" @click="pulllosedDialogVisible=false">确定</span></p>
    </el-dialog>
     <!--登录弹窗-->
    <loginDialog v-if="isLoginDialog"></loginDialog>
  </div>
</template>



<script>
  import topState from "~/components/common/topState"
  import publicBottom from "~/components/common/publicBottom"
  import loginDialog from "~/components/common/loginDialog/loginDialog"
  import couponServerNav from'~/components/couponsCenter/couponServerNav'
  import tool from '~/assets/lib/tool'
  import getData from '~/store/ajaxAPI/getData'
  import { mapState,mapActions,mapGetters} from 'vuex'


export default {

  data(){
    return {
      options: [{
        value: '优惠券',
      }, {
        value: '商品',
      }],
      checkedValue: '优惠券',   //搜索选择的默认选项
      navIndex: 0,            //导航激活下标
      moreNav: false,         //导航类型更多显示
      couponsMore: false,     //优惠券列表更多显示
      couponsTypeListAll:'',      //优惠券类列表
      couponsTypeListOne: '',     //优惠券类型头部列表
      couponsTypeListMore: '',    //优惠券类型更多列表
      couponsAllList: '',         //当前所有的优惠券
      pullsuccessedDialogVisible: false, //领取成功弹窗
      pulllosedDialogVisible: false,     //领取失败弹窗
      ispulled: false,                   //是否已领取
      nowCouponId: '',                   //當前領取卷票 id
      nowUseCoupon: false,               //是否立即使用
      moreImg: require("~/assets/images/couponslCenter/Down (1).png")
    }
  },
  computed: {
    ...mapGetters(
      {
      "loginDialogVisible":"loginDialogVisible",// 来自vuex index.js页面 getter
      }
    ),
    //模态窗口处理是否弹出登陆模态窗口  vuex默认不显示
    isLoginDialog(){
      return this.loginDialogVisible
    },
    userId: function(){
      var getStore = tool.loadFromLocal("CustomerMesg","ALL");
      if(getStore){
        return getStore.Id
      }else {
        return false;
      }
    },

  },
  watch:{
    nowUseCoupon: function (val) {
      if(val){
        //
        // console.log("立即使用",this.nowCouponId)
          this.toProductLook(this.nowCouponId);
      }
    }
  },
  mounted(){
	this.getcouponsTypeList();
    this.getcouponsAllList();
  },
  updated(){
      this._userAnimations()
  },
  methods: {
    //路由跳转
    toRouter(path){
      this.$router.push(path)
    },
    //交互动画绑定 #couponsCenter .couponsDes
    _userAnimations(){
     this.$nextTick(()=>{
       $('#couponsCenter .couponsDes .moveIconMg').hover(function(){
         $(this).css('transform', 'translateX(-5px)');
       }, function(){
         $(this).css('transform', 'translateX(0)');
       })
     })
    },
    //搜索功能
    onTextSearch(){
        let str = this.$refs.searchText.value.trim()

      if(str == null && str== '' ){
        return
      }else if(this.checkedValue == '优惠券' && str){
        //   this.$_post('/Customer/GetAllCouponList',{keyword: str},(res)=>{
        //     this.couponsAllList = res
        //     console.log( '32222222222222')

        //     console.log(this.couponsAllList)
        //     $('#couponsCenter .moreNav li').removeClass('navActive')
        //     $('#couponsCenter .showNav li').removeClass('navActive')
		//   },(err)=>{})
		var params = {
			keyword: str
		}
		getData.getAllCouponList(params).then((res) => {
			this.couponsAllList = res.data;
			$('#couponsCenter .moreNav li').removeClass('navActive');
            $('#couponsCenter .showNav li').removeClass('navActive');
		},(err) => {})
        }else if(this.checkedValue == '商品' && str){
		//    this.$router.push('/productList'+'/all/'+str)
			this.$router.push({path:'/productList',query:{typeIndex:'all',productName:str}});
        }else {
            return
        }
    },
    //获取优惠券类型列表
    getcouponsTypeList(){
      getData.SERVERLIST().then((res) => {
        this.couponsTypeListAll = res.data.list;
        this.couponsTypeListOne = res.data.list.slice(0,7);
        this.couponsTypeListMore = res.data.list.slice(7);
      })
    },
    //获取所有优惠券
    getcouponsAllList(){
      getData.getCouponListInfoAll().then((res) => {
        // console.log("22222222",res)
        this.couponsAllList = res.data.list;  //先获取全部通用的
      },(err) => {})
    },
    //通过类型导航 获取的优惠券列表
    getcouponsTypeListData(index,typeId){
      $('#couponsCenter .moreNav li').removeClass('navActive');
      $('#couponsCenter .showNav li').removeClass('navActive');
      $('#couponsCenter .showNav li').eq(index).addClass('navActive');
      $('#couponsCenter .couponsWrap .couItem_couponsWrap').find('.VisbleOld').removeClass('disVisble')
      $('#couponsCenter .couponsWrap .couItem_couponsWrap').find('.VisbleOld').removeClass('visble')
      $('#couponsCenter .couponsWrap .couItem_couponsWrap').find('.VisbleNow').removeClass('disVisble')
      $('#couponsCenter .couponsWrap .couItem_couponsWrap').find('.VisbleNow').removeClass('visble')
      this.navIndex = index;
      if(typeId){
      var params = {
        id:typeId
      }
      getData.getCouponListInfo(params).then((res) => {
        this.couponsAllList = res.data.list;
      },(err) => {})
          if(index>=8){ //更多导航的样式切换
            $('#couponsCenter .showNav li').removeClass('navActive');
            $('#couponsCenter .moreNav li').removeClass('navActive');
            $('#couponsCenter .moreNav li').eq(index-8).addClass('navActive');
            this.moreImg = require("~/assets/images/couponslCenter/Down (2).png")
          }
        }else {
          this.getcouponsAllList(); //获取全部通用券
        }
      },
    //领取优惠券
    receiveCoupons(couponsId, nowAmount, index){
        this.nowCouponId = couponsId;
        //监测是否已经登录
        var getStore = tool.loadFromLocal("CustomerMesg","ALL");
        // if(MonitorLogin() == true){
        if(getStore){
          if(nowAmount < 1){
            //1.点击未领取
            // let CustomerMesg = getStore('CustomerMesg');

            let userId = getStore.Id;
            var params = {
              customerid: userId,
              id:couponsId
            }
            getData.getCoupon(params).then((res) => {
              // console.log("params",params)
              //成功领取弹窗 是否立即使用
                    this.pullsuccessedDialogVisible = true;
                    // 改变当前领取的样式
                    $('#couponsCenter .couponsWrap .couItem_couponsWrap').eq(index).find('.VisbleOld').addClass('disVisble')
                    $('#couponsCenter .couponsWrap .couItem_couponsWrap').eq(index).find('.VisbleNow').addClass('visble')
            },(err) => {
              //2.可使用  跳转至商品详情
                    if(err.data.msg == "该用户已经领取此优惠券！"){
                      this.pulllosedDialogVisible = true;  //已经领用提示
                      // 防止领取后刷新页面 继续改变当前已领取的样式
                      $('#couponsCenter .couponsWrap .couItem_couponsWrap').eq(index).find('.VisbleOld').addClass('disVisble')
                      $('#couponsCenter .couponsWrap .couItem_couponsWrap').eq(index).find('.VisbleNow').addClass('visble')
                    }
            })
          }else {
            //3.已领完（进场看看）
           this.toProductLook(couponsId)
          }
        }else{
        //监测到未登录  弹出窗登录界面
        this.$store.dispatch('loginDialogVisible');
    }

   },
    //进入商品列表  （进场看看）
    toProductLook(couponsId){
      var params = {
        id:couponsId
      }
      getData.getProductListByCouponType(params).then((res) => {
        // console.log('我偶了')
        let prodlistData = res.data.list;
        //存储在vuex中
        this.$store.dispatch('setProductListData',prodlistData)
        // this.$router.push('/productList'+'/All/'+'All')
        this.$router.push({path:"/productList",query:{typeIndex:"all",productName:"all"}})
      })
    },
    //跳转至我的优惠券
    toMycoupons(userId){
        //是否登录
        var getStore = tool.loadFromLocal("CustomerMesg","ALL");
        if(getStore){
          this.$router.push( '/personalCenter/coupon');
        }else {
          //提弹出窗登录界面
          this.$store.dispatch('loginDialogVisible');
        }
    },
    //切换置下一个分类
    onCouponsMore(index,data){
        index ++;
        if(index>=data.length){
          this.$message({
            message: '想查看更多列表信息，请点击“更多” ！',
            type: 'warning'
          });
          return
        }
        var typeId = data[index -1 ].Id || '';
        this.getcouponsTypeListData(index,typeId);
    },
  },
  components:{
    topState,
    publicBottom,
    loginDialog,
    couponServerNav
  }
}
</script>

<style  lang='less' type='text/less'>
@import "./couponsCenter";
</style>
