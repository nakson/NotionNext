import { siteConfig } from '@/lib/config'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import CONFIG from '../../config'
import {
  CATEGORY_CATALOG,
  getCategoryDefByName
} from '../../category/catalog'
import { getCorridorConfig } from './config/corridors'

const PixelWalkMount = dynamic(() => import('./PixelWalkMount'), {
  ssr: false,
  loading: () => (
    <div className='pixel-walk__loading cyber-mono pixel-walk__loading--strip'>
      corridor…
    </div>
  )
})

function resolveCategoryId(def) {
  if (!def) return null
  return (
    Object.entries(CATEGORY_CATALOG).find(([, d]) => d.name === def.name)?.[0] ||
    null
  )
}

function buildCorridor(def) {
  const id = resolveCategoryId(def)
  const cfg = getCorridorConfig(id)
  if (!cfg || !def) return { map: null, rooms: [], title: '' }

  const map = {
    width: cfg.width,
    height: cfg.height,
    spawn: cfg.spawn,
    walls: cfg.walls,
    backgroundUrl: cfg.backgroundUrl,
    tint: cfg.tint,
    floor: cfg.floor,
    props: []
  }

  const rooms = [
    {
      id: 'exit',
      name: '大厅',
      href: '/',
      trigger: cfg.exit,
      label: {
        x: cfg.exit.x + cfg.exit.w / 2,
        y: cfg.exit.y + cfg.exit.h / 2
      }
    }
  ]

  return { map, rooms, title: cfg.label || def.name }
}

/**
 * 分类页顶部长条走廊；左出口回首页
 */
export default function CategoryCorridorStrip({ category }) {
  const enabled = siteConfig('CATEGORY_CORRIDOR_WALK_ENABLE', true, CONFIG)
  const router = useRouter()

  const { map, rooms, title } = useMemo(() => {
    const def = getCategoryDefByName(category)
    return buildCorridor(def)
  }, [category])

  if (!enabled || !map || !rooms.length) return null

  return (
    <section
      className='pixel-walk pixel-walk--corridor mb-4'
      aria-label={`${title || '分类'}走廊`}>
      <div className='pixel-walk__chrome cyber-mono'>
        <span>corridor.walk</span>
        <span className='opacity-60'>{title} · exit ←</span>
      </div>
      <PixelWalkMount
        scene='corridor'
        rooms={rooms}
        map={map}
        onNavigate={href => router.push(href)}
      />
    </section>
  )
}
