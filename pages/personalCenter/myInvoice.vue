<template>
  <div class="myInvoice">
      <!-- 模态框 还要补写-->
          <!-- <supplementalInvoice @closeBilDialog='closeBilDialogFn' v-if='showBillDialog'></supplementalInvoice> -->
      <!-- 个人中心公共头部 -->
          <personalCenterHead ref="indexTriangle"></personalCenterHead>
          <publicPendantR></publicPendantR>
          <!-- 公共侧边 -->
          <div class="margin1200">
              <personalCenterSlide></personalCenterSlide>
              <!-- 右侧 -->
              <div class="right_frame">
                  <div class="top_title">
                      <span>我的发票</span>
                      <!-- <span>
                          <img src="~assets/images/personalCenter/mycompany/kefu.png" alt="">
                          <a href="javascript.void(0)">联系客服</a>
                      </span> -->
                  </div>
                  <div class="content">
                      <div class="top_state">
                          <span class="state_detail">订单详情</span>
                          <span class="invoice_state">发票类型</span>
                          <span class="states">状态</span>
                          <span>操作</span>
                      </div>
                      <div class="ul_container">
                          <ul>
                              <li v-for="(item,index) in productLists" :key="item.Id">

                                  <div class="zujian">
                                      <!--<supplementalInvoice @closeBilDialog='closeBilDialogFn' :orderId='{order:item.Id,index:index}'  v-if='showBillDialog[index]' ></supplementalInvoice>-->
                                 </div>
                                    <table class="commodity_list">
										<thead>
											<tr>
												<td colspan="2">
													<span class="order_form_time">{{item.timer}}</span>
													<span>订单编号：</span>
													<span class="order_form_id color_DD">{{item.OrderNumber}}</span>
													<span class="order_form_name color_DD">{{item.companyName}}</span>
												</td>
												<td colspan="2" class="intervalTd">
													<span class="color_DD" v-if="item.OrderStatus == '待付款'">支付剩余时间:</span>
													<span v-customTimeInter v-if="item.OrderStatus == '待付款'" class="remain_time color_FF">
														{{item.CreateTime}}
													</span>
													<span class="delete_img" v-if="item.OrderStatus == '已取消'">
														<img src="~assets/images/personalCenter/order/delete.png" alt="" @click="showDeleteModel(this,$event,item.Id)">
													</span>
												</td>
											</tr>
										</thead>
										<tbody class="color_DD">
											<tr>
												<td>
													<div v-for="(items,index) in item.OrderDetails" :key="items.Id" class="div_line">
														<div class="detailBox">
															<span class="img_box">
																<img :src="items.Img" @click="toProduct(items.ProductIdd,items.type=='产品'?0:1)" class="productPic">
															</span>
															<span class="enterprise_name" @click="toProduct(items.ProductIdd,items.type=='产品'?0:1)">{{items.Name}}</span>
															<span class="productType">{{items.ProductType}}</span>
															<span class="quantity">×{{items.Num}}</span>
														</div>
													</div>
												</td>
												<td>
													<span>{{item.CusInvoiceType}}</span>
												</td>
												<td>
													 <span class="b_state not" :class="{isGreen:item.InvoicePath}">
                                                        <span v-if="item.InvoicePath">已开</span>
                                                        <span v-if="item.CusInvoiceId&&!item.InvoicePath">开票中</span>
                                                        <span v-if="!item.CusInvoiceId">未开</span>
                                                     </span>
												</td>
												<td>
													<span class="supply">
                                                        <button v-if="!item.CusInvoiceId" @click="bukai(this,$event,index)">补开发票</button>
                                                        <a @click="invoiceDetail(item.CusInvoiceId,item.OrderNumber,item.Id)" v-if="item.CusInvoiceId">发票详情</a>
                                                    </span>
												</td>
											</tr>
										</tbody>
									</table>
                              </li>
                          </ul>
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
              </div>
          </div>
          <publicBottom></publicBottom>
  </div>
</template>

<style type="stylesheet/css"  lang="less" scoped>
@import "./personalCenter_index.less";
@import './all_order.less';
.pagination{
    text-align: right;
}
.zujian{
     /*display: none;*/
}
#message_invoice{
    width: 100%;
    height: 100%;
}
.top_title {
  height: 46px;
  line-height: 46px;
  border: 1px solid #eee;
  padding: 0 19px;
  background-color: #fff;
  margin-bottom: 20px;
  span {
    display: inline-block;
    height: 100%;
    line-height: 45px;
    &:nth-child(1) {
      font-size: 15px;
      color: #333;
      margin-right: 840px;
    }
    img {
      vertical-align: middle;
      margin-right: 3px;
      width: 20px;
      height: 22px;
    }
    a {
      font-size: 12px;
      color: #359af8;
    }
  }
}
.content {
  background-color: #fff;
  padding: 20px 20px 30px 20px;
  .top_state {
    height: 45px;
    line-height: 45px;
    border: 1px solid #e6e6e6;
    background-color: rgba(245, 245, 245, 1);
    margin-bottom: 21px;
    padding-left: 120px;
    span {
      font-size: 14px;
      color: #333;
      margin: 0;
      padding: 0;
      &.state_detail {
        margin-right: 366px;
      }
      &.invoice_state {
        margin-right: 116px;
      }
      &.states {
        margin-right: 130px;
      }
    }
  }
  .ul_container li{
      height: 140px;
      border: 1px solid #eee;
      margin-bottom: 20px;
        .d_top{
            height: 40px;
            line-height: 40px;
            background-color: rgba(245, 245, 245, 1);
            padding-left: 15px;
            color: #8c8c8c;
            .date{
                font-size: 8px;
                margin-right: 18px;
            }
            .d_detail{
                font-size: 12px;
            }
            .num{
                color: #4d4d4d;
                font-size: 12px;
            }
        }
        .bottom{
            line-height: 100px;
            padding-left: 15px;
            span:nth-child(1){
                display: inline-block;
                width: 488px;
                border-right: 1px solid #eee;
                img{
                vertical-align: middle;
                margin-right: 10px;
                cursor: pointer;
                }
                .d_name{
                    display: inline-block;
                    width: 264px;
                    line-height: 20px;
                    font-size: 12px;
                    margin-right: 94px;
                    cursor: pointer;
                    a{
                        color: #333;
                        &:hover{
                        color: red;
                    }
                    }
                }
                .sum{
                    font-size: 9px;
                    color: #999;
                }
            }
            .type{
                display: inline-block;
                width: 158px;
                // border-right: 1px solid #eee;
                box-sizing: border-box;
                text-align: center;
                font-size: 12px;
                color: #666;
            }
            .b_state{
                display: inline-block;
                width: 158px;
                text-align: center;
                font-size: 12px;
                color: #5fb337;
                border-right: 1px solid #eee;
                border-left: 1px solid #eee;
                box-sizing: border-box;
                &.not{
                    color: red;
                }
                &.isGreen{
                    color: #5fb337;
                }
            }
            .supply{
                display: inline-block;
                width: 146px;
                text-align: center;
                button{
                    width: 84px;
                    height: 30px;
                    border: 1px solid #ccc;
                    font-size: 12px;
                    color: #666;
                    line-height: 0;
                    &:hover{
                        color: red;
                        border: 1px solid red;
                    }
                }
                a{
                    color: #666;
                    font-size: 12px;
                    &:hover{
                        cursor: pointer;
                    }
                }
            }
        }
  }
}

table{
    border-collapse:collapse;
    .supply{
                display: inline-block;
                width: 146px;
                text-align: center;
                button{
                    width: 84px;
                    height: 30px;
                    border: 1px solid #ccc;
                    font-size: 12px;
                    color: #666;
                    line-height: 0;
                    &:hover{
                        color: red;
                        border: 1px solid red;
                    }
                }
                a{
                    color: #666;
                    font-size: 12px;
                    &:hover{
                        cursor: pointer;
                    }
                }
            }
    .not{
            color: red;
        }
    .isGreen{
            color: #5fb337;
        }
}
.content .ul_container li{
    height: auto;
    border: none;
    margin-bottom: 0;
}
</style>


<script>
import personalCenterHead from "~/components/common/personalCenterHead";
import personalCenterSlide from "~/components/common/personalCenterSlide";
import publicBottom from "~/components/common/publicBottom";
import publicPendantR from "~/components/common/publicPendantR";
//import supplementalInvoice from "~/components/common/billDialog/billDialog"
import getData from '~/store/ajaxAPI/getData.js'
import fmt from '~/assets/lib/tool.js'
import Vue from 'vue'

export default {
  data() {
    return {
        invoiceListArr:[],
        CountPage:'',   //总商品条数
        NowPage: 1,     //当前页数
        pagesize: 10,   //每页条数
        showBillDialog:[]  //补开发票弹框
    };
  },
  mounted(){
      this.getInvoiceList();
  },
  updated(){
	  this.$refs.indexTriangle.$refs.indexTriangle.style.display = 'block';
  },
  methods:{
      //获取发票列表
      getInvoiceList(){
          getData.invoiceList().then(res=>{
              //console.log('发票列表列表',res.data.list)
              var arr = res.data.list
              for(var i=0;i<arr.length;i++){
                  var str = arr[i].CreateTime.replace(/[^0-9]/ig,"")
				  arr[i].timer = fmt.formatDate(str,"yyyy-MM-dd hh:mm:ss")
              }
              this.invoiceListArr = res.data.list;
              let len = this.invoiceListArr.length
            //   //console.log('this.invoiceListArr',this.invoiceListArr );
              for(var i =0 ; i< len ;i++){
                this.showBillDialog.push(false) ;
              }
              //console.log(this.showBillDialog)

              this.CountPage = res.data.list.length
          }).catch(err=>{
              //console.log(err)
          })
      },
      //点击发票详情传入id
      invoiceDetail(id,OrderNumber,orderId){
          this.$router.push({path:'/personalCenter/invoiceDetail',query:{id:id,OrderNumber:OrderNumber,orderId:orderId}})
      },
      //当前页
      handleCurrentChange(val) {
          this.NowPage = val;
        ////console.log(`当前页: ${val}`);
      },
      //点击图片去商品详情
      toProduct(proId,type){
        //   this.$router.push({path:'/productDetails',query:{id:proId,type:type}});
          this.$router.push({
			path:'/productDetails/' + proId + '/' + type
		  });
      },
      //点击补开发票弹框
      bukai(data,data1,index){
          //console.log(index,'???',this.showBillDialog[index]);
        //   this.showBillDialog[index] = true;
        //    //console.log(index,'???',this.showBillDialog[index]);
           Vue.set(this.showBillDialog,index,true);
            //console.log(index,'???',this.showBillDialog);


        //   //console.log('hahahahah',$(data1.target).parent().parent().siblings(".zujian"))
        //   this.showBillDialog = true;
        // $(data1.target).parent().parent().siblings(".zujian").css('display','block');

        // $('.zujian').css('display','block')
      },
      //关闭模态窗口
      closeBilDialogFn(data){ //接受billDialog.vue 传递过来的值
        //console.log('12312',data)
        //console.log('12312',data);
        Vue.set(this.showBillDialog,data.index,data.flag);//关闭模态窗口
      },
  },
  computed:{
	   //计算当前显示页的发票数组
      productLists: function(){
        return this.invoiceListArr.slice((this.NowPage-1)*this.pagesize,this.NowPage*this.pagesize)
      },
  },
  components: {
 personalCenterHead,
 personalCenterSlide,
 publicBottom,
 publicPendantR,
//  supplementalInvoice
  }
};
</script>

