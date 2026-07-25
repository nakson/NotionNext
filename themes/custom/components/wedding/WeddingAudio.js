import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * 婚礼页背景音乐：尝试自动播 + 手势兜底 + 右上角开关
 */
export default function WeddingAudio({
  src,
  volume = 0.35,
  playToken = 0,
  enabled = true
}) {
  const audioRef = useRef(null)
  const wantPlayRef = useRef(true)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!enabled || !src || typeof window === 'undefined') return

    const audio = new Audio(src)
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = Math.min(1, Math.max(0, Number(volume) || 0.35))
    audioRef.current = audio

    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    // 尝试自动播放；失败则保持开场门兜底
    audio.play().catch(() => {
      setPlaying(false)
    })

    const onVisibility = () => {
      if (!audioRef.current) return
      if (document.visibilityState === 'hidden') {
        if (!audioRef.current.paused) {
          wantPlayRef.current = true
          audioRef.current.pause()
        } else {
          wantPlayRef.current = false
        }
      } else if (wantPlayRef.current) {
        audioRef.current.play().catch(() => {})
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.pause()
      audio.src = ''
      audioRef.current = null
    }
  }, [src, volume, enabled])

  // 开场点击等外部令牌触发再次 play
  useEffect(() => {
    if (!playToken || !audioRef.current) return
    wantPlayRef.current = true
    audioRef.current.play().catch(() => {})
  }, [playToken])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      wantPlayRef.current = true
      audio.play().catch(() => {})
    } else {
      wantPlayRef.current = false
      audio.pause()
    }
  }, [])

  if (!enabled || !src) return null

  return (
    <button
      type='button'
      className='wedding-audio-toggle'
      data-wedding-chrome
      aria-label={playing ? '暂停音乐' : '播放音乐'}
      aria-pressed={playing}
      onClick={toggle}>
      {playing ? '♪' : '✕'}
    </button>
  )
}
