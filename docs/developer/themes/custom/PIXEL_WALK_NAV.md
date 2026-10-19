# Custom 主题：像素漫游导航（大厅 + 分类走廊）

> 将首页 Navbar / Bento 分类入口游戏化为「酒店大厅」，分类页顶部为可左右走动的走廊；走出左出口回首页。  
> 状态：P0–P2 已落地（占位美术）；P3 换真像素图 / 抛光  
> 最后更新：2026-10

> **文档位置说明：** 放在 `docs/developer/themes/custom/`，勿放入 `themes/custom/`（动态 `import(@/themes/${name})` 会扫描主题目录，非 JS 文件可能导致构建失败）。

---

## 一、产品目标

| 场景 | 体验 | 跳转 |
|------|------|------|
| 首页顶部卡片 | 像素风「酒店大厅」；小人可走；各分类 = 房间门 | 进入门区 → `/category/{name}`（与 Navbar / Bento 相同） |
| 每个分类页顶部 | 长条走廊；每分类不同背景；小人左右走 | 走到最左出口 → `/` |

约束：

- **简单可维护**：单场景复杂度低，禁止重型游戏引擎与整仓 fork
- **好看**：外框延续 cyber 终端壳；内区像素风
- **不卡顿**：懒加载、可销毁循环、固定小画布、无程序化大地图

明确不做（首版）：

- 战斗、背包、对话树、多人、A\*、程序地图
- 全页游戏站（不替代 Bento / 文章列表）
- 强制移动端虚拟摇杆（可二期；首版可用「点门 / 点出口」降级）

---

## 二、调研结论与终极决策

### 2.1 现有代码锚点

| 项 | 路径 / 结论 |
|----|-------------|
| 主题 | `themes/custom`，`THEME: 'custom'` |
| 首页 | `LayoutIndex` → `HomeDashboard` → Bento + 最近日志 |
| 分类真相源 | `themes/custom/category/catalog.js`（稳定 id → Notion 中文名） |
| 分类 URL | `/category/${encodeURIComponent(name)}` |
| Navbar | Notion Menu → `customMenu`；常见 slug 为 `/category/食味斋` |
| 分类页入口 | `CategoryPostList` → `registry` 专属视图 |
| 游戏依赖 | **无** Phaser / Pixi；有未使用的 `gsap`；有装饰用 Canvas |

### 2.2 开源与引擎对比（联网调研摘要）

| 方案 | 体量 / 复杂度 | 结论 |
|------|----------------|------|
| Phaser 3 | 极大 | ❌ 不适合博客挂件 |
| PixiJS | 大 | ❌ 仅渲染层，玩法仍自写 |
| Kaplay（原 Kaboom） | 运行时约 185KB | ⚠️ 可备选；当前需求用不上其能力 |
| 作品集整仓（Museum / RPG Portfolio 等） | 过重或叙事全页 | ❌ 只借鉴架构，不 fork |
| **自研 Canvas 2D** | 引擎代码极小 | ✅ **采用** |

最值得借鉴的开源架构（非代码照搬）：

- **引擎 ↔ React 分离**：纯 JS `createWalker` + `onEvent`；React 只挂载 / 路由 / 配置
- **`next/dynamic(..., { ssr: false })`**：避免 SSR，并拆出独立 client chunk

### 2.3 终极决策摘要

| 项 | 决定 |
|----|------|
| 引擎 | **自研轻量 Canvas 2D**（`requestAnimationFrame` + AABB） |
| 依赖 | **零新游戏库** |
| 场景 | 共享 walker：`lobby`（大厅）+ `corridor`（走廊） |
| 房间数据 | 由 `CATEGORY_CATALOG` / `BENTO_ORDER` 派生，不直接绑 `customMenu` |
| 跳转 | `router.push`，URL 与 Navbar / Bento 一致 |
| 配置开关 | `HOME_LOBBY_GAME_ENABLE`（及走廊对应开关，见下文） |

核心权衡：两种场景都极简（大厅多门区、走廊单轴 + 左出口），自研成本低于引入引擎；体积与生命周期更可控。

---

## 三、技术需求（PRD / TR）

### TR-1 首页大厅卡片

1. 出现在 `HomeDashboard` **顶部**、`HomeBentoGrid` 之上。
2. 外框使用现有 cyber chrome（如 `lobby.hall` / `modules` 风格命名）。
3. 内嵌可交互画布：角色 WASD / 方向键移动；墙体碰撞。
4. 每个 catalog 分类对应一扇门（门上可读标签，如「食味斋」）。
5. 进入门触发区后：提示「按 E 进入 · {分类名}」；确认后跳转分类页。
6. 提供无障碍降级：卡片旁或下方仍可依赖 Bento 文字入口（不必依赖游戏）。

### TR-2 分类页走廊长条

1. 挂在 `CategoryPostList` **最上方统一一层**（专属视图也包进去，避免每个 view 重复）。
2. 高度固定窄条（建议 96–140px），宽度随内容区；背景按分类配置不同图/色。
3. 角色主要左右移动；走到**最左侧出口区** → 提示后确认（或短暂停留）→ `router.push('/')`。
4. 右侧可为装饰尽头（墙 / 窗），防止走出画布。

### TR-3 数据与路由

1. 大厅门列表 = `buildHomeBentoModules()` / `BENTO_ORDER` 对应分类。
2. `href` = `/category/${encodeURIComponent(def.name)}`。
3. 走廊背景映射：按 catalog **稳定 id** 配置（改 Notion 中文名不改 id）。
4. Menu 中非分类项（如 English、外链）**不出现在大厅门**。

### TR-4 性能与生命周期

1. 仅客户端加载；离开页面必须 `destroy()` 并停止 rAF。
2. `document.hidden` 时暂停循环。
3. `prefers-reduced-motion`：静态图 + 可点击门/出口，不跑移动循环。
4. 画布 DPR 上限 2；禁止首页与分类页同时存在两个活跃循环。
5. 背景用整图或少量拼接，禁止运行时大地图生成 / 粒子风暴。

### TR-5 配置

| 配置项 | 默认 | 说明 |
|--------|------|------|
| `HOME_LOBBY_GAME_ENABLE` | `true` | 首页大厅卡片 |
| `CATEGORY_CORRIDOR_WALK_ENABLE` | `true` | 分类顶部长条 |
| （可选）进门自动确认延迟 | `0` 或 `400ms` | `0` = 仅按键确认 |

### TR-6 美术与资源

#### 格式约定（冻结）

| 资产 | 格式 | 动画怎么做 | 说明 |
|------|------|------------|------|
| 小人（角色） | **PNG 精灵表**（spritesheet），透明底 | **Canvas 切帧**，不是 GIF | 一行走动画多帧横排；代码按帧索引 `drawImage` |
| 大厅背景 | **PNG**（或 WebP）整图作底板 | **半静态半动态**（见下） | 一张俯视大厅底图；门洞画在图上；少量道具叠加动画层 |
| 分类走廊背景 | **PNG / WebP** 横向长图 | 默认同左；可复用同一套 props | 每分类一张；高度对齐画布（如 96–140px 逻辑高） |
| 门标 / UI 提示 | Canvas 文字或小 PNG | 无 | 「按 E 进入」用等宽字体绘制即可 |
| 进门过渡 | 可选 CSS `opacity` 或已有 gsap | 非必须 | 不做序列帧过场 |

**不要用 GIF 当可操控角色。** 仓库里已有 `public/images/jump-*.gif` 一类装饰动图，适合旁注装饰，不适合 WASD 多方向切换；游戏循环需要按方向/帧精确取样，PNG 精灵表才可控、体积也更稳。

推荐像素规格（可微调，保持整数倍缩放）：

| 资产 | 建议逻辑尺寸 |
|------|----------------|
| 角色单帧 | 16×16 或 32×32 |
| 角色表（例：4 向 × 4 帧） | 128×128（32×32 时）或更小 |
| 大厅背景 | 如 320×180 / 384×216（再 2×～3× 拉伸显示） |
| 走廊长图 | 高度 64～96 px，宽度 480～960 px（按分类可不同长） |

渲染：`image-rendering: pixelated`（或 canvas 整数缩放），避免模糊。

#### 大厅「半静态半动态」背景（支持）

**可以。** 推荐分层，而不是整张背景做成 GIF：

```
每帧绘制顺序：
  1. 静态底板 lobby-hall.png
  2. 动态道具层（贩卖机灯、霓虹、水族箱气泡等）← 小精灵表 / 色块闪烁
  3. 角色
  4. 门前提示 UI
```

| 做法 | 适合 | 性能 |
|------|------|------|
| **A. 小区域精灵叠加（推荐）** | 贩卖机屏幕 2～4 帧循环、灯牌闪烁 | 每帧多几次 `drawImage`，可忽略 |
| B. 配置驱动闪烁 | 某矩形定时改亮度/换色（甚至不用图） | 最轻 |
| C. 整背景 GIF/视频 | — | ❌ 体积大、难与角色分层、难控 |

实现要点：

- 在 `lobbyMap.js` 增加 `props: [{ id, x, y, frames, fps, spriteUrl }]`（或内嵌于同一张 props sheet）
- 动画 **低帧率**（约 2～8 fps）即可有「在呼吸」的感觉，不必跟角色 60fps 同步切帧
- 首版控制 **≤3 个** 动态点（如 1 台贩卖机 + 1 盏灯），避免视觉吵、也免维护成本
- `prefers-reduced-motion`：只画底板 + props 第 0 帧，停止闪烁
- 动态层画在角色**下方**，避免遮挡小人；若要「柜体挡腿」再拆成 ground / overlay 两层（二期）

结论：闪烁饮料机这类效果是预期内的增强，不改变引擎选型；仍用 PNG 精灵小图，不引入视频或整图 GIF。

#### 资源从哪来

优先级从高到低：

1. **CC0 / 免费像素包（首选开工）**  
   - [Kenney.nl](https://kenney.nl/assets)（如 Tiny Dungeon、Roguelike / Interior 类）  
   - [itch.io](https://itch.io/game-assets/tag-assets/pixel-art) 标明 CC0 / 可商用的角色与室内 tiles  
   - 用法：挑选「顶视角小人 + 室内地板/墙」，裁成一张大厅拼图 + 一张角色 spritesheet，放入 `public/images/pixel-walk/`
2. **自制 / 改色**  
   - Aseprite、LibreSprite、Piskel：画/改帧，导出 PNG 精灵表  
   - 走廊可用同一张长图换色板（6 分类差异一眼可辨即可）
3. **AI 出图（可选）**  
   - 适合出「静态背景草图」；角色多帧一致性差，需人工修帧，**不作为角色主方案**
4. **占位（P0/P1）**  
   - 纯色矩形角色 + 色块门框即可先跑通逻辑；P3 再换真像素图

#### 建议落盘路径

```
public/images/pixel-walk/
  hero.png              # 角色精灵表
  lobby-hall.png        # 首页大厅背景
  corridor-reading.png  # 藏书阁走廊（按 catalog id 命名）
  corridor-music.png
  corridor-essay.png
  corridor-recipe.png
  corridor-notes.png
  corridor-film.png
```

`config/lobbyMap.js` / `corridors.js` 只引用上述 URL 与门/出口矩形，不把美术硬编码进引擎。

---


## 四、实现方案

### 4.1 目录结构（建议）

```
themes/custom/components/pixel-walk/
  LobbyGameCard.js           # 首页卡片壳（chrome、开关、a11y）
  CategoryCorridorStrip.js   # 分类顶部长条壳
  PixelWalkMount.js          # dynamic 入口：挂载 canvas、传 scene + rooms、销毁
  engine/
    createWalker.js          # 初始化 / rAF / destroy
    input.js                 # 键盘（触摸点选可二期）
    collision.js             # AABB 墙 + trigger 区
    render.js                # 背景、角色、门标、提示文案
  config/
    lobbyMap.js              # 大厅尺寸、墙、出生点、门矩形
    corridors.js             # 每分类 id → 背景 URL、宽度、出口矩形
  useLobbyRooms.js           # catalog → { id, name, href, doorKey }

public/images/pixel-walk/    # 精灵与场景图（路径可按实现微调）
```

文档：

```
docs/developer/themes/custom/PIXEL_WALK_NAV.md   ← 本文档
```

### 4.2 引擎 API（约定）

```js
// createWalker(canvas, options) → { destroy }
// options:
// {
//   scene: 'lobby' | 'corridor',
//   rooms: [{ id, name, href, trigger: { x, y, w, h } }],
//   map: { width, height, walls: [...], spawn, backgroundUrl },
//   onNavigate: (href) => void,   // 由 React 调 router.push
//   reducedMotion: boolean
// }
```

规则：

- `engine/*` **禁止** import React / next/router
- 导航只通过 `onNavigate` 回调
- 组件卸载必须调用返回的 `destroy()`

### 4.3 React 挂载点

**首页** — `themes/custom/components/home/HomeDashboard.js`：

```
HomeDashboard
  ├─ LobbyGameCard      ← 新增（受 HOME_LOBBY_GAME_ENABLE 控制）
  ├─ HomeBentoGrid
  └─ HomeRecentLogs
```

**分类页** — `themes/custom/category/CategoryPostList.js`：

- 在分发 `CustomView` / 默认列表之前（或包一层 fragment），顶部渲染 `CategoryCorridorStrip`
- 传入当前 `category`（路由或 props），在 `corridors.js` 解析背景与出口

### 4.4 数据流

```
catalog.js (CATEGORY_CATALOG + BENTO_ORDER)
    → useLobbyRooms / buildLobbyRooms
    → lobbyMap 门矩形（按 id 对齐）
    → 进门 onNavigate(`/category/...`)

category 路由名
    → getCategoryDefByName
    → corridors[id]
    → 左出口 onNavigate(`/`)
```

### 4.5 交互细节（冻结）

**桌面**

| 操作 | 行为 |
|------|------|
| WASD / 方向键 | 移动 |
| 进入门 / 出口 trigger | 显示「按 E 进入 · {名}」 |
| **E / Enter** | **确认跳转**（不自动进门） |
| reduced-motion | 静态 + 门/出口可点击 |

**触屏 / 移动端（首版主交互 = 点选，不是虚拟摇杆）**

| 操作 | 行为 |
|------|------|
| **点门 / 点左出口** | 角色短路径走向目标 → 到达后**自动确认进入**（等价桌面按 E） |
| 点地板空地（可选 P2） | 走到该点，不跳转 |
| 页面下方 | 保留 Bento / 列表文字链，游戏不是唯一入口 |

**为何不用「虚拟遥控」当主方案、也不以滑动为主**

| 方案 | 评价 |
|------|------|
| 虚拟摇杆 / 十字键 | 占卡片面积、挡内容、单手别扭；本玩法目标是「进门」不是探索，**首版不做**；若后期想加强「玩」感可作可选浮层 |
| 滑动驱动小人 | 与页面纵向滚动易冲突；走廊横滑也易误触；**不作主交互** |
| **点门（推荐）** | 意图最清楚、与 Navbar 心智一致、无滚动冲突；配短走过去动画仍有游戏感 |

URL：代码侧统一 `encodeURIComponent`；浏览器地址栏显示 `%E9%A3%9F…` 与 `/category/食味斋` 为同一路由，属正常行为。

### 4.5.1 美术准备节奏

- **开写代码不阻塞草图**：先搭 `pixel-walk/` 目录 + 色块/临时 CC0 占位图即可跑通 P0–P2。
- 你可在目录就绪后，按同名文件替换 `public/images/pixel-walk/*`（`hero.png`、`lobby-hall.png`、`corridor-*.png`）。
- 实现阶段可用公开 CC0 素材作临时图；你的定稿图随时覆盖，无需等你先画完再开工。

### 4.6 样式衔接

- 卡片 chrome：对齐 `HomeBentoGrid` / Hero 的 `cyber-mono` 边框与标签。
- 画布：`image-rendering: pixelated`（或等效），缩放取整倍数避免模糊。
- 不把整站改成独立游戏主题色；像素区局限在卡片 / 长条内部。

### 4.7 性能清单（实现时自检）

- [ ] `PixelWalkMount` 使用 `dynamic` + `ssr: false`
- [ ] 路由离开后无残留 rAF / keydown 监听
- [ ] 单页最多一个 walker 实例
- [ ] 背景与精灵有合理体积（压缩 PNG/WebP）
- [ ] 低端机：可降低逻辑帧或暂停屏外实例

---

## 五、开发阶段

| 阶段 | 内容 | 验收 |
|------|------|------|
| **P0** | `createWalker` + 空大厅走动 + 墙碰撞；挂到 `HomeDashboard` | 桌面可流畅走动，离开页无泄漏 |
| **P1** | 6 门区 + 提示 + `router.push` 分类页 | 与 Navbar 点同一分类结果一致 |
| **P2** | `CategoryCorridorStrip` + 左出口回首页；按分类换背景 | 各分类顶条可见、出口可用 |
| **P3** | 像素美术抛光、开关、reduced-motion / 点击降级 | 开关可关；无障碍可进分类 |

美术可与 P1/P2 并行；逻辑阶段可用色块门框占位。

---

## 六、测试要点

1. 大厅每扇门 → 对应 `/category/{中文名}`，与侧栏 Menu、Bento 一致。
2. 任意分类走廊左出口 → `/`。
3. 快速切换首页 ↔ 分类：无多余 canvas、无重复 keydown、无控制台报错。
4. 关 `HOME_LOBBY_GAME_ENABLE` / `CATEGORY_CORRIDOR_WALK_ENABLE` 后页面布局正常。
5. `prefers-reduced-motion: reduce` 下仍可点击进入/返回。

---

## 七、相关文档与代码

| 资源 | 说明 |
|------|------|
| `docs/developer/themes/NY_HOME_DASHBOARD.md` | 首页 OS Dashboard 信息架构（Bento 等） |
| `themes/custom/category/catalog.js` | 分类单一真相源 |
| `themes/custom/components/home/HomeDashboard.js` | 首页组装 |
| `themes/custom/category/CategoryPostList.js` | 分类页入口 |
| `themes/custom/config.js` | 主题开关与模块配置 |

---

## 八、决策冻结说明

若后续需求变为「多楼层、战斗、大量动画/音效」，再评估引入 **Kaplay**（动态 import）。在当前「大厅 + 走廊出口」范围内，**保持零游戏库、自研 Canvas 2D** 为冻结决策；变更需同步更新本文档决策表与阶段计划。
