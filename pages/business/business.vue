<template>
	<div id="businessQuery">
        <div class="c-header">
            <div class="c-hdTopWrap">
                <topState></topState>
            </div>
        </div>
		<search name="商事查询"  @getSearchDate="getSearchComponentsData"></search>
		<div class="businessQuery">
			<div class="businessQuerys">
			    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
	                <el-tab-pane label="公司" name="公司"   >
	                    <!-- 公司搜索范围start -->
	                    <div class="huntingZones_top">
	                    	<!-- <div class="huntingZones">
	                    		<span>搜索范围</span>
	                    		<span v-for="(items,index) in companyRange" :class="{'activeName':index == currentIndexCom}" @click="comSeletRange(items,$event,index)">{{items}}</span>
		                    </div> -->
		                   <!--  <div v-if="searchTime!=0  && listLength!=-1 " class="timer">找到 {{listLength}} 条相关结果，用时<span > {{searchTime}}  </span>秒</div> -->
	                    </div>
	                    <!-- 公司搜索范围end -->
	                    <!-- 公司列表start -->
	                    <company  v-if="activeName2 =='公司'" ></company>
	                    <!-- 公司列表end -->
	                </el-tab-pane>

    

	                <el-tab-pane label="风险信息" name="风险信息" >
	                    <div class="huntingZones">
	                    	<span>搜索范围</span>
	                    	<span v-for="(items,index) in riskInfoRange" :class="{'activeName':index == currentIndexRisk}"  @click="riskSelectRange(items,$event,index)" :key="index">{{items}}</span>
	                    </div>
	                    <div v-if="searchTime!=0  && listLength!=-1"  class="timer">找到 {{listLength}} 条相关结果，用时<span >{{searchTime}} </span>秒</div>
						<!-- 风险信息失信人列表start -->
	                    <riskInfo   v-if="activeName2 =='风险信息'" :number="riskNum" @dishonestDetailIsShow="dishonestDetailIsShow" @announcementIsShow="announcementIsShow" @endTime='endTime'></riskInfo>
	                </el-tab-pane>



	                <el-tab-pane label="知识产权" name="知识产权" >
						<!-- 知识产权搜索范围start -->
						<div class="huntingZones_top">
	                    	<div class="huntingZones">
	                    		<span>搜索范围</span>
	                    		<span v-for="(items,index) in knowledgeRange" :class="{'activeName':index == currentIndexKnow}"    @click="knowSeletRange(items,$event,index)" :key="index">{{items}}</span>
		                    </div>
		                    <div v-if="searchTime!=0 && listLength!=-1" class="timer">找到 {{listLength}}条相关结果，用时<span > {{searchTime}} </span>秒</div>
                           <!--  <div v-else-if="listLength = -1 || listLength == undefined" class="timer">找到 0 条相关结果，用时<span > {{searchTime}} </span>秒</div> -->
                             
	                    </div>
						<knowledge  v-if="activeName2 =='知识产权'" :number="knowledgeNum"  @isShow="isShow"  @brandDetailIsShow="brandDetailIsShow" @endTime='endTime'></knowledge>
						<!-- <div class="parent">
							<child>
								
							</child>
						</div> --> 
	                </el-tab-pane>
	            </el-tabs>
			</div>
	        <!-- 右边的广告start -->
	        <div class="adWrap">
	            <img :src="adOne.PosterImgURL" @click="toDetail(adOne.LinkWebSite)" v-if="adOne.PosterImgURL">
	            <img :src="adTwo.PosterImgURL" @click="toDetail(adTwo.LinkWebSite)" v-if="adTwo.PosterImgURL">
	        </div> 
	        <!-- 右边的广告end -->
	        <!--清除浮动-->
	        <div class="clear"></div>
		</div>

        <!-- 模态窗口 S  -->
		<!-- 专利详情页start -->
		<div class="patentDetail" v-if="isShowDetail" @mousewheel.prevent.stop>
            <div class="patentWrap">
            	<div class="title">专利详情<span class="del" @click="closeDetail"></span></div>
            	<table class="industry-table" cellspacing="0" cellpadding="0">
            		<tr><td>名称</td><td colspan="3">{{patentDetailData.patentName}}</td></tr>
	    			<tr>
		    			<td>申请号</td><td>{{patentDetailData.patentNum}}</td>
		    			<td>申请日</td><td>{{patentDetailData.applicationTime}}</td>
		    		</tr>
		    		<tr>
		    			<td>申请公布号</td><td>{{patentDetailData.applicationPublishNum}}</td>
		    			<td>申请公布日</td><td>{{patentDetailData.applicationPublishTime}}</td>
		    		</tr>
		    		<tr>
		    			<td>发明人</td><td>{{patentDetailData.inventor}}</td>
		    			<td>类型</td><td>{{patentDetailData.patentType}}</td>
		    		</tr>
		    		<tr>
		    			<td>专利代理机构</td><td>{{patentDetailData.agency}}</td>
		    			<td>法律状态</td><td>没有该数据</td>
		    		</tr>
		    		<tr><td>企业地址</td><td colspan="3">{{patentDetailData.address}}</td></tr>
		    		<tr><td>经营范围</td><td colspan="3">{{patentDetailData.abstracts}}</td></tr>
            		
            	</table>
            </div>
        </div>
        <!-- 专利详情页start -->


        <!-- 法院判决详情start -->
        <div class="announcementDetail" v-if="isShowAnnouncementDetail" @mousewheel.prevent.stop>
        	<div class="announcementWrap">
        		<div class="title">法院公告详情<span class="del" @click="closeDetail"></span></div>
        			<table class="announcement-table" cellspacing="0" cellpadding="0">
	        			<tr>
	            			<td>公告法院</td><td>{{announcementDetailData.courtcode}}</td>
	            		</tr>
	            		<tr>
	            			<td>上传日期</td><td>{{announcementDetailData.publishdate}}</td>
	            		</tr>
	            		<tr>
	            			<td>上诉方</td><td>{{announcementDetailData.party2}}</td>
	            		</tr>
	            		<tr>
	            			<td>被诉方</td><td>接口没有该数据</td>
	            		</tr>
	            		<tr>
	            			<td>公告类型</td><td>{{announcementDetailData.bltntypename}}</td>
	            		</tr>
	            		<tr>
	            			<td>内容</td><td>{{announcementDetailData.content}}</td>
	            		</tr>
	        		</table>
        	</div>
        </div>
        <!-- 法院判决详情end -->
		
		<!-- 失信人详情start -->
		<div class="dishonestDetail" v-if="isShowDishonestDetail" @mousewheel.prevent.stop>
        	<div class="announcementWrap">
        		<div class="title">失信人详情<span class="del" @click="closeDetail"></span></div>
        		<div class="announcement-div">
	        		<table class="announcement-table" cellspacing="0" cellpadding="0">
	        			<tr>
	            			<td>名称</td><td>{{dishonstDetailData.iname}}</td>
	            		</tr>
	            		<tr>
	            			<td>法定代表人</td><td>{{dishonstDetailData.businessentity}}</td>
	            		</tr>
	            		<tr>
	            			<td>身份证/组织机构代码</td><td>{{dishonstDetailData.cardnum}}</td>
	            		</tr>
	            		<tr>
	            			<td>执行依据文号</td><td>{{dishonstDetailData.gistid}}</td>
	            		</tr>
	            		<tr>
	            			<td>案号</td><td>{{dishonstDetailData.casecode}}</td>
	            		</tr>
	            		<tr>
	            			<td>做出执行依据单位</td><td>{{dishonstDetailData.gistunit}}</td>
	            		</tr>
	            		<tr>
	            			<td class="aaa">法律生效文书确定的义务</td><td>{{dishonstDetailData.duty}}</td>
	            		</tr>
	            		<tr>
	            			<td>执行法院</td><td>{{dishonstDetailData.courtname}}</td>
	            		</tr>
	            		<tr>
	            			<td>省份</td><td>{{dishonstDetailData.areaname}}</td>
	            		</tr>
	            		<tr>
	            			<td>立案时间</td><td>{{dishonstDetailData.regdate | formatDateFn(brandDetailData.appDate)}}</td>
	            		</tr>
	            		<tr>
	            			<td>发布时间</td><td>{{dishonstDetailData.publishdate | formatDateFn(brandDetailData.appDate)}}</td>
	            		</tr>
	        		</table>
        		</div>
        	</div>
        </div>
		<!-- 失信人详情end -->


		<!-- 商标详情start -->
		<div class="brandDetail" v-if="isShowBrandDetail" @mousewheel.prevent.stop>
			<div class="brandDetailWrap">
        		<div class="title">商标详情<span class="del" @click="closeDetail"></span></div>
        		<div class="announcement-div">
	        		<table class="brand-table" cellspacing="0" cellpadding="0">
						<div class="brandImg">
							<img :src="brandDetailData.tmPic">
						</div>
	        			<div class="brandRight">
	        				<tr>
		            			<!-- <td>商标名称</td><td>{{brandDetailData.tmName}}</td> -->
	                            <td>商标名称</td><td>没有该数据</td>
		            		</tr>
		            		<tr>
		            			<td>注册号</td><td>{{brandDetailData.regNo}}</td>
		            		</tr>
		            		<tr>
		            			<td>商标状态</td><td>{{brandDetailData.category?brandDetailData.category:'-'}}</td>
		            		</tr>
		            		<tr>
		            			<td>商标分类</td><td>{{brandDetailData.intCls}}</td>
		            		</tr>
		            		<tr>
		            			<td>申请日期</td><td>{{brandDetailData.appDate | formatDateFn(brandDetailData.appDate)}}</td>
		            		</tr>
	        			</div>
	        			<div class="brandBottom">
	        				<tr>
		            			<td>商品服务列表</td><td>没有该数据</td>
		            		</tr>
		            		<tr>
		            			<td>商标流程</td><td>没有该数据</td>
		            		</tr>
		            		<tr>
		            			<td>使用期限</td><td>没有该数据</td>
		            		</tr>
		            		<tr>
		            			<td class="last">代理机构</td><td class="last">没有该数据</td>
		            		</tr>
		        		</div>
	        		</table>
        		</div>
        	</div>
		</div>
		<!-- 商标详情end -->
        
        <!-- 模态窗口 E  -->
		<publicBottom></publicBottom>
	</div>
</template>

<script>
    import topState from "~/components/common/topState.vue";
	import search from "~/components/common/search.vue";
	import publicBottom from "~/components/common/publicBottom.vue";
    import company from "~/components/common/businessQuery/company.vue";
	import riskInfo from "~/components/common/businessQuery/riskInfo.vue";
	import knowledge from "~/components/common/businessQuery/knowledge.vue";
    import { mapState,mapActions,mapGetters} from 'vuex';
    import tool from "~/assets/lib/tool.js";
    import getd from "~/store/ajaxAPI/getData.js";
	export default {  
   	data() {
      return {
      	 activeName2: this.$router.currentRoute.query.category , //当前标签选中颜色
      	 companyRange:["法院/股东/高管","联系方式","经营范围","产品/商标"],
      	 riskInfoRange:["法院公告","失信人"],
      	 knowledgeRange:["商标","专利","著作权"],
         currentIndexCom:0,//公司 初始化默认索引 
         currentIndexRisk:0,
         currentIndexKnow:0,
      	 isShowDetail:false, //专利详情页是否展示
      	 isShowAnnouncementDetail:false, //法院公告详情是否展示
      	 isShowDishonestDetail:false,//失信人详情是否展示
      	 isShowBrandDetail:false,//商标详情是否展示
      	 knowledgeNum:"", //知识产权  搜索范围一个唯一标示， 
      	 riskNum:1,//风险信息 搜索范围一个唯一标示，
      	 companyNum:0,// 公司信息 搜索范围一个唯一标示，
         searchName:"",//搜索关键词 
        // start:"0.000",

        announcementDetailData:{},//法院公告详情
        dishonstDetailData:{}, //失信人详情
        brandDetailData:{},//商标详情
        patentDetailData:{},//专利详情
        adOne:{},//广告位1
        adTwo:{},//广告位2
        end:'',
        searchTime:'',


        
      }
    },
    components:{ 
        topState,
    	search,
        company,
    	publicBottom,
    	riskInfo,
    	knowledge,
    },
    beforeCreate() {
    //    document.getElementsByTagName("body")[0].className="noRoll";
    },
    beforeDestroy() {
       document.body.removeAttribute("class","noRoll");
    },
    watch:{
        listLengthlistLength(newV,oldV){
            if(this.listLength == undefined){
                this.$store.state.businessQuery.listLength = 0;
                return;
            }
        }
    },
    updated(){ 
    },
    mounted(){ 
        document.getElementsByTagName("body")[0].className="noRoll";

        // this._searchTime()
          
    //    console.log('business.vue',this.$store.state.businessQuery.businessQuery.brandData)



        let currentQuery = this.$router.currentRoute;
        this.activeName2 =  this.$router.currentRoute.query.category;
        // console.log('activeName2',this.activeName2)
        switch(this.$router.currentRoute.query.category){//判断搜索范围当前下标
            case "公司": 
                var index = Number(this.$router.currentRoute.query.type);
                this.companyNum  = index;
                this.currentIndexCom =index; 
            break;
            case  "风险信息":
            // console.log("????????")
                var index = Number(this.$router.currentRoute.query.type);
                this.riskNum  = index;
                this.currentIndexRisk =index; 
            break;
            case "知识产权":
            //console.log(Number(this.$router.currentRoute.query.type) );
                var index = Number(this.$router.currentRoute.query.type);
                this.knowledgeNum = index;
                this.currentIndexKnow =index;
            break;
        };

        //广告位1
		var params = {
			params:{
				type:0,//pc 成为0  app 为1
				code:"YCGGW04"
			}
		};
		getd.getHomeBanner(params)
		.then((res) => {
            this.adOne = res.data.list[0];
            // console.log(this.adOne == undefined,'??????')
            if(this.adOne  == undefined){ 
                this.adOne = false 
                // return false
                // console.log(   this.adOne  )
            }
            //  console.log(   this.adOne  ,'2222')
            
		})
		//广告位2
		var params2 = {
			params:{
				type:0,//pc 成为0  app 为1
				code:"YCGGW05"
			}
		};
		getd.getHomeBanner(params2)
		.then((res) => {
            
            this.adTwo = res.data.list[0];
            if(this.adTwo  == undefined){
                 
                this.adTwo = false 
                // return false
                // console.log(   this.adTwo  )
            }

            // console.log(   this.adTwo  ,'333333')
		})
    },
    computed:{
        listLength(){ 
            return this.endTimeGet.listLength
        },

        ...mapGetters({
            'endTimeGet':'businessQuery/businessQuery/endTimeGet',
        }),
        // ...mapState(
        //     // 'businessQuery',{
        //     //     'endTime':'businessQuery/businessQuery/endTime',//结束搜索时间
        //     //     'listLength':'businessQuery/businessQuery/listLength',//天严查查询数据条数
        //     //     'announcementData':'businessQuery/businessQuery/announcementData',//法院公告数据
        //     //     'dishonestData':'businessQuery/businessQuery/dishonestData',//失信人数据
        //     //     'brandData':'businessQuery/businessQuery/brandData',//商标数据
        //     //     'patentDate':'businessQuery/businessQuery/patentDate',//专利

        //     // }
        // ),
        //  ...mapGetters(
        //     'businessQuery',{
        //         'endTimeReturn':'businessQuery/businessQuery/endTimeReturn',
        //         'business_risk':'businessQuery/businessQuery/business_risk',
        //         'REQUESTDATA_KNOWLEAGE':'businessQuery/businessQuery/REQUESTDATA_KNOWLEAGE',
        //     }
        // ),
    //    searchTime(){  //搜索时间   
    //             let  start  = this.commonTool.loadSessionStorage('startTimeDate' );  
    //             // let end = this.endTimeReturn; //来自 后台异步请求后的 new Date()  
    //             if(this.end == 0){
    //                 return "0"
    //             } 
    //             var searchTimeTemp =( this.end - start)/1000; 
    //             return searchTimeTemp.toFixed(2); 
    //             // return 12345
    //    },
    },
    methods:{
        //  _searchTime(){  //搜索时间   
        //         let  start  = this.commonTool.loadSessionStorage
        //         ('startTimeDate' );  
        //         console.log('hahahaha',start)
        //         // let end = this.endTimeGet.endTime; //来自 后台异步请求后的 new Date()  
        //         console.log('endendend',this.end)
        //         if(this.end == 0){
        //             return "0"
        //         } 
        //         var searchTimeTemp =( this.end - start)/1000; 
        //         // console.log(searchTimeTemp,'meximezi')
        //         this.searchTime = searchTimeTemp.toFixed(2)
        // },

    	//跳banner
    	toDetail(url){
    		location.href = url;
    	},
        getSearchComponentsData(value){//接受search.vue子组件的值
            // //console.log("getSearchComponentsData",value);
            //   sessionStorage.setItem("key1", "value2");
        },
    	handleClick(tab, event) {
            //console.log("====")
            //console.log(tab.index, event.target.textContent); 
            if(this.$router.currentRoute.query.searchName === undefined){
                this.$router.push({"path":'/business/business',"query":{
                    'category':event.target.textContent,
                    "type":0
                }})
                // 显示当前搜索范围颜色
                this.currentIndexCom = this.currentIndexRisk = this.currentIndexKnow = 0;
                this.companyNum = this.riskNum = this.knowledgeNum  = 0;
            }else{
                this.$router.push({"path":'/business/business',"query":{
                    'category':event.target.textContent,
                     "type":0,
                    searchName:this.$router.currentRoute.query.searchName,
                }})
                this.currentIndexCom = this.currentIndexRisk = this.currentIndexKnow = 0;
                this.companyNum = this.riskNum = this.knowledgeNum  = 0;
            }

           
        },
        comSeletRange(data,data1,i){ //公司搜索范围选择字体变色
            //console.log( data1.target,"????????????"  )
        	// $(data1.target).css({"color":"red"});
        	// $(data1.target).siblings('span').css({"color":"#000"});
        	// $(".huntingZones span:first").css("color","#8c8c8c")
            this.currentIndexCom = i;
        	//根据搜索范围的不同切换不同的组件
        	this.companyNum = i;
            //console.log(data,data1,i);
            if(this.$router.currentRoute.query.searchName === undefined){
                 this.$router.push({"path":'/business/business',"query":{
                    'category':'公司',
                    "type":i
                }})
            }else{
                 this.$router.push({"path":'/business/business',"query":{
                    'category':'公司',
                     "type":i,
                    searchName:this.$router.currentRoute.query.searchName,
                }})
            }
           
            // this.$router.currentRoute.query.base = data;
            //   //console.log(   this.$router.currentRoute.query  )

        },
        riskSelectRange(data,data1,i){ //风险信息搜索范围选择字体变色
        // activeName2
        	this.currentIndexRisk = i;
            this.riskNum = i;
            // console.log(i,"1111111信息搜索范围选择字体变色" )
            if(this.$router.currentRoute.query.searchName === undefined){
                // console.log("this.$router.currentRoute.query.searchName",this.$router.currentRoute.query.searchName);
                 this.$router.push({"path":'/business/business',"query":{
                    'category':'风险信息',
                    "type":i
                }})
            }else{
                 this.$router.push({"path":'/business/business',"query":{
                    'category':'风险信息',
                     "type":i,
                    searchName:this.$router.currentRoute.query.searchName,
                }})
            }
        },
        knowSeletRange(data,data1,i){ //知识产权搜索范围选择字体变色
            this.currentIndexKnow = i; 
        	this.knowledgeNum = i;
            // knowledgeNum
            //console.log("我要去知识产权")
            if(this.$router.currentRoute.query.searchName === undefined){
                 this.$router.push({"path":'/business/business',"query":{
                    'category':'知识产权',
                    "type":i
                }})
            }else{
                 this.$router.push({"path":'/business/business',"query":{
                    'category':'知识产权',
                     "type":i,
                    searchName:this.$router.currentRoute.query.searchName,
                }})
            }
        },
        isShow(val,id,data){ //从专利列表组件传过来的
        	//console.log("val",val);
        	this.isShowDetail = val;
            var aaa = document.getElementsByClassName("noRoll")[0];
            aaa.style.overflowX = "hidden";
        //    console.log('组件传值' , this.patentDate )
            // var arr = this.patentDate.items;
            data.items.forEach((items) => {
                if(items.uuid == id){
                    this.patentDetailData = items;
                }
            })
            //console.log("0000",this.patentDetailData);
        },
        announcementIsShow(val,id,data){ //从法院公告列表组件传过来的
        	this.isShowAnnouncementDetail = val;
            var aaa = document.getElementsByClassName("noRoll")[0];
            aaa.style.overflowX = "hidden";
            // var arr = data;
            data.items.forEach((items) => {  //风险组件传过来的法院公告数据
                if(items.id == id){
                    this.announcementDetailData = items;
                }
            })
        },
        dishonestDetailIsShow(val,num,data){ //从失信人列表组件传过来的 
        	this.isShowDishonestDetail = val;
            var aaa = document.getElementsByClassName("noRoll")[0];
            aaa.style.overflowX = "hidden";

            // var arr = this.dishonestData.items;
            data.items.forEach((items) => {
                if(items.casecode == num){
                    this.dishonstDetailData = items;
                }
            })
            //console.log("0000",this.dishonstDetailData);

        }, 
        brandDetailIsShow(val,id,data){ //从商标列表组件传过来的 
        	this.isShowBrandDetail = val;
            var aaa = document.getElementsByClassName("noRoll")[0];
            aaa.style.overflowX = "hidden";

            // var arr = this.brandData.items;
            data.items.forEach((items) => {
                if(items.id == id){
                    this.brandDetailData = items;
                }
            })
            //console.log("0000",this.brandDetailData);

        },
        closeDetail(){ 
        	this.isShowDetail = false; //关闭专利详情页
        	this.isShowAnnouncementDetail = false; //关闭法院公告详情
        	this.isShowDishonestDetail = false; // 关闭失信人详情
        	this.isShowBrandDetail = false; // 关闭商标详情

            var aaa = document.getElementsByClassName("noRoll")[0];
            aaa.style.overflow = "auto";
        },
        endTime(time){
                this.end = time 
                let  start  = this.commonTool.loadSessionStorage
                ('startTimeDate' );  
                // console.log('hahahaha',start)
                // let end = this.endTimeGet.endTime; //来自 后台异步请求后的 new Date()  
                // console.log('endendend',this.end)
                if(this.end == 0){
                    return "0"
                } 
                var searchTimeTemp =( this.end - start)/1000; 
                this.searchTime = searchTimeTemp.toFixed(2)
                // console.log('接受时间',time)
        }
    },
    filters:{ 
        formatDateFn:value =>{ 
            return tool.formatDate(value,"yyyy-MM-dd")
        } ,
    }
} 
</script>

<style lang="less" scoped>

  @import "~assets/common/index.less";
  @import "./business.less";
  @import "./detail.less";
</style>