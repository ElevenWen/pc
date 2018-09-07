<template>
	<div id="settleAccounts">
		<!-- 公用top  -->
		<div class="c-headerContainWrap">
			<div class="c-header">
				<div class="c-hdTopWrap">
					<topState></topState>
				</div>
			</div>
			<publicPendantR></publicPendantR>
		</div>
		<div id="search">
			<div class="search">
				<div class="search_L">
					<div class="search_logo" @click="home">
						<img src="/images/logo.png">
					</div>
					<span>结算页</span>
				</div>
				<div class="search_R">
					<div class="border_one">
						<div class="border_oneL">
							<span>1</span>
							<span>购物车</span>
						</div>
						<div class="border_oneR">
							<span>2</span>
							<span>确认订单</span>
						</div>
					</div>
					<div class="border_tow">
						<div class="border_oneR">
							<span>3</span>
							<span>支付</span>
						</div>
					</div>
					<div class="border_three">
						<div class="border_oneR">
							<span>√</span>
							<span>完成</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="settleAccounts">
			<div class="head">填写并核对订单信息</div>
			<div class="settleAccounts_content">
				<!--收货人信息-->
				<div class="consignee">
					<div class="consignee_T">收货人信息<img src="~assets/images/cart/tishik.png"></div>
					<ul>
						<li v-for="(item,index) in adPersonList" :key='index' @click='changeAdList(index)' @mouseenter="consigneeJ(this,$event)" @mouseleave="consigneeC(this,$event)"   :class="index == currentDefault?'isDefault':''">
							<span class="consignee_Name">{{item.ConsigneeName}} <span v-if="item.IsDefault">默认地址</span></span>
							<span class="consignee_Site">{{item.Address}}</span>
							<span class="consignee_Provinces">{{item.ProvinceName}}{{item.CityName}}{{item.AreaName}}</span>
							<span class="consignee_Mobile">{{item.ConsigneeMobile}}</span>
							<span  :class="index == currentDefault?'isDefault':''" class="consignee_Default"></span>
							<span class="consignee_Compile" @click="compileSite(this,$event,item)">编辑</span>
						</li>
					</ul>
					<!--收货地址为空-->
					<ul class="consigneeIsNull"  >
						<li @click="addCompileSite(this,$event,{Id:''})">
							<img src="~assets/images/cart/AddSite.png">新增地址
						</li>
					</ul>

					<!--编辑 新增 地址弹出框-->
					<div class="message" v-show='addDialog'>
						<div class="messageWrap">
							<div class="messageWrap_top">
								<div>编辑收货人信息</div>
								<span @click="close"></span>
							</div>
							<div class="shippingAddress">
								<ul>
									<li>
										<span class="l_span"><label>*</label>所在地：</span>
										<!-- <select v-model="provinceId" @change="addressS"> -->
										<select v-model="provinceId"  >
	                          				<option value="0">请选择省份</option>
	        							    <option v-for="(items,index) in provice" :value="items.Id" :key='index'>{{items.ShortName}}</option>
	        							</select>
	        							<!-- <select  v-model="cityId" @change="addressS"> -->
	        							<select  v-model="cityId" >
	        							    <option value="0">请选择城市</option>
	                          				<option v-for="(items,index) in city"  :value="items.Id" :key='index'>{{items.Name}}</option>
	        							</select>
	        							<!-- <select v-model="areaId" @change="addressS"> -->
	        							<select v-model="areaId" >
	        							    <option value="0">请选择区</option>
	        							    <option v-for="(items,index) in area"  :value="items.Id" :key='index'>{{items.Name}}</option>
	        							</select>
										<label  v-if='addressMS'    >
											<!-- <img src="~assets/images/tabBar/err_tip.png">请您填写地区信息  -->
										</label>
										<label  v-else-if='!addressM'    >
											<img src="~assets/images/tabBar/err_tip.png">请您填写地区信息
										</label>
									</li>
									<li>
										<span class="l_span"><label>*</label>街道地址：</span>
										<textarea class="teatA"  v-model="singleInfo.Address" placeholder='请填写街道地址，最少5个字，最多不能超过100个字'  @change.stop.prevent="verifyAddress" @blur.stop.prevent="verifyAddress">
										</textarea>
										<label   v-if="registerS.Address">
											<!-- <img src="~assets/images/tabBar/err_tip.png">请输入正确的地址 -->
										</label>
										<label   v-else-if="!register.Address">
											<img src="~assets/images/tabBar/err_tip.png">请输入正确的地址
										</label>
									</li>
									<li>
										<span class="l_span"><label>*</label>收货人姓名：</span>
										<input type="text"   v-model="singleInfo.ConsigneeName" @blur.stop.prevent="verifyCon">
										<label     v-if="registerS.ConsigneeName">
											<!-- <img src="~assets/images/tabBar/err_tip.png">请输入正确收货人姓名 -->
										</label>
										<label     v-else-if="!register.ConsigneeName">
											<img src="~assets/images/tabBar/err_tip.png">请输入正确收货人姓名
										</label>
									</li>
									<li>
										<span class="l_span"><label>*</label>手机：</span>
										<input type="text"    maxlength="12"     v-model="singleInfo.ConsigneeMobile" @blur.stop.prevent="verifyP" @keyup.stop.prevent="verifyP">
										<label    v-if="registerS.phone">
											<!-- <img src="~assets/images/tabBar/err_tip.png">请输入正确手机号 -->
										</label>
										<label    v-else-if="!register.phone">
											<img src="~assets/images/tabBar/err_tip.png">请输入正确手机号
										</label>
									</li>
									<li>
										<span></span>
										<input type="checkbox" ref='checkboxData'  v-model="singleInfo.IsDefault"      v-on:click="singleInfo.IsDefault = !singleInfo.IsDefault"> 设为默认收货地址
									</li>
									<li>
										<span></span>
										<!-- <button :disabled="addressM || !register.Address || !register.ConsigneeName || !register.phone"
										:class='!addressM && register.Address && register.ConsigneeName && register.phone  ?"active":""'
										 @click="saveConnectInfo">
										 	保存联系人信息
										</button> -->

										<button v-if='ediAdFlag'
										:class=' addressM && register.Address && register.ConsigneeName && register.phone     ?"active":""'
										 @click="saveConnectInfo">
										 	保存联系人信息
										</button>
										<button   v-else
										:class=' false   ?"active":""'
										 @click="saveConnectInfo">
										 	保存联系人信息
										</button>

										<button @click="close">取消</button>
									</li>
								</ul>
							</div>
						</div>
					</div>


					<!--编辑收货地址弹出框-->
					<div class="message" v-show='ediDialog'>
						<div class="messageWrap">
							<div class="messageWrap_top">
								<div>编辑收货人信息{{this.register.Address}}</div>
								<span @click="close"></span>
							</div>
							<div class="shippingAddress">
								<ul>
									<li>
										<span class="l_span"><label>*</label>所在地：</span>
										<!-- <select v-model="provinceId" @change="addressS"> -->
										<select v-model="provinceId"  >
	                          				<option value="0">请选择省份</option>
	        							    <option v-for="(items,index) in provice" :value="items.Id" :key='index'>{{items.ShortName}}</option>
	        							</select>
	        							<!-- <select  v-model="cityId" @change="addressS"> -->
	        							<select  v-model="cityId" >
	        							    <option value="0">请选择城市</option>
	                          				<option v-for="(items,index) in city"  :value="items.Id" :key='index'>{{items.Name}}</option>
	        							</select>
	        							<!-- <select v-model="areaId" @change="addressS"> -->
	        							<select v-model="areaId" >
	        							    <option value="0">请选择区</option>
	        							    <option v-for="(items,index) in area"  :value="items.Id" :key='index'>{{items.Name}}</option>
	        							</select>
										<label  v-if='!addressM'    >
											<img src="~assets/images/tabBar/err_tip.png">请您填写地区信息
										</label>
									<!-- 	<label  v-else-if='!addressM'    >
											<img src="~assets/images/tabBar/err_tip.png">请您填写地区信息
										</label> -->
									</li>
									<li>
										<span class="l_span"><label>*</label>街道地址：</span>
										<textarea class="teatA"  v-model="singleInfo.Address" placeholder='请填写街道地址，最少5个字，最多不能超过100个字'  @change.stop.prevent="verifyAddress" @blur.stop.prevent="verifyAddress">
										</textarea>
										<label   v-if="!register.Address">
											<img src="~assets/images/tabBar/err_tip.png">请输入正确的地址
										</label>
									</li>
									<li>
										<span class="l_span"><label>*</label>收货人姓名：</span>
										<input type="text"   v-model="singleInfo.ConsigneeName" @blur.stop.prevent="verifyCon">
										<label     v-if="!register.ConsigneeName">
											<img src="~assets/images/tabBar/err_tip.png">请输入正确收货人姓名
										</label>
									</li>
									<li>
										<span class="l_span"><label>*</label>手机：</span>
										<input type="text"    maxlength="12"     v-model="singleInfo.ConsigneeMobile" @blur.stop.prevent="verifyP" @keyup.stop.prevent="verifyP">
										<label    v-if="!register.phone">
											<img src="~assets/images/tabBar/err_tip.png">请输入正确手机号
										</label>
									</li>
									<li>
										<span></span>
										<input type="checkbox" ref='checkboxData'  v-model="singleInfo.IsDefault"  :disabled="dis_disabled"    v-on:click="singleInfo.IsDefault = !singleInfo.IsDefault"> 设为默认收货地址
									</li>
									<li>
										<span></span>

										<button v-if='ediAdFlag'
										:class=' addressM && register.Address && register.ConsigneeName && register.phone     ?"active":""'
										 @click="saveConnectInfo">
										 	保存联系人信息
										</button>
										<button   v-else
										:class=' false   ?"active":""'
										 @click="saveConnectInfo">
										 	保存联系人信息
										</button>

										<button @click="close">取消</button>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<!--清除浮动-->
	        		<div class="clear"></div>
					<div class="consignee_operation">
						<ul>
							<li @click.stop.prevent="receiverAddress">· 管理收货地址</li>
							<li @click.stop.prevent="addCompileSite(this,$event,{Id:''})"> · 添加新地址</li>
						</ul>
					</div>
				</div>
				<!--确认服务信息-->
				<div class="affirm_serve">
					<div class="affirm_serve_T">确认服务信息</div>
					<div class="cart_head">
						<ul>
							<li>服务</li>
							<li>服务信息</li>
							<li>单价（元）</li>
							<li>数量</li>
							<li>小计（元）</li>
						</ul>
					</div>
					<div class="cart_body">
						<div class="cart_list"  v-for="(item,index) in  checkedProductList" :key="index">

							<!-- 单品 S -->
							<div v-if="item.ProductDetails.length ==0 ">
								<div class="cart_list_head" v-if='item.Promotion'>
									<span class="discounts"></span>
									{{item.Promotion}}
								</div>
								<ul class="productWrap">
									<li>
										<div class="commodity_img"><img :src="item.PCThumbImgURL"></div>
										<div class="commodity_N">{{item.ProductName}}</div>
									</li>
									<li class="productType">
										<span  v-typeBr>{{item.ProductType  }}</span>
									</li>
									<li class="oldPriceWrap">
										<div class="commodity_current">￥{{item.Price}}</div>
									</li>
									<li class="commodity_quantityWrap">
										<span>{{item.Num}}</span>
									</li>
									<li class="priceWrap">
										<span>￥{{(item.Price*item.Num).toFixed(2)}}</span>
									</li>
								</ul>

								<div class="remark"  v-if="index == (checkedProductList.length -1) ">
									<span>备注：</span>
									<input type="text" placeholder="根据您的需求，向服务者提出服务要去（不超过140个字）"    ref="inputsMark"/>
								</div>
							</div>
							<!-- 单品 E -->


							<!-- 套餐 S -->
							<div  v-if="item.ProductDetails.length != 0 " class="cart_list"  >
								<div class="cart_list_head">
									<span class="discounts"></span>
									【套装】{{item.ProductName}}
								</div>
								<ul class="productWrap" v-for="(items,index) in item.ProductDetails" :key="index">
									<li>
										<div class="commodity_img"><img :src="item.ProductDetails[index].PCThumbImgURL"></div>
										<div class="commodity_N">{{items.Name}}</div>
									</li>
									<li class="productType">
										<span v-typeBr>{{items.ProductType}}</span>
									</li>
									<li class="oldPriceWrap">
										<div class="commodity_current">￥{{items.OldPrice}}</div>
									</li>
									<li class="commodity_quantityWrap">
										<span>{{item.Num}}</span>
									</li>
									<li class="priceWrap">
										<span>￥{{items.OldPrice}}</span>
									</li>
								</ul>

								<div class="remark"   v-if="index == (checkedProductList.length -1) ">
									<span>备注：</span>
									<input type="text" placeholder="根据您的需求，向服务者提出服务要去（不超过140个字）"     ref="inputsMark"/>
								</div>
							</div>
							<!-- 套餐 E  -->

						</div>

					</div>
				</div>
				<!--发票信息-->
				<div class="invoice_message">
					<div class="invoice_top">
						发票信息<img src="~assets/images/cart/invoice.png">
					</div>
					<div class="invoice_content">
						<span>{{recentlyBill.billCategory}}</span>
						<span>{{recentlyBill.billCompany}}</span>
						<span>明细</span>
						<span @click="message_invoice">修改</span>
					</div>
				</div>
				<!--发票信息弹出框  closeBilDialogfn是否关闭弹出框  recentlyBillRefalsh 更新发票后子组件传数据给父组件-->
				<billDialog   @closeBilDialog='closeBilDialogFn' @recentlyBillRefalsh='recentlyBillRefalsh' v-if='showBillDialog' ></billDialog>
				<!--使用优惠券/余额/抵用-->
				<div class="use_Coupon">
					<!--<div class="useCouponTop">
						<span>使用优惠券/余额/抵用</span>
						<span></span>
					</div>-->
					<div class="useCouponTab">
						<ul :class="isShowCoupon?'active':''">
							<li @click="useCouponTab(this,$event)">使用优惠券<i :class="isShowCoupon?'active':''"></i></li>
							<!--<li @click="useCouponTab(this,$event)"   v-show='hiddenPay'>余额<i></i></li>-->
						</ul>
						<!--<div :class="{coupon:true,ImgCoupon:isCoupon,actCoupon:isActCoupon}">-->
						<div class="coupon" v-if="isShowCoupon">
							<ul>
 								<!--couponY:表示未过期,couponN: 已过期需要和ImgCoupon一起使用,isCoupon:可以使用 couponY actCoupon 表示选中 -->
								<li :class="{couponY:item.Expired=='未过期' || item.Expired=='即将过期',couponN:item.Expired=='已过期',actCoupon:couponTemp.currentCoupon == index,ImgCoupon:item.Expired=='已过期'}"  v-for="(item,index) in couponTemp.couponList" @click.stop.prevent="couponFn(item,index)" :key="index">
									<span><label>{{item.Price}}</label>元</span>
									<span>{{item.Des}}</span>
									<span>有效期至{{item.EndTime}}</span>
									<div class="uncheck" @click="uncheck(this,$event)">取消选中</div>
									<div class="check"></div>
								</li>
							</ul>
						</div>
						<!--<div class="balance">
							<input type="checkbox" @click.prevent.stop="checkBalanceFn"   v-model="checkBalance">&nbsp;&nbsp;使用余额(账户当前余额：{{discountList.balanceMoney}}元)
						</div>-->
						<!--<div class="pledgeMoney">
							<span>抵扣金额：<label>￥{{discountList.discountMoney}}</label></span>
							<span>优惠券{{discountList.couponNum==0.00?"0":discountList.couponNum}}张，优惠<label>{{discountList.couponMoney}}</label>元；余额抵扣<label>{{discountList.actBalanceMoney}}</label>元</span>
						</div>-->
					</div>
				</div>
				<!--提交订单-->
				<div class="submitIndent">
					<div class="submitIndent_T">
						<ul>
							<li>共 {{orderList.serveNum}}件服务，服务总额：</li>
							<li>￥{{orderList.serveMoney}}</li>
							<li v-if="isSelectedCoupon">优惠金额：</li>
							<li v-if="isSelectedCoupon">-￥{{discountList.couponMoney}}</li>
							<li v-if="isShowCoin"><i>使用记账币抵扣：</i><i :class="isSelected?'':'selected'" @click="toChooseCoin"></i></li>
							<li v-if="isShowCoin"><span :class="isSelected?'':'selected'">-￥{{totalCoin}}</span><span @click="coinGuide"></span></li>
						</ul>
					</div>
					<div class="submitIndent_C">
						<ul>
							<li>应付金额：</li>
							<li>￥{{orderList.payTotalMoney}}</li>
						</ul>
					</div>
					<div class="submitIndent_B">
						<button @click="submitIndentBtn">提交订单</button>
					</div>
				</div>
			</div>
		</div>
		<!-- 公用bottom 整体 -->
		<div class="c-ftContainWrapindex">
			<publicBottom></publicBottom>
		</div>
		<!--/公用bottom 整体 -->
	</div>
</template>

<script>
	import publicPendantR from "~/components/common/publicPendantR";
	import topState from "~/components/common/topState";
	import publicBottom from "~/components/common/publicBottom";
	import billDialog from "~/components/common/billDialog/billDialog";
	import getD from '~/store/ajaxAPI/getData.js'
    import tool from "~/assets/lib/tool.js";

export default {
	asyncData (context) {
	    if(process.client&&context.route.path == '/cart/payment'){
			location.replace(   location.origin  +'/personalCenter/allOrder');
		}

	    return {contextTo : context.route.query};

	},

    data() {
	    return {
	    	isCoupon:true,//
	    	isActCoupon:false,
	    	provice:[],//请求省份
	        city:[],//请求城市
	        area:[],//请求区域
	    	provinceId:0,  //省份ID
	        cityId:0,  //城市ID
	        areaId:0,  //区域ID
	        streetAddr:0,
	        adPersonList:[],//收货人地址 列表
	        currentDefault:'',//显示默认地址
	        singleInfo:{//单个地址所有信息
	        		id:'',
     				ConsigneeName :'',
					ConsigneeMobile:'',
					Address:'',
					IsDefault :''   ,
			},
	        dis_disabled:false,//默认选中不允许修改
	        checkedProductList:[],//被选中产品
	        showBillDialog:false,//显示 发票明细组件
	        recentlyBill:{
	        	billCategory:"",//发票类型
	        	billCompany:"", //发票公司
	        	cusInvoiceId:"",//发票id
	        },
	       couponTemp:{
		        couponList:[],//优惠券
		       	currentCoupon:'-99999',//当前优惠券索引
	       },
	       isSelectedCoupon:false,//是否选择优惠券
	       checkBalance:false,//是否选择余额付款
	       discountList:{
	       	    discountMoney:'0.00',//抵扣金额
	       	    couponMoney:'0.00',//优惠券金额
	       	    couponNum:'0.00',//优惠券张数
	       	    balanceMoney:'0.00',//剩余余额抵扣
	       	    actBalanceMoney:'0.00',//余额抵扣
	       	    couponId:"" ,//优惠券id
	       	    coinMoney:0,//记账币
	       },
	       orderList:{
	            serveNum:0.00,//服务数量
		      	serveMoney:'0.00', //服务总额：
	       		payTotalMoney:'0.00', //应付总额
	       },
	       addressM:false, //地址提示
	       addressMS:false,// 新增地址提示
	       register:{//正则验证
	       		phone:false, //手机
	       		ConsigneeName:false,//收货人姓名
	       		Address:false,//街道地址
	       },
	       registerS:{//  新增地址 正则验证
	       		phone:false, //手机
	       		ConsigneeName:false,//收货人姓名
	       		Address:false,//街道地址
	       },
	       addDialog:false,//true表示弹出新增地址模态窗口
	       ediDialog:false,//true表示弹出编辑地址模态窗口
	       /*地址验证规则
			addressM = true 表示省市区都有 (其中省市区由watch监听联动)   正则 通过
			register true  通过手机/收货/街道地址 正则 通过
			所有img 警告图标取反
	       */
	       ediAdFlag:false,//true  编辑地址为true  新增为false
		   hiddenPay:true,//判断是否为特殊的产品
	       WQBCZ:false,//是否为现金充值,云记账,若是不允许使用优惠券和余额支付
	       contextTo:"",//路由的query值，相当于beforerouterenter的To
	       isShowCoupon:false,//是否展示优惠券
	       isSelected:true,//记账币打勾
	       isShowCoin:false,//是否显示记账币
	       orderData:[],//需要存储的订单数据
	       totalCoin:0,//记录记账币
	       coinRule:'',//记账币规则
	       proIdd:"",//记录商品idd
	       proNum:"",//记录商品数量
	    }
    },
    components:{
    	publicPendantR,
    	topState,
    	publicBottom,
    	billDialog,//发票组件
    },
	created(){

		this.contextTo = this.$route.query;
	},
    mounted(){
    	//获取购物车列表
    	getD.ShoppingCarList()
		.then((res)=>{
	    	let finallPrice = 0;
	    	let temp = 0;
	    	let serveNum = 0;
	    	let _list = []
    	 	let tempQuery = this.contextTo; //判断来自个人中心页面还是 商品详情 立即购买
			var isFromArr = Object.keys(tempQuery);
			//从商品详情
			if(isFromArr.length!=0){
				if(tool.loadFromLocal('orderMesg','ALL') == null){
					return
				}

				this.checkedProductList = tool.loadFromLocal('orderMesg','ALL').list;
				this.orderList.serveNum = tool.loadFromLocal('orderMesg','ALL').recordCount; //服务数量
				if(tool.loadFromLocal('orderMesg','ALL').list[0].Code =='WQBCZ' || tool.loadFromLocal('orderMesg','ALL').list[0].Code =='YDZCZ'){
					this.hiddenPay = false;
					this.WQBCZ = true;//是否为现金充值,云记账,若是不允许使用优惠券和余额支付
				}

				var iddArr = [];
				var numArr = [];
				tool.loadFromLocal('orderMesg','ALL').list.forEach((item,index)=>{
					if(item.IsChecked && item.ProductStatus!=1 ){
						finallPrice += Number( item.Num) *  Number( item.Price);
						_list.push(item);

						serveNum+=1;
					}
					//记录商品idd和商品数量
					iddArr.push(item.ProductIdd);
					numArr.push(item.Num);



				});

				this.proIdd = iddArr.join('|');
				this.proNum = numArr.join('|');

				//判断是否可使用记账币
				var params = {
					ids:this.proIdd,
					num:this.proNum
				}
				getD.getCoin(params)
				.then((result)=>{
					this.totalCoin = result.data.Coin;
					this.isShowCoin = result.data.isUsed;
					if(result.data.isUsed){
						this.discountList.coinMoney = result.data.Coin;
					}
				})

			}else{//从购物车
				this.orderData = res.data.list;
				var idArr = [];
				var numArr = [];
				res.data.list.forEach((item,index)=>{
					//存储每个商品的idd和num
					idArr.push(item.ProductIdd);
					numArr.push(item.Num);

					if(item.IsChecked && item.ProductStatus!=1 ){
						finallPrice += Number( item.Num) *  Number( item.Price);
						_list.push(item);
						serveNum+=1;
					}
				});

				//记录商品idd和数量
				this.proIdd = idArr.join("|");
				this.proNum = numArr.join("|");

				//判断是否可使用记账币
				var params = {
					ids:this.proIdd,
					num:this.proNum
				}
				getD.getCoin(params)
				.then((result)=>{
					this.totalCoin = result.data.Coin;
					this.isShowCoin = result.data.isUsed;
					if(result.data.isUsed){
						this.discountList.coinMoney = result.data.Coin;
					}
				})
			}
	    	this.checkedProductList = _list ;//list列表
	    	this.orderList.serveNum = serveNum ;//服务数量
    		this.orderList.serveMoney = finallPrice.toFixed(2);//服务总额

			temp =  (this.orderList.serveMoney * 10000 - this.discountList.couponMoney * 10000 - this.discountList.actBalanceMoney* 10000 - this.discountList.coinMoney*10000)/10000;
			this.orderList.payTotalMoney  = temp.toFixed(2);  //应付总额


			this.$nextTick(()=>{
				let tempProductId = [];
				this.checkedProductList.forEach((items)=>{
					if(items.ProductStatus!=1){
						tempProductId.push(items.ProductId)
					}
				});

				//获取优惠券
				var params = {
					total:this.orderList.serveMoney,//服务金额
					productid:this.proIdd,
				};
				getD.couponUseList(params).then((res)=>{
					this.couponTemp.couponList = res.data.list;
				});
			})


    	}).catch((error)=>{
//			console.log(error)
		});



    	// 请求省份
	    getD.provice().then((res) => {
	    	//console.log("???",res)
	      this.provice = res.data.list;
	    });

	    var param = {
				datatype:"json"
		};
	    //收货人列表
	    getD.getAddrList(param).then((res) => {
	     // console.log(res.data.list,'哈哈啊哈哈')
	      this.adPersonList = res.data.list;
	      // 没有收货地址显示 一个空
	       //console.log("//////////////////", this.adPersonList);
	       this.adPersonList.forEach((res,index)=>{
		       	if(res.IsDefault){
		         this.currentDefault =  index;
		       	}
	       })
	    });



	    //获取最近发票信息
	     //获取最近使用发票
        getD.requestBillList().then((res)=>{
            //console.log(res,'???')
            if(!res.data){
           		return
            }
           	switch(res.data.Type.toString()){
          	   case '0':
          	     this.recentlyBill.billCategory ='增值税普通-电子票';
          	   break;
          	   case '1':
          	      this.recentlyBill.billCategory = '增值税专用-电子票';
          	   break;
          	   case '2':
          	    this.recentlyBill.billCategory ='个人-电子票';
          	   break;
         	}
		    this.recentlyBill.billCompany = res.data.Name;
		    this.recentlyBill.cusInvoiceId = res.data.Id;
        });


		//请求记账币规则
//		let data = {
//			key:'jzb'
//		}
//		getD.getRuleDescription(data)
//		.then((res)=>{
//			this.coinRule = res.data;
//		})


        //初始化 余额
//      getD.bill_request_balance().then((res)=>{
//        if(res.data  == null){
//        	this.discountList.balanceMoney = '0.00';
//        	return
//        }
//        this.discountList.balanceMoney = res.data.Balance;
//      });
    },
    watch:{
	    provinceId(val,oldVal){ //监听省份变化
	    	// console.log("监听省份变化" ,val )
	    	this.addressMS = false;
	        this.selectCity();
	    },
	    cityId(val,oldVal){ //监听城市变化
	    	// console.log("监听城市变化" ,val )
	    	this.addressMS = false;
	        this.selectArea();
	    },
	    areaId(val,oldVal){
	    	//  console.log("监听区域" ,val ,this.ediAdFlag);
	    	 this.addressMS = false;
  			 this.addressS()//省市区正则判断
  		// 	 if( !this.ediAdFlag ){  //编辑地址为true  新增为false
  		// 	 	label   v-if="!addressM">
				// 	<img src="~assets/images/tabBar/err_tip.png">请您填写地区信息
				// </label>
  		// 	 	this.addressM = true;//true 表示不显示 收货地址警告 默认false
  		// 	 }
  			//  console.log('收货地址警告', this.addressM)
	    },
	    discountList:{
	    	handler(newValue,oldVal){
	    		let tempDiscountMoney =  Number(newValue.couponMoney) +  Number( newValue.coinMoney);
//	    		let tempPayTotalMoney = (this.orderList.serveMoney *10000 -  this.discountList.discountMoney  *10000)/10000;
//	    		let _tempPayTotalMoney = tempPayTotalMoney > 0 ? tempPayTotalMoney : 0;
	    		this.discountList.discountMoney = tempDiscountMoney.toFixed(2);////抵扣金额
//	    		this.orderList.payTotalMoney = _tempPayTotalMoney.toFixed(2);   //应付总额

	    		let params = {
	    			ids:this.proIdd,//必填：商品ID(ProductIdd)
	    			couponId:this.discountList.couponId,//选填：优惠券id
	    			bookkeepCurrency:this.discountList.coinMoney, //选填：记账币
	    			num:this.proNum//必填：商品数量（多个以"|"隔开）
	    		}
	    		getD.settlement(params)
	    		.then((res)=>{
	    			this.orderList.payTotalMoney = res.data;//应付总额
	    		})
	    	},
	    	deep:true
	    },
	},

    computed:{

    },
    methods:{
		verifyP(){//手机号码正则验证
	    	// singleInfo.ConsigneeMobile
	    	var status = tool.regularJudgement('phone',this.singleInfo.ConsigneeMobile);
	    	this.ediAdFlag = true;
	    	this.registerS.phone = false
	    	if (status) {//验证通过
				this.register.phone = true ;
			}else{
				this.register.phone = false;
			};
	    },
	    verifyCon(){//收货人姓名正则验证
	    	var status = tool.regularJudgement('person',this.singleInfo.ConsigneeName.trim());
	    	this.ediAdFlag = true;
	    	this.registerS.ConsigneeName = false;

	    	if (status) {//验证通过
				this.register.ConsigneeName = true;
			}else{
				this.register.ConsigneeName = false;
			};
	    },
	    verifyAddress(){
	        //街道地址正则验证
			// singleInfo.ConsigneeMobile
	    	var status = tool.regularJudgement('companyAddress',this.singleInfo.Address);
	    	this.ediAdFlag = true;
	    	this.registerS.Address = false;
	    	if (status) {//验证通过
				this.register.Address = true ;
			}else{
				this.register.Address = false;
			};
			// console.log(status ,'收货人地址正则验证?',this.register)
	    },

    	compileSite(data,data1,{Id} ){//编辑收货地址
			// 禁止收货地址大于十个
     		let params = {
	            	params:{
	            		Id:Id,//Id, 唯一标识（空值为新增，存在值为编辑）
            	}
            };
             //获取单个收货地址数据
     		getD.singleAddr(params).then((res)=>{
     			this.provinceId = res.data.ProvinceId
     			this.cityId = res.data.CityId
     			this.areaId = res.data.AreaId
     			this.singleInfo = res.data;
     			this.register.Address = Boolean( this.singleInfo.Address) ?true  : false ;//判断是否出现地址验证提示框
     			this.register.ConsigneeName = Boolean( this.singleInfo.ConsigneeName)  ?true  : false;//判断是否出现收货人姓名验证提示框
     			this.register.phone = Boolean( this.singleInfo.ConsigneeMobile) ?true  : false ;//判断是否出现手机验证提示框
				this.dis_disabled  = this.singleInfo.IsDefault ?true  : false;//是否为默认地址
				this.addressM = this.provinceId !='0' && this.cityId !='0' && this.areaId !='0' ?true  : false;
     			// console.log(  this.addressM  , this.register );
     			this.ediAdFlag = true;//编辑收货地址的button
		      	$("body").css({"overflow":"hidden"});
		      	this.ediDialog = true;//打开编辑地址窗口
		      	this.addDialog = false; //关闭 新增 地址窗口
                this.ediAdFlag = true;//新增收货地址


     		});

	    },
	    addCompileSite(data,data1,{Id} ){ //新增地址按钮
	    	this.ediDialog = false;//关闭 编辑地址窗口
	    	this.addDialog = true; //打开 新增 地址窗口
	    	this.ediAdFlag = false;//新增收货地址
		    this.addressMS= true ;//省市区
			this.registerS = {//正则验证
	       		phone:true, //手机
	       		ConsigneeName:true,//收货人姓名
	       		// ,//街道地址
	       		Address:true//所在地
		   }


	    	// 禁止收货地址大于十个
            if(this.adPersonList.length >= 10){
            	this.$message.error('收货地址不能多于十个喔');
            	return;
            }
	      	$("body").css({"overflow":"hidden"});

            if(!Id.trim()){ //当id不存在则表示添加新地址
             	this.provinceId = 0;
     			this.cityId = 0;
     			this.areaId = 0;
     			this.singleInfo = {
     			    id:'',
     				ConsigneeName :'',
					ConsigneeMobile:'',
					Address:'',
					IsDefault :''   ,
			    };
     			this.dis_disabled  = true
            }
			 // console.log('222222222222222',this.register, this.addressM);

	    },
	    //模态框关闭
	    close(){
	      	$(".message").css({"display":"none"});
	      	$(".message_invoice").css({"display":"none"});
			$("body").css({"overflow":"auto"});
			this.addressM = false;
			this.register.Address = false;
			this.register.ConsigneeName = false;
			this.register.phone = false;
			this.ediDialog = false;//关闭 编辑地址窗口
	    	this.addDialog = false; //关闭 新增 地址窗口
			this.ediDialog = false;//新增收货地址
	    },

    	saveConnectInfo(){//保存收货人地址 保存联系人信息
			  /*register:{//正则验证
	       		phone:false, //手机
	       		ConsigneeName:false,//收货人姓名
	       		// ,//街道地址
	       		Address:false,//所在地
	          },*/
			//false 表示通过正则验证
			if( !this.addressM  || !this.register.phone ||  !this.register.ConsigneeName ||  !this.register.Address  ){
	    		return
	    	};
	    	//所在地 街道  收货人 手机 必填项目  若有一项为false 返回
	    	// if(!this.addressM || !this.singleInfo.ConsigneeName.trim() || !this.singleInfo.ConsigneeMobile.trim() || !this.provinceId.trim() || !this.cityId.trim() || !this.areaId.trim() ||!this.singleInfo.Address.trim()  ){
	    	// 	return
	    	// };
			var params = {
	            	params:{
	            		Id:this.singleInfo.Id?this.singleInfo.Id:'',//Id, 唯一标识（空值为新增，存在值为编辑）
						ConsigneeName:this.singleInfo.ConsigneeName ,
						ConsigneeMobile: this.singleInfo.ConsigneeMobile ,
						ProvinceId: this.provinceId ,
						CityId: this.cityId ,
						AreaId: this.areaId ,
						Address:this.singleInfo.Address ,
						IsDefault:this.singleInfo.IsDefault ,
            	}
            };

    		getD.addAddress(params).then((res) => {
	         	//  console.log('/保存收货人地址',res);
	     		 window.location.reload();
	     	},(error)=>{
				 this.$message.error(error.data.msg);
			 })
    	},



		closeBilDialogFn(data){ //接受billDialog.vue 传递过来的值
    		this.showBillDialog  = data.flag;//关闭模态窗口
    	},
    	recentlyBillRefalsh({Name,Type,Id}){//接受billDialog.vue 传递过来的值  用来更新最近使用发票
    		// console.log('接受billDialog.vue 传递过来的值  用来更新最近使用发票' , Name,Type)
    	 	switch(Type.toString()){
    	 		case '0' :
    	 			this.recentlyBill.billCategory = '增值税普通-电子票';
    	 		break;
    	 		case '1' :
    	 			this.recentlyBill.billCategory = '增值税专用-电子票' ;
    	 		break ;
    	 		case '2' :
    	 			this.recentlyBill.billCategory = '个人-电子票';
    	 		break ;
    	 	}
    	 	this.recentlyBill.billCompany = Name;
    	 	this.recentlyBill.cusInvoiceId = Id;
	    },
	    changeAdList (index){//更改 收货人信息状态
	    	this.currentDefault = index;
	    	//console.log("this.currentDefault",this.currentDefault);
	    },
	     //省市区正则判断
		addressS(){
				// this.ediAdFlag = true;
				// console.log(this.provinceId =='0' &&  this.cityId =='0' && this.areaId =='0' )
				if(  this.provinceId =='0' &&  this.cityId =='0' && this.areaId =='0'   ){
					this.addressM = true;
					// console.log( 1   )
				}else if( this.provinceId =='0'|| this.cityId =='0'|| this.areaId =='0' ){
					this.addressM = false;
					// console.log(2   )
				}else{
					this.addressM = true;
					// console.log( 3   )
				}
				// console.log( this.addressM   )
		},



    	//返回首页
		home(){
			this.$router.push('/');
		},
		receiverAddress(){
			this.$router.push('/account_setting/receiverAddress');
		},
		messageImg(){
			$('input[name="name"]').css({"border":"1px solid #ccc"});
			$(".companyName").hide();
		},
		companyImg(data,data1){
			$('input[name="name"]').css({"border":"1px solid #359af8"});
			$(".companyName").show();
		},
    	//优惠券OR余额Tab切换
	    useCouponTab(data,data1){
	    	//展示收缩优惠券
	    	this.isShowCoupon = !this.isShowCoupon;

	    	var Lilength = $(data1.target).index();
//	    	$(data1.target).css({"color":"#ff3e08"});
//	    	$(data1.target).siblings().css({"color":"#4d4d4d"});
	    	if(Lilength == 0){
	    		$(".coupon").show();
	    		$(".balance").hide();
	    	}else{
	    		$(".coupon").hide();
	    		$(".balance").show();
	    	}
	    },
	    //选择优惠券
	    couponFn(val,index){
	    	if(this.WQBCZ   ){
	    		this.$message.error("此服务不能使用优惠券")
	    		return
	    	}



	    	if(val.Expired!='已过期' ){
	    		if(this.couponTemp.currentCoupon == index){//选中和取消选中
		    		this.couponTemp.currentCoupon ="-99999";
			     	 this.$set(this.discountList,'couponId',"");
				     this.$set(this.discountList,'couponNum','0');
				     this.$set(this.discountList,'couponMoney','0.00')
				     this.isSelectedCoupon = false;
		    	}else{
//		    		if(this.checkBalance){//true 表示已经选中余额
//		    			this.$message.error("优惠券和余额不同同时使用")
// 						return
//		    		}
		    		this.couponTemp.currentCoupon  = index;
			     	this.$set(this.discountList,'couponId',val.CouponId);
			        this.$set(this.discountList,'couponNum','1');
				    this.$set(this.discountList,'couponMoney',val.Price.toFixed(2))

				    this.isSelectedCoupon = true;
		    	}
	    	}
	    },
	    //取消选择
	    uncheck(data,data1){
	    	this.isCoupon=true;
	    	this.isActCoupon=false;
	    },
	    consigneeJ(data,data1){
	    	$(data1.target).children(".consignee_Compile").css({"display":"block"});
	    },
	    consigneeC(data,data1){
	    	$(data1.target).children(".consignee_Compile").css({"display":"none"});
	    },

	    //发票信息模态框
	   //发票信息模态框
	    message_invoice(){
	    	this.showBillDialog = true;
	    	var width = window.innerWidth;
			var height = window.innerHeight;
	    	$(".message_invoice")
	      	.css({"display":"block"
	      			 ,"width":width
	      			 ,"height":height
	      	})
	      	$("body").css({"overflow":"hidden"});
	    },
	    submitIndentBtn(){
	    	let tempIds = [];
	    	let tempNum = [];
    		let productType= [];
    		let tempAmount = (  this.orderList.serveMoney*10000 - this.discountList.coinMoney*10000 - this.discountList.couponMoney*10000)/10000;
    		let tempOldAmount= 0;
    		let tempRemark = [];//留言
    		let tempDeliveryAddressId = '';//地址id
    		// //console.log("???", this.checkedProductList)
    		this.checkedProductList.forEach((item,index)=>{//购物车返回数组
    			tempIds.push(item.Id);
    			tempNum.push(item.Num);
    			productType.push(item.ProductType);
    			tempOldAmount += Number(item.Num ) *  (Number( item.Price ) *10000)
    		})
    		for(let i in this.$refs.inputsMark){
			   tempRemark.push(this.$refs.inputsMark[i].value)
			}
     		// //console.log(this.$refs.inputsMark[0],'我要看地址')

     		this.adPersonList.forEach((item,index)=>{
     			if(index == this.currentDefault){
     				tempDeliveryAddressId = item.Id;
     			}
     		})
     		if(this.discountList.couponId  == undefined){
     			this.discountList.couponId  = "";
     		}

    		let data = {
    			ids	:tempIds.join("|"),//购物车主键编号
				amount	: this.orderList.payTotalMoney,//实付金额
				oldAmount	: tempOldAmount/10000,//原价
				preferentialAmount	: this.discountList.couponMoney ,//优惠金额
				couponId:	 this.discountList.couponId ,//优惠券ID
				cusInvoiceId:	this.recentlyBill.cusInvoiceId,//发票ID
				//payType,//	付款方式（0，支付宝；1，微信） pc不传
				productType	:productType.join("|"),//产品类型（例如：刻章）请使用“ |”(英文)号隔开传值
				remark:	tempRemark.join("|"),//订单备注(以'|'分隔)
				deliveryAddressId:tempDeliveryAddressId,//收货地址id
				bookkeepCurrency:this.discountList.coinMoney,//记账币
				datatype:'json'
    		};

    		let immediately_data = {
    			ids	:tempIds.join("|"),//购物车主键编号
				amount	: this.orderList.payTotalMoney,//实付金额
				oldAmount	: tempOldAmount/10000,//原价
				preferentialAmount	: this.discountList.couponMoney ,//优惠金额
				couponId:	 this.discountList.couponId ,//优惠券ID
				cusInvoiceId:	this.recentlyBill.cusInvoiceId,//发票ID
				//payType,//	付款方式（0，支付宝；1，微信） pc不传
				productType	:productType.join("|"),//产品类型（例如：刻章）请使用“ |”(英文)号隔开传值
				remark:	tempRemark.join("|"),//订单备注(以'|'分隔)
				deliveryAddressId:tempDeliveryAddressId,//收货地址id
				num:tempNum.join("|"),
				bookkeepCurrency:this.discountList.coinMoney,//记账币
				datatype:'json'
    		};
    		// console.log( "itemitemitem",immediately_data)



//  		if(this.checkBalance){
//				data.payType = '3';//代表余额支付
//				immediately_data.payType = '3';//代表余额支付
//  		}


    		// //console.log(data,'订单参数') ;

	    	//提交订单--按照立即购买  不加入购物车
			let isQuery =  Object.keys(this.$router.currentRoute.query);
			// console.log('123', this.$router )
	    	if(isQuery.length != 0){//说明对象不为空 来自立即购买
		    	getD.orderFromCart_immediately(immediately_data).then((res)=>{
					// console.log("立即购买,生成订单成功",res,this.checkBalance);

					//删除本地存储
//					tool.removeLocal('orderMesg');

//	    			if(this.checkBalance){
//						this.$router.replace({path: "/personalCenter/allOrder"})//直接扣款 不跳转结算 直接跳转我的订单
//			    		return
//			    	}else{

					//是否能用记账币一次性付完
					if(this.discountList.coinMoney >= this.orderList.serveMoney){
						//存储金额
            			tool.saveToLocal('orderMoney','orderMoney','orderMoney',immediately_data.amount);

	    				this.$router.replace({path:'/cart/status',query:{type:0}});
	    				return
			    	}else{

			    		//本地存储订单信息
						var obj = {};
						obj.list = tool.loadFromLocal('orderMesg','ALL').list;//订单数据
						//删除本地存储
						tool.removeLocal('orderMesg');

						obj.orderNum = res.data;//订单号
						obj.money = this.orderList.payTotalMoney;//应付金额
						tool.saveToLocal('orderMesg',obj);

			    		this.$router.replace('/cart/newPayment');
			    		return
			    	}
//						this.$router.replace({path:'/cart/payment',query:{orderId:res.data}})

//			    	}

	    		}).catch((res)=>{
	    			// console.log(res,'立即购买,生成订单报错');
	    			return
	    		})
	    		return
	    	}
	    	//提交订单--按照加入购物车流程购买
	    	//判断是否使用余额  使用余额直接跳转我的订单
	    	//不用余额 跳转结算页面且形成订单
    		getD.orderFromCart(data).then((res)=>{
				if(res.msg == '已经购买过类似服务'){
					this.$message.error(res.msg);
					return  false
				}

				// console.log("正常购物车,生成订单成功",res );
				//删除本地存储
//				tool.removeLocal('orderMesg');
//  			if(this.checkBalance){
//					this.$router.replace({path: "/personalCenter/allOrder"})
//		    	}else{
//					if(data.amount == 0){// 0元支付跳转
//						this.$router.replace({path: "/personalCenter/allOrder"});//直接扣款 不跳转结算 直接跳转我的订单
//		    		}else{
//						this.$router.replace({path:'/cart/payment',query:{orderId:res.data}})
//		    		}
		    		//是否能用记账币一次性付完
					if(this.discountList.coinMoney >= this.orderList.serveMoney){
						//存储金额
            			tool.saveToLocal('orderMoney','orderMoney','orderMoney',data.amount);

	    				this.$router.replace({path:'/cart/status',query:{type:0}});
	    				return
			    	}else{

			    		//本地存储订单信息
						var obj = {};
						obj.list = this.orderData;
						obj.orderNum = res.data;
						obj.money = this.orderList.payTotalMoney;
						tool.saveToLocal('orderMesg',obj);

			    		this.$router.replace('/cart/newPayment');
			    		return
			    	}
//		    	}
    		 }).catch((error)=>{
                   this.$message.error(error.data.msg);
             })

	    },
//	    checkBalanceFn(){ //是否选中余额
//
//	    	//现金充值 不允许选择余额
//	    	if(this.WQBCZ  ){
//
//	    		this.$message.error('此服务不能使用余额');
//	    		return
//	    	};
// 			if( this.discountList.couponNum > 0){
//
// 				return
// 			};
// 			//余额为 0 提示重置
// 			if(this.discountList.balanceMoney == 0){
// 					this.$message.error('请充值后使用');
// 				return
// 			};
//
//  		if(this.orderList.serveMoney <=  this.discountList.balanceMoney ){ //当服务金额大于 余额 提示余额不够 否则显示余额抵扣== 服务金额
//  			// this.discountList.actBalanceMoney = this.orderList.serveMoney  ;
//  			this.checkBalance = !this.checkBalance;
//  			//console.log( this.checkBalance, this.orderList.serveMoney)
//  			this.discountList.actBalanceMoney = this.checkBalance? this.orderList.serveMoney :'0.00' ;
//  		}else{
//  			this.checkBalance = false;
//  			this.discountList.actBalanceMoney = '0.00';
//  			this.$message.error('您的余额不足,请充值或者选择其他方式支付');
//  		};
//	    },
	    selectCity(){  // 请求城市
		    //  console.log(this.provinceId,'请求城市')
		     //console.log(this.provice)
	         //判断用户是否改变了省份
		      var param = {
		        params:{
		          datatype:"json",
		          Id:this.provinceId.toString().length != 1?this.provinceId:this.provice[0].Id,//默认显示北京市
		        }
		      }

		      getD.cityArea(param).then((res) => {
		          this.city = res.data.list;
		          let tempId = this.city.find((item)=>{
		          	return item.Id == this.cityId
		          })
		          if(tempId == undefined){ //表示没找到
						this.cityId = 0;
		          }
		          //console.log(this.city);
		      	//   console.log(this.cityId,'请求区域1234')
		      	  this.addressS()
		      })
	    },
	    selectArea(){  // 请求区域
	     //console.log(this.city   ,'请求区域请求区域请求区域')
	     //console.log(this.cityId.toString().length != 1?this.cityId:this.city[0].Id,'请求区域请求区域请求区域')
	      var param = {
	        params:{
	            datatype:"json",
	            Id:this.cityId.toString().length!= 1?this.cityId:this.city[0].Id,//默认北京市区
	        }
	      }
	      getD.cityArea(param).then((res) => {
	            this.area = res.data.list;
	            let tempId = this.area.find((item)=>{
	            	return item.Id == this.areaId
	            })
	            if(tempId == undefined){ //表示没找到
					this.areaId = 0;
	            }
	            this.addressS();//省市区正则判断
	      })
	    },
	    //选择记账币
	    toChooseCoin(){
	    	//取消/选择记账币
	    	this.isSelected = !this.isSelected;
	    	//取消时归0
	    	if(!this.isSelected){
	    		this.discountList.coinMoney = 0;
	    	}else{
	    		this.discountList.coinMoney = this.totalCoin;
	    	}

	    },
	    //记账使用规则
	    coinGuide(){
	    	this.$alert("1.记账币仅限购买的“智能云记账”产品，不可用于购买其它产品；<br/>2.记账币也可用于帮他人代付“智能云记账”产品；", '记账币规则说明', {
	          confirmButtonText: '我知道了',
	          dangerouslyUseHTMLString: true,
	          customClass:'popup',
	          callback: action => {

	          }
	        });
	    }

    },

    directives: {
	  typeBr: {
	    // 指令的定义
	    bind: function (el, binding, vnode) {
	    	//console.log(el.innerHTML);
	      	let _val = el.innerHTML.split(';');
	      	//console.log(_val)
	      		//console.log(_val.join("<br />"))
	      	el.innerHTML = _val.join("<br />")
	    }
	  }
	}
}
</script>

<style lang="less" type="stylesheet/css" scoped>
  @import "~assets/common/index.less";
  @import "~assets/common/common.less";
  @import "./cart.less";
</style>
