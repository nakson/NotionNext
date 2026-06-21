/* eslint-disable react/no-unknown-property */

/**
 * Custom theme — agent-CLI style shell + optional pixel-art backdrop
 */
const Style = () => {
  return (
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Domine:wght@600;700&family=JetBrains+Mono:wght@400;600&family=Work+Sans:wght@400;500;600&display=swap');

      /* --- Design tokens (light default on #theme-custom) --- */
      #theme-custom {
        /* 兼容仍引用 --pixel-* 的旧组件 */
        --pixel-accent: var(--cyber-link);
        --pixel-secondary: var(--cyber-neon-cyan);
        --pixel-bg: var(--cyber-bg-deep);
        --pixel-bg-light: var(--cyber-panel-bg-solid);
        --pixel-text: var(--cyber-text);
        --pixel-text-muted: var(--cyber-text-muted);

        --cyber-user-neon: #0ea5e9;
        --cyber-bg-base: #f4f4f5;
        --cyber-bg-deep: #e4e4e7;
        --cyber-panel-bg: rgba(255, 255, 255, 0.48);
        --cyber-panel-bg-solid: rgba(250, 250, 250, 0.82);
        --cyber-panel-border: rgba(24, 24, 27, 0.1);
        --cyber-panel-border-strong: rgba(24, 24, 27, 0.16);
        --cyber-text: #18181b;
        --cyber-text-muted: #71717a;
        --cyber-term-fg: #15803d;
        --cyber-term-dim: #3f6212;
        --cyber-neon-cyan: var(--cyber-user-neon, #0ea5e9);
        --cyber-neon-magenta: #7c3aed;
        --cyber-grid-line: rgba(24, 24, 27, 0.05);
        --cyber-grid-size: 16px;
        --cyber-link: #0369a1;
        --cyber-link-hover: var(--cyber-user-neon, #0284c7);
        --cyber-link-active: #075985;
        --cyber-selection-bg: rgba(14, 165, 233, 0.2);
        --cyber-selection-fg: #18181b;
        --cyber-scrollbar-track: #e4e4e7;
        --cyber-scrollbar-thumb: #a1a1aa;
        --cyber-scanline-opacity: 0.018;
        --cyber-float-shadow: 0 4px 20px rgba(24, 24, 27, 0.08);
        --cyber-bg-art-opacity: 0.28;

        /* Liquid Glass 材质（亮色） */
        --glass-fill: rgba(255, 255, 255, 0.52);
        --glass-fill-hover: rgba(255, 255, 255, 0.65);
        --glass-blur: 24px;
        --glass-saturate: 1.5;
        --glass-border: rgba(255, 255, 255, 0.45);
        --glass-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.55);
        --glass-shadow: 0 8px 32px rgba(24, 24, 27, 0.08);
        --glass-radius: 12px;
        --cyber-panel-bg: var(--glass-fill);
      }

      .dark #theme-custom {
        /* Gruvbox Dark — 对齐 elmc.at */
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
        --cyber-text: #ebdbb2;
        --cyber-text-muted: #a89984;
        --cyber-term-fg: #98971a;
        --cyber-term-dim: #bdae93;
        --cyber-neon-cyan: var(--cyber-user-neon, #fabd2f);
        --cyber-neon-magenta: #d3869b;
        --cyber-grid-line: rgba(168, 153, 132, 0.04);
        --cyber-grid-size: 16px;
        --cyber-link: #83a598;
        --cyber-link-hover: #8ec07c;
        --cyber-link-active: #458588;
        --cyber-selection-bg: rgba(131, 165, 152, 0.25);
        --cyber-selection-fg: #ebdbb2;
        --cyber-scrollbar-track: #1d2021;
        --cyber-scrollbar-thumb: #3c3836;
        --cyber-scanline-opacity: 0.012;
        --cyber-float-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
        --cyber-bg-art-opacity: 0.08;
      }

      body:has(#theme-custom) {
        font-family:
          'Work Sans',
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          Helvetica,
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
        transition:
          color 0.2s,
          background-color 0.2s;
      }
      #theme-custom a:hover {
        color: var(--cyber-link-hover);
      }
      /* 正文内链 elmc.at 式 hover 高亮 */
      .dark #theme-custom .notion a:hover,
      .dark #theme-custom #wrapper p a:hover {
        background-color: var(--cyber-link);
        color: var(--cyber-bg-deep);
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

      /* Typed.js */
      #theme-custom .typed-cursor {
        color: var(--cyber-neon-cyan);
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
        color: var(--cyber-text-muted);
        font-family:
          'Work Sans',
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          sans-serif;
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
      #theme-custom .notion blockquote.notion-quote {
        border-left: 3px solid #8ec07c;
        background: color-mix(
          in srgb,
          #689d6a 8%,
          transparent
        );
      }
      .dark #theme-custom .notion .notion-quote,
      .dark #theme-custom .notion blockquote.notion-quote {
        color: #689d6a;
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
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.06);
      }
      .dark .cyber-post-title {
        text-shadow: 0 1px 0 rgba(0, 0, 0, 0.35);
      }

      /* --- Search input --- */
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
        transition:
          transform 0.2s,
          border-color 0.2s,
          box-shadow 0.2s;
      }
      .dark #theme-custom .cyber-float-btn {
        color: var(--cyber-neon-cyan);
      }
      #theme-custom .cyber-float-btn:hover {
        transform: translateY(-1px);
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
