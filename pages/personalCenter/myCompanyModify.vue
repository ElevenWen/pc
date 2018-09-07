<template>
  <div class="mycompanyModify">
      <!-- 个人中心公共头部 -->
          <personalCenterHead ref="indexTriangle"></personalCenterHead>
          <publicPendantR></publicPendantR>
          <!-- 公共侧边 -->
          <div class="margin1200">
              <personalCenterSlide></personalCenterSlide>
              <!-- 右侧 -->
              <div class="right_frame">
                <div class="modify_title">
                  {{getId?'修改公司信息':'新增公司信息'}}
                </div>
                  <div class="companyInformation">
                    <!-- <div class="err_notice">
                      <div class="err_img_box">
                        <img src="../../assets/images/personalCenter/mycompany/bohuiyuanyin.png" alt="">
                      </div>
                      <span>你上传的营业执照不清晰，请重新上传；你上传的营业执照不清晰，请重新上传你上传的营业执照不清晰，请重新上传</span>
                    </div> -->
                    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                      <el-form-item label="营业执照:" class="star license" id="licenses">
                        <!-- <el-input v-model="form.license" :class="{changeColor:isFocus.license}" @focus="getColor('license')" @blur="loseColor('license')"></el-input> -->
                            <!-- <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="3"> -->
                          <!-- <el-button size="small" type="primary">点击上传</el-button> -->
                          <!-- <el-button size="small" type="primary"></el-button>
                          <div slot="tip" class="el-upload__tip">只能上传jpg.png格式</div>
                        </el-upload> -->
                        <!-- <el-upload class="avatar-uploader" action="http://112.74.135.230:3215/Customer/CusCompanySave" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :disabled="formToggle">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload> -->
                        <div class="a-upload">
                          <input type="file" name="" class="selectImg" @change="upload" id="upload" :class="{changeColor:isFocus.license}" :disabled="formToggle"> 
                          <span :class="{img_box:formToggle,img_box_model:!formToggle}" v-if="!headerImage">
                            点击上传营业执照
                          </span>
                          <img :src="headerImage" alt="" v-if="headerImage">
                        </div>
                        <!-- <div class="uploadingImg" id="uploadingImg" :style="'backgroundImage:url('+headerImage+')'" > -->
                        <!-- <div class="uploadingImg" id="uploadingImg">
                          <img :src="headerImage" alt="">
                        </div> -->
                      </el-form-item>
                      <el-form-item label="企业名称:" class="star" prop="name">
                        <el-input v-model="form.name" :class="{changeColor:isFocus.name}" @focus="getColor('name')" @blur="loseColor('name')" :disabled="formToggle"></el-input>
                      </el-form-item>
                      <!-- <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload> -->

                      <el-form-item label="社会信用代码:" class="star" prop="credit">
                        <el-input :disabled="formToggle" v-model="form.credit" :class="{changeColor:isFocus.credit}" @focus="getColor('credit')" @blur="loseColor('credit')"></el-input>
                      </el-form-item>
                    <el-form-item label="纳税人类型:">
                        <el-select v-model="form.region" placeholder="请选择纳税者类型" style="width:341px" :class="{changeColor:isFocus.payTaxes}" @mouseover="getColor('payTaxes')" @blur="loseColor('payTaxes')" :disabled="formToggle">
                          <el-option label="小规模纳税人" value="小规模纳税人"></el-option>
                          <el-option label="一般纳税人" value="一般纳税人"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="开户行:">
                        <el-select v-model="value" placeholder="请选择开户行" style="width:341px" :class="{changeColor:isFocus.openAccount}" :disabled="formToggle">
                          <el-option v-for="(item,index) in bankArr" :key="index" :label="item.Name" :value="item.Name"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="银行卡账号:" prop="bankcard">
                        <el-input v-model="form.bankcard" :class="{changeColor:isFocus.bankcard}" @focus="getColor('bankcard')" @blur="loseColor('bankcard')" :disabled="formToggle"></el-input>
                      </el-form-item>
                      <!-- <el-form-item label="税票区域:">
                          <v-distpicker :province="form.TaxIdAddressProvince" :city="form.TaxIdAddressCity" :area="form.TaxIdAddressArea" @province="taxProvince" @city="taxCity" @area="taxArea"></v-distpicker>
                      </el-form-item>  -->
                      <!-- <el-form-item label="税票地址:"  prop="taxReceipt">
                        <el-input v-model="form.taxReceipt" :class="{changeColor:isFocus.taxReceipt}" @focus="getColor('taxReceipt')" @blur="loseColor('taxReceipt')" :disabled="formToggle"></el-input>
                      </el-form-item> -->
                      <!-- <el-form-item label="公司区域:">
                          <v-distpicker :province="form.CompanyAddressProvince" :city="form.CompanyAddressCity" :area="form.CompanyAddressArea" @province="companyProvince" @city="companyCity" @area="companyArea"></v-distpicker>
                      </el-form-item>  -->
                      <!-- <el-form-item label="税票地址:" prop="companyAddress">
                        <el-input v-model="address" :class="{changeColor:isFocus['companyAddress']}" @focus="getColor('companyAddress')" @blur="loseColor('companyAddress')"></el-input>
                      </el-form-item> -->
                      <el-form-item label="注册地址:" prop="companyAddress">
                        <el-input :disabled="formToggle" v-model="form.companyAddress" :class="{changeColor:isFocus['companyAddress']}" @focus="getColor('companyAddress')" @blur="loseColor('companyAddress')"></el-input>
                      </el-form-item>
                      <el-form-item label="电话:" prop="tel">
                        <el-input v-model="form.tel" :class="{changeColor:isFocus.tel}" @focus="getColor('tel')" @blur="loseColor('tel')" :disabled="formToggle"></el-input>
                      </el-form-item>
                      <el-form-item class="sub">
                        <p class="notice" v-if="notice">
                          <img src="~assets/images/personalCenter/mycompany/notice.png" alt="">
                          公司名称、营业执照、社会信用代码为必填项，请完善！
                        </p>
                        <el-button type="danger" @click="submit" :disabled="formToggle">保存</el-button> 
                        <el-button @click="cancel">取消</el-button>
                        
                      </el-form-item>
                    </el-form>
                    <div class="text">
                      <p>温馨提示：</p>
                      <span>
                        完善以上信息，以便于您更高效的办理商事相关业务。我们会确保您公司的相关信息被妥善的保存和处于严格的保护状态。
                      </span>
                    </div>
                  </div>
              </div>
          </div>
          <publicBottom></publicBottom>
  </div>
</template>

<style lang="less" scoped>
 @import './personalCenter_index.less';
 .uploadingImg{
   width: 60px;
   height: 60px;
 }
 .mycompanyModify .right_frame{
   background-color: #fff;
   padding-bottom: 80px;
   margin-bottom: 133px;
 }
 .modify_title{
   height: 47px;
   line-height: 47px;
   border-bottom: 1px solid #ccc;
   font-size: 16px;
   padding-left: 19px;
 }
.companyInformation  {
  position: relative;
  width: 600px;
  margin: 0 auto;
  padding-top: 30px;
}
.el-input {
  width: 341px;
}
.companyInformation .el-input__inner {
  border-radius: 0px;
  outline: none !important;
  border: 0;
  height: 28px;
  border: 1px solid #ccc;
}
.changeColor {
  border: 1px solid red;
}
.el-form-item{
  margin-bottom: 10px;
}
.el-form-item__label{
  width: 120px !important;
}
.el-form-item.star .el-form-item__label:before{
        content: ' *';
        color:red;
        font-size: 150%;
        margin-right:5px;
  }
  .el-form #licenses{
    margin-bottom:0px;
  }
  .el-form-item.license .el-form-item__content .upload-demo{
    position:relative;
    height: 25px;
    margin-top: -10px;
  }
 .upload-demo .el-upload .el-button{
    position:absolute;
    right: 150px;
    top: -19px;
    background:url(~assets/images/personalCenter/mycompany/upload.png) no-repeat;
    width: 17px;
    height: 17px;
    border-color:transparent;
    border-radius: 2px;
  } 
  .upload-demo .el-upload .el-button span{
    font-size:0px;
  }
   .upload-demo .el-upload__tip{
    position:absolute;
    left: 28px;
    top: -10px;
    color:red;
    // font-size:0px;
  }
  .upload-demo .el-upload__tip:before{
     content:url("~assets/images/personalCenter/error.png");
     position:absolute;
     top: 8px;
     left: -22px;
  }
   /*.upload-demo .el-upload__tip:after{
     content:"只能上传jpg.png格式";
    font-size:14px;
    margin-bottom:5px;
   }*/
  .upload-demo .el-upload-list{
    position:absolute;
    left: 0;
    top: -40px;
  } 
  .el-upload-list .el-upload-list__item-name .el-icon-document:before{
    content:'';
  }
  .el-form-item__content .el-select{
  width: 498px;
  }
  .el-input__inner:focus{
    border: 1px solid #ccc;
  }
  .changeColor{
    border: none;
  }
  .el-select-dropdown.el-popper{
    width: 341px !important;
  }
  .el-button--danger{
    width: 55px;
    height: 26px;
    line-height: 26px;
    background-color: #FF3E07;
    margin: 0;
    padding: 0;
    font-size: 11px;
  }
  .el-button+.el-button{
    width: 55px;
    height: 26px;
    line-height: 26px;
    margin: 0;
    padding: 0;
    margin-left: 16px;
  }
  .text{
    width: 336px;
    color: #DF3D3E;
    margin-left: 120px;
    margin-top: 29px;
    font-size: 14px;
    line-height: 20px;
  }
.avatar-uploader .el-upload {
height: 60px;
width: 60px;
border: 1px solid #ccc;
border-radius: 3px;
cursor: pointer;
position: relative;
overflow: hidden;
}
.avatar-uploader .el-upload:hover {
border-color: #409EFF;
}
.avatar-uploader-icon {
font-size: 12px;
color: #8c939d;
width: 60px;
height: 60px;
line-height: 60px;
text-align: center;
 /*position:relative;*/
}
.avatar {
width: 60px;
height: 60px;
display: block;
}
.avatar-uploader-icon:after{
content:"点击上传";
 /*position:absolute;
 right: -55px;
 top: -75px;
 z-index:999;*/
}
.avatar-uploader-icon:before{
content:"",
}
/*//省市区选择*/
select{
    height: 28px !important;
    width: 111px;
    font-size: 12px !important;
    border: 1px solid #ccc !important;
    border-radius: 0 !important;
    padding: 0 !important;
    padding-left: 10px !important;
    background: url(http://ourjs.github.io/static/2015/arrow.png) no-repeat scroll right 5px center transparent !important;
}
.sub{
  margin-left: 20px;
}
.notice{
  color: red;
  font-size: 12px;
  line-height: 14px;
  height: 14px;
  img{
    vertical-align: middle;
  }
}
.el-form-item__content .el-form-item__error{
  top: 80%;
  left: 24px;
}
/*// input file 样式修改*/
.a-upload {
    /*// padding: 4px 10px;*/
    height: 60px;
    width: 60px;
    /*// line-height: 20px;*/
    position: relative;
    cursor: pointer;
    color: #888;
    /*// background: #fafafa;*/
    /*// border: 1px solid #ddd;*/
    border-radius: 2px;
    overflow: hidden;
    display: inline-block;
    *display: inline;
    *zoom: 1;
    line-height: 1;
    /*// padding-top: 20px;*/
    span{
      display: inline-block;
      width: 60px;
      height: 60px;
      border:1px solid #ddd;
      padding-top: 15px;
      &:hover{
        color: #888;
      }
    }
}

.a-upload  input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer;
    width: 100%;
    height: 100%;
}

.a-upload:hover {
    color: #444;
    /*// background: #eee;*/
    border-color: #ccc;
    text-decoration: none
}
.el-input.is-disabled .el-input__inner{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.err_notice{
  padding-left: 36px;
  color: #fc7b03;
  font-size: 12px !important;
  margin-bottom: 20px;
  width: 480px;
  .err_img_box{
    height: 100%;
    float: left;
    padding-top: 1%;
    img{
      vertical-align: middle;
      height: 100%;
      display: inline-block;
    }
  }
  span{
    display: inline-block;
    width: 90%;
    line-height: 20px;
    margin-left: 10px;
  }
}
.mycompanyModify /deep/ .el-popper .popper__arrow{
  display: none !important;
}
</style>


<script>
import personalCenterHead from '~/components/common/personalCenterHead';
import personalCenterSlide from "~/components/common/personalCenterSlide";
import publicBottom from '~/components/common/publicBottom';
import publicPendantR from '~/components/common/publicPendantR';
import getData from '~/store/ajaxAPI/getData.js';
import axios from 'axios';
import tool from '~/assets/lib/tool.js'; 
export default {
  data() {
     let checkName = (rule, value, callback) => { 
        if (!value) {
          return callback(new Error('请输入企业名称'));
        }            
      };
    
    let checkCredit = (rule, value, callback) => {
        let reg=/^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/g;
        if (!value) {
          return callback(new Error('请输入社会信用代码'));
        }     
        else if(!reg.test(value)){
          callback(new Error('请输入由十八位阿拉伯数字或大写字母(不使用IOZSV)组成的信用代码'));
        }   
      };

    let checkBankcard= (rule, value, callback) => { 
       let reg=/^([1-9]{1})(\d{14}|\d{15}|\d{16}|\d{17}|\d{18})$/g
        if (!value) {
          // return callback(new Error('请输入银行卡号'));
        }
        else if(!reg.test(value)){
          callback(new Error('请输入正确的银行卡号'));
        }             
      };

    let checktaxReceipt= (rule, value, callback) => { 
        if (!value) {
          return callback(new Error('请输入税票地址'));
        }            
      };
      let checkcompanyAddress= (rule, value, callback) => { 
        let reg = /^[\(\)\（\）\u4e00-\u9fa5\w]{5,}$/;
        if (!value) {
          return callback(new Error('请输入注册地址'));
        }   
        else if(!reg.test(value)){
          return callback(new Error('请输入正确的注册地址'));
        }           
      };
      
      let checktel= (rule, value, callback) => { 
        // let reg=/\d{3}-\d{4}-\d{4}/g  固定电话的格式
        let reg= /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;  
        // let reg= /^[1][3,4,5,7,8][0-9]{9}$/;  
        if (!value) {
          // return callback(new Error('请输入电话号码'));
        }  
        else if(!reg.test(value)){
          callback(new Error('请输入格式正确的联系电话'));
        }        
      };
    return {
      getId:this.$route.query.Id,
      select: { 
          province: '广东省',
          city: '广州市', 
          area: '海珠区' ,
          CompanyProvince:'',
          CompanyCity:'',
          CompanyArea:''
        },
      form: {
        name: "",
        license:"",
        credit:"",
        bankcard:"",
        taxReceipt:"",
        companyAddress:"",
        tel:"",
        region: "",  
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        bankName:'',
        TaxIdAddressProvince:'',
        TaxIdAddressCity:'',
        TaxIdAddressArea:'',
        CompanyAddressProvince:'',
        CompanyAddressCity:'',
        CompanyAddressArea:''
      },
      value:'',
      isFocus: {
        name: false,
        license: false,
        credit: false,
        payTaxes: false,
        openAccount: false,
        bankcard: false,
        taxReceipt: false,
        companyAddress: false,
        tel: false
      },
       rules: {
          name: [
            { validator: checkName, trigger: 'blur' },

          ], 
          credit: [
            { validator: checkCredit, trigger: 'blur' },
          ],
          bankcard: [
            { validator: checkBankcard, trigger: 'blur' },
          ],
          taxReceipt: [
            { validator: checktaxReceipt, trigger: 'blur' },
          ],
          companyAddress: [
            { validator: checkcompanyAddress, trigger: 'blur' },
          ],
          tel: [
            { validator: checktel, trigger: 'blur' },
          ],
         
        },
      bankArr:[],
      imageUrl: '',
      notice:false,    //提交不合格提示显示
      formToggle:false, //表单是否禁用
      headerImage:'',
        // headerImage:'',
        saveheadImg:false, //是否点击了保存
        legalRepresentative:'',  //法人
        establishmentDate:'' , //成立日期
        address:''
    };
  },
  mounted(){   
    //获取公司列表
    if(this.$route.query.Id){
    	this.getCompanyData()
    }
    
    this.getBankArr()
  },
  methods: {
    // //税票省市区
    // taxProvince(data){
    //   this.form.TaxIdAddressProvince = data.value
    //   // //console.log('税票省',data)
    // },
    // taxCity(data){
    //   this.form.TaxIdAddressCity = data.value
    //   // //console.log('税票市',data)
    // },
    // taxArea(data){
    //   this.form.TaxIdAddressArea = data.value
    //   // //console.log('税票区',data)
    // },
    // //公司省市区
    // companyProvince(data){
    //   this.form.CompanyAddressProvince = data.value
    //   // //console.log('公司省',data)
    // },
    // companyCity(data){
    //   this.form.CompanyAddressCity = data.value
    //   // //console.log('公司市',data)
    // },
    // companyArea(data){
    //   this.form.CompanyAddressArea = data.value
    //   // //console.log('公司区',data)
    // },
    getColor(param) {
      this.isFocus[param] = true;
    },
    loseColor(param) {
      this.isFocus[param] = false;
    },
    //编辑提交
    submit() {
      let loadingInstance = this.$loading({ fullscreen: true });
      if(!this.headerImage||!this.form.name||!this.form.credit){
        this.notice = true;
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭  首页加载完毕后停止loading 界面
                  loadingInstance.close();
                });
        return;
      }
        var params = {
            id:this.$route.query.Id,
            Name:this.form.name,
            SocialCreditCode:this.form.credit,
            BusinessLicensePic:this.headerImage,
            TaxpayersType:this.form.region=="小规模纳税人"?1:0,
            BankName:this.value,
            BankAccount:this.form.bankcard,
            TaxIdAddressProvince:'',
            TaxIdAddressCity:'',
            TaxIdAddressArea:'',
            TaxIdAddress:this.form.taxReceipt,
            CompanyAddressProvince:'',
            CompanyAddressCity:'',
            CompanyAddressArea:'',
            CompanyAddress:this.form.companyAddress,
            Phone:this.form.tel,
            address:''
        }
      getData.submitCompany(params).then(res=>{
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭  首页加载完毕后停止loading 界面
                  loadingInstance.close();
                });
        // console.log('提交成功',res.data)
        this.getCompanyData()
        this.$router.push({path: '/personalCenter/mycompany'})
      }).catch(err=>{
        this.$message.error(err.data.msg);
        // alert(err.data.msg);  
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭  首页加载完毕后停止loading 界面
                  loadingInstance.close();
                });
        // this.notice = true
      })
    },
    //取消编辑
    cancel(){
        this.$router.push({path: '/personalCenter/mycompany'});
    },
    //公司列表数据
     getCompanyData(){
       var params = {
                id:this.$route.query.Id
       }
       getData.companyEdit(params).then(res=>{
         this.form.name = res.data.Name
                this.headerImage = res.data.BusinessLicensePic
                this.form.credit = res.data.SocialCreditCode
                this.value = res.data.BankName
                this.form.bankcard = res.data.BankAccount
                this.form.taxReceipt = res.data.TaxIdAddress
                this.form.companyAddress = res.data.CompanyAddress
                this.form.tel = res.data.Phone
                this.form.region = res.data.TaxpayersType==1?'小规模纳税人':'一般纳税人'
                this.form.TaxIdAddressProvince = res.data.TaxIdAddressProvince
                this.form.TaxIdAddressCity = res.data.TaxIdAddressCity
                this.form.TaxIdAddressArea = res.data.TaxIdAddressArea
                this.form.CompanyAddressProvince = res.data.CompanyAddressProvince
                this.form.CompanyAddressCity = res.data.CompanyAddressCity
                this.form.CompanyAddressArea = res.data.CompanyAddressArea
                // //console.log(res.data.BankName)
                if(res.data.ReviewStatus == 1){
                  //如果已经审核通过，不能进行编辑
                    this.formToggle = true;
                }
       }).catch(err=>{
         //console.log(err)
       })
    },
       upload(){
         let loadingInstance = this.$loading({ fullscreen: true })
				var self = this;
				// 选择的文件对象
				var file = null;
				var baseStr = null;
				var eleFile = document.querySelector('#upload');
				// 压缩图片需要的一些元素和对象
        var reader = new FileReader(), img = new Image();
        if(!eleFile.files.length) return;
				file = eleFile.files[0];
		    	// 选择的文件是图片
		    	if (file.type.indexOf("image") == 0) {
		        	reader.readAsDataURL(file);    
		    	}
				// 缩放图片需要的canvas
				var canvas = document.createElement('canvas');
				var context = canvas.getContext('2d');
				
				// base64地址图片加载完毕后
				img.onload = function () {
				    // 图片原始尺寸
				    var originWidth = this.width;
				    var originHeight = this.height;
				    // 最大尺寸限制
				    var maxWidth = 400, maxHeight = 400;
				    // 目标尺寸
				    var targetWidth = originWidth, targetHeight = originHeight;
				    // 图片尺寸超过400x400的限制
				    if (originWidth > maxWidth || originHeight > maxHeight) {
				        if (originWidth / originHeight > maxWidth / maxHeight) {
				            // 更宽，按照宽度限定尺寸
				            targetWidth = maxWidth;
				            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
				        } else {
				            targetHeight = maxHeight;
				            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
				        }
				    }
				        
				    // canvas对图片进行缩放
				    canvas.width = targetWidth;
				    canvas.height = targetHeight;
				    // 清除画布
				    context.clearRect(0, 0, targetWidth, targetHeight);
				    // 图片压缩
				    context.drawImage(img, 0, 0, targetWidth, targetHeight);
				    baseStr = canvas.toDataURL("image/png");//压缩后base64数据    
					};
					
					// 文件base64化，以便获知图片原始尺寸
					reader.onload = function(e) {
						//压缩前base64数据    
						var imgData = e.target.result;
						imgData = imgData.substring(imgData.indexOf(",")+1);
						
						var params = {
							"inputs": [
						    {
						      "image": {
						        "dataType": 50,
						        "dataValue": imgData
						      }
						    }
						  ]
						}
						getData.businessLicense("post",params)
						.then((response)=>{
							self.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭  首页加载完毕后停止loading 界面
                  loadingInstance.close();
                });
              var obj = JSON.parse(response.outputs[0].outputValue.dataValue);
              var token = tool.loadFromLocal("CustomerMesg","ALL").Token;
					    //传给后台
					    // console.log("123",file)
							var acv = new FormData();
							acv.append('file', file);
							acv.append('Token',token);
							acv.append('type', 'businessLicense');
							
							getData.upNetImage(acv)
							.then((res)=>{
								self.headerImage = res.data.storeResult.path;
							})
							.catch((error)=>{
								// console.log('看看',error);
              })
              
					    //判断是否识别出
					    if(obj.name&&(obj.name!="FailInRecognition")){
					    	self.form.name = obj.name;
					    }else{
					    	self.form.name = "";
					    }
					    if(obj.reg_num&&(obj.reg_num!="FailInRecognition")){
					    	self.form.credit = obj.reg_num;
					    }else{
					    	self.form.credit = "";
					    }
					    if(obj.person&&(obj.person!="FailInRecognition")){
					    	self.legalRepresentative = obj.person;
					    }else{
					    	self.legalRepresentative = "";
					    }
					    if(obj.establish_date&&(obj.establish_date!="FailInRecognition")){
					    	self.establishmentDate = obj.establish_date.substring(0,4)+"-"+obj.establish_date.substring(4,6)+"-"+obj.establish_date.substring(6);
					    }else{
					    	self.establishmentDate = "";
              }
              if(obj.address&&(obj.address!="FailInRecognition")){
					    	self.form.companyAddress = obj.address;
					    }else{
					    	self.form.companyAddress = "";
					    }
						})
						.catch( (error)=> {
					    // console.log(error);
					    self.headerImage = "";
					    self.form.companyAddress = "";
					    self.form.name = "";
              self.form.credit = "";
              self.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭  首页加载完毕后停止loading 界面
                  loadingInstance.close();
              });
              self.$message.error('请重新上传清晰的营业执照图像');
              // alert("请重新上传清晰图像");
						});
						//调用上面的img.load
					  img.src = e.target.result;
					};
				},
    //银行获取
    getBankArr(){
      let loadingInstance = this.$loading({ fullscreen: true });
      var params = {
        code:'YH001'
      }
      getData.bankName(params).then(res=>{
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭  首页加载完毕后停止loading 界面
                  loadingInstance.close();
                });
        this.bankArr = res.data.list
        // //console.log(res.data.list)
      }).catch(err=>{
        //console.log(err)
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭  首页加载完毕后停止loading 界面
                  loadingInstance.close();
                });
      })
    }        
  },
  updated(){
	  (this.$refs.indexTriangle).$refs.indexTriangle.style.display = 'block';
  },
  components:{
      personalCenterHead,
      personalCenterSlide,
      publicBottom,
      publicPendantR,
  }
}
</script>

