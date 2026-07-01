/** 取文章排序用时间戳，优先 publishDate */
function getPostTimestamp(post) {
  if (post?.publishDate) {
    return new Date(post.publishDate).getTime()
  }
  if (post?.publishDay) {
    return new Date(post.publishDay).getTime()
  }
  if (post?.lastEditedDate) {
    return new Date(post.lastEditedDate).getTime()
  }
  return 0
}

/** 按时间倒序 */
function sortPostsByDateDesc(posts) {
  return [...posts].sort((a, b) => getPostTimestamp(b) - getPostTimestamp(a))
}

/**
 * 为 Bento 模块聚合每分类最新文章与计数
 */
export function buildCategoryTileData(modules, homePosts = []) {
  if (!modules?.length) {
    return []
  }

  return modules.map(mod => {
    const categoryPosts = homePosts.filter(p => p.category === mod.category)
    const sorted = sortPostsByDateDesc(categoryPosts)
    return {
      ...mod,
      count: categoryPosts.length,
      latestPost: sorted[0] || null,
      href: `/category/${encodeURIComponent(mod.category)}`
    }
  })
}

/**
 * Hero 系统状态行：总文章数、本月更新、最近在读
 */
export function buildHomeSystemStatus(homePosts = []) {
  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime()

  const monthUpdates = homePosts.filter(
    p => getPostTimestamp(p) >= monthStart
  ).length

  const readingPosts = sortPostsByDateDesc(
    homePosts.filter(p => p.category === '阅读记录')
  )

  return {
    totalPosts: homePosts.length,
    monthUpdates,
    latestReading: readingPosts[0] || null
  }
}

/** 首页次级时间线：最近 N 条 */
export function getRecentLogs(homePosts = [], count = 5) {
  return sortPostsByDateDesc(homePosts).slice(0, count)
}
