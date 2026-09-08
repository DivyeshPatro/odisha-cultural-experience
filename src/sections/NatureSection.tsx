import { useCallback, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { Sheet } from '../components/Sheet'
import { SourceTag } from '../components/SourceTag'
import { ECO_SITES, NATURE_INTRO, TURTLE_STORY } from '../data/nature'

/**
 * An Olive Ridley from above, swimming right — the direction the
 * animation carries it.
 *
 * The shell is a heart, notched at the rear, not a circle. The scutes
 * are drawn as a central vertebral strip with costal partitions fanning
 * out from it, which is the actual pattern; a first attempt used an
 * even cross-hatch and came out looking like a globe. The front
 * flippers are long and wing-like, the rear pair short and stubby —
 * that difference is most of what makes the silhouette legible.
 */
function Turtle() {
  return (
    <svg viewBox="0 0 140 100" className="turtle__svg" aria-hidden="true" focusable="false">
      <g className="turtle__flippers" fill="#3d6b53" stroke="#79ab8d" strokeWidth="0.9">
        {/* front pair: long, swept out and forward */}
        <path
          className="turtle__fl turtle__fl--fl"
          d="M84 32 C 96 20, 112 10, 124 8 C 129 7, 129 13, 122 18 C 110 27, 96 36, 86 40 Z"
        />
        <path
          className="turtle__fl turtle__fl--fr"
          d="M84 68 C 96 80, 112 90, 124 92 C 129 93, 129 87, 122 82 C 110 73, 96 64, 86 60 Z"
        />
        {/* rear pair: short, at the back corners */}
        <path className="turtle__fl turtle__fl--rl" d="M34 34 C 26 26, 16 20, 11 23 C 7 26, 15 34, 28 40 Z" />
        <path className="turtle__fl turtle__fl--rr" d="M34 66 C 26 74, 16 80, 11 77 C 7 74, 15 66, 28 60 Z" />
      </g>

      {/* neck and head */}
      <path d="M92 42 h14 v16 h-14 Z" fill="#3d6b53" />
      <path
        d="M104 42 C 116 42, 126 45, 126 50 C 126 55, 116 58, 104 58 Z"
        fill="#4a8063"
        stroke="#79ab8d"
        strokeWidth="0.9"
      />
      <circle cx="112" cy="45.5" r="1.6" fill="#0d1712" />
      <circle cx="112" cy="54.5" r="1.6" fill="#0d1712" />

      {/* carapace — heart-shaped, notched at the tail end */}
      <path
        d="M96 50 C 96 30, 84 18, 62 16 C 44 15, 30 24, 24 38 C 22 43, 26 46, 28 50
           C 26 54, 22 57, 24 62 C 30 76, 44 85, 62 84 C 84 82, 96 70, 96 50 Z"
        fill="#376048"
        stroke="#79ab8d"
        strokeWidth="1.3"
      />

      {/* scutes: a vertebral strip, with costals fanning off it */}
      <g fill="none" stroke="#79ab8d" strokeWidth="0.8" opacity="0.7">
        <path d="M32 41 C 50 36, 74 37, 92 44" />
        <path d="M32 59 C 50 64, 74 63, 92 56" />
        <path d="M46 38.5 V61.5M60 37.5 V62.5M74 38 V62" />
        <path d="M48 38 C 46 30, 48 22, 54 17" opacity="0.55" />
        <path d="M64 37.5 C 64 29, 68 22, 74 19" opacity="0.55" />
        <path d="M80 40 C 82 33, 86 27, 90 24" opacity="0.55" />
        <path d="M48 62 C 46 70, 48 78, 54 83" opacity="0.55" />
        <path d="M64 62.5 C 64 71, 68 78, 74 81" opacity="0.55" />
        <path d="M80 60 C 82 67, 86 73, 90 76" opacity="0.55" />
      </g>
      {/* tail */}
      <path d="M24 47 18 50 24 53 Z" fill="#3d6b53" />
    </svg>
  )
}

/**
 * A splash where the water was touched: three rings spreading at
 * different rates, plus eight droplets thrown out on a fixed fan so
 * they land differently each time without needing randomness.
 * Each one removes itself when its animation is done.
 */
interface Splash {
  id: number
  x: number
  y: number
}

const DROPS = Array.from({ length: 8 }, (_, i) => {
  const a = (i / 8) * Math.PI * 2 - Math.PI / 2
  const reach = 26 + (i % 3) * 13
  return { dx: Math.cos(a) * reach, dy: Math.sin(a) * reach * 0.55 - 14, d: i * 22 }
})

export function NatureSection() {
  const [turtleOpen, setTurtleOpen] = useState(false)
  const [splashes, setSplashes] = useState<Splash[]>([])
  const seq = useRef(0)
  const reduced = useReducedMotion()

  const splash = useCallback(
    (clientX: number, clientY: number, host: HTMLElement) => {
      if (reduced) return
      const box = host.getBoundingClientRect()
      const id = ++seq.current
      setSplashes((s) => [...s.slice(-6), { id, x: clientX - box.left, y: clientY - box.top }])
      window.setTimeout(() => setSplashes((s) => s.filter((d) => d.id !== id)), 1100)
    },
    [reduced],
  )

  return (
    <section id="nature" className="section nature" aria-labelledby="nature-title">
      <div className="wrap">
        <SectionHeader
          numeral="IX"
          eyebrow="Where land meets sea"
          title={<span id="nature-title">Dolphins, crocodiles, black tigers, and half a million turtles</span>}
          lede={NATURE_INTRO}
        />
      </div>

      {/* The ocean band. Three parallax wave layers and one turtle,
          which is a real control — it opens the Olive Ridley story. */}
      <div
        className="ocean"
        onPointerDown={(e) => splash(e.clientX, e.clientY, e.currentTarget)}
      >
        <div className="ocean__water" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <svg key={i} className={`ocean__wave ocean__wave--${i}`} viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0 60 C 150 20, 250 100, 400 60 S 650 20, 800 60 S 1050 100, 1200 60 V120 H0Z" />
            </svg>
          ))}
        </div>

        {/* splashes sit above the waves and below the turtle */}
        <div className="ocean__splashes" aria-hidden="true">
          {splashes.map((s) => (
            <span key={s.id} className="splash" style={{ left: s.x, top: s.y }}>
              <i className="splash__ring" />
              <i className="splash__ring splash__ring--2" />
              <i className="splash__ring splash__ring--3" />
              {DROPS.map((d, i) => (
                <i
                  key={i}
                  className="splash__drop"
                  style={{
                    ['--dx' as string]: `${d.dx}px`,
                    ['--dy' as string]: `${d.dy}px`,
                    animationDelay: `${d.d}ms`,
                  }}
                />
              ))}
            </span>
          ))}
        </div>

        <button
          type="button"
          className="turtle"
          onClick={(e) => {
            splash(e.clientX, e.clientY, e.currentTarget.parentElement as HTMLElement)
            setTurtleOpen(true)
          }}
          aria-haspopup="dialog"
        >
          <Turtle />
          <span className="turtle__tip" aria-hidden="true">
            tap the turtle
          </span>
          <span className="sr-only">Read the story of the Olive Ridley turtles of Odisha</span>
        </button>

        <p className="ocean__hint" aria-hidden="true">
          touch the water
        </p>
      </div>

      <div className="wrap">
        <ul className="nature__grid">
          {ECO_SITES.map((e, i) => (
            <Reveal as="li" key={e.id} delay={(i % 3) * 60} className="ecocard card" >
              <div style={{ ['--acc' as string]: e.accent }} className="ecocard__inner">
                <p className="ecocard__kind">{e.kind}</p>
                <h3 className="ecocard__name">{e.name}</h3>
                <p className="ecocard__hook">{e.hook}</p>
                <p className="ecocard__body">{e.body}</p>
                {e.stat && (
                  <p className="ecocard__stat">
                    <strong>{e.stat.value}</strong>
                    <span>{e.stat.label}</span>
                  </p>
                )}
                <SourceTag cite={e.cite} confidence={e.confidence} caveat={e.caveat} />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>

      <Sheet
        open={turtleOpen}
        onClose={() => setTurtleOpen(false)}
        title="The Olive Ridleys"
        eyebrow="Gahirmatha · Rushikulya · Devi river mouth"
        accent="var(--lagoon-soft)"
      >
        <div className="sheetbody">
          <p className="sheetbody__hook">
            They cross open ocean to come back to the beach they hatched on, and they arrive together.
          </p>
          <ul className="sheetbody__list">
            {TURTLE_STORY.map((t, i) => (
              <li key={i}>
                <p>{t.text}</p>
                <SourceTag cite={t.cite} confidence={t.confidence} caveat={t.caveat} />
              </li>
            ))}
          </ul>
        </div>
      </Sheet>
    </section>
  )
}
