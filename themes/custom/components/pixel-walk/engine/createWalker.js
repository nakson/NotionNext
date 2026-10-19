import {
  findRoomAt,
  findRoomAtPoint,
  moveWithCollision
} from './collision'
import { loadHeroSprite } from './heroSprite'
import { createInput } from './input'
import { loadOptionalImage, renderFrame } from './render'

const PLAYER = { w: 12, h: 14 }
const SPEED = 70 // 逻辑像素 / 秒
const ARRIVE = 4

/**
 * @param {HTMLCanvasElement} canvas
 * @param {object} options
 * @returns {{ destroy: () => void }}
 */
export function createWalker(canvas, options) {
  const {
    scene = 'lobby',
    rooms = [],
    map,
    onNavigate,
    reducedMotion = false,
    touchAutoEnter = true
  } = options

  if (!canvas || !map) {
    return { destroy() {} }
  }

  const ctx = canvas.getContext('2d')
  const input = createInput()

  let player = {
    x: map.spawn.x - PLAYER.w / 2,
    y: map.spawn.y - PLAYER.h / 2,
    w: PLAYER.w,
    h: PLAYER.h
  }
  let facing = 'down'
  let walkTarget = null
  let pendingHref = null
  let bgImage = null
  let hero = { layers: [], ready: false }
  let moving = false
  let raf = 0
  let lastTs = 0
  let time = 0
  let destroyed = false
  let paused = false
  let navigated = false

  const dpr = Math.min(
    typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
    2
  )

  function resizeCss() {
    const parent = canvas.parentElement
    const cssW = parent?.clientWidth || map.width * 2
    const scale = cssW / map.width
    const cssH = Math.round(map.height * scale)
    canvas.style.width = '100%'
    canvas.style.height = `${cssH}px`
    canvas.width = Math.round(map.width * dpr)
    canvas.height = Math.round(map.height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  resizeCss()

  loadOptionalImage(map.backgroundUrl).then(img => {
    if (!destroyed) bgImage = img
  })
  loadHeroSprite().then(h => {
    if (!destroyed) hero = h
  })

  const onVisibility = () => {
    paused = document.hidden
    if (!paused) lastTs = 0
  }
  document.addEventListener('visibilitychange', onVisibility)

  const onResize = () => resizeCss()
  window.addEventListener('resize', onResize)

  function worldFromEvent(e) {
    const rect = canvas.getBoundingClientRect()
    const clientX = e.clientX ?? e.touches?.[0]?.clientX
    const clientY = e.clientY ?? e.touches?.[0]?.clientY
    if (clientX == null) return null
    return {
      x: ((clientX - rect.left) / rect.width) * map.width,
      y: ((clientY - rect.top) / rect.height) * map.height
    }
  }

  function goHref(href) {
    if (navigated || !href || typeof onNavigate !== 'function') return
    navigated = true
    onNavigate(href)
  }

  function handlePointer(e) {
    if (destroyed || navigated) return
    const pt = worldFromEvent(e)
    if (!pt) return
    const hit = findRoomAtPoint(pt.x, pt.y, rooms)
    if (!hit) {
      // 点地板：仅设走路目标
      walkTarget = { x: pt.x - PLAYER.w / 2, y: pt.y - PLAYER.h / 2, href: null }
      return
    }
    if (reducedMotion) {
      goHref(hit.href)
      return
    }
    // 触屏：走向门，到达后自动进入
    walkTarget = {
      x: hit.trigger.x + hit.trigger.w / 2 - PLAYER.w / 2,
      y: hit.trigger.y + hit.trigger.h / 2 - PLAYER.h / 2,
      href: touchAutoEnter ? hit.href : null
    }
    pendingHref = touchAutoEnter ? hit.href : null
  }

  canvas.addEventListener('pointerdown', handlePointer)

  function activeRoom() {
    return findRoomAt(player, rooms)
  }

  function hintText(room) {
    if (!room) return ''
    if (scene === 'corridor' && room.id === 'exit') {
      return reducedMotion ? '点按出口回首页' : '按 E 回大厅 · 或点按出口'
    }
    return reducedMotion
      ? `点按进入 · ${room.name}`
      : `按 E 进入 · ${room.name}`
  }

  function step(dt) {
    if (reducedMotion) return

    let vx = 0
    let vy = 0
    const stick = input.vector()
    if (stick.x || stick.y) {
      walkTarget = null
      pendingHref = null
      vx = stick.x
      vy = stick.y
    } else if (walkTarget) {
      const dx = walkTarget.x - player.x
      const dy = walkTarget.y - player.y
      const dist = Math.hypot(dx, dy)
      if (dist < ARRIVE) {
        const href = walkTarget.href || pendingHref
        walkTarget = null
        pendingHref = null
        if (href) goHref(href)
      } else {
        vx = dx / dist
        vy = dy / dist
      }
    }

    // 走廊限制为主要左右移动（仍允许微小上下）
    if (scene === 'corridor' && !walkTarget) {
      vy *= 0.35
    }

    moving = Boolean(vx || vy)
    if (moving) {
      if (Math.abs(vx) > Math.abs(vy)) facing = vx < 0 ? 'left' : 'right'
      else facing = vy < 0 ? 'up' : 'down'
      const moved = moveWithCollision(
        player,
        vx * SPEED * dt,
        vy * SPEED * dt,
        map.walls || []
      )
      player = { ...player, ...moved }
    }

    const room = activeRoom()
    if (
      room &&
      (input.consume('e') || input.consume('enter'))
    ) {
      goHref(room.href)
    }
  }

  function paint(extra = {}) {
    const room = activeRoom()
    renderFrame(ctx, {
      map,
      scene,
      rooms,
      player,
      facing,
      activeRoom: room,
      hint: hintText(room),
      bgImage,
      hero,
      moving,
      time,
      animateProps: !reducedMotion && !document.hidden,
      ...extra
    })
  }

  function frame(ts) {
    if (destroyed) return
    raf = requestAnimationFrame(frame)
    if (paused) return
    if (!lastTs) lastTs = ts
    const dt = Math.min(0.05, (ts - lastTs) / 1000)
    lastTs = ts
    time += dt
    step(dt)
    paint()
  }

  // reduced-motion：只渲一帧静态，仍可点门
  if (reducedMotion) {
    moving = false
    paint({ time: 0, animateProps: false })
    Promise.all([
      loadOptionalImage(map.backgroundUrl),
      loadHeroSprite()
    ]).then(([img, h]) => {
      if (destroyed) return
      bgImage = img
      hero = h
      paint({ time: 0, animateProps: false })
    })
  } else {
    raf = requestAnimationFrame(frame)
  }

  return {
    destroy() {
      destroyed = true
      cancelAnimationFrame(raf)
      input.destroy()
      canvas.removeEventListener('pointerdown', handlePointer)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', onResize)
    }
  }
}
