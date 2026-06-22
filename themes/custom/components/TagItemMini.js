import Link from 'next/link'

const TagItemMini = ({ tag, selected = false }) => {
  return (
    <Link
      key={tag.name}
      href={selected ? '/' : `/tag/${encodeURIComponent(tag.name)}`}
      passHref
      className={`cursor-pointer inline-flex items-center px-2 py-1 text-xs font-medium transition-colors duration-200 border rounded mx-0.5 font-mono no-underline-hover ${
        selected
          ? 'border-[color:var(--accent-primary)] bg-[color:var(--accent-primary)] text-[color:var(--cyber-bg-deep)]'
          : 'border-[color:var(--link)] text-[color:var(--text-secondary)] bg-transparent hover:border-[color:var(--link-hover)] hover:text-[color:var(--link-hover)]'
      }`}>
      {selected && <span className='mr-1'>#</span>}
      {tag.name}
      {tag.count ? <span className='ml-1 opacity-70'>({tag.count})</span> : ''}
    </Link>
  )
}

export default TagItemMini
