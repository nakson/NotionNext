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
        background: #f7f5e8;
        color: #222;
        transition:
          background 0.3s,
          color 0.3s;
      }
      .dark body {
        background: #181818;
        color: #b3b3b3;
        transition:
          background 0.3s,
          color 0.3s;
      }

      /* Static Neon Gradient Glass Background */
      // .aurora-bg {
      //   position: fixed;
      //   top: 0;
      //   left: 0;
      //   width: 100vw;
      //   height: 100vh;
      //   z-index: -10;
      //   background: linear-gradient(
      //     120deg,
      //     #23a6d5 0%,
      //     #e73c7e 50%,
      //     #ee7752 100%
      //   );
      //   opacity: 0.4;
      //   pointer-events: none;
      // }
      // .dark .aurora-bg {
      //   background: linear-gradient(
      //     120deg,
      //     #1e1b4b 0%,
      //     #312e81 50%,
      //     #4c1d95 100%
      //   );
      //   opacity: 0.5;
      // }

      // /* Glassmorphism Utility */
      // .glass-morphism {
      //   background: rgba(255, 255, 255, 0.25);
      //   backdrop-filter: blur(12px);
      //   -webkit-backdrop-filter: blur(12px);
      //   border: 1px solid rgba(255, 255, 255, 0.3);
      //   box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      // }
      // .dark .glass-morphism {
      //   background: rgba(0, 0, 0, 0.3);
      //   border: 1px solid rgba(255, 255, 255, 0.05);
      // }

      // /* Sidebar Glassmorphism (assume aside is sidebar) */
      // aside {
      //   background: rgba(255, 255, 255, 0.25);
      //   backdrop-filter: blur(12px);
      //   -webkit-backdrop-filter: blur(12px);
      //   border-right: 1px solid rgba(255, 255, 255, 0.3);
      // }
      // .dark aside {
      //   background: rgba(0, 0, 0, 0.3);
      //   border-right: 1px solid rgba(255, 255, 255, 0.05);
      // }

      // /* Optional: rounded corners for main content */
      // #wrapper {
      //   border-radius: 12px;
      // }

      /* Global Link Styles */
      a {
        color: #1a1a1a;
        text-decoration: none;
        transition: color 0.2s;
      }
      a:hover {
        color: #eab308;
      }
      a.active,
      a[aria-current='page'],
      .active > a {
        color: #eab308 !important;
        font-weight: bold;
      }
      .dark a {
        color: #b3b3b3;
      }
      .dark a:hover {
        color: #ffe066;
      }
      .dark a.active,
      .dark a[aria-current='page'],
      .dark .active > a {
        color: #ffe066 !important;
        font-weight: bold;
      }

      /* Selection color */
      ::selection {
        background: rgba(255, 255, 0, 0.2);
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
        color: #b3b3b3 !important;
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
