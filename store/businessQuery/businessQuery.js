import * as types from '~/store/ajaxAPI/mutations_types'
import   getData  from '~/store/ajaxAPI/getData'
import tool from '~/assets/lib/tool.js';


//声明state
export const state = ()=>({
	allData:[],//全部 数据
	allPageSize:0,//商标列表总条数
	brandData:[],  //商标
	brandPageSize:0,//商标列表总条数
	patentDate:[],//专利
	patentPageSize:0,//专利列表总条数
	copyrightDate:[],//著作权
	copyrightSize:0,//商标列表总条数
	dishonestData:[], //失信人数据
	dishonestLen:0,
	announcementData:[], //法院公告数据
	announcementLen:0,
	isNoData:false,//默认有值 
	listLength:"-1",//天严查查询数据条数
	endTime:"0",//结束搜索时间
	// sholderDetail:{},//股东详情
	sholderDetail2:[],//股东详情2
	basicData:{},//公司详情基本信息
	mainKeyData:{},//公司详情股东信息
	branchData:{},//公司详情分支机构
	modifyData:{},//公司详情变更记录
	investmentData:{},//公司详情对外投资
	certificateInfData:{},//公司详情证书
	reportsData:{},//公司详情企业年报
	lawData:{},//公司详情法律诉讼
	subjectedData:{},//公司详情被执行人
	courtAnnouncementData:{},//公司详情法院公告
	sessionAnnouncementData:{},//公司详情开庭公告
	abnormalOperationData:{},//公司详情 经营异常
	recruitData:{},//公司详情 招聘
	creditInfData:{},//公司详情 进出口信用
	proInfData:{},//公司详情产品信息
	personAllCompany:[], //人所有公司
	companyList:[], //公司列表
	companyLen:0  //公司总数
})

//声明Mutations
export const mutations = {
	//商标
	[types.REQUESTDATA_BRANDDATA_KNOWLEAGE](state, data){ 
		state.brandData = data;  
        // //console.log(data);
        state.endTime = +new Date();
        //console.log(":4444")
         if(Array.isArray(data)){
            state.listLength = 0;
        } else{
         state.listLength = data.total;
        } 
        state.brandPageSize = Number(data.total);

        state.allData.push(data.items);
		state.allPageSize = Number(data.total);
		if (state.brandData.total) {
			state.brandData.items.forEach((val)=>{
				val.appDate = tool.formatDate(val.appDate,"yyyy-MM-dd");
			})
		}else{
			state.brandData.total = 0;
		}
    },
    //专利
    [types.REQUESTDATA_PATENTDATE_KNOWLEAGE](state, data){ 
    	state.endTime = +new Date();
    	 //console.log(":专利",data,data.items)
        state.patentDate = data;
        if(Array.isArray(data) || data ==null){
            state.listLength = 0;
        } else{
          state.listLength = data.total;
        }  
		state.patentPageSize = Number( state.listLength);
		if(!state.patentDate.total){
			state.patentDate.total = 0;
		}
    },
    //著作权
    [types.REQUESTDATA_COPYRIGHTDATE_KNOWLEAGE](state, data){ 
    	state.endTime = +new Date();
        state.copyrightDate = data;  
        //console.log(":4444")
         if(Array.isArray(data)){
            state.listLength = 0;
        } else{
         state.listLength = data.total;
        } 
		state.copyrightSize = Number( state.listLength);
		if(state.copyrightDate.total){
			state.copyrightDate.items.forEach((val)=>{
				val.regtime = tool.formatDate(val.regtime,"yyyy-MM-dd");
			})
		}else{
			state.copyrightDate.total = 0;
		}
    },
    // 风险知识——失信人
    [types.REQUESTDATA_RISK_DISHONEST](state, data){ 
		state.endTime = +new Date();
		state.dishonestData = data; 
		if(data == '无数据'){
			state.dishonestData = state.announcementData =[];
			state.brandPageSize = state.patentPageSize = state.copyrightSize  =0;
			state.isNoData = true;//表示无数据
			state.endTime = +new Date();//结束时间 
			state.listLength = 0;//天严查查询数据条数
			return 
		}

    	// state.endTime = +new Date();
        // state.dishonestData = data;  
         if(Array.isArray(data)){
            state.listLength = 0;
        } else{
          state.listLength = data.total;
        } 
        state.dishonestLen = Number(data.total);
    },
    // 风险知识——法院公告
    [types.REQUESTDATA_RISK_ANNOUNCEMENT](state, data){ 
    	state.endTime = +new Date();
        state.announcementData = data;  
        // console.log("法院公告vuex", state.announcementData)
        if(Array.isArray(data)){
            state.listLength = 0;
        } else{
         state.listLength = data.total;
        }
        state.announcementLen = Number(data.total);
    },
    // // 公司——股东详情
    // [types.REQUESTDATA_COMPANY_SHOLDER](state, data){ 
    //     state.sholderDetail = data;  
    //     //console.log("股东详情",data);
    // },
    // // 公司——股东详情
    [types.REQUESTDATA_COMPANY_SHOLDER_TWO](state, data){ 
		state.sholderDetail2 = null
        state.sholderDetail2 = data.items; 
    },
    //公司详情 基本信息
    [types.REQUESTDATA_COMPANYDETAIL_BASIC](state, data){ 
        state.basicData = data;  
    },
    //公司详情股东信息
    [types.REQUESTDATA_COMPANYDETAIL_MAINKEY](state, data){ 
		// console.log("ww s我是鼓动",data)
        state.mainKeyData = data;  
    },
    //公司详情分支机构
    [types.REQUESTDATA_COMPANYDETAIL_BRANCH](state, data){ 
        state.branchData = data;  
    },
    //公司详情变更记录
    [types.REQUESTDATA_COMPANYDETAIL_MODIFYDATA](state, data){ 
		// console.log('什么鬼',data)
		state.modifyData = data; 
		// console.log('modifyData',state.modifyData)
		if(state.modifyData.total){
			state.modifyData.items.forEach((val)=>{
				val.contentBefore = val.contentBefore.replace(/\<em\>/g,"").replace(/\<\/em\>/g,"");
				val.contentAfter = val.contentAfter.replace(/\<em\>/g,"").replace(/\<\/em\>/g,"");
			})
		}else{
			state.modifyData.total = 0;
		}
		// console.log('modifyData22222',state.modifyData) 
    },
    //公司详情对外投资
    [types.REQUESTDATA_COMPANYDETAIL_INVESTMENT](state, data){ 
		state.investmentData = data;  
		if (state.investmentData.total) {
						state.investmentData.items.forEach((val)=>{
							val.estiblishTime = tool.formatDate(val.estiblishTime,"yyyy-MM-dd");
						})
					}
    },
    //公司详情证书信息
    [types.REQUESTDATA_COMPANYDETAIL_CERTIFICATEINF](state, data){ 
		state.certificateInfData = data;  
		if (!state.certificateInfData.total) {
			state.certificateInfData.total = 0;
		}
    },
    //公司详情企业年报
    [types.REQUESTDATA_COMPANYDETAIL_REPORTS](state, data){ 
        state.reportsData = data;  
    },
    //公司详情法律诉讼
    [types.REQUESTDATA_COMPANYDETAIL_LAW](state, data){ 
		 state.lawData = data; 
		 if (state.lawData.total) {
			state.lawData.items.forEach((val)=>{
				val.submittime = tool.formatDate(val.submittime,"yyyy-MM-dd");
			})
		}else{
			state.lawData.total = 0;
		}
    },
    //公司详情被执行人
    [types.REQUESTDATA_COMPANYDETAIL_SUBJECTED](state, data){ 
		state.subjectedData = data;  
		if(state.subjectedData.total){
			state.subjectedData.items.forEach((val)=>{
				val.caseCreateTime = tool.formatDate(val.caseCreateTime,"yyyy-MM-dd");
			})
		}else{
			state.subjectedData.total = 0;
		}
    },
    //公司详情法院公告
    [types.REQUESTDATA_COMPANYDETAIL_COURTANNOUNCEMENT](state, data){ 
		state.courtAnnouncementData = data; 
		
		if(!state.courtAnnouncementData.total){
			state.courtAnnouncementData.total = 0;
		} 
    },
    //公司详情开庭公告
    [types.REQUESTDATA_COMPANYDETAIL_SESSIONANNOUNCEMENT](state, data){ 
		state.sessionAnnouncementData = data; 
		if (state.sessionAnnouncementData.total) {
			state.sessionAnnouncementData.items.forEach((val)=>{
				val.startDate = tool.formatDate(val.startDate,"yyyy-MM-dd hh:mm:ss");
			})
		}else{
			state.sessionAnnouncementData.total = 0;
		} 

    },
    //公司详情经营异常
    [types.REQUESTDATA_COMPANYDETAIL_ABNORMALOPERATION](state, data){ 
		state.abnormalOperationData = data; 
		if (!state.abnormalOperationData.total) {
			state.abnormalOperationData.total = 0;
		} 
    },
    //公司详情招聘
    [types.REQUESTDATA_COMPANYDETAIL_RECRUIT](state, data){ 
		state.recruitData = data; 
		if (state.recruitData.total) {
			state.recruitData.items.forEach((val)=>{
				val.startdate = tool.formatDate(val.startdate,"yyyy-MM-dd");
			})
		}else{
			state.recruitData.total = 0;
		} 
    },
    //公司详情进出口信用
    [types.REQUESTDATA_COMPANYDETAIL_CREDITINF](state, data){ 
		state.creditInfData = data; 
		if (state.creditInfData.baseInfo) {
			state.creditData = state.creditInfData.baseInfo;
		} 
    },
    //公司详情产品信息
    [types.REQUESTDATA_COMPANYDETAIL_PROINF](state, data){ 
		state.proInfData = data;  
		if(!state.proInfData.total){
			state.proInfData.total = 0;
		}else{
			state.proInfData.items.forEach((val)=>{
				val.brief = val.brief.replace(/\<br\/\>/g,"  ");
			})
		}
    },
    //人所有公司
    [types.REQUESTDATA_PERSONALLCOMPANY](state, data){ 
        state.personAllCompany = data.items;  
        //console.log("data",data);
    },
    //公司列表
    [types.REQUESTDATA_COMPANYLIST](state, data){ 
		// state.companyList = null;
		state.companyList = data; 
		state.companyLen = Number(data.length)
    },
}

//声明Actions  命名规则 词意 + +页面名称
export const actions = {
	REQUESTDATA_KNOWLEAGE({ commit },data){  
			return getData.QUERYTIANYANCHA(data).then( (res)=>{ 
				state.isNoData= false;//有值
				if(data.num == 1){//商标
				 return    commit(types.REQUESTDATA_BRANDDATA_KNOWLEAGE, res.result);
				}else if(data.num == 2){//专利
                    // alert('2')
                    // //console.log(res.result)
					return commit(types.REQUESTDATA_PATENTDATE_KNOWLEAGE, res.result);
				}else if(data.num == 3){//著作权
					 return    commit(types.REQUESTDATA_COPYRIGHTDATE_KNOWLEAGE, res.result);
				}else if(data.num == 4){//证书
					 return    commit(types.REQUESTDATA_COMPANYDETAIL_CERTIFICATEINF, res.result);
				}else if(data.num == 5){//企业年报
					 return    commit(types.REQUESTDATA_COMPANYDETAIL_REPORTS, res.result);
				}else if(data.num == 6){//法律诉讼
					 return    commit(types.REQUESTDATA_COMPANYDETAIL_LAW, res.result);
				}else if(data.num == 7){//被执行人
					 return    commit(types.REQUESTDATA_COMPANYDETAIL_SUBJECTED, res.result);
				}else if(data.num == 8){//法院公告
					 return    commit(types.REQUESTDATA_COMPANYDETAIL_COURTANNOUNCEMENT, res.result);
				}else if(data.num == 9){//开庭公告
					 return    commit(types.REQUESTDATA_COMPANYDETAIL_SESSIONANNOUNCEMENT, res.result);
				}else if(data.num == 10){//经营异常
					 return    commit(types.REQUESTDATA_COMPANYDETAIL_ABNORMALOPERATION, res.result);
				}else if(data.num == 11){//招聘
					 return    commit(types.REQUESTDATA_COMPANYDETAIL_RECRUIT, res.result);
				}else if(data.num == 12){//进出口信用
					 return    commit(types.REQUESTDATA_COMPANYDETAIL_CREDITINF, res.result);
				}else if(data.num == 13){//产品信息
					 return    commit(types.REQUESTDATA_COMPANYDETAIL_PROINF, res.result);
				}
	        },(error)=>{ 
	           //console.log("知识产权请求错误error",error); 
	            if(error.data.reason=="无数据"){
	            	state.brandData = state.patentDate = state.copyrightDate=[];
	           		state.isNoData = true;//表示无数据
	           		//console.log(state.isNoData  )
	           		state.endTime = +new Date();//结束时间
	           		state.listLength = 0;//天严查查询数据条数
	           		if(data.num == 1){//商标
					 	return    commit(types.REQUESTDATA_BRANDDATA_KNOWLEAGE, []);
					}else if(data.num == 2){//专利
                         // alert('22')
						return commit(types.REQUESTDATA_PATENTDATE_KNOWLEAGE, []);
					}else if(data.num == 3){//著作权
						 return    commit(types.REQUESTDATA_COPYRIGHTDATE_KNOWLEAGE, []);
					}else if(data.num == 4){//证书
						 return    commit(types.REQUESTDATA_COMPANYDETAIL_CERTIFICATEINF, {});
					}else if(data.num == 5){//企业年报
						 return    commit(types.REQUESTDATA_COMPANYDETAIL_REPORTS, {});
					}else if(data.num == 6){//法律诉讼
						 return    commit(types.REQUESTDATA_COMPANYDETAIL_LAW, {});
					}else if(data.num == 7){//被执行人
						 return    commit(types.REQUESTDATA_COMPANYDETAIL_SUBJECTED, {});
					}else if(data.num == 8){//法院公告
						 return    commit(types.REQUESTDATA_COMPANYDETAIL_COURTANNOUNCEMENT, {});
					}else if(data.num == 9){//开庭公告
						 return    commit(types.REQUESTDATA_COMPANYDETAIL_SESSIONANNOUNCEMENT, {});
					}else if(data.num == 10){//经营异常
						 return    commit(types.REQUESTDATA_COMPANYDETAIL_ABNORMALOPERATION, {});
					}else if(data.num == 11){//招聘
						 return    commit(types.REQUESTDATA_COMPANYDETAIL_RECRUIT, {});
					}else if(data.num == 12){//进出口信用
						 return    commit(types.REQUESTDATA_COMPANYDETAIL_CREDITINF, {});
					}else if(data.num == 13){//产品信息
						 return    commit(types.REQUESTDATA_COMPANYDETAIL_PROINF, {});
					}
	            };
	        })  
	},
	// 风险请求数据
	business_risk({ commit },data){  
		// console.log(1)
		return getData.QUERYTIANYANCHA(data).then( (res)=>{ 
			if(data.num == 2){
				return commit(types.REQUESTDATA_RISK_DISHONEST, res.result)
			}
			else if(data.num == 1){
				return commit(types.REQUESTDATA_RISK_ANNOUNCEMENT, res.result);
			}
        },(error)=>{
			if(error.data.reason=="无数据" || error.data.reason.length >= 3){
				if(data.num == 2){
					return commit(types.REQUESTDATA_RISK_DISHONEST,'无数据')
				}
				else if(data.num == 1){
					return commit(types.REQUESTDATA_RISK_ANNOUNCEMENT, '无数据');
				}
	        };
        })  
	},
	// 人所有公司
	business_personAllCompany({ commit },data){
		return getData.QUERYTIANYANCHA(data).then( (res) => {
			//console.log("人所有公司",res.result.items);
			return commit(types.REQUESTDATA_PERSONALLCOMPANY, res.result);
		})
	},
    // 公司列表（调企业基本信息接口1）
    business_company({ commit },data){
       return getData.QUERYTIANYANCHA(data).then( (res) => {
            return commit(types.REQUESTDATA_COMPANYLIST, res.result.items);
        }).catch((error) => {
			return error
        })

    },
	// 股东详情（调企业基本信息接口5）
	business_sholder_detail2({ commit },data){
	 
	return 	getData.QUERYTIANYANCHA(data).then( (res) => {
			
			return commit(types.REQUESTDATA_COMPANY_SHOLDER_TWO, res.result);
		})
	},
	//公司详情 基本信息
	getCompanyDetail({commit},data){
		return getData.QUERYTIANYANCHA(data).then( (res) => {
			//console.log("132",res.result);
			return commit(types.REQUESTDATA_COMPANYDETAIL_BASIC, res.result);
		},(error)=>{ 
           //console.log("知识产权请求错误error",error); 
            if(error.data.reason=="无数据"){
            	return commit(types.REQUESTDATA_COMPANYDETAIL_BASIC, {});
            };
        })
	},
	//公司详情 股东信息
	getCompanyMainKey({commit},data){
		return getData.QUERYTIANYANCHA(data).then( (res) => {
			//console.log("132",res.result);
			return commit(types.REQUESTDATA_COMPANYDETAIL_MAINKEY, res.result);
		},(error)=>{ 
           //console.log("知识产权请求错误error",error); 
            if(error.data.reason=="无数据"){
            	return commit(types.REQUESTDATA_COMPANYDETAIL_MAINKEY, {});
            };
        })
	},
	//公司详情 分支机构
	getCompanyBranch({commit},data){
		return getData.QUERYTIANYANCHA(data).then( (res) => {
			//console.log("132",res.result);
			return commit(types.REQUESTDATA_COMPANYDETAIL_BRANCH, res.result);
		},(error)=>{ 
           //console.log("知识产权请求错误error",error); 
            if(error.data.reason=="无数据"){
				return commit(types.REQUESTDATA_COMPANYDETAIL_BRANCH, {});
            };
        })
	},
	//公司详情 变更记录
	getCompanyModify({commit},data){
		return getData.QUERYTIANYANCHA(data).then( (res) => {
			// console.log("132",res.result);
			return commit(types.REQUESTDATA_COMPANYDETAIL_MODIFYDATA, res.result);
		},(error)=>{ 
           //console.log("知识产权请求错误error",error); 
            if(error.data.reason=="无数据"){
            	return commit(types.REQUESTDATA_COMPANYDETAIL_MODIFYDATA, {});
            };
        })
	},
	//公司详情 对外投资
	getCompanyInvestment({commit},data){
		return getData.QUERYTIANYANCHA(data).then( (res) => {
			//console.log("知识产权",res.result.items);
			return commit(types.REQUESTDATA_COMPANYDETAIL_INVESTMENT, res.result);
		},(error)=>{ 
//         //console.log("知识产权请求错误error",error); 
            if(error.data.reason=="无数据"){
            	return commit(types.REQUESTDATA_COMPANYDETAIL_INVESTMENT, {});
            };
        })
	}
}

export const getters = {
	endTimeReturn(state){ //公司
		return {
			'companyList':state.companyList,
			'companyLen':state.companyLen
		}
	},
	initBrandGet(state){ //商标
		return {
			'brandData':state.brandData,
			'brandPageSize':state.brandPageSize
		}
	},
	patentDateGet(state){ //专利
		return {
			'patentDate':state.patentDate,
			'patentPageSize':state.patentPageSize
		}
	},
	copyrightGet(state){ //著作权
		return {
			'copyrightDate':state.copyrightDate,
			'copyrightSize':state.copyrightSize
		}
	},
	certificateInfGet(state){ //证书
		return{
			'certificateInfData':state.certificateInfData
		}
	},
	announcementGet(state){ //法院公告 
		return{
			'announcementData':state.announcementData,
			'announcementLen':state.announcementLen
		}
	},
	dishonestGet(state){ //失信人 
		return{
			'dishonestData':state.dishonestData,
			'dishonestLen':state.dishonestLen
		}
	},
	endTimeGet(state){  //搜索结束时间
		// console.log("搜索结束时间")
		return{
			'endTime':state.endTime,
			'listLength':state.listLength
		}
	},
	basicDataGet(state){ //公司详情-基本信息
		// console.log("公司详情-基本信")
		return{
			'basicData':state.basicData,
			'mainKeyData':state.mainKeyData,
			'branchData':state.branchData,
			'modifyData':state.modifyData
		}
	},
	lawGet(state){ //公司详情-法律诉讼
		return{
			'lawData':state.lawData, //法律诉讼
			'subjectedData':state.subjectedData,  //被执行人
			'courtAnnouncementData':state.courtAnnouncementData, //法院公告
			'sessionAnnouncementData':state.sessionAnnouncementData //开庭公告
		}
	},
	operationGet(state){  //经营状况
		return{
			'abnormalOperationData':state.abnormalOperationData,
			'recruitData':state.recruitData,
			'creditInfData':state.creditInfData,
			'proInfData':state.proInfData
		}
	},
	investmentGet(state){  //对外投资
		return{
			'investmentData':state.investmentData
		}
	},
	reportsGet(state){ //企业年报
		return{
			'reportsData':state.reportsData
		}
	},
	personAllCGet(state){ //股东的所有企业
		return{
			'personAllCompany':state.personAllCompany
		}
	}, 
	sholderDGet(state){  //股东的所有商业角色state.sholderDetail2)
		return{
			'sholderDetail2':state.sholderDetail2
		}
	}
}
