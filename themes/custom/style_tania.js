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
        background: #f7f6f3; /* Notion Warm - Premium, Focus, Eye-friendly */
        color: #37352f; /* Classic Dark - Optimal Contrast */
        line-height: 1.75;
        transition:
          background 0.3s,
          color 0.3s;
      }
      .dark body {
        background: #1c1c1e; /* Dark Gray (Apple dark mode style) */
        color: #d4d4d8;
        transition:
          background 0.3s,
          color 0.3s;
      }
      /* Global Link Styles */
      a {
        color: #0ea5a4;
        text-decoration: none;
        transition: color 0.2s;
      }
      a:hover {
        color: #059669;
      }
      a.active,
      a[aria-current='page'],
      .active > a {
        color: #065f57;
        font-weight: bold;
      }
      .dark a {
        color: #7b87e2; /* Soft indigo for links in dark mode */
      }
      .dark a:hover {
        color: #a7a6ff;
      }
      .dark a.active,
      .dark a[aria-current='page'],
      .dark .active > a {
        color: #8b8cf6;
        font-weight: bold;
      }

      /* Selection color */
      ::selection {
        background: rgba(99, 102, 241, 0.12);
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
        color: #6b7280; /* Muted gray for metadata / secondary text */
      }

      /* Static Subtle Gradient Background (eye-friendly, minimal) */
      .aurora-bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: -10;
        /* Warm subtle light wash - Immersive & clean */
        background: linear-gradient(180deg, #ffffff 0%, #f2f0ea 100%);
        opacity: 0.5;
        pointer-events: none;
      }
      .dark .aurora-bg {
        /* Dark mode: low-contrast cool wash */
        background: linear-gradient(120deg, #272835 0%, #1d1f37 100%);
        opacity: 0.12;
      }

      /* Enforce transparent backgrounds on cards to remove "white box" look */
      .bg-white {
        background-color: transparent !important;
      }
      .dark .dark\:bg-hexo-black-gray {
        background-color: transparent !important;
      }
      .shadow {
        box-shadow: none !important;
      }
      .border {
        border-color: #333 !important;
      }
    `}</style>
  )
}

export { Style }
