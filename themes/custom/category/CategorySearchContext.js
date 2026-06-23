import { useRouter } from 'next/router'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

const CategorySearchContext = createContext(null)

function parseCategoryRoute (router) {
  const { pathname, query } = router
  const categoryRaw = query?.category
  if (!categoryRaw) return null

  const category = decodeURIComponent(String(categoryRaw))

  const isCategoryRoute =
    pathname === '/category/[category]' ||
    pathname === '/category/[category]/page/[page]'
  const isSearchRoute =
    pathname === '/category/[category]/search/[keyword]' ||
    pathname === '/category/[category]/search/[keyword]/page/[page]'

  if (!isCategoryRoute && !isSearchRoute) return null

  const keyword = query?.keyword
    ? decodeURIComponent(String(query.keyword))
    : undefined

  return { category, keyword }
}

export function CategorySearchProvider ({ children }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const routeInfo = parseCategoryRoute(router)

  useEffect(() => {
    setOpen(false)
  }, [router.asPath])

  const categoryPath = routeInfo
    ? `/category/${encodeURIComponent(routeInfo.category)}`
    : ''

  const close = useCallback(() => {
    setOpen(false)
    if (routeInfo?.keyword) {
      router.push(categoryPath)
    }
  }, [routeInfo?.keyword, categoryPath, router])

  const value = useMemo(
    () => ({
      active: Boolean(routeInfo),
      category: routeInfo?.category,
      keyword: routeInfo?.keyword,
      categoryPath,
      open,
      setOpen,
      close
    }),
    [routeInfo, categoryPath, open, close]
  )

  return (
    <CategorySearchContext.Provider value={value}>
      {children}
    </CategorySearchContext.Provider>
  )
}

export function useCategorySearch () {
  return useContext(CategorySearchContext)
}
