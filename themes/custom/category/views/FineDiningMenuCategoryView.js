import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import BlogPostListEmpty from '../../components/BlogPostListEmpty'
import PaginationNumber from '../../components/PaginationNumber'
import FineDiningMenuHero from '../components/FineDiningMenuHero'
import FineDiningMenuItem from '../components/FineDiningMenuItem'

/**
 * 料理食谱 — 高档餐厅菜单式列表
 */
export default function FineDiningMenuCategoryView (props) {
  const { page = 1, posts = [], postCount, category, keyword } = props
  const { NOTION_CONFIG } = useGlobal()
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  const totalPage = Math.ceil(postCount / POSTS_PER_PAGE)
  const showPagination = postCount >= POSTS_PER_PAGE

  const heroBlock = (
    <div className='fine-dining-menu__hero-wrap'>
      <FineDiningMenuHero category={category} keyword={keyword} />
    </div>
  )

  if (!posts?.length || page > totalPage) {
    return (
      <div className='fine-dining-menu'>
        {heroBlock}
        <BlogPostListEmpty currentSearch={keyword} />
      </div>
    )
  }

  return (
    <div className='fine-dining-menu'>
      {heroBlock}

      <section className='fine-dining-menu__list' aria-label={`${category} 菜单`}>
        {posts.map((post, index) => (
          <FineDiningMenuItem key={post.id} post={post} index={index} />
        ))}
      </section>

      {showPagination && (
        <div className='fine-dining-menu__pagination'>
          <PaginationNumber page={page} totalPage={totalPage} />
        </div>
      )}
    </div>
  )
}
