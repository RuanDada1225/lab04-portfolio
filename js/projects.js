/* ==========================================================================
   项目数据
   --------------------------------------------------------------------------
   新增项目：向 PROJECTS 数组追加一条记录即可，页面会自动渲染并生成筛选项。
   字段说明：
     title    项目名称
     subtitle 英文副题（展示用，可留空）
     desc     项目简介
     tech     技术栈数组
     date     完成时间
     category 类别（用于筛选，同名归为一类）
     image    配图地址（本地 images/ 目录或 URL）
     layout   版式：'a' 图左文右大图 / 'b' 文左图右 / 'c' 全宽横幅
     link     可选，项目链接
   ========================================================================== */

const PROJECTS = [
  {
    title: "轻记账",
    subtitle: "",
    desc:
      "“轻记账”是一款面向日常生活场景的极简记账微信小程序，重点解决快速记录和查看个人收支的问题。" +
      "项目支持语音快捷记账、月度收支统计和预算提醒，并使用微信云开发完成数据存储与后端能力。",
    tech: ["TypeScript", "微信小程序", "微信云开发", "ECharts"],
    date: "2025 年 4 月",
    category: "移动应用",
    image: "images/qingjizhang.svg",
    layout: "a",
  },
  {
    title: "拾光集市",
    subtitle: "",
    desc:
      "“拾光集市”是一个面向校园场景的二手交易平台，提供商品发布、关键词检索、站内私信和信用评分等功能。" +
      "从需求梳理、界面设计到主要接口开发均独立完成，上线测试后累计注册用户超过 300 人。",
    tech: ["Java", "Spring Boot", "MySQL", "TypeScript", "Vue"],
    date: "2025 年 9 月",
    category: "Web 应用",
    image: "images/shiguangjishi.svg",
    layout: "b",
  },
  {
    title: "城市脉搏",
    subtitle: "",
    desc:
      "“城市脉搏”是一个城市实时交通与天气数据可视化大屏，用于集中展示交通、天气和城市运行信息。" +
      "项目通过多数据源轮询聚合数据，并结合 SVG 图表、Canvas 粒子地图和响应式布局实现大屏可视化展示。",
    tech: ["TypeScript", "HTML/CSS", "Canvas", "SVG", "ECharts"],
    date: "2026 年 3 月",
    category: "数据可视化",
    image: "images/chengshimai.svg",
    layout: "c",
  },
  {
    title: "课语通",
    subtitle: "",
    desc:
      "“课语通”是一个基于大语言模型的课程问答助手。用户上传课程资料后，系统能够建立知识索引，" +
      "根据课程内容回答问题，并提供引用出处和知识点小测，帮助学生快速复习和整理课程重点。",
    tech: ["Python", "FastAPI", "RAG", "向量检索", "大语言模型 API", "Streamlit"],
    date: "2026 年 7 月",
    category: "AI 应用",
    image: "images/keyutong.svg",
    layout: "a",
  },
];
