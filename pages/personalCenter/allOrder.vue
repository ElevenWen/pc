<template>
  <div class="allOrder">
      <!-- 个人中心公共头部 -->
          <personalCenterHead ref="indexTriangle"></personalCenterHead>
          <publicPendantR></publicPendantR>
          <!-- 公共侧边 -->
          <div class="margin1200">
              <personalCenterSlide></personalCenterSlide>
              <!-- 右侧 -->
              <div class="right_frame">
			<div class="my_order_form color_DD">
				我的订单
			</div>
			<div class="all_order_form">
				<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
				    <ul class="layui-tab-title">
						<nuxt-link to="/personalCenter/allOrder" tag="li" class="layui-this">全部订单</nuxt-link>
                        <nuxt-link to="/personalCenter/waitPay" tag="li">待付款<span v-if="waitPay">{{waitPay}}</span></nuxt-link>
                        <nuxt-link to="/personalCenter/goingOn" tag="li">办理中<span v-if="inProcess">{{inProcess}}</span></nuxt-link>
                        <nuxt-link to="/personalCenter/done" tag="li">已完成<span class="layui_awaitComment" v-if="done">{{done}}</span></nuxt-link>
			    		<nuxt-link to="/personalCenter/waitEvaluate" tag="li">待评价<span class="layui_awaitComment" v-if="waitCommend">{{waitCommend}}</span></nuxt-link>
				    </ul>
					<div class="order_form_head">
						<ul>
							<li>商品信息</li>
							<li>金额</li>
							<li>状态</li>
							<li>操作</li>
						</ul>
					</div>
					<div class="layui-tab-content" v-if="allOrderListArr.length">
						<div class="layui-tab-item layui-show" id="order_quantity">
							<ul>
								<li v-for="(item,index) in allOrderListArr" :key="item.Id">
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
														{{item.EndTime}}
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
																<img :src="items.PCThumbImgURL" @click="toProduct(items.ProductIdd,items.type=='产品'?0:1)" class="productPic">
															</span>
															<span class="enterprise_name" @click="toProduct(items.ProductIdd,items.type=='产品'?0:1)">{{items.Name}}</span>
															<span class="productType">{{items.ProductType}}</span>
															<span class="quantity">×{{items.Num}}</span>
														</div>
														<!-- <div v-if="items.type=='套餐'">
															<div v-for="(itemss,index) in items.ProductDetails" :key="itemss.Id">
																<img :src="itemss.Img">
																<span class="enterprise_name">{{itemss.Name}}</span>
																<span class="quantity">×1</span>
															</div>
														</div> -->
													</div>
												</td>
												<td>
													<span v-if="item.OrderStatus=='待付款'">
														<span>待付</span><span>￥{{item.Amount}}</span>
													</span>
													<span v-else>
														<span>总额</span><span>￥{{item.Amount}}</span>
													</span>
												</td>
												<td>
													<span :class="{color_FF:item.OrderStatus=='待付款',colorGrey:item.OrderStatus=='已取消'||'已完成',colorGreen:item.OrderStatus=='办理中'}">{{item.OrderStatus}}</span>
													<span @click="detail(item.Id,item.OrderNumber)" class="orderDetail">订单详情</span>
												</td>
												<td>
													<span class="color_FF immediately" v-if="item.OrderStatus=='待付款'" @click="payNow(item)">立即付款</span>
													<span class="otherPeople" @click="otherPay(item)" v-if="item.OrderStatus=='待付款'">找人代付</span>
													<span v-if="item.OrderStatus=='待付款'" @click="showCancelModel(this,$event,item.Id)" style="margin-bottom:7px;margin-top: 6px;">取消订单</span>
													<span class="greyBorder immediately" v-if="item.OrderStatus=='办理中' || item.OrderStatus=='已取消'|| item.OrderStatus=='已完成'" @click="buyAgain(item.Id)">再次购买</span>
													<div v-if="item.OrderStatus=='待评价'" v-for="(itemss,index) in item.OrderDetails" :key="itemss.Id">
														<span class="greyBorder immediately"  @click="buyAgain(item.Id)">再次购买</span>
														<span><a href="#" v-if="item.OrderStatus=='待评价'" @click="waitEvaluate(itemss.ProductIdd,itemss.type,item.Id,itemss.ProductId)">评价</a></span>
													</div>
												</td>
											</tr>
										</tbody>
									</table>
									<!-- 取消订单弹框 -->
										<div class="comfirmCancel">
											<p>
												<span>温馨提示</span>
												<img src="~assets/images/personalCenter/mycompany/wxts (2).png" alt="" @click="closeModel" class="img_del" style="cursor: pointer;">
											</p>
										<div class="content">
											<div class="top">
												<img src="~assets/images/personalCenter/mycompany/wenhao.png" alt="">
												<div class="right">
													<h3>您确定要取消该订单吗？</h3>
													<span>您确定要取消该订单吗？取消订单后，不能恢复！！</span>
												</div>
											</div>
											<div class="bottom">
												<button class="sure" @click="cancelOrder(id)">确定</button>
												<button class="cancel" @click="closeModel">取消</button>
											</div>
										</div>
									</div>
									<!-- 取消订单弹框 -->
									<!-- 删除订单弹框 -->
										<div class="comfirmDel">
											<p>
												<span>温馨提示</span>
												<img src="~assets/images/personalCenter/mycompany/wxts (2).png" alt="" @click="closeModel" class="img_del" style="cursor: pointer;">
											</p>
										<div class="content">
											<div class="top">
												<img src="~assets/images/personalCenter/mycompany/wenhao.png" alt="">
												<div class="right">
													<h3>您确定要删除该订单吗？</h3>
													<span>删除后，不可还原哦！你可以重新下单！</span>
												</div>
											</div>
											<div class="bottom">
												<button class="sure" @click="deleteOrder(id)">确定</button>
												<button class="cancel" @click="closeModel">取消</button>
											</div>
										</div>
									</div>
									<!-- 删除订单弹框 -->
									<!-- 再次购买弹框 -->
										<!-- <div class="buyAgain">
											<p>
												<span>温馨提示</span>
												<img src="~assets/images/personalCenter/mycompany/wxts (2).png" alt="" @click="closeModel" class="img_del" style="cursor: pointer;">
											</p>
										<div class="content">
											<div class="top">
												<img src="~assets/images/personalCenter/mycompany/wenhao.png" alt="">
												<div class="right">
													<h3>您确定要再次购买该订单吗？</h3>
												</div>
											</div>
											<div class="bottom">
												<button class="sure" @click="buyAgain(item.OrderNumber)">确定</button>
												<button class="cancel" @click="closeModel">取消</button>
											</div>
										</div>
									</div> -->
									<!-- 再次购买弹框 -->
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
					<div class="noOrder" v-if="!allOrderListArr.length">
						<img src="~assets/images/personalCenter/order/onOrder.jpg" alt="">
						<p>哎呀，此状态下没有对应的订单！</p>
						<nuxt-link to="/productList?typeIndex=all&productName=All">去选服务&nbsp;&nbsp;>></nuxt-link>
					</div>
				</div>
			</div>
		</div>
          </div>
		  <div class="mask" v-show="modelShow">

      </div>
          <publicBottom></publicBottom>
  </div>
</template>

<style lang="less" scoped>
 @import './personalCenter_index.less';
 @import './all_order.less';
</style>


<script>
import personalCenterHead from '~/components/common/personalCenterHead';
import personalCenterSlide from "~/components/common/personalCenterSlide";
import publicBottom from '~/components/common/publicBottom';
import publicPendantR from '~/components/common/publicPendantR';
import getData from '~/store/ajaxAPI/getData.js';
import fmt from '~/assets/lib/tool.js';
export default {
	data(){
		return{
			//全部订单列表数组
			allOrderListArr:[],
			hours:'',
			min:'',
			sec:'',
			waitPay:'',
			inProcess:'',
			done:'',
			waitCommend:'',
			modelShow:false ,
			CountPage:'',   //总商品条数
			NowPage: 1,     //当前页数
			pagesize: 10,   //每页条数
			id:''  //弹出框的id
		}
	},
	mounted(){
		this.getAllOrder();
		this.$refs.indexTriangle.$refs.indexTriangle.style.display = 'block';
		//   //console.log(this)
		this.getOrderNum();
		// this.getOrderNum(1);
		// this.getOrderNum(4);
		// this.getOrderNum(5);
	},
	updated(){
		//   this.$refs.indexTriangle.$refs.indexTriangle.style.display = 'block';
	},
	methods:{
		//获取全部订单列表
		getAllOrder(type){
			var params = {
				dataType:'json',
				type:type,
				orderType:'PC',
				pageIndex:this.NowPage,
				pageSize:10
			}
			getData.allOrder(params).then(res=>{
				// //console.log('全部订单成功',res.data)
				let arr = res.data.list
				for(var i=0;i<arr.length;i++){
					//格式化时间
					var str = arr[i].CreateTime.replace(/[^0-9]/ig,"")
					arr[i].timer = fmt.formatDate(str,"yyyy-MM-dd hh:mm:ss")
					// //console.log('哈哈哈',arr[i].OrderDetails.length)
					// if(arr[i].OrderStatus == '待付款'){
					// 	//待付款小圆球数目
					// 	lArr.push(arr[i])
					// 	this.waitPay = lArr.length
					// 	console.log('待付款',this.waitPay,lArr.length)
					// }
					// //办理中小圆球数目
					// if(arr[i].OrderStatus == '办理中'){
					// 	hArr.push(arr[i])
					// 	this.inProcess = hArr.length
					// 	console.log('办理中',this.inProcess,hArr.length)
					// }
					// //已完成小圆球数目
					// if(arr[i].OrderStatus == '已完成'){
					// 	bArr.push(arr[i])
					// 	this.done = bArr.length
					// 	console.log('已完成',this.done,bArr.length)
					// }
					// //待评价小圆球数目
					// if(arr[i].OrderStatus == '待评价'){
					// 	pArr.push(arr[i])
					// 	this.waitCommend = pArr.length
					// 	console.log('已完成',this.waitCommend,pArr.length)
					// }
				// //console.log(arr[i].OrderDetails)
				}
				this.allOrderListArr = res.data.list
				this.CountPage = res.data.recordCount
				//console.log(this.allOrderListArr)
			}).catch(err=>{
				//console.log('全部订单失败',err)
			})
		},
		// 获取小圆球数据
		getOrderNum(type){
			var params = {
				dataType:'json',
				type:type,
				orderType:'PC',
			}
			getData.allOrder(params).then(res=>{
				let arrList = res.data.list
				var lArr = []
				var hArr = []
				var bArr = []
				var pArr = []
				arrList.forEach((val) => {
					if(val.OrderStatus == '待付款'){
						lArr.push(arrList[val])
						this.waitPay = lArr.length
					}else if(val.OrderStatus == '办理中'){
						hArr.push(arrList[val])
						this.inProcess = hArr.length
					}else if(val.OrderStatus == '已完成'){
						bArr.push(arrList[val])
						this.done = bArr.length
					}else if(val.OrderStatus == '待评价'){
						pArr.push(arrList[val])
						this.waitCommend = pArr.length
					}

				})
			})
		},
		//点击详情传Id到详情页
		detail(id,orderNum){
			this.$router.push({path: '/personalCenter/orderDetail', query: {id: id,orderId:orderNum}})
		},
		//取消订单
		cancelOrder(id){
			//console.log('为嘛变了',id)
			var params = {
				params:{
					ids:id
				}
			}
			getData.cancelOrder(params).then(res=>{
				//console.log(res)
				this.modelShow = false;
				$('.comfirmCancel').css({"display":"none"})
				window.location.reload();
			}).catch(err=>{
				//console.log(err)
			})
		},
		//删除订单
		deleteOrder(id){
			var params = {
				dataType:'json',
				ids:id
			}
			getData.deleteOrder(params).then(res=>{
				//console.log(res)
				this.modelShow = false;
				$('.comfirmDel').css({"display":"none"})
				window.location.reload();
			}).catch(err=>{
				//console.log(err)
			})
		},
		//点击评价带id进入评价详情页
		waitEvaluate(productIdd,type,orderId,productId){
			this.$router.push({path:'/personalCenter/commodity',query:{id:productIdd,type:type=='产品'?0:1,orderId,productId}})
		},
		//关闭模态框
		closeModel(){
			this.modelShow = false;
			$('.comfirmDel').css({"display":"none"})
			$('.comfirmCancel').css({"display":"none"})
		},
		//点击取消订单-弹出框
		showCancelModel(data,data1,id){
			$('.comfirmCancel').css({"display":"block"})
			this.id = id;
			this.modelShow = true;
		},
		//点击删除订单-弹出框
		showDeleteModel(data,data1,id){
			$('.comfirmDel').css({"display":"block"});
			this.id = id;
			this.modelShow = true;
		},
		//当前页
		handleCurrentChange(val) {
			this.NowPage = val;
			this.getAllOrder();
		},
		//点击图片去商品详情
		toProduct(proId,type){
			// this.$router.push({path:'/productDetails',query:{id:proId,type:type}});
			//this.$router.push({path:'/productDetails',params:{id:proId,type:type}});
			this.$router.push({
				path:'/productDetails/' + proId + '/' + type
			});
		},
		//立刻付款去支付页
		payNow(val){
			let params = {
				params : {
					id : val.Id,
				}
			}
			getData.checkOrder(params).then((res) => {
				// 把订单信息存本地
				val.OrderDetails.forEach((items,index) => {
					items.ProductName = items.Name;
					if(items.type == "套餐"){
						items.type = 1;
					}else if(items.type == "产品"){
						items.type = 0;
					}
				})
				// console.log(val.OrderDetails)
				let obj = {};
				obj.list = val.OrderDetails;
				obj.orderNum = val.OrderNumber;
				obj.money = val.Amount;
				fmt.saveToLocal('orderMesg',obj);
				this.$router.push("/cart/newPayment");
			},err => {
            // console.log(err,3333)
				this.$message.error(err.data.msg);
			}).catch((err) => {
				this.$message.error(err.msg);
			})
		},
		//再次购买
		//再次购买-立刻购买
		buyAgain(id){
		var params = {
			id:id,
			dataType:'json'
		}
		getData.GetOrderListById(params).then(res=>{
			if(res.data  === null){
				this.$message.error(res.msg);
				return;
			}
			var arr = res.data.list
			for(var i=0;i<arr.length;i++){
				arr[i].IsChecked = true;
			}
			//   arr[0].IsChecked = true;
			var obj = {
				list:arr
			}
			fmt.saveToLocal('orderMesg',obj);
			//console.log(obj)
			this.$router.push({path:'/cart/settleAccounts',query:{isNowBuy:'yes'}})
		}).catch(err=>{
			//console.log('错错错',err)
			this.$message.error(err.data.msg);
		})
		},
			// 找人代付
			otherPay(val){
				// this.$router.push({name:"cart-paid",params:{id:val.Id,orderNum:val.OrderNumber}});
				let params = {
					params : {
						id : val.Id,
					}
				}
				getData.checkOrder(params).then((res) => {
					this.$router.push({path:"/cart/paid",query:{id:val.Id,orderNum:val.OrderNumber}});
				},err => {
            // console.log(err,3333)
					this.$message.error(err.data.msg);
				}).catch((err) => {
					this.$message.error(err.msg);
				})
			},
	},
	components:{
	personalCenterHead,
	personalCenterSlide,
	publicBottom,
	publicPendantR
	},
	computed:{
		//计算当前显示页的商品数组
		productLists: function(){
			return this.allOrderListArr.slice((this.NowPage-1)*this.pagesize,this.NowPage*this.pagesize)
		},
	},
	//   filters:{
	// 		formatDateFn:value =>{
	// 			//console.log(value)
	// 			return fmt.formatDate(value,"yyyy-MM-dd")
	// 		} ,
	// 		setIntervalFnx:function(value,v2){
	// 			//console.log(v2)
	// 			//console.log(value,this.xxxx)
	// 			return fmt.setIntervalFn(value,this.xxxx)
	// 		} ,
	// 	}
}
</script>

