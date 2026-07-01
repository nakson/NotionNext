import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import TagItemMini from './TagItemMini'

/** 仅阅读记录、音乐分类显示文章封面 */
const COVER_CATEGORIES = ['阅读记录', '音乐']

/**
 * 文章详情页的Hero块
 */
export default function PostHero ({ post, siteInfo }) {
  const { locale, fullWidth } = useGlobal()

  if (!post) {
    return <></>
  }

  if (fullWidth) {
    return <div className='my-8' />
  }

  const shouldShowCover = COVER_CATEGORIES.includes(post.category)
  const isReadingRecord = post.category === '阅读记录'
  const headerImage = post?.pageCover || (shouldShowCover ? siteInfo?.pageCover : null)

  return (
    <div id='header' className='w-full relative z-10 pt-2 md:pt-6 pb-4'>
      <header className='w-full max-w-5xl mx-auto px-4'>
        <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-xs cyber-mono text-[color:var(--cyber-text-muted)] mb-4 uppercase tracking-wider border-b border-[color:var(--cyber-panel-border)] pb-2'>
          {post.category && (
            <Link
              href={`/category/${post.category}`}
              className='font-medium text-[color:var(--link)] hover:text-[color:var(--link-hover)] transition-colors normal-case'>
              <span className='text-[color:var(--cyber-text-muted)] mr-1'>
                #
              </span>
              {post.category}
            </Link>
          )}

          {post?.type !== 'Page' && (
            <span className='flex items-center normal-case tracking-normal'>
              <time>{post?.publishDay}</time>
            </span>
          )}

          {JSON.parse(siteConfig('ANALYTICS_BUSUANZI_ENABLE')) && (
            <div className='busuanzi_container_page_pv font-light normal-case tracking-normal'>
              <span className='mr-1 busuanzi_value_page_pv' />
              {locale.COMMON.VIEWS}
            </div>
          )}
        </div>

        <h1 className='cyber-post-title font-bold text-[color:var(--heading-1)] mb-5 leading-snug'>
          {post.title}
        </h1>

        <div className='mb-5'>
          {post.tagItems && (
            <div className='flex flex-wrap gap-2'>
              {post.tagItems.map(tag => (
                <TagItemMini key={tag.name} tag={tag} />
              ))}
            </div>
          )}
        </div>

        {shouldShowCover && headerImage && isReadingRecord && (
          <div className='cyber-post-cover--natural mb-8 flex justify-center'>
            <LazyImage
              priority
              src={headerImage}
              alt={post.title}
              className='cyber-post-cover--natural-img'
            />
          </div>
        )}

        {shouldShowCover && headerImage && !isReadingRecord && (
          <div className='cyber-post-cover w-full h-64 md:h-96 relative overflow-hidden shadow-lg mb-8'>
            <LazyImage
              priority
              src={headerImage}
              className='w-full h-full object-cover'
            />
          </div>
        )}
      </header>
    </div>
  )
}
