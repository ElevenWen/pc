<template>
  <div class="myMessages">    
          <personalCenterHead ref="indexTriangle" ></personalCenterHead>
          <publicPendantR ></publicPendantR>
          <!-- 公共侧边 -->
          <div class="margin1200">
              <!-- 左侧 -->
              <div class="left_frame">
                  <h2>消息分类</h2>
                  <ul>
                    <li :class="nowTabIndex === 0? 'activedLi':''" @click="changTab(0)"><span class="icon"></span>系统消息<span class="rightIocn">></span></li>
                    <li :class="nowTabIndex === 1? 'activedLi':''" @click="changTab(1)"><span class="icon"></span> 活动消息 <span class="rightIocn">></span></li>
                  </ul>
              </div>
               <!-- 中间 -->
              <div class="middle_frame">
                  <div class="title">
                    <span class="name">{{nowTabIndex===0?'系统消息':'活动消息'}}</span><span class="count">共{{totalList}}条</span>
                    <span class="checkAll" :class="isCheckAll === true? 'isSelect':''" @click="checkPageAll"></span><span class="contra checkall" @click="checkPageAll">全选</span><span class="contra del" @click="delOneMsg(checkListDataParmaStr)">删除</span>
                  </div>
                  <div class="content">
                    <ul v-if="messageListData.length>0">
                      <li v-for="(item, index) in messageListData" :key="index"> 
                        <div class="checkAllWrap"><div class="checkAll"  v-show="isShowCheck" @click="checkTemplateItem(item)" :class="item.isCheck? 'isSelect' : ''"></div></div>
                        <div class="activedImg" v-if="nowTabIndex === 1"><img :src="item.Image" alt=""></div>
                        <div class="msgsWarp" :class=" nowTabIndex === 0? 'sysmsgW':'actmsgW'">
                          <div class="itemtitle">
                            <span :class="item.IsRead? 'isReaderT':''" @click="toMsgDetail(item)">{{item.Title}}</span>
                            <img src="~/assets/images/common/del_msg.png" alt="" class="colse" @click="delOneMsg(item.Id)">
                          </div>
                          <div class="des" :class="item.IsRead? 'isReaderC':''" @click="toMsgDetail(item)">
                            {{item.Content}}
                          </div>
                          <p class="shows">{{item.CreateDate | formatDateFn}} <span class="toDetail" @click="toMsgDetail(item)">查看详情>></span></p>
                        </div>                      
                      </li>                  
                    </ul>
                    <div class="nodata" v-else>
                      <img src="~/assets/images/tabBar/nothing.png" alt="">
                      <p>没有搜索到{{nowTabIndex===0?'系统':'活动'}}消息，敬请期待！</p>
                    </div>
                  </div>
                  <!-- 分页 -->
                  <div class="pagination" v-if="messageListData.length>0">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageIndex"
                        :page-sizes="[10, 25, 50, 100]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalList">
                      </el-pagination>
                  </div>
              </div>
              <!-- 右侧 -->
              <div class="right_frame">
                 <a v-for="(toItem, index) in GGData" :href="toItem.LinkWebSite"  :key='index'><img :src="toItem.PosterImgURL" alt=""></a>
                 
              </div>
          </div>
          <publicBottom></publicBottom>
  </div>
</template>




<script>
import personalCenterHead from "~/components/common/personalCenterHead";

import publicBottom from "~/components/common/publicBottom";
import publicPendantR from "~/components/common/publicPendantR";

import getData from "~/store/ajaxAPI/getData.js";
import tool from "~/assets/lib/tool.js";
import { mapMutations } from "vuex"


export default {
  data() {
    return {
    
      nowTabIndex: 0, //0系統  1活動消息
      pageIndex: 1, //默认第一页
      pageSize: 10, //默认一页10条数据
      totalList: 0, //总共条数
      
      messageListData:[],  //当前消息列表
      GGData:[],    //右侧广告

      isCheckAll: false, //是否全选
      isShowCheck: false, //显示选择
      checkListDataParmaStr: "" //选中参数
       
    };
  },
  mounted() {
    this.__getSysMessage();
    this.__getRightGG();
    //this.__getactivityMessage();
  },
  updated() {},
  methods: {
    ...mapMutations(
      {
        "SET_WDXXNum":"SET_WDXXNum",
      }
    ) ,
    //数据获取
    __getSysMessage(){
      var parma = {
        pageindex: this.pageIndex,
        pagesize: this.pageSize
      }
      getData.getSysMessage(parma)
      .then((res)=>{
        //console.log('系统消息',res);
        var arr = res.data;
        var num = 0;
        arr.forEach(ele=>{
          ele.isCheck = false;       
        });
        this.messageListData = arr;
        this.__getWdxxNum();
        this.__getMessageNum(0);
        
      })
    },
    __getactivityMessage(){
      var parma = {
        pageindex: this.pageIndex,
        pagesize: this.pageSize
      }
      getData.activityMessage(parma)
      .then(res=>{
       var arr = res.data;
        arr.forEach(ele=>{
          ele.isCheck = false;
        });
        this.messageListData = arr;
        //console.log('活动消息',this.messageListData);
        this.__getMessageNum(1);
      })
    },
    //获取消息总数
    __getMessageNum(type){
      getData.getMessageNum()
      .then(res=>{
        //console.log('消息数量',res.data)      
        if(type === 0){
          this.totalList = res.data.SystemAmount;
        }else{
          this.totalList = res.data.ActivityAmount;
        }
      })
    },
    __getWdxxNum(){
       var parma = {
        pageindex: 1,
        pagesize: 999
      }
      getData.getSysMessage(parma)
      .then((res)=>{
        //console.log('系统消息',res);
        var arr = res.data;
        var num = 0;
        arr.forEach(ele=>{       
          if(!ele.IsRead){
            num = num + 1;
          }
        });     
        this.SET_WDXXNum(num)

      })
    },
    __getRightGG(){
      let topParam = {
          params:{
            type:0,//pc 成为0  app 为1
            code:"YCGGW13"
          }
        };
        getData.getHomeBanner(topParam)
        .then(res=>{
          this.GGData = res.data.list;
          //console.log('广告右侧',this.GGData )
        })
    },
    //页面详情跳转
    toMsgDetail(item){
      ///personalCenter/orderDetail?id=06fe0e1e-49b9-4ceb-a136-9c548a2d8b01&orderId=1533720584588892

      var orderNum = item.Content.replace(/\D/g,'');
      var orderId = item.DataId.split('|')[0];
      
      getData.readSysMessage({guid: item.Id})
      .then(res=>{
        ////console.log('浏览成功',res)
        })     
      this.$router.push({path:'/personalCenter/orderDetail', query:{id:orderId,orderId:orderNum}})
    },
    //删除消息
    delOneMsg(id){
      if(!id){
          this.$message({
            message: '请您先选择一条或多条消息后 删除！',
            type: 'warning'
          });
          return
      }
       this.$confirm('确认删除消息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getData.delSysMessage({ids: id})
          .then(res=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.__getSysMessage();
          })
        }).catch(() => {});
    },
    changTab(tab){
      this.pageIndex = 1;
      this.nowTabIndex = tab;
      if(tab === 0){
        this.__getSysMessage();
      }else{
        this.__getactivityMessage();
      }
    },
    //当前页全选
      checkPageAll(){
        if(!this.isCheckAll){
          this.isShowCheck = true;
        }else{
          this.isShowCheck = !this.isShowCheck;
        }
        this.isCheckAll = !this.isCheckAll;
        if(this.isCheckAll){
          var checkAllArr = [];
          this.messageListData.forEach(ele=>{
            ele.isCheck = true;
            checkAllArr.push(ele.Id)          
          })
          this.checkListDataParmaStr = checkAllArr.join("|");
        }else{
          this.checkListDataParmaStr = '',
          this.messageListData.forEach(ele=>{
            ele.IsDelete = false;
          })
        }
      },
    //选择id 参数形成
      checkTemplateItem(arrItem) {
        arrItem.isCheck = !arrItem.isCheck;            
        const isTrueFn = value => value.isCheck == true;
        var checkArr = [];
        checkArr = this.messageListData.filter(isTrueFn);
        if (checkArr.length > 0) {
          var checkStrArr = [];
          checkArr.forEach(element => {
            checkStrArr.push(element.Id);  
                 
          });
          this.checkListDataParmaStr = checkStrArr.join("|");
          ////console.log('选择参数字符串',this.checkListDataParmaStr);
          //是否全选  改变全选状态
          for(var i = 0; i<this.messageListData.length; i++){
            //自要有一个不全选
            if(!this.messageListData[i].isCheck){
              this.isCheckAll = false;
             // //console.log('没全选！！',this.isCheckAll)    
              return false;       
            }else{
              this.isCheckAll = true;
            } 
          }     
        } else {       
          this.checkListDataParmaStr = ''
        
        }
      },  
    //页数变化 控制
    handleSizeChange(val) {
      this.pageIndex = 1;
      this.pageSize = val;
      ////console.log(`每页 ${val} 条`);
      if(this.nowTabIndex === 0){
        this.__getSysMessage();
      }else{
        this.__getactivityMessage();
      }
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      // //console.log(`当前页: ${val}`);
      if(this.nowTabIndex === 0){
        this.__getSysMessage();
      }else{
        this.__getactivityMessage();
      }
    }
  },
  computed: {
    
  },
  components: {
    personalCenterHead,
    publicBottom,
    publicPendantR
    //  supplementalInvoice
  },
  filters: {
      formatDateFn: value => {
        value = parseInt(value.toString().slice(6));
        return tool.formatDate(value,"yyyy-MM-dd hh:mm:ss");
      }

    }
};
</script>

<style type="stylesheet/css"  lang="less" scoped>
@import "./personalCenter_index.less";
@import "./all_order.less";

.margin1200 {
  display: flex;

  .left_frame {
    flex: 160;
    // width: 160px;
    padding: 30px 15px 10px;
    height: 150px;
    background-color: #ffffff;
    border: solid 1px #ebebeb;
    h2 {
      height: 12px;
      font-size: 14px;
      color: #333333;
    }
    ul {
      width: 100%;
      li {
        position: relative;
        margin-top: 10px;
        width: 100%;
        height: 28px;
        line-height: 28px;
        font-size: 12px;
        padding-left: 30px;
        color: #666666;
        cursor: pointer;
        .icon {
          display: inline-block;
          margin-right: 5px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #ffd308;
        }
        .rightIocn {
          position: absolute;
          top: 0;
          right: 18px;
          text-align: right;
          color: #ffffff;
        }
      }
      .activedLi {
        background-color: #ff3e08;
        border-radius: 4px;
        color: #ffffff;
      }
    }
  }
  .middle_frame {
    position: relative;
    flex: 730;
    margin: 0 20px;
    // width: 729px;
    min-height: 530px;
    background-color: #ffffff;
    border: solid 1px #ebebeb;
    .title {
      position: relative;
      padding: 0 20px;
      width: 728px;
      height: 46px;
      line-height: 46px;
      box-shadow: inset 0px -1px 0px 0px rgba(0, 0, 0, 0.08);
      .name {
        font-size: 16px;
        color: #4d4d4d;
        margin-right: 10px;
      }
      .count {
        font-size: 14px;
        color: #999999;
      }
      .checkAll {
        display: inline-block;
        position: absolute;
        right: 90px;
        top: 16px;
        width: 14px;
        height: 14px;
        background-color: #dedede;
        border-radius: 2px;
        border: solid 1px #d1d1d1;
        cursor: pointer;
      }
      .contra {
        font-size: 12px;
        color: #666666;
        cursor: pointer;
      }
      .del {
        position: absolute;
        right: 20px;
      }
      .checkall {
        position: absolute;
        right: 60px;
      }
    }
    .content {
          margin-bottom: 60px;
      ul {
        width: 100%;

        li {
          position: relative;
          min-height: 120px;
          box-shadow: inset 0px -1px 0px 0px rgba(0, 0, 0, 0.08);
          .colse {
            display: none;
          }
          &:nth-last-of-type(1) {
            box-shadow: none;
          }
          &:hover {
            background-color: #f8f8f8;
            .colse {
              display: block;
            }
          }
          overflow: hidden;
          .checkAllWrap {
            float: left;
            margin-left: 20px;
            .checkAll {
              margin-top: 13px;
              width: 14px;
              height: 14px;
              background-color: #dedede;
              border-radius: 2px;
              border: solid 1px #d1d1d1;
              cursor: pointer;
            }
          }
          .activedImg{
            float: left;
            margin-top: 12px;
            margin-left: 20px;
            width: 150px;
            height: 100px;
           // border: #b2b2b2 1px solid;
            img{
              width: 100%;
              height: 100%;             
            }
          }
          .msgsWarp {
            float: left;
            
            margin-left: 20px;
            padding-right: 20px;
            .itemtitle {
              position: relative;
              width: 100%;
              height: 40px;
              line-height: 40px;
              span {
                font-size: 16px;
                color: #333333;
                cursor: pointer;
              }
              .isReaderT{
                color: #999999;
              }
              .colse {
                position: absolute;
                right: 0px;
                top: 13px;
                cursor: pointer;
              }
            }
            .des {
              font-size: 14px;
              line-height: 24px;
              color: #666666;
              cursor: pointer;
            }
            .isReaderC{
              color: #b2b2b2;
            }
            .shows {
              font-size: 14px;
              line-height: 37px;
              color: #999999;
              .toDetail {
                margin-left: 20px;
                font-size: 14px;
                color: #359af8;
                cursor: pointer;
              }
            }
          }
          .sysmsgW{
            width: 660px;
          }
          .actmsgW{
            width: 492px;
          }
        }
      }
      .nodata{
        width: 100%;
        text-align: center;
        img{
          margin: 124px 0 40px 0;
        }
        p{
          font-size: 14px;
          color: #666666;
        }
      }
    }
    .isSelect {
      background: url("~/assets/images/common/select.png") no-repeat;
      background-size: 100%;
      border: none !important;
    }
  }
  .right_frame {
    flex: 270;
    //width: 270px;
    img{
      margin-bottom: 20px;
      width: 270px;
      height: 140px;
      border-radius: 2px;
    }
  }
}

.myMessages .pagination {
  width: 95%;
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 20px;
  overflow: hidden;
}
//elm ui
  // .el-message-box__btns /deep/ .el-button--primary{
  //   width: 60px !important;
  //   height: 32px !important; 
  // }
</style>