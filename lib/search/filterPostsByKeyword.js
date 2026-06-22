import { getDataFromCache } from '@/lib/cache/cache_manager'
import { getPageContentText } from '@/lib/db/notion/getPageContentText'
import { getPageBlockCacheKey } from '@/lib/db/notion/getPostBlocks'

/**
 * 在内存缓存中进行全文索引
 * @param {Array} allPosts
 * @param {string} keyword
 * @returns {Promise<Array>}
 */
export async function filterPostsByKeyword (allPosts, keyword) {
  const filterPosts = []
  let normalizedKeyword = keyword
  if (normalizedKeyword) {
    normalizedKeyword = normalizedKeyword.trim().toLowerCase()
  }
  if (!normalizedKeyword) {
    return filterPosts
  }

  for (const post of allPosts) {
    const cacheKey = getPageBlockCacheKey(post.id, post.lastEditedDate)
    const page = await getDataFromCache(cacheKey, true)
    const tagContent =
      post?.tags && Array.isArray(post?.tags) ? post?.tags.join(' ') : ''
    const categoryContent =
      post.category && Array.isArray(post.category)
        ? post.category.join(' ')
        : ''
    const articleInfo = post.title + post.summary + tagContent + categoryContent
    let hit = articleInfo.toLowerCase().indexOf(normalizedKeyword) > -1
    const contentTextList = getPageContentText(post, page)
    post.results = []
    let hitCount = 0
    for (const i of contentTextList) {
      const c = contentTextList[i]
      if (!c) {
        continue
      }
      const index = c.toLowerCase().indexOf(normalizedKeyword)
      if (index > -1) {
        hit = true
        hitCount += 1
        post.results.push(c)
      } else if ((post.results.length - 1) / hitCount < 3 || i === 0) {
        post.results.push(c)
      }
    }
    if (hit) {
      filterPosts.push(post)
    }
  }
  return filterPosts
}
