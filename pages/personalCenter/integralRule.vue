<template>
    <div class="c-header">
        <!-- 个人中心公共头部 -->
          <personalCenterHead ref="indexTriangle"></personalCenterHead>
      <div class="margin1200">
          <div class="right_frame">
	    		<div class="title">
                    积分规则
                </div>
                <div class="content">
                    <ul>
                        <li>
                            <h3>
                                一、	积分定义
                            </h3>
                            <p>
                                积分是用户行为产生的分数系统，是衡量用户活跃度和粘性的指标，积分可以兑换延展权益。积分系统定位于两套规则（积分生成规则/积分
使用规则）及统一的管理平台。
                            </p>
                        </li>
                        <li>
                            <h3>
                                二、	什么是积分？
                            </h3>
                            <p>
                                积分是微企宝为奖励会员和注册游客提供的一种虚拟币。
使用规则）及统一的管理平台。
                            </p>
                        </li>
                        <li>
                            <h3>
                                三、	积分生成规则
                            </h3>
                            <p>
                                用户通过各种行为或系统根据设定条件为用户生成并累加积分的规则。
                            </p>
                            <p>1.基于通用行为：用户的使用、互动、消费、传播、营销会产生积 分。</p>
                            <p>
                                2.积分生成规则覆盖全业务线，按照统一标准产生积分。
                            </p>
                            <p>
                                3.积分兑换而产生的用户行为，将不再次累积积分。
                            </p>
                        </li>
                    </ul>
                    <div class="img1_box">
                        <img src="~assets/images/personalCenter/asset/integral/rule111.png" alt="">
                    </div>
                    <div class="four_rule">
                        <h3>
                            四、	积分消耗规则：
                        </h3>
                        <p>
                            用户依据系统设定规则通过兑换、抽奖、抵扣等行为进行积分消耗。
                        </p>
                        <p>
                            1.积分在合理期限内可以累积使用，当累计到一定期限将对用户进行积分使用提醒，若超过时效将对积分进行冻结或者默认使用，积分不做清
零处理。
                        </p>
                        <p>
                            2.对于恶意刷分行为，一旦发现既可进行人工清零等相应处罚。
                        </p>
                    </div>
                    <p>
                        积分消耗类型：
                    </p>
                    <div class="img2_box">
                        <img src="~assets/images/personalCenter/asset/integral/rule2.png" alt="">
                    </div>
                    <p class="notice_red">
                        注：所有积分仅供在微企宝网站使用和兑换，不找零，不折现
                    </p>
                    <ul>
                        <li>
                            <h3>
                                五、积分有效期
                            </h3>
                            <p>当年产生的积分在下一个自然年的1月1日0点前有效，逾期将作废。</p>
                            <p>举 例 — —</p>
                            <p>前提：账户A中共有1500积分，其中1000积分为2014年12月31日前产生的，另500积分为2015年1月1日后产生的，且未经使用；</p>
                            <p>说明：若此1000积分在2015年12月31号之前未使用，系统在2015年12月31号当天自动将1000积分兑换成10元优惠劵（保留三个月）逾期将作废；</p>
                            <p>
                                积分账户余额=1500积分－1000失效积分=500积分
                            </p>
                        </li>
                        <li>
                            <h3>
                                六、积分违规及收回说明
                            </h3>
                            <p>
                                发表的评论违反国家法律法规或者附带其它广告信息的，一经发现将被删除，同时一次扣除50积分。
                            </p>
                        </li>
                        <li>
                            <h3>
                                七、积分查询方式
                            </h3>
                            <p>
                                1.平台在线查询：用户在登陆状态下，通过个人中心查询到自己的积分总额和消耗情况
                            </p>
                            <p>
                                2.定向邮件/短信通知：用户资料完善的情况下，固定周期通过电邮/短信方式将积分总额和消耗情况送达用户
                            </p>
                        </li>
                    </ul>
                </div>
	     </div>
         <div class="adWrap" v-if="data && data2">
	            <img :src="data.PosterImgURL" class="img1" @click="toDetail(data.LinkWebSite)">
	            <img :src="data2.PosterImgURL" @click="toDetail(data2.LinkWebSite)">
	     </div> 
      </div>
      <div class="c-ftContainWrapindex">
					<publicBottom></publicBottom>
			</div>
    </div>
</template>

<style lang="less" scoped>
@import "./personalCenter.less";
@import "./integralRule.less";
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
import publicBottom from '~/components/common/publicBottom';
import getd from '~/store/ajaxAPI/getData.js';
export default { 
  data() {
    return {
		data:{},//广告
		data2:{},//广告2
	};
  },
  updated(){
	  this.$refs.indexTriangle.$refs.indexTriangle.style.display = 'block';
  },
  mounted(){
  	//广告1
  	var params = {
		params:{
			type:0,//pc 成为0  app 为1
			code:"YCGGW06"
		}
	};
	getd.getHomeBanner(params)
	.then((res) => {
		this.data = res.data.list[0];
	})
	
	//广告2
	var params2 = {
		params:{
			type:0,//pc 成为0  app 为1
			code:"YCGGW07"
		}
	};
	getd.getHomeBanner(params2)
	.then((res) => {
		this.data2 = res.data.list[0];
	})
  },
  methods:{
  	toDetail(url){
  		location.href = url;
  	}
  },
  components: {
    personalCenterHead,
	publicBottom,
  }
};
</script>
