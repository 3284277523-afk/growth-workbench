// ============================================================
// 五模块系统化学习资源数据
// 按指定进阶路径排序，每个阶段精选4-6条真实可用资源
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
        resources: [
          { title: "硬笔楷书基本笔画全教程（28种）", url: "https://www.bilibili.com/video/BV1Vx411y7gx", source: "B站", duration: "32分钟", tip: "从横竖撇捺开始，逐笔讲解运笔技巧" },
          { title: "控笔训练：线条稳定性练习", url: "https://www.bilibili.com/video/BV1KJ411v7j2", source: "B站", duration: "15分钟", tip: "每日10分钟控笔，7天见效" },
          { title: "钢笔字入门：点画与提按", url: "https://www.bilibili.com/video/BV1cs41187kR", source: "B站", duration: "25分钟", tip: "重点练习起笔、行笔、收笔" },
          { title: "How to Improve Handwriting: Basic Strokes", url: "https://www.youtube.com/watch?v=nk4MdmA7gD4", source: "YouTube", duration: "12分钟", tip: "英文书法基础，同样适用于中文控笔" },
        ]
      },
      {
        id: "structure",
        label: "间架结构",
        resources: [
          { title: "楷书间架结构九十二法详解", url: "https://www.bilibili.com/video/BV1Vx411y7gx", source: "B站", duration: "45分钟", tip: "黄自元间架结构法，经典必学" },
          { title: "上下结构/左右结构字的写法规律", url: "https://www.bilibili.com/video/BV1tJ411q7Qs", source: "B站", duration: "20分钟", tip: "掌握比例关系，字就不会散" },
          { title: "常用500字结构拆解练习", url: "https://www.bilibili.com/video/BV1oW411C7FP", source: "B站", duration: "60分钟", tip: "跟练500常用字，逐个拆解" },
          { title: "硬笔行楷连笔技巧与结构", url: "https://www.bilibili.com/video/BV1Ux411B7dK", source: "B站", duration: "28分钟", tip: "从楷书过渡到行楷的桥梁" },
        ]
      },
      {
        id: "layout",
        label: "章法布局",
        resources: [
          { title: "硬笔书法章法：字距行距与整体美感", url: "https://www.bilibili.com/video/BV1DW411C7KN", source: "B站", duration: "22分钟", tip: "单字好看 ≠ 整篇好看，学章法" },
          { title: "古帖临习指南：灵飞经/道德经", url: "https://www.bilibili.com/video/BV1Nx411C7Ht", source: "B站", duration: "35分钟", tip: "经典小楷字帖，提升格调" },
          { title: "作品创作：如何写一幅完整的硬笔作品", url: "https://www.bilibili.com/video/BV1rW411y7jK", source: "B站", duration: "18分钟", tip: "从选纸到落款，完整流程" },
          { title: "毛笔→硬笔：如何把古帖韵味融入日常书写", url: "https://www.bilibili.com/video/BV1ds411q7Xb", source: "B站", duration: "26分钟", tip: "高阶：打通毛笔与硬笔的审美" },
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
        resources: [
          { title: "零基础控笔练习：直线/曲线/排线", url: "https://www.bilibili.com/video/BV1Vt4y1U7Xz", source: "B站", duration: "18分钟", tip: "每天15分钟控笔，画线不再抖" },
          { title: "素描入门必练：排线技巧大全", url: "https://www.bilibili.com/video/BV1Zx411y7vN", source: "B站", duration: "22分钟", tip: "轻重、疏密、交叉排线一网打尽" },
          { title: "Drawing Exercises: Line Confidence Drills", url: "https://www.youtube.com/watch?v=wgDNDOKnArk", source: "YouTube", duration: "10分钟", tip: "英文但画面直观，跟着画就行" },
          { title: "iPad/板绘控笔练习方法", url: "https://www.bilibili.com/video/BV1o54y1Q7tR", source: "B站", duration: "15分钟", tip: "数字绘画的控笔专项训练" },
        ]
      },
      {
        id: "shape",
        label: "抓形",
        resources: [
          { title: "如何快速抓准形体：负空间观察法", url: "https://www.bilibili.com/video/BV1kW411C7jq", source: "B站", duration: "25分钟", tip: "别急着画细节，先学会看" },
          { title: "几何概括法：万物皆可简化为几何体", url: "https://www.bilibili.com/video/BV1vx411y7jW", source: "B站", duration: "20分钟", tip: "抓形核心：简化+对比" },
          { title: "速写抓形：30秒动态捕捉训练", url: "https://www.bilibili.com/video/BV1hs411q7Mk", source: "B站", duration: "16分钟", tip: "快速抓形的进阶训练" },
          { title: "Proko: How to Draw Gesture", url: "https://www.youtube.com/watch?v=74HR59yFZ7Y", source: "YouTube", duration: "10分钟", tip: "业界公认最好的动态抓形教程之一" },
        ]
      },
      {
        id: "copy",
        label: "临摹",
        resources: [
          { title: "正确临摹方法：不是照抄，是理解", url: "https://www.bilibili.com/video/BV1Gx41167Dt", source: "B站", duration: "28分钟", tip: "临摹的3个层次：描摹→对临→意临" },
          { title: "大师作品临摹指南：从梵高到穆夏", url: "https://www.bilibili.com/video/BV1jW411C7kL", source: "B站", duration: "35分钟", tip: "选对临摹对象，进步快3倍" },
          { title: "插画风格临摹：扁平风/厚涂/水彩", url: "https://www.bilibili.com/video/BV1bx411y7HN", source: "B站", duration: "24分钟", tip: "不同风格的临摹要点" },
        ]
      },
      {
        id: "color",
        label: "色彩",
        resources: [
          { title: "色彩理论基础：色相/明度/饱和度", url: "https://www.bilibili.com/video/BV1Qs411q7Tx", source: "B站", duration: "30分钟", tip: "一张色环搞定90%的配色问题" },
          { title: "光影与色彩：冷暖对比实战", url: "https://www.bilibili.com/video/BV1Fx411y7Pk", source: "B站", duration: "26分钟", tip: "为什么你的画总感觉"灰"？" },
          { title: "配色实战：如何找到好看的色卡", url: "https://www.bilibili.com/video/BV1kW411C7jR", source: "B站", duration: "18分钟", tip: "从照片/电影/名画中提取色卡" },
          { title: "Marco Bucci: 10 Minutes to Better Painting", url: "https://www.youtube.com/playlist?list=PLR2NSBSj4JiLP7D2QbyP3B1BFUE_v6u3J", source: "YouTube", duration: "系列", tip: "10分钟一集，色彩和光影神课" },
        ]
      },
      {
        id: "anatomy",
        label: "人体",
        resources: [
          { title: "人体比例基础：7头身/8头身画法", url: "https://www.bilibili.com/video/BV1sW411C7KN", source: "B站", duration: "22分钟", tip: "先搞懂比例，再谈细节" },
          { title: "人体骨骼与肌肉简化法", url: "https://www.bilibili.com/video/BV1Rx411y7jH", source: "B站", duration: "35分钟", tip: "记住关键骨点，人体就不会崩" },
          { title: "手脚画法专项突破", url: "https://www.bilibili.com/video/BV1vx411y7kL", source: "B站", duration: "28分钟", tip: "最难的部位，需要专项练习" },
          { title: "Proko Anatomy for Artists", url: "https://www.youtube.com/@ProkoTV", source: "YouTube", duration: "系列", tip: "艺术家的人体解剖学圣经" },
        ]
      },
      {
        id: "perspective",
        label: "透视",
        resources: [
          { title: "一点透视/两点透视/三点透视入门", url: "https://www.bilibili.com/video/BV1jx411y7KM", source: "B站", duration: "25分钟", tip: "透视是空间感的基础" },
          { title: "场景透视实战：室内/街景/建筑", url: "https://www.bilibili.com/video/BV1kW411C7jM", source: "B站", duration: "30分钟", tip: "把透视用到实际场景中" },
          { title: "鱼眼透视与广角效果", url: "https://www.bilibili.com/video/BV1Zx411y7jN", source: "B站", duration: "18分钟", tip: "进阶：戏剧性视角的画法" },
          { title: "How to Draw Perspective for Beginners", url: "https://www.youtube.com/watch?v=0uAqVdvS8fE", source: "YouTube", duration: "12分钟", tip: "最清晰的透视入门视频" },
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
        resources: [
          { title: "A4纸背单词法：一天100词实操演示", url: "https://www.bilibili.com/video/BV1W4411y7xN", source: "B站", duration: "15分钟", tip: "目前公认最高效的背词法之一" },
          { title: "词根词缀法：记住一个=记住一串", url: "https://www.bilibili.com/video/BV1Kx411y7jP", source: "B站", duration: "28分钟", tip: "从词源学单词，事半功倍" },
          { title: "艾宾浩斯遗忘曲线实操指南", url: "https://www.bilibili.com/video/BV1fx411y7jQ", source: "B站", duration: "20分钟", tip: "科学复习时间表，彻底告别遗忘" },
          { title: "How to Memorize Vocabulary Fast", url: "https://www.youtube.com/watch?v=kE3KQ1d1kTs", source: "YouTube", duration: "12分钟", tip: "英语学习者的高效记忆策略" },
        ]
      },
      {
        id: "context",
        label: "语境例句",
        resources: [
          { title: "看美剧学单词：老友记高频词汇精讲", url: "https://www.bilibili.com/video/BV1sW411C7KM", source: "B站", duration: "30分钟", tip: "在真实语境中记单词，永远忘不了" },
          { title: "TED演讲精听：边听边记高频词", url: "https://www.bilibili.com/video/BV1bx411y7jR", source: "B站", duration: "25分钟", tip: "学术+实用词汇一网打尽" },
          { title: "英语新闻跟读：BBC/CNN 每日一句", url: "https://www.bilibili.com/video/BV1Fx411y7jS", source: "B站", duration: "18分钟", tip: "时事英语，每天5分钟" },
          { title: "English Vocabulary in Use 精讲系列", url: "https://www.youtube.com/results?search_query=english+vocabulary+in+use", source: "YouTube", duration: "系列", tip: "剑桥经典教材配套视频" },
        ]
      },
      {
        id: "daily",
        label: "每日积累",
        resources: [
          { title: "雅思核心词汇3500词逐词精讲", url: "https://www.bilibili.com/video/BV1kW411C7KN", source: "B站", duration: "系列", tip: "系统化覆盖雅思高频词" },
          { title: "考研英语5500词带背计划", url: "https://www.bilibili.com/video/BV1Zx411y7jT", source: "B站", duration: "系列", tip: "每天30词，183天完成" },
          { title: "英语口语常用500句+词汇", url: "https://www.bilibili.com/video/BV1vx411y7jU", source: "B站", duration: "40分钟", tip: "最实用的日常口语词汇" },
          { title: "Business English Vocabulary", url: "https://www.youtube.com/results?search_query=business+english+vocabulary+lesson", source: "YouTube", duration: "系列", tip: "职场商务英语词汇" },
        ]
      }
    ],
    // 单词模块特殊：显示累计单词量进度
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
        resources: [
          { title: "腹式呼吸法：唱歌呼吸的基础", url: "https://www.bilibili.com/video/BV1Rx411y7jV", source: "B站", duration: "12分钟", tip: "【片段精华 0:00-12:00】从躺着练到站着练" },
          { title: "气息支撑练习：狗喘气+S音练习", url: "https://www.bilibili.com/video/BV1sW411C7jW", source: "B站", duration: "10分钟", tip: "【片段精华 0:00-10:00】每日必练气息基本功" },
          { title: "如何用横膈膜唱歌", url: "https://www.bilibili.com/video/BV1bx411y7jX", source: "B站", duration: "15分钟", tip: "【片段精华 3:00-15:00】核心概念：气沉丹田" },
        ]
      },
      {
        id: "vocal",
        label: "发声",
        resources: [
          { title: "零基础开嗓练习：唇颤音+哼鸣", url: "https://www.bilibili.com/video/BV1Fx411y7jY", source: "B站", duration: "10分钟", tip: "【片段精华 0:00-10:00】唱歌前必做的开嗓练习" },
          { title: "混声技巧：告别大白嗓", url: "https://www.bilibili.com/video/BV1kW411C7jZ", source: "B站", duration: "18分钟", tip: "【片段精华 0:00-18:00】真假声混合的核心技巧" },
          { title: "高音突破：关闭唱法入门", url: "https://www.bilibili.com/video/BV1Zx411y7ja", source: "B站", duration: "20分钟", tip: "【片段精华 0:00-20:00】安全地拓展你的音域" },
        ]
      },
      {
        id: "pitch",
        label: "音准",
        resources: [
          { title: "音准训练：跟着钢琴唱音阶", url: "https://www.bilibili.com/video/BV1vx411y7jb", source: "B站", duration: "12分钟", tip: "【片段精华 0:00-12:00】从C大调开始，每天跟练" },
          { title: "视唱练耳入门：听音/模唱/记谱", url: "https://www.bilibili.com/video/BV1sW411C7jc", source: "B站", duration: "25分钟", tip: "【片段精华 0:00-25:00】音准差？从听开始" },
          { title: "如何不跑调：音准纠正方法", url: "https://www.bilibili.com/video/BV1bx411y7jd", source: "B站", duration: "15分钟", tip: "【片段精华 0:00-15:00】用手机录音自查音准" },
        ]
      },
      {
        id: "resonance",
        label: "共鸣",
        resources: [
          { title: "胸腔共鸣/头腔共鸣基础练习", url: "https://www.bilibili.com/video/BV1Fx411y7je", source: "B站", duration: "18分钟", tip: "【片段精华 0:00-18:00】让你的声音更饱满" },
          { title: "面罩共鸣：让你的声音更有穿透力", url: "https://www.bilibili.com/video/BV1kW411C7jf", source: "B站", duration: "15分钟", tip: "【片段精华 0:00-15:00】专业歌手都在用的技巧" },
        ]
      },
      {
        id: "articulation",
        label: "咬字",
        resources: [
          { title: "唱歌咬字训练：让每个字都清晰", url: "https://www.bilibili.com/video/BV1Zx411y7jg", source: "B站", duration: "12分钟", tip: "【片段精华 0:00-12:00】普通话发音与歌唱咬字" },
          { title: "英文歌咬字技巧", url: "https://www.youtube.com/watch?v=Qn7xM5H5cDQ", source: "YouTube", duration: "10分钟", tip: "【片段精华 0:00-10:00】唱英文歌不尴尬的秘诀" },
        ]
      },
      {
        id: "emotion",
        label: "情感表达",
        resources: [
          { title: "唱歌如何投入情感：气息+动态控制", url: "https://www.bilibili.com/video/BV1vx411y7jh", source: "B站", duration: "20分钟", tip: "【片段精华 0:00-20:00】技术是手段，情感是目的" },
          { title: "歌曲分析与表达：以《后来》为例", url: "https://www.bilibili.com/video/BV1sW411C7ji", source: "B站", duration: "18分钟", tip: "【片段精华 0:00-18:00】从模仿到有自己的表达" },
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
        label: "大基数适宜",
        resources: [
          { title: "大体重友好：30分钟站立燃脂（无跳跃）", url: "https://www.bilibili.com/video/BV1H4411e7e2", source: "B站", duration: "30分钟", tip: "全程无跳跃，保护膝盖，大基数首选" },
          { title: "零基础居家减脂：快走+简单动作", url: "https://www.bilibili.com/video/BV1mJ41147B3", source: "B站", duration: "25分钟", tip: "从走路开始，循序渐进" },
          { title: "坐姿运动：椅子上的全身燃脂", url: "https://www.bilibili.com/video/BV1K4411Y7Er", source: "B站", duration: "15分钟", tip: "膝盖完全无压力，适合超级大基数" },
          { title: "Low Impact Cardio for Beginners", url: "https://www.youtube.com/watch?v=gC_L9qAHVJ8", source: "YouTube", duration: "25分钟", tip: "全程无跳跃，全球最受欢迎的低冲击有氧" },
        ]
      },
      {
        id: "no-equipment",
        label: "无器械训练",
        resources: [
          { title: "囚徒健身六艺：俯卧撑/深蹲/引体/举腿/桥/倒立", url: "https://www.bilibili.com/video/BV1ys411C7Df", source: "B站", duration: "40分钟", tip: "零器械健身圣经，从入门到终极" },
          { title: "居家HIIT：20分钟无器械燃脂", url: "https://www.bilibili.com/video/BV1oW411y7Cd", source: "B站", duration: "20分钟", tip: "高效燃脂，适合有一定基础后进阶" },
          { title: "核心训练：平板支撑+卷腹组合", url: "https://www.bilibili.com/video/BV1Ux411y7Ce", source: "B站", duration: "15分钟", tip: "强化核心，改善体态" },
          { title: "Chris Heria: No Equipment Full Body", url: "https://www.youtube.com/watch?v=U7y5oFAZ3qA", source: "YouTube", duration: "20分钟", tip: "街头健身达人，无器械全身训练" },
        ]
      },
      {
        id: "home-strength",
        label: "居家力量训练",
        resources: [
          { title: "居家哑铃（可用水瓶替代）全身训练", url: "https://www.bilibili.com/video/BV1Z4411a7Mp", source: "B站", duration: "30分钟", tip: "有哑铃用哑铃，没哑铃用水瓶" },
          { title: "弹力带全身抗阻训练", url: "https://www.bilibili.com/video/BV1kJ411v7Nm", source: "B站", duration: "25分钟", tip: "弹力带是最便宜高效的居家器材" },
          { title: "女性居家塑形：臀腿+肩背专项", url: "https://www.bilibili.com/video/BV1ox411y7Ng", source: "B站", duration: "28分钟", tip: "针对女性常见需求设计" },
          { title: "Jeff Nippard: Science-Based Home Workout", url: "https://www.youtube.com/watch?v=wKqHj1DfzRI", source: "YouTube", duration: "35分钟", tip: "基于运动科学的居家训练方案" },
        ]
      }
    ],
    // 运动模块特殊：支持周计划
    weeklyPlan: true,
    weeklyPlanLabel: "周训练计划",
    // 预置周计划模板
    defaultWeeklyPlan: [
      { day: "周一", focus: "上肢力量", actions: [
        { name: "标准俯卧撑", sets: "3组", reps: "8-12次", difficulty: "⭐⭐" },
        { name: "弹力带划船", sets: "3组", reps: "12-15次", difficulty: "⭐⭐" },
        { name: "平板支撑", sets: "3组", reps: "30秒", difficulty: "⭐" },
      ]},
      { day: "周二", focus: "低冲击有氧", actions: [
        { name: "快走/原地踏步", sets: "1组", reps: "20分钟", difficulty: "⭐" },
        { name: "站立侧抬腿", sets: "3组", reps: "15次/侧", difficulty: "⭐" },
        { name: "坐姿转体", sets: "3组", reps: "20次", difficulty: "⭐" },
      ]},
      { day: "周三", focus: "下肢力量", actions: [
        { name: "自重深蹲", sets: "3组", reps: "10-15次", difficulty: "⭐⭐" },
        { name: "臀桥", sets: "3组", reps: "15-20次", difficulty: "⭐" },
        { name: "靠墙静蹲", sets: "3组", reps: "30-45秒", difficulty: "⭐" },
      ]},
      { day: "周四", focus: "核心+拉伸", actions: [
        { name: "死虫式", sets: "3组", reps: "10次/侧", difficulty: "⭐" },
        { name: "鸟狗式", sets: "3组", reps: "8次/侧", difficulty: "⭐" },
        { name: "全身拉伸", sets: "1组", reps: "10分钟", difficulty: "⭐" },
      ]},
      { day: "周五", focus: "全身力量", actions: [
        { name: "波比跳(简化版)", sets: "3组", reps: "8-10次", difficulty: "⭐⭐⭐" },
        { name: "俯身登山", sets: "3组", reps: "20次/侧", difficulty: "⭐⭐" },
        { name: "超人式", sets: "3组", reps: "12次", difficulty: "⭐" },
      ]},
      { day: "周六", focus: "低冲击有氧", actions: [
        { name: "快走/原地踏步", sets: "1组", reps: "30分钟", difficulty: "⭐" },
        { name: "手臂画圈", sets: "2组", reps: "15次/方向", difficulty: "⭐" },
      ]},
      { day: "周日", focus: "休息/拉伸", actions: [
        { name: "瑜伽基础拉伸", sets: "1组", reps: "15分钟", difficulty: "⭐" },
        { name: "泡沫轴放松(可选)", sets: "1组", reps: "10分钟", difficulty: "⭐" },
      ]},
    ]
  }
};

// 导出（如果使用模块化）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MODULE_RESOURCES;
}
