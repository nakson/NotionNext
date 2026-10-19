import { siteConfig } from '@/lib/config'
import LobbyGameCard from '../pixel-walk/LobbyGameCard'
import Hero from '../Hero'
import CONFIG from '../../config'
import HomeBentoGrid from './HomeBentoGrid'
import HomeRecentLogs from './HomeRecentLogs'

/**
 * Personal OS Dashboard：大厅置顶 → Hero → Bento → 最近日志
 */
const HomeDashboard = ({ homePosts, posts, ...rest }) => {
  // homePosts 为全量已发布文章；无则回退 posts（可能已分页截断）
  const sourcePosts = homePosts?.length ? homePosts : posts
  const showHero = siteConfig('HEXO_HOME_BANNER_ENABLE', null, CONFIG)

  return (
    <div className='home-dashboard pt-2 pb-8 lg:pt-4'>
      <LobbyGameCard />
      {showHero && (
        <Hero homePosts={sourcePosts} posts={posts} {...rest} />
      )}
      <HomeBentoGrid homePosts={sourcePosts} />
      <HomeRecentLogs homePosts={sourcePosts} />
    </div>
  )
}

export default HomeDashboard
