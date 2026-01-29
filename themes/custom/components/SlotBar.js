import SmartLink from '@/components/SmartLink'

/**
 * 博客列表上方嵌入条（改良 UI）
 * - tag 时显示为可滚动的 pill 列表
 * - category 时显示为带图标的标题
 */
export default function SlotBar(props) {
  const { tag, category } = props
  console.log('>>> SlotBar props', props)

  // Tag 显示：pill 风格，支持横向滚动以防标签过多
  if (tag) {
    return (
      <div className='w-full mb-4'>
        <div className='rounded-lg px-3 py-2 flex items-center overflow-x-auto scrollbar-hide'>
          <SmartLink
            key={tag}
            href={`/tag/${encodeURIComponent(tag)}`}
            passHref
            className='inline-flex items-center no-underline'>
            <div className='inline-block rounded-full bg-white/60 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 px-3 py-1 mr-2 text-lg font-light text-gray-800 dark:text-gray-100 hover:scale-105 transform transition'>
              <span className='text-sm'>#{tag}</span>
            </div>
          </SmartLink>
        </div>
      </div>
    )
  }

  // Category 显示：更醒目的标题样式
  if (category) {
    return (
      <div className='w-full mb-4 text-md'>
        <div className='rounded-lg px-4 py-3 flex items-center gap-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-6 h-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={1.5}
            aria-hidden='true'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3 7.5A2.5 2.5 0 015.5 5h3.086a1 1 0 01.707.293l1.414 1.414A1 1 0 0011.207 7H18.5A2.5 2.5 0 0121 9.5v6A2.5 2.5 0 0118.5 18h-13A2.5 2.5 0 013 15.5v-8z'
            />
          </svg>
          /
          <div className='font-medium text-gray-800 dark:text-gray-300'>
            {category}
          </div>
        </div>
      </div>
    )
  }

  return <></>
}
