import { useState } from 'react'
import { SOURCES } from '../data/sources'
import { LotusMark } from '../components/Motifs'

const TIER_ORDER: Record<string, number> = { official: 0, academic: 1, press: 2 }
const TIER_LABEL: Record<string, string> = {
  official: 'Government, UN & institutional',
  academic: 'Academic',
  press: 'Press',
}

export function Footer() {
  const [openSources, setOpenSources] = useState(false)

  const grouped = Object.values(SOURCES)
    .sort((a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier] || a.org.localeCompare(b.org))
    .reduce<Record<string, typeof SOURCES[string][]>>((acc, s) => {
      ;(acc[s.tier] ||= []).push(s)
      return acc
    }, {})

  return (
    <footer className="foot" id="sources">
      <div className="wrap">
        <div className="foot__top">
          <div className="foot__brand">
            <LotusMark size={26} />
            <p className="foot__wordmark">
              ODISHA
              <span className="odia" lang="or">
                ଓଡ଼ିଶା
              </span>
            </p>
            <p className="foot__tag">An interactive digital cultural exhibition</p>
          </div>

          <div className="foot__cols">
            <div>
              <h3>How this was made</h3>
              <ul>
                <li>React, TypeScript and Vite. No UI framework.</li>
                <li>Zero runtime dependencies beyond React itself.</li>
                <li>Every illustration is hand-drawn SVG. No photographs, no stock art, nothing to load.</li>
                <li>Both sounds are synthesised in the browser — nothing is downloaded.</li>
                <li>Static build. No backend, no database, no API keys, no tracking.</li>
              </ul>
            </div>
            <div>
              <h3>On accuracy</h3>
              <ul>
                <li>
                  Every claim carries a confidence label: <strong>Verified</strong>, <strong>Interpretation</strong>,
                  or <strong>Figures differ</strong>.
                </li>
                <li>Where sources disagree, the range is shown — not the most flattering number.</li>
                <li>
                  Popular claims that could not be verified as worded — the “42% of natural resources” line, a
                  “UN award” for disaster management — are named and corrected rather than repeated.
                </li>
                <li>No quotation is attributed to any historical figure.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="foot__sources">
          <button
            type="button"
            className="foot__srcbtn"
            aria-expanded={openSources}
            aria-controls="foot-srclist"
            onClick={() => setOpenSources((v) => !v)}
          >
            Sources &amp; credits
            <span aria-hidden="true">{openSources ? '−' : '+'}</span>
          </button>

          <div id="foot-srclist" hidden={!openSources} className="foot__srclist">
            {(['official', 'academic', 'press'] as const).map((tier) =>
              grouped[tier]?.length ? (
                <section key={tier}>
                  <h4>{TIER_LABEL[tier]}</h4>
                  <ul>
                    {grouped[tier].map((s) => (
                      <li key={s.url}>
                        <a href={s.url} target="_blank" rel="noopener noreferrer">
                          <strong>{s.org}</strong> — {s.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null,
            )}

            <section>
              <h4>Map data</h4>
              <p>
                The Odisha and India boundaries are derived from{' '}
                <a href="https://www.npmjs.com/package/@svg-maps/india" target="_blank" rel="noopener noreferrer">
                  @svg-maps/india
                </a>
                , used under the{' '}
                <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">
                  Creative Commons Attribution 4.0 International
                </a>{' '}
                licence. The paths were simplified and re-projected for this site. Boundaries are simplified
                for display and are not a political or survey map.
              </p>
            </section>

            <section>
              <h4>Image attribution</h4>
              <p>
                None required. Apart from the map boundaries credited above, every illustration, motif,
                emblem and plate on this site was drawn as SVG for this project and is original work. No
                photographs, icon sets or stock assets are used or hotlinked.
              </p>
            </section>

            <section>
              <h4>Typefaces</h4>
              <p>
                Marcellus and Inter (Google Fonts, SIL Open Font License). Odia text is set in Noto Sans
                Oriya, also under the SIL Open Font License.
              </p>
            </section>

            <section>
              <h4>A note on what is missing</h4>
              <p>
                Odisha has 62 recognised Scheduled Tribes and a very large Adivasi population whose languages,
                art and history could not be given the room they deserve in twelve chapters. The Saura entry
                in the art chapter is a doorway, not a summary. The mining chapter names the cost of
                extraction because leaving it out would have been the dishonest choice.
              </p>
            </section>
          </div>
        </div>

        <div className="foot__bay">
          <div className="foot__bayart" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <rect x="4" y="4" width="112" height="112" rx="6" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
              {/* a QR-shaped mark, not a real code */}
              <g fill="currentColor" opacity="0.85">
                {[
                  [16, 16],
                  [76, 16],
                  [16, 76],
                ].map(([x, y]) => (
                  <g key={`${x}-${y}`}>
                    <rect x={x} y={y} width="28" height="28" fill="none" stroke="currentColor" strokeWidth="4" />
                    <rect x={x + 9} y={y + 9} width="10" height="10" />
                  </g>
                ))}
                {[
                  [54, 20],
                  [62, 28],
                  [54, 44],
                  [70, 44],
                  [86, 54],
                  [54, 62],
                  [70, 70],
                  [86, 78],
                  [62, 86],
                  [78, 94],
                  [94, 62],
                  [46, 96],
                ].map(([x, y]) => (
                  <rect key={`${x}-${y}`} x={x} y={y} width="7" height="7" />
                ))}
              </g>
            </svg>
          </div>
          <div>
            <p className="foot__bayhead">The digital door to Odisha</p>
            <p className="foot__baytext">
              Built to sit behind a QR code on an office bay wall — beside a rath, a Konark wheel, a ₹10 note
              and a turtle. Scan it, and the decoration keeps going.
            </p>
          </div>
        </div>

        <p className="foot__legal small">
          Made to share the vibrant culture of Odisha with the world. Content is presented for cultural and educational
          purposes with sources cited throughout. Corrections are welcome — the data files under{' '}
          <code>src/data/</code> are the single source of truth for every claim on this site.
        </p>
      </div>
    </footer>
  )
}
