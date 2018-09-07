<template>
  <div class="orderDetail">
      
      <!-- 个人中心公共头部 -->
          <personalCenterHead></personalCenterHead>
          <publicPendantR></publicPendantR>
          <div class="announcement">
			<div>重要提醒：微企宝平台及销售商不会以任何理由，要求您点击任何网址链接进行退款操作。</div>
		</div>
          <!-- 公共侧边 -->
          <div class="margin1200">
              <div class="location"><nuxt-link to="/personalCenter/personalCenterIndex">我的微企宝</nuxt-link> &gt; <nuxt-link to="/personalCenter/allOrder">订单中心</nuxt-link> &gt; <span>订单：{{detail.OrderNumber}}</span></div>
              <!-- 右侧 -->
              
                  <div class="detail">
                      <div class="d_titel">
                          <span>订单详情</span>
                          <span v-if="detail.ProcessingState == '待付款'" class="remainder">剩余</span>
                          <span v-customTimeInter v-if="detail.ProcessingState == '待付款'" class="remain_time color_FF">
														{{detail.EndTime}}
												  </span> 
                          <!-- <span class="kefuImg">
                              <span><img src="~assets/images/personalCenter/mycompany/kefu.png" alt=""></span>
                              <span>联系客服</span>
                              <span  v-if="detail.ProcessingState=='已完成'">
                                  <img src="~assets/images/personalCenter/order/print.png" alt="">
                              </span>
                              <span  v-if="detail.ProcessingState=='已完成'">打印电子合同</span>
                          </span> -->

                          <span v-if="isShowContract">
                          	
                          <span v-if="isSignContract">
                              <!-- <span class="contract"><i class="iconDown"></i>下载电子合同</span> -->
                              <a :href="downContract"  download="下载" class="contract" style="color:black;"> 
                                    <i class="iconDown"></i>下载电子合同
                              </a>
                              <span class="contract" @click="toContract"><i class="iconSee"></i>查看电子合同</span>
                          </span>
                          <span class="contract" @click="toContract" v-else><i class="iconSee"></i>签署电子合同</span>
                          <span class="viewDefault" @click="toDefaultEc">查看默认合同</span>
                          </span>
                      </div>
                      <div class="d_progress">
                          <div class="dp_top">
                              <span>订单编号：{{detail.OrderNumber}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <span>当前状态：{{detail.ProcessingState}}</span>
                              <button v-if="detail.ProcessingState == '待付款'" @click="buyNow(detail)">立即支付</button>
                              <button v-if="detail.ProcessingState == '待付款'" @click="otherPay(detail)" class="otherP">找人代付</button>
                              <button v-if="detail.ProcessingState == '已取消'||detail.ProcessingState == '已完成'" @click="buyAgain(detail.Id)">再次购买</button>
                              <!-- <button v-if="detail.ProcessingState == '待评价'||detail.ProcessingState == '办理中'">立即评价</button> -->
                          </div>
                          <div class="dp_content" v-if="detail.ProcessingState != '已取消'">
                              <div class="img_box">
                                  <img src="~assets/images/personalCenter/order/waitPay.png" alt="" v-if="detail.ProcessingState == '待付款'">
                                  <img src="~assets/images/personalCenter/order/banlizhong.png" alt="" v-if="detail.ProcessingState == '待评价'">
                                  <img src="~assets/images/personalCenter/order/done.png" alt="" v-if="detail.ProcessingState == '已完成'">
                                  <img src="~assets/images/personalCenter/order/banlizhong.png" alt="" v-if="detail.ProcessingState == '办理中'">
                              </div>
                              <div class="state_time">
                                  <span>{{detail.Cretimer}}</span>
                                  <span v-if="detail.ProcessingState != '待付款'">{{detail.Paytimer}}</span>
                                  <span v-if="detail.ProcessingState != '待付款'">{{detail.Acceptimer}}</span>
                                  <span v-if="detail.ProcessingState == '已完成'">{{detail.Comtimer}}</span>
                              </div>
                         </div>
                         <div class="dp_cancel" v-if="detail.ProcessingState == '已取消'">
                              <div class="img_box">
                                  <img src="~assets/images/personalCenter/order/cancelOrder.png" alt="">
                              </div>
                              <div class="state_time">
                                  <span>{{detail.Cretimer}}</span>
                                  <span>{{detail.canceltimer}}</span>
                                  <span>{{detail.canceltimer}}</span>
                              </div>
                         </div>
                      </div>
                      
                  </div>
              <div class="progress" v-if="detail.ProcessingState != '待付款'">
                  <div class="p_title">
                      办理进度
                  </div>
                  <div class="p_datail">
                    
                    <!--商品内容-->
                    <div class="serviceProgress">
                    	<span class="totalNum">共{{productKind}}个商品</span>
                    	
                    	<!--下拉选择-->
                    	<el-select v-model="value" placeholder="请选择" popper-class="orderDropList" @change="toChange">
										    <el-option
										      v-for="item in options"
										      :key="item.value"
										      :label="item.label"
										      :value="item">
										    </el-option>
										  </el-select>
										  
										  <span class="second">可切换商品查看各商品的进度</span>
                    </div>
                    
                    <!--进度内容-->
                    <div class="p_content_scroll">
                    	<!--无信息-->
                    	<div class="noData" v-if="len == 0">
                    		暂无进度信息
                    	</div>
                    	
                    	<!--有数据-->
	                    <div class="p_content" :class="{greenColor:item.isShowGreen }" v-for="(item,index) in logArr" :key="index">
	                    	
		                    <div class="time">
		                    	<!--圈圈-->
	                        <div class="circle active">
	                        	<!--待处理-->
	                        	<img  v-if="item.TaskState == 0" src="~assets/images/personalCenter/order/notAt.png" alt="" width="10" height="10">
	                        	<!--处理中-->
	                          <img  v-if="item.TaskState == 1" src="~assets/images/personalCenter/order/ongoing.png" alt="" width="10" height="10">
	                          <!--已完成-->
	                          <img  v-if="item.TaskState == 2" src="~assets/images/personalCenter/order/complete.png" alt="" width="10" height="10">
	                        </div>
	                        
	                        <div class="p_content_right">
		                        <span class="timeSpan" :class="item.TaskState == 0 ? 'selected' : ''">{{item.time}}</span>
		                        <span class="timeHour" :class="item.TaskState == 0 ? 'active' : ''">{{item.timeHour}}</span>
		                        <span class="content" :class="index==2 ? 'active' : ''">
		                        	<span class="name" :class="item.TaskState == 0 ? 'active' : ''">{{item.Name+item.WorkHour}}</span>
		                        	<span class="state" :class="item.TaskState == 0 ? 'active' : ''">{{item.state}}</span>
		                        	<span class="TaskExpressName">{{item.TaskExpressName}}</span>
		                        	<span class="TaskExpressNo" v-if="item.TaskExpressNo">单号：</span>
		                        	<el-popover
		                        		popper-class="orderTooltip"
		                        		class="item"
														    placement="bottom-end"
														    title=""
														    width="560"
														    trigger="hover"
														    @show="inquiryNumber(item.TaskExpressNo)"
														    v-if="item.TaskExpressNo">
														    <ul class="logistics-list">
														    	<li v-for="item in logisticsArr"><span>{{item.AcceptTime}}</span><span>{{item.content}}</span></li>
														    	<li v-if="logisticsArr.length==0" class="metadata">暂无数据</li>
														    </ul>
														    <span slot="reference" class="logistics">{{item.TaskExpressNo}}【物流信息】</span>
														  </el-popover>
														  <span v-if="item.TaskExpressNo" class="TaskExpressName">，</span>
														  <span class="TaskExpressName">{{item.TaskRemark}}</span>
		                        </span>
		                      </div>
		                    </div>
	                    </div>
	                  </div>
                  </div>
              </div>
              
              <div class="info companyInfo">
                  <h3>公司信息</h3>
                  <p>
                      <span class="info_left">
                          公司全称：
                      </span>
                      <span>
                          {{detail.ContactsCompany ? detail.ContactsCompany : '—'}}
                      </span>
                  </p>
                  <p>
                      <span class="info_left">
                          联系人：
                      </span>
                      <span>
                          {{detail.Contacts ? detail.Contacts : '—'}}
                      </span>
                  </p>
                  <p>
                      <span class="info_left">
                          联系电话：
                      </span>
                      <span>
                          {{detail.ContactsMobile ? detail.ContactsMobile : '—'}}
                      </span>
                  </p>
                  
              </div>

              <div class="info">
                  <h3>详细信息</h3>
                  <p>
                      <span class="info_left">
                          买家姓名：
                      </span>
                      <span>
                          {{ConsigneeName}}
                      </span>
                  </p>
                  <p>
                      <span class="info_left">
                          收货地址：
                      </span>
                      <span>
                          {{ProvinceName}} {{CityName}} {{AreaName}} {{Address}}
                      </span>
                  </p>
                  <p>
                      <span class="info_left">
                          联系电话：
                      </span>
                      <span>
                          {{ConsigneeMobile}}
                      </span>
                  </p>
                  <p class="leaveMessage">
                      <span class="info_left">
                          买家留言：
                      </span>
                      <span class="message">
                          {{detail.Desc}}
                      </span>
                  </p>
                  <p v-if="detail.ProcessingState == '待付款'">
                      <span class="info_left">
                          支付方式：
                      </span>
                      <span>
                          在线支付
                      </span>
                  </p>
                  <p v-else>
                      <span class="info_left">
                          支付方式：
                      </span>
                      <span>
                          {{paytype(detail.PayType)}}
                      </span>
                  </p>
                  <p>
                      <span class="info_left">
                          发票类型：
                      </span>
                      <span>
                          {{detail.CusInvoiceType ? detail.CusInvoiceType : "--"}}
                          &nbsp;&nbsp;
                          <a class="downInvoid" v-if="aaa" :href="detail.InvoicePath" download="发票">下载电子发票</a>
                          
                          <!-- <a class="downInvoid" v-if="detail.InvoicePath" :href="'http://manage.wqbol.com'+detail.InvoicePath" download="发票">下载电子发票</a> -->
                      </span>
                  </p>
              </div>
              <div class="pro">
                  <div class="pro_top">
                      <span>服务</span>
                      <span>服务信息</span>
                      <span>服务单价</span>
                      <span>服务数量</span>
                      <span>操作</span>
                  </div>
                  <div class="pro_ulBox">
                      <ul>
                          <li v-for="(item,index) in detail.OrderDetails" :key="item.Id">
                              <div class="li_container">
                                  <div class="imgBox"><img :src="item.PCThumbImgURL" width="80" height="80" alt=""></div>
                                <div class="service">
                                        {{item.Name}}
                                </div>
                                <div class="pro_type">
                                    <span>{{item.type}}</span><br>
                                    <span>{{item.ProductType}}</span>
                                </div>
                                <div class="allPrice">￥{{item.OldPrice}}</div>
                                <div class="pro_num">{{item.Num}}</div>
                                <div class="btn">
                                    <button v-if="detail.ProcessingState != '待付款'" @click="buyProductAgain(item.ProductId)">再次购买</button>
                                    <p v-if="detail.ProcessingState == '待评价'"><a @click="waitEvaluate(item.ProductIdd,item.type,item.Id,item.ProductId)" style="cursor: pointer">评价</a></p>
                                    <button v-if="detail.ProcessingState == '待付款'" class="_btn">-</button>
                                    <!-- <p v-if="detail.ProcessingState != '已完成'&&detail.ProcessingState != '待评价'">-</p> -->
                                </div>
                              </div>
                          </li>
                      </ul>
                  </div>
                  <div class="payBox">
                      <p>
                          <span>服务总额：</span>
                          <span>￥{{detail.OldAmount}}</span>
                      </p>
                      <p v-if="detail.PreferentialAmount != '0.00' || detail.PreferentialAmount != 0">
                          <span>优惠券：</span>
                          <span class="yhq">-¥{{detail.PreferentialAmount}}</span>
                      </p>
                      <p v-if="detail.BookkeepCurrency != 0">
                          <span>记账币：</span>
                          <span class="jzb">-¥{{detail.BookkeepCurrency == 0 ? "0.00" : detail.BookkeepCurrency}}</span>
                      </p>
                      <p v-if="detail.PayType==3">
                          <span>余额抵扣：</span>
                          <span>-¥2.00</span>
                      </p>
                      <p class="actPay">
                          <span>实付金额：</span>
                          <span>￥{{detail.Amount}}</span>
                      </p>
                  </div>
                  <div class="wavy_line">
                     
                  </div>
              </div>
          </div>
          <publicBottom></publicBottom>
  </div>
</template>

<style lang="less" scoped>
@import "./personalCenter_index.less";
@import "./orderDetail.less";
</style>


<script>
import personalCenterHead from "~/components/common/personalCenterHead";
import publicBottom from "~/components/common/publicBottom";
import publicPendantR from "~/components/common/publicPendantR";
import getData from '~/store/ajaxAPI/getData.js';
import fmt from '~/assets/lib/tool.js';
import { invoiceDetail_invoice } from '~/store/ajaxAPI/vueDynamicParams.js';

export default {
  data() {
    return {
        detail:'', //详情数据
        logArr:[], //办理日志数组
        ConsigneeName:'', //姓名
        ConsigneeMobile:'',
        ProvinceName:'',
        CityName:'',
        AreaName:'',
        Address:'',
        isShowContract: false, //是否提供电子合同
        contract:"",//合同模板
        isSignContract:false, //是否签署了合同
        stye:"", //订单状态
        downContract:"",//下载电子合同
        aaa:false,
        options: [],//selected下拉框配置
        value: "",
        productKind:0,//商品种类
        len:0,//日志数组长度
        logisticsArr:[],//物流查询结果
    };
  },
  mounted(){
    this.getLog();
    this.getDetail();
    this.getInfo();
  },
  methods:{
        paytype(val){
            switch(val){
                case "Balance":
                    return "余额支付";
                    break;
                case "Alipay":
                    return "支付宝支付";
                    break;
                case "WeChat":
                    return "微信支付";
                    break;
                case "Unionpay":
                    return "银联支付";
                    break;
                case "Substitute":
                    return "朋友代付";
                    break;
                case "BookCurrency":
                    return "记账币支付";
                    break;
                
            }
        },
       // 找人代付
        otherPay(val){
            // console.log(val)
            let params = {
                params : {
                    id : val.Id,
                }
            }
            getData.checkOrder(params).then((res) => {
                this.$router.push({path:"/cart/paid",query:{id:val.Id,orderNum:val.OrderNumber}});
            },err => {
                this.$message.error(err.data.msg);
            }).catch((err) => {
            })
        },
      //订单详情
      getDetail(){
          var params = {
			 dataType:'json',
			 id:this.$route.query.id
          }
          getData.orderDetail(params).then(res=>{
              //console.log('订单详情成功',res.data)
              //console.log('取消取消取消',res.data.CompleteTime)
                  if(res.data.CancelTime==null){
                      res.data.CancelTime = '';
                  }
				  res.data.Acceptimer =  res.data.AcceptanceTime.replace(/\//g,"-")
				//   res.data.Cretimer =  res.data.CreateTime.replace(/\//g,"-")
				  res.data.Comtimer =  res.data.CompleteTime.replace(/\//g,"-")
				  res.data.Paytimer =  res.data.PayTime.replace(/\//g,"-")
				  res.data.canceltimer =  res.data.CancelTime.replace(/\//g,"-")
                  var creStr = res.data.CreateTime.replace(/[^0-9]/ig,"")
                  res.data.Cretimer = fmt.formatDate(creStr,"yyyy-MM-dd hh:mm:ss")
                //   console.log('什么鬼',res.data.InvoicePath)
                  this.detail = res.data;
                  if(res.data.InvoicePath){
                      this.aaa = true;
                  }
                  this.detail.InvoicePath = `${invoiceDetail_invoice}${res.data.InvoicePath}` ; //发票下载
                  this.isShowContract = res.data.IsElectronicContract;
                  this.isSignContract = res.data.IsSignedElectronicContract;
                  this.contract = res.data.ElectronicContractTemplate;
                  this.stye = res.data.Status;
                  this.downContract = res.data.ElectronicContractDownloadUrl;
                  fmt.saveToLocal("orderdetail","orderdetail","orderdetail",this.detail);
                  
                  //根据订单id获取订单商品信息
                  getData.getCommodityList(params)
                  .then((val)=>{
                  	this.options = val.data.list;
                  	this.productKind = val.data.recordCount;
                  	this.options.forEach((item,i)=>{
                  		item.value = i+1;
                  		item.label = item.CompanyName ? item.ProductName + '-' + item.CompanyName : item.ProductName;
                  	})
                  	this.value = this.options[0].label;
                  	
                  	//根据流程ID获取商品服务流程信息
                  	this.getServiceProcessById(this.options[0].ServiceStepId)
                  })
                  .catch((e)=>{
                  	
                  })
          }).catch(err=>{
              //console.log('详情错误',err)
          })
      },
      //订单日志
      getLog(){
//        var params = {
//			 dataType:'json',
//			 id:this.$route.query.id
//        }
//        getData.OrderLogList(params).then(res=>{
//            //console.log('日志',res.data.list)
//            var arrLog = res.data.list
//            for(var i=0;i<arrLog.length;i++){
//                var str = arrLog[i].CreateTime.replace(/[^0-9]/ig,"")
//				arrLog[i].timer = fmt.formatDate(str,"yyyy-MM-dd hh:mm:ss")
//            }
//            this.logArr = res.data.list
//        }).catch(err=>{
//            //console.log(err)
//        })
      },
      //获取详细信息的姓名、地址、电话
      getInfo(){
          var params = {
			 dataType:'json',
			 id:this.$route.query.id
          }
          getData.GetDeliveryAddressById(params).then(res=>{
              //console.log('嘻嘻嘻嘻',res.data)
              this.ConsigneeName = res.data.ConsigneeName;
              this.ConsigneeMobile = res.data.ConsigneeMobile;
              this.ProvinceName = res.data.ProvinceName;
              this.CityName = res.data.CityName;
              this.AreaName = res.data.AreaName;
              this.Address = res.data.Address;
          }).catch(err=>{
              //console.log(err)
          })
      },
      //点击再次购买进支付页
      buyNow(orderNum){
        // console.log(orderNum);
        let params = {
            params : {
                id : orderNum.Id,
            }
        }
        getData.checkOrder(params).then((res) => {
            orderNum.OrderDetails.forEach((items,index) => {
                items.ProductName = items.Name;
                if(items.type == "套餐"){
                    items.type = 1;
                }else if(items.type == "产品"){
                    items.type = 0;
                }
            })
            let obj = {};
            obj.list = orderNum.OrderDetails;
            obj.orderNum = orderNum.OrderNumber;
            obj.money = orderNum.Amount;
            fmt.saveToLocal('orderMesg',obj);
            this.$router.push("/cart/newPayment");
        },err => {
            // console.log(err,3333)
            this.$message.error(err.data.msg);
        }).catch((err) => {
            
        })
      },
      //订单-再次购买-立刻购买
	  buyAgain(id){
        // if(!res.data){
        //     this.$message.error(res.msg);
        //     return;
        // }
        var params = {
            id:id,
            dataType:'json'
        }
        getData.GetOrderListById(params).then(res=>{
            // console.log('resresres',res)
             if(res.data  === null){
			  this.$message.error(res.msg);
			  return;
		    }
            //   console.log('详情再次购买,立即购买',res) 
              if(res.data.list.length=='0'){
                  alert('改商品已下架，不能购买')
                  return;
              }
              var arr = res.data.list
                for(var i=0;i<arr.length;i++){
                    arr[i].IsChecked = true;
                }
                var obj = {
                    list:arr
                }
                
                // console.log(res.data)
                fmt.saveToLocal('orderMesg',res.data);
                // console.log( tool.loadFromLocal('orderMesg','ALL')  )
            //   return
			  this.$router.push({path:'/cart/settleAccounts',query:{isNowBuy:'yes'}})
		  }).catch(err=>{
			  this.$message.error(err.data.msg);
		  })
      },
      //商品再次购买
      buyProductAgain(id){
          var params = {
              id:id,
              dataType:'json'
          }
          getData.buyProductAgain(params).then(res=>{
            //   console.log('商品再次购买购买',res.data)
              
              var arr = res.data.list
			  arr[0].IsChecked = true;
              fmt.saveToLocal('orderMesg',res.data);
            //   console.log('详情再次购买')
			  this.$router.push({path:'/cart/settleAccounts',query:{isNowBuy:'yes'}})
          }).catch(err=>{
              this.$message.error(err.data.msg);
          })
      },
      //点击评价带id进入评价详情页
	  waitEvaluate(productIdd,type,orderId,productId){
		  this.$router.push({path:'/personalCenter/commodity',query:{id:productIdd,type:type=='产品'?0:1,orderId:this.$route.query.id,productId}})
      },
      //   签署电子合同
    toContract(){
        let _id = this.$route.query.id;
        // this.$router.push({path:"/personalCenter/contract/contract",query:{id:_id,contract:this.contract,isSign:this.isSignContract,status:this.stye}});
        if(this.isSignContract){
            this.$router.push({path:"/contract/contract",query:{id:_id,isSign:0}});
        }else{
            this.$router.push({path:"/contract/contract",query:{id:_id,isSign:1}});
        }
    },
    //默认电子合同
    toDefaultEc(){
    	//默认合同
			let params = {
				Id:this.$route.query.id
			}
			getData.getDefaultContractByOrderId(params)
			.then((res)=>{
				if (res.data.PdfUrl) {
					this.$router.push({path:'/personalCenter/impliedContract',query:{id:this.$route.query.id,isSignContract:this.isSignContract}})
				} else{
					this.$message({
	          message: '当前订单尚未付款,完成付款后会自动生成默认合同，快去付款吧~',
	          type: 'error',
	          duration:2000
	        });
				}
				
			})
    	
    },
    //根据流程ID获取商品服务流程信息
    getServiceProcessById(id){
    	let params = {
				id:id
			}
    	getData.getServiceProcessById(params)
			.then((res)=>{
				this.logArr = res.data.list;
				this.len = res.data.list.length;
				//根据当前数据的状态TaskState修改下一条数据从而判断线的颜色
				for (let i=0;i<this.logArr.length;i++) {
					//不考虑最后一条，防止覆盖
					if(i != this.logArr.length-1){
						if(this.logArr[i].TaskState == 2){
							this.logArr[i+1].isShowGreen = true;
						}else{
							this.logArr[i].isShowGreen = false;
						}
					}
					
					
					//根据状态判断当前显示时间
					switch (this.logArr[i].TaskState){
						case 0://待处理
							this.logArr[i].time = "---------------------------";
							this.logArr[i].timeHour = "";
							
							this.logArr[i].state = "未开始";
							break;
						case 1://处理中
							let strEnd = this.logArr[i].HandleTime.replace(/[^0-9]/ig,"")
							this.logArr[i].time = fmt.formatDate(strEnd,'yyyy-MM-dd');
							this.logArr[i].timeHour = fmt.formatDate(strEnd,'hh:mm:ss');
							
							this.logArr[i].state = "进行中";
							break;
						case 2://已完成
							let str = this.logArr[i].EndTime.replace(/[^0-9]/ig,"")
							this.logArr[i].time = fmt.formatDate(str,'yyyy-MM-dd');
							this.logArr[i].timeHour = fmt.formatDate(str,'hh:mm:ss');
							
							this.logArr[i].state = "已完成";
							break;
						default:
							break;
					}
					
					//预估工时
					this.logArr[i].WorkHour = this.logArr[i].WorkHour ? '（'+ this.logArr[i].WorkHour +'）' : '';
					
					//快递公司
					this.logArr[i].TaskExpressName = this.logArr[i].TaskExpressName ? this.logArr[i].TaskExpressName+'，' : '';
					
					//备注
					this.logArr[i].TaskRemark = this.logArr[i].TaskRemark ? `备注：${this.logArr[i].TaskRemark}` : '';
				}
				
				
				this.logArr = this.logArr.reverse();
				
			})
    },
    //物流下拉选中值
		toChange(e){
			this.getServiceProcessById(e.ServiceStepId)
		},
		//查询快递单号
		inquiryNumber(num){
			let params = {
				LogisticCode:num
			}
			getData.getOrderTraces(params)
			.then((res)=>{
				this.logisticsArr = res.data.list;
				
				
				//拼接数据
				this.logisticsArr.forEach((val)=>{
					val.Remark = val.Remark ? ',' + val.Remark : '';
					val.content = val.AcceptStation + val.Remark;
				})
			})
			.catch((e)=>{
				
			})
				
		}
  },
  components: {
    personalCenterHead,
    publicBottom,
    publicPendantR
  }
};
</script>

