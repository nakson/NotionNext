# 婚礼电子请柬（独立全屏页）实现方案

> 状态：待实施  
> 适用主题：`themes/custom`  
> 最后更新：2026-07  
> 目标路由：`/wedding/[slug]`，例如 `/wedding/nyryx`

---

## 0. 最终结论

采用 **Notion 管内容 + 专用 React 页面控制视觉和交互 + 页面级全屏模式隔离博客外壳**。

- Notion 页面与 URL 通过完整 `slug` 一一关联：`wedding/nyryx` → `/wedding/nyryx`。
- 每篇请柬使用独立 Notion 页面，正文继续在 Notion 编辑；主视觉、背景音乐等关键资源放本站 `public/wedding/` 或稳定 CDN。
- 页面以 **手机端 390–480px 宽的纵向明信片流**为设计基准；桌面端仍显示同样的窄长内容，居中并保留左右留白，不改成博客式双栏。
- 文字保留为 HTML，照片与装饰使用图片；**不把整张请柬全部制成图片**。
- 音乐加载后可尝试自动播放，但 iOS、微信和现代浏览器通常会拦截有声自动播放，因此必须保留一次“打开请柬”点击作为可靠兜底。
- 自动滚动用 `requestAnimationFrame` 实现，通过配置开关控制；用户触摸、拖动或滚轮操作时暂停，停止操作后继续缓慢下滑。
- 入场动画只使用 `opacity` 和 `transform`，并兼容 `prefers-reduced-motion`。

核心权衡：**Notion 保证内容可维护，自定义渲染保证请柬的版式、动画和全屏体验。**

---

## 1. 需求边界

### 1.1 必须实现

| 能力             | 验收要求                                                   |
| ---------------- | ---------------------------------------------------------- |
| 多请柬路由       | `/wedding/nyryx`、`/wedding/xxx` 分别对应不同 Notion 页面  |
| 完全脱离博客外壳 | 无侧栏、顶栏、页脚、目录、评论、右下角浮钮、全站音乐播放器 |
| 移动优先         | 手机全宽；桌面为居中的手机长条视觉，左右留白               |
| 内容可维护       | 文案和普通图片主要在 Notion 修改，无需每次改代码           |
| 背景音乐         | 尝试自动播放；被拦截时点击“打开请柬”后播放；支持暂停/恢复  |
| 自动下滑         | 默认可配置；用户操作时暂停，空闲后恢复；到页面底部停止     |
| 入场动画         | 图文进入视口时淡入/位移，低性能设备仍流畅                  |
| 分享信息         | 微信分享标题、描述、封面图正确                             |

### 1.2 首版不做

- RSVP 表单与后端名单管理
- 地图 SDK；首版仅提供地图 App/网页链接
- 粒子、WebGL、视频背景等重动效
- 访客个性化称呼和带签名 URL
- 后台可视化拖拽排版器

---

## 2. 已知平台限制

### 2.1 有声自动播放不能被可靠保证

现代浏览器，特别是 iOS Safari 和微信内置浏览器，会阻止未经用户手势触发的有声媒体播放。不存在稳定、合规且跨端可用的“打开页面立即有声播放”实现。

最终交互：

1. 页面加载后调用一次 `audio.play()`，允许播放的环境直接开始。
2. 播放失败不报错、不阻塞页面，显示全屏开场层。
3. 用户点击“打开请柬”时再次调用 `play()`，随后淡出开场层。
4. 右上角保留小型音乐开关，便于暂停和恢复。

这样已最大程度接近“自动播放”，同时保证微信和 iPhone 上可用。

### 2.2 自动滚动不能与用户操作争夺控制权

持续强制修改 `scrollTop` 会造成页面抖动和触摸失控。正确行为是：

- 页面打开并通过开场层后开始自动下滑。
- `touchstart`、`pointerdown`、`wheel`、键盘滚动时立即暂停。
- 最后一次人工操作结束后等待约 2 秒，再从当前位置继续。
- 页面不可见时暂停；回到前台后恢复。
- 到达底部停止，不循环回顶部。
- 系统开启“减少动态效果”时默认关闭自动滚动和入场位移。

---

## 3. 路由与 Notion 关联

### 3.1 一一对应规则

| URL                      | Notion `slug`           |
| ------------------------ | ----------------------- |
| `/wedding/nyryx`         | `wedding/nyryx`         |
| `/wedding/zhangsan-lisi` | `wedding/zhangsan-lisi` |

Notion 页面建议设置：

| 标准字段    | 值或用途                                  |
| ----------- | ----------------------------------------- |
| `title`     | 分享标题，例如“南一 & 若雨的婚礼请柬”     |
| `slug`      | 完整路径，例如 `wedding/nyryx`            |
| `type`      | `Page`，避免进入首页文章列表和 RSS        |
| `status`    | `Published`；需要弱隐藏时可用 `Invisible` |
| `summary`   | 微信分享描述或开场邀请语                  |
| `date`      | 婚礼日期                                  |
| `pageCover` | 分享图及首屏候选封面                      |
| `ext`       | 仅存放婚礼页配置和短结构化数据            |
| 正文        | 图文、故事、流程、地点、提示、结尾        |

`type = Page` 是当前仓库已有的隐藏列表机制；不要依赖不存在的 `hidden` 标签规则。密码字段只用于访问控制，不会自动隐藏列表。

### 3.2 `ext` 建议结构

```json
{
  "wedding": {
    "groom": "南一",
    "bride": "若雨",
    "dateText": "2026年10月1日 12:00",
    "venue": "某某酒店宴会厅",
    "address": "某某市某某路1号",
    "musicUrl": "/wedding/nyryx/bgm.mp3",
    "mapUrl": "https://...",
    "autoScroll": true,
    "autoScrollSpeed": 12,
    "palette": "ivory"
  }
}
```

注意：当前 `getPageProperties.js` 的 `ext` 解析会移除 JSON 中的空白字符，因此 **长文案不要放在 `ext`**；长文案放标准字段或 Notion 正文。`ext` 仅承载布尔值、数字、URL、枚举和短文本。

### 3.3 正文编排约定

首版采用“固定区块类型 + Notion 内容”的方式，避免开发一套拖拽编辑器：

1. 页面封面：`pageCover`
2. 新人姓名、日期、地点：`ext.wedding`
3. 邀请语：`summary`
4. 故事、照片、流程、提示、尾声：Notion 正文

正文按二级标题分组，推荐标题：

```text
## 我们的故事
## 婚礼时刻
## 婚礼地点
## 照片
## 温馨提示
## 期待相见
```

`mapWeddingContent` 将标题和后续 blocks 转换为统一 section 数据；未知标题使用通用明信片样式，不导致页面报错。

---

## 4. 页面架构

### 4.1 推荐数据流

```text
Notion 页面（slug = wedding/nyryx）
  ↓
pages/wedding/[slug].js
  ↓ resolvePostProps({ prefix: 'wedding', slug })
post + blockMap + NOTION_CONFIG
  ↓ mapWeddingContent()
纯 JSON WeddingViewModel
  ↓
WeddingInvitationPage
  ├─ CoverGate
  ├─ WeddingAudio
  ├─ WeddingAutoScroll
  └─ WeddingSection[]
```

数据获取复用仓库现有能力：

- `resolvePostProps`：`lib/db/SiteDataApi.js`
- `getPost`：`lib/db/notion/getNotionPost.js`
- `getPostBlocks`：`lib/db/notion/getPostBlocks.js`
- 静态路径工具：`lib/build/staticPaths.js`

不自行重复请求 Notion API。

### 4.2 页面级全屏模式

当前 `_app.js` 会为所有页面统一套上主题 `LayoutBase`，并在布局外渲染 `ExternalPlugins`。因此只在婚礼页面内部新增一个 `LayoutWedding`，**不能**真正移除博客外壳和全局浮窗。

推荐为页面组件增加显式静态标记：

```js
WeddingPage.fullPage = true
WeddingPage.disableExternalPlugins = true
```

`pages/_app.js` 根据标记：

- `fullPage = true`：保留 `GlobalContextProvider`、错误边界和 `SEO`，跳过主题 `LayoutBase`。
- `disableExternalPlugins = true`：跳过 `ExternalPlugins`，避免 APlayer、评论计数、聊天、烟花、全局 AOS 等进入请柬。

该能力是通用的“页面级壳策略”，避免在 `themes/custom/index.js` 和 `ExternalPlugins.js` 中硬编码 `/wedding/` 路径判断。

### 4.3 路由冲突处理

仓库已有 `pages/[prefix]/[slug]/index.js`，它也能匹配 `/wedding/nyryx`。新增专用 `pages/wedding/[slug].js` 后：

- Next.js 会优先匹配静态前缀 `wedding`。
- 通用二级 slug 的 `getStaticPaths` 必须排除 `wedding/*`，防止两个动态页面在构建时生成同一路径。
- 非导出模式沿用 `fallback: 'blocking'`；静态导出模式预生成所有 `wedding/*` 页面。
- 找不到 Notion 页面时返回 `notFound: true`，不复用 `LayoutSlug` 的客户端延迟跳转。

### 4.4 SEO

继续使用 `_app.js` 已有的 `SEO` 组件，字段映射：

| SEO 字段                         | 来源                       |
| -------------------------------- | -------------------------- |
| `title` / `og:title`             | `post.title`               |
| `description` / `og:description` | `post.summary`             |
| `og:image`                       | `post.pageCover`           |
| canonical                        | 当前 `/wedding/[slug]` URL |

分享图必须是 HTTPS 稳定地址，推荐 1200×630，主体位于中间安全区。

---

## 5. 视觉与内容设计

### 5.1 页面容器

```text
浏览器背景：柔和米白或浅灰
┌─────────────────────────────────────┐
│             左侧留白                 │
│   ┌─────────────────────────────┐   │
│   │  390–480px 婚礼内容长卷       │   │
│   │  封面 / 明信片 / 照片 / 文字   │   │
│   └─────────────────────────────┘   │
│             右侧留白                 │
└─────────────────────────────────────┘
```

- `< 640px`：内容宽度 `100%`，不额外模拟手机边框。
- `≥ 640px`：内容最大宽度建议 `480px`，居中，外部为低对比背景。
- 使用 `min-height: 100dvh`，兼容移动端地址栏变化。
- 首屏关键内容和按钮避开 `env(safe-area-inset-*)`。

### 5.2 明信片区块

统一设计 token，区块使用 4–5 种可复用变体，而不是每段单独写死：

| 变体            | 用途         | 版式                       |
| --------------- | ------------ | -------------------------- |
| `cover`         | 开场封面     | 全屏照片 + 渐变遮罩 + 姓名 |
| `paper`         | 邀请语、故事 | 浅色纸张、细边框、留白     |
| `photo-full`    | 主照片       | 全宽裁切，少量叠字         |
| `photo-caption` | 图文         | 照片 + 错位说明文字        |
| `event-card`    | 日期地点     | 居中信息、地图链接         |
| `closing`       | 尾声         | 大留白、签名、日期         |

通过 section 索引、类型和少量方向配置改变对齐、旋转角度和图片比例，形成丰富感，但保持同一视觉系统。

### 5.3 不建议整页制成图片

采用约 **80% HTML 文字与布局 + 20% 装饰图片**：

- HTML 文字在不同手机上清晰，可访问、可复制，也利于 SEO 和分享摘要。
- 图片只承载照片、纹理、手写签名、花纹和复杂插画。
- 个别需要严格艺术排版的标题可制成透明 PNG/WebP，但必须提供可读的隐藏文本或 `aria-label`。
- 图片统一提供明确宽高，优先 WebP/AVIF，并保留 JPEG 回退，减少布局跳动。

---

## 6. 音乐方案

### 6.1 资源

- 每篇请柬独立音乐：`public/wedding/{slug}/bgm.mp3`
- 或使用支持 HTTPS、Range 请求和长期缓存的 CDN
- 不使用 Notion 附件临时 URL 作为背景音乐
- MP3 建议控制在 3–5MB，裁剪为可自然循环的片段

### 6.2 组件职责

`WeddingAudio` 只负责：

- 创建并清理 `HTMLAudioElement`
- `loop = true`
- 初始音量约 `0.35`
- 尝试自动播放
- 接收开场点击再次播放
- 暴露播放/暂停状态
- `visibilitychange` 时暂停，回到前台时仅在此前正在播放的情况下恢复
- `play()` 使用 `try/catch`，失败只切换 UI，不影响正文

不要复用全站 `components/Player.js`，它的 APlayer 浮窗和全局配置不符合独立请柬体验。

---

## 7. 自动滚动方案

建议封装 `useWeddingAutoScroll`：

```text
enabled && opened && !reducedMotion && pageVisible
  ↓
requestAnimationFrame(timestamp)
  ↓
按 deltaTime × speed 计算位移
  ↓
window.scrollBy(0, distance)
```

配置：

| 配置项                             | 默认值 | 说明                            |
| ---------------------------------- | -----: | ------------------------------- |
| `WEDDING_AUTO_SCROLL`              | `true` | 全局默认开关                    |
| `WEDDING_AUTO_SCROLL_SPEED`        |   `12` | 每秒像素数，页面可由 `ext` 覆盖 |
| `WEDDING_AUTO_SCROLL_RESUME_DELAY` | `2000` | 人工操作后恢复等待毫秒          |

实现约束：

- 速度按时间差计算，不能简单地每帧 `scrollTop++`，否则不同刷新率速度不同。
- 监听器使用 `{ passive: true }`，组件卸载时清理监听器和动画帧。
- 用户拖动滚动条、触摸、滚轮和键盘滚动都视为人工操作。
- 音乐播放失败不能阻止自动滚动；开场层未打开时不滚动。
- 可选提供不显眼的“暂停浏览”按钮，但首版不增加更多悬浮控件。

---

## 8. 入场动画

新增轻量 `useInView`，使用原生 `IntersectionObserver`，不引入 Framer Motion：

- `rootMargin: 0px 0px -10% 0px`
- `threshold: 0.12`
- 首次进入后保持可见，不在反复滚动时重复播放
- 动画时长 500–800ms
- 仅使用 `opacity`、`translateY`、小幅 `scale` 或 `rotate`

动效控制在三类：

1. 开场层淡出
2. 明信片向上淡入
3. 照片轻微缩放或错位归正

`prefers-reduced-motion: reduce` 时：

- 所有区块直接可见
- 关闭自动滚动
- 保留音乐手动控制

---

## 9. 文件结构

```text
pages/
  wedding/
    [slug].js                         # 专用路由、SSG/ISR、页面级全屏标记
  [prefix]/[slug]/index.js            # getStaticPaths 排除 wedding/*
  _app.js                             # 支持 fullPage / disableExternalPlugins

public/wedding/
  nyryx/
    bgm.mp3
    cover.webp                        # 可选稳定主视觉

themes/custom/
  config.js                           # WEDDING_* 默认配置
  components/wedding/
    WeddingInvitationPage.js          # 页面编排
    WeddingCoverGate.js               # 开场层
    WeddingAudio.js                   # 音乐状态与控件
    WeddingSection.js                 # 明信片区块分发
    sections/
      WeddingCoverSection.js
      WeddingPaperSection.js
      WeddingPhotoSection.js
      WeddingEventSection.js
      WeddingClosingSection.js
  hooks/
    useWeddingAutoScroll.js
    useInView.js
  utils/
    weddingContent.js                 # Notion post/blockMap → ViewModel
  styles/
    wedding.css                       # 仅婚礼页样式，避免污染主题
```

若项目现有样式构建不支持组件内独立 CSS 文件，则将样式收敛到一个 `WeddingStyles` 组件；不要把大量婚礼专属规则继续塞入 `style_tania.js`。

---

## 10. 配置项

在 `themes/custom/config.js` 增加：

| 键                                 | 默认值 | 说明               |
| ---------------------------------- | -----: | ------------------ |
| `WEDDING_ENABLE`                   | `true` | 婚礼路由总开关     |
| `WEDDING_CONTENT_MAX_WIDTH`        |  `480` | 桌面端内容最大宽度 |
| `WEDDING_MUSIC_VOLUME`             | `0.35` | 默认音乐音量       |
| `WEDDING_AUTO_SCROLL`              | `true` | 自动下滑开关       |
| `WEDDING_AUTO_SCROLL_SPEED`        |   `12` | 每秒滚动像素       |
| `WEDDING_AUTO_SCROLL_RESUME_DELAY` | `2000` | 人工操作后恢复延迟 |
| `WEDDING_REVEAL_ANIMATION`         | `true` | 区块入场动画       |

优先级：

1. Notion `ext.wedding` 页面级配置
2. `themes/custom/config.js` 默认配置
3. 组件安全默认值

涉及速度、音量、宽度的值必须在映射层转换为数字并限制上下界，避免无效 Notion 配置破坏页面。

---

## 11. 实施 WBS

| 阶段 | 任务                                      | 产出                               |   预估 |
| ---- | ----------------------------------------- | ---------------------------------- | -----: |
| P0   | 增加页面级全屏/插件隔离能力               | `_app.js` 可按页面跳过博客壳和插件 |   0.5d |
| P0   | 增加 `/wedding/[slug]` 路由并排除冲突路径 | 多请柬 URL、ISR、404 可用          |   0.5d |
| P0   | 建立手机窄栏壳与静态演示数据              | 桌面和手机基础视觉可预览           |   0.5d |
| P1   | `WeddingAudio` + `WeddingCoverGate`       | 自动尝试、点击兜底和音乐开关       |   0.5d |
| P1   | `mapWeddingContent` + Notion 区块约定     | Notion 修改后可更新内容            |     1d |
| P1   | 明信片 section 组件与响应式样式           | 图文布局丰富且统一                 | 1–1.5d |
| P1   | 自动滚动与入场动画                        | 可配置、可暂停、低动态偏好兼容     | 0.5–1d |
| P2   | 微信分享、真机性能和异常回退              | 可正式分享                         | 0.5–1d |

首个可演示版本约 **2 人日**；完成 Notion 映射、视觉精修和真机验收约 **4–5 人日**。

### 关键依赖

```text
页面级全屏能力
  └─ 专用路由
      ├─ Notion 内容映射
      │   └─ 明信片 sections
      ├─ 开场层
      │   ├─ 背景音乐
      │   └─ 自动滚动
      └─ SEO / 微信验收
```

---

## 12. 测试与验收

### 12.1 自动化检查

- `yarn lint`
- `yarn build`
- 为 `mapWeddingContent` 增加纯函数测试：
  - 缺失 `ext` 时使用默认值
  - 非法数字被限制到安全范围
  - 缺少图片或音乐时不报错
  - 未知二级标题回退为通用 section
- 为全屏策略增加测试或最小页面断言：
  - 婚礼页不渲染 `TaniaSideBar`
  - 婚礼页不渲染 `RightFloatArea`
  - 婚礼页不渲染全站 `MusicPlayer`

### 12.2 设备验收矩阵

| 环境               | 重点                                       |
| ------------------ | ------------------------------------------ |
| iPhone Safari      | 开场点击播放、safe area、自动滚动暂停/恢复 |
| iPhone 微信        | 音频兜底、分享卡片、长页性能               |
| Android 微信       | 图片加载、滚动速度、音乐循环               |
| 桌面 Chrome/Safari | 480px 居中长条、左右留白、键盘滚动暂停     |
| 减少动态效果       | 无自动滚动、无位移动画、内容直接可读       |

### 12.3 完成标准

- [ ] `/wedding/nyryx` 与另一测试 slug 可访问且内容互不串页
- [ ] 婚礼页无侧栏、顶栏、页脚、评论、目录和任何全站浮钮
- [ ] 手机无横向溢出；桌面保持窄长居中，不变成双栏
- [ ] 允许自动播放的环境可直接播放；被拦截时一次点击后可播放
- [ ] 音乐失败不阻塞内容，音乐开关状态准确
- [ ] 自动滚动可配置关闭，人工操作时不争抢滚动
- [ ] 图文首次进入视口时动画流畅，减少动态效果时正确降级
- [ ] Notion 修改正文后，ISR 或按需刷新后页面更新
- [ ] 微信分享标题、摘要和图片正确
- [ ] 普通博客首页、文章页和其他主题无回归

---

## 13. 风险与预案

| 风险                         | 影响                   | 应对                                     | Plan B                                 |
| ---------------------------- | ---------------------- | ---------------------------------------- | -------------------------------------- |
| 浏览器阻止有声自动播放       | 首次打开无音乐         | 自动尝试 + 开场点击兜底 + 明确音乐图标   | 默认静音展示，不阻塞请柬               |
| Notion 图片或附件 URL 不稳定 | 图片、音乐失效         | 关键封面和 BGM 放 `public/` 或 CDN       | 使用本地默认封面和无音乐模式           |
| 专用路由与通用 slug 重复生成 | 构建失败               | 通用 `getStaticPaths` 排除 `wedding/*`   | 暂时复用通用路由并在 `LayoutSlug` 分发 |
| 自动滚动干扰用户             | 难以阅读或触控失控     | 人工操作立即暂停，延迟恢复，提供配置开关 | 默认关闭自动滚动                       |
| 长图过多导致微信卡顿         | 白屏、掉帧、内存占用高 | 响应式图片、懒加载、限制尺寸与总量       | 降低图片质量，移除非关键装饰           |
| Notion 内容结构被误改        | 区块版式错乱           | 未知 section 使用通用样式，开发环境告警  | 回退为顺序图文流                       |
| `_app.js` 改动影响全站       | 其他页面布局变化       | 页面静态标记默认均为 false，增加回归检查 | 改为婚礼路由早退的局部方案             |

---

## 14. 决策记录

| 决策     | 选择                      | 原因                                                       |
| -------- | ------------------------- | ---------------------------------------------------------- |
| 路由     | `/wedding/[slug]`         | 满足多篇请柬，不再使用单页 `/invitation`                   |
| 内容关联 | 完整 Notion `slug`        | 无额外映射表，URL 与内容一一对应                           |
| 内容方案 | Notion + 自定义 React     | 可编辑性与视觉控制兼顾                                     |
| 全屏隔离 | 页面级 `fullPage` 标记    | 当前 `_app.js` 会统一套 Layout，普通独立 Layout 不足以脱壳 |
| 桌面布局 | 480px 左右窄栏居中        | 保持手机长条请柬的统一体验                                 |
| 文本表现 | HTML 为主、图片为辅       | 清晰、响应式、可维护、可访问                               |
| 音乐     | 自动尝试 + 点击兜底       | “完全免交互有声播放”受浏览器策略限制                       |
| 自动滚动 | 空闲时继续、交互时暂停    | 同时满足缓慢下滑和用户自主浏览                             |
| 动画     | 原生 IntersectionObserver | 仓库未安装 Framer Motion，无需增加依赖                     |
| 资源     | 关键资源放 public/CDN     | 避免 Notion 临时附件 URL 失效                              |

---

## 15. 实施顺序

严格按以下顺序落地：

1. 先完成 `_app.js` 页面级全屏能力与 `/wedding/[slug]` 路由，确认博客外壳和插件完全消失。
2. 使用本地静态数据完成手机窄栏、开场层、音乐和自动滚动，优先真机验证交互。
3. 再接入 `resolvePostProps`、`ext` 和正文 blocks，避免视觉开发被 Notion 解析阻塞。
4. 最后完成微信分享、图片压缩、性能测试和博客回归测试。

首版发布前必须接受一个产品事实：**iOS 与微信无法保证免点击有声播放；“打开请柬”是可靠播放所需的最小交互。**
