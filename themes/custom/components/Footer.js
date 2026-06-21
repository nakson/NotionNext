import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import BeiAnSite from '@/components/BeiAnSite'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

const Footer = ({ title }) => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig('SINCE')
  const copyrightDate =
    parseInt(since) < currentYear ? since + '-' + currentYear : currentYear
  const pixelEdge = siteConfig('HEXO_THEME_PIXEL_HEADER_FOOTER', true, CONFIG)

  return (
    <footer className='relative z-10 flex-shrink-0 justify-center text-center m-auto w-full leading-7 text-[var(--pixel-text-muted)] text-xs p-8 border-t-4 border-[var(--pixel-accent)] bg-[var(--pixel-bg)] font-mono'>
      {pixelEdge && <div className='cyber-footer-pixel-edge' aria-hidden />}
      <div className='max-w-5xl mx-auto'>
        <div className='flex items-center justify-center gap-2 mb-3 text-[var(--pixel-text)]'>
          <span className='text-[var(--pixel-accent)] select-none animate-pulse'>
            &gt;&gt;
          </span>
          <span className='font-bold'>{`${copyrightDate}`}</span>
          <span className='text-[var(--pixel-secondary)]'>|</span>
          <a
            href={siteConfig('LINK')}
            className='font-semibold text-[var(--pixel-accent)] hover:text-[var(--pixel-secondary)] transition-colors duration-100 hover:drop-shadow-lg'>
            {siteConfig('AUTHOR')}
          </a>
        </div>

        <div className='text-[11px] mb-3 opacity-90'>
          <BeiAnSite />
          <BeiAnGongAn />
        </div>

        <div className='flex justify-center items-center gap-4 mb-4 text-[11px]'>
          <span className='hidden busuanzi_container_site_pv'>
            <span className='text-[var(--pixel-accent)]'>&lt;pv&gt;</span>
            <span className='px-1 busuanzi_value_site_pv ml-1 font-mono'>
              {' '}
            </span>
          </span>
          <span className='hidden busuanzi_container_site_uv'>
            <span className='text-[var(--pixel-secondary)]'>&lt;uv&gt;</span>
            <span className='px-1 busuanzi_value_site_uv ml-1 font-mono'>
              {' '}
            </span>
          </span>
        </div>

        <div className='text-[11px] opacity-85 leading-relaxed border-t-2 border-dashed border-[var(--pixel-secondary)] pt-3'>
          {title}
          {siteConfig('BIO') && (
            <>
              <span className='mx-2 text-[var(--pixel-secondary)]'>|</span>
              {siteConfig('BIO')}
            </>
          )}
          <div className='mt-2 text-[var(--pixel-accent)]'>
            🎮 Built with Pixel Art Style 🎮
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
