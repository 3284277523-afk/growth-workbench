// ============================================================
// 个人成长与技能学习工作台 — 核心应用逻辑
// ============================================================

const App = (() => {
  // ---------- 配置 ----------
  const STORAGE_KEY = 'growth_workbench_data';
  const MODULES = ['calligraphy', 'drawing', 'vocabulary', 'singing', 'sports'];
  let currentModule = 'calligraphy';
  let chartInstance = null;

  // ---------- 数据管理 ----------
  function getData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const data = raw ? JSON.parse(raw) : {};
      MODULES.forEach(m => {
        if (!data[m]) data[m] = { checkins: [] };
      });
      return data;
    } catch { return {}; }
  }

  function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function getModuleData(module) {
    return getData()[module] || { checkins: [] };
  }

  function addCheckin(module, entry) {
    const data = getData();
    if (!data[module]) data[module] = { checkins: [] };
    data[module].checkins.unshift({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      ...entry
    });
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
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function formatTime(date) {
    const d = new Date(date);
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  }

  function now() {
    return new Date().toISOString();
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

  // ---------- 日历热力图 ----------
  function renderHeatmap(container, module) {
    const data = getModuleData(module);
    const checkins = data.checkins || [];

    // 最近365天
    const days = [];
    const today = new Date();
    for (let i = 364; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = formatDate(d);
      const count = checkins.filter(c => formatDate(c.date) === dateStr).length;
      days.push({ date: dateStr, dayOfWeek: d.getDay(), count });
    }

    // 按列组织（周日到周六）
    const columns = [];
    let currentCol = null;
    days.forEach((day, i) => {
      if (day.dayOfWeek === 0 || i === 0) {
        currentCol = { days: new Array(7).fill(null) };
        columns.push(currentCol);
      }
      currentCol.days[day.dayOfWeek] = day;
    });

    // 星期标签
    const dayLabels = ['日', '一', '二', '三', '四', '五', '六'];

    // 确定色阶
    const maxCount = Math.max(1, ...days.map(d => d.count));

    function getLevel(count) {
      if (count === 0) return 0;
      return Math.min(5, Math.ceil((count / maxCount) * 5));
    }

    let html = '<div class="heatmap-grid">';

    columns.forEach((col, colIdx) => {
      html += '<div class="heatmap-column">';
      // 月份标签（每4列显示一次）
      if (colIdx % 4 === 0 && col.days.some(d => d)) {
        const firstDay = col.days.find(d => d);
        if (firstDay) {
          const d = new Date(firstDay.date);
          const monthLabel = `${d.getMonth() + 1}月`;
          html += `<div class="heatmap-day-label">${monthLabel}</div>`;
        }
      } else {
        html += '<div class="heatmap-day-label"></div>';
      }

      for (let r = 0; r < 7; r++) {
        const day = col.days[r];
        if (day) {
          const level = getLevel(day.count);
          html += `<div class="heatmap-cell" data-level="${level}" title="${day.date}: ${day.count}次打卡"></div>`;
        } else {
          html += '<div class="heatmap-cell" data-level="0" style="visibility:hidden"></div>';
        }
      }
      html += '</div>';
    });

    html += '</div>';

    // 图例
    html += `
      <div class="heatmap-legend">
        <span>少</span>
        <span class="cell" style="background:var(--heat-0)"></span>
        <span class="cell" style="background:var(--heat-1)"></span>
        <span class="cell" style="background:var(--heat-2)"></span>
        <span class="cell" style="background:var(--heat-3)"></span>
        <span class="cell" style="background:var(--heat-4)"></span>
        <span class="cell" style="background:var(--heat-5)"></span>
        <span>多</span>
      </div>
    `;

    container.innerHTML = html;
  }

  // ---------- 趋势图 ----------
  function renderChart(container, module) {
    const data = getModuleData(module);
    const checkins = data.checkins || [];

    // 最近30天每天总时长
    const dailyMap = {};
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dailyMap[formatDate(d)] = 0;
    }

    checkins.forEach(c => {
      const ds = formatDate(c.date);
      if (dailyMap[ds] !== undefined) {
        dailyMap[ds] += (c.duration || 0);
      }
    });

    const labels = Object.keys(dailyMap);
    const values = Object.values(dailyMap);

    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }

    const canvas = container.querySelector('canvas');
    if (!canvas) return;

    chartInstance = new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: '学习时长（分钟）',
          data: values,
          backgroundColor: '#0a0a0a',
          borderRadius: 3,
          barPercentage: 0.6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0a0a0a',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            cornerRadius: 4,
            padding: 10,
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: '#8a8a8a',
              font: { size: 10 },
              maxTicksLimit: 10,
            }
          },
          y: {
            beginAtZero: true,
            grid: { color: '#f0f0f0' },
            ticks: {
              color: '#8a8a8a',
              font: { size: 10 },
            }
          }
        }
      }
    });
  }

  // ---------- 统计 ----------
  function getStats(module) {
    const data = getModuleData(module);
    const checkins = data.checkins || [];

    const totalDuration = checkins.reduce((s, c) => s + (c.duration || 0), 0);
    const totalCount = checkins.length;

    // 连续打卡天数
    let streak = 0;
    const today = formatDate(new Date());
    const sortedDates = [...new Set(checkins.map(c => formatDate(c.date)))].sort().reverse();

    let checkDate = new Date();
    for (const ds of sortedDates) {
      const expected = formatDate(checkDate);
      if (ds === expected) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else if (ds === formatDate(new Date(checkDate.getTime() - 86400000))) {
        // 允许差一天
        streak++;
        checkDate.setDate(checkDate.getDate() - 2);
      } else {
        break;
      }
    }

    // 单词模块特殊：累计单词量
    let totalWords = 0;
    if (module === 'vocabulary') {
      totalWords = checkins.reduce((s, c) => s + (c.count || 0), 0);
    }

    return { totalDuration, totalCount, streak, totalWords };
  }

  // ---------- 渲染模块 ----------
  function renderModule(module) {
    currentModule = module;
    const res = MODULE_RESOURCES[module];
    const stats = getStats(module);
    const main = document.getElementById('main-content');

    let html = '';

    // 模块标题
    html += `
      <div class="module-header">
        <h2>${res.icon} ${res.name}</h2>
        <p class="module-desc">${getModuleDesc(module)}</p>
      </div>
    `;

    // 统计卡片
    html += `
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-label">连续打卡</div>
          <div class="stat-value">${stats.streak} <span class="stat-unit">天</span></div>
        </div>
        <div class="stat-card">
          <div class="stat-label">累计时长</div>
          <div class="stat-value">${stats.totalDuration} <span class="stat-unit">分钟</span></div>
        </div>
        <div class="stat-card">
          <div class="stat-label">总打卡次数</div>
          <div class="stat-value">${stats.totalCount} <span class="stat-unit">次</span></div>
        </div>
    `;

    if (module === 'vocabulary') {
      html += `
        <div class="stat-card">
          <div class="stat-label">累计单词</div>
          <div class="stat-value">${stats.totalWords} <span class="stat-unit">个</span></div>
        </div>
      `;
    }

    html += `</div>`;

    // 单词进度条
    if (res.showProgress) {
      const pct = Math.min(100, Math.round((stats.totalWords / res.progressTarget) * 100));
      html += `
        <div class="progress-section">
          <div class="progress-header">
            <span>${res.progressLabel}</span>
            <span class="progress-value">${stats.totalWords} / ${res.progressTarget} (${pct}%)</span>
          </div>
          <div class="progress-bar">
            <div class="progress-bar-fill" style="width:${pct}%"></div>
          </div>
        </div>
      `;
    }

    // 打卡面板
    html += `
      <div class="panel">
        <div class="panel-header">
          <h3>📝 今日打卡</h3>
          <span class="text-muted" style="font-size:0.78rem">${formatDate(new Date())}</span>
        </div>
        <div class="panel-body">
          <form id="checkin-form" onsubmit="return false;">
            <div class="form-row">
              <div class="form-group">
                <label>学习时长（分钟）</label>
                <input type="number" id="checkin-duration" min="1" max="480" value="30" required>
              </div>
              ${module === 'vocabulary' ? `
              <div class="form-group">
                <label>单词数量</label>
                <input type="number" id="checkin-count" min="1" max="500" value="50">
              </div>
              ` : ''}
              <div class="form-group">
                <label>日期</label>
                <input type="date" id="checkin-date" value="${formatDate(new Date())}">
              </div>
              ${['calligraphy', 'drawing'].includes(module) ? `
              <div class="form-group">
                <label>成果图片</label>
                <input type="file" id="checkin-images" accept="image/*" multiple style="font-size:0.8rem">
              </div>
              ` : ''}
            </div>
            <div class="form-group mb-16">
              <label>备注</label>
              <textarea id="checkin-note" placeholder="记录今天的学习心得..."></textarea>
            </div>
            <button type="button" class="btn btn-primary" id="btn-checkin">✓ 打卡</button>
          </form>
        </div>
      </div>
    `;

    // 日历热力图
    html += `
      <div class="panel">
        <div class="panel-header">
          <h3>📅 学习频率热力图（近一年）</h3>
        </div>
        <div class="panel-body">
          <div id="heatmap-container" class="heatmap-container"></div>
        </div>
      </div>
    `;

    // 趋势图
    html += `
      <div class="panel">
        <div class="panel-header">
          <h3>📊 近30天学习时长趋势</h3>
        </div>
        <div class="panel-body">
          <div class="chart-wrapper">
            <canvas id="trend-chart"></canvas>
          </div>
        </div>
      </div>
    `;

    // 内容推送
    html += `
      <div class="panel">
        <div class="panel-header">
          <h3>📚 系统化学习资源推送</h3>
          <span class="text-muted" style="font-size:0.72rem">按进阶路径排序</span>
        </div>
        <div class="panel-body">
    `;

    res.stages.forEach(stage => {
      html += `
        <div class="stage-section">
          <div class="stage-header">
            <span class="stage-badge">${stage.label}</span>
            <h4>阶段 ${res.stages.indexOf(stage) + 1} / ${res.stages.length}</h4>
          </div>
          <div class="resource-list">
      `;
      stage.resources.forEach(r => {
        html += `
          <div class="resource-item">
            <a href="${r.url}" target="_blank" rel="noopener">${r.title}</a>
            <div class="resource-meta">
              <span>${r.source}</span>
              <span>${r.duration}</span>
            </div>
            <div class="resource-tip">💡 ${r.tip}</div>
          </div>
        `;
      });
      html += `</div></div>`;
    });

    html += `</div></div>`;

    // 运动周计划
    if (res.weeklyPlan) {
      const plan = res.defaultWeeklyPlan;
      html += `
        <div class="panel" id="weekly-plan-panel">
          <div class="panel-header">
            <h3>🗓️ ${res.weeklyPlanLabel}</h3>
            <button class="btn btn-sm" id="btn-export-plan">📥 导出 Excel</button>
          </div>
          <div class="panel-body">
            <div class="weekly-plan">
      `;
      plan.forEach(day => {
        html += `
          <div class="plan-day">
            <div class="plan-day-header">
              ${day.day}
              <div class="focus">${day.focus}</div>
            </div>
            <div class="plan-day-body">
        `;
        day.actions.forEach(a => {
          html += `
            <div class="plan-action">
              <div class="action-name">${a.name}</div>
              <div class="action-detail">${a.sets} × ${a.reps} · ${a.difficulty}</div>
            </div>
          `;
        });
        html += `</div></div>`;
      });
      html += `</div></div></div>`;
    }

    // 打卡历史
    const checkins = getModuleData(module).checkins || [];
    html += `
      <div class="panel">
        <div class="panel-header">
          <h3>📋 打卡历史</h3>
          <span class="text-muted" style="font-size:0.78rem">共 ${checkins.length} 条记录</span>
        </div>
        <div class="panel-body">
    `;

    if (checkins.length === 0) {
      html += `
        <div class="empty-state">
          <div class="empty-icon">📭</div>
          <p>还没有打卡记录，开始你的第一次打卡吧！</p>
        </div>
      `;
    } else {
      html += `<div class="checkin-list">`;
      checkins.forEach(c => {
        const imgs = c.images || [];
        html += `
          <div class="checkin-item">
            ${imgs.length > 0
              ? `<img class="checkin-thumb" src="${imgs[0]}" alt="成果图">`
              : `<div class="checkin-thumb-placeholder">📝</div>`
            }
            <div class="checkin-info">
              <div class="date">${formatDate(c.date)} ${c.time || ''}</div>
              <div class="duration">${c.duration || 0} 分钟${module === 'vocabulary' && c.count ? ` · ${c.count} 个单词` : ''}</div>
              ${c.note ? `<div class="note">${c.note}</div>` : ''}
              ${imgs.length > 1 ? `
                <div class="checkin-images">
                  ${imgs.slice(1).map(img => `<img src="${img}" alt="">`).join('')}
                </div>
              ` : ''}
            </div>
            <button class="btn btn-ghost btn-sm" data-delete="${c.id}" style="align-self:flex-start">✕</button>
          </div>
        `;
      });
      html += `</div>`;
    }

    html += `</div></div>`;

    main.innerHTML = html;

    // 绑定事件
    bindEvents(module);

    // 渲染图表
    setTimeout(() => {
      renderHeatmap(document.getElementById('heatmap-container'), module);
      const chartContainer = document.querySelector('.chart-wrapper');
      if (chartContainer) renderChart(chartContainer, module);
    }, 100);
  }

  function getModuleDesc(module) {
    const descs = {
      calligraphy: '基础笔画 → 间架结构 → 章法布局',
      drawing: '控笔 → 抓形 → 临摹 → 色彩 → 人体 → 透视',
      vocabulary: '每日积累，营造长期英语学习环境',
      singing: '零基础声乐：呼吸 → 发声 → 音准 → 共鸣 → 咬字 → 情感',
      sports: '大基数适宜 · 无器械 · 居家力量训练'
    };
    return descs[module] || '';
  }

  // ---------- 事件绑定 ----------
  function bindEvents(module) {
    // 打卡按钮
    const btnCheckin = document.getElementById('btn-checkin');
    if (btnCheckin) {
      btnCheckin.addEventListener('click', () => handleCheckin(module));
    }

    // 删除按钮
    document.querySelectorAll('[data-delete]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-delete');
        if (confirm('确定删除这条打卡记录吗？')) {
          deleteCheckin(module, id);
          renderModule(module);
          updateNavCounts();
          toast('已删除打卡记录');
        }
      });
    });

    // 导出Excel
    const btnExport = document.getElementById('btn-export-plan');
    if (btnExport) {
      btnExport.addEventListener('click', () => exportWeeklyPlan(module));
    }

    // 键盘快捷键
    document.addEventListener('keydown', handleKeyboard);
  }

  // ---------- 打卡处理 ----------
  async function handleCheckin(module) {
    const duration = parseInt(document.getElementById('checkin-duration').value) || 0;
    const date = document.getElementById('checkin-date').value;
    const note = document.getElementById('checkin-note')?.value || '';
    const count = document.getElementById('checkin-count')?.value
      ? parseInt(document.getElementById('checkin-count').value)
      : null;

    if (!duration || duration <= 0) {
      toast('请输入有效时长');
      return;
    }

    // 处理图片
    let images = [];
    const imageInput = document.getElementById('checkin-images');
    if (imageInput && imageInput.files.length > 0) {
      for (const file of imageInput.files) {
        try {
          const base64 = await fileToBase64(file);
          images.push(base64);
        } catch (e) {
          console.error('图片读取失败:', e);
        }
      }
    }

    addCheckin(module, {
      date,
      time: formatTime(new Date()),
      duration,
      note,
      images,
      count
    });

    renderModule(module);
    updateNavCounts();
    toast('✅ 打卡成功！');
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // ---------- Excel 导出 ----------
  function exportWeeklyPlan(module) {
    const res = MODULE_RESOURCES[module];
    if (!res.weeklyPlan) return;

    const plan = res.defaultWeeklyPlan;

    // 构建工作表数据
    const wsData = [['日期', '训练重点', '动作名称', '组数', '次数/时长', '难度']];

    plan.forEach(day => {
      day.actions.forEach((a, i) => {
        wsData.push([
          i === 0 ? day.day : '',
          i === 0 ? day.focus : '',
          a.name,
          a.sets,
          a.reps,
          a.difficulty
        ]);
      });
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // 设置列宽
    ws['!cols'] = [
      { wch: 8 },
      { wch: 14 },
      { wch: 24 },
      { wch: 8 },
      { wch: 14 },
      { wch: 8 }
    ];

    XLSX.utils.book_append_sheet(wb, ws, '周训练计划');
    XLSX.writeFile(wb, `运动周计划_${formatDate(new Date())}.xlsx`);
    toast('📥 周计划已导出');
  }

  // ---------- 键盘快捷键 ----------
  function handleKeyboard(e) {
    // Ctrl/Cmd + 1-5 切换模块
    if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '5') {
      e.preventDefault();
      const idx = parseInt(e.key) - 1;
      switchModule(MODULES[idx]);
    }
  }

  // ---------- 导航切换 ----------
  function switchModule(module) {
    currentModule = module;
    document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
    const target = document.querySelector(`[data-module="${module}"]`);
    if (target) target.classList.add('active');

    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }

    renderModule(module);
  }

  function updateNavCounts() {
    MODULES.forEach(m => {
      const data = getModuleData(m);
      const el = document.querySelector(`[data-module="${m}"] .nav-count`);
      if (el) {
        const count = data.checkins ? data.checkins.length : 0;
        el.textContent = count > 0 ? `${count}次` : '';
      }
    });
  }

  // ---------- 导航渲染 ----------
  function renderNav() {
    const nav = document.getElementById('nav-list');
    let html = '';
    MODULES.forEach(m => {
      const res = MODULE_RESOURCES[m];
      const data = getModuleData(m);
      const count = data.checkins ? data.checkins.length : 0;
      html += `
        <li class="nav-item">
          <button class="nav-link${m === currentModule ? ' active' : ''}" data-module="${m}">
            <span class="nav-icon">${res.icon}</span>
            <span>${res.name}</span>
            <span class="nav-count">${count > 0 ? `${count}次` : ''}</span>
          </button>
        </li>
      `;
    });
    nav.innerHTML = html;

    // 绑定点击事件
    nav.querySelectorAll('.nav-link').forEach(btn => {
      btn.addEventListener('click', () => {
        const module = btn.getAttribute('data-module');
        switchModule(module);
      });
    });
  }

  // ---------- 初始化 ----------
  function init() {
    renderNav();
    renderModule(currentModule);
    updateNavCounts();

    // 显示日期
    const dateEl = document.getElementById('current-date');
    if (dateEl) {
      dateEl.textContent = formatDate(new Date());
    }
  }

  // ---------- 公开 API ----------
  return { init, switchModule, getData };
})();

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => App.init());
