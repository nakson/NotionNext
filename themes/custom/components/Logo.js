import { siteConfig } from '@/lib/config'
import Link from 'next/link'
/**
 * Logo
 * 实际值支持文字
 * @param {*} props
 * @returns
 */
const Logo = props => {
  const { siteInfo } = props
  return (
    <Link href='/' passHref legacyBehavior>
      <div className='flex flex-col justify-center items-center cursor-pointer space-y-2'>
        <div
          className='font-bold text-lg p-3 font-mono text-[var(--pixel-accent)] border-2 border-[var(--pixel-accent)] bg-[var(--pixel-bg-light)] hover:border-[var(--pixel-secondary)] hover:bg-[var(--pixel-accent)] hover:text-[var(--pixel-bg)] transition-all duration-100 hover:translate-x-[-2px] hover:translate-y-[-2px] shadow-lg'
          style={{
            boxShadow: '3px 3px 0px var(--pixel-accent)',
            textShadow: '1px 1px 0px var(--pixel-secondary)'
          }}>
          {' '}
          {siteInfo?.title || siteConfig('TITLE')}
        </div>
        <div className='text-xs text-[var(--pixel-secondary)] font-mono opacity-75'>
          &gt; LOADING SYSTEM...
        </div>
      </div>
    </Link>
  )
}
export default Logo
