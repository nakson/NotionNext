const UNCATEGORIZED_LABEL = '未分类'

/**
 * 按首 tag 分组；无 tag 归入「未分类」
 */
export function groupPostsByTag (posts = []) {
  const groups = new Map()

  for (const post of posts) {
    const tagName = post.tagItems?.[0]?.name || UNCATEGORIZED_LABEL
    if (!groups.has(tagName)) {
      groups.set(tagName, [])
    }
    groups.get(tagName).push(post)
  }

  return Array.from(groups.entries()).sort(([a], [b]) => {
    if (a === UNCATEGORIZED_LABEL) return 1
    if (b === UNCATEGORIZED_LABEL) return -1
    return a.localeCompare(b, 'zh-CN')
  })
}
