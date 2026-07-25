/**
 * 开场门：点击后淡出并触发音乐播放
 */
export default function WeddingCoverGate({
  opened,
  onOpen,
  names,
  hint,
  coverUrl
}) {
  return (
    <div
      className={`wedding-cover-gate${opened ? ' is-open' : ''}`}
      aria-hidden={opened}>
      {coverUrl ? (
        <div
          className='wedding-cover-gate__bg'
          style={{ backgroundImage: `url(${JSON.stringify(String(coverUrl))})` }}
        />
      ) : null}
      <div className='wedding-cover-gate__veil' />
      <div className='wedding-cover-gate__inner'>
        <h1 className='wedding-cover-gate__names'>{names}</h1>
        {hint ? <p className='wedding-cover-gate__hint'>{hint}</p> : null}
        <button
          type='button'
          className='wedding-cover-gate__btn'
          data-wedding-chrome
          onClick={onOpen}>
          打开请柬
        </button>
      </div>
    </div>
  )
}
