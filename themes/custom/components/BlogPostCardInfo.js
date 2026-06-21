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
          <h2 className='pixel-title'>
            {/* 标题 - 像素风设计 */}
            <Link
              href={post?.href}
              passHref
              className={`line-clamp-2 replace cursor-pointer text-xl font-semibold text-[var(--pixel-accent)] transition-all duration-100 hover:text-[var(--pixel-secondary)] hover:drop-shadow-lg ${
                showPreview ? 'text-center' : ''
              }`}
              style={{
                textShadow: '2px 2px 0px rgba(0,255,255,0.3)'
              }}>
              {siteConfig('POST_TITLE_ICON') && (
                <NotionIcon icon={post.pageIcon} />
              )}
              <span>{post.title}</span>
            </Link>
          </h2>

          {/* 分类 - 像素风标签 */}
          {post?.category && (
            <div
              className={`flex mt-2 items-center font-mono gap-2 ${
                showPreview ? 'justify-center' : 'justify-start'
              } flex-wrap text-[var(--pixel-text-muted)]`}>
              <Link
                href={`/category/${post.category}`}
                passHref
                className='cursor-pointer font-medium text-xs px-2 py-1 border-2 border-[var(--pixel-accent)] bg-[var(--pixel-bg-light)] text-[var(--pixel-accent)] transition-all duration-100 hover:bg-[var(--pixel-accent)] hover:text-[var(--pixel-bg)] hover:translate-x-[-1px] hover:translate-y-[-1px]'>
                <span className='mr-1'>#</span>
                {post.category}
              </Link>

              <TwikooCommentCount
                className='text-xs text-[var(--pixel-text-muted)] hover:text-[var(--pixel-accent)] transition-colors'
                post={post}
              />
            </div>
          )}
        </header>

        {/* 摘要 */}
        {(!showPreview || showSummary) && !post.results && (
          <main className='line-clamp-2 replace my-3 text-[var(--pixel-text-muted)] text-sm leading-relaxed'>
            {post.summary}
          </main>
        )}

        {/* 搜索结果 */}
        {post.results && (
          <p className='line-clamp-2 mt-4 text-[var(--pixel-text-muted)] text-sm font-light leading-7'>
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
        {/* 日期标签 - 像素风 */}
        <div className='text-[var(--pixel-text-muted)] justify-between flex font-mono text-xs'>
          <Link
            href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}
            passHref
            className='font-light cursor-pointer leading-4 mr-3 border-b-2 border-[var(--pixel-accent)] pb-1 hover:text-[var(--pixel-accent)] transition-all duration-100'>
            <span className='mr-1 opacity-70'>@</span>
            {post?.publishDay || post.lastEditedDay}
          </Link>

          <div className='md:flex-nowrap flex-wrap md:justify-start inline-block gap-1 flex'>
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
