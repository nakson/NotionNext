import { useEffect, useState } from 'react'

/**
 * 元素首次进入视口后保持可见（入场动画用）
 * @param {React.RefObject} ref
 * @param {{ enabled?: boolean, rootMargin?: string, threshold?: number }} options
 */
export default function useInView(
  ref,
  { enabled = true, rootMargin = '0px 0px -8% 0px', threshold = 0.08 } = {}
) {
  const [inView, setInView] = useState(!enabled)

  useEffect(() => {
    if (!enabled) {
      setInView(true)
      return
    }
    const el = ref?.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    let done = false
    const observer = new IntersectionObserver(
      entries => {
        const hit = entries.some(e => e.isIntersecting)
        if (hit && !done) {
          done = true
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, enabled, rootMargin, threshold])

  return inView
}
