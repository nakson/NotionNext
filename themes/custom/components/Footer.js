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
  const showEdge = siteConfig('HEXO_THEME_PIXEL_HEADER_FOOTER', false, CONFIG)

  return (
    <footer className='relative z-10 flex-shrink-0 justify-center text-center m-auto w-full leading-7 text-[color:var(--cyber-text-muted)] text-xs p-8 border-t border-[color:var(--cyber-panel-border)] bg-transparent'>
      {showEdge && <div className='cyber-footer-pixel-edge' aria-hidden />}
      <div className='max-w-5xl mx-auto'>
        <div className='flex items-center justify-center gap-2 mb-3 text-[color:var(--cyber-text)]'>
          <span className='font-bold'>{`${copyrightDate}`}</span>
          <span className='text-[color:var(--cyber-text-muted)]'>|</span>
          <a
            href={siteConfig('LINK')}
            className='font-semibold text-[color:var(--cyber-link)] hover:text-[color:var(--cyber-link-hover)] transition-colors duration-200'>
            {siteConfig('AUTHOR')}
          </a>
        </div>

        <div className='text-[11px] mb-3 opacity-90'>
          <BeiAnSite />
          <BeiAnGongAn />
        </div>

        <div className='flex justify-center items-center gap-4 mb-4 text-[11px] cyber-mono'>
          <span className='hidden busuanzi_container_site_pv'>
            <span className='text-[color:var(--cyber-link)]'>pv</span>
            <span className='px-1 busuanzi_value_site_pv ml-1'> </span>
          </span>
          <span className='hidden busuanzi_container_site_uv'>
            <span className='text-[color:var(--cyber-text-muted)]'>uv</span>
            <span className='px-1 busuanzi_value_site_uv ml-1'> </span>
          </span>
        </div>

        <div className='text-[11px] opacity-85 leading-relaxed border-t border-[color:var(--cyber-panel-border)] pt-3'>
          {title}
          {siteConfig('BIO') && (
            <>
              <span className='mx-2 text-[color:var(--cyber-text-muted)]'>|</span>
              {siteConfig('BIO')}
            </>
          )}
        </div>
      </div>
    </footer>
  )
}

export default Footer
