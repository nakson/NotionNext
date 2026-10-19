import { siteConfig } from '@/lib/config'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import CONFIG from '../../config'
import { buildLobbyRooms } from './buildLobbyRooms'
import { LOBBY_MAP } from './config/lobbyMap'

const PixelWalkMount = dynamic(() => import('./PixelWalkMount'), {
  ssr: false,
  loading: () => (
    <div className='pixel-walk__loading cyber-mono'>booting lobby…</div>
  )
})

/**
 * 首页酒店大厅卡片
 */
export default function LobbyGameCard() {
  const enabled = siteConfig('HOME_LOBBY_GAME_ENABLE', true, CONFIG)
  const router = useRouter()
  const rooms = useMemo(() => buildLobbyRooms(), [])

  if (!enabled || !rooms.length) return null

  return (
    <section className='pixel-walk pixel-walk--lobby mb-6' aria-label='像素大厅导航'>
      <div className='pixel-walk__chrome cyber-mono'>
        <span>lobby.hall</span>
        <span className='opacity-60'>wasd · e · tap door</span>
      </div>
      <PixelWalkMount
        scene='lobby'
        rooms={rooms}
        map={LOBBY_MAP}
        onNavigate={href => router.push(href)}
      />
      <ul className='pixel-walk__a11y-links cyber-mono'>
        {rooms.map(r => (
          <li key={r.id}>
            <Link href={r.href}>{r.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
