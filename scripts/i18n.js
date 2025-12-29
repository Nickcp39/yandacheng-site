/**
 * i18n 翻译系统
 * 基于 data-i18n 属性的静态翻译系统
 * 参考 Company_website_liuyuxinrun 项目
 */

/* ========== 翻译内容定义 ========== */
const translations = {
  zh: {
    // 导航栏
    'nav.home': '首页',
    'nav.about': '关于',
    'nav.projects': '项目',
    'nav.publications': '发表',
    'nav.experience': '经历',
    'nav.awards': '奖项',
    'nav.photos': '照片',
    'nav.blog': '博客',
    
    // 主页
    'home.about.title': '关于我',
    'home.news.title': '新闻',
    'home.projects': '精选项目',
    'home.publications': '发表',
    'home.experience': '经历',
    'home.awards': '奖项',
    'home.photos': '照片集',
    'home.visitor_map': '访客地图',
    'home.footer.updated': '最后更新',
    'home.footer.copyright': '© Yanda Cheng',
    
    // 博客
    'blog.title': "Yanda's Blog",
    'blog.subtitle': '按分类浏览所有博文',
    'blog.timeline': '按时间排序',
    'blog.footer.copyright': 'Blog © Yanda Cheng',
    'blog.footer.updated': '最后更新',
    
    // 通用
    'common.resume': '简历',
    'common.read_more': '了解更多',
    'common.contact': '联系我们',
    
    // 关于页面
    'about.title': '关于我',
    'about.intro.para1': '我是一名在 HydroTech 拥有8年经验的高级工程师和团队经理，专注于<strong>物联网传感器开发</strong>、<strong>硬件工程</strong>和<strong>基于云的数据分析</strong>。我领导跨职能团队设计和部署高性能传感器系统，从硬件原型到<strong>AWS 云基础设施</strong>部署，开发端到端解决方案。',
    'about.intro.para2': '我的核心专长包括<strong>传感器硬件开发</strong>、<strong>物联网系统架构</strong>、AWS上的<strong>云数据管道</strong>，以及使用机器学习的<strong>数据分析</strong>。我构建可扩展的机器学习系统，实时处理传感器数据，为工业物联网应用实现预测性维护、异常检测和智能监控。',
    'about.intro.para3': '同时，我正在布法罗大学攻读生物医学工程博士学位，专注于医学影像的AI基础设施和基于LLM的临床应用。这项研究通过推进可扩展的AI系统和数据处理框架，补充了我的行业工作。',
    'about.education.title': '教育背景',
    'about.education.phd': '博士，生物医学工程 — 布法罗大学，2021–2025（预计）',
    'about.education.meng': '工程硕士，生物医学工程 — 康奈尔大学，2020–2021',
    'about.education.visiting': '访问研究 — 中国科学院，2018–2020',
    'about.education.undergrad': '本科研究 — 肯塔基大学，2018–2019',
    'about.research.title': '研究兴趣',
    'about.research.iot': '<strong>物联网与传感器系统</strong> - 硬件开发、嵌入式系统和传感器数据处理',
    'about.research.cloud': '<strong>云基础设施（AWS）</strong> - 可扩展数据管道、实时分析和机器学习部署',
    'about.research.ml': '<strong>机器学习与数据分析</strong> - 时间序列分析、异常检测和预测建模',
    'about.research.vision': '<strong>计算机视觉</strong> - 医学影像、图像处理和视觉分析',
    'about.research.llm': '<strong>LLM与AI基础设施</strong> - 用于临床应用和自动化系统的大语言模型',
    'about.footer.copyright': '关于 © Yanda Cheng',
    'about.footer.updated': '最后更新',
    
    // 项目页面
    'projects.title': '精选项目',
    'projects.filter.all': '全部',
    'projects.filter.ai': 'AI',
    'projects.filter.signal': '信号处理',
    'projects.filter.robotics': '机器人',
    'projects.kyc.title': 'KYC 文档智能处理管道',
    'projects.kyc.desc': '在3天内构建了一个基于SGLang推理服务器的schema-first、可审计的KYC文档理解管道。SGLang的高性能运行时使Llama 3.2 11B Vision能够从护照和驾照图像中生成低延迟的结构化JSON输出，具有生产就绪的吞吐量。该系统实现了用于风险评估的确定性规则、基于置信度的路由，以及全面的边界情况处理（模糊、眩光、旋转、低分辨率）。设计时考虑了可扩展性、隐私合规性和权衡分析，适用于真实世界的FSI部署，具有扩展路径（无服务器/按需/批处理）和对低质量输入的人工审查门控。',
    'projects.autonomous.title': '自主硬币拾取与追踪机器人',
    'projects.autonomous.desc': '开发了一个集成避障和基于视觉路径跟踪的移动机器人。它能够自主导航环境，使用机载传感器检测硬币，并通过精确的电机控制和成像反馈收集硬币。',
    'projects.metatarsal.title': '小鼠跖骨加载与钙成像',
    'projects.metatarsal.desc': '建立了一个使用三点弯曲装置对活体小鼠跖骨施加机械载荷的协议，同时使用基因编码的荧光钙指示剂监测骨细胞中的细胞内Ca<sup>2+</sup>动力学。使用多光子荧光显微镜进行实时细胞成像。',
    'projects.rf.title': '无线信号接收器与GNU Radio分析',
    'projects.rf.desc': '构建了一个实时信号采集和解调设备，用于拦截空中EM信号。该系统与GNU Radio和MATLAB耦合，用于Linux环境下的信号分类和分析。',
    'projects.pingpong.title': '自动瞄准乒乓球发射器',
    'projects.pingpong.desc': '设计了一个AI驱动的机器人系统，能够识别并锁定移动目标，然后通过动态电机校准和基于预测的瞄准算法发射乒乓球。',
    'projects.voice.title': '通过神经网络驱动的语音电机',
    'projects.voice.desc': '创建了一个通过语音命令激活电机的系统。将LabVIEW和MATLAB与神经网络分类器集成，处理语音特征并将其转换为实时控制信号。',
    'projects.footer.copyright': '项目 © Yanda Cheng',
    'projects.footer.updated': '最后更新',
    
    // 发表页面
    'publications.title': '精选发表',
    'publications.footer.copyright': '发表 © Yanda Cheng',
    'publications.footer.updated': '最后更新',
    
    // 经历页面
    'experience.title': '经历',
    'experience.ub.title': '研究助理',
    'experience.ub.location': '布法罗大学 — 布法罗，纽约',
    'experience.ub.period': '2021年9月 – 至今',
    'experience.ub.desc1': '博士研究专注于光声成像和AI辅助诊断。',
    'experience.ub.desc2': '在IEEE TUFFC、Optica、BOE发表论文；领导NIH资助项目。',
    'experience.startup.title': '联合创始人兼核心工程师',
    'experience.startup.location': '高精度传感器公司 — 北京 / 布法罗',
    'experience.startup.period': '2015 – 至今（兼职）',
    'experience.startup.desc1': '为天气和医疗应用设计高精度传感器。',
    'experience.startup.desc2': '构建固件（C、Python、GPT），将业务扩展到5+个国家。',
    'experience.ta503.title': '助教 – BME 503：图像处理',
    'experience.ta503.location': '布法罗大学',
    'experience.ta503.period': '2023年春季',
    'experience.ta503.desc': '协助研究生级别的图像分割、滤波和编程实验。',
    'experience.ta302.title': '助教 – BME 302：医疗设备',
    'experience.ta302.location': '布法罗大学',
    'experience.ta302.period': '2022年秋季',
    'experience.ta302.desc': '监督原型项目和生物医学传感器实验课程。',
    'experience.cornell.title': '研究助理',
    'experience.cornell.location': '康奈尔大学 — 伊萨卡，纽约',
    'experience.cornell.period': '2020年9月 – 2021年6月',
    'experience.cornell.desc1': '使用多光子显微镜开发肌肉骨骼协议。',
    'experience.cornell.desc2': '分析机械应力下骨细胞的Ca2+信号。',
    'experience.cas.title': '研发工程师',
    'experience.cas.location': '中国科学院 — 北京',
    'experience.cas.period': '2018年5月 – 2020年9月',
    'experience.cas.desc1': '领导火箭信号通信系统的开发。',
    'experience.cas.desc2': '编写用于实时遥测的嵌入式软件。',
    'experience.uky.title': '本科研究助理',
    'experience.uky.location': '肯塔基大学 — 列克星敦，肯塔基',
    'experience.uky.period': '2018年1月 – 2019年1月',
    'experience.uky.desc1': '使用C#和LabView开发GUI和图像处理管道。',
    'experience.uky.desc2': '增强新生儿设备界面以提高临床可靠性。',
    'experience.footer.copyright': '经历 © Yanda Cheng',
    'experience.footer.updated': '最后更新',
    
    // 奖项页面
    'awards.title': '奖项与荣誉',
    'awards.honors.jbo': '<strong>审稿人认可</strong>，生物医学光学杂志（JBO）',
    'awards.honors.boe': '<strong>审稿人认可</strong>，生物医学光学快报（BOE）',
    'awards.honors.jbe': '<strong>审稿人认可</strong>，生物医学工程杂志',
    'awards.honors.photoacoustics': '<strong>审稿人认可</strong>，光声学',
    'awards.honors.tmi': '<strong>审稿人认可</strong>，IEEE医学影像汇刊（TMI）',
    'awards.services.title': '学术服务',
    'awards.services.reviewer.title': '期刊审稿人',
    'awards.services.memberships.title': '会员资格',
    'awards.services.memberships.ieee': 'IEEE学生会员',
    'awards.services.memberships.embs': 'IEEE医学与生物工程学会（EMBS）会员',
    'awards.talks.title': '邀请报告与展示',
    'awards.talks.sawc2025': '<strong>SAWC Spring | WHS 2025</strong>，2025年5月，德克萨斯州葡萄藤 — <em>海报展示者</em><br><em>足部溃疡血管监测的定量光声特征分析</em><br><span style="font-size: 0.9em; color: #666;">展示了使用从光声图像中提取的44个特征进行定量特征分析，在愈合、恶化和健康结果方面实现了83.33%的分类准确率和93.78%的宏观AUC。</span>',
    'awards.talks.rcbu2025': '<strong>RCBU生物医学超声研讨会</strong>，2025年11月，纽约州罗切斯特 — <em>口头报告者</em><br><em>通过光声成像评估伤口愈合和组织灌注</em><br><span style="font-size: 0.9em; color: #666;">慢性腿部溃疡是一种与周围血管疾病相关的常见疾病，影响着约650万美国人。溃疡患者通常遭受行动能力下降和生活质量降低的困扰。血运重建手术是缺血相关足部溃疡最有效的治疗方法之一，因为它恢复了溃疡区域的血流和灌注。因此，监测手术前后灌注变化的能力对于医生评估手术成功与否非常重要。然而，当前的临床测试无法满足这一需求。我们提出了用于周围血管疾病慢性足部溃疡的纵向光声成像。与ABI和近红外光谱相比，我们的无创方法提供了血管动力学的跟踪。具有扩展视野和皮肤伪影抑制的足背系统增强了可视化。从2D/3D图像中，我们计算了涵盖强度、纹理和形态学的45个特征；LASSO选择了12个。多种子交叉验证在分类愈合、恶化和健康结果方面产生了83.3%的准确率和93.78%的宏观AUC，支持稳健的监测和风险分层。</span>',
    'awards.talks.rcbu2024': '<strong>RCBU生物医学超声研讨会</strong>，2024年9月 — <em>海报展示者</em>',
    'awards.talks.spie2024': '<strong>SPIE BIOS | Photons Plus Ultrasound</strong>，2024年1月 — <em>海报展示者</em>',
    'awards.talks.rcbu2023': '<strong>RCBU生物医学超声研讨会</strong>，2023年11月 — <em>海报展示者</em>',
    'awards.footer.copyright': '奖项 © Yanda Cheng',
    'awards.footer.updated': '最后更新',
    
    // 照片页面
    'photos.title': 'Yanda Cheng 的照片亮点',
    'photos.footer.copyright': '照片 © Yanda Cheng',
    'photos.footer.updated': '最后更新',
    
    // 新闻页面
    'news.2025.04': '<strong>2025.04</strong>：在UB新闻中关于先进伤口监测系统的报道中被特别提及。我作为设备硬件和算法的核心工程师做出了贡献。',
    'news.2025.07': '<strong>2025.07</strong>：在一篇关于无痛乳腺成像系统的新闻中被特别提及，该系统可进行一分钟的癌症扫描。我作为开发该设备的核心工程师之一做出了贡献。',
    'news.2024.06': '<strong>2024.06</strong>：在<i>生物医学光学快报</i>上发表了Noise2Noise无监督去噪方法。',
    'news.2024.04': '<strong>2024.04</strong>：使用PA系统完成了200多名糖尿病足部溃疡患者的临床成像。',
    'news.2024.03': '<strong>2024.03</strong>：关于mmWave穿敷料伤口检测系统的论文被IEEE物联网杂志接受。',
    'news.2024.02': '<strong>2024.02</strong>：在<i>光声学</i>上发表了关于皮肤层分割和自适应血管加权的论文。',
    'news.2024.01': '<strong>2024.01</strong>：SPIE BIOS海报展示 – Photons Plus Ultrasound会议，旧金山。',
    'news.2023.11': '<strong>2023.11</strong>：在布法罗RCBU生物医学超声研讨会上进行海报展示。',
    'news.read_more': '[阅读更多]',
    
    // 文章翻译 - btc_4year_high_no_joy.html
    'article.btc_4year.title': 'BTC 又站上四年高点，我却高兴不起来',
    'article.btc_4year.subtitle': 'BTC Hits a 4-Year High, But I\'m Not Happy',
    'article.btc_4year.para1': '这几天，市场又躁动了起来。稳定币在疯长，美债突破天际，BTC 不声不响地又走到四年新高。',
    'article.btc_4year.para2': '可讽刺的是，看着账户里的数字，我却一点也高兴不起来。我甚至不知道这次的高点到底算什么：14 万？16 万？还是 20 万？没人能告诉我正确答案，这意味着我根本不确定所谓的"完美下车点"在哪。',
    'article.btc_4year.para3': '如果不卖，"财富自由"似乎还远；可要是现在卖掉，又怕错过那改变命运的机会。归根到底，还是因为本金太少——像我这样的年轻人，用三年定投才有现在 150% 的收益，看起来不错，却远远不够。',
    'article.btc_4year.para4': '我常问自己：这次要是操作得当，也许能再攒下一份让我更快自由的本金。但要是踏错了节奏，那些好不容易积累下来的筹码，也可能瞬间蒸发。',
    'article.btc_4year.para5': '这三年来，我不停告诉自己要"长期主义"。要相信 BTC 的长期价值，要忍住波动。然而，当真走到所谓"周期高点"，心里的疑问却更多了：现在卖，是不是目标太小？不卖，是不是太贪心？',
    'article.btc_4year.para6': '我自以为从巴菲特和芒格那里学到了"买好资产、长期持有"。可真正难的，从来不是"买"，而是"什么时候卖"，以及"卖了之后如何忍住寂寞"。',
    'article.btc_4year.para7': '市场总在收割贪婪和恐惧。但对普通人来说，这些从来不是大词，而是账户里那点可怜的本金，是每次点开资产页面时的心跳，是怕错过，又怕一切得而复失的焦虑。',
    'article.btc_4year.para8': '我不知道这次是对是错，也不知道留下牌桌是不是更明智。唯一确定的是，这场关于自由、欲望和耐心的博弈，还远远没结束。赚钱很难，守住更难，赚到不再焦虑，或许最难。',
    'article.btc_4year.disclaimer': '本文仅为个人记录与反思，不构成投资建议。BTC 波动性极高，请谨慎独立判断。',
    
    // 文章翻译 - buffett_munger_weekend_reflection.html
    'article.buffett.title': '每周往返的高速路上，我听巴菲特和芒格',
    'article.buffett.subtitle': '孤独中的精神陪伴',
    'article.buffett.para1': '自从进入博士的最后阶段，我每周末都会从 Buffalo 前往多伦多。两小时的高速，笔直，没有多少岔路口。是通向城市的路，也像通向成年世界的一段心理旅程。',
    'article.buffett.para2': '在这漫长又规律的高速路上，我听的不是什么流行音乐，而是伯克希尔的股东大会录音，是巴菲特年轻时的演讲，是芒格在各大高校对学生的真诚告白，偶尔也有他们与身边合伙人之间闲聊般的语音记录。也包括段永平、李某某等他们中国学生在北大的讲座。',
    'article.buffett.para3': '这些声音陪伴了我整个博士生涯的后半程。他们不仅仅是投资大师，而是我人生阶段的隐形导师。',
    'article.buffett.para4': '巴菲特常说："选择一个影响你深远的导师，是人生的关键一步。"',
    'article.buffett.para5': '父母当然对你影响巨大，但你无法选择他们。重要的是学会辨别父母的优点与不足，然后汲取养分。',
    'article.buffett.para6': '而如果你没有机会身边有人引导你，也没有关系——<strong>隐形的精神导师</strong>一样可以塑造你。他们的话语、他们的行为方式、他们对这个世界的判断力，都会在你耳边留下回响。',
    'article.buffett.para7': '我不是去看演唱会的"小太妹"，但我一样"追星"。我的偶像是巴菲特，是芒格，是那些用理性与常识雕刻人生轨迹的人。',
    'article.buffett.para8': '巴菲特教会我如何用格雷厄姆的价值法则去寻找伟大的企业，芒格则教我如何在这个金迷纸醉的世界里保持内心的秩序和克制。',
    'article.buffett.para9': '我幸运，也孤独。这种孤独不是悲观的，而是一种有价值的陪伴。它像北美的高速公路，直，长，但通向远方。',
    'article.buffett.para10': '当博士毕业步入社会，也许996、房租、医保、家庭将围绕我。但最难的，是如何在成年世界里继续保留这份孤独感，不被琐碎打败。',
    'article.buffett.para11': '不是谁都能一直像个理性的人活着，但我想继续靠近那群清醒的人——即便只是在车载音响里。',
    'article.buffett.quote': '本篇写于2025年6月7日，28岁生日的前夜。',
    'article.buffett.disclaimer': '本文仅为作者个人成长记录，不构成投资建议或心理建议。',
    
    // 文章翻译 - btc_regulation.html (已有部分内容，需要补充)
    'article.btc_regulation.title': '比特币是新时代的数字黄金',
    'article.btc_regulation.subtitle': 'Bitcoin as Digital Gold in an Era of Monetary Expansion',
    'article.btc_regulation.para1': '在政府持续放水和全球流动性泛滥的背景下，比特币（BTC）逐渐承担起"数字黄金"的角色，不再只是投机资产，而是成为抵抗法币贬值的重要锚定物。',
    'article.btc_regulation.para2': '回顾历史，黄金曾在多次货币宽松周期中强势上涨。而本轮 BTC 的上涨结构，极有可能复制黄金的走势节奏。',
    'article.btc_regulation.section1.title': '📈 中期预期：高点将至',
    'article.btc_regulation.section1.para1': '我预计 BTC 在 2025 年 9 月左右达到本轮牛市高点，价格大约在 <strong>13~15 万美元</strong> 区间。',
    'article.btc_regulation.section1.li1': '联储放水趋势仍未止住，市场对避险资产的青睐提升',
    'article.btc_regulation.section1.li2': '美元贬值解决美债问题，btc以美元计价上涨速度实际上反映了美元的缩水速度',
    'article.btc_regulation.section1.li3': '技术结构上处于强劲上涨末期，但仍未进入抛售阶段',
    'article.btc_regulation.section2.title': '📉 长期预期：顶部之后的回撤',
    'article.btc_regulation.section2.para1': '2026 年第一季度将进入大幅回调期，进入类似 2013 或 2021 年后的冷却状态。',
    'article.btc_regulation.section2.para2': '最终底部可能在 <strong>2027~2028 年</strong> 之间构筑，BTC 价格回落至 <strong>4~5 万美元</strong> 区间。',
    'article.btc_regulation.quote': '比特币虽然剧烈波动，但长期而言，是应对国家注水与资产贬值的重要对冲工具。',
    'article.btc_regulation.para3': '作为一名观察者与支持者，我坚定认为 BTC 不是"投机工具"，而是未来全球资产配置中的一极。',
    'article.btc_regulation.disclaimer': '本文观点仅代表作者个人，不构成任何投资建议。比特币价格波动较大，请独立判断。',
    
    // 文章翻译 - btc_repeat_4years.html
    'article.btc_repeat.title': '为什么比特币四年一轮回，但你依然赚不到钱？',
    'article.btc_repeat.para1': '比特币已经走过三轮完整周期，几乎每四年减半一次，伴随着一次暴涨和一次暴跌。但令人惊讶的是，大多数人即使提前知道了这一点，依然没有赚到钱。',
    'article.btc_repeat.section1.title': '① 人性无法承受剧烈波动',
    'article.btc_repeat.section1.para1': '比特币并不温柔。它上涨不是缓慢爬升，而是**每天上下10%甚至20%的波动**。绝大多数人承受不了这种日内心理折磨，明明一年涨了50%，三年翻几倍，但在过程中早早下车，甚至反手做空。',
    'article.btc_repeat.section1.para2': '而且，许多人把买入赚钱归功于自己的判断力，把亏钱归咎于时运不济。这种<strong>盲目自信和事后懊悔</strong>，本质上忽略了一点：<strong>BTC 的价格并不受人的意志控制</strong>。',
    'article.btc_repeat.section1.para3': '比特币是一种通缩资产，是全球货币超发的蓄水池。它体现的是世界的印钞节奏、央行政策、流动性泛滥，甚至是**富人对"不可控资产"的渴望**。正如2000年代富人藏字画，未来的比特币，也将成为**无国界、免税、自由流通的"数字藏品"**。',
    'article.btc_repeat.section2.title': '② 你以为你在投资，其实你在"追星"',
    'article.btc_repeat.section2.para1': '很多人嘲笑追韩星的少女，但从行为逻辑看，不少中年男人追财经博主，其实更加危险。',
    'article.btc_repeat.section2.para2': '他们在小区楼下听了几句小道消息，就把一生积蓄all in某个股票；他们看了视频里一个"K线分析大师"的推演，就真信了"这一波不会止步于10万美元"。',
    'article.btc_repeat.section2.para3': '所谓"财经博主"，多数并无实质投资能力，更多是"贩卖情绪"的内容创作者。<strong>他们不是趋势的发现者，只是流量的放大器</strong>。',
    'article.btc_repeat.section2.quote': '盲目跟随KOL，不是理性投资，是披着财经皮的娱乐行为。',
    'article.btc_repeat.section3.title': '③ 国家不希望你变富',
    'article.btc_repeat.section3.para1': '现实是：大多数人终其一生都无法实现财务自由。',
    'article.btc_repeat.section3.para2': '这是设计好的。国家依赖税收和劳动力，<strong>需要大部分人处在"饿不死但富不了"的状态</strong>——这样才容易管理。',
    'article.btc_repeat.section3.para3': '一个人自由了，就不可控了。一个社会人人都富有，那就很难服从稳定结构。',
    'article.btc_repeat.section3.para4': '比特币恰恰在挑战这个结构：它不受监管、不容易冻结、可以跨国交易、不依赖任何国家信用。',
    'article.btc_repeat.section3.para5': '而你是否能赚到钱，不取决于你是否看懂了K线，而取决于你是否真的理解了这个游戏的本质。',
    'article.btc_repeat.disclaimer': '本文观点仅代表作者个人，不构成任何投资建议。比特币价格波动较大，请独立判断。',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.publications': 'Publications',
    'nav.experience': 'Experience',
    'nav.awards': 'Awards',
    'nav.photos': 'Photos',
    'nav.blog': 'Blog',
    
    // Home page
    'home.about.title': 'About Me',
    'home.news.title': 'News',
    'home.projects': 'Selected Projects',
    'home.publications': 'Publications',
    'home.experience': 'Experience',
    'home.awards': 'Awards',
    'home.photos': 'Photo Gallery',
    'home.visitor_map': 'Visitor Map',
    'home.footer.updated': 'Last updated',
    'home.footer.copyright': '© Yanda Cheng',
    
    // Blog
    'blog.title': "Yanda's Blog",
    'blog.subtitle': 'Browse posts by category',
    'blog.timeline': 'Sorted by date',
    'blog.footer.copyright': 'Blog © Yanda Cheng',
    'blog.footer.updated': 'Last updated',
    
    // Common
    'common.resume': 'Resume',
    'common.read_more': 'Read More',
    'common.contact': 'Contact Us',
    
    // About page
    'about.title': 'About Me',
    'about.intro.para1': 'I am a Senior Engineer and Team Manager with 8 years of experience at HydroTech, specializing in <strong>IoT sensor development</strong>, <strong>hardware engineering</strong>, and <strong>cloud-based data analytics</strong>. I lead cross-functional teams in designing and deploying high-performance sensor systems, developing end-to-end solutions from hardware prototyping to <strong>AWS cloud infrastructure</strong> deployment.',
    'about.intro.para2': 'My core expertise includes <strong>sensor hardware development</strong>, <strong>IoT system architecture</strong>, <strong>cloud data pipelines</strong> on AWS, and <strong>data analytics</strong> using machine learning. I build scalable ML systems that process sensor data in real-time, enabling predictive maintenance, anomaly detection, and intelligent monitoring for industrial IoT applications.',
    'about.intro.para3': 'In parallel, I am pursuing a Ph.D. in Biomedical Engineering at the University at Buffalo, focusing on AI infrastructure for medical imaging and LLM-based clinical applications. This research complements my industry work by advancing scalable AI systems and data processing frameworks.',
    'about.education.title': 'Education',
    'about.education.phd': 'Ph.D., Biomedical Engineering — University at Buffalo, 2021–2025 (expected)',
    'about.education.meng': 'M.Eng., Biomedical Engineering — Cornell University, 2020–2021',
    'about.education.visiting': 'Visiting Research — Chinese Academy of Sciences, 2018–2020',
    'about.education.undergrad': 'Undergraduate Research — University of Kentucky, 2018–2019',
    'about.research.title': 'Research Interests',
    'about.research.iot': '<strong>IoT & Sensor Systems</strong> - Hardware development, embedded systems, and sensor data processing',
    'about.research.cloud': '<strong>Cloud Infrastructure (AWS)</strong> - Scalable data pipelines, real-time analytics, and ML deployment',
    'about.research.ml': '<strong>Machine Learning & Data Analytics</strong> - Time-series analysis, anomaly detection, and predictive modeling',
    'about.research.vision': '<strong>Computer Vision</strong> - Medical imaging, image processing, and visual analytics',
    'about.research.llm': '<strong>LLM & AI Infrastructure</strong> - Large language models for clinical applications and automated systems',
    'about.footer.copyright': 'About © Yanda Cheng',
    'about.footer.updated': 'Last updated',
    
    // Projects page
    'projects.title': 'Selected Projects',
    'projects.filter.all': 'All',
    'projects.filter.ai': 'AI',
    'projects.filter.signal': 'Signal Processing',
    'projects.filter.robotics': 'Robotics',
    'projects.kyc.title': 'KYC Document Intelligence Pipeline',
    'projects.kyc.desc': 'Built a schema-first, auditable KYC document understanding pipeline powered by SGLang inference server in 3 days. SGLang\'s high-performance runtime enabled low-latency structured JSON outputs from Llama 3.2 11B Vision, processing passport and driver\'s license images with production-ready throughput. The system implements deterministic rules for risk assessment, confidence-based routing, and comprehensive corner case handling (blur, glare, rotation, low resolution). Designed with extensibility, privacy compliance, and trade-off analysis for real-world FSI deployment, with scaling paths (serverless/on-demand/batch) and human-review gating for low-quality inputs.',
    'projects.autonomous.title': 'Autonomous Coin-Picking & Trace Robot',
    'projects.autonomous.desc': 'Developed a mobile robot integrating obstacle avoidance and vision-based path tracking. It autonomously navigates environments, detects coins using onboard sensors and collects them through precise motor control and imaging feedback.',
    'projects.metatarsal.title': 'Metatarsal Loading and Calcium Imaging in Mice',
    'projects.metatarsal.desc': 'Established a protocol using a three-point bending device to apply mechanical load to metatarsal bones in live mice while simultaneously monitoring intracellular Ca<sup>2+</sup> dynamics in osteocytes using a genetically encoded fluorescent calcium indicator. Multiphoton fluorescence microscopy was used for real-time cellular imaging.',
    'projects.rf.title': 'Wireless Signal Receiver & GNU Radio Analysis',
    'projects.rf.desc': 'Built a real-time signal acquisition and demodulation device to intercept airborne EM signals. The system was coupled with GNU Radio and MATLAB for signal classification and analysis under Linux environment.',
    'projects.pingpong.title': 'Auto-Targeting Ping Pong Shooter',
    'projects.pingpong.desc': 'Designed an AI-powered robotic system that identifies and locks onto moving targets, then launches ping pong balls via dynamic motor calibration and prediction-based aiming algorithms.',
    'projects.voice.title': 'Voice-Driven Motor via Neural Network',
    'projects.voice.desc': 'Created a system that activates motors via spoken commands. Integrated LabVIEW and MATLAB with a neural network classifier to process voice features and convert them into real-time control signals.',
    'projects.footer.copyright': 'Projects © Yanda Cheng',
    'projects.footer.updated': 'Last updated',
    
    // Publications page
    'publications.title': 'Selected Publications',
    'publications.footer.copyright': 'Publications © Yanda Cheng',
    'publications.footer.updated': 'Last updated',
    
    // Experience page
    'experience.title': 'Experience',
    'experience.ub.title': 'Research Assistant',
    'experience.ub.location': 'University at Buffalo — Buffalo, NY',
    'experience.ub.period': 'Sep 2021 – Present',
    'experience.ub.desc1': 'PhD research on photoacoustic imaging and AI-assisted diagnostics.',
    'experience.ub.desc2': 'Published in IEEE TUFFC, Optica, BOE; led NIH-funded projects.',
    'experience.startup.title': 'Co-founder & Core Engineer',
    'experience.startup.location': 'High-Precision Sensor Company — Beijing / Buffalo',
    'experience.startup.period': '2015 – Present (Part-time)',
    'experience.startup.desc1': 'Designed high-precision sensors for weather and medical applications.',
    'experience.startup.desc2': 'Built firmware (C, Python, GPT), expanded business to 5+ countries.',
    'experience.ta503.title': 'Teaching Assistant – BME 503: Image Processing',
    'experience.ta503.location': 'University at Buffalo',
    'experience.ta503.period': 'Spring 2023',
    'experience.ta503.desc': 'Assisted in graduate-level image segmentation, filtering, and coding labs.',
    'experience.ta302.title': 'Teaching Assistant – BME 302: Medical Devices',
    'experience.ta302.location': 'University at Buffalo',
    'experience.ta302.period': 'Fall 2022',
    'experience.ta302.desc': 'Supervised prototyping projects and biomedical sensor lab sessions.',
    'experience.cornell.title': 'Research Assistant',
    'experience.cornell.location': 'Cornell University — Ithaca, NY',
    'experience.cornell.period': 'Sep 2020 – Jun 2021',
    'experience.cornell.desc1': 'Developed musculoskeletal protocols using multiphoton microscopy.',
    'experience.cornell.desc2': 'Analyzed Ca2+ signals from osteocytes under mechanical stress.',
    'experience.cas.title': 'Research & Development Engineer',
    'experience.cas.location': 'Chinese Academy of Sciences — Beijing',
    'experience.cas.period': 'May 2018 – Sep 2020',
    'experience.cas.desc1': 'Led development of rocket signal communication systems.',
    'experience.cas.desc2': 'Wrote embedded software for real-time telemetry.',
    'experience.uky.title': 'Undergraduate Research Assistant',
    'experience.uky.location': 'University of Kentucky — Lexington, KY',
    'experience.uky.period': 'Jan 2018 – Jan 2019',
    'experience.uky.desc1': 'Developed GUIs and image-processing pipelines using C# and LabView.',
    'experience.uky.desc2': 'Enhanced neonatal device interfaces for clinical reliability.',
    'experience.footer.copyright': 'Experience © Yanda Cheng',
    'experience.footer.updated': 'Last updated',
    
    // Awards page
    'awards.title': 'Awards & Honors',
    'awards.honors.jbo': '<strong>Reviewer Recognition</strong>, Journal of Biomedical Optics (JBO)',
    'awards.honors.boe': '<strong>Reviewer Recognition</strong>, Biomedical Optics Express (BOE)',
    'awards.honors.jbe': '<strong>Reviewer Recognition</strong>, Journal of Biomedical Engineering',
    'awards.honors.photoacoustics': '<strong>Reviewer Recognition</strong>, Photoacoustics',
    'awards.honors.tmi': '<strong>Reviewer Recognition</strong>, IEEE Transactions on Medical Imaging (TMI)',
    'awards.services.title': 'Academic Services',
    'awards.services.reviewer.title': 'Journal Reviewer',
    'awards.services.memberships.title': 'Memberships',
    'awards.services.memberships.ieee': 'IEEE Student Member',
    'awards.services.memberships.embs': 'IEEE Engineering in Medicine and Biology Society (EMBS) Member',
    'awards.talks.title': 'Invited Talks & Presentations',
    'awards.talks.sawc2025': '<strong>SAWC Spring | WHS 2025</strong>, May 2025, Grapevine, TX — <em>Poster Presenter</em><br><em>Quantitative Photoacoustic Feature Analysis for Vascular Monitoring in Foot Ulcers</em><br><span style="font-size: 0.9em; color: #666;">Presented quantitative feature analysis using 44 features extracted from photoacoustic images, achieving 83.33% classification accuracy and 93.78% macro-AUC for healing, worsening, and healthy outcomes.</span>',
    'awards.talks.rcbu2025': '<strong>RCBU Biomedical Ultrasound Symposium</strong>, November 2025, Rochester, NY — <em>Oral Presenter</em><br><em>Wound Healing and Tissue Perfusion Assessed by Photoacoustic Imaging</em><br><span style="font-size: 0.9em; color: #666;">Chronic leg ulcers, a common disease associated with peripheral vascular disorders, are affecting approximately 6.5 million Americans. Patients with ulcers commonly suffer from decreased mobility and lower quality of life. Revascularization surgery is one of the most effective treatments for ischemia-related foot ulcers, as it restores blood flow and perfusion to the ulcer region. Thus, the ability to monitor the perfusion change before and after surgery is important for physicians to evaluate the success of the surgery. However, current clinical tests fail to meet this need. We present longitudinal photoacoustic imaging for chronic foot ulcers in peripheral vascular disease. Compared with ABI and near-infrared spectroscopy, our noninvasive method offers tracking of vascular dynamics. A dorsal-foot system with expanded field of view and skin-artifact suppression enhances visualization. From 2D/3D images we computed 45 features spanning intensity, texture, and morphology; LASSO selected 12. Multi-seed cross-validation yielded 83.3% accuracy and 93.78% macro-AUC classifying healing, worsening, and healthy outcomes, supporting robust monitoring and risk stratification.</span>',
    'awards.talks.rcbu2024': '<strong>RCBU Biomedical Ultrasound Symposium</strong>, September 2024 — <em>Poster Presenter</em>',
    'awards.talks.spie2024': '<strong>SPIE BIOS | Photons Plus Ultrasound</strong>, January 2024 — <em>Poster Presenter</em>',
    'awards.talks.rcbu2023': '<strong>RCBU Biomedical Ultrasound Symposium</strong>, November 2023 — <em>Poster Presenter</em>',
    'awards.footer.copyright': 'Awards © Yanda Cheng',
    'awards.footer.updated': 'Last updated',
    
    // Photos page
    'photos.title': 'Photo Highlights of Yanda Cheng',
    'photos.footer.copyright': 'Photos © Yanda Cheng',
    'photos.footer.updated': 'Last updated',
    
    // News page
    'news.2025.04': '<strong>2025.04</strong>: Featured in a UB News story about an advanced wound monitoring system. I contributed as the core engineer for the device\'s hardware and algorithm.',
    'news.2025.07': '<strong>2025.07</strong>: Featured in a news story about a pain-free breast imaging system that performs one-minute cancer scans. I contributed as one of the core engineers developing this device.',
    'news.2024.06': '<strong>2024.06</strong>: Published Noise2Noise unsupervised denoising method in <i>Biomedical Optics Express</i>.',
    'news.2024.04': '<strong>2024.04</strong>: Completed clinical imaging on over 200 diabetic foot ulcer patients using PA system.',
    'news.2024.03': '<strong>2024.03</strong>: Paper accepted in IEEE IoT Journal on mmWave over-dressing wound detection system.',
    'news.2024.02': '<strong>2024.02</strong>: Published paper on skin layer segmentation and adaptive vessel weighting in <i>Photoacoustics</i>.',
    'news.2024.01': '<strong>2024.01</strong>: SPIE BIOS Poster Presentation – Photons Plus Ultrasound Conference, San Francisco.',
    'news.2023.11': '<strong>2023.11</strong>: Poster Presentation at RCBU Biomedical Ultrasound Symposium, Buffalo.',
    'news.read_more': '[Read more]',
    
    // Article translations - btc_4year_high_no_joy.html
    'article.btc_4year.title': 'BTC Hits a 4-Year High, But I\'m Not Happy',
    'article.btc_4year.subtitle': 'BTC 又站上四年高点，我却高兴不起来',
    'article.btc_4year.para1': 'These days, the market is restless again. Stablecoins are exploding, U.S. debt is sky-high, and BTC quietly climbed to a four-year high.',
    'article.btc_4year.para2': 'Ironically, watching my account balance grow, I feel no joy at all. I don\'t even know what this high really means: $140K? $160K? $200K? Nobody can tell me for sure — which means I have no idea when the "perfect exit" is.',
    'article.btc_4year.para3': 'If I don\'t sell, financial freedom still feels distant. But if I sell now, I might miss that once-in-a-lifetime chance. At the root, my capital is just too small — like many young people, I dollar-cost averaged for three years to reach a 150% return. It looks good on paper, but it\'s nowhere near enough.',
    'article.btc_4year.para4': 'I keep asking myself: if I get this right, maybe I can build enough principal to reach freedom sooner. But if I misstep, all those hard-earned chips could vanish overnight.',
    'article.btc_4year.para5': 'For three years, I kept telling myself to be a long-term believer. To trust BTC\'s long-term value, to withstand the swings. But now that I\'m really here at a "cycle top," the doubts get louder: if I sell now, is my vision too small? If I don\'t, am I just greedy?',
    'article.btc_4year.para6': 'I thought I\'d learned from Buffett and Munger how to "buy good assets and hold." But the hard part was never buying — it\'s knowing when to sell, and how to handle the silence that follows.',
    'article.btc_4year.para7': 'The market always harvests the greedy and the fearful. But for ordinary people, these aren\'t just big words — they\'re the tiny bit of capital in our accounts, the heartbeat every time we check our balance, the anxiety of missing out, yet losing everything we\'ve gained.',
    'article.btc_4year.para8': 'I don\'t know if I\'m right this time. I don\'t know if staying in the game is smarter. The only thing I know is: this battle between freedom, desire, and patience is far from over. Making money is hard. Keeping it is harder. Earning enough to stop worrying — maybe that\'s the hardest of all.',
    'article.btc_4year.disclaimer': 'This article is purely personal reflection and does not constitute investment advice. BTC is highly volatile; please make independent judgments carefully.',
    
    // Article translations - buffett_munger_weekend_reflection.html
    'article.buffett.title': 'On the Weekly Highway Commute, I Listen to Buffett and Munger',
    'article.buffett.subtitle': 'Spiritual Companionship in Solitude',
    'article.buffett.para1': 'Since entering the final phase of my PhD, I drive from Buffalo to Toronto every weekend. Two hours on the highway, straight, with few exits. It\'s a road to the city, and also like a psychological journey into the adult world.',
    'article.buffett.para2': 'On this long, regular highway, I don\'t listen to pop music. Instead, I listen to Berkshire Hathaway shareholder meeting recordings, Buffett\'s speeches from his youth, Munger\'s sincere talks to students at various universities, and occasionally their casual conversations with partners. I also listen to lectures by their Chinese students like Duan Yongping and others at Peking University.',
    'article.buffett.para3': 'These voices have accompanied me through the latter half of my PhD journey. They are not just investment masters, but invisible mentors in my life stage.',
    'article.buffett.para4': 'Buffett often says: "Choosing a mentor who deeply influences you is a crucial step in life."',
    'article.buffett.para5': 'Parents certainly have a huge impact on you, but you cannot choose them. What matters is learning to discern your parents\' strengths and weaknesses, then absorbing the nutrients.',
    'article.buffett.para6': 'And if you don\'t have someone nearby to guide you, that\'s okay too—<strong>invisible spiritual mentors</strong> can shape you just as well. Their words, their ways of behavior, their judgment of this world, all leave echoes in your ears.',
    'article.buffett.para7': 'I\'m not a "fangirl" going to concerts, but I "follow stars" too. My idols are Buffett, Munger, and those who carve life trajectories with reason and common sense.',
    'article.buffett.para8': 'Buffett taught me how to use Graham\'s value principles to find great companies, while Munger taught me how to maintain inner order and restraint in this gold-obsessed world.',
    'article.buffett.para9': 'I am fortunate, and also alone. This solitude is not pessimistic, but a valuable companionship. It\'s like the highways of North America—straight, long, but leading to the distance.',
    'article.buffett.para10': 'When I graduate and enter society, perhaps 996 work schedules, rent, health insurance, and family will surround me. But the hardest part is how to preserve this sense of solitude in the adult world, not being defeated by trivialities.',
    'article.buffett.para11': 'Not everyone can live like a rational person all the time, but I want to keep getting closer to those clear-minded people—even if it\'s just through car speakers.',
    'article.buffett.quote': 'This piece was written on June 7, 2025, the eve of my 28th birthday.',
    'article.buffett.disclaimer': 'This article is purely the author\'s personal growth record and does not constitute investment or psychological advice.',
    
    // Article translations - btc_regulation.html
    'article.btc_regulation.title': 'Bitcoin as Digital Gold in an Era of Monetary Expansion',
    'article.btc_regulation.subtitle': '比特币是新时代的数字黄金',
    'article.btc_regulation.para1': 'Against the backdrop of continuous government money printing and global liquidity overflow, Bitcoin (BTC) is gradually taking on the role of "digital gold," no longer just a speculative asset, but becoming an important anchor against fiat currency depreciation.',
    'article.btc_regulation.para2': 'Looking back at history, gold has surged strongly during multiple monetary easing cycles. This round of BTC\'s upward structure is very likely to replicate gold\'s price rhythm.',
    'article.btc_regulation.section1.title': '📈 Medium-term Outlook: Peak Approaching',
    'article.btc_regulation.section1.para1': 'I predict BTC will reach the peak of this bull market around September 2025, with prices approximately in the <strong>$130K-$150K</strong> range.',
    'article.btc_regulation.section1.li1': 'The Fed\'s money printing trend has not stopped, and market favor for safe-haven assets is increasing',
    'article.btc_regulation.section1.li2': 'Dollar depreciation solves the U.S. debt problem; BTC\'s dollar-denominated rise actually reflects the dollar\'s shrinking speed',
    'article.btc_regulation.section1.li3': 'Technically, it\'s in the late stage of strong upward movement, but has not yet entered the selling phase',
    'article.btc_regulation.section2.title': '📉 Long-term Outlook: Pullback After the Peak',
    'article.btc_regulation.section2.para1': 'Q1 2026 will enter a major correction period, entering a cooling state similar to 2013 or 2021.',
    'article.btc_regulation.section2.para2': 'The final bottom may be formed between <strong>2027-2028</strong>, with BTC prices falling back to the <strong>$40K-$50K</strong> range.',
    'article.btc_regulation.quote': 'Although Bitcoin is highly volatile, in the long term, it is an important hedging tool against national money printing and asset depreciation.',
    'article.btc_regulation.para3': 'As an observer and supporter, I firmly believe that BTC is not a "speculative tool," but a pillar in future global asset allocation.',
    'article.btc_regulation.disclaimer': 'The views in this article represent only the author\'s personal opinion and do not constitute any investment advice. Bitcoin prices are highly volatile; please make independent judgments.',
    
    // Article translations - btc_repeat_4years.html
    'article.btc_repeat.title': 'Why Bitcoin Cycles Every Four Years, But You Still Can\'t Make Money?',
    'article.btc_repeat.para1': 'Bitcoin has completed three full cycles, halving almost every four years, accompanied by a surge and a crash. But surprisingly, most people still don\'t make money even after knowing this in advance.',
    'article.btc_repeat.section1.title': '① Human Nature Cannot Withstand Extreme Volatility',
    'article.btc_repeat.section1.para1': 'Bitcoin is not gentle. Its rise is not a slow climb, but **daily swings of 10% or even 20%**. Most people can\'t handle this intraday psychological torture. Even though it rose 50% in a year and multiplied several times over three years, they get off early in the process, or even go short.',
    'article.btc_repeat.section1.para2': 'Moreover, many people attribute profitable buys to their own judgment, and blame losses on bad luck. This <strong>blind confidence and hindsight regret</strong> essentially ignores one point: <strong>BTC\'s price is not controlled by human will</strong>.',
    'article.btc_repeat.section1.para3': 'Bitcoin is a deflationary asset, a reservoir for global money printing. It reflects the world\'s money printing rhythm, central bank policies, liquidity overflow, and even **the wealthy\'s desire for "uncontrollable assets"**. Just as the wealthy collected art in the 2000s, Bitcoin in the future will become a **borderless, tax-free, freely circulating "digital collectible"**.',
    'article.btc_repeat.section2.title': '② You Think You\'re Investing, But You\'re Actually "Following Stars"',
    'article.btc_repeat.section2.para1': 'Many people mock teenage girls who follow K-pop stars, but from a behavioral logic perspective, many middle-aged men following finance bloggers is actually more dangerous.',
    'article.btc_repeat.section2.para2': 'They hear a few rumors in the neighborhood and go all-in on a stock with their life savings; they watch a "K-line analysis master" in a video and truly believe "this wave won\'t stop at $100K."',
    'article.btc_repeat.section2.para3': 'So-called "finance bloggers" mostly have no real investment ability; they are more like content creators who "sell emotions." <strong>They are not trend discoverers, just traffic amplifiers</strong>.',
    'article.btc_repeat.section2.quote': 'Blindly following KOLs is not rational investing; it\'s entertainment disguised as finance.',
    'article.btc_repeat.section3.title': '③ The State Doesn\'t Want You to Get Rich',
    'article.btc_repeat.section3.para1': 'The reality is: most people cannot achieve financial freedom in their lifetime.',
    'article.btc_repeat.section3.para2': 'This is by design. The state relies on taxes and labor, <strong>needing most people to be in a state of "not starving but not getting rich"</strong>—this makes them easier to manage.',
    'article.btc_repeat.section3.para3': 'When a person is free, they become uncontrollable. When everyone in a society is wealthy, it\'s hard to maintain a stable structure.',
    'article.btc_repeat.section3.para4': 'Bitcoin challenges this structure: it\'s unregulated, hard to freeze, can be traded across borders, and doesn\'t rely on any national credit.',
    'article.btc_repeat.section3.para5': 'Whether you can make money doesn\'t depend on whether you understand K-lines, but on whether you truly understand the essence of this game.',
    'article.btc_repeat.disclaimer': 'The views in this article represent only the author\'s personal opinion and do not constitute any investment advice. Bitcoin prices are highly volatile; please make independent judgments.',
  }
};

/* ========== 核心函数 ========== */

// 获取当前语言（从 localStorage 或浏览器语言检测）
function getCurrentLanguage() {
  // 优先使用 localStorage 中保存的语言偏好
  const savedLang = localStorage.getItem('language');
  if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
    return savedLang;
  }
  
  // 检测浏览器语言
  const browserLang = navigator.language || navigator.userLanguage;
  
  // 如果是中文相关语言，返回中文
  if (browserLang.startsWith('zh')) {
    return 'zh';
  }
  
  // 默认返回英文
  return 'en';
}

// 切换语言函数
function switchLanguage(lang) {
  if (!translations[lang]) {
    console.warn(`Language ${lang} not supported`);
    return;
  }
  
  // 保存语言偏好
  localStorage.setItem('language', lang);
  
  // 更新所有带有 data-i18n 属性的元素
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      const translation = translations[lang][key];
      // 如果翻译内容包含HTML标签，使用innerHTML，否则使用textContent
      if (translation.includes('<') && translation.includes('>')) {
        element.innerHTML = translation;
      } else {
        element.textContent = translation;
      }
    }
  });
  
  // 更新所有带有 data-i18n-placeholder 属性的元素（如 input, textarea）
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      element.placeholder = translations[lang][key];
    }
  });
  
  // 更新语言切换按钮状态
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.dataset.lang === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // 更新 HTML lang 属性
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
}

// 初始化函数
function initI18n() {
  // 获取当前语言
  const currentLang = getCurrentLanguage();
  
  // 应用当前语言
  switchLanguage(currentLang);
  
  // 为语言切换按钮绑定事件（使用事件委托，支持动态加载的元素）
  function attachLanguageButtonListeners() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      // 检查是否已经绑定过事件
      if (!btn.dataset.hasListener) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const targetLang = btn.dataset.lang;
          if (targetLang) {
            switchLanguage(targetLang);
          }
        });
        btn.dataset.hasListener = 'true';
      }
    });
  }
  
  // 立即绑定
  attachLanguageButtonListeners();
  
  // 使用 MutationObserver 监听 DOM 变化，以便在 navbar 动态加载后也能绑定事件
  const observer = new MutationObserver(() => {
    attachLanguageButtonListeners();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // 存储到全局，供外部调用
  window.attachLanguageButtonListeners = attachLanguageButtonListeners;
}

// 导出函数供外部调用
window.switchLanguage = switchLanguage;
window.getCurrentLanguage = getCurrentLanguage;
window.initI18n = initI18n;

// 页面加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initI18n);
} else {
  // 如果 DOM 已经加载完成，立即初始化
  initI18n();
}

