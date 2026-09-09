import { useState } from 'react'
import { SOURCES } from '../data/sources'
import { LotusMark } from '../components/Motifs'
import { CulturalQuiz } from '../components/CulturalQuiz'
import { ShareCard } from '../components/ShareCard'
import { useLanguage } from '../context/LanguageContext'
import { scrollToId } from '../utils/scroll'

const TIER_ORDER: Record<string, number> = { official: 0, academic: 1, press: 2 }
const TIER_LABEL: Record<string, string> = {
  official: 'Government, UN & institutional',
  academic: 'Academic',
  press: 'Press',
}

export function Footer() {
  const [openSources, setOpenSources] = useState(false)
  const { t } = useLanguage()

  const grouped = Object.values(SOURCES)
    .sort((a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier] || a.org.localeCompare(b.org))
    .reduce<Record<string, (typeof SOURCES)[string][]>>((acc, s) => {
      ;(acc[s.tier] ||= []).push(s)
      return acc
    }, {})

  return (
    <footer className="foot" id="sources">
      <div className="wrap">
        {/* Narrative Exhibition Closing Experience */}
        <div className="foot__closing-journey">
          <p className="foot__closing-eyebrow">{t('EXHIBITION FINALE', 'ପ୍ରଦର୍ଶନୀର ସମାପନ')}</p>
          <h2 className="foot__closing-title">
            {t(
              'YOU HAVE TRAVELLED THROUGH STONE, THROUGH TIME, THROUGH MEMORY, THROUGH MUSIC, THROUGH FOOD, THROUGH PEOPLE, THROUGH NATURE, THROUGH RESILIENCE AND INTO THE FUTURE.',
              'ଆପଣ ପାଷାଣ, ସମୟ, ସ୍ମୃତି, ସଙ୍ଗୀତ, ଆହାର, ଜନଜୀବନ, ପ୍ରକୃତି ଏବଂ ସଂଗ୍ରାମ ଦେଇ ଆଗାମୀ ଭବିଷ୍ୟତକୁ ଯାତ୍ରା କଲେ।',
            )}
          </h2>
          <p className="foot__closing-sub">
            {t('ODISHA IS STILL BECOMING.', 'ଓଡ଼ିଶା ଚିର ପ୍ରବାହିତ।')}
          </p>

          <div className="foot__closing-actions">
            <button type="button" className="btn" onClick={() => scrollToId('top')}>
              {t('EXPLORE AGAIN ↑', 'ପୁଣି ଯାତ୍ରା କରନ୍ତୁ ↑')}
            </button>
          </div>
        </div>

        {/* Quiz & Passport Cards */}
        <div className="foot__interactive-grid">
          <CulturalQuiz />
          <ShareCard />
        </div>

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
              <h3>{t('How this was made', 'ଏହା କିପରି ନିର୍ମିତ')}</h3>
              <ul>
                <li>React, TypeScript and Vite. No UI framework.</li>
                <li>Zero runtime dependencies beyond React itself.</li>
                <li>Every illustration is hand-drawn SVG. No photographs or stock art.</li>
                <li>Both sounds are synthesised in the browser — nothing is downloaded.</li>
                <li>Static build. No backend, no database, no API keys, no tracking.</li>
              </ul>
            </div>
            <div>
              <h3>{t('On accuracy & scholarship', 'ତଥ୍ୟଗତ ସତ୍ୟତା')}</h3>
              <ul>
                <li>
                  Every claim carries a confidence label: <strong>Verified</strong>, <strong>Interpretation</strong>,
                  or <strong>Figures differ</strong>.
                </li>
                <li>Where sources disagree, the range is shown.</li>
                <li>Popular unverified claims are named and corrected rather than repeated.</li>
                <li>No quotation is attributed falsely to any historical figure.</li>
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
            {t('Sources & credits', 'ଉତ୍ସ ଓ କୃତିତ୍ୱ')}
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
                licence.
              </p>
            </section>
          </div>
        </div>

        <p className="foot__legal small">
          Made to share the vibrant culture of Odisha with the world. Content is presented for cultural and educational
          purposes with sources cited throughout.
        </p>
      </div>
    </footer>
  )
}
