<template>
    <div>
        <h3>签章</h3>
        <!-- <div v-html="text"></div> -->
        <iframe class="iframe" src='http://test.api.fabigbig.com:8888/api/extsign.api?app_id=401007&timestamp=20180408150940&transaction_id=Y123456789sssssssss&contract_id=BH1234567890&client_type=client_type&customer_id=2EF38B01B964836C878235086C3C2774&doc_title=%e6%b7%b1%e5%9c%b3%e5%be%ae%e4%bc%81%e5%ae%9d%e8%ae%a1%e7%ae%97%e6%9c%ba%e7%b3%bb%e7%bb%9f%e6%9c%89%e9%99%90%e5%85%ac%e5%8f%b8%e5%90%88%e5%90%8c&return_url=http://112.74.135.230:3215//FddApi/Synchronous&notify_url=http://112.74.135.230:3215//FddApi/Asynchronous&msg_digest=RjI1M0RBOTk1RkFBRTI5NjZDMDhDNzA3MjlGNkNCRTA3MUIxNjhGNA==' frameborder="0"></iframe>
    </div>
</template>

<style>
.iframe {
  width: 100%;
  height: 100%;
  border: 0;
  overflow: hidden;
  box-sizing: border-box;
}
body{
    height:100%;
}
</style>

<script>
    export default {
        data(){
            return {
                text:'http://test.api.fabigbig.com:8888/api/extsign.api?app_id=401007&timestamp=20180408150940&transaction_id=Y123456789sssssssss&contract_id=BH1234567890&client_type=client_type&customer_id=2EF38B01B964836C878235086C3C2774&doc_title=%e6%b7%b1%e5%9c%b3%e5%be%ae%e4%bc%81%e5%ae%9d%e8%ae%a1%e7%ae%97%e6%9c%ba%e7%b3%bb%e7%bb%9f%e6%9c%89%e9%99%90%e5%85%ac%e5%8f%b8%e5%90%88%e5%90%8c&return_url=http://112.74.135.230:3215//FddApi/Synchronous&notify_url=http://112.74.135.230:3215//FddApi/Asynchronous&msg_digest=RjI1M0RBOTk1RkFBRTI5NjZDMDhDNzA3MjlGNkNCRTA3MUIxNjhGNA=='
            }
        }
    }
</script>