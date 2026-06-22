import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'

/**
 * 跳转到网页顶部
 */
const ButtonJumpToTop = ({ showPercent = true, percent }) => {
  const { locale } = useGlobal()

  if (!siteConfig('HEXO_WIDGET_TO_TOP', null, CONFIG)) {
    return <></>
  }
  return (
    <button
      type='button'
      className='cyber-float-btn cyber-mono'
      title={locale.POST.TOP}
      aria-label={locale.POST.TOP}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <div className='flex flex-col items-center justify-center leading-none'>
        <i className='fas fa-arrow-up text-sm' />
        {showPercent && (
          <div className='text-[9px] font-bold mt-1'>{percent}%</div>
        )}
      </div>
    </button>
  )
}

export default ButtonJumpToTop
