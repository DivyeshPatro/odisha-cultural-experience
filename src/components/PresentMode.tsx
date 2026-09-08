import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CHAPTERS } from '../data/nav'
import { LotusMark } from './Motifs'

/* ------------------------------------------------------------------
  PRESENT MODE — the exhibition as a guided display.

   For showing this on a monitor in the bay rather than on a phone in
   someone's hand. It does not rebuild the site as slides; it puts a
   deck's controls on top of the chapters that already exist:

     · ← → / space / click       previous and next viewport
    · play                      show every viewport in one minute
     · F                         enter or leave fullscreen
     · Esc                       leave

   Stops are measured from the rendered chapter heights, so longer
   rooms receive enough views to show their content.

   Auto-advance stops the moment anyone touches the page, because a
   deck that yanks the view away while you are reading is worse than no
   deck at all.
-------------------------------------------------------------------*/

const TOUR_DURATION = 60000
const WHEEL_DURATION = 5700
const PRESENT_CHAPTERS = [{ id: 'top', numeral: '', label: 'Odisha' }, ...CHAPTERS]

interface PresentStop {
  id: string
  y: number
  page: number
  pages: number
}

function getDwell(stops: PresentStop[]) {
  const regularStops = Math.max(1, stops.length - 1)
  return (TOUR_DURATION - WHEEL_DURATION) / regularStops
}

function measureStops(): PresentStop[] {
  const viewport = window.innerHeight
  const stride = Math.max(360, viewport * 0.78)
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - viewport)

  return PRESENT_CHAPTERS.flatMap(({ id }) => {
    const element = document.getElementById(id)
    if (!element) return []

    const top = Math.max(0, element.getBoundingClientRect().top + window.scrollY)
    const last = Math.min(maxScroll, Math.max(top, top + element.offsetHeight - viewport))
    const positions = [top]

    for (let y = top + stride; y < last - stride * 0.3; y += stride) positions.push(y)
    if (last - positions[positions.length - 1] > 120) positions.push(last)

    return positions.map((y, page) => ({ id, y, page: page + 1, pages: positions.length }))
  })
}

interface PresentModeProps {
  soundSupported: boolean
  startSound: () => void
  stopSound: () => void
}

export function PresentMode({ soundSupported, startSound, stopSound }: PresentModeProps) {
  const [on, setOn] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [stops, setStops] = useState<PresentStop[]>([])
  const [stopIndex, setStopIndex] = useState(0)
  const timer = useRef(0)

  const refreshStops = useCallback(() => {
    const next = measureStops()
    setStops(next)
    setStopIndex((current) => Math.min(current, Math.max(0, next.length - 1)))
    return next
  }, [])

  const go = useCallback((index: number, availableStops = stops) => {
    if (!availableStops.length) return
    const nextIndex = Math.max(0, Math.min(availableStops.length - 1, index))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setStopIndex(nextIndex)
    window.scrollTo({ top: availableStops[nextIndex].y, behavior: reduced ? 'auto' : 'smooth' })
  }, [stops])

  const enter = () => {
    setOn(true)
    setPlaying(false)
    requestAnimationFrame(() => {
      const next = refreshStops()
      go(0, next)
    })
  }

  const exit = useCallback(() => {
    setOn(false)
    setPlaying(false)
    stopSound()
    if (document.fullscreenElement) void document.exitFullscreen()
  }, [stopSound])

  const pause = useCallback(() => {
    setPlaying(false)
    stopSound()
  }, [stopSound])

  const toggleFullscreen = useCallback(async () => {
    if (document.fullscreenElement) await document.exitFullscreen()
    else await document.documentElement.requestFullscreen()
  }, [])

  useEffect(() => {
    document.documentElement.toggleAttribute('data-present', on)
    return () => document.documentElement.removeAttribute('data-present')
  }, [on])

  useEffect(() => {
    const root = document.documentElement
    const stop = stops[stopIndex]
    if (!on || !stop) {
      delete root.dataset.presentStop
      delete root.dataset.presentPage
      delete root.dataset.presentDwell
      return
    }
    root.dataset.presentStop = stop.id
    root.dataset.presentPage = String(stop.page)
    root.dataset.presentDwell = String(Math.round(getDwell(stops)))
    return () => {
      delete root.dataset.presentStop
      delete root.dataset.presentPage
      delete root.dataset.presentDwell
    }
  }, [on, stopIndex, stops])

  useEffect(() => {
    const onFullscreen = () => setFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onFullscreen)
    return () => document.removeEventListener('fullscreenchange', onFullscreen)
  }, [])

  useEffect(() => {
    if (!on) return
    const onResize = () => refreshStops()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [on, refreshStops])

  useEffect(() => {
    if (!on) return
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        setStopIndex((current) => {
          let nearest = current
          let distance = Number.POSITIVE_INFINITY
          stops.forEach((stop, index) => {
            const nextDistance = Math.abs(stop.y - window.scrollY)
            if (nextDistance < distance) {
              nearest = index
              distance = nextDistance
            }
          })
          return nearest
        })
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [on, stops])

  useEffect(() => {
    if (!on || !playing || !stops.length) return
    const stop = stops[stopIndex]
    if (stop?.id === 'wheel' && stop.page === 1) return
    timer.current = window.setTimeout(
      () => go(stopIndex >= stops.length - 1 ? 0 : stopIndex + 1),
      getDwell(stops),
    )
    return () => window.clearTimeout(timer.current)
  }, [on, playing, stopIndex, stops, go])

  useEffect(() => {
    if (!on) return
    const advance = () => go(stopIndex >= stops.length - 1 ? 0 : stopIndex + 1)
    window.addEventListener('odisha:present-next', advance)
    return () => window.removeEventListener('odisha:present-next', advance)
  }, [on, stopIndex, stops.length, go])

  useEffect(() => {
    if (!playing) return
    window.addEventListener('wheel', pause, { passive: true })
    window.addEventListener('touchstart', pause, { passive: true })
    return () => {
      window.removeEventListener('wheel', pause)
      window.removeEventListener('touchstart', pause)
    }
  }, [playing, pause])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!on) return
      if (event.key === 'Escape') {
        exit()
        return
      }

      const element = document.activeElement as HTMLElement | null
      if (element?.matches('input, textarea, select, button, a, [role="slider"]')) return

      if (event.key.toLowerCase() === 'f') {
        event.preventDefault()
        void toggleFullscreen()
      } else if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault()
        pause()
        go(stopIndex + 1)
      } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault()
        pause()
        go(stopIndex - 1)
      } else if (event.key === 'Home') {
        event.preventDefault()
        pause()
        go(0)
      } else if (event.key === 'End') {
        event.preventDefault()
        pause()
        go(stops.length - 1)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [on, stopIndex, stops.length, go, exit, pause, toggleFullscreen])

  if (!on) {
    return (
      <button className="presbtn" type="button" onClick={enter} title="Start the guided display">
        <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2.5" y="4" width="19" height="13" rx="1.6" />
          <path d="M9 20h6M12 17v3" strokeLinecap="round" />
        </svg>
        <span>Present</span>
      </button>
    )
  }

  const stop = stops[stopIndex] ?? { id: 'top', page: 1, pages: 1 }
  const chapterIndex = Math.max(0, PRESENT_CHAPTERS.findIndex((chapter) => chapter.id === stop.id))
  const chapter = PRESENT_CHAPTERS[chapterIndex]

  return createPortal(
    <div className="presbar" role="group" aria-label="Presentation controls">
      <button className="presbar__tool" type="button" onClick={() => { pause(); go(0) }} aria-label="Restart presentation" title="Restart">
        <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 11a8 8 0 1 1 2.3 6.3M4 11V5m0 6h6" />
        </svg>
      </button>

      <button
        className="presbar__nav"
        type="button"
        onClick={() => {
          pause()
          go(stopIndex - 1)
        }}
        disabled={stopIndex === 0}
        aria-label="Previous view"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>

      <p className="presbar__now" aria-live="polite">
        <LotusMark size={13} />
        {chapter.numeral && <span className="presbar__num">{chapter.numeral}</span>}
        <span className="presbar__label">{chapter.label}</span>
        <span className="presbar__count">
          {stop.pages > 1 ? `${stop.page}/${stop.pages} · ` : ''}{chapterIndex + 1}/{PRESENT_CHAPTERS.length}
        </span>
      </p>

      <button
        className={`presbar__play ${playing ? 'is-on' : ''}`}
        type="button"
        onClick={() => {
          if (playing) pause()
          else {
            if (soundSupported) startSound()
            setPlaying(true)
          }
        }}
        aria-pressed={playing}
        aria-label={playing ? 'Pause guided tour' : 'Play the one-minute guided tour'}
        title={playing ? 'Pause' : 'Play'}
      >
        {playing ? (
          <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" fill="currentColor">
            <rect x="7" y="5" width="3.6" height="14" rx="1" />
            <rect x="13.4" y="5" width="3.6" height="14" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" fill="currentColor">
            <path d="M8 5.5 19 12 8 18.5Z" />
          </svg>
        )}
      </button>

      <button
        className="presbar__nav"
        type="button"
        onClick={() => {
          pause()
          go(stopIndex + 1)
        }}
        disabled={stopIndex === stops.length - 1}
        aria-label="Next view"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>

      <button className="presbar__tool" type="button" onClick={() => void toggleFullscreen()} aria-label={fullscreen ? 'Leave fullscreen' : 'Enter fullscreen'} title={fullscreen ? 'Leave fullscreen' : 'Fullscreen'}>
        <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
          {fullscreen ? <path d="M9 4v5H4m11-5v5h5M9 20v-5H4m11 5v-5h5" /> : <path d="M9 4H4v5m11-5h5v5M9 20H4v-5m11 5h5v-5" />}
        </svg>
      </button>

      <a className="presbar__tool" href="./qr/" target="_blank" rel="noreferrer" aria-label="Open audience QR page" title="Audience QR">
        <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM15 14h2v2h-2zM19 14h1v3h-3v3h-3v-2M19 19h1v1h-1z" />
        </svg>
      </a>

      <button className="presbar__exit" type="button" onClick={exit}>
        Exit
      </button>

      <span key={`${playing}-${stopIndex}`} className={`presbar__tick ${playing ? 'is-running' : ''}`} aria-hidden="true" />
    </div>,
    document.body,
  )
}
