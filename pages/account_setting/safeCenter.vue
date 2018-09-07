<template><!--安全中心-->
  <div class="safeCenter">
      <!-- 个人中心公共头部 -->
      <personalCenterHead ref="indexTriangle"></personalCenterHead>
      <publicPendantR></publicPendantR>
      <!-- 公共侧边 -->
      <div class="margin1200">
          <commonSide></commonSide>
          <!-- 右侧 -->
          <div class="right_frame">
               <h3>安全中心</h3>
               <!-- 显示状态 -->
               <div class="content">
                   <div class="top">
                       <div class="level">
                           <span>安全等级：</span>&nbsp;
                           <span v-if="safeGrageWord == '低'">低</span>&nbsp;&nbsp;
                           <span v-if="safeGrageWord == '中'">中</span>&nbsp;&nbsp;
                           <span v-if="safeGrageWord == '高'">高</span>&nbsp;&nbsp;
                           <img src="~assets/images/account-setting/N1.png" v-if="safeGrage == 1">
                           <img src="~assets/images/account-setting/N2.png" v-if="safeGrage == 2">
                           <img src="~assets/images/account-setting/N3.png" v-if="safeGrage == 3">
                       </div>
                       <p v-if="accountRisk == 0">您的账号存在&nbsp;<span>0</span>&nbsp;项风险</p>
                       <p v-else-if="accountRisk == 1">您的账号存在&nbsp;<span>1</span>&nbsp;项风险</p>
                       <p v-else-if="accountRisk == 2">您的账号存在&nbsp;<span>2</span>&nbsp;项风险</p>
                   </div>
                   <div class="bottom">
                       <ul>
                           <li>
                               <span :class="isPsdVerification == 0 ? 'psdImg': 'psdImg2'"></span> &nbsp;
                               <span>
                                    登录密码
                               </span>&nbsp;&nbsp;
                               <span class="des" v-if="isPsdVerification == 0">
                                     您的密码过于简单，建议您修改密码。密码需以数字和字母组合
                               </span>
                               <span class="des" v-else-if="isPsdVerification == 1">
                                    密码已认证
                               </span>
                               <span class="btn">
                                   <button @click="changePsd">修改</button>
                               </span>
                           </li>
                           <li>
                              <span :class="isEmailVerification == 0 ? 'emailImg': 'emailImg2'"></span>&nbsp;
                               <span>
                                   邮箱认证
                               </span>&nbsp;&nbsp;
                               <span class="des" v-if="isEmailVerification == 0">
                                   忘记密码时，此邮箱可以帮你找回密码。
                               </span>
                               <span class="des" v-else-if="isEmailVerification == 1">
                                  邮箱已认证
                               </span>
                               <span class="btn">
                                   <button @click="emailAuthen">认证</button>
                               </span>
                           </li>
                           <li>
                              <span :class="isMobileVerification == 0 ? 'mobileImg': 'mobileImg2'"></span>&nbsp;
                               <span>
                                   手机认证
                               </span>&nbsp;&nbsp;
                               <span class="des" v-if="isMobileVerification == 0">
                                   当前认证的手机号：{{Ellipsis}}，修改认证手机后，可免费升级更高级别的安全服务，有效保障您的帐户和资金安全！
                               </span>
                               <span class="des" v-else-if="isMobileVerification == 1">
                                  当前已认证的手机号：{{Ellipsis}}
                               </span>
                               <span class="btn">
                                   <button @click="changeMobile">修改</button>
                               </span>
                           </li>
                       </ul>
                   </div>
               </div>
               <!--修改密码-->
                <div class="changePsd">
                   <div class="changePsd_T">
                    <span>登录密码</span><span>建议密码由8位以上数字、字母和特殊字符组成，并定期修改</span>
                  </div>
                  <div class="changePsd_C">
                      <span>手机号码：</span>
                      <span>
                        <input type="text" placeholder="请输入新手机号码" ref="telphone" :value="Ellipsis" disabled style="background:rgba(245, 245, 245, 1)">
                      </span>
                      <span>验&nbsp;证&nbsp;码：</span>
                      <span><input type="text" autocomplete="off" placeholder="请输入验证码" class="yzCode" v-model="telCode"></span>
                      <span @click="getOldCode" v-if="isGet"  class="firstGetCode">获取验证码</span>
                      <span v-else  class="firstGetCode">{{time}}s</span>
                      <span class="newPsd">新&nbsp;密&nbsp;码：</span>
                      <span class="newInput">
                        <input type="password"autocomplete="new-password" placeholder="请输入新密码" class="newPsdIpt" v-model="newPsd">
                      </span>
                      <span class="confirmPsd">确认密码：</span>
                      <span>
                        <input type="password" autocomplete="new-password" placeholder="请再次输入新密码" class="againNewPsd" ref="confirmNewPsd">
                      </span>
                      <button @click="updataPsd">修改</button>
                  </div>
               </div>
               <!--邮箱认证-->
               <div class="emailAuthen">
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
                  <!-- 第一步start -->
                  <div v-if="emailfirst">
                    <div class="emailAuthen_T">
                      <span>验证手机</span><span>通过已验证手机号验证。</span>
                    </div>
                    <div class="emailAuthen_C">
                      <span>原手机号：</span>
                      <span>
                        <input type="text" placeholder="请输入新手机号码" ref="telphone" :value="Ellipsis" disabled style="background:rgba(245, 245, 245, 1)">
                      </span>
                      <span>验&nbsp;证&nbsp;码：</span>
                      <span><input type="text" autocomplete="off" placeholder="请输入验证码" class="yzCode" v-model="telCode"></span>
                      <span @click="getOldCode" v-if="isGet" class="firstGetCode">获取验证码</span>
                      <span v-else  class="firstGetCode">{{time}}s</span>
                      <button @click="emailNext">下一步</button>
                    </div>
                    <!-- 第一步end -->
                  </div>
                  <!-- 第二步start -->
                  <div v-if="emailsecond">
                    <div class="emailAuthen_T">
                      <span>修改邮箱</span><span>输入新邮箱进行认证修改</span>
                    </div>
                    <div class="secondMail">
                      <span>新&nbsp;邮&nbsp;箱：</span>
                      <span>
                        <input type="text" autocomplete="off" placeholder="请输入新的邮箱号" v-model="newEmail">
                      </span>
                      <button @click="newEmailNext" class="emailSendBtn">发送</button>
                    </div>
                  </div>
                  <!-- 第二步end -->
                  <!-- 第三步start -->
                  <!-- <div v-if="emailthird">
                    <img src="../../assets/images/cart/payment_icon.png" class="email_success">
                    <span class="emailWord">恭喜您，邮箱修改成功！</span>
                    <div class="email_grade_wrap">
                      <span class="email_grade">最新安全评级：</span>
                      <span class="grade" v-if="safeGrageWord == '低'">低</span>
                      <span class="grade" v-if="safeGrageWord == '中'">中</span>
                      <span class="grade" v-if="safeGrageWord == '高'">高</span>
                      <img src="../../assets/images/account-setting/N1.png" class="email_grade_img" v-if="safeGrage == 1">
                      <img src="../../assets/images/account-setting/N2.png" class="email_grade_img" v-if="safeGrage == 2">
                      <img src="../../assets/images/account-setting/N3.png" class="email_grade_img" v-if="safeGrage == 3">
                    </div>
                    <div class="email_tips">您的账户安全还能提升哦，快去<span style="color:#ff3e08;" @click="toSafeCenter"> 安全中心 </span>完善其他安全设置提高评级吧！</div>
                  </div> -->
                  <!-- 第三步end -->
               </div>
               <!--手机认证-->
               <div class="changeMobile">
                  <!-- 第一步 -->
                  <div v-if="firstTel">
                    <div class="changeMobile_T">
                      <span>修改绑定的手机号</span><span>修改后，原手机号将不能用于登录。您可以使用更换后的手机号进行登录。</span>
                    </div>
                    <div class="changeMobile_C">
                        <span>原手机号：</span>
                        <span>
                          <input type="text" placeholder="请输入新手机号码" @blur="checkTel" ref="telphone" :value="Ellipsis" disabled style="background:rgba(245, 245, 245, 1)">
                          <label @click="toServer">原手机号无法验证？</label>
                        </span>
                        <span>验&nbsp;证&nbsp;码：</span>
                        <span><input type="text" autocomplete="off" placeholder="请输入验证码" class="yzCode" v-model="telCode"></span>
                        <span @click="getOldCode" v-if="isGet"  class="firstGetCode">获取验证码</span>
                        <span v-else  class="firstGetCode">{{time}}s</span>
                        <button @click="nextTel">下一步</button>
                    </div>
                  </div>
                  <!-- 第二步 -->
                  <div v-if="nextTelphone == true">
                      <div class="changeMobile_T">
                          <span>修改绑定的手机号</span><span>修改后，原手机号将不能用于登录。您可以使用更换后的手机号进行登录。</span>
                      </div>
                      <div class="changeMobile_C secondTel">
                          <span>新手机号：</span>
                          <span>
                            <input type="text" placeholder="请输入新手机号码" @blur="checkTel" ref="telphone" v-model="newTel" maxlength="11">
                            <label v-if="currentTel == true"><img src="~/assets/images/tabBar/err_tip.png"> 手机号码格式错误，请重新输入</label>
                          </span>
                          <span>验&nbsp;证&nbsp;码：</span>
                          <span><input type="text" autocomplete="off" placeholder="请输入验证码" class="newTel" v-model="newCode"></span>
                          <span class="secondGetCode" @click="getNewCode" v-if="isGetTwo">获取验证码</span>
                          <span v-else class="secondGetCode">{{time2}}s</span>
                          <button @click="thirdTel">下一步</button>
                      </div>
                  </div>
                  <!-- 第三步 -->
                  <div class="tel_last" v-if="telLast">
                      <div class="changeMobile_T">
                          <span>修改绑定的手机号</span><span>修改后，原手机号将不能用于登录。您可以使用更换后的手机号进行登录。</span>
                      </div>
                      <div>
                        <img src="~assets/images/cart/payment_icon.png" class="tel_success">
                        <span class="successWord">修改成功！</span>
                      </div>
                      <div class="toPage">还有<span style="color:#df3d3e;">&nbsp {{success_time}} &nbsp</span>秒页面将自动<span style="color:#359af8;" @click="toPage">&nbsp跳转&nbsp</span></div>
                  </div>
               </div>
          </div>
      </div>
      <publicBottom></publicBottom>

      <!-- 邮箱发送成功后的模态窗口start -->
      <div class="emailBox" v-if="isShowEmail == true">
        <div class="box">
          <div class="title">温馨提示<span class="del" @click="closeDetail"></span></div>
          <div class="boxContent">信息已提交，请前往你的邮箱完成验证，</div>
          <div class="boxContent2">便于以后正常操作</div>
          <div class="boxBtn cursor" @click="toEmail">前往邮箱</div>
        </div>
      </div>
      <!-- 邮箱发送成功后的模态窗口end -->
  </div>
</template>

<style lang="less" scoped>
@import "../personalCenter/personalCenter_index.less";
@import "./safeCenter.less";
.safeCenter {
  background: #f0f0f5;
}
</style>


<script>
import personalCenterHead from "~/components/common/personalCenterHead";
import publicBottom from "../../components/common/publicBottom";
import publicPendantR from "../../components/common/publicPendantR";
import commonSide from "~/components/account_setting/commonSide";
import getD from "~/store/ajaxAPI/getData";
// import {getStore,removeStore} from "../../util/storage"
// import {MonitorLogin} from "../../util/isLogin"
import tool from "~/assets/lib/tool";
import CryptoJS from "crypto-js";
import { mapState, mapActions, mapGetters } from "vuex";

// 定义修改完手机号后的定时器变量
var timerrrr = null;
export default {
  data() {
    return {
      currentTel: false, //判断是否是正确的手机号码
      firstTel: true, //是否展示更换手机第一步
      nextTelphone: false, //验证手机号是否进行下一步
      oldTel: "", //原手机号
      isGet: true, //第一次是否获取验证码
      isGetTwo: true, //第二次是否获取验证码
      time: 60, //倒计时时间
      telCode: "", //原手机号验证码
      newTel: "", //新手机号
      newCode: "", //新手机号验证码
      telLast: false, //判断新手机号是否验证完毕 完毕则进入第三个页面
      success_time: 10, //手机号修改成功后的倒计时
      codeId: "",
      time2: 60,
      newPsd: "", //新密码
      time3: 60, //修改密码倒计时
      emailfirst: true, //是否展示邮箱第一步
      emailsecond: false, //是否展示邮箱第二步
      emailthird: false, //是否展示邮箱第三步
      newEmail: "", //新邮箱号
      isShowEmail: false, //是否展示邮箱温馨提示模态窗口
      isPsdVerification: 1, //密码是否被认证  0=未验证,1=验证通过
      isEmailVerification: 0, //邮箱是否被认证  0=未验证,1=验证通过
      isMobileVerification: 0, //手机是否被认证  0=未验证,1=验证通过
      safeGrage: 0, //安全等级
      safeGrageWord: "低", //安全等级文字描述
      accountRisk: 0, //账户风险
      Ellipsis: "" //替换手机号中间4位数为*
    };
  },
  components: {
    personalCenterHead,
    commonSide,
    publicBottom,
    publicPendantR
  },
  computed: {
    ...mapGetters({
      getCusInfo: "accountSetting/accountSetting/getCusInfo",
      oneChangeEmail: "accountSetting/accountSetting/oneChangeEmail",
      oneChangeTel: "accountSetting/accountSetting/oneChangeTel"
    })
  },
  updated() {
    // if(!this.$refs.indexTriangle){
    //   return;
    // }
    this.$refs.indexTriangle.$refs.accountTriangle.style.display = "block";
  },
  methods: {
    ...mapActions({
      request_getCode: "accountSetting/accountSetting/request_getCode",
      request_fisrtChangePsd: "accountSetting/accountSetting/request_fisrtChangePsd",
      request_fisrtChangeTel: "accountSetting/accountSetting/request_fisrtChangeTel",
      request_seconedChangeTel: "accountSetting/accountSetting/request_seconedChangeTel",
      request_firstEmail: "accountSetting/accountSetting/request_firstEmail",
      request_accountSetting: "accountSetting/accountSetting/request_accountSetting",
      request_seconedEmail: "accountSetting/accountSetting/request_seconedEmail"
    }),
    changePsd() {
      //修改密码
      $(".content").hide();
      $(".changePsd").show();
      this.fillTel();
    },
    emailAuthen() {
      //修改邮箱
      $(".content").hide();
      $(".emailAuthen").show();
      this.fillTel();
    },
    fillTel() {
      // 清除验证码
      this.telCode = '';
      //自动填充手机号
      // 获取token
      // var _token = getStore("CustomerMesg").Token;
      // 获取客户信息  判断客户是否登录
      // if(MonitorLogin() == true){
      var param = {
        params: {
          //   Token: _token,
          datatype: "json"
        }
      };
      // 获取客户原手机号——自动填充手机号
      // getD.getcustorInfor(param).then((res) => {
      // this.oldTel = res.data.Mobile;
      // // 替换手机号中间几位数为*
      // this.Ellipsis = this.oldTel.substr(0,3)+"****"+this.oldTel.substr(7);
      // this.isEmailVerification = res.data.IsEmailVerification;
      // this.isMobileVerification = res.data.IsMobileVerification;
      // // 判断安全等级
      // if(this.isEmailVerification == 0 && this.isMobileVerification == 0 && this.isPsdVerification == 1){
      //   this.safeGrageWord = "低";
      //   this.safeGrage = 1;
      //   this.accountRisk = 2;
      // }else if(this.isEmailVerification == 0 && this.isMobileVerification == 1 && this.isPsdVerification == 0){
      //   this.safeGrageWord = "低";
      //   this.safeGrage = 1;
      //   this.accountRisk = 2;
      // }else if(this.isEmailVerification == 1 && this.isMobileVerification == 0 && this.isPsdVerification == 0){
      //   this.safeGrage = 1;
      //   this.safeGrageWord = "低";
      //   this.accountRisk = 2;
      // }else if(this.isEmailVerification == 1 && this.isMobileVerification == 1 && this.isPsdVerification == 0){
      //   this.safeGrage = 2;
      //   this.safeGrageWord = "中";
      //   this.accountRisk = 1;
      // }else if(this.isEmailVerification == 0 && this.isMobileVerification == 1 && this.isPsdVerification == 1){
      //   this.safeGrage = 2;
      //   this.safeGrageWord = "中";
      //   this.accountRisk = 1;
      // }else if(this.isEmailVerification == 1 && this.isMobileVerification == 0 && this.isPsdVerification == 1){
      //   this.safeGrage = 2;
      //   this.safeGrageWord = "中";
      //   this.accountRisk = 1;
      // }else if(this.isEmailVerification == 1 && this.isMobileVerification == 1 && this.isPsdVerification == 1){
      //   this.safeGrage = 3;
      //   this.safeGrageWord = "高";
      //    this.accountRisk = 0;
      // }
      // })
      // }else{
      //   this.$router.push("/loginAndRegister/login/login");
      // }
      this.request_accountSetting(param).then(res => {
        this.oldTel = this.getCusInfo.Mobile;
        // 替换手机号中间几位数为*
        this.Ellipsis = this.oldTel.substr(0, 3) + "****" + this.oldTel.substr(7);
        this.isEmailVerification = this.getCusInfo.IsEmailVerification;
        this.isMobileVerification = this.getCusInfo.IsMobileVerification;
        // 判断安全等级
        if (this.isEmailVerification == 0 && this.isMobileVerification == 0 && this.isPsdVerification == 1) {
          this.safeGrageWord = "低";
          this.safeGrage = 1;
          this.accountRisk = 2;
        } else if (this.isEmailVerification == 0 && this.isMobileVerification == 1 && this.isPsdVerification == 0) {
          this.safeGrageWord = "低";
          this.safeGrage = 1;
          this.accountRisk = 2;
        } else if (this.isEmailVerification == 1 && this.isMobileVerification == 0 && this.isPsdVerification == 0) {
          this.safeGrage = 1;
          this.safeGrageWord = "低";
          this.accountRisk = 2;
        } else if (this.isEmailVerification == 1 && this.isMobileVerification == 1 && this.isPsdVerification == 0) {
          this.safeGrage = 2;
          this.safeGrageWord = "中";
          this.accountRisk = 1;
        } else if (this.isEmailVerification == 0 && this.isMobileVerification == 1 && this.isPsdVerification == 1) {
          this.safeGrage = 2;
          this.safeGrageWord = "中";
          this.accountRisk = 1;
        } else if (this.isEmailVerification == 1 && this.isMobileVerification == 0 && this.isPsdVerification == 1) {
          this.safeGrage = 2;
          this.safeGrageWord = "中";
          this.accountRisk = 1;
        } else if (this.isEmailVerification == 1 && this.isMobileVerification == 1 && this.isPsdVerification == 1) {
          this.safeGrage = 3;
          this.safeGrageWord = "高";
          this.accountRisk = 0;
        }
      });
    },
    changeMobile() {
      //修改手机号
      $(".content").hide();
      $(".changeMobile").show();
      this.fillTel();
    },
    checkTel() {
      //核对手机号
      var tel = this.$refs.telphone.value;
      var reg = /(^1[3-9][0-9]{9}$)/.test(tel);
      if (reg) {
        // this.$message.error('不是正确的手机号');
        this.currentTel = false;
      } else {
        this.currentTel = true;
      }
    },
    nextTel() {
      //修改手机号第一步
      // 验证验证码
      var status = tool.regularJudgement("noteCode", this.telCode);
      if (status) {
        // 变更手机认证第一步
        var param = {
          params: {
            type: 0,
            verifyCode: this.telCode
          }
        };
        getD.changeTelOrMail(param).then(res => {
            //console.log("=====",res);
            this.nextTelphone = true;
            this.firstTel = false;
            this.codeId = res.data.Id;
          },
          err => {
            if (err.data.msg == "验证码已过期，请重新获取") {
              this.$message.error(err.data.msg);
            }
            else if (err.data.msg == "手机验证码输入错误，请重新输入") {
              this.$message.error(err.data.msg);
            }
          }
        );
        // this.request_fisrtChangeTel(param).then((res) => {
        //   console.log("this.oneChangeTel",this.oneChangeTel)
        //   this.codeId = this.oneChangeTel.Id;
        // })
      } else {
        this.$message.error("验证码错误！！");
        return;
      }
    },
    toServer() {
      //原手机号无法验证则跳转到人工客服
    },
    getOldCode() {
      //获取原手机号的验证码
      clearInterval(timerrrr);
      timerrrr = null;
      // if(this.currentTel == false){
      this.isGet = false;
      var params = {
        mobile: this.oldTel
      };
      // getD.getVerification(params)
      // .then((res)=>{
      //   //console.log("获取原手机号的验证码",res);
      // })
      this.request_getCode(params);
      //倒计时60s
      timerrrr = setInterval(() => {
        if (this.time == 1) {
          this.time = 60;
          clearInterval(timerrrr);
          this.isGet = true;
        } else {
          this.time--;
        }
      }, 1000);
      // }
    },
    getNewCode() {
      //获取新手机号的验证码
      clearInterval(timerrrr);
      timerrrr = null;
      if (this.currentTel == false) {
        this.isGetTwo = false;
        var params = {
          mobile: this.newTel
        };
        // getD.getVerification(params)
        // .then((res)=>{
        //   //console.log("获取新手机号的验证码",res);
        // })
        this.request_getCode(params);
        //倒计时60s
        timerrrr = setInterval(() => {
          if (this.time2 == 1) {
            this.time2 = 60;
            clearInterval(timerrrr);
            this.isGetTwo = true;
          } else {
            this.time2--;
          }
        }, 1000);
      }
    },
    thirdTel() {
      //更换手机号第二步
      // 验证验证码
      var status = tool.regularJudgement("noteCode", this.newCode);
      if (status) {
        var param = {
          params: {
            id: this.codeId,
            newMoblie: this.newTel,
            verifyCode: this.newCode
          }
        };
        getD
          .changeTel(param)
          .then(
            res => {
              //   console.log("变更手机认证",param,res);
              this.nextTelphone = false;
              this.telLast = true;
              timerrrr = setInterval(() => {
                if (this.success_time == 1) {
                  clearInterval(timerrrr);
                  // 清除本地客户信息
                  tool.removeLocal("CustomerMesg");
                  this.$router.push({
                    path: "/loginAndRegister/login",
                    query: { telphone: this.newTel }
                  });
                  this.$message("请重新登录");
                } else {
                  this.success_time--;
                }
              }, 1000);

              this.countdown();
            },
            error => {
              //console.log("error000",error);
              this.nextTelphone = true;
              this.telLast = false;
              if (error.data.success == false) {
                this.$message.error("该手机号码已存在！");
                return;
              }
            }
          )
          .catch(error => {});

        // this.request_seconedChangeTel(param).then((res) => {
        //   this.nextTelphone = false;
        //   this.telLast = true;
        //   timer = setInterval(() => {
        //     if(this.success_time == 1){
        //       clearInterval(timer);
        //       // this.$router.push("/");
        //       // 清除本地客户信息
        //       // removeStore("CustomerMesg");
        //       this.$router.push({path:"/loginAndRegister/login",query:{telphone:this.newTel}});
        //       this.$message('请重新登录');
        //     }else{
        //       this.success_time--;
        //     }
        //   },1000)
        // },(error) => {
        //   //console.log("error000",error);
        //   this.nextTelphone = true;
        //   this.telLast = false;
        //   if(error.data.success==false){
        //     this.$message.error("该手机号码已存在！");
        //     return;
        //   }
        // }).catch((error) => {
        //   console.log("error",error);
        // })
      } else {
        this.$message.error("验证码错误！！");
        return;
      }
    },
    toPage() {
      //更换手机号成功后点击跳转
      // 清除本地客户信息
      tool.removeLocal("CustomerMesg");
      this.success_time = 1;
      this.$router.push({
        path: "/loginAndRegister/login",
        query: { telphone: this.newTel }
      });
      this.$message("请重新登录");
    },
    updataPsd() {
      //修改密码
      var _againNewPsd = this.$refs.confirmNewPsd.value;
      // // 验证验证码
      var status = tool.regularJudgement("noteCode", this.telCode);
      if (status) {
        this.isGet = false;
      } else {
        this.isGet = true;
      }
      if (this.newPsd.length >= 6) {
        if (this.newPsd == _againNewPsd) {
          var passwordEncrypt = CryptoJS.AES.encrypt(this.newPsd, "59964e5d540e446cf98bc2af78a2ea58"); //密码加密
          var param = {
            params: {
              newPwd: encodeURI(passwordEncrypt.toString()),
              verifyCode: this.telCode,
              datatype: "json",
              openSSL: true
            }
          };
          getD.changePsd(param).then(res => {
              //console.log("修改密码",res);
              this.$message({
                message: "修改成功，请重新登录",
                type: "success"
              });
              // 清除本地客户信息
              tool.removeLocal("CustomerMesg");
              this.$router.push("/loginAndRegister/login");
            },
            error => {
              // console.log(error)
              if (error.data.success == false) {
                this.$message.error(error.data.msg);
                return;
              }
            }
          );
          // this.request_fisrtChangePsd(param).then((res)=>{
          //   this.$message({
          //     message: '修改成功，请重新登录',
          //     type: 'success'
          //   });
          // },(error) =>{
          //   if(error.data.success==false){
          //     this.$message.error("新密码与旧密码相同！");
          //     return;
          //   }
          // })
        } else {
          this.$message.error("密码输入不一致");
        }
      } else {
        this.$message.error("密码最少需要6位数");
      }
    },
    emailNext() {
      //验证邮箱第一步
      // 验证验证码
      var status = tool.regularJudgement("noteCode", this.telCode);
      if (status) {
        // 变更邮箱认证第一步
        var param = {
          params: {
            type: 1,
            verifyCode: this.telCode
          }
        };
        getD.changeTelOrMail(param).then(res => {
            this.emailfirst = false;
            this.emailsecond = true;
            $(".secondStep").css({ color: "white", background: "#fc7b03" });
            $(".secondStepWord").css("color", "#fc7b03");
            //console.log("=====",res);
            this.codeId = res.data.Id;
          },
          err => {
            if (err.data.msg) {
              this.$message.error(err.data.msg);
              return;
            }
          }
        );
        // this.request_firstEmail(param).then((res) => {
        //   console.log("oneChangeEmail",this.oneChangeEmail)
        //   this.codeId = this.oneChangeEmail.Id;
        // })
      } else {
        this.$message.error("验证码错误!!");
      }
    },
    newEmailNext() {
      //邮箱认证第二步
      // 验证邮箱号
      var emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      // var emailReg=/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
      var currentEmail = emailReg.test(this.newEmail);
      //console.log("currentEmail",currentEmail);
      if (currentEmail == true) {
        $(".emailSendBtn").text("发送中...");
        this.isShowEmail = true;
        var param = {
          params: {
            id: this.codeId,
            newEmail: this.newEmail
          }
        };
        getD.changeEmail(param).then(res => {
          //console.log("变更邮箱认证",res);
          $(".emailSendBtn").text("已发送");
          $(".emailSendBtn").text("已发送");
          $(".emailAuthen").css("block", "none");
        });
        // this.request_seconedEmail(param)
        // .then((res) => {
        //   $(".emailSendBtn").text("已发送");
        // })
      } else {
        this.isShowEmail = false;
        this.$message.error("邮箱错误!!");
      }
    },
    closeDetail() {
      // this.isShowEmail = false;
      // this.emailsecond = false;
      // this.emailthird = true;
      // $(".thirdStep").css({"color":"white","background":"#fc7b03"});
      // $(".thirdStepWord").css("color","#fc7b03");
      // $(".border_three").css("border","2px solid #fc7b03");
      // this.fillTel();0011
      $(".content").show();
      $(".emailAuthen").hide();
      this.isShowEmail = false;
      this.isGet = true;
      this.time = 60;
      this.time2 = 60;
      this.time3 = 60;
      clearInterval(timerrrr);
    },
    // toSafeCenter(){ //去到安全中心
    //   $(".content").show();
    //   $(".changePsd").hide();
    // },
    toEmail() {
      //前往邮箱
      if (this.newEmail.indexOf("qq.com") > 0) {
        // window.location.href = "http://mail.qq.com";
        window.open("https://mail.qq.com");
      } else if (this.newEmail.indexOf("163.com") > 0) {
        // window.location.href = "http://mail.163.com/";
        window.open("https://mail.163.com/");
      } else if (this.newEmail.indexOf("126.com") > 0) {
        // window.location.href = "http://mail.126.com/";
        window.open("https://mail.126.com/");
      } else if (this.newEmail.indexOf("sina.com") > 0) {
        // window.location.href = "http://mail.sina.com.cn/";
        window.open("https://mail.sina.com.cn/");
      } else if (this.newEmail.indexOf("sohu.com") > 0) {
        // window.location.href = "https://mail.sohu.com/fe/#/login";
        window.open("https://mail.sohu.com/fe/#/login");
      }
    }
  },
  mounted() {
    this.fillTel(); //自动填充手机号
  },
  beforeDestroy() {
    //销毁修改手机号后的定时器
    clearInterval(timerrrr);
  }
};
</script>

