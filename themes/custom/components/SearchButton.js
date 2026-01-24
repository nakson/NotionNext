import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import { useHexoGlobal } from '..'

/**
 * 搜索按钮
 * @returns
 */
export default function SearchButton(props) {
  const { locale } = useGlobal()
  const router = useRouter()
  const { searchModal } = useHexoGlobal()

  function handleSearch() {
    if (siteConfig('ALGOLIA_APP_ID')) {
      searchModal.current.openSearch()
    } else {
      router.push('/search')
    }
  }

  return (
    <>
      <div
        onClick={handleSearch}
        title={locale.NAV.SEARCH}
        alt={locale.NAV.SEARCH}
        className='cursor-pointer dark:text-gray-300 text-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 rounded-lg w-10 h-10 flex justify-center items-center duration-200 transition-all hover:scale-110 floating-button'>
        <i title={locale.NAV.SEARCH} className='fa-solid fa-magnifying-glass' />
      </div>
    </>
  )
}
