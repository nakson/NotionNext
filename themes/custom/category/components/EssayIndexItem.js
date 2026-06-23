import Link from 'next/link'
import EssayIndexTag from './EssayIndexTag'

/**
 * 随想录 — 单行条目（标题 + tags）
 */
export default function EssayIndexItem ({ post }) {
  const hasTags = post.tagItems?.length > 0

  return (
    <article className='essay-index__row'>
      <Link href={post?.href} className='essay-index__row-link no-underline-hover'>
        <div className='essay-index__row-inner'>
          <h2 className='essay-index__title cyber-title-link'>{post.title}</h2>
          {hasTags && (
            <div className='essay-index__tags'>
              {post.tagItems.map(tag => (
                <EssayIndexTag key={tag.name} tag={tag} />
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}
