/* eslint-disable react/no-unknown-property */
import { siteConfig } from '@/lib/config'
import CONFIG from './config'

/**
 * 像素风 (8-bit Cyberpunk) 主题样式
 * 赛博朋克 + 像素艺术融合设计
 * @returns
 */
const Style = () => {
  // 像素风色彩配置
  const accentColor = '#00ffff' // 霓虹青
  const secondaryColor = '#ff00ff' // 霓虹紫/洋红
  const warningColor = '#ffff00' // 霓虹黄

  return (
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;700&family=VT323&display=swap');

      :root {
        --pixel-accent: ${accentColor};
        --pixel-secondary: ${secondaryColor};
        --pixel-warning: ${warningColor};
        --pixel-bg: #0f172a;
        --pixel-bg-light: #1e293b;
        --pixel-text: #e0e0e0;
        --pixel-text-muted: #a0a0a0;
        --pixel-border: #00ffff;
        --pixel-border-alt: #ff00ff;
        --font-pixel: 'Pixelify Sans', 'VT323', monospace;
        --font-pixel-title: 'Pixelify Sans', monospace;
      }

      /* ===== 像素风背景系统 - 赛博朋克夜景 ===== */
      #theme-hexo body {
        background-color: var(--pixel-bg);
        background-image: repeating-linear-gradient(
          0deg,
          rgba(0, 255, 255, 0.03) 0px,
          rgba(0, 255, 255, 0.03) 1px,
          transparent 1px,
          transparent 2px
        );
        background-attachment: fixed;
        color: var(--pixel-text);
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
      }

      .dark #theme-hexo body {
        background-color: var(--pixel-bg);
      }

      /* ===== 字体系统 - 像素风为主 ===== */
      #theme-hexo h1,
      #theme-hexo h2,
      #theme-hexo h3,
      #theme-hexo h4,
      #theme-hexo h5,
      #theme-hexo h6 {
        font-family: var(--font-pixel-title);
        letter-spacing: 0.05em;
        text-shadow: 2px 2px 0px rgba(0, 255, 255, 0.3);
      }

      #theme-hexo h1 {
        color: var(--pixel-accent);
        font-size: 2.5rem;
        line-height: 1.2;
      }

      #theme-hexo h2 {
        color: var(--pixel-text);
        font-size: 1.8rem;
      }

      /* ===== 像素风菜单 - 硬朗边框 ===== */
      #theme-hexo .menu-link {
        font-family: var(--font-pixel);
        text-decoration: none;
        position: relative;
        color: var(--pixel-text);
        transition: all 100ms steps(2);
        border: 2px solid transparent;
        padding: 4px 8px;
        display: inline-block;
      }

      #theme-hexo .menu-link:hover {
        color: var(--pixel-accent);
        border: 2px solid var(--pixel-accent);
        text-shadow:
          0 0 8px var(--pixel-accent),
          0 0 16px var(--pixel-accent);
        transform: translate(1px, 1px);
      }

      #theme-hexo .menu-link::after {
        display: none;
      }

      /* 站点欢迎语 */
      #theme-hexo #typed {
        font-family: var(--font-pixel-title);
        font-weight: 700;
        letter-spacing: 0.05em;
        color: var(--pixel-accent);
        text-shadow: 0 0 10px var(--pixel-accent);
      }

      /* ===== 像素风卡片 - 硬朗边框设计 ===== */
      #theme-hexo .card {
        background: var(--pixel-bg-light);
        border: 2px solid var(--pixel-accent);
        box-shadow:
          4px 4px 0px rgba(0, 255, 255, 0.2),
          8px 8px 0px rgba(255, 0, 255, 0.1);
        transition: all 50ms steps(1);
        border-radius: 0;
        position: relative;
      }

      #theme-hexo .card:hover {
        transform: translate(-2px, -2px);
        box-shadow:
          6px 6px 0px rgba(0, 255, 255, 0.4),
          10px 10px 0px rgba(255, 0, 255, 0.2);
      }

      #theme-hexo .card:active {
        transform: translate(2px, 2px);
        box-shadow:
          2px 2px 0px rgba(0, 255, 255, 0.3),
          4px 4px 0px rgba(255, 0, 255, 0.1);
      }

      /* ===== 文章卡片 - 像素风造型 ===== */
      #theme-hexo #blog-post-card {
        background: var(--pixel-bg-light);
        border: 3px solid var(--pixel-accent);
        box-shadow:
          4px 4px 0px rgba(0, 255, 255, 0.3),
          -2px -2px 0px rgba(255, 0, 255, 0.2);
        transition: all 50ms steps(1);
        border-radius: 0;
        overflow: hidden;
        position: relative;
      }

      #theme-hexo #blog-post-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(
          90deg,
          var(--pixel-accent) 0%,
          var(--pixel-secondary) 50%,
          var(--pixel-accent) 100%
        );
        animation: pixel-line-scan 3s linear infinite;
      }

      @keyframes pixel-line-scan {
        0% {
          top: 0;
        }
        100% {
          top: 100%;
        }
      }

      #theme-hexo #blog-post-card:hover {
        transform: translate(-2px, -2px);
        box-shadow:
          6px 6px 0px rgba(0, 255, 255, 0.5),
          -4px -4px 0px rgba(255, 0, 255, 0.3);
        border-color: var(--pixel-secondary);
      }

      #theme-hexo #blog-post-card:active {
        transform: translate(2px, 2px);
      }

      .dark #theme-hexo #blog-post-card {
        border-color: var(--pixel-accent);
        background: var(--pixel-bg-light);
      }

      /* ===== 像素风按钮 - 街机风格 ===== */
      #theme-hexo button,
      #theme-hexo a[class*='button'],
      #theme-hexo [class*='btn'] {
        font-family: var(--font-pixel);
        border: 2px solid var(--pixel-accent);
        background: var(--pixel-bg-light);
        color: var(--pixel-accent);
        transition: all 50ms steps(1);
        border-radius: 0;
        padding: 8px 16px;
        position: relative;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        cursor: pointer;
        box-shadow: 2px 2px 0px var(--pixel-accent);
      }

      #theme-hexo button:hover,
      #theme-hexo a[class*='button']:hover,
      #theme-hexo [class*='btn']:hover {
        background: var(--pixel-accent);
        color: var(--pixel-bg);
        text-shadow: none;
        transform: translate(-1px, -1px);
        box-shadow: 4px 4px 0px var(--pixel-secondary);
      }

      #theme-hexo button:active,
      #theme-hexo a[class*='button']:active,
      #theme-hexo [class*='btn']:active {
        transform: translate(2px, 2px);
        box-shadow: 0px 0px 0px var(--pixel-accent);
      }

      /* ===== 像素风浮动按钮 ===== */
      #theme-hexo .floating-button {
        border: 2px solid var(--pixel-accent);
        background: var(--pixel-bg-light);
        box-shadow: 3px 3px 0px var(--pixel-accent);
        transition: all 50ms steps(1);
        border-radius: 0;
        position: relative;
      }

      #theme-hexo .floating-button:hover {
        transform: translate(-2px, -2px);
        box-shadow: 5px 5px 0px var(--pixel-secondary);
        border-color: var(--pixel-secondary);
      }

      /* ===== 导航栏 - 像素风 ===== */
      #theme-hexo #sticky-nav {
        background: var(--pixel-bg);
        border-bottom: 3px solid var(--pixel-accent);
        box-shadow: 0 3px 0px var(--pixel-secondary);
        transition: all 100ms steps(2);
      }

      #theme-hexo #sticky-nav.bg-white {
        background: var(--pixel-bg) !important;
        border-bottom: 3px solid var(--pixel-accent);
      }

      .dark #theme-hexo #sticky-nav {
        background: var(--pixel-bg) !important;
        border-color: var(--pixel-accent);
      }

      /* ===== 页脚 ===== */
      #theme-hexo footer {
        background: var(--pixel-bg);
        border-top: 3px solid var(--pixel-accent);
        color: var(--pixel-text);
      }

      /* ===== 选中字体 - 像素风 ===== */
      ::selection {
        background: var(--pixel-accent);
        color: var(--pixel-bg);
      }

      /* ===== 自定义滚动条 - 像素风 ===== */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      ::-webkit-scrollbar-track {
        background: var(--pixel-bg);
      }

      ::-webkit-scrollbar-thumb {
        background: var(--pixel-accent);
        border: 1px solid var(--pixel-secondary);
        box-shadow: inset 0 0 0 1px var(--pixel-secondary);
      }

      ::-webkit-scrollbar-thumb:hover {
        background: var(--pixel-secondary);
      }

      * {
        scrollbar-width: thin;
        scrollbar-color: var(--pixel-accent) var(--pixel-bg);
      }

      /* ===== 输入框 - 像素风 ===== */
      #theme-hexo input,
      #theme-hexo textarea,
      #theme-hexo select {
        background: var(--pixel-bg-light);
        border: 2px solid var(--pixel-accent);
        color: var(--pixel-text);
        border-radius: 0;
        padding: 8px;
        font-family: monospace;
      }

      #theme-hexo input:focus,
      #theme-hexo textarea:focus,
      #theme-hexo select:focus {
        outline: none;
        border-color: var(--pixel-secondary);
        box-shadow: inset 0 0 0 1px var(--pixel-secondary);
      }

      /* ===== 标签和分类 - 像素风 ===== */
      #theme-hexo .tag-item,
      #theme-hexo .category-item {
        background: var(--pixel-bg-light);
        border: 1px solid var(--pixel-accent);
        color: var(--pixel-accent);
        border-radius: 0;
        padding: 4px 8px;
        font-family: var(--font-pixel);
        transition: all 50ms steps(1);
      }

      #theme-hexo .tag-item:hover,
      #theme-hexo .category-item:hover {
        background: var(--pixel-accent);
        color: var(--pixel-bg);
        transform: translate(-1px, -1px);
      }

      /* ===== 图片像素化 ===== */
      #theme-hexo img {
        image-rendering: pixelated;
        image-rendering: crisp-edges;
      }

      /* ===== 分页 - 像素风 ===== */
      #theme-hexo .pagination a,
      #theme-hexo .pagination span {
        border: 2px solid var(--pixel-accent);
        background: var(--pixel-bg-light);
        color: var(--pixel-accent);
        border-radius: 0;
        padding: 4px 12px;
        margin: 0 2px;
        transition: all 50ms steps(1);
      }

      #theme-hexo .pagination a:hover {
        background: var(--pixel-accent);
        color: var(--pixel-bg);
        transform: translate(-1px, -1px);
      }

      #theme-hexo .pagination .active {
        background: var(--pixel-accent);
        color: var(--pixel-bg);
      }

      /* ===== 链接效果 - 像素风 ===== */
      #theme-hexo a {
        color: var(--pixel-accent);
        text-decoration: none;
        transition: all 100ms steps(1);
        position: relative;
      }

      #theme-hexo a:hover {
        text-shadow: 0 0 8px var(--pixel-accent);
        color: var(--pixel-secondary);
      }

      /* ===== 代码块 - 像素风 ===== */
      #theme-hexo pre,
      #theme-hexo code {
        background: var(--pixel-bg-light);
        border: 1px solid var(--pixel-accent);
        color: var(--pixel-accent);
        font-family: 'Courier New', monospace;
        border-radius: 0;
      }

      #theme-hexo pre {
        padding: 12px;
        overflow-x: auto;
        box-shadow: 2px 2px 0px var(--pixel-accent);
      }

      /* ===== 表格 - 像素风 ===== */
      #theme-hexo table {
        border-collapse: collapse;
        width: 100%;
        border: 2px solid var(--pixel-accent);
      }

      #theme-hexo table th,
      #theme-hexo table td {
        border: 1px solid var(--pixel-accent);
        padding: 8px;
        text-align: left;
        background: var(--pixel-bg-light);
        color: var(--pixel-text);
      }

      #theme-hexo table th {
        background: var(--pixel-accent);
        color: var(--pixel-bg);
        font-family: var(--font-pixel);
      }

      /* ===== 响应式 ===== */
      @media (max-width: 768px) {
        #theme-hexo h1 {
          font-size: 1.8rem;
        }

        #theme-hexo h2 {
          font-size: 1.4rem;
        }

        #theme-hexo #blog-post-card:hover {
          transform: none;
        }

        #theme-hexo button,
        #theme-hexo a[class*='button'],
        #theme-hexo [class*='btn'] {
          padding: 6px 12px;
          font-size: 0.85rem;
        }
      }

      /* ===== 8-bit 风格鼠标指针 (可选) ===== */
      #theme-hexo * {
        cursor: default;
      }

      #theme-hexo a,
      #theme-hexo button,
      #theme-hexo [class*='btn'],
      #theme-hexo input[type='submit'],
      #theme-hexo .clickable {
        cursor: pointer;
      }

      /* ===== 禁用现代效果 ===== */
      #theme-hexo * {
        box-sizing: border-box;
      }

      /* 隐藏不需要的现代元素 */
      .tk-footer {
        opacity: 0;
      }

      /* ===== 复古感文章标题 ===== */
      #theme-hexo article h1 {
        text-shadow:
          3px 3px 0px var(--pixel-accent),
          6px 6px 0px var(--pixel-secondary);
      }

      /* ===== 扫描线效果 (可选) ===== */
      #theme-hexo #blog-post-card::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.15) 0px,
          rgba(0, 0, 0, 0.15) 1px,
          transparent 1px,
          transparent 2px
        );
        pointer-events: none;
        border-radius: 0;
      }
    `}</style>
  )
}

export { Style }
