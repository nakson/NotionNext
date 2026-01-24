import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { saveDarkModeToLocalStorage } from '@/themes/theme'
import CONFIG from '../config'

/**
 * 深色模式按钮
 */
export default function ButtonDarkModeFloat() {
  const { isDarkMode, updateDarkMode } = useGlobal()

  if (!siteConfig('HEXO_WIDGET_DARK_MODE', null, CONFIG)) {
    return <></>
  }

  // 用户手动设置主题
  const handleChangeDarkMode = () => {
    const newStatus = !isDarkMode
    saveDarkModeToLocalStorage(newStatus)
    updateDarkMode(newStatus)
    const htmlElement = document.getElementsByTagName('html')[0]
    htmlElement.classList?.remove(newStatus ? 'light' : 'dark')
    htmlElement.classList?.add(newStatus ? 'dark' : 'light')
  }

  return (
    <div
      onClick={handleChangeDarkMode}
      className='floating-button flex justify-center items-center w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg cursor-pointer hover:shadow-lg hover:shadow-amber-500/50 transform hover:scale-110 duration-200 text-white'>
      <i
        id='darkModeButton'
        className={`${isDarkMode ? 'fa-sun' : 'fa-moon'} fas text-sm`}
      />
    </div>
  )
}
