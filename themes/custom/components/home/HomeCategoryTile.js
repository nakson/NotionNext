import Link from 'next/link'

/**
 * Bento 单格：分类世界观入口
 */
const HomeCategoryTile = ({ tile }) => {
  if (!tile) {
    return null
  }

  const { title, description, count, latestPost, href } = tile

  return (
    <Link href={href} className='home-bento__tile no-underline-hover'>
      <div className='home-bento__tile-header'>
        <h2 className='home-bento__tile-title'>{title}</h2>
        {count > 0 && (
          <span className='home-bento__tile-count cyber-mono'>{count}</span>
        )}
      </div>
      {description && (
        <p className='home-bento__tile-desc'>{description}</p>
      )}
      {latestPost ? (
        <p className='home-bento__tile-preview cyber-mono'>
          <span className='home-bento__tile-preview-label'>latest · </span>
          {latestPost.title}
        </p>
      ) : (
        <p className='home-bento__tile-preview home-bento__tile-preview--empty cyber-mono'>
          no entries yet
        </p>
      )}
    </Link>
  )
}

export default HomeCategoryTile
