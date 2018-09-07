<template>
	<div id="register">
    <div class="c-header">
      <div class="c-hdTopWrap">
        <topState></topState>
        <div class="c-headerBotoom">
          <div class="c-content">
            <div class="logo">
              <nuxt-link to="/" title="微企宝一站式企业服务平台">
                <img class="logo" src="/images/logo.png" alt="微企宝深圳前海公司注册">
              </nuxt-link>
              <span>新用户注册</span>
            </div>
            <div class="questions">已有账户？<a href="#"  @click="toRouter('/loginAndRegister/login')">请登录</a></div>
          </div>
        </div>
      </div>
    </div>
    <div class="formWrap">
      <el-steps :active="stepActive" align-center class="stepWrap" v-if="stepDialogVisble">
        <el-step title="填写基础账户信息" ></el-step>
        <el-step title="完善公司信息" ></el-step>
        <el-step title="提交审核" ></el-step>
      </el-steps>
      <!--用户基本信息1-->
      <el-form :model="registerForm" status-icon :rules="regformRules" ref="registerForm" label-width="100px" class="registerForm">
        <el-form-item label="手 机 号 码" prop="Mobile">
          <el-input  auto-complete="off" placeholder="请输入手机号 "  v-model="registerForm.Mobile"></el-input>
        </el-form-item>
        <el-form-item label="手机验证码"  prop="VerifyCode" class="VerifpayCode" >
          <el-input type="text"  v-model="registerForm.VerifyCode" placeholder="请输入验证码"></el-input>
          <span class="pullnumber" @click="getVerifyCode()">获取验证码</span>
        </el-form-item>
        <el-form-item label="设 置 密 码 " prop="password">
          <el-input type="password" v-model="registerForm.password" auto-complete="off" placeholder="建议至少使用两种字符组成"></el-input>
        </el-form-item>
        <el-form-item label="确 认 密 码" prop="checkPass">
          <el-input type="password" v-model="registerForm.checkPass" auto-complete="off" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <p >
          <input type="checkbox" v-model="registerForm.ischecked">阅读并同意
					<a href="#" style="color: #359af8" @click="dialogVisible = true ">《微企宝用户注册协议》</a>
        </p>
        <div class="el-form-item submit" @click="submitForm('registerForm')">提交</div>
      </el-form>
      <!--公司信息填写2-->
      <div class="companyMsg" style="display: none" >
        <p class="headerText"><span></span>完善公司信息（可跳过）</p>
        <el-form :label-position="labelPosition" label-width="80px" :model="companyForm" ref="companyForm" :rules="companyformRules" class="companyForm">
          <p class="updateText"><span style="color: #df3d3e">*</span>上传营业执照：</p>
          <!--营业执图片照上传-->
          <div class="updateImg">
            <div class="avatar-uploader addUpdate a-upload" >
              <input id="upload" type="file" name="" class="selectImg" @change="upload" >
              <img v-if="headerImage" :src="headerImage" class="avatar">
              <div v-if="headerImage" class="replaceImgText" @change="upload">更换照片</div>
              <i v-else class="icon"><img src="~assets/images/loginAndRegister/click-uploading.png" alt=""></i>
            </div>
            <div class="avatar-uploader sketch" @click="updatedImg_des = !updatedImg_des"></div>
          </div>

          <p class="updateTextdes">请上传工商营业执照，图片要求四角对齐，如有模糊、太暗、有遮挡，则不予认证。</p>
          <p class="updateTextdes">只支持中国大陆工商局或市场监督管理颁发的工商营业执照，且必须在有效期内。</p>

          <p class="needTitel"><span>*</span>公司名称:</p>
          <el-form-item label="" prop="companyName">
            <el-input v-model="companyForm.companyName" placeholder="请输入公司名称"></el-input>
          </el-form-item>
          <p class="needTitel"><span>*</span>社会信用代码:</p>
          <el-form-item label="" prop="creditCode">
            <el-input v-model="companyForm.creditCode" placeholder="请输入社会信用代码"></el-input>
          </el-form-item>

          <el-button type="danger" @click="submitCompanyMsg('companyForm')">立即提交</el-button>
          <el-button plain @click="skipCompanySub()">跳 过</el-button>
        </el-form>
      </div>
      <!--完全注册提示审核3-->
      <div class="regComplete" style="display: none">
        <p class="headerText"><span></span>提交审核</p>
        <div class="completeContent">
          <p class="iconText"><img src="~assets/images/loginAndRegister/complate-icon.png" alt="">提交成功</p>
          <p>您申请的公司信息已提交，审核服务全部免费，预计3个工作日内完成审核。</p>
          <p>温馨提示：认证期间您可以继续 <a href="/productList" class="buyServer">购买服务</a></p>
          <p>还有<span style="color: red">{{tenScond}}</span>秒页面自动 <a href="/">跳转</a></p>
        </div>
      </div>
    </div>
    <div class="c-bottom">
       <publicBottom></publicBottom>
     </div>
    <!--注册协议弹窗层-->
    <el-dialog title="深圳微企宝计算机系统有限公司服务协议" :visible.sync="dialogVisible" :close-on-click-modal="modalClose">
      <div class="contentText" style="height: 450px; overflow: auto">
            &nbsp;&nbsp;&nbsp;&nbsp;本协议由您与深圳微企宝计算机系统有限公司以及深圳微企宝计算机系统有限公司平台服务提供方共同缔结，本协议具有合同效力<br>
            &nbsp;&nbsp;&nbsp;&nbsp;本协议中协议多方合称协议方。<br>
            &nbsp;&nbsp;&nbsp;&nbsp;深圳微企宝计算机系统有限公司在协议中亦称为“深圳微企宝计算机系统有限公司”或者“平台方”，包括“深圳微企宝计算机系统有限公司”网络平台，域名www.wqbol.com”。<br>
            &nbsp;&nbsp;&nbsp;&nbsp;“用户”是指深圳微企宝计算机系统有限公司平台相关服务的使用人，在本协议中更多的称“您”。<br>
          <h5>一、协议内容及签署</h5>
        &nbsp;&nbsp;&nbsp;1.本协议服务是针对深圳微企宝计算机系统有限公司提供的各种服务包括但不限于企业服务、商品交易。协议内容包括协议正文及所有深圳微企宝计算机系统有限公司已经发布的或将来可能发布的各类规则。所有规则为本协议不可分割的组成部分，与协议正文具有同等法律效力。除另行明确声明外，任何深圳微企宝计算机系统有限公司平台发布的服务内容均受本协议约束。<br>
        &nbsp;&nbsp;&nbsp;2.您应当在使用深圳微企宝计算机系统有限公司平台服务之前认真阅读全部协议内容，对于协议中以加粗字体显示的内容，您应重点阅读。如您对协议有任何疑问的，应向深圳微企宝计算机系统有限公司咨询。但无论您事实上是否在使用深圳微企宝计算机系统有限公司平台服务之前认真阅读了本协议内容，只要您使用深圳微企宝计算机系统有限公司平台服务，则本协议即对您产生约束，届时您不应以未阅读本协议的内容或者未获得深圳微企宝计算机系统有限公司对您问询的解答等理由，主张本协议无效，或要求撤销本协议。<br>
        &nbsp;&nbsp;&nbsp;3.深圳微企宝计算机系统有限公司平台的服务方是指具有完全的民事行为能力的自然人或者法人。有关服务方信息您可向深圳微企宝计算机系统有限公司客服申请查看身份信息以及资格证书。<br>
        &nbsp;&nbsp;&nbsp;4.您承诺接受并遵守本协议的约定。如果您不同意本协议的约定，您应立即停止注册程序或停止使用深圳微企宝计算机系统有限公司平台服务。<br>
          第2条 本站服务<br>
        &nbsp;&nbsp;&nbsp;5.深圳微企宝计算机系统有限公司有权根据需要不时地制订、修改本协议及/或各类规则，并以网站公示的方式进行公告，不再单独通知您。变更后的协议和规则一经在网站公布后，立即自动生效。如您不同意相关变更，应当立即停止使用深圳微企宝计算机系统有限公司平台服务。您继续使用深圳微企宝计算机系统有限公司平台服务的，即表示您接受经修订的协议和规则。<br>
        <h5>二、注册</h5>
           &nbsp;&nbsp;1.注册者资格<br>
           &nbsp;&nbsp;您确认，在您完成注册程序或以其他深圳微企宝计算机系统有限公司允许的方式实际使用深圳微企宝计算机系统有限公司平台服务时，您应当是具备完全民事权利能力和完全民事行为能力的自然人、法人或其他组织。若您不具备前述主体资格，则您及您的监护人应承担因此而导致的一切后果，且深圳微企宝计算机系统有限公司有权注销（永久冻结）您的深圳微企宝计算机系统有限公司账户，并向您及您的监护人索偿。您确认，在深圳微企宝计算机系统有限公司及其关联公司注册登记的个人/公司资质为真实有效，并因此承担一切后果。<br>
        &nbsp;&nbsp;&nbsp;2.账户<br>
        &nbsp;&nbsp;&nbsp;在您签署本协议，完成会员注册程序或以其他深圳微企宝计算机系统有限公司允许的方式实际使用深圳微企宝计算机系统有限公司平台服务时，深圳微企宝计算机系统有限公司会向您提供唯一编号的深圳微企宝计算机系统有限公司账户（以下亦称账户）。您可以对账户设置会员名和密码，通过该会员名密码或与该会员名密码关联的其它用户名密码登陆深圳微企宝计算机系统有限公司平台。您设置的会员名不得侵犯或涉嫌侵犯他人合法权益。如您在一年未使用您的会员名和密码登录深圳微企宝计算机系统有限公司平台，深圳微企宝计算机系统有限公司有权终止向您提供深圳微企宝计算机系统有限公司平台服务，注销您的账户。账户注销后，相应的会员名将开放给任意用户注册登记使用。您应对您的账户（会员名）和密码的安全，以及对通过您的账户（会员名）和密码实施的行为负责。除非有法律规定或司法裁定，且征得深圳微企宝计算机系统有限公司的同意，否则，账户（会员名）和密码不得以任何方式转让、赠与或继承（与账户 相关的财产权益除外）。如果发现任何人不当使用您的账户或有任何其他可能危及您的账户安全的情形时，您应当立即以有效方式通知深圳微企宝计算机系统有限公司，要求深圳微企宝计算机系统有限公司暂停相关服务。您理解深圳微企宝计算机系统有限公司对您的请求采取行动需要合理时间，深圳微企宝计算机系统有限公司对在采取行动前已经产生的后果（包括但不限于您的任何损失）不承担任何责任。为方便您使用深圳微企宝计算机系统有限公司平台服务及深圳微企宝计算机系统有限公司关联公司或其他组织的服务（以下称其他服务），您同意并授权深圳微企宝计算机系统有限公司将您在注册、使用深圳微企宝计算机系统有限公司平台服务过程中提供、形成的信息传递给向您提供其他服务的深圳微企宝计算机系统有限公司关联公司或其他组织，或从提供其他服务的深圳微企宝计算机系统有限公司关联公司或其他组织获取您在注册、使用其他服务期间提供、形成的信息。<br>
        &nbsp;&nbsp;&nbsp;3.会员<br>
        &nbsp;&nbsp;&nbsp;在您按照注册页面提示填写信息、阅读并同意本协议并完成全部注册程序后或以其他深圳微企宝计算机系统有限公司允许的方式实际使用深圳微企宝计算机系统有限公司平台服务时，您即成为深圳微企宝计算机系统有限公司平台会员（亦称会员）。在注册时，您应当按照法律法规要求，或注册页面的提示准确提供，并及时更新您的资料，以使之真实、及时，完整和准确。如有合理理由怀疑您提供的资料错误、不实、过时或不完整的，深圳微企宝计算机系统有限公司有权向您发出询问及/或要求改正的通知，并有权直接做出删除相应资料的处理，直至中止、终止对您提供部分或全部深圳微企宝计算机系统有限公司平台服务。深圳微企宝计算机系统有限公司对此不承担任何责任，您将承担因此产生的任何直接或间接支出。您应当准确填写并及时更新您提供的电子邮件地址、联系电话、联系地址、邮政编码等联系方式，以便深圳微企宝计算机系统有限公司或其他会员与您进行有效联系，因通过这些联系方式无法与您取得联系，导致您在使用深圳微企宝计算机系统有限公司平台服务过程中产生任何损失或增加费用的，应由您完全独自承担。您在使用深圳微企宝计算机系统有限公司平台服务过程中，所产生的应纳税赋，以及一切硬件、软件、服务及其它方面的费用，均由您独自承担。<br>
        <h5>三、深圳微企宝计算机系统有限公司平台服务</h5>
          &nbsp;&nbsp;&nbsp;1.通过深圳微企宝计算机系统有限公司平台，客户会员可在深圳微企宝计算机系统有限公司平台上购买服务、查询服务进程、对服务提供会员进行评价、参加深圳微企宝计算机系统有限公司组织的活动以及使用其它信息服务及技术服务。服务方会员可以在深圳微企宝计算机系统有限公司平台上承接订单、查询订单进程、参加深圳微企宝计算机系统有限公司组织的活动以及使用其它信息服务及技术服务。<br>
          &nbsp;&nbsp;&nbsp;2.您在深圳微企宝计算机系统有限公司平台上交易过程中与服务方发生交易纠纷时，一旦您或服务方任一方或双方共同提交深圳微企宝计算机系统有限公司要求调解纠纷，则深圳微企宝计算机系统有限公司有权根据单方判断做出处理决定，该决定将对您具有法律约束力，您了解并同意接受深圳微企宝计算机系统有限公司的判断和调解决定。<br>
        &nbsp;&nbsp;&nbsp;3.您应了解并同意，深圳微企宝计算机系统有限公司有权应政府部门（包括司法及行政部门）的要求，向其提供您在深圳微企宝计算机系统有限公司平台填写的注册信息和交易纪录等必要信息。如您涉嫌侵犯他人知识产权，则深圳微企宝计算机系统有限公司亦有权在初步判断涉嫌侵权行为存在的情况下，向权利人或司法单位提供您必要的身份信息。<br>
        <h5>四、深圳微企宝计算机系统有限公司平台服务使用规范</h5>
        &nbsp;&nbsp;&nbsp;1.在深圳微企宝计算机系统有限公司平台上使用服务过程中，您承诺遵守以下约定：<br>
        &nbsp;&nbsp;&nbsp;a) 在使用深圳微企宝计算机系统有限公司平台服务过程中实施的所有行为均遵守国家法律、法规等规范性文件及深圳微企宝计算机系统有限公司平台各项规则的规定和要求，不违背社会公共利益或公共道德，不损害他人的合法权益，不违反本协议及相关规则。您如果违反前述承诺，产生任何法律后果的，您应以自己的名义独立承担所有的法律责任，并确保深圳微企宝计算机系统有限公司免于因此所产生的任何损失。在服务过程中，深圳微企宝计算机系统有限公司有权力对服务进程进行监控，当发现有不符合国家法律、法规等规范性文件的行为，深圳微企宝计算机系统有限公司可以无条件终止服务，并有权力向主管部门报案，相关信息资料一并移送司法机关。<br>
        &nbsp;&nbsp;&nbsp;b) 在提供服务以及享受服务过程中，遵守诚实信用原则，不实施不正当竞争行为，不扰乱网上交易的正常秩序，不从事与网上交易无关的行为。<br>
        &nbsp;&nbsp;&nbsp;c) 不发布国家禁止销售的或限制销售的商品或服务信息（除非取得合法且足够的许可），
不发布涉嫌侵犯他人知识产权或其它合法权益的商品或服务信息，不发布违背社会公共利益或公共道德或深圳微企宝计算机系统有限公司认为不适合在深圳微企宝计算机系统有限公司平台上销售的商品或服务信息，不发布其它涉嫌违法或违反本协议及各类规则的信息。<br>
&nbsp;&nbsp;&nbsp;&nbsp;d) 不以虚构或歪曲事实的方式不当评价其他会员，不采取不正当方式制造或提高自身的信用度，不采取不正当方式制造或提高（降低）其他会员的信用度；<br>
&nbsp;&nbsp;&nbsp;&nbsp;e) 不对深圳微企宝计算机系统有限公司平台上的任何数据作商业性利用，包括但不限于在未经深圳微企宝计算机系统有限公司事先书面同意的情况下，以复制、传播等任何方式使用深圳微企宝计算机系统有限公司平台站上展示的资料。<br>
&nbsp;&nbsp;&nbsp;&nbsp;f) 不使用任何装置、软件或例行程序干预或试图干预深圳微企宝计算机系统有限公司平台的正常运作或正在深圳微企宝计算机系统有限公司平台上进行的任何交易、活动。您不得采取任何将导致不合理的庞大数据负载加诸深圳微企宝计算机系统有限公司平台网络设备的行动。<br>
&nbsp;&nbsp;&nbsp;&nbsp;2.您了解并同意：<br>
&nbsp;&nbsp;&nbsp;&nbsp;a) 深圳微企宝计算机系统有限公司有权对您是否违反上述承诺做出单方认定，并根据单方认定结果适用规则予以处理或终止向您提供服务，且无须征得您的同意或提前通知予您，您应当无条件接受深圳微企宝计算机系统有限公司的单方认定。<br>
&nbsp;&nbsp;&nbsp;&nbsp;b) 经国家行政或司法机关的生效法律文书确认您存在违法或侵权行为，或者深圳微企宝计算机系统有限公司根据自身的判断，认为您的行为涉嫌违反本协议和/或规则的条款或涉嫌违反法律法规的规定的，则深圳微企宝计算机系统有限公司有权在深圳微企宝计算机系统有限公司平台上公示您的该等涉嫌违法或违约行为及深圳微企宝计算机系统有限公司对您采取的措施。<br>
&nbsp;&nbsp;&nbsp;&nbsp;c) 对于您在深圳微企宝计算机系统有限公司平台上发布的涉嫌违法或涉嫌侵犯他人合法权利或违反本协议和/或规则的信息，深圳微企宝计算机系统有限公司有权不经通知您即予以删除，且按照规则的规定进行处罚。<br>
&nbsp;&nbsp;&nbsp;&nbsp;d) 对于您在深圳微企宝计算机系统有限公司平台上实施的行为，包括您未在深圳微企宝计算机系统有限公司平台上实施但已经对深圳微企宝计算机系统有限公司平台及其用户产生影响的行为，深圳微企宝计算机系统有限公司有权单方认定您行为的性质及是否构成对本协议和/或规则的违反，并据此作出相应处罚。您应自行保存与您行为有关的全部证据，并应对无法提供充足证据而承担不利后果。<br>
&nbsp;&nbsp;&nbsp;&nbsp;e) 对于您涉嫌违反承诺的行为对任意第三方造成损害的，您均应当以自己的名义独立承担所有的法律责任，并应确保深圳微企宝计算机系统有限公司免于因此产生的损失或增加的费用。<br>
&nbsp;&nbsp;&nbsp;&nbsp;f) 如您涉嫌违反有关法律或者本协议之规定，使深圳微企宝计算机系统有限公司遭受任何损失，或受到任何第三方的索赔，或受到任何行政管理部门的处罚，您应当赔偿深圳微企宝计算机系统有限公司因此造成的损失及（或）发生的费用，包括因此产生的律师费用。<br>
<h5>五、特别授权</h5>
您授予深圳微企宝计算机系统有限公司及其关联公司下列权利，该授权不得单方面撤销，且永久成效：<br>
&nbsp;&nbsp;&nbsp;&nbsp;1.一旦您向深圳微企宝计算机系统有限公司平台及（或）其他合作单位或服务方或个人等作出任何形式的承诺，且相关公司已确认您违反了该承诺，则深圳微企宝计算机系统有限公司有权立即按您的承诺或协议约定的方式对您的账户采取限制措施，包括中止或终止向您提供服务，并公示相关公司所确认您的违约情况。您了解并同意，深圳微企宝计算机系统有限公司无须就相关确认与您核对事实，或另行征得您的同意，且深圳微企宝计算机系统有限公司无须就此限制措施或公示行为向您承担任何的责任。<br>
&nbsp;&nbsp;&nbsp;&nbsp;2.一旦您违反本协议，或与深圳微企宝计算机系统有限公司签订的其他协议的约定，深圳微企宝计算机系统有限公司有权以任何方式通知深圳微企宝计算机系统有限公司关联公司，要求其对您的权益采取限制措施，包括但不限于要求将您账户内的保证金等款项支付给深圳微企宝计算机系统有限公司指定的对象，要求关联公司中止、终止对您提供部分或全部服务，且在其经营或实际控制的任何网站公示您的违约情况。<br>
&nbsp;&nbsp;&nbsp;&nbsp;3.对于您提供的资料及数据信息，您授予深圳微企宝计算机系统有限公司及其关联公司独家的、全球通用的、永久的、免费的许可使用权利 (并有权在多个层面对该权利进行再授权)。此外，深圳微企宝计算机系统有限公司及其关联公司有权全部或部分地使用、复制、修订、改写、发布、翻译、分发、执行和展示您的全部资料数据（包括但不限于注册资料、交易行为数据及全部展示于深圳微企宝计算机系统有限公司平台的各类信息）或制作其派生作品，并以现在已知或日后开发的任何形式、媒体或技术，将上述信息纳入其它作品内。<br>
<h5>六、责任范围和责任限制</h5>
&nbsp;&nbsp;&nbsp;&nbsp;1.您应当了解深圳微企宝计算机系统有限公司平台并非实际服务方，您了解深圳微企宝计算机系统有限公司平台上的信息系服务方或客户自行发布，且可能存在风险和瑕疵。深圳微企宝计算机系统有限公司平台仅作为交易地点。深圳微企宝计算机系统有限公司平台仅作为您获取物品货服务信息、服务对象、就物品和/或服务的交易进行协商及开展交易的场所，但深圳微企宝计算机系统有限公司无法控制交易所涉及的物品/服务的质量、安全或合法性，商贸信息的真实性或准确性，以及交易各方履行其在贸易协议中各项义务的能力。您应自行根据服务进程和结果谨慎判断确定相关服务真实性、合法性和有效性，并自行承担因此产生的责任与损失。您在交易之中与服务方发生争议或纠纷时，您应当直接且只能向服务方主张权利。<br>
&nbsp;&nbsp;&nbsp;&nbsp;2.除非法律法规明确要求，或出现以下情况，否则，深圳微企宝计算机系统有限公司没有义务对所有用户的注册数据、商品（服务）信息、交易行为以及与交易有关的其它事项进行事先审查：<br>
&nbsp;&nbsp;&nbsp;&nbsp;a) 深圳微企宝计算机系统有限公司有合理的理由认为特定会员及具体交易事项可能存在重大违法或违约情形。<br>
&nbsp;&nbsp;&nbsp;&nbsp;b) 深圳微企宝计算机系统有限公司有合理的理由认为用户在深圳微企宝计算机系统有限公司平台的行为涉嫌违法或不当。<br>
&nbsp;&nbsp;&nbsp;&nbsp;3.深圳微企宝计算机系统有限公司及其关联公司有权受理您与服务方因交易产生的争议，并有权单方判断与该争议相关的事实及应适用的规则，进而作出处理决定。该处理决定对您有约束力。如您未在限期内执行处理决定的，则深圳微企宝计算机系统有限公司及其关联公司有权利（但无义务）直接使用您个人账户内的款项，或您向深圳微企宝计算机系统有限公司及其关联公司交纳的保证金代为支付。您应及时补足保证金并弥补深圳微企宝计算机系统有限公司及其关联公司的损失，否则深圳微企宝计算机系统有限公司及其关联公司有权直接抵减您在其它合同项下的权益，并有权继续追偿。您理解并同意，深圳微企宝计算机系统有限公司及其关联公司并非司法机构，仅能以普通人的身份对证据进行鉴别，深圳微企宝计算机系统有限公司及其关联公司对争议的调处完全是基于您的委托，深圳微企宝计算机系统有限公司及其关联公司无法保证争议处理结果符合您的期望，也不对争议调处结论承担任何责任。如您因此遭受损失，您同意自行向受益人索偿。<br>
&nbsp;&nbsp;&nbsp;&nbsp;4.您了解并同意，深圳微企宝计算机系统有限公司不对因下述任一情况而导致您的任何损害赔偿承担责任，包括但不限于利润、商誉、使用、数据等方面的损失或其它无形损失的损害赔偿 (无论深圳微企宝计算机系统有限公司是否已被告知该等损害赔偿的可能性) <br>
&nbsp;&nbsp;&nbsp;&nbsp;a) 使用或未能使用深圳微企宝计算机系统有限公司平台服务。<br>
&nbsp;&nbsp;&nbsp;&nbsp;b) 第三方未经批准的使用您的账户或更改您的数据。<br>
&nbsp;&nbsp;&nbsp;&nbsp;c) 通过深圳微企宝计算机系统有限公司平台服务购买或获取任何商品、样品、数据、信息或进行交易等行为或替代行为产生的费用及损失。<br>
&nbsp;&nbsp;&nbsp;&nbsp;d) 您对深圳微企宝计算机系统有限公司平台服务的误解。<br>
&nbsp;&nbsp;&nbsp;&nbsp;e) 任何非因深圳微企宝计算机系统有限公司的原因而引起的与深圳微企宝计算机系统有限公司平台服务有关的其它损失。<br>
&nbsp;&nbsp;&nbsp;&nbsp;5.不论在何种情况下，深圳微企宝计算机系统有限公司均不对由于信息网络正常的设备维护，信息网络连接故障，电脑、通讯或其他系统的故障，电力故障，罢工，劳动争议，暴乱，起义，骚乱，生产力或生产资料不足，火灾，洪水，风暴，爆炸，战争，政府行为，司法行政机关的命令或第三方的不作为而造成的不能服务或延迟服务承担责任。<br>
<h5>七、协议终止</h5>
&nbsp;&nbsp;&nbsp;&nbsp;1.您同意，深圳微企宝计算机系统有限公司有权自行全权决定以任何理由不经事先通知的中止、终止向您提供部分或全部深圳微企宝计算机系统有限公司平台服务，暂时冻结或永久冻结（注销）您的账户，且无须为此向您或任何第三方承担任何责任。<br>
&nbsp;&nbsp;&nbsp;&nbsp;2.出现以下情况时，深圳微企宝计算机系统有限公司有权直接以注销账户的方式终止本协议<br>
&nbsp;&nbsp;&nbsp;&nbsp;a) 深圳微企宝计算机系统有限公司终止向您提供服务后，您涉嫌再一次直接或间接或以他人名义注册为深圳微企宝计算机系统有限公司用户的；<br>
&nbsp;&nbsp;&nbsp;&nbsp;b) 您提供的电子邮箱不存在或无法接收电子邮件，且没有其他方式可以与您进行联系，或深圳微企宝计算机系统有限公司以其它联系方式通知您更改电子邮件信息，而您在深圳微企宝计算机系统有限公司通知后三个工作日内仍未更改为有效的电子邮箱的。<br>
&nbsp;&nbsp;&nbsp;&nbsp;c) 您注册信息中的主要内容不真实或不准确或不及时或不完整。<br>
&nbsp;&nbsp;&nbsp;&nbsp;d) 本协议（含规则）变更时，您明示并通知深圳微企宝计算机系统有限公司不愿接受新的服务协议的；<br>
&nbsp;&nbsp;&nbsp;&nbsp;e) 其它深圳微企宝计算机系统有限公司认为应当终止服务的情况。<br>
&nbsp;&nbsp;&nbsp;&nbsp;3.您有权向深圳微企宝计算机系统有限公司要求注销您的账户，经深圳微企宝计算机系统有限公司审核同意的，深圳微企宝计算机系统有限公司注销（永久冻结）您的账户，届时，您与深圳微企宝计算机系统有限公司基于本协议的合同关系即终止。您的账户被注销（永久冻结）后，深圳微企宝计算机系统有限公司没有义务为您保留或向您披露您账户中的任何信息，也没有义务向您或第三方转发任何您未曾阅读或发送过的信息。<br>
&nbsp;&nbsp;&nbsp;&nbsp;4.您同意，您与深圳微企宝计算机系统有限公司的合同关系终止后，深圳微企宝计算机系统有限公司仍享有下列权利<br>
&nbsp;&nbsp;&nbsp;&nbsp;a) 继续保存您的注册信息及您使用深圳微企宝计算机系统有限公司平台服务期间的所有交易信息。<br>
&nbsp;&nbsp;&nbsp;&nbsp;b) 您在使用深圳微企宝计算机系统有限公司平台服务期间存在违法行为或违反本协议和/或规则的行为的，深圳微企宝计算机系统有限公司仍可依据本协议向您主张权利。<br>
&nbsp;&nbsp;&nbsp;&nbsp;5.深圳微企宝计算机系统有限公司中止或终止向您提供深圳微企宝计算机系统有限公司平台服务后，对于您在服务中止或终止之前的交易行为依下列原则处理，您应独力处理并完全承担进行以下处理所产生的任何争议、损失或增加的任何费用，并应确保深圳微企宝计算机系统有限公司免于因此产生任何损失或承担任何费用：<br>
&nbsp;&nbsp;&nbsp;&nbsp;a) 您在服务中止或终止之前已经上传至深圳微企宝计算机系统有限公司平台的物品尚未交易的，深圳微企宝计算机系统有限公司有权在中止或终止服务的同时删除此项物品或服务的相关信息；<br>
&nbsp;&nbsp;&nbsp;&nbsp;b) 您在服务中止或终止之前已经与其他会员达成相关服务合同，但合同尚未实际履行的，深圳微企宝计算机系统有限公司有权删除该买卖合同及其交易的相关信息；<br>
&nbsp;&nbsp;&nbsp;&nbsp;c) 您在服务中止或终止之前已经与服务方达成相关服务合同且已部分履行的，深圳微企宝计算机系统有限公司可以不删除该项交易，但深圳微企宝计算机系统有限公司有权在中止或终止服务的同时将相关情形通知您的交易对方。<br>
&nbsp;&nbsp;&nbsp;&nbsp;e) 对于一次性订单服务，在服务提供完成，款项支付完毕，完工成果交接完成之后相应订单即终止。<br>
&nbsp;&nbsp;&nbsp;&nbsp;f) 对一定周期内的服务，例如年度服务，则按照服务性质按月份或者季度提供子服务，子服务在客户完成资料交接即终止。具体服务内容应参考客户支付服务套餐时候设定的服务内容为准，当服务内容与政策、法律法规相冲突时候，以政策、法律法规为准。您在深圳微企宝计算机系统有限公司平台支付享受服务或者承接服务时候，应详细查看服务内容项目。当发生误解时候，您可以向深圳微企宝计算机系统有限公司咨询，但深圳微企宝计算机系统有限公司有权不承担超出服务套餐外的服务。<br>
<h5>八、隐私权政策</h5>
&nbsp;&nbsp;&nbsp;&nbsp;深圳微企宝计算机系统有限公司将在深圳微企宝计算机系统有限公司平台公布并不时修订隐私权政策，隐私权政策构成本协议的有效组成部分。您可通过官方网站查询深圳微企宝计算机系统有限公司的隐私政策。<br>
<h5>九、法律适用、管辖与其他</h5>
&nbsp;&nbsp;&nbsp;&nbsp;1.本协议之效力、解释、变更、执行与争议解决均适用中华人民共和国法律，如无相关法律规定的，则应参照通用国际商业惯例和（或）行业惯例。<br>
&nbsp;&nbsp;&nbsp;&nbsp;2.因本协议产生之争议，应依照中华人民共和国法律予以处理，任一方可向深圳国际仲裁院（即中国国际经济贸易仲裁委员会华南分会）申请仲裁。<br>
      </div>
      <div class="towBtn">
        <el-button type="info" @click="toRouter('/')">取消</el-button>
        <el-button type="danger" @click="agreeMent()">同意并注册</el-button>
      </div>
    </el-dialog>
    <!--公司示意弹窗-->
    <div class="updatedImg_des" v-show="updatedImg_des">
      <div class="contentWrap">
        <div class="close" @click="updatedImg_des = !updatedImg_des"><img src="~assets/images/loginAndRegister/close.png" alt=""></div>
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
  </div>
</template>

<script>
  import axios from 'axios'
  import topState from "../../components/common/topState"
  import publicBottom from "../../components/common/publicBottom"
//   import {setStore,getStore} from '../../../util/storage'
  import tool from '~/assets/lib/tool'
  import CryptoJS from 'crypto-js'
  import getData from '~/store/ajaxAPI/getData'
  import { mapState,mapActions,mapGetters} from 'vuex';

  var sendTiemr = null;
  export default{
    data() {//表单校验
      var Mobile = (rule, value, callback) => {
        let MobileReg = /^[1][3,4,5,7,8][0-9]{9}$/;
          if (!value) {
            return callback(new Error('手机号不能为空'));
          }
          setTimeout(()=>{
            if (!Number(value)) {
              callback(new Error('格式错误，请输入数字值'));
            } else if(!MobileReg.test(value)){
              callback(new Error('格式错误，请输入正确手机号'));
            }else {
              callback();
            }
          },1000)
        };
      var VerifyCode = (rule, value, callback) => {
          let VerifyCodeReg = /^[0-9]{6}$/ ;
        if (!value) {
          return callback(new Error('验证码不能为空'));
        }else if(!VerifyCodeReg.test(value)){
          return callback(new Error('请检查格式，验证码必须6位数字'));
        }else {
          callback();
        }

      };
      var password = (rule, value, callback) => {
          let passwordReg =  /([a-zA-Z0-9!@#$%^&*.()_?<>{}]){6,18}/;  //正常密码格式
        /*let numAndCodeReg = /^(?![^a-zA-Z]+$)(?!\D+$)/;
        else if(!numAndCodeReg.test(value)){
          callback(new Error('密码必须至少有数字和字母的组合'));
        }*/
        if (value === '') {
            callback(new Error('请输入密码'));
          }else if(!passwordReg.test(value) ) {
            callback(new Error('请输入6-18位密码'));
          }else{
            callback();
          }
      };
      var checkPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      //公司信息部分
      var companyName = (rule, value, callback) => {
        var reg = /^[\(\)\（\）\u4e00-\u9fa5\w]{3,50}$/;
        if (value === '') {
          callback(new Error('请输入公司名称'));
        } else if (!reg.test(value)) {
          callback(new Error('确保在长度和规范范围内!'));
        } else {
          callback();
        }
      };
      var creditCode = (rule, value, callback) => {
        var reg = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/g;
        if (!value) {
          callback(new Error('请输入社会信用代码'));
        } else if (!reg.test(value)) {
          callback(new Error('请输入由十八位阿拉伯数字或大写字母(不使用IOZSV)组成的信用代码'));
        } else {
          callback();
        }
      };
      return {
        stepActive: 1,
        labelPosition: 'top',
        stepDialogVisble: false,  //初始進步條 不可見
        modalClose: false,        //弹窗外部点击不关闭
        dialogVisible: true,      //注册协议弹窗
        updatedImg_des: false,    //公司图片上传示意弹窗
        codeSending: false,
        headerImage:'',            //公司图片 base64
        loading: false,            //营业执照图片加载
        tenScond: 10,
        //VerifyCodeNow: '',  //获取到的当前验证码
        registerForm: {
            Mobile:'',
            VerifyCode: '',
            password: '',
            checkPass: '',
            ischecked: '',
        },
        companyForm:{
          companyName: '',
          creditCode: null,
          person: '',            //法人
          establishmentDate: ''  //成立日期
        },
        regformRules: {
          Mobile: [
            { validator: Mobile, trigger: 'blur' }
          ],
          VerifyCode: [
            { validator: VerifyCode, trigger: 'blur' }
          ],
          password: [
            { validator: password, trigger: 'blur' }
          ],
          checkPass: [
            { validator: checkPass, trigger: 'blur' }
          ],
        },
        companyformRules: {
          companyName: [
            { validator: companyName, trigger: 'blur' }
          ],
          creditCode: [
            { validator: creditCode, trigger: 'blur' }
          ],
        }
      };
    },
    computed:{
      ...mapGetters({
        loginInfo:'login/login/loginInfo',
      })
    },
    methods: {
        ...mapActions(
        {
          "request_getCode":"accountSetting/accountSetting/request_getCode",
          "request_register":"login/login/request_register",
          "request_login":"login/login/request_login",
          "request_submitCompany":"login/login/request_submitCompany",
          'loginDVisible':'loginDVisible'//登陆后 注入vuex
        }
      ),
        //路由跳转
        toRouter(path){
            this.$router.push(path)
        },
        //同意协议
        agreeMent(){
          this.registerForm.ischecked = true;
          this.dialogVisible = false;
        },
        //获取验证码
        getVerifyCode(){
          let tel = tool.regularJudgement("phone",this.registerForm.Mobile);
          if(!tel){
           this.$message.error("请输入正确的手机号");
            return;
          }
          if(this.codeSending){
            return;
          }
          this.codeSending =true;
          let loadingtime = 120;  //等待重新获取的时间
          sendTiemr = setInterval(()=>{
            loadingtime --;
            if(loadingtime <= 0){
              $('.pullnumber').html('重新获取');
              this.codeSending =false;
              clearInterval(sendTiemr);
            }else {
              $('.pullnumber').html(loadingtime +'s');
            }
          },1000);
          //发送请求获取验证码
          var params = {
            mobile: this.registerForm.Mobile
          }
          getData.getVerification(params).then((res) => {
            this.$message({
              message: '恭喜您，成功获取手机验证码',
              type: 'success'
            });
          }).catch((err) => {
            if(err.data.msg == "输入的手机号码格式不正确"){
              this.$message.error(err.data.msg);
            }
            // console.log("err",err);
          });
        },
        //用户注册表单提交
        submitForm(formName) {
          var  passwordEncrypt =  CryptoJS.AES.encrypt(this.registerForm.password, '59964e5d540e446cf98bc2af78a2ea58');//密码加密
          this.$refs[formName].validate((valid) => {
            if (valid && this.registerForm.ischecked) {
              //前端表单校验不通过处理

              let params = {
                Mobile: this.registerForm.Mobile,
                Password: passwordEncrypt,
                VerifyCode: this.registerForm.VerifyCode,
                isApp: false,
                Password:encodeURI(passwordEncrypt.toString()),
                openSSL:true,
                regSource:1//来源
              }
              // this.request_register(params).then((res) => {
              getData.register(params).then((res) => {
                //进度顯示并加一，样式版面切换
                this.stepDialogVisble = true;
                this.stepActive ++;
                $('.registerForm').css('display','none');
                $('.companyMsg').css('display','block');
                //提示个人注册成功
                this.$message({
                  message: '恭喜您，个人用户注册成功，如果公司注册请完善下面信息，非公司用注册可直接点击《跳过》',
                  type: 'success',
                  duration: 10000
                });
                // 登录
                var datas = {
                  LoginName: this.registerForm.Mobile,
                  Password: encodeURI(passwordEncrypt.toString()),
                  openSSL:true,
                  dataType:'json'
                }
                //存储提交公司信息，所需的用户token
                  getData.login(datas).then((res) => {
                  //存储用户自动登录账号信息
                    tool.saveToLocal("CustomerMesg",res)
                    this.loginDVisible(res);// 发送store/index.js 共享登录
                    //触发空实例的自定义事件
                    this.$eventHandle.$emit('get-login',true);
                  },(err)=>{
                  })
              }).catch((err) =>{
                if(err.data.msg == "验证码已过期，请重新获取" ){
                  this.$message.error(err.data.msg);
                }else if(err.data.msg == "该手机号已被注册！"){
                  this.$message.error(err.data.msg);
                }else if(err.data.msg == "手机验证码输入错误，请重新输入"){
                  this.$message.error(err.data.msg);
                }
              })
            } else {
              this.$message.error('输入有误，请检查填写信息');
              return false;
            }
          })
          /*此处代供测试图片上传暂时显示,功能完善要去掉*/
        },
        //清空表单
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        //公司信息提交  headerImage
        submitCompanyMsg(formName){
          this.$refs[formName].validate((valid)=>{
              //表单校验通过
            if(valid){
              if(this.headerImage != ''){
                var params = {
                  Name: this.companyForm.companyName.trim(),
                  SocialCreditCode: this.companyForm.creditCode.trim(),
                  BusinessLicensePic: this.headerImage,
                }
                getData.submitCompany(params)
                .then((res) => {
                  this.stepActive ++;
                  $('.companyMsg').css('display','none');
                  $('.regComplete').css('display','block');
                    var tenScondTimer = setInterval(()=>{
                      this.tenScond--;
                      if(this.tenScond<=0){
                        this.$router.push('/');
                        clearInterval(tenScondTimer);
                      }
                    },1000)
                })
                .catch((error)=>{
                  if(error.data.msg == "系统存在相同的公司名称！"){
                    this.$message.error(error.data.msg);
                    return;
                  }
                })
              }else{
                this.$message.error('请上传公司营业执照');
              };
          }else {
            this.$message.error('输入有误，请检查填写信息');
            return false;
          }
          })

        },
        //跳过公司注册
        skipCompanySub(){
          //暂时处理为10s后 跳到登录页面
          this.$message({
            message: '请您耐心等待，几秒后系统将跳转到首页',
            type: 'success',
            duration: 5000
          });
          setTimeout(()=>{
           // debugger;
            this.$router.push('/');
          },5000)
        },
      	upload(){
          let loadingInstance = this.$loading({ fullscreen: true })
            var self = this;
            // 选择的文件对象
            var file = null;
            var baseStr = null;
            var eleFile = document.querySelector('#upload');
            self.loading = true;   //点击上传时 进入等待
            // 压缩图片需要的一些元素和对象
            var reader = new FileReader(), img = new Image();
            if(!eleFile.files.length) return;
            file = eleFile.files[0];
              // 选择的文件是图片
              if (file.type.indexOf("image") == 0) {
                  reader.readAsDataURL(file);
              }
            // 缩放图片需要的canvas
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');

            // base64地址图片加载完毕后
            img.onload = function () {
                // 图片原始尺寸
                var originWidth = this.width;
                var originHeight = this.height;
                // 最大尺寸限制
                var maxWidth = 400, maxHeight = 400;
                // 目标尺寸
                var targetWidth = originWidth, targetHeight = originHeight;
                // 图片尺寸超过400x400的限制
                if (originWidth > maxWidth || originHeight > maxHeight) {
                    if (originWidth / originHeight > maxWidth / maxHeight) {
                        // 更宽，按照宽度限定尺寸
                        targetWidth = maxWidth;
                        targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                    } else {
                        targetHeight = maxHeight;
                        targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                    }
                }

                // canvas对图片进行缩放
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                // 清除画布
                context.clearRect(0, 0, targetWidth, targetHeight);
                // 图片压缩
                context.drawImage(img, 0, 0, targetWidth, targetHeight);
                baseStr = canvas.toDataURL("image/png");//压缩后base64数据
              };

              // 文件base64化，以便获知图片原始尺寸
              reader.onload = function(e) {
                //压缩前base64数据
                var imgData = e.target.result;
                imgData = imgData.substring(imgData.indexOf(",")+1);

               var params = {
							"inputs": [
						    {
						      "image": {
						        "dataType": 50,
						        "dataValue": imgData
						      }
						    }
						  ]
            }
						getData.businessLicense("post",params)
						.then((response)=>{
              self.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭  首页加载完毕后停止loading 界面
                  loadingInstance.close();
                });
              var obj = JSON.parse(response.outputs[0].outputValue.dataValue);
              var token = tool.loadFromLocal("CustomerMesg","ALL").Token;
					    //传给后台
							var acv = new FormData();
							acv.append('file', file);
							acv.append('Token',token);
							acv.append('type', 'businessLicense');
							getData.upNetImage(acv)
							.then((res)=>{
								self.headerImage = res.data.storeResult.path;
							})
							.catch((error)=>{
              })
					    //判断是否识别出
					    if(obj.name&&(obj.name!="FailInRecognition")){
					    	self.companyForm.companyName = obj.name;
					    }else{
					    	self.companyForm.companyName = "";
					    }
					    if(obj.reg_num&&(obj.reg_num!="FailInRecognition")){
					    	self.companyForm.creditCode = obj.reg_num;
					    }else{
					    	self.companyForm.creditCode = "";
					    }
					    if(obj.person&&(obj.person!="FailInRecognition")){
					    	self.companyForm.person = obj.person;
					    }else{
					    	self.companyForm.person = "";
					    }
					    if(obj.establish_date&&(obj.establish_date!="FailInRecognition")){
					    	self.companyForm.establishmentDate = obj.establish_date.substring(0,4)+"-"+obj.establish_date.substring(4,6)+"-"+obj.establish_date.substring(6);
					    }else{
					    	self.companyForm.establishmentDate = "";
              }
						})
						.catch( (error)=> {
              self.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭  首页加载完毕后停止loading 界面
                  loadingInstance.close();
                });
					    self.headerImage = "";
					    self.companyForm.companyName = "";
					    self.companyForm.creditCode = "";
              self.$message.error('请重新上传清晰的营业执照图像');
						});
                  //调用上面的img.load
                  // img.src = e.target.result;
                  self.headerImage = e.target.result;
              };
		},
        //处理图片上传 --结束
    },
    watch:{
      dialogVisible: function (val) {
        if(val == false && this.registerForm.ischecked == false){
          this.$router.push('/')
        }
      }
    },
    components:{
      topState,
      publicBottom
    },
    beforeDestroy(){ //清除定时器
      clearInterval(sendTiemr);
    },
  }
</script>

<style lang="less" type="stylesheet/css" >
  @import "register.less";
</style>
