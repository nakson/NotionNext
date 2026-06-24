import BLOG from '@/blog.config'
import { filterPostsByTagName } from '@/lib/category/filterPostsByTagName'
import { siteConfig } from '@/lib/config'
import { fetchGlobalAllData } from '@/lib/db/SiteDataApi'
import { DynamicLayout } from '@/themes/theme'

/**
 * 分类内 Tag 筛选 — 第 1 页
 */
export default function CategoryTag (props) {
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='LayoutPostList' {...props} />
}

export async function getStaticProps ({ params: { category, tag }, locale }) {
  const props = await fetchGlobalAllData({
    from: 'category-tag-props',
    locale
  })
  const allPosts = props.allPages?.filter(
    page => page.type === 'Post' && page.status === 'Published'
  )
  const categoryPosts = allPosts?.filter(
    post => post && post.category && post.category.includes(category)
  )
  const tagName = decodeURIComponent(String(tag))
  props.posts = filterPostsByTagName(categoryPosts, tagName)
  props.postCount = props.posts.length

  const POST_LIST_STYLE = siteConfig(
    'POST_LIST_STYLE',
    'Page',
    props?.NOTION_CONFIG
  )
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', 12, props?.NOTION_CONFIG)

  if (POST_LIST_STYLE === 'scroll') {
    // 滚动列表返回全部命中结果
  } else if (POST_LIST_STYLE) {
    props.posts = props.posts?.slice(0, POSTS_PER_PAGE)
  }

  delete props.allPages
  props.tagFilter = tagName
  props.category = category
  props.page = 1

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
    paths: [{ params: { category: '音乐', tag: '原创音乐' } }],
    fallback: true
  }
}
