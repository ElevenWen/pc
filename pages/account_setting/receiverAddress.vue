<template><!--安全中心-->
  <div class="receiverAddress">
      <!-- 个人中心公共头部 -->
        <personalCenterHead ref="indexTriangle"></personalCenterHead>
        <publicPendantR></publicPendantR>
        <!-- 公共侧边 -->
        <div class="margin1200">
            <commonSide></commonSide>
            <!-- 右侧 -->
            <div class="right_frame">
                <h3>收货地址</h3>
                <div class="informationWrap">
               		<span class="informationT">
               			<img src="~assets/images/account-setting/added_place.png">
               			已经保存的收货地址 
               			<label>您已经创建 
               				<label>{{addressList.length}}</label>个收货地址，最多可创建
               				<label> 10 </label>个
               			</label>
               		</span>
                   <!-- <div>{{todos}}</div> -->
               		<div class="add_btn" @click="add_btn">
               			<img src="~assets/images/account-setting/add_btn.png">
               		</div>
               		<div class="compile">
               			<div>
               				<span><label>*</label>所在地：</span>
               				<select v-model="proviceId" @change="toChoosePro()">
                          <option value="0">请选择省份</option>
        							    <option v-for="items in provice" :value="items.Id">{{items.Name}}</option>
        							</select>
        							<select  v-model="cityId" @change="toChooseCity()">
        							    <option value="0">请选择城市</option>
                          <option v-for="items in city" :value="items.Id">{{items.Name}}</option>
        							</select>
        							<select v-model="areaId">
        							    <option value="0">请选择区</option>
        							    <option v-for="items in area" :value="items.Id">{{items.Name}}</option>
        							</select>
               			</div>
               			<div>
               				<span><label>*</label>街道地址：</span>
               				<div class="site">
               					<textarea maxlength="100" v-model="streetAddr" minlength="5"></textarea>
               					<span>请填写街道地址，最少5个字，最多不能超过100个字</span>
               				</div>
               			</div>
               			<div>
               				<span><label>*</label>收货人姓名：</span>
               				<input type="text" v-model="name">
               			</div>
               			<div>
               				<span><label>*</label>手机：</span>
               				<input type="text" v-model="telphone" ref="telphone" maxlength="11">
               			</div>
               			<div>
               				<button @click.stop="confirmAddr">确认地址</button>
               				<button @click="closeBut">取消</button>
               			</div>
               		</div>
               		<!--收货地址列表-->
               		<div class="receiverlist" v-for="(items,index) in addressList" v-if="addressList.length>0">
               			<ul>
               				<li>{{items.ConsigneeName}}</li>
               				<li><span style="float:left;">{{items.ProvinceName}}{{items.CityName}}{{items.AreaName}}</span><span>{{items.Address}}</span></li>
               				<li>{{items.ConsigneeMobile}}</li>
               				<li>
               					<span v-if="items.IsDefault == true" style="color:#FC7B03">默认地址</span>
                        <span @click="setDefault(items,index)" v-else>设为默认</span>
               					<span @click="  editAddr( items)">编辑</span>
               					<span @click="delAddr(items,index)">删除</span>
               				</li>
               			</ul>
               		</div>
                </div>
            </div>
        </div>
        <publicBottom></publicBottom>
  </div>
</template>

<style lang="less" scoped>
 @import '../personalCenter/personalCenter_index.less';
 @import 'safeCenter.less';
 .receiverAddress{
   background: #f0f0f5;
 }
 .receiverlist li{
   word-wrap : break-word;  
 }
</style>


<script>
import personalCenterHead from '~/components/common/personalCenterHead'
import publicBottom from '../../components/common/publicBottom'
import publicPendantR from '../../components/common/publicPendantR'
import commonSide from '~/components/account_setting/commonSide'
import getD from '~/store/ajaxAPI/getData'
import { MessageBox } from 'element-ui';
import tool from '~/assets/lib/tool'
import { mapState,mapActions,mapGetters} from 'vuex';
export default {
  data(){
      return{
        provice:[],
        city:[],
        area:[],
        proviceId:0,  //省份ID
        cityId:0,  //城市ID
        areaId:0,  //区域ID
        name:"",
        telphone:"",
        streetAddr:"",//街道地址
        isShowAddr:false, //是否展示收货地址
        addressList:[],//收货地址列表
        tempaddressList:[],//收货地址列表 副本
        currentId:"",
        singerAddress:{},//单个收货地址
        isChecked:0, //收货地址是否被点击编辑
        flag:true,//编辑点击事件标志位
        currentArr:[],//点击编辑记录当前数组
        currentArrIndex:[],//点击编辑记录当前数组下标
      }
  },
  components:{
      personalCenterHead,
      commonSide,
      publicBottom,
      publicPendantR,
  },
  updated(){
	  this.$refs.indexTriangle.$refs.accountTriangle.style.display = 'block';
  },
  computed:{
    ...mapGetters({
        todos:'accountSetting/accountSetting/todos',
        getSingerAddress:"accountSetting/accountSetting/getSingerAddress",
    })
  },
  mounted(){
    // 请求省份
    getD.provice().then((res) => {
      this.provice = res.data.list;
    });
    this.request_getAddList().then(()=>{
        // console.log('1111111111111',this.todos)
        this.addressList = Object.assign([],this.todos);
        // this.tempaddressList = Object.assign([],this.todos);
    });
  },
  methods:{
    ...mapActions(
      {
        "request_getAddList":"accountSetting/accountSetting/request_getAddList",
        "request_addAddress":"accountSetting/accountSetting/request_addAddress",
        "request_singerAdd":"accountSetting/accountSetting/request_singerAdd",
        "request_deletAdd":"accountSetting/accountSetting/request_deletAdd",
        "request_setDefault":"accountSetting/accountSetting/request_setDefault",
      }
    ),
    // 选择省份
    toChoosePro(){
      this.cityId = 0;
      this.selectCity();
    },
    // 选择城市
    toChooseCity(){
      this.selectArea();
      this.areaId = 0;
    },
  	add_btn(){
      //判断点击新增地址前是否点击了编辑
      if(this.currentArr.length!=0){
        this.addressList.splice(this.currentArrIndex,0,this.currentArr[0]);
        //清空当前存储的数据，为了不重复添加数据
        this.currentArr = [];
      }
      // this.addressList = Object.assign([],this.tempaddressList) ;
      // console.log('新增', this.tempaddressList , this.addressList)
      this.flag = true;
  		$(".compile").show();
      // 限制收货地址最多10个
      if(this.addressList.length>=10){
        this.$message.error('收货地址不能多于10条');
        $(".compile").hide();
        return;
      }
     // 点击新增时清空里面的数据
      this.proviceId = 0;
      this.cityId = 0;
      this.areaId = 0;
      this.name = "";
      this.telphone = "";
      this.streetAddr = "";
  	},
  	closeBut(){
      this.flag  = true;//编辑标志位
  		$(".compile").hide();
      // 获取收货地址列表  判断客户是否登录
      var _token = tool.loadFromLocal("CustomerMesg","ALL").Token;
      if(_token){
        getD.getAddrList().then((res) => {
          //console.log("收货地址",res);
          this.addressList = res.data.list;
          // console.log("000",this.addressList);
        })
      } 
  	},
  	informationJ(){
  		$(".yinyingWrap").show();
  	},
  	informationC(){
  		$(".yinyingWrap").hide();
  	},
    selectCity(){  // 请求城市
      var param = {
        params:{
          datatype:"json",
          Id:this.proviceId,
        }
      }
      getD.cityArea(param).then((res) => {
          // //console.log("市",res);
          this.city = res.data.list;
      })
    },
    selectArea(){  // 请求区域
      var param = {
        params:{
          datatype:"json",
          Id:this.cityId,
        }
      }
      getD.cityArea(param).then((res) => {
          //console.log("区",res);
          this.area = res.data.list;
      })
    },
    confirmAddr(){  //新增/编辑收货地址
     
      // 验证三级联动
      if(this.proviceId == 0 || this.cityId == 0 || this.areaId == 0) {
        this.$message({
          message: '请选择所在地',
          type: 'warning'
        });
      }
      // 验证街道地址
      var status = tool.regularJudgement("companyAddress",this.streetAddr);
      if(status){
        var reg = /^[0-9]+.?[0-9]*$/;
        if(this.streetAddr >= 5){
          if (reg.test(this.streetAddr)) {
            this.$message.error('请填写正确的地址,必须含有汉字');
            return;
          }
        }else {
           this.$message.error('最少输入五个字');
        }
      }else{
        this.$message.error('请填写正确的地址');
        return
      }
      // 验证姓名
      if(this.name.length < 2 || this.name == Number){
        this.$message.error('请填写正确的姓名');
      } 
      // 验证手机号
      var tel = this.$refs.telphone.value;
      if(!(/^1[3|5|8|7][0-9]\d{4,8}$/.test(tel))){ 
        this.$message.error('不是正确的手机号');
          return false; 
      } 
      // 编辑
        if(this.currentId.length>0){
            this.modifyAddr();
        }else{ //新增
            this.addNew();
        }
        this.flag = true;
        window.location.reload();
    },
    addNew(){  //新增收货地址
      var param = {
        params:{
          datatype:"json",
          Id:this.currentId,
          ConsigneeName: this.name,
          ConsigneeMobile: this.telphone,
          ProvinceId: this.proviceId,
          CityId: this.cityId,
          AreaId: this.areaId,
          Address: this.streetAddr,
        } 
      }
      getD.addAddress(param).then((res) => { 
        //console.log("新增收货地址",res);
        $(".compile").hide();
      })
      // this.request_addAddress(param);
       $(".compile").hide();
    },
    modifyAddr(){ //编辑收货地址
      //编辑收货地址参数
        var param = {
          params:{
            datatype:"json",
            Id:this.currentId,
            ConsigneeName: this.name,
            ConsigneeMobile: this.telphone,
            ProvinceId: this.proviceId,
            CityId: this.cityId,
            AreaId: this.areaId,
            Address: this.streetAddr,
          }
        }
        getD.addAddress(param).then((res) => { 
          //console.log("编辑地址",res);
          $(".compile").hide();
        })
        // this.request_addAddress(param);
        // $(".compile").hide();
    },
    editAddr(val){  //编辑地址
       
      this.currentId = val.Id;
      this.isChecked++;
//    console.log("this.isChecked",this.isChecked);
      $(".compile").show();
      this.addressList.forEach((items,index)=>{ 
        if(items.Id == val.Id ){
          this.currentArrIndex = index;
          return
        } 
      });
      
      if( !this.flag){
        this.$message.error("请先编辑完当前地址！");
        // this.isChecked = 0;
        // window.location.reload();
        return;
      }
      this.flag = false; //编辑地址标志位
      
      this.currentArr = this.addressList.splice(this.currentArrIndex,1); //删掉当前点击编辑的地址并保存
      
      // 获取单个收货地址
        var param = {
          params:{
            datatype:"json",
            Id:val.Id,
          }
        }
        this.request_singerAdd(param).then((res)=>{
          //  console.log("singer",this.getSingerAddress)
          this.singerAddress = Object.assign({},this.getSingerAddress);
          this.name = this.singerAddress.ConsigneeName;
          this.telphone = this.singerAddress.ConsigneeMobile;
          this.proviceId = this.singerAddress.ProvinceId;
          this.selectCity();
          this.cityId = this.singerAddress.CityId;
          this.selectArea();
          this.areaId = this.singerAddress.AreaId;
          this.streetAddr = this.singerAddress.Address;
         
        });
    },
    delAddr(val,i){
      //console.log(val,i);
      var param = {
        params:{
          datatype:"json",
          Id:val.Id,
        }
      }
      // getD.delAddress(param).then((res) => {
      //     //console.log("删除成功");
      //     // 页面上删除
      //     this.addressList.splice(i,1);
      // })
      this.request_deletAdd(param).then((res)=> {
        this.addressList.splice(i,1);
      })
    },
    setDefault(val,i){  //设为默认地址
      //console.log(i,val);
      var param = {
        params:{
          datatype:"json",
          Id:val.Id,
        }
      }
      // getD.setDefault(param).then((res) => {
      //     window.location.reload();
      // })
      this.request_setDefault(param).then(()=> {
        window.location.reload();
      })
    },
  }
}
</script>