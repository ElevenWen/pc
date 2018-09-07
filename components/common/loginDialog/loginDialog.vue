<template>
  <el-dialog class="loginDialog"
             title="登录"
             :visible.sync="loginVisible"
             width="680px"
             :before-close="closeLoginDialog"
             :close-on-click-modal="enableClose"
             :close-on-press-escape="enableClose"
             center>
    <div class="loginFormWrap">
      <el-form :model="loginForm" class="loginForm">
        <div class="username">
          <label for=""><img class="icon" src="~assets/images/loginAndRegister/portrait.png" alt="">
          </label>
          <input type="text" v-model="loginForm.Mobile" placeholder="账号">
        </div>
        <div class="password">
          <label for=""><img class="icon" src="~assets/images/loginAndRegister/lock.png" alt="">
          </label>
          <input type="password" v-model="loginForm.password" placeholder="密码" @keyup.enter="onSubmitLogin()">
        </div>
        <p>
          <input type="checkbox" v-model="loginForm.isBackLogin">自动登录
            <a href="#" @click="toRouter('/loginAndRegister/forgetPassword')">忘记密码</a>
        </p>
        <div class="button" @click="onSubmitLogin(false)">登录</div>
      </el-form>
      <div class="toList">
        <a @click="qqLogin"><img src="~assets/images/tabBar/QQ.png" alt="" >QQ</a>
        <a @click="wxAccredit"><img src="~assets/images/tabBar/WeChat.png" alt="">微信</a>
        <a @click="allowWeiboLogin()"><img src="~assets/images/tabBar/microblog.png" alt="">微博</a>
      </div>
    </div>
    <div class="scanCode">
      <div class="scanCodeImg">
        <img :src="scanImg" alt="" v-if="scanImg">
        <div class="getScanIMg" v-else="scanImg" @click="sacanSwitch">
          
        </div>
      </div>
      <p>打开微企宝App<br>扫描二维码登录</p>
    </div>
    <p class="toRegister"><span class="ontoRegister" @click="toRouter('/loginAndRegister/register')">还没有账号？立即注册</span></p>
  </el-dialog>
</template>

<script>
  var setTimeoutIdLogin = null;
  import { mapState,mapActions,mapGetters} from 'vuex';
  import getD from "~/store/ajaxAPI/getData.js";
  import CryptoJS from 'crypto-js'
  import tool from '~/assets/lib/tool.js'
  import { loginDialog_scanIng ,  loginDialog_qqLogin, loginDialog_wxAccredit,  loginDialog_allowWeiboLogin }  from  '~/store/ajaxAPI/vueDynamicParams.js'
  
	export default {
	    data() {
		    return {
          loginForm: {
            Mobile:'',
            password: '',
            isBackLogin: '',  //记住登录状态后台使用加密后的密码  :visible.sync="loginVisible"
          },
          enableClose: false,
          scanisSuccess: true,//扫码是否成功
          scanImg:'',         //生成扫码二维码
          token:'',//判断本地是否有token 有表示已经登陆停止二维码
		    }
      },
      props:{
            source:{//
                
            },
          },
	    mounted(){
        this.sacanSwitch()
        
        this.token = tool.loadFromLocal('CustomerMesg','ALL')  ; // token存在表示已经登陆\
        // console.log(this.token,'11111111111111')
	    },
	    computed: {
        loginVisible: function(){
          return this.$store.getters.loginDialogVisible;
        }
      },
	    methods:{
        ...mapActions({
          'loginDVisible':'loginDVisible'
        }),
        //路由跳转
        toRouter(path){
          this.$router.push(path)
        },
        //彈窗關閉
        closeLoginDialog(){
          //注销定时器
          clearTimeout(setTimeoutIdLogin);
          setTimeoutIdLogin  = null ;//释放
          //提弹出窗登录界面
          this.$store.dispatch('loginDialogVisible');

        },
        //二维码登录获取
        sacanSwitch(){
          //二维码登录获取
        
          var that = this;
          var params = {
            params :{
              id:''
            }
          }  

           if( !this.token ){
              getD.getCode(params).then((res)=>{
                // console.log('二维码二维码',that.scanImg,res.data.IsScan)
                //console.log(res.data.Id,'二维码');
                // that.scanImg ="http://112.74.135.230:3215/OpenPlatform/GetLoginQRCodeImage?id="+res.data.Id;
                that.scanImg =`${loginDialog_scanIng}/OpenPlatform/GetLoginQRCodeImage?id=${res.data.Id}`; 

                
                let params = {
                  params :{
                    id:res.data.Id
                  }
                }
                
                if(!res.data.IsScan  || !this.token  ){//IsScan :true  表示已经扫码
                  //开启定时器自动检测是否手机app 有扫码
                  setTimeout(()=>{
                    // console.log('22',params)
                    that.scanRecursion(params);
                  },3000)
                }
              });
           }
          //console.log('扫码登录图片数据',this.scanImg);
        },
        scanRecursion(params){//扫码递归
          getD.getCode(params).then((res)=>{
          //  var params= params;
            if(  res.data.Data == null ){//判断是否返回token
              setTimeoutIdLogin  =    setTimeout(()=>{
                this.scanRecursion(params);
              },3000)
            }else{


              //console.log( ' res.data.Data', res.data.Data)
              let dataArr = res.data.Data.split("|");

              this.loginForm.Mobile = dataArr[0];
              this.loginForm.password = dataArr[1];
              this.onSubmitLogin(true);
              return
            }
          });
        },
        //登录提交
        onSubmitLogin(flag){
          var  passwordEncrypt =  CryptoJS.AES.encrypt(this.loginForm.password, '59964e5d540e446cf98bc2af78a2ea58');//密码加密
          if(!flag){
              var params = {
                LoginName: this.loginForm.Mobile,
                Password:encodeURI(passwordEncrypt.toString()),
                isBackLogin:false,//用加密后的密文登陆
                openSSL:true,
              }

          }else{
             var params = {
              LoginName: this.loginForm.Mobile,
              Password:encodeURI(passwordEncrypt.toString()),
              isBackLogin:true,//用加密后的密文登陆
              openSSL:true,
            }
          } 

          getD.login(params).then((res)=>{
            // console.log(res);
            this.$message({
              message: '恭喜，登录成功',
              type: 'success',
              duration: 2000
            });
            this.loginDVisible(res);// 发送store/index.js 共享登录
            
            clearTimeout(setTimeoutIdLogin );//关闭模态化窗口调用登陆的定时器
            setTimeoutIdLogin  = null ;//释放
            this.$store.dispatch('loginDialogVisible');//关闭模态窗口
            this.$eventHandle.$emit('get-login',true);
            if(this.source.title=='新闻详情'||this.source=='商品详情'){
               window.location.reload()
            }
          },(error)=>{
//          console.log(error)
              this.$message({
                  showClose: true,
                  message: error.code == 403 ? '请检查账号和密码是否一致' : error.data.message,
                  type: 'error',
                  duration: 2000
              });
          })
        },
        /*三方登录*/
        //qq授权登录
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

	    }

	}
</script>

<style lang="less" type="stylesheet/css" scoped>
	.loginDialog /deep/ .el-dialog__body{
		padding: 25px 0px 30px;
		overflow: hidden;
	}
  .loginDialog{
    font-family: MicrosoftYaHei;
    .el-dialog__header{
      height: 50px;
      line-height: 50px;
      padding-top: 0;
      background-color: #fcfcfd;
      box-shadow: inset 0px -1px 0px 0px
      rgba(0, 0, 0, 0.08);
      .el-dialog__title{
        font-size: 18px;
      }
      .el-dialog__headerbtn{
        top: 15px;
      }
    }
    .el-dialog__body{
      overflow: hidden;
      padding: 25px 0px 30px;
      &>div{
          float: left;
          width: 340px;
          height: 340px;
        }
       /* 左边登录表单*/
      .loginFormWrap{
        border-right: 1px solid #E0E0E0;
        .loginForm{
          width: 90%;
          margin: 0 auto;
          transition: 0.5s;
        div{
          width: 100%;
          height: 42px;
          line-height: 42px;
          border-radius: 2px;
          border: solid 1px #dbdbdb;
          margin: 20px 0px;
          overflow: hidden;
        label{
          display: inline-block;
          width: 40px;
          height: 40px;
          background-color: #dbdbdb;
          text-align: center;
        img{
          vertical-align: middle;
        }
        }
        }
        p{
          position: relative;
        input{
          padding-left: 0;
          width: 16px;
          height: 16px;
          vertical-align: middle;
          margin-right: 5px;
        }
        a{
          position: absolute;
          top: 0;
          right: 0;
          font-family: PingFang-SC-Regular;
          font-size: 14px;
          color: #8c8c8c;
        }
        }
        .button{
          text-align: center;
          line-height: 42px;
          background: #ff3a04;
          font-family: MicrosoftYaHei;
          font-size: 16px;
          color: #fff;
          cursor: pointer;
        }
        label{
          position: absolute;
        }
        input{
          width: 100%;
          height: 96%;
          padding-left: 50px;
        }
        }
        .toList{
          display: flex;
          margin-top: 20px;
          a{
            flex: 1;
            img{
              vertical-align: middle;
              margin-right: 8px;
            }
            &:hover{
              cursor: pointer;
             }
          }
        }
      }
    /* 右边登录表单*/
      .scanCode{
        text-align: center;
        .scanCodeImg{
          margin: 20px auto;
          width: 165px;
          height: 156px;
          background: url("~assets/images/loginAndRegister/sacn_bg.png") no-repeat;
          .getScanIMg{
            text-align: center;
            width: 100%;
            height: 100%;
            line-height: 156px;
            color: #ffffff;
            background-color: rgba(0,0,0,.6);
            span{
              padding: 2px 5px;
              border-radius: 2px;
              background-color: #ff3a04;
              &:hover{cursor: pointer}
            }
          }
        }

      }
    /*弹窗底部*/
      .toRegister{
        display: block;
        float: left;
        position: relative;
        top: 30px;
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background-color: #fcfcfd;
        box-shadow: inset 0px 1px 0px 0px
        rgba(0, 0, 0, 0.08);
        color: #ff3a04;
        .ontoRegister{
          &:hover{
            cursor: pointer;
           }
        }
      }
    }

  }
</style>
