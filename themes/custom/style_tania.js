/* eslint-disable react/no-unknown-property */

/**
 * Custom theme — agent-CLI style shell + optional pixel-art backdrop
 */
const Style = () => {
  return (
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Domine:wght@600;700&family=JetBrains+Mono:wght@400;600&family=Work+Sans:wght@400;500;600&display=swap');

      /* --- Design tokens (light — soft neutral blog) --- */
      #theme-custom {
        --text-primary: #3c3836;
        --text-secondary: #7c6f64;
        --text-tertiary: #a89984;
        --accent-primary: #d79921;
        --accent-primary-muted: color-mix(in srgb, #d79921 22%, transparent);
        --link: #076678;
        --link-hover: #427b58;
        --link-active: #689d6a;
        --title-link: var(--text-primary);
        --title-link-hover: var(--accent-primary);
        --nav-default: var(--text-secondary);
        --nav-hover: #5c4f44;
        --nav-active: color-mix(in srgb, var(--link) 72%, var(--text-primary));
        --nav-marker: var(--text-tertiary);
        --nav-marker-active: var(--nav-active);
        --nav-prefix: #98971a;
        --heading-1: #d79921;
        --heading-2: #3c3836;
        --heading-3: #5c4f44;
        --heading-4: #7c6f64;

        --pixel-accent: var(--title-link);
        --pixel-secondary: var(--title-link-hover);
        --pixel-bg: var(--cyber-bg-deep);
        --pixel-bg-light: var(--cyber-panel-bg-solid);
        --pixel-text: var(--text-primary);
        --pixel-text-muted: var(--text-secondary);

        --cyber-user-neon: #fabd2f;
        --cyber-bg-base: #faf8f5;
        --cyber-bg-deep: #f0ece6;
        --cyber-panel-bg-solid: rgba(250, 248, 245, 0.92);
        --cyber-panel-border: rgba(60, 56, 54, 0.12);
        --cyber-panel-border-strong: rgba(60, 56, 54, 0.2);
        --cyber-text: var(--text-primary);
        --cyber-text-muted: var(--text-secondary);
        --cyber-term-fg: var(--nav-prefix);
        --cyber-term-dim: #79740e;
        --cyber-neon-cyan: var(--accent-primary);
        --cyber-neon-magenta: #8f3f71;
        --cyber-grid-line: rgba(60, 56, 54, 0.06);
        --cyber-grid-size: 16px;
        --cyber-link: var(--link);
        --cyber-link-hover: var(--link-hover);
        --cyber-link-active: var(--link-active);
        --cyber-selection-bg: var(--accent-primary-muted);
        --cyber-selection-fg: var(--text-primary);
        --cyber-scrollbar-track: #f0ece6;
        --cyber-scrollbar-thumb: #bdae93;
        --cyber-scanline-opacity: 0.018;
        --cyber-float-shadow: 0 4px 20px rgba(60, 56, 54, 0.08);
        --cyber-bg-art-opacity: 0.28;

        /* Liquid Glass 材质（亮色） */
        --glass-fill: rgba(255, 255, 255, 0.52);
        --glass-fill-hover: rgba(255, 255, 255, 0.65);
        --glass-blur: 24px;
        --glass-saturate: 1.5;
        --glass-border: rgba(255, 255, 255, 0.45);
        --glass-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.55);
        --glass-shadow: 0 8px 32px rgba(60, 56, 54, 0.08);
        --glass-radius: 12px;
        --cyber-panel-bg: var(--glass-fill);
      }

      .dark #theme-custom {
        --text-primary: #ebdbb2;
        --text-secondary: #a89984;
        --text-tertiary: #7c6f64;
        --accent-primary: #fabd2f;
        --accent-primary-muted: color-mix(in srgb, #fabd2f 22%, transparent);
        --link: #83a598;
        --link-hover: #8ec07c;
        --link-active: #458588;
        --title-link: var(--text-primary);
        --title-link-hover: var(--accent-primary);
        --nav-default: var(--text-secondary);
        --nav-hover: #bdae93;
        --nav-active: color-mix(in srgb, var(--link) 68%, var(--text-primary));
        --nav-marker: var(--text-tertiary);
        --nav-marker-active: var(--nav-active);
        --nav-prefix: #98971a;
        --heading-1: #fabd2f;
        --heading-2: #ebdbb2;
        --heading-3: #d5c4a1;
        --heading-4: #a89984;

        /* Gruvbox Dark */
        --cyber-bg-base: #1d2021;
        --cyber-bg-deep: #282828;
        --cyber-panel-bg-solid: rgba(40, 40, 40, 0.78);

        /* Liquid Glass 材质（Gruvbox 暗色） */
        --glass-fill: rgba(40, 40, 40, 0.52);
        --glass-fill-hover: rgba(40, 40, 40, 0.62);
        --glass-blur: 24px;
        --glass-saturate: 1.65;
        --glass-border: rgba(255, 255, 255, 0.09);
        --glass-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.07);
        --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.28);
        --glass-radius: 12px;
        --cyber-panel-bg: var(--glass-fill);
        --cyber-panel-border: #3c3836;
        --cyber-panel-border-strong: #504945;
        --cyber-text: var(--text-primary);
        --cyber-text-muted: var(--text-secondary);
        --cyber-term-fg: var(--nav-prefix);
        --cyber-term-dim: #bdae93;
        --cyber-neon-cyan: var(--accent-primary);
        --cyber-neon-magenta: #d3869b;
        --cyber-grid-line: rgba(168, 153, 132, 0.04);
        --cyber-grid-size: 16px;
        --cyber-link: var(--link);
        --cyber-link-hover: var(--link-hover);
        --cyber-link-active: var(--link-active);
        --pixel-accent: var(--title-link);
        --pixel-secondary: var(--title-link-hover);
        --cyber-selection-bg: var(--accent-primary-muted);
        --cyber-selection-fg: var(--text-primary);
        --cyber-scrollbar-track: #1d2021;
        --cyber-scrollbar-thumb: #3c3836;
        --cyber-scanline-opacity: 0.012;
        --cyber-float-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
        --cyber-bg-art-opacity: 0.08;
      }

      body:has(#theme-custom) {
        font-family:
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          'Microsoft YaHei',
          'PingFang SC',
          'Hiragino Sans GB',
          'Noto Sans CJK SC',
          Arial,
          sans-serif;
        background: var(--cyber-bg-base);
        color: var(--cyber-text);
        line-height: 1.6;
        letter-spacing: -0.015em;
        font-weight: 500;
        transition:
          background 0.3s,
          color 0.3s;
      }

      .dark body:has(#theme-custom) {
        background: var(--cyber-bg-base);
        color: var(--cyber-text);
      }

      /* 有背景图时避免 body 实色盖住全屏 fixed 背景层 */
      html:has(#theme-custom[data-bg-art='1']),
      body:has(#theme-custom[data-bg-art='1']) {
        background: transparent !important;
      }

      #theme-custom a {
        color: var(--cyber-link);
        text-decoration: none;
        transition: color 0.2s;
      }
      #theme-custom a:hover {
        color: var(--cyber-link-hover);
        text-decoration: none;
      }
      #theme-custom .cyber-title-link:hover,
      #theme-custom a.no-underline-hover:hover {
        text-decoration: none;
      }
      #theme-custom a.active,
      #theme-custom a[aria-current='page'],
      #theme-custom .active > a {
        color: var(--cyber-link-active);
        font-weight: 600;
      }

      body:has(#theme-custom) ::selection {
        background: var(--cyber-selection-bg);
        color: var(--cyber-selection-fg);
      }

      body:has(#theme-custom) ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      body:has(#theme-custom) ::-webkit-scrollbar-track {
        background: var(--cyber-scrollbar-track);
      }
      body:has(#theme-custom) ::-webkit-scrollbar-thumb {
        background: var(--cyber-scrollbar-thumb);
        border-radius: 2px;
      }
      body:has(#theme-custom) ::-webkit-scrollbar-thumb:hover {
        background: var(--cyber-link);
      }

      /* 标题字体 — Domine */
      #theme-custom h1,
      #theme-custom h2,
      #theme-custom h3,
      #theme-custom h4,
      #theme-custom h5,
      #theme-custom h6,
      #theme-custom .notion-h,
      #theme-custom .notion-h-title {
        font-family: 'Domine', Georgia, serif;
        font-weight: 700;
        line-height: 1.25;
        letter-spacing: -0.005em;
      }

      #theme-custom h1,
      #theme-custom .notion-h1,
      #theme-custom .notion-h.notion-h1 {
        color: var(--heading-1);
      }
      #theme-custom h2,
      #theme-custom .notion-h2,
      #theme-custom .notion-h.notion-h2 {
        color: var(--heading-2);
      }
      #theme-custom h3,
      #theme-custom .notion-h3,
      #theme-custom .notion-h.notion-h3 {
        color: var(--heading-3);
      }
      #theme-custom h4,
      #theme-custom h5,
      #theme-custom h6,
      #theme-custom .notion-h4,
      #theme-custom .notion-h5,
      #theme-custom .notion-h6 {
        color: var(--heading-4);
      }

      /* 卡片可点击标题：中性 → accent 黄 */
      #theme-custom .cyber-title-link {
        color: var(--title-link);
        text-decoration: none;
        transition: color 0.2s;
      }
      #theme-custom .cyber-title-link:hover {
        color: var(--title-link-hover);
      }

      /* Typed.js */
      #theme-custom .typed-cursor {
        color: var(--accent-primary);
      }

      /* --- Mono UI utility --- */
      #theme-custom .cyber-mono {
        font-family:
          'JetBrains Mono',
          ui-monospace,
          SFMono-Regular,
          Menlo,
          Monaco,
          Consolas,
          monospace;
      }

      /* --- Main column — 透明阅读区 --- */
      #theme-custom #wrapper {
        background: transparent;
        border: none;
        box-shadow: none;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
      }

      /* 全视口背景栈（fixed），避免子元素负 z-index 落到 body 背后 */
      .cyber-viewport-bg {
        position: fixed;
        inset: 0;
        width: 100vw;
        height: 100vh;
        z-index: 0;
        pointer-events: none;
        overflow: hidden;
      }

      /* --- Gruvbox Ambient Mesh 氛围底图 --- */
      .glass-ambient-base {
        position: absolute;
        inset: 0;
        z-index: 0;
        background: var(--cyber-bg-base);
      }

      .glass-ambient-mesh {
        position: absolute;
        inset: 0;
        z-index: 1;
        overflow: hidden;
        pointer-events: none;
        opacity: 0.75;
        background:
          radial-gradient(
            ellipse 55% 45% at 12% 18%,
            color-mix(in srgb, var(--cyber-panel-border-strong) 45%, transparent),
            transparent 70%
          ),
          radial-gradient(
            ellipse 50% 42% at 88% 78%,
            color-mix(in srgb, var(--cyber-panel-border) 50%, transparent),
            transparent 68%
          ),
          radial-gradient(
            ellipse 42% 36% at 72% 12%,
            color-mix(in srgb, var(--cyber-link) 10%, transparent),
            transparent 65%
          ),
          radial-gradient(
            ellipse 38% 32% at 22% 88%,
            color-mix(in srgb, var(--cyber-neon-cyan) 7%, transparent),
            transparent 62%
          );
      }

      .dark .glass-ambient-mesh {
        opacity: 0.85;
      }

      /* --- Optional pixel-art / GIF backdrop --- */
      .aurora-bg-art {
        display: none;
      }
      #theme-custom[data-bg-art='1'] .cyber-viewport-bg .aurora-bg-art {
        display: block;
        position: absolute;
        inset: 0;
        z-index: 2;
        overflow: hidden;
      }
      #theme-custom[data-bg-art='1'] .cyber-viewport-bg .aurora-bg-art::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: var(--cyber-bg-art-image);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        image-rendering: pixelated;
        -ms-interpolation-mode: nearest-neighbor;
        opacity: var(--cyber-bg-art-opacity, 0.28);
      }
      #theme-custom[data-bg-art='1'] .cyber-viewport-bg .aurora-bg-art::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
          180deg,
          color-mix(in srgb, var(--cyber-bg-base) 72%, transparent) 0%,
          transparent 38%,
          transparent 62%,
          color-mix(in srgb, var(--cyber-bg-deep) 78%, transparent) 100%
        );
        pointer-events: none;
      }

      /* 遗留 cyber 背景（仅 medium/high 扫描线仍可用） */
      .aurora-bg {
        display: none;
      }

      /* Scanlines overlay — medium/high 强度可选 */
      .aurora-scanlines {
        position: absolute;
        inset: 0;
        z-index: 3;
        width: 100%;
        height: 100%;
        pointer-events: none;
        background: repeating-linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.06) 0px,
          rgba(0, 0, 0, 0.06) 1px,
          transparent 1px,
          transparent 3px
        );
        opacity: var(--cyber-scanline-opacity);
      }

      .dark .aurora-scanlines {
        background: repeating-linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.25) 0px,
          rgba(0, 0, 0, 0.25) 1px,
          transparent 1px,
          transparent 3px
        );
      }

      #theme-custom[data-cyber-intensity='low'] {
        --cyber-scanline-opacity: 0.01;
      }
      .dark #theme-custom[data-cyber-intensity='low'] {
        --cyber-scanline-opacity: 0.006;
      }
      #theme-custom[data-cyber-intensity='high'] {
        --cyber-scanline-opacity: 0.06;
      }
      .dark #theme-custom[data-cyber-intensity='high'] {
        --cyber-scanline-opacity: 0.1;
      }

      .cyber-matrix-canvas {
        position: absolute;
        inset: 0;
        z-index: 2;
        width: 100%;
        height: 100%;
        pointer-events: none;
        opacity: 0.22;
      }
      .dark .cyber-matrix-canvas {
        opacity: 0.28;
      }

      /* --- Notion article readability --- */
      #theme-custom .notion {
        color: var(--text-secondary);
        font-family:
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          'Microsoft YaHei',
          'PingFang SC',
          'Hiragino Sans GB',
          'Noto Sans CJK SC',
          Arial,
          sans-serif;
      }
      /* Notion 正文段落块（.notion-text），需 !important 覆盖 notion.css 默认 1px margin */
      #theme-custom .notion .notion-text {
        margin-top: 0.5em !important;
        margin-bottom: 0.5em !important;
        padding-top: 0.2em !important;
        padding-bottom: 0.2em !important;
        line-height: 1.6 !important;
      }
      #theme-custom .notion code,
      #theme-custom .notion .notion-inline-code {
        font-family:
          'JetBrains Mono',
          ui-monospace,
          monospace;
        background: color-mix(
          in srgb,
          var(--cyber-term-fg) 8%,
          transparent
        ) !important;
        color: var(--cyber-term-fg) !important;
        border: 1px solid var(--cyber-panel-border);
        border-radius: 3px;
        padding: 0.1em 0.35em;
      }
      .dark #theme-custom .notion code,
      .dark #theme-custom .notion .notion-inline-code {
        background: #282828 !important;
        color: #bdae93 !important;
        border-color: #3c3836;
      }
      .dark #theme-custom .notion pre,
      .dark #theme-custom .notion .notion-code {
        background: #282828 !important;
      }
      #theme-custom .notion .notion-quote,
      #theme-custom .notion blockquote.notion-quote,
      #theme-custom .notion .custom-quote {
        margin: 1.25rem 0;
        padding: 0.85rem 1rem 0.85rem 1.1rem;
        border: 1px solid var(--glass-border);
        border-left: 3px solid color-mix(in srgb, var(--link) 55%, transparent);
        border-radius: 8px;
        background: color-mix(in srgb, var(--glass-fill) 28%, transparent);
        color: var(--text-secondary);
        font-size: 0.95em;
        line-height: 1.65;
        box-shadow: inset 0 1px 0 color-mix(in srgb, #fff 4%, transparent);
      }
      .dark #theme-custom .notion .notion-quote,
      .dark #theme-custom .notion blockquote.notion-quote,
      .dark #theme-custom .notion .custom-quote {
        color: var(--text-secondary);
        background: color-mix(in srgb, var(--cyber-bg-deep) 16%, transparent);
      }
      #theme-custom .notion .notion-callout {
        border: 1px solid var(--cyber-panel-border-strong);
        border-radius: 4px;
        background: var(--cyber-panel-bg);
      }

      /* --- Card panels (category / tag / sidebar cards) --- */
      #theme-custom .card {
        background: var(--glass-fill);
        border: 1px solid var(--glass-border);
        border-radius: var(--glass-radius);
        backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
        -webkit-backdrop-filter: blur(var(--glass-blur))
          saturate(var(--glass-saturate));
        box-shadow: var(--glass-highlight), var(--glass-shadow);
      }

      /* --- Liquid Glass 文章卡片 --- */
      .game-card {
        position: relative;
        isolation: isolate;
        border-radius: var(--glass-radius) !important;
        background: var(--glass-fill);
        border: 1px solid var(--glass-border);
        backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
        -webkit-backdrop-filter: blur(var(--glass-blur))
          saturate(var(--glass-saturate));
        box-shadow: var(--glass-highlight), var(--glass-shadow);
        transition:
          background 220ms ease,
          border-color 220ms ease,
          box-shadow 220ms ease;
      }

      .game-card:hover,
      .game-card:focus-within {
        background: var(--glass-fill-hover);
        border-color: color-mix(
          in srgb,
          var(--glass-border) 70%,
          rgba(255, 255, 255, 0.18)
        );
        box-shadow:
          var(--glass-highlight),
          0 12px 40px rgba(0, 0, 0, 0.32);
      }

      .game-card-content {
        position: relative;
        z-index: 2;
      }

      /* --- Mobile sticky nav --- */
      #theme-custom .cyber-mobile-nav {
        color: var(--cyber-text);
        border-bottom: 1px solid transparent;
        transition:
          background 0.25s,
          border-color 0.25s,
          backdrop-filter 0.25s;
      }
      #theme-custom .cyber-mobile-nav--scrolled {
        background: transparent !important;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        border-bottom-color: var(--cyber-panel-border) !important;
        box-shadow: none;
      }

      /* --- Search drawer --- */
      #search-drawer-background {
        background: color-mix(
          in srgb,
          var(--cyber-bg-deep) 88%,
          transparent
        ) !important;
        backdrop-filter: blur(4px);
      }

      /* --- Footer decor (static, no animation) --- */
      .cyber-footer-pixel-edge {
        height: 1px;
        width: 100%;
        margin-bottom: 1.25rem;
        background: linear-gradient(
          90deg,
          transparent,
          color-mix(in srgb, var(--cyber-panel-border-strong) 90%, transparent),
          color-mix(in srgb, var(--cyber-neon-cyan) 35%, transparent),
          color-mix(in srgb, var(--cyber-panel-border-strong) 90%, transparent),
          transparent
        );
        opacity: 1;
      }

      /* --- Hero — Liquid Glass --- */
      .cyber-hero-terminal {
        min-height: 38vh;
        border: 1px solid var(--glass-border);
        border-radius: var(--glass-radius);
        background: var(--glass-fill);
        backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
        -webkit-backdrop-filter: blur(var(--glass-blur))
          saturate(var(--glass-saturate));
        margin-bottom: 1rem;
        box-shadow: var(--glass-highlight), var(--glass-shadow);
      }
      .cyber-hero-chrome {
        font-family:
          'JetBrains Mono',
          ui-monospace,
          monospace;
        font-size: 11px;
        letter-spacing: 0.06em;
        color: var(--cyber-term-dim);
        border-bottom: 1px solid var(--glass-border);
        padding: 0.35rem 0.75rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: color-mix(in srgb, var(--glass-fill) 85%, transparent);
      }
      .cyber-hero-body {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2.5rem 1rem 3rem;
        min-height: 28vh;
      }

      /* --- Post hero --- */
      .cyber-post-cover {
        border-radius: 8px !important;
        border: 1px solid var(--cyber-panel-border);
        box-shadow: 0 12px 40px rgba(24, 24, 27, 0.12);
      }
      .dark .cyber-post-cover {
        box-shadow: 0 16px 48px rgba(0, 0, 0, 0.35);
      }
      .cyber-post-title {
        font-size: 30px;
        font-weight: 700;
        letter-spacing: -0.02em;
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.06);
      }
      .dark .cyber-post-title {
        text-shadow: 0 1px 0 rgba(0, 0, 0, 0.35);
      }

      /* 阅读记录：原图比例居中封面 */
      #theme-custom .cyber-post-cover--natural {
        width: 100%;
      }
      #theme-custom .cyber-post-cover--natural-img {
        display: block;
        max-width: 30%;
        width: auto;
        height: auto;
        margin: 0 auto;
        border-radius: 8px;
        border: 1px solid var(--cyber-panel-border);
        box-shadow: 0 8px 28px color-mix(in srgb, var(--text-primary) 10%, transparent);
      }

      /* --- 文章底部版权与内联分享 --- */
      #theme-custom .article-copyright {
        margin: 2rem 0.25rem 1.5rem;
        padding-top: 1rem;
        border-top: 1px solid var(--glass-border);
        font-size: 0.68rem;
        line-height: 1.55;
        color: var(--text-tertiary);
      }
      #theme-custom .article-copyright__line {
        margin: 0.2rem 0;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.25rem 0.4rem;
      }
      #theme-custom .article-copyright__line--url {
        align-items: flex-start;
      }
      #theme-custom .article-copyright__label {
        flex-shrink: 0;
        color: var(--text-tertiary);
        opacity: 0.85;
      }
      #theme-custom .article-copyright__value {
        color: var(--text-tertiary);
        word-break: break-all;
      }
      #theme-custom .article-copyright__link {
        color: var(--text-tertiary);
        text-decoration: none;
      }
      #theme-custom .article-copyright__link:hover {
        color: var(--link-hover);
      }
      #theme-custom .article-copyright__share {
        display: inline-flex;
        align-items: center;
        margin-left: 0.15rem;
      }
      #theme-custom .article-share-group {
        display: inline-flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.15rem;
      }
      #theme-custom .article-share-btn {
        width: 1.35rem;
        height: 1.35rem;
        border-radius: 999px;
        border: 1px solid var(--glass-border);
        background: color-mix(in srgb, var(--glass-fill) 80%, transparent);
        color: var(--text-tertiary);
        transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
      }
      #theme-custom .article-share-btn:hover {
        color: var(--link-hover);
        border-color: color-mix(in srgb, var(--link-hover) 45%, transparent);
        background: color-mix(in srgb, var(--link-hover) 8%, transparent);
      }

      /* --- 分类视图：高档餐厅菜单（料理食谱） --- */
      #theme-custom .fine-dining-menu {
        --menu-ink: var(--text-primary);
        --menu-ink-muted: var(--text-secondary);
        --menu-ink-faint: var(--text-tertiary);
        --menu-rule: color-mix(in srgb, var(--text-tertiary) 35%, transparent);
        max-width: 36rem;
        margin: 0 auto;
        padding: 2rem 0 4rem;
      }

      #theme-custom .fine-dining-menu__hero {
        padding: 2.5rem 1rem 0;
      }

      #theme-custom .fine-dining-menu__hero-wrap {
        position: relative;
        padding-bottom: 3.5rem;
      }

      #theme-custom .fine-dining-menu__search-hint {
        font-size: 0.82rem;
        letter-spacing: 0.12em;
        color: var(--menu-ink-faint);
        max-width: 22rem;
        margin: 0 auto;
        font-weight: 400;
      }

      #theme-custom .fine-dining-menu__eyebrow {
        font-family: 'Domine', Georgia, serif;
        font-size: 0.7rem;
        letter-spacing: 0.38em;
        text-transform: uppercase;
        color: var(--menu-ink-faint);
        margin-bottom: 1.25rem;
      }

      #theme-custom .fine-dining-menu__title {
        font-family: 'Domine', Georgia, serif;
        font-size: clamp(1.75rem, 4vw, 2.25rem);
        font-weight: 600;
        letter-spacing: 0.04em;
        color: var(--menu-ink);
        line-height: 1.2;
        margin: 0;
      }

      #theme-custom .fine-dining-menu__ornament {
        width: 2.5rem;
        height: 1px;
        background: var(--menu-rule);
        margin: 1.75rem auto;
      }

      #theme-custom .fine-dining-menu__lede {
        font-size: 0.9rem;
        line-height: 1.75;
        color: var(--menu-ink-muted);
        max-width: 22rem;
        margin: 0 auto;
        font-weight: 400;
      }

      #theme-custom .fine-dining-menu__list {
        padding: 0 0.5rem;
      }

      #theme-custom .fine-dining-menu__item {
        border-bottom: 1px solid var(--menu-rule);
        padding: 2.25rem 0;
      }

      #theme-custom .fine-dining-menu__item:first-child {
        border-top: 1px solid var(--menu-rule);
      }

      #theme-custom .fine-dining-menu__item-inner {
        display: grid;
        grid-template-columns: 2.5rem 1fr auto;
        gap: 1rem 1.25rem;
        align-items: start;
      }

      #theme-custom .fine-dining-menu__ordinal {
        font-family: 'Domine', Georgia, serif;
        font-size: 0.75rem;
        letter-spacing: 0.12em;
        color: var(--menu-ink-faint);
        padding-top: 0.35rem;
      }

      #theme-custom .fine-dining-menu__item-title {
        font-family: 'Domine', Georgia, serif;
        font-size: 1.2rem;
        font-weight: 600;
        line-height: 1.35;
        margin: 0 0 0.65rem;
        letter-spacing: 0.02em;
      }

      #theme-custom .fine-dining-menu__item-link {
        color: var(--menu-ink);
        text-decoration: none;
        transition: color 0.25s ease;
      }

      #theme-custom .fine-dining-menu__item-link:hover {
        color: var(--link);
      }

      #theme-custom .fine-dining-menu__item-desc {
        font-size: 0.92rem;
        line-height: 1.75;
        color: var(--menu-ink-muted);
        margin: 0;
        font-weight: 400;
      }

      #theme-custom .fine-dining-menu__item-meta {
        font-size: 0.68rem;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--menu-ink-faint);
        margin: 1rem 0 0;
      }

      #theme-custom .fine-dining-menu__item-mark {
        font-family: 'Domine', Georgia, serif;
        font-size: 0.85rem;
        letter-spacing: 0.2em;
        color: var(--menu-ink-faint);
        opacity: 0;
        padding-top: 0.4rem;
        transition: opacity 0.25s ease;
      }

      #theme-custom .fine-dining-menu__item:hover .fine-dining-menu__item-mark,
      #theme-custom .fine-dining-menu__item:focus-within .fine-dining-menu__item-mark {
        opacity: 1;
      }

      #theme-custom .fine-dining-menu__pagination {
        margin-top: 2rem;
      }

      @media (max-width: 640px) {
        #theme-custom .fine-dining-menu__item-inner {
          grid-template-columns: 2rem 1fr;
        }
        #theme-custom .fine-dining-menu__item-mark {
          display: none;
        }
      }

      /* --- 分类视图：随想录行列表（essay-index） --- */
      #theme-custom .essay-index {
        --essay-ink: var(--text-primary);
        --essay-ink-muted: var(--text-secondary);
        --essay-ink-faint: var(--text-tertiary);
        --essay-rule: color-mix(in srgb, var(--text-tertiary) 35%, transparent);
        max-width: 40rem;
        margin: 0 auto;
        padding: 1rem 0 3rem;
      }

      #theme-custom .essay-index__hero {
        padding: 1.5rem 0.25rem 1rem;
      }

      #theme-custom .essay-index__title-heading {
        font-family: 'Domine', Georgia, serif;
        font-size: 1.65rem;
        font-weight: 600;
        letter-spacing: 0.02em;
        color: var(--essay-ink);
        margin: 0;
        line-height: 1.25;
      }

      #theme-custom .essay-index__hero-rule {
        height: 1px;
        width: 2.5rem;
        margin-top: 0.85rem;
        background: var(--essay-rule);
      }

      #theme-custom .essay-index__search-hint {
        margin: 0.75rem 0 0;
        font-size: 0.78rem;
        letter-spacing: 0.1em;
        color: var(--essay-ink-faint);
      }

      #theme-custom .essay-index__list {
        padding: 0 0.25rem;
      }

      #theme-custom .essay-index__row {
        border-bottom: 1px solid var(--essay-rule);
      }

      #theme-custom .essay-index__row:first-child {
        border-top: 1px solid var(--essay-rule);
      }

      #theme-custom .essay-index__row-link {
        display: block;
        padding: 0.7rem 0.35rem;
        border-radius: 2px;
        transition: background 0.2s ease;
      }

      #theme-custom .essay-index__row-link:hover {
        background: color-mix(in srgb, var(--link) 4%, transparent);
      }

      #theme-custom .essay-index__row-inner {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 1rem 1.25rem;
      }

      #theme-custom .essay-index__title {
        flex: 1;
        min-width: 0;
        margin: 0;
        font-size: 0.94rem;
        font-weight: 500;
        line-height: 1.45;
        letter-spacing: 0.01em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      #theme-custom .essay-index__tags {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: 0.35rem 0.65rem;
        flex-shrink: 0;
        max-width: 42%;
      }

      #theme-custom .essay-index__tag {
        font-size: 0.72rem;
        letter-spacing: 0.02em;
        color: var(--essay-ink-faint);
        transition: color 0.2s ease;
        white-space: nowrap;
      }

      #theme-custom .essay-index__tag:hover {
        color: var(--link-hover);
      }

      #theme-custom .essay-index__pagination {
        margin-top: 1.75rem;
      }

      @media (max-width: 640px) {
        #theme-custom .essay-index__row-inner {
          flex-direction: column;
          align-items: flex-start;
          gap: 0.4rem;
        }
        #theme-custom .essay-index__title {
          white-space: normal;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        #theme-custom .essay-index__tags {
          max-width: 100%;
          justify-content: flex-start;
        }
      }

      /* --- 阅读记录海报画廊 --- */
      #theme-custom .reading-gallery {
        --reading-ink: var(--text-primary);
        --reading-ink-muted: var(--text-secondary);
        --reading-ink-faint: var(--text-tertiary);
        --reading-rule: var(--glass-border);
        padding: 2rem 0 2.5rem;
        max-width: 56rem;
        margin: 0 auto;
      }

      #theme-custom .reading-gallery__hero {
        padding: 0 0.25rem 1.75rem;
      }

      #theme-custom .reading-gallery__title-heading {
        font-family: 'Domine', Georgia, serif;
        font-size: 1.65rem;
        font-weight: 600;
        letter-spacing: 0.02em;
        color: var(--reading-ink);
        margin: 0;
        line-height: 1.25;
      }

      #theme-custom .reading-gallery__hero-rule {
        height: 1px;
        width: 2.5rem;
        margin-top: 0.85rem;
        background: var(--reading-rule);
      }

      #theme-custom .reading-gallery__search-hint {
        margin: 0.75rem 0 0;
        font-size: 0.78rem;
        letter-spacing: 0.1em;
        color: var(--reading-ink-faint);
      }

      #theme-custom .reading-gallery__groups {
        display: flex;
        flex-direction: column;
        gap: 2.25rem;
      }

      #theme-custom .reading-gallery__group-title {
        font-family: 'Domine', Georgia, serif;
        font-size: 1.15rem;
        font-weight: 600;
        letter-spacing: 0.03em;
        color: var(--reading-ink);
        margin: 0 0 1rem;
        padding-bottom: 0.55rem;
        border-bottom: 1px solid var(--reading-rule);
      }

      #theme-custom .reading-gallery__grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 1rem 0.75rem;
      }

      @media (min-width: 768px) {
        #theme-custom .reading-gallery__grid {
          grid-template-columns: repeat(auto-fill, minmax(115px, 1fr));
          gap: 1.15rem 0.9rem;
        }
      }

      #theme-custom .reading-gallery__item {
        transition: transform 0.35s ease, box-shadow 0.35s ease;
      }

      #theme-custom .reading-gallery__item-link {
        display: block;
      }

      #theme-custom .reading-gallery__poster {
        aspect-ratio: 2 / 3;
        overflow: hidden;
        border-radius: 6px;
        box-shadow: 0 4px 14px color-mix(in srgb, var(--reading-ink) 12%, transparent);
        background: color-mix(in srgb, var(--reading-ink-faint) 8%, transparent);
        transition: box-shadow 0.35s ease;
      }

      #theme-custom .reading-gallery__poster-img,
      #theme-custom .reading-gallery__poster-fallback {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }

      #theme-custom .reading-gallery__poster-fallback {
        display: block;
        background: color-mix(in srgb, var(--reading-ink-faint) 15%, transparent);
      }

      #theme-custom .reading-gallery__item-title {
        margin: 0.5rem 0 0;
        font-size: 0.8rem;
        font-weight: 500;
        line-height: 1.4;
        letter-spacing: 0.01em;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        transition: color 0.25s ease;
      }

      #theme-custom .reading-gallery__summary {
        margin: 0.25rem 0 0;
        font-size: 0.7rem;
        line-height: 1.45;
        color: var(--reading-ink-faint);
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      #theme-custom .reading-gallery__item:hover {
        transform: translateY(-4px);
      }

      #theme-custom .reading-gallery__item:hover .reading-gallery__poster {
        box-shadow: 0 10px 28px color-mix(in srgb, var(--reading-ink) 18%, transparent);
      }

      #theme-custom .reading-gallery__item:hover .reading-gallery__poster-img {
        transform: scale(1.03);
      }

      #theme-custom .reading-gallery__item:hover .reading-gallery__item-title {
        color: var(--link-hover);
      }

      #theme-custom .reading-gallery__pagination {
        margin-top: 2rem;
      }

      /* --- 音乐手记歌单画廊 --- */
      #theme-custom .music-notes {
        --music-ink: var(--text-primary);
        --music-ink-muted: var(--text-secondary);
        --music-ink-faint: var(--text-tertiary);
        --music-rule: var(--glass-border);
        padding: 2rem 0 2.5rem;
        max-width: 56rem;
        margin: 0 auto;
      }

      #theme-custom .music-notes__hero {
        padding: 0 0.25rem 1.25rem;
      }

      #theme-custom .music-notes__title-heading {
        font-family: 'Domine', Georgia, serif;
        font-size: 1.65rem;
        font-weight: 600;
        letter-spacing: 0.02em;
        color: var(--music-ink);
        margin: 0;
        line-height: 1.25;
      }

      #theme-custom .music-notes__hero-rule {
        height: 1px;
        width: 2.5rem;
        margin-top: 0.85rem;
        background: var(--music-rule);
      }

      #theme-custom .music-notes__search-hint {
        margin: 0.75rem 0 0;
        font-size: 0.78rem;
        letter-spacing: 0.1em;
        color: var(--music-ink-faint);
      }

      #theme-custom .music-notes__filters {
        display: flex;
        flex-wrap: nowrap;
        gap: 0.5rem;
        padding: 0 0.25rem 1.5rem;
        overflow-x: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }

      #theme-custom .music-notes__filters::-webkit-scrollbar {
        display: none;
      }

      #theme-custom .music-notes__filter {
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        padding: 0.2rem 0.8rem;
        font-size: 0.78rem;
        font-weight: 500;
        letter-spacing: 0.02em;
        color: var(--music-ink-muted);
        border: 1px solid var(--music-rule);
        border-radius: 999px;
        background: transparent;
        transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
      }

      #theme-custom .music-notes__filter:hover {
        color: var(--link-hover);
        border-color: var(--link-hover);
      }

      #theme-custom .music-notes__filter--active {
        font-weight: 700 !important;
        color: var(--accent-primary) !important;
        background: color-mix(in srgb, var(--accent-primary) 18%, transparent);
        border-color: color-mix(in srgb, var(--accent-primary) 45%, transparent);
      }

      #theme-custom .music-notes__filter--active:hover {
        color: var(--link-hover);
        background: color-mix(in srgb, var(--link-hover) 12%, transparent);
        border-color: var(--link-hover);
      }

      #theme-custom .music-notes__grid-wrap {
        position: relative;
        min-height: 12rem;
      }

      #theme-custom .music-notes__grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
        gap: 1.25rem 1rem;
        transition: opacity 0.25s ease;
      }

      #theme-custom .music-notes__grid--dimmed {
        opacity: 0.45;
        pointer-events: none;
      }

      #theme-custom .music-notes__loading {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        pointer-events: none;
      }

      #theme-custom .music-notes__loading-icon {
        font-size: 1.75rem;
        color: var(--accent-primary);
      }

      @media (min-width: 768px) {
        #theme-custom .music-notes__grid {
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 1.5rem 1.25rem;
        }
      }

      #theme-custom .music-notes__item-link {
        display: block;
      }

      #theme-custom .music-notes__cover-wrap {
        position: relative;
        aspect-ratio: 1 / 1;
        overflow: hidden;
        border-radius: 8px;
        box-shadow: 0 4px 14px color-mix(in srgb, var(--music-ink) 12%, transparent);
        background: color-mix(in srgb, var(--music-ink-faint) 8%, transparent);
      }

      #theme-custom .music-notes__cover-img,
      #theme-custom .music-notes__cover-fallback {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.45s ease;
      }

      #theme-custom .music-notes__cover-fallback {
        display: block;
        background: color-mix(in srgb, var(--music-ink-faint) 15%, transparent);
      }

      #theme-custom .music-notes__overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: flex-end;
        padding: 0.65rem 0.7rem;
        background: linear-gradient(
          to top,
          color-mix(in srgb, #000 78%, transparent) 0%,
          color-mix(in srgb, #000 35%, transparent) 55%,
          transparent 100%
        );
        transform: translateY(100%);
        transition: transform 0.35s ease;
      }

      #theme-custom .music-notes__overlay-text {
        margin: 0;
        font-size: 0.72rem;
        line-height: 1.45;
        color: rgba(255, 255, 255, 0.92);
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      #theme-custom .music-notes__item:hover .music-notes__cover-img,
      #theme-custom .music-notes__item:focus-within .music-notes__cover-img {
        transform: scale(1.04);
      }

      #theme-custom .music-notes__item:hover .music-notes__overlay,
      #theme-custom .music-notes__item:focus-within .music-notes__overlay {
        transform: translateY(0);
      }

      #theme-custom .music-notes__title {
        margin: 0.6rem 0 0;
        font-size: 0.85rem;
        font-weight: 500;
        line-height: 1.4;
        letter-spacing: 0.01em;
        display: flex;
        align-items: flex-start;
        gap: 0.3rem;
        transition: color 0.25s ease;
      }

      #theme-custom .music-notes__title-icon {
        flex-shrink: 0;
        line-height: 1;
        margin-top: 0.1rem;
      }

      #theme-custom .music-notes__title-icon img {
        width: 0.95rem !important;
        height: 0.95rem !important;
        margin: 0 !important;
        display: block;
      }

      #theme-custom .music-notes__title-icon span {
        font-size: 0.85rem;
        margin: 0 !important;
      }

      #theme-custom .music-notes__title-text {
        flex: 1;
        min-width: 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      #theme-custom .music-notes__item:hover .music-notes__title,
      #theme-custom .music-notes__item:focus-within .music-notes__title {
        color: var(--link-hover);
      }

      #theme-custom .music-notes__empty-hint {
        margin: 2rem 0.25rem;
        text-align: center;
        font-size: 0.9rem;
        color: var(--music-ink-faint);
      }

      #theme-custom .music-notes__pagination {
        margin-top: 2rem;
      }

      /* --- 料理食谱搜索模态 --- */
      #theme-custom .fine-dining-search-overlay {
        position: fixed;
        inset: 0;
        z-index: 50;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding: 32vh 1.25rem 1.25rem;
      }

      #theme-custom .fine-dining-search-backdrop {
        position: absolute;
        inset: 0;
        border: none;
        padding: 0;
        cursor: pointer;
        /* 适度遮罩：保留页面轮廓，不过分虚化 */
        background: color-mix(
          in srgb,
          var(--cyber-bg-base) 72%,
          transparent
        );
        backdrop-filter: blur(8px) saturate(1.05);
        -webkit-backdrop-filter: blur(8px) saturate(1.05);
      }

      .dark #theme-custom .fine-dining-search-backdrop {
        background: color-mix(
          in srgb,
          var(--cyber-bg-base) 78%,
          transparent
        );
      }

      #theme-custom .fine-dining-search-dialog {
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 28rem;
      }

      #theme-custom
        .fine-dining-search-dialog
        .cyber-search-input-wrap--minimal {
        border: 1px solid var(--cyber-panel-border-strong);
        border-radius: var(--glass-radius);
        background: var(--cyber-panel-bg-solid);
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        box-shadow: var(--glass-highlight), var(--glass-shadow);
        padding: 0 0.15rem 0 0.75rem;
        transition:
          border-color 0.2s ease,
          box-shadow 0.2s ease;
      }

      #theme-custom
        .fine-dining-search-dialog
        .cyber-search-input-wrap--minimal:focus-within {
        border-color: color-mix(
          in srgb,
          var(--link) 42%,
          var(--cyber-panel-border-strong)
        );
        box-shadow:
          var(--glass-highlight),
          0 10px 36px rgba(60, 56, 54, 0.1);
      }

      .dark
        #theme-custom
        .fine-dining-search-dialog
        .cyber-search-input-wrap--minimal:focus-within {
        box-shadow:
          var(--glass-highlight),
          0 12px 40px rgba(0, 0, 0, 0.28);
      }

      #theme-custom
        .fine-dining-search-dialog
        .cyber-search-input-wrap--minimal
        input {
        font-family:
          'Work Sans',
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          sans-serif;
        font-size: 1.05rem;
        font-weight: 500;
        letter-spacing: 0.01em;
        padding-top: 0.9rem;
        padding-bottom: 0.9rem;
        color: var(--text-primary) !important;
        caret-color: var(--link);
      }

      #theme-custom
        .fine-dining-search-dialog
        .cyber-search-input-wrap--minimal
        input::placeholder {
        color: var(--text-tertiary);
        font-weight: 400;
      }

      #theme-custom
        .fine-dining-search-dialog
        .cyber-search-input-wrap--minimal
        i {
        color: var(--text-secondary) !important;
        transition: color 0.2s ease;
      }

      #theme-custom
        .fine-dining-search-dialog
        .cyber-search-input-wrap--minimal
        i:hover {
        color: var(--link-hover) !important;
      }

      /* --- Post hero --- */
      .cyber-search-input-wrap {
        border: 1px solid var(--glass-border);
        border-radius: calc(var(--glass-radius) - 4px);
        background: var(--glass-fill);
        backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
        -webkit-backdrop-filter: blur(var(--glass-blur))
          saturate(var(--glass-saturate));
        box-shadow: var(--glass-highlight);
      }
      .cyber-search-input-wrap input {
        caret-color: var(--cyber-neon-cyan);
        background: transparent !important;
        border: none !important;
        color: var(--cyber-text) !important;
        font-family:
          'JetBrains Mono',
          ui-monospace,
          monospace;
        font-size: 13px;
      }
      .cyber-search-input-wrap:focus-within {
        box-shadow: 0 0 0 1.5px color-mix(in srgb, var(--cyber-neon-cyan) 45%, transparent);
      }

      /* --- Float buttons --- */
      #theme-custom .cyber-float-btn {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: calc(var(--glass-radius) - 4px);
        border: 1px solid var(--glass-border);
        background: var(--glass-fill);
        backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
        -webkit-backdrop-filter: blur(var(--glass-blur))
          saturate(var(--glass-saturate));
        color: var(--cyber-term-fg);
        box-shadow: var(--glass-highlight), var(--glass-shadow);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 0;
        appearance: none;
        transition:
          transform 0.2s,
          border-color 0.2s,
          box-shadow 0.2s,
          color 0.2s;
      }
      .dark #theme-custom .cyber-float-btn {
        color: var(--cyber-neon-cyan);
      }
      #theme-custom .cyber-float-btn:hover {
        transform: translateY(-1px);
        color: var(--link-hover);
        background: var(--glass-fill-hover);
        border-color: color-mix(
          in srgb,
          var(--glass-border) 70%,
          rgba(255, 255, 255, 0.18)
        );
        box-shadow:
          var(--glass-highlight),
          0 12px 40px rgba(0, 0, 0, 0.32);
      }

      /* --- Sidebar — 透明导航区 --- */
      #theme-custom aside.cyber-sidebar-shell {
        border-right: 1px solid var(--cyber-panel-border);
        background: transparent;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
      }

      /* --- 404 --- */
      .cyber-404-panel {
        font-family:
          'JetBrains Mono',
          ui-monospace,
          monospace;
        border: 1px solid var(--glass-border);
        border-radius: var(--glass-radius);
        padding: 2rem;
        background: var(--glass-fill);
        backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
        -webkit-backdrop-filter: blur(var(--glass-blur))
          saturate(var(--glass-saturate));
        box-shadow: var(--glass-highlight), var(--glass-shadow);
      }

      /* --- Loading --- */
      #theme-custom #loading-cover.cyber-loading-cover {
        background: color-mix(
          in srgb,
          var(--cyber-bg-deep) 92%,
          transparent
        );
      }
      .cyber-boot-bar {
        width: min(280px, 70vw);
        height: 4px;
        border-radius: 2px;
        background: var(--cyber-panel-border);
        overflow: hidden;
        margin-top: 1rem;
      }
      .cyber-boot-bar::after {
        content: '';
        display: block;
        height: 100%;
        width: 40%;
        background: linear-gradient(
          90deg,
          transparent,
          var(--cyber-neon-cyan),
          transparent
        );
        animation: cyber-boot-slide 1.1s ease-in-out infinite;
      }
      @keyframes cyber-boot-slide {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(350%);
        }
      }

      @media (prefers-reduced-transparency: reduce) {
        .glass-ambient-mesh {
          opacity: 0.3;
        }
        .game-card,
        #theme-custom .card,
        .cyber-hero-terminal,
        .cyber-search-input-wrap,
        #theme-custom .cyber-float-btn,
        .cyber-404-panel {
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          background: var(--cyber-panel-bg-solid);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .cyber-boot-bar::after {
          animation: none !important;
        }
        .aurora-scanlines {
          opacity: 0.02 !important;
        }
        .game-card {
          transition: none;
        }
      }
    `}</style>
  )
}

export { Style }
