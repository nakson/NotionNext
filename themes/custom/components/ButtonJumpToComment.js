import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * 跳转到评论区
 * @returns {JSX.Element}
 */
const ButtonJumpToComment = () => {
  if (!siteConfig('HEXO_WIDGET_TO_COMMENT', null, CONFIG)) {
    return <></>
  }

  function navToComment () {
    if (document.getElementById('comment')) {
      window.scrollTo({
        top: document.getElementById('comment').offsetTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div
      className='cyber-float-btn cyber-mono'
      title='comment'
      onClick={navToComment}>
      <i className='fas fa-comment text-sm' />
    </div>
  )
}

export default ButtonJumpToComment
