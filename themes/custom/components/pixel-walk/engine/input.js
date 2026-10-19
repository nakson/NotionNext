/**
 * 键盘状态；触屏走目标由 createWalker 处理 pointer
 */
export function createInput() {
  const keys = new Set()
  // 挂在 document：不依赖 canvas 焦点；输入框聚焦时不抢键
  const target = typeof document !== 'undefined' ? document : null

  const isTypingTarget = el => {
    if (!el || !el.tagName) return false
    const tag = el.tagName.toLowerCase()
    return (
      tag === 'input' ||
      tag === 'textarea' ||
      tag === 'select' ||
      el.isContentEditable
    )
  }

  const onKeyDown = e => {
    if (isTypingTarget(e.target)) return
    const k = e.key.toLowerCase()
    if (
      k === 'arrowup' ||
      k === 'arrowdown' ||
      k === 'arrowleft' ||
      k === 'arrowright' ||
      k === 'w' ||
      k === 'a' ||
      k === 's' ||
      k === 'd' ||
      k === 'e' ||
      k === 'enter'
    ) {
      if (k.startsWith('arrow')) {
        e.preventDefault()
      }
      keys.add(k)
    }
  }

  const onKeyUp = e => {
    keys.delete(e.key.toLowerCase())
  }

  const onBlur = () => keys.clear()

  if (target) {
    target.addEventListener('keydown', onKeyDown, { passive: false })
    target.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', onBlur)
  }

  return {
    isDown(key) {
      return keys.has(key)
    },
    consume(key) {
      if (!keys.has(key)) return false
      keys.delete(key)
      return true
    },
    vector() {
      let x = 0
      let y = 0
      if (this.isDown('a') || this.isDown('arrowleft')) x -= 1
      if (this.isDown('d') || this.isDown('arrowright')) x += 1
      if (this.isDown('w') || this.isDown('arrowup')) y -= 1
      if (this.isDown('s') || this.isDown('arrowdown')) y += 1
      if (x !== 0 && y !== 0) {
        const inv = 1 / Math.SQRT2
        x *= inv
        y *= inv
      }
      return { x, y }
    },
    destroy() {
      if (!target) return
      target.removeEventListener('keydown', onKeyDown)
      target.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', onBlur)
      keys.clear()
    }
  }
}
