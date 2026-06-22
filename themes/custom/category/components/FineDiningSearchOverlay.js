import { isBrowser } from '@/lib/utils'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import SearchInput from '../../components/SearchInput'
import { useFineDiningSearch } from '../FineDiningSearchContext'
import { getCategorySearchPlaceholder } from '../registry'

/**
 * 料理食谱 — 全屏虚化背景 + 居中搜索模态
 */
export default function FineDiningSearchOverlay () {
  const ctx = useFineDiningSearch()
  const inputRef = useRef(null)

  useEffect(() => {
    if (!ctx?.open || !isBrowser) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    inputRef.current?.focus?.()
    return () => {
      document.body.style.overflow = prev
    }
  }, [ctx?.open])

  if (!ctx?.active || !ctx.open || !isBrowser) return null

  const { category, keyword, categoryPath, close } = ctx
  const placeholder = getCategorySearchPlaceholder(category)
  const portalRoot =
    document.getElementById('theme-custom') || document.body

  return createPortal(
    <div
      className='fine-dining-search-overlay'
      role='dialog'
      aria-modal='true'
      aria-label={placeholder}>
      <button
        type='button'
        className='fine-dining-search-backdrop'
        aria-label='关闭搜索'
        onClick={close}
      />
      <div className='fine-dining-search-dialog'>
        <SearchInput
          cRef={inputRef}
          currentSearch={keyword}
          placeholder={placeholder}
          showPrefix={false}
          variant='minimal'
          buildSearchPath={key =>
            `${categoryPath}/search/${encodeURIComponent(key)}`
          }
          emptySearchPath={categoryPath}
          onEscape={close}
        />
      </div>
    </div>,
    portalRoot
  )
}
