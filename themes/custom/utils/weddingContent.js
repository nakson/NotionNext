import { mapImgUrl } from '@/lib/db/notion/mapImage'

/** 二级标题 → 明信片变体 */
const HEADING_VARIANT_MAP = [
  { match: /照片|相册|gallery|photo/i, variant: 'photo-full' },
  { match: /地点|venue|address|地图/i, variant: 'event-card' },
  { match: /时刻|日程|流程|when|schedule/i, variant: 'event-card' },
  { match: /期待|尾声|closing|再见|致谢/i, variant: 'closing' },
  { match: /故事|邀请|致辞|提示|温馨|story|invite/i, variant: 'paper' }
]

const DEFAULTS = {
  autoScroll: true,
  autoScrollSpeed: 72,
  musicVolume: 0.35,
  palette: 'ivory',
  contentMaxWidth: 480,
  revealAnimation: true,
  resumeDelay: 2000,
  textColor: '#3d342b',
  mutedColor: ''
}

/** 单图+文时按序号轮换的格局 */
const MIXED_LAYOUTS = [
  'split-text-left',
  'split-text-right',
  'stack-image-top',
  'stack-caption-overlap',
  'full-bleed'
]

/** 需要递归展开子 content 的容器块 */
const NEST_TYPES = new Set([
  'column_list',
  'column',
  'toggle',
  'bulleted_list',
  'numbered_list',
  'to_do',
  'transclusion_container',
  'transclusion_reference',
  'callout',
  'quote',
  'synced_block'
])

const TEXT_TYPES = new Set([
  'text',
  'quote',
  'callout',
  'sub_sub_header',
  'heading_3',
  'heading_4',
  'bulleted_list',
  'numbered_list',
  'to_do'
])

/**
 * 为 section 分配确定性 layout（不依赖 Notion 额外字段）
 */
export function resolveSectionLayout(section = {}, index = 0) {
  if (section.layout) return section.layout

  const variant = section.variant || ''
  if (variant === 'cover') return 'cover'
  if (variant === 'event-card') return 'event-card'
  if (variant === 'closing') return 'closing'

  const imageCount = Array.isArray(section.images) ? section.images.length : 0
  if (imageCount === 0) return 'paper-quote'
  if (imageCount >= 2) return 'duo-stagger'

  const i = Math.max(0, Number(index) || 0)
  return MIXED_LAYOUTS[i % MIXED_LAYOUTS.length]
}

/**
 * 钳制数字到安全区间
 */
export function clampNumber(value, min, max, fallback) {
  const n = Number(value)
  if (!Number.isFinite(n)) return fallback
  return Math.min(max, Math.max(min, n))
}

function getFullTextContent(text) {
  if (!text) return ''
  if (!Array.isArray(text)) return String(text)
  return text.reduce((result, item) => {
    if (!Array.isArray(item)) return result + String(item || '')
    const value = item[0]
    if (value === '⁍' || value === '‣') return result
    return result + (value == null ? '' : String(value))
  }, '')
}

function readBlockText(textArray) {
  if (!textArray) return ''
  const text = getFullTextContent(textArray)
  return text && text !== 'Untitled' ? text : ''
}

function isSectionHeading(block) {
  return (
    block?.type === 'header' ||
    block?.type === 'heading_1' ||
    block?.type === 'sub_header' ||
    block?.type === 'heading_2'
  )
}

function resolveImageSrc(block) {
  if (!block) return ''
  const raw =
    block?.properties?.source?.[0]?.[0] ||
    block?.format?.display_source ||
    ''
  if (!raw) return ''
  return mapImgUrl(raw, block, 'block') || ''
}

export function resolveSectionVariant(title = '') {
  const text = String(title || '').trim()
  for (const rule of HEADING_VARIANT_MAP) {
    if (rule.match.test(text)) return rule.variant
  }
  return 'paper'
}

/**
 * 页面有序子块 ID（优先 Notion page.content）
 */
function getOrderedRootContentIds(post, blockMap) {
  const blocks = blockMap?.block || {}
  const pageId = post?.id
  const fromPage = pageId && blocks[pageId]?.value?.content
  if (Array.isArray(fromPage) && fromPage.length > 0) {
    return fromPage
  }
  if (Array.isArray(post?.content) && post.content.length > 0) {
    return post.content
  }
  return Object.keys(blocks).filter(
    key => blocks[key]?.value?.parent_id === pageId
  )
}

/**
 * 递归展开块，产出扁平的图文原子项（保留文档顺序）
 * @returns {{ kind: 'heading'|'text'|'image', title?: string, text?: string, src?: string, alt?: string, id: string }[]}
 */
export function flattenBlockItems(contentIds, blockMap, depth = 0) {
  const blocks = blockMap?.block || {}
  const items = []
  if (!Array.isArray(contentIds) || depth > 12) return items

  for (const id of contentIds) {
    const block = blocks[id]?.value
    if (!block) continue

    if (isSectionHeading(block)) {
      const title = readBlockText(block.properties?.title)
      items.push({ kind: 'heading', id, title })
      // 标题块一般无子 content；若有则继续
      if (Array.isArray(block.content) && block.content.length) {
        items.push(...flattenBlockItems(block.content, blockMap, depth + 1))
      }
      continue
    }

    if (block.type === 'image') {
      const src = resolveImageSrc(block)
      const alt =
        readBlockText(block.properties?.alt_text) ||
        readBlockText(block.properties?.caption) ||
        readBlockText(block.properties?.title) ||
        ''
      if (src) {
        items.push({ kind: 'image', id, src, alt })
      }
      continue
    }

    // 容器：先读自身标题文字（toggle/callout），再递归子块
    if (NEST_TYPES.has(block.type)) {
      if (TEXT_TYPES.has(block.type) || block.type === 'toggle') {
        const text = readBlockText(block.properties?.title)
        if (text) items.push({ kind: 'text', id: `${id}-self`, text })
      }
      if (Array.isArray(block.content) && block.content.length) {
        items.push(...flattenBlockItems(block.content, blockMap, depth + 1))
      }
      continue
    }

    if (TEXT_TYPES.has(block.type)) {
      const text = readBlockText(block.properties?.title)
      if (text) items.push({ kind: 'text', id, text })
      if (Array.isArray(block.content) && block.content.length) {
        items.push(...flattenBlockItems(block.content, blockMap, depth + 1))
      }
    }
  }

  return items
}

/**
 * 将扁平原子项切成 body sections
 */
function itemsToSections(items) {
  const sections = []
  let current = null

  const flush = () => {
    if (!current) return
    const hasContent =
      (current.paragraphs && current.paragraphs.length > 0) ||
      (current.images && current.images.length > 0)
    if (hasContent || current.title) {
      if (
        current.variant === 'photo-full' &&
        current.images?.length === 1 &&
        current.paragraphs?.length > 0
      ) {
        current.variant = 'photo-caption'
      }
      sections.push(current)
    }
    current = null
  }

  const ensureCurrent = seedId => {
    if (!current) {
      current = {
        id: `sec-flow-${seedId}`,
        title: '',
        variant: 'paper',
        paragraphs: [],
        images: []
      }
    }
  }

  for (const item of items) {
    if (item.kind === 'heading') {
      flush()
      current = {
        id: `sec-${item.id}`,
        title: item.title || '',
        variant: resolveSectionVariant(item.title || ''),
        paragraphs: [],
        images: []
      }
      continue
    }

    ensureCurrent(item.id)

    if (item.kind === 'image') {
      current.images.push({ src: item.src, alt: item.alt || '' })
      // 无标题流：满 2 图就切段，避免后续布局截断
      if (!current.title && current.images.length >= 2) {
        flush()
      }
      continue
    }

    if (item.kind === 'text' && item.text) {
      current.paragraphs.push(item.text)
    }
  }

  flush()
  return sections
}

function parseBodySections(post, blockMap) {
  const rootIds = getOrderedRootContentIds(post, blockMap)
  const items = flattenBlockItems(rootIds, blockMap)
  return itemsToSections(items)
}

/**
 * 将 body section 拆成多个渲染单元，保证每张图、每段文字都进入某个单元
 * cover / event-card / closing 原样保留
 */
export function expandSectionsForRender(sections = []) {
  const out = []
  let mixIndex = 0

  for (const sec of sections) {
    const variant = sec.variant || 'paper'
    if (
      variant === 'cover' ||
      variant === 'event-card' ||
      variant === 'closing' ||
      sec.id === 'cover' ||
      sec.id === 'event' ||
      sec.id === 'closing-default'
    ) {
      out.push({
        ...sec,
        layout: resolveSectionLayout(sec, out.length)
      })
      continue
    }

    const images = Array.isArray(sec.images) ? [...sec.images] : []
    const paragraphs = Array.isArray(sec.paragraphs) ? [...sec.paragraphs] : []

    if (images.length === 0) {
      out.push({
        ...sec,
        images: [],
        paragraphs,
        layout: 'paper-quote'
      })
      continue
    }

    if (images.length === 1) {
      const layout = MIXED_LAYOUTS[mixIndex % MIXED_LAYOUTS.length]
      mixIndex += 1
      out.push({
        ...sec,
        images,
        paragraphs,
        layout
      })
      continue
    }

    // ≥2 图：duo + 剩余图各自成段；段落分给 duo 与末段
    const duoImages = images.slice(0, 2)
    const restImages = images.slice(2)
    const mid = Math.ceil(paragraphs.length / 2)
    const headParas = paragraphs.slice(0, mid)
    const tailParas = paragraphs.slice(mid)

    out.push({
      ...sec,
      id: `${sec.id}-duo`,
      images: duoImages,
      paragraphs: headParas,
      layout: 'duo-stagger'
    })

    if (restImages.length === 0) {
      if (tailParas.length > 0) {
        out.push({
          ...sec,
          id: `${sec.id}-more-text`,
          title: '',
          images: [],
          paragraphs: tailParas,
          layout: 'paper-quote'
        })
      }
      continue
    }

    restImages.forEach((img, i) => {
      const isLast = i === restImages.length - 1
      out.push({
        ...sec,
        id: `${sec.id}-img-${i}`,
        title: '',
        images: [img],
        paragraphs: isLast ? tailParas : [],
        layout: i % 2 === 0 ? 'full-bleed' : 'stack-image-top'
      })
    })
  }

  return out
}

/**
 * 统计 sections 中图片总数（测试用）
 */
export function countSectionImages(sections = []) {
  return sections.reduce(
    (n, s) => n + (Array.isArray(s.images) ? s.images.length : 0),
    0
  )
}

/**
 * Notion post + blockMap → 婚礼页 ViewModel
 */
export function mapWeddingContent(post, blockMap, themeConfig = {}) {
  const ext =
    post?.ext && typeof post.ext === 'object' && !Array.isArray(post.ext)
      ? post.ext
      : {}
  const weddingExt =
    ext.wedding && typeof ext.wedding === 'object' ? ext.wedding : {}

  const slugTail = String(post?.slug || '')
    .replace(/^\//, '')
    .split('/')
    .pop()

  const autoScroll =
    typeof weddingExt.autoScroll === 'boolean'
      ? weddingExt.autoScroll
      : themeConfig.WEDDING_AUTO_SCROLL !== false && DEFAULTS.autoScroll

  const autoScrollSpeed = clampNumber(
    weddingExt.autoScrollSpeed ?? themeConfig.WEDDING_AUTO_SCROLL_SPEED,
    4,
    120,
    DEFAULTS.autoScrollSpeed
  )

  const musicVolume = clampNumber(
    weddingExt.musicVolume ?? themeConfig.WEDDING_MUSIC_VOLUME,
    0,
    1,
    DEFAULTS.musicVolume
  )

  const contentMaxWidth = clampNumber(
    themeConfig.WEDDING_CONTENT_MAX_WIDTH,
    320,
    720,
    DEFAULTS.contentMaxWidth
  )

  const resumeDelay = clampNumber(
    themeConfig.WEDDING_AUTO_SCROLL_RESUME_DELAY,
    500,
    10000,
    DEFAULTS.resumeDelay
  )

  const textColor =
    (typeof weddingExt.textColor === 'string' &&
      weddingExt.textColor.trim()) ||
    (typeof themeConfig.WEDDING_TEXT_COLOR === 'string' &&
      themeConfig.WEDDING_TEXT_COLOR.trim()) ||
    DEFAULTS.textColor

  const mutedColor =
    (typeof weddingExt.mutedColor === 'string' &&
      weddingExt.mutedColor.trim()) ||
    (typeof themeConfig.WEDDING_MUTED_COLOR === 'string' &&
      themeConfig.WEDDING_MUTED_COLOR.trim()) ||
    ''

  const musicUrl =
    (typeof weddingExt.musicUrl === 'string' && weddingExt.musicUrl.trim()) ||
    (slugTail ? `/wedding/${slugTail}/bgm.mp3` : '')

  const coverUrl =
    (typeof weddingExt.coverUrl === 'string' && weddingExt.coverUrl.trim()) ||
    post?.pageCover ||
    ''

  const bodySections = parseBodySections(post, blockMap || post?.blockMap)

  const groom = String(weddingExt.groom || '').trim()
  const bride = String(weddingExt.bride || '').trim()
  const namesLine =
    groom && bride ? `${groom}  &  ${bride}` : post?.title || '婚礼请柬'

  const shellSections = [
    {
      id: 'cover',
      variant: 'cover',
      title: namesLine,
      paragraphs: [
        String(post?.summary || weddingExt.inviteMessage || '').trim()
      ].filter(Boolean),
      images: coverUrl ? [{ src: coverUrl, alt: namesLine }] : [],
      meta: {
        groom,
        bride,
        dateText: String(weddingExt.dateText || '').trim()
      }
    },
    {
      id: 'event',
      variant: 'event-card',
      title: '婚礼信息',
      paragraphs: [],
      images: [],
      meta: {
        dateText: String(weddingExt.dateText || '').trim(),
        venue: String(weddingExt.venue || '').trim(),
        address: String(weddingExt.address || '').trim(),
        mapUrl: String(weddingExt.mapUrl || '').trim()
      }
    }
  ].filter(sec => {
    if (sec.id === 'event') {
      const m = sec.meta || {}
      return Boolean(m.dateText || m.venue || m.address || m.mapUrl)
    }
    return true
  })

  const hasClosing = bodySections.some(s => s.variant === 'closing')
  const closingSections = []
  if (!hasClosing && (groom || bride)) {
    closingSections.push({
      id: 'closing-default',
      variant: 'closing',
      title: '期待与您相见',
      paragraphs: [namesLine],
      images: [],
      meta: { dateText: String(weddingExt.dateText || '').trim() }
    })
  }

  const sections = expandSectionsForRender([
    ...shellSections,
    ...bodySections,
    ...closingSections
  ])

  return {
    title: post?.title || namesLine,
    summary: post?.summary || '',
    slug: post?.slug || '',
    slugTail,
    groom,
    bride,
    dateText: String(weddingExt.dateText || '').trim(),
    venue: String(weddingExt.venue || '').trim(),
    address: String(weddingExt.address || '').trim(),
    mapUrl: String(weddingExt.mapUrl || '').trim(),
    coverUrl,
    musicUrl,
    musicVolume,
    autoScroll,
    autoScrollSpeed,
    resumeDelay,
    contentMaxWidth,
    textColor,
    mutedColor,
    revealAnimation:
      themeConfig.WEDDING_REVEAL_ANIMATION !== false && DEFAULTS.revealAnimation,
    palette: String(weddingExt.palette || DEFAULTS.palette),
    sections
  }
}
