<template>
	<div id="forgetPassword">
    <div class="c-header">
      <div class="c-hdTopWrap">
        <topState></topState>
        <div class="c-headerBotoom">
          <div class="c-content">
            <div class="logo">
              <nuxt-link to="/" title="微企宝一站式企业服务平台">
                <img src="/images/logo.png" alt="微企宝深圳前海公司注册">
              </nuxt-link>
              <span>密码找回</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="formWrap">

      <!--用户基本信息1-->
      <el-form :model="registerForm" status-icon :rules="regformRules" ref="registerForm" label-width="100px" class="registerForm">
        <el-form-item label="手 机 号 码" prop="Mobile">
          <el-input  auto-complete="off" placeholder="请输入手机号 "  v-model="registerForm.Mobile"></el-input>
        </el-form-item>
        <el-form-item label="手机验证码"  prop="VerifyCode" class="VerifpayCode" >
          <el-input type="text"  v-model="registerForm.VerifyCode" placeholder="请输入验证码"></el-input>
          <span class="pullnumber" @click="getVerifyCode()">获取验证码</span>
        </el-form-item>
        <el-form-item label="设 置 密 码 " prop="password" class="password">
          <el-input type="password" v-model="registerForm.password" auto-complete="off" placeholder="建议至少使用两种字符组成"></el-input>
        </el-form-item>
        <p class="passwordDes"><span></span>建议使用字母、数字和符号两种及以上的组合，5-20个字符</p>
        <el-form-item label="确 认 密 码" prop="checkPass" class="checkPass">
          <el-input type="password" v-model="registerForm.checkPass" auto-complete="off" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <div class="el-form-item submit" @click="submitForm('registerForm')">确定</div>
      </el-form>

    </div>
    <!--公共底部-->
    <div class="c-bottom">
       <publicBottom></publicBottom>
     </div>
  </div>
</template>

<script>
  import topState from "../../components/common/topState"
  import publicBottom from "../../components/common/publicBottom"
  import CryptoJS from 'crypto-js'
  import tool from  '~/assets/lib/tool'
  import { mapState,mapActions,mapGetters} from 'vuex';
  import getData from '~/store/ajaxAPI/getData'

  var sendTiemr = null;
  export default{
    data() {
        //表单校验
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
      var password = (rule, value, callback) => {
        let passwordReg =  /([a-zA-Z0-9!@#$%^&*.()_?<>{}]){6,18}/;
        if (value === '') {
            callback(new Error('请输入密码'));
          } else if(!passwordReg.test(value) ) {
          callback(new Error('请输入6-18位密码'));
          }else{
          callback();
          }

      };
      var checkPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        stepActive: 1,
        codeSending: false,
        //VerifyCodeNow: '',  //获取到的当前验证码
        registerForm: {
            Mobile:'',
            VerifyCode: '',
            password: '',
            checkPass: '',
            companyName: '',
            creditCode: null,
        },
        regformRules: {
          Mobile: [
            { validator: Mobile, trigger: 'blur' }
          ],
          VerifyCode: [
            { validator: VerifyCode, trigger: 'blur' }
          ],
          password: [
            { validator: password, trigger: 'blur' }
          ],
          checkPass: [
            { validator: checkPass, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
        ...mapActions(
          {
            "request_getCode":"accountSetting/accountSetting/request_getCode",
            "request_forgetPassword":"accountSetting/accountSetting/request_forgetPassword"
          }
        ),
        //路由跳转
        toRouter(path){
            this.$router.push(path)
        },
        //获取验证码
        getVerifyCode(){
          let tel = tool.regularJudgement("phone",this.registerForm.Mobile);
          if(!tel){
           this.$message.error("请输入正确的手机号");
            return;
          }
          if(this.codeSending){
            return;
          }
          this.codeSending =true;
          let loadingtime = 120;  //等待重新获取的时间
          sendTiemr = setInterval(()=>{
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
          var params = {
            mobile: this.registerForm.Mobile
          }
          getData.getVerification(params).then((res) => {
            this.$message({
              message: '恭喜您，成功获取手机验证码',
              type: 'success'
            });
          }).catch((err) => {
            if(err.data.msg == "输入的手机号码格式不正确"){
              this.$message.error(err.data.msg);
            }
          });

        },
        //用户修改表单提交
        submitForm(formName) {
          var  passwordEncrypt =  CryptoJS.AES.encrypt(this.registerForm.password, '59964e5d540e446cf98bc2af78a2ea58');//密码加密
          this.$refs[formName].validate((valid) => {
            if (valid) { //前端表单校验通过处理
              //发送提交请求
              var params = {
                Mobile: this.registerForm.Mobile,
                VerifyCode: this.registerForm.VerifyCode,
                datatype:'json',
                NewPassword:encodeURI(passwordEncrypt.toString()),
                openSSL:true
              }
              getData.forgetPsd(params).then((res) => {
                //提示修改成功
                this.$message({
                  message: '恭喜您，修改成功，请您记住牢记此次修改的密码！',
                  type: 'success',
                  duration: 5000
                });
                setTimeout(()=>{
                  this.$router.push('/loginAndRegister/login')
                },5000);
              },err => {
                // console.log("err111",err)
                if(err.data.msg == "新密码与旧密码相同！"){
                  this.$message.error(err.data.msg);
                }else if(err.data.msg =="该手机号尚未注册"){
                  this.$message.error(err.data.msg);
                }else if(err.data.msg == "手机验证码输入错误，请重新输入"){
                  this.$message.error(err.data.msg);
                }else if(err.data.msg == "验证码已过期，请重新获取"){
                  this.$message.error(err.data.msg);
                }
                ////console.log('修改密碼出錯：',err);
              })
            } else {
              this.$message.error('输入有误，请核对填写信息是否正确');
              return false;
            }
          });
        },
        //清空表单
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
    },
    components:{
      topState,
      publicBottom
    },
    beforeDestroy(){
      clearInterval(sendTiemr);
    }
  }

</script>

<style lang="less" type="stylesheet/css" >
  @import "forgetPassword.less";
</style>
