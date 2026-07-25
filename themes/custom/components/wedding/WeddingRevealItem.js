/**
 * 苹果官网式分步入场元素
 * @param {{
 *   active: boolean,
 *   delay?: number,
 *   from?: 'up' | 'down' | 'left' | 'right' | 'none',
 *   scale?: boolean,
 *   as?: string,
 *   className?: string,
 *   children: import('react').ReactNode
 * }} props
 */
export default function WeddingRevealItem({
  active,
  delay = 0,
  from = 'up',
  scale = false,
  as: Tag = 'div',
  className = '',
  children
}) {
  const classes = [
    'wedding-reveal',
    `wedding-reveal--${from}`,
    scale ? 'wedding-reveal--scale' : '',
    active ? 'is-shown' : '',
    className
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag
      className={classes}
      style={{ ['--reveal-delay']: `${Math.max(0, delay)}ms` }}>
      {children}
    </Tag>
  )
}
