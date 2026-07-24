import CONFIG from '../config'
import {
  buildArticleLayoutMap,
  buildCategoryViewMap,
  buildSearchPlaceholderMap,
  CATEGORY_CATALOG
} from './catalog'

/**
 * 分类专属视图注册表
 * - key: Notion 分类名（与 /category/[name] 一致）
 * - value: viewId，对应 category/views/ 下的实现
 *
 * 未注册的分类走 default，保持现有列表 UI。
 */
const BUILTIN_CATEGORY_VIEW_MAP = buildCategoryViewMap()

/** 已知分类名（来自 catalog） */
export const KNOWN_CATEGORIES = Object.values(CATEGORY_CATALOG).map(
  def => def.name
)

/** 分类内搜索 placeholder（可扩展至 config.CATEGORY_SEARCH_CONFIG） */
const BUILTIN_CATEGORY_SEARCH_PLACEHOLDER = buildSearchPlaceholderMap()

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

/** 文章详情页专属版式（分类名 → layoutId） */
const BUILTIN_ARTICLE_LAYOUT_MAP = buildArticleLayoutMap()

/**
 * @param {string | undefined | null} category
 * @returns {'default' | 'recipe-step' | string}
 */
export function resolveArticleLayoutId (category) {
  if (!category) return 'default'
  const normalized = decodeURIComponent(String(category)).trim()
  const fromConfig = CONFIG.ARTICLE_LAYOUT_MAP?.[normalized]
  const fromBuiltin = BUILTIN_ARTICLE_LAYOUT_MAP[normalized]
  return fromConfig || fromBuiltin || 'default'
}

export function hasCustomArticleLayout (category) {
  return resolveArticleLayoutId(category) !== 'default'
}
