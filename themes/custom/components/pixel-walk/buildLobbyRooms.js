import { BENTO_ORDER, CATEGORY_CATALOG } from '../../category/catalog'
import { LOBBY_DOORS } from './config/lobbyMap'

/**
 * catalog → 大厅房间列表（含门区与跳转 href）
 */
export function buildLobbyRooms() {
  return BENTO_ORDER.map(id => {
    const def = CATEGORY_CATALOG[id]
    const door = LOBBY_DOORS[id]
    if (!def || !door) return null
    return {
      id,
      name: def.name,
      href: `/category/${encodeURIComponent(def.name)}`,
      trigger: door.trigger,
      label: door.label
    }
  }).filter(Boolean)
}
