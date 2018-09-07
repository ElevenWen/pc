<template>
  <div class="mycompanyModify">
      <!-- 个人中心公共头部 -->
          <personalCenterHead ref="indexTriangle"></personalCenterHead>
          <!-- 公共侧边 -->
          <div class="margin1200">
              <personalCenterSlide></personalCenterSlide>
              <!-- 右侧 -->
              <div class="right_frame suggestBox">
                  <div class="title">
                      投诉建议
                  </div>
                  <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="类型">
                        <el-radio-group v-model="form.resource">
                        <el-radio label="建议"></el-radio>
                        <el-radio label="投诉"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="标题:">
                        <el-input class="small_inp" v-model="form.name" placeholder="请填写标题" :maxlength="45"></el-input>
                    </el-form-item>
                    <el-form-item label="内容:">
                        <el-input type="textarea" v-model="form.desc" placeholder="请填写内容" :maxlength="220"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交建议</el-button>
                    </el-form-item>
                    </el-form>
                    <!-- 历史列表 -->
                    <div class="history">
                        <div class="h_title">
                            <span class="list_title">历史列表</span>
                            <span class="btn_container">
                                <ul>
                                    <li :class="{active:isActive1}" @click="getList">全部</li>
                                    <li :class="{active:isActive2}" @click="getList(0)">投诉</li>
                                    <li class="advice" :class="{active:isActive3}" @click="getList(1)">建议</li>
                                </ul>
                            </span>
                        </div>
                        <div class="content">
                           <ul v-if="productLists">
                               <li v-for="(item,index) in productLists" :key="item.Id">
                                    <div class="con_title">
                                        标题：<span>{{item.Source==1?'来自App':item.Title}}</span>&nbsp;&nbsp;({{item.timer}})
                                    </div>
                                    <div class="con_content">
                                        {{item.Content}}
                                    </div>
                                    <div class="replay" v-if="item.Reply">
                                        <span>客服{{item.ReplyUser}}</span>回复<span>{{item.CreateUser}}:</span>
                                        {{item.Reply}}
                                    </div>
                               </li>
                               <div class="pagination">
                                <el-pagination v-if="CountPage"
                                @current-change="handleCurrentChange"
                                background layout="prev, pager, next" :total="CountPage" 
                                :current-page="NowPage"
                                :page-size="pagesize"
                                prev-text='上一页' next-text='下一页'>
                                </el-pagination>
                            </div>
                           </ul>
                           
                        </div>
                    </div>
              </div>
          </div>
          <publicBottom></publicBottom>
  </div>
</template>

<style lang="less" scoped>
 @import './personalCenter_index.less';
 .mycompanyModify .suggestBox{
     padding-bottom: 0;
 }
 .el-pagination{
     text-align: right;
     padding: 0px;
 }
 .title{
     height: 46px;
     line-height: 46px;
     font-size: 16px;
     border-bottom: 1px solid #eee;
     background-color: #fff;
     padding-left: 20px;
 }
 .el-form{
     height: 381px;
     background-color: #fff;
     padding-top: 20px;
     padding-left: 120px;
 }
 .el-input__inner{
     width: 360px;
     height: 40px;
 }
 .history{
     .h_title{
         height: 56px;
         line-height: 56px;
         border-top: 1px solid #eee;
         background-color: #fff;
         position: relative;
         .list_title{
             position: absolute;
             left: 30px;
             top: 0;
             font-size: 15px;
         }
         .btn_container{
             display: inline-block;
             width: 136px;
             height: 26px;
             margin-top: 15px;
             display: inline-block;
             margin-left: 850px;
             border: 1px solid #359af8;
             ul{
                 height: 26px;
                 font-size: 12px;
                 li{
                     width: 45px;
                     height: 25px;
                     line-height: 28px;
                     text-align: center;
                     float: left;
                     border-right: 1px solid #359af8;
                     color: #359af8;
                     cursor: pointer;
                     margin-top: -1px;;
                     &:nth-child(1){
                         width: 44px;
                     }
                     &:nth-child(2){
                         width: 44px;
                     }
                     &:nth-child(3){
                         border: 0;
                         width: 46px;
                     }
                     &.active{
                         color: #fff;
                         background-color: #359af8;
                     }
                 }
             }
         }
     }
     .content{
         ul{
             padding: 0px 30px 30px 30px;
             border: 1px solid #fff;
             background-color: #fff;
             border-top:  0;
             li{
                 border: 1px solid #eee;
                 margin-bottom: 20px;
                 .con_title{
                    height: 40px;
                    padding-left: 16px;
                    line-height: 40px;
                    background-color: #fbfbfb;
                    border-bottom: 1px solid #eee;
                    font-size: 13px;
                }
                .con_content{
                    padding: 19px 15px 18px 25px;
                    background-color: #fff;
                    line-height: 26px;
                    word-wrap: break-word;
                }
                .replay{
                    height: 50px;
                    line-height: 50px;
                    margin: 0 25px 0 19px;
                    border-top: 1px dashed #eee;
                    span{
                        color: #359af8;
                    }
                }
             }
         }
     }
 }
</style>


<script>
import personalCenterHead from '~/components/common/personalCenterHead'
import personalCenterSlide from "~/components/common/personalCenterSlide";
import publicBottom from '~/components/common/publicBottom'
import getData from '~/store/ajaxAPI/getData.js'
import fmt from '~/assets/lib/tool.js'
export default {
 data() {
      return {
        form: {
          name: '',
          resource: '',
          desc: ''
        },
        listArr:[], //列表数组
        isActive1:true,
        isActive2:false,
        isActive3:false,
        // showReplay:true
        CountPage:'',   //总商品条数
        NowPage: 1,     //当前页数
        pagesize: 10,   //每页条数
      }
    }, 
    mounted(){
      this.getList()
    },
    updated(){
	  this.$refs.indexTriangle.$refs.indexTriangle.style.display = 'block';
  },
    methods: {
      //新增投诉建议
      onSubmit() {
          var params = {
              title:this.form.name,
              type:this.form.resource=='投诉'?0:1,
              content:this.form.desc,
              source:0,
          }
          if(!this.form.name||this.form.resource==''){
              this.$message.error('类型和标题为必填选项，请填写或选择');
            //   alert('类型和标题为必填选项，请填写或选择')
              return;
          }
        getData.CreateComplaintAndAdvice(params).then(res=>{
            //console.log('新增成功',res.msg)
            this.getList()
            this.form.name = '';
            this.form.resource = '';
            this.form.desc = '';
            // alert('提交成功！')
            this.$message({
                message: '提交成功！',
                type: 'success'
            });
        }).catch(err=>{
            //console.log(err)
            this.$message.error('提交失败，'+err.data.msg);
            // alert('提交失败，'+err.data.msg)
        })
      },
      //获取全部历史列表
      getList(data){
          var params = {
              type:data,
              dataType:'json'
          }
          if(data==0){
              this.isActive1 = false
              this.isActive2 = true
              this.isActive3 = false
          }else if(data==1){
              this.isActive1 = false
              this.isActive2 = false
              this.isActive3 = true
          }else{
              this.isActive1 = true
              this.isActive2 = false
              this.isActive3 = false
          }
          getData.ComplaintAndAdviceList(params).then(res=>{
              //console.log(res.data)
              let arr = res.data
              for(var i = 0;i<arr.length;i++){
                var str = arr[i].CreateDate.replace(/[^0-9]/ig,"")
                arr[i].timer = fmt.formatDate(str,"yyyy-MM-dd hh:mm:ss")
              }
              this.listArr = res.data
              this.CountPage = res.data.length
          }).catch(err=>{
              //console.log(err)
          })
      },
      //当前页
      handleCurrentChange(val) {
          this.NowPage = val;
        ////console.log(`当前页: ${val}`);
      }
    },
    computed:{
	   //计算当前显示页的商品数组
      productLists: function(){
        return this.listArr.slice((this.NowPage-1)*this.pagesize,this.NowPage*this.pagesize)
      },
  },
  components:{
   personalCenterHead,
   personalCenterSlide,
   publicBottom,
  }
}
</script>

