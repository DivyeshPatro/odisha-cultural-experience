import { useCallback, useEffect, useRef, useState } from 'react'
import { MiniWheel } from './KonarkWheel'
import { clamp } from '../utils/scroll'

/* ------------------------------------------------------------------
   THE ROLLING WHEEL — a Konark chakra as the scroll indicator.

   It rolls, properly: the rotation is derived from how far the wheel
   has travelled along its rail divided by its radius, which is what a
   wheel actually does. Scroll to the bottom and it has turned the
   number of times a 40px wheel would turn covering that rail.

   Two layouts from one element (it is `position: fixed` in both, so a
   single node can be in two places):

     ≥ 900px   a vertical rail down the right margin
     < 900px   horizontal, riding the progress line under the nav bar,
               where it cannot collide with body text

   Orientation is read from the rail's own measured shape rather than
   from a duplicated media query, so the two can never disagree.

   It is also a real control: drag it, or focus it and use the arrow
   keys, and it scrubs the page. That is why it is a `slider` and not a
   decorative div.
-------------------------------------------------------------------*/

const WHEEL_R = 20 // px, matches --sw-size / 2 in the stylesheet

/**
 * One full turn per screenful scrolled.
 *
 * The first version derived rotation from how far the wheel moved along
 * its own rail divided by its radius — physically exact, and useless:
 * the rail is ~350px long and the document is ~36,000px, so the wheel
 * turned 24° per screen and looked completely static. Rolling it against
 * the page instead makes it obvious that it is rolling, which is the
 * entire point of it being a wheel.
 */
const TURNS_PER_SCREEN = 1

export function ScrollWheel() {
  const railRef = useRef<HTMLDivElement>(null)
  const wheelRef = useRef<HTMLButtonElement>(null)
  const dragging = useRef(false)
  const frame = useRef(0)
  const [pct, setPct] = useState(0)

  /** Vertical when the rail is taller than it is wide. */
  const isVertical = () => {
    const r = railRef.current?.getBoundingClientRect()
    return !!r && r.height > r.width
  }

  const paint = useCallback((p: number, scrollY: number) => {
    const rail = railRef.current
    if (!rail) return
    const deg = (scrollY / Math.max(1, window.innerHeight)) * 360 * TURNS_PER_SCREEN
    rail.style.setProperty('--p', String(p))
    rail.style.setProperty('--rot', `${deg.toFixed(1)}deg`)
  }, [])

  const maxScroll = () =>
    Math.max(1, document.documentElement.scrollHeight - window.innerHeight)

  useEffect(() => {
    const onScroll = () => {
      if (frame.current) return
      frame.current = requestAnimationFrame(() => {
        frame.current = 0
        const p = clamp(window.scrollY / maxScroll(), 0, 1)
        paint(p, window.scrollY)
        // React state only for aria-valuenow — one update per whole percent,
        // not one per frame.
        setPct((prev) => {
          const next = Math.round(p * 100)
          return prev === next ? prev : next
        })
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [paint])

  /* ---- drag / tap to scrub ---- */

  const scrubTo = (clientX: number, clientY: number) => {
    const rail = railRef.current
    if (!rail) return
    const box = rail.getBoundingClientRect()
    const p = isVertical()
      ? (clientY - box.top - WHEEL_R) / (box.height - WHEEL_R * 2)
      : (clientX - box.left - WHEEL_R) / (box.width - WHEEL_R * 2)
    window.scrollTo({ top: clamp(p, 0, 1) * maxScroll(), behavior: 'auto' })
  }

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    scrubTo(e.clientX, e.clientY)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    scrubTo(e.clientX, e.clientY)
  }
  const onPointerUp = (e: React.PointerEvent) => {
    dragging.current = false
    try {
      ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    } catch {
      /* pointer already released */
    }
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const max = maxScroll()
    const step = window.innerHeight * 0.15
    let top: number | null = null
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        top = window.scrollY + step
        break
      case 'ArrowUp':
      case 'ArrowLeft':
        top = window.scrollY - step
        break
      case 'PageDown':
        top = window.scrollY + window.innerHeight * 0.9
        break
      case 'PageUp':
        top = window.scrollY - window.innerHeight * 0.9
        break
      case 'Home':
        top = 0
        break
      case 'End':
        top = max
        break
      default:
        return
    }
    e.preventDefault()
    window.scrollTo({ top: clamp(top, 0, max), behavior: 'smooth' })
  }

  return (
    <div
      ref={railRef}
      className="srail"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <span className="srail__track" aria-hidden="true" />
      <span className="srail__fill" aria-hidden="true" />
      <button
        ref={wheelRef}
        type="button"
        className="srail__wheel"
        role="slider"
        aria-label="Reading progress — drag the wheel to move through the exhibition"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-valuetext={`${pct}% through the exhibition`}
        onKeyDown={onKeyDown}
      >
        <MiniWheel />
      </button>
    </div>
  )
}
