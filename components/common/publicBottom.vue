<template>
  <!--公共底部-->
  <div class="c-ftWrap" id="footindex" >
    <div class="c-ft">
      <ul class="c-ft-item">
        <li class="c-ft-items">
          <dl class="c-ft-itemsCont">
            <dt class="title">公司信息</dt>
            <dd class="des">
              <nuxt-link to="/inRegardTo/inRegardTo?style=0" rel="nofollow">关于公司</nuxt-link>
            </dd>
            <dd class="des">
              <nuxt-link to="/inRegardTo/inRegardTo?style=1" rel="nofollow">招聘信息</nuxt-link>
            </dd>
            <dd class="des">
              <nuxt-link to="/inRegardTo/inRegardTo?style=3" rel="nofollow">联系我们</nuxt-link>
            </dd>
          </dl>
        </li>
        <li class="c-ft-items">
          <dl class="c-ft-itemsCont">
            <dt class="title">产品与服务</dt>
            <dd class="des">
              <a>产品特性</a>
            </dd>
            <dd class="des">
              <a>服务协议</a>
            </dd>
          </dl>
        </li>
        <li class="c-ft-items">
          <dl class="c-ft-itemsCont">
            <dt class="title">联系我们</dt>
            <dd class="des">
              <a>电话：400-8822-991</a>
            </dd>
            <dd class="des">
              <a>邮箱：markting@wqbol.com</a>
            </dd>
            <dd class="des">
              <a>Q&nbsp;Q：3452083279</a>
            </dd>
          </dl>
        </li>
        <li class="c-ft-items">
          <dl class="c-ft-itemsCont">
            <dt class="title">帮助中心</dt>
            <dd class="des">
              <nuxt-link to="/loginAndRegister/forgetPassword" rel="nofollow">找回密码</nuxt-link>
            </dd>
            <dd class="des">
              <nuxt-link to="/helpCenter/helpCenter" rel="nofollow">常见问题</nuxt-link>
            </dd>
            <dd class="des">
              <nuxt-link to="/helpCenter/helpCenter" rel="nofollow">意见反馈</nuxt-link>
            </dd>
          </dl>
        </li>
        <li class="c-ft-items">
          <div class="hotline">
            <p class="title">客服热线</p>
            <p class="title">400-8822-991</p>
            <p class="title active">友情链接</p>
            <a target="_blank" href="https://m.kuaidi100.com/" class="title">快递查询</a>
          </div>
          <div class="wx">
            <img src="~assets/images/tabBar/code.jpg" alt="">
          </div>
          <div class="QR_code_R">
            <span>扫描二维码</span>
            <span>关注微企宝官方微信</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="c-rongcan">
      <p>微企宝提供：深圳集团公司注册代理、深圳前海公司登记注册、深圳前海公司注册代办、深圳前海注册工单代理、深圳资本变更、深圳代理注销公司</p>
      <p>Copyright &copy; 2017-2018 深圳微企宝计算机系统有限公司-深圳微企宝计算机系统有限公司-注册深圳市公司|注册深圳前海公司|深圳前海注册公司代理 <a target="_blank" href="http://www.miitbeian.gov.cn/">粤ICP备16123131号-1</a></p>
      <!--<p>Copyright&nbsp;©&nbsp;2010&nbsp;-&nbsp;2017&nbsp;JuanPi.com&nbsp;All&nbsp;Rights&nbsp;Reserved</p>-->
    </div>
  </div>
</template>

<script>
  export default {
    mounted(){
      (function(){
          var bp = document.createElement('script');
          var curProtocol = window.location.protocol.split(':')[0];
          if (curProtocol === 'https') {
              bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
          }
          else {
              bp.src = 'http://push.zhanzhang.baidu.com/push.js';
          }
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(bp, s);
      })();
    }
  }
</script>

<style lang="less" type="stylesheet/css" scoped>
@import "~assets/common/common.less";
.c-ftWrap .c-ft .c-ft-item .c-ft-items .des{
  padding-left: 0;
}
.c-rongcan a{
	color: #666;
}
.hotline a{
	font-size: 12px !important;
  color: #333;
}
.hotline .active{
	margin-top: 13px;
	margin-bottom: 10px !important;
}
.hotline a:hover{
	color: red;
}
</style>
