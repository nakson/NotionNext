/* eslint-disable react/no-unknown-property */
import { siteConfig } from '@/lib/config'
import CONFIG from './config'

/**
 * 这里的css样式只对当前主题生效
 * 主题客制化css
 * @returns
 */
const Style = () => {
  // 从配置中获取主题色，如果没有配置则使用默认值 #3758F9（现代蓝）
  const themeColor = siteConfig('HEXO_THEME_COLOR', '#3758F9', CONFIG)

  return (
    <style jsx global>{`
      :root {
        --theme-color: ${themeColor};
        --accent-color: #13c296;
        --gradient-primary: linear-gradient(
          135deg,
          ${themeColor} 0%,
          #6b5fff 100%
        );
        --gradient-secondary: linear-gradient(135deg, #13c296 0%, #0fa678 100%);
      }

      // 现代底色系统 - 极简光影风格
      #theme-hexo body {
        background-color: #f8fafc;
        background-image:
          radial-gradient(
            at 0% 0%,
            rgba(99, 102, 241, 0.1) 0px,
            transparent 50%
          ),
          radial-gradient(
            at 100% 0%,
            rgba(168, 85, 247, 0.1) 0px,
            transparent 50%
          ),
          radial-gradient(
            at 100% 100%,
            rgba(56, 189, 248, 0.1) 0px,
            transparent 50%
          ),
          radial-gradient(
            at 0% 100%,
            rgba(236, 72, 153, 0.1) 0px,
            transparent 50%
          );
        background-attachment: fixed;
      }
      .dark #theme-hexo body {
        background-color: #0f172a;
        background-image:
          radial-gradient(
            at 0% 0%,
            rgba(99, 102, 241, 0.15) 0px,
            transparent 50%
          ),
          radial-gradient(
            at 100% 0%,
            rgba(168, 85, 247, 0.15) 0px,
            transparent 50%
          ),
          radial-gradient(
            at 100% 100%,
            rgba(56, 189, 248, 0.15) 0px,
            transparent 50%
          ),
          radial-gradient(
            at 0% 100%,
            rgba(236, 72, 153, 0.15) 0px,
            transparent 50%
          );
        background-attachment: fixed;
      }

      /* ===== 现代菜单下划线动画 - 极简版 ===== */
      #theme-hexo .menu-link {
        text-decoration: none;
        position: relative;
        color: #475569;
        transition: color 200ms ease;
      }
      .dark #theme-hexo .menu-link {
        color: #cbd5e1;
      }

      #theme-hexo .menu-link::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background: var(--theme-color);
        transition: width 200ms ease;
      }

      #theme-hexo .menu-link:hover {
        color: var(--theme-color);
      }

      #theme-hexo .menu-link:hover::after {
        width: 100%;
      }

      /* 站点欢迎语 */
      #theme-hexo #typed {
        font-family:
          'Inter',
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          sans-serif;
        font-weight: 600;
        letter-spacing: -0.025em;
      }

      /* ===== 现代卡片设计 - 极简版 ===== */
      #theme-hexo .card {
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.5);
        box-shadow:
          0 4px 6px -1px rgba(0, 0, 0, 0.05),
          0 2px 4px -1px rgba(0, 0, 0, 0.03);
        transition: all 200ms ease;
        border-radius: 0.75rem;
      }

      #theme-hexo .card:hover {
        background: rgba(255, 255, 255, 0.9);
        box-shadow:
          0 10px 15px -3px rgba(0, 0, 0, 0.08),
          0 4px 6px -2px rgba(0, 0, 0, 0.04);
        transform: translateY(-1px);
      }

      .dark #theme-hexo .card {
        background: rgba(30, 41, 59, 0.6);
        border: 1px solid rgba(255, 255, 255, 0.05);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
      }

      .dark #theme-hexo .card:hover {
        background: rgba(30, 41, 59, 0.8);
        border-color: rgba(255, 255, 255, 0.1);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
      }

      /* ===== 文章卡片现代效果 ===== */
      #theme-hexo #blog-post-card {
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
        transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
      }

      #theme-hexo #blog-post-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.3),
          transparent
        );
        transition: left 500ms ease;
      }

      #theme-hexo #blog-post-card:hover::before {
        left: 100%;
      }

      #theme-hexo #blog-post-card:hover {
        box-shadow: 0 16px 40px rgba(55, 88, 249, 0.15);
        border-color: rgba(55, 88, 249, 0.2);
      }

      .dark #theme-hexo #blog-post-card {
        border: 1px solid rgba(107, 95, 255, 0.1);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      }

      .dark #theme-hexo #blog-post-card:hover {
        box-shadow: 0 16px 40px rgba(55, 88, 249, 0.2);
        border-color: rgba(55, 88, 249, 0.3);
      }

      /* ===== 悬浮按钮现代风格 ===== */
      #theme-hexo .floating-button {
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
      }

      #theme-hexo .floating-button:hover {
        box-shadow: 0 12px 48px rgba(55, 88, 249, 0.25);
        transform: scale(1.05);
      }

      /* 文章列表中标题行悬浮时的文字颜色 */
      #theme-hexo h2:hover .menu-link {
        color: var(--theme-color) !important;
      }
      .dark #theme-hexo h2:hover .menu-link {
        color: var(--theme-color) !important;
      }

      /* ===== 主题色映射 - 下拉菜单、标签、按钮等 ===== */
      #theme-hexo li[class*='hover:bg-indigo-500']:hover {
        background-color: var(--theme-color) !important;
        background-image: var(--gradient-primary) !important;
      }

      #theme-hexo a[class*='hover:bg-indigo-400']:hover,
      #theme-hexo div[class*='hover:bg-indigo-400']:hover,
      #theme-hexo .hover\:bg-indigo-400:hover,
      #theme-hexo .bg-indigo-400 {
        background-color: var(--theme-color) !important;
        transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* 社交按钮现代悬浮效果 */
      #theme-hexo i[class*='hover:text-indigo-600']:hover,
      .dark #theme-hexo i[class*='dark:hover:text-indigo-400']:hover {
        color: var(--theme-color) !important;
        text-shadow: 0 0 12px rgba(55, 88, 249, 0.4);
      }

      /* MenuGroup 现代悬浮 */
      #theme-hexo #nav div[class*='hover:text-indigo-600']:hover,
      .dark #theme-hexo #nav div[class*='dark:hover:text-indigo-400']:hover {
        color: var(--theme-color) !important;
        transition: all 300ms ease;
      }

      /* 最新发布文章悬浮 */
      #theme-hexo div[class*='hover:text-indigo-600']:hover,
      #theme-hexo div[class*='hover:text-indigo-400']:hover {
        color: var(--theme-color) !important;
      }

      /* 分页组件现代设计 */
      #theme-hexo .text-indigo-400,
      #theme-hexo .text-indigo-800 {
        color: var(--theme-color) !important;
      }
      #theme-hexo .border-indigo-400,
      #theme-hexo .border-indigo-800,
      #theme-hexo .border-indigo-500 {
        border-color: var(--theme-color) !important;
      }
      #theme-hexo a[class*='hover:bg-indigo-400']:hover,
      #theme-hexo a[class*='hover:bg-indigo-600']:hover {
        background: var(--gradient-primary) !important;
        color: white !important;
      }

      /* 右下角悬浮按钮现代风格 */
      #theme-hexo .bg-indigo-500,
      .dark #theme-hexo .dark\:bg-indigo-500,
      #theme-hexo .hover\:bg-indigo-500:hover,
      .dark #theme-hexo .dark\:hover\:bg-indigo-500:hover {
        background: var(--gradient-primary) !important;
      }

      /* 文章浏览进度条现代渐变 */
      #theme-hexo .bg-indigo-600 {
        background: var(--gradient-primary) !important;
      }

      /* 深色模式目录和导航 */
      .dark #theme-hexo .dark\:text-indigo-400,
      .dark #theme-hexo .dark\:border-indigo-400 {
        color: var(--theme-color) !important;
        border-color: var(--theme-color) !important;
      }

      .dark #theme-hexo .catalog-item {
        color: #e0e0e0 !important;
        border-color: rgba(107, 95, 255, 0.3) !important;
        transition: all 300ms ease;
      }
      .dark #theme-hexo .catalog-item:hover {
        color: var(--theme-color) !important;
        border-color: var(--theme-color) !important;
        background: rgba(55, 88, 249, 0.05);
      }
      .dark #theme-hexo .catalog-item.font-bold {
        border-color: var(--theme-color) !important;
        color: var(--theme-color) !important;
      }

      /* 目录项悬浮效果 */
      #theme-hexo a[class*='hover:text-indigo-800']:hover {
        color: var(--theme-color) !important;
      }

      /* 归档页面现代设计 */
      #theme-hexo li[class*='hover:border-indigo-500']:hover,
      .dark #theme-hexo li[class*='dark:hover:border-indigo-300']:hover {
        border-color: var(--theme-color) !important;
        background: rgba(55, 88, 249, 0.05);
      }
      .dark #theme-hexo li[class*='dark:border-indigo-400'] {
        border-color: var(--theme-color) !important;
      }
      .dark #theme-hexo a[class*='dark:hover:text-indigo-300']:hover {
        color: var(--theme-color) !important;
      }

      /* 设置了从上到下的渐变黑色 */
      #theme-hexo .header-cover::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.4) 0%,
          rgba(0, 0, 0, 0.15) 15%,
          rgba(0, 0, 0, 0) 30%,
          rgba(0, 0, 0, 0.1) 70%,
          rgba(0, 0, 0, 0.4) 100%
        );
        backdrop-filter: blur(2px);
      }

      /* 现代导航栏样式 */
      #theme-hexo #sticky-nav {
        backdrop-filter: blur(15px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
      }

      #theme-hexo #sticky-nav.bg-white {
        background: rgba(255, 255, 255, 0.85) !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      }

      .dark #theme-hexo #sticky-nav {
        background: rgba(15, 17, 23, 0.85) !important;
        border-color: rgba(107, 95, 255, 0.1);
      }

      /* Custem */
      .tk-footer {
        opacity: 0;
      }

      // 现代选中字体
      ::selection {
        background: color-mix(in srgb, var(--theme-color) 40%, transparent);
        color: var(--theme-color);
      }

      // 现代自定义滚动条
      ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }

      ::-webkit-scrollbar-track {
        background: transparent;
      }

      ::-webkit-scrollbar-thumb {
        background: var(--gradient-primary);
        border-radius: 3px;
        transition: all 300ms ease;
      }

      ::-webkit-scrollbar-thumb:hover {
        box-shadow: 0 0 12px rgba(55, 88, 249, 0.3);
      }

      * {
        scrollbar-width: thin;
        scrollbar-color: var(--theme-color) transparent;
      }

      /* ===== 现代按钮样式 ===== */
      #theme-hexo button,
      #theme-hexo a[class*='button'],
      #theme-hexo [class*='btn'] {
        transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
      }

      #theme-hexo .hover\:bg-blue-600:hover {
        background: var(--gradient-primary) !important;
      }

      /* ===== 响应式 Hover 状态禁用 ===== */
      @media (max-width: 1024px) {
        #theme-hexo #blog-post-card:hover {
          transform: none;
        }
      }
    `}</style>
  )
}

export { Style }
