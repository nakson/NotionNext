import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { fetchGlobalAllData } from '@/lib/db/SiteDataApi'
import { filterPostsByKeyword } from '@/lib/search/filterPostsByKeyword'
import { DynamicLayout } from '@/themes/theme'

/**
 * 分类内搜索 — 分页
 */
export default function CategorySearchPage (props) {
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='LayoutPostList' {...props} />
}

export async function getStaticProps ({
  params: { category, keyword, page },
  locale
}) {
  const props = await fetchGlobalAllData({
    from: 'category-search-page-props',
    locale
  })
  const allPosts = props.allPages?.filter(
    page => page.type === 'Post' && page.status === 'Published'
  )
  const categoryPosts = allPosts?.filter(
    post => post && post.category && post.category.includes(category)
  )
  props.posts = await filterPostsByKeyword(categoryPosts, keyword)
  props.postCount = props.posts.length

  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', 12, props?.NOTION_CONFIG)
  props.posts = props.posts.slice(
    POSTS_PER_PAGE * (page - 1),
    POSTS_PER_PAGE * page
  )

  delete props.allPages
  props.keyword = keyword
  props.category = category
  props.page = page

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

export function getStaticPaths () {
  return {
    paths: [{ params: { category: '料理食谱', keyword: 'NotionNext', page: '1' } }],
    fallback: true
  }
}
