import { isAnimatedImageUrl, mapImgUrl } from '@/lib/db/notion/mapImage'

/** 从 blockMap 按正文顺序取第一张图片（无 pageCover 时 Hero 回退） */
export function getFirstImageFromPost (post) {
  const { blockMap, content, title } = post || {}
  if (!blockMap?.block || !content?.length) {
    return null
  }

  for (const blockId of content) {
    const block = blockMap.block[blockId]?.value
    if (block?.type !== 'image') {
      continue
    }
    const rawSrc = block.properties?.source?.[0]?.[0]
    if (!rawSrc) {
      continue
    }
    const src = mapImgUrl(rawSrc, block)
    const caption = block.properties?.caption?.[0]
      ?.map(part => part?.[0] || '')
      .join('')
    return {
      src,
      alt: caption || title || '',
      blockId,
      isAnimated: isAnimatedImageUrl(rawSrc) || isAnimatedImageUrl(src)
    }
  }

  return null
}

/** 判断块之间是否仅有空白/无实质文字块 */
const TEXT_BLOCK_SELECTORS =
  '.notion-text, .notion-header, .notion-list, .notion-callout, .notion-toggle, .notion-to-do, .notion-quote, blockquote'

function hasTextBlockBetween (root, nodeA, nodeB) {
  let node = nodeA.nextElementSibling
  while (node && node !== nodeB) {
    if (node.matches?.(TEXT_BLOCK_SELECTORS)) {
      const text = node.textContent?.replace(/\s+/g, '').trim()
      if (text) {
        return true
      }
    }
    if (
      node.classList?.contains('notion-asset-wrapper-image') &&
      node !== nodeA &&
      node !== nodeB
    ) {
      break
    }
    node = node.nextElementSibling
  }
  return false
}

/** 将连续图片块包裹为步骤连图网格；单张步骤图加 1:1 容器类 */
export function applyRecipeImageLayout (articleRoot, { hideFirstAsHero = false } = {}) {
  if (!articleRoot) {
    return
  }

  // 避免重复包裹（客户端导航 / 二次 ready）
  articleRoot.querySelectorAll('.recipe-step-grid').forEach(grid => {
    const parent = grid.parentNode
    while (grid.firstChild) {
      parent.insertBefore(grid.firstChild, grid)
    }
    parent.removeChild(grid)
  })
  articleRoot
    .querySelectorAll('.recipe-step-photo, .recipe-hero-source')
    .forEach(el => {
      el.classList.remove(
        'recipe-step-photo',
        'recipe-step-photo--grid-cell',
        'recipe-step-photo--animated',
        'recipe-hero-source'
      )
      el.removeAttribute('data-recipe-hero')
    })

  const wrappers = [
    ...articleRoot.querySelectorAll('.notion-asset-wrapper-image')
  ]
  if (!wrappers.length) {
    return
  }

  let startIndex = 0
  if (hideFirstAsHero && wrappers[0]) {
    wrappers[0].classList.add(
      'recipe-hero-source',
      'recipe-step-photo' // 宽屏恢复显示时沿用步骤方图样式
    )
    wrappers[0].setAttribute('data-recipe-hero', 'true')
    const heroImg = wrappers[0].querySelector('img')
    const heroSrc = heroImg?.getAttribute('src') || ''
    if (isAnimatedImageUrl(heroSrc)) {
      wrappers[0].classList.add('recipe-step-photo--animated')
    }
    startIndex = 1
  }

  const stepWrappers = wrappers.slice(startIndex)

  let i = 0
  while (i < stepWrappers.length) {
    const run = [stepWrappers[i]]
    let j = i + 1
    while (j < stepWrappers.length) {
      const prev = stepWrappers[j - 1]
      const curr = stepWrappers[j]
      if (hasTextBlockBetween(articleRoot, prev, curr)) {
        break
      }
      run.push(curr)
      j++
    }

    if (run.length >= 2) {
      const grid = document.createElement('div')
      // Cookpad 式：2 张两列、3+ 张三列
      const colClass =
        run.length === 2 ? 'recipe-step-grid--2' : 'recipe-step-grid--3'
      grid.className = `recipe-step-grid ${colClass}`
      run[0].parentNode.insertBefore(grid, run[0])
      run.forEach(wrapper => {
        wrapper.classList.add('recipe-step-photo', 'recipe-step-photo--grid-cell')
        grid.appendChild(wrapper)
      })
    } else {
      run[0].classList.add('recipe-step-photo')
    }

    i = j
  }

  // GIF 步骤图不强制 cover 裁切
  stepWrappers.forEach(wrapper => {
    const img = wrapper.querySelector('img')
    const src = img?.getAttribute('src') || ''
    if (isAnimatedImageUrl(src)) {
      wrapper.classList.add('recipe-step-photo--animated')
    }
  })
}
