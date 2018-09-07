<template>
  <div id="productDetails_id">
    <nuxt-child/>

    <!--公共底部-->
    <div class="c-ftContainWrapindex">
      <publicBottom></publicBottom>
    </div>
  </div>
</template>


<script>
import publicBottom from "~/components/common/publicBottom";

export default {
  name: "productDetails-id",
  components: {
    publicBottom
  },
  asyncData({ route, redirect }) {
    let id = route.params.id,
      type = route.params.type;
    // id/type无效，返回首页
    if (!(id.length === 36 && (type === "0" || type === "1"))) {
      return redirect("/");
    }
  }
};
</script>

<style lang="less" scoped>
//修改elm部分样式
.productDetails /deep/ .el-tabs__nav-wrap {
  padding: 0 10px;
  .el-tabs__item {
    font-family: MicrosoftYaHei-Bold;
    font-size: 16px;
    font-weight: bold;
    line-height: 30px;
    color: #4d4d4d;
    &:hover {
      color: #ff3e08;
    }
  }
  .is-active {
    color: #ff3e08;
  }
}
.productDetails /deep/ .el-tabs__active-bar {
  background-color: #ff3e08;
}
.productDetails /deep/ .number {
  .el-input-number {
    left: 40px;
  }
}
.productDetails /deep/ .button {
  .el-button {
    width: 140px;
    height: 40px;
  }
}
.productDetails /deep/ .starComment {
  .el-rate {
    display: inline-block;
    vertical-align: middle;
    width: 120px;
  }
}
.productDetails /deep/ .commentListWrap {
  .el-tabs__item {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    line-height: 40px;
    color: #ff3e08;
  }
}
.productDetails /deep/ .pageControl {
  .el-pagination {
    float: right;
    margin-right: 30px;
    //修改elm 分页部分
    .el-pager {
      li {
        &:hover {
          color: #ff3e08;
        }
      }
      .active {
        background: #fff;
        color: #ff3e08;
      }
    }
  }
}
.productDetails /deep/ .sharDialogWrap {
  .el-dialog__body {
    padding-top: 10px;
    text-align: center;
    .checkShar {
      margin-bottom: 10px;
      text-align: left;
      color: #999999;
      ul {
        display: inline-block;
        vertical-align: middle;
        overflow: hidden;
        li {
          float: left;
          margin-left: 10px;
          input {
            margin-right: 2px;
            vertical-align: middle;
          }
          img {
            vertical-align: middle;
          }
        }
      }
    }
    .el-textarea {
      .el-textarea__inner {
        width: 100%;
        height: 124px;
      }
    }
  }
}
.productDetails /deep/ .receiveDialogWrap {
  .el-dialog__header {
    padding: 10px 0 10px 20px;
    background-color: #fcfcfd;
    box-shadow: inset 0px -1px 0px 0px rgba(0, 0, 0, 0.08);
    font-family: MicrosoftYaHei;
    font-size: 18px;
    color: #4d4d4d;
  }
}
.productDetails /deep/ .collectionDialogWrap {
  .el-dialog__header {
    padding: 10px 0 10px 20px;
    background-color: #fcfcfd;
    box-shadow: inset 0px -1px 0px 0px rgba(0, 0, 0, 0.08);
    font-family: MicrosoftYaHei;
    font-size: 18px;
    color: #4d4d4d;
  }
  .el-dialog__body {
    text-align: center;
    > div {
      margin-bottom: 50px;
    }
    img {
      vertical-align: middle;
      margin-right: 10px;
    }
    .text {
      display: inline-block;
      vertical-align: middle;
      text-align: left;
      .p1 {
        font-size: 16px;
        line-height: 40px;
      }
      .p2 {
        font-size: 12px;
        color: #359af8;
        span {
          margin-right: 10px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

