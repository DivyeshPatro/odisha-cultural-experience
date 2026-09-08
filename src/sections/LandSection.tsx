import { useState } from 'react'
import { SectionHeader } from '../components/SectionHeader'
import { Reveal } from '../components/Reveal'
import { CHILIKA_SHAPE, MAP_NOTE, MAP_VIEWBOX, ODISHA_OUTLINE, PLACES, RIVERS } from '../data/mapPlaces'
import { scrollToId } from '../utils/scroll'

const KIND_LABEL: Record<string, string> = {
  city: 'City',
  heritage: 'Heritage',
  nature: 'Nature',
  industry: 'Industry & ports',
}

export function LandSection() {
  const [openId, setOpenId] = useState<string>('konark')
  const open = PLACES.find((p) => p.id === openId) ?? PLACES[0]

  return (
    <section id="land" className="section landsec" aria-labelledby="land-title">
      <div className="wrap">
        <SectionHeader
          numeral="III"
          eyebrow="Meet the land"
          title={<span id="land-title">A coast, a lagoon, a delta, and hills behind all three</span>}
          lede="Odisha sits on the Bay of Bengal between Bengal and Andhra, with the Eastern Ghats at its back. Four major rivers come down off those hills and build the delta the state lives on. Pick a place."
        />

        <div className="landsec__grid">
          <Reveal className="landsec__mapwrap">
            <figure className="odmap">
              <svg
                viewBox={MAP_VIEWBOX}
                className="odmap__svg"
                role="img"
                aria-label="Stylised map of Odisha showing twelve locations, each selectable"
              >
                <defs>
                  <linearGradient id="od-fill" x1="20%" y1="0%" x2="80%" y2="100%">
                    <stop offset="0%" stopColor="#2a231a" />
                    <stop offset="55%" stopColor="#1d1811" />
                    <stop offset="100%" stopColor="#15110c" />
                  </linearGradient>
                  <radialGradient id="od-sea" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(47,143,134,0.20)" />
                    <stop offset="60%" stopColor="rgba(47,143,134,0.07)" />
                    <stop offset="100%" stopColor="rgba(47,143,134,0)" />
                  </radialGradient>
                </defs>

                {/* The Bay of Bengal, off the south-east coast. This used
                    to be three offset copies of the outline — which was
                    fine when the outline was a crude polygon and became
                    visible ghosting the moment it had 410 real points. */}
                <ellipse
                  className="odmap__sea"
                  cx="620"
                  cy="330"
                  rx="230"
                  ry="240"
                  fill="url(#od-sea)"
                  aria-hidden="true"
                />

                {/* landmass */}
                <path d={ODISHA_OUTLINE} className="odmap__land" fill="url(#od-fill)" />
                <path d={ODISHA_OUTLINE} className="odmap__edge" fill="none" />

                {/* rivers */}
                <g className="odmap__rivers" aria-hidden="true">
                  {RIVERS.map((d) => (
                    <path key={d} d={d} fill="none" />
                  ))}
                </g>

                {/* Chilika */}
                <path d={CHILIKA_SHAPE} className="odmap__lagoon" aria-hidden="true" />

                {/* pins */}
                <g className="odmap__pins">
                  {PLACES.map((p) => {
                    const isOpen = p.id === openId
                    return (
                      <g
                        key={p.id}
                        className={`odmap__pin odmap__pin--${p.kind} ${isOpen ? 'is-open' : ''}`}
                        transform={`translate(${p.x} ${p.y})`}
                      >
                        {isOpen && <circle r="17" className="odmap__halo" />}
                        <circle r="4.6" className="odmap__dot" />
                        <text
                          className="odmap__label"
                          x={p.side === 'left' ? -11 : 11}
                          y={4 + (p.dy ?? 0)}
                          textAnchor={p.side === 'left' ? 'end' : 'start'}
                        >
                          {p.name}
                        </text>
                      </g>
                    )
                  })}
                </g>
              </svg>

              <figcaption className="odmap__note small">{MAP_NOTE}</figcaption>
            </figure>

            {/* The real controls. Buttons, not SVG click handlers — so they
                are focusable, have 48px targets, and work without a mouse. */}
            <ul className="landsec__chips" aria-label="Places in Odisha">
              {PLACES.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    className={`chip chip--${p.kind} ${p.id === openId ? 'is-on' : ''}`}
                    aria-pressed={p.id === openId}
                    onClick={() => setOpenId(p.id)}
                  >
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="landsec__readout" delay={100}>
            <div className={`placecard placecard--${open.kind}`} key={open.id}>
              <p className="placecard__kind">{KIND_LABEL[open.kind]}</p>
              <h3 className="placecard__name">{open.name}</h3>
              <p className="placecard__tag">{open.tag}</p>
              <p className="placecard__blurb">{open.blurb}</p>
              {open.target && (
                <button className="linkish" type="button" onClick={() => scrollToId(open.target!)}>
                  Read the chapter
                  <span aria-hidden="true">→</span>
                </button>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
