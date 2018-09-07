<template>
  <div  id="message_invoice" class="message_invoice">
          <div class="messageWrap">
            <div class="messageWrap_top">
              <div>发票信息</div>
              <span @click="close"></span>
            </div>
            <div class="shippingAddress">
              <el-tabs v-model="activeName2"  type="border-card"  @tab-click="handleClick">
                  <el-tab-pane label="增值税普通-电子票"  name="0">
                    <span class="hint"><img src="~assets/images/cart/warn.png">电子发票与纸质发票具有同等法律效力，可支持报销入账。</span>
                    <ul class="dedicated">
                      <li>
                        <span><label>*</label>企业名称:</span>
                        <input type="text" name="name" placeholder="请输入企业名称" v-model='recently.CompanyName'  @blur="verifyC(recently.CompanyName)" @click="companyImg(this,$event)"/>
                        <div class="companyImg" @click="companyImg(this,$event)">
                          <img src="~assets/images/cart/add.png">
                        </div>
                        <ul class="companyName"  >
                          <li v-for="(companyItem,index )  in  companyNameList" @click="messageImg(companyItem,'0')" >{{companyItem.Name}}</li>
                        </ul>
                      </li>
                      <li>
                        <span><label>*</label>税号:</span>
                        <input type="text" placeholder="请输入税号" v-model='recently.SocialCreditCode'  @blur="verifyT(recently.SocialCreditCode)" />
                      </li>
                      <li>
                        <span></span>
                        <button    @click="saveBill('0')">保存</button>
                        <button @click="close">取消</button>
                      </li>
                    </ul>
                  </el-tab-pane>

                  <el-tab-pane label="增值税专用-电子票"  name="1">
                    <span class="hint"><img src="~assets/images/cart/warn.png">电子发票与纸质发票具有同等法律效力，可支持报销入账。</span>
                    <ul class="dedicated">
                      <li>
                        <span><label>*</label>企业名称:</span>
                        <input type="text" name="name" placeholder="请输入企业名称" v-model='recently.CompanyName'  @blur="verifyC(recently.CompanyName)"/>
                        <div class="companyImg" @click="companyImg(this,$event)">
                          <img src="~assets/images/cart/add.png">
                        </div>
                        <ul class="companyName">
                            <li  @click="messageImg(companyItem,'1')" v-for="(companyItem,index )  in  companyNameList">{{companyItem.Name}}</li>
                        </ul>
                      </li>
                      <li>
                        <span><label>*</label>纳税人识别码:</span>
                        <input type="text" placeholder="请输入识别码" v-model="recently.SocialCreditCode"  @blur="verifyT(recently.SocialCreditCode)" />
                      </li>
                      <li>
                        <span><label>*</label>注册地址:</span>
                        <input type="text" placeholder="请输入注册地址" v-model="recently.Address" @blur="verifyA(recently.Address)"/>  
                      </li>
                      <li>
                        <span><label>*</label>注册电话:</span>
                        <input type="text" placeholder="请输入注册电话" v-model="recently.Phone" @blur="verifyTP(recently.Phone)"/> 
                      </li>
                      <li>
                        <span><label>*</label>开户银行:</span>
                        <input type="text" placeholder="请输入开户银行" v-model="recently.BankName"  @blur="verifyB(recently.BankName)" /> 
                      </li>
                      <li>
                        <span><label>*</label>银行账户:</span>
                        <input type="text" placeholder="请输入银行账户" v-model="recently.BankAccount" @blur="verifyZ(recently.BankAccount)"/>
                      </li>
                      <li>
                        <span></span>
                        <button  @click="saveBill('1')">保存</button>
                        <button @click="close">取消</button>
                      </li>
                    </ul>
                  </el-tab-pane>

                  <el-tab-pane label="个人-电子票" name="2">
                    <span class="hint"><img src="~assets/images/cart/box_seleced.png">电子发票与纸质发票具有同等法律效力，可支持报销入账。</span>
                    <ul class="dedicated">
                      <li>
                        <span><label>*</label>个人姓名:</span>
                        <input type="text" placeholder="请输入个人姓名" v-model="personData"  @blur="verifyPer(personData)"/>
                      </li>
                      <li>
                        <span></span>
                        <button  @click="saveBill('2')">保存</button>
                        <button @click="close">取消</button>
                      </li>
                    </ul>
                  </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>

</template>

<script>
  import getD from "~/store/ajaxAPI/getData";
  import Vue from "vue";
  import tool from "~/assets/lib/tool";

	export default {
    props: {
        orderId: {
          default: function () {
              return { 
                  order:'',
                  index:'0'
                  }
            },
          order:'',
          index:{
            //  type: Number,
             default: 0
          }
        }, 
    },
	    data() {
		    return {
                loginForm: {
                              Mobile:'',
                              password: '',
                              isBackLogin: '',  //记住登录状态后台使用加密后的密码
                            }, 
                activeName2:'0',//选项卡默认选中 
                companyNameList:[],//公司列表 公用的数组切换tab 会动态更新
                recently:{
                  CompanyName:"",//最近使用公司名称tab0  tab1 
                  SocialCreditCode:'',//最近使用识别码 tab1 
                  Address:'',//,//*注册地址:
                  
                  Phone:"",//*注册电话:
                  BankName:"",//*注册电话:
                  BankAccount:"",//*银行账户:
                },
                personData:"",//个人电子票 账户
                regexp:{//正则验证
                    isCompanyName:false,//企业名称
                    isTaxNumber:false,//纳税人识别码
                    isAddress:false,//注册地址
                    isTel:false,//注册电话
                    isBankName:false,//开户银行
                    isBankName2:false,//银行账户
                    person:false//个人名称
                },
		    }
	    },
	    mounted(){
				$('input[name="name"]').blur(function(){
					setTimeout(function () { 
			        $('.companyName').css("display","none");
			    }, 400);
          });
        //console.log('传值传值',this.orderId)
        //初始化发票
        var params = {
          params:{
            Type:'0'//默认显示 增值税普通-电子票
          }
        }
        //获取最近使用发票
        getD.requestBillList(params).then((res)=>{
          //console.log(res,'初始化使用发票???')
          this.activeName2 = res.data.Type.toString();
          this.recently.CompanyName = res.data.Name;
          this.recently.SocialCreditCode = res.data.TaxIdNumber;
          // this.Type
          //console.log('初始化使用发票', this.recently )
        }).catch((res)=>{
           //console.log('初始化使用发票报错!!!',res )
        });

        //初始化发票公司列表
        getD.mycompanyList().then((res)=>{  
          this.companyNameList = res.data;
          //console.log(res.data[0],"22222222")
        }).catch((res)=>{
           //console.log('初始化发票公司列表报错!!!',res )
        }); 
	    },
	    computed: {
        
      },
	    methods:{
        handleClick(tab, event) {//切换tab选项卡获取最近使用发票记录
          let currentTab = event.target.id.slice(event.target.id.length-1,event.target.id.length);
          var params = {
              params:{
                Type:currentTab
              }
          }
          this.activeName2 = currentTab.toString();
          //console.log( '>>>', currentTab.toString());
          
          getD.requestBillList(params).then((res)=>{ 
             //console.log( '最近发票使用记录,跟tab定位的',  res,!res.data)
            switch(currentTab.toString()){
              case '0':
               // //console.log(0);
                if(!res.data){//无使用记录返回
                  this.recently.CompanyName = '';
                  this.recently.SocialCreditCode = '';
                  this.regexp.isCompanyName  = false;
                  this.regexp.isTaxNumber  = false;
                  return 
                }
                this.recently.CompanyName = res.data.Name;
                this.recently.SocialCreditCode = res.data.TaxIdNumber; 
                this.regexp.isCompanyName  = true;
                this.regexp.isTaxNumber  = true;
              break;
              case '1': 
                if(!res.data){//无使用记录返回
                  this.recently.CompanyName = ''; //最近使用公司名称tab0  tab1  
                  this.recently.SocialCreditCode= '';//最近使用识别码 tab1 
                  this.recently.Address = res.data.CompanyAddressProvince == null?'': res.data.CompanyAddressProvince + res.data.CompanyAddressCity == null?'': res.data.CompanyAddressCity+  res.data.CompanyAddressArea == null?'': res.data.CompanyAddressArea + res.data.CompanyAddress  == null?'': res.data.CompanyAddress;
               
                  this.recently.Phone =   '';  //*注册电话:
                  this.recently.BankName =    '';  //*注册电话:
                  this.recently.BankAccount =  '';  //*银行账户:
                  this.regexp.isCompanyName  =  '';
                  this.regexp.isTaxNumber  =  '';
                  this.regexp.isAddress  =  '';
                  this.regexp.isTel  =  '';
                  this.regexp.isBankName  =  '';
                  this.regexp.isBankName2 =  '';
                  return 
                }
                this.recently.CompanyName =  res.data.Name;  //最近使用公司名称tab0  tab1  
                this.recently.SocialCreditCode=  res.data.TaxIdNumber;//最近使用识别码 tab1 
                this.recently.Address =  res.data.Address;//*注册地址: 
                this.recently.Phone=  res.data.Phone;//*注册电话:
                this.recently.BankName=  res.data.BankName;//*注册电话:
                this.recently.BankAccount= res.data.BankAccount;//*银行账户: 
                this.regexp.isCompanyName  = true;
                this.regexp.isTaxNumber  = true;
                this.regexp.isAddress  = true;
                this.regexp.isTel  = true;
                this.regexp.isBankName  = true;
                this.regexp.isBankName2 = true;
              break;
              case '2':
                if(!res.data){//无使用记录返回
                    this.personData = ''; 
                    this.regexp.person =false 
                    return 
                }
               this.personData = res.data.Name;
               this.regexp.person = true
              break;
            };
          });

        },
        choseBill(){//选择发票企业名称

        },
        saveBill(type){//保存发票
           // regexp:{//正则验证
           //          isCompanyName:"",//企业名称
           //          isTaxNumber:"",//纳税人识别码
           //          isAddress:"",//注册地址
           //          isTel:"",//注册电话
           //          isBankName:"",//开户银行
           //          isBankName2:"",//银行账户
           //          person:""//个人名称
           //      },
           //console.log( this.regexp.isCompanyName , this.regexp.isTaxNumber  ,this.regexp.isAddress ,  this.regexp.isTel ,  this.regexp.isBankName , this.regexp.isBankName2 )
            if(type == 0){
              let isCheckOk = this.regexp.isCompanyName && this.regexp.isTaxNumber;
              if(!isCheckOk){
                
                return false
              }
            }else if(type ==1){
              let isCheckOk = this.regexp.isCompanyName && this.regexp.isTaxNumber && this.regexp.isAddress && this.regexp.isTel && this.regexp.isBankName && this.regexp.isBankName2 ;
              if(!isCheckOk){
                 
                return false
              }
            }else{
              let isCheckOk = this.regexp.person;
              if(!isCheckOk){
                 
                return false
              }
            };

          if(type == 0 || type ==1){
            var params = {
              Name:this.recently.CompanyName,
              TaxIdNumber:this.recently.SocialCreditCode ,
              Address: this.recently.Address,
              Phone:this.recently.Phone ,
              BankName:this.recently.BankName ,
              BankAccount:this.recently.BankAccount ,
              Type:type,
              dataType:'json'
            };
          } else{
            var params = {
              Name:this.personData,
              Type:type,
              dataType:'json'
            };
          }      


          //console.log('保存',this.recently,type,params);


          getD.saveBillList(params).then((res)=>{
            //console.log('发票发票哈哈哈',res.data)
            
            this.$emit('recentlyBillRefalsh',res.data);//吧更新后的发票数据传给父组件
            if(this.orderId.order){ //从个人中心 下单
               var params = {
                id:this.orderId.order,
                invoiceId:res.data.Id,
                dataType:'json'
              };
               getD.UpdateOrderCusinvoice(params).then(res=>{
                  // //console.log('头晕晕',res) 
                  this.$emit('closeBilDialog',{'index':this.orderId.index,'flag':false})
                  window.location.reload();
                }).catch(err=>{
                  //console.log(err)
                })
            }

               
            
          },(error)=>{
             //console.log(error) 
            this.$message.error("发票保存失败,请重试")
          })

        },
        companyImg(data,data1){
          $('input[name="name"]').css({"border":"1px solid #359af8"});
          $(".companyName").show();
        },
        //路由跳转
        toRouter(path){
          this.$router.push(path)
        },
        //模态框关闭
        close(){
            $("body").css({"overflow":"auto"}); 
            //console.log(">>>",this.orderId)
            this.$emit('closeBilDialog' ,{'index':this.orderId.index,'flag':false})
        },
        messageImg({ //选择企业名称列表 显示对应数据
          SocialCreditCode,//识别码
          Name,//*企业名称:
          CompanyAddressProvince,//*注册地址:
          CompanyAddressCity, //*注册地址:
          CompanyAddressArea,//*注册地址:
          CompanyAddress,//*注册地址:
          Phone,//*注册电话:
          BankName,//*注册电话:
          BankAccount//*银行账户:
          },type)
          { 
            switch(type){
              case '0':
              Vue.set(this.recently,'CompanyName',Name);
              Vue.set(this.recently,'SocialCreditCode',SocialCreditCode)
                 
              break;
              case '1': 
               Vue.set(this.recently,'CompanyName',Name);  //最近使用公司名称tab0  tab1  
               Vue.set(this.recently,'SocialCreditCode',SocialCreditCode)//最近使用识别码 tab1 
           
               Vue.set(this.recently,'Address',
                ( CompanyAddressProvince == null?'':CompanyAddressProvince )+ (CompanyAddressCity == null?'':CompanyAddressCity)+ (CompanyAddressArea == null?'':CompanyAddressArea) +(CompanyAddress  == null?'':CompanyAddress)
                )
               Vue.set(this.recently,'Phone',Phone);//*注册电话:
               Vue.set(this.recently,'BankName',BankName);//*注册电话:
               Vue.set(this.recently,'BankAccount',BankAccount)//*银行账户:
              break; 
              case '2':
               this.personData = this.personData;
              break;
          }
          
          $('input[name="name"]').css({"border":"1px solid #ccc"});
          $(".companyName").hide();
        },
       //验证企业名称
        verifyC(val){
          var status = this.commonTool.regularJudgement("companyAddress",val); 
          if (status) {
            this.regexp.isCompanyName = true;
          }else{
            this.$message.error('请输入完整公司名称'); 
            this.regexp.isCompanyName = false;
          }
        },
        //验证税号
        verifyT(val){
          var status = this.commonTool.regularJudgement("taxNumber",val); 
          if (status) {
            this.regexp.isTaxNumber = true;
          }else{
            this.$message.error('税号格式错误'); 
            this.regexp.isTaxNumber = false;
          }
        },
        //验证地址
        verifyA(val){
          var status = this.commonTool.regularJudgement("companyAddress",val);  
          if (status) {
            this.regexp.isAddress = true;
          }else{
            this.$message.error('请填写详细地址'); 
            this.regexp.isAddress = false;
          }
        },
        //验证电话
        verifyTP(val){
          var status = this.commonTool.regularJudgement("telephone",val); 
          if (status) {
            this.regexp.isTel = true;
          }else{
            this.$message.error('电话格式错误');  
            this.regexp.isTel = false;
          }
        },
        //验证开户银行
        verifyB(val){
          var status = this.commonTool.regularJudgement("person",val);
          if (status) {
            this.regexp.isBankName = true;
          }else{
            this.$message.error('请输入正确开户银行');
            
            this.regexp.isBankName = false;
          } 
        },
        //验证银行账户全数字
        verifyZ(val){
          var status = this.commonTool.regularJudgement("bankArrout",val);
          if (status) {
            this.regexp.isBankName2 = true;
          }else{

            this.$message.error('请输入正确银行账户');
            
            this.regexp.isBankName2 = false;
          }
        },
        //个人姓名
        verifyPer(val){
          var status = this.commonTool.regularJudgement("person",val);
          if (status) {
            this.regexp.person = true;
          }else{
            this.$message.error('个人姓名请保证至少2个字'); 
            this.regexp.person = false;
          }
            
        },
        //登录提交
        onSubmitLogin(){
          this.$_post('/Customer/Login',{LoginName: this.loginForm.Mobile,Password: this.loginForm.password},(res)=>{
            this.$message({
              message: '恭喜，登录成功',
              type: 'success',
              duration: 2000
            });
            setTimeout(()=>{
              //this.$router.push('/');
              self.location.reload();     //刷新当前窗口
            },5000);
            //保存用户自动登录账号信息
            tool.saveToLocal('CustomerMesg',JSON.stringify(res));
          },(err)=>{
            this.$message({
              showClose: true,
              message: '登录失败，请检查账号密码输入是否正确',
              type: 'error',
              duration: 2000
            });
          })
        },
	    }
	}
</script>







<style lang="less" type="stylesheet/css"  scoped>
    #message_invoice{ 
    			width: 100%;
    			height: 100%;
          position: fixed;
          z-index:2009;
          background: rgba(0,0,0,0.42);
          top: 0px;
          left: 0;
          .messageWrap{
              width: 630px;
              height: 550px;
              margin: 12% auto;
              background: #fff;
              .messageWrap_top{
                  width: 100%;
                  height: 48px;
                  line-height: 48px;
                  border-bottom: 1px solid #ccc;
                  div{
                      width: 582px;
                      text-align: center;
                      font-size: 18px;
                      color: #4d4d4d;
                      float: left;
                  }
                  span{
                      height: 48px;
                      width: 48px;
                      display: block;
                      float: right;
                      cursor: pointer;
                      background-position: 13px 10px;
                      background-repeat: no-repeat;
                      background-image: url(~assets/images/home/close.png);
                  }
              }
              .shippingAddress{
                  overflow:hidden;
                  padding: 30px;
                  .hint{
                      display: block;
                      height: 18px;
                      line-height: 18px;
                      font-size: 12px;
                      color: #fc7b03;
                      width: 570px;
                      background: #fff6eb;
                      img{
                          vertical-align: sub;
                          margin: 0 10px;
                      }
                  }
                  ul{
                      margin-left: 35px;
                      li{
                          height: 30px;
                          line-height: 28px;
                          margin-top: 25px;
                          .companyImg{
                              width: 26px;
                              height: 26px;
                              position: absolute;
                              margin: -27px 62px 0px 0px;
                              right: 24px;
                              padding: 2px 0;
                              cursor: pointer;
                              img{
                                  width: 18px;
                                  height: 18px;
                              }
                          }
                          span{
                              display: block;
                              float: left;
                              width: 85px;
                              height: 28px;
                              font-size: 12px;
                              color: #545454;
                              text-align: right;
                              margin-right: 10px;
                              label{
                                  color: #df3d3e;
                              }
                          }
                          input{
                              border: 1px solid #ccc;
                              width: 340px;
                              height: 28px; 
                              font-size: 12px;
                              padding-left: 12px;
                          }
                          button{
                              width: 54px;
                              height: 25px;
                              font-size: 12px;
                              border-radius: 2px;
                              margin-right: 20px;
                          }
                          button:nth-child(2){
                              background: #ff3e07;
                              color: #FFF;
                          }
                          button:nth-child(3){
                              color: #666;
                              border: 1px solid #e6e6e6;
                          }
                          .companyName{
                              display: none;
                              width: 340px;
                              margin-left: 98px;
                              position: absolute;
                              background: #FFF;
                              margin-top: -1px;
                              li{
                              		border-right: 1px solid #359af8;
                              	  border-left: 1px solid #359af8;
                                  height: 24px;
                                  line-height: 24px;
                                  color: #666;
                                  margin: 0;
                                  padding-left: 12px;
                                  font-size: 12px;
                                  cursor: pointer;
                              }
                              li:nth-child(1){
                              	border-top: 1px solid #359af8;
                              }
                              li:nth-last-child(1){
                              	border-bottom: 1px solid #359af8;
                              }
                              li:hover{
                                  background: #f0f0f0;
                              }
                          }
                      }
                  }
              }
          }
      }



     .shippingAddress{
          overflow:hidden;
          padding: 30px;
          li{
              background: none;
              height: auto;
              width: 100%;
              span:nth-child(1){
                  width: 88px !important;
                  line-height: 35px;
                  height: 35px;
                  display: block;
                  float: left;
                  margin: 0;
                  padding-right: 5px;
                  font-size: 12px;
                  text-align: right;
                  label{
                      color: #df3d3e;
                  }
              }
              select{
                  width: 110px;
                  height: 28px;
                  margin-top: 4px;
                  border: 1px solid #ccc;
              }
              label{
                  color: #ff3e08;
                  font-size: 12px;
                  img{
                      vertical-align: middle;
                      margin: 0 3px;
                  }
              }
              input{
                  width: 220px;
                  height: 28px;
                  margin-top: 4px;
                  border: 1px solid #CCC;
              }
              button:nth-child(2){
                  width: 110px;
                  height: 25px;
                  background: #ff3e08;
                  border-radius: 4px;
                  color: white;
                  border: 1px solid #ff3e08;
              }
              button:nth-child(3){
                  width: 54px;
                  height: 25px;
                  border: 1px solid #ccc;
                  border-radius: 4px;
                  margin: 20px 0 0 20px;
                  color: #4d4d4d;
                  background: #fff;
              }
          }
          li:nth-child(2){
              textarea{
                  border: 1px solid #ccc;
                  padding: 5px;
                  resize:none;
                  width: 400px;
                  height: 62px;   
                  margin: 5px 0 ;
              }
              span{
                  display: block;
                  color: #8c8c8c;
                  width: 400px;
                  font-size: 12px;
                  padding-left: 2px;
              }
          }
          li:nth-child(5){
              input{
                  width: 16px;
                  height: 16px;
                  vertical-align: sub;
              }
          }
      }
</style>
