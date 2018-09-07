<template>
    <div id="checkEmail">
        <!-- 个人中心公共头部 -->
        <personalCenterHead ref="indexTriangle"></personalCenterHead>
        <publicPendantR></publicPendantR>
        <!-- 公共侧边 -->
        <div class="margin1200">
            <commonSide></commonSide>
            <div class="right_frame">
                <h3>安全中心</h3>
                <!-- 认证成功 -->
                <div class="emailAuthen" v-if="isSuccess">
                    <!-- 步骤追踪start -->
                    <div class="search_R">
                        <div class="border_one">
                            <div class="border_oneL">
                                <span>1</span>
                                <span>验证身份</span>
                            </div>
                            <div class="border_oneR">
                                <span class="secondStep">2</span>
                                <span class="secondStepWord">修改邮箱</span>
                            </div>
                        </div>
                        <div class="border_three">
                            <div class="border_oneR">
                                <span class="thirdStep">√</span>
                                <span class="thirdStepWord">完成</span>
                            </div>
                        </div>
                    </div>
                    <!-- 步骤追踪end -->
                    <div>
                        <img src="../../assets/images/cart/payment_icon.png" class="email_success">
                        <span class="emailWord">恭喜您，邮箱修改成功！</span>
                        <div class="email_grade_wrap">
                            <!-- <span class="email_grade">最新安全评级：</span>
                            <span class="grade" v-if="safeGrageWord == '低'">低</span>
                            <span class="grade" v-if="safeGrageWord == '中'">中</span>
                            <span class="grade" v-if="safeGrageWord == '高'">高</span>
                            <img src="../../assets/images/account-setting/N1.png" class="email_grade_img" v-if="safeGrage == 1">
                            <img src="../../assets/images/account-setting/N2.png" class="email_grade_img" v-if="safeGrage == 2">
                            <img src="../../assets/images/account-setting/N3.png" class="email_grade_img" v-if="safeGrage == 3"> -->
                        </div>
                        <div class="email_tips">您的账户安全还能提升哦，快去<span style="color:#ff3e08;cursor:pointer;" @click="toSafeCenter"> 安全中心 </span>完善其他安全设置提高评级吧！</div>
                    </div>
                </div>
                <!-- 认证失败 -->
                <div v-else-if="isSuccess == false">
                    <div class="errTitle">
                        <img src="~assets/images/personalCenter/err.png" alt="">
                        <span>糟糕，邮箱验证失败！</span>
                    </div>
                    <div class="errDetail">
                        <div>可能原因如下：</div>
                        <div>1.您的邮箱验证超时，请在24小时内进入邮箱点击认证；</div>
                        <div>2.您已点击过此链接，链接已失效；</div>
                        <div>3.您已生成新的认证链接；</div>
                    </div>
                </div>
            </div>
        </div>
        <publicBottom></publicBottom>
    </div>
</template>

<script>
import personalCenterHead from "~/components/common/personalCenterHead";
import publicBottom from "../../components/common/publicBottom";
import publicPendantR from "../../components/common/publicPendantR";
import commonSide from "~/components/account_setting/commonSide";
import tool from "~/assets/lib/tool.js";
import getData from "~/store/ajaxAPI/getData.js";
export default {
  data() {
    return {
      isSuccess: null //邮箱验证是否成功
    };
  },
  mounted() {
    let _CustomerMesg = tool.loadFromLocal("CustomerMesg", "ALL");
    let _id = this.$route.query.id || "";
    // 判断是否登录（token）
    if (_CustomerMesg && _CustomerMesg.Token) {
      // let token = _CustomerMesg.Token;
      // if (!token) {
      //     this.$router.push({path:"/loginAndRegister/login",query:{checkEmail:1}});
      // } else {

      //判断是否有验证邮箱id
      if (_id.length === 36) {
        let params = {
          params: {
            id: _id
          }
        };
        getData.checkEmail(params).then(res => {
          if (res.success) {
            this.isSuccess = true;
          } else {
            this.isSuccess = false;
            this.$message.error(res.msg);
          }
        })
        .catch(error => {
//        console.log("验证邮箱id", error);
          this.isSuccess = false;
          let msg = error.data.msg;
          if (msg.indexOf('对于“WQBEShop.Web.Controllers') < 0) {
            this.$message.error(error.data.msg);
          }
        });
      } else {
        this.isSuccess = false;
        this.$message.error('邮箱验证链接错误');
      }

      // }
    } else {
      this.$router.push({
        path: "/loginAndRegister/login",
        query: {
          checkEmail: 1,
          checkEmailId: _id
        }
      });
    }
  },
  components: {
    personalCenterHead,
    commonSide,
    publicBottom,
    publicPendantR
  },
  methods: {
    toSafeCenter() {
      this.$router.push("/account_setting/safeCenter");
    }
  }
  // beforeDestroy(){ //销毁修改手机号后的定时器
  //     tool.removeLocal("emailId");
  // }
};
</script>

<style lang="less" scoped>
@import "../personalCenter/personalCenter_index.less";
@import "./safeCenter.less";
.right_frame {
  width: 1018px;
  height: 467px;
  background: #fff;
}
.emailAuthen {
  display: block !important;
}
.secondStep,
.thirdStep {
  background: #fc7b03 !important;
  color: #fff !important;
}
.secondStepWord,
.thirdStepWord {
  color: #fc7b03 !important;
}
.border_three {
  border: 2px solid #fc7b03 !important;
}
.errTitle {
  margin: 90px 0 0 300px;
  img {
    width: 46px;
    height: 46px;
    background-size: 100%;
  }
  span {
    display: inline-block;
    vertical-align: top;
    font-size: 24px;
    font-weight: 600;
    margin-left: 15px;
    margin-top: 10px;
  }
}
.errDetail {
  margin-top: 10px;
  margin-left: 362px;
  div {
    margin-top: 16px;
    font-size: 14px;
  }
  div:nth-child(1) {
    font-size: 16px;
  }
}
</style>
