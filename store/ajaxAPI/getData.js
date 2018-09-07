import api from './getDataPack';
import tianyancha from './tianyancha';
import businessLicense from './businessLicense';
import login from './login';
import serverList from './serverList';
import seo from './seo';
import urlShort from './urlShort';
import report from './report';
import upload from './businessLicense';
import idCard from './idcard';



/*
 *api.fech argument
 * argument[0] :method
 * argument[1] :url
 * argument[2] :parmas
 * return response.data
 */
export default {
  //系統消息
  getSysMessage(params) {
    return api.fetch('post', '/NoticeMessage/SysMessage', params);
  },
   //系統活动消息
   activityMessage(params) {
    return api.fetch('post', '/NoticeMessage/ActivityMessage', params);
  },
  //获取消息 数量
  getMessageNum(params) {
    return api.fetch('get', '/NoticeMessage/GetMessageNum', params);
  },
  //獲取消息 記錄已讀取 
  readSysMessage(params) {
    return api.fetch('post', '/NoticeMessage/GetMessage', params);
  },
  //刪除消息
  delSysMessage(params) {
    return api.fetch('post', '/NoticeMessage/MessageRemoveById', params);
  },
  //购物车列表数据
  ShoppingCarList(params) {
    return api.fetch('get', '/ShoppingCart/List', params);
  },
  // 购物车删除
  ShoppingCartRemove(params) {
    return api.fetch("get", '/ShoppingCart/Remove', params);
  },
  // 购物车增加 减少
  addOrDescCart(params) {
    return api.fetch("get", '/ShoppingCart/UpdateNumList', params);
  },
  // 购物车状态改变
  changeCheckCart(params) {
    return api.fetch("get", '/ShoppingCart/UpdateChecked', params);
  },
  // 购物车活动列表
  hotCart(params) {
    return api.fetch("get", '/SalesPromotion/SalesList', params);
  },
  // 添加收藏列表  ==针对购物车
  collectCartList(params) {
    return api.fetch("get", '/CusHouse/CreatedOrEditForShoppingCart', params);
  },
  // 移除收藏列表  ==针对购物车
  collectCartList(params) {
    return api.fetch("get", '/CusHouse/RemoveShoppingCart', params);
  },
  // ?
  createdOrEdit(params) {
    return api.fetch("post", '/CusHouse/CreatedOrEdit', params);
  },
  // 获取销量前12商品
  getAllList(params) {
    return api.fetch("get", '/Product/GetAllList', params);
  },
  //发票列表获取
  requestBillList(params) {
    return api.fetch("get", '/Customer/CusInvoiceByType', params);
  },
  //发票保存
  saveBillList(params) {
    return api.fetch("post", '/Customer/CusInvoiceSave', params);
  },
  //发票 优惠券获取
  couponUseList(params) {
    return api.fetch("post", '/Customer/GetCusUsedCouponList', params);
  },
  //结算页面 余额查询
  bill_request_balance(data) {
    //params == 我从vuex 中传过来的动态参数
    return api.fetch('get', '/Payment/GetCustomerBalance', data);
  },
  //结算页面  立即下单 从商品详情页面 立即购买
  orderFromCart_immediately(data) {
    //params == 我从vuex 中传过来的动态参数
    return api.fetch('post', '/Order/ImmediatelyOrder', data);
  },
  //结算页面  提交订单形成订单
  orderFromCart(data) {
    //console.log(data,'提交订单形成订单')
    return api.fetch('post', '/Order/CreatedOrEdit', data);
  },
  //支付页面 获取订单信息
  payMethodCheck(data) {
    return api.fetch('post', '/Order/GetOrderInfoById', data);
  },
  //支付页面 微信二维码
  wxPayCode(data) {
    return api.fetch('post', '/Payment/MakeActivityPayQRCode', data);
  },
  //支付页面 支付宝支付
  unionPay(data) {
    return api.fetch('post', '/Payment/Unionpay', data);
  },
  //支付页面 网银支付
  alibabaPay(data) {
    return api.fetch('post', '/payment/AlipayScanCode', data);
  },
  //最近浏览
  CusBrowseRecord() {
    return api.fetch("get", '/CusBrowseRecord/List');
  },
  // 新增/修改收藏
  collectCart(params) {
    return api.fetch("get", '/CusHouse/CreatedOrEditForShoppingCart', params);
  },
  // 移除收藏PC
  delCollectCart(params) {
    return api.fetch("get", '/CusHouse/RemoveShoppingCart', params);
  },
  //个人中心我的公司列表数据
  mycompanyList() {
    return api.fetch('get', '/Customer/CusCompanyList')
  },
  //个人中心我的公司编辑公司列表数据
  companyEdit(params) {
    return api.fetch('post', '/Customer/GetCusCompanyById', params)
  },
  //个人中心我的公司-确认提交
  submitCompany(params) {
    return api.fetch('post', '/Customer/CusCompanySave', params)
  },
  //个人中心删除公司
  deleteCompany(params) {
    return api.fetch('post', '/Customer/CusCompanyRemove', params)
  },
  //个人中心-我的推荐-奖励汇总
  myRebateSummary() {
    return api.fetch('get', '/Activity/GetMyRebateSummary')
  },
  //个人中心-我的推荐-奖励列表
  myRebateList() {
    return api.fetch('get', '/Activity/GetMyRebateList')
  },
  //个人中心-资产中心-积分兑换列表
  integralChange(params) {
    return api.fetch('post', '/ScoreMall/List', params)
  },
  //个人中心-资产中心-积分兑换-确认兑换
  comfirmChange(params) {
    return api.fetch('post', '/ScoreMall/Exchange', params)
  },
  //个人中心-资产中心-我的优惠券
  couponList(params) {
    return api.fetch('post', '/Customer/GetCusCouponList', params)
  },
  // 优惠券立即使用
  GetProductListByCouponType(params) {
    return api.fetch('post', '/Customer/GetProductListByCouponType', params)
  },
  //个人中心-资产中心-获取积分详情
  myScoreDetails() {
    return api.fetch('get', '/Customer/GetMyScoreDetails')
  },
  //个人中心-资产中心-获取积分总额
  myScore() {
    return api.fetch('get', '/Customer/GetMyScore')
  },
  //个人中心-投诉建议-历史列表
  ComplaintAndAdviceList(params) {
    return api.fetch('post', '/ComplaintAndAdvice/GetList', params)
  },
  //个人中心-新增投诉建议
  CreateComplaintAndAdvice(params) {
    return api.fetch('post', '/ComplaintAndAdvice/CreateComplaintAndAdvice', params)
  },
  //个人中心-全部订单列表
  allOrder(params) {
    return api.fetch('post', '/Order/GetList', params)
  },
  //个人中心-订单-根据订单号获取公司名
  companyName(params) {
    return api.fetch('post', '/Order/GetCompanyByOrderId', params)
  },
  //个人中心-订单-再次购买
  GetOrderListById(params) {
    return api.fetch('post', '/Order/GetOrderListById', params)
  },
  //个人中心-我的发票列表
  invoiceList() {
    return api.fetch('get', '/Order/GetOrderList')
  },
  //个人中心-发票详情
  GetCusInvoiceById(params) {
    return api.fetch('post', '/Customer/GetCusInvoiceById', params)
  },
  //个人中心-新增发票成功后返回给订单
  UpdateOrderCusinvoice(params) {
    return api.fetch('post', '/Order/UpdateOrderCusinvoice', params)
  },
  //银行列表
  bankName(params) {
    return api.fetch('post', '/System/GetDictionaryList', params)
  },
  //个人中心-取消订单
  cancelOrder(params) {
    return api.fetch('get', '/Order/CancelOrder', params)
  },
  //个人中心-删除订单
  deleteOrder(params) {
    return api.fetch('post', '/Order/Remove', params)
  },
  //订单详情
  orderDetail(params) {
    return api.fetch('post', '/Order/GetOrderInfoById', params)
  },
  //订单详情-再次购买-单个商品
  buyProductAgain(params) {
    return api.fetch('post', '/Order/GetProductById', params)
  },
  //订单日志
  OrderLogList(params) {
    return api.fetch('post', '/Order/GetOrderLogList', params)
  },
  //个人中心-订单详情-个人信息
  GetDeliveryAddressById(params) {
    return api.fetch('post', '/Order/GetDeliveryAddressById', params)
  },
  //个人中心-我的收藏
  myCollect(params) {
    return api.fetch('get', '/CusHouse/List', params)
  },
  //个人中心-删除收藏
  deleteCollect(params) {
    return api.fetch('post', '/CusHouse/Remove', params)
  },
  //个人中心-评论-标签
  GetLable(params) {
    return api.fetch('post', '/CustomerLable/GetLable', params)
  },
  //个人中心-余额总数
  GetCustomerBalance() {
    return api.fetch('get', '/Payment/GetCustomerBalance')
  },
  //个人中心-余额-交易明细
  GetTransactionDetail() {
    return api.fetch('get', '/Payment/GetTransactionDetail')
  },
  //个人中心-新增评论
  CreateOrEdit(params) {
    return api.fetch('post', '/ProReview/CreateOrEdit', params)
  },

  //首页 商品分类列表获取数据
  SERVERLIST(params) {
    // console.log('??????????????????0')
    return api.fetch("get", "/Product/GetClassList", params);
  },
  //首页  商品服务列表获取数据
  SERVER_PRODUCT_LIST(params) {
    return api.fetch("get", "/Product/GetServiceList", params);
  },
  //获取一级下的所有商品列表
  getByFirstClass(params) {
    return api.fetch("get", "/Product/ProductListGetByFirstClass", params);
  },
  // 首页  根据分类获取产品列表请求数据  根据服务获取产品列表信息
  SERVER_PRODUCT_INFOR(params) {
    return api.fetch("get", "/Product/ProductListGetByClass", params);
  },
  //首页套餐数据
  getMealData(params) {
  	params.params.cancelToken = api.source;
    return api.fetch('get', '/ProPackage/ProPackageList', params);
  },
  // 首页banner图片数据
  getHomeBanner(params) {
  	params.params.cancelToken = api.source;
    return api.fetch("get", "/Advertment/List", params);
  },
  //首页获取栏目列表
  getColList(params) {
  	params.params.cancelToken = api.source;
    return api.fetch('get', '/ProColumn/GetList',params);
  },
  //首页根据栏目编号获取商品栏目列表
  GetColumnList(params) {
  	params.params.cancelToken = api.source;
    return api.fetch('get', '/ProColumn/GetColumnList', params);
  },
  //首页获取访问数量
  getWebSites(params) {
  	params.params.cancelToken = api.source;
    return api.fetch('get', '/System/GetWebSites', params);
  },
  //首页获取第一个栏目
  getFirstList(params) {
  	params.params.cancelToken = api.source;
    return api.fetch('get', '/ProColumn/GetFirstList',params);
  },
  //首页获取第一个栏目下的子栏目
  getFirstDetailList(params) {
  	params.params.cancelToken = api.source;
    return api.fetch('get', '/ProColumn/GetFirstDetailList', params);
  },
  //获取访问数量
  getCompanyCheck() {
    return api.fetch('get', '/System/GetCompanyCheck');
  },
  //公司核名
  createCheckCompany(params) {
    return api.fetch('get', '/System/CreateCheckCompany', params);
  },
  // 免费通话
  freeTel(params) {
    return api.fetch('get', '/System/CreateVisitor', params);
  },
  //首页 新增访问记录
  createSearchRecord(params) {
    return api.fetch('get', '/System/CreateSearchRecord', params);
  },
  //首页 获取访问记录
  getSearchRecordList(params) {
  	params.params.cancelToken = api.source;
    return api.fetch('get', '/System/GetSearchRecordList',params);
  },
  //限时抢购
  getSalesList(params) {
    return api.fetch('get', '/SalesPromotion/SalesList', params);
  },
  //首页 获取登录二维码
  getCode(params) {
    return api.fetch('get', '/OpenPlatform/GetLoginQRCodeInfo', params);
  },
  //首页 获取登录二维码图片
  // getCodeImage(params){
  //     // //console.log(params,"dddddddddddddddddddddd")
  //     return api.fetch('get','/OpenPlatform/GetLoginQRCodeImage',params);
  // },
  //登录 微信授权登录access_token给后台
  sendNET_ACCESS_TOKEN(params) {
    // //console.log(params,"dddddddddddddddddddddd")
    return api.fetch('post', '/OpenPlatform/AppLogin', params);
  },
  //第三方登录 绑定手机
  bindTelephone(params) {
    //console.log( '//第三方登录 绑定手机',params );
    return api.fetch('post', '/OpenPlatform/AppBind', params);
  },

  //后台记录 浏览记录
  getCusBrowseRecord(params) {
    return api.fetch('post', '/CusBrowseRecord/CreatedOrEdit', params);
  },


  //登录注册
  login(params) {
    // console.log('登录注册后台',params)
    // console.log(login)
    return login.fetch('post', '/api/login', params);
  },


  // login1111111111111111111111(params) {
  //   // console.log('登录注册后台',params)
  //   // console.log(login)
  //   return api.fetch('post', '/Customer/Login', params);
  // },


  //登录退出
  loginOut(params) {
    return login.fetch('post', '/api/logout', params);
  },

  // 设置基本资料
  basicInformation(params) {
    return api.fetch('post', "/Customer/EditCustomerInfo", params);
  },

  // 获取基本资料
  getcustorInfor(params) {
    return api.fetch('get', "/Customer/GetCustomerInfo", params);
  },
  // 省区
  provice() {
    return api.fetch("get", "/System/GetProinveList");
  },
  // 市
  cityArea(params) {
    return api.fetch("get", "/System/GetAreaListById", params);
  },
  //城市列表
  getAreaList() {
    return api.fetch('get', '/System/GetAllCityList');
  },
  // 新增/修改收货地址
  addAddress(params) {
    return api.fetch("get", "/CusDeliveryAddress/CreatedOrEdit", params);
  },

  // 获取收货地址列表
  getAddrList(params) {
    return api.fetch("get", "/CusDeliveryAddress/List", params);
  },

  // 删除收货地址
  delAddress(params) {
    return api.fetch("get", "/CusDeliveryAddress/Remove", params);
  },

  // 设为默认地址
  setDefault(params) {
    return api.fetch("get", "/CusDeliveryAddress/SetDefault", params);
  },

  // 获取单个收货地址数据
  singleAddr(params) {
    return api.fetch("get", "/CusDeliveryAddress/Get", params);
  },

  // 获取验证码
  getVerification(params) {
    //console.log('getVerification',params)
    return api.fetch("post", "/Customer/SendMobileVerifyCode", params);
  },
  // 变更手机/邮箱认证
  changeTelOrMail(params) {
    return api.fetch("get", "/SecurityCenter/ChangeCertification", params);
  },

  // 变更手机认证第二步
  changeTel(params) {
    return api.fetch("get", "/SecurityCenter/ChangeCertificationMoblie", params);
  },

  // 修改密码
  changePsd(params) {
    return api.fetch("get", "/Customer/UpdatePwd", params);
  },

  // 变更邮箱认证第二步
  changeEmail(params) {
    return api.fetch("get", "/SecurityCenter/ChangeCertificationEmail", params);
  },
  //获取商品详情-产品
  getProductInfo(params) {
    return api.fetch("post", "/Product/GetProductInfoById", params);
  },
  //商品对应服务列表
  getProductTypeByProductId(params) {
    return api.fetch("post", "/Product/GetProductTypeByProductId", params);
  },
  //获取商品详情-套餐
  GetProckageInfoById(params) {
    return api.fetch("post", "/ProPackage/GetProckageInfoById", params);
  },
  //获取价格切换 旧版
  getProductPriceByProductId(params) {
    return api.fetch("post", "/Product/GetProductPriceByProductId", params);
  },
  //获取价格切换 新版
  getProductPriceByProductIdd(params) {
    return api.fetch("post", "/Product/GetProductPriceByProductIdd", params);
  },
  //模糊搜索商品列表数据
  getIndistinctList(params) {
    return api.fetch("post", "/Product/GetIndistinctList", params);
  },
  //获取评论总数
  ProReview(params) {
    return api.fetch("post", "/ProReview/List", params);
  },
  //获取商品评论总星级
  getStarById(params) {
    return api.fetch("post", "/ProReview/GetStarById", params);
  },
  //APP第三方登录
  openPlatform(params) {
    return api.fetch('post', "/OpenPlatform/AppLogin", params);
  },
  //首页 获取商品列表（置顶）
  getTopList(params) {
  	params.params.cancelToken = api.source;
    return api.fetch('get', "/Product/GetTopList",params);
  },
  //加入购物车
  addToShoppingCart(params) {
    return api.fetch('post', "ShoppingCart/CreatedOrEdit", params);
  },
  //购物车-立即购买
  GetOrderListByProductId(params) {
    return api.fetch('post', "Order/GetOrderListByProductId", params);
  },
  // 新闻详情中心
  newsDetail(params) {
    return api.fetch('get', "/News/GetNewsById", params);
  },
  //上传头像
  upNetImage(params) {
    // console.log("params",params)
    return api.fetch('post', "/Upload/Save", params);
  },
  // 领券中心优惠券
  getAllCouponList(params) {
    return api.fetch('get', "/Customer/GetAllCouponList", params);
  },

  // 领券中心——根据品类获取对应的优惠券列表
  getCouponListInfo(params) {
    return api.fetch('post', "/Customer/GetCouponListByClassID", params);
  },
  getCouponListInfoAll() {
    return api.fetch('get', "/Customer/GetCouponListByClassID");
  },

  // 领取优惠券
  getCoupon(params) {
    return api.fetch('post', "/Customer/ReceiveCoupon", params);
  },

  // 领券中心——根据服务获取产品列表信息
  getProductListByCouponType(params) {
    return api.fetch('post', "/Customer/GetProductListByCouponType", params);
  },
  // 注册
  register(params) {
    return api.fetch('post', "/Customer/Register", params);
  },
  // 忘记密码
  forgetPsd(params) {
    return api.fetch('post', "/Customer/ForgetPwd", params);
  },

  //商事查询 天严查
  QUERYTIANYANCHA({
    method,
    params
  }) {
    return tianyancha.fetch(method, "/Enterprise/GetTianYanChaApiData", params);
  },

  //阿里营业执照
  businessLicense(method, params) {
    return businessLicense.fetch(method, "/rest/160601/ocr/ocr_business_license.json", params);
  },
  //扫码登录
  SLogin(params) {  
    return api.fetch('post', "/Customer/Login", params);
  },
  urlShort(params) { //长链接转短链接
    // console.log(params,'长链接转短链接')

    return urlShort.fetch('post', '/api/urlShort', params)
  },
  //SEO
  seo(params) { // seo接口
  	params.params.cancelToken = api.source;
    return seo.fetch('get', "/System/GetSEOList", params);
  },

  // 集成续费
  addMoney() {
    return api.fetch('get', "/Customer/GetCashRecharge");
  },

  // 集成试用账号
  tryoutAccount(params) {
    return report.fetch('get', "wqb/toSystem/queryUserByPtID", params);
  },

  // 集成  判断是否被禁用
  isDisabled(params) {
    return report.fetch('get', "wqb/toSystem/queryUserStateById", params);
  },
  // 个人/企业签章-实名认证
  realNameCertification(params) {
    return api.fetch("post", "/ElectronicContract/RealNameCertification", params);
  },
  // 获取客户签章列表
  signList(params) {
    return api.fetch("post", "/ElectronicContract/GetCustomerSignatureList", params);
  },

  // 通过客户签章ID获取信息
  getSignById(params) {
    return api.fetch("post", "/ElectronicContract/GetCustomerSignatureById", params);
  },

  // 客户签署电子合同
  customerSigned(params) {
    return api.fetch("post", "/ElectronicContract/CustomerSigned", params);
  },

  // 删除客户签章
  deletSign(params) {
    return api.fetch("post", "/ElectronicContract/CustomerSignatureRemove", params);
  },

  //阿里营业执照
  businessLicense(method, params) {
    return upload.fetch(method, "/rest/160601/ocr/ocr_business_license.json", params);
  },

  // 身份证识别
  idcard(params) {
    return idCard.fetch("post", "/rest/160601/ocr/ocr_idcard.json", params);
  },

  // 新闻模块  分类列表数据
  getNewsClassify(params) {
    return api.fetch("get", "/News/GetNewClass", params);
  },

  // 新闻模块  新闻首页banner
  getNewsBanner(params) {
    return api.fetch('get', "/Advertment/List", params);
  },

  // 新闻模块  新闻详情页
  getNewsDetail(params) {
    return api.fetch('get', "/News/GetNewsById", params);
  },

  // 新闻模块  获取新闻评论
  getRewardList(params) {
    return api.fetch('get', '/News/GetRewardList', params);
  },

  // 新闻模块  获取新闻列表
  getNewsList(params) {
    return api.fetch('get', '/News/List', params);
  },
  // 首页获取新闻列表
  getHomeNewsList(params) {
  	params.params.cancelToken = api.source;
    return api.fetch('get', '/News/List', params);
  },

  // 新闻模块  获取新闻收藏列表
  getNewsCollectList(params) {
    return api.fetch('post', '/News/GetCollectList', params);
  },

  // 新闻模块  获取本周热门新闻列表
  getNewsHotList(params) {
    return api.fetch('get', '/News/GetHotList', params);
  },

  // 新闻模块  获取视频新闻列表
  getNewsVideoList(params) {
    return api.fetch('get', '/News/VideoList', params);
  },

  // 新闻模块  获取热门关键字
  getKeyWordList(params) {
    return api.fetch('get', '/News/GetKeyWordList', params);
  },

  // 新闻模块  新闻点赞
  newsLikes(params) {
    return api.fetch('get', '/News/Likes', params);
  },

  // 新闻模块  判断是否收藏
  newsCheckCollect(params) {
    return api.fetch('get', '/News/isCollect', params);
  },

  // 新闻模块  新闻收藏
  newsAddCollect(params) {
    return api.fetch('get', '/News/AddCollect', params);
  },

  // 新闻模块  新闻取消收藏-单个
  newsDelCollect(params) {
    return api.fetch('post', '/News/DelCollectInfo', params);
  },
  // 新闻模块  新闻取消收藏-批量
  newsDelCollectMore(params) {
    return api.fetch('post', '/News/DelCollect', params);
  },

  // 新闻模块  发表新闻评论
  newsAddReward(params) {
    return api.fetch('get', '/News/AddReward', params);
  },

  // 新闻模块  点击新闻分享
  newsShare(params) {
    return api.fetch('get', '/News/Shares', params);
  },

  // 新闻模块  新闻阅读
  ReadNews(params) {
    return api.fetch('get', '/News/ReadNews', params);
  },
   // 获取我的资产
    GetMyAssets(){
      return api.fetch("get","/Customer/GetMyAssets");
    },

    // 余额交易明细
    getBalanceRecord(params){
      return api.fetch("get","/Customer/GetMyBalanceRecord",params);
    },

    // 记账币交易明细
    getCoinRecord(params){
      return api.fetch("get","/Customer/GetMyCoinRecord",params);
    },

    // 订单详情页 == 无需登录
    getOrderDetail(params){
      return api.fetch("get","/Order/GetOrderInfoByOrderId",params);
    },

    // 订单详情页 == 留言
    message(params){
      return api.fetch("get","/Order/AddOrderMessage",params);
    },
    // 根据商品ID获取需要用到的记账币
    getCoin(params){
      return api.fetch("post","/Order/GetCoin",params);
    },
	//支付方式列表
	getPayTypeList(params){
      return api.fetch("post","/Customer/GetPayTypeList",params);
    },
	//使用账户余额支付
	getBalancePay(params){
      return api.fetch("post","/Payment/BalancePay",params);
    },
    //获取规则说明
	getRuleDescription(params){
      return api.fetch("post","/System/GetRuleDescription",params);
    },
    //下单页结算
	settlement(params){
      return api.fetch("post","/Order/Settlement",params);
    },
	//代付记账币计算
	getCoinByOrderId(params){
      return api.fetch("post","/Order/getCoinByOrderId",params);
    },

    // 订单列表支付校验接口
    checkOrder(params){
      return api.fetch("get","/Order/CheckOrder",params);
    },

    //全部分类3级导航
    getServerClass(){
    	return serverList.fetch("get","/api/Product/GetServerClass");
    },
    // 邮箱认证
	checkEmail(params){
		return api.fetch("get","/SecurityCenter/ChangeCertificationConfirm",params);
	},
	//点击试用按钮
	markCustomer(params){
		return api.fetch("get","/Customer/MarkCustomer",params);
	},
	//调用财税接口判断员工购买的服务
	markCustomer(params){
		return report.fetch("get","/wqb/toSystem/queryUserInfo",params);
	},
	//购买套餐的详情
  	getECPackageInfo(params){
  		return api.fetch("post", "/MerContract/GetECPackageInfo", params);
  	},
  	//订单完成 获取我的公司列表
  	getCusCompanyList(params){
  		return api.fetch("post", "/CusCompany/GetList", params);
  	},
  	//订单完成 完善公司
  	editCompanyInfo(params){
  		return api.fetch("post", "/CusCompany/EditCompanyInfo", params);
  	},
  	//设置默认公司
  	setDefault(params){
  		return api.fetch("post", "/CusCompany/SetDefault", params);
  	},
  	//查看默认合同
  	getDefaultContractByOrderId(params){
  		return api.fetch("post", "/ElectronicContract/GetDefaultContractByOrderId", params);
  	},
  	//获取最近公司信息
  	getInfo(params){
  		return api.fetch("post", "/CusCompany/GetInfo", params);
  	},
  	//根据订单编号获取订单详情列表
  	getCommodityList(params){
  		return api.fetch("post", "/SPServiceStep/GetCommodityList", params);
  	},
  	//根据流程ID获取商品服务流程信息
  	getServiceProcessById(params){
  		return api.fetch("post", "/SPServiceStep/GetServiceProcessById", params);
  	},
  	//物流即时查询
  	getOrderTraces(params){
  		return api.fetch("post", "/Logistics/getOrderTraces", params);
  	},
}
