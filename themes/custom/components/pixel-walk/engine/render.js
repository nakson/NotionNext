import { drawHeroSprite } from './heroSprite'

/**
 * 纯 Canvas 绘制：底板 / 占位地板 / props / 门 / 角色 / 提示
 */

/** 无底板图时的完整大厅占位：墙 / 地板砖 / 地毯 / 踢脚线 */
function drawPlaceholderLobby(ctx, map) {
  const { width: w, height: h } = map
  // 外墙
  ctx.fillStyle = '#1d2021'
  ctx.fillRect(0, 0, w, h)
  // 墙面（上沿）
  ctx.fillStyle = '#3c3836'
  ctx.fillRect(0, 0, w, 22)
  ctx.fillStyle = '#504945'
  ctx.fillRect(0, 18, w, 4)
  // 地板砖
  const floorX = 14
  const floorY = 22
  const floorW = w - 28
  const floorH = h - 40
  ctx.fillStyle = '#282828'
  ctx.fillRect(floorX, floorY, floorW, floorH)
  ctx.strokeStyle = '#3c3836'
  for (let y = floorY; y < floorY + floorH; y += 16) {
    for (let x = floorX; x < floorX + floorW; x += 16) {
      ctx.strokeRect(x + 0.5, y + 0.5, 15, 15)
    }
  }
  // 中央地毯
  ctx.fillStyle = '#9d0006'
  ctx.globalAlpha = 0.55
  ctx.fillRect(88, 48, 144, 72)
  ctx.globalAlpha = 1
  ctx.fillStyle = '#cc241d'
  ctx.fillRect(96, 54, 128, 60)
  ctx.strokeStyle = '#fabd2f'
  ctx.strokeRect(96.5, 54.5, 127, 59)
  // 地毯纹样
  ctx.fillStyle = 'rgba(250,189,47,0.35)'
  for (let i = 0; i < 5; i++) {
    ctx.fillRect(108 + i * 22, 78, 10, 4)
  }
  // 下墙踢脚
  ctx.fillStyle = '#3c3836'
  ctx.fillRect(0, h - 18, w, 18)
  ctx.fillStyle = '#504945'
  ctx.fillRect(0, h - 18, w, 3)
  // 左右墙柱
  ctx.fillStyle = '#1d2021'
  ctx.fillRect(0, 0, 14, h)
  ctx.fillRect(w - 14, 0, 14, h)
}

function drawPlaceholderCorridor(ctx, map) {
  const { width: w, height: h } = map
  // 上下墙
  ctx.fillStyle = '#1d2021'
  ctx.fillRect(0, 0, w, h)
  ctx.fillStyle = '#3c3836'
  ctx.fillRect(0, 0, w, 12)
  ctx.fillRect(0, h - 12, w, 12)
  // 地板
  ctx.fillStyle = map.floor || '#282828'
  ctx.fillRect(0, 12, w, h - 24)
  ctx.fillStyle = map.tint || '#83a598'
  ctx.globalAlpha = 0.22
  ctx.fillRect(0, 12, w, h - 24)
  ctx.globalAlpha = 1
  // 地毯长条
  ctx.fillStyle = map.tint || '#83a598'
  ctx.globalAlpha = 0.45
  ctx.fillRect(40, 28, w - 80, 24)
  ctx.globalAlpha = 1
  ctx.strokeStyle = 'rgba(235,219,178,0.25)'
  ctx.strokeRect(40.5, 28.5, w - 81, 23)
  // 墙灯（静态）
  ctx.fillStyle = '#504945'
  ctx.fillRect(120, 14, 6, 8)
  ctx.fillRect(360, 14, 6, 8)
  ctx.fillStyle = '#fabd2f'
  ctx.fillRect(121, 15, 4, 4)
  ctx.fillRect(361, 15, 4, 4)
  // 地板线
  ctx.strokeStyle = 'rgba(235,219,178,0.12)'
  for (let x = 0; x < w; x += 24) {
    ctx.beginPath()
    ctx.moveTo(x, 12)
    ctx.lineTo(x, h - 12)
    ctx.stroke()
  }
}

/**
 * @param {boolean} [spriteDoors] 底板已画门时只高亮+标签，避免色块盖住美术
 */
function drawDoor(ctx, room, active, spriteDoors = false) {
  const t = room.trigger
  if (!spriteDoors) {
    ctx.fillStyle = active ? '#fabd2f' : '#665c54'
    ctx.fillRect(t.x, t.y, t.w, t.h)
    ctx.fillStyle = active ? '#1d2021' : '#282828'
    ctx.fillRect(t.x + 4, t.y + 3, t.w - 8, t.h - 6)
  } else if (active) {
    ctx.strokeStyle = '#fabd2f'
    ctx.lineWidth = 1
    ctx.strokeRect(t.x + 0.5, t.y + 0.5, t.w - 1, t.h - 1)
  }
  // 有精灵门时不在门上叠字（避免中/英重贴）；靠近时用底部 hint 提示分类名
  if (!spriteDoors && room.label && room.name && room.id !== 'exit') {
    ctx.fillStyle = active ? '#fabd2f' : '#ebdbb2'
    ctx.font = 'bold 8px monospace'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(room.name, room.label.x, room.label.y)
  }
}

function propColor(p, time, animate) {
  const colors = p.colors || ['#fabd2f']
  if (!animate || !p.fps) return colors[0]
  return colors[Math.floor(time * p.fps) % colors.length]
}

function drawProps(ctx, props, time, animate) {
  if (!props?.length) return
  for (const p of props) {
    const kind = p.kind || 'box'
    const glow = propColor(p, time, animate)

    if (kind === 'vending') {
      ctx.fillStyle = '#1d2021'
      ctx.fillRect(p.x, p.y, p.w, p.h)
      ctx.fillStyle = '#3c3836'
      ctx.fillRect(p.x + 2, p.y + 2, p.w - 4, p.h - 8)
      // 屏幕闪烁
      ctx.fillStyle = glow
      ctx.fillRect(p.x + 4, p.y + 4, p.w - 8, 12)
      // 饮料格
      ctx.fillStyle = '#458588'
      ctx.fillRect(p.x + 4, p.y + 20, 8, 6)
      ctx.fillStyle = '#cc241d'
      ctx.fillRect(p.x + 14, p.y + 20, 8, 6)
      ctx.fillStyle = '#98971a'
      ctx.fillRect(p.x + 4, p.y + 28, 8, 6)
      ctx.fillStyle = '#d79921'
      ctx.fillRect(p.x + 14, p.y + 28, 8, 6)
      // 出货口
      ctx.fillStyle = '#282828'
      ctx.fillRect(p.x + 4, p.y + p.h - 10, p.w - 8, 6)
      continue
    }

    if (kind === 'lamp') {
      ctx.fillStyle = '#665c54'
      ctx.fillRect(p.x + 3, p.y + 8, 4, p.h - 8)
      ctx.fillStyle = '#3c3836'
      ctx.fillRect(p.x + 1, p.y + p.h - 3, 8, 3)
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(p.x + 5, p.y + 5, 5, 0, Math.PI * 2)
      ctx.fill()
      // 柔光
      ctx.fillStyle = glow
      ctx.globalAlpha = 0.2
      ctx.beginPath()
      ctx.arc(p.x + 5, p.y + 5, 10, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = 1
      continue
    }

    if (kind === 'neon') {
      ctx.fillStyle = '#1d2021'
      ctx.fillRect(p.x, p.y, p.w, p.h)
      ctx.fillStyle = glow
      ctx.fillRect(p.x + 2, p.y + 2, p.w - 4, p.h - 4)
      ctx.fillStyle = '#ebdbb2'
      ctx.font = '6px monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('OPEN', p.x + p.w / 2, p.y + p.h / 2)
      continue
    }

    if (kind === 'plant') {
      ctx.fillStyle = '#665c54'
      ctx.fillRect(p.x + 3, p.y + 8, 10, 8)
      ctx.fillStyle = '#98971a'
      ctx.fillRect(p.x + 2, p.y + 2, 12, 8)
      ctx.fillStyle = '#b8bb26'
      ctx.fillRect(p.x + 5, p.y, 6, 6)
      continue
    }

    // 默认小方块
    ctx.fillStyle = '#1d2021'
    ctx.fillRect(p.x, p.y, p.w, p.h)
    ctx.fillStyle = glow
    ctx.fillRect(p.x + 2, p.y + 2, p.w - 4, Math.max(4, p.h * 0.35))
  }
}

function drawHeroFallback(ctx, player, facing) {
  const { x, y, w, h } = player
  ctx.fillStyle = '#1d2021'
  ctx.fillRect(x, y + 2, w, h - 2)
  ctx.fillStyle = '#ebdbb2'
  ctx.fillRect(x + 2, y, w - 4, 6)
  ctx.fillStyle = '#83a598'
  ctx.fillRect(x + 1, y + 6, w - 2, h - 8)
  ctx.fillStyle = '#fabd2f'
  if (facing === 'left') ctx.fillRect(x, y + 8, 2, 2)
  else if (facing === 'right') ctx.fillRect(x + w - 2, y + 8, 2, 2)
  else if (facing === 'up') ctx.fillRect(x + w / 2 - 1, y + 1, 2, 2)
  else ctx.fillRect(x + w / 2 - 1, y + h - 3, 2, 2)
}

function drawHint(ctx, map, text) {
  if (!text) return
  const pad = 6
  ctx.font = '10px monospace'
  const tw = ctx.measureText(text).width
  const bx = Math.max(4, (map.width - tw) / 2 - pad)
  const by = map.height - 22
  ctx.fillStyle = 'rgba(29,32,33,0.85)'
  ctx.fillRect(bx, by, tw + pad * 2, 16)
  ctx.strokeStyle = '#fabd2f'
  ctx.strokeRect(bx + 0.5, by + 0.5, tw + pad * 2 - 1, 15)
  ctx.fillStyle = '#ebdbb2'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, bx + pad, by + 8)
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {object} state
 */
export function renderFrame(ctx, state) {
  const {
    map,
    scene,
    rooms,
    player,
    facing,
    activeRoom,
    hint,
    bgImage,
    hero,
    moving,
    time,
    animateProps
  } = state

  ctx.imageSmoothingEnabled = false
  ctx.clearRect(0, 0, map.width, map.height)

  const hasBg = Boolean(bgImage && bgImage.complete && bgImage.naturalWidth)
  if (hasBg) {
    ctx.drawImage(bgImage, 0, 0, map.width, map.height)
  } else if (scene === 'corridor') {
    drawPlaceholderCorridor(ctx, map)
  } else {
    drawPlaceholderLobby(ctx, map)
  }

  // 无底板图时补画吧台；有 lobby-hall.png 时吧台应画在图里，避免叠两层
  if (!hasBg && map.walls && scene === 'lobby') {
    const desk = map.walls.find(w => w.w === 60 && (w.h === 24 || w.h === 28))
    if (desk) {
      ctx.fillStyle = '#504945'
      ctx.fillRect(desk.x, desk.y, desk.w, desk.h)
      ctx.fillStyle = '#ebdbb2'
      ctx.font = '7px monospace'
      ctx.textAlign = 'center'
      ctx.fillText('FRONT DESK', desk.x + desk.w / 2, desk.y + desk.h / 2)
    }
  }

  // 有底板图时默认不叠 props（装饰应画进 PNG）；需闪烁的可在 prop 上标 overlay: true
  const propsToDraw = hasBg
    ? (map.props || []).filter(p => p.overlay)
    : map.props
  drawProps(ctx, propsToDraw, time, animateProps)

  for (const room of rooms) {
    drawDoor(
      ctx,
      room,
      activeRoom && activeRoom.id === room.id,
      hasBg
    )
  }

  // 走廊出口标「出口」
  if (scene === 'corridor') {
    const exit = rooms.find(r => r.id === 'exit')
    if (exit) {
      ctx.fillStyle = activeRoom?.id === 'exit' ? '#fabd2f' : '#8ec07c'
      ctx.font = 'bold 9px monospace'
      ctx.textAlign = 'center'
      ctx.fillText('EXIT', exit.trigger.x + exit.trigger.w / 2, exit.trigger.y - 4)
    }
  }

  const drawn = drawHeroSprite(ctx, hero, player, facing, moving, time)
  if (!drawn) drawHeroFallback(ctx, player, facing)
  drawHint(ctx, map, hint)
}

/**
 * 尝试加载背景；失败则保持 null（走占位绘制）
 */
export function loadOptionalImage(url) {
  return new Promise(resolve => {
    if (!url || typeof Image === 'undefined') {
      resolve(null)
      return
    }
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = url
  })
}
