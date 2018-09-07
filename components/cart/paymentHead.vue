<template>
	<div id="search">
		<div class="search">
			<div class="search_L">
				<div class="search_logo" @click="toHome">
					<img src="/images/logo.png">
				</div>
				<span>{{title}}</span>
			</div>
			<div class="search_R">
				<div class="border_one">
					<div class="border_oneL">
						<span>1</span>
						<span>购物车</span>
					</div>
					<div class="border_oneR">
						<span>2</span>
						<span>确认订单</span>
					</div>
				</div>
				<div class="border_tow">
					<div class="border_oneR">
						<span>3</span>
						<span>支付</span>
					</div>
				</div>
				<div class="border_three" ref="border_three">
					<div class="border_oneR">
						<span ref="check">√</span>
						<span ref="completed">完成</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
	    data() {
		    return {

		    }
	    },
	    props:{
			title:String,
			completed:Boolean
		},
	    methods:{
	    	toHome(){
	    		this.$router.push("/");
	    	},
		},
		watch:{
			completed:{
				handler(newval,oldval){
					if(this.completed){
						this.$refs.border_three.style.border = "2px solid #fc7b03";
						this.$refs.check.style.background = "#fc7b03";
						this.$refs.completed.style.color = "#fc7b03";
					}
				}
			}
		}
	}
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "~assets/common/index.less";
  	@import "~assets/common/common.less";
  	#search{
	    height: 86px;
	    width: 100%;
	    background: #FFF;
	    -moz-box-shadow: 0px 4px 2px 0px #eaeaea; /* 老的 Firefox */
	    box-shadow: 0px 4px 2px 0px #eaeaea;
	}
	.search{
	    width: 1200px;
	    height: 100%;
	    margin: 0 auto;
	}
	.search_L{
	    width: 300px;
	    height: 80px;
	    float: left;
	    .search_logo{
	        width: 120px;
	        height: 45px;
	        margin: 20px 0;
	        cursor: pointer;
	        float: left;
	    }
	    span{
	        font-size: 20px;
	        color: #333;
	        height: 80px;
	        line-height: 80px;
	        margin-left: 20px;
	    }
	}
	.search_R{
	    float: right;
	    width: 420px;
	    height: 50px;
	    margin: 10px 0 0 0;
	    padding: 22px 0;
	    .border_one , .border_tow , .border_three{
	        border: 2px solid #fc7b03;
	        width: 130px;
	        margin-left: 5px;
	        float: left;
	        .border_oneL ,.border_oneR ,{
	            height: 50px;
	            float: left;
	            margin: -10px -16px;
	            position: absolute;
	            span:nth-child(1){
	                margin: 0 auto;
	                display: block;
	                width: 22px;
	                height: 22px;
	                text-align: center;
	                line-height: 22px;
	                color: #FFF;

	                border-radius: 50px;
	                background: #fc7b03;
	            }
	            span:nth-child(2){
	                display: block;
	                color: #fc7b03;
	                margin-top: 5px;
	                text-align: center;
	            }
	        }
	        .border_oneR{
	            height: 50px;
	            margin: -10px 100px;
	            position: absolute;
	        }
	    }
	    .border_tow , .border_three{
	        width: 130px;
	        margin-left: 5px;
	        float: left;
	        border:2px solid #ebebeb;
	        .border_oneL ,.border_oneR{
	            span:nth-child(1){
	                background: #ebebeb;
	            }
	            span:nth-child(2){
	                color: #ccc;
	            }
	        }
	        .border_oneR{
	            margin: -10px 110px;
	        }
	    }
	}
  	#search .border_tow{
        border: 2px solid #fc7b03;
        .border_oneR{
            span:nth-child(1){
                background: #fc7b03;
            }
            span:nth-child(2){
                color: #fc7b03;
            }
        }
    }
    /*支付成功页*/
	#status .border_tow,#status .border_three{
        border: 2px solid #fc7b03;
        .border_oneR{
            span:nth-child(1){
                background: #fc7b03;
            }
            span:nth-child(2){
                color: #fc7b03;
            }
        }
    }
</style>
