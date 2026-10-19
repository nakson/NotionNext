/**
 * Dagon「Top-Down Character Animations」分层精灵
 * 每张表：4 帧 × 48×48，横向排列；默认朝下，左右用水平翻转
 */

const ROOT =
  '/images/pixel-walk/Top-Down_Character_Animations/Sprites'

/** 路径含空格，需 encodeURI */
function sheet(relPath) {
  return encodeURI(`${ROOT}/${relPath}`)
}

export const HERO_FRAME = {
  w: 48,
  h: 48,
  count: 4,
  /** 走路/待机切帧速度 */
  walkFps: 8,
  idleFps: 4
}

/**
 * 绘制顺序：后手 → 身体 → 头 → 发 → 前手 → 草帽（无外套）
 * 可改 hair / hat 换造型
 */
export const HERO_LAYERS = [
  {
    id: 'handBack',
    idle: sheet('Base Body/Hand Back/Hand Back-Idle.png'),
    walk: sheet('Base Body/Hand Back/Hand Back-Walk.png')
  },
  {
    id: 'body',
    idle: sheet('Base Body/Body/Body-Idle.png'),
    walk: sheet('Base Body/Body/Body-Walk.png')
  },
  {
    id: 'head',
    idle: sheet('Base Body/Head/Head-Idle.png'),
    walk: sheet('Base Body/Head/Head-Walk.png')
  },
  {
    id: 'hair',
    idle: sheet('Accessories/Male Hair/Brown/Male Hair-Idle.png'),
    walk: sheet('Accessories/Male Hair/Brown/Male Hair-Walk.png')
  },
  {
    id: 'handFront',
    idle: sheet('Base Body/Hand Front/Hand Front-Idle.png'),
    walk: sheet('Base Body/Hand Front/Hand Front-Walk.png')
  },
  {
    id: 'hat',
    idle: sheet('Accessories/Straw Hat/Straw Hat-Idle.png'),
    walk: sheet('Accessories/Straw Hat/Straw Hat-Walk.png')
  }
]
