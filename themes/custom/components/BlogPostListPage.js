import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import BlogPostCard from './BlogPostCard'
import BlogCard from './BlogCard'
import BlogPostListEmpty from './BlogPostListEmpty'
import PaginationNumber from './PaginationNumber'

/**
 * 文章列表分页表格
 * @param page 当前页
 * @param posts 所有文章
 * @param tags 所有标签
 * @returns {JSX.Element}
 * @constructor
 */
const BlogPostListPage = ({
  page = 1,
  posts = [],
  postCount,
  siteInfo,
  category
}) => {
  console.log('>>> category', category)
  const { NOTION_CONFIG } = useGlobal()
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  const totalPage = Math.ceil(postCount / POSTS_PER_PAGE)
  const showPagination = postCount >= POSTS_PER_PAGE
  if (!posts || posts.length === 0 || page > totalPage) {
    return <BlogPostListEmpty />
  } else {
    return (
      <div id='container' className='w-full'>
        {/* 文章列表 */}
        <div id='posts-wrapper' className='flex flex-col space-y-8'>
          {posts?.map(post => (
            // <BlogPostCard
            //   index={posts.indexOf(post)}
            //   key={post.id}
            //   post={post}
            //   siteInfo={siteInfo}
            // />
            <BlogCard
              index={posts.indexOf(post)}
              key={post.id}
              post={post}
              siteInfo={siteInfo}
              showAnimate
              showSummary
            />
          ))}
        </div>
        {showPagination && (
          <PaginationNumber page={page} totalPage={totalPage} />
        )}
      </div>
    )
  }
}

export default BlogPostListPage
