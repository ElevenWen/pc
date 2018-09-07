<template>
  <div class="productDetails" id="productDetails">
    <!--公共头部-->
    <div class="c-headerContainWrap">
      <publicPendantR></publicPendantR>
      <navigationBar :topShopData="topShopData" :serverList="serverList"></navigationBar>
    </div>

    <!--主题内容-->
    <div class="contentWrap">
      <div class="breadcrumb">
        <span class="link"><nuxt-link class="redirect" :to="{path: '/'}">首页</nuxt-link></span>
        <i class="i-arrow-right"></i>
        <span>{{productData.Name}}</span>
      </div>
      <div class="detailsHeaderWrap">
        <div class="imgWrap">
          <ul class="maxImg">
            <li><img :data-src="productData.PCPosterImgURL" alt="" class="lazyload"></li>
          </ul>
          <div class="iconList">
            <!-- <div class="toleft" @click="transformIcon('right')"></div> -->
            <div class="iclist">
              <ul class="minIcon">
                <li class="cursor"><img :data-src="productData.PCPosterImgURL" alt="" class="lazyload"></li>
              </ul>
            </div>
            <!-- <div class="toright" @click="transformIcon('left')"></div> -->
          </div>
          <div class="userControls">
            <span class="collection" @click="collectionPage()" >{{collectText}}</span>
            <span class="analysis" @click="sharePage()"> 分享</span>
          </div>
        </div>
        <div class="detailsTextdes">
          <h1>{{productData.Name}}</h1>
          <p class="des" v-text="$route.params.type == 1 ? this.productData.Title : this.productData.Intro"></p>
          <div class="priceShow">
            <p>
              <span class="span_s">价格</span>
              <span style="color: #ff0000"> &#165; </span>
              <span class="price">{{unitPrice}}</span>
              <span style="color: #999999" class="margin"> &#165; </span>
              <span class="oldPrice">{{pageOldPrice}}</span>
            </p>
            <no-ssr>
            <div class="score">
              <span><span class="span_s">评分</span> {{countRate*2}}</span>
            </div>
            </no-ssr>
            <div class="historyStas">
              <div class="volume ">{{productData.Sold || 0}} <br> 交易成功</div>
              <div class="comment">{{CountPage}} <br> 评论数量</div>
            </div>
          </div>
          <div class="checkedShow">
            <!--商品服务类型-->
            <div class="severType" v-if="$route.params.type == 0" v-for=" (productItem,pIndex) in productDataList " :key="pIndex">
              <span>{{productItem.Name}}</span>
              <ul class="typeList " >
                <li class="listItem" v-for="(item, lIndex) in productItem.ProAttributeListPcModels"
                    :class="productData['Temp' + (pIndex +1)] == item.Id? 'isSelected' : '' "
                    @click="getCountPrice($event,pIndex+1,item.Id,lIndex,item.Name)" :key="lIndex">{{item.Name}}</li>
              </ul>
            </div>
            <!--套餐服务类型-->
            <div class="severType" v-if="$route.params.type == 1">
              <span>服务类型</span>
              <ul class="typeList" v-if="productData">
                <li class="isSelected" v-for="(item,index) in productData.ProPackageDetailModels" :key="index">{{item.Name}}</li>
              </ul>
            </div>
          </div>
          <!--满减活动未上线，没数据，暂时保留-->
          <!--<div class="coupons">
            <span class="title">领取优惠</span><span class="favItems">满减</span>
            <span>单笔</span>
            <el-tooltip content="点击领取，有效期2017.10.10-2018-10-10" placement="bottom" effect="light">
              <el-button><span class="reduce" @click="receiveCoupons()">满10000减50</span></el-button>
            </el-tooltip>
            <el-tooltip content="点击领取，有效期2017.10.10-2018-10-10" placement="bottom" effect="light">
              <el-button><span class="reduce" @click="receiveCoupons()">满5000减25</span></el-button>
            </el-tooltip>
          </div>-->
          <div class="number">
            <span>数量</span> <el-input-number :min="1" size="small" v-model="buyTotal" @change="handleChangeCount"></el-input-number>
          </div>
          <div class="button">
            <el-button type="danger" class="onshop" @click="onNowBuy">立即购买</el-button>
            <el-button plain class="addCart" @click="onAddCart" v-if="hiddenPay">加入购物车 </el-button>
          </div>
        </div>
        <div class="sellingTop">
          <hotProduct :productListsData="productListsData"></hotProduct>
        </div>
      </div>
      <div class="detailsFootWrap">
       <div class="serverNav">
         <div class="navTitle"><span class="icon"></span>相关服务推荐</div>
         <serverClassList :serverList="serverList"></serverClassList>
       </div>
        <div class="tabsWrap">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <!--tab1__服务详情-->
            <el-tab-pane label="服务详情" name="服务详情" class="Tab1Wrap">
              <ul class="taocanDetails" v-if="this.$route.params.type == 1">
                <li v-for="(detailItem, detIndex) in productData.ProPackageDetailModels" @click="productDetailsTab(detIndex)" >{{detailItem.Name}}</li>
              </ul>
              <div class="textImageWrap" v-html="textImageWrapHtml" v-if="textImageWrapHtml"></div>
              <div class="noneImgHtml" v-else="textImageWrapHtml">
                <img src="~assets/images/product/noneDetails.png" alt="">
                <p>该商家很懒，没有上传详情图片</p>
              </div>
            </el-tab-pane>
            <!--tab2__用户评论-->
            <el-tab-pane :label="'用户评论('+CountPage+')'" name="用户评论" class="Tab2Wrap">
              <div class="severCommentWrap" v-if="CountPage">
                <h3>服务评价</h3>
                <div class="commentShow">
                  <div class="starComment">
                    <el-rate
                      disabled
                      v-model="countRate">
                    </el-rate>
                    <span class="starText">{{countRate*2}}分</span>
                  </div>
                  <div class="sumStas">
                    <ul>
                      <!--<li>速度超快 <strong>()</strong></li>
                      <li>价格公道合理<strong>()</strong></li>
                      <li>实力推荐 <strong>()</strong></li>-->
                    </ul>
                  </div>
                </div>
                <div class="commentListWrap">
                  <el-tabs v-model="checkCommentType" @tab-click="handleClick">
                    <!--预留后面需求设计-->
                    <el-tab-pane :label="'全部评论('+CountPage+')'" name="全部评论" class="pl-tab1">
                      <ul class="listWrap">
                        <li class="items" v-for="comItem in commentLists">
                          <div class="userHead">
                            <img class="lazyload" :data-src="!comItem.ReviewType?comItem.HeadPicPath:defaultImg" alt="">
                          </div>
                          <div class="userMesWrap">
                            <ul class="userMes">
                              <li class="userName">{{!comItem.ReviewType?comItem.CustomerName:'匿名'}} <span class="date">{{comItem.CreateTime}}</span></li>
                              <li class="userStar">
                                <el-rate
                                disabled
                                v-model="comItem.Star">
                              </el-rate></li>
                              <li class="userMessage">{{comItem.Content}}</li>
                              <li class="userComWrap">
                                <span class="com" v-if="comItem.Label1">{{comItem.Label1}}</span>
                                <span class="com" v-if="comItem.Label2">{{comItem.Label2}}</span>
                                <span class="com" v-if="comItem.Label3">{{comItem.Label3}}</span>
                                <span class="com" v-if="comItem.Label4">{{comItem.Label4}}</span>
                                <span class="com" v-if="comItem.Label5">{{comItem.Label5}}</span>
                              </li>
                              <!--<li class="report"><span @click="reportDialogVisible = true">举报</span></li>-->
                            </ul>
                          </div>
                        </li>
                      </ul>
                      <div class="pageControl clearfix">
                        <el-pagination
                           @current-change="handleCurrentChange"
                           background
                           prev-text="上一页"
                           next-text="下一页"
                           :current-page="NowPage"
                           :page-size="pagesize"
                           layout="total, prev, pager, next, jumper"
                           :total="CountPage">
                        </el-pagination>
                      </div>

                    </el-tab-pane>
                  </el-tabs>
                </div>
              </div>
              <div class="severCommentWrap" v-else>暂无评论</div>
            </el-tab-pane>
            <!--tab3__售后服务-->
            <el-tab-pane label="售后服务" name="售后服务">
              <div class="serveWrap">
                <h3 class="serveH3">服务保障</h3>
                <ul class="serveItemsWrap">
                  <li class="serveItems">
                    <span class="itemTitle">我们承诺</span>
                    <span class="itemCon">关于服务质量的反馈,我们会第一时间专人处理,保证及时解决您的问题</span>
                  </li>
                  <li class="serveItems">
                    <span class="itemTitle">及时响应</span>
                    <span class="itemCon">在线咨询,<span class="themeColor">3分钟</span>内及时响应</span>
                  </li>
                  <li class="serveItems">
                    <span class="itemTitle">价格透明</span>
                    <span class="itemCon">我们的服务全部明码标价,无任何隐形收费真正做到价格标准化!</span>
                  </li>
                  <li class="serveItems">
                    <span class="itemTitle">系统管理</span>
                    <span class="itemCon"> 行业领先信息化系统,及时与后台数据对接,业务办理实施监控,超期预警,办理流程化!</span>
                  </li>
                  <li class="serveItems">
                    <span class="itemTitle">我们承诺</span>
                    <span class="itemCon"> 为每位客户专属高级顾问,时刻待命。你只需提出需求,剩下的我们为您办理!</span>
                  </li>
                  <li class="serveItems">
                    <span class="itemTitle">贴心服务</span>
                    <span class="itemCon">顺丰/EMS邮寄资料,安全速度有保障,如有需求,还可以提供上门办理,资料文件取松服务。</span>
                  </li>
                  <li class="serveItems">
                    <p class="itemTitle">服务售后</p>
                    <p class="itemCon">没有办理前可随时找我们退款，咨询电话&nbsp;:&nbsp;<span class="themeColor">400-8822-991</span></p>
                  </li>
                </ul>
              </div>
              <div class="complainWrap">
                <h3 class="serveH3">投诉渠道</h3>
                <ul class="complainItemsWrap">
                  <li class="complainItems">
                    在线客服QQ&nbsp;:&nbsp;<span>3452083279</span>
                  </li>
                  <li class="complainItems">
                    400客服&nbsp;:&nbsp;<span class="themeColor">400-8822-991</span>
                  </li>
                  <li class="complainItems">
                    投诉邮箱&nbsp;:&nbsp;<span>markting@wqbol.com</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>

    <!--其他部分弹窗-->
    <!--举报弹窗-->
    <!-- <el-dialog class="reportDialogWrap"
          title="请选择举报原因"
          :visible.sync="reportDialogVisible"
          width="630px"
          center>
      <div class="checks">
        <span>晒单图片与商品不符</span>
        <span>非法欺诈</span>
        <span>涉黄涉暴</span>
        <span>广告灌水</span>
        <span>其他</span>
      </div>
      <el-input type="textarea" placeholder="请详细原因，帮助我们更快处理举报内容(选填)" v-model="reportCodes" :maxlength="codeLength"></el-input>
      <div class="countText">还可以输入{{reportCodeLength}}字</div>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="reportDialogVisible = false" >确 定</el-button>
        <el-button @click="reportDialogVisible = false">取 消</el-button>
      </div>
    </el-dialog> -->
    <!--分享弹窗-->
    <el-dialog class="sharDialogWrap"
              title="分享给好友"
              :visible.sync="sharDialogVisible"
              width="630px"
              center>
      <div class="checkShar">
        <span>分享到:</span>
        <ul>
          <li><input type="radio" name="radio" @click="chooseShare(1)"><img src="~assets/images/product/xinlang.png" alt=""></li>
          <!-- <li><input type="radio" @click="chooseShare(2)"><img src="~assets/images/product/weixinpyq.png" alt=""></li> -->
          <li>
              <input type="radio" name="radio" @click="chooseShare(3)">
              <img src="~assets/images/product/QQkj.png" alt="">
          </li>
          <!-- <li><input type="radio" name="radio" @click="chooseShare(4)"><img src="~assets/images/product/rrw.png" alt=""></li> -->
          <li><input type="radio" name="radio" @click="chooseShare(5)"><img src="~assets/images/product/dbw.png" alt=""></li>
        </ul>
      </div>
      <el-input type="textarea" placeholder="" v-model="content" :maxlength="codeLength" > </el-input>
      <div class="countText">还可以输入{{sharCodeLength}}字</div>
      <div class="productList">
        <p>选择配图:</p>
        <!-- <div class="toleft" @click="transformIcon('right')"></div> -->
        <div class="toleft"></div>
        <div class="iclist">
          <ul class="minIcon2">
            <li><img class="lazyload" :data-src="productData.PCThumbImgURL" alt=""></li>
            <!-- <li @click="toMaxImg(1)"><img src="~assets/images/product/products_S1.png" alt=""></li>
            <li @click="toMaxImg(2)"><img src="~assets/images/product/products_S2.png" alt=""></li>
            <li @click="toMaxImg(3)"><img src="~assets/images/product/products_S0.png" alt=""></li>
            <li @click="toMaxImg(4)"><img src="~assets/images/product/products_S1.png" alt=""></li> -->
          </ul>
        </div>
        <!-- <div class="toright" @click="transformIcon('left')"></div> -->
        <div class="toright"></div>
      </div>
      <div class="dialog-footer">
        <a :href="'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?'+qqParams" target="_blank" v-if="qqIsShare == true">
        <el-button type="danger">分享</el-button>
        </a>
        <a :href="'https://v.t.sina.com.cn/share/share.php?'+xParams" target="_blank" v-else-if="weiboIsShare == true">
        <el-button type="danger">分享</el-button>
        </a>
        <a :href="'https://widget.renren.com/dialog/share?'+renParams" target="_blank" v-else-if="renIsShare == true">
        <el-button type="danger">分享</el-button>
        </a>
        <a :href="'https://www.douban.com/recommend/?'+douParams" target="_blank" v-else-if="doubanIsShare == true">
        <el-button type="danger">分享</el-button>
        </a>
        <el-button type="danger" v-else @click="noChoose">分享</el-button>
      </div>
    </el-dialog>

    <!--领券成功/已领取弹窗-->
    <no-ssr>
      <el-dialog class="receiveDialogWrap"
        title="温馨提示"
        :visible.sync="receiveDialogVisible"
        width="30%">
        <!--成功领取-->
        <div class="receiveSuccessed" v-if="isReceived == false">
          <img src="~assets/images/product/compilt.png" alt="">
          <div class="text">
            <p>你已成功领取 <span style="color: #ff3e08">满10000减50</span>的优惠券。</p>
            <span class="toMyCoupon">查看我的优惠券</span>
          </div>
        </div>
        <!--已领取-->
        <div class="received" v-if="isReceived">
          <img src="~assets/images/product/flaseicon.png" alt="">
          <div class="text">
            <p>你已领取该优惠券，不能重复领取！</p>
            <span class="toMyCoupon">查看我的优惠券</span>
          </div>
        </div>
      </el-dialog>
    </no-ssr>

    <!--收藏成功/已收藏弹窗-->
    <no-ssr>
      <el-dialog class="collectionDialogWrap"
                title="温馨提示"
                :visible.sync="collectionDialogVisible"
                width="380px">
        <!--收藏成功-->
        <div class="colleSuccessed" >
          <img src="~assets/images/product/compilt.png" alt="">
          <div class="text">
            <p class="p1">您成功收藏该商品</p>
            <p class="p2"><span @click="toRuter('/personalCenter/collect')">查看我的收藏 </span> <!--<span>|</span> <span>相似产品</span>--> </p>
          </div>
        </div>
        <!--已收藏-->
        <div class="colled">
          <img src="~assets/images/product/flaseicon.png" alt="">
          <div class="text">
            <p class="p1">你已收藏该商品,不能重复收藏</p>
            <p class="p2"><span @click="toRuter('/personalCenter/collect')">查看我的收藏 </span> <!--<span>|</span> <span>相似产品</span>--></p>
          </div>
        </div>
      </el-dialog>
    </no-ssr>

    <!--登录弹窗-->
    <no-ssr>
      <loginDialog v-if="isLoginDialog" :source="source"></loginDialog>
    </no-ssr>

    <!--抛物图片-->
    <no-ssr>
      <transition @after-enter='afterEnter' @before-enter="beforeEnter">
        <!--整张图片-->
        <div class="move_img" v-if="showMoveImg" :style="{left:(cartPositionL-15) + 'px',top:(cartPositionT-15) + 'px'}">
          <div class="move_img-box"><img class="move_img-img" :src="productData.PCThumbImgURL"></div>
        </div>
      </transition>
    </no-ssr>
  </div>
</template>

<script>
import publicPendantR from "~/components/common/publicPendantR";
import navigationBar from "~/components/common/navigationBar";
import loginDialog from "~/components/common/loginDialog/loginDialog";
import hotProduct from "~/components/production/hotProduct.vue";
import serverClassList from "~/components/production/serverClassList.vue";
import tool from "~/assets/lib/tool.js";
import getd from "~/store/ajaxAPI/getData.js";
import { mapGetters } from "vuex";
import {
  productDetails_type,
  recommend_mobileCode,
  urlShortPort
} from "~/store/ajaxAPI/vueDynamicParams.js";
import axios from "axios";
// import qs from "qs";
import { getDataPort } from "~/store/ajaxAPI/perPort.js";
// import api from "~/store/ajaxAPI/getDataPack";

// const baseURL = getDataPort;
// // axios 取消请求
// var CancelToken = axios.CancelToken; // 这里声明的cancelToken其实相当于是一个标记,当我们要取消请求的时候，可以通过这个找到该请求
// var source = CancelToken.source();
// // axios 超时重新请求数据
// axios.defaults.timeout = 10000; // 超时时间
// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded;charset=utf-8";
// axios.interceptors.request.use(
//   config => {
//     if (config.method === "post") {
//       // config.data = qs.stringify(config.data);
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(err);
//   }
// );
// axios.defaults.retry = 2; // 重新请求次数
// axios.defaults.retryDelay = 1000; // 重新请求间隔
// axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
//   var config = err.config;
//   // If config does not exist or the retry option is not set, reject
//   if (!config || !config.retry) return Promise.reject(err);

//   // Set the variable for keeping track of the retry count
//   config.__retryCount = config.__retryCount || 0;

//   // Check if we've maxed out the total number of retries
//   if (config.__retryCount >= config.retry) {
//     // Reject with the error
//     return Promise.reject(err);
//   }

//   // Increase the retry count
//   config.__retryCount += 1;

//   // Create new promise to handle exponential backoff
//   var backoff = new Promise(function(resolve) {
//     setTimeout(function() {
//       resolve();
//     }, config.retryDelay || 1);
//   });

//   // Return the promise in which recalls axios to retry the request
//   return backoff.then(function() {
//     return axios(config);
//   });
// });

export default {
  name: "productDetails-id-type",
  components: {
    publicPendantR,
    navigationBar,
    hotProduct,
    serverClassList,
    loginDialog
  },
  watch: {
    // $route: "fetchRoute",
    // $route(to, from) {
    // console.log(to.path);
    // }
  },
  data() {
    return {
      // category: "", //seo傳值
      iconOldIndex: "", //小图选择旧坐标
      isCheckedIcon: false, //是否选中当前小图
      productData: {}, //当前商品信息
      productDataList: [], //该商品下服务列表
      productTypeArr: [], //产品类型存储列表数组
      productTypeString: "", //产品类型存储字符串
      unitPrice: "0.00", //商品单价值
      pageOldPrice: '',   //久价格显示
      textImageWrapHtml: "", //商品详情html渲染的数据
      CountPrice: "", //当前商品总价格
      isCheckPrice: true, //是否选择了价格类型
      id_Data1: "", //获取价格id1值
      id_Data2: "", //获取价格id2值
      id_Data3: "", //获取价格id3值
      buyTotal: 1, //购买商品数量
      showMoveImg: false, //购物车 抛物线动画
      cartPositionL: 0, //目标位置x
      cartPositionT: 0, //目标位置y
      elLeft: 0, //起始位置x
      elTop: 0, //起始位置y
      customerMsg: "", //当前客户系统信息
      activeName: "服务详情", //当前Tab切换页
      checkCommentType: "全部评论", //选中的tab切换页
      nowTage: 0, //当前切换坐标
      maxRate: 10, //最高星星评分
      countRate: 0, //商品总星评分
      commentList: [], //评论列表
      CountPage: 0, //评论条数
      NowPage: 1, //评论内容当前页数
      pagesize: 10, //评论内容每页条数
      reportDialogVisible: false, //举报弹窗
      sharDialogVisible: false, //分享弹窗
      reportCodes: "", //举报内容
      shartCodes: `我在@微企宝发现了一个非常不错的商品：`, //分享内容
      content: "", //分享内容
      codeLength: 150, //字数限制
      receiveDialogVisible: false, //领取弹窗
      isReceived: false, //是否已领取
      collectionDialogVisible: false, //收藏弹窗
      isColled: false, //是否已收藏
      collectionId: "", //收藏id 用来移除收藏使用
      qqParams: "", //qq分享的参数
      xParams: "", //新浪分享参数
      renParams: "", //人人分享参数
      douParams: "", //豆瓣分享参数
      qqIsShare: false, //qq是否被分享
      weiboIsShare: false, //微博是否被分享
      wechatIsShare: false, //微信是否被分享
      doubanIsShare: false, //豆瓣是否被分享
      renIsShare: false, //人人是否被分享
      shareShortUrl: "", //短链接
      isChooseImg: "", //分享时是否选择了图片
      isChooseShare: "",
      collectText: this.isColled == true ? "已收藏" : "收藏", //收藏or已收藏文字
      isbugTo: true, //防止快速切换，导致购买价格不对问题
      defaultImg: require("../../../static/images/common/defaultimg.png"),
      hiddenPay: true, //处理特殊产品支付方式
      source: "商品详情", //传入登陆弹窗的值
      seoData: { Title: "", KeyWords: "", Description: "" },
      productListsData: [] //热销产品列表
    };
  },
  asyncData({ store, route, error, redirect }) {
    let id = route.params.id,
      type = route.params.type,
      mealParam = {
        params: {}
      },
      goodsParam = {
        Id: id
      },
      reviewParam = {
        productId: id
      };
    // id/type无效，返回首页
    if (!(id.length === 36 && (type === "0" || type === "1"))) {
      return redirect("/");
    }

    return axios.all([
      getTopList(),
      getServerClass(),
      getGoodsDetail(),
      getGoodsSku(),
      // getReview(),
      // getReviewStar(),
      getSEO(),
      getProductList()
    ])
      .then(
        axios.spread((
          topShopData,
          serverList,
          goodsData,
          skuData,
          // review,
          // reviewStar,
          seo,
          productList
        ) => {

          // if (Object.keys(goodsData.data).length === 0) {
          //   return {
          //     getStatus: 404,
          //     serverList: [],
          //     productData: {}
          //   };
          // }
          if (goodsData.data.Id === null) {
            // 无效的路由
            return redirect("/");
          }
          if (type === "1") {
            skuData = {
              data: {
                list: null
              }
            };
          }
          // seo接口返回判断
          if (typeof seo === "object") {

          } else {
            seo = {
              data: {
                list: []
              }
            }
          }


          return {
            getStatus: 200,
            topShopData: topShopData.data.list.length
              ? topShopData.data.list
              : [],
            serverList: serverList.data.list || [],
            productData: goodsData.data,
            productDataList: skuData.data.list,
            // commentList: review.data.list || [],
            // CountPage: Number(review.data.recordCount) || 0,
            // countRate: Number(reviewStar.data.countStar) || 0,
            seoData: seo.data.list.length
              ? seo.data.list[0]
              : { Title: "", KeyWords: "", Description: "" },
            productListsData: productList.data.list,
          };

        })
      )
      .catch(e => {
//      console.log(e);
        error({ statusCode: 404, message: "Post not found" });
      });

    //商品三级分类
    function getServerClass() {
      return getd.getServerClass(mealParam).catch(error => {
//      console.log(error);
      });
    }
    //顶部nav导航列表
    function getTopList() {
      return getd.getTopList(mealParam).catch(error => {
//      console.log(error);
      });
    }
    //商品详情
    function getGoodsDetail() {
      if (type === "0") {
        //商品处理
        return getd.getProductInfo(goodsParam)
            .catch(error => {
//            console.log(error);
            });
      } else if (type === "1") {
        //套餐处理
        return getd.GetProckageInfoById(goodsParam).catch(error => {
//        console.log(error);
        });
      }
    }
    //商品sku列表
    function getGoodsSku() {
      if (type === "0") {
        return getd.getProductTypeByProductId(goodsParam).catch(error => {
//        console.log(error);
        });
      } else {
        return getSEO();
      }
    }
    //获取商品评论
    function getReview() {
      return getd.ProReview(reviewParam).catch(error => {
//      console.log(error);
      });
    }
    //获取商品评论总星级
    function getReviewStar() {
      return getd.getStarById(reviewParam).catch(error => {
//      console.log(error);
      });
    }
    // 标题关键字
    function getSEO() {
      let params = {
        params: {
          code: type === "0" ? "Product" : "Package",
          tempId: id
        }
      };
      return getd.seo(params).catch(error => {
//      console.log(error);
      });
    }
    //获取销量前12商品
    function getProductList() {
      let params = {
        params: {
          pageSize: 12
        }
      };
      return getd.getAllList(params).catch(error => {
//      console.log(error);
      });
    }
  },
  /* async asyncData({ store, params, error, redirect }) {
    let id = params.id,
      type = params.type,
      getStatus = false,
      seoList = null,
      productInfo = null,
      productType = null,
      review = null,
      reviewStar = null;

    if (type !== "0" && type !== "1") {
      return redirect("/");
    }

    // 商品详情
    if (type === "0") {
      // 单件商品详情
      // productInfo = await axios
      //   .post(baseURL + `/Product/GetProductInfoById`, {
      //     params: {
      //       Id: params.id,
      //       cancelToken: source.token // 取消请求参数
      //     }
      //   })
      //   .catch(error => {
      //     // console.log('config',error.config);
      //     source.cancel(); //执行取消请求, 可以带msg
      //     productInfo = null;
      //   });
       productInfo = await getd.getProductInfo({
          // params: {
            Id: params.id,
            // cancelToken: source.token // 取消请求参数
          // }
        }).catch(error => {
          console.log('config',error.config);
          // source.cancel(); //执行取消请求, 可以带msg
          productInfo = null;
        });

      //商品对应服务列表
      productType = await axios
        .post(baseURL + `/Product/GetProductTypeByProductId`, {
          params: {
            Id: params.id,
            cancelToken: source.token // 取消请求参数
          }
        })
        .catch(error => {
          source.cancel(); //执行取消请求, 可以带msg
        });
    } else if (type === "1") {
      //套餐详情
      // productInfo = await axios
      //   .post(baseURL + `/ProPackage/GetProckageInfoById`, {
      //     params: {
      //       Id: params.id,
      //       cancelToken: source.token //两个位置都可以
      //     }
      //   })
      //   .catch(error => {
      //     // console.log('config',error.config);
      //     // source.cancel(); //执行取消请求, 可以带msg
      //     productInfo = null;
      //   });
        productInfo = await api.fetch("post", "/Product/GetProductInfoById", {
            Id: params.id,
            cancelToken: source.token // 取消请求参数
        }).catch(error => {
          console.log('config',error.config);
          // source.cancel(); //执行取消请求, 可以带msg
          productInfo = null;
        });
    }
    console.log('productInfo',productInfo);

    if (productInfo) {
      getStatus = 200;
    } else {
      return {
        getStatus: getStatus,
        seoData: seoList,
        productInfo: {}
      };
      // return redirect("/");
    }

    // SEO
    seoList = await axios
      .get(baseURL + `/System/GetSEOList`, {
        params: {
          code: type == "0" ? "Product" : "Package",
          tempId: id,
          cancelToken: source.token // 取消请求参数
        }
      })
      .catch(error => {
        source.cancel(); //执行取消请求, 可以带msg
      });

    // 获取评论列表信息
    review = await axios
      .post(baseURL + `/ProReview/List`, {
        params: {
          tempId: id,
          cancelToken: source.token // 取消请求参数
        }
      })
      .catch(error => {
        source.cancel(); //执行取消请求, 可以带msg
      });

    // 获取商品评论总星级
    reviewStar = await axios
      .post(baseURL + `/ProReview/GetStarById`, {
        params: {
          productId: id,
          cancelToken: source.token // 取消请求参数
        }
      })
      .catch(error => {
        source.cancel(); //执行取消请求, 可以带msg
      });

    return {
      getStatus: getStatus,
      seoData: seoList
        ? seoList.data.data.list[0]
        : { Title: "", KeyWords: "", Description: "" },
      productData: productInfo ? productInfo.data.data : {},
      productDataList: productType ? productType.data.data.list : [],
      commentList: review ? review.data.data.list : [],
      CountPage: review ? Number(review.data.data.recordCount) : 0,
      countRate: reviewStar ? Number(reviewStar.data.data.countStar) : 0
    };
  }, */
  head() {
    return {
      title: this.seoData.Title || this.productData.Name + " - 微企宝",
      meta: [
        {
          hid: "keywords",
          name: "keywords",
          content: this.seoData.KeyWords || this.productData.Name
        },
        {
          hid: "description",
          name: "description",
          content: this.seoData.Description || this.productData.Intro
        }
      ]
    };
  },

  created() {

    let $id = this.$route.params.id,
      $type = this.$route.params.type,
      reviewParam = {
        productId: $id
      };

    if (this.getStatus === 200) {


      //获取商品评论总星级
      getd
        .getStarById(reviewParam)
        .then(res => {
          this.countRate = Number(res.data.countStar) || 0;
        })
        .catch(error => {
          // console.log(error);
        });

      //获取商品评论
      getd
        .ProReview(reviewParam)
        .then(res => {
          this.commentList = res.data.list || [];
          this.CountPage = Number(res.data.recordCount) || 0;
        })
        .catch(error => {
          // console.log(error);
        });

      // 转换短链接
      getd
        .urlShort({
          url: `${urlShortPort}/productDetails/${this.$route.params.id}/${
            this.$route.params.type
          }`
        })
        .then(res => {
          this.shareShortUrl = res.data.url_short;
          // console.log("this.shareShortUrl", this.shareShortUrl);
        });

      this.CountPrice = this.productData.Price;
      //  this.unitPrice = this.productData.Price; 套餐和商品单独处理
      if ($type === "0") {
        this.hiddenPay =
          this.productData.Code == "WQBCZ" || this.productData.Code == "YDZCZ"
            ? false
            : true;
        //详情图片渲染
        this.textImageWrapHtml = this.productData.PCProductDetails;

          //默认选中 初始化处理
          this.id_Data1 = this.productData.Temp1;
          this.productDataList[0].ProAttributeListPcModels.forEach((ele)=>{
              if(ele.Id == this.id_Data1 ){
                  this.productTypeArr.push(ele.Name)
              }
          })

          this.id_Data2 = this.productData.Temp2 == '00000000-0000-0000-0000-000000000000'? '': this.productData.Temp2;
          if(this.id_Data2){
              this.productDataList[1].ProAttributeListPcModels.forEach((ele)=>{
                  if(ele.Id == this.id_Data2 ){
                      this.productTypeArr.push(ele.Name)
                  }
              })
          }
          this.id_Data3 = this.productData.Temp3 == '00000000-0000-0000-0000-000000000000'? '': this.productData.Temp3;
          if(this.id_Data3){
              this.productDataList[0].ProAttributeListPcModels.forEach((ele)=>{
                  if(ele.Id == this.id_Data3 ){
                      this.productTypeArr.push(ele.Name)
                  }
              })
          }
          this.productTypeString = this.productTypeArr.join(',')
          var paramsO = {
              id: this.productData.Id,
              id1: this.id_Data1,
              id2: this.id_Data2,
              id3: this.id_Data3
          };
          getd.getProductPriceByProductIdd(paramsO).then(res => {
              this.CountPrice = res.data.price;
              this.unitPrice = res.data.price;
              this.pageOldPrice = res.data.oldPrice;
              this.isbugTo = true; //当前价格得到后才可切换
          });

//          console.log('当前价格',this.unitPrice)
//          console.log('选中类型',this.productTypeString)
      } else {
        this.unitPrice = this.productData.Price;
        this.pageOldPrice = this.productData.OriginalPrice;
        this.isCheckPrice = true; //默认选择全部
        this.isbugTo = true; //直接可购买
        //渲染详情展示
        this.productDetailsTab(0);
      }
      //
    }
  },
  mounted() {
    // this.getProductDetails(); //商品详情
    // this.getCommentList(); //评论列表信息
    // this.getStarCount(); //星级评分
    //this.getCustomerMsg();  //用户系统信息
    //後台記錄 瀏覽記錄
    //      var params = {
    //        productId:this.$route.params.id
    //      }
    //    getd.getCusBrowseRecord(params)
    //    .then((res)=>{
    //    });

    //   let params = {
    //     url:location.href
    //   }
    //   // 长链接 转短链接
    //   getd.urlShort(params).then((res)=>{
    //     this.shareShortUrl = res.url_short
    //   }).catch((error)=>{
    //     this.shareShortUrl = error
    //   })

    this.collectionedStyle(); //收藏样式初始化
  },
  computed: {
    ...mapGetters({
      loginDialogVisible: "loginDialogVisible" // 来自vuex index.js页面 getter
    }),
    //模态窗口处理是否弹出登陆模态窗口  vuex默认不显示
    isLoginDialog() {
      // console.log('我在详情页面' , this.loginDialogVisible  )
      return this.loginDialogVisible;
    },
    //评论列表分页处理
    commentLists: function() {
      return this.commentList.slice(
        (this.NowPage - 1) * this.pagesize,
        this.NowPage * this.pagesize
      );
    },

    //举报字数计算
    reportCodeLength: function() {
      var str = this.reportCodes;
      if (str.length <= 150) {
        return 150 - str.length;
      } else {
        return 0;
      }
    },
    //分享内容字数计算
    sharCodeLength: function() {
      var str = this.content;
      if (str.length <= 150) {
        return 150 - str.length;
      } else {
        return 0;
      }
    }
  },
  methods: {
    chooseShare(val) {
      //选择分享到哪个社交软件
      if (this.shareShortUrl.code == "401") {
        return this.$message.error("請重新刷新頁面");
      }
      this.isChooseShare = val;
      if (val == 1) {
        // 新浪
        this.weiboIsShare = true;
        this.qqIsShare = false;
        this.doubanIsShare = false;
        this.renIsShare = false;
        var params = {
          title: "【分享来自@微企宝】" + this.content, //分享标题
          url: this.shareShortUrl, //分享链接
          content: "utf-8", //页面编码
          pic: this.isChooseImg //分享图片
        };
        var aaa = [];
        for (var i in params) {
          aaa.push(i + "=" + encodeURIComponent(params[i] || ""));
        }
        this.xParams = aaa.join("&");
      } else if (val == 2) {
        //微信
        this.wechatIsShare = true;
      } else if (val == 3) {
        //qq
        this.qqIsShare = true;
        this.weiboIsShare = false;
        this.doubanIsShare = false;
        this.renIsShare = false;
        var p = {
          url: encodeURIComponent(this.shareShortUrl), //分享链接
          desc: "" /*默认分享理由(可选)*/,

          summary: this.content /*分享摘要(可选)*/,
          title: "【分享来自@微企宝】" + this.content,
          pics: this.isChooseImg /*分享图片的路径(可选)*/
        };
        var s = [];
        for (var i in p) {
          if (i == "pics") {
            //图片路径的话 不要转码  不要转码  不要转码
            s.push(i + "=" + p[i]);
          } else {
            s.push(i + "=" + encodeURIComponent(p[i] || ""));
          }
        }
        this.qqParams = s.join("&");
      } else if (val == 4) {
        //人人
        this.renIsShare = true;
        this.qqIsShare = false;
        this.weiboIsShare = false;
        this.doubanIsShare = false;
        var renParams = {
          title: "【分享来自@微企宝】" + this.content, //分享标题
          url: this.shareShortUrl, //分享链接
          pic: this.isChooseImg //分享图片
        };
        var renren = [];
        for (var i in renParams) {
          renren.push(i + "=" + encodeURIComponent(renParams[i] || ""));
        }
        this.renParams = renren.join("&");
      } else if (val == 5) {
        //豆瓣
        this.doubanIsShare = true;
        this.renIsShare = false;
        this.qqIsShare = false;
        this.weiboIsShare = false;
        var douParams = {
          title: "【分享来自@微企宝】" + this.content, //分享标题
          // url:"http://www.baidu.com",//分享链接
          url: this.shareShortUrl, //分享链接
          image: this.isChooseImg //分享图片
        };
        var douban = [];
        for (var i in douParams) {
          douban.push(i + "=" + encodeURIComponent(douParams[i] || ""));
        }
        this.douParams = douban.join("&");
      }
    },
    noChoose() {
      //如果客户没有勾选分享到哪个社交软件  则给提示
      this.$message.error("请先选择分享到哪块领土");
    },
    //路由跳转
    toRuter(path) {
      this.$router.push(path);
    },
    //商品小图切换大图
    toMaxImg(ShowIndex) {
      //图片未被选中
      if (this.iconOldIndex === ShowIndex && this.isCheckedIcon == false) {
        $("#productDetails .minIcon2 > li >img")
          .eq(ShowIndex)
          .css("border", 0);
        this.isChooseImg = "";
        this.chooseShare(this.isChooseShare);
      } else {
        //图片被选中
        this.isChooseImg = this.productData.PCThumbImgURL;
        this.chooseShare(this.isChooseShare);
        $("#productDetails .maxImg > li").css("display", "none");
        $("#productDetails .minIcon > li >img").css("border", 0);
        $("#productDetails .minIcon2 > li >img").css("border", 0);
        $("#productDetails .maxImg > li")
          .eq(ShowIndex)
          .css("display", "block");
        $("#productDetails .minIcon > li >img")
          .eq(ShowIndex)
          .css("border", "2px solid rgba(255, 62, 8, 0.81)");
        $("#productDetails .minIcon2 > li >img")
          .eq(ShowIndex)
          .css("border", "2px solid rgba(255, 62, 8, 0.81)");
      }
      this.iconOldIndex = ShowIndex;
      this.isCheckedIcon = !this.isCheckedIcon;
    },
    //--切换小图列表
    transformIcon(isleft) {
      let itemWidth = 70;
      let countItem = $("#productDetails .iclist ul > li").length;
      if (isleft == "left") {
        if (this.nowTage >= countItem - 1) {
          return;
        }
        this.nowTage++;
        $("#productDetails .iclist ul").css(
          "transform",
          "translateX(" + itemWidth * -this.nowTage + "px)"
        );
      } else {
        if (this.nowTage <= 0) {
          return;
        }
        this.nowTage--;
        $("#productDetails .iclist ul").css(
          "transform",
          "translateX(" + itemWidth * -this.nowTage + "px)"
        );
      }
    },
    //领取优惠券
    receiveCoupons() {
      this.receiveDialogVisible = true;
    },
    //当前用户系统信息
    getCustomerMsg() {
      getd.getcustorInfor().then(res => {
        this.customerMsg = res.data;
      });
    },
    /* //获取当前商品详情信息、及对应的服务列表属性
    getProductDetails() {
      //处理SEO傳值
      // this.category = this.$route.params.type == 0 ? "Product" : "Package";

      var params = {
        Id: this.$route.params.id
      };
      //商品处理
      if (this.$route.params.type == 0) {
        getd.getProductInfo(params).then(res => {
          // console.log('获取详情' , res )
          this.productData = res.data;
          this.CountPrice = this.productData.Price;
          this.unitPrice = this.productData.Price;
          this.hiddenPay =
            this.productData.Code == "WQBCZ" || this.productData.Code == "YDZCZ"
              ? false
              : true;
          //详情图片渲染
          this.textImageWrapHtml = this.productData.PCProductDetails;
        });
        //商品对应服务列表
        getd.getProductTypeByProductId(params).then(res => {
          this.productDataList = res.data.list;
        });
      } else if (this.$route.params.type == 1) {
        //套餐处理
        this.isCheckPrice = true; //默认选择全部
        this.isbugTo = true; //直接可购买
        getd.GetProckageInfoById(params).then(res => {
          this.productData = res.data;
          this.CountPrice = this.productData.Price;
          this.unitPrice = this.productData.Price;
          //渲染详情展示
          this.productDetailsTab(0);
        });
      }
    }, */
    //套餐详情页切换
    productDetailsTab(tabIndex) {
      this.$nextTick(() => {
        $("#productDetails .Tab1Wrap .taocanDetails > li").removeClass(
          "tabActive"
        );
        $("#productDetails .Tab1Wrap .taocanDetails > li")
          .eq(tabIndex)
          .addClass("tabActive");
      });
      //详情图片渲染
      this.textImageWrapHtml = this.productData.ProPackageDetailModels[
        tabIndex
      ].PCProductDetails;
    },
    //获取当前价格
    getCountPrice(e, indexId, idData, lIndex, typeName) {
      //重置数量
      // this.buyTotal =1;
      //重置价格切换
      this.isbugTo = false;
      //样式切换
      // if($(e.target).hasClass('isSelected')){
      //   $(e.target).removeClass('isSelected')
      // }else{
      //   $(e.target).addClass('isSelected')
      //   $('#productDetails .checkedShow .severType').eq(indexId-1).find('.listItem').removeClass('isSelected')
      //   $('#productDetails .checkedShow .severType').eq(indexId-1).find('.listItem').eq(lIndex).addClass('isSelected');
      // }
      $("#productDetails .checkedShow .severType")
        .eq(indexId - 1)
        .find(".listItem")
        .removeClass("isSelected");
      $("#productDetails .checkedShow .severType")
        .eq(indexId - 1)
        .find(".listItem")
        .eq(lIndex)
        .addClass("isSelected");
      var nowProducId = this.productData.Id;
      switch (indexId) {
        case 1:
          this.id_Data1 = idData;
          this.productTypeArr[0] = typeName;
          break;
        case 2:
          this.id_Data2 = idData;
          this.productTypeArr[1] = typeName;
          break;
        case 3:
          this.id_Data3 = idData;
          this.productTypeArr[2] = typeName;
          break;
        default:
          return;
      }

      if (
        this.productTypeArr.length == this.productDataList.length &&
        this.productTypeArr[0] != null &&
        this.productTypeArr[this.productDataList.length - 1] != null
      ) {
        this.isCheckPrice = true; //是否选择完整
      }

      this.productTypeString = this.productTypeArr.join(",");

        var params = {
        id: nowProducId,
        id1: this.id_Data1,
        id2: this.id_Data2,
        id3: this.id_Data3
      };
      getd.getProductPriceByProductIdd(params).then(res => {
        this.CountPrice = res.data.price;
        this.unitPrice = res.data.price;
        this.pageOldPrice = res.data.oldPrice;
        this.isbugTo = true; //当前价格得到后才可切换
      });
    },
    //获取当前购买数量得到总金额
    handleChangeCount(value) {
      this.CountPrice = Number(this.unitPrice) * value;
    },
    //立即购买
    onNowBuy() {
      if (tool.loadFromLocal("CustomerMesg", "ALL")) {
        if (this.productData.ProductStatus === 1) {
          //处理该商品下架
          this.$message.error("抱歉！该商品已下架，不能进行购买");
          return;
        }
        //商品
        if (this.$route.params.type == 0) {
          if (this.isCheckPrice) {
            if (this.isbugTo === false) {
              /* this.$message({
                          showClose: true,
                          message: '请等待~',
                          type: 'warning'
                        }); */
              return;
            }
            //充值特殊处理

            // console.log( this.productData.Code ,'我是code')
            if (
              this.productData.Code === "WQBCZ" ||
              this.productData.Code == "YDZCZ"
            ) {
              //充值商品 业务不需选择服务类型
              var params = {
                id: this.$route.params.id,
                amount: this.unitPrice,
                num: this.buyTotal,
                oldAmount: this.unitPrice / (this.productData.Discount / 100),
                productType: this.productTypeString,
                SalesPromotionId: "" //促销编号暂时为空
              };
              getd
                .GetOrderListByProductId(params)
                .then(res => {
                  // if(res.data === null){
                  //   this.$message.error(res.msg);
                  //   return
                  // }
                  let obj = res.data;
                  obj[0].IsChecked = true;
                  obj[0].Code = "WQBCZ";
                  obj[0].Id = this.$route.params.id;
                  obj[0].Num = this.buyTotal;
                  let nowObj = { list: obj };
                  // console.log('obj',obj)
                  // console.log( 'nowObj' ,nowObj   )
                  tool.saveToLocal("orderMesg", nowObj);
                  this.$router.push({
                    path: "/cart/settleAccounts",
                    query: { isNowBuy: "yes" }
                  });
                })
                .catch(error => {
                  this.$message.error(error.data.msg);
                });
            } else {
              //一般商品
              var params = {
                id: this.$route.params.id,
                amount: this.unitPrice,
                num: this.buyTotal,
                oldAmount: this.unitPrice / (this.productData.Discount / 100),
                productType: this.productTypeString
              };
              getd
                .GetOrderListByProductId(params)
                .then(res => {
                  // if(res.data === null){
                  //   this.$message.error(res.msg);
                  //   return
                  // }

                  //增加本地存储
                  let obj = res.data;

                  obj[0].IsChecked = true;
                  obj[0].Id = this.$route.params.id;
                  obj[0].Num = this.buyTotal;
                  let nowObj = { list: obj };
                  tool.saveToLocal("orderMesg", nowObj);
                  //this.$router.push('/cart/settleAccounts')
                  this.$router.push({
                    path: "/cart/settleAccounts",
                    query: { isNowBuy: "yes" }
                  });
                })
                .catch(error => {
                  this.$message.error(error.data.msg);
                });
            }
          } else {
            this.$message({
              showClose: true,
              message: "请先选择完整服务类型后，再进行购买哦~",
              type: "warning"
            });
          }
        } else if (this.$route.params.type == 1) {
          //套餐

          //  console.log( this.productData ,'我是code套餐')
          var params = {
            id: this.$route.params.id,
            amount: this.unitPrice,
            num: this.buyTotal,
            oldAmount: this.productData.OriginalPrice,
            productType: this.productTypeString
          };
          getd
            .GetOrderListByProductId(params)
            .then(res => {
              // if(res.data === null){
              //   this.$message.error(res.msg);
              //   return
              // }

              let obj = res.data;
              obj[0].IsChecked = true;
              obj[0].Id = this.$route.params.id;
              obj[0].Num = this.buyTotal;
              let nowObj = { list: obj };
              tool.saveToLocal("orderMesg", nowObj);

              this.$router.push({
                path: "/cart/settleAccounts",
                query: { isNowBuy: "yes" }
              });
            })
            .catch(error => {
              this.$message.error(error.data.msg);
            });
        }
      } else {
        //未登录 弹窗登录弹窗
        this.$store.dispatch("loginDialogVisible");
      }
    },
    //加入购物车
    onAddCart() {
      if (tool.loadFromLocal("CustomerMesg", "ALL")) {
        if (this.productData.ProductStatus === 1) {
          //处理该商品下架
          this.$message.error("抱歉！该商品已下架，不能进行购买");
          return;
        }

        //商品
        if (this.$route.params.type == 0) {
          if (this.isCheckPrice) {
            if (this.isbugTo === false) {
              /* this.$message({
                          showClose: true,
                          message: '请等待~',
                          type: 'warning'
                        }); */
              return;
            }
            var params = {
              num: this.buyTotal,
              productId: this.$route.params.id,
              price: this.unitPrice,
              oldPrice: this.unitPrice / (this.productData.Discount / 100),
              productType: this.productTypeString
            };
            getd
              .addToShoppingCart(params)
              .then(res => {
                // if(res.data === null){
                //   this.$message.error(res.msg);
                //   return
                // }
                this.$message({
                  message: "恭喜你，成功加入购物车！",
                  type: "success"
                });
                //触发空实例的自定义事件
                this.$eventHandle.$emit("add_cart", true);
                //启动购物车抛物线动画
                this.showMoveImg = true;
              })
              .catch(error => {
                this.$message.error(error.data.msg);
              });
          } else {
            this.$message({
              showClose: true,
              message: "请先选择完整服务类型后，再加入购物车哦~",
              type: "warning"
            });
          }
        } else if (this.$route.params.type == 1) {
          //套餐 不需选择服务类型
          //发送请求
          var params = {
            num: this.buyTotal,
            productId: this.$route.params.id,
            price: this.unitPrice,
            oldPrice: this.productData.OriginalPrice,
            productType: this.productTypeString
          };
          getd
            .addToShoppingCart(params)
            .then(res => {
              // if(res.data === null){
              //   this.$message.error(res.msg);
              //   return
              // }
              this.$message({
                message: "恭喜你，成功加入购物车！",
                type: "success"
              });
              this.$eventHandle.$emit("add_cart", true);
              //this.$router.push({path:'/cart/cart'})
              //启动购物车抛物线动画
              this.showMoveImg = true;
            })
            .catch(error => {
              this.$message.error(error.data.msg);
            });
        }
      } else {
        //未登录 弹窗登录弹窗
        this.$store.dispatch("loginDialogVisible");
      }

      // 加入购物车动画-----开始数据获取
      //获取当前点击坐标
      let dom = event.target;
      let tagerDom = $(".c-sildeBarRWrap .sildeShow .number")[0];
      let elLeft = dom.getBoundingClientRect().left + dom.offsetWidth / 2;
      let elTop = dom.getBoundingClientRect().top + dom.offsetHeight / 2;
      //目标位置
      this.cartPositionL =
        tagerDom.getBoundingClientRect().left + tagerDom.offsetWidth / 2;
      this.cartPositionT =
        tagerDom.getBoundingClientRect().top + tagerDom.offsetHeight / 2;
      //起始位置
      this.elLeft = elLeft;
      this.elTop = elTop;
    },
    beforeEnter(el) {
      let elStyle = el.style;
      let elChild = el.children[0];
      let elChildSty = elChild.style;
      elStyle.transform = `translate3d(0,${this.elTop -
        this.cartPositionT}px,0)`;
      elChildSty.transform = `translate3d(${-(
        this.cartPositionL - this.elLeft
      )}px,0,0) scale(1.2)`;
    },
    afterEnter(el) {
      let elStyle = el.style;
      let elChild = el.children[0];
      let elChildSty = elChild.style;
      elStyle.transform = `translate3d(0,0,0)`;
      elChildSty.transform = `translate3d(0,0,0) scale(.2)`;
      elStyle.transition = "transform .55s cubic-bezier(.29,.55,.51,1.08)";
      elChildSty.transition = "transform .55s linear";
      // 动画结束
      elChild.addEventListener("transitionend", () => {
        this.showMoveImg = false;
      });
      elChild.addEventListener("webkitAnimationEnd", () => {
        this.showMoveImg = false;
      });
    },
    // 加入购物车动画-----结束

    /* //获取评论列表信息
    getCommentList() {
      var params = {
        productId: this.$route.params.id
      };
      getd.ProReview(params).then(res => {
        this.commentList = res.data.list;
        this.CountPage = res.data.recordCount * 1;
      });
    },
    //获取商品评论总星级
    getStarCount() {
      var params = {
        productId: this.$route.params.id
      };
      getd.getStarById(params).then(res => {
        this.countRate = res.data.countStar * 1;
      });
    }, */
    //页面收藏
    collectionPage() {
      //已登录
      if (tool.loadFromLocal("CustomerMesg", "ALL")) {
        if (this.isColled) {
          this.collectText = "已收藏";
          this.collectionDialogVisible = true;
          this.$nextTick(() => {
            $(".collectionDialogWrap .colleSuccessed").css("display", "none");
            $(".collectionDialogWrap .colled").css("display", "block");
          });
          return;
        }
        let CustomerMesg = tool.loadFromLocal("CustomerMesg", "ALL");
        let userIde = CustomerMesg.Id;
        var params = {
          customerId: userIde,
          productId: this.$route.params.id,
          num: this.buyTotal,
          price: this.CountPrice
        };
        getd
          .createdOrEdit(params)
          .then(res => {
            //收藏成功
            this.collectionDialogVisible = true;
            this.$nextTick(() => {
              $("#productDetails .userControls .collection").addClass(
                "collectionSuccessed"
              );
              $("#productDetails .collectionDialogWrap .colleSuccessed").css(
                "display",
                "block"
              );
              $("#productDetails .collectionDialogWrap .colled").css(
                "display",
                "none"
              );
            });

            //置换 下次打开已收藏
            this.isColled = true;
            this.collectText = "已收藏";
          })
          .catch(error => {
            if (error.msg == "该产品已被收藏过！") {
              this.collectionDialogVisible = true;
              this.$nextTick(() => {
                $("#productDetails .userControls .collection").addClass(
                  "collectionSuccessed"
                );
                $(".collectionDialogWrap .colleSuccessed").css(
                  "display",
                  "none"
                );
                $(".collectionDialogWrap .colled").css("display", "block");
              });
            }
          });
      } else {
        //未登录 弹窗登录弹窗
        this.$store.dispatch("loginDialogVisible");
      }
    },
    //进入页面后是否收藏
    collectionedStyle() {
      if (tool.loadFromLocal("CustomerMesg", "ALL")) {
        //已登录
        getd.myCollect().then(res => {
          var Arr = res.data.list;
          Arr.forEach((item, index) => {
            if (item.ProductId == this.$route.params.id) {
              //该商品已收藏
              this.$nextTick(() => {
                $("#productDetails .userControls .collection").addClass(
                  "collectionSuccessed"
                );
                $(".collectionDialogWrap .colleSuccessed").css(
                  "display",
                  "none"
                );
                $(".collectionDialogWrap .colled").css("display", "block");
              });
              //置换 下次打开已收藏
              this.isColled = true;
              this.collectText = "已收藏";
            }
          });
        });
      } else {
        return;
      }
    },
    //页面分享
    sharePage() {
      //分享
      //localStorage.removeItem('CustomerMesg')
      this.sharDialogVisible = true;
      this.content =
        this.shartCodes +
        this.productData.Name +
        "，售价：" +
        this.unitPrice +
        "，感觉不错，分享一下！";
    },
    //tabs切换事件
    handleClick(tab, event) {},
    //页数控制回调
    handleCurrentChange(val) {
      this.NowPage = val;
    }
  },
  // 监听路由
  fetchRoute() {
   // alert(1111);
  }
};
</script>

<style lang="less" type="text/less" src="~/pages/productDetails/productDetails.less" scoped></style>
