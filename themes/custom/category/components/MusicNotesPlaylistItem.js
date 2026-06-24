import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import Link from 'next/link'

/**
 * 音乐手记 — 网易云歌单风卡片（正方形封面 + hover 滑入摘要）
 */
export default function MusicNotesPlaylistItem ({
  post,
  coverUrl,
  priority = false
}) {
  const cover = post?.pageCoverThumbnail || coverUrl
  const summary = post.summary || '暂无简介'

  return (
    <article className='music-notes__item'>
      <Link
        href={post?.href}
        className='music-notes__item-link no-underline-hover'>
        <div className='music-notes__cover-wrap'>
          {cover ? (
            <LazyImage
              priority={priority}
              alt={post?.title}
              src={cover}
              className='music-notes__cover-img'
            />
          ) : (
            <div className='music-notes__cover-fallback' aria-hidden />
          )}
          <div className='music-notes__overlay' aria-hidden>
            <p className='music-notes__overlay-text'>{summary}</p>
          </div>
        </div>
        <h3 className='music-notes__title cyber-title-link'>
          {post.pageIcon && (
            <span className='music-notes__title-icon'>
              <NotionIcon icon={post.pageIcon} />
            </span>
          )}
          <span className='music-notes__title-text'>{post.title}</span>
        </h3>
      </Link>
    </article>
  )
}
