import Link from 'next/link'

function toRoman (n) {
  const map = [
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1]
  ]
  let num = n + 1
  let out = ''
  for (const [sym, val] of map) {
    while (num >= val) {
      out += sym
      num -= val
    }
  }
  return out
}

/**
 * 单道「菜品」条目 — 无配图，靠标题与摘要营造期待感
 */
export default function FineDiningMenuItem ({ post, index }) {
  const ordinal = toRoman(index)

  return (
    <article className='fine-dining-menu__item group'>
      <div className='fine-dining-menu__item-inner'>
        <span className='fine-dining-menu__ordinal' aria-hidden>
          {ordinal}
        </span>

        <div className='fine-dining-menu__item-body'>
          <h2 className='fine-dining-menu__item-title'>
            <Link href={post?.href} className='fine-dining-menu__item-link no-underline-hover'>
              {post.title}
            </Link>
          </h2>

          {post.summary && (
            <p className='fine-dining-menu__item-desc'>{post.summary}</p>
          )}

          {(post.publishDay || post.lastEditedDay) && (
            <p className='fine-dining-menu__item-meta'>
              {post.publishDay || post.lastEditedDay}
            </p>
          )}
        </div>

        <span className='fine-dining-menu__item-mark' aria-hidden>
          ···
        </span>
      </div>
    </article>
  )
}
