<style lang="less" scoped>
@import "./contract.less";
.seec{
    width: 1200px;
    margin: 20px auto;
    background: #fff;
}
</style>
<template>
    <div id="seeContract">
        <!-- 个人中心公共头部 -->
        <!-- <personalCenterHead></personalCenterHead> -->
        <!-- <div class="headerTitle">我的微企宝&nbsp;&nbsp;>&nbsp;&nbsp;订单中心&nbsp;&nbsp;>&nbsp;&nbsp;订单详情页&nbsp;&nbsp;>&nbsp;&nbsp;电子合同详情页&nbsp;&nbsp;>&nbsp;&nbsp;签署电子合同</div> -->
        <!-- <div class="seec">
            <div class="bodyTitle">
            <span class="contarctDetail">合同详情</span>
            <span>
                <a :href="downContract"  download="下载" class="downContract" style="color:black;"> 
                    <i class="iconDown"></i>下载电子合同
                </a>
                <span class="seeContract"><i class="iconSee"></i>打印电子合同</span>
            </span>
        </div> -->
        <iframe :src="seeContract" style="width:1198px;height:1000px;"></iframe>
        <!-- </div> -->
        <!-- 底部公共样式 -->
        <!-- <publicBottom></publicBottom> -->
    </div>
</template>
<script>
// import personalCenterHead from "~/components/common/personalCenterHead";
// import publicBottom from "~/components/common/publicBottom";
import tool from '~/assets/lib/tool';
export default {
    data(){
        return {
            downContract:"",
            seeContract:"",
        }
    },
    components:{
        // personalCenterHead,
        // publicBottom,
    },
    mounted(){
        this.downContract = this.$route.query.download_url;
        this.seeContract = this.$route.query.viewpdf_url;
        this.$route.query.abd = this.downContract;
        this.$nextTick(() => {
          // tool.saveToLocal("_accountSetting","_accountSetting","accountData",this.info);


            tool.saveToLocal("downUrl",'downUrl' , 'downUrl',this.downContract);
            // console.log(tool.loadFromLocal("downUrl", "ALL"))
        })

    },
}
</script>

