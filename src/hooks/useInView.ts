import { useEffect, useRef, useState } from 'react'

interface Options {
  /** Fire once and disconnect. Default true — reveals shouldn't replay. */
  once?: boolean
  rootMargin?: string
  threshold?: number
}

export function useInView<T extends HTMLElement = HTMLDivElement>({
  once = true,
  rootMargin = '0px 0px -12% 0px',
  threshold = 0.12,
}: Options = {}) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // No IntersectionObserver (very old browsers): show everything rather
    // than leaving the page blank.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { rootMargin, threshold },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [once, rootMargin, threshold])

  return { ref, inView }
}
