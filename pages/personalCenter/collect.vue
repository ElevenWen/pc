<template>
  <div class="integralChange">
		<!-- 个人中心公共头部 -->
		<personalCenterHead ref="indexTriangle"></personalCenterHead>
		<publicPendantR></publicPendantR>
		<!-- 公共侧边 -->
		<div class="margin1200">
			<personalCenterSlide></personalCenterSlide>
			<!-- 右侧 -->
			<div class="right_frame">
				<div class="bottom_piece clearfix" style="position: relative;">
				<!-- 右边商品的开始 -->
        	<div class="head_right" v-if="tabIndex == 0">
						<div class="input_div">
							<input type="text" placeholder="输入关键字" class="search" @keyup="getCollectList"/>
							<a href="javascript:void(0)">
								<!-- <img src="~Image/PersonalCenter/collect/collect.png" @click="getCollectList"/> -->
								<img src="~assets/images/personalCenter/collect/collect.png" @click="getCollectList"/>
							</a>
						</div>
						<a href="javascript:void(0)"><div class="button_bulk" id="button_bulk" @click="batchManager">{{batchManagerHtml}}</div></a>
						<!-- <a href="javascript:void(0)"><div class="button_bulk" id="bulk_cancel" style="display: none;">取消管理</div></a> -->
						<div class="p_fr" id="check_delete" v-if="check">
							<a class="delete_div" id="delete_div" @click="deleteMore"><img src="~assets/images/personalCenter/collect/delete.png"/>删除</a>
							<div class="all" id="all_div"><input type="checkbox" id="all" :checked="allCheck" @click="allClick"/><label for="all">全选</label></div>
						</div>
					</div>
				<!-- 右边商品的结束 -->
          <!-- 新闻收藏右边的开始 -->
          <div class="head_right" v-if="tabIndex == 1">
						<div class="input_div">
							<input type="text" placeholder="输入关键字" v-model="newsSearch" @keyup="getNewsData"/>
							<a href="javascript:void(0)">
								<!-- <img src="~Image/PersonalCenter/collect/collect.png" @click="getCollectList"/> -->
								<img src="~assets/images/personalCenter/collect/collect.png" @click="getNewsData"/>
							</a>
						</div>
						<a href="javascript:void(0)"><div class="button_bulk" id="button_bulk" @click="batchManagerNews">{{batchManagerHtmlNews}}</div></a>
						<div class="p_fr" id="check_delete" v-if="checkNews">
							<a class="delete_div" id="delete_div"   @click.stop="deleteMoreNews"><img src="~assets/images/personalCenter/collect/delete.png"/>删除</a>
							<div class="all" id="all_div" @click="allClickNews"><input type="checkbox" id="allNews" :checked="allCheckNews"/><label for="all">全选</label></div>
						</div>
					</div>
          <!-- 新闻收藏右边的结束 -->
					<div class="layui-tab" style="background: white;">
						<ul class="layui-tab-title" >
							<li :class="{active: tabIndex === 0}" @click="tabChange(0)">
									<!-- <span id="all_product">全部商品</span> -->
									商品收藏（<span id="product_amount">{{allCount}}</span>）
							</li>
							<li :class="{active: tabIndex === 1}" @click="tabChange(1)">内容收藏<span>（{{newsCount}}）</span></li>
						</ul>
						<div class="layui-tab-content clearfix" id="tab">
              <!-- 商品列表的开始 -->
							<div class="layui-tab-item layui-show" v-show="tabIndex === 0">
								<ul v-if="productLists" class="collectUl">
									<li v-for="(item,index) in productLists" :key="item.Id" :class="item.Id"  @mouseenter="deleteLogoShow(this,$event)" @mouseleave="deleteLogoHide(this,$event)" id="collectLi">
										<div class="collect">
											<div class="img_box" style="width:228px;height:228px;">
												<img @click="toProduct(item.ProductId,item.Type)" :src="item.PCThumbImgURL" style="width:100%;height:100%;"/>
											</div>
											<div class="collect_bottom">
												<h4>
													<span class="latest">￥<span class="latest_price">{{item.Price}}</span></span>
													<span class="original_price">￥{{item.OldPrice}}</span>
												</h4>
												<h5 @click="toProduct(item.ProductId,item.Type)">{{item.Name}}</h5>
												<div class="bottom_row"><span class="p_fr">销量：{{item.SalesVolume}}</span></div>
											</div>
											<div class="disabled" v-if="item.ProductStatus">
												该商品已失效
											</div>
											<a href="javascript:void(0)" class="collect_delete" @click="deleteProduct(item.Id)" ><img src="~assets/images/personalCenter/collect/pro_delete (1).png" ></a>
											<div class="choose_div"></div>
											<img src="~assets/images/personalCenter/collect/choose.png" class="choose" v-if="check" @click="checkOn(this,$event,item.Id)"/>
											<img src="~assets/images/personalCenter/collect/pro_delete (2).png" class="choosed" @click="checkHide(this,$event,item.Id)"/>
										</div>
									</li>
								</ul>
							</div>
              <!-- 商品列表的结束 -->
              <!-- 新闻列表的开始 -->
							<div class="layui-tab-item" v-show="tabIndex === 1">
								<div class="newsList" v-if="newsList.length">
									<ul class="collectUlNews">
										<li class="list-item" v-for="item in newsList" :key="item.CollectId" :class="{'undefined' :item.ReviewState != 1}" @click="newsDetailFail(item)">
                      <img src="~assets/images/personalCenter/collect/unChooseNews.png" class="unChooseNews"  @click.stop="checkOnNews(this,$event,item.Id)" v-if="checkNews"/>
											<img src="~assets/images/personalCenter/collect/chooseNews.png" class="ChooseNews" @click.stop="checkHideNews(this,$event,item.Id)"/>
											<div class="cover">
												<span class="del-btn" @click.stop="delNews(item.Id)">取消收藏</span>
											</div>
											<div>
												<img :src="item.ThumbImgURL" alt="" class="list-item-img" @click="goNewsDetail(item)">
												<img src="~assets/images/news/video-start.png" alt="" class="i-video" @click="goNewsDetail(item)" v-if="item.NewsType">
												<p class="list-item-title" @click="goNewsDetail(item)">{{item.Title}}</p>
												<p class="list-item-info">{{item.Subtitle}}</p>
												<p class="list-item-data">
													<span class="list-item-source">{{item.SourceInfo}}</span>
													<span class="list-item-date">{{item.timer}}</span>
													<span class="click-rate">{{item.ReadNum}}</span>
												</p>
											</div>
										</li>
									</ul>
									<div class="table-page">
										<el-pagination v-if="newsCount"
											@current-change="newsCurrentChange"
											background
											prev-text="上一页"
											next-text="下一页"
											:current-page.sync="newsPage"
											:page-size="newsPageSize"
											layout="prev, pager, next, jumper"
											:total="newsCount">
										</el-pagination>
									</div>
								</div>
                <div class="news-empty" v-else>
                  <p>{{newsEmptyMsg}}</p>
                  <a href="/news" class="btn">去新闻中心逛逛 &gt;&gt;</a>
                </div>
							</div>
						</div>
						<div class="pagination" v-show="tabIndex === 0">
							<el-pagination v-if="CountPage"
							@current-change="handleCurrentChange"
							background layout="prev, pager, next" :total="CountPage"
							:current-page.sync="NowPage"
							:page-size="pagesize"
							prev-text='上一页' next-text='下一页'>
							</el-pagination>
						</div>
					</div>
				</div>
				<!-- <div class="bottom_piece ">
					<div class="love_div clearfix">
						<h2>猜你喜欢<a href="javascript:void(0)">换一组</a></h2>
						<div class="like">
							<div class="love">
								<img src="~Image/images/xiangqing00_01.png" height="189" width="189" />
								<div class="collect_bottom">
									<h4>
										<span class="latest">￥<span class="latest_price">1288</span></span>
										<span class="original_price">￥2000</span>
									</h4>
									<h5>注册香港公司加急离岸申请年审.注册香港公司加急离岸申请年审.</h5>
									<div class="bottom_row">
										销量：231
									</div>
								</div>
							</div>
						</div>
					</div>
				</div> -->
			</div>
		</div>
		<publicBottom></publicBottom>
  </div>
</template>

<style lang="less" scoped>
@import "./personalCenter_index.less";
#delete_div {
  cursor: pointer;
}
.disabled {
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 30px;
  color: white;
  text-align: center;
  line-height: 280px;
}
#all {
  ul {
    li {
      float: left;
      .img_box {
        width: 229px;
        height: 229px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
.layui-tab-title {
  border-bottom: 1px solid #eee;
  height: 45px;
  li {
    display: inline-block;
    margin-left: 15px;
    margin-right: 15px;
    padding-left: 10px;
    padding-right: 10px;
    min-width: 50px;
    text-align: center;
  }
  .active {
    // width: 106px;
    height: 45px;
    // padding-left: 4px;
    border-bottom: 2px solid #ff3e08;
    box-sizing: border-box;
    color: #ff3e08;
  }
}
.layui-tab {
  padding-bottom: 20px;
  .pages {
    height: 26px;
    width: 100%;
    position: absolute;
    bottom: 20px;
    right: 0;
    text-align: right;
    padding-right: 20px;
    button {
      width: 68px;
      height: 28px;
      line-height: 26px;
      border: 1px solid #eee;
      text-align: center;
      background-color: rgba(244, 243, 243, 1);
      border-radius: 2px 2px 2px 2px;
      color: #999;
      font-size: 14px;
    }
    span {
      font-size: 14px;
      margin: 0 16px;
      color: red;
      font-family: SimSun;
    }
  }
}
.el-pagination {
  text-align: right;
  padding-right: 20px;
}
.integralChange /deep/ .el-pagination button {
  padding: 0 10px !important;
}
//清除浮动
.clearfix() {
  *zoom: 1;
  &:after {
    content: "";
    display: block;
    clear: both;
    line-height: 0;
    visibility: hidden;
  }
}
.textIndex1(@w) {
  width: @w;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.textIndex2(@w ,@clamp: 2) {
  width: @w;
  overflow: hidden;
  text-overflow: ellipsis;
  display: box;
  display: -webkit-box;
  -webkit-line-clamp: @clamp;
  -webkit-box-orient: vertical;
  line-height: initial;
}
.newsList {
  // margin: 20px 0;
  padding: 0 20px 10px 0;
  background-color: #fff;
  .unChooseNews,
  .ChooseNews{
    margin-top: -20px;
  }
  .list-item {
    margin-bottom: 20px;
    padding-left: 230px;
    height: 146px;
    font-size: 14px;
    border-bottom: 1px solid #e1e1e1;
    position:relative;
    &:hover .del-btn {
      display: block;
    }
  }
  .video::before,
  .undefined::before{
		z-index: 1;
		position: absolute;
    display: block;
    margin-left: -210px;
		width: 192px;
		height: 122px;
  }
  .video::before{
    content: "";
		background: url(~assets/images/news/video-start.png) no-repeat center;
    background-size: 34px 34px;
    cursor: pointer;
  }
  .undefined{
    .list-item-title{
      cursor: default;
    }
    &::before{
      content: "该新闻已失效";
      line-height: 122px;
      font-size: 22px;
      text-align: center;
      color: #fff;
      background: #000c;
      cursor: default;
    }
  }
  .i-video{
    display: block;
    position: absolute;
    // z-index: 1;
    margin-left: -134px;
    margin-top: 44px;
    width: 34px;
    height: 34px;
    cursor: pointer;
  }
  .cover {
    position: absolute;
    margin-left: 670px;
    width: 100px;
    height: 146px;
  }
  .del-btn {
    display: none;
    position: absolute;
    margin-left: 30px;
    padding: 10px 20px 14px 20px;
    width: 88px;
    font-size: 12px;
    color: #666;
    cursor: pointer;
    &:hover {
      color: #ff3e08;
    }
  }

  .list-item-img {
    display: block;
    position: absolute;
    margin-left: -210px;
    width: 192px;
    height: 122px;
    cursor: pointer;
  }
  .list-item-img:hover{
    cursor: pointer;
  }
  .list-item-title {
    padding-top: 13px;
    .textIndex1(600px);
    font-size: 16px;
    font-weight: 600;
    line-height: 1;
    color: #333;
    cursor: pointer;
  }
  .list-item-info {
    padding-top: 16px;
    height: 51px;
    .textIndex2(630px);
    line-height: 1.25;
    color: #666;
  }
  .list-item-data {
    padding-top: 16px;
    // padding-bottom: 35px;
    color: #999;
    .clearfix();
  }
  .list-item-source {
    margin-right: 20px;
  }
  .click-rate {
    float: right;
    padding-left: 20px;
    background: url(~assets/images/news/i-view.png) no-repeat 0 center;
  }
}
.news-empty{
  margin: 20px 0;
  padding-top: 356px;
  height: 700px;
  font-size: 14px;
  text-align: center;
  color: #666;
  background: #fff url(~assets/images/news/empty.png) no-repeat center 100px;
  .btn{
    display: inline-block;
    padding: 20px;
    color: #ff3e08;
  }
}
.table-page {
  text-align: right;
}
.unChooseNews,
.ChooseNews{
  position:absolute;
  left:0;
  top:0;
  z-index: 2;
  cursor: pointer;
}
.ChooseNews{
  display:none;
}
</style>


<script>
import personalCenterHead from "~/components/common/personalCenterHead";
import personalCenterSlide from "~/components/common/personalCenterSlide";
import publicBottom from "~/components/common/publicBottom";
import publicPendantR from "~/components/common/publicPendantR";
import getData from "~/store/ajaxAPI/getData.js";
import tool from "~/assets/lib/tool.js";
export default {
  data() {
    return {
      userId: null, //登录用户ID
      collectListArr: [], //收藏列表数组
      allCount: "", //全部商品的数量
      check: false, //点击批量管理后商品出现的选中图标
      redCheck: true, //选中后的红图标
      batchManagerHtml: "批量管理", //商品批量管理按键的文字
      allCheck: false, //全选默认未选
      CountPage: "", //总商品条数
      NowPage: 1, //当前页数
      pagesize: 12, //每页条数
      str: "|",
      //   productLists :[]
      tabIndex: 0, //tab默认选项
      newsList: [], //新闻列表
      newsCount: 0, //新闻总数
      newsPage: 1, //当前新闻页
      newsPageSize: 8, //新闻页码
      batchManagerHtmlNews:"批量管理",  //新闻批量管理文字
      checkNews:false,  //点击批量管理后新闻出现的选中图标
      allCheckNews:false,   //新闻全部默认未选
      strNews:'|',
      newsEmptyMsg: '您还没有收藏过任何内容哦！',//新闻列表为空时显示的内容
      newsSearch: ''//新闻列表搜索输入框
    };
  },
  mounted() {
    if (localStorage.CustomerMesg) {
      this.userId = JSON.parse(localStorage.CustomerMesg).Id;
    }
    //获取商品收藏列表
    this.getCollectList();
    //获取新闻收藏列表
    this.getNewsData();
    this.$refs.indexTriangle.$refs.indexTriangle.style.display = "block";
  },
  updated() {
    //   this.$refs.indexTriangle.$refs.indexTriangle.style.display = 'block';
  },
  methods: {
    //商品收藏列表
    getCollectList() {
      //   console.log($('.search').val())
      var params = {
        params: {
          keyword: $(".search").val()
        }
      };
      getData
        .myCollect(params)
        .then(res => {
          //console.log(res.data,'收藏藏')
          var arr = res.data.list;
          for (var i = 0; i < arr.length; i++) {
            arr[i].deleteData = i + "是否有要删除的标志";
          }
          this.collectListArr = res.data.list;
          this.allCount = res.data.list.length;
          this.CountPage = res.data.list.length;
          //console.log(this.collectListArr)
        })
        .catch(err => {
          //console.log(err);
        });
    },
    //删除收藏
    deleteProduct(productId) {
      var params = {
        dataType: "json",
        ids: productId
      };
      getData
        .deleteCollect(params)
        .then(res => {
          this.getCollectList();
        })
        .catch(err => {
          //console.log(err)
        });
    },
    //商品批量管理
    batchManager() {
      if (!this.allCount) {
        this.$message.error("您还没有收藏任何商品");
        return;
      }
      if (this.batchManagerHtml == "批量管理") {
        this.batchManagerHtml = "取消管理";
        this.check = true;
        //   for(var i=0;i<collectListArr.length;i++){
        // 	  collectListArr[i].
        //   }
      } else if (this.batchManagerHtml == "取消管理") {
        this.strNews = "";
        this.batchManagerHtml = "批量管理";
        this.check = false;
        this.allCheck = false;
        $(".choosed").css({ display: "none" });
      }
    },
    //新闻批量管理
    batchManagerNews() {
      if (!this.newsCount) {
        this.$message.error("您还没有收藏过任何内容哦！");
        return;
      }
      if (this.batchManagerHtmlNews == "批量管理") {
        this.batchManagerHtmlNews = "取消管理";
        this.checkNews = true;
        //   for(var i=0;i<collectListArr.length;i++){
        // 	  collectListArr[i].
        //   }
      } else if (this.batchManagerHtmlNews == "取消管理") {
        this.strNews = "";
        this.batchManagerHtmlNews = "批量管理";
        this.checkNews = false;
        this.allCheckNews = false;
        $(".ChooseNews").css({ display: "none" });
      }
    },
    //商品批量管理选中出现红钩
    checkOn(data, data1, id) {
          $(data1.target)
          .siblings(".choosed")
          .css({ display: "block" });
        $(data1.target)
          .siblings(".choosed")
          .addClass("hongGou");
        //判断li标签红钩出现的个数和ul数组的长度
        var choosedArr = $(".collectUl li .hongGou");
        var liArr = $(".collectUl li");
        //   //console.log(choosedArr.length,liArr.length)
        if (choosedArr.length == liArr.length) {
          this.allCheck = true;
        } else {
          this.allCheck = false;
        }
    },
    //新闻批量管理选中出现红钩
    checkOnNews(data, data1, id) {
          $(data1.target)
          .siblings(".ChooseNews")
          .css({ display: "block" });
        $(data1.target)
          .siblings(".ChooseNews")
          .addClass("hongGou");
        //判断li标签红钩出现的个数和ul数组的长度
        var choosedNewsArr = $(".collectUlNews li .hongGou");
        var NewsliArr = $(".collectUlNews li");
        if (choosedNewsArr.length == NewsliArr.length) {
          this.allCheckNews = true;
        } else {
          this.allCheckNews = false;
        }
    },
    //商品点击红钩消失
    checkHide(data, data1, id) {
      $(data1.target).removeClass("hongGou");
      $(data1.target)
        .siblings(".choose")
        .css({ display: "block" });
      $(data1.target).css({ display: "none" });
      this.allCheck = false;
    },
    //新闻点击红钩消失
    checkHideNews(data, data1, id) {
      $(data1.target).removeClass("hongGou");
      $(data1.target)
        .siblings(".unCheckNews")
        .css({ display: "block" });
      $(data1.target).css({ display: "none" });
      this.allCheckNews = false;
    },
    //鼠标移入出现删除图标
    deleteLogoShow(data, data1) {
      if (this.check == false) {
        //没有批量选中的时候才会出现
        $(data1.target)
          .children()
          .children(".collect_delete")
          .css({ display: "block" });
      }
    },
    //鼠标移除删除图标消失
    deleteLogoHide(data, data1) {
      $(data1.target)
        .children()
        .children(".collect_delete")
        .css({ display: "none" });
    },
    //商品全选
    allClick() {
      if (!this.allCheck) {
        $(".choosed").css({ display: "block" });
        $(".choosed").addClass("hongGou");
        this.allCheck = true;
        this.str = "";
      } else {
        $(".choosed").removeClass("hongGou");
        $(".choosed").css({ display: "none" });
        this.allCheck = false;
        this.str = "";
      }
    },
    //新闻全选
    allClickNews() {
      if (!this.allCheckNews) {
        $(".ChooseNews").css({ display: "block" });
        $(".ChooseNews").addClass("hongGou");
        this.allCheckNews = true;
        this.strNews = "";
      } else {
        $(".ChooseNews").removeClass("hongGou");
        $(".ChooseNews").css({ display: "none" });
        this.allCheckNews = false;
        this.strNews = "";
      }
    },
    //商品删除多个
    deleteMore() {
      //全选删除
      if ($("#all").is(":checked")) {
        this.str = "";
        // //console.log('哈哈哈')
        for (var i = 0; i < this.collectListArr.length; i++) {
          this.str += this.collectListArr[i].Id + "|";
        }
        this.str = this.str.substr(0, this.str.length - 1);
        //console.log('全选',this.str)
      } else {
        //没有全选
        var choosedArr = $(".collectUl li .hongGou")
          .parent()
          .parent();
        // //console.log(choosedArr)
        for (var i = 0; i < choosedArr.length; i++) {
          // console.log(choosedArr[i].className,i,'商品的')
          // //console.log(choosedArr[i].className,i)
          this.str += choosedArr[i].className + "|";
        }
        //没有选择商品时
        if (this.str == "" || this.str == "|") {
          this.$message.error("请选择要删除的商品");
          return;
        }
        // //console.log(this.str)
        this.str = this.str.substr(0, this.str.length - 1);
        //console.log('没有全选',this.str)
      }
      //   alert('hahah',this.str)
      var params = {
        ids: this.str,
        dataType: "json"
      };
      getData
        .deleteCollect(params)
        .then(res => {
          //console.log(res)
          this.str = "";
          this.getCollectList();
        })
        .catch(err => {
          //console.log(err)
        });
    },
    //新闻删除多个
    deleteMoreNews() {
      //全选删除
      if ($("#allNews").is(":checked")) {
        this.strNews = "";
        for (var i = 0; i < this.newsList.length; i++) {
          this.strNews += this.newsList[i].CollectId + "|";
        }
        this.strNews = this.strNews.substr(0, this.strNews.length - 1);
      } else {
        //没有全选
        var choosedArrNews = $(".collectUlNews li .hongGou")
          .parent()
          .parent();
        for (var i = 0; i < choosedArrNews.length; i++) {
          this.strNews += choosedArrNews[i].className + "|";
        }
        //没有选择商品时
        if (this.strNews == "" || this.strNews == "|") {
          this.$message.error("请选择要删除的新闻");
          return;
        }
        this.strNews = this.strNews.substr(0, this.strNews.length - 1);
      }
      var params = {
        ids: this.strNews
      };
      getData
        .newsDelCollectMore(params)
        .then(res => {
          this.strNews = "";
          $('.ChooseNews').css({ display: "none" })
          this.getNewsData();
        })
        .catch(err => {
//        console.log(err,'删除失败')
        });
    },
    //当前页
    handleCurrentChange(val) {
      this.NowPage = val;
      ////console.log(`当前页: ${val}`);
    },
    //点击图片去商品详情
    toProduct(proId, type) {
      //   this.$router.push({path:'/productDetails',query:{id:proId,type:type}});
      this.$router.push({
        path:'/productDetails/' + proId + '/' + type
      });
    },
    //点击去新闻详情
    goNewsDetail(obj) {
      if (obj.ReviewState === 1) {
        this.$router.push({
          path:'/news/newsDetail',
          query:{
            id: obj.Id,
            type: obj.NewsType
          }
        })
      } else {
        this.$message.warning('该新闻已失效');
      }
    },
    // 新闻失效
    newsDetailFail(obj) {
      if (obj.ReviewState !== 1) {
        this.$message.warning('该新闻已失效');
      }
    },
    // tab切换
    tabChange(index) {
      this.tabIndex = index;
      // 获取新闻收藏列表
      if (this.tabIndex == 1) {
        this.getNewsData();
      }else if(this.tabIndex == 0){
        this.getCollectList()
      }
    },
    // 回到顶部
    toTop() {
      document.body.scrollTop = 0; // chrome
      document.documentElement.scrollTop = 0; // firefox
    },
    // 新闻当前页获取
    newsCurrentChange(val) {
      this.pageIndex = val;
      this.getNewsData();
    },
    // 获取新闻收藏列表
    getNewsData() {
      let params = {
          id:this.userId,
          pageSize: this.newsPageSize,
          pageIndex: this.newsPage,
          keywords: this.newsSearch.trim()
      };
      getData.getNewsCollectList(params)
        .then(res => {
          // console.log(res)
          if (res.success == true) {
            let list = res.data.list;
            let today = new Date().toDateString();
            let year = new Date().getFullYear();
            for (let i = 0; i < list.length; i++) {
              let items = list[i].CreatDateTime;
              if(!items) continue;
              let createTimee = parseInt(items.replace(/\D/g, ""));
              if (new Date(createTimee).toDateString() === today) {
                this.reviewTimer = tool.formatDate(createTimee, "hh:mm");
              } else if (new Date(createTimee).getFullYear() === year) {
                this.reviewTimer = tool.formatDate(createTimee, "MM-dd");
              } else {
                this.reviewTimer = tool.formatDate(createTimee, "yyyy-MM-dd");
              }
              list[i].timer = this.reviewTimer;
            }
            this.newsList = list;
            this.newsCount = res.data.recordCount;
          } else {
            this.newsList = [];
            this.newsCount = 0;
            this.$message.error(res.msg);
          }
          if (this.newsList.length == 0) {
            if (this.newsSearch.trim()) {
              this.newsEmptyMsg = '相关新闻暂无数据';
            } else {
              this.newsEmptyMsg = '您还没有收藏过任何内容哦！';
            }
          }
          this.toTop();
        })
        .catch(error => {
//        console.log("获取新闻收藏列表", error);
        });
    },
    // 取消当前新闻收藏
    delNews(id) {
      var params = {
        id:id
      }
      getData
        .newsDelCollect(params)
        .then(res => {
          this.getNewsData();
        })
        .catch(err => {
//        console.log("取消当前新闻收藏", err);
        });
    }
  },
  computed: {
    //计算当前显示页的商品数组
    productLists: function() {
      return this.collectListArr.slice(
        (this.NowPage - 1) * this.pagesize,
        this.NowPage * this.pagesize
      );
    }
  },
  components: {
    personalCenterHead,
    personalCenterSlide,
    publicBottom,
    publicPendantR,
    tool
  }
};
</script>

