import { getCategorySearchPlaceholder } from '../registry'
import { useFineDiningSearch } from '../FineDiningSearchContext'

/**
 * 料理食谱 — 右下角搜索浮钮
 */
export default function FineDiningSearchFloatButton () {
  const ctx = useFineDiningSearch()
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
