import * as types from '~/store/ajaxAPI/mutations_types'
import   getData  from '~/store/ajaxAPI/getData'


//声明state
export const state = ()=>({
	newsData:[],//公司新闻数据
	indNewsData:[],//新闻数据
})

//声明Mutations
export const mutations = {
	//公司新闻
	[types.NEWSLIST](state, data){
        state.newsData = data;
    },
    //行业新闻
    [types.INDNEWSLIST](state, data){
        state.indNewsData = data;
    },
}

//声明Actions
export const actions = {
	REQUESTDATA_HOME({ commit },data){
		return	getData.getNewsList(data)
				.then( (res)=>{
					if (data.params.num==1) {//公司新闻
						return  commit(types.NEWSLIST, res.data);
					}else if (data.params.num==2) {//行业新闻
						return  commit(types.INDNEWSLIST, res.data);
					}
		        },(error)=>{
		          	//console.log(error)
		        })  
	},
}

export const getters = {
	newsData(state){
		return state.newsData
	},
	indNewsData(state){
		return state.indNewsData
	}
}