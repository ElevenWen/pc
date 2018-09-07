<template>
  <el-menu id="serverClassList"
    default-active="0"
    :unique-opened= "istrue"
    class="el-menu-vertical-demo"
    v-if="serverList">
    <!-- 获取的是第三层数据时 -->
    <!-- <el-submenu v-for="(item,index) in severClassList" :index="item.Id" :key="index" >
      <template slot="title"> -->
        <!--<i class="el-icon-menu"></i>-->
        <!-- <span>{{item.Name}}</span>
      </template>
      <el-menu-item-group v-for=" (list,Lindex) in serverProList" :index="index+'-'+Lindex" :key="Lindex">
        <template slot="title"></template>
        <el-menu-item v-for=" (ilist,Iindex) in list.tempDate" :index="Lindex+'-'+Iindex" :key="Iindex" @click="toRuoterDetail(ilist.Id,ilist.Type)">{{ilist.Name}}</el-menu-item>
      </el-menu-item-group> -->

      <!--<el-menu-item v-for=" (ilist,Iindex) in serverProList" index="Iindex" :key="Iindex" @click="toRuoterDetail(ilist.Id,ilist.Type)">{{ilist.Name}}</el-menu-item>-->

    <!-- </el-submenu> -->

    <!-- 获取的是第二层数据 -->
    <el-submenu v-for="(data,index) in serverList" :index="data.Id" :key="data.Id" >
      <template slot="title">
        <nuxt-link class="redirect" :to="'/productList?typeIndex=' + index + '&productName=All'">{{data.Name}}</nuxt-link>
      </template>
      <el-menu-item v-for="item in data.ClassiList" :index="item.Id" :key="item.Id">
        <!-- <nuxt-link class="redirect" :to="{'name': 'productList','query': { 'typeIndex': index, 'productName': item.Name }}"> -->
        <nuxt-link class="redirect" :to="'/productList?typeIndex=' + index + '&productName=All'">
          {{item.Name}}
        </nuxt-link>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import getd from "~/store/ajaxAPI/getData";
export default {
  data() {
    return {
      severClassList: [], //服务分类列表  一层
      oldTypeId: "", //保存一级请求的Id,如果相同不需再次发送请求
      serverProList: [], //服务产品分类
      istrue: true //只允许打开单个折页
      // severList: [],      //服务列表       二层
      // severListConten: [],  //服务列表内容  三层
      // serverList: [] //分类-第一层
    };
  },
  props: {
    serverList: {
      type: Array,
      default: () => []
    }
  },
  created() {
    // this.getseverClassList();
    // this.getList();
  },
  mounted() {},
  methods: {
    /* //跳转到详情
    toRuoterDetail(pathId, ProductType) {
      // this.$router.push({path:'/productDetails',query:{id:pathId,type:ProductType}});
      this.$router.push({
        name: "productDetails-id-type",
        params: { id: pathId, type: ProductType }
      });
    }, */
    //跳到商品分类页
    toProductList(index) {
      this.$router.push({
        name: "productList",
        query: { typeIndex: index, productName: "All" }
      });
    },
    /* serverLsistFn(classId) {
      if (classId == this.oldTypeId) {
        return;
      }
      this.serverProList = [];
      //移入时请求数据
      var param = {
        params: {
          classId: classId
        }
      };
      getd.SERVER_PRODUCT_LIST(param).then(res => {
        res.data.list.forEach(items => {
          this.serverProList.push({
            id: items.Id,
            CompanyId: items.CompanyId,
            name: items.Name
          });
        });
        this.oldTypeId = classId;
        var sumArray = [];
        var functionFn = [];
        this.serverProList.forEach((val, i) => {
          var obj = {};
          //根据第二层请求的数据请求第三层
          var param = {
            params: {
              classId: val.id
            }
          };
          functionFn.push(
            new Promise((resolve, reject) => {
              getd
                .SERVER_PRODUCT_INFOR(param)
                .then(res => {
                  sumArray.push(res.data);
                  resolve(sumArray);
                })
                .then(res => {});
            })
          );
        });
        Promise.all(functionFn)
          .then(values => {
            var tempValues = values[0];
            this.serverProList.forEach((serverItems, serverIndex) => {
              tempValues.forEach((tempItems, tempIndex) => {
                if (serverItems.id == tempItems[0].ClassId) {
                  this.$set(this.serverProList, serverIndex, {
                    id: serverItems.id,
                    CompanyId: serverItems.companyId,
                    name: serverItems.name,
                    tempDate: tempItems
                  });
                }
              });
            });
          })
          .catch(reason => {
            //console.log(reason)
          });
      });
    }, */
    //获取商品分类 （第一层）
    getseverClassList() {
      getd.SERVERLIST().then(res => {
        // console.log(res)
        this.severClassList = res.data.list;
      });
    },

    //navMen切换触发事件
    // handleOpen(key, keyPath) {
    ////console.log(key, keyPath);
    // this.serverLsistFn(key); //旧方法  没有用过第一直接获取第三层数据
    //新接口方法
    /* if(key == this.oldTypeId ){
        return
      }
      this.$_post('/Product/ProductListGetByFirstClass',{classId: key},(res)=>{
        this.oldTypeId = key;
        this.serverProList = res;
        //console.log('三级列表：',res);
      },(err)=>{
        //console.log(err);})
      */
    // },
    // handleClose(key, keyPath) {
    // //console.log(key, keyPath);
    // },
    //获取相关服务推荐
    getList() {
      getd.SERVERLIST().then(res => {
        this.serverList = res.data.list;

        this.serverList.forEach((data, index) => {
          var param = {
            params: {
              classId: data.Id
            }
          };
          getd.SERVER_PRODUCT_LIST(param).then(res => {
            data.secondData = res.data.list;
            data.secondData.forEach((val, i) => {
              var item = {
                params: {
                  classId: val.Id
                }
              };
              getd.SERVER_PRODUCT_INFOR(item).then(response => {
                val.thirdData = response.data;
                this.$set(
                  this.serverList[index],
                  this.serverList[index].secondData,
                  res.data.list
                );
              });
            });
          });
        });
      });
    }
  }
};
</script>

<style lang="less" type="text/less" scoped>
#serverClassList {
  margin: 0 auto;
  width: 210px;
  margin-top: 16px;
  padding-bottom: 10px;
  border: 0;
  // .el-submenu__title {
  //   height: 40px;
  //   line-height: 40px;
  //   font-weight: bold;
  //   font-size: 15px;
  //   color: #666666;
  // }
  .el-menu-item {
    height: 40px;
    line-height: 40px;
    font-family: SimSun;
    font-size: 14px;
    color: #666666;
  }
  .el-submenu {
    margin-bottom: 8px;
    background: #ffeae0;
    .el-submenu__icon-arrow {
      font-size: 16px;
      color: #ff5729;
    }
  }
  .el-menu-item {
    padding: 0 !important;
    &:focus,
    &:hover {
      color: #ff3e08;
    }
    .redirect {
      display: block;
      padding-left: 40px;
    }
  }
  .el-menu-item-group__title {
    display: none;
  }
  .el-pagination {
    padding: 2px 40px;
  }
}
</style>
