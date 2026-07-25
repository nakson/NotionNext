import {
  WeddingClosingSection,
  WeddingCoverSection,
  WeddingEventSection,
  WeddingLayoutBlock
} from './sections/WeddingSections'

/**
 * 按 variant / layout 分发明信片区块
 */
export default function WeddingSection({ section, index, reveal }) {
  if (!section) return null
  switch (section.variant) {
    case 'cover':
      return <WeddingCoverSection section={section} reveal={reveal} />
    case 'event-card':
      return <WeddingEventSection section={section} reveal={reveal} />
    case 'closing':
      return <WeddingClosingSection section={section} reveal={reveal} />
    case 'paper':
    case 'photo-full':
    case 'photo-caption':
    default:
      return (
        <WeddingLayoutBlock
          section={section}
          reveal={reveal}
          index={index}
        />
      )
  }
}
