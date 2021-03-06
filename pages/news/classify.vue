<template>
  <div id="newsClassify">
    <newsHeader></newsHeader>

    <!-- 版心 -->
    <div class="container">
      <!-- 内容 -->
      <div class="content">
        <div class="newsList" v-if="newsList.length">
          <ul>
            <li class="list-item" v-for="item in newsList" :key="item.Id" :class="{'video': item.NewsType}" @click.stop="toDetail(item.Id)">
              <a :href="'/news/newsDetail?id=' + item.Id" class="redirect" @click.prevent>
                <img :data-src="item.ThumbImgURL" alt="" class="list-item-img lazyload">
                <p class="list-item-title">{{item.Title}}</p>
                <p class="list-item-info">{{item.Subtitle}}</p>
                <p class="list-item-data">
                  <span class="list-item-source">{{item.SourceInfo }}</span>
                  <span class="list-item-date">{{item.ReviewDateTime | simpleDateFormat}}</span>
                  <span class="click-rate">{{item.ReadBase + item.ReadNum}}</span>
                </p>
              </a>
            </li>
          </ul>
          <div class="table-page">
            <div class="el-pagination is-background" v-if="CountPage" v-show="false">
              <ul class="el-pager">
                <li class="number" v-for="i in pages" :key="i" :class="{'active': i === pageIndex}">
                  <em v-if="i === pageIndex">{{i}}</em>
                  <a :href="'/news/classify?navId=' + navId + '&page=' + i" class="redirect" v-else>{{i}}</a>
                </li>
              </ul>
            </div>
            <no-ssr>
              <el-pagination
                @current-change="handleCurrentChange"
                background
                prev-text="上一页"
                next-text="下一页"
                :current-page="pageIndex"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="CountPage">
              </el-pagination>
            </no-ssr>
          </div>
        </div>
        <div class="news-empty" v-else>
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
          <div class="hot-charts" v-if="hotList.length">
            <p class="sidebar-title">最新热闻</p>
            <ul>
              <li class="list-item" v-for="item in hotList" :key="item.Id" :class="{video: item.NewsType}" @click.stop="toDetail(item.Id)">
                <a :href="'/news/newsDetail?id=' + item.Id" class="redirect" @click.prevent>
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
            <p class="sidebar-title">热门视频
              <span class="more" @click.stop="toVideoList"><a href="/news/videoList" class="redirect" @click.prevent>更多&gt;</a></span>
            </p>
            <ul>
              <li class="video-item" v-for="item in videoList" :key="item.id" @click.stop="toDetail(item.Id)">
                <a :href="'/news/newsDetail?id=' + item.Id" class="redirect video-item-a" @click.prevent>
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
</template>

<script>
import newsHeader from "~/components/news/header";
import publicBottom from "~/components/common/publicBottom";
import getData from "~/store/ajaxAPI/getData";
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
  name: "news-classify",
  scrollToTop: true,
  components: {
    newsHeader,
    publicBottom
  },

  async asyncData({ store, query, error, redirect }) {
    let getStatus = false,
      navList = null,
      navId = query.navId || "",
      page = query.page > 1 ? query.page : 1,
      newsListData = null,
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
      return redirect("/news/classify?navId=");
    }
    // 新闻列表
    newsListData = await axios
      .get(baseURL + `/News/List`, {
        params: {
          cancelToken: source.token, //取消请求参数
          id: navId, //默认最新
          pageSize: 8,
          pageIndex: page
        }
      })
      .catch(error => {
        source.cancel(); //执行取消请求, 可以带msg
      });
    if (newsListData) {
      getStatus = 200;
      var CountPage = newsListData ? newsListData.data.data.recordCount : 0,
        pages = Math.ceil(CountPage / 8) || 1;
      if (page > pages) {
        return redirect("/news/classify?navId=" + navId + "&page=" + pages);
      }
    } else {
      return redirect("/news");
    }
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
    // 获取最新5条新闻列表
    hotList = await axios
      .get(baseURL + `/News/List`, {
        params: {
          cancelToken: source.token, // 取消请求参数
          pageSize: 5
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
          cancelToken: source.token, // 取消请求参数
        }
      })
      .catch(error => {
        source.cancel(); //执行取消请求, 可以带msg
      });

    return {
      getStatus: getStatus,
      navId: navId,
      newsList: newsListData ? newsListData.data.data.list : [],
      CountPage: CountPage,
      pages: pages,
      sideAD: sideAD ? sideAD.data.data.list : [],
      hotList: hotList ? hotList.data.data.list : [],
      videoList: videoList ? videoList.data.data.list : [],
      keywordList: keywordList ? keywordList.data.data : []
    };
  },
  head() {
    return {
      title: this.navName + " - 微企宝",
      meta: [
        {
          hid: "keywords",
          name: "keywords",
          content: this.navName
        },
        {
          hid: "description",
          name: "description",
          content:
            "在微企宝找到了" +
            this.CountPage +
            "条“" +
            this.navName +
            "”的相关新闻"
        }
      ]
    };
  },
  data() {
    return {
      navId: null, //当前分类ID
      navName: "最新新闻", //当前分类名称
      newsList: [], // 当前分类下新闻列表
      pageSize: 8,
      pageIndex: 1, //当前页
      pages: 1, //总页数
      CountPage: null, //总条数
      hotList: [], //本周热门排行榜
      videoList: [], //视频新闻列表
      keywordList: [], //关键词筛选
      adNewDetailSrc: "", //广告位图片
      adNewDetailSrcClick: "", //广告位跳转动态地址
      loadingStatus: false // 列表加载中
    };
  },
  created() {
    if (this.getStatus === 200) {
      this.pageIndex =
        this.$route.query.page > 1 ? Number(this.$route.query.page) : 1;
      if (this.navId === "") {
        this.navName = "最新新闻";
      } else if (this.newsList.length) {
        this.navName = this.newsList[0].DataDictionaryName;
      }
      if (this.sideAD.length) {
        this.adNewDetailSrc = this.sideAD[0].PosterImgURL;
        this.adNewDetailSrcClick = this.sideAD[0].LinkWebSite || "javascript:;";
      }
    }
  },
  mounted() {
    // 用户手动输入页数超过总页数时显示最后一页
    if (this.pageIndex > this.pages) {
      this.loadingStatus = true;
      this.$router.push({
        query: { navId: this.navId, page: this.pages }
      });
      // window.location.reload();
    }
  },
  methods: {
    // 跳转视频列表
    toVideoList() {
      this.$router.push("/news/videoList");
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
    // 回到顶部
    backTop() {
      document.body.scrollTop = 0; // chrome
      document.documentElement.scrollTop = 0; // firefox
    },
    // 获取当前分类新闻列表
    getNewsData() {
      this.newsList = [];
      this.loadingStatus = true;
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
          this.loadingStatus = false;
          this.newsList = res.data.list;
          this.CountPage = res.data.recordCount;
          this.pages = Math.ceil(this.CountPage / this.pageSize) || 1;
          this.backTop();
          if (this.navId === "") {
            this.navName = "最新新闻";
          } else if (this.newsList.length) {
            this.navName = this.newsList[0].DataDictionaryName;
          }
        })
        .catch(error => {
//        console.log("获取当前分类新闻列表", error);
        });
    },
    // 当前页获取
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.$router.push({
        query: { navId: this.navId, page: this.pageIndex }
      });
      // this.getNewsData();
    },
    // GET当前页面所有数据
    getAllData() {
      this.getNewsData();

      // 获取最新5条新闻列表
      getData
        .getNewsList({
          params: {
            pageSize: 5
          }
        })
        .then(res => {
          this.hotList = res.data.list;
        })
        .catch(function(error) {
          // console.log("获取最新5条新闻列表", error);
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
        .catch(function(error) {
          // console.log("关键词筛选", error);
        });

      //广告位
      getData
        .getHomeBanner({
          params: {
            type: "0",
            code: "YCGGW12" //（热门视频）
          }
        })
        .then(res => {
          this.adNewDetailSrcClick = res.data.list[0].LinkWebSite;
          this.adNewDetailSrc = res.data.list[0].PosterImgURL;
        })
        .catch(error => {
          // console.log("广告位", error);
        });
    },
    // 监听路由，获取数据
    fetchRoute() {
      this.navId = this.$route.query.navId || "";
      this.pageIndex =
        this.$route.query.page > 1 ? Number(this.$route.query.page) : 1;
      if (this.navId === "" || this.navId.length === 36) {
        this.getAllData();
      } else {
        this.backTop();
        this.$router.push("/news");
      }
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "fetchRoute"
  }
};
</script>

<style lang="less" type="text/less" src="~/pages/news/news.less" scoped></style>
