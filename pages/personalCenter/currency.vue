<template>
    <div class="c-header" id="currency">
        <!-- 个人中心公共头部 -->
          <personalCenterHead ref="indexTriangle"></personalCenterHead>
		  <publicPendantR></publicPendantR>
      <div class="margin1200">
          <personalCenterSlide></personalCenterSlide>
          <div class="right_frame">
	    		<div class="balance_top">
	    			<div class="top1" id="top1">
	    				<h1>我的记账币</h1>
                        <span class="jzwindow" @click="coinGuide"></span>
	    				<p class="num">{{currency?currency:0}}</p>
	    			</div>
	    			<div class="top2">
	    				<h4>我的其它资产</h4>
	    				<p>
	    					我的积分：
	    					<span>{{integral}}</span>
	    					分
	    					<nuxt-link to="/personalCenter/integral">管理</nuxt-link>
	    				</p>
						<p>
	    					我的余额：
	    					<span>{{balance?balance:0}}</span>
	    					元
	    					<nuxt-link to="/personalCenter/balance">管理</nuxt-link>
	    				</p>
	    				<!-- <p>我的银行卡：<span>0</span>张<a href="">管理</a> </p> -->
	    			</div>
	    			<div class="top3" @click="czBtn">
	    				<div class="buttom_charge">使用</div>
	    			</div>
	    		</div>
	    		<div class="bottom_piece">
	    			<div class="bottom_list">
						<div class="list_title">
							<span>记账币明细</span>
						</div>
	    				<p :class="isShowRed ? 'redColor' : 'blackColor'" @click="record">最近交易记录</p>
						<p :class="isShowRedI ? 'redColor' : 'blackColor'" @click="income">收入</p>
						<p :class="isShowRedE ? 'redColor' : 'blackColor'" @click="expenditure">支出</p>
						<div class="container_title">
							<span class="timerr">产生时间</span>
							<span class="sourceRecord">来源/用途</span>
							<span class="money">记账币</span>
							<span class="status">状态</span>
						</div>
						<div class="balance_container">
							<ul>
								<li v-for="(item,index) in TransactionDetail" :key="item.Id">
									<span>
										{{(item.CreateTime).substring(6,(item.CreateTime).lastIndexOf(")")) | formatDateFn}}
									</span>
									<span>
										{{item.Reason}}
									</span>
									<span>
										{{item.Type==0?'+'+item.Coin:-item.Coin}}
									</span>
									<span class="state_span">
										{{item.State == true ?'交易成功':'交易失败'}}
									</span>
								</li>
							</ul>
						</div>
						<!-- 无交易明细展示时 -->
						<div class="emptyWrap" v-if="TransactionDetail.length == 0">
							<img src="~assets/images/businessQuery/search_define.png" class="empty">
							<div>暂无数据</div>
						</div>
	    			</div>
					<div class="pagination">
						<el-pagination v-if="CountPage"
						@current-change="handleCurrentChange"
						background layout="prev, pager, next" :total="CountPage" 
						:current-page="NowPage"
            			:page-size="pagesize"
						prev-text='上一页' next-text='下一页'>
						</el-pagination>
					</div>
	    		</div>
				<!-- <div class="pagination">
						<el-pagination v-if="CountPage"
						@current-change="handleCurrentChange"
						background layout="prev, pager, next" :total="CountPage" 
						:current-page="NowPage"
            			:page-size="pagesize"
						prev-text='上一页' next-text='下一页'>
						</el-pagination>
					</div> -->
	    	</div>
      </div>
      <div class="c-ftContainWrapindex">
					<publicBottom></publicBottom>
	  </div>
	  <div class="mask">
		  <div class="comfirmDel">
             <p>
                 <span>温馨提示</span>
                 <img src="~assets/images/personalCenter/mycompany/wxts (2).png" alt="" @click="closeModel" class="img_del" style="cursor: pointer;">
             </p>
         <div class="content">
             <div class="top">
                 <img src="~assets/images/personalCenter/asset/integral/icon.png" alt="">
                 <div class="right">
                     <!-- <h3>您确定要移除该公司吗？</h3> -->
                     <span>目前仅支持APP充值/提现，你可下载微企宝APP进行相关操作</span>
                 </div>
             </div>
             <div class="bottom">
                 <button class="cancel" @click="closeModel">确定</button>
             </div>
         </div>
     	</div>
	  </div>
    </div>
</template>

<style lang="less" scoped>
@import "./personalCenter.less";
.margin1200 {
  margin: auto;
	width: 1200px;
	overflow: hidden;
	margin-top: 10px;
}
.c-ftContainWrapindex{
	margin-top: 100px;
}
.balance_top{
	height: 140px !important;
	#top1{
		h1{
            display: inline-block;
			font-size: 16px;
		}
		.num{
			font-size: 30px;
			color: #ff3e08;
				span{
					font-size: 22px;
				}
		}
	}
}
.balance_top .top3{
	width: 340px;
	cursor: pointer;
}
.bottom_piece{
	background-color: #fff;
    margin-top: 20px;
	.bottom_list{
		margin-bottom: 24px;
		border-bottom: 1px solid #eee;
		.list_title{
			height: 40px;
			line-height: 40px;
			padding-left: 5px;
			border-bottom: 1px solid #eee;
			span{
				display: inline-block;
				width: 90px;
				height: 35px;
				line-height: 35px;
				text-align: center;
				background: url(~assets/images/personalCenter/asset/balance/title_bg.png) no-repeat;
			}
		}
		.container_title{
			width: 1020px;
			height: 40px;
			background: #f4f4f4;
			border-top: 1px solid #ebebeb;
			line-height: 40px;
			display: flex;
			span{
				color: #333;
				flex: 1;
				text-align: center;
			}
			// .timerr{
			// 	margin-left: 74px;
			// }
		}
		p{
			display:inline-block;
			height: 40px;
			line-height: 40px;
			padding-left: 30px;
			font-size: 12px;
			color: #666;
			cursor: pointer;
		}
		.redColor{
			color: red;
		}
		.blackColor{
			color: #666;
		}
		.balance_container{
			ul{
				overflow: hidden;
				li{
					height: 40px;
					line-height: 40px;
					padding-left: 73px;
					border-top: 1px solid #eee;
					font-size: 12px;
					span:nth-child(1){
						margin-right: 158px;
					}
					span:nth-child(2){
						display: inline-block;
						width: 265px;
					}
					span:nth-child(3){
						display: inline-block;
						width: 250px;
					}
				}
			}
		}
	}
}
.comfirmDel{
        display: none;
        width: 380px;
        height: 239px;
        background-color: #fff;
        z-index: 1200;
        position: absolute;
        left: 50%;
        top: 30%;
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
                    margin-left: 48px;
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
		display: none;
    }
.el-pagination{
	text-align: center;
	padding-bottom: 26px;
}
.jzwindow{
    display: inline-block;
    width: 20px;
    height: 16px;
    background: url("../../assets/images/cart/order/coinInfOne.png");
    margin-left: 5px;
    cursor: pointer;
}
// 无交易明细时
.emptyWrap{
	height: 632px;
	.empty{
		width: 246px;
		height: 216px;
		margin: 14% 0 3% 33%;
	}
	div{
		margin-left: 42%;
    	font-size: 16px;	
	}
}
</style>


<script>
import personalCenterHead from "~/components/common/personalCenterHead";
import personalCenterSlide from "~/components/common/personalCenterSlide";
import publicBottom from '~/components/common/publicBottom'
import publicPendantR from '~/components/common/publicPendantR'
import getData from '~/store/ajaxAPI/getData.js'
import fmt from '~/assets/lib/tool.js'
export default {
	data() {
		return {
			myScore:'',
			Balance:'',
			TransactionDetail:[], //交易详情数据
			CountPage:'',   //总商品条数
			NowPage: 1,     //当前页数
			pagesize: 10,   //每页条数
			isShowRed:true, //交易记录是否显示红色
			isShowRedE:false, //支出是否显示红色
			isShowRedI:false, //收入是否显示红色
			balance:"", //余额
			integral:"", //积分
			currency:"", //记账币
			currentIndex:"", 
		};
	},
	mounted(){
		this.totalInfo();
		this.GetCustomerBalance();
		//   获取交易明细接口  2 == 全部数据
		this.GetTransactionDetail("2");
		this.$refs.indexTriangle.$refs.indexTriangle.style.display = 'block';
	},
	updated(){
	//	  this.$refs.indexTriangle.$refs.indexTriangle.style.display = 'block';
	},
	methods:{
		//记账使用规则
			coinGuide(){
				this.$alert('1.记账币仅限购买的“智能云记账”产品，不可用于购买其它产品；<br/>2.记账币也可用于帮他人代付“智能云记账”产品；', '记账币使用规则', {
					confirmButtonText: '我知道了',
					dangerouslyUseHTMLString: true,
					customClass:'popup',
					callback: action => {
					
					}
				});
			},
		//弹出模态框
		czBtn(){
			// $('.comfirmDel').css({"display":"block"})
			// $('.mask').css({"display":"block"})
			this.$router.push("/productList?typeIndex=0&productName=All");
		},
		//关闭模态框
		closeModel(){
			this.modelShow = false;
			$('.comfirmDel').css({"display":"none"})
			$('.mask').css({"display":"none"})
		},
		// 获取积分余额、记账币、积分总额
		totalInfo(){
			getData.GetMyAssets().then((res) => {
				this.balance = res.data.Balance;
				this.integral = res.data.Score;
				this.currency = res.data.Coin;
			})
		},
		//获取账户总余额
		GetCustomerBalance(){
			getData.GetCustomerBalance().then(res=>{
				// //console.log('余额',res.data)
				this.Balance = res.data.Balance;
			}).catch(err=>{
				//console.log(err)
			})
		},
		//获取交易明细
		GetTransactionDetail(type){
			if(type == "0"){ //收入
				this.currentIndex = 0;
				var params = {
					params : {
						type : 0,
						pageIndex: this.NowPage,
						pageSize: 5,
					}
				}
				getData.getCoinRecord(params).then((res) => {
					this.TransactionDetail = res.data.list;
					this.CountPage = res.data.recordCount;
				}).catch(err=>{
//					console.log(err)
				})
			}else if(type == "1"){ //支出
				this.currentIndex = 1;
				let params = {
					params : {
						type : 1,
						pageIndex: this.NowPage,
						pageSize: 5,
					}
				}
				getData.getCoinRecord(params).then((res) => {
					this.TransactionDetail = res.data.list;
					this.CountPage = res.data.recordCount;
				}).catch(err=>{
//					console.log(err)
				})
			}else if(type == "2"){ //全部数据
				this.currentIndex = 2;
				let params = {
					params : {
						type : "",
						pageIndex: this.NowPage,
						pageSize: 5,
					}
				}
				getData.getCoinRecord(params).then((res) => {
					this.TransactionDetail = res.data.list;
					this.CountPage = res.data.recordCount;
				}).catch(err=>{
//					console.log(err)
				})
			}
		},
		handleCurrentChange(val) {
			this.NowPage = val;
			////console.log(`当前页: ${val}`);
			if(this.currentIndex == 0){
				this.GetTransactionDetail("0");
			}else if(this.currentIndex == 1){
				this.GetTransactionDetail("1");
			}else if(this.currentIndex == 2){
				this.GetTransactionDetail("2");
			}
		},
		record(){ //交易记录
			this.isShowRed = true;
			this.isShowRedI = false;
			this.isShowRedE = false;
			this.NowPage = 1;
			this.GetTransactionDetail("2");
		},
		// 收入
		income(){
			this.isShowRed = false;
			this.isShowRedI = true;
			this.isShowRedE = false;
			this.NowPage = 1;
			this.GetTransactionDetail("0");
		},
		// 支出
		expenditure(){
			this.isShowRed = false;
			this.isShowRedE = true;
			this.isShowRedI = false;
			this.NowPage = 1;
			this.GetTransactionDetail("1");
		},
	},
	computed:{
		//计算当前显示页的商品数组
		productLists: function(){
			return this.TransactionDetail.slice((this.NowPage-1)*this.pagesize,this.NowPage*this.pagesize)
		},
	},
	components: {
		personalCenterHead,
		personalCenterSlide,
		publicBottom,
		publicPendantR
	},
	filters:{
      formatDateFn:value =>{
          return fmt.formatDate(value,"yyyy-MM-dd hh:mm:ss")
      }
  	}
};
</script>
