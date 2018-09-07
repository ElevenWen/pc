<style type="stylesheet/css" scoped lang="less">
	.newWrap{
		width: 100%;
		background: #fff;
		text-align: center;
		padding: 0 100px 50px 100px;
		min-height: 600px;
	}
	.new{
		width: 1200px;
		margin: 0 auto;
	}
	.title{
		padding-top: 60px;
		font-size: 20px;
		font-weight: 600;
	}
	.contentTips{
		margin-top: 15px;
	}
	.contentTips span{
		font-size: 15px;
	}
	.content{
		/*padding: 20px 50px;*/
		width: 60%;
	    margin-left: 20%;
	    margin-top: 20px;
	    line-height: 30px;
	    font-size: 16px;
	    text-indent: 31px;
	    text-align:left;
	}
	#content{
		text-align:left;
		background: #fff;
		// text-indent: 28px;
		width: 715px;
		margin: 20px auto;
	}
	</style>
<template>
	<div id="newsDetail">
		<!-- 公用top 整体 -->
		<div class="c-headerContainWrap">
			<publicPendantR></publicPendantR>
			<navigationBar :isNews="true"></navigationBar>
		</div>
		<!-- 新闻内容 -->
		<div class="newWrap">
			<div class="new">
				<div class="title">{{newsInfo.Title}}</div>
				<div class="contentTips">
					<span>来源：{{newsInfo.SourceInfo}} </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<span>时间：{{newsInfo.timer}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<!-- <span>浏览次数：137次</span> -->
				</div>
				<!-- <div id="content"></div> -->
				<!-- <div v-html="newsInfo.Content">{{newsInfo.Content}}</div> -->
				<iframe ref="iframe" :src="src" width="715px" style="padding: 0px;" @load="loaded" scrolling="no" id="mainFrame" name="mainFrame"></iframe>
			</div>
		</div>
		<!-- 公用bottom 整体 -->
		<div class="c-ftContainWrapindex">
			<publicBottom></publicBottom>
		</div>
	</div>
</template>

<script>
	import publicPendantR from "~/components/common/publicPendantR";
	import navigationBar from "~/components/common/navigationBar";
	import publicBottom from "~/components/common/publicBottom";
	import getD from "~/store/ajaxAPI/getData";
	import tool from "~/assets/lib/tool";
	export default {
		head () {
        return {
          title: this.Title,
          meta: [
            { hid: 'description', name: 'description', content: this.Description },
            { hid: 'keyword', name: 'keywords', content: this.KeyWords },

        ],
        }
      },
      asyncData ({context,route}) {
        var params = {
          params:{
            code:  'News',//根据数据字典传递：商品-Product,套餐-Package，新闻-News，首页—Index
			tempId:route.query.id,//商品/套餐/新闻Id
          }
        }
        return getD.seo(params).then((res)=>{
			var data = res.data.list;
            if(data.length == 0 ){
              return {
                Description : '微企宝',
				KeyWords : '微企宝',
				Title  : '微企宝'
              }
            }
            return {
              Description : data[0].Description,
              KeyWords : data[0].KeyWords,
              Title  : data[0].Title
			};

        });
      },


		data(){
			return {
				src:'/newsDetail.html?id='+this.$route.query.id+'&env='+process.env._NODE_ENV,
				newsInfo:{
					timer:"",
					content:""
				}, //后台返回的信息
			}
		},
		components:{
			publicPendantR,
			navigationBar,
			publicBottom,
		},
		mounted(){
			var _id = this.$route.query.id;
			var param = {
				params:{
					id: _id,
				}
			};
			getD.newsDetail(param)
			.then((res) => {
				// console.log(res,'hahahahhah')
				this.newsInfo = res.data;
				var timer = res.data.CreatDateTime;
				var _timer = timer.substring(timer.indexOf("(")+1,timer.lastIndexOf(")"))
				this.newsInfo.timer = tool.formatDate(_timer,"yyyy-MM-dd");
				// this.newsInfo.content = res.data.Content;
				// document.getElementById("content").innerHTML = res.data.Content;
			})
			// console.log(process.env._NODE_ENV,'哈哈哈啊哈')
		},
		methods:{
			loaded(){

				this.$nextTick(()=>{
					setTimeout(()=>{
						//console.log(this.$refs.iframe.contentWindow.document.getElementById("newsDetail").offsetHeight)
						this.$refs.iframe.height = this.$refs.iframe.contentWindow.document.getElementById("newsDetail").offsetHeight + 'px';

					},1500)
				})
				// this.$refs.iframe.contentWindow.document.getElementById("newsDetail").innerHTML = this.newsInfo.content;
				// setTimeout(()=>{
				// 	if(!this.$refs.iframe){
				// 		return;
				// 	}
				// 	this.$refs.iframe.contentWindow.document.getElementById("newsDetail").innerHTML = this.newsInfo.content;
				// 	this.$refs.iframe.height=(this.$refs.iframe.Document?this.$refs.iframe.Document.body.offsetHeight:this.$refs.iframe.contentDocument.body.offsetHeight) + 'px';
				// }
				// ,500)
			}
		}
	}
</script>
