<template>
	<div id="mainKey" ref="box">
		<div class="c-header">
            <div class="c-hdTopWrap">
                <topState></topState>
            </div>
        </div>
        <search name="商事查询"  @getSearchDate="getSearchComponentsData"></search>
        <!-- 简介start -->
        <div class="personCom">
        	<div class="personInfowrap" v-for="(items,index) in sholderDetail2" :key="index" v-if="items.name == _name&&$route.query.info=='主要人员'">
        		<!-- <img src="~assets/images/product/productlistImg.png"> -->
        		<img :src="items.logo">
        		<div class="personInfo">
	        		<span>{{items.name}}</span>
	        		<span>暂无介绍</span>
	        	</div>
        	</div>
			<div class="personInfowrap" v-if="$route.query.info=='股东'">
        		<!-- <img src="~assets/images/product/productlistImg.png"> -->
        		<img :src="img">
        		<div class="personInfo">
	        		<span>{{$route.query.name}}</span>
	        		<span>暂无介绍</span>
	        	</div>
        	</div>
        </div>
        <!-- 简介end -->
        <!-- tab切换start -->
        <div class="businessQuerys">
        	<div class="tab">
	        	<el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
				    <el-tab-pane label="他的所有商业角色" name="first">
				    	<div class="tabInfo">
				    		<table class="shareholder-table" cellspacing="0" cellpadding="0">
					    		<tbody>
									<tr>
					    			<td class="first">角色</td><td class="active">企业</td><td class="active">省份地区</td><td class="active">开业日期</td><td class="active">注册资本</td><td class="active">经营状态</td>
					    		</tr>
					    		<tr v-for="(items,index) in personAllCompany" :key="index+items.name">
					    			<td class="first">{{items.type}}</td><td class="second">{{items.name}}</td><td>{{items.base}}</td><td>{{items.estiblishTime | formatDateFn(items.estiblishTime) }}</td><td style="color:#5FAEF9;">{{items.regCapital}}</td><td>{{items.regStatus}}</td>
					    		</tr>
								</tbody>
					    	</table>
				    	</div>
				    </el-tab-pane>
				    <el-tab-pane label="他的所有企业" name="second">
						<div class="tabInfo">
				    		<table class="shareholder-table" cellspacing="0" cellpadding="0">
					    		<tbody>
									<tr>
					    			<td class="first2">企业</td><td class="active">省份地区</td><td class="active">开业日期</td><td class="active">注册资本</td><td class="active">经营状态</td><td class="active">角色</td>
					    		</tr>
					    		<tr v-for="(items,index) in personAllCompany" :key="index+items.name">
					    			<td class="first2" style="color:#5FAEF9;" @click="toCompany(items.name)">{{items.name}}</td><td>{{items.base}}</td><td>{{items.estiblishTime | formatDateFn(items.estiblishTime) }}</td><td>{{items.regCapital}}</td><td style="color:#5FAEF9;">{{items.regStatus}}</td><td>{{items.type}}</td>
					    		</tr>
								</tbody>
					    	</table>
				    	</div>
				    </el-tab-pane>
				</el-tabs>
	        </div>
	        <!-- 右边的广告start -->
	        <div class="adWrap">
	            <img src="~assets/images/businessQuery/adv1.png">
	            <img src="~assets/images/businessQuery/adv2.png">
	        </div>
	        <!-- 右边的广告end -->
        </div>
        <!-- tab切换end -->
	</div>
	
</template>
<script>
import topState from "~/components/common/topState";
import search from "~/components/common/search";
import publicBottom from "~/components/common/publicBottom";
import getD from "~/store/ajaxAPI/getData.js";
import { mapState,mapActions,mapGetters} from 'vuex';
import tool from "~/assets/lib/tool.js";
export default {
	data(){
		return {
			activeName2: 'first',
			_name:"",
			person:{},
			personAllCompany:'',
			sholderDetail2:'',
			img:require('../../static/images/common/default.png')
		}
	},
	mounted(){
		// this.$refs.box.style.height = document.body.offsetHeight+'px';
		this._name = this.$route.query.name;
		var _searchName = this.$route.query.searchName;
		let args = `humanName=${this._name}&name=${_searchName}`;
		// let args = "humanName=李彦宏&name=北京百度网讯科技有限公司";
		var data = {
            method:'get',
            params:{
	            "params":{
	                api:'64',
	                args:encodeURI(args) 
	            } 
	        }
		}
		this.business_personAllCompany(data).then(()=>{
			this.personAllCompany = this.personAllCGet.personAllCompany
		});
		let argss = `name=${_searchName}`;
		var data = {
            method:'get',
            params:{
	            "params":{
	                api:'5',
	                args:encodeURI(argss) 
	            } 
	        }
		}
			this.business_sholder_detail2(data).then(()=>{
				// console.log('马大大',this.sholderDGet.sholderDetail2)
				this.sholderDetail2 = this.sholderDGet.sholderDetail2
			});
		
		
	},
	computed:{
		...mapGetters({
			'personAllCGet':'businessQuery/businessQuery/personAllCGet',
			'sholderDGet':'businessQuery/businessQuery/sholderDGet'
		})
	},
	components:{ 
        topState,
    	search,
    	publicBottom,
    },
    methods:{
    	...mapActions({
			'business_personAllCompany':'businessQuery/businessQuery/business_personAllCompany',
			'business_sholder_detail2':'businessQuery/businessQuery/business_sholder_detail2',
		}),
    	handleClick(tab, event) {
	        //console.log(tab, event);
	    },
	    getSearchComponentsData(value){//接受search.vue子组件的值
            // //console.log("getSearchComponentsData",value);
            //   sessionStorage.setItem("key1", "value2");
        },
        toCompany(_name){
        	// var _name = this.$route.query.name;
        	// this.$router.push({path:"/business/business",query:_name})
        }
    },
    filters:{ 
        formatDateFn:value =>{ 
            return tool.formatDate(value,"yyyy-MM-dd")
        }
    }

}
</script>

<style lang="less" scoped>
 @import "~assets/common/index.less";
 html body{
	 background: #f0f0f5 !important;
	 height:100% !important;
 }
 #mainKey{
	 width: 100%;
	 overflow: hidden;;
 }
 .personCom{
 	width: 1200px;
 	height: 140px;
 	margin: 0 auto;
 	margin-top: 30px;
 }
 .personInfowrap{
 	width: 910px;
 	background: white;
 	-moz-box-shadow: 0px 4px 2px 0px #eaeaea; /* 老的 Firefox */
    box-shadow: 0px 4px 2px 0px #eaeaea;
    float: left;
 }
 .personInfowrap img{
 	width: 80px;
 	height: 80px;
 	margin: 30px 15px 30px 20px;
 }
 .personInfo{
 	display: inline-block;
 	vertical-align: top;
 	margin-top: 30px;
 }
 .personInfo span{
 	display: block;
 }
 .personInfo span:nth-child(1){
 	font-size: 18px;
 	font-weight: 600;
 }
 .personInfo span:nth-child(2){
	margin-top: 15px;
 }
 // tab切换
 .businessQuerys{
 	width: 1200px;
 	// margin-top: 30px;
 	// margin-left: 353px;
 	margin: 30px auto;
	
 }
 .tab{
 	width: 910px;
 	background: white;
 	display: inline-block;
 }
 .tabInfo{
 	padding: 20px;
 }
.shareholder{
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #c5c5e0;
    line-height: 20px;
    text-align: center;
    margin-left: 10px;
    color: #fff;
}
.shareholder-table tr td{
    border-left:1px solid #E2E2E2;
    border-top:1px solid #E2E2E2;
}
.shareholder-table tr:nth-of-type(1){
    background: #F9F9FC;
}
.first{
	width: 100px;
    height: 50px;
    padding-left: 20px;
}
.first2{
	width: 300px;
    height: 50px;
    padding-left: 20px;
}
.second{
	width: 300px;
	color:#5FAEF9;
}
.shareholder-table tr td:nth-of-type(2),.shareholder-table tr td:nth-of-type(3),.shareholder-table tr td:nth-of-type(4),.shareholder-table tr td:nth-of-type(5),.shareholder-table tr td:nth-of-type(6){
    text-align: center;
}
.shareholder-table tr td.active{
    width: 190px;
    height: 50px;
}
.shareholder-table tr td:nth-last-child(1){
	border-right:1px solid #E2E2E2;
}
.shareholder-table tr td{
	border-bottom: 1px solid #E2E2E2;
}
// 右边的广告
.adWrap{
	width: 270px;
	float: right;
}
.adWrap img{
	display: block;
	margin-bottom: 20px;
}
</style>