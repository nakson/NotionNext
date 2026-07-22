import NotionPage from '@/components/NotionPage'
import { isBrowser } from '@/lib/utils'
import { useEffect, useRef } from 'react'
import {
  applyRecipeImageLayout,
  getFirstImageFromPost
} from '../utils/recipeImageUtils'

/** 正文首图提升为 Hero 时派发给 PostHero */
export const RECIPE_INLINE_HERO_EVENT = 'recipe-inline-hero'

/**
 * 料理食谱正文：步骤图 1:1 + 连图 2/3 列网格（Cookpad 式）
 * 无 pageCover 时将正文首图提升为 Hero（正文内隐藏）
 */
export default function RecipeNotionPage ({ post, className }) {
  const layoutAppliedRef = useRef(false)

  useEffect(() => {
    if (!isBrowser || !post?.id) {
      return
    }

    layoutAppliedRef.current = false

    const runLayout = () => {
      if (layoutAppliedRef.current) {
        return
      }
      const root = document.getElementById('notion-article')
      if (!root) {
        return
      }

      const hideFirstAsHero = !post.pageCover
      if (hideFirstAsHero) {
        const fallback = getFirstImageFromPost(post)
        if (fallback?.src) {
          window.dispatchEvent(
            new CustomEvent(RECIPE_INLINE_HERO_EVENT, {
              detail: {
                postId: post.id,
                src: fallback.src,
                alt: fallback.alt,
                isAnimated: fallback.isAnimated
              }
            })
          )
        }
      }

      applyRecipeImageLayout(root, { hideFirstAsHero })
      layoutAppliedRef.current = true
    }

    const onNotionReady = event => {
      if (event.detail?.postId !== post.id) {
        return
      }
      runLayout()
    }

    window.addEventListener('notion-page-ready', onNotionReady)

    // 若 Notion 已渲染完成（如客户端导航返回）
    const readyTimer = setTimeout(runLayout, 400)

    return () => {
      window.removeEventListener('notion-page-ready', onNotionReady)
      clearTimeout(readyTimer)
      layoutAppliedRef.current = false
    }
  }, [post?.id, post?.pageCover, post?.blockMap])

  return (
    <NotionPage
      post={post}
      className={`recipe-notion-body ${className || ''}`.trim()}
    />
  )
}
