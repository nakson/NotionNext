/**
 * 高档餐厅菜单 — 页眉（极简留白 + 衬线标题）
 */
export default function FineDiningMenuHero ({ category, keyword }) {
  return (
    <header className='fine-dining-menu__hero text-center'>
      <p className='fine-dining-menu__eyebrow'>Carte</p>
      <h1 className='fine-dining-menu__title'>{category}</h1>
      <div className='fine-dining-menu__ornament' aria-hidden />
      {keyword ? (
        <p className='fine-dining-menu__search-hint'>搜寻 · {keyword}</p>
      ) : (
        <p className='fine-dining-menu__lede'>
          以文字勾勒风味与层次。真正的惊艳，留到上桌那一刻。
        </p>
      )}
    </header>
  )
}
