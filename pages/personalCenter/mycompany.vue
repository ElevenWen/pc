<template>
  <div class="mycompany">
      <!-- 个人中心公共头部 -->
          <personalCenterHead ref="indexTriangle"></personalCenterHead>
          <publicPendantR></publicPendantR>
      <!-- 公共侧边栏   -->
      <div class="margin1200">
          <personalCenterSlide></personalCenterSlide>
          <!-- 右侧  -->
        <div class="right_frame">
                    <div class="title">
                        <span>我的公司</span>
                        <!-- <input type="text" placeholder="输入公司名称">
                        <button class="search">查询</button> -->
                        <button class="add" @click="add" :disabled="addbtn">
                            <img src="~assets/images/personalCenter/mycompany/新增公司.png" alt="">
                            <span>新增公司</span>
                        </button>
                    </div>
                    <div class="detail">
                        <ul>
                        <li v-for="(item, index) in companyList" :key="item.Id">
                        <div class="top">
                            <div class="left">
                                <div class="img_box">
                                    <img :src="item.BusinessLicensePic" alt="" style="cursor:pointer;" title="点击查看大图" @click="bigImg(this,$event)">
                                    <img :src="item.BusinessLicensePic" alt="" class="bigImgStyle" @click="shrinkImg" title="点击缩小图片">
                                </div>
                            </div>
                            <div class="right">
                                <div class="r_title">
                                    <span class="h3_title">{{item.Name}}</span>
                                    <span class="audit" v-if="item.ReviewStatus==2">审核不通过</span>
                                    <span class="audit" v-if="item.ReviewStatus==0">未审核</span>
                                    <span class="audit Def" v-if="item.IsDefault">默认</span>

                                </div>
                                <p>
                                    <span>纳税人：</span>
                                    <span>{{item.TaxpayersType==1?"小规模纳税人":"一般纳税人"}}</span>
                                </p>
                                <p>
                                    <span>税票地址：</span>
                                    <span class="address">
                                        {{item.CompanyAddress?item.CompanyAddress:'暂无'}} 
                                    </span>
                                </p>
                                <p>
                                    <span>电话：</span>
                                    <span>{{item.Phone}}</span>
                                </p>
                            </div>
                        </div>
                        <div class="bottom">
                            <span :class="item.ReviewStatus==1 && !item.IsDefault ? 'active' : ''">营业执照</span>
                            <span>
	                        		<a @click="toSelectedDefault(item.Id,index)" v-if="item.ReviewStatus==1 && !item.IsDefault">设置默认</a>
	                        		<i v-if="item.ReviewStatus==1 && !item.IsDefault">|</i>
	                            <a href="javascript:void(0)" @click="deleteCompany(this,$event,item.ReviewStatus)">移除</a>
	                            <i>|</i>
	                            <a @click="adit(item.Id)" class="edit_a">编辑</a>
                            </span>
                        </div>
                        <!-- 移除公司弹框 -->
                                <div class="comfirmDel">
                                    <p>
                                        <span>温馨提示</span>
                                        <img src="~assets/images/personalCenter/mycompany/wxts (2).png" alt="" @click="closeModel" class="img_del" style="cursor: pointer;">
                                    </p>
                                <div class="content">
                                    <div class="top">
                                        <img src="~assets/images/personalCenter/mycompany/wenhao.png" alt="">
                                        <div class="right">
                                            <h3>您确定要移除该公司吗？</h3>
                                            <span>你确定要移除该公司吗？移除后对办理服务会带来不便哦！</span>
                                        </div>
                                    </div>
                                    <div class="bottom">
                                        <button class="sure" @click="deleteComfirm(item.Id)">确定</button>
                                        <button class="cancel" @click="closeModel">取消</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                        </ul>
                    </div>
        </div>
      </div>
      <div class="mask" v-show="modelShow">

      </div>
      <publicBottom></publicBottom>
  </div>
</template>

<style lang="less" scoped>
    @import './personalCenter_index.less';
    #slide_myCompany{
		background-color: #ff3e08;
		color: #fff;
	}
    .mycompany{
        position: relative;
    }
    .right_frame .title{
        height: 46px;
        line-height: 46px;
        background-color: #fff;
        border-bottom: 1px solid #ebebeb;
        position: relative;
        span:nth-child(1){
            font-size: 15px;
            margin-left: 19px;
            margin-right: 506px;
        }
        input{
            width: 315px;
            height: 30px;
            border: 1px solid #ebebeb;
            box-sizing: border-box;
            border-radius: 2px 0px 0px 2px;
            margin-right: 11px;
            padding-left: 10px;
            color: #b2b2b2;
        }
        .search{
            width: 45px;
            height: 30px;
            background-color: rgba(53, 154, 248, 1);
            border-radius: 0px 2px 2px 0px;
            border: solid 1px rgba(53, 154, 248, 1);
            color: #fff;
            position: absolute;
            top: 9px;
            right: 115px;
        }
        .add {
            width: 90px;
            height: 30px;
            background-color: rgba(53, 154, 248, 1);
            border-radius: 2px 2px 2px 2px;
            border: solid 1px rgba(53, 154, 248, 1);
            color: #fff;
            margin-left: 312px;
            line-height: 0;
        }
    }
    .detail{
        margin-bottom: 20px;
        
        ul{
            li{
                margin-bottom: 20px;
                background-color: #fff;
                padding:20px 0 0 20px;
                height: 160px;
                .top{
            width: 100%;
            overflow: hidden;
            margin-bottom: 8px;
            /*&:hover{
                .setDef{
                    display: inline-block !important;
                }
            }*/
            .left{
                float: left;
                width: 119px;
                height: 102px;
                .img_box{
                    width: 100px;
                    height: 100px;
                     /*border: 1px solid #ccc;*/
                    img{
                    width: 100px;
                    height: 100px;
                    margin-right: 19px;
                    }
                }
            }
            .right{
                float: left;
                .r_title{
                     margin-bottom: 10px;
                     height: 21px;
                    .h3_title{
                        font-size: 16px;
                        color: #333333;
                        margin-right: 10px;
                    }
                    .audit{
                        display: inline-block;
                        height: 21px;
                        line-height: 21px;
                        font-size: 12px;
                        color: #4db61a;
                        top: 2px;
                        right: -44px;
                    }
                    .Def{
                        padding: 0px 6px;
                        background-color: #ff3e08;
                        color: #fff;
                        border-radius: 2px;
                    }
                    /*.setDef{
                        display: none;
                        cursor: pointer;
                        color: #ff3e08;
                    }*/
                }
                p{
                    line-height: 20px;
                    font-size: 11px;
                    margin-bottom: 2px;
                    color: #666;
                    span:nth-child(1){
                        color: #999;
                    }
                    .address{
                        position: relative;
                            img{
                            vertical-align: middle;
                        }
                            a{
                                color: #359af8;
                                position: absolute;
                                top:-1px;
                                right: 8px;
                                cursor: pointer;
                                &.active{
                                    color: #fff;
                                }
                            }
                    }
                    
                }
                
            }
        }
        .bottom{
            span:nth-child(1){
                font-size: 11px;
                color: #666;
                margin-left: 26px;
                margin-right: 820px;
            }
            span.active{
            	margin-right: 770px;
            }
            span{
                i{
                    color: #30a1f8;
                    margin: 0 4px;
                    font-size: 11px;
                }
                a{
                    color: #30a1f8;
                    font-size: 12px;
                    cursor: pointer;
                }
            }
        }
            }
        }
    }
    .edit_a{
        cursor: pointer;
    }
    /*移除公司模态框样式*/
    .comfirmDel{
        display: none;
        width: 380px;
        height: 239px;
        background-color: #fff;
        z-index: 1200;
        position: absolute;
        left: 50%;
        top: 15%;
        margin-left: -190px;
        p{
            height: 40px;
            line-height: 40px;
            background-color: rgba(252, 252, 253, 1);
            padding-left: 19px;
            border-bottom: 1px solid #eee;
            margin-bottom: 39px;
            span{
                font-size: 15px;
                margin-right: 259px;
            }
        }
        .content{
            .top{
                padding-left: 40px;
                position: relative;
                height: 70px;
                .right{
                    position: absolute;
                    left: 100px;
                    top:0;
                    span{
                        display: inline-block;
                        width: 228px;
                        line-height: 22px;
                        font-size: 12px;
                        color: #8c8c8c;
                    }
                    h3{
                        font-size: 16px;
                        color: 333;
                        margin-bottom: 10px;
                    }
                }
            }
            .bottom{
                margin-top: 22px;
                padding-left: 99px;
                button{
                    width: 80px;
                    height: 30px;
                    margin-right: 16px;
                }
                .sure{
                    background-color: #ff3e08;
                    color: #fff;
                }
                .cancel{
                    border: solid 1px #e6e6e6;
                }
            }
        }
    }
    /*遮罩层样式*/
    .mask{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color:rgba(0, 0, 0, .5);
        z-index: 1100;
    }
    .bigImgStyle{
        position: absolute;
        top: 10%;
        left: 25%;
        z-index: 200;
        width: 50% !important;
        height: 50% !important;
        display: none;
        cursor: pointer;
    }
    .mycompany /deep/ .el-button{
        padding: 0;
        border: none;
    }
</style>


<script>
import personalCenterHead from '~/components/common/personalCenterHead'
import personalCenterSlide from "~/components/common/personalCenterSlide"
import publicBottom from '~/components/common/publicBottom'
import publicPendantR from '~/components/common/publicPendantR'
import getData from '~/store/ajaxAPI/getData.js'
export default {
  data(){
      return{
          //公司列表
          companyList:[],
          //模态框显示隐藏
          modelShow:false,
          //新增公司是否可点击
          addbtn:false
      }
  },
  mounted(){
      this.getList();
  },
  updated(){
	  this.$refs.indexTriangle.$refs.indexTriangle.style.display = 'block';
  },
  methods:{
      //获取公司列表
      getList(){
          getData.mycompanyList().then(response=>{
            //   //console.log('成功',response.data)
            this.companyList=response.data
        }).catch(err=>{
            //console.log(err)
        })
      },
    //删除公司弹框-只有还没审核的能点击移除
    deleteCompany(data,data1,ReviewStatus){
        if(ReviewStatus==0||ReviewStatus==2){
            this.modelShow = true
            $(data1.target).parent().parent().siblings('.comfirmDel').css({"display":"block"})
        }else if(ReviewStatus==1){
            this.$message.error('公司已审核成功，不能移除')
        }
    },
    //确认删除
    deleteComfirm(companyId){
        //console.log(companyId)
        var params = {
            id:companyId
        }
        this.modelShow = false;
        $('.comfirmDel').css({"display":"none"})
        getData.deleteCompany(params).then(res=>{
            this.getList();
        }).catch(err=>{
            //console.log(err)
        })
    },
    //关闭模态框
    closeModel(){
        this.modelShow = false;
        $('.comfirmDel').css({"display":"none"})
    },
    //点击编辑传id
    adit(id){
        this.$router.push({path: '/personalCenter/myCompanyModify', query: {Id: id}});
    },
    //点击新增公司
    add(){
        if(this.companyList.length >= 5){
            this.addbtn = true;
            this.$message({
                message: '公司不能超过五个',
                type: 'warning'
            });
            // alert('公司不能超过五个')
            this.addbtn = false;
        }else{
            this.$router.push({path: '/personalCenter/myCompanyModify'})
        }
    },
    //点击放大图片
    bigImg(data,data1){
        $(data1.target).siblings('.bigImgStyle').css('display','block')
    },
    //缩小图片
    shrinkImg(){
        $('.bigImgStyle').css('display','none')
    },
    //设置默认公司
    toSelectedDefault(id,i){
    	let params = {
    		Id:id
    	}
    	getData.setDefault(params)
    	.then((res)=>{
    		//强制渲染数据处理，防止数据不更新
    		this.companyList.forEach((val,index)=>{
    			if(index != i){
    				val.IsDefault = false
    			}else{
    				val.IsDefault = true
    			}
    		})

    		this.$message({
	        message: '设置成功',
	        type: 'success'
        });
    	})
    }
  },
  components:{
      personalCenterHead,
      personalCenterSlide,
      publicBottom,
      publicPendantR
  }
}
</script>

