<style lang="less" scoped>
@import "./contract.less";
</style>

<template>
    <div id="contract">
        <!-- 个人中心公共头部 -->
        <personalCenterHead></personalCenterHead>
        <!-- <div @click="oooo">00000000</div> -->
        <!-- 电子合同页面 -->
        <div class="contractPage" v-if="contractPage">
            <div class="headerTitle"><span @click="toMine">我的微企宝</span>&nbsp;&nbsp;>&nbsp;&nbsp;<span @click="toOrderCenter">订单中心</span>&nbsp;&nbsp;>&nbsp;&nbsp;<span @click="toOrderDetail">订单详情页</span>&nbsp;&nbsp;>&nbsp;&nbsp;电子合同详情页</div>
            <div class="body">
                <div class="bodyTitle">
                    <span class="contarctDetail">合同详情</span>
                    <span v-show="isSignContract && finallyShow">
                        <a :href="aaa"  download="下载" class="downContract" style="color:black;"> 
                            <i class="iconDown"></i>下载电子合同
                        </a>
                        <!-- <span class="seeContract"><i class="iconSee"></i>打印电子合同</span> -->
                    </span>
                    <span class="signContract"  v-show="!isSignContract" @click="singerC"><i class="iconSign"></i>签署电子合同</span>
                    <!-- 回调地址的下载 -->
                    <span v-if="isSignedC">
                        <a :href="downloadUrl"  download="下载" class="downContract" style="color:black;"> 
                            <i class="iconDown"></i>下载电子合同
                        </a>
                    </span>
                </div>
                <!-- 未签署 -->
                <iframe :src="isShowContract" style="width:1198px;height:1000px;" v-if="contractNoSign" id="iframeS111"></iframe>
                <!-- 已签署 -->
                <iframe :src="signImg" style="width:1198px;height:1000px;" v-if="contractPageSign" id="iframeS"></iframe>
                <!-- 签署后查看的文件 -->
                <iframe :src="contractSigned" style="width:1198px;height:1000px;" v-show="isShowSignC" id="iframeS333"></iframe>

                <div class="singerC" @click="singerC" v-show="!isSignContract">签署电子合同</div>
            </div>
        </div>
        <!-- 头部面包屑 -->
        <div v-if="selectPerOrCom">
            <div class="headerTitle"><span @click="toMine">我的微企宝</span>&nbsp;&nbsp;>&nbsp;&nbsp;<span @click="toOrderCenter">订单中心</span>&nbsp;&nbsp;>&nbsp;&nbsp;<span @click="toOrderDetail">订单详情页</span>&nbsp;&nbsp;>&nbsp;&nbsp;电子合同详情页&nbsp;&nbsp;>&nbsp;&nbsp;签署电子合同</div>
            <div class="body">
                <div class="bodyTitlee">选择签署角色</div>
                <div class="company">
                    <img src="~assets/images/personalCenter/contract/comCon.png" class="comImg">
                    <div class="radio">
                        <!-- <img src="~assets/images/personalCenter/contract/noselect.png" alt=""> -->
                        <div :class="isRedC ? 'isRedImg': 'isBlackImg'" @click="choosePer('company')"></div>
                        <span class="comWord" @click="choosePer('company')">企业身份签署</span>
                    </div>
                </div>
                <div class="personal">
                    <img src="~assets/images/personalCenter/contract/personCon.png" class="personalImg">
                    <div class="radio">
                        <div :class="isRedP ? 'isRedImg': 'isBlackImg'" @click="choosePer('person')"></div>
                        <span class="personWord" @click="choosePer('person')">个人身份签署</span>
                    </div>
                </div>
                <div class="nextStep" @click="nextStep">下一步</div>
            </div>
        </div>

        <!-- 公司认证 -->
        <div v-if="comCertified" class="comCertified">
            <!-- 步骤追踪 -->
            <div id="step">
                <div class="line1">
                    <span class="outer"></span>
                    <span class="num1">1</span>
                    <i class="world">实名认证</i>
                </div>
                <div class="line2">
                    <span class="outer"></span>
                    <span class="num2">2</span>
                    <i class="world">在线签署</i>
                </div>
                <div class="line3">
                    <span class="outer"></span>
                    <span class="num3">3</span>
                    <i class="world">对方签署</i>
                </div>
                <div class="line4">
                    <span class="outer"></span>
                    <span class="num4">4</span>
                    <i class="world">合同存档</i>
                </div>
            </div>
            <!-- 企业实名认证 -->
            <div class="icon"></div>
            <div class="certifiedWord">企业实名认证</div>
            <div class="telWrap">
                <span class="telWord"><i class="red">*</i>手机号码：</span>
                <input type="number" v-model="telphoneC" readonly class="telphoneNum">
                <span class="del">用于接受签署验证码等重要通知！</span>
            </div>
            <div class="code">
                <span class="codeWord"><i class="red">*</i>验证码：</span>
                <input type="number" placeholder="请输入验证码" v-model="code">
                <!-- 获取验证码 -->
                <div class="getCode" @click="getCode" v-if="!isClick">获取验证码</div>
                <div class="getCode gray" v-if="isClick">{{timer}}</div>
            </div>
            <div class="telWrap">
                <span class="telWord"><i class="red">*</i>企业名称：</span>
                <!-- @blur="noCompany" -->
                <input type="text" placeholder="请输入企业名称" v-model="business.name" @blur="checkComName">
                <span class="addC" @click="isShowCom"></span>
                <transition-group name="fade">
                    <li v-for="(items,index) in companyList" :key="index" class="comList" v-if="isShowComList" @click="selectComEnter(items)">{{items.Name}}</li>
                </transition-group>
            </div>
            <div class="telWrap">
                <span class="telWord"><i class="red">*</i>统一社会信用代码：</span>
                <input type="text" placeholder="请输入统一社会信用代码" v-model="business.code" @blur="checkCredict">
            </div>
            <div class="businessWrap">
                <span class="telWord"><i class="red">*</i>上传营业执照：</span>
                <div class="uploadWrap">
                    <input type="file" class="uploadBusiness" @change="uploadBusiness" id="uploadBusiness">
                    <div class="upL">
                        <img :src="business.Img" alt="">
                        <span v-if="!business.Img">点击上传</span>
                        <div v-if="business.Img" class="changeImg" @click="uploadBusiness">更换照片</div>
                    </div>
                    <div class="des" @click="businessShow" @mouseover="isBusinessE" @mouseout="isBusinessO">
                        <img src="~assets/images/personalCenter/contract/see.png" alt="" v-if="isShowB">
                         <img src="~assets/images/loginAndRegister/shiyi_hover.png" alt="" v-else>
                    </div>
                </div>
                <div class="desWord">请上传工商营业执照，图片要求四角对齐，如有模糊、太暗、有遮挡，则不予认证。<br/>只支持中国大陆工商局或市场监督管理局颁发的工商营业执照，且必须在有效期内。</div>  
            </div>
            <div class="telWrap">
                <span class="telWord"><i class="red">*</i>法人代表姓名：</span>
                <input type="text" placeholder="请输入姓名" v-model="idcardInfo.name" @blur="checkName">
            </div>
            <div class="telWrap">
                <span class="telWord"><i class="red">*</i>法人代表身份证号：</span>
                <input type="text" placeholder="请输入身份证号" v-model="idcardInfo.code"  @blur="checkIdcardNum">
            </div>
            <div class="businessWrap">
                <span class="telWord"><i class="red">*</i>法人代表身份证正面：</span>
                <div class="uploadIDWrap">                                                          
                    <input type="file" class="uploadIdcard" @change="uploadIdcard" id="upIdcardFace" accept="image/jpg,image/png,image/gif,image/jpeg">
                    <div class="idcardUp">
                        <img :src="idcardInfo.Img" alt="">
                        <span  v-if="!idcardInfo.Img" class="face">点击上传</span>
                        <div v-if="idcardInfo.Img" class="changeImg" @click="uploadIdcard">更换照片</div>
                    </div>
                    <div class="des">
                        <img src="~assets/images/personalCenter/contract/idcardZ.png" alt="">
                    </div>
                </div>
                <div class="desWord">请上传本人身份证正面头部照片，必须看清证件信息，且证件信息不能被遮挡<br/>仅支持jpg、png、gif的图片格式，图片大小不超过10M，您提供的照片微企宝将予以保护，不会用于其他用途</div>
            </div>
            <div class="businessWrap">
                <span class="telWord"><i class="red">*</i>法人代表身份证反面：</span>
                <div class="uploadIDWrap">
                    <input type="file" class="uploadIdcardBack" @change="uploadIdcardBack" id="upIdcardBack" accept="image/jpg,image/png,image/gif,image/jpeg">
                    <div class="idcardUp" >
                        <img :src="idcardBack.Img" alt="">
                        <span v-if="!idcardBack.Img">点击上传</span>
                        <div v-if="idcardBack.Img" class="changeImg" @click="uploadIdcard">更换照片</div>
                    </div>
                    <div class="des">
                        <img src="~assets/images/personalCenter/contract/idcardBack.png" alt="">
                    </div>
                </div>
                <div class="desWord">请上传本人身份证背面头部照片，必须看清证件信息，且证件信息不能被遮挡<br/>仅支持jpg、png、gif的图片格式，图片大小不超过10M，您提供的照片微企宝将予以保护，不会用于其他用途</div>
            </div>
            <div class="apply" @click="confirmApply">提交申请</div>
        </div>
        <!-- 企业签章 -->
        <div class="comSignature" v-if="comSignature">
            <div>
                <div class="bodyTitlee">选择企业签章</div>
            </div>
            <div class="perSingWrap"  >
                <div class="comSinger" v-for="(items,index) in singListArr">
                    <!-- <span :class="items.ReviewState == 1 ? 'redfame' : ''"> -->
                        <div class="comSing" ref="comSing" :class="items.ReviewState == 1 ? 'whiteB' : 'grayB'" @click="signIsSelectC(items,index)">
                            <img src="~assets/images/personalCenter/contract/comConBac.png" class="img" v-if="items.ReviewState == 1 ">
                            <img src="~assets/images/personalCenter/contract/comConBacG.png" class="imgNo" v-else>
                            <img src="~assets/images/personalCenter/contract/comSign.png" class="sign">
                            <img src="~assets/images/personalCenter/contract/comSignFail.png" class="failImg" v-if="items.ReviewState == 2">
                            <div :class="items.ReviewState == 1 ? 'comName' : 'comName2' ">{{items.CompanyName}}</div>
                        </div>
                        <div>
                            <div class="statusC" v-if="items.ReviewState == 0">
                                    <span>正在审核</span>
                            </div>
                            <div v-if="items.ReviewState == 1 " class="resetC"  @click="signIsSelectC1(items,index)">
                                <span :class="cIndex == index ? 'ringRed' : 'ringWhite'"></span>
                                <span class="wordRing">可用签章</span>
                                <span @click="modifySign(items,index)" class="nodify">修改</span>
                            </div>
                            <div  class="deletC deletCompany" v-if="items.ReviewState == 2">
                                <span @click="errorReason(items)">失败原因</span>
                                <!-- &nbsp;&nbsp;|&nbsp;&nbsp; -->
                                <span @click="deletSignC(items,index)">删除</span>
                                <span class="line">|</span>
                                <span class="modify" @click="modifySign(items,index)">修改</span>
                            </div>
                        </div>
                    <!-- </span> -->
                </div>
                <div class="addSign" @click="addSign">
                    <img src="~assets/images/personalCenter/contract/companyAdd.png" class="addSignImg">
                </div>
                <div>
                    <div class="perNextStep" v-if="!isOne" @click="goBackContract">返回合同详情</div>
                    <span v-if="!isOne" class="noSignC">目前没有可用的签章，无法签署电子合同！</span>
                </div>
                <div class="perNextStep" @click="comNextStep" v-if="isOne">下一步</div>
            </div>
        </div>
        <!-- 个人认证 -->
        <div  v-if="perCertified" class="perCertified">
             <!-- 步骤追踪 -->
            <div id="step">
                <div class="line1">
                    <span class="outer"></span>
                    <span class="num1">1</span>
                    <i class="world">实名认证</i>
                </div>
                <div class="line2">
                    <span class="outer"></span>
                    <span class="num2">2</span>
                    <i class="world">在线签署</i>
                </div>
                <div class="line3">
                    <span class="outer"></span>
                    <span class="num3">3</span>
                    <i class="world">对方签署</i>
                </div>
                <div class="line4">
                    <span class="outer"></span>
                    <span class="num4">4</span>
                    <i class="world">合同存档</i>
                </div>
            </div>
            <!-- 个人实名认证 -->
            <div class="icon"></div>
            <div class="certifiedWord">个人实名认证</div>
            <div class="telWrap">
                <span class="telWord"><i class="red">*</i>手机号码：</span>
                <input type="number" v-model="telphoneC" readonly class="telphoneNum">
                <span class="del">用于接受签署验证码等重要通知！</span>
            </div>
            <div class="code">
                <span class="codeWord"><i class="red">*</i>验证码：</span>
                <input type="number" placeholder="请输入验证码" @blur="checkCode" v-model="code">
                <div class="getCode" @click="getCode" v-if="!isClick">获取验证码</div>
                <div class="getCode gray" v-if="isClick">{{timer}}</div>
            </div>
            <div class="telWrap">
                <span class="telWord"><i class="red">*</i>姓名：</span>
                <input type="text" placeholder="请输入姓名" v-model="idcardInfo.name" @blur="checkName">
            </div>
            <div class="telWrap">
                <span class="telWord"><i class="red">*</i>身份证号：</span>
                <input type="text" placeholder="请输入身份证号" v-model="idcardInfo.code" @blur="checkIdcardNum">
            </div>
            <div class="businessWrap">
                <span class="telWord"><i class="red">*</i>（法人代表/负责人）身份证正面：</span>
                <div class="uploadIDWrap">
                    <input type="file" class="uploadIdcardP" @change="uploadIdcard" id="upIdcardFace" accept="image/jpg,image/png,image/gif,image/jpeg">
                    <div class="idcardUp">
                        <img :src="idcardInfo.Img" alt="">
                        <!-- <img src="~assets/images/personalCenter/contract/upload.png" alt=""> -->
                        <span v-if="!idcardInfo.Img">点击上传</span>
                        <div v-if="idcardInfo.Img" class="changeImg" @click="uploadIdcard">更换照片</div>
                    </div>
                    <div class="des">
                        <img src="~assets/images/personalCenter/contract/idcardZ.png" alt="">
                    </div>
                </div>
                <div class="desWord">请上传本人身份证正面头部照片，必须看清证件信息，且证件信息不能被遮挡<br/>仅支持jpg、png、gif的图片格式，图片大小不超过10M，您提供的照片微企宝将予以保护，不会用于其他用途</div>
            </div>
            <div class="businessWrap">
                <span class="telWord"><i class="red">*</i>（法人代表/负责人）身份证反面：</span>
                <div class="uploadIDWrap">
                    <input type="file" class="uploadIdcardBackP"@change="uploadIdcardBack" id="upIdcardBack" accept="image/jpg,image/png,image/gif,image/jpeg">
                    <div class="idcardUp">
                        <img :src="idcardBack.Img" alt="">
                        <!-- <img src="~assets/images/personalCenter/contract/upload.png" alt=""> -->
                        <span v-if="!idcardBack.Img">点击上传</span>
                        <div v-if="idcardBack.Img" class="changeImg" @click="uploadIdcardBack">更换照片</div>
                    </div>
                    <div class="des">
                        <img src="~assets/images/personalCenter/contract/idcardBack.png" alt="">
                    </div>
                </div>
                <div class="desWord">请上传本人身份证背面头部照片，必须看清证件信息，且证件信息不能被遮挡<br/>仅支持jpg、png、gif的图片格式，图片大小不超过10M，您提供的照片微企宝将予以保护，不会用于其他用途</div>
            </div>
            <div class="apply" @click="personfirmApply">提交申请</div>
        </div>
        <!-- 个人签章 -->
        <div class="perSignature" v-show="perSignature">
            <div>
                <div class="bodyTitlee">选择个人签章</div>
            </div>
            <div class="perSingWrap"  >
                <div class="perSinger" v-for="(items,index) in singListArr2">
                    <div class="perSing" :class="items.ReviewState == 1 ? 'whiteB' : 'grayB'"> 
                        <img src="~assets/images/personalCenter/contract/personConBac.png" class="img" v-if="items.ReviewState == 1">
                        <img src="~assets/images/personalCenter/contract/personConBacG.png" class="imgNo" v-else>
                        <!-- <img src="~assets/images/personalCenter/contract/isSelect.png" class="redCorr"> -->
                        <img src="~assets/images/personalCenter/contract/comSignFail.png" class="failImgP" v-if="signStatus == 2">
                        <div class="personName" :class="items.ReviewState == 1 ? 'personName' : 'personName2' ">{{idcardInfo.name}}</div>
                        <div class="personidCard" :class="items.ReviewState == 1 ? 'personidCard' : 'personidCardNo'">{{idcardInfo.code}}</div>
                    </div>
                    <div>
                        <div class="status" v-if="signStatus == 0">
                            <span>正在审核</span>
                        </div>
                        <div v-if="signStatus == 1" class="reset">
                            <span :class="cIndex == index ? 'ringRed' : 'ringWhite'"></span>
                            <span class="wordRing">可用签章</span>
                            <!--<span @click="modifySignP" class="nodify">修改</span>-->
                        </div>
                        <div  class="deletC delet" v-if="signStatus == 2">
                            <!-- <div>{{items}}</div> -->
                            <span @click="errorReasonP(items)" class="deletErr">失败原因</span>
                            <!-- <span @click="deletSign(items)">删除</span>&nbsp;&nbsp;|&nbsp;&nbsp; -->
                            <span @click="modifySignP" class="modify">修改</span>
                        </div>
                    </div>
                </div>
                <!-- <div class="perNextStep" v-if="signStatus != 1" @click="goBackContract">返回合同详情</div> -->
                <div>
                    <div class="perNextStep" v-if="signStatus != 1" @click="goBackContract">返回合同详情</div>
                    <span v-if="signStatus != 1" class="noSignC">目前没有可用的签章，无法签署电子合同！</span>
                </div>
                <div class="perNextStep" @click="perNextStep" v-if="signStatus == 1 ">下一步</div>
            </div>
        </div>

        <!-- 提交认证信息弹出框 -->
        <div class="messageBox" v-if="isShowWindows">
            <div class="tipsWrap">
                <div class="tipsTitWrap">
                    <span>提交成功</span>
                    <img src="~assets/images/personalCenter/contract/close.png" class="close" @click="closeWindows()">
                </div>
                <div class="tipsContent">
                    <i class="successImg"></i>
                    <span class="content">信息提交成功，我们将在1-2个工作<br/>日反馈审核结果，审核通过之后，系<br/>统自动帮你生产电子签章</span>
                    <span class="toOther">{{toContractTimer}}s后自动返回到  <i @click="toContract">电子合同详情页</i></span>
                </div>
            </div>
        </div>
        <!-- 签章失败原因弹窗框 -->
        <div class="errBoxWrap" v-if="isShowErrReason">
            <div class="tipsWrap">
                <div class="tipsTitWrap">
                    <span>失败原因</span>
                    <img src="~assets/images/personalCenter/contract/close.png" class="close" @click="closeErrWindows()">
                </div>
                <div class="tipsContent">
                    <div>
                        <i class="errorImg"></i>
                        <div class="errorrr">{{failReason}}</div>
                    </div>
                    <div class="errBtn">
                        <div @click="sure()" class="sure">确定</div>
                        <div @click="cancel" class="cancel">取消</div>
                    </div>
                    <!-- <span class="contentErr">{{failReason}}</span>
                    <span class="sure" @click="sure()">确定</span>
                    <span class="cancel" @click="cancel">取消</span> -->
                </div>
            </div>
        </div>
        <!-- 支付状态弹窗 -->
        <div class="errBoxWrap" v-if="noShowContract">
            <div class="tipsWrap">
                <div class="tipsTitWrap">
                    <span>温馨提示</span>
                    <img src="~assets/images/personalCenter/contract/close.png" class="close" @click="closeErrWindowsP()">
                </div>
                <div class="tipsContent">
                    <i class="errorImg"></i>
                    <span class="contentErr">只有已受理的订单才能签署电子<br/>合同，您暂时不支持签署合同</span>
                    <div class="errBtn">
                         <span class="sure" @click="sureS()">确定</span>
                         <span class="cancel" @click="cancelS">取消</span>
                    </div>
                   
                </div>
            </div>
        </div>
        <!--公司示意弹窗-->
        <div class="updatedImg_des" v-show="updatedImg_des">
	        <div class="contentWrap">
	            <div class="close1" @click="updatedImg_des = !updatedImg_des"><img src="~assets/images/loginAndRegister/close.png" alt=""></div>
	            <div class="des">
	            <div><img src="~assets/images/loginAndRegister/license_bg.png" alt=""></div>
	            <div class="desText">
	                <ul>
	                <li><span class="line"></span><span class="num">1</span> <span class="text">请上传工商营业执照，图片要求四角对齐， 如有模糊、太暗、有遮挡，则不予认证。</span></li>
	                <li><span class="line"></span><span class="num">2</span> <span class="text">只支持中国大陆工商局或市场监督管理局 颁发的工商营业执照，且必须在有效期内。</span></li>
	                </ul>
	            </div>
	            </div>
	        </div>
        </div>
        <!-- 底部公共样式 -->
        <publicBottom></publicBottom>
    </div>
</template>
<script>
import personalCenterHead from "~/components/common/personalCenterHead";
import publicBottom from "~/components/common/publicBottom";
import getData from "~/store/ajaxAPI/getData";
// import idcard from '../../../vuex/idcard';
import tool from '~/assets/lib/tool';
var timerr = null;
var windowsTimer = null;
export default {
    data(){
        return {
            contractPage:true, //合同详情页面
            selectPerOrCom:false, //选择签署类型
            isPersonal:false, //是否选择个人签章
            isCompany:true, //是否选择公司签章
            comCertified:false, //公司认证流程
            perCertified:false, //个人认证流程
            isShowWindows:false, //是否显示弹窗
            signStatus:-1, //签章状态  修改/正在审核/
            isShowErrReason:false,//是否显示失败原因弹窗
            perSignature:false, //个人签章
            isRedP:false, //个人是否显示被选中的红勾
            isRedC:true, //公司是否显示被选中的红勾
            comSignature:false, //公司签章
            currentIndex:0, //企业签章 显示被选中的红勾
            cIndex:0, //企业签章 显示被选中的签章
            isShowComList:false,//是否显示公司列表
            companyList:[], //公司列表
            telphoneC:"",//手机号码==公司
            telphoneStart:"",//手机号码(中间为*代替)==公司
            loading:false, //是否开启加载模式
            isClick:false,
            timer:60,
            code:"",//验证码
            idcardInfo:{ //身份证正面信息
                name:"",
                code:"",
                Img:"",
            },
            idcardBack:{ //身份证反面信息
                Img:'',
            },
            business:{ //营业执照信息
                name:"",
                code:"",
                Img:'',
            },
            singListArr:[], //企业签章列表
            signId:"",//签章id
            signImg:"",//合同模板
            contractPageSign:false, //是否展示带签章的合同
            isShowContract:false, //未签署的合同模板
            contractNoSign:true, // 是否展示未签署的合同
            isSignContract:false, //合同是否已签署
            isDown:false, //是否下载电子合同
            toContractTimer:10, //提交认证信息弹出框倒计时
            failId:"",
            isModifyOrAdd:false, //点击修改时给个标识用于提示客户
            status:"",//订单状态
            noShowContract:false, //订单状态为待支付时弹出窗口
            aaa:"",//下载合同
            contractSigned:"", //已签署的合同
            isShowSignC:false, //是否展示已签署的合同
            updatedImg_des:false, //营业执照示意弹窗
            isShowB:true,
            failReason:"" ,//审核失败原因
            singListArr2:[], //个人签章列表
            isOne:'', //企业签章审核状态
            finallyShow:true,  //去到签署合同页时是否展示下载合同
            isSignedC:false, //是否展示已经签署后的合同下载按钮
            downloadUrl:"", //回调地址中的下载链接
            count:0,
            noClick:false,//防抖
        }
    },
    components:{
        personalCenterHead,
        publicBottom,
    },
    mounted(){
        let local = tool.loadFromLocal("orderdetail","ALL");
        // console.log("local",local)
        // this.isShowContract = this.$route.query.contract;
        this.isShowContract = local.orderdetail.orderdetail.ElectronicContractTemplate;
        this.isSignContract = local.orderdetail.orderdetail.IsSignedElectronicContract;
        this.status = local.orderdetail.orderdetail.Status;
        this.aaa = local.orderdetail.orderdetail.ElectronicContractDownloadUrl;
        this.contractSigned = local.orderdetail.orderdetail.ElectronicContractViewpdfUrl;
        // 调用公司列表接口
        getData.mycompanyList().then((res) => {
            // console.log("res",res.data);
            // if(res.data.length != 0){
                this.companyList = res.data;
            // }else{
            //     return;
            // }
        })
        getData.getcustorInfor().then((res) => {
            // console.log("00000",res.data.Mobile);   
            this.telphoneC = res.data.Mobile;
            // 替换手机号中间几位数为*
            this.telphoneStart = this.telphoneC.substr(0,3)+"****"+this.telphoneC.substr(7); 
            // console.log("this.telphoneStart",this.telphoneStart)
        })

        // 如果客户已签署  则显示签署后的合同
        if(this.$route.query.isSign == 0){
            this.isShowSignC = true;
            this.contractNoSign = false;
            // console.log(  document.getElementById("iframeS").src  )
            // document.getElementById("iframeS").src = this.contractSigned;

            // document.getElementById("iframeS").addEventListener("load",  () =>{
            //     // this.count ++;
            //     // if(this.count >= 3 ){
            //     //     this.showOne = false;
            //     // }
            //     console.log(1)
            //     console.log("我搞完了")
            //     console.log(  document.getElementById("iframeS").src  )
                
            // });
        }
    },
    methods:{
    	toOrderCenter(){
    		//订单中心
    		this.$router.push("/personalCenter/allOrder")
    	},
    	toMine(){
    		//我的微企宝
    		this.$router.push("/personalCenter/personalCenterIndex")
    	},
    	toOrderDetail(){
    		//订单详情
    		let param = this.$route.query.id;
    		let orderId = tool.loadFromLocal("orderdetail","ALL").orderdetail.orderdetail.OrderNumber
    		this.$router.push({path:"/personalCenter/orderDetail",query:{id:param,orderId:orderId}})
    	},
        singerC(){ //签署电子合同页面
            if(this.status == 'Prepay' || this.status == 'Fail'){
                this.noShowContract = true;
                return
            }
            this.contractPage = false;
            this.selectPerOrCom = true;
        },
        choosePer(val){ //选择个人签署或者选择公司签署
            if(val == 'person'){
                this.isPersonal = true;
                this.isCompany = false;
                this.isRedP = true;
                this.isRedC = false;
            }else{
                this.isCompany = true;
                this.isPersonal = false;
                this.isRedC = true;
                this.isRedP = false;
            }
        },
        nextStep(){
            if(this.isPersonal){
                var params = {
                    Type: 0,
                }
                this.request_isCertified(params,1);
            }else if(this.isCompany){
                var params = {
                    Type: 1,
                }
                this.request_isCertified(params,2);
                // this.comCertified = true;
                // if(this.singListArr.length > 0){
                //     alert(1);
                // }
            }else {
                alert("请先选择类型");
            }
        },
        confirmApply(){ //企业提交申请
            // console.log("0000",this.idcardInfo.Img)
            // 验证
            if(this.checkCode() && this.checkCredict() && this.checkComName() && this.checkName() && this.checkIdcardNum().flag){
                this.realNameCertification(1);
                this.idcardInfo.name = "";
                this.idcardInfo.code = "";
                this.idcardInfo.Img = "";
                this.business.name ="";
                this.business.code ="";
                this.business.Img ="";
                this.idcardBack.Img ="";
                this.code = "";
            }else{
                this.$message.error("请填写完整的正确信息！！");
                return;
            }
            //  this.isShowWindows = true;
        },
        personfirmApply(){ //个人提交申请
            // 验证
            if(this.checkName() && this.checkIdcardNum().flag && this.checkCode()){
                this.realNameCertification(2);
                this.idcardInfo.name = "";
                this.idcardInfo.code = "";
                this.idcardInfo.Img = "";
                this.idcardBack.Img ="";
                this.code = "";
            }else{
                this.$message.error("请填写完整的正确信息！！");
                return;
            }
            //  this.isShowWindows = true;
        },
        toContract(){ //跳转到电子合同
            clearInterval(windowsTimer);
            if(this.comCertified){
                this.contractPage = true;
                this.comCertified = false;
                this.selectPerOrCom = false;
                this.isShowWindows = false;
            }else if(this.perCertified){
                this.contractPage = true;
                this.perCertified = false;
                this.selectPerOrCom = false;
                this.isShowWindows = false;
            }
        },
        goBackContract(){ //返回合同详情
            if(this.perSignature){
                this.perSignature = false;
                this.contractPage = true;
            }else if(this.comSignature){
                this.comSignature = false;
                this.contractPage = true;
            }
        },
        signIsSelectC(items,i){ //公司签章被选中
            // this.currentIndex = i;
            // this.signId = items.Id;
            // console.log("=====",items);
            if(items.ReviewState != 1){
                this.$message.error("该签章不可用喔");
            }
        },
        signIsSelectC1(items,i){ //公司签章被选中
            this.currentIndex = i;
            this.signId = items.Id;
            if(items.ReviewState == 1){
                this.cIndex = i;
            }
        },
        closeWindows(){ //关闭弹窗
            clearInterval(windowsTimer);
            this.isShowWindows = false;
            if(this.comCertified){
                this.comCertified = false;
                this.comSignature = true;
                let params = {
                    Type : 1,
                    datatype : "json",
                }
                this.request_isCertified(params,2);

            }else if(this.perCertified){
                this.perCertified = false;
                this.perSignature = true;
                let params = {
                    Type : 0,
                    datatype : "json",
                }
                this.request_isCertified(params,1);
            }
        },
        addSign(){ //添加企业签章
        // console.log("this.singListArr",this.singListArr.length)
            if(this.singListArr.length >= 5 ){
                this.$message.error("企业不能超过5个签章喔");
                return;
            }else{
                this.comSignature = false;
                this.comCertified = true;

                this.idcardInfo.name = "";
                this.idcardInfo.code = "";
                this.idcardInfo.Img = "";
                this.business.name ="";
                this.business.code ="";
                this.business.Img ="";
                this.idcardBack.Img ="";
                this.code = "";
            }
        },
        perNextStep(){ //个人签章下一步
        	if(!this.noClick){
        		this.noClick = true;
        		this.request_customerSigned(this.signId,1);
        	}
        },
        comNextStep(){ //公司签章下一步
            // if(!this.signId){
            //    this.signId = this.singListArr[0].Id
            // }
            if(this.signId == null || this.signId == "" || this.signId == undefined){
                this.$message.error("请先选择签章")
                return;
            }
            if(!this.noClick){
            	this.noClick = true;
            	this.request_customerSigned(this.signId,2);
            }
        },
        isShowCom(){ //点击加号显示公司列表
            this.isShowComList = !this.isShowComList;
        },
        selectComEnter(val){ //选择公司
            this.companyList.forEach((items,index) => {
                this.business.name = val.Name;
                this.business.code = val.SocialCreditCode;
                this.business.Img = val.BusinessLicensePic;
                this.isShowComList = false;
            });
            this.creditCodeC = val.SocialCreditCode;
        },
        uploadIdcard(){ //识别身份证正面
            var idcard = this.idcardInfo;
            tool.uploadIdcard("#upIdcardFace",1,idcard,this)
            // tool.recognition("#upIdcardFace",1,idcard,this)
            
        },
        uploadIdcardBack(){ //识别身份证反面
            var _idcardBack = this.idcardBack;
            tool.uploadIdcard("#upIdcardBack",2,_idcardBack,this);
            // tool.recognition("#upIdcardBack",2,_idcardBack,this);
        },
        uploadBusiness(){ //识别营业执照
            var _business = this.business;
            tool.uploadIdcard("#uploadBusiness",3,_business,this);
            //  tool.recognition("#uploadBusiness",3,_business,this);
        },
        getCode(){ //获取验证码
        this.isClick = true;
            var params = {
                mobile:this.telphoneC
            }
            getData.getVerification(params).then((res) => {
                // console.log("获取验证码",res);
                this.$message({
                    message: '验证码已成功发送',
                    type: 'success'
                });
                timerr = setInterval(() => {
                    this.timer--;
                    if(this.timer <= 0){
                        this.timer = 60;
                        clearInterval(timerr)
                        this.isClick = false;

                    }
                },1000)
            })
        },
        checkCode(){ //验证验证码
            var _checkCode = tool.regularJudgement("noteCode",this.code);
            if(!_checkCode){
                this.$message.error("验证码错误！！");
                return;
            }
            return _checkCode;
        },
        checkName(){ //验证姓名
            var _checkName = tool.regularJudgement("person",this.idcardInfo.name);
            if(!_checkName){
                this.$message.error("姓名错误！！");
                return;
            }
            return _checkName;
        },
        checkIdcardNum(){ //验证身份证号
            // var _checkIdcardNum = tool.regularJudgement("idcardNum",this.idcardInfo.code);
            // console.log("_checkIdcardNum",_checkIdcardNum,this.idcardInfo.code)
            // if(!_checkIdcardNum){
            //     this.$message.error("身份证号错误！！");
            //     return;
            // }
            var _checkIdcardNum = tool.IdentityCodeValid(this.idcardInfo.code);
            // console.log("_checkIdcardNum",_checkIdcardNum);
            if(!_checkIdcardNum.flag){
                this.$message.error(_checkIdcardNum.message);
            }

            return _checkIdcardNum;

        },
        checkCredict(){ //验证统一社会信用号
            var _checkCredict = tool.regularJudgement("credictNum",this.business.code);
            // console.log("_checkCredict",_checkCredict,this.business.code)
            if(!_checkCredict){
                this.$message.error("统一社会信用号错误！！");
                return;
            }

            return _checkCredict;
        },
        checkComName(){ //验证企业名称
            var _checkComName = tool.regularJudgement("companyAddress",this.business.name);
            if(!_checkComName){
                this.$message.error("企业名称错误！！");
                return;
            }

            return _checkComName;
            
        },
        businessShow(){ //营业执照示意弹窗
            this.updatedImg_des = !this.updatedImg_des;
        },
        isBusinessE(){ //鼠标移入营业执照示意
            this.isShowB = false;
        },
        isBusinessO(){ //鼠标移出营业执照示意
             this.isShowB = true;
        },
        closeErrWindows(){ //关闭失败原因窗口
            this.isShowErrReason = false;
        },
        errorReason(val){ //失败原因
            this.failId = val.Id;
            this.isShowErrReason = true;
            this.failReason = val.ReviewFeedback;
        },
        errorReasonP(val){
            // this.failId = val.Id;
            this.isShowErrReason = true;
            this.failReason = val.ReviewFeedback;
        },
        sure(){ //失败原因==确定
            if(this.comSignature){
                this.comCertified = true;
                this.comSignature = false;
                let params = {
                    id: this.failId,
                    datatype:"json"
                }
                this.request_getSignById(params,2)
            }else if(this.perSignature){
                this.perCertified = true;
                this.perSignature = false;
                let params = {
                    id: this.signId,
                    datatype:"json"
                }
                this.request_getSignById(params,1)
            }
             this.isShowErrReason = false;
        },
        cancel(){ //失败原因==取消
            this.isShowErrReason = false;
        },
        downContract(){ //下载电子合同
            this.isDown = true;
        },
        deletSign(val){ //删除签章 个人
            let params = {
                id: this.signId,
                datatype: "json",
            }
            this.request_deletsign(params);
            this.singListArr2.splice(val,1);
        },
        deletSignC(val,i){ //删除签章 企业
            if(this.currentIndex == i){
                let params = {
                    id: val.Id,
                    datatype: "json",
                }
                this.request_deletsign(params,i);
            }else{
                this.$message.error("请先选择该签章！！");
            }
        },
            request_deletsign(params,i){ //请求删除签章接口
                getData.deletSign(params).then((res) => {
                    this.$message({
                        message: '成功删除该签章',
                        type: 'success'
                    });
                    this.singListArr.splice(i,1);
                }).catch((err) => {
                    if(err.data.success == false) {
                        this.$message.error(err.data.msg);
                    }
                })
        },
        modifySign(val,i){ //修改企业签章
            // 
            clearInterval(timerr);
            this.isModifyOrAdd = true;
            // console.log("0000",this.singListArr);
            this.singListArr.forEach((items,index) => {
                if(i == index){
                    this.signId = items.Id;
                }
            })
            let params = {
                id:this.signId,
            }
            this.request_getSignById(params,2);
        },
        modifySignP(){//修改个人签章
            clearInterval(timerr);
            let params = {
                id:this.signId,
            }
            this.request_getSignById(params,1);
            
        },
        request_getSignById(params,type){
            if(type == 1){ //个人
                getData.getSignById(params).then((res) =>{
                    this.perCertified = true;
                    this.perSignature = false;
                    this.idcardInfo.name = res.data.TrueName;
                    this.idcardInfo.code = res.data.IdCardNumber;
                    this.idcardInfo.Img =  res.data.IdCardPositive;
                    this.idcardBack.Img = res.data.IdCardOpposite;
                })
            }else if(type == 2){ //公司
                getData.getSignById(params).then((res) =>{
                    this.comCertified = true;
                    this.comSignature = false;
                    this.business.name = res.data.CompanyName;
                    this.business.code = res.data.SocialCreditCode;
                    this.business.Img = res.data.BusinessLicensePic;
                    this.idcardInfo.name = res.data.TrueName;
                    this.idcardInfo.code = res.data.IdCardNumber;
                    this.idcardInfo.Img =  res.data.IdCardPositive;
                    this.idcardBack.Img = res.data.IdCardOpposite;
                })
            }
        },
        realNameCertification(type){ //提交认证信息  type 1 == 公司  2 == 个人
            if(type == 1){
                var params = {
                    Mobile: this.telphoneC,
                    VerifyCode: this.code,
                    CompanyName: this.business.name,
                    SocialCreditCode: this.business.code,
                    BusinessLicensePic: this.business.Img,
                    TrueName: this.idcardInfo.name,
                    IdCardNumber: this.idcardInfo.code,
                    IdCardPositive: this.idcardInfo.Img,
                    IdCardOpposite: this.idcardBack.Img,
                    Type:1,
                    datatype:"json",
                }
                // 调取 个人/企业签章-实名认证 接口
                this.request_certification(params);
            }else if(type == 2){
                var params = {
                    Mobile: this.telphoneC,
                    VerifyCode: this.code,
                    TrueName: this.idcardInfo.name,
                    IdCardNumber: this.idcardInfo.code,
                    IdCardPositive: this.idcardInfo.Img,
                    IdCardOpposite: this.idcardBack.Img,
                    Type:0,
                    datatype:"json",
                }
                // 调取 个人/企业签章-实名认证 接口
                this.request_certification(params);
            }
            
        },
        // 调取 个人/企业签章-实名认证 接口
        request_certification(params){
            getData.realNameCertification(params).then((res) => {
                // console.log(".....",this.isModifyOrAdd);
                // console.log("this.singListArr.length",this.singListArr.length)
                // if(this.isModifyOrAdd){
                //     this.$message({
                //         message: '如果修改营业执照，则为新增签章',
                //         type: 'warning'
                //     });
                //     if(this.singListArr.length >= 5){
                //         this.$message.error("企业不能超过5个签章喔");
                //         return;
                //     }
                // }
                if(this.companyList.length > 5){
                    this.$message.error("不能超过5个公司喔！");
                }else{
                    this.isShowWindows = true;
                     windowsTimer = timerr = setInterval(() => {
                        this.toContractTimer--;
                        if(this.toContractTimer <= 0){
                            if(this.perCertified){
                                this.contractPage = true;
                                this.perCertified = false;
                                this.isShowWindows = false;
                            }else if(this.comCertified){
                                this.contractPage = true;
                                this.comCertified = false;
                                this.isShowWindows = false;
                            }
                            clearInterval(windowsTimer);
                        }
                    },1000)
                }

            }).catch((err) => {
                if(err.data.success == false){
                    this.$message.error(err.data.msg);
                }
            })
        },
        // 调取  个人/企业签章列表  接口   type 1 == 个人  2 == 公司
        // request_signlist(params,type){
        // },
        // 是为了判断客户需不需要去认证 1为个人  2为公司
        request_isCertified(params,type){
            getData.signList(params).then((res) => {
                if(type == 1){
                    if(res.data.length == 0){
                        this.perCertified = true;
                        this.comCertified = false;
                        this.selectPerOrCom = false;
                    }else{
                        this.selectPerOrCom = false;
                        this.perSignature = true;
                        this.singListArr2 = res.data;
                        this.idcardInfo.name = res.data[0].TrueName;
                        this.idcardInfo.code = res.data[0].IdCardNumber;
                        this.signId = res.data[0].Id;
                        this.signStatus = res.data[0].ReviewState;
                        this.errorReason = res.data[0].ReviewFeedback;
                    }
                }else if(type == 2){
                    if(res.data.length == 0){
                        this.comCertified = true;
                        this.perCertified = false;
                        this.selectPerOrCom = false;
                    }else{
                        this.selectPerOrCom = false;
                        this.comSignature = true;
                        this.singListArr = res.data;
                        let b = "";
                        // this.singListArr.forEach((items,index) => {
                        //     this.signId = items.Id;
                        //     // b = items.ReviewState;
                        //     // console.log("bbbb",b)
                        //     return this.signId;
                        //     // this.signStatus = items.ReviewState;
                        //     // this.errorReason = items.ReviewFeedback
                        // })
                        // console.log("111this.signId",this.signId)

                        let cc = this.singListArr.map(function(items){
                            b = items.ReviewState;
                            return b;
                        })
                        this.isOne = cc.includes(1);

                        for(let i = 0; i < this.singListArr.length;i++){
                            if(this.singListArr[i].ReviewState == 1){
                                this.cIndex = i;
                                this.signId = this.singListArr[i].Id;
                                break;
                            }
                        }
                    }
                }
            })
        },
        request_customerSigned(id,type){
            // 对接签章接口（客户签署电子合同）
            // console.log("id",id,this.$route.query.id);
            var params = {
                customerSignatureId: id,
                orderId:this.$route.query.id,
                isApp: false,
                datatype: "json",
            }
            if(type == 1){ //个人
                getData.customerSigned(params).then((res) => {
                    this.perSignature = false;
                    this.contractPage =true;
                    this.contractPageSign = true;
                    this.contractNoSign = false;
                    this.signImg = res.data.link;
                    this.finallyShow = false;
                    this.isSignContract = true;
                    this.$nextTick(() => {
                        // console.log(  document.getElementById("iframeS").src  )
                        document.getElementById("iframeS").src = this.signImg;
                        document.getElementById("iframeS").addEventListener("load",  () =>{
                            // this.isSignContract = true;
                            // this.finallyShow = true;
                            // console.log(1)
                            // console.log("iframeS")
                            // console.log(  document.getElementById("iframeS").src  )
                            // console.log(tool.loadFromLocal("downUrl", "ALL"))
                            this.count++;
                            if(this.count >= 2){
                                this.isSignedC = true;
                            }
                            this.downloadUrl = tool.loadFromLocal("downUrl", "ALL").downUrl.downUrl;
                            // this.downloadUrl = tool.getQueryString("download_url");
                        });
                    })
                }).catch((err) => {
                    if(err.data.success == false){
                    	this.noClick = false;
                        this.$message.error(err.data.msg);
                    }
                })
            }else if(type == 2){
                getData.customerSigned(params).then((res) => {
                    // console.log("客户签署电子合同",res);
                    this.comSignature = false;
                    this.contractPage =true;
                    this.contractPageSign = true;
                    this.contractNoSign = false;
                    this.signImg = res.data.link;
                    this.finallyShow = false;
                    this.isSignContract = true;
                    
                    this.$nextTick(() => {
                        // console.log(  document.getElementById("iframeS"), document.getElementById("iframeS333")  )
                        document.getElementById("iframeS").src = this.signImg;
                        document.getElementById("iframeS").addEventListener("load",  () =>{
                            // this.isSignContract = true;
                            // this.finallyShow = true;
                            // console.log(111)
                            // console.log("iframeSiframeSiframeS")
                            // console.log(  document.getElementById("iframeS").src  )
                            this.count++;
                            if(this.count >= 2){
                                this.isSignedC = true;
                            }
                            this.downloadUrl = tool.loadFromLocal("downUrl", "ALL").downUrl.downUrl;
                            // this.downloadUrl = tool.getQueryString("download_url");

                        });
                    })
                    
                }).catch((err) => {
                    if(err.data.success == false){
                    	this.noClick = false;
                        this.$message.error(err.data.msg);
                    }
                })
            }
        },
        sureS(){ //待支付状态时弹窗点击确认
            this.noShowContract = false;
        },
        cancelS(){ //待支付状态时弹窗点击取消
            this.noShowContract = false;
        },
        closeErrWindowsP(){ //待支付状态时弹窗点击×
            this.noShowContract = false;
        }
    },
    beforeDestroy(){
        clearInterval(timerr); //销毁定时器
    }
}
</script>
