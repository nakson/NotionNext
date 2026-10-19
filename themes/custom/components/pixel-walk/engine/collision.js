/** AABB：矩形是否重叠 */
export function rectsOverlap(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  )
}

/** 点是否在矩形内 */
export function pointInRect(px, py, r) {
  return px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h
}

function overlapArea(a, b) {
  const w = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x))
  const h = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y))
  return w * h
}

function totalOverlap(box, walls) {
  return walls.reduce((sum, w) => sum + overlapArea(box, w), 0)
}

/**
 * 尝试沿轴移动；撞墙则该轴位移为 0。
 * 若已卡在墙内，允许减小重叠的挤出位移。
 */
export function moveWithCollision(box, dx, dy, walls = []) {
  const before = totalOverlap(box, walls)

  let next = { ...box, x: box.x + dx }
  const afterX = totalOverlap(next, walls)
  // 无重叠→有重叠：挡；已重叠则仅接受重叠变小的位移
  if (afterX > 0 && !(before > 0 && afterX < before)) {
    next.x = box.x
  }

  const mid = { ...next }
  next = { ...next, y: next.y + dy }
  const afterY = totalOverlap(next, walls)
  const midOverlap = totalOverlap(mid, walls)
  if (afterY > 0 && !(midOverlap > 0 && afterY < midOverlap)) {
    next.y = mid.y
  }

  return { x: next.x, y: next.y }
}

/** 命中的第一个 trigger 房间 */
export function findRoomAt(box, rooms = []) {
  for (const room of rooms) {
    if (room.trigger && rectsOverlap(box, room.trigger)) {
      return room
    }
  }
  return null
}

/** 点击命中的门/出口（触屏用中心点） */
export function findRoomAtPoint(px, py, rooms = []) {
  for (const room of rooms) {
    if (room.trigger && pointInRect(px, py, room.trigger)) {
      return room
    }
  }
  return null
}
