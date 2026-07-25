/* eslint-disable react/no-unknown-property */

/**
 * 婚礼请柬专属样式（与主题 style_tania 隔离）
 * 颜色变量可由页面 style 注入覆盖：--wed-ink / --wed-muted
 */
export default function WeddingStyles({ maxWidth = 480 }) {
  return (
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600&family=ZCOOL+XiaoWei&display=swap');

      .wedding-page {
        --wed-max: ${Number(maxWidth) || 480}px;
        --wed-bg: #f3efe6;
        --wed-paper: #faf7f1;
        --wed-ink: #3d342b;
        --wed-muted: color-mix(in srgb, var(--wed-ink) 58%, #a89888);
        --wed-line: color-mix(in srgb, var(--wed-ink) 12%, transparent);
        --wed-accent: #8b6b4a;
        --wed-ease: cubic-bezier(0.22, 1, 0.36, 1);
        --wed-font-title: 'ZCOOL XiaoWei', 'Noto Serif SC', 'Songti SC', serif;
        --wed-font-body: 'Noto Serif SC', 'Songti SC', 'PingFang SC', serif;

        position: fixed;
        inset: 0;
        z-index: 1;
        height: 100dvh;
        width: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
        background:
          radial-gradient(
            ellipse 80% 50% at 50% 0%,
            #ebe4d6 0%,
            transparent 60%
          ),
          var(--wed-bg);
        color: var(--wed-ink);
        font-family: var(--wed-font-body);
      }

      .wedding-shell {
        width: 100%;
        max-width: var(--wed-max);
        margin: 0 auto;
        min-height: 100%;
        position: relative;
      }

      @media (min-width: 640px) {
        .wedding-shell {
          box-shadow: 0 0 0 1px var(--wed-line);
          min-height: 100dvh;
        }
      }

      .wedding-cover-gate {
        position: fixed;
        inset: 0;
        z-index: 40;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        background: #2a241c;
        color: #f7f1e6;
        transition:
          opacity 0.85s var(--wed-ease),
          visibility 0.85s var(--wed-ease);
      }

      .wedding-cover-gate.is-open {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
      }

      .wedding-cover-gate__bg {
        position: absolute;
        inset: 0;
        background-size: cover;
        background-position: center;
        opacity: 0.55;
      }

      .wedding-cover-gate__veil {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to top,
          rgba(20, 16, 12, 0.92) 12%,
          rgba(20, 16, 12, 0.35) 55%,
          rgba(20, 16, 12, 0.5) 100%
        );
      }

      .wedding-cover-gate__inner {
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: var(--wed-max);
        padding: 2.5rem 1.5rem
          calc(2rem + env(safe-area-inset-bottom, 0px));
        text-align: center;
      }

      .wedding-cover-gate__names {
        font-family: var(--wed-font-title);
        font-size: clamp(1.75rem, 6.5vw, 2.1rem);
        font-weight: 400;
        letter-spacing: 0.14em;
        margin: 0 0 0.75rem;
        line-height: 1.35;
      }

      .wedding-cover-gate__hint {
        margin: 0 0 1.75rem;
        color: rgba(247, 241, 230, 0.78);
        font-family: var(--wed-font-body);
        font-size: 0.9rem;
        line-height: 1.75;
        letter-spacing: 0.04em;
      }

      .wedding-cover-gate__btn {
        appearance: none;
        border: 1px solid rgba(247, 241, 230, 0.45);
        background: rgba(247, 241, 230, 0.08);
        color: #f7f1e6;
        padding: 0.85rem 1.75rem;
        font-family: var(--wed-font-body);
        font-size: 0.9rem;
        letter-spacing: 0.16em;
        cursor: pointer;
        transition: background 0.25s ease, transform 0.25s ease;
      }

      .wedding-cover-gate__btn:hover {
        background: rgba(247, 241, 230, 0.16);
      }

      .wedding-cover-gate__btn:active {
        transform: scale(0.98);
      }

      .wedding-audio-toggle {
        position: fixed;
        top: calc(0.85rem + env(safe-area-inset-top, 0px));
        right: calc(0.85rem + env(safe-area-inset-right, 0px));
        z-index: 50;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 999px;
        border: 1px solid var(--wed-line);
        background: rgba(250, 247, 241, 0.88);
        color: var(--wed-ink);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        backdrop-filter: blur(8px);
      }

      .wedding-audio-toggle[aria-pressed='false'] {
        opacity: 0.72;
      }

      .wedding-section {
        padding: 2.25rem 1.2rem;
        position: relative;
      }

      .wedding-reveal {
        --reveal-delay: 0ms;
        opacity: 0;
        transform: translate3d(0, 48px, 0);
        transition:
          opacity 1.25s var(--wed-ease),
          transform 1.25s var(--wed-ease);
        transition-delay: var(--reveal-delay);
        will-change: opacity, transform;
      }

      .wedding-reveal--up {
        transform: translate3d(0, 48px, 0);
      }

      .wedding-reveal--down {
        transform: translate3d(0, -36px, 0);
      }

      .wedding-reveal--left {
        transform: translate3d(-36px, 24px, 0);
      }

      .wedding-reveal--right {
        transform: translate3d(36px, 24px, 0);
      }

      .wedding-reveal--none {
        transform: none;
      }

      .wedding-reveal--scale {
        transform: translate3d(0, 28px, 0) scale(1.06);
      }

      .wedding-reveal--scale.wedding-reveal--left {
        transform: translate3d(-28px, 20px, 0) scale(1.05);
      }

      .wedding-reveal--scale.wedding-reveal--right {
        transform: translate3d(28px, 20px, 0) scale(1.05);
      }

      .wedding-section.is-visible .wedding-reveal.is-shown,
      .wedding-section.no-motion .wedding-reveal {
        opacity: 1;
        transform: none;
      }

      .wedding-section__title {
        font-family: var(--wed-font-title);
        font-size: clamp(1.2rem, 4.2vw, 1.45rem);
        font-weight: 400;
        letter-spacing: 0.12em;
        color: var(--wed-ink);
        margin: 0 0 0.75rem;
        line-height: 1.45;
      }

      .wedding-section__text {
        margin: 0 0 0.7rem;
        color: var(--wed-muted);
        font-family: var(--wed-font-body);
        line-height: 1.95;
        font-size: 0.93rem;
        letter-spacing: 0.03em;
        font-weight: 400;
      }

      .wedding-section__media {
        overflow: hidden;
        border-radius: 2px;
      }

      .wedding-section__media img {
        display: block;
        width: 100%;
        height: auto;
        object-fit: cover;
      }

      .wedding-section--cover {
        min-height: 92dvh;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 0;
        overflow: hidden;
      }

      .wedding-section--cover .wedding-section__media {
        position: absolute;
        inset: 0;
        border-radius: 0;
      }

      .wedding-section--cover .wedding-section__media img {
        width: 100%;
        height: 100%;
      }

      .wedding-section--cover .wedding-section__body {
        position: relative;
        z-index: 1;
        padding: 3.25rem 1.5rem 2.75rem;
        background: linear-gradient(
          to top,
          rgba(243, 239, 230, 0.97) 28%,
          rgba(243, 239, 230, 0)
        );
      }

      .wedding-section--event-card,
      .wedding-layout--paper-quote {
        text-align: center;
        margin: 1rem 0.85rem;
        padding: 2.4rem 1.35rem;
        background: var(--wed-paper);
        border: 1px solid var(--wed-line);
        box-shadow: 0 12px 32px rgba(61, 52, 43, 0.05);
      }

      .wedding-section--event-card .wedding-meta {
        margin: 0.35rem 0;
        color: var(--wed-ink);
        font-family: var(--wed-font-body);
        font-size: 0.98rem;
        letter-spacing: 0.04em;
      }

      .wedding-section--event-card .wedding-meta--muted {
        color: var(--wed-muted);
        font-size: 0.88rem;
      }

      .wedding-map-link {
        display: inline-block;
        margin-top: 1.25rem;
        color: var(--wed-accent);
        text-decoration: underline;
        text-underline-offset: 3px;
        font-size: 0.9rem;
        letter-spacing: 0.06em;
      }

      .wedding-section--closing {
        min-height: 58dvh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 4.5rem 1.5rem 5.5rem;
      }

      .wedding-layout--split {
        padding-left: 0.85rem;
        padding-right: 0.85rem;
      }

      .wedding-layout--split .wedding-layout__grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.85rem 0.75rem;
        align-items: center;
      }

      .wedding-layout--split .wedding-layout__copy {
        padding: 0.35rem 0.15rem;
      }

      .wedding-layout--split .wedding-layout__media img {
        aspect-ratio: 3 / 4;
      }

      .wedding-layout--split .is-offset-media .wedding-layout__media {
        margin-top: 0.85rem;
      }

      .wedding-layout--split .is-offset-copy .wedding-layout__copy {
        margin-top: -0.35rem;
      }

      .wedding-layout--stack-image-top {
        padding-left: 0;
        padding-right: 0;
      }

      .wedding-layout--stack-image-top .wedding-layout__media {
        margin: 0 0 1.1rem;
      }

      .wedding-layout--stack-image-top .wedding-layout__media img {
        aspect-ratio: 4 / 5;
      }

      .wedding-layout--stack-image-top .wedding-layout__copy {
        padding: 0 1.25rem;
      }

      .wedding-layout--stack-caption-overlap {
        padding: 0;
        margin: 0.5rem 0 1.5rem;
      }

      .wedding-layout--stack-caption-overlap .wedding-layout__frame {
        position: relative;
      }

      .wedding-layout--stack-caption-overlap .wedding-layout__media img {
        aspect-ratio: 3 / 4;
      }

      .wedding-layout--stack-caption-overlap .wedding-layout__copy {
        position: relative;
        z-index: 1;
        margin: -2.5rem 1rem 0;
        padding: 1.25rem 1.15rem;
        background: var(--wed-paper);
        border: 1px solid var(--wed-line);
        box-shadow: 0 10px 28px rgba(61, 52, 43, 0.06);
        transform: rotate(-0.5deg);
      }

      .wedding-layout--duo-stagger {
        padding: 1.5rem 0.75rem 2rem;
      }

      .wedding-layout--duo-stagger .wedding-layout__duo {
        display: grid;
        grid-template-columns: 1.05fr 0.95fr;
        gap: 0.65rem;
        align-items: start;
      }

      .wedding-layout--duo-stagger .wedding-layout__duo-a {
        margin-top: 1.75rem;
      }

      .wedding-layout--duo-stagger .wedding-layout__duo-b {
        margin-right: 0.35rem;
      }

      .wedding-layout--duo-stagger .wedding-layout__duo-a img {
        aspect-ratio: 3 / 4;
      }

      .wedding-layout--duo-stagger .wedding-layout__duo-b img {
        aspect-ratio: 4 / 5;
      }

      .wedding-layout--duo-stagger .wedding-layout__copy {
        margin-top: 1.35rem;
        padding: 0 0.5rem;
        text-align: center;
      }

      .wedding-layout--full-bleed {
        padding-left: 0;
        padding-right: 0;
      }

      .wedding-layout--full-bleed .wedding-layout__media img {
        aspect-ratio: 4 / 5;
      }

      .wedding-layout--full-bleed .wedding-layout__copy {
        padding: 1.25rem 1.35rem 0.5rem;
      }

      .wedding-layout--paper-quote .wedding-section__title {
        margin-bottom: 1rem;
      }

      .wedding-layout--paper-quote .wedding-section__text {
        font-size: 0.95rem;
        line-height: 2;
      }

      .wedding-layout__gallery-rest {
        display: flex;
        flex-direction: column;
        gap: 0.85rem;
        margin-top: 1rem;
        padding: 0 0.85rem 0.5rem;
      }

      .wedding-layout__gallery-rest .wedding-section__media img {
        aspect-ratio: 4 / 5;
        object-fit: cover;
      }

      @media (prefers-reduced-motion: reduce) {
        .wedding-reveal,
        .wedding-cover-gate,
        .wedding-cover-gate__btn {
          transition: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `}</style>
  )
}
