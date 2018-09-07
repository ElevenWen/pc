<template>
	 	<div id="cart">
	    <!-- 公用top  -->
		<div class="c-headerContainWrap">
			<div class="c-header">
				<div class="c-hdTopWrap">
					<topState></topState>
				</div>
			</div>
			<publicPendantR></publicPendantR>
		</div>
		<search name="购物车"> </search>
		<!-- 公用top -->
		<div class="cart">
			<div class="shoppingMainWrap" id="shoppingMainWrap">
				<div class="shoppingIsShow" v-show="list.length != 0">
					<div class="shoppingIsShow_top">全部商品&nbsp;{{list.length}}</div>
					<form id="checkboxform<br />">
						<div class="cart_head">
							<ul>
								<li><el-checkbox v-model="checkAll" @change="handleCheckAllChange(checkAll,list)">全选</el-checkbox></li>
								<li>商品信息</li>
								<li>单价（元）</li>
								<li>数量</li>
								<li>小计（元）</li>
								<li>操作</li>
							</ul>
						</div>

						<div class="cart_body" >
							<div v-for="(item,index) in list" id="box" :key="index">

								<!-- 套餐 S -->
								<div class="cart_list taocan"  v-if="item.Type == 1 " >
									<div class="cart_list_head"  >
										<span class="discounts"></span>
										{{item.ProductName}}
										<input class="commodity_subtotal" type="text" :value="'￥'+item.Num*item.Price" />
										<div class="commodity_current">￥{{item.Price}}</div>

									</div>

									<el-checkbox-group v-if="item.ProductStatus == 0 "  v-model="checkedCities" @change="handleCheckedCitiesChange(checkedCities,item,list)">
						 				<el-checkbox   :label="item.Id" :key="item.Id"></el-checkbox>
						 			</el-checkbox-group>
						 			<div v-else class="cart_list_sx"><span>失效</span></div>


						 			<div class="commodity_quantity">
										<input type="hidden"   :value="item.Num" id="ab" v-cloak/>
										<template>
										  <el-input-number v-model.number="item.Num" @change="handleChange(item.Num,$event,item)" :min="1" :max="999"></el-input-number>
										</template>
										<div class="commodity_del" @click="delCarPro(item.Id,index,$event)">删除</div>
									</div>
									<ul class="productWrap"  v-for=" (combo,index ) in  item.ProductDetails" :key="index">
										<li>{{combo}}</li>
										<li>
											<div class="commodity_img" @click="ProductDetails(item)"><img class="lazyload" :data-src="combo.PCThumbImgURL" alt="combo.Name"></div>
											<div class="commodity_name" @click="ProductDetails(item)">{{combo.Name}}</div>
											<div class="commodity_type" style="line-height:1.5">
												<span v-typeBr>{{combo.ProductType}}</span>
											</div>
										</li>
										<li class="oldPriceWrap">
											<div class="commodity_original">￥{{combo.OldPrice}}</div>
											<div class="commodity_current">￥{{combo.Price}}</div>
										</li>
										<li  class="commodity_quantityWrap">
											<div class="commodity_original">1件 x {{item.Num}}</div>
										</li>
										<li class="priceWrap">
											<input class="commodity_subtotal" type="text" :value="'￥'+(item.Num*item.Price).toFixed(2)" disabled='disabled' />
										</li>
										<li>
											<!-- CusHouseId:collectId,Num,Price,Id:ShoppingId,ProductId -->
											<!-- <div class="commodity_collect" v-if="combo.CusHouseId.length <= 0" @click="collectFn({ProductId:combo.ProductId,Num:item.Num,Price:combo.Price,Id:item.Id })">收藏</div>
											<div class="commodity_collect" v-else   @click="delCollect({CusHouseId:combo.CusHouseId, Id:item.Id})">取消收藏</div> -->
										</li>
									</ul>
								</div>
								<!-- 套餐 E  -->

								<!-- 单品 S -->
								<div class="cart_list"    v-else-if="item.Type == 0" >
									<div class="cart_list_head"   v-if="item.Promotion" >
										<span class="discounts">满减</span>
										活动商品购满¥99.00， 即可享受满减 >	  去凑单 >
									</div>

									<el-checkbox-group v-if="item.ProductStatus == 0 "  v-model="checkedCities" @change="handleCheckedCitiesChange(checkedCities,item,list)">
						 				<el-checkbox  style="font-size:0!important"  :label="item.Id" :key="item.Id"></el-checkbox>
						 			</el-checkbox-group>

						 			<div v-else class="cart_list_sx"><span>失效</span></div>


						 			<div class="commodity_quantity">
										<input type="hidden"   :value="item.Num" id="ab" v-cloak/>
										<template>
										  <el-input-number v-model.number="item.Num" @change="handleChange(item.Num,$event,item)" :min="1" :max="999"></el-input-number>
										</template>
										<div class="commodity_del" @click="delCarPro(item.Id,index,$event)">删除</div>
									</div>
									<ul class="productWrap">
										<li>
											 <!-- <div>占位符</div> -->
										</li>
										<li>
											<div class="commodity_img" @click="ProductDetails(item)"><img :src="item.PCThumbImgURL"></div>
											<div class="commodity_name" @click="ProductDetails(item)">{{item.ProductName}}</div>
											<div class="commodity_type"  style="line-height:1.5">
												<span v-typeBr>{{item.ProductType}}</span>
											</div>
										</li>
										<li class="oldPriceWrap">
											<div class="commodity_original">￥{{item.OldPrice}}</div>
											<div class="commodity_current">￥{{item.Price}}</div>
										</li>
										<li  class="commodity_quantityWrap">
											<!-- <div>占位符</div> -->
										</li>
										<li class="priceWrap">
											<input class="commodity_subtotal" type="text" :value="'￥'+(item.Num*item.Price).toFixed(2)" disabled='disabled'/>
										</li>
										<li  v-if="item.ProductStatus == 0 ">
											<div class="commodity_collect" v-if="item.CusHouseId.length <= 0"   @click.stop.prevent="collectFn(item,index)"  >收藏</div>
											<div class="commodity_collect" v-else   @click.stop.prevent = "delCollect(item,index)">取消收藏</div>
										</li>
									</ul>
								</div>
								<!-- 单品 E -->



							</div>
						</div>
						<div ref="boxBox"  class="account"  @mouseleave="selectedC()" >
							<!--已选购物车产品-->
							<div class="selectedProduct">
								<div class="mk" >
									<!-- 跳转详情点击事件未写 -->
									<div class="mj" @click="ProductDetails(item)" v-for="(item ,index) in thumbnail" :key="index">

										<img class="lazyload" :data-src="item.PCThumbImgURL" alt="" />

									</div>
								</div>
							</div>
							<div class="popup">
						        <span><em></em></span>
						    </div>
							<span class="checkboxAll">
								 <el-checkbox   v-model="checkAll" @change="handleCheckAllChange(checkAll,list)">全选</el-checkbox>
							</span>
							<span class="del" @click="delAll(list,this,$event)">删除</span>
							<span class="collect"  @click="collectAllFn(list)">收藏</span>
							<div class="account_right">
								<span class="selected" @mouseenter="selectedJ(this,$event)">已选择<label>{{cartTotalNum}}</label>件商品</span>
								<span class="collect_money">合计：<label>￥{{cartTotalPrice}}</label></span>
								<span :class="checkedCities.length!=0?'collect_butActive':'collect_but'" @click="account(this,$event)">结算</span>
							</div>
						</div>
					</form>
				</div>
				<!--购物车为空-->
				<div class="shoppingIsNull" v-if="list.length == 0">
					<div class="shoppingIsNull_img">
						<img src="../../assets/images/cart/cart_default.png">
					</div>
					<p>购物车空空的哦~，去看看心仪的商品吧~</p>
					<span @click="goProductList">去购物&nbsp;&gt;&gt;</span>
				</div>
			</div>
			<div class="like">
				<template>
				    <el-tabs v-model="activeName">
					    <el-tab-pane label="最近热销" name="first" v-if="hotArr.length">
					    	<div class="carousel">
					    		<el-carousel     :autoplay="autoplay" trigger="click" height="330px">
							        <el-carousel-item  v-for="item in hotArr" :key="item.index"  >
							        	<ul class="carouselUl">
							        		<li v-for="(items,index) in item" :key="index" @mouseenter="carouselJ(this,$event)" @mouseleave="carouselC(this,$event)">
							        			<div class="carousel_Img">
							        				<img :src="items.PCThumbImgURL" />
							        			</div>
							        			<div class="carousel_detail">
							        				<div>
							        					<span class="priceStyle">￥{{items.Price}}</span>
							        					<span>￥{{items.OldPrice}}</span>
							        				</div>
							        				<div>
							        					{{items.Name}}
							        				</div>
							        				<div>
							        					<span>销量：{{items.SalesAmount}}</span>
							        					<!-- <span @mouseenter="carouselS(this,$event)" @mouseleave="carouselP(this,$event)" @click="addToShoppingCart(items.ProductId,items.Price,items.OldPrice)">立即购买</span> -->
							        					<span @mouseenter="carouselS(this,$event)" @mouseleave="carouselP(this,$event)" @click="buyNow(items.ProductId,items.Price,items.OldPrice,items.SalesPromotionId)" class="buyNow">立即购买</span>
							        				</div>
							        			</div>
							        		</li>
							        	</ul>
							        </el-carousel-item>
							    </el-carousel>
					    	</div>
					    </el-tab-pane>
					    <el-tab-pane label="最近收藏" name="second" v-if="collectArr.length">
					    	<div class="carousel">
					    		<el-carousel     :autoplay="autoplay" trigger="click" height="330px">
							        <el-carousel-item  v-for="(item,index) in collectArr" :key="index"  >
							        	<ul class="carouselUl">
							        		<li v-for="(items,index) in item" :key="index" @mouseenter="carouselJ(this,$event)" @mouseleave="carouselC(this,$event)" class="hoverStyle">
							        			<div class="carousel_Img" @click="goProduct(items.ProductId,items.Type)">
							        				<img :src="items.PCThumbImgURL" />
							        			</div>
							        			<div class="carousel_detail">
							        				<div>
							        					<span class="priceStyle">￥{{items.Price}}</span>
							        					<span>￥{{items.OldPrice}}</span>
							        				</div>
							        				<div @click="goProduct(items.ProductId,items.Type)">
							        					{{items.Name}}
							        				</div>
							        				<div>
							        					<span>销量：{{items.SalesVolume}}</span>
							        					<span @mouseenter="carouselS(this,$event)" @mouseleave="carouselP(this,$event)" @click="goProduct(items.ProductId,items.Type)">加入购物车</span>
							        				</div>
							        			</div>
							        		</li>
							        	</ul>
							        </el-carousel-item>
							    </el-carousel>
					    	</div>
					    </el-tab-pane>
					    <el-tab-pane label="最近浏览" name="third" v-if="glancetArr.length">
					    	<div class="carousel">
					    		<el-carousel trigger="click" height="330px">
							        <el-carousel-item v-for="item in glancetArr" :key="item.index">
							        	<ul class="carouselUl">
							        		<li v-for="(items,index) in item" :key="index" @mouseenter="carouselJ(this,$event)" @mouseleave="carouselC(this,$event)" class="hoverStyle">
							        			<div class="carousel_Img" @click="goProduct(items.ProductId,0)">
							        				<img :src="items.ImgUrl"/>
							        			</div>
							        			<div class="carousel_detail">
							        				<div>
							        					<span class="priceStyle">￥{{items.Price}}</span>
							        					<span>￥{{items.OldPrice}}</span>
							        				</div>
							        				<div @click="goProduct(items.ProductId,0)">
							        					{{items.Name}}
							        				</div>
							        				<div>
							        					<span>销量：{{items.SalesAmount}}</span>
							        					<span @mouseenter="carouselS(this,$event)" @mouseleave="carouselP(this,$event)" @click="goProduct(items.ProductId,0)">加入购物车</span>
							        				</div>
							        			</div>
							        		</li>
							        	</ul>
							        </el-carousel-item>
							    </el-carousel>
					    	</div>
					    </el-tab-pane>
					    <!-- <el-tab-pane label="猜你喜欢" name="fourth">
					    	<div class="carousel">
					    		<el-carousel trigger="click" height="330px">
							        <el-carousel-item v-for="item in 5" :key="item">
							        	<ul class="carouselUl">
							        		<li @mouseenter="carouselJ(this,$event)" @mouseleave="carouselC(this,$event)">
							        			<div class="carousel_Img">
							        				<img src="../../assets/images/cart/products_Right3.png" />
							        			</div>
							        			<div class="carousel_detail">
							        				<div>
							        					<span>￥<label>1288</label></span>
							        					<span>￥2000</span>
							        				</div>
							        				<div>
							        					注册香港公司加急离岸申请年审...
							        				</div>
							        				<div>
							        					<span>销量：213</span>
							        					<span @mouseenter="carouselS(this,$event)" @mouseleave="carouselP(this,$event)">加入购物车</span>
							        				</div>
							        			</div>
							        		</li>

							        	</ul>
							        </el-carousel-item>
							    </el-carousel>
					    	</div>
					    </el-tab-pane> -->
				    </el-tabs>
				</template>
			</div>
			<div class="service">
				<div class="ul_container">
					<ul>
					<li>
						<div class="img_box">
							<img src="../../assets/images/cart/service (2).png" alt="">
						</div>
						<div class="content">
							<h3>价格透明</h3>
							<P>服务无差价，无忧省心</P>
						</div>
					</li>
					<li>
						<div class="img_box">
							<img src="../../assets/images/cart/time_ad.png" alt="">
						</div>
						<div class="content">
							<h3>及时响应</h3>
							<P>在线咨询，及时响应</P>
						</div>
					</li>
					<li>
						<div class="img_box">
							<img src="../../assets/images/cart/xitong.png" alt="">
						</div>
						<div class="content">
							<h3>系统管理</h3>
							<P>实时监控，办理流程化</P>
						</div>
					</li>
					<li>
						<div class="img_box">
							<img src="../../assets/images/cart/shouhou.png" alt="">
						</div>
						<div class="content">
							<h3>服务售后</h3>
							<P>退款100%受理，100%解决</P>
						</div>
					</li>
				</ul>
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
	import getD from "~/store/ajaxAPI/getData.js";
	import {mapGetters,mapState,mapMutations ,mapActions } from 'vuex';
	import publicPendantR from "~/components/common/publicPendantR";
	import topState from "~/components/common/topState";
	import publicBottom from "~/components/common/publicBottom";
	import search from "~/components/common/search";
	import fmt from '~/assets/lib/tool.js';

	export default {
		// asyncData({ store, params }){
		//    return getD.login({ username: "13410897440",  password: "13410897440"})
		//     .then((res) => {
		//     	console.log('--------------------------------------')
		//     	 if (res.code === 401) { //登录超时
		// 		    throw new Error('Bad credentials')
	 //            }else if(res.code === 402){ // 密码错误
	 //                throw new Error(res.message)
	 //            }else if(res.code === 403){ //暂时未用到
	 //                throw new Error(res.message)
	 //            }
	 //            else {


	 //                store.dispatch("loginDVisible",res);//存入vuex  保存本地
	 //                // this.loginOut()//退出demo
	 //                 return {getAuth:res}
	 //            }
	 //        });
	 //   },



		data() {
		    return {
		    	checkAll: false,//全选状态默认false
		      	activeName: 'second',
		      	sumNum:{items:100},
		      	list:[], //购物车列表数据
		      	checkedCities:[],//element 用来存放 checkbox 初始化状态
		      	cartTotalNum:0,//已选择的购物车商品数量
		      	cartTotalPrice:0,//已选择商品的总价格
		      	thumbnail:[],//已选择的购物车商品 缩略图
		      	debounce:4000,//输入去抖
		      	autoplay:false,
	            collectBtnList:[],//产品收藏按钮
	            collectArr:[], //最近收藏循环的数组
	            hotArr:[],  //最近热销循环的数组
				glancetArr:[],  //最近浏览循环数组
				scrollH:'',//滚动条距离顶部高度
		    }
		},
	    components:{
	    	publicPendantR,
	    	topState,
	    	publicBottom,
	    	search,
	    },
	   updated(){
		//    console.log('哈哈啊哈')
		   var clientH = $(window).height();  //获取浏览器可视高度
		   var noFixH =  $('.shoppingMainWrap').height() + $('.shoppingMainWrap').offset().top; //商品列表的高
		   var haha =  $('.shoppingMainWrap').height() //商品列表的高
		   var windowH = $('.shoppingMainWrap').offset().top;  //购物车内容到浏览器顶端距离
		   var carH = $('.shoppingMainWrap').height();  //购物车内容模块的高度
		   $(window).scroll({noFixH,clientH,haha},()=>{
			   if( noFixH < clientH){ //商品列表的高<可视区域，不触发滚动
					return;
				}
			   this.scrollH = $(window).scrollTop();
			   var cha = noFixH - clientH -40;
			   if(this.scrollH<cha){
					$(".account").css({"position":"fixed","bottom":"-42px","z-index":"999","width":"1200px","background":"#efefef"})
				}else{
					$(".account").css({"position":"inherit","bottom":"-42px","z-index":"999","width":"100%","background":"#fff"})
				}
		   })
	   },
	    mounted(){


	    	// this.loginDVisible(this.getAuth)
		    	// console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++" );

	    	var param = {
				params:{
					datatype:"json",
					type:'PC',
				}
			}
			// 初始化购物车列表
	    	getD.ShoppingCarList(param).then((res) => {

	    		let tempResetIsCheckState = [];
	    		res.data.list.forEach((items)=>{
	    			if(items.ProductStatus == 1){ //1 表示下架
	    				tempResetIsCheckState.push(items.Id);
	    			}
	    		});

	    		//根据产品的上下架状态 重置isChecked ProductStatus	商品/套餐状态(0上架Shelve；1下架Shelf)
	    		this.resetIsCheckedState(tempResetIsCheckState).then(res=>{

	    			getD.ShoppingCarList(param).then((res) => {//重置产品isCheck状态后,重新初始化购物车列表
	    				let checkLen = [];
			    		this.checkedCities = []; this.thumbnail = [];
			    		this.list = res.data.list;
			    		this.cartTotalNum =  this.cartTotalPrice  = 0 ;
			    		let sum = 0 , num= 0 ,price=0;
			    		this.list.forEach((items)=>{
			    			if(items.ProductDetails.length != 0 ){//套餐数据存入 收藏列表
			    				items.ProductDetails.forEach((res)=>{
			    					this.collectBtnList.push(res.CusHouseId);
			    				})
			    			}else{
			    				this.collectBtnList.push(items.CusHouseId);
			    			}
			    		 	if( items.ProductStatus !=1){checkLen.push(items.Id); }
		    		 		if(items.IsChecked && items.ProductStatus !=1){
			    		 		this.checkedCities.push(items.Id);
								this.thumbnail.push(items);
			    		 		this.cartTotalNum +=  Number(items.Num) ;
			    		 		num = Number(items.Num);
			    		 		price = Number(items.Price)*10000;
			    				sum += num * price
			    		 	}
		    			});
			    		this.cartTotalPrice = (sum/10000).toFixed(2);
			    		let  checkedCount = this.checkedCities.length;
				    	this.checkAll =  checkedCount === checkLen.length;//当数组长度一致 表示全选生效

	    			})
	    		});
			});//初始化购物车列表 ==E

	    	let hotCartFn = new Promise((resolve,reject)=>{
	    		//最近热销  列表数据tab
		    	getD.hotCart(param).then((res)=>{
		            if(res.data.list.length == 0){
		            	resolve({data:'热销无数据',code:'0'});
		            }
					let arr = res.data.list[0].Pro_SalesPromotionListViewModels;
		            for(var i=0;i<arr.length;i+=5){
		               this.hotArr.push(arr.slice(i,i+5))
		            }
		            resolve(this.hotArr)
					// console.log('最近热销',res.data)
		    	}).catch( err=>{
					reject('最近热销失败',err)
				});
	    	})


	    	let CollectFn = new Promise((resolve,reject)=>{
	    		//最近收藏 列表数据tab
		    	getD.myCollect(param).then((res)=>{
					if(res.data.list.length == 0){
		            	resolve({data:'最近收藏无数据',code:'0'});
		            }

		            let arr = res.data.list;
		            for(var i=0;i<arr.length;i+=5){
		               this.collectArr.push(arr.slice(i,i+5))
		            }
		             resolve(this.collectArr)
		    	}).catch(err=>{
		            // console.log('收藏错误',err)
		            reject('收藏错误',err)
		        })
	    	})

	    	let CusBrowseRecordFn = new Promise((resolve,reject)=>{
		        //最近浏览
		        getD.CusBrowseRecord().then(res=>{
		            if(res.data.list.length == 0){
		            	resolve({data:'最近浏览无数据',code:'0'});
		            }
		            let arr = res.data.list;
		            for(var i=0;i<arr.length;i+=5){
		               this.glancetArr.push(arr.slice(i,i+5))
		            }
		             resolve(this.glancetArr)
					 // console.log('最近浏览',res.data)
		        }).catch(err=>{
		        	 reject('最近浏览失败',err)
		            // //console.log('最近浏览失败',err)
		        })
	    	})






	    	//同步请求
	    	Promise.all([hotCartFn,CollectFn,CusBrowseRecordFn]).then((correct)=>{

	    		 // console.log('correct',correct )
	    		for(var i = 0 ; i < correct.length ;i++){
	    			if(correct[i].code != 0 && i == 0 ){
	    				this.activeName = 'first';
	    				return
	    			}
	    			if(correct[i].code != 0 && i == 1 ){
	    				this.activeName = 'second';
	    				return
	    			}
	    			if(correct[i].code != 0 && i == 2 ){
	    				this.activeName = 'third';
	    				return
	    			}
	    		}

	    	}).catch((error)=>{
	    		//console.log(error,'报错了,请按照传入正确产品')
	    	})

	    	setTimeout(function () {
		        var noFixH =  $('.shoppingMainWrap').height() + $('.shoppingMainWrap').offset().top;
		        var clientH = $(window).height();  //获取浏览器可视高度
		        var carH = $('.shoppingMainWrap').height();  //购物车内容模块的高度
		        this.scrollH = $(window).scrollTop();
		        var cha = noFixH - clientH -40;
		        if(this.scrollH<cha){
					$(".account").css({"position":"fixed","bottom":"-42px","z-index":"999","width":"1200px","background":"#efefef"})
				}else{
					$(".account").css({"position":"inherit","bottom":"-42px","z-index":"999","width":"100%","background":"#fff"})
				}
		    }, 2000);


	//  	alert(noFixH);
	    	// this.$nextTick(()=>{
			// 	var windowH = $(window).height();  //获取浏览器可视高度
			// 	var scrollH = $(window).scrollHeight;
			// 	if(scrollH>windowH){
			// 		$(".account").css({"position":"fixed","bottom":"-42px","z-index":"999","width":"1200px","background":"#efefef"})
			// 	}
	//  		alert(windowH);
	//  		alert($("body").height())
	////  		//console.log(this.$refs)
	////  		//console.log( this.$refs.boxBox)
	////  		this.$refs.box.offsetTop,this.$refs.box
	//  		var accountH = document.getElementsByClassName('account')[0].offsetTop;	//获取结算栏距离顶部的高度
	//  		var windowH = $(window).height();  //获取浏览器可视高度
	//		    var sTop = document.documentElement.scrollTop || document.body.scrollTop;
	//		    var result = accountH - sTop + 140;	//减去滚动条的高度
	//		    //console.log(accountH,windowH)
	//  		if(result > windowH){
	//  			$(".account").css({"position":"fixed","bottom":"-42px","z-index":"999","width":"1200px","background":"#efefef"})
	//  		}else{
	//  			$(".account").css({"position":"inherit","bottom":"-42px","z-index":"999","width":"100%","background":"#fff"})
	//  		}
	    	// })
	    },

	    computed:{
	    	//返回顶部
	    	top() {
		    //  return - this.activeIndex * 30 + 'px';
		    },
	    },
	    methods:{
	    	...mapActions(
			 	{
			 		"loginDVisible":"loginDVisible",
			 	},
			),
	    	goProductList(){

	    		// 待修改
	    		this.$router.push({path:'/productList',query:{typeIndex:"all",productName:'all'}});
	    	},
	    	//重置checked样式  参数1 表示下架的产品
	    	resetIsCheckedState(list){

		    	let	allDate = list;

		    	let paramCheck = {
	    			params:{
						datatype:"json",
						ids:allDate.join("|"),
						IsChecked:false,
					}
	    		};
	    		return getD.changeCheckCart(paramCheck).then((res)=>{ // 改变购物车状态
	    			let checkLen = [];
	    			this.checkedCities = []; this.thumbnail = [];
		    		this.list = res.data.list;
		    		this.cartTotalNum =  this.cartTotalPrice  = 0 ;
		    		let sum = 0 , num= 0 ,price=0;
		    		this.list.forEach((items,index)=>{
		    			if( items.ProductStatus !=1){checkLen.push(items.Id); }
		    		 	if(items.IsChecked && items.ProductStatus !=1){
		    		 		this.checkedCities.push(items.Id);
							this.thumbnail.push(items);
		    		 		this.cartTotalNum +=  Number(items.Num) ;
		    		 		num = Number(items.Num);
		    		 		price = Number(items.Price)*10000;
		    				sum += num * price
		    		 	}
		    		});

		    		this.cartTotalPrice = (sum/10000).toFixed(2);
		    		let  checkedCount = this.checkedCities.length;
		    	    this.checkAll =  checkedCount === checkLen.length;//当数组长度一致 表示全选生效
	    		});
	    	},
			//点击最近热销里的加入购物车进购物车
			// addToShoppingCart(productId,price,oldPrice,ProductType){
			// 	var params = {
			// 		num:1,
			// 		productId:productId,
			// 		price:price,
			// 		oldPrice:oldPrice,
			// 		datatype:'json'
			// 	}
			// 	getD.addToShoppingCart(params).then(res=>{
			// 		//console.log('加入购物车成功',res)
			// 	}).catch(err=>{
			// 		//console.log(err)
			// 	})
			// },
			//点击最近热销里的立即购买--进结算页
			//再次购买-立刻购买
		  buyNow(id,price,oldPrice,SalesPromotionId){
			//   //console.log(id,price,oldPrice,SalesPromotionId)
			  var params = {
				  id:id,
				  amount:price,
				  oldAmount:oldPrice,
				  productType:1,
				  SalesPromotionId:SalesPromotionId,
				  dataType:'json'
			  }
			  getD.GetOrderListByProductId(params).then(res=>{

				  let arr = res.data;
				  arr[0].Id = id;
				  arr[0].IsChecked = true;
				  let obj ={list:arr};

				//   setStore('orderMesg',obj);
				  fmt.saveToLocal('orderMesg',obj);
				  this.$router.push({path:'/cart/settleAccounts',query:{isNowBuy:'yes'}})
			  }).catch(err=>{
				//   console.log('立即错',err)
			  })
		  },
			//点击最近xx里的图片和标题跳详情页
			goProduct(id,type){
				// this.$router.push({path:'/productDetails',query:{id:id,type:type}});
				//this.$router.push({path:'/productDetails',params:{id:id,type:type}});
				this.$router.push({
					path:'/productDetails/' + id + '/' + type
				});
			},
	    	selectedJ(data,data1){ //数表放已选择 出现选择列表
		    	$(".selectedProduct").show();
		    	$(".popup").show();
		    },
		    selectedC(data,data1){
		    	$(".selectedProduct").hide();
		    	$(".popup").hide();
		    },
	    	totalFn:function(){
	    		//总价
	    	},
	    	handleBlur(event,item){ //事件 当前input 的内容
	    		let newItem = item;
	    		newItem.Num = event.target.value;
	    		let  currentIndex = '12300'; //默认值
	    		this.list.forEach((items,index)=>{
	    			if(items.Id == item.Id ){
	    				currentIndex = index;
	    				return
	    			}
	    		});
	    		this.list.splice(currentIndex,1,newItem)//从index删除当前,push新的;
	    	},
	    	handleChange(oldV,newV,list,event) {//添加 减少购物车
	    		list.Num  = newV;
	    		if(newV<=0){ //防止为购物车数量为-1
	    			return
	    		}
	    		var tempPrice = [];
				let param = {//添加 减少购物车参数
					params:{
						datatype:"json",
						id:list.Id,
						type:'reduce',
						num:newV,
					}
				};
	    		let paramCheck = {// 改变购物车状态
	    			params:{
						datatype:"json",
						ids:list.Id,
						IsChecked:true,
					}
	    		}
	    		getD.addOrDescCart(param).then((res)=>{//增加或者减少购物车数量
	    			getD.changeCheckCart(paramCheck).then((res)=>{ // 改变购物车状态
	    				let checkLen =[]
		    			this.checkedCities = []; this.thumbnail = [];
			    		this.list = res.data.list;
			    		this.cartTotalNum =  this.cartTotalPrice  = 0 ;
			    		let sum = 0 , num= 0 ,price=0;
			    		this.list.forEach((items)=>{
			    			if( items.ProductStatus !=1){checkLen.push(items.Id); }
			    		 	if(items.IsChecked && items.ProductStatus !=1){
			    		 		this.checkedCities.push(items.Id);
								this.thumbnail.push(items);
			    		 		this.cartTotalNum +=  Number(items.Num) ;
			    		 		num = Number(items.Num);
			    		 		price = Number(items.Price)*10000;
			    				sum += num * price
			    		 	}
			    		});
			    		this.cartTotalPrice = (sum/10000).toFixed(2);
			    		let  checkedCount = this.checkedCities.length;
			    	    this.checkAll =  checkedCount === checkLen.length;//当数组长度一致 表示全选生效
		    		})
	    		});

		    },

		    handleCheckedCitiesChange(val,item,list){  //复选框 单选  ==== 组件

		    	//同步后台数据 单选状态
		    	let paramCheck = {
	    			params:{
						datatype:"json",
						ids:item.Id,
						IsChecked:!item.IsChecked,
					}
	    		};

	    		getD.changeCheckCart(paramCheck).then((res)=>{ // 改变购物车状态
	    			let checkLen =[];
	    			this.checkedCities = [];
					this.thumbnail = [];
		    		this.list = res.data.list;
		    		this.cartTotalNum =  this.cartTotalPrice  = 0 ;
		    		let sum = 0 , num= 0 ,price=0;
		    		this.list.forEach((items,index)=>{
		    			if( items.ProductStatus !=1){
		    				checkLen.push(items.Id);
		    			}
		    		 	if(items.IsChecked && items.ProductStatus !=1){
		    		 		this.checkedCities.push(items.Id);
							this.thumbnail.push(items);
							// Vue.set(this.thumbnail,index,items)
		    		 		this.cartTotalNum +=  Number(items.Num) ;
		    		 		num = Number(items.Num);
		    		 		price = Number(items.Price)*10000;
		    				sum += num * price
		    		 	}
		    		});
		    		this.cartTotalPrice = (sum/10000).toFixed(2);
		    		let  checkedCount = val.length;
		    	    this.checkAll =  checkedCount === checkLen.length;//当数组长度一致 表示全选生效
		    	    //这个里面返回2条数据的 但是页面值渲染一条
	    		});
		    },
		    handleCheckAllChange(val,list){ // 复选框  全选 ==== 组件
		    	let allDate = [];

		    	list.forEach((items)=>{
		    		if(items.ProductStatus!=1){
		    			allDate.push( items.Id)
		    		}
		    	});
		    	let paramCheck = {
	    			params:{
						datatype:"json",
						ids:allDate.join("|"),
						IsChecked:val,
					}
	    		};
	    		getD.changeCheckCart(paramCheck).then((res)=>{ // 改变购物车状态

	    			let checkLen =[];
	    			this.checkedCities = []; this.thumbnail = [];
		    		this.list = res.data.list;
		    		this.cartTotalNum =  this.cartTotalPrice  = 0 ;
		    		let sum = 0 , num= 0 ,price=0;
		    		this.list.forEach((items,index)=>{
		    			if( items.ProductStatus !=1){checkLen.push(items.Id); }
		    		 	if(items.IsChecked && items.ProductStatus !=1){

		    		 		this.checkedCities.push(items.Id);
							this.thumbnail.push(items);
		    		 		this.cartTotalNum +=  Number(items.Num) ;
		    		 		num = Number(items.Num);
		    		 		price = Number(items.Price)*10000;
		    				sum += num * price;
		    		 	}
		    		});

		    		this.cartTotalPrice = (sum/10000).toFixed(2);
		    		let  checkedCount = this.checkedCities.length;


		    	   this.checkAll =  checkedCount === checkLen.length;//当数组长度一致 表示全选生效
	    		});
		    },

		    //结账
		    account(data,data1){
		    	if(this.checkedCities.length  == 0){
		    		alert("请至少选择一个商品");
		    	}else{
		    		this.$router.push('/cart/settleAccounts');
		    	}

		    },
	    	carouselJ(data,data1){
	    		$(data1.target).css({"border":"1px solid #DF3D3E"});
	    	},
	    	carouselC(data,data1){
	    		$(data1.target).css({"border":"1px solid #eee"});
	    	},
	    	carouselS(data,data1){
	    		$(data1.target).css({"background":"#FF3E08","color":"#FFF","border":"1px solid #FF3E08"});
	    	},
	    	carouselP(data,data1){
	    		$(data1.target).css({"background":"#fff","color":"#666","border":"1px solid #999"});
	    	},
	    	// 删除购物车商品
	    	delCarPro(id,index,data){//id,索引,事件
	    		// var ISchecked = $(data1.target).parent().siblings().children("input[name='checkbox']").is(':checked');
	    		// ////console.log("ISchecked",ISchecked);
	    		var ids = [];
	    		var param = {
						params : {
							ids: id
						}
					}
					// //console.log( param);
	    		getD.ShoppingCartRemove(param).then((res)=>{
	    			// //console.log("shanc删除",res);
	    			this.checkedCities = [];
					this.thumbnail = [];
		    		this.list = res.data.list;//重新push数据
		    		this.cartTotalNum =  this.cartTotalPrice  = 0 ;
		    		let sum = 0 , num= 0 ,price=0;
		    		this.list.forEach((items)=>{
		    			// //console.log(items)
		    		 	if(items.IsChecked){
		    		 		this.checkedCities.push(items.Id);
							this.thumbnail.push(items);
		    		 		this.cartTotalNum +=  Number(items.Num) ;
		    		 		num = Number(items.Num);
		    		 		price = Number(items.Price)*10000;
		    				sum += num * price
		    		 	}
		    		});
		    		this.cartTotalPrice = (sum/10000).toFixed(2);
		    		let  checkedCount = this.checkedCities.length;
		    	    this.checkAll =  checkedCount === this.list.length;//当数组长度一致 表示全选生效

	    		});
	    		//触发空实例的自定义事件
			    this.$eventHandle.$emit("delet_cart",true);
				setTimeout(function () {
			        var noFixH =  $('.shoppingMainWrap').height() + $('.shoppingMainWrap').offset().top;
			        var clientH = $(window).height();  //获取浏览器可视高度
			        var carH = $('.shoppingMainWrap').height();  //购物车内容模块的高度
			        this.scrollH = $(window).scrollTop();
			        var cha = noFixH - clientH -40;
			        if(this.scrollH<cha){
						$(".account").css({"position":"fixed","bottom":"-42px","z-index":"999","width":"1200px","background":"#efefef"})
					}else{
						$(".account").css({"position":"inherit","bottom":"-42px","z-index":"999","width":"100%","background":"#fff"})
					}
			    }, 1000);
	    	},
	    	// 全选后删除所有商品
	    	delAll(val,data,data1){
	    		let  checkedCitiesObj = this.checkedCities ;
	    		//console.log("checkedCitiesObj",checkedCitiesObj)
	    		if( checkedCitiesObj.length == 0){
	    			alert("请至少选择一个商品")
	    		}else{
	    			let _ids = checkedCitiesObj.join("|");
					var param = {
		    			params : {
							ids: _ids
						}
		    		}
		    		getD.ShoppingCartRemove(param).then((res) => {
		    			this.checkedCities =[];
		    			 this.thumbnail = [];
			    		this.list = res.data.list;//重新push数据
			    		this.cartTotalNum =  this.cartTotalPrice  = 0 ;
			    		let sum = 0 , num= 0 ,price=0;
			    		this.list.forEach((items)=>{
			    			// //console.log(items)
			    		 	if(items.IsChecked && items.ProductStatus !=1){
			    		 		this.checkedCities.push(items.Id);
								this.thumbnail.push(items);
			    		 		this.cartTotalNum +=  Number(items.Num) ;
			    		 		num = Number(items.Num);
			    		 		price = Number(items.Price)*10000;
			    				sum += num * price
			    		 	}
			    		});
			    		this.cartTotalPrice = (sum/10000).toFixed(2);
			    		let  checkedCount = this.checkedCities.length;
			    	    this.checkAll =  checkedCount === this.list.length;//当数组长度一致 表示全选生效
					});
	    		};
	    		//触发空实例的自定义事件
			    this.$eventHandle.$emit("delet_cart",true);
			    setTimeout(function () {
			        var noFixH =  $('.shoppingMainWrap').height() + $('.shoppingMainWrap').offset().top;
			        var clientH = $(window).height();  //获取浏览器可视高度
			        var carH = $('.shoppingMainWrap').height();  //购物车内容模块的高度
			        this.scrollH = $(window).scrollTop();
			        var cha = noFixH - clientH -40;
			        if(this.scrollH<cha){
						$(".account").css({"position":"fixed","bottom":"-42px","z-index":"999","width":"1200px","background":"#efefef"})
					}else{
						$(".account").css({"position":"inherit","bottom":"-42px","z-index":"999","width":"100%","background":"#fff"})
					}
			    }, 1000);
	    	},
	    	collectAllFn(){// 收藏被选中
	    		let  list = this.list;
	    		let  temp_ids = [] ;
	    		let  temp_product = [] ;
	    		let checkedCitiesObj = this.checkedCities;
	    		// console.log("list",list)
	    		// console.log("checkedCitiesObj",checkedCitiesObj)
	    		if( checkedCitiesObj.length == 0){
	    			alert("请至少选择一个商品")
	    		}else{
	    			list.forEach((item)=>{

	    				if(item.IsChecked && item.ProductStatus != 1 && item.CusHouseId.trim() == ''){//被选中且产品不失效且未被收藏过
	    					temp_ids.push(item.Id);
	    					temp_product.push(item.ProductId);
	    				}
	    			})

					//  console.log(temp_ids ,temp_product )
					var param = {
		    			params : {
							ids: temp_product.join("|"),
							shoppingIds: temp_ids.join("|")
						}
		    		}
		    		getD.collectCart(param).then((res) => {//选择收藏
		    			// console.log(res,'?????');
			    		window.location.reload();

					}).catch((error) => {
						if(error.data.msg == "该产品已被收藏过！") {
							this.$message.error("该产品已被收藏过！");
						}
					});
	    		};
	    	},
	    	ProductDetails(items){//跳转详情页面
	    		//console.log(items)
				// this.$router.push({path:'/productDetails',query:{id:items.ProductId,type:items.Type}});
					this.$router.push({
						path:'/productDetails/'+items.ProductId+'/'+items.Type
					});
	    	},
	    	collectFn({ProductId,Num,Price,Id:ShoppingId},index){  //单个收藏
	 			var params = {
					params:{
						ids: ProductId,
						shoppingIds: ShoppingId,
						datatype:"json"
					}
				}


	    		getD.collectCart(params).then((res)=>{
	    			//console.log( params,"收藏收藏" ,res)
	    			// 需要后台返回 CusHouseId 和之前一样.

	    			window.location.reload();
	    			//=============================
	    			this.$set(this.list[index],'CusHouseId',res.data);
	    		})

	    	},
	    	delCollect({CusHouseId:collectId ,Id:ShoppingId},index){ //取消收藏
				var params = {
					params:{
						ids:collectId,
						shoppingCartIds:ShoppingId,
						datatype:"json"
					}
				}
				// console.log( params,"w s ca我删除收藏是参数" )
	    		getD.delCollectCart(params).then((res)=>{
	    			this.$set(this.list[index],'CusHouseId','');
	    			window.location.reload();
	    			//console.log( this.list[index].CusHouseId)
	    		})
	    	},
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
