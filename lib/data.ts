export interface Product {
  id: string
  name: string
  developer: string
  type: "国产" | "海外"
  scores: {
    localFile: number
    remoteControl: number
    officeSoftware: number
    aiReasoning: number
    deployment: number
    localization: number
    easeOfUse: number
    security: number
  }
  features: string[]
  price: string
  deploymentTypes: string[]
  lastUpdate: string
  highlight: string
}

export const products: Product[] = [
  {
    id: "lobster-ai",
    name: "LobsterAI（有道龙虾）",
    developer: "网易有道",
    type: "国产",
    scores: { localFile: 5, remoteControl: 5, officeSoftware: 4, aiReasoning: 4, deployment: 5, localization: 5, easeOfUse: 4, security: 5 },
    features: ["微信文件专优", "本地优先", "零代码", "DeepSeek接入"],
    price: "免费/企业版¥999/月起",
    deploymentTypes: ["本地", "云端", "混合"],
    lastUpdate: "2026-02-28",
    highlight: "唯一支持微信文件本地无损整理，国产化适配最全"
  },
  {
    id: "feishu-agent",
    name: "飞书Agent",
    developer: "字节跳动",
    type: "国产",
    scores: { localFile: 3, remoteControl: 4, officeSoftware: 5, aiReasoning: 4, deployment: 2, localization: 4, easeOfUse: 5, security: 4 },
    features: ["飞书生态", "协作优先", "DeepSeek-R1"],
    price: "免费额度/企业版¥800/月起",
    deploymentTypes: ["云端"],
    lastUpdate: "2026-01-15",
    highlight: "飞书原生深度集成，多维表格AI分析最强"
  },
  {
    id: "dingtalk-ai",
    name: "钉钉搭搭AI Agent",
    developer: "阿里巴巴",
    type: "国产",
    scores: { localFile: 3, remoteControl: 5, officeSoftware: 4, aiReasoning: 4, deployment: 3, localization: 5, easeOfUse: 4, security: 5 },
    features: ["钉钉生态", "政务版", "国密算法", "信创适配"],
    price: "标准版免费/企业版¥1200/月起",
    deploymentTypes: ["云端", "混合"],
    lastUpdate: "2026-02-10",
    highlight: "政务版支持国密算法，审批流自动化最强"
  },
  {
    id: "tongyi-agent",
    name: "通义千问Agent",
    developer: "阿里云",
    type: "国产",
    scores: { localFile: 2, remoteControl: 3, officeSoftware: 3, aiReasoning: 5, deployment: 4, localization: 4, easeOfUse: 3, security: 4 },
    features: ["大模型能力强", "API丰富", "开发者友好"],
    price: "1000次免费/按量计费/企业版¥5000/月起",
    deploymentTypes: ["云端", "本地"],
    lastUpdate: "2026-02-20",
    highlight: "通义千问Max推理能力顶尖，适合复杂任务"
  },
  {
    id: "xinghuo-rpa",
    name: "讯飞星火RPA",
    developer: "科大讯飞",
    type: "国产",
    scores: { localFile: 4, remoteControl: 3, officeSoftware: 4, aiReasoning: 4, deployment: 3, localization: 5, easeOfUse: 4, security: 4 },
    features: ["语音交互", "23种方言", "信创适配"],
    price: "个人版免费/企业版¥1500/月起",
    deploymentTypes: ["本地", "云端"],
    lastUpdate: "2026-01-28",
    highlight: "语音指令操作文件，方言识别准确率98%"
  },
  {
    id: "wenxin-qianfan",
    name: "百度文心千帆Agent",
    developer: "百度",
    type: "国产",
    scores: { localFile: 2, remoteControl: 3, officeSoftware: 3, aiReasoning: 4, deployment: 4, localization: 4, easeOfUse: 3, security: 4 },
    features: ["百度生态", "知识增强", "可视化编排"],
    price: "限时免费/按量计费/企业版¥3000/月起",
    deploymentTypes: ["云端", "本地"],
    lastUpdate: "2026-02-05",
    highlight: "百度知识图谱增强，低代码编排器易用"
  },
  {
    id: "zhinao-agent",
    name: "360智脑Agent",
    developer: "360集团",
    type: "国产",
    scores: { localFile: 3, remoteControl: 3, officeSoftware: 3, aiReasoning: 3, deployment: 3, localization: 4, easeOfUse: 4, security: 5 },
    features: ["AI安全卫士", "信创适配", "终端管控"],
    price: "基础免费/企业版¥1000/月起",
    deploymentTypes: ["本地", "云端"],
    lastUpdate: "2026-01-20",
    highlight: "唯一内置安全扫描，实时拦截恶意文件操作"
  },
  {
    id: "autogpt",
    name: "AutoGPT",
    developer: "Significant Gravitas",
    type: "海外",
    scores: { localFile: 4, remoteControl: 2, officeSoftware: 2, aiReasoning: 4, deployment: 5, localization: 1, easeOfUse: 1, security: 3 },
    features: ["完全自主", "开源免费", "多Agent协作"],
    price: "完全免费",
    deploymentTypes: ["本地", "Docker", "源码"],
    lastUpdate: "2026-02-15",
    highlight: "完全自主决策无需干预，技术极客首选"
  },
  {
    id: "langchain-agent",
    name: "LangChain Agent",
    developer: "LangChain Inc.",
    type: "海外",
    scores: { localFile: 3, remoteControl: 3, officeSoftware: 2, aiReasoning: 5, deployment: 5, localization: 2, easeOfUse: 1, security: 3 },
    features: ["开发框架", "高度灵活", "全模型支持"],
    price: "开源免费/LangSmith $500/月起",
    deploymentTypes: ["全支持"],
    lastUpdate: "2026-02-25",
    highlight: "企业级开发框架，LangGraph支持复杂工作流"
  },
  {
    id: "chatgpt-code",
    name: "ChatGPT Code Interpreter",
    developer: "OpenAI",
    type: "海外",
    scores: { localFile: 2, remoteControl: 1, officeSoftware: 2, aiReasoning: 5, deployment: 2, localization: 2, easeOfUse: 5, security: 3 },
    features: ["数据分析", "代码执行", "易用性强"],
    price: "Plus $20/月/Team $30/人/月",
    deploymentTypes: ["云端"],
    lastUpdate: "2026-03-01",
    highlight: "数据分析与可视化最强，零门槛使用"
  },
  {
    id: "gemini-advanced",
    name: "Google Gemini Advanced",
    developer: "Google",
    type: "海外",
    scores: { localFile: 2, remoteControl: 2, officeSoftware: 3, aiReasoning: 5, deployment: 2, localization: 3, easeOfUse: 4, security: 4 },
    features: ["200万token上下文", "Deep Research", "长文本"],
    price: "$20/月",
    deploymentTypes: ["云端"],
    lastUpdate: "2026-02-18",
    highlight: "超长上下文窗口，适合大规模文献分析"
  },
  {
    id: "lobster-enterprise",
    name: "LobsterAI 企业版",
    developer: "网易有道",
    type: "国产",
    scores: { localFile: 5, remoteControl: 5, officeSoftware: 5, aiReasoning: 5, deployment: 5, localization: 5, easeOfUse: 4, security: 5 },
    features: ["SSO集成", "审计日志", "信创全适配", "私有化"],
    price: "¥999/月起（50人起）",
    deploymentTypes: ["本地", "私有云", "信创"],
    lastUpdate: "2026-02-28",
    highlight: "企业级功能最全，满足合规审计与私有化需求"
  },
  {
    id: "lobster-opensource",
    name: "LobsterAI 开源版",
    developer: "网易有道",
    type: "国产",
    scores: { localFile: 4, remoteControl: 3, officeSoftware: 3, aiReasoning: 4, deployment: 5, localization: 4, easeOfUse: 2, security: 4 },
    features: ["开源免费", "可定制", "插件系统"],
    price: "完全免费",
    deploymentTypes: ["本地", "Docker", "源码"],
    lastUpdate: "2026-01-10",
    highlight: "开源可定制，社区活跃，开发者友好"
  },
  {
    id: "d-id-agent",
    name: "D-ID Agents",
    developer: "D-ID",
    type: "海外",
    scores: { localFile: 1, remoteControl: 2, officeSoftware: 1, aiReasoning: 3, deployment: 3, localization: 2, easeOfUse: 4, security: 3 },
    features: ["数字人", "视频生成", "实时对话"],
    price: "$29/月起/按量计费",
    deploymentTypes: ["云端", "API"],
    lastUpdate: "2026-02-12",
    highlight: "数字人视频生成，适合营销与客服场景"
  },
  {
    id: "relevance-ai",
    name: "Relevance AI",
    developer: "Relevance AI",
    type: "海外",
    scores: { localFile: 2, remoteControl: 3, officeSoftware: 3, aiReasoning: 4, deployment: 3, localization: 2, easeOfUse: 5, security: 3 },
    features: ["低代码", "多Agent协作", "易用"],
    price: "$19/月起",
    deploymentTypes: ["云端"],
    lastUpdate: "2026-02-22",
    highlight: "低代码构建Multi-Agent系统，非技术用户友好"
  }
]

export const scoreLabels: Record<keyof Product['scores'], string> = {
  localFile: "本地文件",
  remoteControl: "远程控制",
  officeSoftware: "办公软件",
  aiReasoning: "AI推理",
  deployment: "部署方式",
  localization: "本土适配",
  easeOfUse: "易用性",
  security: "安全性"
}

export interface TimelineItem {
  id: string
  date: string
  product: string
  productColor: string
  title: string
  summary: string
  content: string
  type: "功能更新" | "市场动态" | "生态合作" | "LobsterAI专属"
  importance: "high" | "normal"
  likes: number
}

export const timelineData: TimelineItem[] = [
  {
    id: "1",
    date: "2026-03-05",
    product: "LobsterAI",
    productColor: "#ef4444",
    title: "LobsterAI 3.0正式发布，全面支持DeepSeek-V4",
    summary: "新版本带来了更强大的AI推理能力和更流畅的微信文件处理体验。",
    content: "LobsterAI 3.0版本正式发布，主要更新包括：1. 全面集成DeepSeek-V4模型，推理能力提升40%；2. 微信文件处理速度提升3倍；3. 新增智能标签系统，自动分类管理文件；4. 企业版新增审计日志导出功能。",
    type: "LobsterAI专属",
    importance: "high",
    likes: 328
  },
  {
    id: "2",
    date: "2026-03-01",
    product: "飞书Agent",
    productColor: "#3b82f6",
    title: "飞书Agent支持多维表格AI智能填充",
    summary: "通过AI自动识别数据模式，实现智能表格填充和数据清洗。",
    content: "飞书Agent新增AI智能填充功能，可自动识别多维表格中的数据模式，支持批量数据补全、异常值检测和自动纠错。",
    type: "功能更新",
    importance: "normal",
    likes: 156
  },
  {
    id: "3",
    date: "2026-02-25",
    product: "钉钉AI",
    productColor: "#f59e0b",
    title: "钉钉搭搭AI通过等保三级认证",
    summary: "成为首个通过等保三级认证的企业级AI Agent平台。",
    content: "阿里巴巴宣布钉钉搭搭AI Agent平台正式通过国家信息安全等级保护三级认证，可服务于政府、金融等高安全要求行业。",
    type: "市场动态",
    importance: "high",
    likes: 245
  },
  {
    id: "4",
    date: "2026-02-20",
    product: "LobsterAI",
    productColor: "#ef4444",
    title: "LobsterAI与WPS达成深度战略合作",
    summary: "实现WPS文档的无缝AI处理，支持智能排版和内容生成。",
    content: "网易有道与金山办公宣布战略合作，LobsterAI将深度集成WPS办公套件，用户可直接在WPS中调用龙虾AI进行文档处理、智能排版和内容创作。",
    type: "生态合作",
    importance: "high",
    likes: 412
  },
  {
    id: "5",
    date: "2026-02-15",
    product: "通义千问",
    productColor: "#7c3aed",
    title: "通义千问Agent新增代码生成沙箱",
    summary: "支持在安全沙箱环境中执行AI生成的代码。",
    content: "阿里云通义千问Agent新增代码执行沙箱功能，用户可以安全地运行AI生成的Python、JavaScript代码，并实时查看执行结果。",
    type: "功能更新",
    importance: "normal",
    likes: 189
  },
  {
    id: "6",
    date: "2026-02-10",
    product: "LobsterAI",
    productColor: "#ef4444",
    title: "LobsterAI开源版GitHub Star突破50000",
    summary: "开源社区持续活跃，月活跃贡献者超过200人。",
    content: "LobsterAI开源版在GitHub上的Star数突破50000，成为国内最受欢迎的AI Agent开源项目之一。社区贡献了超过30个官方插件。",
    type: "LobsterAI专属",
    importance: "normal",
    likes: 567
  }
]

export interface GuideCategory {
  id: string
  name: string
  icon: string
  guides: Guide[]
}

export interface Guide {
  id: string
  title: string
  type: "video" | "doc" | "template"
  duration?: string
  views?: number
  content?: string
}

export const guidesData: GuideCategory[] = [
  {
    id: "lobster-ai",
    name: "LobsterAI",
    icon: "lobster",
    guides: [
      { id: "1", title: "5分钟快速入门", type: "video", duration: "5:23", views: 12453 },
      { id: "2", title: "微信文件批量整理教程", type: "video", duration: "8:45", views: 8932 },
      { id: "3", title: "钉钉消息自动化处理", type: "video", duration: "6:12", views: 5621 },
      { id: "4", title: "DeepSeek模型切换指南", type: "doc" },
      { id: "5", title: "企业版SSO配置手册", type: "doc" },
    ]
  },
  {
    id: "feishu",
    name: "飞书Agent",
    icon: "feishu",
    guides: [
      { id: "6", title: "飞书Agent入门指南", type: "video", duration: "4:30", views: 7845 },
      { id: "7", title: "多维表格AI分析", type: "video", duration: "10:15", views: 6234 },
    ]
  },
  {
    id: "dingtalk",
    name: "钉钉Agent",
    icon: "dingtalk",
    guides: [
      { id: "8", title: "钉钉搭搭AI快速上手", type: "video", duration: "6:00", views: 5432 },
      { id: "9", title: "审批流自动化配置", type: "doc" },
    ]
  }
]

export const commandTemplates = [
  {
    id: "1",
    title: "微信文件批量整理",
    category: "文件整理",
    command: `整理我的微信文件夹
按照"年份/月份/文件类型"分类
图片放入"照片"文件夹
文档放入"文档"文件夹
保留原文件名`,
    description: "自动按时间和类型整理微信接收的文件"
  },
  {
    id: "2",
    title: "自动备份桌面文件",
    category: "数据处理",
    command: `监控桌面文件夹
每天凌晨2点自动备份到
D:/Backup/桌面备份/日期/
保留最近30天的备份`,
    description: "定时自动备份桌面重要文件"
  },
  {
    id: "3",
    title: "批量重命名照片",
    category: "文件整理",
    command: `选择照片文件夹
读取EXIF拍摄日期
重命名为"YYYY-MM-DD_HH-mm-ss"格式
按年月创建子文件夹`,
    description: "根据拍摄时间重命名并归类照片"
  },
  {
    id: "4",
    title: "文档智能摘要",
    category: "办公自动化",
    command: `分析选中的PDF文档
提取关键信息生成摘要
摘要不超过500字
输出到同目录下的摘要.md文件`,
    description: "AI自动提取文档核心内容生成摘要"
  }
]
