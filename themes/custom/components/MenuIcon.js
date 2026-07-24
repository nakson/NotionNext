import LazyImage from '@/components/LazyImage'
import { useGlobal } from '@/lib/global'
import BLOG from '@/blog.config'

/**
 * 是否为 FontAwesome class（属性列 icon 的保底用法）
 */
const isFontAwesomeIcon = icon => {
  if (!icon || typeof icon !== 'string') return false
  const normalized = icon.trim()
  return (
    /(^|\s)fa[srldb]?\s/.test(normalized) || /(^|\s)fa-[\w-]+/.test(normalized)
  )
}

/**
 * 解析 Notion 页面图标地址
 * Icons 面板选的是 /icons/xxx.svg，需拼 mode=light|dark，否则暗色背景下几乎看不见
 */
const resolveNotionIconSrc = (raw, isDarkMode) => {
  if (!raw || typeof raw !== 'string') return null
  const value = raw.trim()
  if (!value) return null

  const mode = isDarkMode ? 'dark' : 'light'
  const host = BLOG.NOTION_HOST || 'https://www.notion.so'

  // 相对路径：/icons/music_gray.svg
  if (value.startsWith('/icons/')) {
    const path = value.split('?')[0]
    return `${host}${path}?mode=${mode}`
  }

  // mapImgUrl 之后：https://www.notion.so/icons/xxx.svg?t=blockId
  if (value.includes('/icons/') && (value.startsWith('http') || value.startsWith('//'))) {
    try {
      const url = new URL(value.startsWith('//') ? `https:${value}` : value)
      if (url.pathname.startsWith('/icons/')) {
        url.search = ''
        url.searchParams.set('mode', mode)
        return url.toString()
      }
    } catch {
      // 解析失败则原样返回，交给后续分支
    }
  }

  return value
}

/**
 * 菜单图标：优先 Notion 页面图标（emoji / Icons / upload），属性 icon 仅作保底
 */
const MenuIcon = ({ icon, pageIcon, className = 'mr-1.5' }) => {
  const { isDarkMode } = useGlobal()
  // WHY: 页面封面图标优先于数据库 Icon 属性
  const primary = (pageIcon || '').trim()
  const fallback = (icon || '').trim()

  if (primary) {
    const src = resolveNotionIconSrc(primary, isDarkMode)

    // upload / Icons → 图片；emoji → 文本
    if (
      src &&
      (src.startsWith('http') ||
        src.startsWith('data:') ||
        src.startsWith('/icons/'))
    ) {
      return (
        <LazyImage
          src={src}
          className={`w-4 h-4 inline-block align-middle ${className}`}
          alt=''
        />
      )
    }

    return (
      <span
        className={`inline-block align-middle ${className}`}
        aria-hidden='true'>
        {primary}
      </span>
    )
  }

  if (!fallback) return null

  // 属性列保底：FontAwesome
  if (isFontAwesomeIcon(fallback)) {
    return <i className={`${fallback} ${className}`} aria-hidden='true' />
  }

  // 属性列也可能误填 emoji / url
  const src = resolveNotionIconSrc(fallback, isDarkMode)
  if (
    src &&
    (src.startsWith('http') || src.startsWith('data:') || src.startsWith('/icons/'))
  ) {
    return (
      <LazyImage
        src={src}
        className={`w-4 h-4 inline-block align-middle ${className}`}
        alt=''
      />
    )
  }

  return (
    <span className={`inline-block align-middle ${className}`} aria-hidden='true'>
      {fallback}
    </span>
  )
}

export default MenuIcon
