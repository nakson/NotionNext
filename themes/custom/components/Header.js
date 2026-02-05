import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import CONFIG from '../config'
import ButtonRandomPost from './ButtonRandomPost'
import CategoryGroup from './CategoryGroup'
import Logo from './Logo'
import { MenuListTop } from './MenuListTop'
import SearchButton from './SearchButton'
import SearchDrawer from './SearchDrawer'
import SideBar from './SideBar'
import SideBarDrawer from './SideBarDrawer'
import TagGroups from './TagGroups'

let windowTop = 0

/**
 * 顶部导航
 * @param {*} param0
 * @returns
 */
const Header = props => {
  const searchDrawer = useRef()
  const { tags, currentTag, categories, currentCategory } = props
  const { locale } = useGlobal()
  const router = useRouter()
  const [isOpen, changeShow] = useState(false)
  const showSearchButton = siteConfig('HEXO_MENU_SEARCH', false, CONFIG)
  const showRandomButton = siteConfig('HEXO_MENU_RANDOM', false, CONFIG)

  const toggleMenuOpen = () => {
    changeShow(!isOpen)
  }

  const toggleSideBarClose = () => {
    changeShow(false)
  }

  // 监听滚动
  useEffect(() => {
    window.addEventListener('scroll', topNavStyleHandler)
    router.events.on('routeChangeComplete', topNavStyleHandler)
    topNavStyleHandler()
    return () => {
      router.events.off('routeChangeComplete', topNavStyleHandler)
      window.removeEventListener('scroll', topNavStyleHandler)
    }
  }, [])

  const throttleMs = 200

  const topNavStyleHandler = useCallback(
    throttle(() => {
      const scrollS = window.scrollY
      const nav = document.querySelector('#sticky-nav')
      const header = document.querySelector('#header')
      const scrollInHeader =
        header && (scrollS < 10 || scrollS < header?.clientHeight - 50)

      if (scrollInHeader) {
        nav &&
          nav.classList.remove(
            'bg-white/30',
            'backdrop-blur-md',
            'dark:bg-slate-900/30',
            'border-b',
            'border-slate-50',
            'dark:border-slate-900'
          )
        nav && nav.classList.add('bg-transparent', 'border-transparent')
      } else {
        nav && nav.classList.remove('bg-transparent', 'border-transparent')
        nav &&
          nav.classList.add(
            'bg-white/30',
            'backdrop-blur-md',
            'dark:bg-slate-900/30',
            'border-b',
            'border-slate-50',
            'dark:border-slate-900'
          )
      }

      if (scrollInHeader) {
        nav && nav.classList.replace('text-slate-800', 'text-black') // Assuming original was black/white change, keeping it simple for now or maybe just keep text consistent?
        // Actually for docs style, text color usually stays consistent (dark) unless header is over a dark Hero.
        // Let's assume consistent text color for docs style as it's cleaner.
        // But if there is a Hero image, white text might be needed.
        // Let's keep it simple: always dark text unless we know for sure there is a hero image behind.
        // For now, I'll comment out color toggling to keep it consistent minimalist Slate color.
        nav && nav.classList.remove('text-white')
        nav && nav.classList.add('text-slate-800', 'dark:text-slate-200')
      } else {
        nav && nav.classList.remove('text-white')
        nav && nav.classList.add('text-slate-800', 'dark:text-slate-200')
      }

      const showNav =
        scrollS <= windowTop ||
        scrollS < 5 ||
        (header && scrollS <= header.clientHeight + 100)
      if (!showNav) {
        nav && nav.classList.replace('top-0', '-top-20')
        windowTop = scrollS
      } else {
        nav && nav.classList.replace('-top-20', 'top-0')
        windowTop = scrollS
      }
    }, throttleMs)
  )

  const searchDrawerSlot = (
    <>
      {categories && (
        <section className='mt-8'>
          <div className='text-sm flex flex-nowrap justify-between font-light px-2'>
            <div className='text-gray-600 dark:text-gray-200'>
              <i className='mr-2 fas fa-th-list' />
              {locale.COMMON.CATEGORY}
            </div>
            <Link
              href={'/category'}
              passHref
              className='mb-3 text-gray-400 hover:text-black dark:text-gray-400 dark:hover:text-white hover:underline cursor-pointer'>
              {locale.COMMON.MORE} <i className='fas fa-angle-double-right' />
            </Link>
          </div>
          <CategoryGroup
            currentCategory={currentCategory}
            categories={categories}
          />
        </section>
      )}

      {tags && (
        <section className='mt-4'>
          <div className='text-sm py-2 px-2 flex flex-nowrap justify-between font-light dark:text-gray-200'>
            <div className='text-gray-600 dark:text-gray-200'>
              <i className='mr-2 fas fa-tag' />
              {locale.COMMON.TAGS}
            </div>
            <Link
              href={'/tag'}
              passHref
              className='text-gray-400 hover:text-black  dark:hover:text-white hover:underline cursor-pointer'>
              {locale.COMMON.MORE} <i className='fas fa-angle-double-right' />
            </Link>
          </div>
          <div className='p-2'>
            <TagGroups tags={tags} currentTag={currentTag} />
          </div>
        </section>
      )}
    </>
  )

  return (
    <div id='top-nav' className='z-40'>
      <SearchDrawer cRef={searchDrawer} slot={searchDrawerSlot} />

      {/* 导航栏 - 现代毛玻璃设计 */}
      <div
        id='sticky-nav'
        className={
          'top-0 duration-300 transition-all fixed bg-transparent text-slate-800 dark:text-slate-200 w-full z-20 transform border-b border-transparent'
        }>
        <div className='w-full flex justify-between items-center px-6 py-4 max-w-8xl mx-auto'>
          <div className='flex items-center'>
            <Logo {...props} />
          </div>

          {/* 右侧功能 */}
          <div className='flex justify-end items-center gap-4'>
            <div className='hidden lg:flex'>
              {' '}
              <MenuListTop {...props} />
            </div>
            <div
              onClick={toggleMenuOpen}
              className='w-8 justify-center items-center h-8 cursor-pointer flex lg:hidden hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200'>
              {isOpen ? (
                <i className='fas fa-times text-lg' />
              ) : (
                <i className='fas fa-bars text-lg' />
              )}
            </div>
            {showSearchButton && <SearchButton />}
            {showRandomButton && <ButtonRandomPost {...props} />}
          </div>
        </div>
      </div>

      {/* 折叠侧边栏 */}
      <SideBarDrawer isOpen={isOpen} onClose={toggleSideBarClose}>
        <SideBar {...props} />
      </SideBarDrawer>
    </div>
  )
}

export default Header
