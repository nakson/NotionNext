import HomeBentoGrid from './HomeBentoGrid'
import HomeRecentLogs from './HomeRecentLogs'

/**
 * Personal OS Dashboard：Bento 世界观模块 + 次级时间线日志
 */
const HomeDashboard = ({ homePosts, posts }) => {
  // homePosts 为全量已发布文章；无则回退 posts（可能已分页截断）
  const sourcePosts = homePosts?.length ? homePosts : posts

  return (
    <div className='home-dashboard pt-4 pb-8'>
      <HomeBentoGrid homePosts={sourcePosts} />
      <HomeRecentLogs homePosts={sourcePosts} />
    </div>
  )
}

export default HomeDashboard
