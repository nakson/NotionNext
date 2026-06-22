import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import TagItemMini from './TagItemMini'

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

  const headerImage = post?.pageCover ? post.pageCover : siteInfo?.pageCover

  return (
    <div id='header' className='w-full relative z-10 md:pt-12 pt-12 pb-8'>
      <header className='w-full max-w-5xl mx-auto px-4'>
        <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-xs cyber-mono text-[color:var(--cyber-text-muted)] mb-6 uppercase tracking-wider border-b border-[color:var(--cyber-panel-border)] pb-3'>
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

        <h1 className='cyber-post-title text-4xl md:text-5xl font-extrabold tracking-tight text-[color:var(--heading-1)] mb-8 leading-tight'>
          {siteConfig('POST_TITLE_ICON') && (
            <NotionIcon icon={post.pageIcon} className='mr-3 inline-block' />
          )}
          {post.title}
        </h1>

        <div className='mb-8'>
          {post.tagItems && (
            <div className='flex flex-wrap gap-2'>
              {post.tagItems.map(tag => (
                <TagItemMini key={tag.name} tag={tag} />
              ))}
            </div>
          )}
        </div>

        {headerImage && (
          <div className='cyber-post-cover w-full h-64 md:h-96 relative overflow-hidden shadow-lg mb-8'>
            <LazyImage
              priority={true}
              src={headerImage}
              className='w-full h-full object-cover'
            />
          </div>
        )}
      </header>
    </div>
  )
}
