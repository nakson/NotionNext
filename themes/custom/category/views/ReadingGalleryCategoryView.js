import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import BlogPostListEmpty from '../../components/BlogPostListEmpty'
import PaginationNumber from '../../components/PaginationNumber'
import ReadingGalleryGroup from '../components/ReadingGalleryGroup'
import ReadingGalleryHero from '../components/ReadingGalleryHero'
import { groupPostsByTag } from '../utils/groupPostsByTag'

/**
 * 阅读记录 — 电影海报风画廊（按 tag 分组）
 */
export default function ReadingGalleryCategoryView (props) {
  const { page = 1, posts = [], postCount, category, keyword, siteInfo } = props
  const { NOTION_CONFIG } = useGlobal()
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  const totalPage = Math.ceil(postCount / POSTS_PER_PAGE)
  const showPagination = postCount >= POSTS_PER_PAGE
  const groupedPosts = groupPostsByTag(posts)

  if (!posts?.length || page > totalPage) {
    return (
      <div className='reading-gallery'>
        <ReadingGalleryHero category={category} keyword={keyword} />
        <BlogPostListEmpty currentSearch={keyword} />
      </div>
    )
  }

  return (
    <div className='reading-gallery'>
      <ReadingGalleryHero category={category} keyword={keyword} />

      <div className='reading-gallery__groups'>
        {groupedPosts.map(([tagName, tagPosts]) => (
          <ReadingGalleryGroup
            key={tagName}
            tagName={tagName}
            posts={tagPosts}
            siteInfo={siteInfo}
          />
        ))}
      </div>

      {showPagination && (
        <div className='reading-gallery__pagination'>
          <PaginationNumber page={page} totalPage={totalPage} />
        </div>
      )}
    </div>
  )
}
