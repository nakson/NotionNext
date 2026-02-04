import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import CONFIG from '../config'
import { BlogPostCardInfo } from './BlogPostCardInfo'

const BlogPostCard = ({ index, post, showSummary, siteInfo }) => {
  const showPreview =
    siteConfig('HEXO_POST_LIST_PREVIEW', null, CONFIG) && post.blockMap
  if (
    post &&
    !post.pageCoverThumbnail &&
    siteConfig('HEXO_POST_LIST_COVER_DEFAULT', null, CONFIG)
  ) {
    post.pageCoverThumbnail = siteInfo?.pageCover
  }
  const showPageCover =
    siteConfig('HEXO_POST_LIST_COVER', null, CONFIG) &&
    post?.pageCoverThumbnail &&
    !showPreview

  return (
    <div className='w-full mb-6'>
      <div
        key={post.id}
        id='blog-post-card'
        className={`game-card group md:h-56 w-full flex justify-between md:flex-row flex-col relative overflow-hidden rounded-2xl`}>
        {/* 图片封面 */}
        {showPageCover && (
          <div className='md:w-auto md:aspect-[1/1.4] md:h-full w-full h-56 overflow-hidden relative flex-shrink-0'>
            <Link href={post?.href}>
              <>
                <LazyImage
                  priority={index === 1}
                  alt={post?.title}
                  src={post?.pageCoverThumbnail}
                  className='h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105'
                />
              </>
            </Link>
          </div>
        )}

        {/* 文字内容 */}
        <BlogPostCardInfo
          index={index}
          post={post}
          showPageCover={showPageCover}
          showPreview={showPreview}
          showSummary={showSummary}
        />
      </div>
    </div>
  )
}

export default BlogPostCard
