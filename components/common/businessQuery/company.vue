<style lang="less" type="stylesheet/css" scoped>
@import "~assets/common/index.less";
@import "../../../pages/business/business.less";
</style>
<template>
    <div id="elementCustom">
        <!-- 公司列表start -->
        <div class="businessList">
            <div class="businessList_top">
                <ul>
                    <li class="company">公司</li>
                    <!-- <li>状态</li> -->
                    <!-- <li>操作</li> -->
                </ul>
            </div>
            <div class="businessList_content">
                <ul>
                    <li v-for="(items,index) in companyList" :key="index" v-if="companyList.length">
                        <div class="detail">
                            <!-- <img src="~assets/images/cart/products_Big.png"> -->
                            <img :src="companyList.sourceFlag">
                            <span class="companyName" @click="toDetail(items.name)" v-html="items.name">{{items.name}}</span>
                            <span>法人代表：<label class="name">{{items.legalPersonName}}</label></span>
                            <span>注册资本：<label>{{items.regCapital}}</label></span>
                            <span>成立时间：<label class="year">{{(items.estiblishTime).substring(0,10)}}</label></span>
                            <!-- <span>统一社会信用代码：<label>{{items.creditCode}}</label></span> -->
                        </div>
                        <!-- <div>
                            <span>{{items.regStatus}}</span>
                        </div> -->
                    </li>
                </ul>
            </div>
            <el-pagination
              background
              layout="prev, pager, next"
              prev-text="上一页"
              next-text="下一页"
              :page-size="20"
              :total="companyLen"
              @size-change="handleSizeChangeCompany"
              @current-change="handleCurrentChangeCompany"
              v-if="companyList &&  companyList.length"
            >
            </el-pagination> 
        </div>
        <!-- <div>{{companyList}}</div> -->
        <!-- 没有数据时 -->
        <businessEmpty v-if="!companyList.length"></businessEmpty>
    </div>
</template>

<script type="text/javascript">
import { mapState,mapActions,mapGetters} from 'vuex';
import tool from "~/assets/lib/tool.js";
import businessEmpty from "./businessEmpty";
  export default {  
      data(){
          return{
               companyList:'',
               companyLen:''
          }
      },
    mounted(){
         this.requestData();
        //  console.log(this.companyLen,'什么额么么')
    },
    computed:{
        ...mapGetters({
            "getgetget": 'businessQuery/businessQuery/endTimeReturn'
        }),
    },
    components:{
        businessEmpty,
    },
    methods:{
        ...mapActions({
            'business_company':'businessQuery/businessQuery/business_company'
        }),
        requestData(){
            var _company = this.$route.query.searchName;
            var args = `word=${_company}`;
            
            var data = {
                method:'get',
                params:{
                    "params":{
                        api:'1',
                        args:args ,
                    } 
                }
            }
            this.business_company(data).then(()=>{
               this.companyList =  this.getgetget.companyList
               this.companyLen =  this.getgetget.companyLen
            //    console.log(this.companyList,'拉拉阿拉啦')
            });
        },
    	//公司详情
    	toDetail(val){
            var name = val.replace(/\<em\>/g,"").replace(/\<\/em\>/g,"");
    		this.$router.push({path:"/business/companyDetail",query:{searchName:name}})
    	},
        handleSizeChangeCompany(){

        },
        handleCurrentChangeCompany(){
            this.requestData();
        }
    },
    filters:{ 
        formatDateFn:value =>{ 
            return tool.formatDate(value,"yyyy-MM-dd")
        }
    }
  }

</script>