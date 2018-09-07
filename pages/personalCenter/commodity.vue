<template>
  <div class="commodity">
      <!-- 个人中心公共头部 -->
          <personalCenterHead></personalCenterHead>
          <!-- 公共侧边 -->
          <div class="particulars">
              
              <div class="margin1200">
	    	<div class="location"><nuxt-link to="/personalCenter/personalCenterIndex">我的微企宝</nuxt-link> &gt; <nuxt-link to="/personalCenter/allOrder">订单中心</nuxt-link> &gt; <span>商品评价</span></div>
	    	<div class="evaluate">
	    		<div class="evaluate_left">
	    			<!-- <span><img src="~assets/images/personalCenter/order/products_Right1.png"></span> -->
	    			<span><img :src="product.PCPosterImgURL?product.PCPosterImgURL:product.PosterImgURL"></span>
	    			<span>{{product.Name}}</span>
	    			<span>￥{{product.Price}}</span>
	    			<span>{{commodityNum}}人评价</span>
	    		</div>
	    		<div class="evaluate_right">
	    			<table class="commodity_evaluate">
	    				<tbody>
		    				<tr>
		    					<td class="commodity_name">商品满意度</td>
	                            <td class="commodity_text">
	                                <el-rate v-model="value3" show-text :texts="text">
	                                </el-rate>
	                                <i class="score">分</i>
	                            </td>
	                                
		    				</tr>
		    				<tr>
		    					<td class="commodity_name">买家印象</td>
		    					<td class="commodity_text add_custom">
									<span class="act" v-for="(items,index) in LableArr" :key="index" @mouseenter='openX(this,$event,index)' @mouseleave="closeX(this,$event)">{{items}}<i @click="handleClose(index)">x</i></span>
	                                <!-- <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)" class="act">
	                                {{tag}}
	                                </el-tag> -->
	                                <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" @focus="tipsShow" :maxlength="5">
	                                </el-input>
	                                <el-button v-else class="button-new-tag" size="small" @click="showInput">
	                                    <img src="~assets/images/personalCenter/order/bianji.png">自定义标签
	                                </el-button>
		    					</td>
		    				</tr>
		    				<tr class="verification_hint">
		    					<td colspan="2">
		    						<span v-if="notice"><img src="~assets/images/personalCenter/order/err_tip.png">&nbsp;&nbsp;请填写1-5个字，两个数字或字母算1个字</span>
		    						<span v-if="errNotice"><img src="~assets/images/personalCenter/order/err_tip.png">&nbsp;&nbsp;输入错误，请重新输入</span>
		    						<span class="noMore"><img src="~assets/images/personalCenter/order/err_tip.png">&nbsp;&nbsp;亲！最多只能填写五个自定义标签标签</span>
	                                <span v-show="checkTag" class="checkTag"><img src="~assets/images/personalCenter/order/err_tip.png">&nbsp;&nbsp;亲！最多能打五个标签</span>
		    					</td>
		    				</tr>
		    				<tr>
		    					<td class="commodity_name">评价晒单</td>
		    					<td class="commodity_text">
										<div class="layui-form-item layui-form-text">
										  <div class="layui-input-block">
											<textarea placeholder="商品是否给力？快来分享您的购物心得！" class="layui-textarea" :maxlength="200"  v-model="textContent"></textarea>
											<span class="count"><a id="v" style="font-size: 12px">{{commodityLength}} </a>/ 200字评论</span>
										  </div>
										</div>
										<div class="layui-form-item">
										  <div class="layui-input-block">
											<button class="layui-btn" @click="submitCommend">发表评论</button>
	                                        <el-checkbox v-model="checked" >匿名评价</el-checkbox>
										  </div>
									  </div>
	    						</td>
		    				</tr>
	    				</tbody>
	    			</table>
	    			
	    		</div>
	    	</div>
		</div>
          </div>
          <publicBottom></publicBottom>
  </div>
</template>

<style lang="less" scoped>
 @import './personalCenter_index.less';
 @import './commodity.less';
 .el-rate{
     display: inline-block;
 }
 i,.el-rate__text{
     font-size: 18px;
     color: #ff3e08;
 }
 .layui-btn{
     margin-right: 14px;
 }

</style>


<script>
import personalCenterHead from '~/components/common/personalCenterHead'
import publicBottom from '~/components/common/publicBottom'
import getData from '~/store/ajaxAPI/getData.js'
export default {
  data(){
      return{
          checked: true,
          inputVisible: false,
          inputValue: '',
          dynamicTags: [],
          notice:false,
          errNotice:false,
          value3: 0,
          text:['2', '4', '6', '8', '10'],
          checkTag:false,
          num:0,
          textContent:'', 
          LableArr:[], //标签数组
          product:'',  //商品数据
          commodityNum:'', //评论总数
          originArr:''  //原本的标签数
      }
  },
  mounted(){
      this.TagClick();
      this.showProduct();
      this.GetLable();
      this.ProReview();
  },
  updated(){
      this.TagClick();
  },
  methods:{
      //鼠标移入出现X
      openX(data,data1,index){
          //console.log(index,this.originArr)
          if(index>=this.originArr){
              $(data1.target).children('i').css('display','block')
          }
      },
      //鼠标移除X消失
      closeX(data,data1){
              $(data1.target).children('i').css('display','none')
      },
      //删除自定义标签的回调
      handleClose(tag) {
        this.LableArr.splice(tag, 1);
      },
      //点击显示自定义输入框
      showInput() {
          this.checkTag = false;
          if($('.act').length - this.originArr>=5){
              $('.verification_hint').css('display','block')
              $('.verification_hint .noMore').css('display','block')
              return;
          }
        this.noMore = false;
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      //自定义标签失去焦点时的回调  
      handleInputConfirm() {
        this.notice = false;  
        var inputValue = this.inputValue;
        //判断输入的字符长，1-5个字，两个数字或字母算1个字
        var len = 0;
        for (var i = 0; i < inputValue.length; i++) {
                var a = inputValue.charAt(i);
                if (a.match(/[^\x00-\xff]/ig) != null) {
                    len += 2;
                }
                else {
                    len += 1;
                }
            }
        if(len>10){
            $('.verification_hint').css('display','block')
            this.errNotice = true;
            return
        }
        $('.verification_hint').css('display','none')
        if (inputValue) {
        //   this.dynamicTags.push(inputValue);
            this.LableArr.push(inputValue)
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      //标签点击事件
      TagClick(){
        //   //console.log('触发标签点击')
          $('.act').off('click').on('click',function(){
              //console.log('什么设呢么',$(this))
              if($(this).hasClass('acti')){
                  $(this).removeClass('acti')
                  this.notice = false;
                  $('.verification_hint .noMore').css('display','none')
                  $('.verification_hint .checkTag').css('display','none')
                  $('.verification_hint').css('display','none')
              }else{
                  if($('.acti').length>=5){
                  $('.verification_hint').css('display','block')
                  $('.verification_hint .checkTag').css('display','block')
                  $('.verification_hint .noMore').css('display','none')
                //   this.noMore = false;
                  this.notice = false;
                  this.errNotice = false;
                  return;
                }
               $(this).addClass('acti')
              }
          })
      },
      //自定义标签输入时出现的提示
      tipsShow(){
          if(this.inputValue.length>5){
              //console.log('hahah')
              this.notice = false;
              this.errNotice = true;
              $('.verification_hint .checkTag').css('display','none')
              $('.verification_hint .noMore').css('display','block')
          }
          $('.verification_hint').css('display','block')
          this.notice = true;
          this.errNotice = false;
          $('.verification_hint .checkTag').css('display','none')
          $('.verification_hint .noMore').css('display','none')
      },
    //展示商品信息
    showProduct(){
        var params={
            Id:this.$route.query.id,
            type:this.$route.query.type,
            dataType:'json'
        }
        if(params.type=='0'){
            getData.getProductInfo(params).then(res=>{
                //console.log(res.data)
                this.product = res.data;
            }).catch(err=>{
                //console.log(err)
            })
        }else if(params.type=='1'){
            getData.GetProckageInfoById(params).then(res=>{
                //console.log(res.data)
                this.product = res.data;
            }).catch(err=>{
                //console.log(err)
            })
        }
        
    },
    //获取商品已有标签
    GetLable(){
        var params = {
            productId:this.$route.query.id,
            dataType:'json'
        }
        getData.GetLable(params).then(res=>{
            if(res.data.length==0){
                this.LableArr = []
            }else{
                this.LableArr = res.data;
            }
            this.originArr = res.data.length;
        }).catch(err=>{
            //console.log(err)
        })
    },
    //获取评论总数
    ProReview(){
        var params={
            productId:this.$route.query.id,
            type:this.$route.type,
            dataType:'json'
        }
        getData.ProReview(params).then(res=>{
            //console.log('评论总数',res.data)
            this.commodityNum = res.data.list.length
            // this.commodityNum = res.data.
        }).catch(err=>{
            //console.log(err)
        })
    },
    //提交评论
    submitCommend(){
        if(this.value3==''||this.textContent==''){
            // alert('评分和评价内容不能为空，请填写！')
            this.$message.error('评分和评价内容不能为空，请填写！');
            return;
        }
        //选中的标签
        let checkedArr = $('.acti');
        let tagStr = '';
        for(var i=0;i<checkedArr.length;i++){
           tagStr += checkedArr[i].innerText + '|';
        }
        tagStr = tagStr.substr(0,tagStr.length-1);
        let paramas = {
            lable:tagStr,
            reviewType:this.checked,
            star:this.value3,
            content:this.textContent,
            productId:this.$route.query.id,
            orderId:this.$route.query.orderId,
            dataType:'json'
        }
        getData.CreateOrEdit(paramas).then(res=>{
            this.$message({
                message: '评论发表成功',
                type: 'success'
            });
            // alert('评论发表成功')
            this.$router.back(-1);
        }).catch(err=>{
            //console.log(err)
            // this.$router.back(-1);
        })
    },
  },
  computed:{
      //输入的字数
      commodityLength: function () {
          var str = this.textContent;
          if(str.length <= 200){
              return 200-str.length;
          }else {
            return 0
          }
      }
  },
  components:{
   personalCenterHead,
   publicBottom,
  }
}

</script>

