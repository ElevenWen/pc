import * as types from '~/store/ajaxAPI/mutations_types'
import   getData  from '~/store/ajaxAPI/getData'


//声明state
export const state = ()=>({
	loadData:[],
	
})

//声明Mutations
export const mutations = {
	[types.REQUESTDATA_HOME](state, data){
        state.cacheData = data;
    },
   	
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
	
}

 