/**
 * 大厅逻辑坐标（占位期）
 * 你导出 lobby-hall.png（320×180）放到 public/images/pixel-walk/ 后，
 * 按图微调 walls / LOBBY_DOORS 即可；有图时引擎自动用底板，无图时走色块占位。
 */

export const LOBBY_MAP = {
  width: 320,
  height: 180,
  // 出生点勿与 desk 重叠
  spawn: { x: 160, y: 128 },
  backgroundUrl: '/images/pixel-walk/lobby-hall.png',
  walls: [
    { x: 0, y: 0, w: 320, h: 18 },
    { x: 0, y: 162, w: 320, h: 18 },
    { x: 0, y: 0, w: 14, h: 180 },
    { x: 306, y: 0, w: 14, h: 180 },
    // 中央吧台占位
    { x: 130, y: 70, w: 60, h: 24 }
  ],
  props: [
    {
      id: 'vending',
      kind: 'vending',
      overlay: true,
      x: 44,
      y: 68,
      w: 32,
      h: 42,
      fps: 3,
      colors: ['#e8a838', '#fabd2f', '#83a598', '#fe8019']
    },
    {
      id: 'lamp-l',
      kind: 'lamp',
      overlay: true,
      x: 88,
      y: 88,
      w: 10,
      h: 18,
      fps: 2,
      colors: ['#fabd2f', '#fe8019', '#d79921']
    },
    {
      id: 'lamp-r',
      kind: 'lamp',
      overlay: true,
      x: 222,
      y: 88,
      w: 10,
      h: 18,
      fps: 2,
      colors: ['#fabd2f', '#d79921', '#fe8019']
    },
    {
      id: 'neon',
      kind: 'neon',
      overlay: true,
      x: 248,
      y: 34,
      w: 40,
      h: 10,
      fps: 5,
      colors: ['#83a598', '#8ec07c', '#458588', '#83a598']
    },
    {
      id: 'plant',
      kind: 'plant',
      x: 268,
      y: 100,
      w: 16,
      h: 16
    }
  ]
}

/** 上三门 / 下三门；导出真图后按门洞位置改 trigger */
export const LOBBY_DOORS = {
  reading: {
    trigger: { x: 36, y: 14, w: 56, h: 22 },
    label: { x: 64, y: 28 }
  },
  music: {
    trigger: { x: 132, y: 14, w: 56, h: 22 },
    label: { x: 160, y: 28 }
  },
  essay: {
    trigger: { x: 228, y: 14, w: 56, h: 22 },
    label: { x: 256, y: 28 }
  },
  recipe: {
    trigger: { x: 36, y: 148, w: 56, h: 22 },
    label: { x: 64, y: 158 }
  },
  notes: {
    trigger: { x: 132, y: 148, w: 56, h: 22 },
    label: { x: 160, y: 158 }
  },
  film: {
    trigger: { x: 228, y: 148, w: 56, h: 22 },
    label: { x: 256, y: 158 }
  }
}
