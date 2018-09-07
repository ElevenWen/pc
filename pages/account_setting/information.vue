<template><!--基本资料-->
  <div class="information">
      <!-- 个人中心公共头部 -->
        <personalCenterHead ref="indexTriangle"></personalCenterHead>
        <publicPendantR></publicPendantR>
        <!-- 公共侧边 -->
        <div class="margin1200">
            <commonSide></commonSide>
            <!-- 右侧 -->
            <div class="right_frame">
                <h3>基本资料</h3>
                <div class="informationWrap">
               		<div v-if="headerImage" class="informationImg" @mouseenter="informationJ" @mouseleave="informationC" :style="'backgroundImage:url('+headerImage+')'">
               			<div class="yinyingWrap">
               				<div class="yinying" @click="modificationImg">修改头像</div>
               			</div>
               		</div>
               		<div v-if="!headerImage" class="informationImg active" @mouseenter="informationJ" @mouseleave="informationC">
               			<div class="yinyingWrap">
               				<div class="yinying" @click="modificationImg">修改头像</div>
               			</div>
               		</div>
           			<div class="informationR" >
           				<span class="information_T">请输入生日信息，在这一天，可能会有惊喜哦！！！</span>
           				<ul>
           					<li>用户名：</li>
           					<li><input type="text" class="liText" v-model="name" disabled style="background:rgba(245, 245, 245, 1)"></li>
                    <li>会员等级：</li>
                    <li class="star_li">{{companyLevel}} </li>
           					<li>昵称：</li> 
           					<li><input type="text" class="liText" v-model="nickname" minlength="4" maxlength="20" @blur="nicknameCheck"><label>4-20个字符，可由中英文、数字、“_”、“-”组成</label></li>
           					<li>性别：</li>
           					<li><input type="radio" name="sex" value="0" v-model="sex">男<input type="radio" name="sex" value="1" v-model="sex">女<input type="radio" name="sex" value="2" v-model="sex">保密</li>
           					<li>生日：</li>
           					<li>
           						<select v-model="selectedYear">
                        <option v-for="items in years" :value="items">{{items}}</option>
											</select>年
											<select v-model="selectedMonth">
											    <option :value="items" v-for="items in months">{{items}}</option>
											</select>月
											<select v-model="selectedData">
											    <option :value="items" v-for="items in datas">{{items}}</option>
											</select>日
           					</li>
           				</ul>
           				<div class="submitBut" @click="submitInfo">提交</div>
           			</div>
                </div>
            </div>
            <div class="right_img">
            	<h3>个人头像</h3>
            	<div class="informationWrap">
                <div class="a-upload">
                  <input type="file" name="" class="selectImg" @change="upload">请选择上传的图片
                </div>
           			<div class="informationR">
           				<span class="information_T">建议使用正方形的图片，支持JPG、GIF、JPEG、PNG格式，且文件小于5M</span>
           				<div class="uploadingImg" id="uploadingImg" :style="'backgroundImage:url('+headerImage+')'" ></div>
           				
                  <!-- <div class="uploadingImg" id="uploadingImg" v-else></div> -->
           				<div class="submitBut" @click="editHeadImg">保存</div>
           			</div>
                </div>
            </div>
        </div>
        <publicBottom></publicBottom>
  </div>
</template>

<style lang="less" scoped>
 @import '../personalCenter/personalCenter_index.less';
 @import './safeCenter.less';
 .information{
   background: #f0f0f5;
 }
</style>


<script>
import personalCenterHead from '~/components/common/personalCenterHead'
import publicBottom from '~/components/common/publicBottom'
import publicPendantR from '~/components/common/publicPendantR'
import commonSide from '~/components/account_setting/commonSide'
import getD from '~/store/ajaxAPI/getData'
import tool from '~/assets/lib/tool'
import { mapState,mapActions,mapGetters} from 'vuex';
export default {
  data(){
      return{
        years:["请选择"], 
        months:["请选择"], 
        datas:["请选择"],
        name:"", 
        sex:0,
        nickname:"",
        selectedYear:"请选择", 
        selectedMonth:"请选择", 
        selectedData:"请选择", 
        headerImage:"",
        saveheadImg:false, 
        info:{},
      }
  },
  updated(){
	  this.$refs.indexTriangle.$refs.accountTriangle.style.display = 'block';
  },
  components:{
      personalCenterHead,
      commonSide,
      publicBottom,
      publicPendantR
  },
  computed:{
    ...mapGetters({
      getCusInfo:'accountSetting/accountSetting/getCusInfo',
      companyLevel:'accountSetting/accountSetting/companyLevel' //会员等级
    })
  },
  mounted(){
    for(var i = 1930;i < 2019;i++){
      this.years.push(i);
    }
  
    for(var i = 1;i < 13;i++){
      this.months.push(i);
    }
    
    for(var i = 1;i < 32;i++){
      this.datas.push(i);
    }
    
   
    this.request_Level()//获取会员等级
      
		
    this.request_accountSetting().then((res) => {
      this.info = this.$store.state.accountSetting.accountSetting.customerInfo;
      // 获取客户信息
      if (this.info.HeadPicPath) {
        this.headerImage = this.info.HeadPicPath;
      }
      this.name = this.info.Account;
      this.nickname = this.info.Nickname;
      this.sex = this.info.Sex;
      var birthday = this.info.Birthday;
      if (birthday) {
        var _birthday = birthday.substring(6,birthday.lastIndexOf(")"));
        let time = new Date(parseInt(_birthday));
        var year = time.getFullYear();
        var month = time.getMonth()+1;
        var date = time.getDate();
        this.selectedYear = year;
        this.selectedMonth = month;
        this.selectedData = date;
      }
    // 把客户信息存入本地存储
    // tool.saveToLocal("_accountSetting","_accountSetting","accountData",this.info);
    })
    // 获取本地存储中客户的信息
      // console.log("this.getToken",tool.loadFromLocal("_accountSetting","_accountSetting",'accountData',false));
  },
  methods:{
    ...mapActions(
      {
        "request_accountSetting":"accountSetting/accountSetting/request_accountSetting",
        "request_editCusInfo":"accountSetting/accountSetting/request_editCusInfo",
        'request_Level':"accountSetting/accountSetting/request_Level",
      }
    ),
  	informationJ(){
  		$(".yinyingWrap").show();
  	},
  	informationC(){
  		$(".yinyingWrap").hide();
  	},
  	modificationImg(){
  		$(".right_frame").hide();
  		$(".right_img").show();
      this.saveheadImg = false;
  	},
    upload(e) {
      let files = e.target.files || e.dataTransfer.files;
      if(!files.length) return;
      this.picValue = files[0];
      this.imgPreview(this.picValue);
    },
    imgPreview(file) {
      let self = this;
      let Orientation;
      
      if(!file || !window.FileReader) return;
      if(/^image/.test(file.type)) {
        
        let reader = new FileReader();
        
        reader.readAsDataURL(file);
        
        reader.onloadend = async function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          
          if(this.result.length <= (5 * 1024)){
            self.headerImage = this.result;
            self.postImg(file);
          }else{
            img.onload = function() {
              let data = self.compress(img, Orientation);
              self.headerImage = data;
              self.postImg(file);
            }
          }
          
        }
      }
    },
    compress(img, Orientation) { 
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext('2d');
      
      let tCanvas = document.createElement("canvas");
      let tctx = tCanvas.getContext("2d");
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      
      let ratio;
      if((ratio = width * height / 4000000) > 1) {

        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
      } else {
        ratio = 1;
      }
      canvas.width = width;
      canvas.height = height;
      
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      let count;
      if((count = width * height / 1000000) > 1) {

        count = ~~(Math.sqrt(count) + 1); 
        
        let nw = ~~(width / count);
        let nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for(let i = 0; i < count; i++) {
          for(let j = 0; j < count; j++) {
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height);
      }
      
      let ndata = canvas.toDataURL('image/jpeg', 0.1);



      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
      return ndata;
    },
    postImg(file){
    	// 获取token
      var _token = tool.loadFromLocal("CustomerMesg","ALL").Token;
	  		//传给后台
        var acv = new FormData();
				acv.append('file', file);
				acv.append('Token',_token);
				acv.append('type', 'avatar');
				// console.log(acv,45466555)
				getD.upNetImage(acv)
				.then((res)=>{
					this.headerImage = res.data.storeResult.path;
				})
				.catch((error)=>{
					// console.log(error);
				})
      // if(this.saveheadImg == true){ //点击保存后则发送请求
      //   this.editHeadImg(file);
      // }
      
    },
    
    editHeadImg(){
      this.saveheadImg = true;
      	
        var param = {
            HeadPicPath:this.headerImage,
            modifyField:"HeadPicPath",
        }
        getD.basicInformation(param).then((res) => {
          
        });
        // this.request_editCusInfo(param);
        $(".right_frame").show();
      $(".right_img").hide();
    },
    nicknameCheck(){ 
      
      var reg = /([A-Za-z0-9-_]{4,20})|([\u4e00-\u9fa5]{2,10})|([\u4e00-\u9fa5][\w\W-]{2})/;
      var status = reg.test(this.nickname);
      
      if(status == false){
        this.$message.error("请填写正确的昵称");
      }
    },
    submitInfo(){ 
      
      var currentYear = (this.selectedYear).toString();
      var currentMonth = (this.selectedMonth).toString();
      var curenetDatas = (this.selectedData).toString();
      var birthday = currentYear+'-'+currentMonth+'-'+curenetDatas;
      
      
      if(currentYear == "请选择"){
        this.$message.error("请填写生日年份");
        return 
      }
      
      if(currentMonth == "请选择"){
        this.$message.error("请填写生日月份");
        return 
      }
      
      if(curenetDatas == "请选择"){
        this.$message.error("请填写生日日期");
        return 
      }
      
      var sex = $('input:radio:checked').val();
      var params = {
          datatype:"json",
          Name: this.info.Account,
          Nickname: this.nickname,
          Birthday:birthday,
          Sex:sex,
          HeadPicPath:this.headerImage,
          modifyField:"Name,"+"Nickname,"+"Birthday,"+"Sex,"+"HeadPicPath",
      }
      // getD.basicInformation(param).then((res) => {
      // })
          
      // console.log(this.request_editCusInfo)
      this.request_editCusInfo(params);
          this.$message({
            message: '提交成功',
            type: 'success'
          });
    },
  }
}
</script>

