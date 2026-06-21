import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { formatDateFmt } from '@/lib/utils/formatDate'
import Link from 'next/link'
import TagItemMini from './TagItemMini'

/**
 * 文章详情页的Hero块
 */
export default function PostHero({ post, siteInfo }) {
  const { locale, fullWidth } = useGlobal()

  if (!post) {
    return <></>
  }

  // 文章全屏隐藏标头
  if (fullWidth) {
    return <div className='my-8' />
  }

  const headerImage = post?.pageCover ? post.pageCover : siteInfo?.pageCover

  return (
    <div id='header' className='w-full relative z-10 md:pt-12 pt-12 pb-8'>
      <header className='w-full max-w-5xl mx-auto px-4'>
        {/* 文章分类与日期 */}
        <div className='flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-6'>
          {post.category && (
            <Link
              href={`/category/${post.category}`}
              className='font-medium text-indigo-600 dark:text-indigo-400 hover:underline'>
              {post.category}
            </Link>
          )}

          {post?.type !== 'Page' && (
            <span className='flex items-center'>
              <time>{post?.publishDay}</time>
            </span>
          )}

          {JSON.parse(siteConfig('ANALYTICS_BUSUANZI_ENABLE')) && (
            <div className='busuanzi_container_page_pv font-light'>
              <span className='mr-1 busuanzi_value_page_pv' />
              {locale.COMMON.VIEWS}
            </div>
          )}
        </div>

        {/* 文章Title */}
        <h1 className='text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 mb-8 leading-tight'>
          {siteConfig('POST_TITLE_ICON') && (
            <NotionIcon icon={post.pageIcon} className='mr-3 inline-block' />
          )}
          {post.title}
        </h1>

        {/* 标签 */}
        <div className='mb-8'>
          {post.tagItems && (
            <div className='flex flex-wrap gap-2'>
              {post.tagItems.map(tag => (
                <TagItemMini key={tag.name} tag={tag} />
              ))}
            </div>
          )}
        </div>

        {/* 封面图 - 如果有，则以圆角矩形展示，不再作为背景 */}
        {headerImage && (
          <div className='w-full h-64 md:h-96 relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 mb-8'>
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
