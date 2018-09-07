<template>
  <div id="newsDetail">
    <div v-show="!pageUndefined">
      <!--头部导航-->
      <div class="c-header news-header">
        <div class="c-hdTopWrap">
          <topState ></topState>
          <div class="c-mainWrap">
            <div class="c-main-top">
              <nuxt-link class="logo" to="/" title="微企宝一站式企业服务平台">
                <img class="logo-img" src="/images/logo.png" alt="微企宝深圳前海公司注册">
              </nuxt-link>
              <span class="logoText">
                <nuxt-link class="redirect logoText-a" to="/news" title="到新闻中心">新闻中心</nuxt-link>
              </span>
              <div class="search">
                  <el-select v-model="checkedValue" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <input type="text" class="searchText" ref="searchText" @keyup.enter="onTextSearch()" placeholder="请输入关键字">
                  <span class="onSearch" @click="onTextSearch()">搜索</span>
                </div>
            </div>
          </div>
        </div>
        <div class="nav" :class="{'fixed': navFixed}" id="nav">
          <ul class="nav-ul">
            <li class="nav-item" v-for="item in classifyList" :key="item.Id" :class="{'active': item.Id === newsInfo.DataDictionary_Id}" @click="toClassify(item.Id)">
              <a :href="'/news/classify?navId=' + item.Id" class="redirect nav-item-a" @click.prevent>{{item.Name}}</a>
            </li>
            <li class="nav-item more" :class="{'show': moreShow, 'active': navMore}" @click="toShowMore" @mouseleave="toLeaveMore" v-if="classifyMoreList.length">
              <span v-if="navMore">更多.{{newsInfo.DataDictionaryName}}</span>
              <span v-else>更多<i class="el-icon-arrow-up"></i></span>
              <ul class="more-list" v-show="moreShow">
                <li class="more-item" v-for="item in classifyMoreList" :key="item.Id" :class="{'active': item.Id === newsInfo.DataDictionary_Id}" @click="toClassify(item.Id)">
                  <a :href="'/news/classify?navId=' + item.Id" class="redirect nav-item-a" @click.prevent>{{item.Name}}</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <!-- 版心 -->
      <div class="container">
        <!-- 左侧 -->
        <div class="aside-bar" v-show="newsInfoAchieve">
          <div class="aside-item praise" @click="toPraise" @mouseenter="sideOver(0)" @mouseleave="sideLeave(0)">
            {{sideIndex == 0 ? '点赞' : newsInfo.Likes }}
          </div>
          <div class="aside-item collect" :class=" hasCollected == 1 ? 'collected': ''" @click="toCollect" @mouseenter="sideOver(1)" @mouseleave="sideLeave(1)">
            {{sideIndex == 1 ? showCol : newsInfo.Collect }}
          </div>
          <div class="aside-item comment" @click="toComment" @mouseenter="sideOver(2)" @mouseleave="sideLeave(2)">
            {{sideIndex == 2 ? '评论' : reviewCount}}
          </div>
          <div class="aside-item share" @mouseenter.stop.prevent="toShowShare" @mouseleave.stop.prevent="sideLeave(3)">
            {{sideIndex == 3 ? '分享' : newsInfo.Shares }}
            <div class="share-box"  @mouseenter.stop.prevent="toShowShare" @mouseleave.stop.prevent="toLeaveShare" v-show="shareShow">
              <div class="qr-code" id="qr-code" v-show="wxShow"></div>
              <span class="share-item" @mouseenter="toShowWx" @mouseleave="toLeaveWx"></span>
              <span class="share-item" @click="shareAction('qq')"></span>
              <span class="share-item" @click="shareAction('sina')"></span>
              <span class="share-item" @click="shareAction('qzone')"></span>
            </div>
          </div>
        </div>
        <!-- 内容 -->
        <div class="content" v-if="newsInfo.Title">
          <div class="breadcrumb" v-if="newsInfo">
            <a href="https://www.wqbol.com/" class="redirect" @click.prevent>
              <span class="cursor" @click.prevent="newsIndex">首页</span>
            </a>
            <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
            <a :href="'/news/classify?navId=' + newsInfo.DataDictionary_Id" class="redirect" @click.prevent>
              <span class="cursor" @click.prevent="toClassify(newsInfo.DataDictionary_Id)">{{newsInfo.DataDictionaryName }}</span>
            </a>
            <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
            <span>正文</span>
          </div>
          <!-- 视频 -->
          <div class="article-container" v-if="newsInfo.NewsType  == '1'">
            <div class="article-title">{{newsInfo.Title}}</div>
            <div class="sub-title">
              <span class="article-source">{{newsInfo.SourceInfo}}</span>
              <span>{{newsInfo.ReviewDateTime | simpleDateFormat}}</span>
            </div>
            <!-- 视频播放 -->
            <div class="article-banner" v-if="newsInfo.VideoURL">
              <div id="app" ><!-- v-show="videoPlay"> -->
                <div class="video-container">
                  <my-video v-if="sssssss" :sources="video.sources" :options="video.options"></my-video>
                </div>
              </div>
            </div>
            <div class="video-article clearfix" v-html="newsInfo.Content">{{newsInfo.Content}}</div>
            <p class="video-title" v-if="newsInfo.NewsVideoProductModels.length">相关商品推荐</p>
            <ul class="goods-preview" v-if="newsInfo.NewsVideoProductModels.length">
              <li class="goods-preview-item" v-for="item in newsInfo.NewsVideoProductModels" :key="item.ProductId" @click="toProduct(item)">
                <a :href="'/productDetails/' + item.ProductId + '/' + item.Type" class="redirect" @click.prevent>
                  <img :data-src="item.PCImgPath" alt="" class="list-item-img lazyload">
                  <div class="list-item-title ellipsis">{{item.Name}}</div>
                  <div class="list-item-info ellipsis">{{item.Intro}}</div>
                  <div>
                      <span class="special-price"><em class="yuan">&#165;</em>{{item.Price}}</span>
                      <del class="original-cost"><em class="yuan">&#165;</em>{{item.OldPrice}}</del>
                  </div>
                  <span class="buy-now">立即购买</span>
                </a>
              </li>
            </ul>
            <div class="article-body">
              <div class="hot-tags-list">
                <a :href="'/news/search?word=' + newsInfo.KeyWord1" class="redirect" @click.prevent v-if="newsInfo.KeyWord1">
                  <span class="hot-tags-item" @click="tagSearch(newsInfo.KeyWord1)">{{newsInfo.KeyWord1}}</span>
                </a>
                <a :href="'/news/search?word=' + newsInfo.KeyWord2" class="redirect" @click.prevent v-if="newsInfo.KeyWord2">
                  <span class="hot-tags-item" @click="tagSearch(newsInfo.KeyWord2)">{{newsInfo.KeyWord2}}</span>
                </a>
                <a :href="'/news/search?word=' + newsInfo.KeyWord3" class="redirect" @click.prevent v-if="newsInfo.KeyWord3">
                  <span class="hot-tags-item" @click="tagSearch(newsInfo.KeyWord3)">{{newsInfo.KeyWord3}}</span>
                </a>
                <a :href="'/news/search?word=' + newsInfo.KeyWord4" class="redirect" @click.prevent v-if="newsInfo.KeyWord4">
                  <span class="hot-tags-item" @click="tagSearch(newsInfo.KeyWord4)">{{newsInfo.KeyWord4}}</span>
                </a>
                <a :href="'/news/search?word=' + newsInfo.KeyWord5" class="redirect" @click.prevent v-if="newsInfo.KeyWord5">
                  <span class="hot-tags-item" @click="tagSearch(newsInfo.KeyWord5)">{{newsInfo.KeyWord5}}</span>
                </a>
              </div>
            </div>
          </div>
          <!-- 图文混合 -->
          <div class="article-container" v-else>
            <div class="article-title">{{newsInfo.Title}}</div>
            <div class="sub-title">
              <span class="article-source">{{newsInfo.SourceInfo}}</span>
              <span>{{newsInfo.ReviewDateTime | simpleDateFormat}}</span>
            </div>
            <div class="article-body clearfix" v-html="newsInfo.Content">{{newsInfo.Content}}</div>
            <div class="article-body" v-if="newsInfo.KeyWord1">
              <div class="hot-tags-list">
                <a :href="'/news/search?word=' + newsInfo.KeyWord1" class="redirect" @click.prevent>
                  <span class="hot-tags-item" @click="tagSearch(newsInfo.KeyWord1)">{{newsInfo.KeyWord1}}</span>
                </a>
                <a :href="'/news/search?word=' + newsInfo.KeyWord2" class="redirect" @click.prevent v-if="newsInfo.KeyWord2">
                  <span class="hot-tags-item" @click="tagSearch(newsInfo.KeyWord2)">{{newsInfo.KeyWord2}}</span>
                </a>
                <a :href="'/news/search?word=' + newsInfo.KeyWord3" class="redirect" @click.prevent v-if="newsInfo.KeyWord3">
                  <span class="hot-tags-item" @click="tagSearch(newsInfo.KeyWord3)">{{newsInfo.KeyWord3}}</span>
                </a>
                <a :href="'/news/search?word=' + newsInfo.KeyWord4" class="redirect" @click.prevent v-if="newsInfo.KeyWord4">
                  <span class="hot-tags-item" @click="tagSearch(newsInfo.KeyWord4)">{{newsInfo.KeyWord4}}</span>
                </a>
                <a :href="'/news/search?word=' + newsInfo.KeyWord5" class="redirect" @click.prevent v-if="newsInfo.KeyWord5">
                  <span class="hot-tags-item" @click="tagSearch(newsInfo.KeyWord5)">{{newsInfo.KeyWord5}}</span>
                </a>
              </div>
            </div>
          </div>

          <div class="page-foot">
            <span class="page-foot-item" v-if="newsInfo.isNext">上一篇：{{newsInfo.Title}}</span>
            <a :href="'/news/newsDetail?id=' + newsInfo.NextId" class="page-foot-item cursor" v-else>
              <span @click="toDetail(newsInfo.NextId)">上一篇：{{newsInfo.NextName}}</span>
            </a>
            <span class="fr page-foot-item" v-if="newsInfo.isFirst">下一篇：{{newsInfo.Title}}</span>
            <a :href="'/news/newsDetail?id=' + newsInfo.PreId" class="fr page-foot-item cursor" v-else>
              <span @click="toDetail(newsInfo.PreId)">下一篇：{{newsInfo.PreName }}</span>
            </a>
          </div>
          <!-- 评论 -->
          <div class="review-container" id="review-container">
            <div class="review-title"><span class="review-total">{{reviewCount}}</span>条评论</div>
            <!-- 我的评论 -->
            <div class="review-item mine">
              <img :data-src="customerImg" alt="" class="review-avatar lazyload" v-if="!isShowCImg">
              <img src="~/static/images/common/defaultimg.png" class="review-avatar" v-else>
              <textarea v-model="commentValue" class="my-comment" rows="3" placeholder="写下您的评论..." maxlength="300"></textarea>
              <div class="tips">
                <span>您可输入3-200字</span>
                <span class="send-btn" @click="sendComment">发表评论</span>
              </div>
            </div>
            <!-- 评论列表 -->
            <div class="review-list" v-if="reviewCount">
              <ul>
                <li class="review-item" v-for="item in reviewList" :key="item.Id">
                  <img :data-src="item.CustomerIcon" alt="" class="review-avatar lazyload" v-if="item.CustomerIcon ">
                  <img src="~/static/images/common/defaultimg.png" alt="" class="review-avatar" v-else>
                  <div>
                    <span class="review-name" v-if="item.ReviewType ">游客</span>
                    <span class="review-name" v-else>{{item.CustomerName }}</span>
                    <span class="review-date">{{item.currentTime}}</span>
                  </div>
                  <p class="review-info">{{item.Content }}</p>
                  <div class="reply" v-if="item.ReviewState ">
                    {{item.ReviewName }}<span class="reply-space">回复</span>
                    {{ item.CustomerName.trim() == '' ? '游客':item.CustomerName}}
                    <span class="reply-info">{{item.ReviewContent}}</span>
                    <!-- {{item.ReviewName }}
                    <span class="reply-space">回复</span>
                    <span v-if="item.ReviewType ">游客</span>
                    <span v-else>{{item.CustomerName }}</span>
                    <span class="reply-info">{{item.ReviewContent}}</span> -->
                  </div>
                </li>
              </ul>
              <div class="table-page">
                <no-ssr>
                  <el-pagination v-if="reviewCount"
                    @current-change="currentChange"
                    background
                    prev-text="上一页"
                    next-text="下一页"
                    :current-page.sync="reviewPage"
                    :page-size="reviewPageSize"
                    layout="prev, pager, next, jumper"
                    :total="reviewCount">
                  </el-pagination>
                </no-ssr>
              </div>
            </div>
            <div class="review-empty" v-else>还没评论，赶快来一个</div>
          </div>
        </div>
        <!-- 右侧 -->
        <div class="sidebar">
            <!-- 广告 -->
            <div class="top-box" v-if='adNewDetailSrc'>
              <a :href="adNewDetailSrcClick" target="_blank">
                <img :data-src="adNewDetailSrc" alt="" class="sidebar-img lazyload">
              </a>
            </div>
            <!-- 热门新闻 -->
            <div class="hot-charts" v-if="hotList.length">
              <p class="sidebar-title">相关推荐</p>
              <ul>
                <li class="list-item" v-for="item in hotList" :key="item.Id" :class="{video: item.NewsType}" @click="toDetail(item.Id)">
                  <a :href="'/news/newsDetail?id=' + item.Id" class="redirect">
                    <img :data-src="item.ThumbImgURL" alt="" class="list-item-img lazyload">
                    <p class="list-item-title">{{item.Title}}</p>
                    <p class="list-item-info">{{item.Subtitle}}</p>
                    <p class="list-item-data">
                      <span class="click-rate">{{item.ReadBase + item.ReadNum }}</span>
                      <span class="praise-rate">{{item.Likes}}</span>
                    </p>
                  </a>
                </li>
              </ul>
            </div>
            <!-- 热门视频 -->
            <div class="hot-video" v-if="videoList.length">
              <p class="sidebar-title">热门视频<span class="more" @click="toVideoList">更多&gt;</span></p>
              <ul>
                <li class="video-item" v-for="item in videoList" :key="item.id" @click="toDetail(item.Id)">
                  <a :href="'/news/newsDetail?id=' + item.Id" class="redirect video-item-a">
                    <img :data-src="item.ThumbImgURL" alt="" class="video-cover lazyload">
                    <div class="video-tips">
                      <p class="video-info">{{item.Title}}</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <!-- 关键词筛选 -->
            <div class="hot-tags" v-if="keywordList.length">
              <p class="sidebar-title">热门筛选</p>
              <a v-for="item in keywordList" :key="item.KeyWord" :href="'/news/search?word=' + item.KeyWord" class="redirect" @click.prevent>
                <span class="hot-tags-item" @click.prevent="tagSearch(item.KeyWord)">{{item.KeyWord}}</span>
              </a>
            </div>
        </div>
      </div>

      <!-- 公用bottom 整体 -->
      <div class="c-ftContainWrapindex">
        <publicBottom></publicBottom>
      </div>
    </div>

    <div class="undefined" v-if="pageUndefined">
      <p class="undefined-text">哎呀！当前页面无法访问</p>
      <div class="">
        <span class="reload-btn" @click="reload">刷新页面</span>
        <span class="home-btn" @click="home">返回首页</span>
      </div>
    </div>

    <!--登录弹窗-->
    <no-ssr>
      <loginDialog v-if="isLoginDialog" :source="source"></loginDialog>
    </no-ssr>
  </div>
</template>

<script>
import topState from "~/components/common/topState";
import publicBottom from "~/components/common/publicBottom";
import loginDialog from "~/components/common/loginDialog/loginDialog";
import myVideo from "~/components/news/video.vue";
import getData from "~/store/ajaxAPI/getData";
import tool from "~/assets/lib/tool";
import { mapState, mapActions, mapGetters } from "vuex";
import axios from "axios";
import { getDataPort } from "~/store/ajaxAPI/perPort.js";
const baseURL = getDataPort;
// axios 取消请求
var CancelToken = axios.CancelToken; // 这里声明的cancelToken其实相当于是一个标记,当我们要取消请求的时候，可以通过这个找到该请求
var source = CancelToken.source();
// axios 超时重新请求数据
axios.defaults.timeout = 10000; // 超时时间
axios.defaults.retry = 2; // 重新请求次数
axios.defaults.retryDelay = 1000; // 重新请求间隔
axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
  var config = err.config;
  // If config does not exist or the retry option is not set, reject
  if (!config || !config.retry) return Promise.reject(err);

  // Set the variable for keeping track of the retry count
  config.__retryCount = config.__retryCount || 0;

  // Check if we've maxed out the total number of retries
  if (config.__retryCount >= config.retry) {
    // Reject with the error
    return Promise.reject(err);
  }

  // Increase the retry count
  config.__retryCount += 1;

  // Create new promise to handle exponential backoff
  var backoff = new Promise(function(resolve) {
    setTimeout(function() {
      resolve();
    }, config.retryDelay || 1);
  });

  // Return the promise in which recalls axios to retry the request
  return backoff.then(function() {
    return axios(config);
  });
});

export default {
  name: "news-newsDetail",
  components: {
    topState,
    publicBottom,
    loginDialog,
    myVideo
  },

  async asyncData({ store, query, error, redirect }) {
    let getStatus = false,
      seoKeyWords = [],
      newsInfo = null,
      review = null,
      navList = null,
      sideAD = null,
      hotList = null,
      videoList = null,
      keywordList = null;

    //
    if (!(query.id && query.id.length === 36)) {
      return redirect("/news");
    }
    // 获取新闻详情
    newsInfo = await axios
      .get(baseURL + `/News/GetNewsById`, {
        params: {
          cancelToken: source.token, // 取消请求参数
          id: query.id,
          type: 1
        }
      })
      .catch(error => {
        source.cancel(); //执行取消请求, 可以带msg
      });
    if (newsInfo) {
      getStatus = 200;
      if (newsInfo.data.success == true) {
        newsInfo = newsInfo.data.data;
        newsInfo.keywordList = [];
        for (let i = 1; i < 6; i++) {
          newsInfo["KeyWord" + i] && seoKeyWords.push(newsInfo["KeyWord" + i]);
        }
      } else {
        // newsInfo = null;
        return { pageUndefined: true };
      }
    } else {
      return { pageUndefined: true };
    }
    // console.log(newsInfo.data.data);
    // 新闻nav列表
    navList = await axios
      .get(baseURL + `/News/GetNewClass`, {
        cancelToken: source.token // 取消请求参数
      })
      .catch(error => {
        source.cancel(); //执行取消请求, 可以带msg
      });
    // 评论首页
    review = await axios
      .get(baseURL + `/News/GetRewardList`, {
        params: {
          cancelToken: source.token, // 取消请求参数
          id: query.id,
          reviewPageSize: 10,
          pageIndex: query.page > 1 ? query.page : 1
        }
      })
      .catch(error => {
        source.cancel(); //执行取消请求, 可以带msg
      });

    // 右侧广告位
    sideAD = await axios
      .get(baseURL + `/Advertment/List`, {
        params: {
          cancelToken: source.token, // 取消请求参数
          type: 0,
          code: "YCGGW09"
        }
      })
      .catch(error => {
        source.cancel(); //执行取消请求, 可以带msg
      });
    // (当前分类)相关推荐
    hotList = await axios
      .get(baseURL + `/News/List`, {
        params: {
          cancelToken: source.token, // 取消请求参数
          id: newsInfo.DataDictionary_Id, // 新闻详情获取新闻分类
          pageSize: 5,
          sort: 1
        }
      })
      .catch(error => {
        source.cancel(); //执行取消请求, 可以带msg
      });
    // 视频新闻列表
    videoList = await axios
      .get(baseURL + `/News/VideoList`, {
        params: {
          cancelToken: source.token, // 取消请求参数
          pageSize: 2
        }
      })
      .catch(error => {
        source.cancel(); //执行取消请求, 可以带msg
      });
    // 新闻热门筛选
    keywordList = await axios
      .get(baseURL + `/News/GetKeyWordList`, {
        cancelToken: source.token // 取消请求参数
      })
      .catch(error => {
        source.cancel(); //执行取消请求, 可以带msg
      });

    let classifyList = navList ? navList.data.data.list : [];
    if (classifyList.length) {
      classifyList.unshift({
        Id: "",
        Name: "最新",
        ImgUrl: null
      });
    }
    return {
      getStatus: getStatus,
      seoKeyWords: seoKeyWords.join(","),
      classifyList: classifyList,
      newsInfo: newsInfo,
      reviewList: review ? review.data.data.list : [],
      reviewCount: review ? review.data.data.recordCount : 0,
      sideAD: sideAD ? sideAD.data.data.list : [],
      hotList: hotList ? hotList.data.data.list : [],
      videoList: videoList ? videoList.data.data.list : [],
      keywordList: keywordList ? keywordList.data.data : []
    };
  },
  head() {
    return {
      title: this.newsInfo.Title + "-微企宝",
      meta: [
        {
          hid: "keywords",
          name: "keywords",
          content: this.seoKeyWords
        },
        {
          hid: "description",
          name: "description",
          content: this.newsInfo.Subtitle
        }
      ]
    };
  },
  data() {
    return {
      options: [
        {
          value: "新闻"
        },
        {
          value: "商品"
        }
      ], //搜索选择的选项
      sssssss: false,
      radom: 0,
      checkedValue: "新闻", //搜索选择的默认选项
      searchInput: "", //搜索框关键词
      newest: {
        Id: "",
        Name: "最新",
        IconImage: null
      }, // 最新分类
      classifyList: [], //新闻分类列表
      classifyMoreList: [], //新闻分类更多列表
      moreShow: false, //显示分类更多
      moreName: null, //分类在更多中:更多.name
      navMore: false, //分类在更多中
      navFixed: false, //分类吸顶
      navId: null, //当前分类ID
      userId: null, //登录用户ID
      newsId: null, //当前新闻ID
      wxShow: false, //网页二维码
      shareShow: false, //分享列表
      isPraise: false, // 用户点赞操作遮罩
      hasCollected: 0, // 用户是否收藏
      newsInfo: {}, //新闻详情数据
      newsInfoAchieve: false, //新闻详情是否获取
      commentValue: null, // 我的评论
      reviewList: [], // 评论列表
      reviewCount: null, // 评论总数
      reviewPage: 1, // 当前评论页
      reviewPages: 1, // 当前评论页
      reviewPageSize: 10, // 每页评论数量
      sidebarAD: {}, //右侧短广告位
      hotList: [], //本周热门排行榜
      videoList: [], //视频新闻列表
      keywordList: [], //关键词筛选
      customerImg: "", //用户头像
      isShowCImg: false, //是否展示默认头像
      videoPlay: false, //开始播放视频
      isShowVideo: false, //是否展示视频
      createTime: "", //新闻发布时间
      reviewTimer: "", //评论发布时间
      video: {
        sources: [
          {
            src: null,
            type: "video/mp4"
          }
        ],
        options: {
          autoplay: true,
          volume: 0.6,
          poster: ""
        }
      },
      sideIndex: -1, //左侧边栏下标
      adNewDetailSrc: "", //广告位图片
      adNewDetailSrcClick: "", //广告位跳转动态地址
      showCol: "收藏",
      pageUndefined: false, //新闻详情404
      newsDetail: {
        //传入登陆弹窗的值
        title: "新闻详情"
        // 'newsId':this.$route.query.id
      }
    };
  },
  updated() {},
  computed: {
    ...mapGetters({
      loginDialogVisible: "loginDialogVisible" // 来自vuex index.js页面 getter
    }),
    //模态窗口处理是否弹出登陆模态窗口  vuex默认不显示
    isLoginDialog() {
      // console.log('我在详情页面' , this.loginDialogVisible  )
      return this.loginDialogVisible;
    }
  },
  created() {
    this.newsId = this.$route.query.id;
    if (this.getStatus === 200) {
      //  nav
      var _list = this.classifyList;
      if (!_list.length) {
        getData
        .getNewsClassify()
        .then(res => {
          let list = res.data.list;
          list.unshift(this.newest);
          if (list.length > 8) {
            this.classifyList = list.splice(0, 7);
            this.classifyMoreList = list;
            for (let index = 0; index < list.length; index++) {
              if (this.navId === list[index].Id) {
                this.navMore = true;
                this.navName = list[index].Name;
              }
            }
          } else {
            this.classifyList = list;
          }
        })
        .catch(error => {
          // console.log("获取分类列表", error);
        });
      } else if (_list.length > 8) {
        this.classifyList = _list.slice(0, 7);
        this.classifyMoreList = _list.slice(7);
        for (let index = 0; index < this.classifyMoreList.length; index++) {
          if (this.newsInfo.DataDictionary_Id === this.classifyMoreList[index].Id) {
            this.navMore = true;
          }
        }
      }

      // newsInfo
      this.newsInfo.Content = this.changeContent(this.newsInfo.Content);
      this.video.sources[0].src = this.newsInfo.VideoURL;

      if (this.sideAD.length) {
        this.adNewDetailSrc = this.sideAD[0].PosterImgURL;
        this.adNewDetailSrcClick = this.sideAD[0].LinkWebSite || "javascript:;";
      }
      if (!this.keywordList.length) {
        getData
          .getKeyWordList()
          .then(res => {
            this.keywordList = res.data.list;
          })
          .catch(error => {
            // console.log("获取热门筛选", error);
          });
      }
      // if (this.$route.query.navId === undefined) {}
    }
    /* // 获取分类新闻列表
    getData
      .getNewsClassify()
      .then(res => {
        let list = res.data.list;
        list.unshift(this.newest);
        let len = list.length;
        if (len > 8) {
          this.classifyList = [];
          this.classifyMoreList = [];
          for (let i = 0; i < len; i++) {
            if (i < 7) {
              this.classifyList.push(list[i]);
            } else {
              this.classifyMoreList.push(list[i]);
            }
          }
        } else {
          this.classifyList = list;
        }
      })
      .catch(function(error) {
        // console.log("获取分类新闻列表", error);
      });

    // 视频新闻
    getData
      .getNewsVideoList({
        params: {
          pageSize: 2
        }
      })
      .then(res => {
        this.videoList = res.data.list;
      })
      .catch(error => {
        // console.log("视频新闻", error);
      });

    // 关键词筛选
    getData
      .getKeyWordList()
      .then(res => {
        this.keywordList = res.data;
      })
      .catch(error => {
        // console.log("关键词筛选", error);
      });

    let params = {
      params: {
        type: "0",
        code: "YCGGW09" //（新闻详情）
      }
    };
    //广告位
    getData
      .getHomeBanner(params)
      .then(res => {
        this.adNewDetailSrcClick = res.data.list[0].LinkWebSite;
        this.adNewDetailSrc = res.data.list[0].PosterImgURL;
      })
      .catch(error => {
        // console.log("关键词筛选", error);
      });
    */
  },
  mounted() {
    this.sssssss = true;
    this.createdQR();
    if (this.newsInfo.Title) {
      // 登录直接请求
      // console.log('未登录判断cookie是否存在:',this.getCookie('newsId'+this.newsId))
      if (tool.loadFromLocal("CustomerMesg", "ALL")) {
        this.ReadNews();
      } else if (!this.getCookie("newsId" + this.newsId)) {
        // 未登录判断cookie是否存在
        this.setCookie("newsId" + this.newsId, 1);
        // console.log('判断cookie==1:',this.getCookie('newsId'+this.newsId))
        this.ReadNews();
      }
    }
    // 判断客户是否登录
    this.checkLogin();
    window.addEventListener("scroll", this.fetchScrollTop);
  },
  methods: {
    // 刷新页面
    reload() {
      top.location.reload();
    },
    // 返回首页
    home() {
      this.$router.push("/");
    },
    // 返回新闻中心
    newsIndex() {
      this.$router.push("/news");
    },
    // 搜索功能
    onTextSearch() {
      let str = this.$refs.searchText.value.trim();
      if (str == null || str === "") {
        this.$message({
          message: "请输入搜索关键词",
          type: "warning"
        });
        return;
      } else if (this.checkedValue === "新闻" && str) {
        this.$router.push({
          path: "/news/search",
          query: { word: str }
        });
      } else if (this.checkedValue === "商品" && str) {
        this.$router.push({
          path: "/productList",
          query: { typeIndex: "all", productName: str }
        });
      } else {
        return;
      }
    },
    // 回到顶部
    backTop() {
      document.body.scrollTop = 0; // chrome
      document.documentElement.scrollTop = 0; // firefox
    },
    //点击nav跳转
    toClassify(id) {
      this.moreShow = false;
      this.$router.push({
        path: "/news/classify",
        query: { navId: id }
      });
    },
    // 显示分类更多
    toShowMore() {
      this.moreShow = true;
    },
    // 隐藏分类更多
    toLeaveMore() {
      this.moreShow = false;
    },
    // 跳转视频列表
    toVideoList() {
      this.$router.push("/news/videoList");
    },
    // 跳转新闻广告位
    toDynamic(adNewDetailSrc) {
      // console.log(adNewDetailSrc,'11')
      window.open(adNewDetailSrc, "_blank");
    },
    // 跳转新闻详情页
    toDetail(id) {
      this.$router.push({
        path: "/news/newsDetail",
        query: { id: id }
      });
    },
    // 点击标签搜索
    tagSearch(str) {
      this.backTop();
      this.$router.push({
        path: "/news/search",
        query: { word: str }
      });
    },
    // 判断客户是否登录
    checkLogin() {
      if (tool.loadFromLocal("CustomerMesg", "ALL")) {
        this.userId = tool.loadFromLocal("CustomerMesg", "ALL").Id;
        if (!this.customerImg) {
          getData.getcustorInfor().then(res => {
            // console.log("base", res.data);
            this.customerImg = res.data.HeadPicPath;
          });
        }
        this.checkCollect();
      } else {
        this.userId = null;
        this.isShowCImg = true;
        this.hasCollected = 0;
        this.showCol = "收藏";
      }
    },
    //监听滚动条高度
    fetchScrollTop() {
      let _scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      this.navFixed = _scrollTop < 66 ? false : true;
    },
    // 去点赞
    toPraise() {
      if (this.isPraise) {
        return;
      } else {
        this.isPraise = true;
        getData
          .newsLikes({
            params: {
              id: this.newsId
            }
          })
          .then(res => {
            if (res.success == true) {
              this.isPraise = false;
              this.$message.success(res.msg);
              this.newsInfo.Likes = res.data.cnt;
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch(error => {
            this.isPraise = false;
            // console.log("点赞", error);
          });
      }
    },
    // 判断用户是否收藏
    checkCollect() {
      getData
        .newsCheckCollect({
          params: {
            id: this.newsId
          }
        })
        .then(res => {
          this.showCol = "收藏";
          if (res.success == true) {
            // 0.未收藏，1.已收藏
            this.hasCollected = res.data.isCollect;
            if (this.hasCollected == 1) {
              this.showCol = "已收藏";
            }
          } else {
            this.hasCollected = 0;
          }
        })
        .catch(error => {
          // console.log("判断用户是否收藏", error);
          this.hasCollected = 0;
          this.showCol = "收藏";
        });
    },
    // 去收藏
    toCollect() {
      this.checkLogin();
      if (!this.userId) {
        // this.$message.warning("您没有登录 ，请登录后收藏");
        //未登录 弹窗登录弹窗
        this.$store.dispatch("loginDialogVisible");
        return;
      }
      if (this.hasCollected) {
        // 去取消收藏
        this.toDelCollect();
        return;
      } else {
        getData
          .newsAddCollect({
            params: {
              id: this.newsId
            }
          })
          .then(res => {
            this.hasCollected = 1;
            this.showCol = "已收藏";
            this.$message.success(res.msg);
            this.newsInfo.Collect = res.data.cnt;
          })
          .catch(error => {
            // console.log("收藏", error);
            this.hasCollected = 0;
            this.showCol = "收藏";
            //this.$message("您已收藏");
          });
      }
    },
    // 取消收藏
    toDelCollect() {
      //已经收藏 反向取消收藏
      let params = {
        id: this.$route.query.id
      };
      getData
        .newsDelCollect(params)
        .then(res => {
          this.$message("您已经取消收藏");
          this.newsInfo.Collect--;
          this.hasCollected = 0;
          this.showCol = "收藏";
        })
        .catch(error => {
          // console.log("//已经收藏 反向取消收藏", error);
        });
    },
    // 去评论锚点
    toComment() {
      var anchor = this.$el.querySelector("#review-container");
      document.body.scrollTop = anchor.offsetTop - 70; // chrome
      document.documentElement.scrollTop = anchor.offsetTop - 70; // firefox
    },
    // 去分享
    toShowShare() {
      this.sideIndex = 3;

      this.shareShow = true;
    },
    toLeaveShare() {
      this.shareShow = false;
    },
    toShowWx() {
      this.wxShow = true;
    },
    toLeaveWx() {
      this.wxShow = false;
    },
    // 分享
    shareAction(type) {
      var title = encodeURIComponent(this.newsInfo.Title);
      var link = encodeURIComponent(location.href);
      var image = encodeURIComponent(this.newsInfo.ThumbImgURL);
      var str =
        "?url=" + link + "&title=" + title + "&content=utf8&pic=" + image;
      var strq =
        "?url=" + link + "&title=" + title + "&content=utf8&pics=" + image;
      if (type == "qq") {
        window.open("https://connect.qq.com/widget/shareqq/index.html" + strq);
      } else if (type == "sina") {
        window.open("http://v.t.sina.com.cn/share/share.php" + str);
      } else if (type == "qzone") {
        window.open(
          "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey" + strq
        );
      } else if (type == "douban") {
        window.open("https://www.douban.com/recommend/" + str);
      }
      this.setNewsShare();
      return false;
    },
    // 点击分享
    setNewsShare() {
      getData
        .newsShare({
          params: {
            id: this.newsId
          }
        })
        .then(res => {
          this.newsInfo.Shares = res.data.cnt;
        })
        .catch(error => {
          // console.log("点击分享", error);
        });
    },
    //生成网页分享二维码
    createdQR() {
      var that = this;
      if (this.newsInfo.NewsType) {
        var url = `//host.wqbol.com/enterpriseNewsCenter/moveNewDetails?newsId=${
          that.$route.query.id
        }`;
      } else {
        var url = `//host.wqbol.com/enterpriseNewsCenter/textNewDetails?newsId=${
          that.$route.query.id
        }`;
      }
      document.getElementById("qr-code").innerHTML = "";
      var qrcode = new QRCode(document.getElementById("qr-code"), {
        text: url,
        width: 120,
        height: 120,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.L
      });
      this.newsInfoAchieve = true;
    },
    // 获取新闻详情
    getNewsData() {
      getData
        .getNewsDetail({
          params: {
            id: this.newsId,
            type: 1
          }
        })
        .then(res => {
          if (res.success == true) {
            this.newsInfo = res.data;
            this.newsInfo.Content = this.changeContent(this.newsInfo.Content);
            this.video.sources[0].src = this.newsInfo.VideoURL;
            // this.video.options.poster = this.newsInfo.ThumbImgURL;
            let Create = this.newsInfo.ReviewDateTime;

            let createTimee = Number(
              Create.substring(6, Create.lastIndexOf(")"))
            );
            let today = new Date().toDateString();
            let year = new Date().getFullYear();
            if (new Date(createTimee).toDateString() === today) {
              this.createTime = tool.formatDate(createTimee, "hh:mm");
            } else if (new Date(createTimee).getFullYear() === year) {
              this.createTime = tool.formatDate(createTimee, "MM-dd");
            } else {
              this.createTime = tool.formatDate(createTimee, "yyyy-MM-dd");
            }
            if (this.classifyMoreList.length) {
              for (
                let index = 0;
                index < this.classifyMoreList.length;
                index++
              ) {
                if (
                  this.newsInfo.DataDictionary_Id ===
                  this.classifyMoreList[index].Id
                ) {
                  this.navMore = true;
                }
              }
            }
            if (this.newsInfo.Title) {
              // 登录直接请求
              // console.log('未登录判断cookie是否存在:',this.getCookie('newsId'+this.newsId))
              if (tool.loadFromLocal("CustomerMesg", "ALL")) {
                this.ReadNews();
              } else if (!this.getCookie("newsId" + this.newsId)) {
                // 未登录判断cookie是否存在
                this.setCookie("newsId" + this.newsId, 1);
                // console.log('判断cookie==1:',this.getCookie('newsId'+this.newsId))
                this.ReadNews();
              }
            }

            this.sssssss = true;
            this.createdQR();
          } else {
            this.this.newsInfo = {};
          }
        })
        .catch(error => {
          // console.log("获取新闻详情", error);
          if (error.data.msg === "新闻已下架") {
            this.$message("新闻已下架");
          }
        });
    },
    // 新闻内容处理
    changeContent(str) {
      if (!str) {
        return "";
      }
      str = str
        .replace(/&nbsp;/gi, "")
        .replace(
          '<video class="edui-upload-video  vjs-default-skin video-js" controls="" preload="none"',
          '<video class="edui-upload-video vjs-default-skin video-js" controls="" preload="preload"'
        )
        .replace("></video>", ">您的浏览器不支持 video 标签。</video>");
      var temp1 = str.split('<a class="buy" href="/productDetails?type=');
      var string = temp1[0];
      for (var i = 0; i < temp1.length; i++) {
        if (i > 0) {
          var type = temp1[i].substring(0, 1);
          var startIndex = temp1[i].indexOf("=") + 1;
          var stopIndex = temp1[i].indexOf('"');
          var id = temp1[i].substring(startIndex, stopIndex);
          // console.log(id);
          var link = '<a class="buy" href="/productDetails/' + id + "/" + type;
          // console.log(link);
          var otherStr = temp1[i]
            .substring(stopIndex)
            .replace("style=", "data-style");
          var newStr = link + otherStr;
          // console.log(newStr);
          string += newStr;
        }
      }
      return string;
    },
    // 获取新闻评论
    getRewardData() {
      getData
        .getRewardList({
          params: {
            id: this.newsId,
            pageSize: this.reviewPageSize,
            pageIndex: this.reviewPage
          }
        })
        .then(res => {
          let reviewList = res.data.list;
          this.reviewCount = res.data.recordCount;
        })
        .catch(error => {
          // console.log("获取新闻评论", error);
        });
    },
    // 获取当前评论页
    currentChange(val) {
      this.reviewPage = val;
      //重新请求评论
      this.getRewardData();
      this.toComment();
    },
    // 发表评论
    sendComment() {
      this.checkLogin();
      this.commentValue = this.commentValue.trim();
      var len = this.commentValue.length;
      if (len < 3 || len > 200) {
        this.$message.warning("请输入3-200个字符");
        return;
      }
      getData
        .newsAddReward({
          params: {
            id: this.newsId,
            cid: this.userId,
            content: this.commentValue
          }
        })
        .then(res => {
          if (res.success == true) {
            this.$message.success("评论成功，已提交审核");
            this.commentValue = "";
            //重新请求评论 (需要后台审核)
            // this.reviewPage = 1;
            // this.getRewardData();
            // this.toComment();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(error => {
          // console.log("发表评论", error);
          if (
            error.data.msg.lastIndexOf(
              "检测到有潜在危险的 Request.QueryString 值"
            ) > 1
          ) {
            this.$message.error("您输入的内容中有非法字符!");
          }
        });
    },
    // 监听newsId变化
    fetchNewsId() {
      this.sssssss = false;
      this.newsInfoAchieve = false;
      this.newsId = this.$route.query.id;
      if (this.newsId) {
        this.navMore = false;
        this.getNewsData();
        this.getRewardData();
        this.getHotList();
        if (this.userId) {
          this.checkCollect();
        }
      } else {
        this.$router.push("/news");
      }
    },
    // 点击视频缩略图播放
    toPlay() {
      // console.log(this.newsInfo.VideoURL);
      if (this.newsInfo.VideoURL) {
        this.videoPlay = true;
      }
    },
    // 去商品详情页
    toProduct(obj) {
      this.$router.push({
        path: "/productDetails/" + obj.ProductId + "/" + obj.Type
      });
    },
    // 侧边栏移入效果
    sideOver(num) {
      this.sideIndex = num;
    },
    // 侧边栏移出效果
    sideLeave(num) {
      this.sideIndex = -1;

      this.shareShow = false;
    },
    // 获取当前分类阅读量最高5条新闻列表
    getHotList() {
      getData
        .getNewsList({
          params: {
            id: this.newsInfo.DataDictionary_Id,
            pageSize: 5,
            sort: 1
          }
        })
        .then(res => {
          this.hotList = res.data.list;
        })
        .catch(error => {
          // console.log("获取当前分类阅读量最高5条新闻列表", error);
        });
    },
    // 新闻阅读统计
    ReadNews() {
      this.checkLogin();
      getData
        .ReadNews({
          params: {
            id: this.newsId,
            cid: this.userId
          }
        })
        .then(res => {
          // console.log("新闻阅读统计", res.data);
        })
        .catch(error => {
          // console.log("新闻阅读统计", error);
        });
    },
    // 写cookies
    setCookie(name, value) {
      var exp = new Date();
      exp.setTime(exp.getTime() + 24 * 60 * 60 * 1000);
      document.cookie =
        name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    // 读取cookies
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.fetchScrollTop);
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    // $route: "fetchNewsId",
  }
};
</script>

<style lang="less" type="text/less" scoped>
@import "./news.less";
.c-header {
  .c-hdTopWrap .c-mainWrap .c-main-top {
    padding: 15px 0;
    .clearfix();
    & > .logo {
      margin: 0;
      width: 150px;
      height: 55px;
    }
  }
  .logoText {
    display: inline-block;
    margin-top: 5px;
    margin-left: 20px;
    padding-left: 20px;
    height: 46px;
    line-height: 46px;
    font-size: 20px;
    border-left: 1px solid #e0e0e0;
    color: #4d4d4d;
    cursor: pointer;
  }
  .search {
    float: right;
    vertical-align: middle;
    margin-top: 12px;
    width: 358px;
    height: 32px;
    line-height: 32px;
    border: solid 1px #ff3e08;
    overflow: hidden;
    .el-select {
      position: relative;
      width: 82px;
      height: 32px;
    }
    .searchText {
      vertical-align: top;
      padding-left: 8px;
      height: 30px;
      width: 202px;
      font-size: 12px;
    }
    .onSearch {
      float: right;
      padding: 0 20px;
      width: 72px;
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      color: #f2f2f2;
      background-color: #ff3e08;
      cursor: pointer;
    }
  }
}
#newsDetail {
  min-width: 1366px;
}
.breadcrumb {
  font-weight: 400;
  font-size: 16px;
  color: #666;
}
.video-container {
  overflow: hidden;
  position: relative;
  z-index: 0;
  width: 760px;
  // height: 476px;
}
/* v-html */
#newsDetail /deep/ .article-body {
  video::-internal-media-controls-download-button {
    display: none;
  }
  video::-webkit-media-controls-enclosure {
    overflow: hidden;
  }
  video::-webkit-media-controls-panel {
    width: calc(100% + 30px);
  }
  h2 {
    padding-top: 14px;
    font-size: 18px;
    font-weight: 600;
    color: #ff1f1f;
  }
  p {
    // padding-bottom: 30px;
    font-size: 16px;
    text-indent: 2em;
    line-height: 30px;
    img {
      display: block;
      margin: 10px 0;
      max-width: 760px;
    }
    video {
      // position: relative;
      margin-left: -2em;
      width: 100%;
      height: 100%;
    }
  }
  strong {
    font-weight: bold;
    span {
      font-weight: bold;
    }
  }
  .proDuct {
    position: relative;
    margin-top: 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 14px 14px 14px 128px;
    width: 399px;
    height: 130px;
    // font-size: 0;
    line-height: 1;
    background-color: #f4f4f4;
    cursor: pointer;
    &:last-of-type {
      margin-bottom: 20px;
    }
    &:hover {
      .title {
        color: #ff3e08;
      }
    }
    .proDuct {
      position: absolute;
      margin: 0;
      top: 0;
      left: 0;
    }
    .contentImg_Base {
      display: block;
      position: absolute;
      margin-left: -114px;
      width: 102px;
      height: 102px;
      border-radius: 3px;
    }
    .title {
      padding-top: 8px;
      font-size: 17px;
      text-align: left;
      color: #1f1f1f;
    }
    .subtitle {
      padding-top: 11px;
      height: 55px;
      font-size: 16px;
      line-height: 1.25;
      color: #666;
    }
    .desList {
      position: absolute;
      bottom: 20px;
      line-height: 1;
    }
    .yuan {
      margin-right: 2px;
      font: inherit;
    }
    .nowPrice {
      margin-right: 10px;
      display: inline-block;
      font-size: 15px;
      color: #fa2802;
    }
    .oldPrice {
      display: inline-block;
      font-size: 14px;
      text-decoration: line-through;
      color: #b2b2b2;
    }
    .buy {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      position: absolute;
      bottom: 18px;
      margin-left: 186px;
      padding: 0 8px;
      height: 23px;
      font-size: 14px;
      line-height: 20px;
      border-radius: 11px;
      border: solid 1px #fa2802;
      color: #fa2802;
      background-color: #fff;
      &:hover {
        color: #fff;
        background-color: #fb4142;
      }
      &::before {
        content: "";
        position: absolute;
        top: -91px;
        left: -315px;
        width: 399px;
        height: 130px;
        background-color: transparent;
      }
    }
  }
  .ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
<style>
.c-header.news-header .el-select .el-input__inner {
  padding-left: 10px;
  height: 32px;
  line-height: 32px;
  border-radius: 0;
}
.c-header.news-header .el-select .is-focus,
.c-header.news-header .el-select .el-input.is-focus .el-input__inner,
.c-header.news-header .el-select .el-input__inner:focus {
  border-color: #b4bccc;
}
</style>
