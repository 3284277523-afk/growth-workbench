// ============================================================
// 个人成长工作台 — 核心应用逻辑
// ============================================================

const App = (() => {
  const STORAGE_KEY = 'growth_workbench_data';
  const COIN_KEY = 'growth_workbench_coins';
  const VOCAB_KEY = 'growth_workbench_vocab';
  const QUOTE_KEY = 'growth_workbench_quote';
  const SIGNIN_KEY = 'growth_workbench_signin';
  const MODULES = ['schedule', 'news', 'finance', 'calligraphy', 'intake', 'drawing', 'expression', 'vocabulary', 'sports', 'singing'];
  let currentModule = 'schedule';

  // ---------- 每日好句 ----------
  const QUOTES = [
    { en: "The best time to plant a tree was 20 years ago. The second best time is now.", cn: "种一棵树最好的时间是十年前，其次是现在。" },
    { en: "Progress, not perfection.", cn: "追求进步，而非完美。" },
    { en: "Small steps every day lead to big results.", cn: "每天一小步，汇聚大成果。" },
    { en: "Consistency is more important than intensity.", cn: "坚持比强度更重要。" },
    { en: "Your future is created by what you do today.", cn: "你的未来由今天的行动创造。" },
    { en: "Don't watch the clock; do what it does. Keep going.", cn: "别盯着时钟看，要像它一样不停前行。" },
    { en: "Learning is a treasure that will follow its owner everywhere.", cn: "学问是跟随主人到任何地方的宝藏。" },
    { en: "It always seems impossible until it's done.", cn: "在完成之前，一切看起来都 impossible。" },
    { en: "Discipline is choosing between what you want now and what you want most.", cn: "自律是在即时满足与长远目标之间做选择。" },
    { en: "Success is the sum of small efforts repeated day in and day out.", cn: "成功是日复一日微小努力的总和。" },
    { en: "Be better than you were yesterday.", cn: "比昨天的自己更好。" },
    { en: "Focus on being productive instead of busy.", cn: "专注于有成效，而非看起来忙碌。" },
    { en: "Every expert was once a beginner.", cn: "每个专家都曾是初学者。" },
    { en: "Dream big. Start small. Act now.", cn: "敢想，从小处开始，立刻行动。" },
    { en: "A journey of a thousand miles begins with a single step.", cn: "千里之行，始于足下。" }
  ];

  // ---------- 今日待办数据 ----------
  const SCHEDULE = [
    { time: '06:00', icon: '🛏', title: '起床 + 喝水 + 拉伸', help: '唤醒身体，启动一天', module: 'schedule' },
    { time: '06:10', icon: '📖', title: '英语晨读 + 单词', help: '清晨记忆黄金期', module: 'vocabulary' },
    { time: '06:40', icon: '🥣', title: '做早餐 + 吃早餐', help: '补充能量', module: 'schedule' },
    { time: '07:00', icon: '✍', title: '练字', help: '早上手稳心静', module: 'calligraphy' },
    { time: '08:10', icon: '🎨', title: '画画主课', help: '光线好，精细动作最佳', module: 'drawing' },
    { time: '10:00', icon: '🎨', title: '画画第二练', help: '重复巩固进步更快', module: 'drawing' },
    { time: '11:00', icon: '📚', title: '看书 + 费曼输出', help: '输入后立刻输出', module: 'intake' },
    { time: '11:50', icon: '🍜', title: '午饭时间', help: '好好吃饭，补充能量', module: 'schedule' },
    { time: '12:30', icon: '🎧', title: '英语听力输入', help: '饭后放松浸泡语感', module: 'vocabulary' },
    { time: '13:00', icon: '📖', title: '英语主课', help: '逻辑记忆模式上线', module: 'vocabulary' },
    { time: '14:40', icon: '🏃', title: '力量训练', help: '下午体温高，训练效果最好', module: 'sports' },
    { time: '15:40', icon: '📖', title: '英语巩固', help: '艾宾浩斯复习黄金窗口', module: 'vocabulary' },
    { time: '16:30', icon: '💬', title: '表达力训练', help: '运动后精神好，适合开口', module: 'expression' },
    { time: '17:20', icon: '🍽️', title: '晚饭时间', help: '认真对待晚餐', module: 'schedule' },
    { time: '18:40', icon: '🚶', title: '饭后散步', help: '放松整理一天信息', module: 'schedule' },
    { time: '19:10', icon: '🎨', title: '画画自由创作', help: '白天学技，晚上表达', module: 'drawing' },
    { time: '20:10', icon: '🎵', title: '唱歌', help: '减压放松', module: 'singing' },
    { time: '20:40', icon: '📚', title: '深度阅读', help: '沉浸阅读更易入长期记忆', module: 'intake' },
    { time: '21:10', icon: '📝', title: '复盘 + 打卡', help: '没有复盘等于伪勤奋', module: 'schedule' },
    { time: '22:00', icon: '🚿', title: '洗澡 + 护肤', help: '认真对待自己', module: 'schedule' },
    { time: '22:30', icon: '🪥', title: '刷牙 + 口腔护理', help: '细节决定状态', module: 'schedule' },
    { time: '22:50', icon: '📵', title: '放下手机 + 放松', help: '助眠准备', module: 'schedule' },
    { time: '23:00', icon: '😴', title: '关灯睡觉', help: '7小时睡眠保证', module: 'schedule' }
  ];

  // ---------- 每日小技巧 ----------
  const MODULE_TIPS = {
    calligraphy: [
      '练字不在多，在精。每天认真写 10 个字胜过随意写 100 个。',
      '握笔要轻，手腕放松。紧绷的肌肉会传递到笔画中。',
      '临帖前先读帖 3 分钟：看笔画走向、间距、重心，心中有谱再下笔。',
      '悬腕比枕腕更难，但对腕力的锻炼效果翻倍，每天练 5 分钟悬腕。',
      '楷书练结构，行书练节奏，隶书练笔力——三体交替练进步更快。',
      '写完一个字，和字帖对比 3 个差异点，下次刻意纠正。',
      '用田字格/米字格练字，它能帮你快速找到笔画起止位置。',
      '字写好的关键是"布白均匀"——笔画之间的空白要大致相等。'
    ],
    drawing: [
      '画画最重要的不是天赋，是观察力。每天花 5 分钟仔细看一样东西。',
      '起稿前先画 3 条辅助线：水平中线、垂直中线、对角线，瞬间定位比例。',
      '画不像不是手的问题，是眼睛的问题。试着把对象看成几何形状的拼图。',
      '盲画练习每天 2 分钟：不看纸，眼睛慢慢扫过物体轮廓，手跟着移动。',
      '倒过来画是打破左脑符号系统最快的方法——颠倒后你看到的是形状而非"眼睛""鼻子"。',
      '负空间比正空间更容易画准。画椅子时，先画椅子腿之间的空隙。',
      '线条有轻重缓急：暗部重、亮部轻，远处虚、近处实。',
      '不要擦，不要擦，不要擦！错了的线也是观察过程，留着它能帮你修正。',
      '每天画一张速写，15 分钟以内，不求好看，只求抓住动态和比例。'
    ],
    vocabulary: [
      '背单词不要孤立记，用词根词缀法：1 个词根可以串起 10+ 个词。',
      '艾宾浩斯复习比背新词更重要。今天该复习的单词优先于今天的新词。',
      '用新学的单词造 3 个和你生活相关的句子，这样记得更牢。',
      '影子跟读时不要看字幕，耳朵听、嘴巴跟、大脑想——三管齐下。',
      '听不懂的地方不要立刻暂停查词，先听完整段，猜大意，第二遍再精听。',
      '口语练习最好的素材是你自己的经历。用英语描述今天发生的一件事。',
      '语法不用死记规则，找 3 个包含该语法的例句反复读，语感就来了。',
      '睡前听 10 分钟英语播客，语速不用快，坚持 30 天听力会有质变。'
    ],
    singing: [
      '唱歌前先练气息：深吸气 4 秒，憋 4 秒，慢呼 8 秒，重复 5 次。',
      '腹式呼吸是唱歌的基础——吸气时肚子鼓起而非胸口抬起。',
      '练音准先练单音：用钢琴 APP 弹一个音，跟着哼，直到完全一致。',
      '高音不是喊出来的，是"哼"出来的——找到头腔共鸣的嗡嗡感。',
      '咬字清晰度比音高更重要。练习绕口令能快速提升咬字能力。',
      '录音回听是最好的老师。每次练完录下来，用耳朵给自己当评委。',
      '唱歌时面部放松，眉毛不要皱——紧张的面部会影响声音的共鸣。'
    ],
    expression: [
      '开口前用 3 秒搭框架：我要说的观点是什么？用哪个例子支撑？结论是什么？',
      '每天找一件小事，用"观点+原因+案例+总结"结构说给镜子里的自己听。',
      '即兴表达的核心不是"说得多好"而是"不要冷场"——卡住了就换个角度再说。',
      '好的表达不是说得快，是说得清楚。每句话之间停顿 1 秒，效果翻倍。',
      '讲故事比讲道理更有说服力。把想说的道理包进一个小故事里。',
      '倾听是最好的表达准备。对方说完先复述一遍再回应，你瞬间显得专业。',
      '每天朗读一篇好文章 5 分钟，录音后对比原文，练语感和节奏。'
    ],
    intake: [
      '读完一章用费曼技巧输出：假装讲给 8 岁小孩听，讲不通的地方就是没真懂。',
      '深度阅读前关闭手机通知，25 分钟专注 + 5 分钟休息，一轮就够了。',
      '看书不做笔记 = 白看。至少每章写 3 个关键点 + 1 个行动计划。',
      '交替读不同领域的书（技术→人文→传记→商业），跨界连接产生新灵感。',
      '看纪录片时手边放笔记本，遇到触动点立刻暂停记下来，否则转瞬就忘。',
      '不是每本书都值得读完。前 50 页决定是否继续，不要被"必须读完"绑架。'
    ],
    sports: [
      '力量训练前先做 5 分钟动态拉伸：开合跳、肩绕环、髋关节环绕，预防受伤。',
      '动作质量 > 重量。宁可做 5 个标准俯卧撑，不要做 20 个变形俯卧撑。',
      '每组之间休息 60-90 秒，这是肌肉恢复的最佳窗口，太短太长都不好。',
      '练完喝一杯蛋白粉/牛奶，训练后 30 分钟内补充蛋白质吸收率最高。',
      '大基数减肥先别急着跑步，从快走开始，保护膝盖比消耗热量更重要。',
      '核心训练不是只做卷腹。平板支撑、死虫式、鸟狗式同样重要。',
      '每周至少休息 1 天，肌肉在休息时生长，不是在训练时。'
    ]
  };

  function getDailyTip(module) {
    const tips = MODULE_TIPS[module];
    if (!tips || !tips.length) return null;
    const today = formatDate(new Date());
    const seed = parseInt(today.replace(/-/g, '')) || 0;
    const idx = seed % tips.length;
    return tips[idx];
  }

  // ---------- 奖励商店 ----------
  const REWARD_SHOP = [
    { id: 'r1', name: '🍰 小蛋糕', cost: 30, icon: '🍰', desc: '犒劳自己' },
    { id: 'r2', name: '🎬 看电影', cost: 50, icon: '🎬', desc: '放松一晚' },
    { id: 'r3', name: '🛍 小物件', cost: 80, icon: '🛍', desc: '不超过30元' },
    { id: 'r4', name: '🍕 一顿大餐', cost: 150, icon: '🍕', desc: '想吃的那家' },
    { id: 'r5', name: '🎮 游戏2小时', cost: 100, icon: '🎮', desc: '尽情玩' },
    { id: 'r6', name: '📱 刷视频30分', cost: 20, icon: '📱', desc: '无罪恶感' },
    { id: 'r7', name: '🛋 懒散半天', cost: 200, icon: '🛋', desc: '什么都不做' },
    { id: 'r8', name: '🎁 大奖励', cost: 300, icon: '🎁', desc: '100元+心仪物' }
  ];

  // ---------- 工具函数 ----------
  function formatDate(d) {
    const date = d instanceof Date ? d : new Date(d);
    return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
  }

  function formatTime(date) {
    const d = new Date(date);
    return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  }

  function toast(msg) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2500);
  }

  // ---------- 金币系统 ----------
  function getCoinData() {
    try {
      const raw = localStorage.getItem(COIN_KEY);
      return raw ? JSON.parse(raw) : { balance: 0, history: [], redeemed: [] };
    } catch { return { balance: 0, history: [], redeemed: [] }; }
  }

  function saveCoinData(data) { localStorage.setItem(COIN_KEY, JSON.stringify(data)); }

  function addCoins(amount, reason) {
    const data = getCoinData();
    data.balance += amount;
    data.history.unshift({ amount, reason, time: new Date().toISOString() });
    if (data.history.length > 100) data.history.length = 100;
    saveCoinData(data);
    updateCoinDisplay();
    return data.balance;
  }

  function redeemReward(rewardId) {
    const reward = REWARD_SHOP.find(r => r.id === rewardId);
    if (!reward) return false;
    const data = getCoinData();
    if (data.balance < reward.cost) return false;
    data.balance -= reward.cost;
    data.redeemed.unshift({ ...reward, time: new Date().toISOString() });
    saveCoinData(data);
    updateCoinDisplay();
    return true;
  }

  function updateCoinDisplay() {
    const data = getCoinData();
    const el = document.getElementById('coin-balance');
    if (el) el.textContent = data.balance;
  }

  // ---------- 数据管理 ----------
  function getData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const data = raw ? JSON.parse(raw) : {};
      MODULES.forEach(m => { if (!data[m]) data[m] = { checkins: [] }; });
      return data;
    } catch { return {}; }
  }

  function saveData(data) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
  function getModuleData(module) { return getData()[module] || { checkins: [] }; }

  function addCheckin(module, entry) {
    const data = getData();
    if (!data[module]) data[module] = { checkins: [] };
    data[module].checkins.unshift({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8), ...entry });
    saveData(data);
  }

  function deleteCheckin(module, id) {
    const data = getData();
    if (!data[module]) return;
    data[module].checkins = data[module].checkins.filter(c => c.id !== id);
    saveData(data);
  }

  // ---------- 统计 ----------
  function getStats(module) {
    const data = getModuleData(module);
    const checkins = data.checkins || [];
    const totalDuration = checkins.reduce((s, c) => s + (c.duration || 0), 0);
    const totalCount = checkins.length;

    let streak = 0;
    const sortedDates = [...new Set(checkins.map(c => formatDate(c.date)))].sort().reverse();
    let checkDate = new Date();
    for (const ds of sortedDates) {
      if (ds === formatDate(checkDate)) { streak++; checkDate.setDate(checkDate.getDate() - 1); }
      else break;
    }

    let totalWords = 0;
    if (module === 'vocabulary') totalWords = checkins.reduce((s, c) => s + (c.count || 0), 0);
    return { totalDuration, totalCount, streak, totalWords };
  }

  // ---------- 阶段解锁 ----------
  function getStageStatus(module) {
    const res = MODULE_RESOURCES[module];
    const stats = getStats(module);
    const totalDays = stats.totalCount;
    let currentStageIdx = 0;
    let unlockedStages = [];

    res.stages.forEach((stage, idx) => {
      if (totalDays >= (stage.unlockDays || 0)) {
        unlockedStages.push(idx);
        currentStageIdx = idx;
      }
    });

    return { currentStageIdx, unlockedStages, totalDays };
  }

  function getDailyPick(module) {
    const res = MODULE_RESOURCES[module];
    const stats = getStageStatus(module);
    const currentStage = res.stages[stats.currentStageIdx];
    if (!currentStage || !currentStage.resources.length) return null;
    const today = formatDate(new Date());
    const seed = today.split('-').join('');
    const idx = parseInt(seed) % currentStage.resources.length;
    return { stage: currentStage, resource: currentStage.resources[idx] };
  }

  // ---------- 每日好句 ----------
  function renderDailyQuote() {
    const today = formatDate(new Date());
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(QUOTE_KEY) || '{}'); } catch(e) {}
    let quote;
    if (saved.date === today) {
      quote = QUOTES[saved.index || 0];
    } else {
      const idx = Math.floor(Math.random() * QUOTES.length);
      quote = QUOTES[idx];
      localStorage.setItem(QUOTE_KEY, JSON.stringify({ date: today, index: idx }));
    }
    const enEl = document.getElementById('daily-en');
    const cnEl = document.getElementById('daily-cn');
    if (enEl) enEl.textContent = quote.en;
    if (cnEl) cnEl.textContent = quote.cn;
  }

  // ---------- 每日签到 ----------
  function getSigninData() {
    try {
      const raw = localStorage.getItem(SIGNIN_KEY);
      return raw ? JSON.parse(raw) : { dates: [], streak: 0, lastDate: null };
    } catch { return { dates: [], streak: 0, lastDate: null }; }
  }

  function saveSigninData(data) { localStorage.setItem(SIGNIN_KEY, JSON.stringify(data)); }

  function isTodaySigned() {
    const data = getSigninData();
    return data.lastDate === formatDate(new Date());
  }

  function doSignin() {
    if (isTodaySigned()) return false;
    const today = formatDate(new Date());
    const data = getSigninData();
    data.dates.push(today);
    data.lastDate = today;

    // 计算连续签到
    const yesterday = formatDate(new Date(Date.now() - 86400000));
    if (data.dates.includes(yesterday) || data.streak === 0) {
      data.streak++;
    } else {
      data.streak = 1;
    }
    saveSigninData(data);

    // 金币奖励：基础5 + 连续加成（每连签1天+1，上限+10）
    const bonus = Math.min(data.streak, 10);
    const total = 5 + bonus;
    addCoins(total, '每日签到 · 连续' + data.streak + '天');
    toast('✅ 签到成功！+'+total+'💰（连续'+data.streak+'天）');
    return true;
  }

  function renderSigninSection() {
    const signed = isTodaySigned();
    const data = getSigninData();

    // 最近7天签到格子
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      days.push(formatDate(d));
    }

    let html = '<div class="panel signin-panel"><div class="panel-header">🗓️ 每日签到</div><div class="panel-body">';
    html += '<div class="signin-row">';

    // 签到格子
    html += '<div class="signin-grid">';
    const weekLabels = ['一','二','三','四','五','六','日'];
    days.forEach((ds, i) => {
      const isToday = ds === formatDate(new Date());
      const isSigned = data.dates.includes(ds);
      const d = new Date(ds);
      html += '<div class="signin-cell' + (isSigned ? ' signed' : '') + (isToday ? ' today' : '') + '">';
      html += '<div class="signin-day">' + weekLabels[d.getDay() === 0 ? 6 : d.getDay() - 1] + '</div>';
      html += '<div class="signin-date">' + d.getDate() + '</div>';
      html += '<div class="signin-icon">' + (isSigned ? '✓' : '') + '</div>';
      html += '</div>';
    });
    html += '</div>';

    // 签到按钮
    html += '<div class="signin-action">';
    html += '<div class="signin-streak">🔥 连续 <strong>' + data.streak + '</strong> 天</div>';
    html += '<button class="btn btn-primary signin-btn' + (signed ? ' done' : '') + '" id="btn-signin"' + (signed ? ' disabled' : '') + '>';
    html += signed ? '✅ 今日已签到' : '✍️ 签到领金币';
    html += '</button>';
    html += '<div class="signin-hint">' + (signed ? '明天继续！连签越久金币越多' : '签到 +5💰，连签每天多+1💰（上限+10）') + '</div>';
    html += '</div>';

    html += '</div></div></div>';
    return html;
  }

  function bindSigninEvents() {
    const btn = document.getElementById('btn-signin');
    if (!btn || btn.disabled) return;
    btn.addEventListener('click', () => {
      const success = doSignin();
      if (success) {
        btn.textContent = '✅ 今日已签到';
        btn.classList.add('done');
        btn.disabled = true;
        // 更新格子
        document.querySelectorAll('.signin-cell').forEach(cell => {
          const dateEl = cell.querySelector('.signin-date');
          if (dateEl && dateEl.textContent == new Date().getDate()) {
            cell.classList.add('signed');
            cell.querySelector('.signin-icon').textContent = '✓';
          }
        });
        document.querySelector('.signin-streak strong').textContent = getSigninData().streak;
        document.querySelector('.signin-hint').textContent = '明天继续！连签越久金币越多';
      }
    });
  }

  // ---------- 日历 ----------
  function renderCalendar(container) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startWeekday = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    let html = '<div class="calendar-header">' + (month + 1) + '月 ' + year + '</div>';
    html += '<div class="calendar-grid">';
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    weekdays.forEach(w => html += '<div class="calendar-weekday">' + w + '</div>');

    const prevLastDay = new Date(year, month, 0).getDate();
    for (let i = startWeekday - 1; i >= 0; i--) {
      html += '<div class="calendar-day other">' + (prevLastDay - i) + '</div>';
    }

    const todayStr = formatDate(today);
    for (let d = 1; d <= daysInMonth; d++) {
      const ds = formatDate(new Date(year, month, d));
      html += '<div class="calendar-day ' + (ds === todayStr ? 'today' : '') + '">' + d + '</div>';
    }

    const remaining = (7 - ((startWeekday + daysInMonth) % 7)) % 7;
    for (let d = 1; d <= remaining; d++) {
      html += '<div class="calendar-day other">' + d + '</div>';
    }

    html += '</div>';
    container.innerHTML = html;
  }

  // ---------- 今日待办 ----------
  function renderSchedule() {
    const main = document.getElementById('main-content');
    let html = '<div class="module-header"><h2>📋 每日计划</h2><p class="module-desc">根据日程生成的今日待办</p></div>';

    // 每日签到
    html += renderSigninSection();

    html += '<div class="daily-overview">';

    // 待办列表
    html += '<div class="todo-list">';
    SCHEDULE.forEach((item, idx) => {
      html += '<div class="todo-item" data-todo="' + idx + '">';
      html += '<div class="todo-time">' + item.time + '</div>';
      html += '<div class="todo-icon">' + item.icon + '</div>';
      html += '<div class="todo-body"><div class="todo-title">' + item.title + '</div><div class="todo-help">' + item.help + '</div></div>';
      html += '<div class="todo-check" data-check="' + idx + '"></div>';
      html += '</div>';
    });
    html += '</div>';

    // 日历
    html += '<div class="panel calendar-panel"><div class="panel-header">📅 本月日历</div><div class="panel-body"><div id="mini-calendar"></div></div></div>';

    html += '</div>';

    main.innerHTML = html;

    bindSigninEvents();

    // 恢复打卡状态
    const done = getData().todos || [];
    done.forEach(idx => {
      const el = document.querySelector('[data-check="' + idx + '"]');
      if (el) el.classList.add('done');
    });

    // 点击切换
    document.querySelectorAll('.todo-check').forEach(el => {
      el.addEventListener('click', () => {
        const idx = el.getAttribute('data-check');
        const data = getData();
        if (!data.todos) data.todos = [];
        if (data.todos.includes(idx)) {
          data.todos = data.todos.filter(i => i !== idx);
          el.classList.remove('done');
        } else {
          data.todos.push(idx);
          el.classList.add('done');
          // 完成待办给金币
          addCoins(2, '完成待办：' + SCHEDULE[idx].title);
        }
        saveData(data);
      });
    });

    renderCalendar(document.getElementById('mini-calendar'));
    document.addEventListener('keydown', handleKeyboard);
  }

  // ---------- 单词本 ----------
  function getVocabData() {
    try {
      const raw = localStorage.getItem(VOCAB_KEY);
      return raw ? JSON.parse(raw) : { words: [] };
    } catch { return { words: [] }; }
  }

  function saveVocabData(data) { localStorage.setItem(VOCAB_KEY, JSON.stringify(data)); }

  function getReviewStatus(word) {
    if (!word.learnedAt) return 'new';
    const intervals = [1, 2, 4, 7, 15];
    const learned = new Date(word.learnedAt);
    const today = new Date();
    const daysDiff = Math.floor((today - learned) / 86400000);
    for (const interval of intervals) {
      if (daysDiff >= interval && (!word.reviewedAt || new Date(word.reviewedAt) < new Date(word.learnedAt).setDate(learned.getDate() + interval))) {
        return 'review';
      }
    }
    return 'ok';
  }

  function speak(text, lang) {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang || 'en-US';
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    } else {
      toast('当前设备不支持朗读');
    }
  }

  function renderVocabulary() {
    const main = document.getElementById('main-content');
    const stats = getStats('vocabulary');
    const vocab = getVocabData();
    const reviewCount = vocab.words.filter(w => getReviewStatus(w) === 'review').length;
    const todayCount = vocab.words.filter(w => formatDate(w.createdAt || new Date()) === formatDate(new Date())).length;

    let html = '<div class="module-header"><h2>📚 英语学习</h2><p class="module-desc">单词本 · 艾宾浩斯复习提醒</p></div>';

    // 每日小技巧
    const vocabTip = getDailyTip('vocabulary');
    if (vocabTip) html += '<div class="daily-tip">💡 ' + vocabTip + '</div>';

    // 统计卡片（截图风格：两个绿色大数字卡片）
    html += '<div class="vocab-header">';
    html += '<div class="vocab-stat"><div class="vocab-stat-value">' + stats.totalCount + '</div><div class="vocab-stat-label">累计学习天数</div></div>';
    html += '<div class="vocab-stat"><div class="vocab-stat-value">' + vocab.words.length + '</div><div class="vocab-stat-label">累计学习单词</div></div>';
    html += '</div>';

    // 今日新词列表（截图风格）
    html += '<div class="panel">';
    html += '<div class="panel-body">';
    html += '<div class="vocab-section-header">';
    html += '<div class="vocab-section-title">📖 今日新词 <span class="vocab-count">' + todayCount + '</span></div>';
    html += '<button class="btn btn-sm btn-learn" id="btn-mark-all">标记已学</button>';
    html += '</div>';

    // 添加单词（折叠在列表上方）
    html += '<div class="word-form"><input type="text" id="vocab-word" placeholder="英文单词"><input type="text" id="vocab-phonetic" placeholder="音标"><input type="text" id="vocab-meaning" placeholder="中文意思"><button class="btn btn-primary" id="btn-add-word">添加</button></div>';

    html += '<div class="word-list" id="word-list">';
    if (vocab.words.length === 0) {
      html += '<div class="empty-state">还没有单词，添加一个开始吧</div>';
    } else {
      // 今日新词在前，复习单词在后
      const sorted = vocab.words.slice().sort((a, b) => {
        const sa = getReviewStatus(a), sb = getReviewStatus(b);
        if (sa === 'new' && sb !== 'new') return -1;
        if (sa !== 'new' && sb === 'new') return 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      sorted.forEach(word => {
        const status = getReviewStatus(word);
        const isNew = status === 'new';
        html += '<div class="word-item">';
        html += '<span class="word-star' + (word.star ? ' active' : '') + '" data-star="' + word.id + '">⭐</span>';
        html += '<div class="word-main"><div class="word-term">' + word.term + '</div>' + (word.phonetic ? '<div class="word-phonetic">' + word.phonetic + '</div>' : '') + '<div class="word-meaning">' + word.meaning + '</div></div>';
        if (!isNew && status === 'review') html += '<span class="word-review">需复习</span>';
        html += '<div class="word-actions">';
        html += '<button class="btn btn-sm" data-speak="' + word.term + '">🔊 朗读</button>';
        html += '<button class="btn btn-sm" data-speak="' + word.term + '" data-lang="en-US">🎤 跟读</button>';
        html += '<button class="btn btn-sm btn-learn" data-learn="' + word.id + '">' + (isNew ? '标记已学' : '复习完成') + '</button>';
        html += '<button class="btn btn-sm btn-ghost" data-del-word="' + word.id + '">✕</button>';
        html += '</div>';
        html += '</div>';
      });
    }
    html += '</div></div></div>';

    // 打卡面板（精简）
    html += '<div class="panel"><div class="panel-header">📝 今日打卡</div><div class="panel-body"><form id="checkin-form" onsubmit="return false;"><div class="form-row"><div class="form-group"><label>学习时长（分钟）</label><input type="number" id="checkin-duration" min="1" max="480" value="30"></div><div class="form-group"><label>单词数量</label><input type="number" id="checkin-count" min="1" max="500" value="20"></div></div><button type="button" class="btn btn-primary" id="btn-checkin">✓ 打卡</button></form></div></div>';

    // 今日推荐
    const dailyPick = getDailyPick('vocabulary');
    if (dailyPick) {
      html += '<div class="panel"><div class="panel-header">⭐ 今日推荐 · ' + dailyPick.stage.label + '</div><div class="panel-body"><div class="resource-item"><a href="' + dailyPick.resource.url + '" target="_blank">' + dailyPick.resource.title + '</a><div class="resource-meta"><span>' + dailyPick.resource.source + '</span><span>' + dailyPick.resource.duration + '</span></div><div class="resource-tip">💡 ' + dailyPick.resource.tip + '</div></div></div></div>';
    }

    // 阶段资源（词根/听力/口语/语法/沉浸 全部显示，未解锁置灰）
    const vocabRes = MODULE_RESOURCES['vocabulary'];
    const vocabStageStatus = getStageStatus('vocabulary');
    html += '<div class="panel"><div class="panel-header">📚 英语学习路径 · 已打卡 ' + vocabStageStatus.totalDays + ' 次</div><div class="panel-body">';
    vocabRes.stages.forEach((stage, idx) => {
      const isUnlocked = vocabStageStatus.unlockedStages.includes(idx);
      if (isUnlocked) {
        html += '<div class="stage-section"><div class="stage-header"><span class="stage-badge">' + stage.label + '</span><h4>阶段 ' + (idx + 1) + '</h4></div><div class="resource-list">';
        stage.resources.forEach(r => {
          html += '<div class="resource-item"><a href="' + r.url + '" target="_blank">' + r.title + '</a><div class="resource-meta"><span>' + r.source + '</span><span>' + r.duration + '</span></div><div class="resource-tip">💡 ' + r.tip + '</div></div>';
        });
        html += '</div></div>';
      } else {
        html += '<div class="stage-section stage-locked"><div class="stage-header"><span class="stage-badge">🔒 ' + stage.label + '</span><h4>阶段 ' + (idx + 1) + '</h4></div><div class="stage-lock-hint">需打卡 ' + stage.unlockDays + ' 天解锁</div></div>';
      }
    });
    html += '</div></div>';

    main.innerHTML = html;

    // 事件绑定
    document.getElementById('btn-checkin').addEventListener('click', () => handleCheckin('vocabulary'));

    document.getElementById('btn-mark-all').addEventListener('click', () => {
      const data = getVocabData();
      let marked = 0;
      data.words.forEach(w => {
        if (getReviewStatus(w) === 'new') {
          w.learnedAt = new Date().toISOString();
          w.reviewedAt = new Date().toISOString();
          marked++;
        }
      });
      if (marked > 0) {
        saveVocabData(data);
        renderVocabulary();
        toast('已标记 ' + marked + ' 个单词已学');
      } else {
        toast('没有新词可标记');
      }
    });

    document.getElementById('btn-add-word').addEventListener('click', () => {
      const term = document.getElementById('vocab-word').value.trim();
      const phonetic = document.getElementById('vocab-phonetic').value.trim();
      const meaning = document.getElementById('vocab-meaning').value.trim();
      if (!term || !meaning) { toast('请输入单词和意思'); return; }
      const data = getVocabData();
      data.words.push({ id: Date.now().toString(36), term, phonetic, meaning, createdAt: new Date().toISOString() });
      saveVocabData(data);
      renderVocabulary();
      toast('已添加：' + term);
    });

    document.querySelectorAll('[data-star]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-star');
        const data = getVocabData();
        const word = data.words.find(w => w.id === id);
        if (word) { word.star = !word.star; saveVocabData(data); renderVocabulary(); }
      });
    });

    document.querySelectorAll('[data-speak]').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-speak');
        const lang = btn.getAttribute('data-lang');
        speak(text, lang);
      });
    });

    document.querySelectorAll('[data-learn]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-learn');
        const data = getVocabData();
        const word = data.words.find(w => w.id === id);
        if (word) {
          word.learnedAt = new Date().toISOString();
          word.reviewedAt = new Date().toISOString();
          saveVocabData(data);
          renderVocabulary();
          toast('已学：' + word.term);
        }
      });
    });

    document.querySelectorAll('[data-del-word]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-del-word');
        const data = getVocabData();
        data.words = data.words.filter(w => w.id !== id);
        saveVocabData(data);
        renderVocabulary();
        toast('已删除');
      });
    });

    document.addEventListener('keydown', handleKeyboard);
  }

  // ---------- 通用模块渲染 ----------
  function renderModule(module) {
    currentModule = module;
    if (module === 'schedule') { renderSchedule(); return; }
    if (module === 'finance') { renderFinance(); return; }
    if (module === 'news') { renderNews(); return; }
    if (module === 'vocabulary') { renderVocabulary(); return; }

    const res = MODULE_RESOURCES[module];
    const stats = getStats(module);
    const main = document.getElementById('main-content');

    let html = '<div class="module-header"><h2>' + res.icon + ' ' + res.name + '</h2><p class="module-desc">' + getModuleDesc(module) + '</p></div>';

    // 每日小技巧
    const tip = getDailyTip(module);
    if (tip) html += '<div class="daily-tip">💡 ' + tip + '</div>';

    html += '<div class="stats-row">';
    html += '<div class="stat-card"><div class="stat-label">连续打卡</div><div class="stat-value">' + stats.streak + '<span class="stat-unit">天</span></div></div>';
    html += '<div class="stat-card"><div class="stat-label">累计时长</div><div class="stat-value">' + stats.totalDuration + '<span class="stat-unit">分钟</span></div></div>';
    html += '<div class="stat-card"><div class="stat-label">总次数</div><div class="stat-value">' + stats.totalCount + '<span class="stat-unit">次</span></div></div>';
    html += '<div class="stat-card"><div class="stat-label">金币</div><div class="stat-value" id="module-coins">' + getCoinData().balance + '</div></div>';
    html += '</div>';

    // 打卡
    html += '<div class="panel"><div class="panel-header">📝 今日打卡</div><div class="panel-body"><form id="checkin-form" onsubmit="return false;"><div class="form-row"><div class="form-group"><label>学习时长（分钟）</label><input type="number" id="checkin-duration" min="1" max="480" value="30"></div><div class="form-group"><label>日期</label><input type="date" id="checkin-date" value="' + formatDate(new Date()) + '"></div></div>';
    if (module === 'calligraphy' || module === 'drawing') {
      html += '<div class="form-group"><label>成果图片</label><input type="file" id="checkin-images" accept="image/*" multiple></div>';
    }
    html += '<div class="form-group"><label>备注</label><textarea id="checkin-note" placeholder="记录今天的学习心得..."></textarea></div><button type="button" class="btn btn-primary" id="btn-checkin">✓ 打卡</button></form></div></div>';

    // 今日推荐
    const dailyPick = getDailyPick(module);
    if (dailyPick) {
      html += '<div class="panel"><div class="panel-header">⭐ 今日推荐 · ' + dailyPick.stage.label + '</div><div class="panel-body"><div class="resource-item"><a href="' + dailyPick.resource.url + '" target="_blank">' + dailyPick.resource.title + '</a><div class="resource-meta"><span>' + dailyPick.resource.source + '</span><span>' + dailyPick.resource.duration + '</span></div><div class="resource-tip">💡 ' + dailyPick.resource.tip + '</div></div></div></div>';
    }

    // 阶段资源（未解锁阶段置灰显示）
    const stageStatus = getStageStatus(module);
    html += '<div class="panel"><div class="panel-header">📚 学习资源 · 已打卡 ' + stageStatus.totalDays + ' 次</div><div class="panel-body">';
    res.stages.forEach((stage, idx) => {
      const isUnlocked = stageStatus.unlockedStages.includes(idx);
      if (isUnlocked) {
        html += '<div class="stage-section"><div class="stage-header"><span class="stage-badge">' + stage.label + '</span><h4>阶段 ' + (idx + 1) + '</h4></div><div class="resource-list">';
        stage.resources.forEach(r => {
          html += '<div class="resource-item"><a href="' + r.url + '" target="_blank">' + r.title + '</a><div class="resource-meta"><span>' + r.source + '</span><span>' + r.duration + '</span></div><div class="resource-tip">💡 ' + r.tip + '</div></div>';
        });
        html += '</div></div>';
      } else {
        html += '<div class="stage-section stage-locked"><div class="stage-header"><span class="stage-badge">🔒 ' + stage.label + '</span><h4>阶段 ' + (idx + 1) + '</h4></div><div class="stage-lock-hint">需打卡 ' + stage.unlockDays + ' 天解锁</div></div>';
      }
    });
    html += '</div></div>';

    // 打卡历史
    const checkins = getModuleData(module).checkins || [];
    html += '<div class="panel"><div class="panel-header">📋 打卡历史 · ' + checkins.length + ' 条</div><div class="panel-body">';
    if (checkins.length === 0) {
      html += '<div class="empty-state"><div class="empty-icon">📭</div><p>还没有打卡记录</p></div>';
    } else {
      html += '<div class="checkin-list">';
      checkins.forEach(c => {
        const imgs = c.images || [];
        html += '<div class="checkin-item">' + (imgs.length > 0 ? '<img class="checkin-thumb" src="' + imgs[0] + '">' : '') + '<div class="checkin-info"><div class="date">' + formatDate(c.date) + ' ' + (c.time || '') + '</div><div class="duration">' + (c.duration || 0) + ' 分钟</div>' + (c.note ? '<div class="note">' + c.note + '</div>' : '') + '</div><button class="btn btn-ghost btn-sm" data-delete="' + c.id + '">✕</button></div>';
      });
      html += '</div>';
    }
    html += '</div></div>';

    main.innerHTML = html;
    bindEvents(module);
    document.addEventListener('keydown', handleKeyboard);
  }

  // ---------- 记账 ----------
  function renderFinance() {
    const main = document.getElementById('main-content');
    const today = formatDate(new Date());
    const data = getData();
    if (!data.finance) data.finance = { records: [] };
    const records = data.finance.records || [];
    const todayRecords = records.filter(r => r.date === today);
    const todayIncome = todayRecords.filter(r => r.type === 'income').reduce((s, r) => s + r.amount, 0);
    const todayExpense = todayRecords.filter(r => r.type === 'expense').reduce((s, r) => s + r.amount, 0);
    const monthStart = today.slice(0, 7) + '-01';
    const monthRecords = records.filter(r => r.date >= monthStart);
    const monthIncome = monthRecords.filter(r => r.type === 'income').reduce((s, r) => s + r.amount, 0);
    const monthExpense = monthRecords.filter(r => r.type === 'expense').reduce((s, r) => s + r.amount, 0);

    let html = '<div class="module-header"><h2>💰 记账</h2><p class="module-desc">记录收支 · 银行卡/支付宝/微信/现金</p></div>';

    html += '<div class="stats-row">';
    html += '<div class="stat-card"><div class="stat-label">本月收入</div><div class="stat-value" style="color:var(--success)">' + monthIncome + '</div></div>';
    html += '<div class="stat-card"><div class="stat-label">本月支出</div><div class="stat-value" style="color:var(--danger)">' + monthExpense + '</div></div>';
    html += '<div class="stat-card"><div class="stat-label">今日支出</div><div class="stat-value" style="color:var(--danger)">' + todayExpense + '</div></div>';
    html += '<div class="stat-card"><div class="stat-label">今日收入</div><div class="stat-value" style="color:var(--success)">' + todayIncome + '</div></div>';
    html += '</div>';

    html += '<div class="panel"><div class="panel-header">📝 快速记账 · ' + today + '</div><div class="panel-body"><div class="finance-form"><div class="finance-type-toggle"><button class="finance-type-btn active" data-ftype="expense">💸 支出</button><button class="finance-type-btn" data-ftype="income">💰 收入</button></div><div class="form-group"><label>🔗 粘贴商品链接</label><div style="display:flex;gap:8px"><input type="text" id="fin-link" placeholder="粘贴淘宝/京东链接..." style="flex:1"><button class="btn btn-sm" id="btn-fetch-link">识别</button></div><div id="link-preview" style="margin-top:8px;display:none"></div></div><div class="form-row"><div class="form-group" style="flex:2"><label>金额</label><input type="number" id="fin-amount" placeholder="0.00" min="0.01" step="0.01"></div><div class="form-group" style="flex:1"><label>日期</label><input type="date" id="fin-date" value="' + today + '"></div></div><div class="form-row"><div class="form-group"><label>分类</label><select id="fin-category"></select></div><div class="form-group"><label>支付方式</label><select id="fin-payment"><option value="wechat">🟢 微信</option><option value="alipay">🔵 支付宝</option><option value="card">💳 银行卡</option><option value="cash">💵 现金</option></select></div></div><div class="form-row"><div class="form-group" style="flex:2"><label>备注</label><input type="text" id="fin-note" placeholder="买了什么..."></div><div class="form-group" style="flex:1"><label>图片</label><input type="file" id="fin-image" accept="image/*"></div></div><button class="btn btn-primary" id="btn-add-finance">✓ 记录</button></div></div></div>';

    html += '<div class="panel"><div class="panel-header">📋 今日记录</div><div class="panel-body">';
    if (todayRecords.length === 0) {
      html += '<div class="empty-state">今天还没有记账</div>';
    } else {
      html += '<div class="finance-list">';
      todayRecords.forEach(r => {
        const payLabels = { card: '💳', alipay: '🔵', wechat: '🟢', cash: '💵' };
        html += '<div class="finance-item"><div class="finance-item-left"><span class="finance-cat-icon">' + r.categoryIcon + '</span><div><div>' + r.category + ' ' + (payLabels[r.payment] || '') + '</div>' + (r.note ? '<div style="font-size:0.75rem;color:var(--text-muted)">' + r.note + '</div>' : '') + '</div></div><div class="finance-item-amount ' + (r.type === 'income' ? 'finance-income' : 'finance-expense') + '">' + (r.type === 'income' ? '+' : '-') + r.amount.toFixed(2) + '</div></div>';
      });
      html += '</div>';
    }
    html += '</div></div>';

    main.innerHTML = html;
    bindFinanceEvents();
    document.addEventListener('keydown', handleKeyboard);
  }

  function bindFinanceEvents() {
    let financeType = 'expense';
    let capturedImage = null;

    const expenseCategories = [
      { icon: '🍜', name: '餐饮' }, { icon: '🚌', name: '交通' }, { icon: '🛒', name: '购物' },
      { icon: '🏠', name: '住房' }, { icon: '📱', name: '通讯' }, { icon: '🎮', name: '娱乐' },
      { icon: '📚', name: '学习' }, { icon: '💊', name: '医疗' }, { icon: '👔', name: '服饰' },
      { icon: '🎁', name: '人情' }, { icon: '📦', name: '其他' }
    ];
    const incomeCategories = [
      { icon: '💼', name: '工资' }, { icon: '🎯', name: '兼职' }, { icon: '📈', name: '理财' },
      { icon: '🎁', name: '红包' }, { icon: '💰', name: '退款' }, { icon: '📦', name: '其他' }
    ];

    function updateCategorySelect() {
      const sel = document.getElementById('fin-category');
      const cats = financeType === 'expense' ? expenseCategories : incomeCategories;
      sel.innerHTML = cats.map(c => '<option value="' + c.name + '" data-icon="' + c.icon + '">' + c.icon + ' ' + c.name + '</option>').join('');
    }
    updateCategorySelect();

    document.querySelectorAll('.finance-type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        financeType = btn.getAttribute('data-ftype');
        document.querySelectorAll('.finance-type-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateCategorySelect();
      });
    });

    document.getElementById('btn-fetch-link').addEventListener('click', async () => {
      const link = document.getElementById('fin-link').value.trim();
      if (!link) return;
      const info = await fetchLinkInfo(link);
      document.getElementById('link-preview').style.display = 'block';
      document.getElementById('link-preview').innerHTML = '<div class="resource-item" style="margin:0"><div class="resource-tip">' + info.title + '</div></div>';
      document.getElementById('fin-note').value = info.title;
    });

    document.getElementById('fin-image').addEventListener('change', async (e) => {
      if (e.target.files[0]) capturedImage = await fileToBase64(e.target.files[0]);
    });

    document.getElementById('btn-add-finance').addEventListener('click', () => {
      const amount = parseFloat(document.getElementById('fin-amount').value);
      const date = document.getElementById('fin-date').value;
      const catSel = document.getElementById('fin-category');
      const category = catSel.value;
      const categoryIcon = catSel.selectedOptions[0].getAttribute('data-icon');
      const note = document.getElementById('fin-note').value;
      const payment = document.getElementById('fin-payment').value;
      if (!amount || amount <= 0) { toast('请输入金额'); return; }

      const data = getData();
      if (!data.finance) data.finance = { records: [] };
      data.finance.records.unshift({ id: Date.now().toString(36), type: financeType, amount, date, category, categoryIcon, note, payment, image: capturedImage });
      saveData(data);
      renderFinance();
      toast('已记录');
    });
  }

  async function fetchLinkInfo(url) {
    let source = '网页';
    if (url.includes('taobao.com') || url.includes('tmall.com')) source = '淘宝/天猫';
    else if (url.includes('jd.com')) source = '京东';
    else if (url.includes('pinduoduo.com')) source = '拼多多';
    else if (url.includes('douyin.com')) source = '抖音';
    else if (url.includes('xiaohongshu.com')) source = '小红书';
    return { title: source + '商品', source };
  }

  // ---------- 科技资讯 ----------
  function renderNews() {
    const main = document.getElementById('main-content');
    let html = '<div class="module-header"><h2>📡 科技资讯</h2><p class="module-desc">科技 · 政策 · 行业 · 科学</p></div>';
    html += '<div class="news-tabs"><button class="news-tab active" data-ntab="tech">🤖 AI</button><button class="news-tab" data-ntab="policy">📜 政策</button><button class="news-tab" data-ntab="industry">🏭 行业</button><button class="news-tab" data-ntab="science">🔬 科学</button></div>';
    html += '<div class="panel"><div class="panel-body"><div id="news-list"></div></div></div>';
    main.innerHTML = html;

    const pools = {
      tech: [
        { title: 'OpenAI 发布 GPT-5：多模态能力全面升级', source: '机器之心', tag: 'AI', summary: '推理能力超越前代，支持实时视频理解。' },
        { title: 'Google DeepMind 推出 AlphaFold 4', source: '量子位', tag: 'AI', summary: '蛋白质结构预测进入全原子时代。' },
        { title: 'Apple Vision Pro 二代曝光：重量减轻40%', source: '36氪', tag: '硬件', summary: '售价或降至2499美元。' }
      ],
      policy: [
        { title: '国务院发布人工智能产业创新发展三年行动计划', source: '新华社', tag: '政策', summary: '到2028年核心产业规模超2万亿元。' },
        { title: '欧盟《AI 法案》全面生效', source: 'Reuters', tag: '法规', summary: '高风险 AI 系统需通过第三方审计。' }
      ],
      industry: [
        { title: '字节跳动 AI 业务营收首超广告', source: '晚点', tag: '企业', summary: '豆包大模型日调用量突破5000亿次。' },
        { title: '特斯拉 FSD v14 在中国获批路测', source: '第一财经', tag: '企业', summary: '支持城市道路完全自动驾驶。' }
      ],
      science: [
        { title: '中国天眼 FAST 发现持续活跃重复快速射电暴', source: '中科院', tag: '天文', summary: '为理解神秘宇宙现象提供大量数据。' },
        { title: 'CRISPR 3.0 首次修复人类胚胎遗传性耳聋基因', source: 'Science', tag: '生物', summary: '哈佛与 MIT 联合团队成功实验。' }
      ]
    };

    function renderList(tab) {
      const list = pools[tab] || pools.tech;
      document.getElementById('news-list').innerHTML = list.map(item => '<div class="news-item"><div class="news-item-header"><span class="stage-badge">' + item.tag + '</span><span>' + item.source + '</span></div><h4 class="news-title">' + item.title + '</h4><p class="news-summary">' + item.summary + '</p></div>').join('');
    }

    document.querySelectorAll('.news-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.news-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderList(btn.getAttribute('data-ntab'));
      });
    });

    renderList('tech');
    document.addEventListener('keydown', handleKeyboard);
  }

  // ---------- 奖励商店 ----------
  function renderShop() {
    const main = document.getElementById('main-content');
    const data = getCoinData();
    let html = '<div class="module-header"><h2>🏪 奖励商店</h2><p class="module-desc">金币余额：' + data.balance + '</p></div>';
    html += '<div class="shop-grid">';
    REWARD_SHOP.forEach(r => {
      const canAfford = data.balance >= r.cost;
      html += '<div class="shop-item' + (canAfford ? '' : ' shop-item-locked') + '"><div class="shop-item-icon">' + r.icon + '</div><div class="shop-item-name">' + r.name + '</div><div class="shop-item-desc">' + r.desc + '</div><div class="shop-item-cost">🪙 ' + r.cost + '</div><button class="btn btn-sm ' + (canAfford ? 'btn-gold' : '') + '" ' + (canAfford ? '' : 'disabled') + ' data-redeem="' + r.id + '">' + (canAfford ? '兑换' : '不足') + '</button></div>';
    });
    html += '</div>';
    main.innerHTML = html;

    document.querySelectorAll('[data-redeem]').forEach(btn => {
      btn.addEventListener('click', () => {
        const rewardId = btn.getAttribute('data-redeem');
        const reward = REWARD_SHOP.find(r => r.id === rewardId);
        if (confirm('用 ' + reward.cost + '💰 兑换「' + reward.name + '」？')) {
          if (redeemReward(rewardId)) {
            toast('兑换成功！');
            renderShop();
          }
        }
      });
    });
  }

  // ---------- 事件绑定 ----------
  function bindEvents(module) {
    document.getElementById('btn-checkin').addEventListener('click', () => handleCheckin(module));
    document.querySelectorAll('[data-delete]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('删除这条记录？')) {
          deleteCheckin(module, btn.getAttribute('data-delete'));
          renderModule(module);
          updateNavCounts();
          toast('已删除');
        }
      });
    });
  }

  async function handleCheckin(module) {
    const duration = parseInt(document.getElementById('checkin-duration').value) || 0;
    const date = document.getElementById('checkin-date').value;
    const note = document.getElementById('checkin-note')?.value || '';
    const countEl = document.getElementById('checkin-count');
    const count = countEl ? parseInt(countEl.value) : null;
    if (!duration || duration <= 0) { toast('请输入有效时长'); return; }

    let images = [];
    const imageInput = document.getElementById('checkin-images');
    if (imageInput && imageInput.files.length > 0) {
      for (const file of imageInput.files) {
        try { images.push(await fileToBase64(file)); } catch (e) {}
      }
    }

    addCheckin(module, { date, time: formatTime(new Date()), duration, note, images, count });
    if (module === 'vocabulary') renderVocabulary();
    else renderModule(module);
    updateNavCounts();

    const baseCoins = 10;
    const durationBonus = Math.floor(duration / 10);
    const streakBonus = Math.min(getStats(module).streak, 30);
    const totalCoins = baseCoins + durationBonus + streakBonus;
    const newBalance = addCoins(totalCoins, MODULE_RESOURCES[module].icon + ' ' + MODULE_RESOURCES[module].name);
    toast('✅ 打卡成功！+' + totalCoins + '💰');
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function getModuleDesc(module) {
    const descs = {
      intake: '好书·电影·纪录片·费曼输出',
      expression: '认知破冰·每日跟练·结构化表达·即兴表达',
      calligraphy: '基础笔画·间架结构·章法布局',
      drawing: '控笔·抓型·临摹·色彩·人体·透视·创意',
      vocabulary: '词根词缀·听力输入·口语输出·语法框架',
      singing: '呼吸·发声·音准·共鸣·咬字·情感',
      sports: '大基数适宜·无器械·居家力量训练'
    };
    return descs[module] || '';
  }

  function handleKeyboard(e) {
    if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '9') {
      e.preventDefault();
      switchModule(MODULES[parseInt(e.key) - 1]);
    }
    if ((e.ctrlKey || e.metaKey) && e.key === '0') {
      e.preventDefault();
      switchModule(MODULES[9]);
    }
  }

  function switchModule(module) {
    currentModule = module;
    document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
    const target = document.querySelector('[data-module="' + module + '"]');
    if (target) target.classList.add('active');
    if (module === 'schedule') renderSchedule();
    else if (module === 'finance') renderFinance();
    else if (module === 'news') renderNews();
    else if (module === 'vocabulary') renderVocabulary();
    else renderModule(module);
  }

  function updateNavCounts() {
    MODULES.forEach(m => {
      const data = getModuleData(m);
      const el = document.querySelector('[data-module="' + m + '"] .nav-count');
      if (el) el.textContent = data.checkins && data.checkins.length > 0 ? data.checkins.length + '次' : '';
    });
  }

  function renderNav() {
    const nav = document.getElementById('nav-list');
    let html = '';
    MODULES.forEach(m => {
      const res = MODULE_RESOURCES[m];
      const data = getModuleData(m);
      const count = data.checkins ? data.checkins.length : 0;
      html += '<li class="nav-item"><button class="nav-link' + (m === currentModule ? ' active' : '') + '" data-module="' + m + '"><span class="nav-icon">' + res.icon + '</span><span>' + res.name + '</span><span class="nav-count">' + (count > 0 ? count + '次' : '') + '</span></button></li>';
    });
    nav.innerHTML = html;
    nav.querySelectorAll('.nav-link').forEach(btn => {
      btn.addEventListener('click', () => switchModule(btn.getAttribute('data-module')));
    });
  }

  function createCoinBar() {
    const bar = document.createElement('div');
    bar.className = 'coin-bar';
    bar.id = 'coin-bar';
    bar.innerHTML = '<div class="coin-bar-inner"><span>🪙 <span id="coin-balance">' + getCoinData().balance + '</span></span><button id="btn-open-shop">🏪</button></div>';
    document.body.appendChild(bar);
    setTimeout(() => {
      document.getElementById('btn-open-shop').addEventListener('click', renderShop);
    }, 100);
  }

  function init() {
    createCoinBar();
    renderNav();
    renderDailyQuote();
    if (currentModule === 'schedule') renderSchedule();
    else if (currentModule === 'finance') renderFinance();
    else if (currentModule === 'news') renderNews();
    else if (currentModule === 'vocabulary') renderVocabulary();
    else renderModule(currentModule);
    updateNavCounts();
    updateCoinDisplay();
    document.getElementById('current-date').textContent = formatDate(new Date());
  }

  return { init, switchModule, getData };
})();

document.addEventListener('DOMContentLoaded', () => App.init());
