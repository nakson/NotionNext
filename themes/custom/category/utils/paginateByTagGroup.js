import { groupPostsByTag } from './groupPostsByTag'

/**
 * 将 tag 组打包为多页（组不可拆分；单组超出 postsPerPage 时独占一页）
 */
function packPostsByTagGroupPages (posts = [], postsPerPage = 12) {
  const limit = Math.max(1, Number(postsPerPage) || 12)
  const groups = groupPostsByTag(posts)

  if (!groups.length) {
    return [[]]
  }

  const pages = [[]]
  let countOnPage = 0

  for (const [, tagPosts] of groups) {
    const groupSize = tagPosts.length

    if (countOnPage > 0 && countOnPage + groupSize > limit) {
      pages.push([...tagPosts])
      countOnPage = groupSize
    } else {
      pages[pages.length - 1].push(...tagPosts)
      countOnPage += groupSize
    }
  }

  return pages
}

/** 按 tag 组打包后的总页数 */
export function getTagGroupPageCount (posts = [], postsPerPage = 12) {
  return packPostsByTagGroupPages(posts, postsPerPage).length
}

/** 取指定页的平铺 posts（供 groupPostsByTag 复用） */
export function getPostsForTagGroupPage (posts = [], page = 1, postsPerPage = 12) {
  const pages = packPostsByTagGroupPages(posts, postsPerPage)
  const pageIndex = Math.max(1, Number(page) || 1) - 1
  return pages[pageIndex] ?? []
}
