import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'

/**
 * 随机跳转到一个文章
 */
export default function ButtonRandomPostMini(props) {
  const { latestPosts } = props
  const router = useRouter()
  const { locale } = useGlobal()
  /**
   * 随机跳转文章
   */
  function handleClick() {
    const randomIndex = Math.floor(Math.random() * latestPosts.length)
    const randomPost = latestPosts[randomIndex]
    router.push(`${siteConfig('SUB_PATH', '')}/${randomPost?.slug}`)
  }

  return (
    <div
      title={locale.MENU.WALK_AROUND}
      className='floating-button flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg cursor-pointer hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-110 duration-200 text-white'
      onClick={handleClick}>
      <i className='fa-solid fa-dice text-sm'></i>
    </div>
  )
}
