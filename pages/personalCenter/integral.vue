<template>
    <div class="c-header">
      <!-- 个人中心公共头部 -->
      <personalCenterHead ref="indexTriangle"></personalCenterHead>
		  <publicPendantR></publicPendantR>
      <div class="margin1200">
          <personalCenterSlide></personalCenterSlide>
          <div class="right_frame">
	    		<div class="balance_top">
					<div class="title">
						<span>我的积分</span>
						<nuxt-link to="/personalCenter/integralRule">积分获取规则></nuxt-link>
					</div>
    				<div class="score_sum" style="height: 140px;">
    					<div class="sum_head">
    						<div class="left_line"></div>
    						<span class="p_fl">我的积分总额</span>
    						<div class="right_line"></div>
    					</div>
    					<div class="sum_bottom">
    						<img src="~assets/images/personalCenter/scorea.png" />
    						<span class="num">{{myScore}}</span>
    					</div>
    				</div>
	    			<div class="score_sum" style="height: 140px;">
    					<div class="sum_head short">
    						<div class="left_line"></div>
    						<span class="p_fl">将要过期的积分</span>
    						<div class="right_line"></div>
    					</div>
    					<div class="sum_bottom">
    						<img src="~assets/images/personalCenter/scorea.png" />
    						<span class="num_past">{{WillOverdueScore}}</span>
    					</div>
    				</div>
	    			<div class="top3">
	    				<nuxt-link to="/personalCenter/integralChange"><div class="buttom_charge">积分兑换超值产品与优惠券</div></nuxt-link>
	    			</div>
	    		</div>
	    		<div class="bottom_detail">
						<h3>积分明细</h3>
					<div class="detail">
							<div class="top">
								<span>来源/用途</span>
								<span>积分变化</span>
								<span>日期</span>
								<span>备注</span>
						</div>
						<div class="scoreBox">
							<ul v-if="productLists">
								<li v-for="(item,index) in productLists" :key="item.Id">
									<div class="buttom">
										<span>{{item.Reason}}</span>
										<span :class="item.color">{{item.AddScore}}</span>
										<span>{{item.timer}}</span>
										<span>交易获得</span>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div class="pagination">
						<el-pagination v-if="CountPage"
						@current-change="handleCurrentChange"
						background layout="prev, pager, next" :total="CountPage" 
						:current-page="NowPage"
            			:page-size="pagesize"
						prev-text='上一页' next-text='下一页'>
						</el-pagination>
					</div>
				</div>
	     </div>
      </div>
      <div class="c-ftContainWrapindex">
					<publicBottom></publicBottom>
			</div>
    </div>
</template>

<style lang="less" scoped>
@import "./personalCenter.less";
.margin1200 {
  margin: auto;
	width: 1200px;
	overflow: hidden;
	margin-top: 10px;
}
.c-ftContainWrapindex{
	margin-top: 100px;
}
.bottom_detail .pagination{ 
	margin: 0; 
    padding: 30px 20px 0 0;
    text-align: right;
}
.bottom_detail .el-pagination button,.bottom_detail .el-pagination span:not([class*=suffix]){
	width: 60px !important;
}
</style>


<script>
import personalCenterHead from "~/components/common/personalCenterHead";
import personalCenterSlide from "~/components/common/personalCenterSlide";
import publicBottom from '~/components/common/publicBottom'
import publicPendantR from '~/components/common/publicPendantR'
import getData from '~/store/ajaxAPI/getData.js'
import fmt from '~/assets/lib/tool.js'
export default {
  data() {
    return {
		//积分列表数组
		myScoreDetailsArr:[],
		myScore:'', //积分总额
		WillOverdueScore:'', //即将过期积分
		CountPage:'',   //总商品条数
        NowPage: 1,     //当前页数
        pagesize: 10,   //每页条数
	};
  },
  methods:{
	  //获取积分列表
	  getMyScoreDetails(){
		  getData.myScoreDetails().then(res=>{
			  //console.log('积分列表',res.data)
			//   this.myScoreDetailsArr = res.data
			  let arr = res.data
			  for(var i=0;i<arr.length;i++){
				//   //console.log(arr[i].AddScore)
				//格式化时间
					var str = arr[i].AddTime.replace(/[^0-9]/ig,"")
					arr[i].timer = fmt.formatDate(str,"yyyy-MM-dd hh:mm:ss")
					//判断加减积分区分颜色
				  if(arr[i].AddScore>0){
					  arr[i].AddScore = '+'+arr[i].AddScore
					  arr[i].color = 'isGreen';
				  }else{
					  arr[i].color = 'isRed';
				  }
			  }
			  this.myScoreDetailsArr = res.data
			  this.CountPage = res.data.length
		  }).catch(err=>{
			  //console.log('积分失败',err)
		  })
	  },
	  //获取积分总额
	  getMyScore(){
		  getData.myScore().then(res=>{
			  //console.log('积分总额',res.data)
			  this.WillOverdueScore = res.data.WillOverdueScore
			  this.myScore = res.data.Score
		  }).catch(err=>{
			  //console.log(err)
		  })
	  },
	  handleCurrentChange(val) {
          this.NowPage = val;
        ////console.log(`当前页: ${val}`);
      }
  },
  computed:{
	   //计算当前显示页的商品数组
      productLists: function(){
        return this.myScoreDetailsArr.slice((this.NowPage-1)*this.pagesize,this.NowPage*this.pagesize)
      },
  },
  mounted(){
	  this.$refs.indexTriangle.$refs.indexTriangle.style.display = 'block';
	  this.getMyScoreDetails()
	  this.getMyScore()
  },
  components: {
 	personalCenterHead,
 	personalCenterSlide,
	publicBottom,
	publicPendantR
  }
};
</script>
