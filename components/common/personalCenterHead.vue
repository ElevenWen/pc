<template>
<div class="c-header">
	<div class="c-hdTopWrap">
		 <div class="c-Pheader" id="c_PersernalHead" style="margin-bottom: 10px;">
	  		<!-- 顶部分组件 -->
			<topState></topState>
			<!-- nav栏 -->
			<div class="c-PersonalHead ">
				<div class="middle1200" id="personal_nav">
					<nuxt-link to="/"><img src="~assets/images/common/logo-white.png" height="44" width="120" alt="" class="Personal_logo"/></nuxt-link>
					<nuxt-link to="/personalCenter/personalCenterIndex"><span class="personal_title"> 个人中心</span></nuxt-link>
					<nuxt-link to="/"><div class="button_return">返回微企宝首页</div></nuxt-link>
					<nuxt-link to="/personalCenter/personalCenterIndex" tag="div" class="topnav" id="shouye">首页</nuxt-link>
					<nuxt-link tag="div" class="topnav" id="account" to="/account_setting/information">账户设置</nuxt-link>
					<nuxt-link tag="div" class="topnav" id="messages" to="/personalCenter/messages">消息<div class="num" ><span>{{wdMsgNun}}</span></div></nuxt-link>
					<img src="~assets/images/personalCenter/index/sanjiao.png" alt="" class="indexTriangle" ref="indexTriangle">
					<img src="~assets/images/personalCenter/index/sanjiao.png" alt="" class="accountTriangle" ref="accountTriangle">
					<img src="~assets/images/personalCenter/index/sanjiao.png" alt="" class="messagesTriangle" ref="messagesTriangle" 
					:class="$route.path == '/personalCenter/messages'? 'activedNav':''">
				</div>
			</div>
		</div>
	</div>
</div>
 
</template>

<style lang="less" type="stylesheet/css" scoped>
	@import "~assets/common/common.less";
	
	.c-hdTopWrap{
		height: 110px;
		margin-bottom: 20px !important;
	}
	.topnav{
		cursor: pointer;
	}
	
	.personal_nav{
		position: relative;
	}
	.accountTriangle{
		position: relative;
	    top: 72px;
	    left: -154px;
	    float: left;
		display: none;
	}
	.indexTriangle{
		position: relative;
	    top: 72px;
	    left: -244px;
	    float: left;
	    display: none;
	}
	.messagesTriangle{
		position: relative;
	    top: 72px;
	    left: -65px;
	    float: left;
	    display: none;
	}
	.activedNav{
		display: block;
	}
	#messages{
		position: relative;
		.num{
			position: absolute;
			right: -60%;
			top: -23%;
			height: 14px;
			span{
				padding: 0 6px;
				border-radius: 50%;
				background-color: #ffffff;
				color: #ff3e08;
			}
		}
	}
</style>

<script>
import topState from '../common/topState'
import getData from "~/store/ajaxAPI/getData.js"
import { mapGetters,mapMutations } from "vuex"

export default {
 	
  data(){
      return{
		 
      }
  },
  mounted () {
	//   this.$watch('wdMsgNun',()=>{		
		 
	//   })
	  var parma = {
			pageindex: 1,
			pagesize: 999
		}
		getData.getSysMessage(parma)
		.then((res)=>{
			//console.log('系统消息',res);
			var arr = res.data;
			var num = 0;
			arr.forEach(ele=>{       
			if(!ele.IsRead){
				num = num + 1;
			}
			});  
			//console.log('未读消息',num);   
			this.SET_WDXXNum(num)
			
			//console.log('未读消息2',this.wdMsgNun); 
		})
  },
  components:{
      topState
  },
  methods: {
	...mapMutations(
		{
			"SET_WDXXNum":"SET_WDXXNum",
		},) 
  },
  computed: {
	   ...mapGetters({
			wdMsgNun: "GET_WDXXNum" // 来自vuex index.js页面 getter
		}),
  }
}
</script>




