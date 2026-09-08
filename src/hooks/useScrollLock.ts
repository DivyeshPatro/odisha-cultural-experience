import { useEffect } from 'react'

/**
 * Locks the page behind an open sheet or menu without the usual iOS
 * scroll-to-top jump: the body is pinned at its current offset and
 * restored on close. Also pads for the scrollbar so the layout doesn't
 * shift on desktop.
 */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return

    const { body, documentElement } = document
    const y = window.scrollY
    const gap = window.innerWidth - documentElement.clientWidth

    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      paddingRight: body.style.paddingRight,
      overflow: body.style.overflow,
    }

    body.style.position = 'fixed'
    body.style.top = `-${y}px`
    body.style.width = '100%'
    body.style.overflow = 'hidden'
    if (gap > 0) body.style.paddingRight = `${gap}px`

    return () => {
      body.style.position = prev.position
      body.style.top = prev.top
      body.style.width = prev.width
      body.style.paddingRight = prev.paddingRight
      body.style.overflow = prev.overflow
      window.scrollTo(0, y)
    }
  }, [locked])
}
