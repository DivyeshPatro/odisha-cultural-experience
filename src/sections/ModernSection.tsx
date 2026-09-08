import { useState } from 'react'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { SourceTag } from '../components/SourceTag'
import { Glyph } from '../components/Glyph'
import { MODERN_INTRO, MODERN_PILLARS, TENNER_STORY } from '../data/modernOdisha'

/** The ₹10 note, drawn — the object most people already own without knowing why. */
function TenNote() {
  return (
    <svg viewBox="0 0 260 132" className="tenner__svg" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="note" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6b4a2c" />
          <stop offset="100%" stopColor="#4a3320" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="256" height="128" rx="4" fill="url(#note)" stroke="#a9762c" strokeWidth="1.2" />
      <rect x="10" y="10" width="240" height="112" rx="2" fill="none" stroke="#c9a15c" strokeWidth="0.6" opacity="0.6" />

      {/* the Konark wheel and the horse, as they sit on the reverse */}
      <g transform="translate(150 70)" stroke="#e6c489" fill="none" strokeWidth="1.1">
        <circle r="34" />
        <circle r="29" opacity="0.6" />
        <circle r="9" />
        {Array.from({ length: 8 }, (_, i) => i * 45).map((a) => (
          <g key={a} transform={`rotate(${a})`}>
            <path d="M0 -9V-29" strokeWidth="2.2" />
            <circle cx="0" cy="-20" r="3" strokeWidth="0.7" />
          </g>
        ))}
        {Array.from({ length: 8 }, (_, i) => i * 45 + 22.5).map((a) => (
          <path key={a} d="M0 -9V-29" transform={`rotate(${a})`} strokeWidth="0.7" opacity="0.7" />
        ))}
      </g>

      {/* the chariot horse in profile */}
      <g transform="translate(206 78)" stroke="#e6c489" fill="none" strokeWidth="1" strokeLinecap="round">
        <path d="M-16 18 -12 2 C -10 -6, -4 -10, 4 -10 L 12 -14 L 16 -20 L 20 -14 L 16 -8 C 14 -2, 10 2, 4 4 L 2 18" />
        <path d="M-8 4 -10 18M8 2 10 18" />
      </g>

      <text x="30" y="42" className="tenner__num">
        10
      </text>
      <text x="30" y="62" className="tenner__cap">
        RESERVE BANK OF INDIA
      </text>
      <text x="30" y="78" className="tenner__cap tenner__cap--dim">
        Reverse motif: Sun Temple, Konark
      </text>
      <text x="30" y="112" className="tenner__cap tenner__cap--dim">
        Mahatma Gandhi (New) Series · 2018
      </text>
    </svg>
  )
}

export function ModernSection() {
  const [open, setOpen] = useState(MODERN_PILLARS[0].id)

  return (
    <section id="modern" className="section modern" aria-labelledby="modern-title">
      <div className="wrap">
        <SectionHeader
          numeral="XI"
          eyebrow="Odisha is not just history"
          title={<span id="modern-title">Missiles, hockey, ore, and one exported method</span>}
          lede={MODERN_INTRO}
        />

        <div className="modern__pillars">
          {MODERN_PILLARS.map((p, i) => {
            const isOpen = open === p.id
            return (
              <Reveal key={p.id} delay={i * 60} className={`pillar card ${isOpen ? 'is-open' : ''}`}>
                <div style={{ ['--acc' as string]: p.accent }}>
                  <button
                    type="button"
                    className="pillar__head"
                    aria-expanded={isOpen}
                    aria-controls={`pillar-${p.id}`}
                    onClick={() => setOpen(isOpen ? '' : p.id)}
                  >
                    <span className="pillar__icon">
                      <Glyph name={p.glyph} size={24} />
                    </span>
                    <span className="pillar__headtext">
                      <span className="pillar__label">{p.label}</span>
                      <span className="pillar__title">{p.title}</span>
                    </span>
                    <span className="pillar__plus" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="18" height="18">
                        <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>

                  <div className="pillar__body" id={`pillar-${p.id}`} hidden={!isOpen}>
                    <p className="pillar__hook">{p.hook}</p>
                    <p>{p.body}</p>
                    <ul className="pillar__points">
                      {p.points.map((pt, k) => (
                        <li key={k} className={`pt pt--${pt.confidence}`}>
                          <span className="pt__badge">
                            {pt.confidence === 'verified' ? 'Verified' : 'Check this'}
                          </span>
                          <p>{pt.text}</p>
                          {pt.caveat && <p className="pt__caveat">{pt.caveat}</p>}
                        </li>
                      ))}
                    </ul>
                    <SourceTag cite={p.cite} confidence="verified" />
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="tenner">
          <div className="tenner__art">
            <TenNote />
          </div>
          <div className="tenner__text">
            <p className="eyebrow">The one you already own</p>
            <h3>Odisha is in almost every wallet in India</h3>
            <p>{TENNER_STORY.text}</p>
            <SourceTag cite={TENNER_STORY.cite} confidence={TENNER_STORY.confidence} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
