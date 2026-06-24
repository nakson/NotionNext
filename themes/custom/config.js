const CONFIG = {
  // ============ Gruvbox 阅读风主题配置 ============
  THEME_STYLE: 'gruvbox-reading',

  HEXO_HOME_BANNER_ENABLE: true,
  // 3.14.1以后的版本中，欢迎语在blog.config.js中配置，用英文逗号','隔开多个。
  HEXO_HOME_BANNER_GREETINGS: [
    '欢迎阅读',
    '记录与分享',
    'Among cats and books',
    '开始探索…'
  ],

  HEXO_HOME_NAV_BUTTONS: true,
  HEXO_HOME_NAV_BACKGROUND_IMG_FIXED: false,
  HEXO_SHOW_START_READING: true,

  // 菜单配置
  HEXO_MENU_INDEX: true,
  HEXO_MENU_CATEGORY: true,
  HEXO_MENU_TAG: true,
  HEXO_MENU_ARCHIVE: true,
  HEXO_MENU_SEARCH: true,
  HEXO_MENU_RANDOM: true,

  HEXO_POST_LIST_COVER: true,
  HEXO_POST_LIST_COVER_HOVER_ENLARGE: false,

  HEXO_POST_LIST_COVER_DEFAULT: true,
  HEXO_POST_LIST_SUMMARY: true,
  HEXO_POST_LIST_PREVIEW: false,
  HEXO_POST_LIST_IMG_CROSSOVER: true,

  HEXO_ARTICLE_ADJACENT: true,
  HEXO_ARTICLE_COPYRIGHT: true,
  HEXO_ARTICLE_RECOMMEND: true,

  HEXO_WIDGET_LATEST_POSTS: true,
  HEXO_WIDGET_ANALYTICS: false,
  HEXO_WIDGET_TO_TOP: true,
  HEXO_WIDGET_TO_COMMENT: true,
  HEXO_WIDGET_DARK_MODE: true,
  HEXO_WIDGET_TOC: true,

  /** 正文链接色（暗 #83a598 / 亮 #076678） */
  HEXO_THEME_COLOR: '#83a598',
  /** Accent 主色 — 黄/金（h1、选中、标题 hover） */
  HEXO_THEME_NEON_ACCENT: '#fabd2f',
  /**
   * 视觉强度：low 寂静氛围；medium 轻扫描线；high 矩阵雨 canvas
   * @type {'low' | 'medium' | 'high'}
   */
  HEXO_THEME_CYBER_INTENSITY: 'low',
  /** Liquid Glass 浮层材质开关 */
  HEXO_THEME_GLASS_ENABLED: true,
  HEXO_THEME_PIXEL_HEADER_FOOTER: false,
  /**
   * 背景图：完整 https URL，或放在 public 下写 `/xxx.gif`；留空则仅 mesh 氛围
   */
  HEXO_THEME_BG_PIXEL_ART_URL: '',
  /** 背景图不透明度 0–1 */
  HEXO_THEME_BG_ART_OPACITY: 0.08,

  /**
   * 分类专属列表视图（分类名 → viewId）
   * - fine-dining-menu：料理食谱高档菜单风
   * - essay-index：随想录简约行列表
   * - reading-poster-gallery：阅读记录海报画廊
   * - music-notes：音乐手记歌单画廊
   * - 未列出的分类保持默认卡片列表
   */
  CATEGORY_VIEW_MAP: {
    料理食谱: 'fine-dining-menu',
    随想录: 'essay-index',
    阅读记录: 'reading-poster-gallery',
    音乐: 'music-notes'
  },

  /** 音乐手记页配置 */
  MUSIC_NOTES_CONFIG: {
    title: '音乐手记',
    tagFilters: ['全部', '原创音乐', 'AI写歌', '私人歌单']
  },

  /** 分类内搜索框 placeholder（分类名 → 文案；未配置则默认「搜索{分类名}」） */
  CATEGORY_SEARCH_CONFIG: {
    料理食谱: '搜索食谱'
  }
}
export default CONFIG
