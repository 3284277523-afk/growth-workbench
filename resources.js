// ============================================================
// 五模块系统化学习资源数据（已更新真实可访问链接 2026-07-31）
// ============================================================

const MODULE_RESOURCES = {

  // ======================== 练字 ========================
  calligraphy: {
    name: "练字",
    icon: "✍",
    stages: [
      {
        id: "stroke",
        label: "基础笔画",
        unlockDays: 0,
        resources: [
          { title: "零基础硬笔书法入门教程2026新版", url: "https://www.bilibili.com/video/BV1Gig16kE3x/", source: "B站", duration: "系列", tip: "2026年最新入门教程，从笔画开始系统讲解" },
          { title: "硬笔书法教学合集（UP主空间）", url: "https://space.bilibili.com/1653531024/channel/series", source: "B站", duration: "系列", tip: "专业硬笔书法教学UP主，大量免费课程" },
          { title: "硬笔书法28个基本笔画写法字帖教程", url: "https://www.zhihu.com/tardis/zm/art/569336204", source: "知乎", duration: "图文", tip: "图文版28种笔画详解，可打印练习" },
          { title: "硬笔书法基础课程", url: "https://www.51zxw.net/List.aspx?cid=1147", source: "自学网", duration: "系列", tip: "从基本笔画到偏旁部首的系统课程" },
        ]
      },
      {
        id: "structure",
        label: "间架结构",
        unlockDays: 7,
        resources: [
          { title: "零基础硬笔书法入门教程2026新版", url: "https://www.bilibili.com/video/BV1Gig16kE3x/", source: "B站", duration: "系列", tip: "包含间架结构章节，进阶必学" },
          { title: "硬笔书法教学合集", url: "https://space.bilibili.com/1653531024/channel/series", source: "B站", duration: "系列", tip: "间架结构系列视频，逐字拆解" },
          { title: "硬笔楷书/行楷/行书零基础入门", url: "https://live.bilibili.com/21342618", source: "B站直播", duration: "直播", tip: "翰玲书院直播教学，可互动提问" },
        ]
      },
      {
        id: "layout",
        label: "章法布局",
        unlockDays: 21,
        resources: [
          { title: "硬笔书法教学合集（含章法）", url: "https://space.bilibili.com/1653531024/channel/series", source: "B站", duration: "系列", tip: "包含章法布局与作品创作内容" },
          { title: "硬笔书法基础课程（全章节）", url: "https://www.51zxw.net/List.aspx?cid=1147", source: "自学网", duration: "系列", tip: "系统课程，章法篇在后半部分" },
          { title: "硬笔书法入门教学（含作品创作）", url: "https://v.qq.com/x/page/r315689i0xv.html", source: "腾讯视频", duration: "30分钟", tip: "从入门到作品创作的完整流程" },
        ]
      }
    ]
  },

  // ======================== 画画 ========================
  drawing: {
    name: "画画",
    icon: "🎨",
    stages: [
      {
        id: "line-control",
        label: "控笔",
        unlockDays: 0,
        resources: [
          { title: "零基础小白必学的控笔训练，拒绝手抖", url: "https://www.bilibili.com/video/BV1DGTv6iEX7/", source: "B站", duration: "系列", tip: "2026年新教程，专为萌新定制的控笔训练" },
          { title: "专为绘画手抖定制的保姆级控笔教程", url: "https://www.bilibili.com/opus/1055681374896259081", source: "B站", duration: "图文", tip: "每天一遍，30天成为控笔大师" },
          { title: "5年插画师经验总结！控笔素材分享", url: "https://www.bilibili.com/opus/806644705588674565", source: "B站", duration: "图文", tip: "附练习素材，边看边练" },
        ]
      },
      {
        id: "shape",
        label: "抓形",
        unlockDays: 7,
        resources: [
          { title: "画画教程零基础合集（UP主空间）", url: "https://space.bilibili.com/1475676153/channel/series", source: "B站", duration: "系列", tip: "从抓形到临摹的系统教程合集" },
          { title: "绘画教程B站官方空间", url: "https://space.bilibili.com/3493143286647410", source: "B站", duration: "系列", tip: "B站官方绘画教程聚合，质量有保证" },
        ]
      },
      {
        id: "copy",
        label: "临摹",
        unlockDays: 21,
        resources: [
          { title: "画画教程零基础合集", url: "https://space.bilibili.com/1475676153/channel/series", source: "B站", duration: "系列", tip: "包含临摹方法的系列教程" },
          { title: "绘画教程B站官方空间", url: "https://space.bilibili.com/3493143286647410", source: "B站", duration: "系列", tip: "涵盖多种风格的临摹教学" },
        ]
      },
      {
        id: "color",
        label: "色彩",
        unlockDays: 45,
        resources: [
          { title: "画画教程零基础合集（含色彩篇）", url: "https://space.bilibili.com/1475676153/channel/series", source: "B站", duration: "系列", tip: "色彩理论专题视频" },
          { title: "绘画教程B站官方空间", url: "https://space.bilibili.com/3493143286647410", source: "B站", duration: "系列", tip: "包含色彩搭配与光影教学" },
        ]
      },
      {
        id: "anatomy",
        label: "人体",
        unlockDays: 75,
        resources: [
          { title: "人体绘画教程50集（超详细知识点）", url: "https://www.bilibili.com/video/BV1zLrhYbEn7/", source: "B站", duration: "50集", tip: "2025年最新，专治各种人体痛点" },
          { title: "人体结构绘画教程（UP主空间）", url: "https://space.bilibili.com/699944151", source: "B站", duration: "系列", tip: "专业人体结构教学UP主" },
          { title: "人体绘画教程合集", url: "https://space.bilibili.com/1246756371", source: "B站", duration: "系列", tip: "从骨骼到肌肉的完整体系" },
        ]
      },
      {
        id: "perspective",
        label: "透视",
        unlockDays: 100,
        resources: [
          { title: "基础透视的实际运用方法", url: "https://www.bilibili.com/video/BV1ZcNp6BETb/", source: "B站", duration: "系列", tip: "2026年7月最新，解决一切绘画透视问题" },
          { title: "人体结构绘画教程（含透视篇）", url: "https://space.bilibili.com/699944151", source: "B站", duration: "系列", tip: "包含人体透视与场景透视" },
        ]
      }
    ]
  },

  // ======================== 单词 ========================
  vocabulary: {
    name: "单词",
    icon: "📖",
    stages: [
      {
        id: "memory",
        label: "记忆方法",
        unlockDays: 0,
        resources: [
          { title: "词根词缀背单词（英语学习第二期）", url: "https://www.bilibili.com/video/BV19N3q69EWD/", source: "B站", duration: "系列", tip: "2026年最新，睡前整理联想记忆法" },
          { title: "全258集英语词根+词缀记忆法视频精讲", url: "https://www.bilibili.com/video/BV1QKpRz7Eqd/", source: "B站", duration: "258集", tip: "从根源理解单词构成，告别死记硬背" },
          { title: "英语兔背单词视频合集", url: "https://space.bilibili.com/1778190624/channel/series", source: "B站", duration: "系列", tip: "B站人气英语教学UP主" },
          { title: "词根单词APP（科学记忆）", url: "https://cigendanci.cn/product/", source: "网站", duration: "工具", tip: "词根词缀思维导图+智能复习算法" },
        ]
      },
      {
        id: "context",
        label: "语境例句",
        unlockDays: 14,
        resources: [
          { title: "英语兔背单词视频合集（含语境）", url: "https://space.bilibili.com/1778190624/channel/series", source: "B站", duration: "系列", tip: "在真实语境中学习单词用法" },
          { title: "Bobo背单词（UP主空间）", url: "https://space.bilibili.com/3546770413980464", source: "B站", duration: "系列", tip: "每日单词推送，长期积累" },
        ]
      },
      {
        id: "daily",
        label: "每日积累",
        unlockDays: 30,
        resources: [
          { title: "词根词缀背单词系列", url: "https://www.bilibili.com/video/BV19N3q69EWD/", source: "B站", duration: "系列", tip: "持续更新，每天跟着学" },
          { title: "全258集词根词缀精讲", url: "https://www.bilibili.com/video/BV1QKpRz7Eqd/", source: "B站", duration: "258集", tip: "每天3集，3个月掌握词根词缀体系" },
          { title: "英语兔背单词合集", url: "https://space.bilibili.com/1778190624/channel/series", source: "B站", duration: "系列", tip: "适合长期跟学" },
        ]
      }
    ],
    showProgress: true,
    progressLabel: "累计单词量",
    progressTarget: 5000
  },

  // ======================== 唱歌 ========================
  singing: {
    name: "唱歌",
    icon: "🎵",
    stages: [
      {
        id: "breath",
        label: "呼吸",
        unlockDays: 0,
        resources: [
          { title: "全122集零基础系统唱歌教学（含腹式呼吸）", url: "https://www.bilibili.com/video/BV1F8326bExu/", source: "B站", duration: "122集", tip: "【片段精华 第3-5集】腹式呼吸技巧详解" },
          { title: "零基础系统唱歌教学（喂饭级教程）", url: "https://www.bilibili.com/opus/1079610501731713027", source: "B站", duration: "图文", tip: "【核心要点】吸气腹部外扩，吐气腹部内收" },
          { title: "零基础学唱歌入门（胸腹式呼吸）", url: "https://www.iqiyi.com/v_228almy3cs8.html", source: "爱奇艺", duration: "30分钟", tip: "【片段精华 0:00-30:00】三种呼吸法对比" },
        ]
      },
      {
        id: "vocal",
        label: "发声",
        unlockDays: 7,
        resources: [
          { title: "全122集零基础唱歌教学（发声篇）", url: "https://www.bilibili.com/video/BV1F8326bExu/", source: "B站", duration: "122集", tip: "【片段精华 第10-20集】开嗓与发声练习" },
          { title: "零基础系统唱歌教学", url: "https://www.bilibili.com/opus/1079610501731713027", source: "B站", duration: "图文", tip: "【核心要点】嘴对嘴教学，发声方法详解" },
        ]
      },
      {
        id: "pitch",
        label: "音准",
        unlockDays: 21,
        resources: [
          { title: "全122集零基础唱歌教学（音准篇）", url: "https://www.bilibili.com/video/BV1F8326bExu/", source: "B站", duration: "122集", tip: "【片段精华 第30-40集】音准训练专项" },
          { title: "零基础学唱歌全套教程", url: "https://blog.csdn.net/minixiaolu/article/details/159578836", source: "博客", duration: "图文", tip: "入门必修+专项训练+进阶提升三大阶段" },
        ]
      },
      {
        id: "resonance",
        label: "共鸣",
        unlockDays: 45,
        resources: [
          { title: "全122集零基础唱歌教学（共鸣篇）", url: "https://www.bilibili.com/video/BV1F8326bExu/", source: "B站", duration: "122集", tip: "【片段精华 第50-60集】胸腔/头腔共鸣教学" },
          { title: "怎样学习唱歌？科学练声指南", url: "https://www.sohu.com/a/963425556_594478", source: "搜狐", duration: "图文", tip: "【核心要点】共鸣腔体的运用原理" },
        ]
      },
      {
        id: "articulation",
        label: "咬字",
        unlockDays: 75,
        resources: [
          { title: "全122集零基础唱歌教学（咬字篇）", url: "https://www.bilibili.com/video/BV1F8326bExu/", source: "B站", duration: "122集", tip: "【片段精华 第70-80集】咬字与吐字技巧" },
          { title: "零基础学唱歌全套教程", url: "https://blog.csdn.net/minixiaolu/article/details/159578836", source: "博客", duration: "图文", tip: "专项训练章节含咬字内容" },
        ]
      },
      {
        id: "emotion",
        label: "情感表达",
        unlockDays: 100,
        resources: [
          { title: "全122集零基础唱歌教学（情感篇）", url: "https://www.bilibili.com/video/BV1F8326bExu/", source: "B站", duration: "122集", tip: "【片段精华 第100-122集】歌曲分析与情感表达" },
          { title: "怎样学习唱歌？科学练声指南", url: "https://www.sohu.com/a/963425556_594478", source: "搜狐", duration: "图文", tip: "从技术到情感的完整进阶路径" },
        ]
      }
    ]
  },

  // ======================== 运动 ========================
  sports: {
    name: "运动",
    icon: "🏃",
    stages: [
      {
        id: "big-beginner",
        label: "大基数力量入门",
        unlockDays: 0,
        resources: [
          { title: "零基础哑铃全身燃脂塑形训练（居家）", url: "https://www.bilibili.com/video/BV1kDrCBaEBU/", source: "B站", duration: "30分钟", tip: "2026年最新，哑铃入门力量训练，大基数友好" },
          { title: "30个家庭哑铃增肌动作教学（卓叔）", url: "https://www.zhihu.com/tardis/bd/art/618012404", source: "知乎", duration: "图文", tip: "涵盖胸肩背腿手臂腹部，含计划安排" },
          { title: "大基数暴汗燃脂操（全程无跑跳）", url: "https://www.douyin.com/video/7335046361731157302", source: "抖音", duration: "15分钟", tip: "力量训练前的热身/有氧补充" },
        ]
      },
      {
        id: "no-equipment",
        label: "自重力量训练",
        unlockDays: 14,
        resources: [
          { title: "无器械健身合集（居家必备）", url: "https://www.bilibili.com/opus/772802253279985672", source: "B站", duration: "图文", tip: "俯卧撑/深蹲/引体等自重力量动作全集" },
          { title: "10个自重训练动作，在家练遍全身肌肉", url: "https://www.toutiao.com/article/7516841592880251407/", source: "头条", duration: "图文", tip: "从胸肩背到臀腿核心，渐进式训练体系" },
          { title: "无器械懒人健身攻略（上肢/下肢/核心）", url: "https://www.sohu.com/a/974169731_122553620", source: "搜狐", duration: "图文", tip: "详细发力要点+常见误区+进阶变式" },
        ]
      },
      {
        id: "home-strength",
        label: "器械力量训练",
        unlockDays: 30,
        resources: [
          { title: "弹力带教程合集（26个动作详细讲解）", url: "https://www.bilibili.com/video/BV1zE411n7R2/", source: "B站", duration: "系列", tip: "弹力带是最便宜高效的居家力量器材" },
          { title: "一副哑铃练遍全身的万能攻略", url: "https://www.toutiao.com/article/7493078700183847436/", source: "头条", duration: "图文", tip: "哑铃深蹲/卧推/划船/弯举，全覆盖" },
          { title: "居家力量训练合集（自重/弹力绳/哑铃）", url: "https://v.qq.com/x/cover/mzc0020001chhxm/c0980tmfdyn.html", source: "腾讯视频", duration: "系列", tip: "三种器材交替，避免单调" },
          { title: "哑铃健身图解大全（38组动作）", url: "https://www.jirou.com/html/yalingdaquan.html", source: "肌肉网", duration: "图文", tip: "最全哑铃动作图解，居家锻炼参考手册" },
        ]
      }
    ],
    weeklyPlan: true,
    weeklyPlanLabel: "周力量训练计划",
    defaultWeeklyPlan: [
      { day: "周一", focus: "上肢推（胸/肩/三头）", actions: [
        { name: "标准俯卧撑", sets: "4组", reps: "8-12次", difficulty: "⭐⭐" },
        { name: "哑铃肩推", sets: "4组", reps: "10-12次", difficulty: "⭐⭐" },
        { name: "哑铃侧平举", sets: "3组", reps: "12-15次", difficulty: "⭐⭐" },
        { name: "凳上臂屈伸", sets: "3组", reps: "10-15次", difficulty: "⭐⭐" },
      ]},
      { day: "周二", focus: "下肢力量（腿/臀）", actions: [
        { name: "哑铃深蹲", sets: "4组", reps: "10-15次", difficulty: "⭐⭐⭐" },
        { name: "哑铃箭步蹲", sets: "3组", reps: "10次/侧", difficulty: "⭐⭐⭐" },
        { name: "臀桥（可负重）", sets: "4组", reps: "15-20次", difficulty: "⭐⭐" },
        { name: "靠墙静蹲", sets: "3组", reps: "45-60秒", difficulty: "⭐⭐" },
      ]},
      { day: "周三", focus: "主动恢复", actions: [
        { name: "快走/低强度有氧", sets: "1组", reps: "20-30分钟", difficulty: "⭐" },
        { name: "全身拉伸放松", sets: "1组", reps: "15分钟", difficulty: "⭐" },
      ]},
      { day: "周四", focus: "上肢拉（背/二头）", actions: [
        { name: "哑铃俯身划船", sets: "4组", reps: "10-12次", difficulty: "⭐⭐⭐" },
        { name: "弹力带划船", sets: "4组", reps: "12-15次", difficulty: "⭐⭐" },
        { name: "哑铃弯举", sets: "3组", reps: "12-15次", difficulty: "⭐⭐" },
        { name: "超人式（下背部）", sets: "3组", reps: "15次", difficulty: "⭐" },
      ]},
      { day: "周五", focus: "全身力量复合", actions: [
        { name: "哑铃高脚杯深蹲", sets: "4组", reps: "10-12次", difficulty: "⭐⭐⭐" },
        { name: "俯卧撑（窄距）", sets: "3组", reps: "8-12次", difficulty: "⭐⭐⭐" },
        { name: "哑铃硬拉", sets: "4组", reps: "10-12次", difficulty: "⭐⭐⭐" },
        { name: "平板支撑", sets: "3组", reps: "45-60秒", difficulty: "⭐⭐" },
      ]},
      { day: "周六", focus: "核心+弱项补强", actions: [
        { name: "死虫式", sets: "3组", reps: "10次/侧", difficulty: "⭐" },
        { name: "鸟狗式", sets: "3组", reps: "10次/侧", difficulty: "⭐" },
        { name: "俄罗斯转体（可负重）", sets: "3组", reps: "20次", difficulty: "⭐⭐" },
        { name: "侧平板支撑", sets: "3组", reps: "30秒/侧", difficulty: "⭐⭐" },
      ]},
      { day: "周日", focus: "休息/拉伸", actions: [
        { name: "瑜伽基础拉伸", sets: "1组", reps: "15-20分钟", difficulty: "⭐" },
        { name: "泡沫轴放松", sets: "1组", reps: "10-15分钟", difficulty: "⭐" },
      ]},
    ]
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MODULE_RESOURCES;
}
