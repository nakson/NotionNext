import Link from 'next/link'

/**
 * 博客归档列表
 * @param posts 所有文章
 * @param archiveTitle 归档标题
 * @returns {JSX.Element}
 * @constructor
 */
const BlogPostArchive = ({ posts = [], archiveTitle }) => {
  if (!posts || posts.length === 0) {
    return <></>
  } else {
    return (
      <div>
        <div
          className='pt-16 pb-4 text-3xl text-[color:var(--heading-2)]'
          id={archiveTitle}>
          {archiveTitle}
        </div>
        <ul>
          {posts?.map(post => {
            return (
              <li
                key={post.id}
                className='border-l-2 border-[color:var(--link)] p-1 text-xs md:text-base items-center hover:scale-x-105 hover:border-[color:var(--link-hover)] transform duration-500'>
                <div id={post?.publishDay}>
                  <span className='text-[color:var(--text-tertiary)]'>
                    {post.date?.start_date}
                  </span>{' '}
                  &nbsp;
                  <Link
                    href={post?.href}
                    passHref
                    className='text-[color:var(--text-secondary)] hover:text-[color:var(--link-hover)] overflow-x-hidden cursor-pointer'>
                    {post.title}
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default BlogPostArchive
