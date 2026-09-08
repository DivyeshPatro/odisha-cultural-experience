import { useCallback, useEffect, useRef, type ReactNode } from 'react'
import { useScrollLock } from '../hooks/useScrollLock'

interface Props {
  open: boolean
  onClose: () => void
  title: string
  eyebrow?: string
  children: ReactNode
  /** Colour used for the top hairline and the eyebrow. */
  accent?: string
}

const FOCUSABLE =
  'a[href], button:not([disabled]), summary, input, select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * The detail panel: a bottom sheet on phones, a centred panel on desktop.
 *
 * Focus is moved in on open, trapped while open, and returned to the
 * trigger on close. Escape closes. The backdrop closes. On touch it can
 * be dragged down to dismiss, because that is what a sheet that comes up
 * from the bottom of a phone is expected to do.
 */
export function Sheet({ open, onClose, title, eyebrow, children, accent = 'var(--gold)' }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const restoreTo = useRef<HTMLElement | null>(null)
  const dragStart = useRef<number | null>(null)

  useScrollLock(open)

  // Callers pass an inline arrow for onClose, so it changes identity on
  // every parent render. Kept in a ref, the key handler below can depend
  // on `open` alone — otherwise focus would be yanked back to the close
  // button each time the parent re-rendered.
  const closeRef = useRef(onClose)
  useEffect(() => {
    closeRef.current = onClose
  }, [onClose])

  // Move focus in on open; return it to the trigger on close.
  useEffect(() => {
    if (!open) return
    restoreTo.current = document.activeElement as HTMLElement
    panelRef.current?.querySelector<HTMLElement>('.sheet__close')?.focus()
    return () => restoreTo.current?.focus?.()
  }, [open])

  // Escape to dismiss, Tab cycles inside the panel.
  useEffect(() => {
    if (!open) return
    const panel = panelRef.current

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        closeRef.current()
        return
      }
      if (e.key !== 'Tab' || !panel) return
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      )
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey, true)
    return () => document.removeEventListener('keydown', onKey, true)
  }, [open])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') return
    dragStart.current = e.clientY
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (dragStart.current === null || !panelRef.current) return
    const dy = Math.max(0, e.clientY - dragStart.current)
    panelRef.current.style.transform = `translateY(${dy}px)`
    panelRef.current.style.transition = 'none'
  }, [])

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (dragStart.current === null || !panelRef.current) return
      const dy = e.clientY - dragStart.current
      dragStart.current = null
      panelRef.current.style.transition = ''
      panelRef.current.style.transform = ''
      if (dy > 110) onClose()
    },
    [onClose],
  )

  if (!open) return null

  return (
    <div className="sheet" role="presentation">
      <div className="sheet__scrim" onClick={onClose} />
      <div
        ref={panelRef}
        className="sheet__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        style={{ ['--sheet-accent' as string]: accent }}
      >
        <div
          className="sheet__grab"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <span aria-hidden="true" />
        </div>

        <button className="sheet__close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="sheet__scroll">
          {eyebrow && <p className="sheet__eyebrow">{eyebrow}</p>}
          <h3 id="sheet-title" className="sheet__title">
            {title}
          </h3>
          {children}
        </div>
      </div>
    </div>
  )
}
