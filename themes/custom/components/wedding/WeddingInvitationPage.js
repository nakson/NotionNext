import { useCallback, useMemo, useRef, useState } from 'react'
import useWeddingAutoScroll from '@/themes/custom/hooks/useWeddingAutoScroll'
import WeddingAudio from './WeddingAudio'
import WeddingCoverGate from './WeddingCoverGate'
import WeddingSection from './WeddingSection'
import WeddingStyles from './WeddingStyles'

/**
 * 婚礼请柬页主编排（内部滚动容器）
 * @param {{ wedding: object }} props
 */
export default function WeddingInvitationPage({ wedding }) {
  const data = wedding || {}
  const scrollRef = useRef(null)
  const [opened, setOpened] = useState(false)
  const [playToken, setPlayToken] = useState(0)

  const names = useMemo(() => {
    if (data.groom && data.bride) return `${data.groom}  &  ${data.bride}`
    return data.title || '婚礼请柬'
  }, [data.bride, data.groom, data.title])

  const onOpen = useCallback(() => {
    setOpened(true)
    setPlayToken(t => t + 1)
  }, [])

  useWeddingAutoScroll({
    enabled: data.autoScroll !== false,
    opened,
    scrollRef,
    speed: data.autoScrollSpeed || 72,
    resumeDelay: data.resumeDelay || 2000,
    startDelay: 800
  })

  const reveal = data.revealAnimation !== false
  const sections = Array.isArray(data.sections) ? data.sections : []

  const pageStyle = useMemo(() => {
    const style = {}
    if (data.textColor) style['--wed-ink'] = data.textColor
    if (data.mutedColor) style['--wed-muted'] = data.mutedColor
    return style
  }, [data.mutedColor, data.textColor])

  return (
    <div
      ref={scrollRef}
      className='wedding-page'
      data-palette={data.palette || 'ivory'}
      style={pageStyle}>
      <WeddingStyles maxWidth={data.contentMaxWidth || 480} />
      <WeddingCoverGate
        opened={opened}
        onOpen={onOpen}
        names={names}
        hint={data.summary || '诚邀您见证我们的幸福时刻'}
        coverUrl={data.coverUrl}
      />
      <WeddingAudio
        src={data.musicUrl}
        volume={data.musicVolume}
        playToken={playToken}
        enabled={Boolean(data.musicUrl)}
      />
      <div className='wedding-shell'>
        {sections.map((section, index) => (
          <WeddingSection
            key={section.id || `section-${index}`}
            section={section}
            index={index}
            reveal={reveal}
          />
        ))}
      </div>
    </div>
  )
}
