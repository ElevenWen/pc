import * as types from '~/store/ajaxAPI/mutations_types'
import getData from '~/store/ajaxAPI/getData'

// state用来存放数据
export const state = () => ({
  classifyList: [], // 分类列表数据
  newsList: {}, // 新闻列表数据
  hotNewsList: {}, // 热门排行榜列表数据
  videoList: [], // 视频新闻列表数据
  keyWordList: [], // 热门关键词数据
  bannerList: [], // 首页轮播图列表数据
  newsInfo: {}, // 新闻详情页数据
  reviewData: {}, // 新闻详情页评论数据
})

// getters是store的计算属性
export const getters = {
  /* abc(state) {
    console.log('w 在getet',
      state.bannerList)
    return state.bannerList
  } */
}

// mutations里的操作必须是同步的(官方推荐),执行多个 state 的操作
export const mutations = {
  [types.REQUEST_DATA_NEWS_BANNER](state, data) {
    state.bannerList = data;
    // console.log('state.bannerList ', state.bannerList)
  },
  [types.REQUEST_DATA_CLASSIFY_LIST](state, data) {
    state.classifyList = data;
  },
  [types.REQUEST_DATA_NEWS_LIST](state, data) {
    state.newsList = data;
  },
  [types.REQUEST_DATA_NEWS_VIDEO_LIST](state, data) {
    state.videoList = data;
  },
  [types.REQUEST_DATA_NEWS_DETAIL](state, data) {
    state.newsInfo = data;
  },
  [types.REQUEST_DATA_NEWS_REWARD_LIST](state, data) {
    state.reviewData = data;
  },
}

//声明Actions 执行多个 mutations,官方推荐将异步操作放在 action 中
export const actions = {
  // newsClassify({ commit },data){
  // 		getData.newsClassify().then( (res)=>{
  //       console.log(res)
  // 	        return commit(types.REQUEST_DATA_CLASSIFY_LIST, res.data);
  //         },(error)=>{
  //          // //console.log("优惠券错误")
  //         })
  // },
  // 首页banner
  getBanner({
    state,
    commit,
    rootState
  }, data) {
    return getData.getNewsBanner(data)
      .then((res) => {
        // if (data.params.code == "XWSYLBT") {
        // console.log('banner', res.data.list)
        return commit(types.REQUEST_DATA_NEWS_BANNER, res.data.list);
        // }
      })
      .catch((error) => {
        //console.log("error",error);
      })
  },
  //请求新闻
  getNewsList({
    state,
    commit,
    rootState
  }, data) {
    return getData.getNewsList(data)
      .then((res) => {
//      console.log(res)
      })
      .catch((error) => {
//      console.log("error", error);
      })
  },
  //请求视频新闻
  getVideoNewsList({
    state,
    commit,
    rootState
  }, data) {
    return getData.getVideoNewsList(data)
      .then((res) => {
//      console.log('video', res.data.list)
        return commit(types.REQUEST_DATA_NEWS_VIDEO_LIST, res.data.list);
      })
      .catch((error) => {
//      console.log("error", error);
      })
  },
}
