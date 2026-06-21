// import Image from 'next/image'
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { loadExternalResource } from '@/lib/utils'
import { useEffect, useState } from 'react'
import CONFIG from '../config'
import NavButtonGroup from './NavButtonGroup'

let wrapperTop = 0

/**
 * 顶部全屏大图
 * @returns
 */
const Hero = props => {
  const [typed, changeType] = useState()
  const { siteInfo } = props
  const { locale } = useGlobal()
  const scrollToWrapper = () => {
    window.scrollTo({ top: wrapperTop, behavior: 'smooth' })
  }

  const GREETING_WORDS = siteConfig('GREETING_WORDS').split(',')
  useEffect(() => {
    updateHeaderHeight()

    if (!typed && window && document.getElementById('typed')) {
      loadExternalResource('/js/typed.min.js', 'js').then(() => {
        if (window.Typed) {
          changeType(
            new window.Typed('#typed', {
              strings: GREETING_WORDS,
              typeSpeed: 200,
              backSpeed: 100,
              backDelay: 400,
              showCursor: true,
              smartBackspace: true
            })
          )
        }
      })
    }

    window.addEventListener('resize', updateHeaderHeight)
    return () => {
      window.removeEventListener('resize', updateHeaderHeight)
    }
  }, [])

  function updateHeaderHeight() {
    requestAnimationFrame(() => {
      const wrapperElement = document.getElementById('wrapper')
      wrapperTop = wrapperElement?.offsetTop
    })
  }

  return (
    <header
      id='header'
      style={{ zIndex: 1 }}
      className='w-full relative overflow-hidden'>
      {/* 现代渐变背景 */}
      {/* <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900/20 to-black'></div> */}

      {/* 动画背景光效 */}
      {/* <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-0 -left-1/2 w-full h-full bg-gradient-to-r from-indigo-500/30 to-transparent rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-0 -right-1/2 w-full h-full bg-gradient-to-l from-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse'></div>
      </div> */}

      {/* 主要内容 */}
      <div className='text-white absolute inset-0 flex flex-col items-center justify-center w-full relative z-10'>
        {/* 站点标题  */}
        {/* <div className='font-black text-5xl md:text-7xl shadow-2xl text-center px-4 leading-tight'>
          <span className='bg-gradient-to-r from-cyan-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent'>
            {siteInfo?.title || siteConfig('TITLE')}
          </span>
        </div> */}

        {/* 站点欢迎语  */}
        <div className='mt-6 h-16 items-center text-center font-medium text-xl md:text-2xl'>
          <span id='typed' className='text-gray-200' />
        </div>

        {/* 首页导航大按钮 */}
        {/* {siteConfig('HEXO_HOME_NAV_BUTTONS', null, CONFIG) && (
          <NavButtonGroup {...props} />
        )} */}

        {/* 滚动提示 - 现代动画 */}
        {/* <div
          onClick={scrollToWrapper}
          className='z-10 cursor-pointer absolute bottom-8 flex flex-col items-center gap-3 group hover:opacity-80 transition-opacity'>
          <div className='text-xs font-semibold text-gray-300 uppercase tracking-widest'>
            {siteConfig('HEXO_SHOW_START_READING', null, CONFIG) &&
              locale.COMMON.START_READING}
          </div>
          <div className='animate-bounce'>
            <i className='fas fa-chevron-down text-lg text-indigo-400 group-hover:text-cyan-400 transition-colors' />
          </div>
        </div> */}
      </div>

      {/* 背景图片 */}
      {/* <LazyImage
        id='header-cover'
        alt={siteInfo?.title}
        src={siteInfo?.pageCover}
        className={`header-cover absolute inset-0 w-full h-screen object-cover object-center opacity-40 ${siteConfig('HEXO_HOME_NAV_BACKGROUND_IMG_FIXED', null, CONFIG) ? 'fixed' : ''}`}
      /> */}
    </header>
  )
}

export default Hero
