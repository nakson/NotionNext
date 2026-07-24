import CONFIG from '../../config'
import { CATEGORY } from '../catalog'

/**
 * 音律轩 — 页眉（标题来自 MUSIC_NOTES_CONFIG / catalog）
 */
export default function MusicNotesHero ({ keyword }) {
  const title = CONFIG.MUSIC_NOTES_CONFIG?.title || CATEGORY.music

  return (
    <header className='music-notes__hero'>
      <h1 className='music-notes__title-heading'>{title}</h1>
      <div className='music-notes__hero-rule' aria-hidden />
      {keyword && (
        <p className='music-notes__search-hint'>搜寻 · {keyword}</p>
      )}
    </header>
  )
}
