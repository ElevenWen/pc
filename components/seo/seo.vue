<style type="stylesheet/css" scoped lang="less">
 
</style>

<template>
  <div id="seo">
     <div> </div>
  </div>
</template>

<script>
//	import publicPendantR from "~/components/common/publicPendantR";
//	import navigationBar from "~/components/common/navigationBar";
//	import publicBottom from "~/components/common/publicBottom";
//	import topAdvertising from "~/components/common/topAdvertising";
	import getD from "~/store/ajaxAPI/getData";
	import { mapState,mapActions,mapGetters} from 'vuex';
//import {setStore,getStore,removeStore} from '~/plugins/util/storage'
//	import {MonitorLogin} from '~/assets/lib/isLogin'
	import CryptoJS from 'crypto-js'
	var count = 0;
	var lunboTimeIdOne = null;
	var lunboTimeIdTwo = null;
	var lunboTimeIdThird = null;
	var  ii = 1 ;
	var  jj = 1 ;
	var  xx = 1 ;
	export default {
    data() {
	    return {
				 Description:'',
				 KeyWords:"",
				 Title:'',
	    }
    },
     head () {
	    return {
	      title: this.Title,
	      meta: [
					{ hid: 'description', name: 'description', content: this.Description },
					{ hid: 'keyword', name: 'keyword', content: this.KeyWords },
					
		  ],
	    }
		},
		props:['code'],
    asyncData (context) {
        // console.log('getdddddddddddddd')
        // return getD.commonMeta('get').then((res)=>{
        //     console.log(res)
        //     console.log(res.data.list.Description);
                
        //         return { abc123: res.data.list.Description }
        // })
        return {bb: '111111111111111111111111111111111',
								 cc :'ccccccccccccc'
							 } 
    },
      mounted(){
			// console.log( this.code )
			var params = {
				params:{
					code:this.code,//根据数据字典传递：商品-Product,套餐-Package，新闻-News，首页—Index
					tempId: Boolean(this.$route.query.id)?this.$route.query.id:'',//商品/套餐/新闻Id
				}
			}
			getD.commonMeta(params).then((res)=>{
				// console.log('seo')
				// console.log(res);
				var data = res.data.list[0]
				this.Description = data.Description
				this.KeyWords =  data.KeyWords
				this.Title =  data.Title
			})

    },
   
}

</script>



