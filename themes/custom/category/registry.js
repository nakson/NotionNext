import CONFIG from '../config'

/**
 * 分类专属视图注册表
 * - key: Notion 分类名（与 /category/[name] 一致）
 * - value: viewId，对应 category/views/ 下的实现
 *
 * 未注册的分类走 default，保持现有列表 UI。
 */
const BUILTIN_CATEGORY_VIEW_MAP = {
  料理食谱: 'fine-dining-menu',
  随想录: 'essay-index',
  阅读记录: 'reading-poster-gallery',
  音乐: 'music-notes'
}

/** 预留：后续可在此登记固定分类，便于检索与文档化 */
export const KNOWN_CATEGORIES = Object.keys(BUILTIN_CATEGORY_VIEW_MAP)

/** 分类内搜索 placeholder（可扩展至 config.CATEGORY_SEARCH_CONFIG） */
const BUILTIN_CATEGORY_SEARCH_PLACEHOLDER = {
  料理食谱: '搜索食谱'
}

export function getCategorySearchPlaceholder (category) {
  const normalized = decodeURIComponent(String(category || '')).trim()
  if (!normalized) return '搜索'
  return (
    CONFIG.CATEGORY_SEARCH_CONFIG?.[normalized] ||
    BUILTIN_CATEGORY_SEARCH_PLACEHOLDER[normalized] ||
    `搜索${normalized}`
  )
}

/**
 * @param {string | undefined | null} category
 * @returns {'default' | 'fine-dining-menu' | string}
 */
export function resolveCategoryViewId (category) {
  if (!category) return 'default'
  const normalized = decodeURIComponent(String(category)).trim()
  const fromConfig = CONFIG.CATEGORY_VIEW_MAP?.[normalized]
  const fromBuiltin = BUILTIN_CATEGORY_VIEW_MAP[normalized]
  return fromConfig || fromBuiltin || 'default'
}

export function hasCustomCategoryView (category) {
  return resolveCategoryViewId(category) !== 'default'
}
