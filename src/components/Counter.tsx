import { useEffect, useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface Props {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  duration?: number
}

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)

/**
 * Counts up once, when scrolled into view. Only ever used on measured
 * figures — never on a rounded marketing number, because animating a
 * number implies it was counted.
 *
 * The visible node is aria-hidden and the true value is exposed once as
 * text, so a screen reader announces "155,707 km²" rather than every
 * intermediate frame.
 */
export function Counter({ value, decimals = 0, prefix = '', suffix = '', duration = 1500 }: Props) {
  const { ref, inView } = useInView<HTMLSpanElement>()
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(reduced ? value : 0)
  const raf = useRef(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setShown(value)
      return
    }
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setShown(value * easeOutQuart(t))
      if (t < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [inView, reduced, value, duration])

  const format = (n: number) =>
    n.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

  return (
    <span ref={ref} className="counter">
      <span aria-hidden="true">
        {prefix}
        {format(shown)}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {format(value)}
        {suffix}
      </span>
    </span>
  )
}
