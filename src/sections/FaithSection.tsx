import { useCallback, useEffect, useRef, useState } from 'react'
import { ChapterHeader } from '../components/ChapterHeader'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { SourceTag } from '../components/SourceTag'
import { ArtPlate } from '../components/Plates'
import { CHARIOTS, FAITH_NOTES, RATH_ROUTE, type Chariot } from '../data/heritage'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { clamp } from '../utils/scroll'

/**
 * The chariot: drawn to the proportions the official Puri festival site
 * publishes — 45/44/43 feet tall on 16/14/12 wheels. The wheel count is
 * literal in the drawing, which is why Nandighosa looks different from
 * Darpadalana rather than being the same picture three times.
 */
function Rath({ wheels, heightFt, tint }: { wheels: number; heightFt: number; tint: string }) {
  const perSide = Math.ceil(wheels / 2)
  const bodyW = 168
  const x0 = (200 - bodyW) / 2
  const gap = bodyW / perSide
  // Size the wheels to the axle count instead of fixing the radius —
  // sixteen wheels at r=13 overlapped into an unreadable chain, and
  // this way Nandighosa's sixteen visibly differ from Darpadalana's
  // twelve, which is the point of drawing them at all.
  const r = Math.min(12.5, gap * 0.45)
  const scale = heightFt / 45

  return (
    <svg viewBox="0 0 200 200" className="rath" aria-hidden="true" focusable="false">
      <g style={{ color: tint }}>
        {/* canopy — the tapering cloth tower */}
        <g transform={`translate(100 152) scale(${scale}) translate(-100 -152)`}>
          <path
            d="M100 14 150 122 H50 Z"
            fill="currentColor"
            opacity="0.16"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          {[36, 58, 80, 102].map((y) => {
            const half = ((y - 14) / 108) * 50
            return (
              <path
                key={y}
                d={`M${100 - half} ${y} H${100 + half}`}
                stroke="currentColor"
                strokeWidth="0.9"
                opacity="0.55"
              />
            )
          })}
          {/* flag */}
          <path d="M100 14V4" stroke="currentColor" strokeWidth="1.4" />
          <path d="M100 4 122 9 100 14Z" fill="currentColor" opacity="0.8" />
        </g>

        {/* deck */}
        <rect x={x0} y="124" width={bodyW} height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <rect x={x0 + 6} y="142" width={bodyW - 12} height="12" rx="2" fill="currentColor" opacity="0.14" />

        {/* wheels — all of them, actually counted */}
        <g fill="none" stroke="currentColor" strokeWidth="1.3">
          {Array.from({ length: perSide }, (_, i) => {
            const cx = x0 + gap / 2 + i * gap
            return (
              <g key={i} transform={`translate(${cx} 168)`}>
                <circle r={r} />
                <circle r={r * 0.3} />
                {[0, 45, 90, 135].map((a) => (
                  <path key={a} d={`M0 ${-r}V${r}`} transform={`rotate(${a})`} strokeWidth="0.7" />
                ))}
              </g>
            )
          })}
        </g>
        <path d={`M${x0 - 6} 182 H${x0 + bodyW + 6}`} stroke="currentColor" strokeWidth="1.6" opacity="0.5" />

        {/* the ropes the crowd pulls */}
        <path
          d={`M${x0} 150 C ${x0 - 26} 156, ${x0 - 44} 162, ${x0 - 58} 172`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.6"
        />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------
   PULL THE CHARIOT

   The festival is not a procession people watch. It is a rope that
   hundreds of thousands of people pull, by hand, for about three
   kilometres. So this is a rope you pull.

   The movement is strictly 1:1 with the drag — the chariot advances
   exactly as far as you haul it and not a pixel more, with no easing
   and no momentum. Anything springier would have made it feel light,
   and the one thing everyone says about these chariots is how hard
   they are to move.

   The wheels are honest too: rotation = distance ÷ radius, so they
   turn because the chariot is travelling, and Nandighosa's sixteen
   wheels turn at the same rate as Darpadalana's twelve.
-------------------------------------------------------------------*/
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/** Six devotees on the rope, at fixed fractions along its length. */
const PULLERS = [0.14, 0.29, 0.44, 0.58, 0.72, 0.86]

function RathPull({ chariot, tint }: { chariot: Chariot; tint: string }) {
  const reduced = useReducedMotion()
  const laneRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ id: number; startX: number; startPos: number } | null>(null)
  const anim = useRef(0)
  const [pos, setPos] = useState(0)
  const [lane, setLane] = useState(0)
  const [heaving, setHeaving] = useState(false)
  const [presenting, setPresenting] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = laneRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setLane(e.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // The chariot scales with the lane. Fixed at 168px it filled half a
  // phone screen, which left almost no road to pull it down.
  const RIG = Math.round(clamp(lane * 0.38, 108, 168))
  const HANDLE = 34
  const travel = Math.max(1, lane - RIG - HANDLE - 8)

  /* Everything vertical is derived from the drawing's scale, so the
     wheels stay on the road and the rope stays on the deck at any size.
     In the 168×92 drawing the axles are at y=78 and the deck centre at
     y=63; the road sits at lane y=116 (150px lane, 34px bottom inset). */
  const scale = RIG / 168
  const ROAD_Y = 116
  const rigTop = ROAD_Y - 78 * scale
  const ROPE_Y = rigTop + 63 * scale
  const x = pos * travel

  const perSide = Math.ceil(chariot.wheels / 2)
  // Wheel geometry is in the drawing's own 168-unit space; the <svg> is
  // then scaled to RIG by CSS.
  const gap = (168 - 30) / perSide
  // Size the wheels to the axle count so sixteen of them don't overlap
  // into a solid bar — the same trap the static chariot drawing fell into.
  const wheelR = Math.min(11, gap * 0.46)
  // A wheel of this radius, rolling this far, turns exactly this much.
  // Distance is converted into drawing units first, so the wheels turn
  // at the right rate whatever size the chariot has been scaled to.
  const rot = (((pos * travel) / RIG) * 168 / wheelR) * (180 / Math.PI)

  /**
   * One collective heave. Dragging is the honest interaction, but on a
   * phone people tap before they think to drag — so a tap gets the
   * crowd to haul it forward a stretch on its own, which is also what
   * actually happens on the Bada Danda: the rope is pulled in surges,
   * not hauled smoothly.
   */
  const heave = useCallback(() => {
    if (anim.current) return
    let from = 0
    setPos((p) => {
      from = p
      return p
    })
    // Read the live value synchronously rather than trusting the closure.
    from = posRef.current
    if (from >= 1) {
      setPos(0) // pulled all the way; a tap starts the journey again
      return
    }
    const to = Math.min(1, from + 0.26)
    const start = performance.now()
    const DUR = 1500
    setHeaving(true)
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / DUR)
      setPos(from + (to - from) * easeInOut(t))
      if (t < 1) anim.current = requestAnimationFrame(step)
      else {
        anim.current = 0
        setHeaving(false)
      }
    }
    anim.current = requestAnimationFrame(step)
  }, [])

  const posRef = useRef(0)
  posRef.current = pos

  useEffect(() => {
    const root = document.documentElement
    const sync = () => setPresenting(root.hasAttribute('data-present') && root.dataset.presentStop === 'faith')
    const observer = new MutationObserver(sync)
    sync()
    observer.observe(root, {
      attributes: true,
      attributeFilter: ['data-present', 'data-present-stop', 'data-present-dwell'],
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const element = laneRef.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!presenting || !visible) return
    cancelAnimationFrame(anim.current)
    drag.current = null
    setPos(0)
    posRef.current = 0

    if (reduced) {
      setPos(1)
      return
    }

    const start = performance.now()
    const allotted = Number(document.documentElement.dataset.presentDwell)
    const duration = Number.isFinite(allotted) ? Math.max(1600, allotted - 350) : 4000
    setHeaving(true)
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      setPos(easeInOut(progress))
      if (progress < 1) anim.current = requestAnimationFrame(step)
      else {
        anim.current = 0
        setHeaving(false)
      }
    }
    anim.current = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(anim.current)
      anim.current = 0
      setHeaving(false)
    }
  }, [presenting, visible, reduced])

  useEffect(() => () => cancelAnimationFrame(anim.current), [])

  const onDown = useCallback(
    (e: React.PointerEvent) => {
      if (anim.current) {
        cancelAnimationFrame(anim.current)
        anim.current = 0
        setHeaving(false)
      }
      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
      drag.current = { id: e.pointerId, startX: e.clientX, startPos: pos }
    },
    [pos],
  )

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      const d = drag.current
      if (!d || d.id !== e.pointerId) return
      setPos(clamp(d.startPos + (e.clientX - d.startX) / travel, 0, 1))
    },
    [travel],
  )

  const onUp = useCallback(
    (e: React.PointerEvent) => {
      const d = drag.current
      if (d?.id !== e.pointerId) return
      drag.current = null
      try {
        ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
      } catch {
        /* already released */
      }
      // Barely moved? That was a tap, not a drag — so heave instead.
      if (Math.abs(e.clientX - d.startX) < 6) heave()
    },
    [heave],
  )

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 0.2 : 0.05
    // Functional updates, not `pos + step`: several key presses can land
    // in one React batch, and reading `pos` from the closure makes each
    // of them compute the same result — nine presses would move the
    // chariot once.
    let apply: ((p: number) => number) | null = null
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') apply = (p) => p + step
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') apply = (p) => p - step
    else if (e.key === 'Home') apply = () => 0
    else if (e.key === 'End') apply = () => 1
    if (!apply) return
    e.preventDefault()
    setPos((p) => clamp(apply!(p), 0, 1))
  }

  const pct = Math.round(pos * 100)
  const arrived = pos >= 0.995

  /* Where the rope is at a given fraction along it — the pullers stand
     under the curve, not on a straight line above it. */
  const ropeA = { x: x + RIG - 6, y: ROPE_Y }
  const ropeC = { x: lane - HANDLE, y: ROPE_Y }
  const ropeB = { x: (ropeA.x + ropeC.x) / 2, y: ROPE_Y + 8 + (1 - pos) * 16 }
  const ropeAt = (t: number) => ({
    x: (1 - t) * (1 - t) * ropeA.x + 2 * (1 - t) * t * ropeB.x + t * t * ropeC.x,
    y: (1 - t) * (1 - t) * ropeA.y + 2 * (1 - t) * t * ropeB.y + t * t * ropeC.y,
  })
  const ropeD = `M${ropeA.x} ${ropeA.y} Q ${ropeB.x} ${ropeB.y} ${ropeC.x} ${ropeC.y}`

  return (
    <div className={`pull ${arrived ? 'is-arrived' : ''}`}>
      <div className="pull__head">
        <p className="pull__label">
          Pull the rope — <span>{chariot.name}</span> along the {RATH_ROUTE.road}
        </p>
        <p className="pull__dist" aria-hidden="true">
          {pct}%
        </p>
      </div>

      <div
        ref={laneRef}
        className="pull__lane"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <span className="pull__road" aria-hidden="true" />

        {/* the two temples, at either end of the Grand Road */}
        <span className="pull__marker pull__marker--from" aria-hidden="true">
          <svg viewBox="0 0 24 30" width="20" height="26">
            <path
              d="M4 30V16C4 10 7.5 5 12 2c4.5 3 8 8 8 14v14Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path d="M12 2V0" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          {RATH_ROUTE.from}
        </span>
        <span className="pull__marker pull__marker--to" aria-hidden="true">
          <svg viewBox="0 0 24 30" width="20" height="26">
            <path
              d="M4 30V16C4 10 7.5 5 12 2c4.5 3 8 8 8 14v14Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path d="M12 2V0" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          {RATH_ROUTE.to}
        </span>

        {/* the rope: from the chariot's front to the handle, sagging */}
        <svg className="pull__ropeart" aria-hidden="true" preserveAspectRatio="none">
          {/* The rope sags most when it is slack and pulls taut as the
              chariot closes on the handle. */}
          <path d={ropeD} fill="none" stroke="var(--stone-300)" strokeWidth="2.4" strokeLinecap="round" />
          <path
            d={ropeD}
            fill="none"
            stroke="var(--parchment-dim)"
            strokeWidth="1"
            strokeDasharray="3 5"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* The people on the rope. Nobody watches a Rath Yatra from
              the side of the road — the whole thing is the crowd. */}
          <g className={`pullers ${heaving ? 'is-heaving' : ''}`}>
            {PULLERS.map((t, i) => {
              const pt = ropeAt(t)
              const rope = pt.y - ROAD_Y // negative: the rope is overhead
              return (
                <g
                  key={i}
                  className="puller"
                  style={{
                    transform: `translate(${pt.x.toFixed(1)}px, ${ROAD_Y}px)`,
                    animationDelay: `${i * 80}ms`,
                  }}
                >
                  {/* legs mid-stride, torso leaning away from the load */}
                  <path
                    d={`M-3.5 0 L0 -7 L3.5 0`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d={`M0 -7 L3 -15`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                  />
                  <circle cx="3.8" cy="-18" r="2.5" fill="currentColor" />
                  {/* arms back to the rope */}
                  <path
                    d={`M3 -14 L-3 ${rope + 1}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </g>
              )
            })}
          </g>
        </svg>

        {/* the chariot */}
        <div
          className="pull__rig"
          style={{ transform: `translateX(${x}px)`, color: tint, width: RIG, top: rigTop }}
        >
          <svg viewBox="0 0 168 92" className="pull__rath" aria-hidden="true">
            {/* canopy */}
            <path d="M84 6 132 56 H36 Z" fill="currentColor" opacity="0.18" stroke="currentColor" strokeWidth="1.3" />
            {[20, 31, 42, 52].map((y) => {
              const half = ((y - 6) / 50) * 48
              return (
                <path
                  key={y}
                  d={`M${84 - half} ${y} H${84 + half}`}
                  stroke="currentColor"
                  strokeWidth="0.8"
                  opacity="0.5"
                />
              )
            })}
            <path d="M84 6V0" stroke="currentColor" strokeWidth="1.3" />
            <path d="M84 0 104 5 84 10Z" fill="currentColor" opacity="0.85" />
            {/* deck */}
            <rect x="12" y="56" width="144" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
            {/* wheels — each turns because the chariot is moving */}
            <g fill="none" stroke="currentColor" strokeWidth="1.1">
              {Array.from({ length: perSide }, (_, i) => (
                <g key={i} transform={`translate(${21 + i * gap} 78)`}>
                  <g className="pull__wheel" style={{ ['--wrot' as string]: `${rot}deg` }}>
                    <circle r={wheelR} />
                    <circle r={wheelR * 0.3} />
                    {[0, 45, 90, 135].map((a) => (
                      <path key={a} d={`M0 ${-wheelR}V${wheelR}`} transform={`rotate(${a})`} strokeWidth="0.6" />
                    ))}
                  </g>
                </g>
              ))}
            </g>
          </svg>
        </div>

        {/* the handle you actually grab */}
        <button
          type="button"
          className="pull__handle"
          style={{ top: ROPE_Y - 22 }}
          role="slider"
          aria-label={`Pull ${chariot.name} along the Bada Danda`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          aria-valuetext={
            arrived
              ? `Arrived at the ${RATH_ROUTE.to}`
              : `${pct}% of the way to the ${RATH_ROUTE.to}`
          }
          onKeyDown={onKey}
          onClick={heave}
        >
          <svg viewBox="0 0 28 28" width="22" height="22" aria-hidden="true">
            <path
              d="M9 24v-6l-3-4a2 2 0 0 1 3-2.6l2 2V5a2 2 0 0 1 4 0v6V4a2 2 0 0 1 4 0v7V7a2 2 0 0 1 4 0v11a6 6 0 0 1-6 6Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <p className={`pull__hint ${pos > 0 ? 'is-gone' : ''}`} aria-hidden="true">
        tap to heave · drag to haul
      </p>

      <p className="pull__foot">
        {arrived ? (
          <span className="pull__arrived">
            The chariot has reached the {RATH_ROUTE.to}. It will be pulled back nine days later.
          </span>
        ) : (
          <>
            {RATH_ROUTE.note} The full route is {RATH_ROUTE.distance}.
          </>
        )}
      </p>
      <SourceTag cite={RATH_ROUTE.cite} confidence={RATH_ROUTE.confidence} />
    </div>
  )
}

export function FaithSection() {
  const [active, setActive] = useState(0)
  const c = CHARIOTS[active]
  const tints = ['var(--gold)', 'var(--lagoon-soft)', 'var(--sindoor-soft)']

  return (
    <section id="faith" className="section section--deep faith" aria-labelledby="faith-title">
      <div className="wrap">
        <ChapterHeader
          numberStr="04"
          numeral="IV"
          titleEn="FAITH & SACRED TRADITIONS"
          titleOr="ଆସ୍ଥା ଓ ସଂସ୍କୃତି"
          prologueEn="Three grand wooden chariots built completely from scratch every single year — a living sacred tradition."
          prologueOr="ପବିତ୍ର ରଥଯାତ୍ରା, ବଂଶାନୁକ୍ରମିକ ରଥ ନିର୍ମାଣ ଓ ଜଗନ୍ନାଥ ସଂସ୍କୃତିର ମହାନ ପରମ୍ପରା।"
          accentColor="var(--sindoor-main)"
        />

        <SectionHeader
          numeral="V"
          eyebrow="Jagannath"
          title={<span id="faith-title">Three chariots. Built from scratch. Every single year.</span>}
          lede="Once a year the deities of the Puri temple leave it and are pulled through the town on chariots that did not exist a few months earlier and will not exist a few months later. The carpenters' families are hereditary. The measurements are handed down. Nothing is stored and reused."
        />

        <div className="faith__grid">
          <Reveal className="faith__plate">
            <ArtPlate name="pattachitra" accent="var(--gold)" />
            <p className="faith__platecap small">
              The triad, in Pattachitra idiom — Balabhadra, Subhadra, Jagannath. Drawn for this exhibition.
            </p>
          </Reveal>

          <div className="faith__raths">
            <div className="faith__tabs" role="tablist" aria-label="The three chariots">
              {CHARIOTS.map((ch, i) => (
                <button
                  key={ch.name}
                  role="tab"
                  type="button"
                  id={`rath-tab-${i}`}
                  aria-selected={i === active}
                  aria-controls="rath-panel"
                  tabIndex={i === active ? 0 : -1}
                  className={`faith__tab ${i === active ? 'is-on' : ''}`}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight') setActive((a) => (a + 1) % CHARIOTS.length)
                    if (e.key === 'ArrowLeft') setActive((a) => (a - 1 + CHARIOTS.length) % CHARIOTS.length)
                  }}
                >
                  <span className="faith__tabname">{ch.name}</span>
                  <span className="faith__tabdeity">{ch.deity}</span>
                </button>
              ))}
            </div>

            <div className="faith__panel" id="rath-panel" role="tabpanel" aria-labelledby={`rath-tab-${active}`}>
              <Rath wheels={c.wheels} heightFt={c.heightFt} tint={tints[active]} />
              <dl className="faith__specs">
                <div>
                  <dt>Wheels</dt>
                  <dd>{c.wheels}</dd>
                </div>
                <div>
                  <dt>Height</dt>
                  <dd>{c.heightFt} ft</dd>
                </div>
                <div>
                  <dt>Cloth</dt>
                  <dd>{c.colours}</dd>
                </div>
                <div>
                  <dt>The name means</dt>
                  <dd>{c.meaning}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <Reveal>
          <RathPull chariot={c} tint={tints[active]} />
        </Reveal>

        <ul className="faith__notes">
          {FAITH_NOTES.map((n, i) => (
            <Reveal as="li" key={i} delay={i * 60} className="faith__note">
              <p>{n.text}</p>
              <SourceTag cite={n.cite} confidence={n.confidence} caveat={n.caveat} />
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <p className="faith__respect">
            This is a living tradition with millions of practitioners, not a heritage attraction. It is
            presented here as what it is.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
