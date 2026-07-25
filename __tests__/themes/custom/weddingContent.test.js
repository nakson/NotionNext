import {
  clampNumber,
  countSectionImages,
  expandSectionsForRender,
  flattenBlockItems,
  mapWeddingContent,
  resolveSectionLayout,
  resolveSectionVariant
} from '@/themes/custom/utils/weddingContent'

describe('weddingContent helpers', () => {
  it('clampNumber falls back and clamps', () => {
    expect(clampNumber('abc', 0, 10, 5)).toBe(5)
    expect(clampNumber(100, 0, 10, 5)).toBe(10)
    expect(clampNumber(-3, 0, 10, 5)).toBe(0)
    expect(clampNumber(7, 0, 10, 5)).toBe(7)
  })

  it('resolveSectionVariant maps known headings and falls back to paper', () => {
    expect(resolveSectionVariant('我们的故事')).toBe('paper')
    expect(resolveSectionVariant('婚礼地点')).toBe('event-card')
    expect(resolveSectionVariant('照片')).toBe('photo-full')
    expect(resolveSectionVariant('期待相见')).toBe('closing')
    expect(resolveSectionVariant('随便写点什么')).toBe('paper')
  })

  it('resolveSectionLayout assigns layouts by content and index', () => {
    expect(
      resolveSectionLayout({ variant: 'cover', images: [{ src: 'a' }] }, 0)
    ).toBe('cover')
    expect(
      resolveSectionLayout({ variant: 'paper', images: [], paragraphs: ['a'] }, 0)
    ).toBe('paper-quote')
    expect(
      resolveSectionLayout(
        {
          variant: 'photo-full',
          images: [{ src: 'a' }, { src: 'b' }],
          paragraphs: ['x']
        },
        3
      )
    ).toBe('duo-stagger')
    expect(
      resolveSectionLayout(
        { variant: 'paper', images: [{ src: 'a' }], paragraphs: ['x'] },
        0
      )
    ).toBe('split-text-left')
  })
})

describe('flattenBlockItems + expandSectionsForRender', () => {
  it('reads ordered page content and nested column images', () => {
    const blockMap = {
      block: {
        'page-1': {
          value: {
            id: 'page-1',
            type: 'page',
            content: ['h1', 'cols']
          }
        },
        h1: {
          value: {
            id: 'h1',
            type: 'sub_header',
            parent_id: 'page-1',
            properties: { title: [['照片']] }
          }
        },
        cols: {
          value: {
            id: 'cols',
            type: 'column_list',
            parent_id: 'page-1',
            content: ['c1', 'c2']
          }
        },
        c1: {
          value: {
            id: 'c1',
            type: 'column',
            parent_id: 'cols',
            content: ['img1']
          }
        },
        c2: {
          value: {
            id: 'c2',
            type: 'column',
            parent_id: 'cols',
            content: ['t1', 'img2']
          }
        },
        img1: {
          value: {
            id: 'img1',
            type: 'image',
            parent_id: 'c1',
            properties: {
              source: [['https://example.com/a.jpg']]
            }
          }
        },
        img2: {
          value: {
            id: 'img2',
            type: 'image',
            parent_id: 'c2',
            properties: {
              source: [['https://example.com/b.jpg']]
            }
          }
        },
        t1: {
          value: {
            id: 't1',
            type: 'text',
            parent_id: 'c2',
            properties: { title: [['分栏文字']] }
          }
        }
      }
    }

    const items = flattenBlockItems(['h1', 'cols'], blockMap)
    expect(items.some(i => i.kind === 'heading' && i.title === '照片')).toBe(
      true
    )
    expect(items.filter(i => i.kind === 'image')).toHaveLength(2)
    expect(items.some(i => i.kind === 'text' && i.text === '分栏文字')).toBe(
      true
    )
  })

  it('expand keeps every image from multi-image sections', () => {
    const sections = [
      {
        id: 'sec-a',
        variant: 'paper',
        title: '相册',
        paragraphs: ['一段', '二段'],
        images: [
          { src: '1.jpg', alt: '' },
          { src: '2.jpg', alt: '' },
          { src: '3.jpg', alt: '' },
          { src: '4.jpg', alt: '' }
        ]
      }
    ]
    const expanded = expandSectionsForRender(sections)
    expect(countSectionImages(expanded)).toBe(4)
    expect(expanded.every(s => Boolean(s.layout))).toBe(true)
    const paraCount = expanded.reduce(
      (n, s) => n + (s.paragraphs?.length || 0),
      0
    )
    expect(paraCount).toBe(2)
  })
})

describe('mapWeddingContent', () => {
  const themeConfig = {
    WEDDING_AUTO_SCROLL: true,
    WEDDING_AUTO_SCROLL_SPEED: 72,
    WEDDING_AUTO_SCROLL_RESUME_DELAY: 2000,
    WEDDING_MUSIC_VOLUME: 0.35,
    WEDDING_CONTENT_MAX_WIDTH: 480,
    WEDDING_REVEAL_ANIMATION: true,
    WEDDING_TEXT_COLOR: '#3d342b',
    WEDDING_MUTED_COLOR: ''
  }

  it('uses defaults when ext is missing', () => {
    const post = {
      id: 'page-1',
      title: '测试请柬',
      slug: 'wedding/demo',
      summary: '欢迎',
      pageCover: 'https://example.com/cover.jpg',
      ext: {},
      content: []
    }
    const result = mapWeddingContent(post, { block: {} }, themeConfig)
    expect(result.musicUrl).toBe('/wedding/demo/bgm.mp3')
    expect(result.autoScrollSpeed).toBe(72)
    expect(result.textColor).toBe('#3d342b')
    expect(result.sections[0].variant).toBe('cover')
    expect(result.sections[0].layout).toBe('cover')
  })

  it('maps textColor from ext.wedding', () => {
    const post = {
      id: 'page-1',
      title: '测试',
      slug: 'wedding/demo',
      ext: {
        wedding: {
          textColor: '#4a3f35',
          mutedColor: '#8a7b6c'
        }
      },
      content: []
    }
    const result = mapWeddingContent(post, { block: {} }, themeConfig)
    expect(result.textColor).toBe('#4a3f35')
    expect(result.mutedColor).toBe('#8a7b6c')
  })

  it('clamps illegal numbers from ext', () => {
    const post = {
      id: 'page-1',
      title: '测试',
      slug: 'wedding/demo',
      ext: {
        wedding: {
          autoScrollSpeed: 999,
          musicVolume: -2
        }
      },
      content: []
    }
    const result = mapWeddingContent(post, { block: {} }, themeConfig)
    expect(result.autoScrollSpeed).toBe(120)
    expect(result.musicVolume).toBe(0)
  })

  it('maps nested body and preserves image count via page.content order', () => {
    const post = {
      id: 'page-1',
      title: '南一 & 若雨',
      slug: 'wedding/nyryx',
      summary: '诚邀',
      ext: {
        wedding: {
          groom: '南一',
          bride: '若雨',
          dateText: '2026年10月1日',
          venue: '酒店',
          musicUrl: '/wedding/nyryx/bgm.mp3'
        }
      }
    }
    const blockMap = {
      block: {
        'page-1': {
          value: {
            id: 'page-1',
            type: 'page',
            content: ['h1', 't1', 'img1', 'img2', 'img3']
          }
        },
        h1: {
          value: {
            id: 'h1',
            type: 'sub_header',
            parent_id: 'page-1',
            properties: { title: [['照片']] }
          }
        },
        t1: {
          value: {
            id: 't1',
            type: 'text',
            parent_id: 'page-1',
            properties: { title: [['说明文字']] }
          }
        },
        img1: {
          value: {
            id: 'img1',
            type: 'image',
            parent_id: 'page-1',
            properties: { source: [['https://example.com/1.jpg']] }
          }
        },
        img2: {
          value: {
            id: 'img2',
            type: 'image',
            parent_id: 'page-1',
            properties: { source: [['https://example.com/2.jpg']] }
          }
        },
        img3: {
          value: {
            id: 'img3',
            type: 'image',
            parent_id: 'page-1',
            properties: { source: [['https://example.com/3.jpg']] }
          }
        }
      }
    }

    const result = mapWeddingContent(post, blockMap, themeConfig)
    const bodyImageCount = countSectionImages(
      result.sections.filter(
        s => s.variant !== 'cover' && s.id !== 'event' && s.variant !== 'closing'
      )
    )
    expect(bodyImageCount).toBe(3)
    expect(result.sections.every(s => Boolean(s.layout))).toBe(true)
    expect(result.groom).toBe('南一')
  })
})
