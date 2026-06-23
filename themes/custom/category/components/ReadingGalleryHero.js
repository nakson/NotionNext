/**
 * 阅读记录 — 极简页眉
 */
export default function ReadingGalleryHero ({ category, keyword }) {
  return (
    <header className='reading-gallery__hero'>
      <h1 className='reading-gallery__title-heading'>{category}</h1>
      <div className='reading-gallery__hero-rule' aria-hidden />
      {keyword && (
        <p className='reading-gallery__search-hint'>搜寻 · {keyword}</p>
      )}
    </header>
  )
}
