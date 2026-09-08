import { useEffect, useState } from 'react'

/**
 * Tracks which chapter is currently on screen, for nav highlighting and the
 * progress rail. One observer for all sections — not one per section.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const seen = new Map<string, number>()

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.intersectionRatio)
        let best = ''
        let bestRatio = 0
        for (const [id, ratio] of seen) {
          if (ratio > bestRatio) {
            best = id
            bestRatio = ratio
          }
        }
        if (best && bestRatio > 0) setActive(best)
      },
      { threshold: [0, 0.15, 0.35, 0.6, 0.9], rootMargin: '-15% 0px -35% 0px' },
    )

    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])

  return active
}
