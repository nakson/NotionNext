import { useEffect, useRef } from 'react'

/**
 * 请柬页缓慢自动下滑：只滚动传入的容器节点（不依赖 window/document）。
 * 打开后 startDelay 内忽略人工滚动暂停，避免开场点击误触。
 */
export default function useWeddingAutoScroll({
  enabled,
  opened,
  scrollRef,
  speed = 72,
  resumeDelay = 2000,
  startDelay = 800
}) {
  const pausedUntilRef = useRef(0)
  const rafRef = useRef(0)
  const lastTsRef = useRef(0)
  const readyAtRef = useRef(0)
  const ignorePauseUntilRef = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!enabled || !opened) return

    const el = scrollRef?.current
    if (!el) return

    const markUserScroll = () => {
      if (Date.now() < ignorePauseUntilRef.current) return
      pausedUntilRef.current = Date.now() + resumeDelay
    }

    const opts = { passive: true, capture: true }
    const onWheel = () => markUserScroll()
    const onTouchMove = () => markUserScroll()
    const onKeyDown = e => {
      const keys = [
        'ArrowDown',
        'ArrowUp',
        'PageDown',
        'PageUp',
        'Home',
        'End',
        ' '
      ]
      if (keys.includes(e.key)) markUserScroll()
    }

    el.addEventListener('wheel', onWheel, opts)
    el.addEventListener('touchmove', onTouchMove, opts)
    window.addEventListener('keydown', onKeyDown)

    return () => {
      el.removeEventListener('wheel', onWheel, opts)
      el.removeEventListener('touchmove', onTouchMove, opts)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [enabled, opened, resumeDelay, scrollRef])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!enabled || !opened) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
      lastTsRef.current = 0
      readyAtRef.current = 0
      return
    }

    const delay = Math.max(0, startDelay)
    readyAtRef.current = Date.now() + delay
    ignorePauseUntilRef.current = Date.now() + delay + 200
    lastTsRef.current = 0
    pausedUntilRef.current = 0

    const tick = ts => {
      const el = scrollRef?.current
      if (!el) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      if (!lastTsRef.current) lastTsRef.current = ts
      const delta = Math.min(64, ts - lastTsRef.current)
      lastTsRef.current = ts

      const pageVisible = document.visibilityState !== 'hidden'
      const startReady = Date.now() >= readyAtRef.current
      const userPaused = Date.now() < pausedUntilRef.current
      const scrollHeight = el.scrollHeight
      const clientHeight = el.clientHeight
      const canScroll = scrollHeight > clientHeight + 4
      const maxScroll = Math.max(0, scrollHeight - clientHeight)
      const atBottom = canScroll && el.scrollTop >= maxScroll - 2

      if (
        pageVisible &&
        startReady &&
        !userPaused &&
        canScroll &&
        !atBottom
      ) {
        const distance = (speed * delta) / 1000
        if (distance > 0) {
          el.scrollTop = Math.min(maxScroll, el.scrollTop + distance)
        }
      }

      if (!atBottom) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        rafRef.current = 0
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
      lastTsRef.current = 0
    }
  }, [enabled, opened, speed, startDelay, scrollRef])
}
