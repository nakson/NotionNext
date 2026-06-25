import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CONFIG from '../config'

const ShareButtons = dynamic(() => import('@/components/ShareButtons'), {
  ssr: false
})

/** custom 主题文章底部分享入口 */
const ARTICLE_SHARE_SERVICES = [
  'link',
  'wechat',
  'weibo',
  'email',
  'facebook',
  'whatsapp',
  'linkedin'
]

export default function ArticleCopyright ({ post }) {
  const router = useRouter()
  const [path, setPath] = useState(siteConfig('LINK') + router.asPath)
  const { locale } = useGlobal()

  useEffect(() => {
    setPath(window.location.href)
  }, [router.asPath])

  if (!siteConfig('HEXO_ARTICLE_COPYRIGHT', null, CONFIG)) {
    return <></>
  }

  return (
    <section className='article-copyright'>
      <p className='article-copyright__line'>
        <span className='article-copyright__label'>{locale.COMMON.AUTHOR}:</span>
        <Link href='/about' className='article-copyright__value no-underline-hover'>
          {siteConfig('AUTHOR')}
        </Link>
      </p>
      <p className='article-copyright__line article-copyright__line--url'>
        <span className='article-copyright__label'>{locale.COMMON.URL}:</span>
        {/* <a href={path} className='article-copyright__value article-copyright__link'>
          {path}
        </a> */}
        {post && (
          <span className='article-copyright__share'>
            <ShareButtons
              post={post}
              servicesOverride={ARTICLE_SHARE_SERVICES}
              variant='compact'
            />
          </span>
        )}
      </p>
      <p className='article-copyright__line'>
        <span className='article-copyright__label'>{locale.COMMON.COPYRIGHT}:</span>
        <span className='article-copyright__value'>{locale.COMMON.COPYRIGHT_NOTICE}</span>
      </p>
    </section>
  )
}
