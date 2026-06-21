import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import Card from './Card'
import SearchInput from './SearchInput'
import TagItemMini from './TagItemMini'

/**
 * 搜索页面的导航
 * @param {*} props
 * @returns
 */
export default function SearchNav(props) {
  const { tagOptions, categoryOptions } = props
  const cRef = useRef(null)
  const { locale } = useGlobal()
  useEffect(() => {
    // 自动聚焦到搜索框
    cRef?.current?.focus()
  }, [])

  return (
    <>
      <div className='my-6 px-2'>
        <SearchInput cRef={cRef} {...props} />
        {/* 分类 */}
        <Card className='w-full mt-4'>
          <div className='mb-5 mx-3 cyber-mono text-sm text-[color:var(--cyber-text-muted)] uppercase tracking-wider'>
            <span className='text-[color:var(--cyber-term-fg)] mr-2'>▸</span>
            {locale.COMMON.CATEGORY}
          </div>
          <div id='category-list' className='duration-200 flex flex-wrap mx-8'>
            {categoryOptions?.map(category => {
              return (
                <Link
                  key={category.name}
                  href={`/category/${category.name}`}
                  passHref
                  legacyBehavior>
                  <div
                    className={
                      'duration-300 rounded border border-transparent hover:border-[color:var(--cyber-panel-border)] px-5 cursor-pointer py-2 cyber-mono text-sm text-[color:var(--cyber-text)] hover:text-[color:var(--cyber-neon-cyan)]'
                    }>
                    <span className='mr-2 text-[color:var(--cyber-term-fg)]'>#</span>
                    {category.name}({category.count})
                  </div>
                </Link>
              )
            })}
          </div>
        </Card>
        {/* 标签 */}
        <Card className='w-full mt-4'>
          <div className='mb-5 ml-4 cyber-mono text-sm text-[color:var(--cyber-text-muted)] uppercase tracking-wider'>
            <span className='text-[color:var(--cyber-term-fg)] mr-2'>▸</span>
            {locale.COMMON.TAGS}
          </div>
          <div id='tags-list' className='duration-200 flex flex-wrap ml-8'>
            {tagOptions?.map(tag => {
              return (
                <div key={tag.name} className='p-2'>
                  <TagItemMini key={tag.name} tag={tag} />
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </>
  )
}
