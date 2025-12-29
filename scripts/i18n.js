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

