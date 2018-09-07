<template>
	<div id="otherLoginBind">
    <div class="c-header">
      <div class="c-hdTopWrap">
        <topState></topState>
        <div class="c-headerBotoom">
          <div class="c-content">
            <div class="logo">
              <img src="~assets/images/tabBar/wqb.png" alt="logo" @click="toRouter('/')">
              <span>第三方登录绑定</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="formWrap">
      <div class="forHeader">
        <div class="headImg" v-show="temp_type == 0">
          <!-- <img src="~assets/images/product/usertx.jpg" alt=""> -->
          <img :src="getAccessToken.figureurl_qq_1" alt="">
          {{getAccessToken.nickname}}&nbsp;&nbsp;您好，欢迎来到微企宝
        </div>
        <div class="headImg" v-show="temp_type == 1">
          <!-- <img src="~assets/images/product/usertx.jpg" alt=""> -->
          <img :src="getAccessToken.headimgurl" alt="">
          {{getAccessToken.nickname}}&nbsp;&nbsp;您好，欢迎来到微企宝
        </div>
        <div class="headImg" v-show="temp_type == 2">
          <!-- <img src="~assets/images/product/usertx.jpg" alt=""> -->
          <img :src="getAccessToken.profile_image_url" alt="">
          {{getAccessToken.screen_name}}&nbsp;&nbsp;您好，欢迎来到微企宝
        </div>
        <p class="bindPhone">绑定手机号</p>
      </div>
      <!--用户信息绑定-->
      <el-form :model="bindForm" status-icon :rules="bindRules" ref="bindForm" label-width="100px" class="registerForm">
        <el-form-item label="手 机 号 码" prop="Mobile">
          <el-input  auto-complete="off" placeholder="请输入手机号 "  v-model="bindForm.Mobile"></el-input>
        </el-form-item>
        <el-form-item label="手机验证码"  prop="VerifyCode" class="VerifpayCode" >
          <el-input type="text"  v-model="bindForm.VerifyCode" placeholder="请输入验证码"></el-input>
          <span class="pullnumber" @click="getVerifyCode()">获取验证码</span>
        </el-form-item>
        <p >
          <input type="checkbox" v-model="bindForm.ischecked">阅读并同意
					<a href="#" style="color: #359af8" @click="dialogVisible = true ">《微企宝用户注册协议》</a>
        </p>
        <div class="el-form-item submit" @click="submitForm('bindForm')">立即绑定</div>
      </el-form>
    </div>
    <div class="c-bottom">
       <publicBottom></publicBottom>
     </div>
    <!--注册协议弹窗层-->
    <el-dialog title="微企宝用户注册协议和隐私政策" :visible.sync="dialogVisible">
      <div class="contentText" style="height: 450px; overflow: auto">
        &nbsp;&nbsp;&nbsp;&nbsp;"本协议是您与微企宝商城网站所有者（以下简称为“微企宝商城”）之间就微企宝商城网站服务等相关事宜所订立的契约，请您仔细阅读本注册协议，您点击“同意以下协议，提交”按钮后，本协议即构成对双方有约束力的法律文件。<br>
        第1条 本站服务条款的确认和接纳 <br>
        &nbsp;&nbsp;&nbsp;1.1本站的各项电子服务的所有权和运作权归微企宝商城所有。用户同意所有注册协议条款并完成注册程序，才能成为本站的正式用户。用户确认：本协议条款是处理双方权利义务的契约，始终有效，法律另有强制性规定或双方另有特别约定的，依其规定。<br>
        &nbsp;&nbsp;&nbsp;1.2用户点击同意本协议的，即视为用户确认自己具有享受本站服务、下单购物等相应的权利能力和行为能力，能够独立承担法律责任。<br>
        &nbsp;&nbsp;&nbsp;1.3如果您在18周岁以下，您只能在父母或监护人的监护参与下才能使用本站。<br>
        &nbsp;&nbsp;&nbsp;1.4微企宝商城保留在中华人民共和国大陆地区法施行之法律允许的范围内独自决定拒绝服务、关闭用户账户、清除或编辑内容或取消订单的权利。<br>
        第2条 本站服务<br>
        &nbsp;&nbsp;&nbsp;2.1本站通过互联网依法为用户提供互联网信息等服务，用户在完全同意本协议及本站规定的情况下，方有权使用本站的相关服务。<br>
        &nbsp;&nbsp;&nbsp;2.2用户必须自行准备如下设备和承担如下开支：<br>
        &nbsp;&nbsp;（1）上网设备，包括并不限于电脑或者其他上网终端、调制解调器及其他必备的上网装置；<br>
        &nbsp;&nbsp;（2）上网开支，包括并不限于网络接入费、上网设备租用费、手机流量费等。<br>
        第3条 用户信息<br>
        &nbsp;&nbsp;&nbsp;3.1用户应自行诚信向本站提供注册资料，用户同意其提供的注册资料真实、准确、完整、合法有效，用户注册资料如有变动的，应及时更新其注册资料。如果用户提供的注册资料不合法、不真实、不准确、不详尽的，用户需承担因此引起的相应责任及后果，并且微企宝商城保留终止用户使用微企宝商城各项服务的权利。<br>
        &nbsp;&nbsp;&nbsp;3.2用户在本站进行浏览、下单等活动时，涉及用户真实姓名/名称、通信地址、联系电话、电子邮箱等隐私信息的，本站将予以严格保密，除非得到用户的授权或法律另有规定，本站不会向外界披露用户隐私信息。<br>
        &nbsp;&nbsp;&nbsp;3.3用户注册成功后，将产生用户名和密码等账户信息，您可以根据本站规定改变您的密码。用户应谨慎合理的保存、使用其用户名和密码。用户若发现任何非法使用用户账号或存在安全漏洞的情况，请立即通知本站并向公安机关报案。<br>
        &nbsp;&nbsp;&nbsp;3.4用户同意，微企宝商城拥有通过邮件、短信电话等形式，向在本站注册、购物用户、收货人发送订单信息、促销活动等告知信息的权利。<br>
        &nbsp;&nbsp;&nbsp;3.5用户不得将在本站注册获得的账户借给他人使用，否则用户应承担由此产生的全部责任，并与实际使用人承担连带责任。<br>
        第4条 用户依法言行义务<br>
        本协议依据国家相关法律法规规章制定，用户同意严格遵守以下义务：<br>
        &nbsp;&nbsp;&nbsp;（1）不得传输或发表：煽动抗拒、破坏宪法和法律、行政法规实施的言论，煽动颠覆国家政权，推翻社会主义制度的言论，煽动分裂国家、破坏国家统一的的言论，煽动民族仇恨、民族歧视、破坏民族团结的言论；<br>
        &nbsp;&nbsp;&nbsp;（2）从中国大陆向境外传输资料信息时必须符合中国有关法规；<br>
        &nbsp;&nbsp;&nbsp;（3）不得利用本站从事洗钱、窃取商业秘密、窃取个人信息等违法犯罪活动；<br>
        &nbsp;&nbsp;&nbsp;（4）不得干扰本站的正常运转，不得侵入本站及国家计算机信息系统；<br>
        &nbsp;&nbsp;&nbsp;（5）不得传输或发表任何违法犯罪的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、伤害性的、庸俗的，淫秽的、不文明的等信息资料；<br>
        &nbsp;&nbsp;&nbsp;（6）不得传输或发表损害国家社会公共利益和涉及国家安全的信息资料或言论；<br>
      </div>
      <div class="towBtn">
        <el-button type="info" @click="toRouter('/')">取消</el-button>
        <el-button type="danger" @click="agreeMent()">同意并注册</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import topState from "../../components/common/topState"
  import publicBottom from "../../components/common/publicBottom"
  // import {setStore,getStore} from '../../../util/storage'
  import tool from "../../assets/lib/tool"
  import getD from "../../store/ajaxAPI/getData"
  import { mapState,mapActions,mapGetters} from 'vuex';
	import { otherLoginBind_login } from '~/store/ajaxAPI/vueDynamicParams.js';
  import CryptoJS from 'crypto-js'




// console.log(mapActions)
  export default{
    data() {//表单校验
      var Mobile = (rule, value, callback) => {
        let MobileReg = /^[1][3,4,5,7,8][0-9]{9}$/;
          if (!value) {
            return callback(new Error('手机号不能为空'));
          }
          setTimeout(()=>{
            if (!Number(value)) {
              callback(new Error('格式错误，请输入数字值'));
            } else if(!MobileReg.test(value)){
              callback(new Error('格式错误，请输入正确手机号'));
            }else {
              callback();
            }
          },1000)
        };
      var VerifyCode = (rule, value, callback) => {
          let VerifyCodeReg = /^[0-9]{6}$/ ;
        if (!value) {
          return callback(new Error('验证码不能为空'));
        }else if(!VerifyCodeReg.test(value)){
          return callback(new Error('请检查格式，验证码必须6位数字'));
        }else {
          callback();
        }
      };
      return {
        labelPosition: 'top',
        dialogVisible: false,      //注册协议弹窗
        //VerifyCodeNow: '',  //获取到的当前验证码
        bindForm: {
            Mobile:'',
            VerifyCode: '',
            ischecked: true,
        },
        bindRules: {
          Mobile: [
            { validator: Mobile, trigger: 'blur' }
          ],
          VerifyCode: [
            { validator: VerifyCode, trigger: 'blur' }
          ],
        },
        getAccessToken:'',//全局存储 腾讯的token
        qqOpenId:"",
        temp_type:"", //判断获取的是哪个类型
        onlyMark:"", //传给.net后台的用户唯一标示
      };
    },
    beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建

       next(vm=>{
        // //console.log("l路由钩子")
       })
    },
    mounted() {
      // console.log("mounted", this.getSaleList)
      this.sendNET_ACCESS_TOKEN();
      this.getSaleList()
    },
    methods: {
        ...mapActions({
          "getSaleList":"home/home/getSaleList",
          "loginDVisible":"loginDVisible",
        }),
        //路由跳转
        toRouter(path){
            this.$router.push(path)
        },
        //同意协议
        agreeMent(){
          this.dialogVisible = false;
          this.bindForm.ischecked = true;
        },
        //获取验证码
        getVerifyCode(){
          if(!this.bindForm.Mobile){//没有手机号码不允许获取验证码
            return
          }
          if(this.codeSending){
            return;
          }
          this.codeSending =true;
          let loadingtime = 120;  //等待重新获取的时间
          let sendTiemr = setInterval(()=>{
            loadingtime --;
            if(loadingtime <= 0){
              $('.pullnumber').html('重新获取');
              this.codeSending =false;
              clearInterval(sendTiemr);
            }else {
              $('.pullnumber').html(loadingtime +'s');
            }
          },1000);
          //发送请求获取验证码
          getD.getVerification({mobile: this.bindForm.Mobile, dataType:"json"}).then(()=>{
            this.$message({
              message: '恭喜您，成功获取手机验证码',
              type: 'success'
            });
          }).catch((error)=>{

          })
        },
        //用户点击立即绑定  表单提交
        submitForm(formName) {

          if(this.temp_type == undefined){
            return
          }

          let tempData = {
                type: this.temp_type,
                openId:this.onlyMark,//
                accessToken:  this.getAccessToken.access_token,//
                LoginName:this.bindForm.Mobile,//
                VerifyCode: this.bindForm.VerifyCode,//
                regSource:1,//来源
                dataType:"json",
           }

          if(this.temp_type == 0) {
            this.onlyMark =  this.getAccessToken.openid;
          }else if(this.temp_type == 1) {
            this.onlyMark =  this.getAccessToken.unionid;
          }else if(this.temp_type == 2){
            this.onlyMark =  this.getAccessToken.uid;
          }
          tempData.openId = this.onlyMark;

           // //console.log('给后台参数2222',tempData);
          //提交校验
          this.$refs[formName].validate((valid) => {
            if(!this.bindForm.ischecked){
              this.$message.error('请同意《微企宝用户注册协议》');
              return
            }
              if (valid && this.bindForm.ischecked) {
                //APP绑定第三方平台
                  getD.bindTelephone(tempData).then((res)=>{
                    // //console.log("APP绑定第三方平台QQ",res);
                    //绑定成功跳转
                    
                    //调用登录接口防止刷新丢失登录信息问题
                    let  passwordEncrypt =  CryptoJS.AES.encrypt(res.data.Password, '59964e5d540e446cf98bc2af78a2ea58');//密码加密
                    var loginParams = {
						LoginName: res.data.Mobile,
						Password:encodeURI(passwordEncrypt.toString()),
						isBackLogin:true,
						openSSL:true,
					}
					getD.login(loginParams)
					.then((result)=>{
						this.loginDVisible(result);// 发送store/index.js 共享登录
	                    this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
	                      loadingInstance.close();
	                    });
	                    this.$router.push('/');
					})
                  }).catch((error)=>{
                    // //console.log(error,'APP绑定第三方平台QQerror');
                    if(error.data.msg == "该账号已被绑定！"){
                      this.$message.error('该账号已被绑定喔');
                    }else if(error.data.msg == "手机验证码输入错误，请重新输入") {
                      this.$message.error('手机验证码输入错误，请重新输入');
                    }else if(error.data.msg == "验证码已过期，请重新获取") {
                      this.$message.error('验证码已过期，请重新获取');
                    }
                  })

              }else {
                this.$message.error('输入有误，请检查填写信息');
                return false;
              }
          })

        },
        //清空表单
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        getCode(){//获取验证码
          let data = {
            mobile:this.bindForm.Mobile,
            dataType:"json",
          }
          getD.getVerification(data).then((res)=>{
            // //console.log("res验证码",res);
          })
        },
        enterSubmit(){



        },
         //自动调用微信  QQ 微博授权传access_token 给后台
        sendNET_ACCESS_TOKEN(){


           let error_code_SINA = tool.getQueryString('error_code');
           var  loadingInstance =  this.$loading({ fullscreen: true });//loading 加载样式
           let CODE = tool.getQueryString('code');
           this.temp_type = tool.getQueryString('type');
            //console.log(error_code_SINA);
            if(error_code_SINA == 21330){
              // alert("新浪用户授权取消");
              this.$router.replace('/loginAndRegister/login');
              return
            }



          // //console.log("this.temp_type",this.temp_type);

          if(!CODE || CODE == null){
            this.$router.replace('/loginAndRegister/login');
            return
          };



          	const success = function(tempData){//获取 腾讯 授权回调

                this.getAccessToken = tempData;

                // //console.log("tempData",tempData);
                //判断是否授权失败
                let isError =  Object.keys(tempData).find((items)=>{
                    // 分别为qq、微信、微博的失败回调函数
                    return ( items  == 'errcode' ||  items  == 'error_code'  || items =='error')
                });
                //console.log(isError,'1222222222222')
                if(isError != undefined){ //说明腾讯接口报错
                    // //console.log(loadingInstance)

                    this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                      loadingInstance.close();
                    });
                    this.$message.error('未授权,请绑定手机');
                    this.$router.push('/loginAndRegister/login')


                    //重新返回登录页面
                    // return
                }else{
                    this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭 腾讯授权成功
                      loadingInstance.close();
                    });
                     //触发空实例的自定义事件
                    // that.$eventHandle.$emit('otherlogin',true);
                };


                if(this.temp_type == 0) {
                    this.onlyMark = tempData.openid;
                }else if(this.temp_type == 1) {
                    this.onlyMark = tempData.unionid;
                }else if(this.temp_type == 2){
                    this.onlyMark = tempData.uid;
                }
                let data  = {
                      type:this.temp_type , // 必填：平台类型（0=腾讯QQ，1=微信，2=新浪微博）
                      openId:this.onlyMark,
                      accessToken:tempData.access_token,
                      dataType:"json",
                }
                //     //把qq token传递给后台

                getD.sendNET_ACCESS_TOKEN(data).then((res)=>{//成功回调 表示用户已经绑定第三方
                	//调用登录接口防止刷新丢失登录信息问题
                    let  passwordEncrypt =  CryptoJS.AES.encrypt(res.data.Password, '59964e5d540e446cf98bc2af78a2ea58');//密码加密
                    var loginParams = {
						LoginName: res.data.Mobile,
						Password:encodeURI(passwordEncrypt.toString()),
						isBackLogin:true,
						openSSL:true,
					}
					getD.login(loginParams)
					.then((result)=>{
						this.loginDVisible(result);// 发送store/index.js 共享登录
	                    this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
	                      loadingInstance.close();
	                    });
	                    this.$router.push('/');
					})
               }).catch((error)=>{//失败回调 表示用户已经绑定第三方
                  // //console.log(error,'errorerrorerrorerror');
                    if(error.data.msg  == '没有绑定账号'){
                        //提示绑定
                          tool.saveToLocal('CustomerMesg',null);
                          this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                            loadingInstance.close();
                          });
                          this.$message.error('未授权,请绑定手机');
                    }
                   	loadingInstance.close();
                });
          	}.bind(this);//success 回调结束


            let obj = {
              method:'post',
              code:CODE,
              type:this.temp_type,
              success:success,
              // url:'http://120.78.225.141:27078/share/QuickLogin'
              url:`${otherLoginBind_login}/share/QuickLogin`
            };
            // Vue.prototype.wxAuth = function({method,code,type,success,url},WXJSSDK=WXJSSDKOBJ){
            let getAccess_token = this.wxAuth(obj);//获取微信授权access_token

        },
    },
    components:{
      topState,
      publicBottom
    }
  }
</script>

<style lang="less" type="stylesheet/css" >
@import "otherLoginBind.less";
</style>
