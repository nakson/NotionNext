import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'

/**
 * 跳转到网页顶部
 * @param targetRef 关联高度的目标html标签
 * @param showPercent 是否显示百分比
 * @returns {JSX.Element}
 */
const ButtonJumpToTop = ({ showPercent = true, percent }) => {
  const { locale } = useGlobal()

  if (!siteConfig('HEXO_WIDGET_TO_TOP', null, CONFIG)) {
    return <></>
  }
  return (
    <div
      className='floating-button fixed right-8 bottom-32 w-12 h-12 flex items-center justify-center font-mono text-[var(--pixel-accent)] hover:text-[var(--pixel-bg)] z-40'
      title={locale.POST.TOP}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <div className='flex flex-col items-center justify-center leading-none'>
        <i className='fas fa-arrow-up text-sm' />
        {showPercent && (
          <div className='text-[9px] font-bold mt-1'>{percent}%</div>
        )}
      </div>
    </div>
  )
}

export default ButtonJumpToTop
