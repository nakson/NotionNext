import { useEffect, useRef } from 'react'
import { createWalker } from './engine/createWalker'

/**
 * 客户端画布挂载：创建 / 销毁 walker
 */
export default function PixelWalkMount({
  scene,
  rooms,
  map,
  onNavigate,
  className = ''
}) {
  const canvasRef = useRef(null)
  const navRef = useRef(onNavigate)
  navRef.current = onNavigate

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !map || !rooms?.length) return undefined

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const walker = createWalker(canvas, {
      scene,
      rooms,
      map,
      reducedMotion,
      touchAutoEnter: true,
      onNavigate: href => navRef.current?.(href)
    })

    return () => walker.destroy()
  }, [scene, rooms, map])

  return (
    <div className={`pixel-walk__stage ${className}`.trim()}>
      <canvas
        ref={canvasRef}
        className='pixel-walk__canvas'
        tabIndex={0}
        role='application'
        aria-label={
          scene === 'corridor'
            ? '分类走廊：点按出口可回首页'
            : '像素大厅：方向键或 WASD 移动，E 进入房间；触屏请点按房门'
        }
      />
    </div>
  )
}
