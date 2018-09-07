<template>
	<div id="productList">
    <!--公共头部-->
    <div class="c-headerContainWrap">
      <publicPendantR></publicPendantR>
      <navigationBar :topShopData="topShopData" :serverList="serverList"></navigationBar>
    </div>
    <div class="contentWrap">
      <!--面包屑-->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{breadcrumbItemName}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="checkeds">
        <div class="serviceType">
          <div class="des">服务类型</div>
          <ul>
            <li v-for="(item, sIndex) in serverType" :key="item.Id" @click="serverTypeCheckedChange(sIndex, item.Id)">{{item.Name}}</li>
          </ul>
        </div>
        <div class="serviceContent">
          <div class="des">服务内容</div>
          <ul>
            <li v-for="(listItem, lIndex) in serverTypeList"  @click="serverContentCheckedChange(lIndex, listItem.Id)">{{listItem.Name}}</li>
          </ul>
        </div>
        <div class="userchecked">
          <div class="des">您已选择</div>
          <ul>
            <li class="checkedbg" v-for="(item, slistIndex) in serverTypechecked" v-if="item.name" @click="serverItemDel(slistIndex)">{{item.name}}</li>
            <li class="restchecked" v-show="isChecke" @click="cleanChecke()"><img src="~assets/images/product/delet.png" alt="">清空全部</li>
          </ul>
        </div>
      </div>
      <div class="sortNav">
        <div class="sort">
          <span class="sort_zh" @click="comprehensiveSort(this,$event)">综合</span>
          <span class="sort_xl" @click="SalesVolumeSort(this,$event)">销量</span>
          <span class="sort_jg" @click="priceSort(this,$event)">价格</span>
        </div>
        <div class="pageShow">
          <span class="totalText">总共{{CountPage}}个结果</span>
          <span class="showPage"><span style="color: red">{{NowPage}}</span>/{{Math.ceil(CountPage/pagesize)}}</span>
          <span class="topPag" @click="pageControl(true)"></span>
          <span class="toNext" @click="pageControl('')"></span>
        </div>
      </div>
      <div class="productListWrap">
        <!--商品列表渲染-->
        <ul v-if="productLists" class="listUl">
          <li v-for="productItem in productLists" class="listItem">
            <nuxt-link class="redirect" :to="'/productDetails/' + productItem.Id + '/' + productItem.Type">
              <div class="imgWrap">
                <!--<img class="lazyload" :data-src="productItem.PCThumbImgURL" :alt="productItem.Name">-->
                <img class="lazyload" :src="productItem.PCThumbImgURL" :alt="productItem.Name">
                <!--<img src="../../../assets/images/product/productlistImg.png" alt="">-->
              </div>
              <p><span class="nowPrice">&#165; {{productItem.Price}}</span><span class="oldPrice">&#165; {{productItem.OldPrice}}</span></p>
              <p class="productName">{{productItem.Name}}</p>
              <p><span class="sales">销量：{{productItem.SalesVolume}}</span>
                <span class="addCart" >加入购物车</span>
              </p>
            </nuxt-link>
          </li>
        </ul>
        <div class="pageControl">
          <el-pagination v-if="CountPage"
            @current-change="handleCurrentChange"
            background
            prev-text="上一页"
            next-text="下一页"
            :current-page="NowPage"
            :page-size="pagesize"
            layout="total, prev, pager, next, jumper"
            :total="CountPage">
          </el-pagination>
        </div>
      </div>
    </div>
    <!--公共底部-->
    <div class="c-ftContainWrapindex">
      <publicBottom></publicBottom>
    </div>
	</div>
</template>

<script>
import publicPendantR from "~/components/common/publicPendantR";
import navigationBar from "~/components/common/navigationBar";
import publicBottom from "~/components/common/publicBottom";

import getd from "~/store/ajaxAPI/getData.js";
export default {
  data() {
    return {
      productListsData: "", //当前页面商品列表数据
      oneListsDataOldDate: "", //存储获取的一级商品列表数据 用来单个删除后不用再次请求
      serverType: "", //一级服务导航数据
      serverTypeList: "", //二级服务导航数据
      classId1: "", //一级id-data
      classId2: "", //二级id-data
      isChecke: false, // 是否已选择导航
      breadcrumbItemName: "", //页面面包屑名称
      priceSortSize: true, //价格排序 默认由升序
      SalesVolumeSortSize: true, //销量排序 默认由升序
      serverTypechecked: [{ name: "" }, { name: "" }], //选择的服务导航
      checkedIndex1: 1, //选择的服务导航 上导航下标
      checkedIndex2: "", //选择的服务导航 下导航下标
      CountPage: "", //总商品条数
      NowPage: 1, //当前页数 初始页1
      pagesize: 25, //每页条数
      topShopData: [], //顶部nav导航
      serverList: [] //商品三级分类
    };
  },
  components: {
    publicPendantR,
    navigationBar,
    publicBottom
  },
  created() {
    let mealParam = {
      params: {}
    };

    getd
      .getTopList(mealParam)
      .then(res => {
        this.topShopData = res.data.list;
      })
      .catch(error => {
//      console.log(error);
      });

    getd
      .getServerClass()
      .then(res => {
        this.serverList = res.data.list;
        // let tyIndex = this.$route.query.typeIndex;
        // if(tyIndex !== 'all'){
        //   this.serverTypeCheckedChange(tyIndex,this.serverList[tyIndex].Id);
        // }
      })
      .catch(e => {
//      console.log("报错", e);
      });
    this.getseverClassList()
  },
  mounted() {
    // this.getseverClassList();
    ////console.log('vuex中的商品列表',this.$store.getters.getProductListData);
    ////console.log('进场看看的商品列表',this.$route.query.productsData)
    /* ------其他组件 模糊搜索,进场看看，首页导航处理------*/
    let c_contentStr = this.$route.query.productName;
    let c_ProductListData = this.$store.getters.getProductListData;

    //有搜索内容情况
    if (c_contentStr !== "" && c_contentStr.toLowerCase() !== "all") {
      //只能通过搜索内容获取列表
      // this.getseverClassList();     //导航一级数据获取 包含首页导航跳转的index
      this.serverTypechecked[0].name = c_contentStr;
      this.isChecke = true; //初始化选中导航标签显示
      this.textSearch(c_contentStr); //搜索的内容
      //无搜索内容情况
    } else if (c_contentStr == "" || c_contentStr.toLowerCase() == "all") {
      this.serverTypechecked[0].name = "";
      if (c_ProductListData !== "") {
        // this.getseverClassList();
        this.productListsData = c_ProductListData;
        this.CountPage = this.productListsData.length;
      } else {
        if (
          typeof this.$route.query.typeIndex != "number" &&
          this.$route.query.typeIndex.toLowerCase() == "all"
        ) {
          this.getProductListData(); //获取全部商品列表
        }
        // this.getseverClassList();
      }
    } else {
    }
  },
  methods: {
    //模糊搜索
    textSearch(content) {
      var params = {
        searchName: content
      };
      getd.getIndistinctList(params).then(res => {
        this.productListsData = res.data.list;
        this.CountPage = this.productListsData.length;
      });
    },
    //获取商品分类 （第一层）
    getseverClassList() {
      getd.SERVERLIST().then(res => {
        this.serverType = res.data.list;
        var tyIndex = this.$route.query.typeIndex;
        // console.log(this.serverType[tyIndex])
        if (tyIndex == "all") {
          return;
        }
        this.serverTypeCheckedChange(tyIndex, this.serverType[tyIndex].Id);
      });
    },
    //头部服务类型导航一选择
    serverTypeCheckedChange(index, classId) {
      this.isChecke = true;
      this.checkedIndex1 = index;
      this.classId1 = classId;
      this.checkedIndex2 = "";
      this.serverTypechecked[1].name = null;
      //DOM 还没更新 所有需要此处理
      this.$nextTick(() => {
        // DOM 现在更新了
        $("#productList .serviceType ul>li").removeClass("active");
        $("#productList .serviceContent ul>li").removeClass("active");
        $("#productList .serviceType ul>li")
          .eq(this.checkedIndex1)
          .addClass("active");
        var str = $("#productList .serviceType ul>li")
          .eq(this.checkedIndex1)
          .text();
        //截取选择名称
        this.serverTypechecked[0].name = str;
        this.breadcrumbItemName = str;
        //获取二级导航内容
        var params = {
          params: {
            classId: classId
          }
        };

        getd.SERVER_PRODUCT_LIST(params).then(res => {
          this.serverTypeList = res.data.list;
        });
        //获取一级下的所有商品列表
        getd.getByFirstClass(params).then(res => {
          this.oneListsDataOldDate = res.data; //存储一级的列表数据
          this.productListsData = res.data;
          this.CountPage = this.productListsData.length;
        });
      });
    },
    //头部服务类型内容导航二选择
    serverContentCheckedChange(index, classId) {
      this.isChecke = true;
      this.checkedIndex2 = index;
      this.classId2 = classId;
      // console.log( classId ,'classId' )
      $("#productList .serviceContent ul>li").removeClass("active");
      $("#productList .serviceContent ul>li")
        .eq(this.checkedIndex2)
        .addClass("active");
      var str = $("#productList .serviceContent ul>li")
        .eq(this.checkedIndex2)
        .text();
      this.serverTypechecked[1].name = str;
      ////console.log(this.serverTypechecked,this.classId1,this.classId2);

      //发送请求获取 该二级下的所有商品列表
      var params = {
        params: {
          classId: this.classId2
        }
      };
      getd.SERVER_PRODUCT_INFOR(params).then(res => {
        this.productListsData = res.data;
        this.CountPage = res.data.length;
      });
    },
    //单个服务导航 选中删除
    serverItemDel(chekIndex) {
      if (chekIndex == 1) {
        //选择最后一个 清空最后一个
        this.serverTypechecked[chekIndex].name = "";
        //移除二级列表样式
        $("#productList .serviceContent ul>li").removeClass("active");
        //显示一级的商品列表
        this.productListsData = this.oneListsDataOldDate;
        this.CountPage = this.productListsData.length;
      } else if (chekIndex == 0) {
        this.serverTypechecked[chekIndex].name = "";
        //console.log(this.serverTypechecked[chekIndex + 1].name);
        //清空全部后 则是全部列表信息
        //this.getProductListData();
        //移除一级列表样式
        $("#productList .serviceType ul>li").removeClass("active");
        if (
          this.serverTypechecked[0].name == "" &&
          this.serverTypechecked[1].name === null
        ) {
          this.isChecke = false;
          //清空全部后 则是全部列表信息
          this.getProductListData();
          this.$router.push({
            path: "/productList",
            query: { typeIndex: "all", productName: "all" }
          });
        }
      } else {
      }
      //全部删除同步隐藏
      if (
        this.serverTypechecked[0].name == "" &&
        this.serverTypechecked[1].name == ""
      ) {
        this.isChecke = false;
        //清空全部后 则是全部列表信息
        this.getProductListData();
        this.$router.push({
          path: "/productList",
          query: { typeIndex: "all", productName: "all" }
        });
      }
    },
    //清空导航选择
    cleanChecke() {
      this.isChecke = false;
      this.serverTypechecked = [{ name: "" }, { name: "" }];
      $("#productList .serviceType ul>li").removeClass("active");
      $("#productList .serviceContent ul>li").removeClass("active");
      //清空后则是全部列表信息
      this.getProductListData();
      // this.$router.push({path:"/productList",query:{typeIndex:"all",productName:"all"}})
    },
    //获取后台商品列表
    getProductListData() {
      getd.getAllList().then(res => {
        this.productListsData = res.data.list; //全部商品列表
        this.CountPage = res.data.recordCount * 1; //总商品条数
      });
    },
    //综合排序
    comprehensiveSort(a, data) {
      $(data.target).css({
        backgroundColor: "#ff3e08",
        color: "#fff",
        border: "none"
      });
      $(data.target)
        .siblings()
        .css({
          backgroundColor: "#fff",
          color: "#999",
          border: "solid 1px rgba(0, 0, 0, 0.12)"
        });
      var arr = [];
      arr = this.productListsData.sort((a, b) => {
        //高到低
        return b.ComprehensiveRank * 1 - a.ComprehensiveRank * 1;
      });
      this.productListsData = arr;
    },
    //排序--> 价格排序
    priceSort(a, data) {
      $(data.target).css({
        backgroundColor: "#ff3e08",
        color: "#fff",
        border: "none"
      });
      $(data.target)
        .siblings()
        .css({
          backgroundColor: "#fff",
          color: "#999",
          border: "solid 1px rgba(0, 0, 0, 0.12)"
        });
      var arr = [];
      if (this.priceSortSize) {
        //小到大
        arr = this.productListsData.sort((a, b) => {
          return a.Price * 1 - b.Price * 1;
        });
      } else {
        arr = this.productListsData.sort((a, b) => {
          //大到小
          return b.Price * 1 - a.Price * 1;
        });
      }
      this.productListsData = arr;
      this.priceSortSize = !this.priceSortSize;
    },
    //排序--> 销量排序
    SalesVolumeSort(a, data) {
      $(data.target).css({
        backgroundColor: "#ff3e08",
        color: "#fff",
        border: "none"
      });
      $(data.target)
        .siblings()
        .css({
          backgroundColor: "#fff",
          color: "#999",
          border: "solid 1px rgba(0, 0, 0, 0.12)"
        });
      var arr = [];
      if (this.SalesVolumeSortSize) {
        //小到大
        arr = this.productListsData.sort((a, b) => {
          return a.SalesVolume * 1 - b.SalesVolume * 1;
        });
      } else {
        arr = this.productListsData.sort((a, b) => {
          //大到小
          return b.SalesVolume * 1 - a.SalesVolume * 1;
        });
      }
      this.productListsData = arr;
      this.SalesVolumeSortSize = !this.SalesVolumeSortSize;
    },
    //添加购物车  @click.stop="onAddCart(productItem.Type,productItem.Id,productItem.Price,productItem.OldPrice)"
    /*onAddCart(type,productId,price,OldPrice){
          //console.log(type,productId,price,OldPrice)
        //商品
       if(type == 0){
          this.$_post('/ShoppingCart/CreatedOrEdit',{
            num: 1,
            productId: productId,
            price: price,
            oldPrice:OldPrice,
            productType: ''
          },(res)=>{
            this.$message({
              message: '恭喜你，成功加入购物车！',
              type: 'success'
            });
          },(err)=>{})
        }else if(type == 1){ //套餐
          //发送请求
          this.$_post('/ShoppingCart/CreatedOrEdit',{
            num: 1,
            productId: productId,
            price: price,
            oldPrice:OldPrice,
            productType: ''
          },(res)=>{
            this.$message({
              message: '恭喜你，成功加入购物车！',
              type: 'success'
            });
          },(err)=>{})
        }else {}

      },*/
    //头部页数控制
    pageControl(value) {
      //console.log('现在页数',this.NowPage,'总共页数哦：',Math.ceil(this.CountPage/this.pagesize))
      value == true ? this.NowPage-- : this.NowPage++;
      if (this.NowPage < 1) {
        this.NowPage = 1;
      } else if (this.NowPage > Math.ceil(this.CountPage / this.pagesize)) {
        this.NowPage = Math.ceil(this.CountPage / this.pagesize);
      }
    },
    //当前页获取
    handleCurrentChange(val) {
      this.NowPage = val;
      ////console.log(`当前页: ${val}`);
    }
  },
  computed: {
    //计算当前显示页的商品数组
    productLists: function() {
      return this.productListsData.slice(
        (this.NowPage - 1) * this.pagesize,
        this.NowPage * this.pagesize
      );
    },
    searchProductName: function() {
      return this.$route.query.productName;
    },
    searchIdenx: function() {
      return this.$route.query.typeIndex;
    }
  },
  watch: {
    searchProductName: function() {
      self.location.reload(); //监听变化刷新页面
    },
    searchIdenx: function() {
      self.location.reload(); //监听变化刷新页面
    }
  }
};
</script>

<style lang="less" type="text/less" src="./productList.less" scoped></style>
