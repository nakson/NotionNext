import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { getStaticPathsBase } from '@/lib/build/staticPaths'
import { resolvePostProps } from '@/lib/db/SiteDataApi'
import { checkSlugHasOneSlash } from '@/lib/utils/post'
import WeddingInvitationPage from '@/themes/custom/components/wedding/WeddingInvitationPage'
import CONFIG from '@/themes/custom/config'
import { mapWeddingContent } from '@/themes/custom/utils/weddingContent'

const isStaticExport = process.env.EXPORT === 'true'

/**
 * 婚礼请柬独立全屏页 /wedding/[slug]
 */
function WeddingPage(props) {
  return <WeddingInvitationPage wedding={props.wedding} />
}

WeddingPage.fullPage = true
WeddingPage.disableExternalPlugins = true

export default WeddingPage

export async function getStaticPaths() {
  return getStaticPathsBase({
    from: 'wedding-paths',
    filterFn: row => {
      if (!checkSlugHasOneSlash(row)) return false
      const slug = String(row.slug || '').replace(/^\//, '')
      return slug.startsWith('wedding/')
    },
    mapPageToParams: row => {
      const parts = String(row.slug || '')
        .replace(/^\//, '')
        .split('/')
      return { params: { slug: parts[1] } }
    }
  })
}

export async function getStaticProps({ params: { slug }, locale }) {
  if (!siteConfig('WEDDING_ENABLE', true, CONFIG)) {
    return { notFound: true }
  }

  const props = await resolvePostProps({
    prefix: 'wedding',
    slug,
    locale,
    from: 'wedding'
  })

  if (!props.post) {
    return { notFound: true }
  }

  props.wedding = mapWeddingContent(
    props.post,
    props.post.blockMap,
    CONFIG
  )
  // 正文已映射进 wedding，客户端无需再带完整 blockMap
  if (props.post?.blockMap) {
    delete props.post.blockMap
  }

  return {
    props,
    revalidate: isStaticExport
      ? undefined
      : siteConfig(
          'NEXT_REVALIDATE_SECOND',
          BLOG.NEXT_REVALIDATE_SECOND,
          props.NOTION_CONFIG
        )
  }
}
