import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'

/**
 * 随机跳转到一个文章
 */
export default function ButtonRandomPost(props) {
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
      className='cursor-pointer border-2 border-[var(--pixel-accent)] w-10 h-10 flex justify-center items-center transition-all duration-100 font-mono text-[var(--pixel-accent)] hover:bg-[var(--pixel-accent)] hover:text-[var(--pixel-bg)] hover:translate-x-[-1px] hover:translate-y-[-1px]'
      style={{
        boxShadow: '2px 2px 0px var(--pixel-accent)'
      }}
      onClick={handleClick}>
      <i className='fa-solid fa-dice text-lg' />
    </div>
  )
}
