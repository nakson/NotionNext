import Link from 'next/link'
import { useState } from 'react'
/**
 * 支持二级展开的菜单
 * @param {*} param0
 * @returns
 */
export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false)
  const hasSubMenu = link?.subMenus?.length > 0

  if (!link || !link.show) {
    return null
  }

  return (
    <div
      onMouseOver={() => changeShow(true)}
      onMouseOut={() => changeShow(false)}>
      {!hasSubMenu && (
        <Link
          href={link?.href}
          target={link?.target}
          className='menu-link px-3 py-2 no-underline tracking-wider font-mono text-[var(--pixel-text)] hover:text-[var(--pixel-accent)] border-2 border-transparent hover:border-[var(--pixel-accent)] transition-all duration-100 inline-block'>
          {link?.icon && <i className={link?.icon} />} {link?.name}
          {hasSubMenu && <i className='px-2 fa fa-angle-down'></i>}
        </Link>
      )}

      {hasSubMenu && (
        <>
          <div className='cursor-pointer menu-link px-3 py-2 no-underline tracking-wider font-mono text-[var(--pixel-text)] hover:text-[var(--pixel-accent)] border-2 border-transparent hover:border-[var(--pixel-accent)] relative transition-all duration-100 inline-block'>
            {link?.icon && <i className={link?.icon} />} {link?.name}
            <i
              className={`px-2 fa fa-angle-down transition-transform duration-300 inline-block ${show ? 'rotate-180' : 'rotate-0'}`}></i>
            {/* 主菜单下方的安全区域 */}
            {show && (
              <div className='absolute w-full h-3 -bottom-1 left-0 bg-transparent z-30'></div>
            )}
          </div>
        </>
      )}

      {/* 子菜单 - 像素风设计 */}
      {hasSubMenu && (
        <ul
          className={`${show ? 'visible opacity-100 top-12 pointer-events-auto' : 'invisible opacity-0 top-20 pointer-events-none'} drop-shadow-md overflow-hidden text-[var(--pixel-text)] bg-[var(--pixel-bg-light)] transition-all duration-300 z-20 absolute block border-2 border-[var(--pixel-accent)]`}
          style={{
            boxShadow: show ? '3px 3px 0px var(--pixel-secondary)' : 'none'
          }}>
          {link.subMenus.map((sLink, index) => {
            return (
              <li
                key={index}
                className='cursor-pointer hover:bg-[var(--pixel-accent)] hover:text-[var(--pixel-bg)] tracking-wide transition-all duration-100 border-b border-[var(--pixel-accent)] py-2 pr-6 pl-3 font-mono text-sm hover:translate-x-1'>
                <Link href={sLink.href} target={link?.target}>
                  <span className='text-nowrap font-semibold'>
                    {sLink?.icon && <i className={sLink?.icon}> &nbsp; </i>}
                    {sLink.title}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
