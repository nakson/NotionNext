import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import BlogPostListEmpty from '../../components/BlogPostListEmpty'
import PaginationNumber from '../../components/PaginationNumber'
import EssayIndexHero from '../components/EssayIndexHero'
import EssayIndexItem from '../components/EssayIndexItem'

/**
 * 随想录 — 简约行列表视图
 */
export default function EssayIndexCategoryView (props) {
  const { page = 1, posts = [], postCount, category, keyword } = props
  const { NOTION_CONFIG } = useGlobal()
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  const totalPage = Math.ceil(postCount / POSTS_PER_PAGE)
  const showPagination = postCount >= POSTS_PER_PAGE

  if (!posts?.length || page > totalPage) {
    return (
      <div className='essay-index'>
        <EssayIndexHero category={category} keyword={keyword} />
        <BlogPostListEmpty currentSearch={keyword} />
      </div>
    )
  }

  return (
    <div className='essay-index'>
      <EssayIndexHero category={category} keyword={keyword} />

      <section className='essay-index__list' aria-label={`${category} 列表`}>
        {posts.map(post => (
          <EssayIndexItem key={post.id} post={post} />
        ))}
      </section>

      {showPagination && (
        <div className='essay-index__pagination'>
          <PaginationNumber page={page} totalPage={totalPage} />
        </div>
      )}
    </div>
  )
}
