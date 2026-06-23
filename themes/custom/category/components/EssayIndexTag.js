import Link from 'next/link'

/**
 * 随想录列表 — 轻量 tag 文字链
 */
export default function EssayIndexTag ({ tag }) {
  return (
    <Link
      href={`/tag/${encodeURIComponent(tag.name)}`}
      className='essay-index__tag no-underline-hover'
      onClick={e => e.stopPropagation()}>
      #{tag.name}
    </Link>
  )
}
