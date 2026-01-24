import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import BeiAnSite from '@/components/BeiAnSite'
import PoweredBy from '@/components/PoweredBy'
import { siteConfig } from '@/lib/config'

const Footer = ({ title }) => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig('SINCE')
  const copyrightDate =
    parseInt(since) < currentYear ? since + '-' + currentYear : currentYear

  return (
    <footer className='relative z-10 flex-shrink-0 justify-center text-center m-auto w-full leading-8 text-slate-600 dark:text-slate-400 text-sm p-8 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm'>
      {/* 版权和作者信息 */}
      <div className='max-w-5xl mx-auto'>
        <div className='flex items-center justify-center gap-2 mb-3'>
          <i className='fas fa-copyright text-indigo-500' />
          <span>{`${copyrightDate}`}</span>
          <span className='text-slate-300 dark:text-slate-700'>·</span>
          <a
            href={siteConfig('LINK')}
            className='font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors'>
            {siteConfig('AUTHOR')}
          </a>
        </div>

        {/* 备案信息 */}
        <div className='text-xs text-gray-500 dark:text-gray-400 mb-3'>
          <BeiAnSite />
          <BeiAnGongAn />
        </div>

        {/* 统计信息 */}
        <div className='flex justify-center items-center gap-4 mb-4 text-xs'>
          <span className='hidden busuanzi_container_site_pv'>
            <i className='fas fa-eye text-indigo-500' />
            <span className='px-1 busuanzi_value_site_pv ml-1'> </span>
          </span>
          <span className='hidden busuanzi_container_site_uv'>
            <i className='fas fa-users text-indigo-500' />
            <span className='px-1 busuanzi_value_site_uv ml-1'> </span>
          </span>
        </div>

        {/* 网站描述 */}
        <div className='text-xs text-gray-500 dark:text-gray-400 leading-relaxed'>
          {title}
          {siteConfig('BIO') && (
            <>
              <span className='mx-2'>|</span>
              {siteConfig('BIO')}
            </>
          )}
        </div>
      </div>
    </footer>
  )
}

export default Footer
