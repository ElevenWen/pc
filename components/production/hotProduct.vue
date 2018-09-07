<template>
  <div class="hotProduct" id="hotProduct" v-if="productListsData.length">
    <h3 class="title">热销产品</h3>
    <div class="hotProduceWrap">
        <ul class="swiper-wrapper">
          <!-- <li v-for=" item in productListsData" @click="toRuoterDetails(item.Id,item.Type)"> -->
          <li class="list-item" v-for=" item in productListsData" :key="item.Id">
            <nuxt-link class="redirect" :to="'/productDetails/' + item.Id + '/' + item.Type">
            <!-- <a class="redirect" :href="'/productDetails/' + item.Id + '/' + item.Type"> -->
              <img class="list-img lazyload" :data-src="item.PCPosterImgURL1" :alt="item.Name">
              <span class="price">&#165; {{item.Price}}</span>
            <!-- </a> -->
            </nuxt-link>
          </li>
        </ul>
    </div>
    <no-ssr>
      <div class="controlBtn">
        <span class="swiper-button-prev" @click="transformImg('top')"><img src="~assets/images/product/topArrow.png" alt="↑"></span>
        <span class="swiper-button-next" @click="transformImg('down')"><img src="~assets/images/product/nextArrow.png" alt="↓"></span>
      </div>
    </no-ssr>
  </div>
</template>

<script>
import getd from "~/store/ajaxAPI/getData";

export default {
  data() {
    return {
      nowTage: 0 //下标状态
      // productListsData: [] //销量前12商品
    };
  },
  props: {
    productListsData: {
      type: Array,
      default: () => []
    }
  },
  created() {
    // this.getTopTenProduct();
  },
  mounted() {},
  methods: {
    //控制图片上下移动
    transformImg(istop) {
      let itemHeigth = 170;
      //let countItem = $('#hotProduct .swiper-wrapper > li').length;
      let totalCount = 3;
      /* if(istop == 'down'){
            if(this.nowTage>= totalCount){
                return;
            }
          this.nowTage++;
          $('#hotProduct .swiper-wrapper').css('transform','translateY('+itemHeigth * 3 * -this.nowTage+'px)');
        }else {
          if(this.nowTage<=0){
            return;
          }
          this.nowTage--;
          $('#hotProduct .swiper-wrapper').css('transform','translateY('+itemHeigth * 3 * -this.nowTage+'px)');
        }*/
      if (istop == "down") {
        this.nowTage++;
        if (this.nowTage > totalCount) {
          this.nowTage = 0;
        }
        $("#hotProduct .swiper-wrapper").css(
          "transform",
          "translateY(" + itemHeigth * 3 * -this.nowTage + "px)"
        );
      } else {
        this.nowTage--;
        if (this.nowTage < 0) {
          this.nowTage = 3;
        }
        $("#hotProduct .swiper-wrapper").css(
          "transform",
          "translateY(" + itemHeigth * 3 * -this.nowTage + "px)"
        );
      }
      // //console.log(this.nowTage);
    }
    /* //获取销量前12商品
    getTopTenProduct() {
      let params = {
        params:{
          pageSize:12
        }
      };
      getd.getAllList(params).then(res => {
        this.productListsData = res.data.list;
      });
    },
    //详情页路由跳转
    toRuoterDetails(pathId, ProductType) {
      //刷新当前页
      // this.$router.push({path:'/productDetails',query:{id:pathId,type:ProductType}});
      this.$router.push({
        name: "productDetails-id-type",
        params: { id: pathId, type: ProductType }
      });
    } */
  }
};
</script>

<style lang="less" type="text/less" scoped>
// @import "~assets/common/index";
.hotProduct {
  width: 200px;
  height: 570px;
  text-align: center;
}
h3 {
  position: relative;
  top: 13px;
  left: 75px;
  width: 56px;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  line-height: 26px;
  color: #666666;
  z-index: 3;
}
.hotProduceWrap {
  width: 100%;
  border-top: 1px dashed #e0e0e0;
  overflow: hidden;
  .swiper-wrapper {
    width: 100%;
    height: 515px;
    transition: 0.5s;
  }
  .list-item {
    position: relative;
    margin: 20px auto;
    width: 150px;
    height: 150px;
    border: 1px solid #e6e6e6;
  }
  .list-img {
    width: 100%;
    height: 100%;
  }
  .price {
    position: absolute;
    bottom: 6px;
    left: 30px;
    color: #fff;
  }
}
.controlBtn {
  width: 100%;
  height: 30px;
  line-height: 30px;
  .swiper-button-prev,
  .swiper-button-next {
    padding: 10px 15px;
    line-height: 30px;
    cursor: pointer;
  }
  .swiper-button-prev {
    margin-right: 6px;
  }
}
</style>
