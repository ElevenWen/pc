import  tool from '~/assets/lib/tool'

export const state = () => ({
  loginDialogVisible: false, //登录弹窗状态
  productListCommontData: '', //商品列表
  couponNum: '', //优惠券数量
  authUser:null,
  wdMsgNun: 0   //未读消息数量
})

export const mutations = {
loginDialogVisible(state) {
    state.loginDialogVisible = !state.loginDialogVisible;
},
  //存储优惠券数量同步
  M_saveCouponNum(state, Num) {
    state.couponNum = Num;
  },
  //存储商品列表数据
  M_setProductListData(state, {
    prodlistData
  }) {
    state.productListCommontData = prodlistData;
  },
  SET_USER(state,data) {
    state.authUser = data
  },
  loginDVisible(state,data) {
    if( typeof window != "undefined"  ){  //防止在vue加前登录报错
      // alert(1)
       tool.saveToLocal('CustomerMesg',data)
       
       tool.addCookie(JSON.stringify(data),24);
    }
    state.authUser = data || null
//  console.log(state.authUser,'登陆储存')
  },
  lognOut_X_M(state,data){
    if( typeof window != "undefined"  ){  //防止在vue加前登录报错
      tool.removeLocal('CustomerMesg');
      
      tool.delCookie();
    }
    state.authUser = null
  },
  //未读系统消息数量
  SET_WDXXNum(state,data) {
    state.wdMsgNun = data
  }

}


export const actions = {
  nuxtServerInit({ //初始化服务器,获取服务器数据
    commit
  }, {
    req,
    route
  }) { //第一次调用未undefined

  //  console.log("</br>")
  //   console.log("-------------------------------------------------------------------------")
  //    console.log( req.session.authUser)
    if (req.session && req.session.authUser) { 
        commit('SET_USER', req.session.authUser)
    }else{
        commit('lognOut_X_M', null);
    }
  },
  loginDialogVisible({commit}){
    commit('loginDialogVisible')
  },
  //签入
  loginDVisible({commit},data='null') {
    // console.log("dddddddddddddddddddddddddddddddddddddddddddd")

      commit('loginDVisible',data)
    
  },
  //存储优惠券数量异步
  saveCouponNum(context, num) {
    context.commit('M_saveCouponNum', num)
  },
  //组件调用 存储商品列表数据
  setProductListData({
    commit,
    state
  }, prodlistData) {
    commit('M_setProductListData', {
      prodlistData
    })
  },
  lognOut_X({commit},data){//签出
       commit('lognOut_X_M', null)
  }
}


export const getters = {
  loginDialogVisible(state) {
    // console.log('111111111111111111111111',state.loginDialogVisible)
    return state.loginDialogVisible;
  },
  //获取优惠券数量
  getCouponNum(state) {
    return state.couponNum
  },
  //组件 获取商品列表
  getProductListData(state) {
    return state.productListCommontData
  },
  GET_WDXXNum(state) {
    return state.wdMsgNun
  }
}
