import * as types from '~/store/ajaxAPI/mutations_types'
import   getData  from '~/store/ajaxAPI/getData'


//声明state
export const state = () => ({
    loginInfo:{}, //登录信息
    registerInfo:{}, //注册信息
    companyInfo:{}, // 公司信息
})

//声明Mutations
export const mutations = {
    [types.REQUEST_LOGIN](state, data){
        state.loginInfo = data;
    },
    [types.REQUEST_REGISTER](state, data){
        state.registerInfo = data;
    },
    [types.REQUEST_SUBMITCOMPANY](state, data){
        state.companyInfo = data;
        // console.log("state.companyInfo",data)
    },
}

//声明Actions
export const actions = {
    // 登录
    request_login({ commit },data){
        return getData.login(data).then( (res)=>{ 
            return commit(types.REQUEST_LOGIN, res.data);
            // console.log("登录",res.data);
         },(error)=>{
            // console.log("登录错误");
         })  
    },
    // 注册
    request_register({ commit },data){
        return getData.register(data).then( (res)=>{ 
            return commit(types.REQUEST_REGISTER, res.data);
            // console.log("注册",res.data);
         },(err)=>{
            if(err.data.msg == "验证码已过期，请重新获取" || err.data.msg == "该手机号已被注册！"  || err.data.msg == "手机验证码输入错误，请重新输入"){
                alert(err.data.msg  );
            }
         })  
    },
    // 公司信息提交
    request_submitCompany({ commit },data){
        return getData.submitCompany(data).then( (res)=>{ 
            // console.log("公司信息提交",res.data);    
            return commit(types.REQUEST_SUBMITCOMPANY, res.data);
         },(error)=>{
            // console.log("公司信息提交错误");
         })  
    },
}

export const getters = {
    loginInfo(state){
        // console.log("getter",state.loginInfo)
        return state.loginInfo
    },
    registerInfo(state){
        // console.log("state.registerInfo",state.registerInfo)
        return state.registerInfo
    }
}