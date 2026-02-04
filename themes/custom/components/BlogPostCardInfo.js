import NotionIcon from '@/components/NotionIcon'
import NotionPage from '@/components/NotionPage'
import TwikooCommentCount from '@/components/TwikooCommentCount'
import { siteConfig } from '@/lib/config'
import { formatDateFmt } from '@/lib/utils/formatDate'
import Link from 'next/link'
import TagItemMini from './TagItemMini'

/**
 * 博客列表的文字内容
 * @param {*} param0
 * @returns
 */
export const BlogPostCardInfo = ({
  post,
  showPreview,
  showPageCover,
  showSummary
}) => {
  return (
    <article
      className={`game-card-content flex flex-col justify-between lg:p-6 p-4 ${showPageCover && !showPreview ? 'flex-1 w-full md:max-h-60' : 'w-full'}`}>
      <div>
        <header>
          <h2>
            {/* 标题 */}
            <Link
              href={post?.href}
              passHref
              className={`line-clamp-2 replace cursor-pointer text-xl font-semibold text-slate-900 dark:text-slate-50 transition-colors duration-200 hover:text-cyan-600 dark:hover:text-cyan-300 ${
                showPreview ? 'text-center' : ''
              }`}>
              {siteConfig('POST_TITLE_ICON') && (
                <NotionIcon icon={post.pageIcon} />
              )}
              <span>{post.title}</span>
            </Link>
          </h2>

          {/* 分类 */}
          {post?.category && (
            <div
              className={`flex mt-2 items-center ${
                showPreview ? 'justify-center' : 'justify-start'
              } flex-wrap text-slate-600 dark:text-slate-300`}>
              <Link
                href={`/category/${post.category}`}
                passHref
                className='cursor-pointer font-medium text-xs hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors duration-200 mr-2'>
                <i className='mr-1 far fa-folder' />
                {post.category}
              </Link>

              <TwikooCommentCount
                className='text-xs hover:text-cyan-600 dark:hover:text-cyan-300'
                post={post}
              />
            </div>
          )}
        </header>

        {/* 摘要 */}
        {(!showPreview || showSummary) && !post.results && (
          <main className='line-clamp-2 replace my-3 text-slate-700/90 dark:text-slate-300/90 text-sm leading-relaxed'>
            {post.summary}
          </main>
        )}

        {/* 搜索结果 */}
        {post.results && (
          <p className='line-clamp-2 mt-4 text-gray-700 dark:text-gray-300 text-sm font-light leading-7'>
            {post.results.map((r, index) => (
              <span key={index}>{r}</span>
            ))}
          </p>
        )}

        {/* 预览 */}
        {showPreview && (
          <div className='overflow-ellipsis truncate'>
            <NotionPage post={post} />
          </div>
        )}
      </div>

      <div>
        {/* 日期标签 */}
        <div className='text-slate-500/90 dark:text-slate-400 justify-between flex'>
          {/* 日期 */}
          <Link
            href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}
            passHref
            className='font-light menu-link cursor-pointer text-sm leading-4 mr-3'>
            <i className='far fa-calendar-alt mr-1' />
            {post?.publishDay || post.lastEditedDay}
          </Link>

          <div className='md:flex-nowrap flex-wrap md:justify-start inline-block'>
            <div>
              {' '}
              {post.tagItems?.map(tag => (
                <TagItemMini key={tag.name} tag={tag} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
