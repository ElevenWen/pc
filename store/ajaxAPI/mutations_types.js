// 命名规则 词意+页面名称  注意都是大写

//更新本地数据
export const UPDATE_LOCAL = 'UPDATE_LOCAL';

//清空本地数据
export const CLEAR_LOCAL = 'CLEAR_LOCAL';


//初始化购物车数据
export const REQUEST_DATA_CART= 'REQUEST_DATA_CART';

//添加菜品到购物车
export const CREATE_DB_CART = 'CREATE_DB_CART';

//给购物车的菜品++
export const ADD_DB_CART = 'ADD_DB_CART';

//给购物车的菜品--
export const DES_DB_CART = 'REDUCE_DB_CART';

//删除购物车数据
export const DELETE_DB_CART = 'DELETE_DB_CART';

//更新当前菜品在购物车的状态
export const UPDATE_CUR_SHOP_STATUS_CART = 'UPDATE_CUR_SHOP_STATUS_CART';

//购物车提交订单
export const ORDER_DB_CART = "ORDER_DB_CART";

//检测购物车内是否存在某菜品
export const CHECK_DB_CART = 'CHECK_DB_CART';











// 主页home.vue 请求数据
export const REQUESTDATA_HOME = "REQUESTDATA_HOME";
//首页套餐数据
export const MEALDATA = "MEALDATA";

//立即抢购
export const IMMEDIATELIST = "IMMEDIATELIST";

//二维码信息
export const CODEOBJ = "CODEOBJ";

//公司核名访问数量
export const ACCESSNUM = "ACCESSNUM";

// 请求bannner图片
export const HOMEBANNER = "HOMEBANNER";
export const DATAS = "DATAS";
export const MIDADDATAONE = "MIDADDATAONE";
export const MIDADDATATWO = "MIDADDATATWO";
export const LOGINBANNER = "LOGINBANNER";

export const GETSALESLIST = "GETSALESLIST";
//公司新闻列表
export const NEWSLIST = "NEWSLIST";
//行业新闻列表
export const INDNEWSLIST = "INDNEWSLIST";
//获取用户信息
export const CUSTOMER = "CUSTOMER";
//获取访问数量
export const WEBSITES = "WEBSITES";
//首页获取第一个栏目
export const FIRSTLIST = "FIRSTLIST";
export const ONECHILDNAMEONE = "ONECHILDNAMEONE";
export const ONELEFTCOL = "ONELEFTCOL";
export const ONELEFTCOLPRO = "ONELEFTCOLPRO";
export const ONECHILDNAMETWO = "ONECHILDNAMETWO";
export const ONECHILDNAMETHREE = "ONECHILDNAMETHREE";
export const ONEMIDCOL = "ONEMIDCOL";
export const ONEMIDCOLPRO = "ONEMIDCOLPRO";
export const ONERIGHTCOL = "ONERIGHTCOL";
export const ONERIGHTCOLPRO = "ONERIGHTCOLPRO";

//获取栏目列表
export const TWOF = "TWOF";
export const TWOFLIST = "TWOFLIST";
export const LEFTCOLPRO = "LEFTCOLPRO";
export const MIDCOLPRO = "MIDCOLPRO";
export const RIGHTCOLPRO = "RIGHTCOLPRO";
export const THREEEF = "THREEEF";
export const FOURF = "FOURF";
export const THREEFLIST = "THREEFLIST";
export const THREELEFTCOLPRO = "THREELEFTCOLPRO";
export const THREEMIDCOLPRO = "THREEMIDCOLPRO";
export const THREERIGHTCOLPRO = "THREERIGHTCOLPRO";
export const FOURFLIST = "FOURFLIST";
export const FOURLEFTCOLPRO = "FOURLEFTCOLPRO";
export const FOURMIDCOLPRO = "FOURMIDCOLPRO";
export const FOURRIGHTCOLPRO = "FOURRIGHTCOLPRO";

//个人中心
//export const TWOF = "TWOF";


//确认订单 新增或者修改发票
export const ADDOREDITE_BILLDATA_COMFIRMORDER = "ADDOREDITE_BILLDATA_COMFIRMORDER";

//确认订单 最近使用发票列表
export const RECENTLY_BILLDATA = "RECENTLY_BILLDATA";

//确认订单 优惠卷
export const CCOUPON_COMFIRMORDER = "CCOUPON_COMFIRMORDER";

//确认定单 立即下单 ===购物车页面
export const ORDBTNPAY = "ORDBTNPAY";

//确认定单 立即下单 ===从商品详情页面
export const IMIDIATEFN = "IMIDIATEFN";

//选择公司 列表
export const REQUEST_COMPANYDATA_GOCOMPANY = "REQUEST_COMPANYDATA_GOCOMPANY";

//我的订单
export const REQUEST_DATA_MYORDER = "REQUEST_DATA_MYORDER";
export const REQUEST_DATA_PAIDNUM = "REQUEST_DATA_PAIDNUM";
export const REQUEST_DATA_HANDNUM = "REQUEST_DATA_HANDNUM";

// 我的订单   取消订单
export const REQUEST_DATA_CANCEL = "REQUEST_DATA_CANCEL";

// 我的订单   待付款
export const REQUEST_DATA_DETAIL = "REQUEST_DATA_DETAIL";

// 我的订单   删除订单
export const REQUEST_DATA_DELETE = "REQUEST_DATA_DELETE";

// 我的订单   新增订单
export const REQUEST_DATA_NEWORDER = "REQUEST_DATA_NEWORDER";

// 我的订单  待支付进度
export const REQUEST_DATA_PAY ="REQUEST_DATA_PAY";

// 我的订单  再次购买
export const REQUEST_DATA_BUYAGAIN = "REQUEST_DATA_BUYAGAIN";

// 我的订单  去评价
export const REQUEST_DATA_EVALUATE = "REQUEST_DATA_EVALUATE";

// 我的订单  联系业务员
export const REQUEST_DATA_TELPHONE = "REQUEST_DATA_TELPHONE";


// 服务 商品分类列表
export const SERVERLIST = "SERVERLIST";

// 服务  商品服务列表获取数据
export const SERVER_PRODUCT_LIST = "SERVER_PRODUCT_LIST";

// 服务  根据分类获取产品列表请求数据
export const SERVER_PRODUCT_INFOR = "SERVER_PRODUCT_INFOR";


// 商事查询 查公司
export const queryCompany = "queryCompany";

//  商事查询 查知识产权--商标
export const REQUESTDATA_BRANDDATA_KNOWLEAGE = "REQUESTDATA_BRANDDATA_KNOWLEAGE";

//  商事查询 查知识产权--专利
export const REQUESTDATA_PATENTDATE_KNOWLEAGE = "REQUESTDATA_PATENTDATE_KNOWLEAGE";

//  商事查询 查知识产权--著作权
export const REQUESTDATA_COPYRIGHTDATE_KNOWLEAGE = "REQUESTDATA_COPYRIGHTDATE_KNOWLEAGE";

//  商事查询 风险信息--失信人
export const REQUESTDATA_RISK_DISHONEST = "REQUESTDATA_RISK_DISHONEST";

//  商事查询 风险信息--法院公告
export const REQUESTDATA_RISK_ANNOUNCEMENT = "REQUESTDATA_RISK_ANNOUNCEMENT";

// 公司 股东详情
export const REQUESTDATA_COMPANY_SHOLDER = "REQUESTDATA_COMPANY_SHOLDER";

// 公司 股东详情
export const REQUESTDATA_COMPANY_SHOLDER_TWO = "REQUESTDATA_COMPANY_SHOLDER_TWO";

//公司详情 基本信息
export const REQUESTDATA_COMPANYDETAIL_BASIC = "REQUESTDATA_COMPANYDETAIL_BASIC";

export const REQUESTDATA_COMPANYDETAIL_MAINKEY = "REQUESTDATA_COMPANYDETAIL_MAINKEY";

export const REQUESTDATA_COMPANYDETAIL_BRANCH = "REQUESTDATA_COMPANYDETAIL_BRANCH";

export const REQUESTDATA_COMPANYDETAIL_MODIFYDATA = "REQUESTDATA_COMPANYDETAIL_MODIFYDATA";

//公司详情 对外投资
export const REQUESTDATA_COMPANYDETAIL_INVESTMENT = "REQUESTDATA_COMPANYDETAIL_INVESTMENT";

//公司详情 证书信息
export const REQUESTDATA_COMPANYDETAIL_CERTIFICATEINF = "REQUESTDATA_COMPANYDETAIL_CERTIFICATEINF";

//公司详情 企业年报
export const REQUESTDATA_COMPANYDETAIL_REPORTS = "REQUESTDATA_COMPANYDETAIL_REPORTS";

//公司详情 法律诉讼
export const REQUESTDATA_COMPANYDETAIL_LAW = "REQUESTDATA_COMPANYDETAIL_LAW";
//公司详情 被执行人
export const REQUESTDATA_COMPANYDETAIL_SUBJECTED = "REQUESTDATA_COMPANYDETAIL_SUBJECTED";
//公司详情 法院公告
export const REQUESTDATA_COMPANYDETAIL_COURTANNOUNCEMENT = "REQUESTDATA_COMPANYDETAIL_COURTANNOUNCEMENT";
//公司详情 开庭公告
export const REQUESTDATA_COMPANYDETAIL_SESSIONANNOUNCEMENT = "REQUESTDATA_COMPANYDETAIL_SESSIONANNOUNCEMENT";
//公司详情 经营异常
export const REQUESTDATA_COMPANYDETAIL_ABNORMALOPERATION = "REQUESTDATA_COMPANYDETAIL_ABNORMALOPERATION";
//公司详情 招聘
export const REQUESTDATA_COMPANYDETAIL_RECRUIT = "REQUESTDATA_COMPANYDETAIL_RECRUIT";
//公司详情 进出口信用
export const REQUESTDATA_COMPANYDETAIL_CREDITINF = "REQUESTDATA_COMPANYDETAIL_CREDITINF";
//公司详情 产品信息
export const REQUESTDATA_COMPANYDETAIL_PROINF = "REQUESTDATA_COMPANYDETAIL_PROINF";

// 人所有公司
export const REQUESTDATA_PERSONALLCOMPANY = "REQUESTDATA_PERSONALLCOMPANY";

// 公司别表
export const REQUESTDATA_COMPANYLIST = "REQUESTDATA_COMPANYLIST";

// 账户设置——获取会员等级
export const REQUEST_LEVEL = "REQUEST_LEVEL";

// 账户设置——获取客户信息
export const REQUESTDATA_ACCOUNTSETTING = "REQUESTDATA_ACCOUNTSETTING";

// 账户设置——编辑客户信息
export const REQUESTDATA_EDITCUSINF = "REQUESTDATA_EDITCUSINF";

// 账户设置——获取收货地址列表
export const REQUESTDATA_GETADDLIST = "REQUESTDATA_GETADDLIST";

// 账户设置——修改或新增收货地址
export const REQUESTDATA_ADDADDRESS = "REQUESTDATA_ADDADDRESS";

// 账户设置  获取单个收货地址
export const REQUESTDATA_GETSINGERADD = "REQUESTDATA_GETSINGERADD";

// 账户设置  删除地址
export const REQUESTDATA_DELETEADD = "REQUESTDATA_DELETEADD";

// 账户设置  设为默认地址
export const REQUESTDATA_SETDEFAULTADD = "REQUESTDATA_SETDEFAULTADD";

// 账户设置  获取验证码
export const REQUESTDATA_GETCODE = "REQUESTDATA_GETCODE";

// 账户设置  修改密码第一步
export const REQUESTDATA_FIRSTCHANGEPSD = "REQUESTDATA_FIRSTCHANGEPSD";

// 账户设置  修改手机号第一步
export const REQUESTDATA_FIRSTCHANGETEL = "REQUESTDATA_FIRSTCHANGETEL";

// 账户设置  修改手机号第二步
export const REQUESTDATA_SECONEDCHANGETEL = "REQUESTDATA_SECONEDCHANGETEL";

// 账户设置  验证邮箱第一步
export const REQUESTDATA_FIRSTEMAIL = "REQUESTDATA_FIRSTEMAIL";

//  账户设置  验证邮箱第二步
export const REQUESTDATA_SECONEDEMAIL = "REQUESTDATA_SECONEDEMAIL";

// 登录
export const REQUEST_LOGIN = "REQUEST_LOGIN";

// 注册
export const REQUEST_REGISTER = "REQUEST_REGISTER";

// 公司信息提交
export const REQUEST_SUBMITCOMPANY = "REQUEST_SUBMITCOMPANY";


// 新闻模块  分类列表数据
export const REQUEST_DATA_CLASSIFY_LIST = "REQUEST_DATA_CLASSIFY_LIST";

// 新闻模块  新闻首页banner
export const REQUEST_DATA_NEWS_BANNER = "REQUEST_DATA_NEWS_BANNER";

// 新闻模块  新闻详情页
export const REQUEST_DATA_NEWS_DETAIL = "REQUEST_DATA_NEWS_DETAIL";

// 新闻模块  获取新闻评论
export const REQUEST_DATA_NEWS_REWARD_LIST = "REQUEST_DATA_NEWS_REWARD_LIST";

// 新闻模块  获取新闻列表
export const REQUEST_DATA_NEWS_LIST = "REQUEST_DATA_NEWS_LIST";

// 新闻模块  获取本周热门新闻列表
export const REQUEST_DATA_NEWS_HOT_LIST = "REQUEST_DATA_NEWS_HOT_LIST";

// 新闻模块  获取视频新闻列表
export const REQUEST_DATA_NEWS_VIDEO_LIST = "REQUEST_DATA_NEWS_VIDEO_LIST";

// 新闻模块  获取热门关键字
export const REQUEST_DATA_NEWS_KEYWORD_LIST = "REQUEST_DATA_NEWS_KEYWORD_LIST";

// 新闻模块  新闻点赞
export const NEWS_LIKES = "NEWS_LIKES";

// 新闻模块  新闻收藏
export const NEWS_ADD_COLLECT = "NEWS_ADD_COLLECT";

// 新闻模块  新闻取消收藏
export const NEWS_DEL_COLLECT = "NEWS_DEL_COLLECT";

// 新闻模块  发表新闻评论
export const NEWS_ADD_REWARD = "NEWS_ADD_REWARD";

// 订单详情
export const REQUEST_ORDERDETAIL = "REQUEST_ORDERDETAIL";

// 订单详情 == 无需登录
export const REQUEST_ORDERDETAILNO = "REQUEST_ORDERDETAILNO";