# Custom 主题 - 像素风 (Pixel Art / 8-bit Cyberpunk) 设计指南

## 🎮 设计概述

本主题已完全改造为 **赛博朋克 + 8-bit 像素艺术** 风格，融合霓虹色彩与复古游戏美学，打造独特的个人博客。

---

## 🎨 核心设计元素

### 1. 色彩系统

| 用途            | 颜色   | HEX代码 | 说明           |
| --------------- | ------ | ------- | -------------- |
| 主色(Accent)    | 霓虹青 | #00ffff | 边框、标题高亮 |
| 副色(Secondary) | 霓虹紫 | #ff00ff | 悬浮、阴影效果 |
| 警告色(Warning) | 霓虹黄 | #ffff00 | 强调重要信息   |
| 背景            | 深蓝黑 | #0f172a | 主背景色       |
| 卡片背景        | 暗蓝灰 | #1e293b | 内容卡片背景   |
| 文本            | 浅灰   | #e0e0e0 | 主文本颜色     |
| 次级文本        | 中灰   | #a0a0a0 | 次要文本颜色   |

### 2. 字体系统

```
标题/导航: Pixelify Sans, VT323 (Google Fonts - 像素风)
正文: 系统默认无衬线字体
代码: Courier New (等宽)
```

### 3. UI 特征

- ✅ **零圆角**: 所有元素 `border-radius: 0`
- ✅ **硬朗边框**: 使用 2-3px 纯色边框，无虚化
- ✅ **像素阴影**: 使用 `box-shadow` 创建 2-4px 偏移阴影
- ✅ **按钮交互**: 按下时向右下位移 2-4px，模拟街机按钮
- ✅ **扫描线效果**: 卡片上有动画扫描线
- ✅ **高对比度**: 清晰的视觉层级

### 4. 交互效果

**悬浮效果**:

```css
:hover {
  transform: translate(-1px, -1px);
  box-shadow: 更大的阴影;
  color/border: 切换到副色或警告色;
}
```

**按下效果**:

```css
:active {
  transform: translate(2px, 2px);
  box-shadow: 缩小的阴影;
}
```

---

## 📁 已改造的组件

### Global

- ✅ `style.js` - 全局样式系统
- ✅ `config.js` - 主题配置

### Header & Navigation

- ✅ `Header.js` - 导航栏
- ✅ `Logo.js` - Logo (带 ASCII 艺术)
- ✅ `MenuListTop.js` - 顶部菜单 (需检查)
- ✅ `MenuListSide.js` - 侧边栏菜单 (需检查)

### Content Components

- ✅ `BlogPostCardInfo.js` - 文章卡片内容
- ✅ `TagItemMini.js` - 标签组件
- ✅ `Card.js` - 通用卡片
- ✅ `Footer.js` - 页脚

### Still Need Attention

- 🔲 按钮组件 (ButtonFloatDarkMode, ButtonJumpToTop 等)
- 🔲 分类/标签页面组件
- 🔲 归档页面组件
- 🔲 搜索组件

---

## 🚀 主要改造特性

### 1. **扫描线动画**

文章卡片上的霓虹线条会从上到下扫过，3秒循环一次，增强赛博朋克感。

### 2. **像素化图片渲染**

```css
image-rendering: pixelated;
image-rendering: crisp-edges;
```

所有图片使用像素化渲染，保持硬朗边缘。

### 3. **背景扫描线**

页面背景有细微的扫描线纹理，增强 8-bit 复古感。

### 4. **自定义滚动条**

滚动条采用像素风设计，边框为霓虹色。

### 5. **输入框/表单**

- 所有 `<input>`, `<textarea>`, `<select>` 都有像素风边框
- 焦点时边框变为副色(紫)
- 背景为暗色

### 6. **代码块/表格**

- `<pre>` 和 `<code>` 有霓虹青边框
- `<table>` 有完整的像素风边框
- 表头为霓虹青背景

---

## 🎯 使用指南

### 颜色变量 (CSS 变量)

在任何样式中，都可以使用这些 CSS 变量：

```css
--pixel-accent         /* 霓虹青 */
--pixel-secondary      /* 霓虹紫 */
--pixel-warning        /* 霓虹黄 */
--pixel-bg            /* 背景深蓝黑 */
--pixel-bg-light      /* 卡片深蓝灰 */
--pixel-text          /* 浅灰文本 */
--pixel-text-muted    /* 中灰文本 */
--font-pixel          /* 像素字体 */
--font-pixel-title    /* 像素标题字体 */
```

### 类名约定

```javascript
// 像素风标签
className =
  'border-2 border-[var(--pixel-accent)] bg-[var(--pixel-bg-light)] text-[var(--pixel-accent)]'

// 像素风按钮
className =
  'px-3 py-2 border-2 border-[var(--pixel-accent)] bg-[var(--pixel-bg-light)] text-[var(--pixel-accent)] hover:bg-[var(--pixel-accent)] hover:text-[var(--pixel-bg)] transition-all duration-100'

// 像素风输入框
className =
  'border-2 border-[var(--pixel-accent)] bg-[var(--pixel-bg-light)] text-[var(--pixel-text)]'
```

### 添加新组件时

1. 使用像素风字体: `font-mono` 或 `font-['Pixelify Sans']`
2. 边框: `border-2 border-[var(--pixel-accent)]` (无圆角!)
3. 背景: `bg-[var(--pixel-bg-light)]`
4. 文本: `text-[var(--pixel-accent)]` 或 `text-[var(--pixel-text)]`
5. 悬浮效果: `hover:translate-x-[-1px] hover:translate-y-[-1px]`
6. 过渡: `transition-all duration-100` (快速，像素感强)

---

## 📸 设计参考

### 色彩对比示意

```
深蓝黑背景 (#0f172a)
  ├── 霓虹青文本 (#00ffff) ✓ 高对比度，易读
  ├── 霓虹紫文本 (#ff00ff) ✓ 高对比度，易读
  └── 浅灰文本 (#e0e0e0)   ✓ 舒适可读

卡片背景 (#1e293b)
  ├── 霓虹青边框 (#00ffff) ✓ 明显
  └── 霓虹紫阴影         ✓ 深度感
```

### 组件结构示意

```
┌─────────────────────────────────────┐
│ [LOGO] > SYSTEM INITIALIZED         │  ← Header
├─────────────────────────────────────┤
│ 菜单 | 搜索 | 导航                    │  ← Navigation
├─────────────────────────────────────┤
│                                       │
│  ┌─────────────────────────────────┐ │
│  │ [文章标题] -- 霓虹青             │ │
│  │ #分类 #标签 | 评论数              │ │  ← Blog Card
│  │ 文章摘要文本...                   │ │
│  │ @ 2024-01-01 | [Tag1] [Tag2]   │ │
│  └─────────────────────────────────┘ │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │ [另一篇文章]                      │ │
│  │ ...                              │ │
│  └─────────────────────────────────┘ │
│                                       │
├─────────────────────────────────────┤
│ >> 2024 | AUTHOR | PV: xxx UV: xxx  │  ← Footer
└─────────────────────────────────────┘
```

---

## 🔧 进一步定制

### 改变主题色

在 `config.js` 中修改:

```javascript
HEXO_THEME_COLOR: '#00ffff',              // 主色 (青/紫/黄任选)
HEXO_THEME_NEON_ACCENT: '#ff00ff',        // 副色
```

### 改变背景

准备一张像素风背景图放在 `public/images/` 目录:

```javascript
HEXO_THEME_BG_PIXEL_ART_URL: '/images/your-bg.gif',
HEXO_THEME_BG_ART_OPACITY: 0.15,          // 调整透明度
```

推荐背景:

- 赛博朋克城市霓虹
- 像素风山水景观
- 网格背景
- 矩阵代码雨 (animated GIF)

### 调整扫描线强度

在 `style.js` 中修改 `#blog-post-card::after`:

```css
background: repeating-linear-gradient(
  0deg,
  rgba(0, 0, 0, 0.15) 0px,
  /* 改这个值: 0.1(淡) ~ 0.3(浓) */...
);
```

---

## 📱 响应式设计

移动端会自动:

- 减小字体尺寸
- 禁用悬浮变换效果
- 调整内边距和外边距
- 保持像素风美感

---

## 🎮 特殊效果

### Logo 加载动画

```
[LOGO] > LOADING SYSTEM...
        (脉动光晕效果)
```

### 页脚特殊标记

```
>> 2024 | AUTHOR | PV: <pv> UV: <uv>
🎮 Built with Pixel Art Style 🎮
```

### 标签悬浮

标签在悬浮时会:

- 边框颜色切换 (青 → 紫)
- 背景色反转
- 向上微移 (-1px, -1px)
- 阴影增大

---

## 🚨 常见问题

### Q: 为什么某个组件看起来不对?

A: 该组件可能还没改造。检查上面的 "已改造的组件" 列表。未改造的组件会使用默认样式。

### Q: 怎么添加新的像素风组件?

A: 参考 "添加新组件时" 的规则，使用像素风 CSS 变量和类名。

### Q: 能改成其他颜色吗?

A: 可以！在 `config.js` 改颜色配置，所有页面会自动更新。

### Q: 字体显示不出来怎么办?

A: 确保 `style.js` 中的 Google Fonts 导入正常。检查浏览器控制台错误。

---

## 🎨 灵感来源

- **NES.css** - 红白机风格 CSS 框架
- **98.css** - Windows 98 复古系统风
- **Cyberpunk 2077** - 赛博朋克美学
- **GameBoy** - 复古掌机色彩
- **Vaporwave** - 霓虹复古美学

---

## 📝 版本历史

- **v1.0** (2024年) - 初始像素风改造
  - ✅ 全局样式系统
  - ✅ 主要组件像素风设计
  - ✅ 扫描线/霓虹效果
  - ✅ 响应式设计

---

## 💡 下一步优化方向

- [ ] 所有按钮组件的像素风改造
- [ ] 分类/标签页面的增强设计
- [ ] 8-bit 风格鼠标指针 (cursor)
- [ ] 动画像素小人物角色
- [ ] 更多动画效果 (CRT 扭曲、RGB 漂移)
- [ ] 暗色/亮色模式切换动画
- [ ] 像素风过渡页面加载

---

**Enjoy your retro-futuristic blog! 🎮✨**
