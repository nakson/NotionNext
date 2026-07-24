/**
 * 分类目录（单一真相源）
 * - 稳定 id 不变；改 Notion 分类名时只改对应项的 name / bento
 * - 业务代码请用 CATEGORY.recipe 等，勿散落中文字面量
 *
 * 旧名对照：料理食谱→食味斋，阅读记录→藏书阁，随想录→随想亭，音乐→音律轩
 */

/** Bento 展示顺序（稳定 id） */
export const BENTO_ORDER = [
  'reading',
  'music',
  'essay',
  'recipe',
  'notes',
  'film'
]

/**
 * @typedef {object} CategoryDef
 * @property {string} name Notion 分类名（与 /category/[name] 一致）
 * @property {string} [viewId] 列表专属视图 id
 * @property {string} [articleLayout] 文章详情专属版式
 * @property {string} [searchPlaceholder] 分类内搜索 placeholder
 * @property {boolean} [showArticleCover] 文章页是否显示封面
 * @property {boolean} [coverNatural] 封面是否原图比例（非裁切）
 * @property {{ title: string, description: string }} [bento] 首页 Bento 文案
 */

/** @type {Record<string, CategoryDef>} */
export const CATEGORY_CATALOG = {
  recipe: {
    name: '食味斋',
    viewId: 'fine-dining-menu',
    articleLayout: 'recipe-step',
    searchPlaceholder: '搜索食谱',
    showArticleCover: false,
    bento: { title: '食味斋', description: '厨房实验笔记' }
  },
  reading: {
    name: '藏书阁',
    viewId: 'reading-poster-gallery',
    showArticleCover: true,
    coverNatural: true,
    bento: { title: '藏书阁', description: '书籍摘抄与阅读笔记' }
  },
  essay: {
    name: '随想亭',
    viewId: 'essay-index',
    showArticleCover: false,
    bento: { title: '随想亭', description: '随笔与刹那想法' }
  },
  music: {
    name: '音律轩',
    viewId: 'music-notes',
    showArticleCover: true,
    coverNatural: false,
    bento: { title: '音律轩', description: '原创、歌单与 AI 写歌' }
  },
  notes: {
    name: '札记室',
    viewId: 'essay-index',
    showArticleCover: false,
    bento: { title: '札记室', description: '日常札记与备忘' }
  },
  film: {
    name: '影画廊',
    viewId: 'reading-poster-gallery',
    showArticleCover: true,
    coverNatural: true,
    bento: { title: '影画廊', description: '影视观后与影像笔记' }
  }
}

/** 稳定 id → Notion 分类名，例如 CATEGORY.recipe === '食味斋' */
export const CATEGORY = Object.fromEntries(
  Object.entries(CATEGORY_CATALOG).map(([id, def]) => [id, def.name])
)

function normalizeCategoryName (category) {
  if (!category) return ''
  return decodeURIComponent(String(category)).trim()
}

/** 按 Notion 分类名查定义 */
export function getCategoryDefByName (category) {
  const normalized = normalizeCategoryName(category)
  if (!normalized) return null
  return (
    Object.values(CATEGORY_CATALOG).find(def => def.name === normalized) || null
  )
}

/** 按稳定 id 查定义 */
export function getCategoryDefById (id) {
  return CATEGORY_CATALOG[id] || null
}

export function buildCategoryViewMap () {
  const map = {}
  for (const def of Object.values(CATEGORY_CATALOG)) {
    if (def.viewId) {
      map[def.name] = def.viewId
    }
  }
  return map
}

export function buildArticleLayoutMap () {
  const map = {}
  for (const def of Object.values(CATEGORY_CATALOG)) {
    if (def.articleLayout) {
      map[def.name] = def.articleLayout
    }
  }
  return map
}

export function buildSearchPlaceholderMap () {
  const map = {}
  for (const def of Object.values(CATEGORY_CATALOG)) {
    if (def.searchPlaceholder) {
      map[def.name] = def.searchPlaceholder
    }
  }
  return map
}

/** 首页 Bento 模块列表（顺序见 BENTO_ORDER） */
export function buildHomeBentoModules () {
  return BENTO_ORDER.map(id => {
    const def = CATEGORY_CATALOG[id]
    if (!def?.bento) return null
    return {
      category: def.name,
      title: def.bento.title,
      description: def.bento.description
    }
  }).filter(Boolean)
}

/** 文章页需显示封面的分类名列表 */
export function getCoverCategoryNames () {
  return Object.values(CATEGORY_CATALOG)
    .filter(def => def.showArticleCover)
    .map(def => def.name)
}

export function isRecipeCategory (category) {
  const def = getCategoryDefByName(category)
  return def?.articleLayout === 'recipe-step'
}

export function isNaturalCoverCategory (category) {
  return Boolean(getCategoryDefByName(category)?.coverNatural)
}
