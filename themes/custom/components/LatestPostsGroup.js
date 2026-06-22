import LazyImage from '@/components/LazyImage'
import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import { useRouter } from 'next/router'

/**
 * 最新文章列表
 * @param posts 所有文章数据
 * @param sliceCount 截取展示的数量 默认6
 * @constructor
 */
const LatestPostsGroup = ({ latestPosts, siteInfo }) => {
  const currentPath = useRouter().asPath
  const { locale } = useGlobal()

  if (!latestPosts) {
    return <></>
  }

  return (
    <>
      <div className=' mb-2 px-1 flex flex-nowrap justify-between'>
        <div>
          <i className='mr-2 fas fas fa-history' />
          {locale.COMMON.LATEST_POSTS}
        </div>
      </div>
      {latestPosts.map(post => {
        const headerImage = post?.pageCoverThumbnail
          ? post.pageCoverThumbnail
          : siteInfo?.pageCover
        const selected = currentPath === post?.href

        return (
          <Link
            key={post.id}
            title={post.title}
            href={post?.href}
            passHref
            className='my-3 flex no-underline-hover'>
            <div className='w-20 h-14 overflow-hidden relative'>
              <LazyImage
                alt={post?.title}
                src={`${headerImage}`}
                className='object-cover w-full h-full'
              />
            </div>
            <div
              className={`text-sm overflow-x-hidden px-2 duration-200 w-full rounded cursor-pointer items-center flex ${
                selected
                  ? 'text-[color:var(--accent-primary)]'
                  : 'text-[color:var(--text-secondary)] hover:text-[color:var(--link-hover)]'
              }`}>
              <div>
                <div className='line-clamp-2 menu-link'>{post.title}</div>
                <div className='text-[color:var(--text-tertiary)]'>
                  {post.lastEditedDay}
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </>
  )
}
export default LatestPostsGroup
