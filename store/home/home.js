import * as types from '~/store/ajaxAPI/mutations_types'
import   getData  from '~/store/ajaxAPI/getData'
import tool from "~/assets/lib/tool.js";

//声明state
export const state = ()=>({
	loadData:[],
	saleData:{},
	userMesg:{},//用户信息
	evaluatedNum:"",//待评价
	paidNum:"",//待支付
	handNum:"",//处理中数量
	mealData:[],//套餐数据
	topAdData:[],// 请求bannner图片 顶部广告
	datas:[],// 请求bannner图片 轮播图
	midAdData1:[],//中部广告1
	midAdData2:[],//中部广告2
	comNewsList:[],//公司新闻列表
	indNewsList:[],//行业新闻
	webData:{},//访问数据
	oneF:{},//1F父栏目
	oneChildName1:"",//1F子栏目1
	oneLeftCol:{},
	oneLeftColPro:[],//1F栏目左侧
	oneChildName2:"",//1F子栏目2
	oneChildName3:"",//1F子栏目3
	oneMidCol:{},
	oneMidColPro:[],//1F栏目中间
	oneRightCol:{},
	oneRightColPro:[],//1F栏目右侧
	twoF:{},//2F
	twoFList:{},//2F栏目列表
	leftColPro:[],//2F栏目左侧
	midColPro:[],//2F栏目中间
	rightColPro:[],//2F栏目右侧
	threeF:{},//3F
	fourF:{},//4F
	threeFList:{},//3F栏目列表
	threeLeftColPro:[],//3F栏目左侧
	threeMidColPro:[],//3F栏目中间
	threeRightColPro:[],//3F栏目右侧
	fourFList:{},//4F栏目列表
    fourLeftColPro:[],//4F栏目左侧
    fourMidColPro:[],//4F栏目中间
    fourRightColPro:[],//4F栏目右侧
    immediateList:[],//立即抢购
    codeObj:{},//二维码
    accessNum:{},//公司核名访问数量
    loginBanner:[],//登陆广告
})

//声明Getters
export const getters = {
	immediateList(state){
		return state.immediateList;
	},
	codeObj(state){
		return state.codeObj;
	},
}

//声明Mutations
export const mutations = {
	[types.REQUESTDATA_HOME](state, data){
        state.cacheData = data;
    },
   	[types.GETSALESLIST](state,data){
   		state.saleData = data;
   	},
   	[types.CUSTOMER](state,data){
   		state.userMesg = data;
   	},
   	[types.REQUEST_DATA_MYORDER](state,data){
   		state.evaluatedNum = data;
   	},
   	[types.REQUEST_DATA_PAIDNUM](state,data){
   		state.paidNum = data;
   	},
   	[types.REQUEST_DATA_HANDNUM](state,data){
   		state.handNum = data;
   	},
   	[types.MEALDATA](state,data){
   		state.mealData = data;
   	},
   	[types.HOMEBANNER](state,data){
   		state.topAdData = data;
   	},
   	[types.DATAS](state,data){
   		state.datas = data;
   	},
   	[types.MIDADDATAONE](state,data){
   		state.midAdData1 = data;
   	},
   	[types.MIDADDATATWO](state,data){
   		state.midAdData2 = data;
   	},
   	[types.NEWSLIST](state,data){
   		state.comNewsList = data;
   	},
   	[types.INDNEWSLIST](state,data){
   		state.indNewsList = data;
   	},
   	[types.WEBSITES](state,data){
   		state.webData = data;
   	},
   	[types.FIRSTLIST](state,data){
   		state.oneF = data;
   	},
   	[types.ONECHILDNAMEONE](state,data){
   		state.oneChildName1 = data;
   	},
   	[types.ONELEFTCOL](state,data){
   		state.oneLeftCol = data;
   	},
   	[types.ONELEFTCOLPRO](state,data){
   		state.oneLeftColPro = data;
   	},
   	[types.ONECHILDNAMETWO](state,data){
   		state.oneChildName2 = data;
   	},
   	[types.ONECHILDNAMETHREE](state,data){
   		state.oneChildName3 = data;
   	},
   	[types.ONEMIDCOL](state,data){
   		state.oneMidCol = data;
   	},
   	[types.ONEMIDCOLPRO](state,data){
   		state.oneMidColPro = data;
   	},
   	[types.ONERIGHTCOL](state,data){
   		state.oneRightCol = data;
   	},
   	[types.ONERIGHTCOLPRO](state,data){
   		state.oneRightColPro = data;
   	},
   	[types.TWOF](state,data){
   		state.twoF = data;
   	},
   	[types.TWOFLIST](state,data){
   		state.twoFList = data;
   	},
   	[types.LEFTCOLPRO](state,data){
   		state.leftColPro = data;
   	},
   	[types.MIDCOLPRO](state,data){
   		state.midColPro = data;
   	},
   	[types.RIGHTCOLPRO](state,data){
   		state.rightColPro = data;
   	},
   	[types.THREEEF](state,data){
   		state.threeF = data;
   	},
   	[types.FOURF](state,data){
   		state.fourF = data;
   	},
   	[types.THREEFLIST](state,data){
   		state.threeFList = data;
   	},
   	[types.THREELEFTCOLPRO](state,data){
   		state.threeLeftColPro = data;
   	},
   	[types.THREEMIDCOLPRO](state,data){
   		state.threeMidColPro = data;
   	},
   	[types.THREERIGHTCOLPRO](state,data){
   		state.threeRightColPro = data;
   	},
   	[types.FOURFLIST](state,data){
   		state.fourFList = data;
   	},
   	[types.FOURLEFTCOLPRO](state,data){
   		state.fourLeftColPro = data;
   	},
   	[types.FOURMIDCOLPRO](state,data){
   		state.fourMidColPro = data;
   	},
   	[types.FOURRIGHTCOLPRO](state,data){
   		state.fourRightColPro = data;
   	},
   	[types.IMMEDIATELIST](state,data){
   		state.immediateList = data;
   	},
   	[types.CODEOBJ](state,data){
   		state.codeObj = data;
   	},
   	[types.ACCESSNUM](state,data){
   		state.accessNum = data;
   	},
   	[types.LOGINBANNER](state,data){
   		state.loginBanner = data;
   	}
}

//声明Actions
export const actions = {
	REQUESTDATA_HOME({ commit },data){
			getData.REQUESTDATA_HOME().then( (res)=>{
		        return    commit(types.REQUESTDATA_HOME, res.data);
	        },(error)=>{
	         // //console.log("优惠券错误")
	        })
	},
	getSaleList({state, commit, rootState},data ){
		return 	getData.getSalesList()
				.then((res)=>{
					return commit(types.GETSALESLIST, res.data.list[0]);
				})
				.catch((error)=>{
					//console.log("error",error);
				})
	},
	//获取用户信息
	getUserMesg({state, commit, rootState},data){
		return 	getData.getcustorInfor()
				.then((res)=>{
					return commit(types.CUSTOMER, res.data);
				})
				.catch((error)=>{
					//console.log("error",error);
				})
	},
	//获取订单信息
	getOrderList({state, commit, rootState},data){
		return 	getData.allOrder(data)
				.then((res)=>{
					if(data.type==5){
						return commit(types.REQUEST_DATA_MYORDER, res.data.list.length);
					}else if(data.type==0){
						return commit(types.REQUEST_DATA_PAIDNUM, res.data.list.length);
					}else if(data.type==1){
						return commit(types.REQUEST_DATA_HANDNUM, res.data.list.length);
					}

				})
				.catch((error)=>{
					//console.log("error",error);
				})
	},
	//首页套餐数据
	getMealData({state, commit, rootState},data){
		return 	getData.getMealData()
				.then((res)=>{
					//console.log("13246",res);
					return commit(types.MEALDATA, res.data.list);
				})
				.catch((error)=>{
					//console.log("error",error);
				})
	},
	//请求bannner图片
	getHomeBanner({state, commit, rootState},data){
		return 	getData.getHomeBanner(data)
				.then((res)=>{
//					console.log("13246",res);
					if (data.params.code=="DBGGW") {
						return commit(types.HOMEBANNER, res.data.list);
					}else if(data.params.code=="GG00101"){
						return commit(types.DATAS, res.data.list);
					}else if(data.params.code=="ZBGGW1"){
						return commit(types.MIDADDATAONE, res.data.list);
					}else if(data.params.code=="ZBGGW2"){
						return commit(types.MIDADDATATWO, res.data.list);
					}else if(data.params.code=="SYDLSFGGW"){
						return commit(types.LOGINBANNER, res.data.list);
					}
				})
				.catch((error)=>{
					//console.log("error",error);
				})
	},
	//请求新闻
	getNewsList({state, commit, rootState},data){
		return 	getData.getNewsList(data)
				.then((res)=>{
					let list = res.data.list;
					let today = new Date().toDateString();
					let year = new Date().getFullYear();
					for (let i = 0; i < list.length; i++) {
						let items = list[i].ReviewDateTime;
						let createTimee = parseInt(items.replace(/\D/g, ""));
						if (new Date(createTimee).toDateString() === today) {
							this.reviewTimer = tool.formatDate(createTimee, "hh:mm");
						} else if (new Date(createTimee).getFullYear() === year) {
							this.reviewTimer = tool.formatDate(createTimee, "MM-dd");
						} else {
							this.reviewTimer = tool.formatDate(createTimee, "yyyy-MM-dd");
						}
						list[i].ReviewDateTime = this.reviewTimer;
					}
					if (data.params.pageIndex == 1) {
						return commit(types.NEWSLIST, res.data.list);
					} else if (data.params.pageIndex == 2) {
						return commit(types.INDNEWSLIST, res.data.list);
					}
				})
				.catch((error)=>{
					//console.log("error",error);
				})
	},
	//获取访问数量
	getWebSites({state, commit, rootState},data){
		return 	getData.getWebSites()
				.then((res)=>{
					return commit(types.WEBSITES, res.data.list);
				})
				.catch((error)=>{
					//console.log("error",error);
				})
	},
	//公司核名访问数量
	getCompanyCheck({state, commit, rootState},data){
		return 	getData.getCompanyCheck()
				.then((res)=>{
					return commit(types.ACCESSNUM, res.data.list);
				})
				.catch((error)=>{
					//console.log("error",error);
				})
	},
	//公司核名提交
	createCheckCompany({state, commit, rootState},data){
		return 	getData.createCheckCompany(data)
				.then((res)=>{
					return
				})
				.catch((error)=>{
					//console.log("error",error);
				})
	},
	//二维码信息
	getCode({state, commit, rootState},data){
		return 	getData.getCode(data)
				.then((res)=>{
					return commit(types.CODEOBJ, res.data);
				})
				.catch((error)=>{
					//console.log("error",error);
				})
	},
	//立即抢购
	GetOrderListByProductId({state, commit, rootState},data){
		return 	getData.GetOrderListByProductId(data)
				.then((res)=>{
					res.data[0].Id = data.id;
					res.data[0].IsChecked = true;
					return commit(types.IMMEDIATELIST, res.data);
				})
				.catch((error)=>{
					// console.log("error123",error);
					return   Promise.reject(error)

				})
	},
	//首页获取第一个栏目
	getFirstList({state, commit, rootState},data){
		return 	getData.getFirstList()
				.then((res)=>{
					commit(types.FIRSTLIST, res.data.list[0]);
					var param = {
							params:{
								Id:res.data.list[0].Id
							}
						}
					//获取第一个栏目下的子栏目
					getData.getFirstDetailList(param)
					.then((res)=>{
						commit(types.ONECHILDNAMEONE, res.data.list[0].Name);
						commit(types.ONECHILDNAMETWO, res.data.list[1].Name);
						commit(types.ONECHILDNAMETHREE, res.data.list[2].Name);
//						1F左
						var param1 = {
			    			params:{
			    				Id:res.data.list[0].Id
			    			}
			    		}
						getData.GetColumnList(param1)
    					.then((response)=>{
    						commit(types.ONELEFTCOL, response.data.list[0].ProColumnListPCModels.slice(0,1)[0]);
    						commit(types.ONELEFTCOLPRO, response.data.list[0].ProColumnListPCModels.slice(1,3));
    					})
//  					1F中
    					var param2 = {
			    			params:{
			    				Id:res.data.list[1].Id
			    			}
			    		}
    					getData.GetColumnList(param2)
    					.then((response)=>{
    						commit(types.ONEMIDCOL, response.data.list[0].ProColumnListPCModels.slice(0,1)[0]);
    						commit(types.ONEMIDCOLPRO, response.data.list[0].ProColumnListPCModels.slice(1,3));
    					})
    					//1F右
    					var param3 = {
			    			params:{
			    				Id:res.data.list[2].Id
			    			}
			    		}
    					getData.GetColumnList(param3)
    					.then((response)=>{
    						commit(types.ONERIGHTCOL, response.data.list[0].ProColumnListPCModels.slice(0,1)[0]);
    						commit(types.ONERIGHTCOLPRO, response.data.list[0].ProColumnListPCModels.slice(1,3));
    					})
					})
					.catch((error)=>{
						// console.log("error",error);
					})
				})
				.catch((error)=>{
					// console.log("error1111111111111111",error);
				})
	},
	//获取栏目列表
	getColList({state, commit, rootState},data){
		return 	getData.getColList()
				.then((res)=>{
					commit(types.TWOF, res.data.list[0]);
					commit(types.THREEEF, res.data.list[1]);
					commit(types.FOURF, res.data.list[2]);
//					2F
					var param1 = {
		    			params:{
		    				Id:res.data.list[0].Id
		    			}
		    		}
//					3F
					var param2 = {
			  			params:{
			  				Id:res.data.list[1].Id
			  			}
			  		}
					//4F
					var param3 = {
			  			params:{
			  				Id:res.data.list[2].Id
			  			}
			  		}
					return Promise.all([getData.GetColumnList(param1),getData.GetColumnList(param2),getData.GetColumnList(param3)])
					.then((values)=>{
//						2f
						commit(types.TWOFLIST, values[0].data.list[0]);
						commit(types.LEFTCOLPRO, values[0].data.list[0].ProColumnListPCModels.slice(6));
						commit(types.MIDCOLPRO, values[0].data.list[0].ProColumnListPCModels.slice(0,5));
						commit(types.RIGHTCOLPRO, values[0].data.list[0].ProColumnListPCModels.slice(5,6));
//						3F
						commit(types.THREEFLIST, values[1].data.list[0]);
						commit(types.THREELEFTCOLPRO, values[1].data.list[0].ProColumnListPCModels.slice(6));
						commit(types.THREEMIDCOLPRO, values[1].data.list[0].ProColumnListPCModels.slice(0,5));
						commit(types.THREERIGHTCOLPRO, values[1].data.list[0].ProColumnListPCModels.slice(5,6));
						//4f
						commit(types.FOURFLIST, values[2].data.list[0]);
						commit(types.FOURLEFTCOLPRO, values[2].data.list[0].ProColumnListPCModels.slice(6));
						commit(types.FOURMIDCOLPRO, values[2].data.list[0].ProColumnListPCModels.slice(0,5));
						commit(types.FOURRIGHTCOLPRO, values[2].data.list[0].ProColumnListPCModels.slice(5,6));
					})
				})
				.catch((error)=>{
					//console.log("error",error);
				})
	},
	//登录
	toLogin({state, commit, rootState},data){
		return 	getData.login(data)
				.then((res)=>{
					return
				})
				.catch((error)=>{
					reject(error)
				})
	},
}

