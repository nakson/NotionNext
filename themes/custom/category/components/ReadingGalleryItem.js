import LazyImage from '@/components/LazyImage'
import Link from 'next/link'

/**
 * 阅读记录 — 单张海报卡片（2:3 封面 + 标题 + 摘要）
 */
export default function ReadingGalleryItem ({ post, coverUrl, priority = false }) {
  const cover = post?.pageCoverThumbnail || coverUrl

  return (
    <article className='reading-gallery__item'>
      <Link href={post?.href} className='reading-gallery__item-link no-underline-hover'>
        <div className='reading-gallery__poster'>
          {cover ? (
            <LazyImage
              priority={priority}
              alt={post?.title}
              src={cover}
              className='reading-gallery__poster-img'
            />
          ) : (
            <div className='reading-gallery__poster-fallback' aria-hidden />
          )}
        </div>
        <h3 className='reading-gallery__item-title cyber-title-link'>
          {post.title}
        </h3>
        {post.summary && (
          <p className='reading-gallery__summary'>{post.summary}</p>
        )}
      </Link>
    </article>
  )
}
