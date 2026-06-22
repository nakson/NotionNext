import { siteConfig } from '@/lib/config'
import { loadExternalResource } from '@/lib/utils'
import { useEffect, useState } from 'react'

/**
 * 首页终端风欢迎区
 */
const Hero = () => {
  const [typed, changeType] = useState()

  const GREETING_WORDS = siteConfig('GREETING_WORDS').split(',')
  useEffect(() => {
    if (!typed && window && document.getElementById('typed')) {
      loadExternalResource('/js/typed.min.js', 'js').then(() => {
        if (window.Typed) {
          changeType(
            new window.Typed('#typed', {
              strings: GREETING_WORDS,
              typeSpeed: 200,
              backSpeed: 100,
              backDelay: 400,
              showCursor: true,
              smartBackspace: true
            })
          )
        }
      })
    }
  }, [])

  return (
    <header
      id='header'
      style={{ zIndex: 1 }}
      className='cyber-hero-terminal w-full relative overflow-hidden mb-6'>
      <div className='cyber-hero-chrome'>
        <span className='tracking-widest'>┌ INIT_SEQUENCE</span>
        <span className='opacity-60'>stdout</span>
      </div>
      <div className='cyber-hero-body'>
        <div className='text-center cyber-mono text-lg md:text-xl min-h-[4rem] flex items-center justify-center px-4'>
          <span id='typed' className='text-[color:var(--accent-primary)]' />
        </div>
      </div>
    </header>
  )
}

export default Hero
