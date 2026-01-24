import Link from 'next/link'

const TagItemMini = ({ tag, selected = false }) => {
  return (
    <Link
      key={tag}
      href={selected ? '/' : `/tag/${encodeURIComponent(tag.name)}`}
      passHref
      className={`cursor-pointer inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors duration-200
        ${
          selected
            ? 'bg-indigo-600 text-white'
            : 'bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-indigo-900/30'
        }`}>
      {selected && <i className='mr-1 fas fa-tag' />}
      {tag.name}
      {tag.count ? <span className='ml-1 opacity-60'>({tag.count})</span> : ''}
    </Link>
  )
}

export default TagItemMini
