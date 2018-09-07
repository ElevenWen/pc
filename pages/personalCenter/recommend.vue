<template>
  <div class="recommend">
      <!-- 个人中心公共头部 -->
          <personalCenterHead ref="indexTriangle"></personalCenterHead>
          <publicPendantR></publicPendantR>
          <!-- 公共侧边 -->
          <div class="margin1200">
              <personalCenterSlide></personalCenterSlide>
              <!-- 右侧 -->
              <div class="right_frame">
                  <div class="img_container">
                      <img src="~assets/images/personalCenter/mycompany/ad.png" alt="">
                      <div class="qrcode_box">
                          <div id="qrcode">
                           <!-- <img src="~assets/images/personalCenter/mycompany/QQ1.png" alt="" class="scan"> -->
                          </div>
                      </div>
                  </div>
                  <div class="shareOther">
                      分享到：
                      <span @click="showModel(1)">
                          <img src="~assets/images/personalCenter/mycompany/xinlangs.png" alt="">
                      </span>
                    <!--   <span @click="showModel(2)">
                          <img src="../../assets/images/personalCenter/mycompany/wechat1.png" alt="">
                      </span> -->
                      <span @click="showModel(3)" v-if="false">
                          <img src="~assets/images/personalCenter/mycompany/renrens.png" alt="">
                      </span>
                      <span @click="showModel(4)">
                          <img src="~assets/images/personalCenter/mycompany/QQs.png" alt="">
                      </span>
                      <span @click="showModel(5)">
                          <img src="~assets/images/personalCenter/mycompany/doubans.png" alt="">
                      </span>
                  </div>
                  <div class="commendContainer">
                        <div class="title">
                        我的推荐
                        </div>
                        <div class="states">
                            <div class="left">
                                <p>
                                    已获得佣金（元）
                                </p>
                                <span>{{TotalAmount}}</span>
                            </div>
                            <div class="right">
                                <p>
                                    已邀好友（人）
                                </p>
                                <span>{{RecommendedNumber}}</span>
                            </div>
                        </div>
                        <div class="detail">
                            <div class="detailContainer">
                                <div class="title">
                                    <span>手机号码</span>
                                    <span>奖励佣金</span>
                                    <span>获取奖励日期 </span>
                                </div>
                                <div class="contentContail">
                                    <ul v-if="productLists">
                                        <li v-for="(item,index) in productLists" :key="item.Id">
                                            <div class="content odd">
                                                <div class="user">
                                                    <img :src="item.SourceCustomerHeadPic?item.SourceCustomerHeadPic:imgData" alt="">
                                                    <span>{{item.SourceCustomerMobile}}</span>
                                                </div>

                                                <div class="num">
                                                    +{{item.Amount}}
                                                </div>
                                                <div class="date">
                                                    {{item.timer}}
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="pagination">
                            <el-pagination v-if="CountPage"
                            @current-change="handleCurrentChange"
                            background layout="prev, pager, next" :total="CountPage"
                            :current-page="NowPage"
                            :page-size="pagesize"
                            prev-text='上一页' next-text='下一页'>
                            </el-pagination>
                        </div>
                  </div>

                  <!-- 分享弹窗 -->
                  <el-dialog class="sharDialogWrap"
               title="分享给好友"
               :visible.sync="sharDialogVisible"
               width="630px"
               center>
                    <div class="checkShar">
                        <span>分享到:</span>
                        <img :src="shareImg" alt="">
                    </div>
                    <el-input type="textarea" placeholder="" v-model="content" :maxlength="codeLength" > </el-input>
                    <div class="countText">还可以输入{{sharCodeLength}}字</div>
                    <div class="productList">
                        <p>选择配图:</p>
                        <div class="toleft"></div>
                        <div class="iclist">
                        <ul class="minIcon2">
                            <li><img :src="shareImgPc" alt=""></li>
                        </ul>
                        </div>
                        <div class="toright"></div>
                    </div>


                    <div slot="footer" class="dialog-footer">

                        <a :href="'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?'+qqParams" target="_blank" v-if="whichChannel == 'qq'">
                         <el-button type="danger" @click="shareFn('qqzone')" >分享</el-button>
                        </a>
                        <a :href="'http://v.t.sina.com.cn/share/share.php?'+xParams" target="_blank" v-else-if="whichChannel == 'xinlang'">
                          <el-button type="danger"  @click="shareFn('xinlang')" >分享</el-button>
                        </a>

                        <!-- <a name="xn_share" onclick="shareClick()" type="icon_large" href="javascript:;"></a> -->
                        <a  name="xn_share"  type="icon_large"  target="_blank" v-else-if="whichChannel == 'rrw'"  v-if="false">
                         <el-button type="danger" @click="shareFn('rrw')" >分享</el-button>
                        </a>
                        <a :href="'https://www.douban.com/recommend/?'+douParams" target="_blank" v-else-if="whichChannel == 'db'">
                         <el-button type="danger" @click="shareFn('db')"  >分享</el-button>
                        </a>



                        <!--  <el-button type="danger" v-else>分享</el-button> -->
                    </div>
                </el-dialog>
              </div>
          </div>
          <publicBottom></publicBottom>
  </div>
</template>

<style lang="less" scoped>
 @import './personalCenter_index.less';
 @import './recommend.less';
</style>


<script>
import personalCenterHead from '~/components/common/personalCenterHead'
import personalCenterSlide from "~/components/common/personalCenterSlide";
import publicBottom from '~/components/common/publicBottom'
import publicPendantR from '~/components/common/publicPendantR'
import getData from '~/store/ajaxAPI/getData.js'
import fmt from '~/assets/lib/tool.js'
import { otherLoginBind_login,recommend_mobileCode } from '~/store/ajaxAPI/vueDynamicParams.js';





export default {
  data(){
      return{
          RecommendedNumber:'', //已邀好友人数
          TotalAmount:'',   //已获佣金
          rebateListArr:[],  //列表数据
          imgData:require('~/assets/images/personalCenter/index/default.png'),
          CountPage:'',   //总商品条数
          NowPage: 1,     //当前页数
          pagesize: 10,   //每页条数
          Account:"",//邀请码
          sharDialogVisible: false,   //分享弹窗
          codeLength: 150,              //字数限制
          content:'我在@微企宝发现了一个非常不错的商品：', //分享内容
          shareImg:'',  //分享去哪的模态框图标
          shareImgPc:"",//分享出去的图片
          whichChannel:'',  //要分享的第三方
          qqParams:"",          //qq分享的参数
          xParams:"",           //新浪分享参数
          renParams:"",         //人人分享参数
          douParams:"",         //豆瓣分享参数
      }
  },
mounted(){
      this.GetMyRebateSummary()
      this.GetMyRebateList();
      getData.getcustorInfor().then((res)=>{//获取用户基本信息
          this.Account = res.data.Account;
          this.$nextTick((res)=>{ //生成二维码
              let qrcode = new QRCode( document.getElementById("qrcode"), {
                text: `${recommend_mobileCode}/activity/invitePoliteness?Account=${this.Account}`,
                width: 110,
                height: 110,
                colorDark : '#000000',
                colorLight : '#ffffff',
                correctLevel : QRCode.CorrectLevel.L,
              });
          })
      })




},
  methods:{

      //获取我的奖励汇总
      GetMyRebateSummary(){
          getData.myRebateSummary().then(res=>{
              //console.log(res.data,'哈哈哈')
              this.TotalAmount = res.data.TotalAmount
              this.RecommendedNumber = res.data.RecommendedNumber
              this.shareImgPc = res.data.Pic;
          }).catch(err=>{
              //console.log(err)
          })
      },
      //获取我的奖励列表
      GetMyRebateList(){
          getData.myRebateList().then(res=>{
              //console.log(res)
              var arr = res.data
            //   this.rebateListArr = res.data
              for(var i = 0;i<arr.length;i++){
                var str = arr[i].CreateTime.replace(/[^0-9]/ig,"")
                // //console.log(str)
                arr[i].timer = fmt.formatDate(str,"yyyy-MM-dd hh:mm:ss")
              }
              //console.log(arr)
              this.rebateListArr = arr
              this.CountPage = res.data.length
          }).catch(err=>{
              //console.log(err)
          })
      },
      //当前页
      handleCurrentChange(val) {
          this.NowPage = val;
        ////console.log(`当前页: ${val}`);
      },
      //点击图标弹出分享模态框
      showModel(goWhere){
          this.sharDialogVisible = true;
          if(goWhere==1){
              this.shareImg = require('~/assets/images/product/xinlang.png');
              this.whichChannel = 'xinlang';
          }else if(goWhere==3){
              this.shareImg = require('~/assets/images/product/rrw.png');
              this.whichChannel = 'rrw';
          }
          else if(goWhere==4){
              this.shareImg = require('~/assets/images/product/QQkj.png');
              this.whichChannel = 'qq';
          }
          else if(goWhere==5){
              this.shareImg = require('~/assets/images/product/dbw.png');
              this.whichChannel = 'db';
          }else{
              this.shareImg = require('~/assets/images/product/weixinpyq.png');
              this.whichChannel = 'wx';
          }
      },
      //分享方法
      shareFn(methodsFn){
        //console.log(methodsFn )
          // xinlang qq rrw db
          let link = otherLoginBind_login;//pc 端口的首页
          let title = this.content;//分享的内容
          let image = this.shareImgPc;//显示图片
          //console.log(this.shareImgPc , '123123123123123123')
          if(methodsFn =='xinlang'){
              window.open("http://v.t.sina.com.cn/share/share.php?url=" + link + "&title=" + title + "&content=utf8&pic=" + image);
          }else if(methodsFn =='qqzone'){//qq空间
              window.open("https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + link + "&title=" + title + "&pics=" + image);
          }else if(methodsFn =='rrw'){


        // <a name="xn_share" onclick="shareClick()" type="icon_large" href="javascript:;"></a>
           // alert(1)

           //    var rrShareParam = {
           //      resourceUrl : 'http://www.wqbol.com', //分享的资源Url
           //      srcUrl : 'http://www.wqbol.com',  //分享的资源来源Url,默认为header中的Referer,如果分享失败可以调整此值为resourceUrl试试
           //      pic : 'http://112.74.135.230:3214/Upload/images/0653c58d-47b3-4701-bb4c-0839abc1171d/db2d0f1f-7935-42a5-a381-f76ca8c33cf8.png',   //分享的主题图片Url
           //      title : 'title',   //分享的标题
           //      description : 'title'  //分享的详细描述
           //    };
           //    rrShareOnclick(rrShareParam);

           //    alert(2)




            // window.open("http://graph.renren.com/oauth/grant?resourceUrl=" + link + "&title=" + title + "&pic=" + image);




              // window.open("http://widget.renren.com/dialog/share?resourceUrl=" + link + "&title=" + title + "&pic=" + image);
          }else if(methodsFn =='db'){
              window.open("https://www.douban.com/recommend/?url=" + link + "&title=" + title + "&image=" + image);
          };


      },
  },
  updated(){
	  this.$refs.indexTriangle.$refs.indexTriangle.style.display = 'block';
  },
   computed:{
	   //计算当前显示页的商品数组
      productLists: function(){
        return this.rebateListArr.slice((this.NowPage-1)*this.pagesize,this.NowPage*this.pagesize)
      },
      //分享内容字数计算
    sharCodeLength: function () {
        var str = this.content;
        if(str.length <= 150){
          return 150-str.length;
        }else {
          return 0
        }
      }
  },
  components:{
   personalCenterHead,
   personalCenterSlide,
   publicBottom,
   publicPendantR
  }
}
</script>

