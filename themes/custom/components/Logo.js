import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'

/**
 * 窄屏顶栏品牌：与桌面侧栏一致，用站点图标 + 标题
 * 旧像素描边框在矮顶栏里会被裁切，只剩错位阴影方块
 */
const Logo = props => {
  const { siteInfo } = props
  const title = siteInfo?.title || siteConfig('TITLE')
  const icon = siteInfo?.icon

  return (
    <Link
      href='/'
      className='flex items-center gap-2 min-w-0 max-w-[70vw] no-underline text-[color:var(--cyber-text)] hover:opacity-85 transition-opacity'
      aria-label={title}>
      {icon && (
        <LazyImage
          src={icon}
          className='rounded-sm h-8 w-8 object-cover shrink-0'
          width={32}
          height={32}
          alt=''
        />
      )}
      <span className='font-semibold text-sm truncate tracking-tight'>
        {title}
      </span>
    </Link>
  )
}

export default Logo
