<template><!--头部导航-->
	<div class="c-header" id="CouponServerNav">
		<div class="c-hdTopWrap">
			<!-- 头部主体 -->
			<div class="c-mainWrap">
				<div class="c-main-navWrap">
					<div class="c-main-nav">
						<!-- 头部导航主体 -->
						<div class="c-main-nav-centerTitle serverNavHover"><i class="dd"></i><span>全部分类</span></div>
						<ul class="c-main-nav-center">
							<li class="items"  @click="toRouter('/')">
								<a data-href="" style="color: #ff3e08">首页</a>
							</li>
							<li class="items" >
								<a  data-href="" @click="toMycoupons()">我的优惠券</a>
							</li>
						</ul>
					</div>
				</div>
				<!-- /主导航外层 -->

        <!-- 公用子导航左侧 -->
        <div class="c-submenu serverNavHover">
          <div class="c-submenu-left"  >
            <ul class="itemWrap">
              <li class="items" @mouseenter="enterFn(this,$event,data.Id)" @mouseleave="leaveFn(this,$event)" v-for="(data,sIndex) in serverList">
                <i class="gongshang"></i>
                <a href="javascript:void(0)" data-des="" @click="toProductList(sIndex)">{{data.Name}}</a><i class="li"></i>
                <span class="line"></span>
                <div class="c-main-nav-left-noneWrap">
                  <dl class="c-main-nav-left-none">
                    <div class="title-div" v-for="(val,i) in data.secondData">
                      <dt class="title" @click="toProductList(sIndex)"><i class="dd">{{val.Name}}</i><i class="titleImg"></i></dt>
                      <dd class="itemwrap">
                        <ul class="item">
                          <li class="items" v-for="inf in val.thirdData">
                            <a  href="javascript:void(0)" data-des="" @click.stop="toRuoterDetail(inf.Id,inf.Type)">{{inf.Name}}</a>
                          </li>
                        </ul>
                      </dd>
                    </div>
                  </dl>
                </div>
              </li>
            </ul>
          </div>
        </div>

			</div>
		</div>
	</div>
</template>

<script>
	import getd from "~/store/ajaxAPI/getData"
  import tool from '~/assets/lib/tool'

	export default {
		data() {
			return {
        serverList:[],//商品分类列表
				serverProList:[],//服务产品分类

			}
		},
		mounted(){
      //商品分类列表获取数据
      getd.SERVERLIST()
        .then((res)=>{
          this.serverList = res.data.list;

          this.serverList.forEach((data,index)=>{
            var param={
              params:{
                classId:data.Id
              }
            }
            getd.SERVER_PRODUCT_LIST(param)
              .then((res)=>{
                data.secondData = res.data.list;
                data.secondData.forEach((val,i)=>{
                  var item={
                    params:{
                      classId:val.Id
                    }
                  };
                  getd.SERVER_PRODUCT_INFOR(item)
                    .then((response)=>{
                      val.thirdData = response.data;
                      this.$set(this.serverList[index],this.serverList[index].secondData,res.data.list)
                    })
                })
              })
          })
        })
       this._animations();       //列表交互绑定
    },


		methods: {
      //初始化js交互部分
      _animations(){
        this.$nextTick(function(){
          $('.c-submenu').css('display','none');
          $('.serverNavHover').hover(()=>{
            $('.c-submenu').css('display','block')
          },()=>{
            //return;
            $('.c-submenu').css('display','none')
          });
        });

      },
      //路由跳转
      toRouter(path){
        this.$router.push(path)
      },
      //跳转到详情
      toRuoterDetail(pathId,ProductType){
        // this.$router.push({path:'/productDetails',query:{id:pathId,type:ProductType}});
        this.$router.push({
			path:'/productDetails/' + pathId + '/' + ProductType
		});
      },
      //跳转至我的优惠券
      toMycoupons(){
             if(tool.loadFromLocal("CustomerMesg","ALL")){
            this.$router.push( '/personalCenter/coupon');
             }else {
               //提弹出窗登录界面
               this.$store.dispatch('loginDialogVisible');
               //console.log('未登录',this.$store.getters.loginDialogVisible);
             }

      },
			//商品列表跳转
		    toProductList(typeIndex){
		    	this.$router.push({path:'/productList',query:{typeIndex:typeIndex,productName:'All'}});
		    },
      //商品分类滑过效果
      enterFn(data, data1,classId){
        $(data1.target).siblings().removeClass("active").css({"border-right": "1px solid red"});
        $(data1.target).addClass("active").css({"border-right": "#fff"});
        $(data1.target).children('.c-main-nav-left-noneWrap').css({"display":"block"});
        //移入时请求数据
      },
      leaveFn(data, data1){
        $(data1.target).siblings().removeClass("active").css({"border-right": "1px solid #CCC"});
        $(data1.target).removeClass("active").css({"border-right": "1px solid #ccc"});
        $(data1.target).children('.c-main-nav-left-noneWrap').css({"display":"none"});
      },

		}
	}
</script>

<style lang="less" type="stylesheet/css" scoped>
  @import "~assets/common/index.less";
	@import "~assets/common/common.less";
	@import "../../pages/home.less";
	/*内联样式删除谨慎!*/
	.c-main-nav-centerTitle .c-submenu {
	/*	position: absolute!important;
	    z-index: 99;
	    height: 600px;*/
	    margin-top: 40px;
	}
	// .c-headerContainWrap .c-header .c-hdTopWrap .c-mainWrap .c-submenu {
	// 	display: block;
	// }
	.title-div{
		width: 100%;
		overflow: hidden;
    margin-top: 23px;
	}
  .dd{
    cursor: pointer;
  }
</style>
