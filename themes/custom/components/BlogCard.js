import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import CONFIG from '../config'
import TagItemMini from './TagItemMini'

/**
 * 文章列表卡片
 * @param {*} param0
 * @returns
 */
const BlogCard = ({ showAnimate, post, showSummary }) => {
  const { siteInfo } = useGlobal()
  const showPreview =
    siteConfig('FUKASAWA_POST_LIST_PREVIEW', null, CONFIG) && post.blockMap
  // fukasawa 强制显示图片
  if (
    siteConfig('FUKASAWA_POST_LIST_COVER_FORCE', null, CONFIG) &&
    post &&
    !post.pageCover
  ) {
    post.pageCoverThumbnail = siteInfo?.pageCover
  }
  const showPageCover =
    siteConfig('FUKASAWA_POST_LIST_COVER', null, CONFIG) &&
    post?.pageCoverThumbnail

  const FUKASAWA_POST_LIST_ANIMATION =
    siteConfig('FUKASAWA_POST_LIST_ANIMATION', null, CONFIG) || showAnimate

  // 动画样式  首屏卡片不用，后面翻出来的加动画
  const aosProps = FUKASAWA_POST_LIST_ANIMATION
    ? {
        'data-aos': 'fade-up',
        'data-aos-duration': '300',
        'data-aos-once': 'true',
        'data-aos-anchor-placement': 'top-bottom'
      }
    : {}

  return (
    <article {...aosProps} className='w-full mb-10 pb-10 transition-colors'>
      <div className='flex flex-col gap-2'>
        <header className='mb-2'>
          <Link
            passHref
            href={post?.href || ''}
            className='text-2xl font-bold transition-colors'>
            {post.title}
          </Link>

          {post?.date?.start_date && (
            <div className='text-sm text-gray-500 mt-1 font-mono'>
              {post.date.start_date}
            </div>
          )}
        </header>

        {showPageCover && (
          <Link href={post?.href || ''} passHref legacyBehavior>
            <div className='w-full h-48 md:h-64 overflow-hidden rounded-lg mb-4 cursor-pointer'>
              <LazyImage
                src={post?.pageCoverThumbnail}
                alt={post?.title || siteConfig('TITLE')}
                className='object-cover w-full h-full hover:scale-105 transition-transform duration-500'
              />
            </div>
          </Link>
        )}

        <main className='text-gray-400 leading-relaxed mb-4'>
          {post.summary}
        </main>

        <footer className='flex items-center justify-between text-sm'>
          <div className='flex flex-wrap gap-2'>
            {post.tagItems?.map(tag => (
              <TagItemMini key={tag.name} tag={tag} />
            ))}
          </div>
          <Link href={post?.href || ''} className=' hover:underline'>
            Read more →
          </Link>
        </footer>
      </div>
    </article>
  )
}

export default BlogCard
