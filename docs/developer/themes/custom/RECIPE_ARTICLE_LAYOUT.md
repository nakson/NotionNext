# 料理食谱文章页图片版式

参考：[Cookpad 食谱页自适应布局](https://cookpad.com/tw/%E9%A3%9F%E8%AD%9C/26286887)

## 调研结论

| 场景 | 推荐版式 | 说明 |
|------|----------|------|
| 分类列表 | 菜单/列表 | 已有 `fine-dining-menu`，适合浏览发现 |
| 单篇正文 | **步骤穿插** | 读者边做边看，图应紧跟对应步骤 |
| 正文顶部 | **Hero 成品方图** | 优先 `pageCover`，无封面则用正文首图 |
| 步骤连图 | **2/3 列自适应网格** | 相邻无文字间隔的多张图；移动端仍多列 |

正文不宜使用九宫格集中展示所有图片——适合归档浏览，不适合烹饪流程。

## 版式规格（Cookpad 式）

- **正文栏**：`max-w-xl`（约 36rem）居中，不做超宽展开
- **Hero**：`1:1`；**仅窄屏（&lt;640px）通栏显示**；宽屏隐藏封面
- **无 pageCover 时**：窄屏提升正文首图为 Hero；宽屏该图在正文内按步骤方图恢复显示
- **步骤图**：`1:1` 方图，`object-fit: cover`
- **连图网格**：
  - 2 张 → `recipe-step-grid--2`（两列）
  - 3+ 张 → `recipe-step-grid--3`（三列）
  - 移动端保持多列（不叠成单列）
- **单张步骤图**：全宽 `1:1`
- **GIF**：`object-fit: contain`，不强制裁切
- **交互**：保留 `medium-zoom` 点击放大

## Notion 写作规范

1. **封面**：在 Notion 设置文章 `pageCover` 作为成品 Hero（推荐）
2. **步骤图**：每个步骤文字后紧跟对应图片；每步可连续放 2–3 张图自动成行
3. **备料总览**：开篇可连续放置多张备料图（中间不要插段落），前端自动 2/3 列网格
4. **无图**：纯文字食谱正常显示，无 Hero 亦可

## 实现入口

| 文件 | 职责 |
|------|------|
| `themes/custom/category/registry.js` | `resolveArticleLayoutId` → `recipe-step` |
| `themes/custom/index.js` | `LayoutSlug` 挂载 `recipe-article` + 窄栏 `max-w-xl` |
| `themes/custom/components/PostHero.js` | Hero（pageCover / 正文首图回退） |
| `themes/custom/components/RecipeNotionPage.js` | DOM 后处理：首图提升、连图网格 |
| `themes/custom/utils/recipeImageUtils.js` | blockMap 首图解析、2/3 列布局算法 |
| `themes/custom/style_tania.js` | `.recipe-*` 样式 |

## Hero 回退规则

1. 有 `post.pageCover` → PostHero 显示封面，正文图片全部按步骤版式处理
2. 无 `pageCover` → 从 `blockMap` 取正文第一张图作为 Hero，正文内该图隐藏（`data-recipe-hero`）
