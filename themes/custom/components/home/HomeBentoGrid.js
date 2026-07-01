import { siteConfig } from '@/lib/config'
import { useMemo } from 'react'
import CONFIG from '../../config'
import { buildCategoryTileData } from '../../utils/homeDashboardData'
import HomeCategoryTile from './HomeCategoryTile'

/**
 * 首页 Bento 网格：固定曝光世界观分类模块
 */
const HomeBentoGrid = ({ homePosts }) => {
  const modules = siteConfig('HOME_BENTO_MODULES', null, CONFIG)

  const tiles = useMemo(
    () => buildCategoryTileData(modules, homePosts),
    [modules, homePosts]
  )

  if (!tiles.length) {
    return null
  }

  return (
    <section className='home-bento' aria-label='世界观模块'>
      <div className='home-bento__chrome cyber-mono'>
        <span>modules</span>
        <span className='opacity-60'>bento.grid</span>
      </div>
      <div className='home-bento__grid'>
        {tiles.map(tile => (
          <HomeCategoryTile key={tile.category} tile={tile} />
        ))}
      </div>
    </section>
  )
}

export default HomeBentoGrid
