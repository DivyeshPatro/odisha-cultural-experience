export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  // Move keyboard focus with the viewport, or the next Tab press jumps
  // back to wherever the user was before they clicked.
  el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}

/** Smallest signed difference between two angles, in degrees. */
export function angleDelta(from: number, to: number): number {
  let d = ((to - from + 540) % 360) - 180
  if (d === -180) d = 180
  return d
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}
