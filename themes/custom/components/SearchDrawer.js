import { Router } from 'next/router'
import { useEffect, useImperativeHandle, useRef } from 'react'
import SearchInput from './SearchInput'

const SearchDrawer = ({ cRef, slot }) => {
  const searchDrawer = useRef()
  const searchInputRef = useRef()
  useImperativeHandle(cRef, () => {
    return {
      show: () => {
        searchDrawer?.current?.classList?.remove('hidden')
        searchInputRef?.current?.focus()
      }
    }
  })
  const hidden = () => {
    searchDrawer?.current?.classList?.add('hidden')
  }

  useEffect(() => {
    const handler = () => hidden()
    Router.events.on('routeChangeComplete', handler)
    return () => Router.events.off('routeChangeComplete', handler)
  }, [])

  return (
    <div id='search-drawer-wrapper' ref={searchDrawer} className='hidden'>
      <div className='flex-col fixed px-5 w-full left-0 top-14 z-40 justify-center'>
        <div className='md:max-w-3xl w-full mx-auto animate__animated animate__faster animate__fadeIn'>
          <div className='rounded-lg border border-[color:var(--cyber-panel-border)] bg-[color:var(--cyber-panel-bg)] p-3 shadow-lg backdrop-blur-xl'>
            <SearchInput cRef={searchInputRef} />
            {slot}
          </div>
        </div>
      </div>

      <div
        id='search-drawer-background'
        onClick={hidden}
        className='cyber-search-backdrop animate__animated animate__faster animate__fadeIn fixed top-0 left-0 z-40 w-full h-full'
      />
    </div>
  )
}

export default SearchDrawer
