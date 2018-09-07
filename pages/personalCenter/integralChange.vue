<template>
  <div class="integralChange">
      <!-- 模态框开始 -->
      <div class="alert_bg" v-show="alert_ex">
      <!-- <div class="alert_bg" v-show="true"> -->
           </div>
          <!-- 成功的框 -->
          <div class="model" v-if="successModel">
              <div class="mod_title">
                  <span>温馨提示</span>
                  <button @click="closeEx">
                      <img src="~assets/images/personalCenter/asset/integral/notice.png" alt="">
                  </button>
              </div>
              <div class="mod_content">
                  <div class="img_box">
                      <img src="~assets/images/personalCenter/asset/integral/icon.png" alt="">
                  </div> 
                  <div class="model_right">
                      <h3>您已成功兑换该优惠券</h3>
                      <p>
                          <nuxt-link to="/personalCenter/coupon">查看我的优惠券</nuxt-link>
                          <span>|</span>
                          <a @click="continueChange">继续兑换</a>
                      </p>
                  </div> 
              </div>
          </div>
          <!-- 失败的框 -->
          <div class="lostModel" v-if="lostModel">
              <div class="mod_title">
                  <span>温馨提示</span>
                  <button @click="closeEx">
                      <img src="~assets/images/personalCenter/asset/integral/notice.png" alt="">
                  </button>
              </div>
              <div class="lost_content">
                  <img src="~assets/images/personalCenter/asset/integral/icon.png" alt="">
                  <p>不好意思，领取失败了呦，请您过会再来吧~</p>
                  <button @click="lostClose">确定</button>
              </div>
          </div>
    
          <!-- 模态框的结束 -->
      <!-- 个人中心公共头部 -->
          <personalCenterHead ref="indexTriangle"></personalCenterHead>
          <div class="margin1200">
              <!-- 公共侧边 -->
              <personalCenterSlide></personalCenterSlide>
              <!-- 右侧 -->
              <div class="right_frame">
                  <div class="img_container">
                      <img src="~assets/images/personalCenter/asset/integral/post.png" alt="">
                  </div>
                  <div class="title">
                      积分兑换
                  </div>
                  <div class="content">
                      <ul>
                          <li v-for="(item,index) in productLists" :key="item.Id">
                              <div class="tikets">
                                  <div class="quan">
                                      <p>
                                          <span>{{item.Coupon.Money}}</span>
                                          <span>元</span>
                                      </p>
                                      <p>通用券</p>
                                  </div>
                                  <div class="bottom">
                                      <p class="num">{{item.Title}}</p>
                                      <div class="left">
                                          <p>积分：{{item.Score}}</p>
                                          <p>库存：{{item.Coupon.Num}}</p>
                                      </div>
                                      <div class="right">
                                          <button @click="exchange(this,$event,item.Id)" :disabled="(!item.Status)" :class="{grey:(!item.Status)}">立即兑换</button>
                                      </div>
                                  </div>
                              </div>
                          </li>
                      </ul>
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
                   
              </div>
          </div>
          <publicBottom></publicBottom>
  </div>
</template>

<style lang="less" scoped>
 @import './personalCenter_index.less';
 .margin1200{
	 margin-top: 10px;
 }
  /*模态框的样式*/
.integralChange{
    position: relative;
}
.alert_bg{
    background: rgba(0,0,0,0.5);
	height: 100%;
	width: 100%;
	position: fixed;
	z-index: 11100;
}
.lostModel{
    position: absolute;
    width: 380px;
    height: 239px;
    background-color: #fff;
    margin: auto;
    top: 15%;
    z-index: 11200;
    left: 42%;
    .mod_title{
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ccc;
        padding: 0 15px 0 19px;
        text-align: right;
        span{
            display: inline-block;
            float: left;
        }
    }
    .lost_content{
        text-align: center;
        img{
            margin: 20px 0 30px 0px;
        }
        p{
            font-size: 16px;
            color: #333;
            margin-bottom: 30px;
        }
        button{
            width: 81px;
            height: 30px;
            background-color: #ff3e08;
            color: #fff;
            font-size: 12px;
        }
    }
}
.model{
    width: 380px;
    height: 186px;
    position: absolute;
    background-color: #fff;
    top: 15%;
    z-index: 11200;
    left: 42%;
    .mod_title{
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ccc;
        padding: 0 15px 0 19px;
        text-align: right;
        span{
            display: inline-block;
            float: left;
        }
    }
    .mod_content{
        padding: 40px 0 0 87px;
        div{
            float: left;
            &.img_box{
                margin-right: 10px;
            }
            &.model_right{
                h3{
                    font-size: 15px;
                    margin-bottom: 18px;
                }
                p{
                    a{
                        color: #359af8;
                        font-size: 12px;
                        cursor: pointer;
                    }
                    span{
                        font-size: 14px;
                        color: #359af8;
                        margin: 0 6px;
                    }
                }
            }
        }
    }
}
 .title{
     height: 50px;
     padding-top: 25px;
     color: #333333;
     font-size: 15px;
 }
 .content{
     background-color: #fff;
     padding: 20px 0px 25px 50px;
     ul{
         overflow: hidden;
         li{
             width: 205px;
             height: 260px;
             border: 1px solid #eee;
             float: left;
             text-align: center;
             margin-right: 33px;
             margin-bottom: 30px;
             &:hover{
                 border: 1px solid #ff3e08;
             }
             .tikets{
                 margin-top: 40px;
                 padding: 0 15px;
                 .quan{
                     width: 150px;
                     height: 84px;
                     margin: 0 auto;
                     background: url(~assets/images/personalCenter/asset/integral/优惠券背景.png);
                     padding-top: 15px;
                     color: #f7e7dd;
                     margin-bottom: 45px;
                    p:nth-child(1){
                        margin-bottom: 5px;
                         span:nth-child(1){
                         font-size: 34px;
                         font-family: CTChaoHeiSF;
                     }
                    }
                    p:nth-child(2){
                        font-size: 11px;
                    }
                 }
             }
             .bottom{
                 text-align: left;
                 width: 100%;
                 color: #333333;
                 .num{
                     font-size: 16px;
                     margin-bottom: 15px;
                 }
                 div{
                     float: left;
                     &.left{
                         font-size: 11px;
                         color: #666;
                         line-height: 20px;
                         margin-right: 42px;
                     }
                     &.right{
                         button{
                             width: 73px;
                             height: 28px;
                             line-height: 26px;
                             border-radius: 14px 14px 14px 14px;
                             border: solid 1px rgba(252, 123, 3, 1);
                             margin-top: 8px;
                             font-size: 14px;
                             color: #fc7b03;
                             font-weight: bold;
                             &.grey{
                                 border: solid 1px #ccc;
                                 color: #ccc;
                             }
                         }
                         
                     }
                 }
             }
         }
     }
 }
.el-pagination{
    text-align: right;
    padding-right: 45px;
 }
</style>


<script>
import personalCenterHead from '~/components/common/personalCenterHead'
import personalCenterSlide from "~/components/common/personalCenterSlide";
import publicBottom from '~/components/common/publicBottom'
import getData from '~/store/ajaxAPI/getData.js'
export default {
  data(){
      return{
          alert_ex:false,
          //积分券列表数组
          ListArr:[],
          lostModel:true,
          successModel:true,
          CountPage:'',   //总券条数
          NowPage: 1,     //当前页数
          pagesize: 12,   //每页条数
      }
  },
  methods:{
      //确认兑换积分
      exchange(data,data1,id){
              $(data1.target).attr('disabled',true) 
              $(data1.target).attr('class','grey') 
          var params = {
              id:id,
              dataType:"json"
          }
          getData.comfirmChange(params).then(res=>{
              //console.log('兑换成功',res.msg)
              this.alert_ex = true; 
              this.successModel = true;
          }).catch(err=>{
              //console.log('兑换失败',err)
              this.alert_ex = true; 
              this.lostModel = true;
          })
      },
      closeEx(){
          this.alert_ex = false;
          this.successModel = false;
          this.lostModel = false;
      },
      //获取积分券列表数据
      getList(){
          var params = {
              type:0
          }
          getData.integralChange(params).then(res=>{
              //console.log(res.data)
              this.ListArr = res.data
              this.CountPage = res.data.length
          }).catch(err=>{
              //console.log(err)
          })
      },
      //点击继续兑换
      continueChange(){
          window.location.reload()
      },
      //兑换失败弹框-点击确定
      lostClose(){
          this.alert_ex = false;
          this.lostModel = false;
      },
      handleCurrentChange(val) {
          this.NowPage = val;
        ////console.log(`当前页: ${val}`);
      }
  },
   computed:{
	   //计算当前显示页的商品数组
      productLists: function(){
        return this.ListArr.slice((this.NowPage-1)*this.pagesize,this.NowPage*this.pagesize)
      },
  },
  mounted(){
      this.$refs.indexTriangle.$refs.indexTriangle.style.display = 'block';
      this.closeEx()
      this.getList()
  },
  components:{
   personalCenterHead,
   personalCenterSlide,
   publicBottom,
  }
}
</script>

