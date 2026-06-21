import Link from 'next/link'

const TagItemMini = ({ tag, selected = false }) => {
  return (
    <Link
      key={tag.name}
      href={selected ? '/' : `/tag/${encodeURIComponent(tag.name)}`}
      passHref
      className={`cursor-pointer inline-flex items-center px-2 py-1 text-xs font-medium transition-all duration-100 border-2 mx-0.5 font-mono ${
        selected
          ? 'border-[var(--pixel-accent)] bg-[var(--pixel-accent)] text-[var(--pixel-bg)] hover:translate-x-[-2px] hover:translate-y-[-2px]'
          : 'border-[var(--pixel-secondary)] text-[var(--pixel-secondary)] bg-[var(--pixel-bg-light)] hover:border-[var(--pixel-accent)] hover:text-[var(--pixel-accent)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-lg'
      }`}
      style={{
        boxShadow: selected
          ? '2px 2px 0px var(--pixel-accent)'
          : '1px 1px 0px var(--pixel-secondary)'
      }}>
      {selected && <span className='mr-1'>#</span>}
      {tag.name}
      {tag.count ? <span className='ml-1 opacity-70'>({tag.count})</span> : ''}
    </Link>
  )
}

export default TagItemMini
