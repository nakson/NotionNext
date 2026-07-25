import { useRef } from 'react'
import useInView from '@/themes/custom/hooks/useInView'
import WeddingRevealItem from '../WeddingRevealItem'

function SectionShell({ enabled, variant = '', layout = '', children }) {
  const ref = useRef(null)
  const visible = useInView(ref, { enabled })
  const variantClass = variant ? ` wedding-section--${variant}` : ''
  const layoutClass = layout ? ` wedding-layout--${layout}` : ''
  const motionClass = enabled
    ? visible
      ? ' is-visible'
      : ''
    : ' no-motion is-visible'

  return (
    <section
      ref={ref}
      className={`wedding-section${variantClass}${layoutClass}${motionClass}`.trim()}>
      {children(visible || !enabled)}
    </section>
  )
}

function CopyBlock({ section, active, baseDelay = 0, from = 'up' }) {
  return (
    <div className='wedding-layout__copy'>
      {section.title ? (
        <WeddingRevealItem
          active={active}
          delay={baseDelay}
          from={from}
          as='h2'
          className='wedding-section__title'>
          {section.title}
        </WeddingRevealItem>
      ) : null}
      {(section.paragraphs || []).map((p, i) => (
        <WeddingRevealItem
          key={i}
          active={active}
          delay={baseDelay + 100 + i * 90}
          from={from}
          as='p'
          className='wedding-section__text'>
          {p}
        </WeddingRevealItem>
      ))}
    </div>
  )
}

function MediaBlock({
  img,
  active,
  delay = 0,
  from = 'up',
  scale = true,
  className = ''
}) {
  if (!img?.src) return null
  return (
    <WeddingRevealItem
      active={active}
      delay={delay}
      from={from}
      scale={scale}
      className={`wedding-section__media wedding-layout__media ${className}`.trim()}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img.src} alt={img.alt || ''} />
    </WeddingRevealItem>
  )
}

/** 主构图未用到的剩余图片，纵向补全，禁止丢图 */
function RestImages({ images = [], used = 0, active, baseDelay = 320 }) {
  const rest = images.slice(Math.max(0, used))
  if (!rest.length) return null
  return (
    <div className='wedding-layout__gallery-rest'>
      {rest.map((img, i) => (
        <MediaBlock
          key={`${img.src}-${i}`}
          img={img}
          active={active}
          delay={baseDelay + i * 100}
          from='up'
          scale
        />
      ))}
    </div>
  )
}

/**
 * 按 layout 渲染多样图文格局
 */
export function WeddingLayoutBlock({ section, reveal }) {
  const layout = section.layout || 'paper-quote'
  const images = section.images || []
  const img0 = images[0]
  const img1 = images[1]

  if (layout === 'split-text-left') {
    return (
      <SectionShell enabled={reveal} layout='split'>
        {active => (
          <>
            <div className='wedding-layout__grid is-offset-media'>
              <CopyBlock
                section={section}
                active={active}
                baseDelay={0}
                from='left'
              />
              <MediaBlock
                img={img0}
                active={active}
                delay={140}
                from='right'
                scale
              />
            </div>
            <RestImages images={images} used={1} active={active} />
          </>
        )}
      </SectionShell>
    )
  }

  if (layout === 'split-text-right') {
    return (
      <SectionShell enabled={reveal} layout='split'>
        {active => (
          <>
            <div className='wedding-layout__grid is-offset-copy'>
              <MediaBlock
                img={img0}
                active={active}
                delay={0}
                from='left'
                scale
              />
              <CopyBlock
                section={section}
                active={active}
                baseDelay={120}
                from='right'
              />
            </div>
            <RestImages images={images} used={1} active={active} />
          </>
        )}
      </SectionShell>
    )
  }

  if (layout === 'stack-image-top') {
    return (
      <SectionShell enabled={reveal} layout='stack-image-top'>
        {active => (
          <>
            <MediaBlock
              img={img0}
              active={active}
              delay={0}
              from='up'
              scale
            />
            <CopyBlock
              section={section}
              active={active}
              baseDelay={160}
              from='up'
            />
            <RestImages images={images} used={1} active={active} />
          </>
        )}
      </SectionShell>
    )
  }

  if (layout === 'stack-caption-overlap') {
    return (
      <SectionShell enabled={reveal} layout='stack-caption-overlap'>
        {active => (
          <>
            <div className='wedding-layout__frame'>
              <MediaBlock
                img={img0}
                active={active}
                delay={0}
                from='up'
                scale
              />
              <CopyBlock
                section={section}
                active={active}
                baseDelay={180}
                from='up'
              />
            </div>
            <RestImages images={images} used={1} active={active} />
          </>
        )}
      </SectionShell>
    )
  }

  if (layout === 'duo-stagger') {
    return (
      <SectionShell enabled={reveal} layout='duo-stagger'>
        {active => (
          <>
            <div className='wedding-layout__duo'>
              <MediaBlock
                img={img0}
                active={active}
                delay={0}
                from='left'
                scale
                className='wedding-layout__duo-a'
              />
              <MediaBlock
                img={img1 || img0}
                active={active}
                delay={160}
                from='right'
                scale
                className='wedding-layout__duo-b'
              />
            </div>
            <CopyBlock
              section={section}
              active={active}
              baseDelay={280}
              from='up'
            />
            <RestImages
              images={images}
              used={img1 ? 2 : 1}
              active={active}
              baseDelay={400}
            />
          </>
        )}
      </SectionShell>
    )
  }

  if (layout === 'full-bleed') {
    return (
      <SectionShell enabled={reveal} layout='full-bleed'>
        {active => (
          <>
            <MediaBlock
              img={img0}
              active={active}
              delay={0}
              from='up'
              scale
            />
            <CopyBlock
              section={section}
              active={active}
              baseDelay={180}
              from='up'
            />
            <RestImages images={images} used={1} active={active} />
          </>
        )}
      </SectionShell>
    )
  }

  // paper-quote：纯文字 + 若误带图也全部展示
  return (
    <SectionShell enabled={reveal} layout='paper-quote'>
      {active => (
        <>
          <CopyBlock
            section={section}
            active={active}
            baseDelay={0}
            from='up'
          />
          <RestImages images={images} used={0} active={active} baseDelay={160} />
        </>
      )}
    </SectionShell>
  )
}

export function WeddingCoverSection({ section, reveal }) {
  const img = section.images?.[0]
  return (
    <SectionShell enabled={reveal} variant='cover' layout='cover'>
      {active => (
        <>
          {img?.src ? (
            <WeddingRevealItem
              active={active}
              delay={0}
              from='none'
              scale
              className='wedding-section__media'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt || section.title || ''} />
            </WeddingRevealItem>
          ) : null}
          <div className='wedding-section__body'>
            <WeddingRevealItem
              active={active}
              delay={120}
              from='up'
              as='h2'
              className='wedding-section__title'>
              {section.title}
            </WeddingRevealItem>
            {section.meta?.dateText ? (
              <WeddingRevealItem
                active={active}
                delay={220}
                from='up'
                as='p'
                className='wedding-section__text'>
                {section.meta.dateText}
              </WeddingRevealItem>
            ) : null}
            {(section.paragraphs || []).map((p, i) => (
              <WeddingRevealItem
                key={i}
                active={active}
                delay={280 + i * 90}
                from='up'
                as='p'
                className='wedding-section__text'>
                {p}
              </WeddingRevealItem>
            ))}
          </div>
        </>
      )}
    </SectionShell>
  )
}

export function WeddingEventSection({ section, reveal }) {
  const meta = section.meta || {}
  return (
    <SectionShell enabled={reveal} variant='event-card' layout='event-card'>
      {active => (
        <>
          <WeddingRevealItem
            active={active}
            delay={0}
            from='up'
            as='h2'
            className='wedding-section__title'>
            {section.title || '婚礼信息'}
          </WeddingRevealItem>
          {meta.dateText ? (
            <WeddingRevealItem
              active={active}
              delay={100}
              from='up'
              as='p'
              className='wedding-meta'>
              {meta.dateText}
            </WeddingRevealItem>
          ) : null}
          {meta.venue ? (
            <WeddingRevealItem
              active={active}
              delay={180}
              from='up'
              as='p'
              className='wedding-meta'>
              {meta.venue}
            </WeddingRevealItem>
          ) : null}
          {meta.address ? (
            <WeddingRevealItem
              active={active}
              delay={260}
              from='up'
              as='p'
              className='wedding-meta wedding-meta--muted'>
              {meta.address}
            </WeddingRevealItem>
          ) : null}
          {(section.paragraphs || []).map((p, i) => (
            <WeddingRevealItem
              key={i}
              active={active}
              delay={320 + i * 80}
              from='up'
              as='p'
              className='wedding-section__text'>
              {p}
            </WeddingRevealItem>
          ))}
          {meta.mapUrl ? (
            <WeddingRevealItem active={active} delay={400} from='up'>
              <a
                className='wedding-map-link'
                href={meta.mapUrl}
                target='_blank'
                rel='noreferrer'>
                打开地图
              </a>
            </WeddingRevealItem>
          ) : null}
        </>
      )}
    </SectionShell>
  )
}

export function WeddingClosingSection({ section, reveal }) {
  return (
    <SectionShell enabled={reveal} variant='closing' layout='closing'>
      {active => (
        <>
          <WeddingRevealItem
            active={active}
            delay={0}
            from='up'
            as='h2'
            className='wedding-section__title'>
            {section.title || '期待与您相见'}
          </WeddingRevealItem>
          {(section.paragraphs || []).map((p, i) => (
            <WeddingRevealItem
              key={i}
              active={active}
              delay={140 + i * 100}
              from='up'
              as='p'
              className='wedding-section__text'>
              {p}
            </WeddingRevealItem>
          ))}
          {section.meta?.dateText ? (
            <WeddingRevealItem
              active={active}
              delay={280}
              from='up'
              as='p'
              className='wedding-section__text'>
              {section.meta.dateText}
            </WeddingRevealItem>
          ) : null}
        </>
      )}
    </SectionShell>
  )
}
