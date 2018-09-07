import * as types from '~/store/ajaxAPI/mutations_types'
import   getData  from '~/store/ajaxAPI/getData'

//声明state
export const state = ()=>({
    customerInfo:{}, //获取客户资料
    companyLevel:"",//会员等级
    editCusInfo:{}, //修改客户资料
    addressList : [], //收货地址列表
    addAddress:[],//新增/编辑收货地址
    getSingerAdd:{},//获取单个收货地址
    firstChangeEmail:{}, //修改邮箱第一步
    firstChangeTel:{}, //修改手机号第一步
})

//声明Mutations
export const mutations = {
    [types.REQUESTDATA_ACCOUNTSETTING](state, data){
        state.customerInfo = data;
        // console.log("customerInfo",data)
    },
    [types.REQUESTDATA_EDITCUSINF](state, data){
        state.editCusInfo = data;
        // console.log("data",data)
    },
    [types.REQUEST_LEVEL](state, data){//会员等级
        state.companyLevel = data.LevelDes;
    },
    [types.REQUESTDATA_GETADDLIST](state, data){
        state.addressList = data.list;
    },
    [types.REQUESTDATA_ADDADDRESS](state, data){
        state.addAddress = data;
        // console.log("data",data)
    },
    [types.REQUESTDATA_GETSINGERADD](state, data){
        state.getSingerAdd = data;
        // console.log("data",data)
    },
    [types.REQUESTDATA_DELETEADD](state, data){
        // state.getSingerAdd = data;
        // console.log("data",data)
    },
    [types.REQUESTDATA_SETDEFAULTADD](state, data){
        // state.getSingerAdd = data;
        // console.log("data",data)
    },
    [types.REQUESTDATA_GETCODE](state, data){
        // state.getSingerAdd = data;
        // console.log("data",data)
    },
    [types.REQUESTDATA_FIRSTCHANGEPSD](state, data){
        // state.getSingerAdd = data;
        // console.log("data",data)
    },
    [types.REQUESTDATA_FIRSTCHANGETEL](state, data){
        state.firstChangeTel = data;
    },
    [types.REQUESTDATA_SECONEDCHANGETEL](state, data){
        // state.getSingerAdd = data;
        // console.log("data",data)
    },
    [types.REQUESTDATA_FIRSTEMAIL](state, data){
        state.firstChangeEmail = data;
        // console.log("state.firstChangeEmail",data)
    },
    [types.REQUESTDATA_SECONEDEMAIL](state, data){
        // state.getSingerAdd = data;
        // console.log("data",data)
    },
}

//声明Actions
export const actions = {
    // 账户设置  基本资料
    request_accountSetting({ commit },data){
       return getData.getcustorInfor().then( (res)=>{ 
            return commit(types.REQUESTDATA_ACCOUNTSETTING, res.data);
        },(error)=>{
            // console.log("账户设置错误");
        })  
    },
    // 账户 会员等级
    request_Level({ commit },data){
        return getData.myScore().then( (res)=>{ 
             return commit(types.REQUEST_LEVEL, res.data);
             
         },(error)=>{
            
         })  
     },
    request_editCusInfo({state, commit, rootState},data){
        return getData.basicInformation(data).then( (res)=>{
           return commit(types.REQUESTDATA_EDITCUSINF, res.data);
            // console.log("编辑账户设置",res.data);
        },(error)=>{
            // console.log("编辑账户设置错误");
        })  
    },
    // 账户设置  收货地址
    request_getAddList({state, commit, rootState},data){
        return getData.getAddrList(data).then( (res)=>{
           return commit(types.REQUESTDATA_GETADDLIST, res.data);
        },(error)=>{
            // console.log("收货地址列表错误");
        })  
    },
    // 账户设置  新增/修改收货地址
    request_addAddress({state, commit, rootState},data){
        return getData.addAddress(data).then( (res)=>{
           return commit(types.REQUESTDATA_ADDADDRESS, res.data);
            // console.log("新增/修改收货地址",res.data);
        },(error)=>{
            // console.log("新增/修改收货地址错误");
        })  
    },
    // 账户设置  获取单个收货地址
    request_singerAdd({state, commit, rootState},data){
        return getData.singleAddr(data).then( (res)=>{
           return commit(types.REQUESTDATA_GETSINGERADD, res.data);
            // console.log("获取单个收货地址",res.data);
        },(error)=>{
            // console.log("获取单个收货地址错误");
        })  
    },
    // 账户设置  删除地址
    request_deletAdd({state,commit},data){
        return getData.delAddress(data).then( (res)=>{
            return commit(types.REQUESTDATA_DELETEADD, res.data);
            // console.log("删除地址",res.data);
        },(error)=>{
            // console.log("删除地址错误");
        })   
    },
    // 账户设置  设为默认地址
    request_setDefault({state,commit},data){
        return getData.setDefault(data).then( (res)=>{
            return commit(types.REQUESTDATA_SETDEFAULTADD, res.data);
        },(error)=>{
            // console.log("设为默认地址错误");
        })   
    },

    // 账户设置  获取验证码
    request_getCode({state,commit},data){
        return getData.getVerification(data).then( (res)=>{
            return commit(types.REQUESTDATA_GETCODE, res.data);
        },(error)=>{
            // console.log("获取验证码错误");
        })   
    },

    // 账户设置  修改密码
    request_fisrtChangePsd({state,commit},data){
        return getData.changePsd(data).then( (res)=>{
            return commit(types.REQUESTDATA_FIRSTCHANGEPSD, res.data);
        },(error)=>{
            // console.log("修改密码第一步错误");
        })   
    },

    // 账户设置  修改手机号第一步
    request_fisrtChangeTel({state,commit},data){
        return getData.changeTelOrMail(data).then( (res)=>{
            return commit(types.REQUESTDATA_FIRSTCHANGETEL, res.data);
        },(error)=>{
            // console.log("修改手机号第一步错误");
        })   
    },

    // 账户设置  修改手机号第二步
    request_seconedChangeTel({state,commit},data){
        return getData.changeTel(data).then( (res)=>{
            return commit(types.REQUESTDATA_SECONEDCHANGETEL, res.data);
        },(error)=>{
            // console.log("修改手机号第二步错误");
        })   
    },

    // 账户设置  验证邮箱第一步
    request_firstEmail({state,commit},data){
        return getData.changeTelOrMail(data).then( (res)=>{
            return commit(types.REQUESTDATA_FIRSTEMAIL, res.data);
        },(error)=>{
            // console.log("验证邮箱第一步错误");
        })   
    },

    // 账户设置  验证邮箱第二步
    request_seconedEmail({state,commit},data){
        return getData.changeEmail(data).then( (res)=>{
            return commit(types.REQUESTDATA_SECONEDEMAIL, res.data);
        },(error)=>{
            // console.log("验证邮箱第二步错误");
        })   
    },

}


export const getters = {
    getCusInfo(state){
        return state.customerInfo
    },
    companyLevel(state){//会员等级
        // console.log("state.companyLevel",state.companyLevel)
        return state.companyLevel
    },
    todos(state){
        return state.addressList
    },
    getSingerAddress(state){
        // console.log("getSingerAddress",state.getSingerAdd)
        return state.getSingerAdd
    },
    oneChangeEmail(state){
        return state.firstChangeEmail
    },
    oneChangeTel(state){
        // console.log("000000000",state.firstChangeTel)
        return state.firstChangeTel
    }
}