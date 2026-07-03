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

export async function getStaticProps({ params: { category, page } }) {
  const from = 'category-page-props'
  let props = await fetchGlobalAllData({ from })
  const pageNum = Number(page) || 1

  const categoryPosts = props.allPages
    ?.filter(p => p.type === 'Post' && p.status === 'Published')
    .filter(post => post && post.category && post.category.includes(category))

  props.postCount = categoryPosts.length
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', 12, props?.NOTION_CONFIG)
  const isReadingGallery =
    resolveCategoryViewId(category) === 'reading-poster-gallery'

  if (isReadingGallery) {
    props.totalPage = getTagGroupPageCount(categoryPosts, POSTS_PER_PAGE)
    props.posts = getPostsForTagGroupPage(
      categoryPosts,
      pageNum,
      POSTS_PER_PAGE
    )
  } else {
    props.posts = categoryPosts.slice(
      POSTS_PER_PAGE * (pageNum - 1),
      POSTS_PER_PAGE * pageNum
    )
  }

  delete props.allPages
  props.page = pageNum

  props = { ...props, category, page: pageNum }

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
  const { categoryOptions, allPages, NOTION_CONFIG } = await fetchGlobalAllData({
    from
  })
  const paths = []

  categoryOptions?.forEach(category => {
    // 过滤状态类型
    const categoryPosts = allPages
      ?.filter(page => page.type === 'Post' && page.status === 'Published')
      .filter(
        post => post && post.category && post.category.includes(category.name)
      )
    // 处理文章页数
    const postCount = categoryPosts.length
    const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
    const totalPages =
      resolveCategoryViewId(category.name) === 'reading-poster-gallery'
        ? getTagGroupPageCount(categoryPosts, POSTS_PER_PAGE)
        : Math.ceil(postCount / POSTS_PER_PAGE)
    if (totalPages > 1) {
      for (let i = 1; i <= totalPages; i++) {
        paths.push({ params: { category: category.name, page: '' + i } })
      }
    }
  })

  return {
    paths,
    fallback: true
  }
}
