import { useCallback, useEffect, useRef, useState } from 'react'
import { WheelArt } from '../components/KonarkWheel'
import { Glyph } from '../components/Glyph'
import { SectionHeader } from '../components/SectionHeader'
import { SourceTag } from '../components/SourceTag'
import { Reveal } from '../components/Reveal'
import { WHEEL_READINGS, WHEEL_SPOKES } from '../data/wheel'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { angleDelta, clamp, scrollToId } from '../utils/scroll'

const STEP = 360 / WHEEL_SPOKES.length // 45°
const PRESENT_STEP_DURATION = 650
const PRESENT_SETTLE_DURATION = 500

const indexFromAngle = (deg: number) =>
  ((-Math.round(deg / STEP) % WHEEL_SPOKES.length) + WHEEL_SPOKES.length) % WHEEL_SPOKES.length

/** Nearest angle equivalent to sector `i`, measured from the current angle. */
const angleForIndex = (i: number, from: number) => {
  const base = -i * STEP
  return base + 360 * Math.round((from - base) / 360)
}

export function WheelSection() {
  const reduced = useReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)
  const rotorRef = useRef<HTMLDivElement>(null)

  const angle = useRef(0)
  const drag = useRef<{ id: number; last: number; t: number; v: number; moved: boolean } | null>(null)
  const presentationSteps = useRef(0)

  const [active, setActive] = useState(0)
  const [touched, setTouched] = useState(false)
  const [presenting, setPresenting] = useState(false)

  const setRot = useCallback((deg: number, animate: boolean) => {
    const rotor = rotorRef.current
    if (!rotor) return
    angle.current = deg
    rotor.style.transition = animate
      ? 'transform 520ms cubic-bezier(0.16, 1, 0.3, 1)'
      : 'none'
    rotor.style.setProperty('--rot', `${deg}deg`)
  }, [])

  useEffect(() => {
    setRot(0, false)
  }, [setRot])

  useEffect(() => {
    const root = document.documentElement
    const sync = () => {
      const isWheelStop = root.dataset.presentStop === 'wheel' && root.dataset.presentPage === '1'
      setPresenting(root.hasAttribute('data-present') && isWheelStop)
    }
    const observer = new MutationObserver(sync)
    sync()
    observer.observe(root, {
      attributes: true,
      attributeFilter: ['data-present', 'data-present-stop', 'data-present-page'],
    })
    return () => observer.disconnect()
  }, [])

  const goTo = useCallback(
    (i: number, markTouched = true) => {
      setActive(i)
      if (markTouched) setTouched(true)
      setRot(angleForIndex(i, angle.current), !reduced)
    },
    [reduced, setRot],
  )

  useEffect(() => {
    if (!presenting) return
    presentationSteps.current = 0
    goTo(0, false)
    let completionTimer = 0
    const timer = window.setInterval(() => {
      if (drag.current) return
      const next = (indexFromAngle(angle.current) + 1) % WHEEL_SPOKES.length
      goTo(next, false)
      presentationSteps.current += 1
      if (presentationSteps.current === WHEEL_SPOKES.length) {
        window.clearInterval(timer)
        completionTimer = window.setTimeout(
          () => window.dispatchEvent(new Event('odisha:present-next')),
          PRESENT_SETTLE_DURATION,
        )
      }
    }, PRESENT_STEP_DURATION)
    return () => {
      window.clearInterval(timer)
      window.clearTimeout(completionTimer)
    }
  }, [presenting, reduced, goTo])

  /* ---- pointer rotation ------------------------------------------- */

  const pointerAngle = (e: React.PointerEvent) => {
    const box = stageRef.current!.getBoundingClientRect()
    const cx = box.left + box.width / 2
    const cy = box.top + box.height / 2
    return (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI
  }

  const onDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return
    if ((e.target as Element).closest('.kw__tab')) return
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    drag.current = { id: e.pointerId, last: pointerAngle(e), t: performance.now(), v: 0, moved: false }
    setRot(angle.current, false)
  }

  const onMove = (e: React.PointerEvent) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    const now = performance.now()
    const a = pointerAngle(e)
    const delta = angleDelta(d.last, a)
    const dt = Math.max(1, now - d.t)

    d.last = a
    d.t = now
    d.v = delta / dt // deg per ms
    if (Math.abs(delta) > 0.4) d.moved = true

    setRot(angle.current + delta, false)

    const next = indexFromAngle(angle.current)
    setActive((cur) => (cur === next ? cur : next))
    if (!touched) setTouched(true)
  }

  const onUp = (e: React.PointerEvent) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    drag.current = null
    try {
      ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    } catch {
      /* pointer already gone */
    }
    if (!d.moved) {
      const clickedTab = (e.target as Element).closest('.kw__tab')
      if (!clickedTab) {
        const next = (indexFromAngle(angle.current) + 1) % WHEEL_SPOKES.length
        goTo(next)
      }
      return
    }

    // Let the flick carry, then settle on the nearest spoke. Capped so a
    // hard swipe can't send it spinning for a second and a half.
    const carry = clamp(d.v * 190, -360, 360)
    const projected = angle.current + (reduced ? 0 : carry)
    const snapped = Math.round(projected / STEP) * STEP
    setRot(snapped, !reduced)
    setActive(indexFromAngle(snapped))
  }

  /* ---- keyboard ---------------------------------------------------- */

  const onKeyDown = (e: React.KeyboardEvent) => {
    const n = WHEEL_SPOKES.length
    let next: number | null = null
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (active + 1) % n
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (active - 1 + n) % n
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = n - 1
    if (next === null) return
    e.preventDefault()
    goTo(next)
    stageRef.current?.querySelector<HTMLElement>(`#kw-tab-${next}`)?.focus()
  }

  const spoke = WHEEL_SPOKES[active]

  return (
    <section id="wheel" className="section section--tint wheelsec" aria-labelledby="wheel-title">
      <div className="wrap">
        <SectionHeader
          numeral="II"
          eyebrow="The signature"
          title={
            <span id="wheel-title">
              Eight spokes. Eight watches of the day. <span className="gold">Turn it.</span>
            </span>
          }
          lede="Each of the twenty-four wheels at Konark carries eight major spokes, traditionally read as the eight praharas — the three-hour watches an Indian day is divided into. This exhibition is built on that structure. Tap to advance a spoke, drag to turn, or use the arrow keys."
        />

        <div className="wheelsec__grid">
          <Reveal className="wheelsec__stagewrap">
            <div
              ref={stageRef}
              className={`kw ${touched ? 'is-touched' : ''} ${presenting ? 'is-presenting' : ''}`}
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
            >
              <div className="kw__gnomon" aria-hidden="true">
                <svg viewBox="0 0 28 40" width="28" height="40">
                  <path d="M14 40 4 12 14 0l10 12Z" fill="currentColor" opacity="0.9" />
                  <path d="M14 34 9 14l5-7 5 7Z" fill="var(--ink-900)" opacity="0.55" />
                </svg>
              </div>

              <div ref={rotorRef} className="kw__rotor">
                <WheelArt active={active} />

                <div
                  className="kw__tabs"
                  role="tablist"
                  aria-label="Chapters of the exhibition"
                  aria-orientation="horizontal"
                  onKeyDown={onKeyDown}
                >
                  {WHEEL_SPOKES.map((s, i) => {
                    const deg = i * STEP
                    return (
                      <button
                        key={s.id}
                        id={`kw-tab-${i}`}
                        role="tab"
                        type="button"
                        aria-selected={i === active}
                        aria-controls="kw-panel"
                        tabIndex={i === active ? 0 : -1}
                        className={`kw__tab ${i === active ? 'is-active' : ''}`}
                        // The radius is a length, not a percentage — a
                        // percentage here would resolve against the 46px
                        // button, not the wheel, and stack every tab on
                        // top of the hub.
                        style={{
                          transform: `rotate(${deg}deg) translateY(calc(var(--kw-r) * -1)) rotate(${-deg}deg)`,
                        }}
                        onClick={() => goTo(i)}
                      >
                        <span className="kw__tabinner" aria-hidden="true">
                          <Glyph name={s.glyph} size={19} />
                        </span>
                        <span className="sr-only">{s.title}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <p className={`kw__hint ${touched ? 'is-gone' : ''}`} aria-hidden="true">
                tap or drag
              </p>
            </div>
          </Reveal>

          <div className="wheelsec__panel" id="kw-panel" role="tabpanel" aria-labelledby={`kw-tab-${active}`}>
            <p className="wheelsec__prahara">{spoke.prahara}</p>
            <h3 className="wheelsec__title">
              {spoke.title}
              <span className="wheelsec__odia odia">{spoke.odia}</span>
            </h3>
            <p className="wheelsec__line">{spoke.line}</p>

            {spoke.target ? (
              <button className="btn wheelsec__go" type="button" onClick={() => scrollToId(spoke.target!)}>
                Open this chapter
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ) : (
              <ul className="wheelsec__readings">
                {WHEEL_READINGS.map((r) => (
                  <li key={r.heading}>
                    <h4>{r.heading}</h4>
                    <p>{r.body}</p>
                    <SourceTag cite={r.cite} confidence={r.confidence} caveat={r.caveat} />
                  </li>
                ))}
              </ul>
            )}

            <p className="wheelsec__count">
              <span aria-hidden="true">{String(active + 1).padStart(2, '0')}</span>
              <span className="sr-only">Sector {active + 1}</span>
              <span className="wheelsec__rule" />
              <span aria-hidden="true">{String(WHEEL_SPOKES.length).padStart(2, '0')}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
