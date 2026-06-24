import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import BlogPostListEmpty from '../../components/BlogPostListEmpty'
import PaginationNumber from '../../components/PaginationNumber'
import MusicNotesFilterBar from '../components/MusicNotesFilterBar'
import MusicNotesHero from '../components/MusicNotesHero'
import MusicNotesPlaylistItem from '../components/MusicNotesPlaylistItem'

/** 从音乐分类路由 URL 解析当前 tag */
function parseTagFromMusicUrl (url, category) {
  if (!category) return null
  const prefix = `/category/${encodeURIComponent(category)}`
  const rawPrefix = `/category/${category}`
  if (!url.startsWith(prefix) && !url.startsWith(rawPrefix)) return null
  const tagMatch = url.match(/\/tag\/([^/?#]+)/)
  return tagMatch ? decodeURIComponent(tagMatch[1]) : '全部'
}

function decodeQueryValue (value) {
  if (!value) return undefined
  const raw = Array.isArray(value) ? value[0] : value
  return decodeURIComponent(String(raw))
}

/**
 * 音乐手记 — 歌单风画廊（Tag 路由筛选 + 分页）
 */
export default function MusicNotesCategoryView (props) {
  const {
    page = 1,
    posts = [],
    postCount,
    category,
    keyword,
    tagFilter,
    siteInfo
  } = props
  const { NOTION_CONFIG } = useGlobal()
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)
  const [pendingTag, setPendingTag] = useState(null)
  const routeCategory = category || decodeQueryValue(router.query?.category)
  const routeTag = tagFilter || decodeQueryValue(router.query?.tag)

  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  const totalPage = Math.ceil(postCount / POSTS_PER_PAGE)
  const showPagination = postCount >= POSTS_PER_PAGE
  const fallbackCover = siteInfo?.pageCover
  const isLoading = isNavigating || router.isFallback
  const activeTag = pendingTag ?? routeTag ?? '全部'
  const isEmpty = !isLoading && (!posts?.length || page > totalPage)

  useEffect(() => {
    if (!routeCategory) return

    const categoryPrefix = `/category/${encodeURIComponent(routeCategory)}`
    const rawCategoryPrefix = `/category/${routeCategory}`

    const handleStart = (url) => {
      if (!url.startsWith(categoryPrefix) && !url.startsWith(rawCategoryPrefix)) return
      setIsNavigating(true)
      setPendingTag(parseTagFromMusicUrl(url, routeCategory))
    }
    const handleEnd = () => {
      setIsNavigating(false)
      setPendingTag(null)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleEnd)
    router.events.on('routeChangeError', handleEnd)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleEnd)
      router.events.off('routeChangeError', handleEnd)
    }
  }, [routeCategory, router.events])

  return (
    <div className='music-notes'>
      <MusicNotesHero keyword={keyword} />
      <MusicNotesFilterBar
        category={routeCategory}
        activeTag={activeTag}
        keyword={keyword}
      />

      {isEmpty ? (
        tagFilter && !keyword ? (
          <p className='music-notes__empty-hint'>
            暂无「{tagFilter}」相关手记
          </p>
        ) : (
          <BlogPostListEmpty currentSearch={keyword} />
        )
      ) : (
        <div className='music-notes__grid-wrap'>
          <section
            className={`music-notes__grid${isLoading ? ' music-notes__grid--dimmed' : ''}`}
            aria-label='音乐手记列表'
            aria-busy={isLoading}>
            {posts.map((post, index) => (
              <MusicNotesPlaylistItem
                key={post.id}
                post={post}
                coverUrl={fallbackCover}
                priority={index < 4}
              />
            ))}
          </section>

          {isLoading && (
            <div className='music-notes__loading' aria-live='polite' aria-label='加载中'>
              <i className='fas fa-spinner animate-spin music-notes__loading-icon' />
            </div>
          )}
        </div>
      )}

      {showPagination && !isLoading && (
        <div className='music-notes__pagination'>
          <PaginationNumber page={page} totalPage={totalPage} />
        </div>
      )}
    </div>
  )
}
