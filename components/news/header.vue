<template>
  <!--头部导航-->
  <div class="c-header news-header">
    <div class="c-hdTopWrap">
      <topState :isHome="false"></topState>
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
              <input type="text" class="searchText" ref="searchText" v-model="searchInput" @keyup.enter.stop.prevent="onTextSearch()" placeholder="请输入关键字">
              <span class="onSearch" @click="onTextSearch()">搜索</span>
            </div>
        </div>
      </div>
    </div>
    <div class="nav" :class="{'fixed': navFixed}" id="nav" v-if="notIndex">
      <ul class="nav-ul">
        <li class="nav-item" v-for="item in classifyList" :key="item.Id" :class="{'active':item.Id === navId}" @click.stop="toClassify(item.Id)">
          <a :href="'/news/classify?navId=' + item.Id" class="redirect nav-item-a" @click.prevent>{{item.Name}}</a>
        </li>
        <li class="nav-item more" :class="{'show': moreShow, 'active': navMore}" @click="toShowMore" @mouseleave="toLeaveMore" v-if="classifyMoreList.length">
          <span v-if="navMore">更多.{{navName}}</span>
          <span v-else>更多<i class="el-icon-arrow-up"></i></span>
          <ul class="more-list" v-show="moreShow">
            <li class="more-item" v-for="item in classifyMoreList" :key="item.Id" :class="{'active':item.Id === navId}" @click.stop="toClassify(item.Id)">
              <a :href="'/news/classify?navId=' + item.Id" class="redirect nav-item-a" @click.prevent>{{item.Name}}</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import topState from "~/components/common/topState";
import getData from "~/store/ajaxAPI/getData.js";
export default {
  name: "app",
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
      checkedValue: "新闻", //搜索选择的默认选项
      searchInput: "", //
      newest: {
        Id: "",
        Name: "最新",
        IconImage: null
      }, // 最新分类
      classifyList: [], //新闻分类列表
      classifyMoreList: [], //新闻分类更多列表
      moreShow: false, //显示分类更多
      navMore: false, //分类在更多中
      navFixed: false, //分类吸顶
      navId: null, //当前分类ID
      navName: null, //当前分类名称
      notIndex: false //不是新闻首页
    };
  },
  updated() {},
  components: {
    topState
  },
  computed: {
    // mapState mapGetters 一般也写在 computed 中
    // searchInput(){//搜索框关键词
    //   return
    // }
  },
  created() {
    // 获取分类新闻列表
    if (this.$route.name !== "news") {
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
          // console.log('class',this.classifyMoreList)
          // console.log('class',this.navId)
        })
        .catch(error => {
//        console.log("获取分类新闻列表", error);
        });
    }
  },
  mounted() {
    this.fetchPath();
    // console.log(this.getBanner())
    window.addEventListener("scroll", this.fetchScrollTop);
  },
  destroyed() {
    window.removeEventListener("scroll", this.fetchScrollTop);
  },
  methods: {
    // mapActions 一般写在 methods 中
    /* ...mapActions({
      // "REQUESTDATA_CLASSIFYLIST": "news/news/REQUESTDATA_CLASSIFYLIST",
      "getNewsList": "news/news/getNewsList",
      "getBanner": "news/news/getBanner",
    }), */
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
    // 判断当前路由是否新闻首页
    fetchPath() {
      this.searchInput = this.$route.query.word;
      this.notIndex = this.$route.path === "/news" ? false : true;
      if (this.$route.path === "/news/classify") {
        this.navId = this.$route.query.navId || '';
        this.navMore = false;
        if (this.classifyMoreList.length) {
          for (let index = 0; index < this.classifyMoreList.length; index++) {
            if (this.navId === this.classifyMoreList[index].Id) {
              this.navMore = true;
              this.navName = this.classifyMoreList[index].Name;
            }
          }
        }
      }
    },
    //监听滚动条高度
    fetchScrollTop() {
      // let _offsetTop = document.querySelector("#nav").offsetTop;
      let _scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      this.navFixed = _scrollTop < 66 ? false : true;
      // if (_offsetTop < _scrollTop) {
      //   this.navFixed = true;
      // } else {
      //   this.navFixed = false;
      // }
    }
    //接收newDetail.vue search.vue videoList.vue classify.vue的值
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "fetchPath"
  }
};
</script>

<style lang="less" type="stylesheet/css" src="~/pages/news/news.less" scoped></style>
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
