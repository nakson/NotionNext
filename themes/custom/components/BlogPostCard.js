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
        className={`group md:h-56 w-full flex justify-between md:flex-row flex-col-reverse relative overflow-hidden rounded-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 transition-all duration-200 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 hover:shadow-lg hover:shadow-indigo-500/10 ${siteConfig('HEXO_POST_LIST_IMG_CROSSOVER', null, CONFIG) && index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
        {/* 文字内容 */}
        <BlogPostCardInfo
          index={index}
          post={post}
          showPageCover={showPageCover}
          showPreview={showPreview}
          showSummary={showSummary}
        />

        {/* 图片封面 */}
        {showPageCover && (
          <div className='md:w-5/12 overflow-hidden relative'>
            <Link href={post?.href}>
              <>
                <LazyImage
                  priority={index === 1}
                  alt={post?.title}
                  src={post?.pageCoverThumbnail}
                  className='h-56 w-full object-cover object-center transition-transform duration-500 group-hover:scale-105'
                />
              </>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogPostCard
