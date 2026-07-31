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
          { title: "硬笔书法零基础速成教程-基本笔画系列", url: "https://www.iqiyi.com/so/q_%E7%A1%AC%E7%AC%94%E4%B9%A6%E6%B3%95%E5%85%8D%E8%B4%B9%E6%95%99%E7%A8%8B", source: "爱奇艺", duration: "系列", tip: "从垂露竖到横折钩，每个笔画独立视频讲解" },
          { title: "硬笔书法基础练习：常用基本笔画规范写法", url: "https://m.ixigua.com/video/7042859389887185416", source: "西瓜视频", duration: "15分钟", tip: "老师逐笔示范28个基本笔画，跟练效果极佳" },
          { title: "硬笔基本笔画教学：竖弯钩详细讲解", url: "https://www.iqiyi.com/v_29zcf3zlwxc.html", source: "爱奇艺", duration: "8分钟", tip: "单笔画精讲，适合每天攻克一个笔画" },
          { title: "如何练好字——硬笔书法自学练字指南（附好书推荐）", url: "https://zhuanlan.zhihu.com/p/365532061", source: "知乎", duration: "图文", tip: "从选笔执笔到笔画章法的完整自学路线，知乎万赞" },
        ]
      },
      {
        id: "structure",
        label: "间架结构",
        unlockDays: 7,
        resources: [
          { title: "田英章间架结构28法精讲", url: "https://www.bilibili.com/cheese/play/ep2280307", source: "B站课堂", duration: "28课时", tip: "硬笔书法泰斗田英章系统课程，从笔画搭配到整体布局" },
          { title: "硬笔楷书间架结构58法", url: "https://www.bilibili.com/cheese/play/ep131212", source: "B站课堂", duration: "58课时", tip: "中国硬笔书协会员主讲，学员3万+，58种结构规律全覆盖" },
          { title: "硬笔书法超全面短横讲解（含结构技巧）", url: "https://m.ixigua.com/video/6984278432074957312", source: "西瓜视频", duration: "10分钟", tip: "从一个横画讲透间架结构的核心原理" },
        ]
      },
      {
        id: "layout",
        label: "章法布局",
        unlockDays: 21,
        resources: [
          { title: "如何练好字——硬笔书法自学练字指南（章法篇）", url: "https://zhuanlan.zhihu.com/p/365532061", source: "知乎", duration: "图文", tip: "从选纸落款到整体布局的章法完整指导" },
          { title: "硬笔书法网（字帖下载+章法教程）", url: "https://shufawang.cn/yingbi.html", source: "书法网", duration: "图文", tip: "免费字帖下载+章法布局系统教程" },
          { title: "硬笔书法视频教程大全（免费网盘）", url: "https://www.tgoos.com/17769", source: "网盘", duration: "合集", tip: "李放鸣、李天生等名家教程合集，含章法布局专题" },
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
          { title: "控笔技巧：素描基础控笔技巧训练", url: "https://www.douyin.com/video/7649697667246117745", source: "抖音", duration: "10分钟", tip: "380万播放，美术生都在练的控笔方法" },
          { title: "零基础学画画：控笔+抓型+临摹进阶练习素材", url: "https://www.douyin.com/video/7536126270494919972", source: "抖音", duration: "8分钟", tip: "暑假控笔练习合集，附练习素材" },
        ]
      },
      {
        id: "visual-perception",
        label: "视觉感知",
        unlockDays: 3,
        resources: [
          { title: "【4K】《像艺术家一样思考》：用右脑绘画（完整版117分钟）", url: "https://www.bilibili.com/video/BV1Bu411Z7eQ/", source: "B站", duration: "117分钟", tip: "8.8万播放/1.1万收藏🔥 贝蒂·艾德华经典教程：倒置临摹+盲画轮廓+阴形观察+显像板全套" },
          { title: "倒置临摹练习：把参考图倒过来画，屏蔽左脑符号化思维", url: "https://zhuanlan.zhihu.com/p/448598323", source: "知乎", duration: "图文", tip: "一次完整实践记录，选一张看不出是什么的图倒着临摹，启动右脑" },
          { title: "盲画轮廓练习（Blind Contour）：不看纸只看对象，训练真实边缘感知", url: "https://zhuanlan.zhihu.com/p/77942605", source: "知乎", duration: "图文", tip: "纯轮廓绘画方法详解：一笔画且不看纸，捕捉真实线条而非符号" },
          { title: "阴形（负空间）观察训练：画物体之间的空隙而非物体本身", url: "https://www.douban.com/note/692029798/", source: "豆瓣", duration: "图文", tip: "5个快速提升绘画水平的练习，核心是画空隙不画物体，颠覆认知" },
          { title: "显像板（取景框）使用法：将3D世界准确转化到2D平面", url: "https://book.douban.com/review/13470666/", source: "豆瓣", duration: "图文", tip: "DIY取景框步骤+五天实践全记录，等比例复制从此不难" },
        ]
      },
      {
        id: "shape",
        label: "抓形",
        unlockDays: 7,
        resources: [
          { title: "零基础自学画画50集（抓形篇）", url: "https://www.bilibili.com/video/BV1xc3B6jEP8/", source: "B站", duration: "50集", tip: "【第6-12集】几何概括法+负空间观察，快速抓准形体" },
          { title: "2026零基础人物素描完整攻略：三庭五眼、人体比例", url: "https://zhuanlan.zhihu.com/p/2061764613264372910", source: "知乎", duration: "图文", tip: "7天吃透人头比例，告别五官失衡、形体僵硬" },
        ]
      },
      {
        id: "copy",
        label: "临摹",
        unlockDays: 21,
        resources: [
          { title: "零基础自学画画50集（临摹篇）", url: "https://www.bilibili.com/video/BV1xc3B6jEP8/", source: "B站", duration: "50集", tip: "【第13-20集】五官临摹+大师作品临摹技巧" },
          { title: "全网最全盘点B站绘画区UP主推荐", url: "https://zhuanlan.zhihu.com/p/393783507", source: "知乎", duration: "图文", tip: "马克笔/素描/插画/板绘各领域顶流UP主汇总" },
        ]
      },
      {
        id: "color",
        label: "色彩",
        unlockDays: 45,
        resources: [
          { title: "零基础自学画画50集（色彩篇）", url: "https://www.bilibili.com/video/BV1xc3B6jEP8/", source: "B站", duration: "50集", tip: "【第21-30集】色彩理论基础+冷暖对比+配色实战" },
          { title: "B站12位绘画UP主推荐（含色彩类UP主）", url: "https://post.smzdm.com/p/ar6w36m7/", source: "什么值得买", duration: "图文", tip: "精选B站绘画教学UP主，含色彩与光影方向" },
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
          { title: "词根词缀背单词（英语学习第二期·睡前整理）", url: "https://www.bilibili.com/video/BV19N3q69EWD/", source: "B站", duration: "系列", tip: "2026年最新，7个词实战+8个方法背单词，一天一个词根" },
          { title: "15位B站英语UP主推荐（含单词记忆方向）", url: "https://zhuanlan.zhihu.com/p/581244412", source: "知乎", duration: "图文", tip: "涵盖语法/单词/阅读/听力，精选优质教学UP主" },
          { title: "词根词缀200讲（Bobo背单词）", url: "https://www.bilibili.com/cheese/play/ss63055", source: "B站课堂", duration: "200课时", tip: "全网30万粉丝UP主，200个词根词缀来源+衍生+例句" },
        ]
      },
      {
        id: "context",
        label: "语境例句",
        unlockDays: 14,
        resources: [
          { title: "词根词缀背单词（语境实战篇）", url: "https://www.bilibili.com/video/BV19N3q69EWD/", source: "B站", duration: "系列", tip: "每个词根配3个真实语境例句，学完就能用" },
          { title: "15位B站英语UP主（含阅读听力语境学习）", url: "https://zhuanlan.zhihu.com/p/581244412", source: "知乎", duration: "图文", tip: "在真实语境中积累词汇量" },
        ]
      },
      {
        id: "daily",
        label: "每日积累",
        unlockDays: 30,
        resources: [
          { title: "词根词缀背单词系列（持续更新）", url: "https://www.bilibili.com/video/BV19N3q69EWD/", source: "B站", duration: "系列", tip: "每天跟学一个词根，长期积累成为万词王" },
          { title: "600个词根词源精讲课（芳芳老师）", url: "https://www.bilibili.com/cheese/play/ss63831", source: "B站课堂", duration: "600课时", tip: "构建词汇网络，全面提升听说读写能力" },
          { title: "200个一定要学的英文词根词缀（视频带背）", url: "https://www.bilibili.com/cheese/play/ep292667", source: "B站课堂", duration: "200课时", tip: "100个常用词根+50前缀+50后缀，精选" },
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
          { title: "全122集零基础系统唱歌教学（腹式呼吸篇）", url: "https://www.bilibili.com/video/BV1F8326bExu/", source: "B站", duration: "122集", tip: "【片段精华 第3-5集】腹式呼吸技巧详解，吸气腹部外扩" },
          { title: "纯干货唱歌技巧：30天从零开始", url: "https://www.bilibili.com/video/BV1x8Eu6JE44/", source: "B站", duration: "系列", tip: "2026年6月新作，2400+播放，系统化唱歌教学" },
          { title: "B站教学唱歌UP主推荐合集", url: "https://www.zhihu.com/question/322911950", source: "知乎", duration: "图文", tip: "知乎高赞推荐，含各阶段声乐UP主汇总" },
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
          { title: "30个家庭哑铃增肌动作教学（含计划安排）·卓叔", url: "https://www.zhihu.com/tardis/bd/art/618012404", source: "知乎", duration: "图文", tip: "涵盖胸肩背腿手臂腹部，视频末附训练计划模板" },
          { title: "1个哑铃练全身！居家极简训练计划", url: "https://news.qq.com/rain/a/20250925A056HP00", source: "腾讯新闻", duration: "图文", tip: "一副哑铃练出完美线条，含热身+各部位动作详解" },
        ]
      },
      {
        id: "no-equipment",
        label: "自重力量训练",
        unlockDays: 14,
        resources: [
          { title: "30分钟居家全身力量训练", url: "https://www.bilibili.com/video/BV17fZWBVEDR/", source: "B站", duration: "30分钟", tip: "2026年2月发布，8kg哑铃跟练，1700+播放" },
          { title: "10个自重训练动作，在家练遍全身肌肉", url: "https://www.toutiao.com/article/7516841592880251407/", source: "头条", duration: "图文", tip: "从胸肩背到臀腿核心，渐进式训练体系" },
          { title: "无器械懒人健身攻略（上肢/下肢/核心）", url: "https://www.sohu.com/a/974169731_122553620", source: "搜狐", duration: "图文", tip: "每个动作的发力要点+常见误区+进阶变式" },
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
          { title: "一副哑铃练遍全身的万能攻略", url: "https://www.toutiao.com/article/7493078700183847436/", source: "头条", duration: "图文", tip: "哑铃深蹲/卧推/划船/弯举，动作要点全覆盖" },
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
