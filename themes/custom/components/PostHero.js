import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { RECIPE_INLINE_HERO_EVENT } from './RecipeNotionPage'
import { getFirstImageFromPost } from '../utils/recipeImageUtils'
import TagItemMini from './TagItemMini'

/** 仅阅读记录、音乐分类显示文章封面 */
const COVER_CATEGORIES = ['阅读记录', '音乐']

/**
 * 文章详情页的Hero块
 */
export default function PostHero ({ post, siteInfo }) {
  const { locale, fullWidth } = useGlobal()
  const [inlineHero, setInlineHero] = useState(null)

  const isRecipe = post?.category === '料理食谱'
  const blockMapHero = useMemo(
    () => (isRecipe && !post?.pageCover ? getFirstImageFromPost(post) : null),
    [isRecipe, post]
  )

  useEffect(() => {
    if (!isRecipe || post?.pageCover) {
      setInlineHero(null)
      return
    }

    const onInlineHero = event => {
      if (event.detail?.postId !== post?.id) {
        return
      }
      setInlineHero({
        src: event.detail.src,
        alt: event.detail.alt || post.title,
        isAnimated: event.detail.isAnimated
      })
    }

    window.addEventListener(RECIPE_INLINE_HERO_EVENT, onInlineHero)
    return () => {
      window.removeEventListener(RECIPE_INLINE_HERO_EVENT, onInlineHero)
    }
  }, [isRecipe, post?.id, post?.pageCover, post?.title])

  if (!post) {
    return <></>
  }

  if (fullWidth) {
    return <div className='my-8' />
  }

  const shouldShowCover = COVER_CATEGORIES.includes(post.category)
  const isReadingRecord = post.category === '阅读记录'
  const headerImage = post?.pageCover || (shouldShowCover ? siteInfo?.pageCover : null)
  const recipeHeroSrc = post?.pageCover || inlineHero?.src || blockMapHero?.src
  const recipeHeroAlt = inlineHero?.alt || blockMapHero?.alt || post.title
  const recipeHeroAnimated = inlineHero?.isAnimated ?? blockMapHero?.isAnimated

  return (
    <div id='header' className='w-full relative z-10 pt-2 md:pt-6 pb-4'>
      <header className='w-full max-w-5xl mx-auto px-4'>
        <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-xs cyber-mono text-[color:var(--cyber-text-muted)] mb-4 uppercase tracking-wider border-b border-[color:var(--cyber-panel-border)] pb-2'>
          {post.category && (
            <Link
              href={`/category/${post.category}`}
              className='font-medium text-[color:var(--link)] hover:text-[color:var(--link-hover)] transition-colors normal-case'>
              <span className='text-[color:var(--cyber-text-muted)] mr-1'>
                #
              </span>
              {post.category}
            </Link>
          )}

          {post?.type !== 'Page' && (
            <span className='flex items-center normal-case tracking-normal'>
              <time>{post?.publishDay}</time>
            </span>
          )}

          {JSON.parse(siteConfig('ANALYTICS_BUSUANZI_ENABLE')) && (
            <div className='busuanzi_container_page_pv font-light normal-case tracking-normal'>
              <span className='mr-1 busuanzi_value_page_pv' />
              {locale.COMMON.VIEWS}
            </div>
          )}
        </div>

        <h1 className='cyber-post-title font-bold text-[color:var(--heading-1)] mb-5 leading-snug'>
          {post.title}
        </h1>

        <div className='mb-5'>
          {post.tagItems && (
            <div className='flex flex-wrap gap-2'>
              {post.tagItems.map(tag => (
                <TagItemMini key={tag.name} tag={tag} />
              ))}
            </div>
          )}
        </div>

        {isRecipe && recipeHeroSrc && (
          <div className='recipe-hero mb-8'>
            <LazyImage
              priority
              src={recipeHeroSrc}
              alt={recipeHeroAlt}
              className={`recipe-hero__img${recipeHeroAnimated ? ' recipe-hero__img--animated' : ''}`}
            />
          </div>
        )}

        {shouldShowCover && headerImage && isReadingRecord && (
          <div className='cyber-post-cover--natural mb-8 flex justify-center'>
            <LazyImage
              priority
              src={headerImage}
              alt={post.title}
              className='cyber-post-cover--natural-img'
            />
          </div>
        )}

        {shouldShowCover && headerImage && !isReadingRecord && (
          <div className='cyber-post-cover w-full h-64 md:h-96 relative overflow-hidden shadow-lg mb-8'>
            <LazyImage
              priority
              src={headerImage}
              className='w-full h-full object-cover'
            />
          </div>
        )}
      </header>
    </div>
  )
}
