<template><!--关于微企宝-->
	<div id="inRegardTo">
		<navigationBar :topShopData="topShopData" :serverList="serverList" @toChange="toChange"></navigationBar>
		<publicPendantR></publicPendantR>
		<div class="inRegardTo">
			<div class="inRegardTo_left">
				<ul>
					<li :class="num==0?'active':''" @click="inRegardToLi(this,$event)">关于我们</li>
					<li :class="num==1?'active':''" @click="inRegardToLi(this,$event)">招聘信息</li>
					<!-- <li :class="num==2?'active':''" @click="inRegardToLi(this,$event)">新闻公告</li> -->
					<li :class="num==3?'active':''" @click="inRegardToLi(this,$event)">联系我们</li>
				</ul>
			</div>
			<div class="inRegardTo_right">
				<!--关于我们-->
				<div class="aboutUs" v-if="num==0">
					<div class="aboutUs_top">微企宝简介</div>
					<img src="~assets/images/tabBar/wqbL.png">
					<P><span>深圳微企宝计算机系统有限公司</span>于2013年11月成立，隶属于荣灿集团，由深圳荣灿大数据技术有限公司投资兴办，是一家专业从事信息化管理软件研发、互联网应用软件开发以及综合大数据服务的创新型科技企业。</P>
					<p>目前深圳微企宝自主研发的“微企宝”线上系统，集云记账、云代账、云报税于一体，涵盖工商服务、知识产权、资质审批、挂牌服务、电子发票、“扫票”（扫描二维码）自动生成凭证、一键报税、线上下单、智能派单等9大功能，旨在以更高效的速度和更便捷的方式为企业解决“记账难、记账慢”的问题，为企业提供从初创、发展到永续经营全过程中所需要的一系列服务。未来微企宝平台将本着共享、分享的理念，整合各方资源，实现利益共享、多方共赢，打造一个综合的企业服务大数据平台。</p>
					<br />
					<h2>集团简介</h2>
					<p>荣灿集团总部坐落于深圳宝安区西乡智谷科技园，至今已有近十年历史，旗下拥有深圳荣灿大数据、深圳微企宝等9家分支机构，涵盖互联网、金融、房地产、影视传媒等多个领域。</p>
					<p>深圳荣灿大数据技术有限公司是一家创新型金融企业，可为企业提供顶层商业模式设计、股权激励方案、融资方案、并购重组方案、IPO、“新三板”及“新四板”上市辅导、股权投资等一系列市值运作服务。</p>
					<p>深圳微企宝计算机系统有限公司是一家创新型科技企业，其研发的“微企宝”线上系统，涵盖工商服务、记账报税、知识产权、资质审批、挂牌服务、电子发票、“扫票”自动生成凭证、线上下单、智能派单等9大功能，可为企业提供从初创、发展到永续经营全过程中的所有服务。</p>
				</div>
				<!--招聘信息-->
				<div class="Recruitment" v-if="num==1">
					<div class="Recruitment_top">招聘信息</div>
					<ul class="Recruitment_content">
						<li>
							<ul>
								<li>产品运营经理</li>
								<li>工作地点：深圳</li>
								<li>招聘人数：3人</li>
								<li>2018-04-21</li>
							</ul>
							<div class="describe">
								<span>岗位职责：1、负责微企宝整体方案的规划和制定，包括运营策略的输出、市场和渠道策略的确定；2、负责微企宝整体方案的规划和制定，包括运营策略的输出、市场和渠道策略的确定；</span>
								<span>任职要求：1、本科以上学历，具有3年以上互联网产品运营或市场运营经验者优先；2、了解用户和需求，注重用户感受及体验，善于把握互联网产品的消费、喜好心理； </span>
								<a @click="recruitmentDetails(this,$event)">【详情】</a>
							</div>
							<!--招聘详情-->
							<div class="recruitmentDetails">
								<div class="headline"><span>岗位职责</span></div>
								<p>1、负责微企宝整体方案的规划和制定，包括运营策略的输出、市场和渠道策略的确定；</p>
								<p>2、深度分析用户行为，通过数据挖掘方法建立用户行为模型，预测产品走向；</p>
								<p>3、深度分析用户行为，通过数据挖掘方法建立用户行为模型，预测产品走向； </p>
								<p>4、监控日常运营指标，完成数据分析报告。</p>
								<p>5、整体调配合作方、技术、客服、市场等内外资源，保证微企宝产品顺利运营。</p>
								<p>6、连接市场和产品的纽带，根据运营需要合理提出与整理需求对接产品部门，确保系统的合理性以及及时上线。</p>
								<p>7、不断的调整和优化产品，以提高用户使用体验，使得产品更加适合市场发展。</p>
								<div class="headline"><span>任职要求</span></div>
								<p>1、本科以上学历，具有3年以上互联网产品运营或市场运营经验者优先；</p>
								<p>2、了解用户和需求，注重用户感受及体验，善于把握互联网产品的消费、喜好心理；</p>
								<p>3、具有计划统筹能力，面负责运营数据分析及互联网产品市场调研工作，针对市场变化制定相应策略；</p>
								<p>4、思维敏捷，高抗压能力，熟悉互联网产品运营市场，对互联网企业服务一点式产业链各环节有足够深入的了解，有一定行业人脉圈资源优先；</p>
								<span class="detailsSpan">加入我们，详情请电：0755-29666316 &nbsp&nbsp&nbsp       18902487821/13723708172 武先生</span>
								<span class="returnlist" @click="returnlist">返回招聘列表</span>
							</div>
						</li>
						<li>
							<ul>
								<li>董事长助理</li>
								<li>工作地点：深圳</li>
								<li>招聘人数：3人</li>
								<li>2018-04-21</li>
							</ul>
							<div class="describe">
								<span>岗位职责：1、协助董事长处理日常管理工作；2、协助董事长处理外部关系维护；3、负责董事长指示的上传下达，跟踪决议事项的推进与反馈；</span>
								<span>任职要求：1、本科及以上学历，管理类、法律、中文或文秘类专业,有互联网行业管理相关专业背景优先；2、具有较强的人际交往、沟通、计划、执行与写作能力； </span>
								<a @click="recruitmentDetails(this,$event)">【详情】</a>
							</div>
							<!--招聘详情-->
							<div class="recruitmentDetails">
								<div class="headline"><span>岗位职责</span></div>
								<p>1、协助董事长处理日常管理工作；</p>
								<p>2、协助董事长处理外部关系维护；</p>
								<p>3、负责董事长指示的上传下达，跟踪决议事项的推进与反馈；</p>
								<p>4、负责起草对内对外各种文件的起草，筹备相关会议并做到落实；</p>
								<p>5、完成董事长安排的其他工作。</p>
								<div class="headline"><span>任职要求</span></div>
								<p>1、本科及以上学历，管理类、法律、中文或文秘类专业,有互联网行业管理相关专业背景优先；</p>
								<p>2、具有较强的人际交往、沟通、计划、执行与写作能力；</p>
								<p>3、具备良好的服务意识，熟知商务礼仪，谈吐举止得体；</p>
								<p>4、品行端正，保密意识与抗压力强，有团队合作精神；</p>
								<span class="detailsSpan">加入我们，详情请电：0755-29666316 &nbsp&nbsp&nbsp       18902487821/13723708172 武先生</span>
								<span class="returnlist" @click="returnlist">返回招聘列表</span>
							</div>
						</li>
						<li>
							<ul>
								<li>行政经理</li>
								<li>工作地点：深圳</li>
								<li>招聘人数：3人</li>
								<li>2018-04-21</li>
							</ul>
							<div class="describe">
								<span>职位描述：1、协助部门负责人主持编制公司行政管理规章制度，监督和检查各项行政制度的执行情况。拟定行政工作计划、总结重点落实，对行政重要决策和布置行政工作的执行情况进行监督、检查和反馈。</span>
								<span>任职要求：1、大专以上学历，在互联网行业或大中型企业从事行政管理、人力资源工作5年以上。2、具有良好的语言表达能力和沟通理解能力；</span>
								<a @click="recruitmentDetails(this,$event)">【详情】</a>
							</div>
							<!--招聘详情-->
							<div class="recruitmentDetails">
								<div class="headline"><span>职位描述</span></div>
								<p>1、协助部门负责人主持编制公司行政管理规章制度，监督和检查各项行政制度的执行情况。拟定行政工作计划、总结重点落实，对行政重要决策和布置行政工作的执行情况进行监督、检查和反馈；</p>
								<p>2、协助部门负责人推动与执行公司整体各部门绩效考核管理指标定位与指标落实，狠抓绩效管理与行政奖惩管理；</p>
								<p>3、协助各部门筹划和组织企业的重大活动；</p>
								<p>4、负责组织公司全体员工的培训及培训后效果考核工作；</p>
								<p>5、负责公司各岗各职位人员人事招聘工作。负责考勤及办理员工的入职、请假、调动、离职等相关手续，建立员工档案资料。妥善处理劳资关系。管理员工医保、社保、公积金，及其相关事宜；</p>
								<div class="headline"><span>任职要求</span></div>
								<p>1、大专以上学历，在互联网行业或大中型企业从事行政管理、人力资源工作5年以上；</p>
								<p>2、具有良好的语言表达能力和沟通理解能力；</p>
								<p>3、为人忠诚、信实、尚德，能够深入基层和一线，独当一面了解问题、分析问题、解决问题；敢于大担管理，用管理制度管人的执行能力特别强；</p>
								<p>4、行政工作执行力非常强，有一定的抗压力能力。</p>
								<span class="detailsSpan">加入我们，详情请电：0755-29666316 &nbsp&nbsp&nbsp       18902487821/13723708172 武先生</span>
								<span class="returnlist" @click="returnlist">返回招聘列表</span>
							</div>
						</li>
						<li>
							<ul>
								<li>在线客服经理</li>
								<li>工作地点：深圳</li>
								<li>招聘人数：3人</li>
								<li>2018-04-21</li>
							</ul>
							<div class="describe">
								<span>职位描述：1、带头做好在线销售工作，管理好在线销售团队，提高在线转化率；2、组织在线咨询师的培训与管理，提高在线人员的能力素质；</span>
								<span>任职要求：1、本科以上学历，3年以上相关在线工作经验；2、熟悉互联网整体客服管理，强烈的敬业精神和责任感，能承受较强工作压力；</span>
								<a @click="recruitmentDetails(this,$event)">【详情】</a>
							</div>
							<!--招聘详情-->
							<div class="recruitmentDetails">
								<div class="headline"><span>职位描述</span></div>
								<p>1、带头做好在线销售工作，管理好在线销售团队，提高在线转化率；</p>
								<p>2、组织在线咨询师的培训与管理，提高在线人员的能力素质；</p>
								<p>3、在线客服部门的业绩目标制定与分解，高效完成在线任务目标，提高在线转化能力及专业能力，在线咨询流程的优化与专业化提升；</p>
								<p>4、建立优化在线沟通话术及提升对话专业能力，主要接收线上云服务咨询用户，熟练与专业的解答客户问题，提高客户体验度；</p>
								<p>5、对于咨询非云服务的用户引导线上成交或者传递商务团队；</p>
								<div class="headline"><span>任职要求</span></div>
								<p>1、本科以上学历，3年以上相关在线工作经验；</p>
								<p>2、熟悉互联网整体客服管理，强烈的敬业精神和责任感，能承受较强工作压力；</p>
								<p>3、具有较强的组织协调能力、优秀的沟通和良好的团队合作精神；</p>
								<p>4、性格细致耐心，做事严谨踏实；</p>
								<span class="detailsSpan">加入我们，详情请电：0755-29666316 &nbsp&nbsp&nbsp       18902487821/13723708172 武先生</span>
								<span class="returnlist" @click="returnlist">返回招聘列表</span>
							</div>
						</li>
						<li>
							<ul>
								<li>商务咨询顾问（销售经理）</li>
								<li>工作地点：深圳</li>
								<li>招聘人数：3人</li>
								<li>2018-04-21</li>
							</ul>
							<div class="describe">
								<span>职位描述：1、根据商务咨询营销战略目标任务，定期按计划完成销售业绩；2、协助销售总监对商务咨询拓展团队人员（商务咨询专员）进行系统培训；</span>
								<span>任职要求：1、大专以上学历，电子商务、金融管理、市场营销等专业；2、从事互联网平台销售管理工作，负责商务拓展工作，对线下拓展与客户达成合作，线上对客服传递咨询服务，客户来源包括线下独立开发客户，线上咨询客户；</span>
								<a @click="recruitmentDetails(this,$event)">【详情】</a>
							</div>
							<!--招聘详情-->
							<div class="recruitmentDetails">
								<div class="headline"><span>职位描述</span></div>
								<p>1、根据商务咨询营销战略目标任务，定期按计划完成销售业绩；</p>
								<p>2、协助销售总监对商务咨询拓展团队人员（商务咨询专员）进行系统培训；</p>
								<p>3、定期对互联网市场营销环境、目标、计划、业务活动进行核查分析，及时调整营销策略和计划，制订预防和纠正措施，确保完成营销目标和营销计划；</p>
								<div class="headline"><span>任职要求</span></div>
								<p>1、大专以上学历，电子商务、金融管理、市场营销等专业；</p>
								<p>2、从事互联网平台销售管理工作，负责商务拓展工作，对线下拓展与客户达成合作，线上对客服传递咨询服务，客户来源包括线下独立开发客户，线上咨询客户；</p>
								<p>3、性格外向、反应敏捷，有责任心，能承受较大的工作压力，愿意接受持续挑战；</p>
								<p>4、有一定业务能力、客户服务人脉、团队培训经验或能力者优先；</p>
								<p>5、薪酬待遇：基本工资+高业绩提成+绩效奖励+年终奖励</p>
								<span class="detailsSpan">加入我们，详情请电：0755-29666316 &nbsp&nbsp&nbsp       18902487821/13723708172 武先生</span>
								<span class="returnlist" @click="returnlist">返回招聘列表</span>
							</div>
						</li>
						<li>
							<ul>
								<li>商务咨询专家（销售总监）</li>
								<li>工作地点：深圳</li>
								<li>招聘人数：3人</li>
								<li>2018-04-21</li>
							</ul>
							<div class="describe">
								<span>职位描述：1、参与制订公司公司微企宝产品商务咨询营销战略。根据商务咨询营销战略制订公司营销组合策略和营销计划；</span>
								<span>任职要求：1、本科以上学历，金融、市场营销等专业；2、从事互联网平台销售管理工作，负责商务拓展工作，对线下拓展与客户达成合作，线上对客服传递咨询服务，客户来源包括线下独立开发客户，线上咨询客户；</span>
								<a @click="recruitmentDetails(this,$event)">【详情】</a>
							</div>
							<!--招聘详情-->
							<div class="recruitmentDetails">
								<div class="headline"><span>职位描述</span></div>
								<p>1、参与制订公司公司微企宝产品商务咨询营销战略。根据商务咨询营销战略制订公司营销组合策略和营销计划；</p>
								<p>2、负责对商务咨询拓展团队人员（商务咨询顾问、商务咨询专员）进行系统培训。；</p>
								<p>3、定期对互联网市场营销环境、目标、计划、业务活动进行核查分析，及时调整营销策略和计划，制订预防和纠正措施，确保完成营销目标和营销计划；</p>
								<p>4、协助总经理建立调整公司营销组织，细分互联网营销市场建立、拓展、调整市场营销</p>
								<div class="headline"><span>任职要求</span></div>
								<p>1、本科以上学历，金融、市场营销等专业；</p>
								<p>2、从事互联网平台销售管理工作，负责商务拓展工作，对线下拓展与客户达成合作，线上对客服传递咨询服务，客户来源包括线下独立开发客户，线上咨询客户；</p>
								<p>3、性格外向、反应敏捷，有责任心，能承受较大的工作压力，愿意接受持续挑战；</p>
								<p>4、能带15人以上的团队，有过团队培训经验或能力者优先；</p>
								<p>5、薪酬待遇：基本工资+高业绩提成+绩效奖励+年终奖励</p>
								<span class="detailsSpan">加入我们，详情请电：0755-29666316 &nbsp&nbsp&nbsp       18902487821/13723708172 武先生</span>
								<span class="returnlist" @click="returnlist">返回招聘列表</span>
							</div>
						</li>
						<li>
							<ul>
								<li>商务咨询专员（销售专员）</li>
								<li>工作地点：深圳</li>
								<li>招聘人数：3人</li>
								<li>2018-04-21</li>
							</ul>
							<div class="describe">
								<span>职位描述：1、根据商务咨询营销战略目标任务，定期按计划完成销售业绩；2、协助销售经理、销售总监对商务咨询拓展团队人员培训及定期业务目标的达成；</span>
								<span>任职要求：1、大专以上学历，电子商务、金融管理、市场营销等专业；2、从事互联网平台销售业务工作，对线下拓展与客户达成合作，线上对客服传递咨询服务，客户来源包括线下独立开发客户，线上咨询客户；</span>
								<a @click="recruitmentDetails(this,$event)">【详情】</a>
							</div>
							<!--招聘详情-->
							<div class="recruitmentDetails">
								<div class="headline"><span>职位描述</span></div>
								<p>1、根据商务咨询营销战略目标任务，定期按计划完成销售业绩；</p>
								<p>2、协助销售经理、销售总监对商务咨询拓展团队人员培训及定期业务目标的达成；</p>
								<p>3、定期对互联网市场营销环境、目标、计划、业务活动进行核查分析，及时调整营销策略和计划，制订预防和纠正措施，确保完成营销目标和营销计划；</p>
								<div class="headline"><span>任职要求</span></div>
								<p>1、大专以上学历，电子商务、金融管理、市场营销等专业；</p>
								<p>2、从事互联网平台销售业务工作，对线下拓展与客户达成合作，线上对客服传递咨询服务，客户来源包括线下独立开发客户，线上咨询客户；</p>
								<p>3、性格外向、反应敏捷，有责任心，能承受较大的工作压力，愿意接受持续挑战；</p>
								<p>4、有一定业务能力、客户服务人脉、团队合作经验或能力者优先；</p>
								<p>5、薪酬待遇：基本工资+高业绩提成+绩效奖励+年终奖励</p>
								<span class="detailsSpan">加入我们，详情请电：0755-29666316 &nbsp&nbsp&nbsp       18902487821/13723708172 武先生</span>
								<span class="returnlist" @click="returnlist">返回招聘列表</span>
							</div>
						</li>
						<li>
							<ul>
								<li>运营总监助理</li>
								<li>工作地点：深圳</li>
								<li>招聘人数：3人</li>
								<li>2018-04-21</li>
							</ul>
							<div class="describe">
								<span>职位描述：1、协助运营总监完成与处理运营部的整体工作，并完成互联网运营模式相关推广方案；2、协助运营总监负责内容运营、用户运营，整合运营和策略，做好用户粘性，提高客户活跃度；</span>
								<span>任职要求：1、3年以上互联网平台整体运营方案的建立策划经验及管理工作经验；2、熟悉用户心理，具有维护用户关系的经验；</span>
								<a @click="recruitmentDetails(this,$event)">【详情】</a>
							</div>
							<!--招聘详情-->
							<div class="recruitmentDetails">
								<div class="headline"><span>职位描述</span></div>
								<p>1、协助运营总监完成与处理运营部的整体工作，并完成互联网运营模式相关推广方案；</p>
								<p>2、协助运营总监负责内容运营、用户运营，整合运营和策略，做好用户粘性，提高客户活跃度；</p>
								<p>3、协助运营总监负责运营资源整合及开拓运营渠道；</p>
								<p>4、协助运营总监建立运营数据分析系统，为公司运营提供数据支持；</p>
								<p>5、协助运营总监把控整个运营团队工作进度，协调各部门人员工作，完成公司年度战略计划</p>
								<div class="headline"><span>任职要求</span></div>
								<p>1、3年以上互联网平台整体运营方案的建立策划经验及管理工作经验；</p>
								<p>2、熟悉用户心理，具有维护用户关系的经验；</p>
								<p>3、出色的管理能力和沟通能力，自我驱动型人才，能够承担压力；</p>
								<p>4、良好的逻辑思维能力和数据分析能力；</p>
								<p>5、具较强的全局统筹和把控能力，能够进行独立决策；</p>
								<span class="detailsSpan">加入我们，详情请电：0755-29666316 &nbsp&nbsp&nbsp       18902487821/13723708172 武先生</span>
								<span class="returnlist" @click="returnlist">返回招聘列表</span>
							</div>
						</li>
					</ul>
				</div>
				<!--新闻公告-->
				<!-- <div class="journalism" v-if="num==2">
					<div class="aboutUs_top">
						<ul>
							<li @click="company('1',$event)">公司新闻</li>
							<li @click="industry('2',$event)">行业新闻</li>
						</ul>
					</div>
					<div class="company" v-if="num_num == 1">
						<div class="company_list" v-for="val in comNewsList">
							<div class="company_img"><img :src="val.ThumbImgURL"></div>
							<div class="company_content">
								<span @click="newsDetail(val.Id)">{{val.Title}}</span>
								<p>{{val.Subtitle}}</p>
								<span class="company_date">发布时间：{{val.ReviewDateTime}}</span>
							</div>
						</div>
						<el-pagination
						  	background
						  	:current-page.sync="companyNum"
						  	prev-text="上一页"
						  	next-text="下一页"
						  	:page-size="10"
						  	layout="total, prev, pager, next, jumper"
						  	@current-change="handleCurrentChangeNews"
						  	:total="newsData.recordCount">
						</el-pagination>

					</div>
					<div class="industry" v-else>
						<div class="company_list" v-for="val in indNewsList">
							<div class="company_img"><img :src="val.ThumbImgURL"></div>
							<div class="company_content">
								<span @click="newsDetail(val.Id)">{{val.Title}}</span>
								<p>{{val.Subtitle}}</p>
								<span class="company_date">发布时间：{{val.ReviewDateTime}}</span>
							</div>
						</div>
						<el-pagination
						  	background
						  	:current-page.sync="indNum"
						  	prev-text="上一页"
						  	next-text="下一页"
						  	:page-size="10"
						  	layout="total, prev, pager, next, jumper"
						  	@current-change="handleCurrentChangeIndNews"
						  	:total="indNewsData.recordCount">
						</el-pagination>
					</div>
				</div> -->
				<!--联系我们-->
				<div class="relation" v-if="num==3">
					<div class="relation_top">联系我们</div>
					<div class="relation_content">
						<!--在线留言-->
						<div class="onlineMessageS">
							<div class="relationDiv">
								<div class="relationDiv_top">在线留言：</div>
							</div>
							<div class="particular">
								<span>您好！</span>
								<span>为了给您提供更好的服务，我们希望收集您使用微企宝官网时的想法和建议。</span>
								<span>您的意见就是我们的财富，对您的配合和支持表示衷心感谢！</span>
								<input type="text" class="name" placeholder="姓名" v-model="contactUsName">
								<input type="text" class="phone" placeholder="联系电话" v-model="contactUsTel">
								<textarea placeholder="留言信息" v-model="contactUsContent"></textarea>
								<span class="submitMessage" @click="submitMessage">提交留言</span>
							</div>
						</div>
						<!--客户服务-->
						<div class="customerService">
							<div class="relationDiv">
								<div class="relationDiv_top">客户服务：</div>
							</div>
							<div class="particular">
								<span>在这里我们会为您解决你在使用过程中的所有问题</span>
								<span>服务时间：周一~周五:　9:00-18:00 (周六~周日公众假期休息)</span>
								<span>服务热线：400-8822-991</span>
								<span>在线QQ：3452083279</span>
								<span>客服邮箱：markting@wqbol.com</span>
								<span class="onlineMessage" @click="onlineMessage">在线留言</span>
							</div>
						</div>
						<!--公司地址-->
						<div class="customerService">
							<div class="relationDiv">
								<div class="relationDiv_top">公司地址：</div>
							</div>
							<div class="particular">
								<!--<iframe src="map.html" id="mian" target="_blank" name="mian" frameborder="0"></iframe>-->
								 <mapA></mapA>
							</div>
						</div>
						<!--西乡分公司-->
						<div class="customerService">
							<div class="relationDiv">
								<div class="relationDiv_top">西乡分公司</div>
							</div>
							<div class="particular">
								<span><img src="~assets/images/tabBar/linkman.png">联系人：总经理 / 邓小姐</span>
								<span><img src="~assets/images/tabBar/phone.png">联系电话：13480883270 / 0755-29666320</span>
								<span><img src="~assets/images/tabBar/location.png">联系地址：深圳市宝安区西乡银田路4号宝安智谷H栋7楼</span>
							</div>
						</div>
						<!--龙华分公司-->
						<div class="customerService">
							<div class="relationDiv">
								<div class="relationDiv_top">公明分公司</div>
							</div>
							<div class="particular">
								<span><img src="~assets/images/tabBar/linkman.png">联系人：总经理 / 蔡小姐</span>
								<span><img src="~assets/images/tabBar/phone.png">联系电话：18820182428 / 0755-27737300</span>
								<span><img src="~assets/images/tabBar/location.png">联系地址：深圳市光明新区公明松白路5054号港兴创业大厦901</span>
							</div>
						</div>
						<!--福永分公司-->
						<div class="customerService">
							<div class="relationDiv">
								<div class="relationDiv_top">沙井分公司</div>
							</div>
							<div class="particular">
								<span><img src="~assets/images/tabBar/linkman.png">联系人：总经理 / 易小姐</span>
								<span><img src="~assets/images/tabBar/phone.png">联系电话：13684989640/0755-81775700</span>
								<span><img src="~assets/images/tabBar/location.png">联系地址：深圳市宝安区沙井中心客运站对面快8酒店401</span>
							</div>
						</div>
						<!--沙井分公司-->
						<div class="customerService">
							<div class="relationDiv">
								<div class="relationDiv_top">龙华分公司</div>
							</div>
							<div class="particular">
								<span><img src="~assets/images/tabBar/linkman.png">联系人：总经理 / 许先生</span>
								<span><img src="~assets/images/tabBar/phone.png">联系电话：18718690110 / 0755-29666320</span>
								<span><img src="~assets/images/tabBar/location.png">联系地址：深圳市宝安区西乡银田路4号宝安智谷H栋7楼</span>
							</div>
						</div>
						<!--公明分公司-->
					</div>
				</div>
			</div>
			<div class="clear"></div>
		</div>
		<div class="c-ftContainWrapindex">
			<publicBottom></publicBottom>
		</div>
	</div>
</template>

<script>
	import navigationBar from "~/components/common/navigationBar";
	import publicBottom from "~/components/common/publicBottom";
	import publicPendantR from "~/components/common/publicPendantR";
	import seo from "~/components/seo/seo";
	import { mapState,mapActions,mapGetters} from 'vuex';
	import mapA from "~/components/inRegardTo/map";
	import getd from "~/store/ajaxAPI/getData";
	import  tool from "~/assets/lib/tool";
	export default {
	   data() {
	      return {
	      	comNewsList:[],//公司新闻列表
	      	indNewsList:[],//公司新闻列表
	      	num:0,//侧边栏默认选中\
	      	num_num:1,// 新闻公告 右边侧栏控制1 :代表公司新闻 2代表行业新闻
	      	contactUsName:"", //联系我们姓名
	      	contactUsTel:"", // 联系我们电话
	      	contactUsContent:"", //联系我们内容
	      	companyNum:1,//公司新闻当前页
					indNum:1,//公司新闻当前页
					topShopData: [],//顶部nav导航
        	serverList: [],//商品三级分类
	      }
	    },
	    components:{
	    	navigationBar,
	    	publicBottom,
	    	publicPendantR,
			mapA,
			seo
	    },
	    mounted(){
	    	this.num = this.$route.query.style;
	    	//请求新闻  XW00101 公司新闻   XW00102 行业新闻
    		var param = {
    			params:{
    				num:1,
    				code:"XW00101"
    			}
    		}
    		this.REQUESTDATA_HOME(param)
    		.then((res)=>{
    			this.comNewsList = this.newsData.list.slice(0,10);
    		});

    		//请求新闻  XW00101 公司新闻   XW00102 行业新闻
    		/* var data = {
    			params:{
    				num:2,
    				code:"XW00102"
    			}
    		}
    		this.REQUESTDATA_HOME(data)
    		.then((res)=>{
    			this.indNewsList = this.indNewsData.list.slice(0,10);
    		}); */
	    },
	    computed:{
			...mapGetters(
				{
					newsData:"inRegardTo/inRegardTo/newsData",
					indNewsData:"inRegardTo/inRegardTo/indNewsData"
				}
			)
		},
		created(){
		  let mealParam = {
	        params: {}
	      }
	      getd.getTopList(mealParam)
	      	.then((res)=>{
	      		this.topShopData = res.data.list;
	      	})
	      	.catch(error => {
//		        console.log(error)
	        });

	      getd.getServerClass()
	      	.then((res)=>{
	      		this.serverList = res.data.list;
	      	})
	      	.catch((e)=>{
//		      	console.log('报错',e)
		      })
		},
	    methods:{
	    	...mapActions(
	            {
	                'REQUESTDATA_HOME':'inRegardTo/inRegardTo/REQUESTDATA_HOME',
	            },
	        ),
	        newsDetail(val){ //跳转到新闻详情页
	    		this.$router.push({path:"/home/newsDetail",query:{id:val}});
	    	},
	        //navigation传值接收
	        toChange(val){
	        	this.num = val;
	        },
	    	inRegardToLi(data,data1){
	    		var LiLength =  $(data1.target).index();
	    		if(LiLength == 0){
	    			this.num = 0;
	    			this.$router.push({path:'/inRegardTo/inRegardTo',query:{style:0}});
	    		}else if(LiLength == 1){
	    			this.num = 1;
	    			this.$router.push({path:'/inRegardTo/inRegardTo',query:{style:1}})
	    		}else if(LiLength == 2){
	    		/* 	this.num = 2;
	    			this.num_num = 1;
	    			this.$router.push({path:'/inRegardTo/inRegardTo',query:{style:2}})
	    		}else if(LiLength == 3){ */
	    			this.num = 3;
	    			this.$router.push({path:'/inRegardTo/inRegardTo',query:{style:3}})
	    		}
	    	},
	    	handleCurrentChangeNews(val){//公司新闻列表分页
	    		this.comNewsList = this.newsData.list.slice(10*(val-1),10*(val-1)+10);
	    	},
	    	handleCurrentChangeIndNews(val){//行业新闻列表分页
	    		this.indNewsList = this.indNewsData.list.slice(10*(val-1),10*(val-1)+10);
	    	},
	    	recruitmentDetails(data,data1){
	    		$(data1.target).parent(".describe").hide();
	    		$(data1.target).parent().parent().siblings().hide();
	    		$(data1.target).parent().siblings(".recruitmentDetails").show();
	    	},
	    	returnlist(data,data1){
	    		$(".describe").show();
	    		$("li").show();
	    		$(".recruitmentDetails").hide();
	    	},
	    	company(data,data1){
	    		this.companyNum = 1;

	    		this.handleCurrentChangeNews(1)

	    		$(data1.target).css({"border-bottom":"2px solid #ff3e08"});
	    		$(data1.target).siblings("li").css({"border-bottom":"2px solid #fff"});
	    		this.num_num = data;

	    	},
	    	industry(data,data1){
	    		this.indNum = 1;

	    		this.handleCurrentChangeIndNews(1);

	    		$(data1.target).css({"border-bottom":"2px solid #ff3e08"});
	    		$(data1.target).siblings("li").css({"border-bottom":"2px solid #fff"});
	    		//console.log( data,'industry')
	    		this.num_num = data;
	    	},
	    	submitMessage(){ //提交留言
	    		var status = tool.regularJudgement("phone",this.contactUsTel);
	    		if(!status){
	    			this.$message({
			          	message: '电话输入有误，请重新输入',
			          	type: 'error'
			        });
	    			return
	    		}
	    		if(status){
	    			var param = {
		    			params : {
		    				mobile:this.contactUsTel,
		    				name:this.contactUsName,
		    				remark:this.contactUsContent,
		    				type:Text
		    			}
		    		}
		    		getd.freeTel(param).then((res) => {
		    			 this.$message({
				          message: '提交留言成功',
				          type: 'success'
				        });
		    			this.contactUsTel = "";
		    			this.contactUsName = "";
		    			this.contactUsContent = "";
		    			$(".customerService").show();
		    		    $(".onlineMessageS").hide();
		    		})
	    		}
	    	},
	    	onlineMessage(){
	    		$(".customerService").hide();
	    		$(".onlineMessageS").show();
	    	},
	    },
    filters:{

    }
}
</script>

<style lang="less" type="stylesheet/css" scoped>
@import "~assets/common/index.less";
@import "./inRegardTo.less";
.inRegardTo .inRegardTo_left{
	height: auto;
}
</style>
