<template>
	<div id="login">
    <div class="c-header">
      <div class="c-hdTopWrap">
        <topState  :authUser="authUser" ></topState>
        <div class="c-headerBotoom">
          <div class="c-content">
            <div class="logo">
              <nuxt-link to="/" title="微企宝一站式企业服务平台">
                <img src="/images/logo.png" alt="微企宝深圳前海公司注册">
              </nuxt-link>
              <span>欢迎登录 </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="loginCenter">
      <div class="loginframe">
        <div class="loginHeadline">
          <span class="text" v-if="scanisShow">扫码登录</span>
          <span class="text" v-else>账号登录</span>
          <span class="QR_code123" ><img src="~assets/images/loginAndRegister/scan_txt.png" alt="scan"></span>
          <span class="QR_code123 sacanSwitch" @click="sacanSwitch()">
            <img src="~assets/images/loginAndRegister/account_btn.png" alt="ewm" v-if="scanisShow">
            <img src="~assets/images/loginAndRegister/ewm_btn.png" alt="ewm" v-else>
          </span>
        </div>
        <!--账号登录界面-->
        <el-form :model="loginForm" class="loginForm" v-show="scanisShow== false? true:false">
          <div class="username">
            <label for=""><img class="icon" src="~assets/images/loginAndRegister/portrait.png" alt="">
            </label>
            <input type="text" v-model="newTel" placeholder="账号" readonly v-if="safeCenter == true" @change="changeAccount">
            <input type="text" v-model="loginForm.Mobile" placeholder="账号" v-else>
          </div>
          <div class="password">
            <label for=""><img class="icon" src="~assets/images/loginAndRegister/lock.png" alt="">
            </label>
            <input type="password" v-model="loginForm.password" placeholder="密码" @keyup.enter="onSubmitLogin(false)">

          </div>
          <div class="button"  @keydown.enter="onSubmitLogin(false)"  @click="onSubmitLogin(true)" v-if="safeCenter == true">
             <!-- <input type="button"  value="登录"  onclick="alert(1)"/> -->
             <a href="javascript:void(0)"  >登&nbsp;&nbsp;录</a>
          </div>
          <div class="button"  @keydown.enter="onSubmitLogin(false)"  @click="onSubmitLogin(false)" v-else>
             <!-- <input type="button"  value="登录"  onclick="alert(1)"/> -->
             <a href="javascript:void(0)"  >登&nbsp;&nbsp;录</a>
          </div>
          <p>
            <input type="checkbox" v-model="loginForm.isBackLogin">自动登录
            <a href="/loginAndRegister/forgetPassword">忘记密码</a>
          </p>
        </el-form>
        <div class="loginSuccessed">
          <p class="outLogin" @click="outLogin()"><span><!-- 退出 --></span></p>
          <div class="headPortrait">
            <img :src="userMesg.HeadPicPath" alt="">
          </div>
          <p class="userWelcome">你好，{{userMesg.Nickname}}</p>
          <p class="WelcomeDes">欢迎来到微企宝！</p>
         <!-- 暂时保留 不作处理-->
         <!-- <ul class="uerMsgs">
            <li>
              <p class="number">2</p>
              <p class="textDes">待支付</p>
            </li>
            <li>
              <p class="number">5</p>
              <p class="textDes">待处理</p>
            </li>
            <li>
            <p class="number">20</p>
            <p class="textDes">待评价</p>
            </li>
          </ul>-->
        </div>
        <!--扫码登录界面-->
        <div class="scanCodeWrap" v-show="scanisShow">
          <div class="scanText">
            <img src="~assets/images/loginAndRegister/QR.png" alt="">
            <span class="text">
              <span>打开微企宝APP</span><br>
              <span style="color: #FF3A04">扫一扫</span>登录
            </span>
          </div>
          <div class="scanCodeImg">
            <!-- 二维码图片 -->
            <!-- <img src="~assets/images/loginAndRegister/wx.png" alt=""> -->
            <img  :src="scanImg" alt="">
          </div>
        </div>
        <!--扫码成功-->
        <!--<div class="scanSucceed" v-if="scanisSuccess">-->
          <!--<span><img src="">扫描成功！</span>-->
          <!--<span>请勿刷新本页面，按手机提示操作</span>-->
        <!--</div>-->
        <div class="toList">
          <a id="qqLoginBtn" @click="qqLogin"><img src="~assets/images/tabBar/QQ.png" alt="">QQ</a>
          <a hfef='javascript:void(0)' @click="wxAccredit"><img src="~assets/images/tabBar/WeChat.png" alt="">微信</a>
          <a @click="allowWeiboLogin()"><img src="~assets/images/tabBar/microblog.png" alt="">微博</a>
          <a href="/loginAndRegister/register">免费注册</a>
        </div>
      </div>
    </div>
    <div class="c-bottom">
      <publicBottom></publicBottom>
    </div>
  </div>
</template>

<script>
  var setTimeoutIdLogin = null;
  import topState from "../../components/common/topState"
  import publicBottom from "../../components/common/publicBottom"
//   import {MonitorLogin} from '../../../util/isLogin'
//   import {setStore,getStore,removeStore} from '../../../util/storage'
  import getD from '~/store/ajaxAPI/getData'
  import tool from '~/assets/lib/tool'
  import CryptoJS from 'crypto-js'
  import { mapState,mapActions,mapGetters} from 'vuex';
	import {loginDialog_scanIng , loginDialog_qqLogin,loginDialog_wxAccredit,loginDialog_allowWeiboLogin} from '~/store/ajaxAPI/vueDynamicParams.js';
	import {ecPort} from "~/store/ajaxAPI/perPort.js";
  export default{
      data(){
          return {
            userMesg: '',       //用户登陆后系统信息
            loginForm: {
              Mobile:'',
              password: '',
              isBackLogin: true,  //记住登录状态后台使用加密后的密码
            },
            scanisShow: false,  //切换扫码显示
            scanisSuccess: true,//扫码是否成功
            scanImg:'',//生成扫码二维码
            isChooseQQ:false,
            newTel:"", //客户修改手机号后新的手机号
            safeCenter:false,//判断是否从安全中心过来的
          }
      },

      asyncData({store}) {
        return { isServer: process.server ,authUser: store.state.authUser} //判断来自客户端还是服务端
      },



     mounted(){
        this.token = tool.loadFromLocal('CustomerMesg','ALL')  ; // token存在表示已经登陆
       //检查并自动登录
      //  this._autoLogin();
       if(this.isServer && this.authUser == null){ //当来自服务器端 且 登录状态为0 删除本地存储
          tool.removeLocal("CustomerMesg") ;
          tool.delCookie();
          $('#login .loginframe .loginForm').css('transform',"translateX("+ 0 +"%)");
          $('#login .loginframe .loginSuccessed').css('left',100+'%');
       }
       
       //当cookie不存在时删除本地信息
       if(!tool.getSSOCookie()){
       		getD.loginOut()
       		.then((res)=>{
				this.lognOut_X();
			})
          	$('#login .loginframe .loginForm').css('transform',"translateX("+ 0 +"%)");
          	$('#login .loginframe .loginSuccessed').css('left',100+'%');
       }

    //    this._autoLogin();
       //监听topState退出状态
      this.$eventHandle.$on('get-login',(val)=>{
        if(!val){
          $('#login .loginframe .loginForm').css('transform',"translateX("+ 0 +"%)");
          $('#login .loginframe .loginSuccessed').css('left',100+'%');
        /* removeStore('CustomerMesg');
          removeStore('userCompanyRegTokenKey');*/
        }
      });
      // 客户修改手机号后自动填充到input框
      var Tel = this.$route.query.telphone;
      if(Tel){
        this.newTel = Tel;
        this.safeCenter = true;
      }else{
        return;
      }
     // console.log(  "loginInfo" ,this.loginInfo)

     },
     computed:{
       ...mapGetters({
          loginInfo:'login/login/loginInfo',
      })
     },
     methods:{
       ...mapActions(
        {
          "request_login":"login/login/request_login",
          'loginDVisible':'loginDVisible',
          'lognOut_X':'lognOut_X'
        }
      ),
       topStatePro(){
         // this.$emit('getTopStatePro')
       },
       //路由跳转
       toRouter(path){
         this.$router.push(path)
       },
       sacanSwitch(){//扫码登录

         this.scanisShow =! this.scanisShow;
         var that = this;
         //console.log(  this.scanisShow  )
          var params = {
                  params :{
                     id:''
                  }
                }
         if(  !this.token ){

             getD.getCode(params).then((res)=>{
                 //that.scanImg ="http://112.74.135.230:3215/OpenPlatform/GetLoginQRCodeImage?id="+res.data.Id;
                 that.scanImg =`${loginDialog_scanIng}/OpenPlatform/GetLoginQRCodeImage?id=${res.data.Id}`;
                let params = {
                  params :{
                     id:res.data.Id
                  }
                }
               if(!res.data.IsScan){//IsScan :true  表示已经扫码
                    //开启定时器自动检测是否手机app 有扫码
                     setTimeout(()=>{
                          that.scanRecursion(params);
                     },3000)
               }
             });
         }
       },
       scanRecursion(params){//扫码递归
            getD.getCode(params).then((res)=>{
                //console.log(res.data.Id,'递归二维码',   res.data.Data   );
               // if(!res.data.IsScan   ){//IsScan :true  表示已经扫码
                    //开启定时器自动检测是否手机app 有扫码
                     if(  res.data.Data == null ){//判断是否返回token
                       setTimeoutIdLogin =   setTimeout(()=>{
                            //console.log("递归")
                            this.scanRecursion(params);
                       },3000)
                     }else{
                        //console.log("结束",res.data.Data);
                        let dataArr = res.data.Data.split("|");
                        this.loginForm.Mobile = dataArr[0];
                        this.loginForm.password = dataArr[1];
                        this.onSubmitLogin(true);
                        return
                     }
               // }

             });
       },
       //登录提交
       onSubmitLogin(flag){
        let  passwordEncrypt =  CryptoJS.AES.encrypt(this.loginForm.password, '59964e5d540e446cf98bc2af78a2ea58');//密码加密
        if(!flag){
          var params = {
              LoginName: this.loginForm.Mobile,
              Password: encodeURI(passwordEncrypt.toString()),
              openSSL: true,
            }
            getD.login(params)
            .then((res) => {
                this.scanisShow = flag;   //隐藏扫码登录
                $('#login .loginframe .loginForm').css('transform',"translateX("+ -110 +"%)");
                $('#login .loginframe .loginSuccessed').css('left',5+'%');
                //触发空实例的自定义事件
                this.$eventHandle.$emit('get-login',true);
                this.loginDVisible(res);// 发送store/index.js 共享登录
                this.$message({
                  message: '登录成功',
                  type: 'success',
                  });

                clearTimeout(setTimeoutIdLogin );//关闭模态化窗口调用登陆的定时器
                setTimeoutIdLogin = null

                // 监听代付页面  是否登录
                if(this.$route.query.otherPay == 1){
                  this.$router.push({path:'/cart/newPayment',query:{type:1}});
                  return;
                }

                // 监听活动页面  是否登录
                if(this.$route.query.activities == 1){
                  this.$router.push('/home/activities');
                  return;
                }

                if(this.$route.query.checkEmail == 1){
                  this.$router.push("/account_setting/checkEmail?id=" + this.$route.query.checkEmailId);
                  return;
                }

                // 监听代付页面 topState
                if(this.$route.query.prepayment == 1){
                  let paramsObj = tool.loadFromLocal("prepayment","ALL").orderNum;
                  // console.log("paramsObj",paramsObj)
                  this.$router.push({path:'/cart/prePayment',query:{orderNum:paramsObj}});
                  return;
                }
                
                // 监听pc商城电子合同页面
                if(this.$route.query.ec == 1){
                  //设置cookie
					let obj = tool.loadFromLocal("CustomerMesg","ALL");
					tool.addCookie(JSON.stringify(obj),24);
					location.href = `${ecPort}`;
                  	return;
                }
                
                // 监听pc电子合同页面
                if(this.$route.query.url){
                	//设置cookie
					let obj = tool.loadFromLocal("CustomerMesg","ALL");
					tool.addCookie(JSON.stringify(obj),24);
                	let url = decodeURIComponent(this.$route.query.url);
                	location.href = url;
                }
                
                this.$router.push('/')
            })
            .catch((error)=>{
              // console.log(error);
              this.$message({
                message: error.data.message,
                type: 'error',
              });
          })
          .catch((error)=>{
            // console.log(error);
            this.$message({
              showClose: true,
              message: '登录失败，请检查账号密码输入是否正确',
              type: 'error',
              duration: 5000
            });
          })
          return
        }
        // if(flag){
          //   this.$_post('/Customer/Login',{LoginName: this.loginForm.Mobile,Password:encodeURI(passwordEncrypt.toString()),isBackLogin:true,openSSL:true,datatype:'json'},(res)=>{
          //       this.scanisShow = flag;   //隐藏扫码登录
          //    $('#login .loginframe .loginForm').css('transform',"translateX("+ -110 +"%)");
          //    $('#login .loginframe .loginSuccessed').css('left',5+'%');
          //    //触发空实例的自定义事件
		      // 	this.$eventHandle.$emit('get-login',true);
          //    this.$message({
          //      message: '登录成功',
          //      type: 'success',
          //    });
          //    this.$router.push('/')
          //    //存储用户自动登录账号信息
          //   //  setStore('CustomerMesg',res);
          //  },(err)=>{
          //    this.$message({
          //      showClose: true,
          //      message: '登录失败，请检查账号密码输入是否正确',
          //      type: 'error',
          //      duration: 5000
          //    });
          //  })
          if(this.safeCenter == true){
            var datas = {
              LoginName: this.newTel,
              Password: encodeURI(passwordEncrypt.toString()),
              openSSL: true,
            }
            getD.login(datas)
            .then((res) => {
              this.scanisShow = flag;   //隐藏扫码登录
              $('#login .loginframe .loginForm').css('transform',"translateX("+ -110 +"%)");
              $('#login .loginframe .loginSuccessed').css('left',5+'%');
              //触发空实例的自定义事件
              this.$eventHandle.$emit('get-login',true);
              this.loginDVisible(res);// 发送store/index.js 共享登录
              this.$message({
                message: '登录成功',
                type: 'success',
                });


              clearTimeout(setTimeoutIdLogin );//关闭模态化窗口调用登陆的定时器
              setTimeoutIdLogin = null
              this.$router.push('/')
            })
            .catch((error)=>{
              this.$message({
                showClose: true,
                message: '登录失败，请检查账号密码输入是否正确',
                type: 'error',
                duration: 5000
              });
            })
          }else{
            var params = {
              LoginName: this.loginForm.Mobile,
              Password: encodeURI(passwordEncrypt.toString()),
              openSSL: true,
              isBackLogin:true,
            }
            getD.login(params)
            .then((res) => {
                this.scanisShow = flag;   //隐藏扫码登录
                $('#login .loginframe .loginForm').css('transform',"translateX("+ -110 +"%)");
                $('#login .loginframe .loginSuccessed').css('left',5+'%');
                //触发空实例的自定义事件
                this.$eventHandle.$emit('get-login',true);
                this.loginDVisible(res);// 发送store/index.js 共享登录
                this.$message({
                  message: '登录成功',
                  type: 'success',
                  });
                clearTimeout(setTimeoutIdLogin );//关闭模态化窗口调用登陆的定时器
                setTimeoutIdLogin = null

                this.$router.push('/')
            })
            .catch((error)=>{
              this.$message({
                message: error.data.message,
                type: 'error',
              });
          })
          .catch((error)=>{
            this.$message({
              showClose: true,
              message: '登录失败，请检查账号密码输入是否正确',
              type: 'error',
              duration: 5000
            });
          })
          return
          }
       },
        //退出登录
        outLogin(){
           //alert('退出成功')
             tool.removeLocal("CustomerMesg");
             tool.delCookie();
        },
        //自动登录逻辑 $.parseJSON
      //  _autoLogin(){
      //    let localCustomerMsg  = tool.loadFromLocal('CustomerMesg',"ALL").Token;
      //    if(localCustomerMsg){
      //      var params = {
      //        LoginName: localCustomerMsg.Mobile,
      //        Password: localCustomerMsg.Password,
      //        isBackLogin: true,
      //        datatype:'json'
      //      }
      //      getD.login(params).then((res) => {
      //        $('#login .loginframe .loginForm').css('transform',"translateX("+ -110 +"%)");
      //        $('#login .loginframe .loginSuccessed').css('left',5+'%');
      //        this.$message({
      //          message: '你已设置自动登录，系统将为您跳转到首页',
      //          type: 'success',
      //        });
      //        setTimeout(()=>{
      //          this.$router.push('/')
      //        },3000);
      //      })
      //    }else {
      //      return
      //    }
      //  },
      qqLogin(){
				let appId = "101448991";
				let sercet = "c87389b2ee2333c80915e7bc0a216951";
				//that.scanImg =`${loginDialog_scanIng}/OpenPlatform/GetLoginQRCodeImage?id=`+res.data.Id;
				let redirectUri = encodeURI(`${loginDialog_qqLogin}/loginAndRegister/otherLoginBind?type=0`); //这里要加上http://  不然会报错
				// let redirectUri = encodeURI('http://www.wqbol.com/loginAndRegister/otherLoginBind?type=0'); //这里要加上http://  不然会报错
				window.location.href = `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=${appId}&redirect_uri=${redirectUri}&state=df34535hg5657j`

			},
			//微信授权登录
			wxAccredit(){
				//console.log('微信授权登录')
				let redirectUri = encodeURI(`${loginDialog_wxAccredit}/loginAndRegister/otherLoginBind?type=1`); //这里要加上http://  不然会报错
				//let redirect_uri = 'http://www.wqbol.com/loginAndRegister/otherLoginBind?type=1';
				let appid = 'wxc4584fc463354878';
				window.location.href = `https://open.weixin.qq.com/connect/qrconnect?appid=${appid}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect`;

			},
			//微博登录授权
			allowWeiboLogin(){
				let AppKey = 3687585485;
				let calbackUrl = encodeURI(`${loginDialog_allowWeiboLogin}/loginAndRegister/otherLoginBind?type=2`); //授权后 跳回的页面
				// let calbackUrl = 'http://www.wqbol.com/loginAndRegister/otherLoginBind?type=2' ;
				window.location.href = `https://api.weibo.com/oauth2/authorize?client_id=${AppKey}&redirect_uri=${calbackUrl}&response_type=code`;
			},
       changeAccount(){
        this.safeCenter = false;
       }
     },
     beforeDestroy(){
        clearTimeout(setTimeoutIdLogin);//清楚登陆定时器
     },
     components:{
      topState,
      publicBottom
     }
  }
</script>

<style lang="less" type="stylesheet/css" scoped>
@import "login.less";

</style>
