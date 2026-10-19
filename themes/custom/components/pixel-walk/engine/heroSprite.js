import { HERO_FRAME, HERO_LAYERS } from '../config/hero'

function loadImage(url) {
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

/**
 * 加载分层 Idle/Walk 表；任一层失败则该层跳过
 * @returns {Promise<{ layers: object[], ready: boolean }>}
 */
export async function loadHeroSprite() {
  const layers = []
  await Promise.all(
    HERO_LAYERS.map(async def => {
      const [idle, walk] = await Promise.all([
        loadImage(def.idle),
        loadImage(def.walk)
      ])
      if (idle || walk) {
        layers.push({ id: def.id, idle, walk })
      }
    })
  )
  // 保持配置顺序
  const order = HERO_LAYERS.map(l => l.id)
  layers.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id))
  return { layers, ready: layers.length > 0 }
}

/**
 * 绘制角色（逻辑坐标，以碰撞盒中心对齐精灵中心偏下）
 */
export function drawHeroSprite(ctx, hero, player, facing, moving, time) {
  if (!hero?.ready || !hero.layers?.length) return false

  const { w: fw, h: fh, count, walkFps, idleFps } = HERO_FRAME
  const fps = moving ? walkFps : idleFps
  const frame = Math.floor(time * fps) % count
  const flip = facing === 'left'
  const sx = frame * fw

  // 脚底对齐碰撞盒底边，略放大到地图可读尺寸
  const drawW = 24
  const drawH = 24
  const cx = player.x + player.w / 2
  const cy = player.y + player.h - 2

  ctx.save()
  ctx.imageSmoothingEnabled = false
  ctx.translate(cx, cy)
  if (flip) ctx.scale(-1, 1)

  for (const layer of hero.layers) {
    const img = moving ? layer.walk || layer.idle : layer.idle || layer.walk
    if (!img || !img.complete || !img.naturalWidth) continue
    ctx.drawImage(
      img,
      sx,
      0,
      fw,
      fh,
      -drawW / 2,
      -drawH + 2,
      drawW,
      drawH
    )
  }

  ctx.restore()
  return true
}
