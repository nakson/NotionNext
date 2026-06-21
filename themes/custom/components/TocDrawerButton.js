import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import { siteConfig } from '@/lib/config'

/**
 * 点击召唤目录抽屉
 * @param props 父组件传入props
 * @returns {JSX.Element}
 */
const TocDrawerButton = props => {
  const { locale } = useGlobal()
  if (!siteConfig('HEXO_WIDGET_TOC', null, CONFIG)) {
    return <></>
  }
  return (
    <div
      onClick={props.onClick}
      className='cyber-float-btn cyber-mono'
      title={locale.COMMON.TABLE_OF_CONTENTS}>
      <i className='fas fa-list-ol text-sm' />
    </div>
  )
}

export default TocDrawerButton
