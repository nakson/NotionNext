import { useRouter } from 'next/router'
import { useImperativeHandle, useRef, useState } from 'react'
import { useGlobal } from '@/lib/global'
let lock = false

const SearchInput = props => {
  const { currentSearch, cRef, className } = props
  const [onLoading, setLoadingState] = useState(false)
  const router = useRouter()
  const searchInputRef = useRef()
  const { locale } = useGlobal()
  useImperativeHandle(cRef, () => {
    return {
      focus: () => {
        searchInputRef?.current?.focus()
      }
    }
  })

  const handleSearch = () => {
    const key = searchInputRef.current.value
    if (key && key !== '') {
      setLoadingState(true)
      router.push({ pathname: '/search/' + key }).then(r => {
        setLoadingState(false)
      })
    } else {
      router.push({ pathname: '/' }).then(r => {})
    }
  }
  const handleKeyUp = e => {
    if (e.keyCode === 13) {
      handleSearch(searchInputRef.current.value)
    } else if (e.keyCode === 27) {
      cleanSearch()
    }
  }
  const cleanSearch = () => {
    searchInputRef.current.value = ''
  }

  const [showClean, setShowClean] = useState(false)
  const updateSearchKey = val => {
    if (lock) {
      return
    }
    searchInputRef.current.value = val

    if (val) {
      setShowClean(true)
    } else {
      setShowClean(false)
    }
  }
  function lockSearchInput () {
    lock = true
  }

  function unLockSearchInput () {
    lock = false
  }

  return (
    <div className={'cyber-search-input-wrap flex w-full items-stretch ' + (className || '')}>
      <span
        className='pl-3 flex items-center text-[color:var(--cyber-term-fg)] cyber-mono text-sm select-none shrink-0'
        aria-hidden>
        &gt;
      </span>
      <input
        ref={searchInputRef}
        type='text'
        className='outline-none flex-1 text-sm py-2.5 pr-2 min-w-0 leading-normal'
        onKeyUp={handleKeyUp}
        onCompositionStart={lockSearchInput}
        onCompositionUpdate={lockSearchInput}
        onCompositionEnd={unLockSearchInput}
        placeholder={locale.SEARCH.ARTICLES}
        onChange={e => updateSearchKey(e.target.value)}
        defaultValue={currentSearch || ''}
      />

      <div
        className='shrink-0 px-3 cursor-pointer flex items-center justify-center'
        onClick={handleSearch}>
        <i
          className={`hover:text-[color:var(--cyber-neon-cyan)] transform duration-200 text-[color:var(--cyber-text-muted)] cursor-pointer fas ${
            onLoading ? 'fa-spinner animate-spin' : 'fa-search'
          }`}
        />
      </div>

      {showClean && (
        <div className='shrink-0 pr-2 flex items-center justify-center'>
          <i
            className='hover:text-[color:var(--cyber-neon-cyan)] transform duration-200 text-[color:var(--cyber-text-muted)] cursor-pointer fas fa-times'
            onClick={cleanSearch}
          />
        </div>
      )}
    </div>
  )
}

export default SearchInput
