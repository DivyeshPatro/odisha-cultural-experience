import { useState } from 'react'
import { Reveal } from '../components/Reveal'
import { LotusMark } from '../components/Motifs'
import { INDIA_STATES, INDIA_VIEWBOX, ODISHA_STATE_ID, THREADS } from '../data/india'
import { scrollToId } from '../utils/scroll'

/* Where the Odisha ping sits, in INDIA_VIEWBOX units — the centroid of
   the state's own path in the source projection. */
const ODISHA_ANCHOR = { x: 340, y: 405 }

export function OneIndiaSection() {
  const [hover, setHover] = useState<string | null>(null)

  return (
    <section id="india" className="section india" aria-labelledby="india-title">
      <div className="wrap">
        <div className="india__grid">
          <Reveal className="india__mapwrap">
            <svg
              viewBox={INDIA_VIEWBOX}
              className="india__map"
              role="img"
              aria-label="Stylised outline of India with Odisha highlighted on the eastern coast"
            >
              <defs>
                <linearGradient id="in-od" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f7d18a" />
                  <stop offset="100%" stopColor="#c05e34" />
                </linearGradient>
              </defs>

              {/* every state and union territory, then Odisha over the top */}
              <g className="india__states">
                {INDIA_STATES.filter((s) => s.id !== ODISHA_STATE_ID).map((s) => (
                  <path key={s.id} d={s.d} className="india__st">
                    <title>{s.name}</title>
                  </path>
                ))}
              </g>
              {INDIA_STATES.filter((s) => s.id === ODISHA_STATE_ID).map((s) => (
                <path key={s.id} d={s.d} className="india__state" fill="url(#in-od)">
                  <title>{s.name}</title>
                </path>
              ))}
              <circle cx={ODISHA_ANCHOR.x} cy={ODISHA_ANCHOR.y} r="7" className="india__ping" />
              <circle cx={ODISHA_ANCHOR.x} cy={ODISHA_ANCHOR.y} r="7" className="india__ping india__ping--2" />
            </svg>
            <p className="india__mapnote small">
              Boundaries simplified from open data for display, not a political or survey map.
            </p>
          </Reveal>

          <div className="india__text">
            <p className="eyebrow">XII · One India</p>
            <h2 id="india-title" className="india__title">
              One state.
              <br />
              Many stories.
              <br />
              <span className="gold">One India.</span>
            </h2>
            <p className="india__lede">
              Odisha is 4.7% of India's land and rather less of its airtime. It is also where an emperor
              stopped fighting, where the first linguistic state was drawn, where the sun got a chariot, and
              where a government worked out how to keep a cyclone from killing ten thousand people twice.
            </p>

            <ul className="india__threads">
              {THREADS.map((t) => (
                <li key={t.id}>
                  <button
                    type="button"
                    className={`thread ${hover === t.id ? 'is-on' : ''}`}
                    onMouseEnter={() => setHover(t.id)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(t.id)}
                    onBlur={() => setHover(null)}
                    onClick={() => scrollToId(t.target)}
                  >
                    <span className="thread__label">{t.label}</span>
                    <span className="thread__line">{t.line}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Reveal className="india__finale">
          <hr className="rule" />
          <p className="india__thisis">This is Odisha.</p>
          <ul className="india__creed">
            <li>Ancient in heritage.</li>
            <li>Bold in spirit.</li>
            <li>Resilient by nature.</li>
            <li>Modern by ambition.</li>
          </ul>

          <p className="india__wish">
            <span className="india__tri" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            Happy Independence Day
          </p>
          <p className="india__closer">
            <LotusMark size={16} />
            <span>Every state has a story like this. Go and find one.</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
