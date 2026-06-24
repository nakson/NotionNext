import CONFIG from '../../config'

/**
 * 音乐手记 — 页眉（固定标题「音乐手记」）
 */
export default function MusicNotesHero ({ keyword }) {
  const title = CONFIG.MUSIC_NOTES_CONFIG?.title || '音乐手记'

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
