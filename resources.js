// ============================================================
// 七模块系统化学习资源数据（已更新真实可访问链接 2026-07-31）
// ============================================================

const MODULE_RESOURCES = {

  // ======================== 输入与输出 ========================
  intake: {
    name: "输入输出",
    icon: "📚",
    stages: [
      {
        id: "book-1",
        label: "第一本·认知破局",
        unlockDays: 0,
        resources: [
          { title: "📖 《认知觉醒》— 开启自我改变的元认知", url: "https://www.bilibili.com/video/BV1G7TrzBEm5/", source: "B站", duration: "3小时", tip: "全网唯一！3小时一次性讲透周岭神作《认知觉醒》&《认知驱动》，看完做：写3条最触动你的认知+1个立刻行动" },
          { title: "配套：周岭《认知觉醒》全书解读视频", url: "https://www.bilibili.com/search?keyword=%E8%AE%A4%E7%9F%A5%E8%A7%89%E9%86%92%20%E8%A7%A3%E8%AF%BB", source: "B站搜索", duration: "系列", tip: "B站搜'认知觉醒 解读'有大量优质UP主逐章解读，挑一个跟完即可" },
        ]
      },
      {
        id: "book-2",
        label: "第二本·深度工作",
        unlockDays: 10,
        resources: [
          { title: "📖 《深度工作》— 在分心时代专注成事", url: "https://www.bilibili.com/search?keyword=%E6%B7%B1%E5%BA%A6%E5%B7%A5%E4%BD%9C%20%E8%A7%A3%E8%AF%BB", source: "B站搜索", duration: "约7天", tip: "卡尔·纽波特著。你每天在多个模块间切换，这本书教你如何进入深度专注。看完做：制定一个每日'深度时段'时间块" },
        ]
      },
      {
        id: "book-3",
        label: "第三本·非暴力沟通",
        unlockDays: 20,
        resources: [
          { title: "📖 《非暴力沟通》— 用爱的语言化解冲突", url: "https://www.bilibili.com/video/BV1RA411T7Y8/", source: "B站", duration: "约5天", tip: "马歇尔·卢森堡著。有声书全15P，边听边做笔记。看完做：用非暴力沟通四步法（观察-感受-需要-请求）写一段真实对话" },
        ]
      },
      {
        id: "film",
        label: "值得看的电影",
        unlockDays: 0,
        resources: [
          { title: "🎬 《国王的演讲》— 口吃国王如何学会表达", url: "https://www.bilibili.com/search?keyword=%E5%9B%BD%E7%8E%8B%E7%9A%84%E6%BC%94%E8%AE%B2", source: "B站搜索", duration: "2小时", tip: "表达力必看电影。看完做：写下3个你从国王身上学到的克服表达恐惧的方法" },
          { title: "🎬 《心灵捕手》— 天才少年的自我和解", url: "https://www.bilibili.com/search?keyword=%E5%BF%83%E7%81%B5%E6%8D%95%E6%89%8B", source: "B站搜索", duration: "2小时", tip: "关于天赋、方向与被看见。看完做：找一个人聊聊你'真正想做的事'" },
          { title: "🎬 《阿甘正传》— 简单的人不简单的力量", url: "https://www.bilibili.com/search?keyword=%E9%98%BF%E7%94%98%E6%AD%A3%E4%BC%A0", source: "B站搜索", duration: "2.5小时", tip: "不聪明但专注，反而走得最远。看完做：写一段你'只管跑'的经历" },
        ]
      },
      {
        id: "documentary",
        label: "纪录片·拓宽认知",
        unlockDays: 0,
        resources: [
          { title: "🎞 《人生七年》— 14个孩子56年人生追踪", url: "https://www.bilibili.com/search?keyword=%E4%BA%BA%E7%94%9F%E4%B8%83%E5%B9%B4", source: "B站搜索", duration: "系列", tip: "BBC经典，从7岁跟拍到63岁。看完做：写下你7岁、14岁、现在的三个变化" },
          { title: "🎞 《富豪谷底求翻身》— 100美元创业挑战", url: "https://www.bilibili.com/search?keyword=%E5%AF%8C%E8%B1%AA%E8%B0%B7%E5%BA%95%E6%B1%82%E7%BF%BB%E8%BA%AB", source: "B站搜索", duration: "8集", tip: "Undercover Billionaire第一季。看完做：列出你身边被忽视的3个机会" },
        ]
      },
      {
        id: "output",
        label: "输出方法",
        unlockDays: 0,
        resources: [
          { title: "看完书/电影后做什么？费曼输出法详解", url: "https://www.bilibili.com/search?keyword=%E8%B4%B9%E6%9B%BC%E5%AD%A6%E4%B9%A0%E6%B3%95", source: "B站搜索", duration: "系列", tip: "核心：用最简单的话把学到的讲给不懂的人听。讲不清楚=没真懂。每看完一本书做一次费曼输出" },
        ]
      }
    ]
  },

  // ======================== 表达力 ========================
  expression: {
    name: "表达力",
    icon: "💬",
    stages: [
      {
        id: "mindset",
        label: "认知破冰",
        unlockDays: 0,
        resources: [
          { title: "⭐ 提升表达能力做这一件事就够了，一个月见效", url: "https://www.bilibili.com/video/BV12h4y1g7Nt/", source: "B站", duration: "5分钟", tip: "130万播放/11.7万收藏🔥 园姐不设限版：嘴笨不是天生的，是没找对方法" },
          { title: "峰哥第一百遍回答：如何提高表达能力", url: "https://www.bilibili.com/video/BV18m4y1a7jm/", source: "B站", duration: "4分钟", tip: "12.7万播放，反复被问所以反复回答，最朴素有效的表达提升路径" },
        ]
      },
      {
        id: "daily-practice",
        label: "每日跟练",
        unlockDays: 3,
        resources: [
          { title: "21天表达能力训练·三周跟练（经典演讲模仿+口才书籍）", url: "https://www.bilibili.com/video/BV1P54y1u7d2/", source: "B站", duration: "6小时", tip: "45万播放/3.4万收藏🔥 超长合集，每天跟着练一段，三周见效，评论区附书单" },
          { title: "「表达能力练习·跟练版」邹韵三分钟自我展示（央视主持人大赛）", url: "https://www.bilibili.com/video/BV1SaqZBTEus/", source: "B站", duration: "13分钟", tip: "11.9万播放/6725收藏，跟着央视主持人学表达节奏和气场" },
        ]
      },
      {
        id: "structure",
        label: "结构化表达",
        unlockDays: 14,
        resources: [
          { title: "【庞颖】专治嘴笨·《金字塔原理》帮你高效思考表达（奇葩说辩手）", url: "https://www.bilibili.com/video/BV1DM4y177Yq/", source: "B站", duration: "30分钟", tip: "180万播放/15.2万收藏🔥🔥 奇葩说辩手庞颖精讲金字塔原理，结构化表达第一课" },
          { title: "夏鹏精读《金字塔原理》：把表达的逻辑搞清楚", url: "https://www.bilibili.com/video/BV1c84y1T7GZ/", source: "B站", duration: "20分钟", tip: "22.7万播放/1.5万收藏，更深入的逐章精读，搭配庞颖视频效果最佳" },
        ]
      },
      {
        id: "impromptu",
        label: "即兴表达",
        unlockDays: 30,
        resources: [
          { title: "5个即兴发言万能公式·摆脱演讲焦虑", url: "https://www.bilibili.com/video/BV1g34y1Z7XR/", source: "B站", duration: "15分钟", tip: "50万播放/4.7万收藏🔥 临时被叫发言不再大脑空白，5个公式直接套" },
          { title: "【胡渐彪】一发言就紧张？奇葩说辩手教你做有准备的即兴演讲", url: "https://www.bilibili.com/video/BV1Wu4y1k7Qn/", source: "B站", duration: "25分钟", tip: "15.3万播放/1.2万收藏，奇葩说辩手实战经验，从焦虑到出口成章" },
        ]
      },
      {
        id: "communication",
        label: "沟通进阶",
        unlockDays: 45,
        resources: [
          { title: "语言暴力无处不在·读懂《非暴力沟通》改善人际关系", url: "https://www.bilibili.com/video/BV19K411H7cF/", source: "B站", duration: "20分钟", tip: "36.7万播放/2.3万收藏，David读书分享，从'表达自己'到'有效沟通'的跨越" },
          { title: "【有声书】《非暴力沟通》全15P完整版", url: "https://www.bilibili.com/video/BV1RA411T7Y8/", source: "B站", duration: "15集", tip: "10.8万播放，全书原貌听读，适合通勤路上反复听" },
        ]
      }
    ]
  },

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
          { title: "硬笔书法零基础速成教程-基本笔画系列", url: "https://www.bilibili.com/video/BV1T4411u7uZ/", source: "B站", duration: "系列", tip: "从垂露竖到横折钩，每个笔画独立视频讲解，适合每天一个" },
          { title: "硬笔书法基础练习：常用基本笔画规范写法", url: "https://www.bilibili.com/video/BV1H5411w7RG/", source: "B站", duration: "系列", tip: "28个基本笔画逐一示范，跟练效果极佳" },
          { title: "硬笔基本笔画教学：竖弯钩详细讲解", url: "https://www.bilibili.com/video/BV1CV4y1H7Ei/", source: "B站", duration: "8分钟", tip: "单笔画精讲，适合每天攻克一个笔画" },
          { title: "零基础硬笔书法入门教程2026新版（从执笔到书写一手好字）", url: "https://www.bilibili.com/video/BV1Gig16kE3x/", source: "B站", duration: "系列", tip: "2026年7月最新，从选笔执笔到笔画章法的完整自学路线" },
        ]
      },
      {
        id: "structure",
        label: "间架结构",
        unlockDays: 7,
        resources: [
          { title: "田英章间架结构28法精讲", url: "https://www.bilibili.com/cheese/play/ep2280307", source: "B站课堂", duration: "28课时", tip: "硬笔书法泰斗田英章系统课程，从笔画搭配到整体布局" },
          { title: "硬笔楷书间架结构58法", url: "https://www.bilibili.com/cheese/play/ep131212", source: "B站课堂", duration: "58课时", tip: "中国硬笔书协会员主讲，学员3万+，58种结构规律全覆盖" },
          { title: "硬笔书法楷书基本笔画精讲28集（含短横结构技巧）", url: "https://www.bilibili.com/video/BV1iy4y1u775/", source: "B站", duration: "28集", tip: "28集系统精讲楷书基本笔画，短横写法与间架结构一网打尽" },
        ]
      },
      {
        id: "layout",
        label: "章法布局",
        unlockDays: 21,
        resources: [
          { title: "硬笔书法章法布局技巧大全", url: "https://search.bilibili.com/all?keyword=%E7%A1%AC%E7%AC%94%E7%94%AB%E6%B3%95%E7%AB%A0%E6%B3%95%E5%B8%83%E5%B1%80", source: "B站搜索", duration: "系列", tip: "从选纸落款到整体布局，99%的人都不知道的章法技巧" },
          { title: "实用硬笔书写章法系统知识（11课时）", url: "https://www.bilibili.com/cheese/play/ep1540527", source: "B站课堂", duration: "11课时", tip: "基于硬笔字的实用书写，系统讲解章法布局知识" },
          { title: "硬笔书法章法布局100个技巧", url: "https://search.bilibili.com/all?keyword=%E7%A1%AC%E7%AC%94%E7%AB%A0%E6%B3%95%E5%B8%83%E5%B1%80%E6%8A%80%E5%B7%A7", source: "B站搜索", duration: "系列", tip: "章法技巧分享，快速提升卷面布局能力" },
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
          { title: "⭐ 入门必看：25个必备绘画练习（brokendraw核心方法）", url: "https://www.bilibili.com/video/BV1xXBKBREPw/", source: "B站", duration: "20分钟", tip: "3.6万播放/6486收藏🔥 从线条到创作，25个练习分5级难度递进，每天挑一个练" },
          { title: "零基础自学画画：控笔-抓型-五官-人体-头发（50集）", url: "https://www.bilibili.com/video/BV1xc3B6jEP8/", source: "B站", duration: "50集", tip: "【第1-5集】控笔练习：错误和正确的线条画法、直线/曲线专项" },
          { title: "控笔技巧：素描基础控笔技巧训练", url: "https://search.bilibili.com/all?keyword=%E7%B4%A0%E6%8F%8F%E6%8E%A7%E7%AC%94%E6%8A%80%E5%B7%A7%E8%AE%AD%E7%BB%83", source: "B站搜索", duration: "10分钟", tip: "美术生都在练的控笔方法，每天10分钟打基础" },
          { title: "零基础学画画：控笔+抓型+临摹进阶练习素材", url: "https://search.bilibili.com/all?keyword=%E9%9B%B6%E5%9F%BA%E7%A1%80%E5%AD%A6%E7%94%BB%E7%94%BB%E6%8E%A7%E7%AC%94%E6%8A%93%E5%9E%8B%E4%B8%B4%E6%91%B9", source: "B站搜索", duration: "8分钟", tip: "控笔练习合集，附练习素材" },
        ]
      },
      {
        id: "visual-perception",
        label: "视觉感知",
        unlockDays: 3,
        resources: [
          { title: "【4K】《像艺术家一样思考》：用右脑绘画（完整版117分钟）", url: "https://www.bilibili.com/video/BV1Bu411Z7eQ/", source: "B站", duration: "117分钟", tip: "8.8万播放/1.1万收藏🔥 贝蒂·艾德华官方教程：倒置临摹+盲画+阴形+显像板全套，必看" },
          { title: "倒置临摹实战：把画颠倒过来向右脑模式切换", url: "https://search.bilibili.com/all?keyword=%E5%83%8F%E8%89%BA%E6%9C%AF%E5%AE%B6%E4%B8%80%E6%A0%B7%E6%80%9D%E8%80%83%E5%80%92%E7%BD%AE%E4%B8%B4%E6%91%B9", source: "B站搜索", duration: "5分钟", tip: "颠覆传统的绘画训练，强制升级观察模式，每笔先看清再落笔" },
          { title: "盲画轮廓练习：不看纸就画，眼睛看到的手移动和绘制", url: "https://search.bilibili.com/all?keyword=%E7%9B%B2%E7%94%BB%E8%BD%AE%E5%BB%93%E7%BB%83%E4%B9%A0%E7%BB%98%E7%94%BB", source: "B站搜索", duration: "3分钟", tip: "眼手绳的基本练习，专注真实边缘线捕捉而非符号化输出" },
          { title: "0成本在家画！大小朋友都能试的盲画练习", url: "https://search.bilibili.com/all?keyword=%E7%9B%B2%E7%94%BB%E7%BB%83%E4%B9%A0%E5%9C%A8%E5%AE%B6%E7%94%BB", source: "B站搜索", duration: "4分钟", tip: "超适合入门者的盲画跟练，什么笔什么纸都行" },
          { title: "阴形/负空间观察训练：隐藏在空白中的艺术", url: "https://search.bilibili.com/all?keyword=%E8%B4%9F%E7%A9%BA%E9%97%B4%E8%A7%82%E5%AF%9F%E7%BB%98%E7%94%BB%E8%AE%AD%E7%BB%83", source: "B站搜索", duration: "4分钟", tip: "解锁绘画负空间，画空隙不画物体，开启全新观察视角" },
          { title: "《像艺术家一样思考》第三章：左脑与右脑·花瓶与人脸练习", url: "https://search.bilibili.com/all?keyword=%E5%83%8F%E8%89%BA%E6%9C%AF%E5%AE%B6%E4%B8%80%E6%A0%B7%E6%80%9D%E8%80%83%E5%B7%A6%E8%84%91%E5%8F%B3%E8%84%91%E8%8A%B1%E7%93%B6%E4%BA%BA%E8%84%B8", source: "B站搜索", duration: "章节", tip: "经典左右脑切换练习，体会符号系统被打破的瞬间" },
          { title: "《像艺术家一样思考》第五章：绕过符号系统·感知边缘", url: "https://search.bilibili.com/all?keyword=%E5%83%8F%E8%89%BA%E6%9C%AF%E5%AE%B6%E4%B8%80%E6%A0%B7%E6%80%9D%E8%80%83%E7%AC%AC%E4%BA%94%E7%AB%A0%E7%AC%A6%E5%8F%B7%E7%B3%BB%E7%BB%9F", source: "B站搜索", duration: "章节", tip: "学会绕过左脑的符号化捷径，真正看见事物本来的样子" },
          { title: "《像艺术家一样思考》第七章：纯轮廓画与边线感知", url: "https://search.bilibili.com/all?keyword=%E5%83%8F%E8%89%BA%E6%9C%AF%E5%AE%B6%E4%B8%80%E6%A0%B7%E6%80%9D%E8%80%83%E7%BA%AF%E8%BD%AE%E5%BB%93%E7%94%BB", source: "B站搜索", duration: "章节", tip: "纯轮廓画是打破符号化绘画最有力的练习，虽然 uncomfortably 慢" },
          { title: "《像艺术家一样思考》第九章：看见比例关系·透视与比例", url: "https://search.bilibili.com/all?keyword=%E5%83%8F%E8%89%BA%E6%9C%AF%E5%AE%B6%E4%B8%80%E6%A0%B7%E6%80%9D%E8%80%83%E6%AF%94%E4%BE%8B%E5%85%B3%E7%B3%BB", source: "B站搜索", duration: "章节", tip: "用显像板和量角器法训练比例感知，画什么像什么" },
          { title: "《像艺术家一样思考》第十章：光线与阴影·四明暗系统", url: "https://search.bilibili.com/all?keyword=%E5%83%8F%E8%89%BA%E6%9C%AF%E5%AE%B6%E4%B8%80%E6%A0%B7%E6%80%9D%E8%80%83%E5%85%89%E7%BA%BF%E9%98%B4%E5%BD%B1", source: "B站搜索", duration: "章节", tip: "背光/投影/反射光/高光四明暗系统，让画面立体起来" },
        ]
      },
      {
        id: "shape",
        label: "抓形",
        unlockDays: 7,
        resources: [
          { title: "零基础自学画画50集（抓形篇）", url: "https://www.bilibili.com/video/BV1xc3B6jEP8/", source: "B站", duration: "50集", tip: "【第6-12集】几何概括法+负空间观察，快速抓准形体" },
          { title: "人体绘画教程：从人体比例到动态全掌握", url: "https://www.bilibili.com/video/BV1oXiSBoEjB/", source: "B站", duration: "系列", tip: "从三庭五眼到人体比例动态，真正从零教会你的人体教程" },
        ]
      },
      {
        id: "copy",
        label: "临摹",
        unlockDays: 21,
        resources: [
          { title: "零基础自学画画50集（临摹篇）", url: "https://www.bilibili.com/video/BV1xc3B6jEP8/", source: "B站", duration: "50集", tip: "【第13-20集】五官临摹+大师作品临摹技巧" },
          { title: "B站绘画区宝藏UP主推荐合集（含色彩与光影方向）", url: "https://search.bilibili.com/all?keyword=B%E7%AB%99%E7%BB%98%E7%94%BBUP%E4%B8%BB%E6%8E%A8%E8%8D%90", source: "B站搜索", duration: "视频", tip: "整理B站绘画UP主推荐，从零基础入门到进阶提升全覆盖" },
        ]
      },
      {
        id: "color",
        label: "色彩",
        unlockDays: 45,
        resources: [
          { title: "零基础自学画画50集（色彩篇）", url: "https://www.bilibili.com/video/BV1xc3B6jEP8/", source: "B站", duration: "50集", tip: "【第21-30集】色彩理论基础+冷暖对比+配色实战" },
          { title: "B站绘画区宝藏UP主推荐合集（色彩与光影方向）", url: "https://search.bilibili.com/all?keyword=B%E7%AB%99%E7%BB%98%E7%94%BB%E8%89%B2%E5%BD%A9%E5%85%89%E5%BD%B1UP%E4%B8%BB", source: "B站搜索", duration: "视频", tip: "从入门到进阶的宝藏绘画UP主，零成本提升画技" },
        ]
      },
      {
        id: "anatomy",
        label: "人体",
        unlockDays: 75,
        resources: [
          { title: "零基础自学画画50集（人体篇）", url: "https://www.bilibili.com/video/BV1xc3B6jEP8/", source: "B站", duration: "50集", tip: "【第31-40集】人体比例+骨骼肌肉+动态捕捉" },
          { title: "人体绘画教程50集（超详细知识点）", url: "https://www.bilibili.com/video/BV1zLrhYbEn7/", source: "B站", duration: "50集", tip: "2025年最新，专治各种人体结构痛点" },
        ]
      },
      {
        id: "perspective",
        label: "透视",
        unlockDays: 100,
        resources: [
          { title: "零基础自学画画50集（透视篇）", url: "https://www.bilibili.com/video/BV1xc3B6jEP8/", source: "B站", duration: "50集", tip: "【第41-50集】一点/两点/三点透视+场景透视实战" },
          { title: "基础透视的实际运用方法", url: "https://www.bilibili.com/video/BV1ZcNp6BETb/", source: "B站", duration: "系列", tip: "2026年7月最新，解决一切绘画透视问题" },
        ]
      },
      {
        id: "imagination",
        label: "创意绘画",
        unlockDays: 130,
        resources: [
          { title: "brokendraw：这个绘画练习不可置信的有效！", url: "https://www.bilibili.com/video/BV1qaTHzxEUs/", source: "B站", duration: "12分钟", tip: "8488播放/1509收藏🔥 最有效的想象力绘画练习排名，附避坑指南" },
          { title: "brokendraw：我是如何最终用想象力画画的", url: "https://www.bilibili.com/video/BV1pZzGBzE91/", source: "B站", duration: "12分钟", tip: "2026年1月新作，从练习到自由创作的系统方法" },
          { title: "brokendraw：画画十年后希望自己一开始就知道的十件事", url: "https://www.bilibili.com/video/BV1GKu4ziEqd/", source: "B站", duration: "10分钟", tip: "2839播放/388收藏，十年画师的肺腑之言" },
          { title: "brokendraw：5步走实现用想象力画画！", url: "https://www.bilibili.com/video/BV135YRzMEVf/", source: "B站", duration: "10分钟", tip: "从临摹到原创的五步进阶法" },
          { title: "brokendraw：用想象力画头像的方法", url: "https://www.bilibili.com/video/BV1x9K5eREGm/", source: "B站", duration: "8分钟", tip: "把想象力运用到具体项目中——头像创作实战" },
          { title: "锻炼空间坐标的方法——杜绝下笔焦虑", url: "https://www.bilibili.com/video/BV1v6zSYTE8j/", source: "B站", duration: "15分钟", tip: "3万播放/4914收藏🔥 DrawJin译制，空间思维训练核心课" },
          { title: "brokendraw：连续三十天用想象画画的结局", url: "https://www.bilibili.com/video/BV1GFrNYCEWM/", source: "B站", duration: "8分钟", tip: "30天挑战全记录，见证想象力绘画的成长曲线" },
          { title: "brokendraw丨我如何更好地从想象中绘画（3个练习）", url: "https://www.bilibili.com/video/BV1e5ASetEAd/", source: "B站", duration: "10分钟", tip: "3个核心练习，每天跟练提升空间想象力" },
        ]
      }
    ]
  },

  // ======================== 单词/英语 ========================
  vocabulary: {
    name: "英语",
    icon: "📖",
    stages: [
      {
        id: "word-root",
        label: "词根词缀",
        unlockDays: 0,
        resources: [
          { title: "⭐ 上集：词根词缀轻松记住8000词（全158集+PDF）", url: "https://www.bilibili.com/video/BV1PH7WzME9A/", source: "B站", duration: "158集", tip: "从act/arm/air基础词根开始，1个词根串起N个词，每天3-5集稳步推进" },
          { title: "⭐ 下集：轻松记住8000词·思维导图速记（全150集+PDF）", url: "https://www.bilibili.com/video/BV172TTzSETm/", source: "B站", duration: "150集", tip: "8.8万播放/6114收藏🔥 词根词缀思维导图进阶，上下合计300+集覆盖8000词" },
        ]
      },
      {
        id: "listening",
        label: "听力输入",
        unlockDays: 30,
        resources: [
          { title: "【每天1小时】沉浸式英语听力练习｜日常英文", url: "https://www.bilibili.com/video/BV1AwpYz6Em7/", source: "B站", duration: "42集", tip: "4万播放/1541收藏🔥 每天1小时沉浸听，听懂日常对话不再是梦" },
          { title: "保姆级听力训练｜零基础也能跟上｜日常对话完整收录", url: "https://www.bilibili.com/video/BV1NCjEz9EsF/", source: "B站", duration: "1集·长片", tip: "3.8万播放/1734收藏，情境式对话+中文配音辅助，零基础友好" },
        ]
      },
      {
        id: "speaking",
        label: "口语输出",
        unlockDays: 60,
        resources: [
          { title: "【220集】影子跟读·英语口语听力绝佳资源", url: "https://www.bilibili.com/video/BV1nq4y1G7FH/", source: "B站", duration: "200集", tip: "47万播放/3.4万收藏🔥🔥 每天10分钟影子跟读，模仿native speaker语音语调语速" },
          { title: "【Easy English】油管千万播放·日常英语口语练习素材（48集）", url: "https://www.bilibili.com/video/BV1Q3gY6gEgo/", source: "B站", duration: "48集", tip: "YouTube原版搬运，真实场景对话：购物/点餐/问路/闲聊全覆盖" },
        ]
      },
      {
        id: "grammar",
        label: "语法框架",
        unlockDays: 90,
        resources: [
          { title: "英语语法精讲合集（全面·通俗·有趣 | 从零打造系统语法体系）", url: "https://www.bilibili.com/video/BV1XY411J7aG/", source: "B站", duration: "29集", tip: "4449万播放/271万收藏🏆 英语兔出品，B站语法课天花板，不确定要不要学就先收藏" },
        ]
      },
      {
        id: "immersion",
        label: "长期环境",
        unlockDays: 120,
        resources: [
          { title: "【沉浸式英语播客·进阶篇】50篇｜刻意练习英语听力", url: "https://www.bilibili.com/video/BV1R86UBtENR/", source: "B站", duration: "50集", tip: "6156播放/159收藏，进阶听力素材，从'听懂'到'听熟'的跨越" },
        ]
      }
    ],
    showProgress: true,
    progressLabel: "累计单词量",
    progressTarget: 8000
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
          { title: "全122集零基础系统唱歌教学（腹式呼吸篇）", url: "https://www.bilibili.com/video/BV1F8326bExu/", source: "B站", duration: "122集", tip: "【片段精华 第3-5集】腹式呼吸技巧详解，吸气腹部外扩" },
          { title: "纯干货唱歌技巧：30天从零开始", url: "https://www.bilibili.com/video/BV1x8Eu6JE44/", source: "B站", duration: "系列", tip: "2026年6月新作，2400+播放，系统化唱歌教学" },
          { title: "B站唱歌教学UP主推荐合集", url: "https://search.bilibili.com/all?keyword=B%E7%AB%99%E5%94%B1%E6%AD%8C%E6%95%99%E5%AD%A6UP%E4%B8%BB%E6%8E%A8%E8%8D%90", source: "B站搜索", duration: "视频", tip: "声乐基础差必看的几位宝藏UP主，含自学唱歌正确顺序" },
        ]
      },
      {
        id: "vocal",
        label: "发声",
        unlockDays: 7,
        resources: [
          { title: "全122集零基础唱歌教学（发声篇）", url: "https://www.bilibili.com/video/BV1F8326bExu/", source: "B站", duration: "122集", tip: "【片段精华 第10-20集】开嗓与发声练习，告别大白嗓" },
          { title: "纯干货唱歌技巧（发声进阶）", url: "https://www.bilibili.com/video/BV1x8Eu6JE44/", source: "B站", duration: "系列", tip: "30天系统训练，每天一练稳步提升" },
        ]
      },
      {
        id: "pitch",
        label: "音准",
        unlockDays: 21,
        resources: [
          { title: "全122集零基础唱歌教学（音准篇）", url: "https://www.bilibili.com/video/BV1F8326bExu/", source: "B站", duration: "122集", tip: "【片段精华 第30-40集】音准训练专项，跟着钢琴唱音阶" },
          { title: "纯干货唱歌技巧（音准节奏）", url: "https://www.bilibili.com/video/BV1x8Eu6JE44/", source: "B站", duration: "系列", tip: "如何不跑调？音准纠正的核心方法" },
        ]
      },
      {
        id: "resonance",
        label: "共鸣",
        unlockDays: 45,
        resources: [
          { title: "全122集零基础唱歌教学（共鸣篇）", url: "https://www.bilibili.com/video/BV1F8326bExu/", source: "B站", duration: "122集", tip: "【片段精华 第50-60集】胸腔共鸣+头腔共鸣+面罩共鸣" },
        ]
      },
      {
        id: "articulation",
        label: "咬字",
        unlockDays: 75,
        resources: [
          { title: "全122集零基础唱歌教学（咬字篇）", url: "https://www.bilibili.com/video/BV1F8326bExu/", source: "B站", duration: "122集", tip: "【片段精华 第70-80集】咬字与吐字技巧，让每个字都清晰" },
        ]
      },
      {
        id: "emotion",
        label: "情感表达",
        unlockDays: 100,
        resources: [
          { title: "全122集零基础唱歌教学（情感篇）", url: "https://www.bilibili.com/video/BV1F8326bExu/", source: "B站", duration: "122集", tip: "【片段精华 第100-122集】歌曲分析与情感表达，技术是手段" },
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
          { title: "20分钟全身哑铃训练-全程站立-居家力量训练", url: "https://www.bilibili.com/video/BV1xkwtzLEmZ/", source: "B站", duration: "20分钟", tip: "2026年3月发布，间歇模式40秒锻炼+20秒休息，哑铃可用水瓶替代" },
          { title: "30个家庭哑铃增肌动作教学（含计划安排）·卓叔", url: "https://www.bilibili.com/video/BV1FY4y1y7Vh/", source: "B站", duration: "30个动作", tip: "B站最全！涵盖胸肩背腿手臂腹部，每个动作配分析讲解+训练计划模板" },
          { title: "一副哑铃练遍全身，17分钟暴汗燃脂力量训练", url: "https://www.bilibili.com/video/BV19w5y6SEsz/", source: "B站", duration: "17分钟", tip: "2026年5月发布，适合新手减脂，一副哑铃练遍全身" },
        ]
      },
      {
        id: "no-equipment",
        label: "自重力量训练",
        unlockDays: 14,
        resources: [
          { title: "30分钟居家全身力量训练", url: "https://www.bilibili.com/video/BV17fZWBVEDR/", source: "B站", duration: "30分钟", tip: "2026年2月发布，8kg哑铃跟练，1700+播放" },
          { title: "无需器械！6个自重健身动作在家练遍全身", url: "https://www.bilibili.com/video/BV1By3C6HEUu/", source: "B站", duration: "40分钟", tip: "居家无器械自重训练，从胸肩背到臀腿核心全覆盖" },
          { title: "12个自重训练动作，在家练出完美身材（无器械）", url: "https://www.youtube.com/watch?v=wE4pi9dg2Pk", source: "YouTube", duration: "15分钟", tip: "Chris Heria出品，5个自重动作练全身，全球千万粉丝的徒手健身大神" },
        ]
      },
      {
        id: "home-strength",
        label: "器械力量训练",
        unlockDays: 30,
        resources: [
          { title: "60分钟全身哑铃锻炼-无重复-居家力量训练", url: "https://www.bilibili.com/video/BV177cCe5Ezn/", source: "B站", duration: "60分钟", tip: "2025年发布，全站姿无重复练习，锻炼每个肌肉群" },
          { title: "40分钟全身哑铃锻炼-无需重复-适合所有健身水平", url: "https://www.bilibili.com/video/BV1n4cQegEEm/", source: "B站", duration: "40分钟", tip: "2025年发布，增强和调理全身，保持新鲜和挑战性" },
          { title: "弹力带教程合集（26个动作详细讲解）", url: "https://www.bilibili.com/video/BV1zE411n7R2/", source: "B站", duration: "系列", tip: "弹力带是最便宜高效的居家力量器材" },
          { title: "一副哑铃练遍全身·家庭哑铃增肌大合集", url: "https://search.bilibili.com/all?keyword=%E5%93%91%E9%93%83%E5%85%A8%E8%BA%AB%E5%A2%9E%E8%82%8C%E5%B1%85%E5%AE%B6%E8%AE%AD%E7%BB%83", source: "B站搜索", duration: "27分钟", tip: "哑铃深蹲/卧推/划船/弯举全覆盖，居家增肌必备" },
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
  },

  // ======================== 每日日程 ========================
  schedule: {
    name: "每日日程",
    icon: "📋",
    stages: [],
    showProgress: false,
    weeklyPlan: false
  },

  // ======================== 记账 ========================
  finance: {
    name: "记账",
    icon: "💰",
    stages: [],
    showProgress: false,
    weeklyPlan: false
  },

  // ======================== 科技资讯 ========================
  news: {
    name: "科技资讯",
    icon: "📡",
    stages: [],
    showProgress: false,
    weeklyPlan: false
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MODULE_RESOURCES;
}
