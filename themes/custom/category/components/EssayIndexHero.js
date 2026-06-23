/**
 * 随想录 — 极简左对齐页眉
 */
export default function EssayIndexHero ({ category, keyword }) {
  return (
    <header className='essay-index__hero'>
      <h1 className='essay-index__title-heading'>{category}</h1>
      <div className='essay-index__hero-rule' aria-hidden />
      {keyword && (
        <p className='essay-index__search-hint'>搜寻 · {keyword}</p>
      )}
    </header>
  )
}
