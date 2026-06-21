import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import { useRouter } from 'next/router'
import SocialButton from './SocialButton'
import { useGlobal } from '@/lib/global'
import { useEffect, useState } from 'react'
import { loadExternalResource } from '@/lib/utils'

function SunIcon (props) {
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

function MoonIcon (props) {
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
  const { siteInfo, customMenu } = props
  const router = useRouter()
  const { isDarkMode, toggleDarkMode } = useGlobal()
  const [typedSidebar, setTypedSidebar] = useState()

  const shellHost = (siteConfig('TITLE') || 'blog')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .slice(0, 28) || 'blog'

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
    <aside className='cyber-sidebar-shell md:w-64 md:h-screen md:fixed md:overflow-y-auto flex flex-col py-8 px-4'>
      <div className='mb-6 border-b border-[color:var(--cyber-panel-border)] pb-4'>
        <p className='cyber-mono text-[11px] leading-relaxed text-[color:var(--cyber-term-dim)] mb-3 select-none'>
          <span className='text-[color:var(--cyber-term-fg)]'>guest</span>
          <span className='text-[color:var(--cyber-text-muted)]'>@</span>
          <span className='text-[color:var(--cyber-neon-cyan)]'>{shellHost}</span>
          <span className='text-[color:var(--cyber-text-muted)]'>:~$</span>{' '}
          <span className='opacity-70'>session — ok</span>
        </p>

        <div className='flex items-center justify-between mb-3'>
          <div
            className='flex items-center gap-3 cursor-pointer hover:opacity-85 transition-opacity'
            onClick={() => void router.push('/')}>
            <LazyImage
              src={siteInfo?.icon}
              className='rounded-sm h-10 w-10 object-cover ring-1 ring-[color:var(--cyber-panel-border)]'
              width={40}
              height={40}
              alt={siteConfig('AUTHOR')}
            />
            <h2 className='text-lg md:text-xl font-semibold text-[color:var(--cyber-text)] tracking-tight'>
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
            className='ml-1 p-2 rounded border border-[color:var(--cyber-panel-border)] hover:border-[color:var(--cyber-neon-cyan)] text-[color:var(--cyber-text-muted)] hover:text-[color:var(--cyber-neon-cyan)] transition-colors flex items-center justify-center'>
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        <div className='text-xs text-[color:var(--cyber-text-muted)] leading-relaxed min-h-[2.5rem] cyber-mono'>
          <span id='typed-sidebar' />
        </div>
      </div>

      <nav className='flex-1'>
        <ul className='space-y-1 cyber-mono text-sm'>
          {customMenu?.map(link => {
            if (link.name === 'English') return null

            const selected =
              router.pathname === link.href ||
              decodeURIComponent(router.asPath) === link.href ||
              decodeURIComponent(router.query?.category) ===
                link.href?.replace('/category/', '') ||
              decodeURIComponent(router.query?.category) ===
                link.slug?.replace('/category/', '')

            return (
              <li
                key={link.id}
                className={`rounded border border-transparent transition-colors ${
                  selected
                    ? 'border-[color:var(--cyber-panel-border-strong)] bg-[color:var(--cyber-panel-bg)]'
                    : 'hover:border-[color:var(--cyber-panel-border)] hover:bg-[color:var(--cyber-panel-bg)]'
                }`}>
                <Link
                  href={link.href || '/'}
                  target={link.target}
                  className={`block py-2 px-2 pl-3 ${
                    selected
                      ? 'text-[color:var(--cyber-neon-cyan)] font-semibold'
                      : 'text-[color:var(--cyber-text-muted)] font-medium hover:text-[color:var(--cyber-link-hover)]'
                  }`}>
                  <span className='text-[color:var(--cyber-term-fg)] mr-1 select-none'>
                    {selected ? '▶' : '›'}
                  </span>
                  {link?.pageIcon && (
                    <span className='mr-1.5'>{link?.pageIcon}</span>
                  )}
                  {link?.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className='mt-8 pt-6 border-t border-[color:var(--cyber-panel-border)]'>
        <div className='flex flex-wrap gap-3 mb-4'>
          <SocialButton />
        </div>
        <div className='text-[10px] text-[color:var(--cyber-text-muted)] cyber-mono'>
          © {new Date().getFullYear()} {siteConfig('AUTHOR')}
        </div>
      </div>
    </aside>
  )
}

export default TaniaSideBar
