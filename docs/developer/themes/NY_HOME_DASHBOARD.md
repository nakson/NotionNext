# Custom 主题首页：Personal OS Dashboard

> 文档说明 custom 主题首页的设计理念、信息架构、代码实现与未来规划。  
> 最后更新：2026-06

> **文档位置说明：** 本文档放在 `docs/developer/themes/custom/`，而非 `themes/custom/` 目录内。  
> 原因：`themes/theme.js` 通过 `import(\`@/themes/${name}\`)` 动态加载主题时，Webpack 会扫描 `themes/` 下**所有**子路径；在主题目录内放置 `.md` 等非 JS 文件会导致构建失败。

---

## 一、设计哲学

### 核心隐喻

首页不是「文章列表」，而是一台**安静的个人操作系统**——启动后看到：

- **系统状态**（Hero）
- **应用网格**（Bento 世界观模块）
- **最近日志**（次级时间线）

这与主题其他层级的隐喻保持一致：

| 区域 | 隐喻 | 已有实现 |
|------|------|----------|
| 侧栏 | 用户会话 / 身份 | `TaniaSideBar` |
| Hero | 系统启动序列 | `INIT_SEQUENCE` 终端风 |
| Bento 网格 | 已安装的应用 / 世界观模块 | 阅读记录、音乐、随想录、料理食谱 |
| 最近日志 | `stdout` 输出流 | 非无限流的 5 条更新 |
| 分类页 | 各应用的专属界面 | `category/views/` 专属视图 |

### 对「五大趋势」的取舍

个人站点常见趋势（Bento、数字花园、个人 OS、AI 界面、超大排版）并非全部堆叠，而是**克制叠加 2–3 种**：

| 趋势 | 是否吸收 | 做法 |
|------|----------|------|
| Bento 模块化网格 | ✅ 高 | 主区上半 2×2 响应式 grid，每格 = 一个分类世界观 |
| 数字花园 / 非线性 | ✅ 高 | 模块按「常青价值」手动配置顺序，而非纯时间排序 |
| 个人 OS / 终端风 | ✅ 极高 | 侧栏 + Hero 终端 + `stdout` 日志命名；等宽字体仅用于 chrome |
| AI 动态界面 | ⏳ 预留 | 命令层输入框，不作首屏聊天泡泡 |
| 超大排版 + 重微交互 | ❌ 低 | 与 Gruvbox 阅读气质冲突，仅作局部 hover |

### 设计原则

1. **安静优先于炫技** — 默认 `HEXO_THEME_CYBER_INTENSITY: low`；微交互限于 `transform` / `opacity` 轻 hover。
2. **Bento 是入口，不是全文** — 每格只展示：分类名、描述、最新 1 条预览、文章数；点击进入分类专属视图。
3. **数字花园 = 常青模块** — 固定曝光世界观支柱分类；知识图谱 / 双向链接留作 V2。
4. **终端 OS 收敛使用** — Hero 状态从装饰变为可读指标；正文仍用人类可读字体栈。
5. **AI 是命令层，不是聊天层** — `> ask ...` 输入框 + 终端 stdout 输出，避免大面积对话 UI。

### 明确不做

- 全屏杂志风超大 Hero
- 首页无限滚动长 feed
- 首版知识图谱星空导航
- 每卡片 AI 动态摘要

---

## 二、信息架构

```
┌─────────────────────────────────────────────────┐
│  [侧栏] 身份 / 问候 / 社交 / 暗色切换              │  ← TaniaSideBar
├─────────────────────────────────────────────────┤
│  INIT_SEQUENCE 终端 Hero                         │
│    · Typed 问候语                                 │
│    · posts.total / month.delta / reading.latest  │
│    · Agent 命令框占位                             │
├─────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐                       │
│  │ 阅读记录  │ │ 音乐手记  │  ...                 │  ← HomeBentoGrid
│  │ latest · │ │ latest · │                       │
│  └──────────┘ └──────────┘                       │
├─────────────────────────────────────────────────┤
│  stdout · recent.log（默认 5 条）                  │  ← HomeRecentLogs
└─────────────────────────────────────────────────┘
```

### Bento 模块与分类专属视图的衔接

点击 Bento 格进入 `/category/{分类名}`，由 `category/registry.js` 解析为专属视图：

| 分类 | viewId | 视图文件 |
|------|--------|----------|
| 阅读记录 | `reading-poster-gallery` | `ReadingGalleryCategoryView.js` |
| 音乐 | `music-notes` | `MusicNotesCategoryView.js` |
| 随想录 | `essay-index` | `EssayIndexCategoryView.js` |
| 料理食谱 | `fine-dining-menu` | `FineDiningMenuCategoryView.js` |

---

## 三、代码实现

### 文件结构

```
docs/developer/themes/custom/
└── HOME_DASHBOARD.md              ← 本文档（设计 / 实现 / 规划）

themes/custom/
├── config.js                      ← HOME_BENTO_MODULES 等配置
├── index.js                       ← LayoutIndex → HomeDashboard
├── utils/
│   └── homeDashboardData.js       ← 数据聚合工具函数
├── components/
│   ├── Hero.js                    ← 终端 Hero + 系统状态 + Agent 占位
│   └── home/
│       ├── HomeDashboard.js       ← 首页主容器
│       ├── HomeBentoGrid.js       ← Bento 网格
│       ├── HomeCategoryTile.js    ← 单格分类入口
│       ├── HomeRecentLogs.js      ← 次级时间线
│       └── HomeAgentCommand.js    ← Agent 命令框占位
└── style_tania.js                 ← .home-* / .cyber-hero-status 等样式
```

### 数据流

```
pages/index.js (getStaticProps)
  │
  ├─ props.posts          ← 可能经分页截断（供其他场景）
  ├─ props.homePosts      ← 全量已发布文章（分页前副本，经 cleanPostSummaries）
  │
  └─ DynamicLayout → LayoutIndex
        │
        ├─ LayoutBase → Hero({ homePosts, posts })
        │     └─ buildHomeSystemStatus(homePosts)
        │
        └─ HomeDashboard({ homePosts, posts })
              ├─ HomeBentoGrid → buildCategoryTileData(modules, homePosts)
              └─ HomeRecentLogs → getRecentLogs(homePosts, count)
```

**为何需要 `homePosts`：** Bento 需按分类聚合全文计数与最新文章；若仅用分页后的 `posts`，统计会不准确。`pages/index.js` 在 `POST_LIST_STYLE === 'page'` 截断前保留全量副本。

### 核心组件职责

#### `HomeDashboard`

首页主区容器，组合 Bento 与最近日志。数据源优先 `homePosts`，回退 `posts`。

#### `HomeBentoGrid` + `HomeCategoryTile`

- 读取 `config.HOME_BENTO_MODULES` 配置顺序
- 每格展示：标题、描述、文章数、最新 1 条 `latest · {title}`
- 链接至 `/category/{encodeURIComponent(category)}`

#### `HomeRecentLogs`

- 终端 `stdout · recent.log` 风格
- 默认 5 条，按 `publishDate` → `publishDay` → `lastEditedDate` 倒序
- 展示序号、标题、分类、发布日期

#### `Hero`

- 保留 `INIT_SEQUENCE` chrome 与 Typed 问候语
- 新增系统状态行：`posts.total`、`month.delta`、`reading.latest`
- 内嵌 `HomeAgentCommand` 命令框

#### `homeDashboardData.js`

| 函数 | 用途 |
|------|------|
| `buildCategoryTileData(modules, homePosts)` | Bento 每格聚合 count + latestPost + href |
| `buildHomeSystemStatus(homePosts)` | Hero 状态：总数、本月更新、最近阅读 |
| `getRecentLogs(homePosts, count)` | 最近 N 条日志 |

### 样式约定

样式集中在 `style_tania.js`：

- **Glass 材质** — Bento / 日志面板沿用 `--glass-fill`、`--glass-border` token
- **等宽 chrome** — `.cyber-mono` 用于标题栏、索引、`latest ·` 标签
- **衬线标题** — Bento 格标题用 `Domine`（`--font-serif`）
- **轻 hover** — `translateY(-1px)` + 半透明背景，无 WebGL / 3D

### 入口挂载点

`themes/custom/index.js`：

```js
// LayoutBase：首页且开启 Banner 时渲染 Hero
router.route === '/' && siteConfig('HEXO_HOME_BANNER_ENABLE')
  ? <Hero {...props} />
  : null

// LayoutIndex：替换原 BlogPostList
const LayoutIndex = props => (
  <div className='overflow-hidden'>
    <HomeDashboard {...props} />
  </div>
)
```

---

## 四、配置说明

在 `themes/custom/config.js` 中：

```js
HOME_BENTO_MODULES: [
  {
    category: '阅读记录',   // 须与 Notion 分类名完全一致
    title: '阅读记录',
    description: '书籍摘抄与阅读笔记'
  },
  // ...
],

HOME_RECENT_LOG_COUNT: 5,           // 最近日志条数
HOME_AGENT_COMMAND_ENABLED: true,   // 是否显示 Agent 命令框
```

### 自定义指南

| 需求 | 操作 |
|------|------|
| 增删 Bento 模块 | 修改 `HOME_BENTO_MODULES` 数组顺序与内容 |
| 调整日志条数 | 修改 `HOME_RECENT_LOG_COUNT` |
| 隐藏 Agent 输入框 | 设 `HOME_AGENT_COMMAND_ENABLED: false` |
| 恢复传统列表首页 | 将 `LayoutIndex` 改回 `<LayoutPostList {...props} />` |
| 关闭终端 Hero | 设 `HEXO_HOME_BANNER_ENABLE: false` |

---

## 五、未来规划与预留

### P4 — Agent 命令层（已预留 UI）

**现状：** `HomeAgentCommand.js` 提供终端风格输入框，提交后显示 `pending integration` 占位提示。

**规划：**

```
用户输入 > ask ...
    ↓
HomeAgentCommand → API（/api/agent 或外部 LLM）
    ↓
stdout 面板 / 侧滑抽屉展示回答
```

**问答范围建议：** 最近阅读、分类列表、文章标题与摘要（站内 RAG，非全网搜索）。

**预留文件：**

- `components/home/HomeAgentCommand.js` — 输入与 stdout 输出容器
- 未来可新增 `HomeAgentPanel.js` — 独立回答面板（侧滑或内联展开）
- `HOME_AGENT_COMMAND_ENABLED` — 总开关

**设计约束：** 保持命令行隐喻，避免首屏大面积聊天气泡，与 OS 气质一致。

### V2 — 数字花园增强

- 双向链接 / 文章关联图谱（不作为首版主页核心）
- Bento 格可配置封面缩略图或自定义 icon
- 模块级「常青」标记，与纯时间线日志区分

### V2 — 导航命令化

- 全局 Command Palette（`Cmd+K`）统一搜索、分类跳转、 Agent 入口
- 与侧栏 `TaniaSideBar` 底部或 Hero 命令框共享同一交互模型

### V2 — 系统状态扩展

Hero 状态行可扩展为可配置指标，例如：

- `listening.latest` — 最近音乐手记
- `cooking.count` — 食谱总数
- 从 Notion 自定义字段或外部 API 拉取「正在读」

可在 `homeDashboardData.js` 增加 `buildHomeSystemStatus` 的扩展点，或通过 `config.HOME_STATUS_LINES` 声明式配置。

### 数据层预留

| 字段 / 接口 | 用途 |
|-------------|------|
| `props.homePosts` | 首页全量文章，已独立于分页 |
| `buildCategoryTileData` | 可扩展为异步拉取分类封面 |
| `getRecentLogs` | 可过滤特定分类或标签 |

---

## 六、与主题整体的统一性

首页 Dashboard 不是孤立模块，而是 custom 主题「多切面人格」的汇总入口：

- **视觉** — Gruvbox token + Liquid Glass，与文章页、分类页一致
- **分类** — Bento 入口直达已做好的专属视图，而非重复造轮子
- **阅读** — 安静、扫视式信息分层，正文页仍保持阅读优先
- **终端** — chrome 层使用等宽与 `INIT_SEQUENCE` 语义，正文不受影响

一句话：**以 Personal OS 为骨架，用 Bento 承载世界观，用精简日志作次级流，为 Agent 预留命令层** — 与现有美学与分类投资形成统一哲学。
