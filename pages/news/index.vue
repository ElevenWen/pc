<template>
  <div id="newsIndex">
    <newsHeader></newsHeader>

    <!-- 版心 -->
    <div class="container">
      <!-- 内容 -->
      <div class="content">
        <!-- 轮播图 -->
        <div class="bannerWrap" v-if="bannerList.length">
          <el-carousel trigger="click" :autoplay="true" height="360px">
            <el-carousel-item v-for="(item, index) in bannerList" :key="item.Id">
              <a :href="item.LinkWebSite" @click.self.prevent>
                <img :data-src="item.PosterImgURL" alt="" class="banner-img lazyload" :class="{cursor: item.LinkWebSite}" @click.prevent="toDynamic(item.LinkWebSite)">
              </a>
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 分类 -->
        <div class="classify" id="nav" :class="{'nav fixed': navFixed}">
          <ul class="nav-ul clearfix">
            <li class="classify-item" v-for="(item, index) in classifyList" :key="item.Id" @click.stop="choseNav(item)" :class="{active: item.Id === navId}" >
              <a :href="'/news?navId=' + item.Id" class="redirect" @click.prevent>
                <img src="~assets/images/news/hot-news.png" class="classify-img" v-if="'' === item.Id">
                <img :src="item.ImgUrl" class="classify-img" v-else>
                <span class="classify-name">{{item.Name}}</span>
              </a>
            </li>
            <li class="nav-item more" :class="{'show': moreShow, 'active': navMore}" @click="toShowMore" @mouseleave="toLeaveMore" v-if="classifyMoreList.length">
            <span v-if="navMore">更多.{{navName}}</span>
            <span v-else>更多<i class="el-icon-arrow-up"></i></span>
              <ul class="more-list" v-show="moreShow">
                <li class="more-item" v-for="item in classifyMoreList" :key="item.Id" :class="{'active':item.Id === navId}" @click.stop="choseNav(item, true)">
                  <a :href="'/news?navId=' + item.Id" class="redirect" @click.prevent>{{item.Name}}</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <!-- 列表 -->
        <div class="newsList" :class="{'mt100': navFixed}" v-if="newsList.length">
          <ul>
            <li class="list-item" v-for="item in newsList" :key="item.Id" :class="{'video': item.NewsType}">
              <a :href="'/news/newsDetail?id=' + item.Id" target="_blank" class="redirect">
                <img :data-src="item.ThumbImgURL" alt="" class="list-item-img lazyload">
                <p class="list-item-title">{{item.Title}}</p>
                <p class="list-item-info">{{item.Subtitle}}</p>
                <p class="list-item-data">
                  <span class="list-item-source">{{item.SourceInfo }}</span>
                  <span class="list-item-date">{{item.ReviewDateTime | simpleDateFormat }}</span>
                  <span class="click-rate">{{item.ReadBase + item.ReadNum}}</span>
                </p>
              </a>
            </li>
          </ul>
          <a :href="'/news?navId=' + navId + '&page=' + (pageIndex + 1)" class="redirect load-more cursor" @click.prevent="loadMore" v-if="loadTips === '加载更多'">{{loadTips}}</a>
          <div class="load-more" v-else>{{loadTips}}</div>
        </div>
        <div class="news-empty" :class="{'mt100': navFixed}" v-else>
          <span v-if="loadingStatus">正在加载中~</span>
          <span v-else>当前分类没有新闻</span>
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
        <div class="hot-charts index" :class="{'noAd': !adNewDetailSrc }" v-if="hotList.length">
          <p class="sidebar-title">本周热门排行榜</p>
          <ul>
            <li class="list-item" v-for="item in hotList" :key="item.Id">
              <a :href="'/news/newsDetail?id=' + item.Id" target="_blank" class="redirect">
                <span class="sort-num"></span>
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
          <p class="sidebar-title">热门视频<a href="/news/videoList" target="_blank" class="redirect more">更多&gt;</a></p>
          <ul>
            <li class="video-item" v-for="item in videoList" :key="item.id">
              <a :href="'/news/newsDetail?id=' + item.Id" target="_blank" class="redirect video-item-a">
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
          <a v-for="item in keywordList" :key="item.KeyWord" :href="'/news/search?word=' + item.KeyWord" class="redirect" target="_blank">
            <span class="hot-tags-item">{{item.KeyWord}}</span>
          </a>
        </div>
      </div>
    </div>

    <!-- 公用bottom 整体 -->
    <div class="c-ftContainWrapindex">
      <publicBottom></publicBottom>
    </div>
  </div>
</template>

<script>
// import { mapState, mapActions, mapGetters } from "vuex";
import newsHeader from "~/components/news/header";
import publicBottom from "~/components/common/publicBottom";
import getData from "~/store/ajaxAPI/getData";
import axios from "axios";
import { getDataPort } from "~/store/ajaxAPI/perPort.js";
const baseURL = getDataPort; // build
// const baseURL = `https://api.wqbol.com`; // dev
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
  name: "news",
  scrollToTop: false,
  components: {
    newsHeader,
    publicBottom
  },
  watch: {
    // $route: function() {
    //   this.reload();
    // },
    navFixed: function() {
      if (this.navFixed) {
        let list = this.classifyListTemp.concat([]);
        if (list.length > 8) {
          this.classifyList = list.splice(0, 7);
          this.classifyMoreList = list;
          for (let index = 0; index < list.length; index++) {
            if (this.navId === list[index].Id) {
              this.navMore = true;
            }
          }
        }
      } else {
        this.classifyList = this.classifyListTemp;
        this.classifyMoreList = [];
        this.navMore = false;
      }
    }
  },

  async asyncData({ store, query, error, redirect }) {
    let seoList = [],
      getStatus = false,
      navList = null,
      navId = query.navId || "",
      page = query.page > 1 ? query.page : 1,
      newsListData = null,
      bannerList = null,
      sideAD = null,
      hotList = null,
      videoList = null,
      keywordList = null;

    // 新闻nav列表
    navList = await axios
      .get(baseURL + `/News/GetNewClass`, {
        params: {
          cancelToken: source.token // 取消请求参数
        }
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
    // 判断navId是否存在
    let navFlag = false;
    for (let index = 0; index < classifyList.length; index++) {
      if (navId === classifyList[index].Id) {
        navFlag = true;
      }
    }
    if (!navFlag) {
      // return redirect("/news");
    }
    // 新闻列表
    newsListData = await axios
      .get(baseURL + `/News/List`, {
        params: {
          cancelToken: source.token, //取消请求参数
          id: navId, //默认最新
          pageSize: page * 8,
          pageIndex: 1
        }
      })
      .catch(error => {
        source.cancel(); //执行取消请求, 可以带msg
      });
    if (newsListData) {
      getStatus = 200;
      // 限制最大页数
      var CountPage = newsListData ? newsListData.data.data.recordCount : 0,
        pages = Math.ceil(CountPage / 8) || 1;
      if (page > pages) {
        return redirect("/news?navId=" + navId + "&page=" + pages);
      }
    } else {
      // return redirect("/news");
    }
    // 新闻banner图片数据
    bannerList = await axios
      .get(baseURL + `/Advertment/List`, {
        params: {
          cancelToken: source.token, // 取消请求参数
          type: 0,
          code: "XWSYLBT"
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
          code: "YCGGW08"
        }
      })
      .catch(error => {
        source.cancel(); //执行取消请求, 可以带msg
      });
    // 本周热门新闻列表
    hotList = await axios
      .get(baseURL + `/News/GetHotList`, {
        params: {
          cancelToken: source.token // 取消请求参数
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
        params: {
          cancelToken: source.token // 取消请求参数
        }
      })
      .catch(error => {
        source.cancel(); //执行取消请求, 可以带msg
      });

    return {
      getStatus: getStatus,
      classifyList: classifyList,
      newsList: newsListData ? newsListData.data.data.list : [],
      newsTotal: newsListData ? newsListData.data.data.recordCount : 0,
      bannerList: bannerList ? bannerList.data.data.list : [],
      sideAD: sideAD ? sideAD.data.data.list : [],
      hotList: hotList ? hotList.data.data.list : [],
      videoList: videoList ? videoList.data.data.list : [],
      keywordList: keywordList ? keywordList.data.data : []
    };
  },
  head() {
    return {
      title: "新闻中心 - 微企宝",
      meta: [
        {
          hid: "keywords",
          name: "keywords",
          content: "微企宝,新闻中心"
        },
        {
          hid: "description",
          name: "description",
          content: "微企宝新闻中心"
        }
      ]
    };
  },
  data() {
    return {
      bannerList: [], //轮播图列表
      newest: {
        Id: "",
        Name: "最新",
        ImgUrl: null
      }, // 最新分类
      classifyList: [], //新闻分类列表
      classifyMoreList: [], //新闻分类更多列表
      classifyListTemp: [],//新闻分类列表存储
      navId: "", //当前分类ID
      navName: "最新", //当前分类名称
      navFixed: false, //分类吸顶
      navOffsetTop: 0, //导航栏距离顶部高度
      moreShow: false, //显示分类更多
      moreName: null, //分类在更多中:更多.name
      navMore: false, //分类在更多中
      pageSize: 8,
      pageIndex: 1, //当前页
      pages: 1, //总页数
      newsTotal: 0, // 总数
      newsList: [], // 当前分类下新闻列表
      loadTips: "加载更多",
      hotList: [], //本周热门排行榜
      videoList: [], //视频新闻列表
      keywordList: [], //关键词筛选
      adNewDetailSrc: "", //广告位图片
      adNewDetailSrcClick: "", //广告位跳转动态地址
      keywordList: [], //关键词筛选
      videoOrText: "", //是视频还是图文  0 == 文本  1 == 视频
      loadingStatus: false, // 列表加载中
      loadingMore: false //加载更多中
    };
  },
  created() {
    if (this.getStatus === 200) {
      if (!this.classifyList.length) {
        getData
        .getNewsClassify()
        .then(res => {
          let list = res.data.list;
          list.unshift(this.newest);
          this.classifyListTemp = list;
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
      } else {
        this.classifyListTemp = this.classifyList;
      }
      this.navId = this.$route.query.navId || "";
      this.pageIndex = parseInt(this.$route.query.page)
        ? parseInt(this.$route.query.page)
        : 1;
      this.pages = Math.ceil(this.newsTotal / this.pageSize) || 1;
      if (
        this.pageIndex === this.pages ||
        this.newsList.length === this.newsTotal
      ) {
        this.loadTips = "没有更多了";
      } else {
        this.loadTips = "加载更多";
      }

      if (this.sideAD.length) {
        this.adNewDetailSrc = this.sideAD[0].PosterImgURL;
        this.adNewDetailSrcClick = this.sideAD[0].LinkWebSite;
      }
      if (!this.hotList.length) {
        getData
          .getNewsHotList()
          .then(res => {
            this.hotList = res.data.list;
          })
          .catch(error => {
            // console.log("获取本周热门排行榜", error);
          });
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
    }
  },
  mounted() {
    // this.navOffsetTop = document.querySelector("#nav").offsetTop;
    if (this.bannerList.length) {
      this.navOffsetTop = 515;
    } else {
      this.navOffsetTop = 135;
    }
    // if (this.pageIndex > 1) {
    //   let _h = window.sessionStorage.newsIndexScrollTop;
    //   document.body.scrollTop = _h; // chrome
    //   document.documentElement.scrollTop = _h; // firefox
    //   window.sessionStorage.removeItem("newsIndexScrollTop");
    // }
    window.addEventListener("scroll", this.fetchScrollTop);
  },
  destroyed() {
    window.removeEventListener("scroll", this.fetchScrollTop);
  },
  methods: {
    // 回到顶部
    backTop() {
      document.body.scrollTop = 0; // chrome
      document.documentElement.scrollTop = 0; // firefox
    },
    // 刷新页面
    reload() {
      top.location.reload();
    },
    // 跳转新闻广告位
    toDynamic(adNewDetailSrc) {
      // console.log(adNewDetailSrc,'11')
      window.open(adNewDetailSrc, "_blank");
    },
    // 回到分类导航
    toClassifyNav() {
      document.body.scrollTop = this.navOffsetTop; // chrome
      document.documentElement.scrollTop = this.navOffsetTop; // firefox
    },
    // 显示分类更多
    toShowMore() {
      this.moreShow = true;
    },
    // 隐藏分类更多
    toLeaveMore() {
      this.moreShow = false;
    },
    // 获取分类新闻列表
    getNewsData() {
      let params = {
        params: {
          id: this.navId,
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        }
      };
      getData
        .getNewsList(params)
        .then(res => {
          this.newsList = this.newsList.concat(res.data.list);
          this.pages = Math.ceil(res.data.recordCount / this.pageSize) || 1;
          this.loadingMore = false;
          this.loadingStatus = false;
          if (this.pageIndex === this.pages) {
            this.loadTips = "没有更多了";
          } else {
            this.loadTips = "加载更多";
          }
        })
        .catch(error => {
          // console.log("获取分类新闻列表", error);
        });
    },
    // nav切换
    choseNav(obj, type) {
      let _scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (this.navId === obj.Id) {
        if (_scrollTop > this.navOffsetTop) {
          this.toClassifyNav();
        }
        return;
      }
      this.navId = obj.Id;
      this.navName = obj.Name;
      this.pageIndex = 1;
      this.newsList = [];
      this.loadingStatus = true;
      this.loadingMore = false;
      this.$router.push({
        path: "/news",
        query: { navId: obj.Id }
      });
      this.getNewsData();
    },
    // 当前分类加载更多
    loadMore() {
      if (this.loadingMore) {
        return;
      }
      this.loadingMore = true;
      let _scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (this.pageIndex >= this.pages) {
        return;
      }
      typeof this.pageIndex === "NaN"
        ? (this.pageIndex = 2)
        : (this.pageIndex += 1);
      window.sessionStorage.newsIndexScrollTop = _scrollTop;
      // this.$router.push({
      //   path: "/news",
      //   query: { navId: this.navId, page: this.pageIndex }
      // });
      this.getNewsData();
    },
    //监听滚动条高度
    fetchScrollTop() {
      let _scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (_scrollTop < this.navOffsetTop) {
        this.navFixed = false;
      } else {
        this.navFixed = true;
      }
    }
  }
};
</script>

<style lang="less" type="text/less" scoped>
@import "./news.less";
.classify {
  width: 100%;
  background: #fff;
  margin-top: 20px;
  &.fixed {
    .classify-item {
      width: 150px;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      // color: #4d4d4d;
    }
    .classify-img {
      display: none;
    }
    .classify-name {
      margin-top: 0;
    }
  }
  .classify-item {
    float: left;
    display: block;
    width: 114px;
    height: 93px;
    cursor: pointer;
    &.active {
      border-bottom: 2px solid #ff3e08;
      background-color: #f7f7f7;
      // .classify-img{
      //   color: #ff5e2c;
      // }
      .classify-name {
        font-weight: 600;
        color: #ff3e08;
      }
    }
    &:hover {
      background-color: #f7f7f7;
    }
  }
  .classify-img {
    display: block;
    margin: 20px auto;
    width: 30px;
    height: 32px;
  }
  .classify-name {
    display: block;
    margin-top: -12px;
    width: 100%;
    text-align: center;
    color: #333;
  }
}
.mt100 {
  margin-top: 100px;
}
.sidebar .hot-charts.noAd {
  margin-top: 20px;
  padding-top: 20px;
}
.partner .el-carousel__indicators .el-carousel__indicator {
	padding: 0 10px 0 0;
}
</style>
<style>
#newsIndex .is-active button {
  opacity: 0.9;
}
#newsIndex .el-carousel__button {
  width: 12px;
  height: 12px;
  border-radius: 12px;
}
#newsIndex .el-carousel__arrow {
  width: 40px;
  height: 72px;
  border-radius: 0;
  color: #f4f4f4;
  /* background: rgba(0, 0, 0, 0.5); */
}
#newsIndex .el-carousel__arrow:hover {
  color: #ffdb84;
}
#newsIndex .el-carousel__arrow i {
  font-size: 25px;
}
#newsIndex .el-carousel__arrow--left {
  left: 0;
}
#newsIndex .el-carousel__arrow--right {
  right: 0;
}
</style>
