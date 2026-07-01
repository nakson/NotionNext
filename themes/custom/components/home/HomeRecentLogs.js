import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import { useMemo } from 'react'
import CONFIG from '../../config'
import { getRecentLogs } from '../../utils/homeDashboardData'

/**
 * 首页次级时间线：stdout 风格最近更新（非无限流）
 */
const HomeRecentLogs = ({ homePosts }) => {
  const logCount = siteConfig('HOME_RECENT_LOG_COUNT', 5, CONFIG)

  const logs = useMemo(
    () => getRecentLogs(homePosts, logCount),
    [homePosts, logCount]
  )

  if (!logs.length) {
    return null
  }

  return (
    <section className='home-recent-logs' aria-label='最近更新'>
      <div className='home-recent-logs__chrome cyber-mono'>
        <span>stdout</span>
        <span className='opacity-60'>recent.log</span>
      </div>
      <ul className='home-recent-logs__list'>
        {logs.map((post, index) => (
          <li key={post.id} className='home-recent-logs__item'>
            <span className='home-recent-logs__index cyber-mono'>
              [{String(index + 1).padStart(2, '0')}]
            </span>
            <Link href={post.href} className='home-recent-logs__link'>
              <span className='home-recent-logs__title'>{post.title}</span>
              {post.category && (
                <span className='home-recent-logs__meta cyber-mono'>
                  {post.category}
                  {post.publishDay ? ` · ${post.publishDay}` : ''}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default HomeRecentLogs
