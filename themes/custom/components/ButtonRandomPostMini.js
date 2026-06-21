import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'

/**
 * 随机跳转到一个文章
 */
export default function ButtonRandomPostMini (props) {
  const { latestPosts } = props
  const router = useRouter()
  const { locale } = useGlobal()

  function handleClick () {
    const randomIndex = Math.floor(Math.random() * latestPosts.length)
    const randomPost = latestPosts[randomIndex]
    router.push(`${siteConfig('SUB_PATH', '')}/${randomPost?.slug}`)
  }

  return (
    <div
      title={locale.MENU.WALK_AROUND}
      className='cyber-float-btn cyber-mono'
      onClick={handleClick}>
      <i className='fa-solid fa-dice text-sm' />
    </div>
  )
}
