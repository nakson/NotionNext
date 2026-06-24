import BLOG from '@/blog.config'
import { filterPostsByTagName } from '@/lib/category/filterPostsByTagName'
import { siteConfig } from '@/lib/config'
import { fetchGlobalAllData } from '@/lib/db/SiteDataApi'
import { DynamicLayout } from '@/themes/theme'

/**
 * 分类内 Tag 筛选 — 分页
 */
export default function CategoryTagPage (props) {
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='LayoutPostList' {...props} />
}

export async function getStaticProps ({
  params: { category, tag, page },
  locale
}) {
  const props = await fetchGlobalAllData({
    from: 'category-tag-page-props',
    locale
  })
  const allPosts = props.allPages?.filter(
    page => page.type === 'Post' && page.status === 'Published'
  )
  const categoryPosts = allPosts?.filter(
    post => post && post.category && post.category.includes(category)
  )
  const tagName = decodeURIComponent(String(tag))
  const filtered = filterPostsByTagName(categoryPosts, tagName)
  props.postCount = filtered.length

  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', 12, props?.NOTION_CONFIG)
  props.posts = filtered.slice(
    POSTS_PER_PAGE * (page - 1),
    POSTS_PER_PAGE * page
  )

  delete props.allPages
  props.tagFilter = tagName
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
    paths: [{ params: { category: '音乐', tag: '原创音乐', page: '1' } }],
    fallback: true
  }
}
