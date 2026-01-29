import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import { useRouter } from 'next/router'
import SocialButton from './SocialButton'
import { useGlobal } from '@/lib/global'
import { useEffect, useState } from 'react'
import { loadExternalResource } from '@/lib/utils'

// Minimal sun icon (stroke only)
function SunIcon(props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='w-5 h-5'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={1.5}
      aria-hidden='true'
      {...props}>
      <circle cx='12' cy='12' r='5' />
      <path d='M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42' />
    </svg>
  )
}

// Minimal moon icon (stroke only)
function MoonIcon(props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='w-5 h-5'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={1.5}
      aria-hidden='true'
      {...props}>
      <path d='M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z' />
    </svg>
  )
}

const TaniaSideBar = props => {
  const { siteInfo, notices, customMenu } = props
  const router = useRouter()
  const { theme, isDarkMode, toggleDarkMode } = useGlobal()
  const [typedSidebar, setTypedSidebar] = useState()

  useEffect(() => {
    if (
      !typedSidebar &&
      typeof window !== 'undefined' &&
      document.getElementById('typed-sidebar')
    ) {
      loadExternalResource('/js/typed.min.js', 'js').then(() => {
        if (window.Typed) {
          setTypedSidebar(
            new window.Typed('#typed-sidebar', {
              strings: siteConfig('GREETING_WORDS').split(','),
              typeSpeed: 60,
              backSpeed: 40,
              backDelay: 1500,
              showCursor: true,
              smartBackspace: true,
              cursorChar: '|'
            })
          )
        }
      })
    }

    return () => {
      if (typedSidebar && typedSidebar.destroy) typedSidebar.destroy()
    }
  }, [typedSidebar])

  return (
    <aside className='md:w-64 md:h-screen md:fixed md:overflow-y-auto flex flex-col py-8 px-4 border-r border-[#333]'>
      {/* Profile */}
      <div className='mb-8 border-b border-gray-700'>
        <div className='flex items-center justify-between mb-4'>
          <div
            className='flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity'
            onClick={() => void router.push('/')}>
            <LazyImage
              src={siteInfo?.icon}
              className='rounded-full h-10 w-10 object-cover'
              width={40}
              height={40}
              alt={siteConfig('AUTHOR')}
            />
            <h2 className='text-xl md:text-2xl font-bold dark:text-gray-100 text-gray-900 tracking-tight'>
              {siteConfig('AUTHOR')}
            </h2>
          </div>

          <button
            aria-label='Toggle theme'
            title='Toggle theme'
            onClick={e => {
              e.stopPropagation()
              toggleDarkMode()
            }}
            className='ml-1 p-2 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors flex items-center justify-center'>
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        {/* <p className='text-sm text-gray-400 leading-relaxed mb-2'>
          {siteConfig('BIO')}
        </p> */}

        <div className='text-sm text-gray-400 leading-relaxed mb-6'>
          <span id='typed-sidebar' />
        </div>
      </div>

      {/* Navigation */}
      <nav className='flex-1'>
        <ul className='space-y-3 font-medium'>
          {/* Custom Menu */}
          {customMenu?.map(link => {
            if (link.name === 'English') return null // hide English link

            const selected =
              router.pathname === link.href ||
              router.asPath === link.href ||
              decodeURIComponent(router.query?.category) ===
                link.href?.replace('/category/', '') ||
              decodeURIComponent(router.query?.category) ===
                link.slug?.replace('/category/', '')

            console.log('>>> link', link, router, selected)
            return (
              <li
                key={link.id}
                className={`rounded-md transition-colors ${selected ? 'active bg-black/10 dark:bg-white/10' : 'hover:bg-black/10 dark:hover:bg-white/10'}`}>
                <Link
                  href={link.href || '/'}
                  target={link.target}
                  className={`block py-1 px-3 text-base ${selected ? '!font-bold !text-gray-900 dark:!text-gray-100' : '!font-medium !text-gray-700 dark:!text-gray-300'}`}>
                  {/* {link?.icon && <i className={link?.icon + ' mr-3'} />} */}
                  {link?.pageIcon && (
                    <span className='mr-2'>{link?.pageIcon}</span>
                  )}
                  {link?.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer/Social */}
      <div className='mt-8 pt-6 border-t border-gray-700'>
        <div className='flex flex-wrap gap-4 mb-4'>
          <SocialButton />
        </div>
        <div className='text-xs text-gray-500'>
          © {new Date().getFullYear()} {siteConfig('AUTHOR')}
        </div>
      </div>
    </aside>
  )
}

export default TaniaSideBar
