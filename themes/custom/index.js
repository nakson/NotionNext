import Comment from '@/components/Comment'
import replaceSearchResult from '@/components/Mark'
import NotionPage from '@/components/NotionPage'
import ShareBar from '@/components/ShareBar'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useRef } from 'react'
import ArticleAdjacent from './components/ArticleAdjacent'
import ArticleCopyright from './components/ArticleCopyright'
import { ArticleLock } from './components/ArticleLock'
import ArticleRecommend from './components/ArticleRecommend'
import BlogPostArchive from './components/BlogPostArchive'
import BlogPostListPage from './components/BlogPostListPage'
import BlogPostListScroll from './components/BlogPostListScroll'
import ButtonJumpToComment from './components/ButtonJumpToComment'
import ButtonRandomPostMini from './components/ButtonRandomPostMini'
import Card from './components/Card'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import PostHero from './components/PostHero'
import RightFloatArea from './components/RightFloatArea'
import SearchNav from './components/SearchNav'
import SideRight from './components/SideRight'
import TagItemMini from './components/TagItemMini'
import TaniaSideBar from './components/TaniaSideBar'
import TocDrawer from './components/TocDrawer'
import TocDrawerButton from './components/TocDrawerButton'
import CategoryPostList from './category/CategoryPostList'
import FineDiningSearchOverlay from './category/components/FineDiningSearchOverlay'
import { FineDiningSearchProvider } from './category/FineDiningSearchContext'
import CONFIG from './config'
import { Style } from './style_tania'

const AlgoliaSearchModal = dynamic(
  () => import('@/components/AlgoliaSearchModal'),
  { ssr: false }
)

const TerminalMatrixBg = dynamic(
  () => import('./components/TerminalMatrixBg'),
  { ssr: false }
)

/** 静态资源路径：支持 SUB_PATH 子路径部署 */
function resolveThemeBackgroundUrl (raw, siteConfigFn) {
  const t = String(raw ?? '').trim()
  if (!t) return ''
  if (/^https?:\/\//i.test(t) || t.startsWith('data:')) return t
  const sub = String(siteConfigFn('SUB_PATH', '') || '').replace(/\/$/, '')
  const path = t.startsWith('/') ? t : `/${t}`
  return sub ? `${sub}${path}` : path
}

// 主题全局状态
const ThemeGlobalHexo = createContext()
export const useHexoGlobal = () => useContext(ThemeGlobalHexo)

/**
 * 基础布局 采用左右两侧布局，移动端使用顶部导航栏
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = props => {
  const { post, children, slotTop, className } = props
  const { onLoading, fullWidth } = useGlobal()
  const router = useRouter()
  const showRandomButton = siteConfig('HEXO_MENU_RANDOM', false, CONFIG)
  const cyberIntensity = siteConfig(
    'HEXO_THEME_CYBER_INTENSITY',
    'medium',
    CONFIG
  )
  const neonAccent =
    siteConfig('HEXO_THEME_NEON_ACCENT', null, CONFIG) ||
    siteConfig('HEXO_THEME_COLOR', '#0ea5e9', CONFIG)
  const showMatrixRain = cyberIntensity === 'high'
  const showScanlines = cyberIntensity !== 'low'
  const bgArtUrl = resolveThemeBackgroundUrl(
    siteConfig('HEXO_THEME_BG_PIXEL_ART_URL', '', CONFIG),
    siteConfig
  )
  const bgArtOpacityRaw = siteConfig(
    'HEXO_THEME_BG_ART_OPACITY',
    0.28,
    CONFIG
  )
  const bgArtOpacity = Math.min(
    1,
    Math.max(0, Number.parseFloat(String(bgArtOpacityRaw)) || 0.28)
  )
  const hasBgArt = Boolean(bgArtUrl)

  const headerSlot = post ? (
    <PostHero {...props} />
  ) : router.route === '/' &&
    siteConfig('HEXO_HOME_BANNER_ENABLE', null, CONFIG) ? (
    <Hero {...props} />
  ) : null

  const drawerRight = useRef(null)
  const tocRef = isBrowser ? document.getElementById('article-wrapper') : null

  // 悬浮按钮内容
  const floatSlot = (
    <>
      {post?.toc?.length > 1 && (
        <div className='block lg:hidden'>
          <TocDrawerButton
            onClick={() => {
              drawerRight?.current?.handleSwitchVisible()
            }}
          />
        </div>
      )}
      {post && <ButtonJumpToComment />}
      {showRandomButton && <ButtonRandomPostMini {...props} />}
    </>
  )

  // Algolia搜索框
  const searchModal = useRef(null)

  return (
    <ThemeGlobalHexo.Provider value={{ searchModal }}>
      <FineDiningSearchProvider>
      <div
        id='theme-custom'
        data-cyber-intensity={cyberIntensity}
        data-bg-art={hasBgArt ? '1' : '0'}
        className={`${siteConfig('FONT_STYLE')} relative bg-transparent min-h-screen scroll-smooth text-[color:var(--cyber-text)]`}
        style={{
          minHeight: '100vh',
          maxWidth: fullWidth ? '100%' : '1300px',
          marginLeft: 'auto',
          marginRight: 'auto',
          ['--cyber-user-neon']: neonAccent,
          ...(hasBgArt
            ? {
                ['--cyber-bg-art-image']: `url(${JSON.stringify(bgArtUrl)})`,
                ['--cyber-bg-art-opacity']: String(bgArtOpacity)
              }
            : {})
        }}>
        <Style />

        <div className='cyber-viewport-bg' aria-hidden>
          <div className='glass-ambient-base' />
          <div className='glass-ambient-mesh' />
          {hasBgArt && <div className='aurora-bg-art' />}
          {showScanlines && <div className='aurora-scanlines' />}
          {showMatrixRain && <TerminalMatrixBg />}
        </div>

        <div className='relative z-10 flex min-h-screen w-full flex-1 flex-col md:flex-row'>
          {/* 侧边栏 (Desktop) */}
          <div className='hidden lg:block w-72 shrink-0 relative'>
            <TaniaSideBar {...props} />
          </div>

          {/* 主区块整体自适应包裹层 */}
          <div className='flex flex-1 flex-col items-center w-full'>
          {/* 顶部导航 (Mobile Only) */}
          <div className='lg:hidden block w-full'>
            <Header {...props} />
          </div>

          {/* 主区块 */}
          <main
            id='wrapper'
            className='w-full max-w-3xl lg:px-12 px-4 py-8 overflow-x-hidden min-h-screen relative md:my-8'
            style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <Transition
              show={!onLoading}
              appear={true}
              enter='transition ease-in-out duration-700 transform order-first'
              enterFrom='opacity-0 translate-y-16'
              enterTo='opacity-100'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 -translate-y-16'
              unmount={false}>
              {/* Header Slot (Hero/PostHero) inside Main now */}
              {headerSlot}

              {/* 主区上部嵌入 */}
              {slotTop}

              {children}
            </Transition>

            {/* Mobile Footer */}
            <div className='md:hidden mt-8'>
              <Footer title={siteConfig('TITLE')} />
            </div>
          </main>
          </div>

          <div className='block lg:hidden'>
            <TocDrawer post={post} cRef={drawerRight} targetRef={tocRef} />
          </div>
        </div>

        {/* 悬浮菜单 */}
        <RightFloatArea floatSlot={floatSlot} />

        <FineDiningSearchOverlay />

        {/* 全文搜索 */}
        <AlgoliaSearchModal cRef={searchModal} {...props} />
      </div>
      </FineDiningSearchProvider>
    </ThemeGlobalHexo.Provider>
  )
}

/**
 * 首页
 * 是一个博客列表，嵌入一个Hero大图
 * @param {*} props
 * @returns
 */
const LayoutIndex = props => {
  return (
    <div className='overflow-hidden'>
      <LayoutPostList {...props} className='pt-8' />
    </div>
  )
}

/**
 * 博客列表
 * @param {*} props
 * @returns
 */
const LayoutPostList = props => {
  return <CategoryPostList {...props} />
}

/**
 * 搜索
 * @param {*} props
 * @returns
 */
const LayoutSearch = props => {
  const { keyword } = props
  const router = useRouter()
  const currentSearch = keyword || router?.query?.s

  useEffect(() => {
    if (currentSearch) {
      replaceSearchResult({
        doms: document.getElementsByClassName('replace'),
        search: keyword,
        target: {
          element: 'span',
          className: 'text-red-500 border-b border-dashed'
        }
      })
    }
  })

  return (
    <div className='pt-8'>
      {!currentSearch ? (
        <SearchNav {...props} />
      ) : (
        <div id='posts-wrapper'>
          {' '}
          {siteConfig('POST_LIST_STYLE') === 'page' ? (
            <BlogPostListPage {...props} />
          ) : (
            <BlogPostListScroll {...props} />
          )}{' '}
        </div>
      )}
    </div>
  )
}

/**
 * 归档
 * @param {*} props
 * @returns
 */
const LayoutArchive = props => {
  const { archivePosts } = props
  return (
    <div className='pt-8'>
      <Card className='w-full bg-transparent shadow-none border-none'>
        <div className='mb-10 pb-20 md:p-12 p-3 min-h-full'>
          {Object.keys(archivePosts).map(archiveTitle => (
            <BlogPostArchive
              key={archiveTitle}
              posts={archivePosts[archiveTitle]}
              archiveTitle={archiveTitle}
            />
          ))}
        </div>
      </Card>
    </div>
  )
}

/**
 * 文章详情
 * @param {*} props
 * @returns
 */
const LayoutSlug = props => {
  const { post, lock, validPassword } = props
  const router = useRouter()
  const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000
  useEffect(() => {
    // 404
    if (!post) {
      setTimeout(() => {
        if (isBrowser) {
          const article = document.querySelector(
            '#article-wrapper #notion-article'
          )
          if (!article) {
            router.push('/404').then(() => {
              console.warn('找不到页面', router.asPath)
            })
          }
        }
      }, waiting404)
    }
  }, [post])
  return (
    <>
      <div className='w-full article'>
        {lock && <ArticleLock validPassword={validPassword} />}

        {!lock && post && (
          <div className='overflow-x-auto flex-grow mx-auto md:w-full md:px-5 '>
            <article
              id='article-wrapper'
              itemScope
              itemType='https://schema.org/Movie'
              className='subpixel-antialiased overflow-y-hidden'>
              {/* Notion文章主体 */}
              <section className='px-5 justify-center mx-auto max-w-2xl lg:max-w-full'>
                {post && <NotionPage post={post} />}
              </section>

              {/* 分享 */}
              <ShareBar post={post} />
              {post?.type === 'Post' && (
                <>
                  <ArticleCopyright {...props} />
                  <ArticleRecommend {...props} />
                  <ArticleAdjacent {...props} />
                </>
              )}
            </article>

            <div className='pt-4 border-dashed'></div>

            {/* 评论互动 */}
            <div className='duration-200 overflow-x-auto px-3'>
              <Comment frontMatter={post} />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

/**
 * 404
 * @param {*} props
 * @returns
 */
const Layout404 = props => {
  const router = useRouter()
  const { locale } = useGlobal()
  useEffect(() => {
    // 延时3秒如果加载失败就返回首页
    setTimeout(() => {
      if (isBrowser) {
        const article = document.querySelector(
          '#article-wrapper #notion-article'
        )
        if (!article) {
          router.push('/').then(() => {
            // console.log('找不到页面', router.asPath)
          })
        }
      }
    }, 3000)
  })
  return (
    <>
      <div className='w-full min-h-[50vh] flex flex-col items-center justify-center px-4'>
        <div className='cyber-404-panel cyber-mono text-center max-w-lg'>
          <div className='text-[color:var(--cyber-text-muted)] text-sm mb-2'>
            ERR_NOT_FOUND · 0x404
          </div>
          <h2 className='text-4xl font-semibold mb-2 text-[color:var(--cyber-text)]'>
            404
          </h2>
          <p className='text-sm text-[color:var(--cyber-text-muted)]'>
            {locale.COMMON.NOT_FOUND}
          </p>
        </div>
      </div>
    </>
  )
}

/**
 * 分类列表
 * @param {*} props
 * @returns
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  const { locale } = useGlobal()
  return (
    <div className='mt-8'>
      <Card className='w-full min-h-screen'>
        <div className='mb-5 mx-3 cyber-mono text-sm text-[color:var(--cyber-text-muted)] uppercase tracking-wider'>
          <span className='text-[color:var(--cyber-term-fg)] mr-2'>▸</span>
          {locale.COMMON.CATEGORY}
        </div>
        <div id='category-list' className='duration-200 flex flex-wrap mx-8'>
          {categoryOptions?.map(category => {
            return (
              <Link
                key={category.name}
                href={`/category/${category.name}`}
                passHref
                legacyBehavior>
                <div
                  className={
                    'duration-300 px-5 cursor-pointer py-2 hover:text-[color:var(--link-hover)] cyber-mono text-sm text-[color:var(--cyber-text)]'
                  }>
                  <span className='mr-2 text-[color:var(--cyber-term-fg)]'>#</span>
                  {category.name}({category.count})
                </div>
              </Link>
            )
          })}
        </div>
      </Card>
    </div>
  )
}

/**
 * 标签列表
 * @param {*} props
 * @returns
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  const { locale } = useGlobal()
  return (
    <div className='mt-8'>
      <Card className='w-full'>
        <div className='mb-5 ml-4 cyber-mono text-sm text-[color:var(--cyber-text-muted)] uppercase tracking-wider'>
          <span className='text-[color:var(--cyber-term-fg)] mr-2'>▸</span>
          {locale.COMMON.TAGS}
        </div>
        <div id='tags-list' className='duration-200 flex flex-wrap ml-8'>
          {tagOptions.map(tag => (
            <div key={tag.name} className='p-2'>
              <TagItemMini key={tag.name} tag={tag} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
