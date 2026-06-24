import { siteConfig } from '@/lib/config'
import BlogPostListPage from '../components/BlogPostListPage'
import BlogPostListScroll from '../components/BlogPostListScroll'
import SearchInput from '../components/SearchInput'
import SlotBar from '../components/SlotBar'
import { useRouter } from 'next/router'
import { resolveCategoryViewId } from './registry'
import FineDiningMenuCategoryView from './views/FineDiningMenuCategoryView'
import EssayIndexCategoryView from './views/EssayIndexCategoryView'
import ReadingGalleryCategoryView from './views/ReadingGalleryCategoryView'
import MusicNotesCategoryView from './views/MusicNotesCategoryView'

const CATEGORY_VIEW_COMPONENTS = {
  'fine-dining-menu': FineDiningMenuCategoryView,
  'essay-index': EssayIndexCategoryView,
  'reading-poster-gallery': ReadingGalleryCategoryView,
  'music-notes': MusicNotesCategoryView
}

/**
 * 分类列表入口 — 按注册表分发到专属视图或默认列表
 */
export default function CategoryPostList (props) {
  const router = useRouter()
  const routeCategory = Array.isArray(router.query?.category)
    ? router.query.category[0]
    : router.query?.category
  // fallback 期间 props.category 可能尚未返回，需用路由参数保持专属视图不白屏
  const category = props.category || routeCategory
  const viewId = resolveCategoryViewId(category)
  const CustomView = CATEGORY_VIEW_COMPONENTS[viewId]

  if (CustomView) {
    return <CustomView {...props} category={category} />
  }

  return (
    <div className='pt-8 overflow-hidden'>
      <SlotBar {...props} />
      <div className='mt-4 mb-8 pr-24'>
        <SearchInput {...props} />
      </div>
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogPostListPage {...props} />
      ) : (
        <BlogPostListScroll {...props} />
      )}
    </div>
  )
}
