<template>
	<div id="search">
		<div class="search">
			<div class="search_L">
				<div class="search_logo" @click="home">
					<img src="/images/logo.png">
				</div>
				<span>{{name}}</span>
			</div>
			<div class="search_R">
				<form>
					<input type="text" placeholder="工商注册" v-model="searchName" @keydown.stop.prevent.enter="userComfirm()"/>
					<button @click.stop.prevent="userComfirm()">搜索</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState,mapActions,mapGetters} from 'vuex';
     import tool from "~/assets/lib/tool.js";
	export default {
	    data() {
		    return {
		      	searchName:"",//搜索内容
		    }
	    },
	    props: {
            name: {//来自bussiness.vue 父组件的值
                type: String,
                default: '',
            },
		},

	    mounted(){
			// 	console.log('mountedmountedmountedmounted' );
			// tool.loadSessionStorage('businessSearchKey',"ALL");
			// console.log('取出来',this.commonTool.loadSessionStorage('businessSearchKey',"ALL"))
	    	let searchData = this.commonTool.loadSessionStorage('businessSearchKey',"ALL");
			if(searchData){
				this.searchName = searchData.searchName;
			}
			this.searchName = this.$route.query.searchName
			// console.log( this.searchName , this.$route.query.searchName)
	    },
	    computed:{
	    	...mapState(
				"businessQuery",{
					'startTime':'startTime',
					'endTime':'endTime'
				}
	    	),
	    },

	    methods:{
	    	//返回首页
	    	home(){
	    		this.$router.push('/');
	    	},
	    	userComfirm(){
	    		//存入本地
				// console.log(　this.$router.currentRoute.name　);
	    		if(this.$router.currentRoute.name == 'cart-cart'){
	    			this.$router.push({path:'/productList',query:{typeIndex:"all",productName:this.searchName}});
	    		}else{
	    			this.commonTool.saveSessionStorage("businessSearchKey",{'searchName':this.searchName})
		    		// console.log(this.searchName,'现在的');
		    		this.commonTool.saveSessionStorage('startTimeDate',+new Date());
					// this.$router.push({name:'business','query':{searchName:this.searchName,category:"公司",type:0}});
					// console.log('存进去的','取出来',this.commonTool.loadSessionStorage('businessSearchKey',"ALL"))
		    		this.$router.push({path:'/business/business','query':{searchName:this.searchName,category:"公司",type:0}});
		    	    window.location.reload();
	    		}
	    	},
	    },
	    filters:{

	    }
	}
</script>

<style lang="less" type="stylesheet/css" scoped>
  #search{
  	height: 86px;
  	width: 100%;
  	background: #FFF;
  }
  .search{
  	width: 1200px;
  	height: 100%;
  	margin: 0 auto;
  }
  .search_L{
  	width: 300px;
  	height: 80px;
  	float: left;
  	.search_logo{
  		width: 120px;
  		height: 45px;
  		margin: 20px 0;
  		cursor: pointer;
  		float: left;
  	}
  	span{
  		font-size: 20px;
  		color: #333;
  		height: 80px;
  		line-height: 80px;
  		margin-left: 20px;
  	}
  }
  .search_R{
  	width: 330px;
  	height: 34px;
  	float: right;
  	margin-top: 26px;
  	border:1px solid #FF3E08;
  	input{
  		height: 32px;
  		padding: 12px;
  		width: 255px;
  	}
  	button{
	    width: 73px;
		height: 32px;
		font-size: 16px;
		color: #F2F2F2;
		float: right;
		background: #FF3E08;
  	}
  }
</style>
