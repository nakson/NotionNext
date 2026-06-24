import Link from 'next/link'
import CONFIG from '../../config'

/**
 * 音乐手记 — Tag 筛选按钮（路由导航，选中态高亮）
 */
export default function MusicNotesFilterBar ({ category, activeTag, keyword }) {
  // 搜索页隐藏筛选，避免与 keyword 语义冲突
  if (keyword) return null

  const tagFilters = CONFIG.MUSIC_NOTES_CONFIG?.tagFilters || [
    '全部',
    '原创音乐',
    'AI写歌',
    '私人歌单'
  ]
  const categoryPath = `/category/${encodeURIComponent(category)}`
  const selectedTag = activeTag || '全部'

  return (
    <nav className='music-notes__filters' aria-label='音乐分类筛选'>
      {tagFilters.map(tag => {
        const isActive = tag === selectedTag
        const href =
          tag === '全部'
            ? categoryPath
            : `/category/${encodeURIComponent(category)}/tag/${encodeURIComponent(tag)}`

        return (
          <Link
            key={tag}
            href={href}
            aria-current={isActive ? 'page' : undefined}
            className={`music-notes__filter no-underline-hover${
              isActive ? ' music-notes__filter--active' : ''
            }`}>
            {tag}
          </Link>
        )
      })}
    </nav>
  )
}
