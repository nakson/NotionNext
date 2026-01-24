import Link from 'next/link'

/**
 * 首页导航大按钮组件
 * @param {*} props
 * @returns
 */
const NavButtonGroup = props => {
  const { categoryOptions } = props
  if (!categoryOptions || categoryOptions.length === 0) {
    return <></>
  }

  return (
    <nav
      id='home-nav-button'
      className={
        'w-full z-10 md:h-72 md:mt-8 xl:mt-12 px-4 py-4 mt-12 flex flex-wrap md:max-w-5xl space-y-3 md:space-y-0 md:flex justify-center max-h-80 overflow-auto gap-4'
      }>
      {categoryOptions?.map(category => {
        return (
          <Link
            key={`${category.name}`}
            title={`${category.name}`}
            href={`/category/${category.name}`}
            passHref
            className='relative group text-center w-full sm:w-4/5 md:w-48 md:h-16 lg:h-20 h-14 justify-center items-center flex border border-white/20 dark:border-indigo-500/20 cursor-pointer rounded-xl 
            bg-white/10 dark:bg-indigo-500/10 backdrop-blur-md
            hover:bg-white/20 dark:hover:bg-indigo-500/20 
            hover:border-indigo-400/50 dark:hover:border-indigo-400/50
            duration-300 hover:scale-105 transform transition-all
            font-semibold text-gray-800 dark:text-gray-200
            shadow-lg hover:shadow-xl hover:shadow-indigo-500/20'>
            {/* 背景渐变效果 */}
            <div className='absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-indigo-500/0 to-blue-500/0 group-hover:from-indigo-500/5 group-hover:to-blue-500/5'></div>

            <span className='relative z-10'>{category.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}
export default NavButtonGroup
