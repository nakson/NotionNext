import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'
import CONFIG from '../config'

const NOTION_READY_EVENT = 'notion-page-ready'
const FAILSAFE_MS = 8000

/** 静态资源路径：支持 SUB_PATH 子路径部署 */
function resolveLoadingGifUrl (raw, siteConfigFn) {
  const t = String(raw ?? '').trim()
  if (!t) return '/images/jump-e.gif'
  if (/^https?:\/\//i.test(t) || t.startsWith('data:')) return t
  const sub = String(siteConfigFn('SUB_PATH', '') || '').replace(/\/$/, '')
  const path = t.startsWith('/') ? t : `/${t}`
  return sub ? `${sub}${path}` : path
}

/**
 * 全屏过场：路由切换 + Notion 正文渲染完成前展示兔子 GIF，浅虚化并拦截点击
 */
export default function LoadingCover ({ post }) {
  const { onLoading } = useGlobal()
  const router = useRouter()
  const [awaitingNotion, setAwaitingNotion] = useState(false)
  const [mounted, setMounted] = useState(false)
  const failsafeRef = useRef(null)
  const expectedPostIdRef = useRef(null)

  const gifUrl = useMemo(
    () =>
      resolveLoadingGifUrl(
        siteConfig('HEXO_LOADING_COVER_GIF', '/images/jump-e.gif', CONFIG),
        siteConfig
      ),
    []
  )

  const visible = onLoading || awaitingNotion

  useEffect(() => {
    setMounted(true)
  }, [])

  // 路由完成后同步期望的文章 id（用于校验 notion-page-ready）
  useEffect(() => {
    if (post?.id) {
      expectedPostIdRef.current = post.id
    }
  }, [post?.id])

  const clearFailsafe = () => {
    if (failsafeRef.current) {
      clearTimeout(failsafeRef.current)
      failsafeRef.current = null
    }
  }

  const finishAwaiting = () => {
    clearFailsafe()
    setAwaitingNotion(false)
  }

  const startAwaiting = () => {
    setAwaitingNotion(true)
    clearFailsafe()
    failsafeRef.current = setTimeout(finishAwaiting, FAILSAFE_MS)
  }

  useEffect(() => {
    if (!isBrowser) return

    const handleStart = () => {
      expectedPostIdRef.current = null
      startAwaiting()
    }

    const handleComplete = () => {
      const checkNoNotionPage = () => {
        if (!document.getElementById('notion-article')) {
          finishAwaiting()
        }
      }
      // 双 rAF + 短延迟：等旧文章 DOM 卸载后再判断
      requestAnimationFrame(() => {
        requestAnimationFrame(checkNoNotionPage)
      })
      setTimeout(checkNoNotionPage, 150)
    }

    const handleNotionReady = event => {
      const readyPostId = event?.detail?.postId
      const expected = expectedPostIdRef.current
      if (expected && readyPostId && readyPostId !== expected) {
        return
      }
      finishAwaiting()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', finishAwaiting)
    window.addEventListener(NOTION_READY_EVENT, handleNotionReady)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', finishAwaiting)
      window.removeEventListener(NOTION_READY_EVENT, handleNotionReady)
      clearFailsafe()
    }
  }, [router.events])

  // 离开文章页后 post 清空，确保过场不会卡住
  useEffect(() => {
    if (!awaitingNotion || onLoading) {
      return
    }
    if (post?.id) {
      return
    }
    const timer = setTimeout(() => {
      if (!document.getElementById('notion-article')) {
        finishAwaiting()
      }
    }, 150)
    return () => clearTimeout(timer)
  }, [awaitingNotion, onLoading, post?.id])

  if (!mounted || !visible) {
    return null
  }

  return (
    <div
      id='loading-cover'
      className='cyber-loading-cover'
      role='status'
      aria-live='polite'
      aria-busy='true'
      aria-label='Loading'>
      <div className='cyber-loading-cover__panel'>
        <img
          src={gifUrl}
          alt=''
          className='cyber-loading-cover__rabbit'
          width={40}
          height={40}
          decoding='async'
        />
        <p className='cyber-loading-cover__label cyber-mono'>LOADING...</p>
      </div>
    </div>
  )
}
