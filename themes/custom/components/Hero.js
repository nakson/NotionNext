import { siteConfig } from '@/lib/config'
import { loadExternalResource } from '@/lib/utils'
import { useEffect, useMemo, useState } from 'react'
import { buildHomeSystemStatus } from '../utils/homeDashboardData'
import HomeAgentCommand from './home/HomeAgentCommand'

/**
 * 首页终端风欢迎区：问候语 + 系统状态 + Agent 命令框占位
 */
const Hero = ({ homePosts, posts }) => {
  const [typed, changeType] = useState()

  const sourcePosts = homePosts?.length ? homePosts : posts
  const status = useMemo(
    () => buildHomeSystemStatus(sourcePosts || []),
    [sourcePosts]
  )

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

        {/* 系统状态：由装饰文案变为可读指标 */}
        <div className='cyber-hero-status cyber-mono'>
          <span className='cyber-hero-status__line'>
            posts.total = {status.totalPosts}
          </span>
          <span className='cyber-hero-status__line'>
            month.delta = +{status.monthUpdates}
          </span>
          {status.latestReading && (
            <span className='cyber-hero-status__line cyber-hero-status__line--reading'>
              reading.latest = {status.latestReading.title}
            </span>
          )}
        </div>

        <HomeAgentCommand />
      </div>
    </header>
  )
}

export default Hero
