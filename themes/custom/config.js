const CONFIG = {
  // ============ 像素风主题配置 ============
  THEME_STYLE: 'pixel-cyberpunk', // 像素赛博朋克风格标识

  HEXO_HOME_BANNER_ENABLE: true,
  // 3.14.1以后的版本中，欢迎语在blog.config.js中配置，用英文逗号','隔开多个。
  HEXO_HOME_BANNER_GREETINGS: [
    'SYSTEM INITIALIZED > 欢迎进入我的数字领地',
    'LOADING PERSONA > 我是一个程序员',
    'ENTERING MATRIX > 让我们一起探索代码的世界',
    '> 访问成功！开始阅读...'
  ], // 首页大图标语文字 - 像素风风格

  HEXO_HOME_NAV_BUTTONS: true, // 首页是否显示分类大图标按钮
  HEXO_HOME_NAV_BACKGROUND_IMG_FIXED: false,
  HEXO_SHOW_START_READING: true,

  // 菜单配置
  HEXO_MENU_INDEX: true, // 显示首页
  HEXO_MENU_CATEGORY: true, // 显示分类
  HEXO_MENU_TAG: true, // 显示标签
  HEXO_MENU_ARCHIVE: true, // 显示归档
  HEXO_MENU_SEARCH: true, // 显示搜索
  HEXO_MENU_RANDOM: true, // 显示随机跳转按钮

  HEXO_POST_LIST_COVER: true, // 列表显示文章封面
  HEXO_POST_LIST_COVER_HOVER_ENLARGE: false, // 列表鼠标悬停放大

  HEXO_POST_LIST_COVER_DEFAULT: true, // 封面为空时用站点背景做默认封面
  HEXO_POST_LIST_SUMMARY: true, // 文章摘要
  HEXO_POST_LIST_PREVIEW: false, // 读取文章预览
  HEXO_POST_LIST_IMG_CROSSOVER: true, // 博客列表图片左右交错

  HEXO_ARTICLE_ADJACENT: true, // 显示上一篇下一篇文章推荐
  HEXO_ARTICLE_COPYRIGHT: true, // 显示文章版权声明
  HEXO_ARTICLE_RECOMMEND: true, // 文章关联推荐

  HEXO_WIDGET_LATEST_POSTS: true, // 显示最新文章卡
  HEXO_WIDGET_ANALYTICS: false, // 显示统计卡
  HEXO_WIDGET_TO_TOP: true,
  HEXO_WIDGET_TO_COMMENT: true, // 跳到评论区
  HEXO_WIDGET_DARK_MODE: true, // 夜间模式
  HEXO_WIDGET_TOC: true, // 移动端悬浮目录

  /** 像素风主题色 - 霓虹青 */
  HEXO_THEME_COLOR: '#00ffff',
  /** 强调色 - 霓虹紫 */
  HEXO_THEME_NEON_ACCENT: '#ff00ff',
  /**
   * 视觉强度：low 寂静夜景；medium 轻扫描线；high 矩阵雨 canvas
   * @type {'low' | 'medium' | 'high'}
   */
  HEXO_THEME_CYBER_INTENSITY: 'medium',
  /** 像素风背景：深蓝黑赛博朋克背景 */
  HEXO_THEME_PIXEL_HEADER_FOOTER: false,
  /**
   * 像素风背景图：完整 https URL，或放在 public 下写 `/xxx.gif`
   * 建议使用赛博朋克/霓虹/像素风格的背景图
   */
  HEXO_THEME_BG_PIXEL_ART_URL: '/images/bk-pixel-cyberpunk.gif',
  /** 背景图不透明度 0–1 */
  HEXO_THEME_BG_ART_OPACITY: 0.15
}
export default CONFIG
