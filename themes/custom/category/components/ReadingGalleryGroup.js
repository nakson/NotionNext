import ReadingGalleryItem from './ReadingGalleryItem'

/**
 * 阅读记录 — 按 tag 分组的海报网格
 */
export default function ReadingGalleryGroup ({ tagName, posts, siteInfo }) {
  const fallbackCover = siteInfo?.pageCover

  return (
    <section className='reading-gallery__group' aria-label={tagName}>
      <h2 className='reading-gallery__group-title'>{tagName}</h2>
      <div className='reading-gallery__grid'>
        {posts.map((post, index) => (
          <ReadingGalleryItem
            key={post.id}
            post={post}
            coverUrl={fallbackCover}
            priority={index < 4}
          />
        ))}
      </div>
    </section>
  )
}
