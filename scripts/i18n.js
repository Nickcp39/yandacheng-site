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
    'blog.title': 'Yanda的博客',
    'blog.subtitle': '按分类浏览所有博文',
    'blog.timeline': '按时间排序',
    'blog.footer.copyright': 'Blog © Yanda Cheng',
    'blog.footer.updated': '最后更新',
    
    // 博客分类翻译
    'blog.category.investment': '投资',
    'blog.category.bitcoin': '比特币',
    'blog.category.real_estate': '房地产',
    'blog.category.stock_market': '股票市场',
    'blog.category.value_investing': '价值投资',
    'blog.category.career': '职场',
    'blog.category.tech_innovation': '技术创新',
    'blog.category.industry_news': '行业新闻',
    'blog.category.workplace_insights': '职场洞察',
    'blog.category.phd_possibilities': 'PhD可能性',
    'blog.category.medical_ai': '医疗AI',
    
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
    
    // 文章标题翻译 - 所有文章
    'article.staff_engineer.title': '【职场分享】资深工程师的挑战和策略',
    'article.staff_engineer.subtitle': 'Challenges and Strategies of Being a Staff Engineer',
    'article.btc_2026_prediction.title': 'BTC 2026年价格预测：站在周期拐点的思考',
    'article.btc_2026_prediction.subtitle': 'BTC Price Prediction for 2026: Reflections at a Cycle Inflection Point',
    'article.sglang_llm_agent.title': 'Building LLM Agent ID Scanner with SGLang: A Deep Dive',
    'article.sglang_llm_agent.subtitle': '使用 SGLang 构建 LLM Agent 身份证扫描系统',
    'article.llm_hospital_rad_linter.title': '使用SGLang构建Rad-Linter：医院端跨模态质控系统的生产实践',
    'article.llm_hospital_rad_linter.subtitle': 'Building Rad-Linter with SGLang: Production Experience of Cross-Modal Quality Control in Hospital Settings',
    'article.phd_possibilities.title': 'The Infinite Possibilities of a PhD: More Than Academia',
    'article.phd_possibilities.subtitle': 'PhD的无限可能性：不止是教职',
    'article.value_lessons.title': '价值投资的四条核心心法',
    'article.value_lessons.subtitle': 'Four Core Principles of Value Investing',
    
    // 文章翻译 - btc_2026_prediction.html (完整内容)
    'article.btc_2026.para1': '站在2025年12月的节点，回望这一年BTC的走势，从年初的震荡到年中的突破，再到年末的反复，市场情绪已经发生了微妙的变化。2026年即将到来，作为一个长期观察者和参与者，我想分享一些基于历史周期、技术结构和宏观环境的思考。',
    'article.btc_2026.section1.title': '🔢 BTC价格的本质：纯粹的数学',
    'article.btc_2026.section1.para1': '在开始预测之前，我必须强调一个核心观点：<strong>BTC的价格跟政策和技术完全没有关系，跟新闻完全没有任何的正相关，尤其是在长线上</strong>。BTC的价格是<strong>纯粹的数学</strong>。',
    'article.btc_2026.section1.para2': '很多人试图用政策变化、技术升级、新闻事件来解释BTC的价格波动，但这些都是<strong>噪音</strong>。真正驱动BTC长期价格的，是数学规律：',
    'article.btc_2026.section1.li1': '<strong>减半周期</strong>：每四年减半一次，供应量减少，需求不变或增长，价格必然上涨。这是数学，不是政策。',
    'article.btc_2026.section1.li2': '<strong>流动性数学</strong>：全球货币供应量、通胀率、利率变化，这些宏观数据决定了BTC的相对价值。政策只是这些数据的表现形式，不是原因。',
    'article.btc_2026.section1.li3': '<strong>市场周期</strong>：贪婪与恐惧的交替，形成可预测的周期。这不是新闻驱动的，而是人性与数学的结合。',
    'article.btc_2026.section1.para3': '所以，当我预测2026年的价格时，我关注的是<strong>数学模型、历史数据和周期规律</strong>，而不是政策变化或技术新闻。这些外部因素可能会造成短期波动，但<strong>长期趋势由数学决定</strong>。',
    'article.btc_2026.section2.title': '📊 2025年的回顾：预期与现实的差距',
    'article.btc_2026.section2.para1': '年初时，我曾预测BTC会在2025年9月左右达到13-15万美元的高点。现在看来，这个预测部分正确——市场确实在第三季度出现了强劲上涨，但高点的时间和幅度都超出了我的预期。',
    'article.btc_2026.section2.para2': '现实是：BTC在2025年展现出了更强的韧性。ETF的持续流入、机构资金的配置、以及全球流动性宽松的大环境，共同推高了价格。但这也意味着，2026年可能面临更大的回调压力。',
    'article.btc_2026.section3.title': '🔮 2026年的核心预测：稳定币暴雷与深度回调',
    'article.btc_2026.section3.para1': '基于对市场结构、流动性环境和历史周期的分析，我认为2026年将是一个<strong>深度调整年</strong>。最关键的风险点在于：<strong>稳定币可能在第一季度到第二季度之间出现暴雷</strong>。',
    'article.btc_2026.section3.subsection1.title': '💥 稳定币暴雷：2026年的黑天鹅',
    'article.btc_2026.section3.subsection1.para1': '稳定币作为加密市场的流动性基石，其稳定性直接影响整个市场的信心。然而，当前稳定币市场存在几个潜在风险：',
    'article.btc_2026.section3.subsection1.li1': '<strong>储备资产透明度不足</strong>：部分稳定币发行方储备资产结构复杂，存在期限错配和流动性风险。',
    'article.btc_2026.section3.subsection1.li2': '<strong>监管压力加剧</strong>：各国监管机构对稳定币的审查越来越严格，可能引发挤兑风险。',
    'article.btc_2026.section3.subsection1.li3': '<strong>市场杠杆过高</strong>：稳定币被大量用于杠杆交易，一旦出现脱锚，会引发连锁反应。',
    'article.btc_2026.section3.subsection1.para2': '如果稳定币在2026年Q1-Q2之间暴雷，将导致：',
    'article.btc_2026.section3.subsection1.li4': '市场流动性急剧收缩，大量资金逃离加密市场',
    'article.btc_2026.section3.subsection1.li5': '恐慌情绪蔓延，BTC作为"避险资产"也会受到冲击',
    'article.btc_2026.section3.subsection1.li6': '机构资金可能暂停流入，甚至出现赎回潮',
    'article.btc_2026.section3.subsection2.title': '📉 价格预测：2026年10月见底',
    'article.btc_2026.section3.subsection2.para1': '基于稳定币暴雷的假设，结合技术分析和历史周期，我预测BTC将在<strong>2026年10月左右</strong>达到本轮调整的底部。',
    'article.btc_2026.section3.subsection2.para2': '经过主观预测和计算，底部价格区间应该在<strong>5.7万-6.6万美元</strong>之间，<strong>中位数约6万美元</strong>。这个预测基于以下因素：',
    'article.btc_2026.section3.subsection2.li1': '<strong>技术支撑位</strong>：6万美元是重要的心理和技术支撑位，历史上多次在此位置反弹',
    'article.btc_2026.section3.subsection2.li2': '<strong>机构成本线</strong>：许多机构在2024-2025年建仓的成本线在5.5-6万美元区间，这将成为强支撑',
    'article.btc_2026.section3.subsection2.li3': '<strong>减半效应</strong>：2024年减半后的供应减少效应，会在2026年逐步显现，限制下跌空间',
    'article.btc_2026.section3.subsection2.li4': '<strong>市场情绪</strong>：10月通常是市场情绪最悲观的时候，容易形成阶段性底部',
    'article.btc_2026.section3.subsection2.para3': '如果稳定币暴雷的冲击超出预期，价格可能短暂跌破5.7万美元，但<strong>5.5万美元以下将是极佳的买入机会</strong>。反之，如果市场韧性更强，底部可能在6.6万美元附近。',
    'article.btc_2026.section4.title': '💡 我的判断与策略',
    'article.btc_2026.section4.para1': '基于稳定币暴雷的风险和价格预测，我认为2026年将是BTC的<strong>深度调整年</strong>。这次调整不会像2022年那样绝望，因为BTC的机构化程度更高，底部支撑会更坚实，但<strong>稳定币暴雷的冲击不容小觑</strong>。',
    'article.btc_2026.section4.para2': '对于我个人而言，策略是：',
    'article.btc_2026.section4.li1': '<strong>2026年Q1-Q2：密切关注稳定币动态</strong>。如果出现稳定币脱锚或暴雷迹象，我会提前减仓，降低风险暴露。这个阶段的关键是<strong>保住本金</strong>，而不是追求更高收益。',
    'article.btc_2026.section4.li2': '<strong>2026年10月-2027年1月：分批建仓</strong>。如果价格按照预期跌至5.7-6.6万美元区间，特别是接近6万美元时，我会开始分批建仓。目标是在<strong>2026年10月到2027年1月之间完成主要建仓</strong>，为下一个周期做准备。这个时间窗口给了足够的灵活性，可以在底部区域从容布局。',
    'article.btc_2026.section4.li3': '<strong>保持长期视角</strong>。稳定币暴雷只是周期中的一个事件，BTC作为数字黄金的长期价值不会改变。短期的价格波动只是周期的一部分，真正的财富来自于跨越周期的持有和<strong>在底部区域的勇敢买入</strong>。',
    'article.btc_2026.section5.title': '⚠️ 风险提示',
    'article.btc_2026.section5.para1': '需要强调的是，<strong>所有预测都只是基于数学模型和历史数据的推测</strong>。虽然BTC的长期价格由数学规律决定，但短期波动仍然存在不确定性。稳定币暴雷、市场流动性突然收缩等黑天鹅事件，可能会让价格偏离数学模型预测的轨迹。',
    'article.btc_2026.section5.para2': '更重要的是，<strong>没有人能准确预测市场</strong>。包括我在内的所有预测者，都只是在概率和可能性之间做判断。但理解BTC价格是<strong>纯粹的数学</strong>，可以帮助我们忽略政策、技术和新闻的噪音，专注于真正的驱动因素。真正的投资智慧，不在于预测的准确性，而在于<strong>理解数学规律并应对不确定性的能力</strong>。',
    'article.btc_2026.quote1': '投资BTC，本质上是投资一种新的资产类别，一种抵抗法币贬值的工具，一种去中心化的价值存储。价格预测只是工具，真正的目标是在这个过程中建立自己的投资框架和风险控制体系。',
    'article.btc_2026.para2': '2026年，无论BTC走向何方，我都会继续观察、学习和调整。因为在这个市场中，<strong>唯一不变的就是变化本身</strong>。',
    'article.btc_2026.disclaimer': '本文观点仅代表作者个人，不构成任何投资建议。比特币价格波动较大，请独立判断，谨慎投资。',
    
    // 文章翻译 - staff_engineer.html (完整内容)
    'article.staff_engineer.para1': '在 Hydrotech 工作的那段时间，我深刻体会到：成为一名资深工程师，最难的不是技术，而是与人交流。',
    'article.staff_engineer.para2': '当设备在客户现场出问题时，当销售团队在关键时刻需要技术支持时，当大客户和大领导同时在场时，技术能力只是基础。真正考验的是：如何在高压下保持冷静，如何快速建立客户信任，如何在关键时刻做出正确判断。',
    'article.staff_engineer.section1.title': '最难的不是技术，而是与人交流',
    'article.staff_engineer.section1.para1': '在 Hydrotech，我负责的是复杂的工业设备系统。从技术角度来说，这些系统确实有挑战性，但经过学习和实践，技术问题总能找到解决方案。真正让我感到棘手的，是那些"非技术"的挑战：',
    'article.staff_engineer.section1.li1': '<strong>如何在客户面前建立专业形象</strong>：客户不会关心你用了什么算法，他们只关心设备能不能正常工作，能不能解决他们的实际问题。',
    'article.staff_engineer.section1.li2': '<strong>如何在压力下保持冷静</strong>：当销售告诉你"如果这次失败，我们会丢失一个大单子"时，焦虑和压力会瞬间涌来。但你必须保持冷静，因为只有冷静才能找到问题的根源。',
    'article.staff_engineer.section1.li3': '<strong>如何与不同背景的人协作</strong>：现场工程师、销售团队、客户技术人员、公司管理层——每个人都有自己的视角和诉求，你需要用他们能理解的语言沟通。',
    'article.staff_engineer.section2.title': '如何获得客户的信任',
    'article.staff_engineer.section2.para1': '客户信任不是一蹴而就的，它需要在每一次互动中积累。在 Hydrotech，我总结出几个关键原则：',
    'article.staff_engineer.section2.li1': '<strong>快速响应</strong>：当客户有问题时，第一时间回应。即使你暂时没有解决方案，也要让他们知道你在关注，你在行动。',
    'article.staff_engineer.section2.li2': '<strong>诚实透明</strong>：如果设备确实有问题，不要试图掩盖。诚实告诉客户问题所在，以及你的解决计划。客户更愿意相信一个诚实的人，而不是一个总是说"没问题"的人。',
    'article.staff_engineer.section2.li3': '<strong>专业能力</strong>：在关键时刻，你的技术能力必须过硬。客户信任你，是因为他们相信你能解决问题。如果技术能力不足，再好的沟通技巧也无法建立长期信任。',
    'article.staff_engineer.section2.li4': '<strong>站在客户角度思考</strong>：不要只从技术角度考虑问题，要理解客户的业务需求。他们为什么需要这个设备？这个设备对他们意味着什么？理解这些，你才能提供真正有价值的支持。',
    'article.staff_engineer.section3.title': '如何快速反应',
    'article.staff_engineer.section3.para1': '在工业设备领域，问题往往出现在最不合适的时候。快速反应不仅仅是速度，更是一种系统化的思维方式：',
    'article.staff_engineer.section3.li1': '<strong>建立问题排查流程</strong>：不要一接到问题就慌。按照既定的排查流程，从最简单、最常见的问题开始检查。很多时候，问题比你想象的要简单。',
    'article.staff_engineer.section3.li2': '<strong>保持冷静，系统思考</strong>：压力会让人失去判断力。深呼吸，把问题分解成几个部分，逐一排查。记住：大多数"复杂"问题，其实都是简单问题的组合。',
    'article.staff_engineer.section3.li3': '<strong>利用团队资源</strong>：不要试图一个人解决所有问题。现场工程师、技术支持团队、研发部门——每个人都有自己的专长。快速反应也包括快速找到对的人。',
    'article.staff_engineer.section4.title': '那个早上6点的电话',
    'article.staff_engineer.section4.para1': '让我分享一个真实的案例，这个经历让我深刻理解了什么是"快速反应"和"在压力下保持冷静"。',
    'article.staff_engineer.section4.para2': '那是一个普通的早晨，6点钟，我的手机响了。是销售团队打来的，声音里带着明显的焦虑："我们的设备在客户现场出问题了，今天是大客户和大领导来参观的日子。如果设备不能正常工作，我们可能会丢失这个重要订单。"',
    'article.staff_engineer.section4.para3': '我立刻清醒了。这不是一个普通的技术支持电话，这是一个关键时刻。我迅速整理思路，开始远程排查：',
    'article.staff_engineer.section4.li1': '首先，我让现场工程师详细描述问题现象：设备无法启动，没有任何响应。',
    'article.staff_engineer.section4.li2': '然后，我按照排查流程，逐一检查：电源连接、信号线、控制面板、系统日志……',
    'article.staff_engineer.section4.li3': '在排查过程中，我保持与销售团队的沟通，让他们知道我在行动，问题正在解决中。',
    'article.staff_engineer.section4.para4': '经过仔细排查，我发现了问题：<strong>现场工程师忘记给一个关键设备插上电源了</strong>。',
    'article.staff_engineer.section4.para5': '听起来很简单，对吧？但在那个高压环境下，在所有人都焦虑不安的时候，能够保持冷静、系统化地排查问题，最终找到这个"简单"的根源，这就是资深工程师的价值所在。',
    'article.staff_engineer.section4.para6': '更重要的是，我没有因为问题"简单"而轻视它，也没有因为压力而慌乱。我按照流程，一步步排查，最终找到了问题。这种专业的态度，赢得了客户的信任，也帮助公司保住了那个重要订单。',
    'article.staff_engineer.section5.title': '总结',
    'article.staff_engineer.section5.para1': '在 Hydrotech 的经历让我明白，技术能力只是基础。真正让一个工程师成为"资深"的，是那些软技能：',
    'article.staff_engineer.section5.li1': '<strong>沟通能力</strong>：能够与不同背景的人有效沟通，用他们能理解的语言解释技术问题。',
    'article.staff_engineer.section5.li2': '<strong>抗压能力</strong>：在关键时刻保持冷静，系统化地思考问题，不被情绪左右。',
    'article.staff_engineer.section5.li3': '<strong>客户导向</strong>：始终站在客户角度思考问题，理解他们的需求，建立长期信任。',
    'article.staff_engineer.section5.li4': '<strong>快速反应</strong>：建立系统化的排查流程，在压力下依然能够高效解决问题。',
    'article.staff_engineer.section5.para2': '这些技能不是天生的，它们需要在实践中不断磨练。每一次危机，都是成长的机会。那个早上6点的电话，让我学会了如何在压力下保持专业，如何在关键时刻做出正确判断。',
    'article.staff_engineer.section5.para3': '如果你也在追求成为资深工程师的路上，记住：技术很重要，但沟通、信任和快速反应同样重要，甚至更重要。',
    'article.staff_engineer.disclaimer': 'All posts represent my personal experience only. Opinions expressed are solely my own and do not express the views or opinions of any organization or group.',
    
    // 文章翻译 - sglang_llm_agent_id_scanner.html (完整内容 - 需要中文翻译)
    'article.sglang_llm_agent.intro': '在这篇文章中，我将分享我在3天内使用<strong>SGLang推理服务器</strong>构建LLM Agent身份证扫描系统的经验。我们将探讨为什么SGLang是改变游戏规则的关键，深入了解其技术架构，并讨论实际生产环境的考虑因素。',
    'article.sglang_llm_agent.section1.title': '🎯 为什么选择SGLang？传统LLM推理的问题',
    'article.sglang_llm_agent.section1.para1': '在构建文档处理系统时，我们面临几个关键挑战：',
    'article.sglang_llm_agent.section1.li1': '<strong>结构化输出要求</strong>：我们需要从护照/驾照图像中可靠地提取JSON模式',
    'article.sglang_llm_agent.section1.li2': '<strong>低延迟</strong>：面向用户应用的实时处理',
    'article.sglang_llm_agent.section1.li3': '<strong>高吞吐量</strong>：生产工作负载的批处理能力',
    'article.sglang_llm_agent.section1.li4': '<strong>成本效益</strong>：优化GPU利用率并降低推理成本',
    'article.sglang_llm_agent.section1.para2': '传统LLM推理框架经常面临以下问题：',
    'article.sglang_llm_agent.section1.li5': '结构化输出的高延迟开销（JSON解析、验证）',
    'article.sglang_llm_agent.section1.li6': '低效的批处理浪费GPU资源',
    'article.sglang_llm_agent.section1.li7': '对模式优先设计模式的支持有限',
    'article.sglang_llm_agent.section1.li8': '复杂的部署流程',
    'article.sglang_llm_agent.section1.para3': '<strong>SGLang</strong>通过其高性能运行时和原生结构化输出支持解决了这些痛点。',
    'article.sglang_llm_agent.section2.title': '⚡ SGLang的核心技术',
    'article.sglang_llm_agent.section2.subsection1.title': '1. RadixAttention：内存效率的游戏规则改变者',
    'article.sglang_llm_agent.section2.subsection1.para1': 'SGLang的<strong>RadixAttention</strong>机制使用基数树缓存常见的提示前缀，显著减少内存使用并提高吞吐量。对于我们的身份证扫描用例，具有相似的提示结构，这意味着：',
    'article.sglang_llm_agent.section2.subsection1.li1': '每个请求的内存占用减少',
    'article.sglang_llm_agent.section2.subsection1.li2': '批处理推理更快',
    'article.sglang_llm_agent.section2.subsection1.li3': '更好的GPU利用率',
    'article.sglang_llm_agent.section2.subsection2.title': '2. 原生结构化输出支持',
    'article.sglang_llm_agent.section2.subsection2.para1': '与需要后处理JSON解析的框架不同，SGLang提供<strong>原生JSON模式支持</strong>。这对我们的模式优先设计至关重要：',
    'article.sglang_llm_agent.section2.subsection2.para2': 'SGLang确保模型输出严格遵循此模式，消除解析错误和验证开销。',
    'article.sglang_llm_agent.section2.subsection3.title': '3. 连续批处理和零开销调度',
    'article.sglang_llm_agent.section2.subsection3.para1': 'SGLang的连续批处理允许动态请求排队，无需等待整个批次完成。结合零开销CPU调度，这实现了：',
    'article.sglang_llm_agent.section2.subsection3.li1': '更高的GPU利用率（通常提高2-3倍）',
    'article.sglang_llm_agent.section2.subsection3.li2': '单个请求的延迟更低',
    'article.sglang_llm_agent.section2.subsection3.li3': '更好地处理可变长度输入',
    'article.sglang_llm_agent.section3.title': '🏗️ 架构：SGLang + Fireworks AI + Llama 3.2 Vision',
    'article.sglang_llm_agent.section3.para1': '我们的LLM Agent身份证扫描系统架构：',
    'article.sglang_llm_agent.section3.subsection1.title': '关键设计决策',
    'article.sglang_llm_agent.section3.subsection1.li1': '<strong>模式优先设计</strong>：预先定义JSON模式，确保可审计性和类型安全',
    'article.sglang_llm_agent.section3.subsection1.li2': '<strong>基于置信度的路由</strong>：低置信度输出路由到人工审核',
    'article.sglang_llm_agent.section3.subsection1.li3': '<strong>多模式部署</strong>：支持无服务器、按需和批处理',
    'article.sglang_llm_agent.section3.subsection1.li4': '<strong>错误处理</strong>：全面的边界情况处理（模糊、眩光、旋转、低分辨率）',
    'article.sglang_llm_agent.section4.title': '💻 实现亮点',
    'article.sglang_llm_agent.section4.subsection1.title': '连接到SGLang服务器',
    'article.sglang_llm_agent.section4.subsection2.title': '生产环境考虑',
    'article.sglang_llm_agent.section4.subsection2.li1': '<strong>错误处理</strong>：对低质量图像进行优雅降级',
    'article.sglang_llm_agent.section4.subsection2.li2': '<strong>速率限制</strong>：防止API滥用',
    'article.sglang_llm_agent.section4.subsection2.li3': '<strong>监控</strong>：跟踪延迟、吞吐量和错误率',
    'article.sglang_llm_agent.section4.subsection2.li4': '<strong>成本优化</strong>：对非实时工作负载进行批处理',
    'article.sglang_llm_agent.section5.title': '📊 性能结果',
    'article.sglang_llm_agent.section5.para1': '我们的实现达到了：',
    'article.sglang_llm_agent.section5.li1': '<strong>延迟</strong>：每个文档约200-300毫秒（包括图像预处理）',
    'article.sglang_llm_agent.section5.li2': '<strong>吞吐量</strong>：批处理时每秒50+个文档',
    'article.sglang_llm_agent.section5.li3': '<strong>准确性</strong>：95%+的结构化输出合规性（无解析错误）',
    'article.sglang_llm_agent.section5.li4': '<strong>GPU利用率</strong>：70-80%（vs. 标准推理的30-40%）',
    'article.sglang_llm_agent.section5.para2': '<strong>关键洞察</strong>：SGLang的结构化输出支持消除了所有JSON解析错误，这是传统方法的主要痛点。',
    'article.sglang_llm_agent.section6.title': '🎓 经验教训和最佳实践',
    'article.sglang_llm_agent.section6.subsection1.title': '何时使用SGLang',
    'article.sglang_llm_agent.section6.subsection1.li1': '✅ 需要结构化输出的生产LLM应用',
    'article.sglang_llm_agent.section6.subsection1.li2': '✅ 高吞吐量批处理工作负载',
    'article.sglang_llm_agent.section6.subsection1.li3': '✅ 具有相似提示模式的应用（受益于RadixAttention）',
    'article.sglang_llm_agent.section6.subsection1.li4': '✅ 成本敏感的部署（更好的GPU利用率）',
    'article.sglang_llm_agent.section6.subsection2.title': '部署建议',
    'article.sglang_llm_agent.section6.subsection2.li1': '从单个GPU实例开始，根据需要水平扩展',
    'article.sglang_llm_agent.section6.subsection2.li2': '对混合实时和批处理工作负载使用连续批处理',
    'article.sglang_llm_agent.section6.subsection2.li3': '仔细监控内存使用——RadixAttention有帮助但仍需要调优',
    'article.sglang_llm_agent.section6.subsection2.li4': '实现适当的错误处理和回退机制',
    'article.sglang_llm_agent.section6.subsection3.title': '常见陷阱',
    'article.sglang_llm_agent.section6.subsection3.li1': '❌ 在理解实际用例之前过度优化模式',
    'article.sglang_llm_agent.section6.subsection3.li2': '❌ 忽略文档质量的边界情况',
    'article.sglang_llm_agent.section6.subsection3.li3': '❌ 未实现适当的置信度阈值',
    'article.sglang_llm_agent.section6.subsection3.li4': '❌ 跳过关键决策的人工介入',
    
    // 文章翻译 - llm_hospital_rad_linter.html (完整内容 - 需要英文翻译)
    'article.llm_hospital_rad_linter.intro': '最近在医院端部署了一个基于SGLang的放射科报告质控系统（Rad-Linter）。这是一个<strong>内网部署、强合规约束</strong>的真实生产场景，与常见的"报告生成"任务不同，我们做的是<strong>跨模态事实核查（cross-modal fact-checking）</strong>。本文将分享技术选型、生产挑战，以及SGLang在医疗场景下的实践心得。',
    'article.llm_hospital_rad_linter.section1.title': '🎯 Rad-Linter的定位：不是报告生成，而是质控审计',
    'article.llm_hospital_rad_linter.section1.para1': '在讨论技术细节之前，需要先明确<strong>Rad-Linter与报告生成任务的根本区别</strong>：',
    'article.llm_hospital_rad_linter.section1.highlight.title': 'Rad-Linter的核心定位：',
    'article.llm_hospital_rad_linter.section1.highlight.para1': '给定一份<strong>已写好的radiology report</strong> + 一组从影像侧提取的<strong>视觉证据（visual_facts，病种概率/提示）</strong>，让模型输出<strong>QA结论</strong>（是否错误/错误类型/证据解释）。',
    'article.llm_hospital_rad_linter.section1.highlight.para2': '<strong>关键点：</strong>我们不生成报告，我们审计既有报告。输出是错误判定+分型+证据，而不是生成一段Findings/Impression。',
    'article.llm_hospital_rad_linter.section1.subsection1.title': '临床工作流中的位置',
    'article.llm_hospital_rad_linter.section1.subsection1.para1': '在临床工作流中，<strong>Radiology Report</strong>和<strong>Medical Note</strong>是两种不同的文档：',
    'article.llm_hospital_rad_linter.section1.subsection1.li1': '<strong>Radiology Report</strong>：由放射科医生撰写，专门描述医学影像的发现、诊断意见，是专业影像解读',
    'article.llm_hospital_rad_linter.section1.subsection1.li2': '<strong>Medical Note</strong>：更广泛的临床文档，包含病史、检查结果、诊断、治疗计划等，是完整的患者记录',
    'article.llm_hospital_rad_linter.section1.subsection1.li3': '<strong>生成关系</strong>：Radiology Report通常作为Medical Note的一部分，提供影像学专业见解',
    'article.llm_hospital_rad_linter.section1.subsection1.para2': '目前LLM在临床工作流中的研究主要集中在：',
    'article.llm_hospital_rad_linter.section1.subsection1.li4': '<strong>报告生成</strong>：从影像→生成完整报告（R2Gen、TRRG、RadAlign等）',
    'article.llm_hospital_rad_linter.section1.subsection1.li5': '<strong>临床文档生成</strong>：自动生成和总结医疗记录',
    'article.llm_hospital_rad_linter.section1.subsection1.li6': '<strong>临床决策支持</strong>：辅助分诊、转诊和诊断预测',
    'article.llm_hospital_rad_linter.section1.subsection1.li7': '<strong>医学视觉问答</strong>：基于视觉和语言的问答系统',
    'article.llm_hospital_rad_linter.section1.subsection1.para3': '<strong>Rad-Linter填补的空白</strong>：在报告生成之后，需要一个独立的<strong>质控环节</strong>。就像代码需要linter检查一样，医疗报告也需要"第二读者"来发现遗漏、矛盾和不一致。这个需求是<strong>独立存在的</strong>——即使不使用自动生成，医生手写的报告同样需要QA。',
    'article.llm_hospital_rad_linter.section2.title': '📹 项目演示视频',
    'article.llm_hospital_rad_linter.section2.para1': '以下是Rad-Linter系统的演示视频，展示了跨模态事实核查的工作流程：',
    'article.llm_hospital_rad_linter.section2.para2': '💡 <strong>提示</strong>：如需嵌入视频，请取消注释上面的代码块，并将VIDEO_ID替换为实际的视频ID。<br>Bilibili视频ID格式：BV1xx411c7mu（从视频URL中获取）<br>YouTube视频ID格式：dQw4w9WgXcQ（从视频URL中获取）',
    'article.llm_hospital_rad_linter.section3.title': '🏗️ 技术架构：为什么选择SGLang作为中间层？',
    'article.llm_hospital_rad_linter.section3.subsection1.title': '1. 系统架构概览',
    'article.llm_hospital_rad_linter.section3.subsection2.title': '2. 为什么选择SGLang？',
    'article.llm_hospital_rad_linter.section3.subsection2.para1': '在医疗场景下，我们面临几个关键约束：',
    'article.llm_hospital_rad_linter.section3.subsection2.li1': '<strong>并发量不大</strong>：医院内网环境，请求量相对可控',
    'article.llm_hospital_rad_linter.section3.subsection2.li2': '<strong>可观测性要求极高</strong>：医学需要精准和可解释性，每一步都要可审计',
    'article.llm_hospital_rad_linter.section3.subsection2.li3': '<strong>本地计算性能优化</strong>：内网部署，不能依赖云端API',
    'article.llm_hospital_rad_linter.section3.subsection2.li4': '<strong>结构化输出</strong>：需要严格的JSON Schema输出（错误类型、证据定位）',
    'article.llm_hospital_rad_linter.section3.subsection2.para2': '<strong>SGLang的优势</strong>：',
    'article.llm_hospital_rad_linter.section3.subsection2.li5': '<strong>本地部署友好</strong>：支持on-prem部署，满足医疗数据隐私要求',
    'article.llm_hospital_rad_linter.section3.subsection2.li6': '<strong>结构化输出原生支持</strong>：JSON Schema约束，确保输出格式严格符合要求',
    'article.llm_hospital_rad_linter.section3.subsection2.li7': '<strong>性能优化</strong>：RadixAttention、连续批处理等特性，在低并发场景下也能充分利用GPU',
    'article.llm_hospital_rad_linter.section3.subsection2.li8': '<strong>可观测性</strong>：支持详细的metrics和tracing，便于审计和调试',
    'article.llm_hospital_rad_linter.section3.subsection2.li9': '<strong>低延迟</strong>：对于医疗场景的实时反馈需求，SGLang的优化效果显著',
    'article.llm_hospital_rad_linter.section3.subsection3.title': '3. 与报告生成任务的对比',
    'article.llm_hospital_rad_linter.section4.title': '💻 生产挑战与SGLang实践',
    'article.llm_hospital_rad_linter.section4.subsection1.title': '挑战1：可观测性（Observability）',
    'article.llm_hospital_rad_linter.section4.subsection1.para1': '<strong>医疗场景的特殊性</strong>：医学需要精准和可解释性。每一步决策都要可审计、可追溯。',
    'article.llm_hospital_rad_linter.section4.subsection1.para2': '<strong>我们的解决方案：</strong>',
    'article.llm_hospital_rad_linter.section4.subsection1.li1': '<strong>结构化输出追踪</strong>：SGLang的JSON Schema输出让我们能够精确追踪每个字段的来源',
    'article.llm_hospital_rad_linter.section4.subsection1.li2': '<strong>证据链记录</strong>：记录visual_facts的输入、LLM的推理过程、最终QA判定',
    'article.llm_hospital_rad_linter.section4.subsection1.li3': '<strong>Metrics收集</strong>：TTFT、tokens/s、queue time、batch size、KV cache使用情况',
    'article.llm_hospital_rad_linter.section4.subsection1.li4': '<strong>错误分类统计</strong>：按错误类型（omission/contradiction/laterality等）统计，便于持续优化',
    'article.llm_hospital_rad_linter.section4.subsection1.highlight.title': '可观测性最佳实践：',
    'article.llm_hospital_rad_linter.section4.subsection2.title': '挑战2：本地计算性能优化',
    'article.llm_hospital_rad_linter.section4.subsection2.para1': '内网部署意味着不能依赖云端API，必须在本地GPU上高效运行。',
    'article.llm_hospital_rad_linter.section4.subsection2.para2': '<strong>SGLang的性能优势：</strong>',
    'article.llm_hospital_rad_linter.section4.subsection2.li1': '<strong>RadixAttention</strong>：对于相似的prompt结构（我们的QA任务有固定模板），缓存效果显著',
    'article.llm_hospital_rad_linter.section4.subsection2.li2': '<strong>连续批处理</strong>：即使并发量不大，也能充分利用GPU资源',
    'article.llm_hospital_rad_linter.section4.subsection2.li3': '<strong>KV Cache优化</strong>：减少重复计算，降低延迟',
    'article.llm_hospital_rad_linter.section4.subsection2.li4': '<strong>结构化输出优化</strong>：相比后处理JSON解析，原生支持减少了开销',
    'article.llm_hospital_rad_linter.section4.subsection3.title': '挑战3：错误类型分类与证据定位',
    'article.llm_hospital_rad_linter.section4.subsection3.para1': '与纯文本proofreading不同，Rad-Linter需要处理<strong>跨模态不一致</strong>：',
    'article.llm_hospital_rad_linter.section4.subsection3.li1': '<strong>Omission（遗漏）</strong>：影像显示异常，但报告中未提及',
    'article.llm_hospital_rad_linter.section4.subsection3.li2': '<strong>Contradiction（矛盾）</strong>：报告描述与视觉证据不一致',
    'article.llm_hospital_rad_linter.section4.subsection3.li3': '<strong>Laterality（侧别错误）</strong>：左右侧描述错误',
    'article.llm_hospital_rad_linter.section4.subsection3.li4': '<strong>Severity mismatch（严重程度不匹配）</strong>：报告中的严重程度与影像证据不符',
    'article.llm_hospital_rad_linter.section4.subsection3.para2': 'SGLang的结构化输出让我们能够<strong>精确控制</strong>错误类型的分类和证据的定位，这对于医疗场景的<strong>可解释性</strong>至关重要。',
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
    
    // Blog category translations
    'blog.category.investment': 'Investment',
    'blog.category.bitcoin': 'Bitcoin',
    'blog.category.real_estate': 'Real Estate',
    'blog.category.stock_market': 'Stock Market',
    'blog.category.value_investing': 'Value Investing',
    'blog.category.career': 'Career',
    'blog.category.tech_innovation': 'Tech Innovation',
    'blog.category.industry_news': 'Industry News',
    'blog.category.workplace_insights': 'Workplace Insights',
    'blog.category.phd_possibilities': 'PhD Possibilities',
    'blog.category.medical_ai': 'Medical AI',
    
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
    
    // Article title translations - all articles
    'article.staff_engineer.title': 'Challenges and Strategies of Being a Staff Engineer',
    'article.staff_engineer.subtitle': '【职场分享】资深工程师的挑战和策略',
    'article.btc_2026_prediction.title': 'BTC Price Prediction for 2026: Reflections at a Cycle Inflection Point',
    'article.btc_2026_prediction.subtitle': 'BTC 2026年价格预测：站在周期拐点的思考',
    'article.sglang_llm_agent.title': 'Building LLM Agent ID Scanner with SGLang: A Deep Dive',
    'article.sglang_llm_agent.subtitle': '使用 SGLang 构建 LLM Agent 身份证扫描系统',
    'article.llm_hospital_rad_linter.title': 'Building Rad-Linter with SGLang: Production Experience of Cross-Modal Quality Control in Hospital Settings',
    'article.llm_hospital_rad_linter.subtitle': '使用SGLang构建Rad-Linter：医院端跨模态质控系统的生产实践',
    'article.phd_possibilities.title': 'The Infinite Possibilities of a PhD: More Than Academia',
    'article.phd_possibilities.subtitle': 'PhD的无限可能性：不止是教职',
    'article.value_lessons.title': 'Four Core Principles of Value Investing',
    'article.value_lessons.subtitle': '价值投资的四条核心心法',
    
    // Article translations - btc_2026_prediction.html (full content)
    'article.btc_2026.para1': 'Standing at December 2025, looking back at BTC\'s trajectory this year—from early volatility to mid-year breakthroughs, then year-end fluctuations—market sentiment has shifted subtly. As 2026 approaches, as a long-term observer and participant, I want to share some reflections based on historical cycles, technical structure, and macro environment.',
    'article.btc_2026.section1.title': '🔢 The Essence of BTC Price: Pure Mathematics',
    'article.btc_2026.section1.para1': 'Before making predictions, I must emphasize a core view: <strong>BTC\'s price has no relationship with policy or technology, and no positive correlation with news whatsoever, especially in the long term</strong>. BTC\'s price is <strong>pure mathematics</strong>.',
    'article.btc_2026.section1.para2': 'Many try to explain BTC\'s price movements using policy changes, technological upgrades, or news events, but these are all <strong>noise</strong>. What truly drives BTC\'s long-term price is mathematical law:',
    'article.btc_2026.section1.li1': '<strong>Halving cycles</strong>: Halving every four years, supply decreases, demand remains constant or grows, price must rise. This is mathematics, not policy.',
    'article.btc_2026.section1.li2': '<strong>Liquidity mathematics</strong>: Global money supply, inflation rates, interest rate changes—these macro data determine BTC\'s relative value. Policy is just the manifestation of these data, not the cause.',
    'article.btc_2026.section1.li3': '<strong>Market cycles</strong>: The alternation of greed and fear forms predictable cycles. This isn\'t news-driven, but a combination of human nature and mathematics.',
    'article.btc_2026.section1.para3': 'Therefore, when predicting 2026 prices, I focus on <strong>mathematical models, historical data, and cyclical patterns</strong>, not policy changes or tech news. These external factors may cause short-term volatility, but <strong>long-term trends are determined by mathematics</strong>.',
    'article.btc_2026.section2.title': '📊 2025 Review: Gap Between Expectations and Reality',
    'article.btc_2026.section2.para1': 'At the start of the year, I predicted BTC would peak around $130K-$150K in September 2025. Looking back, this prediction was partially correct—the market did see strong gains in Q3, but both timing and magnitude exceeded my expectations.',
    'article.btc_2026.section2.para2': 'The reality is: BTC showed stronger resilience in 2025. Continued ETF inflows, institutional allocations, and a globally accommodative monetary environment pushed prices higher. But this also means 2026 may face greater correction pressure.',
    'article.btc_2026.section3.title': '🔮 Core 2026 Prediction: Stablecoin Collapse and Deep Correction',
    'article.btc_2026.section3.para1': 'Based on analysis of market structure, liquidity environment, and historical cycles, I believe 2026 will be a <strong>year of deep adjustment</strong>. The most critical risk point is: <strong>stablecoins may experience a collapse between Q1 and Q2</strong>.',
    'article.btc_2026.section3.subsection1.title': '💥 Stablecoin Collapse: 2026\'s Black Swan',
    'article.btc_2026.section3.subsection1.para1': 'As the liquidity foundation of crypto markets, stablecoin stability directly affects overall market confidence. However, the current stablecoin market has several potential risks:',
    'article.btc_2026.section3.subsection1.li1': '<strong>Insufficient reserve asset transparency</strong>: Some stablecoin issuers have complex reserve structures with maturity mismatches and liquidity risks.',
    'article.btc_2026.section3.subsection1.li2': '<strong>Increasing regulatory pressure</strong>: Regulatory scrutiny of stablecoins is intensifying globally, potentially triggering bank runs.',
    'article.btc_2026.section3.subsection1.li3': '<strong>Excessive market leverage</strong>: Stablecoins are heavily used in leveraged trading; once depegging occurs, it triggers chain reactions.',
    'article.btc_2026.section3.subsection1.para2': 'If stablecoins collapse in Q1-Q2 2026, it will lead to:',
    'article.btc_2026.section3.subsection1.li4': 'Sharp market liquidity contraction, massive capital flight from crypto markets',
    'article.btc_2026.section3.subsection1.li5': 'Panic spreading, BTC as a "safe haven" will also be impacted',
    'article.btc_2026.section3.subsection1.li6': 'Institutional capital may pause inflows, even triggering redemption waves',
    'article.btc_2026.section3.subsection2.title': '📉 Price Prediction: Bottom in October 2026',
    'article.btc_2026.section3.subsection2.para1': 'Based on the stablecoin collapse assumption, combined with technical analysis and historical cycles, I predict BTC will reach the bottom of this adjustment cycle <strong>around October 2026</strong>.',
    'article.btc_2026.section3.subsection2.para2': 'Through subjective prediction and calculation, the bottom price range should be between <strong>$57,000-$66,000</strong>, with a <strong>median around $60,000</strong>. This prediction is based on:',
    'article.btc_2026.section3.subsection2.li1': '<strong>Technical support levels</strong>: $60K is a crucial psychological and technical support level, with multiple historical rebounds at this price',
    'article.btc_2026.section3.subsection2.li2': '<strong>Institutional cost basis</strong>: Many institutions\' entry costs from 2024-2025 are in the $55K-$60K range, forming strong support',
    'article.btc_2026.section3.subsection2.li3': '<strong>Halving effects</strong>: Post-2024 halving supply reduction effects will gradually manifest in 2026, limiting downside',
    'article.btc_2026.section3.subsection2.li4': '<strong>Market sentiment</strong>: October is typically when market sentiment is most pessimistic, easily forming cyclical bottoms',
    'article.btc_2026.section3.subsection2.para3': 'If stablecoin collapse impact exceeds expectations, prices may briefly fall below $57K, but <strong>below $55K would be an excellent buying opportunity</strong>. Conversely, if market resilience is stronger, the bottom may be around $66K.',
    'article.btc_2026.section4.title': '💡 My Judgment and Strategy',
    'article.btc_2026.section4.para1': 'Based on stablecoin collapse risks and price predictions, I believe 2026 will be BTC\'s <strong>year of deep adjustment</strong>. This adjustment won\'t be as desperate as 2022, because BTC\'s institutionalization is higher and bottom support will be more solid, but <strong>the impact of stablecoin collapse cannot be underestimated</strong>.',
    'article.btc_2026.section4.para2': 'For me personally, the strategy is:',
    'article.btc_2026.section4.li1': '<strong>Q1-Q2 2026: Closely monitor stablecoin dynamics</strong>. If signs of stablecoin depegging or collapse appear, I\'ll reduce positions early to lower risk exposure. The key in this phase is <strong>preserving capital</strong>, not pursuing higher returns.',
    'article.btc_2026.section4.li2': '<strong>October 2026 - January 2027: Build positions in batches</strong>. If prices fall to the $57K-$66K range as expected, especially near $60K, I\'ll start building positions in batches. The goal is to <strong>complete major position building between October 2026 and January 2027</strong>, preparing for the next cycle. This time window provides enough flexibility to calmly position in the bottom region.',
    'article.btc_2026.section4.li3': '<strong>Maintain a long-term perspective</strong>. Stablecoin collapse is just one event in the cycle; BTC\'s long-term value as digital gold won\'t change. Short-term price swings are just part of the cycle—real wealth comes from holding across cycles and <strong>bravely buying at bottom regions</strong>.',
    'article.btc_2026.section5.title': '⚠️ Risk Warning',
    'article.btc_2026.section5.para1': 'It must be emphasized that <strong>all predictions are merely speculation based on mathematical models and historical data</strong>. Although BTC\'s long-term price is determined by mathematical laws, short-term volatility still contains uncertainty. Black swan events like stablecoin collapses or sudden market liquidity contractions may cause prices to deviate from mathematically predicted trajectories.',
    'article.btc_2026.section5.para2': 'More importantly, <strong>no one can accurately predict markets</strong>. All forecasters, including myself, are only making judgments between probabilities and possibilities. But understanding that BTC\'s price is <strong>pure mathematics</strong> helps us ignore the noise of policy, technology, and news, focusing on the true driving factors. True investment wisdom lies not in prediction accuracy, but in <strong>understanding mathematical laws and the ability to handle uncertainty</strong>.',
    'article.btc_2026.quote1': 'Investing in BTC is essentially investing in a new asset class, a tool to resist fiat depreciation, a decentralized store of value. Price predictions are just tools—the real goal is building your own investment framework and risk control system in this process.',
    'article.btc_2026.para2': 'In 2026, wherever BTC goes, I\'ll continue observing, learning, and adjusting. Because in this market, <strong>the only constant is change itself</strong>.',
    'article.btc_2026.disclaimer': 'The views in this article represent only the author\'s personal opinion and do not constitute any investment advice. Bitcoin prices are highly volatile; please make independent judgments and invest carefully.',
    
    // Article translations - staff_engineer.html (full content)
    'article.staff_engineer.para1': 'During my time at Hydrotech, I learned a profound lesson: becoming a Staff Engineer isn\'t about technical mastery—it\'s about communication.',
    'article.staff_engineer.para2': 'When equipment fails at a client site, when the sales team needs technical support at a critical moment, when major clients and executives are present simultaneously—technical skills are just the foundation. What truly matters is: maintaining composure under pressure, quickly building client trust, and making the right judgment calls in critical moments.',
    'article.staff_engineer.section1.title': 'The Hardest Part Isn\'t Technology—It\'s Communication',
    'article.staff_engineer.section1.para1': 'At Hydrotech, I was responsible for complex industrial equipment systems. From a technical perspective, these systems were indeed challenging, but with learning and practice, technical problems always had solutions. What truly troubled me were the "non-technical" challenges:',
    'article.staff_engineer.section1.li1': '<strong>How to establish a professional image in front of clients</strong>: Clients don\'t care about what algorithms you use—they only care whether the equipment works properly and solves their actual problems.',
    'article.staff_engineer.section1.li2': '<strong>How to stay calm under pressure</strong>: When sales tells you "if this fails, we\'ll lose a major deal," anxiety and pressure instantly flood in. But you must stay calm, because only calmness can help you find the root cause.',
    'article.staff_engineer.section1.li3': '<strong>How to collaborate with people from different backgrounds</strong>: Field engineers, sales teams, client technical staff, company management—each has their own perspective and needs, and you must communicate in language they understand.',
    'article.staff_engineer.section2.title': 'How to Earn Client Trust',
    'article.staff_engineer.section2.para1': 'Client trust isn\'t built overnight—it accumulates through every interaction. At Hydrotech, I identified several key principles:',
    'article.staff_engineer.section2.li1': '<strong>Quick response</strong>: When clients have issues, respond immediately. Even if you don\'t have a solution yet, let them know you\'re paying attention and taking action.',
    'article.staff_engineer.section2.li2': '<strong>Honesty and transparency</strong>: If equipment truly has issues, don\'t try to cover it up. Honestly tell clients what\'s wrong and your plan to fix it. Clients prefer trusting an honest person over someone who always says "no problem."',
    'article.staff_engineer.section2.li3': '<strong>Professional competence</strong>: At critical moments, your technical skills must be solid. Clients trust you because they believe you can solve problems. If technical competence is lacking, no amount of communication skills can build long-term trust.',
    'article.staff_engineer.section2.li4': '<strong>Think from the client\'s perspective</strong>: Don\'t just consider problems from a technical angle—understand the client\'s business needs. Why do they need this equipment? What does this equipment mean to them? Only by understanding this can you provide truly valuable support.',
    'article.staff_engineer.section3.title': 'How to React Quickly',
    'article.staff_engineer.section3.para1': 'In industrial equipment, problems often arise at the most inconvenient times. Quick reaction isn\'t just about speed—it\'s a systematic way of thinking:',
    'article.staff_engineer.section3.li1': '<strong>Establish a troubleshooting process</strong>: Don\'t panic when you receive a problem. Follow an established troubleshooting process, starting with the simplest and most common issues. Often, problems are simpler than you think.',
    'article.staff_engineer.section3.li2': '<strong>Stay calm, think systematically</strong>: Pressure can cloud judgment. Take a deep breath, break the problem into parts, and troubleshoot one by one. Remember: most "complex" problems are actually combinations of simple issues.',
    'article.staff_engineer.section3.li3': '<strong>Leverage team resources</strong>: Don\'t try to solve everything alone. Field engineers, technical support teams, R&D departments—each has their own expertise. Quick reaction also means quickly finding the right person.',
    'article.staff_engineer.section4.title': 'That 6 AM Phone Call',
    'article.staff_engineer.section4.para1': 'Let me share a real case that deeply taught me what "quick reaction" and "staying calm under pressure" truly mean.',
    'article.staff_engineer.section4.para2': 'It was an ordinary morning, 6 AM, when my phone rang. It was the sales team, their voices clearly anxious: "Our equipment has a problem at the client site. Today is when major clients and executives are visiting. If the equipment doesn\'t work properly, we might lose this important order."',
    'article.staff_engineer.section4.para3': 'I was immediately alert. This wasn\'t an ordinary technical support call—this was a critical moment. I quickly organized my thoughts and began remote troubleshooting:',
    'article.staff_engineer.section4.li1': 'First, I asked the field engineer to describe the problem in detail: the equipment wouldn\'t start, no response at all.',
    'article.staff_engineer.section4.li2': 'Then, following the troubleshooting process, I checked one by one: power connections, signal cables, control panel, system logs...',
    'article.staff_engineer.section4.li3': 'During troubleshooting, I maintained communication with the sales team, letting them know I was taking action and the problem was being addressed.',
    'article.staff_engineer.section4.para4': 'After careful troubleshooting, I found the issue: <strong>the field engineer had forgotten to plug in the power for a critical device</strong>.',
    'article.staff_engineer.section4.para5': 'Sounds simple, right? But in that high-pressure environment, when everyone was anxious, being able to stay calm, systematically troubleshoot, and ultimately find this "simple" root cause—that\'s the value of a Staff Engineer.',
    'article.staff_engineer.section4.para6': 'More importantly, I didn\'t dismiss the problem because it was "simple," nor did I panic under pressure. I followed the process, step by step, and ultimately found the issue. This professional attitude earned the client\'s trust and helped the company secure that important order.',
    'article.staff_engineer.section5.title': 'Conclusion',
    'article.staff_engineer.section5.para1': 'My experience at Hydrotech taught me that technical skills are just the foundation. What truly makes an engineer "senior" are those soft skills:',
    'article.staff_engineer.section5.li1': '<strong>Communication skills</strong>: The ability to effectively communicate with people from different backgrounds, explaining technical issues in language they understand.',
    'article.staff_engineer.section5.li2': '<strong>Stress resilience</strong>: Staying calm at critical moments, thinking systematically, not being swayed by emotions.',
    'article.staff_engineer.section5.li3': '<strong>Client orientation</strong>: Always thinking from the client\'s perspective, understanding their needs, building long-term trust.',
    'article.staff_engineer.section5.li4': '<strong>Quick reaction</strong>: Establishing systematic troubleshooting processes, efficiently solving problems even under pressure.',
    'article.staff_engineer.section5.para2': 'These skills aren\'t innate—they need constant practice. Every crisis is an opportunity for growth. That 6 AM phone call taught me how to stay professional under pressure and make the right judgment calls at critical moments.',
    'article.staff_engineer.section5.para3': 'If you\'re also on the path to becoming a Staff Engineer, remember: technology matters, but communication, trust, and quick reaction are equally important, if not more so.',
    'article.staff_engineer.disclaimer': 'All posts represent my personal experience only. Opinions expressed are solely my own and do not express the views or opinions of any organization or group.',
    
    // Article translations - sglang_llm_agent_id_scanner.html (full content - Chinese translation added)
    'article.sglang_llm_agent.intro': 'In this article, I\'ll share my experience building an LLM Agent ID Scanner powered by <strong>SGLang inference server</strong> in just 3 days. We\'ll explore why SGLang was the game-changer, dive into its technical architecture, and discuss real-world production considerations.',
    'article.sglang_llm_agent.section1.title': '🎯 Why SGLang? The Problem with Traditional LLM Inference',
    'article.sglang_llm_agent.section1.para1': 'When building a document processing system, we faced several critical challenges:',
    'article.sglang_llm_agent.section1.li1': '<strong>Structured Output Requirements</strong>: We needed reliable JSON schema extraction from passport/driver\'s license images',
    'article.sglang_llm_agent.section1.li2': '<strong>Low Latency</strong>: Real-time processing for user-facing applications',
    'article.sglang_llm_agent.section1.li3': '<strong>High Throughput</strong>: Batch processing capabilities for production workloads',
    'article.sglang_llm_agent.section1.li4': '<strong>Cost Efficiency</strong>: Optimize GPU utilization and reduce inference costs',
    'article.sglang_llm_agent.section1.para2': 'Traditional LLM inference frameworks often struggle with:',
    'article.sglang_llm_agent.section1.li5': 'High latency overhead for structured outputs (JSON parsing, validation)',
    'article.sglang_llm_agent.section1.li6': 'Inefficient batching that wastes GPU resources',
    'article.sglang_llm_agent.section1.li7': 'Limited support for schema-first design patterns',
    'article.sglang_llm_agent.section1.li8': 'Complex deployment pipelines',
    'article.sglang_llm_agent.section1.para3': '<strong>SGLang</strong> addresses these pain points through its high-performance runtime and native structured output support.',
    'article.sglang_llm_agent.section2.title': '⚡ SGLang\'s Core Technologies',
    'article.sglang_llm_agent.section2.subsection1.title': '1. RadixAttention: The Memory Efficiency Game-Changer',
    'article.sglang_llm_agent.section2.subsection1.para1': 'SGLang\'s <strong>RadixAttention</strong> mechanism uses a radix tree to cache common prompt prefixes, dramatically reducing memory usage and improving throughput. For our ID scanner use case with similar prompt structures, this meant:',
    'article.sglang_llm_agent.section2.subsection1.li1': 'Reduced memory footprint per request',
    'article.sglang_llm_agent.section2.subsection1.li2': 'Faster inference for batch processing',
    'article.sglang_llm_agent.section2.subsection1.li3': 'Better GPU utilization',
    'article.sglang_llm_agent.section2.subsection2.title': '2. Native Structured Output Support',
    'article.sglang_llm_agent.section2.subsection2.para1': 'Unlike frameworks that require post-processing JSON parsing, SGLang provides <strong>native JSON schema support</strong>. This was crucial for our schema-first design:',
    'article.sglang_llm_agent.section2.subsection2.para2': 'SGLang ensures the model output strictly adheres to this schema, eliminating parsing errors and validation overhead.',
    'article.sglang_llm_agent.section2.subsection3.title': '3. Continuous Batching & Zero-Overhead Scheduling',
    'article.sglang_llm_agent.section2.subsection3.para1': 'SGLang\'s continuous batching allows dynamic request queuing without waiting for entire batches to complete. Combined with zero-overhead CPU scheduling, this enables:',
    'article.sglang_llm_agent.section2.subsection3.li1': 'Higher GPU utilization (often 2-3x improvement)',
    'article.sglang_llm_agent.section2.subsection3.li2': 'Lower latency for individual requests',
    'article.sglang_llm_agent.section2.subsection3.li3': 'Better handling of variable-length inputs',
    'article.sglang_llm_agent.section3.title': '🏗️ Architecture: SGLang + Fireworks AI + Llama 3.2 Vision',
    'article.sglang_llm_agent.section3.para1': 'Our LLM Agent ID Scanner architecture:',
    'article.sglang_llm_agent.section3.subsection1.title': 'Key Design Decisions',
    'article.sglang_llm_agent.section3.subsection1.li1': '<strong>Schema-First Design</strong>: Define JSON schema upfront, ensuring auditability and type safety',
    'article.sglang_llm_agent.section3.subsection1.li2': '<strong>Confidence-Based Routing</strong>: Low-confidence outputs route to human review',
    'article.sglang_llm_agent.section3.subsection1.li3': '<strong>Multi-Mode Deployment</strong>: Support serverless, on-demand, and batch processing',
    'article.sglang_llm_agent.section3.subsection1.li4': '<strong>Error Handling</strong>: Comprehensive corner case handling (blur, glare, rotation, low resolution)',
    'article.sglang_llm_agent.section4.title': '💻 Implementation Highlights',
    'article.sglang_llm_agent.section4.subsection1.title': 'Connecting to SGLang Server',
    'article.sglang_llm_agent.section4.subsection2.title': 'Production Considerations',
    'article.sglang_llm_agent.section4.subsection2.li1': '<strong>Error Handling</strong>: Graceful degradation for low-quality images',
    'article.sglang_llm_agent.section4.subsection2.li2': '<strong>Rate Limiting</strong>: Prevent API abuse',
    'article.sglang_llm_agent.section4.subsection2.li3': '<strong>Monitoring</strong>: Track latency, throughput, and error rates',
    'article.sglang_llm_agent.section4.subsection2.li4': '<strong>Cost Optimization</strong>: Batch processing for non-real-time workloads',
    'article.sglang_llm_agent.section5.title': '📊 Performance Results',
    'article.sglang_llm_agent.section5.para1': 'Our implementation achieved:',
    'article.sglang_llm_agent.section5.li1': '<strong>Latency</strong>: ~200-300ms per document (including image preprocessing)',
    'article.sglang_llm_agent.section5.li2': '<strong>Throughput</strong>: 50+ documents/second with batch processing',
    'article.sglang_llm_agent.section5.li3': '<strong>Accuracy</strong>: 95%+ structured output compliance (no parsing errors)',
    'article.sglang_llm_agent.section5.li4': '<strong>GPU Utilization</strong>: 70-80% (vs. 30-40% with standard inference)',
    'article.sglang_llm_agent.section5.para2': '<strong>Key Insight</strong>: SGLang\'s structured output support eliminated all JSON parsing errors, which was a major pain point with traditional approaches.',
    'article.sglang_llm_agent.section6.title': '🎓 Lessons Learned & Best Practices',
    'article.sglang_llm_agent.section6.subsection1.title': 'When to Use SGLang',
    'article.sglang_llm_agent.section6.subsection1.li1': '✅ Production LLM applications requiring structured outputs',
    'article.sglang_llm_agent.section6.subsection1.li2': '✅ High-throughput batch processing workloads',
    'article.sglang_llm_agent.section6.subsection1.li3': '✅ Applications with similar prompt patterns (benefits from RadixAttention)',
    'article.sglang_llm_agent.section6.subsection1.li4': '✅ Cost-sensitive deployments (better GPU utilization)',
    'article.sglang_llm_agent.section6.subsection2.title': 'Deployment Recommendations',
    'article.sglang_llm_agent.section6.subsection2.li1': 'Start with a single GPU instance, scale horizontally as needed',
    'article.sglang_llm_agent.section6.subsection2.li2': 'Use continuous batching for mixed real-time and batch workloads',
    'article.sglang_llm_agent.section6.subsection2.li3': 'Monitor memory usage carefully—RadixAttention helps but still requires tuning',
    'article.sglang_llm_agent.section6.subsection2.li4': 'Implement proper error handling and fallback mechanisms',
    'article.sglang_llm_agent.section6.subsection3.title': 'Common Pitfalls',
    'article.sglang_llm_agent.section6.subsection3.li1': '❌ Over-optimizing schema before understanding actual use cases',
    'article.sglang_llm_agent.section6.subsection3.li2': '❌ Ignoring corner cases in document quality',
    'article.sglang_llm_agent.section6.subsection3.li3': '❌ Not implementing proper confidence thresholds',
    'article.sglang_llm_agent.section6.subsection3.li4': '❌ Skipping human-in-the-loop for critical decisions',
    
    // Article translations - llm_hospital_rad_linter.html (full content - English translation added)
    'article.llm_hospital_rad_linter.intro': 'Recently deployed a SGLang-based radiology report quality control system (Rad-Linter) in a hospital setting. This is a <strong>real production scenario with on-premise deployment and strict compliance constraints</strong>. Unlike common "report generation" tasks, we are doing <strong>cross-modal fact-checking</strong>. This article shares technical choices, production challenges, and SGLang practices in medical scenarios.',
    'article.llm_hospital_rad_linter.section1.title': '🎯 Rad-Linter\'s Position: Not Report Generation, but Quality Control Audit',
    'article.llm_hospital_rad_linter.section1.para1': 'Before discussing technical details, we need to clarify <strong>the fundamental difference between Rad-Linter and report generation tasks</strong>:',
    'article.llm_hospital_rad_linter.section1.highlight.title': 'Rad-Linter\'s Core Position:',
    'article.llm_hospital_rad_linter.section1.highlight.para1': 'Given a <strong>pre-written radiology report</strong> + a set of <strong>visual evidence (visual_facts, disease probability/hints)</strong> extracted from images, the model outputs <strong>QA conclusions</strong> (error detection/error type/evidence explanation).',
    'article.llm_hospital_rad_linter.section1.highlight.para2': '<strong>Key Point:</strong> We don\'t generate reports; we audit existing reports. Output is error judgment + classification + evidence, not generating Findings/Impression text.',
    'article.llm_hospital_rad_linter.section1.subsection1.title': 'Position in Clinical Workflow',
    'article.llm_hospital_rad_linter.section1.subsection1.para1': 'In clinical workflows, <strong>Radiology Report</strong> and <strong>Medical Note</strong> are two different document types:',
    'article.llm_hospital_rad_linter.section1.subsection1.li1': '<strong>Radiology Report</strong>: Written by radiologists, specifically describing imaging findings and diagnostic opinions, providing professional image interpretation',
    'article.llm_hospital_rad_linter.section1.subsection1.li2': '<strong>Medical Note</strong>: Broader clinical documentation, including medical history, examination results, diagnosis, treatment plans, etc., providing complete patient records',
    'article.llm_hospital_rad_linter.section1.subsection1.li3': '<strong>Generation Relationship</strong>: Radiology Report is typically part of Medical Note, providing radiological professional insights',
    'article.llm_hospital_rad_linter.section1.subsection1.para2': 'Current LLM research in clinical workflows mainly focuses on:',
    'article.llm_hospital_rad_linter.section1.subsection1.li4': '<strong>Report Generation</strong>: From images → generate complete reports (R2Gen, TRRG, RadAlign, etc.)',
    'article.llm_hospital_rad_linter.section1.subsection1.li5': '<strong>Clinical Documentation Generation</strong>: Automatically generate and summarize medical records',
    'article.llm_hospital_rad_linter.section1.subsection1.li6': '<strong>Clinical Decision Support</strong>: Assist triage, referral, and diagnostic prediction',
    'article.llm_hospital_rad_linter.section1.subsection1.li7': '<strong>Medical Visual Question Answering</strong>: Visual and language-based Q&A systems',
    'article.llm_hospital_rad_linter.section1.subsection1.para3': '<strong>Rad-Linter fills the gap</strong>: After report generation, an independent <strong>quality control step</strong> is needed. Just as code needs linter checks, medical reports also need a "second reader" to discover omissions, contradictions, and inconsistencies. This need is <strong>independent</strong>—even without automatic generation, manually written reports by doctors also need QA.',
    'article.llm_hospital_rad_linter.section2.title': '📹 Project Demo Video',
    'article.llm_hospital_rad_linter.section2.para1': 'The following is a demo video of the Rad-Linter system, showing the cross-modal fact-checking workflow:',
    'article.llm_hospital_rad_linter.section2.para2': '💡 <strong>Tip</strong>: To embed a video, uncomment the code block above and replace VIDEO_ID with the actual video ID.<br>Bilibili video ID format: BV1xx411c7mu (obtained from video URL)<br>YouTube video ID format: dQw4w9WgXcQ (obtained from video URL)',
    'article.llm_hospital_rad_linter.section3.title': '🏗️ Technical Architecture: Why Choose SGLang as the Middle Layer?',
    'article.llm_hospital_rad_linter.section3.subsection1.title': '1. System Architecture Overview',
    'article.llm_hospital_rad_linter.section3.subsection2.title': '2. Why Choose SGLang?',
    'article.llm_hospital_rad_linter.section3.subsection2.para1': 'In medical scenarios, we face several key constraints:',
    'article.llm_hospital_rad_linter.section3.subsection2.li1': '<strong>Low Concurrency</strong>: Hospital intranet environment, relatively controllable request volume',
    'article.llm_hospital_rad_linter.section3.subsection2.li2': '<strong>Extremely High Observability Requirements</strong>: Medicine requires precision and explainability; every step must be auditable',
    'article.llm_hospital_rad_linter.section3.subsection2.li3': '<strong>Local Computing Performance Optimization</strong>: On-premise deployment, cannot rely on cloud APIs',
    'article.llm_hospital_rad_linter.section3.subsection2.li4': '<strong>Structured Output</strong>: Requires strict JSON Schema output (error type, evidence location)',
    'article.llm_hospital_rad_linter.section3.subsection2.para2': '<strong>SGLang\'s Advantages:</strong>',
    'article.llm_hospital_rad_linter.section3.subsection2.li5': '<strong>On-Premise Deployment Friendly</strong>: Supports on-prem deployment, meeting medical data privacy requirements',
    'article.llm_hospital_rad_linter.section3.subsection2.li6': '<strong>Native Structured Output Support</strong>: JSON Schema constraints ensure output format strictly meets requirements',
    'article.llm_hospital_rad_linter.section3.subsection2.li7': '<strong>Performance Optimization</strong>: Features like RadixAttention and continuous batching fully utilize GPU even in low-concurrency scenarios',
    'article.llm_hospital_rad_linter.section3.subsection2.li8': '<strong>Observability</strong>: Supports detailed metrics and tracing for auditing and debugging',
    'article.llm_hospital_rad_linter.section3.subsection2.li9': '<strong>Low Latency</strong>: Significant optimization effects for real-time feedback needs in medical scenarios',
    'article.llm_hospital_rad_linter.section3.subsection3.title': '3. Comparison with Report Generation Tasks',
    'article.llm_hospital_rad_linter.section4.title': '💻 Production Challenges and SGLang Practices',
    'article.llm_hospital_rad_linter.section4.subsection1.title': 'Challenge 1: Observability',
    'article.llm_hospital_rad_linter.section4.subsection1.para1': '<strong>Special Characteristics of Medical Scenarios</strong>: Medicine requires precision and explainability. Every decision step must be auditable and traceable.',
    'article.llm_hospital_rad_linter.section4.subsection1.para2': '<strong>Our Solution:</strong>',
    'article.llm_hospital_rad_linter.section4.subsection1.li1': '<strong>Structured Output Tracking</strong>: SGLang\'s JSON Schema output allows precise tracking of each field\'s source',
    'article.llm_hospital_rad_linter.section4.subsection1.li2': '<strong>Evidence Chain Recording</strong>: Record visual_facts input, LLM reasoning process, final QA judgment',
    'article.llm_hospital_rad_linter.section4.subsection1.li3': '<strong>Metrics Collection</strong>: TTFT, tokens/s, queue time, batch size, KV cache usage',
    'article.llm_hospital_rad_linter.section4.subsection1.li4': '<strong>Error Classification Statistics</strong>: Statistics by error type (omission/contradiction/laterality, etc.) for continuous optimization',
    'article.llm_hospital_rad_linter.section4.subsection1.highlight.title': 'Observability Best Practices:',
    'article.llm_hospital_rad_linter.section4.subsection2.title': 'Challenge 2: Local Computing Performance Optimization',
    'article.llm_hospital_rad_linter.section4.subsection2.para1': 'On-premise deployment means cannot rely on cloud APIs; must run efficiently on local GPU.',
    'article.llm_hospital_rad_linter.section4.subsection2.para2': '<strong>SGLang\'s Performance Advantages:</strong>',
    'article.llm_hospital_rad_linter.section4.subsection2.li1': '<strong>RadixAttention</strong>: For similar prompt structures (our QA tasks have fixed templates), caching effects are significant',
    'article.llm_hospital_rad_linter.section4.subsection2.li2': '<strong>Continuous Batching</strong>: Even with low concurrency, fully utilizes GPU resources',
    'article.llm_hospital_rad_linter.section4.subsection2.li3': '<strong>KV Cache Optimization</strong>: Reduces redundant computation, lowers latency',
    'article.llm_hospital_rad_linter.section4.subsection2.li4': '<strong>Structured Output Optimization</strong>: Native support reduces overhead compared to post-processing JSON parsing',
    'article.llm_hospital_rad_linter.section4.subsection3.title': 'Challenge 3: Error Type Classification and Evidence Localization',
    'article.llm_hospital_rad_linter.section4.subsection3.para1': 'Unlike pure text proofreading, Rad-Linter needs to handle <strong>cross-modal inconsistencies</strong>:',
    'article.llm_hospital_rad_linter.section4.subsection3.li1': '<strong>Omission</strong>: Images show abnormalities, but report doesn\'t mention them',
    'article.llm_hospital_rad_linter.section4.subsection3.li2': '<strong>Contradiction</strong>: Report description inconsistent with visual evidence',
    'article.llm_hospital_rad_linter.section4.subsection3.li3': '<strong>Laterality</strong>: Left/right side description error',
    'article.llm_hospital_rad_linter.section4.subsection3.li4': '<strong>Severity mismatch</strong>: Severity in report doesn\'t match image evidence',
    'article.llm_hospital_rad_linter.section4.subsection3.para2': 'SGLang\'s structured output allows <strong>precise control</strong> of error type classification and evidence localization, which is crucial for <strong>explainability</strong> in medical scenarios.',
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

