/**
 * 按 tag 名过滤文章列表
 * @param {Array} posts
 * @param {string | undefined | null} tagName
 */
export function filterPostsByTagName (posts = [], tagName) {
  if (!tagName || tagName === '全部') return posts
  return posts.filter(post =>
    post.tagItems?.some(tag => tag.name === tagName)
  )
}
