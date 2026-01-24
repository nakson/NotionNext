import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'

/**
 * 跳转到网页顶部
 * 当屏幕下滑500像素后会出现该控件
 * @param targetRef 关联高度的目标html标签
 * @param showPercent 是否显示百分比
 * @returns {JSX.Element}
 * @constructor
 */
const ButtonJumpToTop = ({ showPercent = true, percent }) => {
  const { locale } = useGlobal()

  if (!siteConfig('HEXO_WIDGET_TO_TOP', null, CONFIG)) {
    return <></>
  }
  return (
    <div
      className='floating-button flex flex-col items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg cursor-pointer hover:shadow-lg hover:shadow-indigo-500/50 transform hover:scale-110 duration-200 text-white'
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <div title={locale.POST.TOP}>
        <i className='fas fa-arrow-up text-sm' />
      </div>
      {showPercent && (
        <div className='text-[10px] font-semibold'>{percent}</div>
      )}
    </div>
  )
}

export default ButtonJumpToTop
