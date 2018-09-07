<style type="text/css" lang="less" scoped>
	@import "~assets/common/index.less";
	@import "../../../pages/business/business.less";
    [v-cloak] {
      display: none;
    }
</style>
<template>
    <div id="elementCustom">
        <!-- 风险信息法院公告列表start -->
        <div class="businessList" v-if="number == 0">
            <div v-if="announcementData.items">
                <div class="businessList_top">
                    <ul>
                        <li>风险信息</li>
                        <li>类别</li>
                        <li>操作</li>
                    </ul>
                </div>
                <div class="risk_content">
                    <ul>
                        <li v-for="(items,index) in announcementData.items" :key="index">
                            <div>
                                <span>{{items.party2}}</span>
                                <span>立案时间：<label>{{items.publishdate}}</label></span>
                                <span>公告类型：<label>{{items.bltntype}}</label></span>
                                <span>公告法院：<label class="addressFY"><i class="address">[{{items.province}}]</i>{{items.courtcode}}</label></span>
                            </div>
                            <div>
                                <span class="announcement">法院公告</span>
                            </div>
                            <div>
                                <span @click="announcementDetail(items.id)">查看详情</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <el-pagination
                  background
                  layout="prev, pager, next"
                  prev-text="上一页"
                  next-text="下一页"
                  :page-size="20"
                  :total="announcementLen"
                  @size-change="handleSizeChangeAnnouncement"
                  @current-change="handleCurrentChangeAnnouncement"
                >
                </el-pagination> 
            </div>
            <businessEmpty v-if="!announcementData.items"></businessEmpty>
        </div>
        <!-- 风险信息法院公告列表end -->

        <!-- 风险信息失信人列表start -->
        <div class="businessList" v-if="number == 1">
            <div v-if="dishonestData.items">
                <div class="businessList_top">
                    <ul>
                        <li>风险信息</li>
                        <li>类别</li>
                        <li>操作</li>
                    </ul>
                </div>
                <div class="risk_content">
                    <ul>
                        <li v-for="(data,index) in dishonestData.items" :key="index">
                            <div>
                                <span>{{data.iname}}</span>
                                <span>发布时间：<label>{{timeData}}</label></span>
                                <span>案号：<label>{{data.casecode}}</label></span>
                                <span>做出执行依据单位：<label>{{data.gistunit}}</label></span>
                            </div>
                            <div>
                                <span>失信人</span>
                            </div>
                            <div>
                                <span @click="dishonestDetail(data.casecode)">查看详情</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <el-pagination
                  background
                  layout="prev, pager, next"
                  prev-text="上一页"
                  next-text="下一页"
                  :page-size="20"
                  :total="dishonestLen"
                  @size-change="handleSizeChangeDishonest"
                  @current-change="handleCurrentChangeDishonest"
                >
                </el-pagination>
            </div>
            <businessEmpty v-if="!dishonestData.items"></businessEmpty>
        </div>
        <!-- 风险信息失信人列表end -->

        <!-- 详情start -->
        <div class="announcementDetail" v-if="announcement_detail">
            
        </div>
        <!-- 详情end -->

        <!-- 失信人详情start -->
        <div class="dishonestDetail" v-if="dishonest_detail">
            
        </div>
        <!-- 失信人详情end -->
    </div>
</template>
<script>
import getd from '~/store/ajaxAPI/getData.js'
import businessEmpty from "./businessEmpty";
import { mapState,mapActions,mapGetters} from 'vuex';
	export default {
        data(){
            return {
                dishonest_detail:false, //是否展示详情
                announcement_detail:false, //法院公告详情
                announcementResult:[], // 基本信息
                search_name:"",
                pageNum:1,//页数
                dishonestData:[],   //失信人数据
                announcementData:[],  //法院公告数据
                dishonestLen:0,   //失信人个数
                announcementLen:0,  //法院公告个数
            }
        },
        components:{
            businessEmpty,
        },
        props:{
            number:{
                // type:Number,
                default:()=>{
                    return this.$router.currentRoute.query.type;
                }
             },
        },
        computed:{
            // ...mapState(
            //     "businessQuery",{
            //         'dishonestData':'dishonestData',
            //         'announcementData':'announcementData',
            //         'dishonestLen':'dishonestLen',
            //         'announcementLen':'announcementLen'
            //     },
            // ),
            ...mapGetters({
                'announcementGet':'businessQuery/businessQuery/announcementGet',
                'dishonestGet':'businessQuery/businessQuery/dishonestGet',
                'endTimeGet':'businessQuery/businessQuery/endTimeGet'
            }),
            timeData(){
                var _dishonestData = this.dishonestData.items;
                _dishonestData.forEach((items) => {
                    var timer = items.regdate;
                        if(!timer){
                            return
                        }
                        var timerr = new Date(parseInt(timer)).toLocaleString().replace(/\//g, "-");
                        var timerrr = timerr.substring(0,9);
                        //console.log("timerrr",timerrr);
                        return timerrr
                })
            }
        },
        mounted(){
            this.switchFn(this.number); 
            // this.$emit('endTime',1521876141640)
            // console.log('传值',this.endTimeGet.endTime)
        },
        watch:{
            number(newV,oldV){
                this.switchFn(newV)
            }
        },
        methods:{
            ...mapActions({
                // "businessQuery",{
                //     'business_risk':'business_risk',
                // },
                'business_risk':'businessQuery/businessQuery/business_risk'
             }),
            switchFn(newV){
                let name =this.$router.currentRoute.query.searchName
                let type = this.$router.currentRoute.query.type; 
                this.commonTool.saveSessionStorage('startTimeDate',+new Date()); //存储请求数据时间 
                switch(newV.toString()){ 
                    case '0': //法院公告
                        this.announcement(name,0) ;
                    break;
                    case '1': //失信人
                    // console.log(" watch /失信人",name)
                        this.dishonest(name,0)
                    break;
                }
            },
            dishonestDetail(val){  //给父组件传失信,数组,是否显示
                this.dishonest_detail = true;
                this.$emit("dishonestDetailIsShow",this.dishonest_detail,val,this.announcementGet.dishonestData);
            },
            announcementDetail(val){  //给父组件传法院公告id,数组,是否显示
                //console.log("id",val);
                this.announcement_detail = true;
                this.$emit("announcementIsShow",this.announcement_detail,val,this.announcementGet.announcementData);
            },
            handleCurrentChangeAnnouncement(name){
                var val = this.$router.currentRoute.query.searchName
                this.announcement(val,name);
            },
            handleCurrentChangeDishonest(name){
                var val = this.$router.currentRoute.query.searchName
                this.dishonest(val,name);
            },
            handleSizeChangeAnnouncement(){

            },
            handleSizeChangeDishonest(){

            },
            dishonest(name,num){//失信人
                //console.log(　`name=${name}&pageNum=${num}`　)
                let args = `name=${name}&pageNum=${num}`
                var data = {
                    num:'2',
                    method:'get',
                    params:{
                    "params":{
                        api:'18',
                            args:encodeURI(args) 
                            // args:"name=北京百度网讯科技有限公司&pageNum=1"
                        } 
                    }
                }  
                // console.log(data.num,'失心疯')
                
                this.business_risk(data).then((res)=>{
                    console.log('失信人进来了吗')
                    this.$emit('endTime',this.endTimeGet.endTime)//传入business.vue
                    this.dishonestData = this.dishonestGet.dishonestData
                    this.dishonestLen = this.dishonestGet.dishonestLen
                });  
            },
            announcement(name,num){//法院公告
                //console.log(　`name=${name}&pageNum=${num}`　)
                let args = `name=${name}&pageNum=${num}`
                var data = {
                    num:'1',
                    method:'get',
                    params:{
                    "params":{
                        api:'17',
                            args:encodeURI(args) 
                            // args:"name=北京百度网讯科技有限公司&pageNum=1" 
                        } 
                    }
                }  
                this.business_risk(data).then((res)=>{
                    // console.log('法院公告进来了吗')
                    this.$emit('endTime',this.endTimeGet.endTime)
                    // console.log('传值',this.endTimeGet.endTime)
                    this.announcementData = this.announcementGet.announcementData
                    this.announcementLen = this.announcementGet.announcementLen
                })  
            },
            requestData(pageNum,api){
                var searchName = this.$route.query.searchName;
                this.search_name = searchName;
                var str = encodeURI("name="+this.search_name+"&pageNum="+this.pageNum);
                //获取风险信息信息
                var params = {
                    "params":{
                        api:Number(api),
                        args:str,
                    }
                };
                // getd.queryCompany("get",params).then((res) => {
                //     this.announcementResult = res.result.items;
                //     //console.log("111",this.announcementResult);
                //     if(this.number==3){
                //         this.announcementResult.forEach((items,index) => {
                //             var timer = items.regdate;
                //             if(!timer){
                //                 return
                //             }
                //             var timerr = new Date(parseInt(timer)).toLocaleString().replace(/\//g, "-");
                //             this.timerr = timerr.substring(0,9);
                //             return this.timerr
                //         })
                //     }
                    
                    
                // })
            }
        }
    }
</script>