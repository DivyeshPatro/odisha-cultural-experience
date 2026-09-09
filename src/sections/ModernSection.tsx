import { useState } from 'react'
import { Reveal } from '../components/Reveal'
import { ChapterHeader } from '../components/ChapterHeader'
import { SourceTag } from '../components/SourceTag'
import { Glyph } from '../components/Glyph'
import { MODERN_INTRO, MODERN_PILLARS, TENNER_STORY } from '../data/modernOdisha'
import { useLanguage } from '../context/LanguageContext'

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
  const { t } = useLanguage()

  return (
    <section id="modern" className="section modern" aria-labelledby="modern-title">
      <div className="wrap">
        <ChapterHeader
          numeral="XI"
          numberStr="11"
          titleEn="Modern Odisha & Innovation"
          titleOr="ଆଧୁନିକ ଓଡ଼ିଶା"
          prologueEn="Missiles, hockey, steel, deepwater ports, and an international disaster-resilience model."
          prologueOr="ଇସ୍ପାତ, ମହାକାଶ ବିଜ୍ଞାନ, ବନ୍ଦର, ହକି ଏବଂ ପ୍ରଗତିର ନୂତନ ଦିଗନ୍ତ।"
          accentColor="#ff9933"
        />

        <p className="hero-section__intro-text">{MODERN_INTRO}</p>

        {/* Then → Now → Next Continuum */}
        <Reveal className="continuum-card card">
          <p className="eyebrow">{t('CONTINUUM OF PROGRESS', 'ପ୍ରଗତିର ଧାରା')}</p>
          <h4>{t('THEN → NOW → NEXT', 'ଅତୀତ → ବର୍ତ୍ତମାନ → ଭବିଷ୍ୟତ')}</h4>
          <div className="continuum-grid">
            <div className="continuum-step">
              <span className="continuum-tag">13TH CENTURY</span>
              <strong>{t('Stone Astronomy', 'ପାଷାଣ ମହାକାଶ ବିଦ୍ୟା')}</strong>
              <p>{t('Konark Sun Chariot & Temple Engineering', 'କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିର ନିର୍ମାଣ ଶୈଳୀ')}</p>
            </div>
            <div className="continuum-step">
              <span className="continuum-tag">1817 - 1936</span>
              <strong>{t('Statehood & Freedom', 'ସ୍ୱାଧୀନତା ଓ ପ୍ରଦେଶ')}</strong>
              <p>{t('First linguistic province in India', 'ଭାରତର ପ୍ରଥମ ଭାଷାଭିତ୍ତିକ ପ୍ରଦେଶ')}</p>
            </div>
            <div className="continuum-step">
              <span className="continuum-tag">TODAY</span>
              <strong>{t('Space & Steel Hub', 'ଇସ୍ପାତ ଓ ବୈଜ୍ଞାନିକ ପ୍ରଗତି')}</strong>
              <p>{t('Paradip Port, NISER, and Global Hockey', 'ପାରାଦ୍ୱୀପ ବନ୍ଦର ଓ ଗବେଷଣା')}</p>
            </div>
            <div className="continuum-step">
              <span className="continuum-tag">NEXT</span>
              <strong>{t('Sustainable Future', 'ସୁସ୍ଥାୟୀ ଭବିଷ୍ୟତ')}</strong>
              <p>{t('Green energy & coastal resilience', 'ସବୁଜ ଶକ୍ତି ଓ ଉପକୂଳ ସୁରକ୍ଷା')}</p>
            </div>
          </div>
        </Reveal>

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
            <p className="eyebrow">{t('The one you already own', 'ଆପଣଙ୍କ ପାଖରେ ଥିବା ସ୍ମାରକୀ')}</p>
            <h3>{t('Odisha is in almost every wallet in India', 'ଭାରତର ପ୍ରତ୍ୟେକ ୱାଲେଟ୍‌ରେ ଓଡ଼ିଶା')}</h3>
            <p>{TENNER_STORY.text}</p>
            <SourceTag cite={TENNER_STORY.cite} confidence={TENNER_STORY.confidence} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
