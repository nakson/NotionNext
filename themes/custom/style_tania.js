/* eslint-disable react/no-unknown-property */

/**
 * Custom theme — agent-CLI style shell + optional pixel-art backdrop
 */
const Style = () => {
  return (
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;600&display=swap');

      /* --- Design tokens (light default on #theme-custom) --- */
      #theme-custom {
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
      }

      .dark #theme-custom {
        --cyber-bg-base: #09090b;
        --cyber-bg-deep: #18181b;
        --cyber-panel-bg: rgba(24, 24, 27, 0.5);
        --cyber-panel-bg-solid: rgba(24, 24, 27, 0.78);
        --cyber-panel-border: rgba(255, 255, 255, 0.08);
        --cyber-panel-border-strong: rgba(255, 255, 255, 0.14);
        --cyber-text: #fafafa;
        --cyber-text-muted: #a1a1aa;
        --cyber-term-fg: #86efac;
        --cyber-term-dim: #4ade80;
        --cyber-neon-cyan: var(--cyber-user-neon, #38bdf8);
        --cyber-neon-magenta: #a78bfa;
        --cyber-grid-line: rgba(255, 255, 255, 0.06);
        --cyber-grid-size: 16px;
        --cyber-link: #7dd3fc;
        --cyber-link-hover: #bae6fd;
        --cyber-link-active: #38bdf8;
        --cyber-selection-bg: rgba(56, 189, 248, 0.22);
        --cyber-selection-fg: #fafafa;
        --cyber-scrollbar-track: #18181b;
        --cyber-scrollbar-thumb: #52525b;
        --cyber-scanline-opacity: 0.035;
        --cyber-float-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
        --cyber-bg-art-opacity: 0.32;
      }

      body:has(#theme-custom) {
        font-family:
          'IBM Plex Sans',
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          Helvetica,
          Arial,
          sans-serif;
        background: var(--cyber-bg-base);
        color: var(--cyber-text);
        line-height: 1.75;
        transition:
          background 0.3s,
          color 0.3s;
      }

      .dark body:has(#theme-custom) {
        background: var(--cyber-bg-deep);
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
        background: var(--cyber-neon-cyan);
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

      /* --- Main column — frosted glass (agent panel) --- */
      #theme-custom #wrapper {
        background: var(--cyber-panel-bg);
        border: 1px solid var(--cyber-panel-border);
        box-shadow:
          0 0 0 1px rgba(255, 255, 255, 0.06) inset,
          0 20px 50px rgba(24, 24, 27, 0.06);
        backdrop-filter: blur(18px) saturate(1.25);
        -webkit-backdrop-filter: blur(18px) saturate(1.25);
      }
      .dark #theme-custom #wrapper {
        box-shadow:
          0 0 0 1px rgba(255, 255, 255, 0.04) inset,
          0 24px 56px rgba(0, 0, 0, 0.4);
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

      /* --- Optional pixel-art / GIF backdrop --- */
      .aurora-bg-art {
        display: none;
      }
      #theme-custom[data-bg-art='1'] .cyber-viewport-bg .aurora-bg-art {
        display: block;
        position: absolute;
        inset: 0;
        z-index: 0;
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

      /* --- Layered background --- */
      .aurora-bg {
        position: absolute;
        inset: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        background: linear-gradient(
          165deg,
          var(--cyber-bg-base) 0%,
          var(--cyber-bg-deep) 55%,
          var(--cyber-bg-base) 100%
        );
      }

      #theme-custom[data-bg-art='1'] .cyber-viewport-bg .aurora-bg {
        background: linear-gradient(
          165deg,
          color-mix(in srgb, var(--cyber-bg-base) 82%, transparent) 0%,
          color-mix(in srgb, var(--cyber-bg-deep) 78%, transparent) 52%,
          color-mix(in srgb, var(--cyber-bg-base) 85%, transparent) 100%
        );
      }

      .aurora-bg::before {
        content: '';
        position: absolute;
        inset: 0;
        opacity: 1;
        background-image:
          linear-gradient(
            to right,
            var(--cyber-grid-line) 1px,
            transparent 1px
          ),
          linear-gradient(
            to bottom,
            var(--cyber-grid-line) 1px,
            transparent 1px
          );
        background-size: var(--cyber-grid-size) var(--cyber-grid-size);
      }

      .aurora-bg::after {
        content: '';
        position: absolute;
        inset: 0;
        opacity: 0.14;
        background: radial-gradient(
          ellipse 85% 60% at 50% 12%,
          color-mix(in srgb, var(--cyber-neon-cyan) 10%, transparent),
          transparent 72%
        );
        pointer-events: none;
      }

      .dark .aurora-bg::after {
        opacity: 0.2;
        background: radial-gradient(
          ellipse 75% 55% at 50% 15%,
          color-mix(in srgb, var(--cyber-neon-cyan) 14%, transparent),
          transparent 68%
        );
      }

      /* Scanlines overlay */
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
        --cyber-scanline-opacity: 0.02;
      }
      .dark #theme-custom[data-cyber-intensity='low'] {
        --cyber-scanline-opacity: 0.03;
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
          'IBM Plex Sans',
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
        background: rgba(34, 211, 238, 0.08) !important;
        color: var(--cyber-text) !important;
      }
      #theme-custom .notion .notion-quote,
      #theme-custom .notion blockquote.notion-quote {
        border-left: 3px solid var(--cyber-neon-cyan);
        background: color-mix(
          in srgb,
          var(--cyber-neon-cyan) 6%,
          transparent
        );
      }
      #theme-custom .notion .notion-callout {
        border: 1px solid var(--cyber-panel-border-strong);
        border-radius: 4px;
        background: var(--cyber-panel-bg);
      }

      /* --- Card panels (category / tag / sidebar cards) --- */
      #theme-custom .card {
        background: var(--cyber-panel-bg);
        border: 1px solid var(--cyber-panel-border);
        border-radius: 8px;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        box-shadow: 0 4px 24px rgba(24, 24, 27, 0.05);
      }
      .dark #theme-custom .card {
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
      }

      /* --- Terminal post cards --- */
      .game-card {
        position: relative;
        isolation: isolate;
        border-radius: 8px !important;
        background: var(--cyber-panel-bg);
        border: 1px solid var(--cyber-panel-border);
        backdrop-filter: blur(14px) saturate(1.1);
        -webkit-backdrop-filter: blur(14px) saturate(1.1);
        box-shadow: 0 4px 24px rgba(24, 24, 27, 0.06);
        transition:
          border-color 220ms ease,
          box-shadow 220ms ease;
      }
      .dark .game-card {
        box-shadow:
          0 12px 40px rgba(0, 0, 0, 0.35),
          0 0 0 1px rgba(255, 255, 255, 0.04) inset;
      }

      .game-card::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        z-index: 0;
        opacity: 0.35;
        background: repeating-linear-gradient(
          0deg,
          transparent 0,
          transparent 3px,
          color-mix(in srgb, var(--cyber-neon-cyan) 6%, transparent) 3px,
          color-mix(in srgb, var(--cyber-neon-cyan) 6%, transparent) 4px
        );
        mix-blend-mode: multiply;
      }
      .dark .game-card::before {
        mix-blend-mode: screen;
        opacity: 0.12;
      }

      .game-card::after {
        content: '';
        position: absolute;
        inset: 0;
        padding: 1px;
        border-radius: inherit;
        background: linear-gradient(
          145deg,
          color-mix(in srgb, var(--cyber-neon-cyan) 22%, transparent),
          color-mix(in srgb, var(--cyber-panel-border-strong) 40%, transparent),
          color-mix(in srgb, var(--cyber-neon-cyan) 15%, transparent)
        );
        -webkit-mask:
          linear-gradient(#000 0 0) content-box,
          linear-gradient(#000 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        opacity: 0.35;
        transition:
          opacity 220ms ease,
          filter 220ms ease;
        pointer-events: none;
        z-index: 1;
      }

      .game-card:hover,
      .game-card:focus-within {
        border-color: color-mix(
          in srgb,
          var(--cyber-neon-cyan) 35%,
          transparent
        );
        box-shadow: 0 0 0 1px
          color-mix(in srgb, var(--cyber-neon-cyan) 12%, transparent) inset;
      }
      .game-card:hover::before,
      .game-card:focus-within::before {
        opacity: 0.12;
      }
      .game-card:hover::after,
      .game-card:focus-within::after {
        opacity: 0.5;
        filter: none;
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
        background: var(--cyber-panel-bg) !important;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border-bottom-color: var(--cyber-panel-border) !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
      }
      .dark #theme-custom .cyber-mobile-nav--scrolled {
        box-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
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

      /* --- Hero terminal frame --- */
      .cyber-hero-terminal {
        min-height: 38vh;
        border: 1px solid var(--cyber-panel-border);
        border-radius: 8px;
        background: var(--cyber-panel-bg);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        margin-bottom: 1rem;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
      }
      .dark .cyber-hero-terminal {
        background: rgba(24, 24, 27, 0.42);
        box-shadow:
          inset 0 0 48px rgba(0, 0, 0, 0.35),
          0 0 0 1px rgba(255, 255, 255, 0.06);
      }
      .cyber-hero-chrome {
        font-family:
          'JetBrains Mono',
          ui-monospace,
          monospace;
        font-size: 11px;
        letter-spacing: 0.06em;
        color: var(--cyber-term-dim);
        border-bottom: 1px solid var(--cyber-panel-border);
        padding: 0.35rem 0.75rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: color-mix(
          in srgb,
          var(--cyber-panel-bg) 80%,
          transparent
        );
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

      /* --- Search input terminal --- */
      .cyber-search-input-wrap {
        border: 1px solid var(--cyber-panel-border-strong);
        border-radius: 6px;
        background: var(--cyber-panel-bg);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.04) inset;
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
        border-radius: 6px;
        border: 1px solid var(--cyber-panel-border-strong);
        background: var(--cyber-panel-bg);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        color: var(--cyber-term-fg);
        box-shadow: var(--cyber-float-shadow);
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
        border-color: color-mix(in srgb, var(--cyber-neon-cyan) 55%, transparent);
        box-shadow: 0 8px 24px rgba(24, 24, 27, 0.12);
      }
      .dark #theme-custom .cyber-float-btn:hover {
        box-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
      }

      /* --- Sidebar terminal --- */
      #theme-custom aside.cyber-sidebar-shell {
        border-right: 1px solid var(--cyber-panel-border);
        background: color-mix(in srgb, var(--cyber-panel-bg) 55%, transparent);
        backdrop-filter: blur(16px) saturate(1.15);
        -webkit-backdrop-filter: blur(16px) saturate(1.15);
      }

      /* --- 404 --- */
      .cyber-404-panel {
        font-family:
          'JetBrains Mono',
          ui-monospace,
          monospace;
        border: 1px solid var(--cyber-panel-border);
        border-radius: 8px;
        padding: 2rem;
        background: var(--cyber-panel-bg);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        box-shadow: 0 16px 48px rgba(24, 24, 27, 0.1);
      }
      .dark .cyber-404-panel {
        box-shadow: 0 20px 56px rgba(0, 0, 0, 0.4);
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

      @media (prefers-reduced-motion: reduce) {
        .cyber-boot-bar::after {
          animation: none !important;
        }
        .aurora-scanlines {
          opacity: 0.02 !important;
        }
        .game-card,
        .game-card::before,
        .game-card::after {
          transition: none;
        }
      }
    `}</style>
  )
}

export { Style }
