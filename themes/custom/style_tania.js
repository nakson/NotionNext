/* eslint-disable react/no-unknown-property */

/**
 * Tania Rascia Theme Styles
 * @returns
 */
const Style = () => {
  return (
    <style jsx global>{`
      body {
        font-family:
          -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
          Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
          'Segoe UI Symbol';
        background: #f6f7ff; /* Fallback; main visuals come from .aurora-bg */
        color: #0f172a; /* Slate-900: cleaner for the new light palette */
        line-height: 1.75;
        transition:
          background 0.3s,
          color 0.3s;
      }
      .dark body {
        background: #070914; /* Fallback; main visuals come from .aurora-bg */
        color: #d4d4d8;
        transition:
          background 0.3s,
          color 0.3s;
      }
      /* Global Link Styles */
      a {
        color: #4f46e5;
        text-decoration: none;
        transition: color 0.2s;
      }
      a:hover {
        color: #06b6d4;
      }
      a.active,
      a[aria-current='page'],
      .active > a {
        color: #4338ca;
        font-weight: bold;
      }
      .dark a {
        color: #93c5fd; /* Softer blue/cyan for dark mode */
      }
      .dark a:hover {
        color: #22d3ee;
      }
      .dark a.active,
      .dark a[aria-current='page'],
      .dark .active > a {
        color: #a5b4fc;
        font-weight: bold;
      }

      /* Selection color */
      ::selection {
        background: rgba(99, 102, 241, 0.18);
        color: #fff;
      }

      /* Scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      ::-webkit-scrollbar-track {
        background: #181818;
      }
      ::-webkit-scrollbar-thumb {
        background: #333;
        border-radius: 4px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #555;
      }

      /* Notion specific overrides to blend in */
      .notion {
        color: #64748b; /* Slate-500 */
      }

      /* Game-like ambient background with center halo */
      .aurora-bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: -10;
        pointer-events: none;
        overflow: hidden;
        background: #f6f7ff; /* Solid color for light mode */
      }
      .aurora-bg::before {
        content: '';
        position: absolute;
        inset: 0;
        opacity: 0.08; /* Subtle grid for light mode to show card transparency */
        background-image:
          linear-gradient(to right, rgba(15, 23, 42, 0.3) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(15, 23, 42, 0.3) 1px, transparent 1px);
        background-size: 56px 56px;
      }
      .aurora-bg::after {
        opacity: 0; /* Hide halo in light mode */
      }

      .dark .aurora-bg {
        background:
          radial-gradient(
            closest-side at 50% 44%,
            rgba(56, 189, 248, 0.1),
            rgba(56, 189, 248, 0) 62%
          ),
          radial-gradient(
            closest-side at 58% 52%,
            rgba(168, 85, 247, 0.09),
            rgba(168, 85, 247, 0) 60%
          ),
          radial-gradient(
            closest-side at 36% 70%,
            rgba(34, 211, 238, 0.06),
            rgba(34, 211, 238, 0) 60%
          ),
          linear-gradient(180deg, #050713 0%, #080b1f 55%, #050713 100%);
      }
      .dark .aurora-bg::before {
        opacity: 0.2;
        background-image:
          linear-gradient(
            to right,
            rgba(148, 163, 184, 0.26) 1px,
            transparent 1px
          ),
          linear-gradient(
            to bottom,
            rgba(148, 163, 184, 0.26) 1px,
            transparent 1px
          );
        background-size:
          64px 64px,
          64px 64px;
      }
      .dark .aurora-bg::after {
        background:
          radial-gradient(
            circle at 50% 44%,
            rgba(56, 189, 248, 0.1),
            rgba(56, 189, 248, 0) 40%
          ),
          radial-gradient(
            circle at 50% 44%,
            rgba(168, 85, 247, 0.09),
            rgba(168, 85, 247, 0) 60%
          );
        filter: blur(40px);
        opacity: 0.32;
        mix-blend-mode: screen;
      }

      /* Game-like frosted card (used by BlogPostCard) */
      .game-card {
        position: relative;
        isolation: isolate;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(15, 23, 42, 0.08);
        backdrop-filter: blur(2px);
        -webkit-backdrop-filter: blur(2px);
        box-shadow:
          0 8px 24px rgba(2, 6, 23, 0.07),
          0 1px 0 rgba(255, 255, 255, 0.45) inset;
        transition:
          transform 220ms cubic-bezier(0.4, 0, 0.2, 1),
          box-shadow 220ms cubic-bezier(0.4, 0, 0.2, 1),
          border-color 220ms cubic-bezier(0.4, 0, 0.2, 1);
      }
      .dark .game-card {
        background: rgba(2, 6, 23, 0.18);
        border: 1px solid rgba(148, 163, 184, 0.1);
        box-shadow:
          0 12px 40px rgba(0, 0, 0, 0.38),
          0 1px 0 rgba(255, 255, 255, 0.03) inset;
      }

      /* Four corner shadow dots */
      .game-card::after {
        content: '';
        pointer-events: none;
        position: absolute;
        z-index: 2;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        border-radius: inherit;
        box-shadow:
          0 0 6px 2px rgba(99, 102, 241, 0.13),
          100% 0 6px 2px rgba(34, 211, 238, 0.13),
          0 100% 6px 2px rgba(168, 85, 247, 0.13),
          100% 100% 6px 2px rgba(99, 102, 241, 0.13);
        /* Use pseudo-corners for visual effect */
        mask-image:
          radial-gradient(circle 6px at 0 0, #000 98%, transparent 100%),
          radial-gradient(circle 6px at 100% 0, #000 98%, transparent 100%),
          radial-gradient(circle 6px at 0 100%, #000 98%, transparent 100%),
          radial-gradient(circle 6px at 100% 100%, #000 98%, transparent 100%);
        mask-size: 50% 50%;
        mask-repeat: no-repeat;
        mask-position:
          0 0,
          100% 0,
          0 100%,
          100% 100%;
        opacity: 0.7;
      }

      /* center halo bloom */
      .game-card::before {
        content: '';
        position: absolute;
        inset: -30%;
        background:
          radial-gradient(
            circle at 50% 48%,
            rgba(99, 102, 241, 0.22),
            rgba(99, 102, 241, 0) 52%
          ),
          radial-gradient(
            circle at 50% 48%,
            rgba(34, 211, 238, 0.14),
            rgba(34, 211, 238, 0) 60%
          );
        filter: blur(26px);
        opacity: 0.1;
        transform: scale(0.92);
        transition:
          opacity 260ms ease,
          transform 260ms ease;
        pointer-events: none;
        z-index: 0;
      }

      /* border glow (static; no rotation) */
      .game-card::after {
        content: '';
        position: absolute;
        inset: 0;
        padding: 1px;
        border-radius: inherit;
        background: conic-gradient(
          from 180deg at 50% 50%,
          rgba(99, 102, 241, 0) 0deg,
          rgba(99, 102, 241, 0.75) 70deg,
          rgba(34, 211, 238, 0.65) 140deg,
          rgba(168, 85, 247, 0.65) 220deg,
          rgba(99, 102, 241, 0) 360deg
        );
        -webkit-mask:
          linear-gradient(#000 0 0) content-box,
          linear-gradient(#000 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        opacity: 0.1;
        transition:
          opacity 260ms ease,
          filter 260ms ease;
        pointer-events: none;
        z-index: 0;
      }

      .game-card:hover,
      .game-card:focus-within {
        // transform: translateY(-2px);
        border-color: #d68c3dd6; /* Warm beige-gray for light mode hover */
        box-shadow: 0 0 0 1px rgba(212, 165, 116, 0.16) inset;
      }
      .dark .game-card:hover,
      .dark .game-card:focus-within {
        border-color: rgba(34, 211, 238, 0.78);
        box-shadow: 0 0 0 1px rgba(34, 211, 238, 0.18) inset;
      }
      .game-card:hover::before,
      .game-card:focus-within::before {
        opacity: 0; /* Remove halo on hover for cleaner look */
        transform: scale(0.92);
      }
      .game-card:hover::after,
      .game-card:focus-within::after {
        opacity: 0.58;
        filter: blur(0.6px);
      }

      @media (prefers-reduced-motion: reduce) {
        .game-card,
        .game-card::before,
        .game-card::after {
          transition: none;
          animation: none !important;
        }
      }

      .game-card-content {
        position: relative;
        z-index: 1;
      }
    `}</style>
  )
}

export { Style }
