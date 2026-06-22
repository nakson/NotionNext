import Link from 'next/link'
import { useRouter } from 'next/router'

/**
 * 数字翻页插件
 * @param page 当前页码
 * @param showNext 是否有下一页
 * @returns {JSX.Element}
 * @constructor
 */
const PaginationNumber = ({ page, totalPage }) => {
  const router = useRouter()
  const currentPage = +page
  const showNext = page < totalPage
  const pagePrefix = router.asPath
    .split('?')[0]
    .replace(/\/page\/[1-9]\d*/, '')
    .replace(/\/$/, '')
    .replace('.html', '')
  const pages = generatePages(pagePrefix, page, currentPage, totalPage)

  const navBtnClass =
    'px-3 py-2 rounded-lg text-[color:var(--cyber-text-muted)] hover:text-[color:var(--link-hover)] hover:bg-[color:var(--glass-fill)] text-center cursor-pointer duration-200 transition-all'

  return (
    <div className='mt-10 mb-5 flex justify-center items-center font-semibold text-[color:var(--cyber-text-muted)] duration-300 py-4 space-x-1'>
      <Link
        href={{
          pathname:
            currentPage === 2
              ? `${pagePrefix}/`
              : `${pagePrefix}/page/${currentPage - 1}`,
          query: router.query.s ? { s: router.query.s } : {}
        }}
        rel='prev'
        className={`${currentPage === 1 ? 'invisible' : 'block'} ${navBtnClass}`}>
        <i className='fas fa-chevron-left' />
      </Link>

      {pages}

      <Link
        href={{
          pathname: `${pagePrefix}/page/${currentPage + 1}`,
          query: router.query.s ? { s: router.query.s } : {}
        }}
        rel='next'
        className={`${+showNext ? 'block' : 'invisible'} ${navBtnClass}`}>
        <i className='fas fa-chevron-right' />
      </Link>
    </div>
  )
}

function getPageElement(page, currentPage, pagePrefix) {
  const selected = page + '' === currentPage + ''
  return (
    <Link
      href={page === 1 ? `${pagePrefix}/` : `${pagePrefix}/page/${page}`}
      key={page}
      passHref
      className={`${
        selected
          ? 'font-bold text-[color:var(--accent-primary)] bg-[color:var(--glass-fill)]'
          : 'border-b border-[color:var(--link)] text-[color:var(--link)] hover:text-[color:var(--link-hover)] hover:border-[color:var(--link-hover)]'
      } duration-200 cursor-pointer pb-0.5 w-6 text-center rounded-sm no-underline-hover`}>
      {page}
    </Link>
  )
}

function generatePages(pagePrefix, page, currentPage, totalPage) {
  const pages = []
  const groupCount = 7
  if (totalPage <= groupCount) {
    for (let i = 1; i <= totalPage; i++) {
      pages.push(getPageElement(i, page, pagePrefix))
    }
  } else {
    pages.push(getPageElement(1, page, pagePrefix))
    const dynamicGroupCount = groupCount - 2
    let startPage = currentPage - 2
    if (startPage <= 1) {
      startPage = 2
    }
    if (startPage + dynamicGroupCount > totalPage) {
      startPage = totalPage - dynamicGroupCount
    }
    if (startPage > 2) {
      pages.push(<div key={-1}>... </div>)
    }

    for (let i = 0; i < dynamicGroupCount; i++) {
      if (startPage + i < totalPage) {
        pages.push(getPageElement(startPage + i, page, pagePrefix))
      }
    }

    if (startPage + dynamicGroupCount < totalPage) {
      pages.push(<div key={-2}>... </div>)
    }

    pages.push(getPageElement(totalPage, page, pagePrefix))
  }
  return pages
}
export default PaginationNumber
