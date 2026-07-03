import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { fetchGlobalAllData } from '@/lib/db/SiteDataApi'
import { resolveCategoryViewId } from '@/themes/custom/category/registry'
import {
  getPostsForTagGroupPage,
  getTagGroupPageCount
} from '@/themes/custom/category/utils/paginateByTagGroup'
import { DynamicLayout } from '@/themes/theme'

/**
 * 分类页
 * @param {*} props
 * @returns
 */
export default function Category(props) {
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='LayoutPostList' {...props} />
}

export async function getStaticProps({ params: { category }, locale }) {
  const from = 'category-props'
  let props = await fetchGlobalAllData({ from, locale })

  // 过滤状态
  props.posts = props.allPages?.filter(
    page => page.type === 'Post' && page.status === 'Published'
  )
  // 处理过滤
  const categoryPosts = props.posts.filter(
    post => post && post.category && post.category.includes(category)
  )

  props.postCount = categoryPosts.length
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', 12, props?.NOTION_CONFIG)
  const isReadingGallery =
    resolveCategoryViewId(category) === 'reading-poster-gallery'

  // 处理分页
  if (siteConfig('POST_LIST_STYLE') === 'scroll') {
    props.posts = categoryPosts
  } else if (siteConfig('POST_LIST_STYLE') === 'page') {
    if (isReadingGallery) {
      props.totalPage = getTagGroupPageCount(categoryPosts, POSTS_PER_PAGE)
      props.posts = getPostsForTagGroupPage(categoryPosts, 1, POSTS_PER_PAGE)
    } else {
      props.posts = categoryPosts?.slice(0, POSTS_PER_PAGE)
    }
  } else {
    props.posts = categoryPosts
  }

  delete props.allPages

  props = { ...props, category }

  return {
    props,
    revalidate: process.env.EXPORT
      ? undefined
      : siteConfig(
          'NEXT_REVALIDATE_SECOND',
          BLOG.NEXT_REVALIDATE_SECOND,
          props.NOTION_CONFIG
        )
  }
}

export async function getStaticPaths() {
  const from = 'category-paths'
  const { categoryOptions } = await fetchGlobalAllData({ from })
  let paths = []
  if (Array.isArray(categoryOptions) && categoryOptions.length > 0) {
    paths = categoryOptions
      .map(c => ({ params: { category: c?.name } }))
      .filter(p => p.params.category)
  } else if (
    categoryOptions &&
    typeof categoryOptions === 'object' &&
    !Array.isArray(categoryOptions)
  ) {
    paths = Object.keys(categoryOptions)
      .map(key => ({
        params: { category: categoryOptions[key]?.name }
      }))
      .filter(p => p.params.category)
  }
  return {
    paths,
    fallback: true
  }
}
