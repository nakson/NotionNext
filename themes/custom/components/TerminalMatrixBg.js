import { useEffect, useRef } from 'react'

/**
 * Lightweight matrix-style rain; only mounted when intensity is high.
 */
export default function TerminalMatrixBg () {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas || typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId
    const chars = '01ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂ'
    const fontSize = 13

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    let columns = Math.ceil(canvas.width / fontSize)
    /** vertical position in px per column */
    let yPositions = Array(columns)
      .fill(0)
      .map(() => Math.random() * canvas.height)

    const syncColumns = () => {
      columns = Math.ceil(canvas.width / fontSize)
      const next = Array(columns).fill(0)
      for (let i = 0; i < columns; i++) {
        next[i] = yPositions[i] ?? Math.random() * canvas.height
      }
      yPositions = next
    }

    const onResize = () => {
      resize()
      syncColumns()
    }
    window.addEventListener('resize', onResize)

    const draw = () => {
      ctx.fillStyle = 'rgba(6, 8, 13, 0.09)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${fontSize}px JetBrains Mono, ui-monospace, monospace`

      for (let i = 0; i < columns; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const speed = fontSize * (0.35 + Math.random() * 0.25)
        yPositions[i] += speed
        if (yPositions[i] > canvas.height) {
          yPositions[i] = -fontSize * (2 + Math.random() * 8)
        }
        const y = yPositions[i]
        const head = y > canvas.height * 0.72
        ctx.fillStyle = head
          ? 'rgba(165, 243, 252, 0.45)'
          : 'rgba(74, 222, 128, 0.28)'
        ctx.fillText(ch, x, y)
      }
      rafId = window.requestAnimationFrame(draw)
    }

    rafId = window.requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', onResize)
      window.cancelAnimationFrame(rafId)
    }
  }, [])

  return <canvas ref={ref} className='cyber-matrix-canvas' aria-hidden />
}
