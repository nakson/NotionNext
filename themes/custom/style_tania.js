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
