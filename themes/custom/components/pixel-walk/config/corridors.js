/**
 * 分类走廊：按 catalog 稳定 id 配色 / 可选背景图
 * 左出口回首页；出生点偏右
 */

const BASE = {
  width: 480,
  height: 80,
  exit: { x: 0, y: 20, w: 36, h: 40 },
  spawn: { x: 400, y: 40 },
  walls: [
    { x: 0, y: 0, w: 480, h: 12 },
    { x: 0, y: 68, w: 480, h: 12 },
    { x: 460, y: 0, w: 20, h: 80 }
  ]
}

/** @type {Record<string, object>} */
export const CORRIDOR_BY_ID = {
  reading: {
    ...BASE,
    tint: '#689d6a',
    floor: '#3c3836',
    backgroundUrl: '/images/pixel-walk/corridor-reading.png',
    label: '藏书阁 · 走廊'
  },
  music: {
    ...BASE,
    tint: '#b16286',
    floor: '#3c3836',
    backgroundUrl: '/images/pixel-walk/corridor-music.png',
    label: '音律轩 · 走廊'
  },
  essay: {
    ...BASE,
    tint: '#83a598',
    floor: '#3c3836',
    backgroundUrl: '/images/pixel-walk/corridor-essay.png',
    label: '随想亭 · 走廊'
  },
  recipe: {
    ...BASE,
    tint: '#fe8019',
    floor: '#3c3836',
    backgroundUrl: '/images/pixel-walk/corridor-recipe.png',
    label: '食味斋 · 走廊'
  },
  notes: {
    ...BASE,
    tint: '#d79921',
    floor: '#3c3836',
    backgroundUrl: '/images/pixel-walk/corridor-notes.png',
    label: '札记室 · 走廊'
  },
  film: {
    ...BASE,
    tint: '#458588',
    floor: '#3c3836',
    backgroundUrl: '/images/pixel-walk/corridor-film.png',
    label: '影画廊 · 走廊'
  }
}

export function getCorridorConfig(categoryId) {
  return CORRIDOR_BY_ID[categoryId] || null
}
