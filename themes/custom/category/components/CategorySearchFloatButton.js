import { getCategorySearchPlaceholder } from '../registry'
import { useCategorySearch } from '../CategorySearchContext'

/**
 * 分类页 — 右下角搜索浮钮（所有 category 通用）
 */
export default function CategorySearchFloatButton () {
  const ctx = useCategorySearch()
  if (!ctx?.active) return null

  const placeholder = getCategorySearchPlaceholder(ctx.category)

  return (
    <button
      type='button'
      className='cyber-float-btn cyber-mono'
      aria-label={placeholder}
      aria-expanded={ctx.open}
      onClick={() => ctx.setOpen(true)}>
      <i className='fas fa-search text-sm' aria-hidden />
    </button>
  )
}
