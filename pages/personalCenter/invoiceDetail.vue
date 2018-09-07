<template>
  <div class="myInvoice">
      <!-- 个人中心公共头部 -->
          <personalCenterHead ref="indexTriangle"></personalCenterHead>
          <publicPendantR></publicPendantR>
          <!-- 公共侧边 -->
          <div class="margin1200">
              <personalCenterSlide></personalCenterSlide>
              <!-- 右侧 -->
              <div class="right_frame">
                  <div class="top_title">
                      <span class="return">
                          <nuxt-link to="/personalCenter/myInvoice/">
                          <img src="~assets/images/personalCenter/mycompany/return.png" alt="">
                          返回
                          </nuxt-link>
                      </span>
                      <span class="pre">我的发票</span>
                      <span class="now">&lt; 发票详情</span>
                  </div>
                  <div class="detail">
                      <div class="d_top">
                          <span>发票信息</span>&nbsp;&nbsp;
                          <span>订单号：{{this.$route.query.OrderNumber}}</span>
                      </div>
                      <div class="content">
                          <div class="left">
                              <ul>
                                  <li>发票类型</li>
                                  <li>发票内容</li>
                                  <li>发票抬头</li>
                                  <li>发票代码</li>
                                  <li>发票号码</li>
                              </ul>
                          </div>
                          <div class="right">
                              <ul>
                                  <li>{{Type}}</li>
                                  <li>明细</li>
                                  <li>{{obj.Name}}</li>
                                  <li>{{obj.InvoiceCode}}</li>
                                  <li>{{obj.InvoiceNumber}}</li>
                              </ul>
                          </div>
                      </div>
                  </div>
                  <div class="download">
                      
                      
                       
                      
                      <a v-if="obj.InvoicePath" :href="obj.InvoicePath" download="发票">
                          <img src="~assets/images/personalCenter/download.png" alt="">
                          下载电子发票
                      </a>
                  </div>
              </div>
          </div>
          <publicBottom></publicBottom>
  </div>
</template>

<style lang="less" scoped>
@import "./personalCenter_index.less";
.top_title {
  height: 46px;
  line-height: 46px;
  border: 1px solid #eee;
  padding: 0 10px;
  background-color: #fff;
  margin-bottom: 20px;
  span {
    display: inline-block;
    height: 100%;
    line-height: 26px;
    font-size: 12px;
    img{
        vertical-align: middle;
    }
    &.return{
        cursor: pointer;
        a{
            color: #666;
            &:active{
                color: #666;
            }
        }
    }
    &.pre{
        display: inline-block;
        height: 26px;
        margin-top: 10px;
        margin-left: 18px;
        color: #999;
        border-left: 1px solid #eee;
        padding-left: 20px;
    }
    &.now{
        color: #333;
    }
  }
}
.detail{
    border: 1px solid #eee;
    .d_top{
        height: 47px;
        line-height: 47px;
        background-color: #fcfcfd;
        padding-left: 20px;
        font-size: 12px;
        color: #333;
    }
    .content{
        overflow: hidden;
        height: 250px;
        background-color: #fff;
         ul{
                li{
                    height: 50px;
                    line-height: 50px;
                    border-top: 1px solid #eee;
                    font-size: 14px;
                }
            }
        .left{
            width: 243px;
            border-right: 1px solid #eee;
            float: left;
            background-color: #f9f9fc;
            ul{
                li{
                    text-align: right;
                    padding-right: 21px;
                }
            }
        }
        .right{
            float: left;
            width: 775px;
            ul{
                li{
                    padding-left: 20px;
                    color: #666;
                }
            }
        }
    }
}
.download{
    margin-left: 900px;
    margin-top: 20px;
    cursor: pointer;
    a{
        color:#6f6f6f;
        font-size: 12px;
    }
}

</style>


<script>
import personalCenterHead from "~/components/common/personalCenterHead";
import personalCenterSlide from "~/components/common/personalCenterSlide";
import publicBottom from "~/components/common/publicBottom";
import publicPendantR from "~/components/common/publicPendantR";
import getData from '~/store/ajaxAPI/getData.js'
import { invoiceDetail_invoice } from '~/store/ajaxAPI/vueDynamicParams.js';



export default {
  data() {
    return {
        obj:{},
        Type:''
    };
  },
  mounted(){
      this.getDetaile()
      this.$refs.indexTriangle.$refs.indexTriangle.style.display = 'block';
  },
  methods:{
      getDetaile(){
          var params = {
              id:this.$route.query.id,
              orderId:this.$route.query.orderId,
              dataType:'json'
          }
          getData.GetCusInvoiceById(params).then(res=>{
            //   console.log('发票详情详情',res)
              this.obj = res.data;
            //   <a v-if="obj.InvoicePath" :href="'http://manage.wqbol.com'+obj.InvoicePath" download="发票">
              this.obj.InvoicePath = `${invoiceDetail_invoice}/${res.data.InvoicePath}`; //发票下载

              if(res.data.Type==0){
                  this.Type ='增值税普通'
              }else if(res.data.Type==1){
                  this.Type ='增值税专用'
              }else if(res.data.Type==2){
                  this.Type ='个人'
              }
          }).catch(err=>{
              //console.log(err)
          })
      }
  },
  mounted(){
	  this.$refs.indexTriangle.$refs.indexTriangle.style.display = 'block';
  },
  components: {
 personalCenterHead,
 personalCenterSlide,
 publicBottom,
 publicPendantR
  }
};
</script>

