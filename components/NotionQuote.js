/**
 * Notion quote 块渲染（含 markdown | ... 摘抄）
 * react-notion-x 对无 title 的 quote 会返回 null，此处兜底渲染
 */
const NotionQuote = ({ block, children }) => {
  const title = block?.properties?.title
  return (
    <blockquote className='notion-quote custom-quote'>
      {title && <NotionText value={title} />}
      {children}
    </blockquote>
  )
}

/** Notion rich-text 简易内联渲染 */
const NotionText = ({ value }) => {
  if (!Array.isArray(value)) return null
  return value.map((segment, i) => {
    if (!Array.isArray(segment) || !segment[0]) return null
    const [text, formats] = segment
    let element = <>{text}</>
    if (Array.isArray(formats)) {
      for (const fmt of formats) {
        const type = Array.isArray(fmt) ? fmt[0] : fmt
        if (type === 'b') element = <strong>{element}</strong>
        else if (type === 'i') element = <em>{element}</em>
        else if (type === 's') element = <s>{element}</s>
        else if (type === 'c') element = <code>{element}</code>
        else if (type === 'a') {
          element = (
            <a href={Array.isArray(fmt) ? fmt[1] : '#'}>{element}</a>
          )
        }
      }
    }
    return <span key={i}>{element}</span>
  })
}

export default NotionQuote
