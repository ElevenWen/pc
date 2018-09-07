<style type="text/css" lang="less"  scoped >
	@import "~assets/common/index.less";
    @import "../../../pages/business/business.less";
 	
</style>

<template>
	<div  id="elementCustom" >
		 
		<!-- 知识产权 商标列表start -->
	    <div  class="businessList" v-show="number == 0" >
	    	
	        <div class="businessList_top">
	            <ul>
	                <li>知识产权</li>
	                <li>类别</li>
	                <li>操作</li>
	            </ul>
	        </div>
	        <div class="knowledge_content">
	            <ul >
	                <li v-for="(items,index) in brandData.items" :key="index">
	                    <div>
	                        <img :src="items.tmPic"> 
	                        <span class="knowname" v-if="items.tmName"><em>{{items.tmName?items.tmName:'-' }}</em><i>{{items.category?items.category:'-'}}</i></span> 
	                        <span class="aaa">申请日期：<label>{{items.appDate | formatDateFn(items.appDate)}}</label></span>
	                        <span class="register">注册号：<label>{{items.regNo}}</label></span>
	                        <span>类别：<label>{{items.intCls}}</label></span>
	                        <span>申请人：<label>{{items.applicantCn}}</label></span>
	                    </div>
	                    <div>
	                        <span>商标</span>
	                    </div>
	                    <div>
	                        <span @click="brandDetail(items.id)">查看详情</span>
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
				  :total="brandPageSize"
				  @size-change="handleSizeChangeBrand"
     			  @current-change="handleCurrentChangeBrand"
     			  v-if="brandPageSize"
			>
			</el-pagination> 
	    </div>
   		<!-- 知识产权 商标列表end -->
    	<!-- 知识产权 专利列表start -->
        <div class="businessList" v-show="number == 1"  > 
            <div class="businessList_top">
                <ul>
                    <li>知识产权</li>
                    <li>类别</li>
                    <li>操作</li>
                </ul>
            </div>
            <div class="knowledge_patent">
                <ul>
                     <li v-if="patentDate.items!=undefined"  v-for="(items,index) in patentDate.items" :key="index">
                        <div>
                            <span>{{items.patentName}}</span>
                            <span>公布日期：<label>{{items.applicationPublishTime}}</label></span>
                            <span>公布号：<label>{{items.applicationPublishNum}}</label></span>
                            <span>申请号：<label>{{items.patentNum}}</label></span>
                            <span>发明人：<label>{{items.applicantName}}</label></span>
                        </div>
                        <div>
                            <span>专利</span>
                        </div>
                        <div>
                            <span @click="patentDetail(items.uuid)">查看详情</span>
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
				  :total="patentPageSize"
				  @size-change="handleSizeChangePatent"
     			  @current-change="handleCurrentChangePatent"
     			  v-if="patentPageSize"
			>
			</el-pagination>
        </div>
      	<!-- 知识产权 专利列表end -->

         <!-- 知识产权 著作权start -->
	    <div class="businessList" v-show="number == 2"  >
	    	
	        <div class="businessList_top">
	            <ul>
	                <li>知识产权</li>
	                <li>类别</li>
	                <li>操作</li>
	            </ul>
	        </div>
	        <div class="knowledge_copyright">
	            <ul>
	               <li v-if="copyrightDate.items!=undefined" v-for="(items,index) in copyrightDate.items" :key="index">
	                    <div>
	                         <span>{{items.fullname}}</span>
	                        <span>登记日期：<label>{{items.regtime | formatDateFn(items.regtime)}}</label></span>
	                        <span v-if="items.publishtime == 0">首次发布日期：<label>0</label></span>
	                        <span v-else>首次发布日期：<label>{{items.publishtime | formatDateFn(items.regtime)}}</label></span>
	                        <span>登记号：<label>{{items.regnum}}</label></span>
	                        <!-- <span>类别：<label>美术</label></span> -->
	                        <span>作品著作权人：<label>{{items.authorNationality}}</label></span>
	                    </div>
	                    <div>
	                        <span>著作权</span>
	                    </div>
	                    <div>
	                        <span>查看详情</span>
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
				  :total="copyrightSize"
				  @size-change="handleSizeChangeCopyright"
     			  @current-change="handleCurrentChangeCopyright"
     			  v-if="copyrightSize"
			>
			</el-pagination>
	    </div>
    	<!-- 知识产权 著作权end -->
    	<!-- 知识产权 软件著作权start -->
        <!-- <div class="businessList" v-show="number == 4" > 
	        <div class="businessList_top">
	            <ul>
	                <li>知识产权3</li>
	                <li>类别</li>
	                <li>操作</li>
	            </ul>
	        </div>
	        <div class="knowledge_copyright">
	            <ul>
	               <li v-for="items in copyrightDate.items">
	                    <div>
	                         <span>{{items.simplename}}</span>
	                        <span>登记日期：<label>{{items.regtime}}</label></span>
	                        <span>首次发布日期：<label>{{items.publishtime}}</label></span>
	                        <span>登记号：<label>{{items.regnum}}</label></span>
	                        <span>类别：<label>美术</label></span>
	                        <span>作品著作权人：<label>{{items.authorNationality}}</label></span>
	                    </div>
	                    <div>
	                        <span>著作权</span>
	                    </div>
	                    <div>
	                        <span>查看详情</span>
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
				  :total="copyrightSize"
				  @size-change="handleSizeChangeCopyright"
     			  @current-change="handleCurrentChangeCopyright"
     			  v-if="copyrightSize"
			>
			</el-pagination>
        </div> -->
        <!-- 知识产权 软件著作权end -->
		 
        <!-- 知识产权无 s -->
        <div class="findListWrap"  v-show="noData">
			<ul class="listComWrap" id="js-listComWrap">
				 <li class="nothingCom">
					<dl class="nothing">
						<dt>没有找到相关结果</dt>
						<dd>1.输入准确的关键词,重新搜索</dd>
						<dd>2.更换筛选条件,重新搜索</dd>
						<dd>3.输入的关键词过于宽广</dd> 
					</dl>
				</li>
 			</ul>
		</div>
         <!-- 知识产权无 e -->
	</div>
</template>

<script type="text/javascript">
import { mapState,mapActions,mapGetters} from 'vuex';
import  tool from "~/assets/lib/tool.js"
	export default {  
		data(){
			return {
				patent_detail:false, //是否展示详情
				brand_detail:false, //是否展示详情
				allData:this.$store.state.businessQuery.businessQuery.allData,
				allPageSize:0,
				brandData:[],
				brandPageSize:0,
				patentDate:[],
				patentPageSize:0,
				copyrightDate:[],
				copyrightSize:0,
				isNoData:this.$store.state.businessQuery.businessQuery.isNoData,

			}
		},
		props:{
			 number:{
                // type:Number,
                default:()=>{
                    return this.$router.currentRoute.query.type;
                }
             },
		},
		mounted(){ 
			//  this.number = this.$router.currentRoute.query.type;
			// console.log("我在知识产权",this.number);
			// //初始化数据
			// console.log('我在知识产权-',this.brandData)
			// console.log('我在知识产权-专利',this.patentDate)
			// console.log('我在知识产权-商标',this.patentDate)

			this.switchFn(this.number); 
		},
		updated(){ 
		},
		computed:{
			 
	   		noData(){
	   			// //console.log(this.isNoData,"||||||")
	   			return  this.isNoData;
			   },
			...mapGetters({
				   'initBrandGet':'businessQuery/businessQuery/initBrandGet',
				   'patentDateGet':'businessQuery/businessQuery/patentDateGet',
				   'copyrightGet':'businessQuery/businessQuery/copyrightGet',
				   'endTimeGet':'businessQuery/businessQuery/endTimeGet'
			   })
		},
		methods:{
			// ...mapActions(
			// 	"businessQuery",{
			// 		'REQUESTDATA_KNOWLEAGE':'REQUESTDATA_KNOWLEAGE',
			// 	},
			// ),
			...mapActions({
				// "businessQuery",{
				// 	'REQUESTDATA_KNOWLEAGE':'REQUESTDATA_KNOWLEAGE',
				// },
				"REQUESTDATA_KNOWLEAGE":"businessQuery/businessQuery/REQUESTDATA_KNOWLEAGE"
			}),
			switchFn(newV){
				let name =this.$router.currentRoute.query.searchName
			    let type = this.$router.currentRoute.query.type; 
				//console.log(newV,'switchFn')
				switch(newV.toString()){ 
				 	case '0': //商标 
				 		this.initBrand(name,0) ;
				 	break;
				 	case '1': //专利
				 	//console.log(" watch 专利")
				 		this.initPatent(name,0)
				 	break;
				 	case '2': //著作权
				 		this.initCopyright(name,0)
				 	break;
				}
				this.commonTool.saveSessionStorage('startTimeDate',+new Date()); //存储请求数据时间 
			},
			handleSizeChangeBrand(va,o){//pageSize 改变时会触发 
				//console.log( va,o,'pageNumpageNumpageNumpageNum')
			},
			handleCurrentChangeBrand(pageNum){////商标  获取当前页 
				////console.log(val );
				//console.log( pageNum ,"!11111");
				this.commonTool.saveSessionStorage('startTimeDate',+new Date());  
				let name = this.$router.currentRoute.query.searchName
				this.initBrand(name,pageNum).then(res=>{
					this.brandData = this.initBrandGet.brandData
				});
			},
			handleSizeChangePatent(pageNum){ //专利 
				//console.log( pageNum,'pageNumpageNumpageNumpageNum')
			},
			handleCurrentChangePatent(pageNum){//专利
				// //console.log( name,pageNum ,"!11111");
				this.commonTool.saveSessionStorage('startTimeDate',+new Date());  
				let name =this.$router.currentRoute.query.searchName
				this.initPatent(name,pageNum).then(res=>{
					this.patentDate = this.patentDateGet.patentDate
				});
			},
			handleSizeChangeCopyright(name,pageNum){ //著作权
			},
			handleCurrentChangeCopyright(pageNum){//著作权
				// //console.log( name,pageNum ,"!11111");
				this.commonTool.saveSessionStorage('startTimeDate',+new Date());
				let name =this.$router.currentRoute.query.searchName
				this.initCopyright(name,pageNum).then(res=>{
					this.copyrightDate = this.copyrightGet.copyrightDate
				});
			},
			initBrand(name,num){//商标 
				let args = `name=${name}&pageNum=${num}`;
				// console.log('hahihihi',`${name}`)
				var data = {
					num:'1',
					method:'get', 
					params:{
					"params":{
						api:'34',
							// args:"id=22822"
							args:"word="+encodeURI(args) 
						} 
					}
				}
	    	this.REQUESTDATA_KNOWLEAGE(data).then(()=>{
				this.$emit('endTime',this.endTimeGet.endTime)
				this.brandData = this.initBrandGet.brandData
				this.brandPageSize = this.initBrandGet.brandPageSize
			}) 
			},
			initPatent(name,num){//专利
			let args = `name=${name}&pageNum=${num}`;
				var data = {
					num:'2',
					method:'get',
					params:{
					"params":{
						api:'35',
							args:"word="+encodeURI(args) 
							// args:"id=22822"
						} 
					}
				}
				this.REQUESTDATA_KNOWLEAGE(data).then((res)=>{
					this.$emit('endTime',this.endTimeGet.endTime)
					this.patentDate = this.patentDateGet.patentDate
					this.patentPageSize = this.patentDateGet.patentPageSize
				}) 
			},
			initCopyright(name,num){//著作权
			let args = `name=${name}&pageNum=${num}`;
				var data = {
					num:'3',
					method:'get',
					params:{
					"params":{
						api:'36',
							args:"word="+encodeURI(args) 
							// args:"id=22822" 
						} 
					}
				}
				this.REQUESTDATA_KNOWLEAGE(data).then(()=>{
					this.$emit('endTime',this.endTimeGet.endTime)
					this.copyrightDate = this.copyrightGet.copyrightDate
					this.copyrightSize = this.copyrightGet.copyrightSize
				})
			},
			patentDetail(val){
				this.patent_detail = true;
                this.$emit("isShow",this.patent_detail,val,this.patentDateGet.patentDate);
			},
			brandDetail(val){
                this.brand_detail = true;
                this.$emit("brandDetailIsShow",this.brand_detail,val,this.initBrandGet.brandData);
            }
		},
		watch:{
			number(newV,oldV){//实时监控number 变化 当number=0  不会监听
				// console.log("我在监听number",newV)
			   
			   // //console.log(this.$router.currentRoute.query)
			   // //console.log(">>>>>>>>>>",name);
				this.switchFn(newV)
			},
			 
		},
		filters:{ 
	        formatDateFn:value =>{ 
	            return tool.formatDate(value,"yyyy-MM-dd")
	        }
	    }
	}
</script>