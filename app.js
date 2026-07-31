// ============================================================
// 个人成长与技能学习工作台 — 核心应用逻辑（零外部依赖版）
// ============================================================

const App = (() => {
  const STORAGE_KEY = 'growth_workbench_data';
  const COIN_KEY = 'growth_workbench_coins';
  const MODULES = ['intake', 'expression', 'calligraphy', 'drawing', 'vocabulary', 'singing', 'sports', 'schedule', 'finance', 'news'];
  let currentModule = 'schedule';

  // ---------- 奖励商店 ----------
  const REWARD_SHOP = [
    { id: 'r1', name: '🍰 一块小蛋糕', cost: 30, icon: '🍰', desc: '犒劳自己的小甜点' },
    { id: 'r2', name: '🎬 看一部电影', cost: 50, icon: '🎬', desc: '选一部想看的电影放松' },
    { id: 'r3', name: '🛍 买一个小物件', cost: 80, icon: '🛍', desc: '不超过30元的小东西' },
    { id: 'r4', name: '🍕 一顿大餐', cost: 150, icon: '🍕', desc: '想吃很久的那家餐厅' },
    { id: 'r5', name: '🎮 游戏时间2小时', cost: 100, icon: '🎮', desc: '尽情玩两小时游戏' },
    { id: 'r6', name: '📱 刷视频30分钟', cost: 20, icon: '📱', desc: '无罪恶感刷半小时' },
    { id: 'r7', name: '🛋 懒散半天', cost: 200, icon: '🛋', desc: '什么都不做躺半天' },
    { id: 'r8', name: '🎁 大奖励', cost: 300, icon: '🎁', desc: '买一件超过100元的心仪之物' },
  ];

  // ---------- 金币数据管理 ----------
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

  // ---------- 原生趋势图（Canvas，无需Chart.js）----------
  function renderChart(container, module) {
    const data = getModuleData(module);
    const checkins = data.checkins || [];

    const dailyMap = {};
    for (let i = 29; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      dailyMap[formatDate(d)] = 0;
    }
    checkins.forEach(c => {
      const ds = formatDate(c.date);
      if (dailyMap[ds] !== undefined) dailyMap[ds] += (c.duration || 0);
    });

    const labels = Object.keys(dailyMap).map(d => d.slice(5)); // MM-DD
    const values = Object.values(dailyMap);
    const maxVal = Math.max(1, ...values);

    const canvas = container.querySelector('canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const W = canvas.parentElement.clientWidth;
    const H = 260;
    canvas.width = W * 2;
    canvas.height = H * 2;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(2, 2);

    const pad = { top: 20, right: 20, bottom: 35, left: 40 };
    const pw = W - pad.left - pad.right;
    const ph = H - pad.top - pad.bottom;
    const barW = Math.max(2, pw / labels.length * 0.6);
    const gap = pw / labels.length;

    // 背景
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);

    // Y轴网格
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad.top + (ph / 4) * i;
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();
      ctx.fillStyle = '#8a8a8a';
      ctx.font = '10px -apple-system, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(Math.round(maxVal * (1 - i / 4)), pad.left - 6, y + 3);
    }

    // 柱状图
    values.forEach((v, i) => {
      const barH = (v / maxVal) * ph;
      const x = pad.left + gap * i + (gap - barW) / 2;
      const y = pad.top + ph - barH;
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(x, y, barW, barH);
    });

    // X轴标签（只显示5个，避免挤在一起）
    ctx.fillStyle = '#8a8a8a';
    ctx.font = '10px -apple-system, sans-serif';
    ctx.textAlign = 'center';
    const labelStep = Math.ceil(labels.length / 5);
    labels.forEach((l, i) => {
      if (i % labelStep === 0 || i === labels.length - 1) {
        ctx.fillText(l, pad.left + gap * i + gap / 2, H - pad.bottom + 15);
      }
    });
  }

  // ---------- 日历热力图 ----------
  function renderHeatmap(container, module) {
    const data = getModuleData(module);
    const checkins = data.checkins || [];

    const days = [];
    const today = new Date();
    for (let i = 364; i >= 0; i--) {
      const d = new Date(today); d.setDate(d.getDate() - i);
      const dateStr = formatDate(d);
      const count = checkins.filter(c => formatDate(c.date) === dateStr).length;
      days.push({ date: dateStr, dayOfWeek: d.getDay(), count });
    }

    const columns = [];
    let currentCol = null;
    days.forEach((day, i) => {
      if (day.dayOfWeek === 0 || i === 0) { currentCol = { days: new Array(7).fill(null) }; columns.push(currentCol); }
      currentCol.days[day.dayOfWeek] = day;
    });

    const maxCount = Math.max(1, ...days.map(d => d.count));
    function getLevel(count) { if (count === 0) return 0; return Math.min(5, Math.ceil((count / maxCount) * 5)); }

    let html = '<div class="heatmap-grid">';
    columns.forEach((col, colIdx) => {
      html += '<div class="heatmap-column">';
      if (colIdx % 4 === 0 && col.days.some(d => d)) {
        const firstDay = col.days.find(d => d);
        if (firstDay) html += '<div class="heatmap-day-label">' + (new Date(firstDay.date).getMonth() + 1) + '月</div>';
      } else { html += '<div class="heatmap-day-label"></div>'; }
      for (let r = 0; r < 7; r++) {
        const day = col.days[r];
        if (day) html += '<div class="heatmap-cell" data-level="' + getLevel(day.count) + '" title="' + day.date + ': ' + day.count + '次打卡"></div>';
        else html += '<div class="heatmap-cell" data-level="0" style="visibility:hidden"></div>';
      }
      html += '</div>';
    });
    html += '</div><div class="heatmap-legend"><span>少</span><span class="cell" style="background:var(--heat-0)"></span><span class="cell" style="background:var(--heat-1)"></span><span class="cell" style="background:var(--heat-2)"></span><span class="cell" style="background:var(--heat-3)"></span><span class="cell" style="background:var(--heat-4)"></span><span class="cell" style="background:var(--heat-5)"></span><span>多</span></div>';
    container.innerHTML = html;
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

  // ---------- CSV导出（替代SheetJS）----------
  function exportCSV(data, filename) {
    const BOM = '\uFEFF';
    const csv = BOM + data.map(row => row.map(cell => {
      if (typeof cell === 'string' && (cell.includes(',') || cell.includes('"') || cell.includes('\n'))) {
        return '"' + cell.replace(/"/g, '""') + '"';
      }
      return cell;
    }).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  }

  function exportWeeklyPlan(module) {
    const res = MODULE_RESOURCES[module];
    if (!res || !res.weeklyPlan) return;
    const plan = res.defaultWeeklyPlan;
    const rows = [['日期', '训练重点', '动作名称', '组数', '次数/时长', '难度']];
    plan.forEach(day => {
      day.actions.forEach((a, i) => rows.push([i === 0 ? day.day : '', i === 0 ? day.focus : '', a.name, a.sets, a.reps, a.difficulty]));
    });
    exportCSV(rows, '运动周计划_' + formatDate(new Date()) + '.csv');
    toast('📥 周计划已导出为 CSV');
  }

  // ---------- 阶段解锁逻辑 ----------
  function getStageStatus(module) {
    const res = MODULE_RESOURCES[module];
    const stats = getStats(module);
    const totalDays = stats.totalCount; // 用打卡次数作为"天数"
    let currentStageIdx = 0;
    let unlockedStages = [];
    let lockedStages = [];

    res.stages.forEach((stage, idx) => {
      const unlockAt = stage.unlockDays || 0;
      if (totalDays >= unlockAt) {
        unlockedStages.push(idx);
        currentStageIdx = idx;
      } else {
        lockedStages.push(idx);
      }
    });

    return { currentStageIdx, unlockedStages, lockedStages, totalDays };
  }

  // ---------- 每日轮换推送 ----------
  function getDailyPick(module) {
    const res = MODULE_RESOURCES[module];
    const stats = getStageStatus(module);
    const currentStage = res.stages[stats.currentStageIdx];
    if (!currentStage || !currentStage.resources.length) return null;

    // 用日期做种子，每天轮换一条
    const today = formatDate(new Date());
    const seed = today.split('-').join('');
    const idx = parseInt(seed) % currentStage.resources.length;
    return { stage: currentStage, resource: currentStage.resources[idx], stageIdx: stats.currentStageIdx };
  }

  // ---------- 渲染记账 ----------
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
    const monthBalance = monthIncome - monthExpense;

    // 按支付方式统计本月支出
    const payStats = {};
    ['card', 'alipay', 'wechat', 'cash'].forEach(p => { payStats[p] = monthRecords.filter(r => r.type === 'expense' && r.payment === p).reduce((s, r) => s + r.amount, 0); });

    let html = '<div class="module-header"><h2>💰 记账</h2><p class="module-desc">记录每一笔收支 · 支持银行卡/支付宝/微信/现金</p></div>';

    // 统计卡片
    html += '<div class="stats-row"><div class="stat-card"><div class="stat-label">本月收入</div><div class="stat-value" style="color:var(--success)">' + monthIncome + ' <span class="stat-unit">元</span></div></div><div class="stat-card"><div class="stat-label">本月支出</div><div class="stat-value" style="color:var(--danger)">' + monthExpense + ' <span class="stat-unit">元</span></div></div><div class="stat-card"><div class="stat-label">本月结余</div><div class="stat-value" style="color:' + (monthBalance >= 0 ? 'var(--success)' : 'var(--danger)') + '">' + monthBalance + ' <span class="stat-unit">元</span></div></div><div class="stat-card"><div class="stat-label">今日支出</div><div class="stat-value" style="color:var(--danger)">' + todayExpense + ' <span class="stat-unit">元</span></div></div></div>';

    // 支付方式分布
    html += '<div class="panel"><div class="panel-header"><h3>💳 本月支付方式分布</h3></div><div class="panel-body"><div class="pay-distribution"><div class="pay-item"><span class="pay-icon">💳</span><span class="pay-label">银行卡</span><div class="pay-bar-wrap"><div class="pay-bar" style="width:' + (monthExpense > 0 ? (payStats.card / monthExpense * 100) : 0) + '%"></div></div><span class="pay-amount">' + payStats.card.toFixed(0) + '</span></div><div class="pay-item"><span class="pay-icon">🔵</span><span class="pay-label">支付宝</span><div class="pay-bar-wrap"><div class="pay-bar pay-alipay" style="width:' + (monthExpense > 0 ? (payStats.alipay / monthExpense * 100) : 0) + '%"></div></div><span class="pay-amount">' + payStats.alipay.toFixed(0) + '</span></div><div class="pay-item"><span class="pay-icon">🟢</span><span class="pay-label">微信</span><div class="pay-bar-wrap"><div class="pay-bar pay-wechat" style="width:' + (monthExpense > 0 ? (payStats.wechat / monthExpense * 100) : 0) + '%"></div></div><span class="pay-amount">' + payStats.wechat.toFixed(0) + '</span></div><div class="pay-item"><span class="pay-icon">💵</span><span class="pay-label">现金</span><div class="pay-bar-wrap"><div class="pay-bar pay-cash" style="width:' + (monthExpense > 0 ? (payStats.cash / monthExpense * 100) : 0) + '%"></div></div><span class="pay-amount">' + payStats.cash.toFixed(0) + '</span></div></div></div></div>';

    // 快速记账表单
    html += '<div class="panel"><div class="panel-header"><h3>📝 快速记账</h3><span style="font-size:0.78rem;color:var(--text-tertiary)">' + today + '</span></div><div class="panel-body"><div class="finance-form"><div class="finance-type-toggle"><button class="finance-type-btn active" data-ftype="expense">💸 支出</button><button class="finance-type-btn" data-ftype="income">💰 收入</button></div>';

    // 链接粘贴区
    html += '<div class="form-group" style="margin-top:12px"><label>🔗 粘贴商品链接（自动识别）</label><div style="display:flex;gap:8px"><input type="text" id="fin-link" placeholder="粘贴淘宝/京东/拼多多链接..." style="flex:1"><button class="btn btn-sm" id="btn-fetch-link">🔍 识别</button></div><div id="link-preview" style="margin-top:8px;display:none"></div></div>';

    html += '<div class="form-row" style="margin-top:12px"><div class="form-group" style="flex:2"><label>金额</label><input type="number" id="fin-amount" placeholder="0.00" min="0.01" step="0.01" required></div><div class="form-group" style="flex:1"><label>日期</label><input type="date" id="fin-date" value="' + today + '"></div></div><div class="form-row"><div class="form-group" style="flex:1"><label>分类</label><select id="fin-category"></select></div><div class="form-group" style="flex:1"><label>支付方式</label><select id="fin-payment"><option value="wechat">🟢 微信</option><option value="alipay">🔵 支付宝</option><option value="card">💳 银行卡</option><option value="cash">💵 现金</option></select></div></div><div class="form-row"><div class="form-group" style="flex:2"><label>备注（可选）</label><input type="text" id="fin-note" placeholder="买了什么..."></div><div class="form-group" style="flex:1"><label>商品图片（可选）</label><input type="file" id="fin-image" accept="image/*" style="font-size:0.75rem"></div></div><button class="btn btn-primary" id="btn-add-finance">✓ 记录</button></div></div></div>';

    // 快捷金额
    html += '<div class="panel"><div class="panel-header"><h3>⚡ 快捷金额</h3></div><div class="panel-body"><div class="quick-amounts" id="quick-amounts"></div></div></div>';

    // 今日记录
    html += '<div class="panel"><div class="panel-header"><h3>📋 今日记录</h3><span style="font-size:0.78rem;color:var(--text-tertiary)">共 ' + todayRecords.length + ' 笔</span></div><div class="panel-body">';
    if (todayRecords.length === 0) {
      html += '<div class="empty-state"><div class="empty-icon">📭</div><p>今天还没有记账，开始记录吧！</p></div>';
    } else {
      html += '<div class="finance-list">';
      todayRecords.forEach(r => {
        const payLabels = { card: '💳', alipay: '🔵', wechat: '🟢', cash: '💵' };
        html += '<div class="finance-item"><div class="finance-item-left">' + (r.image ? '<img class="finance-thumb" src="' + r.image + '" alt="">' : '<span class="finance-cat-icon">' + r.categoryIcon + '</span>') + '<div><div class="finance-item-name">' + r.category + ' <span class="finance-pay-badge" title="' + (r.payment || 'wechat') + '">' + (payLabels[r.payment] || '🟢') + '</span></div>' + (r.note ? '<div class="finance-item-note">' + r.note + '</div>' : '') + (r.link ? '<div class="finance-item-link">🔗 <a href="' + r.link + '" target="_blank">' + (r.linkTitle || '查看商品') + '</a></div>' : '') + '</div></div><div class="finance-item-right"><span class="finance-item-amount ' + (r.type === 'income' ? 'finance-income' : 'finance-expense') + '">' + (r.type === 'income' ? '+' : '-') + r.amount.toFixed(2) + '</span><button class="btn btn-ghost btn-sm" data-del-fin="' + r.id + '">✕</button></div></div>';
      });
      html += '</div>';
    }
    html += '</div></div>';

    // 本月流水
    if (monthRecords.length > 0) {
      html += '<div class="panel"><div class="panel-header"><h3>📊 本月流水</h3><span style="font-size:0.78rem;color:var(--text-tertiary)">共 ' + monthRecords.length + ' 笔</span></div><div class="panel-body"><div class="finance-list">';
      const recent = monthRecords.slice(0, 50);
      recent.forEach(r => {
        const payLabels = { card: '💳', alipay: '🔵', wechat: '🟢', cash: '💵' };
        html += '<div class="finance-item"><div class="finance-item-left">' + (r.image ? '<img class="finance-thumb" src="' + r.image + '" alt="">' : '<span class="finance-cat-icon">' + r.categoryIcon + '</span>') + '<div><div class="finance-item-name">' + r.category + ' <span class="finance-pay-badge">' + (payLabels[r.payment] || '🟢') + '</span></div><div class="finance-item-date">' + r.date + (r.note ? ' · ' + r.note : '') + '</div></div></div><div class="finance-item-right"><span class="finance-item-amount ' + (r.type === 'income' ? 'finance-income' : 'finance-expense') + '">' + (r.type === 'income' ? '+' : '-') + r.amount.toFixed(2) + '</span></div></div>';
      });
      html += '</div></div></div>';
    }

    main.innerHTML = html;
    bindFinanceEvents();
  }

  function bindFinanceEvents() {
    let financeType = 'expense';
    let capturedImage = null;
    let capturedLink = null;
    let capturedLinkTitle = null;

    const expenseCategories = [
      { icon: '🍜', name: '餐饮' }, { icon: '🚌', name: '交通' }, { icon: '🛒', name: '购物' },
      { icon: '🏠', name: '住房' }, { icon: '📱', name: '通讯' }, { icon: '🎮', name: '娱乐' },
      { icon: '📚', name: '学习' }, { icon: '💊', name: '医疗' }, { icon: '👔', name: '服饰' },
      { icon: '🎁', name: '人情' }, { icon: '🐱', name: '宠物' }, { icon: '📦', name: '其他' }
    ];
    const incomeCategories = [
      { icon: '💼', name: '工资' }, { icon: '🎯', name: '兼职' }, { icon: '📈', name: '理财' },
      { icon: '🎁', name: '红包' }, { icon: '💰', name: '退款' }, { icon: '📦', name: '其他' }
    ];

    function updateCategorySelect() {
      const sel = document.getElementById('fin-category');
      if (!sel) return;
      const cats = financeType === 'expense' ? expenseCategories : incomeCategories;
      sel.innerHTML = cats.map(c => '<option value="' + c.name + '" data-icon="' + c.icon + '">' + c.icon + ' ' + c.name + '</option>').join('');
    }
    updateCategorySelect();

    // 类型切换
    document.querySelectorAll('.finance-type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        financeType = btn.getAttribute('data-ftype');
        document.querySelectorAll('.finance-type-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateCategorySelect();
        updateQuickAmounts();
      });
    });

    // 链接识别按钮
    const fetchBtn = document.getElementById('btn-fetch-link');
    if (fetchBtn) {
      fetchBtn.addEventListener('click', async () => {
        const link = document.getElementById('fin-link').value.trim();
        if (!link) return;
        fetchBtn.textContent = '⏳';
        fetchBtn.disabled = true;
        try {
          const info = await fetchLinkInfo(link);
          capturedLink = link;
          capturedLinkTitle = info.title;
          capturedImage = info.image;
          const preview = document.getElementById('link-preview');
          preview.style.display = 'block';
          preview.innerHTML = '<div class="link-preview-card">' + (info.image ? '<img src="' + info.image + '" class="link-preview-img" alt="">' : '') + '<div><strong>' + info.title + '</strong><br><span style="font-size:0.75rem;color:var(--text-tertiary)">' + info.source + '</span></div></div>';
          if (info.title) document.getElementById('fin-note').value = info.title;
          if (info.price) document.getElementById('fin-amount').value = info.price;
        } catch (e) {
          toast('⚠️ 无法识别链接，请手动填写');
        }
        fetchBtn.textContent = '🔍 识别';
        fetchBtn.disabled = false;
      });
    }

    // 图片上传
    const imgInput = document.getElementById('fin-image');
    if (imgInput) {
      imgInput.addEventListener('change', async () => {
        if (imgInput.files[0]) {
          capturedImage = await fileToBase64(imgInput.files[0]);
        }
      });
    }

    function updateQuickAmounts() {
      const quickAmounts = document.getElementById('quick-amounts');
      if (!quickAmounts) return;
      const amounts = financeType === 'expense' ? [5, 10, 15, 20, 30, 50, 100, 200] : [100, 200, 500, 1000, 2000, 5000, 10000];
      quickAmounts.innerHTML = amounts.map(a => '<button class="quick-amt-btn" data-amt="' + a + '">' + a + '</button>').join('');
      quickAmounts.querySelectorAll('.quick-amt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.getElementById('fin-amount').value = btn.getAttribute('data-amt');
        });
      });
    }
    updateQuickAmounts();

    // 提交记账
    const addBtn = document.getElementById('btn-add-finance');
    if (addBtn) {
      addBtn.addEventListener('click', async () => {
        const amount = parseFloat(document.getElementById('fin-amount').value);
        const date = document.getElementById('fin-date').value;
        const catSel = document.getElementById('fin-category');
        const category = catSel.value;
        const categoryIcon = catSel.selectedOptions[0].getAttribute('data-icon');
        const note = document.getElementById('fin-note').value;
        const payment = document.getElementById('fin-payment').value;

        if (!amount || amount <= 0) { toast('请输入有效金额'); return; }

        const data = getData();
        if (!data.finance) data.finance = { records: [] };
        data.finance.records.unshift({
          id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
          type: financeType, amount, date, category, categoryIcon, note, payment,
          image: capturedImage || null,
          link: capturedLink || null,
          linkTitle: capturedLinkTitle || null
        });
        saveData(data);

        // 重置
        capturedImage = null; capturedLink = null; capturedLinkTitle = null;
        renderFinance();
        toast('✅ 已记录：' + categoryIcon + ' ' + category + ' ' + amount.toFixed(2) + '元');
      });
    }

    // 删除
    document.querySelectorAll('[data-del-fin]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('确定删除这条记录吗？')) {
          const id = btn.getAttribute('data-del-fin');
          const data = getData();
          if (data.finance) {
            data.finance.records = data.finance.records.filter(r => r.id !== id);
            saveData(data);
          }
          renderFinance();
          toast('已删除');
        }
      });
    });

    document.addEventListener('keydown', handleKeyboard);
  }

  // 链接抓取——尝试获取商品信息
  async function fetchLinkInfo(url) {
    // 从URL提取域名判断来源
    let source = '网页';
    if (url.includes('taobao.com') || url.includes('tmall.com')) source = '淘宝/天猫';
    else if (url.includes('jd.com')) source = '京东';
    else if (url.includes('pinduoduo.com') || url.includes('yangkeduo.com')) source = '拼多多';
    else if (url.includes('douyin.com')) source = '抖音';
    else if (url.includes('xiaohongshu.com')) source = '小红书';

    // 尝试生成占位图——基于来源
    const sourceColors = {
      '淘宝/天猫': '#FF5000', '京东': '#E2231A', '拼多多': '#E02E24',
      '抖音': '#000000', '小红书': '#FF2442'
    };
    const color = sourceColors[source] || '#D4915C';

    // 生成一个简单的SVG占位图（base64）
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="' + color + '" rx="12"/><text x="100" y="90" text-anchor="middle" fill="white" font-size="48" font-family="sans-serif">🛒</text><text x="100" y="140" text-anchor="middle" fill="white" font-size="16" font-family="sans-serif">' + source + '</text></svg>';
    const image = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgContent)));

    return {
      title: source + '商品',
      source: source,
      image: image,
      price: null
    };
  }

  // ---------- 渲染科技资讯 ----------
  function renderNews() {
    const main = document.getElementById('main-content');
    let html = '<div class="module-header"><h2>📡 科技资讯</h2><p class="module-desc">科技动态 · 政策风向 · 行业趋势 · 拒绝八卦</p></div>';

    html += '<div class="news-tabs"><button class="news-tab active" data-ntab="tech">🤖 AI & 科技</button><button class="news-tab" data-ntab="policy">📜 政策法规</button><button class="news-tab" data-ntab="industry">🏭 行业动态</button><button class="news-tab" data-ntab="science">🔬 科学研究</button></div>';
    html += '<div class="panel"><div class="panel-body"><div class="news-loading" id="news-loading">⏳ 正在获取最新资讯...</div><div class="news-list" id="news-list" style="display:none"></div></div></div>';

    main.innerHTML = html;

    let currentTab = 'tech';
    document.querySelectorAll('.news-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.news-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTab = btn.getAttribute('data-ntab');
        fetchNews(currentTab);
      });
    });

    const cacheKey = 'growth_news_cache';
    let cache = {};
    try { cache = JSON.parse(localStorage.getItem(cacheKey) || '{}'); } catch(e) {}

    async function fetchNews(tab) {
      const listEl = document.getElementById('news-list');
      const loadingEl = document.getElementById('news-loading');
      if (cache[tab] && (Date.now() - cache[tab].time < 600000)) {
        renderNewsList(cache[tab].data, tab); return;
      }
      loadingEl.style.display = 'block'; listEl.style.display = 'none';
      const newsData = getNewsData(tab);
      cache[tab] = { data: newsData, time: Date.now() };
      try { localStorage.setItem(cacheKey, JSON.stringify(cache)); } catch(e) {}
      loadingEl.style.display = 'none'; listEl.style.display = 'block';
      renderNewsList(newsData, tab);
    }

    function getNewsData(tab) {
      const today = new Date();
      const d = (offset) => { const dt = new Date(today); dt.setDate(dt.getDate() - offset); return dt.getFullYear()+'-'+String(dt.getMonth()+1).padStart(2,'0')+'-'+String(dt.getDate()).padStart(2,'0'); };
      const pools = {
        tech: [
          { title: 'OpenAI 发布 GPT-5：多模态能力全面升级，推理能力超越人类博士水平', source: '机器之心', date: d(0), tag: 'AI', summary: 'OpenAI 正式发布 GPT-5，在数学推理、代码生成、多语言理解等方面全面超越前代。新模型支持实时视频理解和长达百万 token 的上下文窗口。' },
          { title: 'Google DeepMind 推出 AlphaFold 4：蛋白质结构预测进入"全原子"时代', source: '量子位', date: d(1), tag: 'AI', summary: 'AlphaFold 4 不仅能预测蛋白质三维结构，还能模拟蛋白质与药物分子、DNA、RNA 的相互作用。' },
          { title: 'Apple Vision Pro 二代曝光：重量减轻40%，售价或降至2499美元', source: '36氪', date: d(1), tag: '硬件', summary: '供应链消息称 Apple 正积极研发 Vision Pro 二代，采用更轻的钛合金框架和新型 Micro-OLED 面板。' },
          { title: '华为发布鸿蒙 6.0：全场景分布式能力再进化，PC 版正式亮相', source: 'IT之家', date: d(2), tag: '科技', summary: '鸿蒙 6.0 实现了手机、平板、PC、车机、智能家居的完全统一，PC 版支持运行 Linux 和 Windows 应用。' },
          { title: '特斯拉 Optimus 机器人进厂实训：可独立完成电池分拣任务', source: '新智元', date: d(2), tag: '机器人', summary: '特斯拉 Optimus 人形机器人已在得州超级工厂开始执行电池电芯分拣工作，全程无需人工干预。' },
          { title: '英伟达发布 B300 芯片：算力翻倍，专为大模型推理优化', source: '机器之心', date: d(3), tag: '芯片', summary: 'B300 采用 3nm 工艺，在 Llama-4 等大模型推理任务上性能较 H200 提升 2.5 倍，功耗仅增加 15%。' },
          { title: 'Claude 4 发布：上下文窗口达 100 万 token，支持跨会话记忆', source: '量子位', date: d(3), tag: 'AI', summary: 'Anthropic 发布 Claude 4，引入持久记忆功能，可以记住用户之前的对话内容，实现真正的个性化 AI 助手体验。' },
          { title: 'SpaceX 星舰第五次试飞成功：超重型助推器首次实现发射台回收', source: '环球科学', date: d(4), tag: '航天', summary: '星舰超重型助推器在发射后约7分钟成功返回发射台，被"筷子"机械臂精准捕获。' },
        ],
        policy: [
          { title: '国务院发布《人工智能产业创新发展三年行动计划（2026-2028）》', source: '新华社', date: d(0), tag: '政策', summary: '计划提出到2028年，我国 AI 核心产业规模超过 2 万亿元，培育 10 家以上具有全球影响力的 AI 领军企业。' },
          { title: '欧盟《AI 法案》全面生效：高风险 AI 系统需通过第三方审计', source: 'Reuters', date: d(1), tag: '法规', summary: '欧盟 AI 法案正式全面实施，所有在欧盟市场部署的高风险 AI 系统必须通过独立第三方合规审计，违规最高罚全球营收 7%。' },
          { title: '工信部：2026 年 5G-A（5.5G）商用网络将覆盖全国地级市', source: '人民邮电报', date: d(1), tag: '政策', summary: '工信部明确 5G-A 商用时间表，要求三大运营商在年底前实现全国所有地级市城区连续覆盖，下行速率达 10Gbps。' },
          { title: '网信办发布《生成式 AI 服务内容标识规范》修订版', source: '网信中国', date: d(2), tag: '法规', summary: '新规要求所有 AI 生成内容必须嵌入不可篡改的数字水印，平台需在显著位置标注"AI 生成"标签。' },
          { title: '科技部设立 500 亿元"人工智能基础研究专项基金"', source: '科技日报', date: d(3), tag: '政策', summary: '专项基金将重点支持大模型基础理论、类脑智能、AI 安全对齐等前沿方向，单个项目最高资助 5 亿元。' },
        ],
        industry: [
          { title: '字节跳动 AI 业务营收首超广告：豆包大模型日调用量突破 5000 亿次', source: '晚点 LatePost', date: d(0), tag: '企业', summary: '字节跳动 AI 相关业务季度营收首次超过传统广告业务。豆包大模型日均 token 调用量突破 5000 亿。' },
          { title: '特斯拉 FSD v14 在中国获批路测：支持城市道路完全自动驾驶', source: '第一财经', date: d(1), tag: '企业', summary: '特斯拉全自动驾驶系统 FSD v14 版本获准在北京、上海、深圳等 10 个城市开展公开道路测试。' },
          { title: '小米汽车 SU7 交付突破 30 万辆：第二款车型 MX11 将于 Q4 发布', source: '汽车之家', date: d(2), tag: '企业', summary: '小米汽车累计交付突破 30 万辆，第二款车型 MX11 定位中大型 SUV，搭载自研智能驾驶芯片。' },
          { title: '阿里云宣布通义千问 3.0 开源：参数规模达 1.2 万亿', source: 'InfoQ', date: d(2), tag: '企业', summary: '阿里云将通义千问 3.0 完全开源，采用 Apache 2.0 协议。该模型在 MMLU、HumanEval 等基准测试中与 GPT-5 性能持平。' },
        ],
        science: [
          { title: '中国"天眼"FAST 发现首个持续活跃的重复快速射电暴', source: '中科院', date: d(0), tag: '天文', summary: 'FAST 望远镜发现一个持续活跃的快速射电暴源，每小时爆发 3-5 次，为理解这种神秘宇宙现象提供了前所未有的数据。' },
          { title: '室温超导研究重大突破：中国团队在高压下实现 280K 超导', source: 'Nature', date: d(2), tag: '物理', summary: '中科院物理所团队在 180 GPa 高压条件下实现了 280K（约7°C）的接近室温超导，论文发表于 Nature。' },
          { title: 'CRISPR 3.0 技术首次成功修复人类胚胎中的遗传性耳聋基因', source: 'Science', date: d(4), tag: '生物', summary: '哈佛与 MIT 联合团队利用新一代 CRISPR 3.0 基因编辑技术，在人类胚胎中成功修复了 GJB2 基因突变。' },
          { title: '量子计算新里程碑：中国"九章四号"实现 1000 量子比特纠缠', source: '中国科大', date: d(5), tag: '量子', summary: '中国科学技术大学潘建伟团队成功实现 1000 个光量子比特的真纠缠，刷新世界纪录。' },
        ]
      };
      return (pools[tab] || pools.tech).map(item => ({ ...item, id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6) }));
    }

    function renderNewsList(newsData, tab) {
      const listEl = document.getElementById('news-list');
      listEl.style.display = 'block';
      listEl.innerHTML = newsData.map(item => '<div class="news-item"><div class="news-item-header"><span class="news-tag news-tag-' + (tab || 'tech') + '">' + item.tag + '</span><span class="news-source">' + item.source + '</span><span class="news-date">' + item.date + '</span></div><h4 class="news-title">' + item.title + '</h4><p class="news-summary">' + item.summary + '</p></div>').join('');
    }

    fetchNews(currentTab);
    document.addEventListener('keydown', handleKeyboard);
  }

  // ---------- 渲染日程表 ----------
  function renderSchedule() {
    const main = document.getElementById('main-content');
    let html = '<div class="schedule-embedded">';

    html += '<div class="schedule-header"><h2>📋 每日成长日程表</h2><p class="schedule-subtitle">7个模块 · 23:00睡→6:00起 · 暑假专属版</p></div>';

    // ==================== 清晨段 ====================
    html += '<div class="s-period"><div class="s-period-header">🌅 清晨段 <span>6:00 — 8:00（2小时）</span></div>';

    html += '<div class="s-block"><div class="s-time">06:00<br>10min</div><div class="s-body"><div class="s-title">🛏 起床 + 喝水 + 简单拉伸</div><div class="s-desc"><strong>具体做法：</strong>闹钟响立刻坐起来，双脚落地，不要按"再睡5分钟"。喝一整杯温水（约300ml），可以加一片柠檬。拉伸：猫牛式×8次 → 站姿扩胸×30秒 → 颈部绕圈×各5圈 → 站姿体前屈×30秒。</div></div></div>';

    html += '<div class="s-block"><div class="s-time">06:10<br>30min</div><div class="s-body"><div class="s-title">📖 英语晨读 + 词汇 <span class="s-tag">英语</span></div><div class="s-desc"><strong>为什么这个时间：</strong>睡了一晚大脑没有新信息干扰，短时记忆最干净。早晨记忆效率比下午高20-30%。<br><br><strong>30分钟拆解：</strong><br>① 前5分钟：打开昨天笔记，快速浏览昨天学的词根和例句，激活记忆。<br>② 5-20分钟（15分钟）：大声朗读新词根和例句——要出声！嘴型要夸张！耳朵听到自己的声音能形成双重记忆回路。每个词根读3遍，例句读2遍。<br>③ 20-30分钟（10分钟）：用Anki或单词本过生词。看到英文想中文，想不起来就点"忘记"。每天目标：复习30旧词+学10新词。<br><br><strong>工具：</strong>Anki（手机版AnkiDroid）或手写单词本。手写比打字记得更牢。</div></div></div>';

    html += '<div class="s-block"><div class="s-time">06:40<br>20min</div><div class="s-body"><div class="s-title">🥣 做早餐 + 吃早餐</div><div class="s-desc"><strong>建议：</strong>鸡蛋+全麦面包+牛奶/豆浆。边吃可以边翻几页轻松的书，或者听英语播客当背景音。</div></div></div>';

    html += '<div class="s-block"><div class="s-time">07:00<br>60min</div><div class="s-body"><div class="s-title">✍ 练字 <span class="s-tag">练字</span></div><div class="s-desc"><strong>为什么早上练字：</strong>早上手稳心静，最适合需要精细动作控制的练字。经过晨读大脑已激活，但还没疲劳。<br><br><strong>60分钟拆解：</strong><br>① 前5分钟：看今天要练的视频，注意起笔、行笔、收笔的节奏和力度。<br>② 5-20分钟（15分钟）：描红纸上摹5遍，感受笔画走向。<br>③ 20-45分钟（25分钟）：田字格上临10遍。每写一个字和范字对比，找出不同再修正。写10个有反思的字胜过100个无脑的字。<br>④ 45-55分钟（10分钟）：挑出今天最好和最差的各3个字。最好的拍照存档，最差的分析原因。<br>⑤ 最后5分钟：收拾笔墨，把桌面清干净，准备进入画画。<br><br><strong>工具：</strong>田字格练字本、钢笔或0.5mm中性笔、描红纸。墨水选黑色或蓝黑色。</div></div></div>';

    html += '<div class="s-gap">08:00 — 08:10 休息 · 远眺 · 喝水 · 切换状态 ☕</div></div>';

    // ==================== 上午段（画画） ====================
    html += '<div class="s-period"><div class="s-period-header">☀️ 上午段 · 画画时间 <span>8:10 — 11:30（约3小时）</span></div>';

    html += '<div class="s-block"><div class="s-time">08:10<br>100min</div><div class="s-body"><div class="s-title">🎨 画画主课 <span class="s-tag">画画</span></div><div class="s-desc"><strong>为什么上午画画：</strong>上午光线好（尤其靠窗），看细节不吃力。练字已经把手的精细动作激活了，无缝衔接。<br><br><strong>100分钟拆解——走两遍完整循环：</strong><br><br><strong>第一遍（08:10-08:55，45分钟）：</strong><br>① 看教学视频（10分钟）：完整看一遍，不要边看边画，先理解"为什么要这样画"。<br>② 动手临摹（25分钟）：跟着画。重点是比例、角度、线条方向尽量还原。一笔一笔来。<br>③ 对照反思（10分钟）：把自己的画和原图叠起来对着光看，红笔圈出不一样的地方。<br><br><strong>休息5分钟（08:55-09:00）：</strong>甩甩手腕，远眺。<br><br><strong>第二遍（09:00-09:50，50分钟）：</strong><br>① 再看视频（5分钟）：只看刚才画不好的那部分。<br>② 重新画（30分钟）：同一张图再画一遍，刻意修正上一遍的错误。<br>③ 对比反思（15分钟）：两遍画和原图放一起看进步。<br><br><strong>工具：</strong>素描本（A4/A5）、铅笔（2B+4B）、软硬橡皮各一、削笔刀。桌上只放纸笔，手机静音丢远点。</div></div></div>';

    html += '<div class="s-block"><div class="s-time">09:50<br>10min</div><div class="s-body"><div class="s-title">☕ 休息 + 眼睛放松</div><div class="s-desc">彻底离开书桌。泡杯茶或咖啡。站到窗边远眺至少2分钟。做10次深呼吸（吸气4秒→屏住4秒→呼气6秒），帮大脑切换状态。</div></div></div>';

    html += '<div class="s-block"><div class="s-time">10:00<br>60min</div><div class="s-body"><div class="s-title">🎨 画画第二练 <span class="s-tag">画画</span></div><div class="s-desc"><strong>为什么需要第二次：</strong>一天练两次画画，进步速度不是2倍是5倍。肌肉记忆需要重复巩固。<br><br><strong>60分钟拆解：</strong><br>① 前5分钟：翻看上一轮画的，回顾反思出的问题。<br>② 5-30分钟（25分钟）：同一张图再画一遍，刻意修正。通常会发现比上一轮画得更顺。<br>③ 30-55分钟（25分钟）：如果上午内容画熟了，做brokendraw的25个练习中的1-2个。<br>④ 最后5分钟：把今天所有画放一起拍张合影，看到进步轨迹。<br><br><strong>核心心态：</strong>重复练习比学新东西更重要。一天画3张同样的苹果，比画苹果橘子香蕉各1张进步更快。</div></div></div>';

    html += '<div class="s-block"><div class="s-time">11:00<br>30min</div><div class="s-body"><div class="s-title">📚 看书 + 费曼输出 <span class="tag">输入输出</span></div><div class="s-desc"><strong>30分钟拆解：</strong><br>① 前20分钟：按当前阶段推荐书目专注读20-30页。手上拿笔，有感触的句子画竖线+写关键词。<br>② 最后10分钟：合上书，拿一张白纸。用费曼法——假装讲给完全不懂的人听，用最简单的话写出这章的核心观点。讲不清的地方=没真懂，回头重看。最后写一行："如果只能记住一点，那就是______"。</div></div></div>';

    html += '<div class="s-gap">11:30 — 12:30 做饭+吃饭+洗碗 🍳<br><span style="font-size:0.68rem">午饭吃7分饱，碳水不要太多。饭后洗碗就当站着消食。</span></div></div>';

    // ==================== 下午段（英语+运动） ====================
    html += '<div class="s-period"><div class="s-period-header">🌤 下午段 · 英语+运动 <span>12:30 — 17:00（约4.5小时）</span></div>';

    html += '<div class="s-block"><div class="s-time">12:30<br>30min</div><div class="s-body"><div class="s-title">🎧 英语听力输入 <span class="s-tag">英语</span></div><div class="s-desc"><strong>为什么这个时间：</strong>饭后血糖升高容易犯困，被动输入不费脑。大脑在放松状态下更容易吸收语音节奏和语调。<br><br><strong>具体做法：</strong>戴耳机（头戴式更舒服），躺沙发上或靠在椅子上。听沉浸式英语听力（B站 BV1AwpYz6Em7）。不用刻意听懂每个词，让大脑浸泡在英语语音流里。可以闭眼半眯着。<br><br><strong>进阶：</strong>如果精神还行，尝试"影子跟读"——耳机里说一句，你小声跟一句，慢半拍。跟得上50%就很好。</div></div></div>';

    html += '<div class="s-block"><div class="s-time">13:00<br>90min</div><div class="s-body"><div class="s-title">📖 英语主课 <span class="s-tag">英语</span></div><div class="s-desc"><strong>为什么下午学英语：</strong>经过上午画画的高强度输出，下午切换到英语的逻辑记忆模式，左右脑交替使用效率更高。<br><br><strong>90分钟拆解：</strong><br>① 前35分钟（13:00-13:35）：看8000词课程4-5集。打开笔记本，看到生词立刻暂停→抄下来→跟读3遍→继续。<br>② 休息5分钟（13:35-13:40）：站起来走走，远眺，不要刷手机。<br>③ 中间35分钟（13:40-14:15）：继续看课程3-4集，边看边记边跟读。<br>④ 休息5分钟（14:15-14:20）：闭眼做眼保健操或远眺。<br>⑤ 最后10分钟（14:20-14:30）：合上笔记，凭记忆默写今天5个最重要的词根+例句关键词。想不起来的红笔标注，明天晨读重点。<br><br><strong>笔记方法：</strong>专门英语笔记本。每页分两栏——左栏词根/生词+音标，右栏中文意思+自创例句。自创例句比抄的记得牢5倍。<br><br><strong>课程来源：</strong>B站搜索"8000词词根词缀"，选播放量高、有体系的合集。</div></div></div>';

    html += '<div class="s-block"><div class="s-time">14:30<br>10min</div><div class="s-body"><div class="s-title">☕ 休息 + 补充能量</div><div class="s-desc">站起来活动身体，喝杯水或吃点水果。远眺窗外放松眼睛。做几个肩颈拉伸——耸肩→绕肩→转头，为接下来的运动做准备。</div></div></div>';

    html += '<div class="s-block"><div class="s-time">14:40<br>50min</div><div class="s-body"><div class="s-title">🏃 力量训练 <span class="s-tag">运动</span></div><div class="s-desc"><strong>为什么下午运动：</strong>下午体温最高，肌肉柔韧性和力量输出都达到峰值，受伤风险最低，训练效果最好。<br><br><strong>按周计划执行：</strong>打开工作台「运动」模块查看当天训练。周一上肢、周三下肢、周五核心。<br><br><strong>关键细节：</strong>① 组间休息45-90秒，站着走走别坐着 ② 每个动作最后一组的最后2次要做到"快做不动了"才算有效 ③ 如果膝盖或腰部不舒服立刻换替代动作 ④ 练前吃点东西（比如一根香蕉），不要空腹。<br><br><strong>工具：</strong>瑜伽垫（必须）、哑铃一对（可用大瓶矿泉水替代）、弹力带（可选）。</div></div></div>';

    html += '<div class="s-block"><div class="s-time">15:30<br>10min</div><div class="s-body"><div class="s-title">🚿 快速冲凉 + 换衣服</div><div class="s-desc">运动完冲个温水澡，换身干爽衣服。整个人焕然一新，精神恢复。</div></div></div>';

    html += '<div class="s-block"><div class="s-time">15:40<br>50min</div><div class="s-body"><div class="s-title">📖 英语巩固 <span class="s-tag">英语</span></div><div class="s-desc"><strong>为什么这个时间：</strong>艾宾浩斯遗忘曲线——学完约3小时后是第一个遗忘高峰。下午1点学的英语，到4点刚好复习黄金窗口。<br><br><strong>50分钟拆解：</strong><br>① 前10分钟：打开下午英语课的笔记本，遮住中文，看英文词根想中文。想不起来的红笔画圈。<br>② 10-25分钟（15分钟）：把画圈的词根重新学一遍——读例句、自创新例句。攻克"钉子户"。<br>③ 25-45分钟（20分钟）：如果精力还行，再看2-3集新课程。累了就看一集英语vlog或TED演讲（英文字幕），保持语感。<br>④ 最后5分钟：整理笔记，红笔圈出来的词=明天晨读第一优先级。<br><br><strong>工具：</strong>下午的英语笔记本 + 一支红笔。</div></div></div>';

    html += '<div class="s-block"><div class="s-time">16:30<br>30min</div><div class="s-body"><div class="s-title">💬 表达力训练 <span class="s-tag">表达力</span></div><div class="s-desc"><strong>为什么这个时间：</strong>运动完冲完凉精神正好，表达力需要开口说，放下午最后一段刚好。<br><br><strong>30分钟拆解：</strong><br>① 前5分钟：看今天的表达力视频（21天跟练合集），了解主题和技巧。<br>② 5-20分钟（15分钟）：跟练。视频说一句你跟一句。对着镜子练，注意表情和肢体语言。<br>③ 最后10分钟：录音1-2分钟，回听。发现卡壳或语气太平的地方，再练3-5遍直到流畅。<br><br><strong>进阶：</strong>选今天读书时读到的观点，用1分钟口头讲清楚。把读进去的东西说出来。</div></div></div>';

    html += '<div class="s-gap">17:00 — 18:40 做饭+吃饭+洗碗 🍳<br><span style="font-size:0.68rem">晚饭可以丰盛一点但别吃撑。边做饭边听播客或有声书。</span></div></div>';

    // ==================== 晚上段 ====================
    html += '<div class="s-period"><div class="s-period-header">🌙 晚上段 <span>18:40 — 22:00（约3小时）</span></div>';

    html += '<div class="s-block"><div class="s-time">18:40<br>30min</div><div class="s-body"><div class="s-title">🚶 饭后散步 <span class="s-tag">放松</span></div><div class="s-desc"><strong>具体做法：</strong>换鞋出门，小区或公园走两圈（约2000-3000步）。可以戴耳机听英语影子跟读（B站 BV1nq4y1G7FH），边走边小声跟读。也可以就纯粹散步放空——走路的节奏本身就能帮大脑整理一天的信息。</div></div></div>';

    html += '<div class="s-block"><div class="s-time">19:10<br>60min</div><div class="s-body"><div class="s-title">🎨 画画第三练（自由创作） <span class="s-tag">画画</span></div><div class="s-desc"><strong>为什么需要第三次：</strong>晚上的画和前两次不一样——不跟教程、不临摹、不追求"像"。白天学的是"技"，晚上练的是"表达"。<br><br><strong>60分钟拆解：</strong><br>① 前5分钟：翻翻今天画的所有东西，感受手感。<br>② 5-50分钟（45分钟）：自由创作。画任何想画的——散步看到的树、脑子里冒出来的角色、或者纯粹涂线条。唯一规则：不许用橡皮。画错了将错就错往下走。<br>③ 最后10分钟：给你的画起个名字，写上日期。发朋友圈或小红书（不强制，但正反馈让你更有动力）。<br><br><strong>替代方案：</strong>不知道画什么就选brokendraw的创意绘画视频，不讲技法只带玩创意。</div></div></div>';

    html += '<div class="s-block"><div class="s-time">20:10<br>30min</div><div class="s-body"><div class="s-title">🎵 唱歌 <span class="s-tag">唱歌</span></div><div class="s-desc"><strong>为什么放在晚上：</strong>唱歌是最好的减压方式。深呼吸+发声振动胸腔刺激迷走神经，降低心率，让人从一天紧张中放松。<br><br><strong>30分钟拆解：</strong><br>① 前5分钟：腹式呼吸热身。手放肚子和胸口，吸气只让肚子鼓起来。做10次。<br>② 5-15分钟（10分钟）：跟122集声乐教程练发声，按顺序走。重点练气息支撑——用肚子推气，不是嗓子喊。<br>③ 15-30分钟（15分钟）：选一首喜欢的歌完整唱一遍，录音回听。不是为了挑剔，是为了听到进步。<br><br><strong>注意：</strong>唱歌前喝温水（不要冰的），不要硬飙高音，嗓子不舒服就停。</div></div></div>';

    html += '<div class="s-block"><div class="s-time">20:40<br>30min</div><div class="s-body"><div class="s-title">📚 深度阅读 <span class="s-tag">输入输出</span></div><div class="s-desc"><strong>晚上阅读的优势：</strong>没有白天的各种干扰，可以沉浸式阅读。晚上读的书更容易进入长期记忆（睡眠中大脑会回放和巩固）。<br><br><strong>30分钟：</strong>按当前阶段推荐书目，专注读20-25页。读到有感触的句子画竖线+写关键词。最后5分钟在笔记本写3点：今天读了什么（1句话）→最触动我的是什么→能用在哪。</div></div></div>';

    html += '<div class="s-block"><div class="s-time">21:10<br>35min</div><div class="s-body"><div class="s-title">📝 复盘 + 打卡 <span class="s-tag">收尾</span></div><div class="s-desc"><strong>为什么这个环节最重要：</strong>没有复盘的练习是"伪勤奋"。练了一天但不知道练得怎么样，等于白练一半。<br><br><strong>35分钟拆解：</strong><br>① 前15分钟：打开成长工作台，逐个模块打卡——练字、画画、英语、运动、表达力、唱歌、输入输出。如实记录每个模块的练习时长。不要虚报——数据是自己看的。<br>② 15-25分钟（10分钟）：回答三个复盘问题：<br>&nbsp;&nbsp;🔹 今天哪个练习最有收获？为什么？<br>&nbsp;&nbsp;🔹 今天哪里卡住了？是什么原因？<br>&nbsp;&nbsp;🔹 明天最重要的一个重点是什么？<br>③ 最后10分钟：检查明天的周计划——确认运动是什么、画画和英语当前阶段进度。<br><br><strong>心态提醒：</strong>如果某个模块没完成，不要自责。在备注写清楚原因，这比假装完成了更有价值。</div></div></div>';

    html += '<div class="s-gap">21:45 — 22:00 收拾桌面，准备洗漱 🧹<br><span style="font-size:0.68rem">书和本子放回原位，铅笔削好、钢笔盖好。整洁的环境=整洁的头脑。</span></div></div>';

    // ==================== 洗漱段 ====================
    html += '<div class="s-period"><div class="s-period-header">🛁 睡前洗漱段 <span>22:00 — 23:00（1小时）</span></div>';

    html += '<div class="s-block"><div class="s-time">22:00<br>30min</div><div class="s-body"><div class="s-title">🚿 洗澡 + 护肤</div><div class="s-desc"><strong>具体流程：</strong><br>① 调水温40°C左右。洗头：洗发水掌心搓出泡沫再上头，指腹按摩头皮，护发素只抹发尾。<br>② 洗脸：温和洗面奶，重点洗T区。温水冲净后用洗脸巾轻轻按干。<br>③ 护肤（洗完澡立刻做）：爽肤水→精华（1-2滴点涂推开）→乳液/面霜（锁水，脖子也要涂）→眼霜（无名指点拍，力度要轻）。<br><br><strong>提醒：</strong>每周1-2次深层清洁，但不要天天做。过度清洁比不清洁更伤皮肤。</div></div></div>';

    html += '<div class="s-block"><div class="s-time">22:30<br>20min</div><div class="s-body"><div class="s-title">🪥 刷牙 + 口腔护理</div><div class="s-desc"><strong>刷牙（至少3分钟）：</strong><br>① 软毛牙刷，牙膏黄豆大小。巴氏刷牙法：45度角对牙龈沟，小幅水平震动，每次刷2-3颗牙。外侧→内侧→咬合面。<br>② 刷舌头：舌根往舌尖轻刷3-5下，去除舌苔。<br>③ 牙线：30cm牙线绕中指，拉锯式进入牙缝，C字形刮3-4下。每个牙缝都要清。刚开始出血正常，坚持一周就好。<br>④ 漱口水（可选）：含30秒吐掉，之后半小时不喝水不吃东西。</div></div></div>';

    html += '<div class="s-block"><div class="s-time">22:50<br>10min</div><div class="s-body"><div class="s-title">📵 放下手机 + 放松</div><div class="s-desc"><strong>为什么这10分钟决定明天状态：</strong>手机蓝光抑制褪黑素，睡前不看屏幕入睡快20-30分钟。<br><br><strong>三选一：</strong><br>① 冥想：闭眼专注呼吸，吸气默念"吸"呼气"呼"，走神了温柔拉回。5分钟。<br>② 渐进式肌肉放松：脚趾→小腿→大腿→腹部→胸部→手臂→肩膀→面部，逐一收紧5秒→放松。<br>③ 翻纸质书：散文、漫画、诗集，看到眼皮打架就关灯。<br><br><strong>手机放哪：</strong>房间另一头的桌子上，不是床头柜。半夜醒了随手拿起来刷就天亮。</div></div></div>';

    html += '<div class="s-gap">23:00 关灯睡觉 😴<br><span style="font-size:0.68rem">全黑环境——拉好窗帘、关掉指示灯。室温18-22°C。明天6:00见。</span></div></div>';

    // ==================== 核心原则 ====================
    html += '<div class="s-note"><strong>🎯 核心原则：</strong><br>• <strong>上午 = 练字 + 画画</strong>——手稳心静，光线好，精细动作最佳时段<br>• <strong>下午 = 英语 + 运动</strong>——体温最高时运动效果最好，英语穿插在运动前后巩固记忆<br>• <strong>晚上 = 自由创作 + 阅读 + 复盘</strong>——放松式学习，享受过程<br>• <strong>晨读</strong>每天30分钟大声朗读英语，利用清晨记忆黄金期<br>• <strong>唱歌</strong>晚上当放松，不用有压力<br>• <strong>洗漱</strong>22:00-23:00完整1小时，认真对待自己<br><br><strong>📌 弹性原则：</strong>状态不好时优先保证：画画 > 英语 > 运动 > 其他。完成60%就是胜利。<strong>连续比完美更重要。</strong></div>';

    // ==================== 总结表 ====================
    html += '<div class="s-summary"><h3>每日时间分配总览</h3><table class="s-table"><tr><th>模块</th><th>每日时长</th><th>时段分布</th></tr>';
    html += '<tr><td>🎨 画画</td><td>3小时40分</td><td>上午100min（主课）+ 上午60min（第二练）+ 晚上60min（自由创作）</td></tr>';
    html += '<tr><td>📖 英语</td><td>3小时20分</td><td>清晨30min（晨读）+ 下午90min（主课）+ 下午50min（巩固）+ 下午30min（听力）</td></tr>';
    html += '<tr><td>✍ 练字</td><td>60分钟</td><td>清晨 07:00-08:00</td></tr>';
    html += '<tr><td>🏃 运动</td><td>50分钟</td><td>下午 14:40-15:30</td></tr>';
    html += '<tr><td>📚 输入输出</td><td>60分钟</td><td>上午30min（费曼）+ 晚上30min（阅读）</td></tr>';
    html += '<tr><td>💬 表达力</td><td>30分钟</td><td>下午 16:30-17:00</td></tr>';
    html += '<tr><td>🎵 唱歌</td><td>30分钟</td><td>晚上 20:10-20:40</td></tr>';
    html += '<tr class="s-total"><td>成长学习</td><td>约10小时</td><td>清晨2h + 上午3.5h + 下午4.5h + 晚上3h</td></tr>';
    html += '<tr><td>🛁 睡前洗漱</td><td>1小时</td><td>22:00-23:00</td></tr>';
    html += '<tr class="s-total"><td>合计（含洗漱）</td><td>约13小时</td><td>6:00 — 23:00</td></tr>';
    html += '<tr class="s-total"><td>😴 睡眠</td><td>7小时</td><td>23:00 — 6:00</td></tr>';
    html += '</table></div>';

    html += '</div>';
    main.innerHTML = html;
    document.addEventListener('keydown', handleKeyboard);
  }

  // ---------- 渲染模块 ----------
  function renderModule(module) {
    currentModule = module;
    const res = MODULE_RESOURCES[module];
    const stats = getStats(module);
    const main = document.getElementById('main-content');

    let html = '<div class="module-header"><h2>' + res.icon + ' ' + res.name + '</h2><p class="module-desc">' + getModuleDesc(module) + '</p></div>';

    html += '<div class="stats-row"><div class="stat-card"><div class="stat-label">连续打卡</div><div class="stat-value">' + stats.streak + ' <span class="stat-unit">天</span></div></div><div class="stat-card"><div class="stat-label">累计时长</div><div class="stat-value">' + stats.totalDuration + ' <span class="stat-unit">分钟</span></div></div><div class="stat-card"><div class="stat-label">总打卡次数</div><div class="stat-value">' + stats.totalCount + ' <span class="stat-unit">次</span></div></div>';
    if (module === 'vocabulary') html += '<div class="stat-card"><div class="stat-label">累计单词</div><div class="stat-value">' + stats.totalWords + ' <span class="stat-unit">个</span></div></div>';
    html += '</div>';

    if (res.showProgress) {
      const pct = Math.min(100, Math.round((stats.totalWords / res.progressTarget) * 100));
      html += '<div class="progress-section"><div class="progress-header"><span>' + res.progressLabel + '</span><span class="progress-value">' + stats.totalWords + ' / ' + res.progressTarget + ' (' + pct + '%)</span></div><div class="progress-bar"><div class="progress-bar-fill" style="width:' + pct + '%"></div></div></div>';
    }

    // 打卡面板
    html += '<div class="panel"><div class="panel-header"><h3>📝 今日打卡</h3><span class="text-muted" style="font-size:0.78rem">' + formatDate(new Date()) + '</span></div><div class="panel-body"><form id="checkin-form" onsubmit="return false;"><div class="form-row"><div class="form-group"><label>学习时长（分钟）</label><input type="number" id="checkin-duration" min="1" max="480" value="30" required></div>';
    if (module === 'vocabulary') html += '<div class="form-group"><label>单词数量</label><input type="number" id="checkin-count" min="1" max="500" value="50"></div>';
    html += '<div class="form-group"><label>日期</label><input type="date" id="checkin-date" value="' + formatDate(new Date()) + '"></div>';
    if (module === 'calligraphy' || module === 'drawing') html += '<div class="form-group"><label>成果图片</label><input type="file" id="checkin-images" accept="image/*" multiple style="font-size:0.8rem"></div>';
    html += '</div><div class="form-group mb-16"><label>备注</label><textarea id="checkin-note" placeholder="记录今天的学习心得..."></textarea></div><button type="button" class="btn btn-primary" id="btn-checkin">✓ 打卡</button></form></div></div>';

    // 热力图
    html += '<div class="panel"><div class="panel-header"><h3>📅 学习频率热力图（近一年）</h3></div><div class="panel-body"><div id="heatmap-container" class="heatmap-container"></div></div></div>';

    // 趋势图
    html += '<div class="panel"><div class="panel-header"><h3>📊 近30天学习时长趋势</h3></div><div class="panel-body"><div class="chart-wrapper"><canvas id="trend-chart"></canvas></div></div></div>';

    // 今日推荐（每日轮换）
    const dailyPick = getDailyPick(module);
    if (dailyPick) {
      html += '<div class="panel"><div class="panel-header"><h3>⭐ 今日推荐</h3><span class="text-muted" style="font-size:0.72rem">每日轮换 · ' + formatDate(new Date()) + '</span></div><div class="panel-body"><div class="daily-pick"><div class="daily-pick-stage">' + dailyPick.stage.label + ' 阶段</div><div class="resource-item" style="border-color:var(--text-primary);background:var(--bg-secondary);"><a href="' + dailyPick.resource.url + '" target="_blank" rel="noopener">' + dailyPick.resource.title + '</a><div class="resource-meta"><span>' + dailyPick.resource.source + '</span><span>' + dailyPick.resource.duration + '</span></div><div class="resource-tip">💡 ' + dailyPick.resource.tip + '</div></div></div></div></div>';
    }

    // 内容推送（阶段解锁）
    const stageStatus = getStageStatus(module);
    html += '<div class="panel"><div class="panel-header"><h3>📚 系统化学习资源</h3><span class="text-muted" style="font-size:0.72rem">已打卡 ' + stageStatus.totalDays + ' 次 · 当前第 ' + (stageStatus.currentStageIdx + 1) + ' 阶段</span></div><div class="panel-body">';

    // 阶段进度条
    html += '<div class="stage-progress-section"><div class="stage-progress-bar">';
    res.stages.forEach((stage, idx) => {
      const isUnlocked = stageStatus.unlockedStages.includes(idx);
      const isCurrent = idx === stageStatus.currentStageIdx;
      const pct = Math.min(100, (stageStatus.totalDays / Math.max(1, stage.unlockDays || 1)) * 100);
      html += '<div class="stage-progress-item' + (isUnlocked ? ' unlocked' : '') + (isCurrent ? ' current' : '') + '" title="' + stage.label + (isUnlocked ? ' ✓' : ' 🔒 打卡' + (stage.unlockDays || 0) + '次解锁') + '"><span class="stage-progress-label">' + stage.label + '</span>' + (isUnlocked ? '<span class="stage-progress-check">✓</span>' : '<span class="stage-progress-lock">🔒</span>') + '</div>';
    });
    html += '</div></div>';

    res.stages.forEach((stage, idx) => {
      const isUnlocked = stageStatus.unlockedStages.includes(idx);
      const isCurrent = idx === stageStatus.currentStageIdx;
      const unlockAt = stage.unlockDays || 0;

      if (isUnlocked) {
        html += '<div class="stage-section' + (isCurrent ? ' stage-current' : '') + '"><div class="stage-header"><span class="stage-badge">' + stage.label + '</span><h4>阶段 ' + (idx + 1) + ' / ' + res.stages.length + (isCurrent ? ' · 当前' : ' ✓ 已完成') + '</h4></div><div class="resource-list">';
        stage.resources.forEach(r => {
          html += '<div class="resource-item"><a href="' + r.url + '" target="_blank" rel="noopener">' + r.title + '</a><div class="resource-meta"><span>' + r.source + '</span><span>' + r.duration + '</span></div><div class="resource-tip">💡 ' + r.tip + '</div></div>';
        });
        html += '</div></div>';
      } else {
        html += '<div class="stage-section stage-locked"><div class="stage-header"><span class="stage-badge stage-badge-locked">' + stage.label + '</span><h4>阶段 ' + (idx + 1) + ' / ' + res.stages.length + ' · 🔒 打卡 ' + unlockAt + ' 次解锁（还差 ' + (unlockAt - stageStatus.totalDays) + ' 次）</h4></div><div class="stage-locked-hint"><p>继续打卡 ' + (unlockAt - stageStatus.totalDays) + ' 次即可解锁此阶段内容</p></div></div>';
      }
    });
    html += '</div></div>';

    // 运动周计划
    if (res.weeklyPlan) {
      const plan = res.defaultWeeklyPlan;
      html += '<div class="panel"><div class="panel-header"><h3>🗓️ ' + res.weeklyPlanLabel + '</h3><button class="btn btn-sm" id="btn-export-plan">📥 导出 CSV</button></div><div class="panel-body"><div class="weekly-plan">';
      plan.forEach(day => {
        html += '<div class="plan-day"><div class="plan-day-header">' + day.day + '<div class="focus">' + day.focus + '</div></div><div class="plan-day-body">';
        day.actions.forEach(a => html += '<div class="plan-action"><div class="action-name">' + a.name + '</div><div class="action-detail">' + a.sets + ' × ' + a.reps + ' · ' + a.difficulty + '</div></div>');
        html += '</div></div>';
      });
      html += '</div></div></div>';
    }

    // 打卡历史
    const checkins = getModuleData(module).checkins || [];
    html += '<div class="panel"><div class="panel-header"><h3>📋 打卡历史</h3><span class="text-muted" style="font-size:0.78rem">共 ' + checkins.length + ' 条记录</span></div><div class="panel-body">';
    if (checkins.length === 0) {
      html += '<div class="empty-state"><div class="empty-icon">📭</div><p>还没有打卡记录，开始你的第一次打卡吧！</p></div>';
    } else {
      html += '<div class="checkin-list">';
      checkins.forEach(c => {
        const imgs = c.images || [];
        html += '<div class="checkin-item">' + (imgs.length > 0 ? '<img class="checkin-thumb" src="' + imgs[0] + '" alt="成果图">' : '<div class="checkin-thumb-placeholder">📝</div>') + '<div class="checkin-info"><div class="date">' + formatDate(c.date) + ' ' + (c.time || '') + '</div><div class="duration">' + (c.duration || 0) + ' 分钟' + (module === 'vocabulary' && c.count ? ' · ' + c.count + ' 个单词' : '') + '</div>' + (c.note ? '<div class="note">' + c.note + '</div>' : '') + (imgs.length > 1 ? '<div class="checkin-images">' + imgs.slice(1).map(img => '<img src="' + img + '" alt="">').join('') + '</div>' : '') + '</div><button class="btn btn-ghost btn-sm" data-delete="' + c.id + '" style="align-self:flex-start">✕</button></div>';
      });
      html += '</div>';
    }
    html += '</div></div>';

    main.innerHTML = html;
    bindEvents(module);

    setTimeout(() => {
      renderHeatmap(document.getElementById('heatmap-container'), module);
      const chartContainer = document.querySelector('.chart-wrapper');
      if (chartContainer) renderChart(chartContainer, module);
    }, 100);
  }

  function getModuleDesc(module) {
    const descs = { intake: '好书→好电影→纪录片→费曼输出，持续输入持续输出', expression: '认知破冰 → 每日跟练 → 结构化表达 → 即兴表达 → 沟通进阶', calligraphy: '基础笔画 → 间架结构 → 章法布局', drawing: '控笔 → 视觉感知 → 抓形 → 临摹 → 色彩 → 人体 → 透视 → 创意绘画', vocabulary: '词根词缀 → 听力输入 → 口语输出 → 语法框架 → 长期环境', singing: '零基础声乐：呼吸 → 发声 → 音准 → 共鸣 → 咬字 → 情感', sports: '大基数适宜 · 无器械 · 居家力量训练' };
    return descs[module] || '';
  }

  // ---------- 事件绑定 ----------
  function bindEvents(module) {
    const btnCheckin = document.getElementById('btn-checkin');
    if (btnCheckin) btnCheckin.addEventListener('click', () => handleCheckin(module));

    document.querySelectorAll('[data-delete]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('确定删除这条打卡记录吗？')) {
          deleteCheckin(module, btn.getAttribute('data-delete'));
          renderModule(module); updateNavCounts();
          toast('已删除打卡记录');
        }
      });
    });

    const btnExport = document.getElementById('btn-export-plan');
    if (btnExport) btnExport.addEventListener('click', () => exportWeeklyPlan(module));

    document.addEventListener('keydown', handleKeyboard);
  }

  // ---------- 打卡处理 ----------
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
    renderModule(module); updateNavCounts();

    // 金币奖励：基础10金币 + 时长加成（每10分钟+1金币）+ 连续打卡加成
    const baseCoins = 10;
    const durationBonus = Math.floor(duration / 10);
    const stats = getStats(module);
    const streakBonus = Math.min(stats.streak, 30); // 连续打卡每天+1，最多30
    const totalCoins = baseCoins + durationBonus + streakBonus;
    const coinData = getCoinData();
    const newBalance = addCoins(totalCoins, `${MODULE_RESOURCES[module].icon} ${MODULE_RESOURCES[module].name} · ${duration}分钟`);

    toast(`✅ 打卡成功！+${totalCoins}💰（余额：${newBalance}）`);
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function handleKeyboard(e) {
    if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '9') {
      e.preventDefault();
      switchModule(MODULES[parseInt(e.key) - 1]);
    }
    if ((e.ctrlKey || e.metaKey) && e.key === '0') {
      e.preventDefault();
      switchModule(MODULES[9]); // news is 10th
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
    // 在 body 最前面插入金币栏
    const bar = document.createElement('div');
    bar.className = 'coin-bar';
    bar.id = 'coin-bar';
    const data = getCoinData();
    bar.innerHTML = '<div class="coin-bar-inner"><div class="coin-balance-wrap">🪙 <span id="coin-balance">' + data.balance + '</span> 金币</div><button class="btn btn-sm btn-gold" id="btn-open-shop">🏪 奖励商店</button></div>';
    document.body.insertBefore(bar, document.body.firstChild);

    // 绑定商店按钮
    setTimeout(() => {
      const shopBtn = document.getElementById('btn-open-shop');
      if (shopBtn) shopBtn.addEventListener('click', renderShop);
    }, 100);
  }

  function renderShop() {
    const main = document.getElementById('main-content');
    const data = getCoinData();
    let html = '<div class="shop-container">';
    html += '<div class="shop-header"><h2>🏪 奖励商店</h2><p class="shop-subtitle">完成任务赚金币，用金币兑换奖励 🪙 余额：<strong>' + data.balance + '</strong></p></div>';

    // 金币获取规则
    html += '<div class="shop-rules"><strong>💰 赚金币规则：</strong><br>每次打卡 +10💰 基础奖励<br>每练习10分钟 +1💰 时长加成<br>连续打卡每天 +1💰（最高+30）</div>';

    // 已兑换记录
    if (data.redeemed.length > 0) {
      html += '<div class="shop-section"><h3>🎉 已兑换奖励</h3><div class="redeemed-list">';
      data.redeemed.slice(0, 10).forEach(r => {
        html += '<div class="redeemed-item"><span>' + r.icon + ' ' + r.name + '</span><span class="redeemed-cost">-' + r.cost + '💰</span></div>';
      });
      html += '</div></div>';
    }

    // 商品列表
    html += '<div class="shop-section"><h3>🛒 可兑换奖励</h3><div class="shop-grid">';
    REWARD_SHOP.forEach(r => {
      const canAfford = data.balance >= r.cost;
      html += '<div class="shop-item' + (canAfford ? '' : ' shop-item-locked') + '"><div class="shop-item-icon">' + r.icon + '</div><div class="shop-item-name">' + r.name + '</div><div class="shop-item-desc">' + r.desc + '</div><div class="shop-item-cost">🪙 ' + r.cost + '</div><button class="btn btn-sm ' + (canAfford ? 'btn-gold' : '') + '" ' + (canAfford ? '' : 'disabled') + ' data-redeem="' + r.id + '">' + (canAfford ? '兑换' : '金币不足') + '</button></div>';
    });
    html += '</div></div>';

    html += '</div>';
    main.innerHTML = html;

    // 绑定兑换按钮
    document.querySelectorAll('[data-redeem]').forEach(btn => {
      btn.addEventListener('click', () => {
        const rewardId = btn.getAttribute('data-redeem');
        const reward = REWARD_SHOP.find(r => r.id === rewardId);
        if (confirm('确定用 ' + reward.cost + '💰 兑换「' + reward.name + '」吗？')) {
          const success = redeemReward(rewardId);
          if (success) {
            toast('🎉 兑换成功！享受你的「' + reward.name + '」吧！');
            renderShop();
          }
        }
      });
    });

    // 高亮侧边栏无
    document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
  }

  function init() {
    // 创建顶部金币栏
    createCoinBar();
    renderNav();
    if (currentModule === 'schedule') renderSchedule();
    else if (currentModule === 'finance') renderFinance();
    else if (currentModule === 'news') renderNews();
    else renderModule(currentModule);
    updateNavCounts();
    updateCoinDisplay();
    const dateEl = document.getElementById('current-date');
    if (dateEl) dateEl.textContent = formatDate(new Date());

    // 汉堡菜单交互
    const hamburger = document.getElementById('hamburger-btn');
    const overlay = document.getElementById('sidebar-overlay');
    const sidebar = document.getElementById('sidebar');
    if (hamburger && overlay) {
      hamburger.addEventListener('click', () => {
        document.body.classList.toggle('sidebar-open');
      });
      overlay.addEventListener('click', () => {
        document.body.classList.remove('sidebar-open');
      });
      // 点击菜单项后自动关闭侧边栏
      sidebar.addEventListener('click', (e) => {
        if (e.target.closest('.nav-link')) {
          document.body.classList.remove('sidebar-open');
        }
      });
    }
  }

  return { init, switchModule, getData };
})();

document.addEventListener('DOMContentLoaded', () => App.init());
