import { useState } from 'react'
import { Reveal } from '../components/Reveal'
import { ChapterHeader } from '../components/ChapterHeader'
import { LivingOdisha } from '../components/LivingOdisha'
import { SourceTag } from '../components/SourceTag'
import { LotusMark } from '../components/Motifs'
import { HEROES, HEROES_CLOSER, HEROES_INTRO } from '../data/freedomFighters'
import { useLanguage } from '../context/LanguageContext'
import { usePassport } from '../hooks/usePassport'

function Lamp({ tint, lit }: { tint: string; lit: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className={`lamp ${lit ? 'is-lit' : ''}`} aria-hidden="true" focusable="false">
      <g style={{ color: tint }}>
        <path
          d="M12 42h40c0 7-9 12-20 12S12 49 12 42Z"
          fill="currentColor"
          opacity="0.22"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path d="M12 42q20-6 40 0" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <path
          className="lamp__flame"
          d="M32 38c4 0 6.6-2.6 6.6-6.2 0-4.4-3.6-6.6-4.9-11.4-2.2 1.8-3.6 4-3.6 6.2 0 1.6-.9 2.2-1.8 1.3-.7-.7-.9-1.8-.9-2.6-1.6 2.2-2 4.6-2 6.5 0 3.6 2.6 6.2 6.6 6.2Z"
          fill="currentColor"
        />
      </g>
    </svg>
  )
}

export function HeroesSection() {
  const [open, setOpen] = useState(HEROES[0].id)
  const { t } = useLanguage()
  const { discover } = usePassport()

  const handleToggle = (id: string) => {
    const next = open === id ? '' : id
    setOpen(next)
    if (next) discover('heroes')
  }

  return (
    <section id="heroes" className="section heroes" aria-labelledby="heroes-title">
      <div className="wrap">
        <ChapterHeader
          numeral="VIII"
          numberStr="08"
          titleEn="People & Resistance"
          titleOr="ଜନନାୟକ ଓ ସଂଗ୍ରାମ"
          prologueEn="Four decades before 1857, Odisha’s Paika rebellion struck against British rule. Resistance and reform run continuous across two centuries."
          prologueOr="୧୮୫୭ ପୂର୍ବରୁ ୧୮୧୭ର ପାଇକ ବିଦ୍ରୋହ। ସ୍ୱାଧୀନତା ସଂଗ୍ରାମର ଏହି ପ୍ରେରଣାଦାୟୀ ଗାଥା।"
          accentColor="#b8362b"
        />

        <p className="hero-section__intro-text">{HEROES_INTRO}</p>

        <ol className="timeline">
          {HEROES.map((h, idx) => {
            const isOpen = open === h.id
            return (
              <Reveal as="li" key={h.id} delay={idx * 50} className={`tl ${isOpen ? 'is-open' : ''}`}>
                <div className="tl__rail" aria-hidden="true">
                  <span className="tl__year">{h.yearLabel}</span>
                  <span className="tl__dot" style={{ ['--acc' as string]: h.accent }} />
                </div>

                <div className="tl__card card" style={{ ['--acc' as string]: h.accent }}>
                  <button
                    type="button"
                    className="tl__head"
                    aria-expanded={isOpen}
                    aria-controls={`tl-body-${h.id}`}
                    onClick={() => handleToggle(h.id)}
                  >
                    <Lamp tint={h.accent} lit={isOpen} />
                    <span className="tl__headtext">
                      <span className="tl__name">
                        {h.name}
                        {h.odia && (
                          <span className="tl__odia odia" lang="or">
                            {h.odia}
                          </span>
                        )}
                      </span>
                      <span className="tl__role">{h.role}</span>
                      <span className="tl__life">{h.life}</span>
                    </span>
                    <span className="tl__chev" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="18" height="18">
                        <path
                          d="M6 9l6 6 6-6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>

                  <div className="tl__body" id={`tl-body-${h.id}`} hidden={!isOpen}>
                    <p className="tl__hook">{h.hook}</p>
                    <p>{h.did}</p>
                    <p className="tl__now">
                      <LotusMark size={13} />
                      {h.now}
                    </p>
                    <SourceTag cite={h.cite} confidence={h.confidence} caveat={h.caveat} />
                  </div>
                </div>
              </Reveal>
            )
          })}
        </ol>

        <Reveal className="heroes__closer">
          <p>{HEROES_CLOSER.text}</p>
          <SourceTag cite={HEROES_CLOSER.cite} confidence={HEROES_CLOSER.confidence} />
        </Reveal>

        {/* Living Odisha Module */}
        <Reveal delay={120}>
          <LivingOdisha />
          <ChapterHeader
            numberStr="07"
            numeral="VII"
            titleEn="THE PEOPLE"
            titleOr="ଜନନାୟକ ଓ ପ୍ରତିଭା"
            prologueEn="Behind stone monuments and sacred traditions are the people who dared, created, defended, and innovated."
            prologueOr="ପ୍ରାଚୀନ କୀର୍ତ୍ତିରାଜି ଓ ପରମ୍ପରା ପଛରେ ରହିଛନ୍ତି ସେହି ସାହସୀ ସ୍ରଷ୍ଟା, ବିପ୍ଲବୀ ଓ ସାଧକମାନେ।"
            accentColor="var(--gold-main)"
          />
        </Reveal>

        <Reveal>
          <p className="heroes__note small">
            {t(
              'No quotation is attributed to any figure on this page without verified citation.',
              'ପ୍ରାମାଣିକ ତଥ୍ୟ ବିନା କୌଣସି ମହାପୁରୁଷଙ୍କ ଉକ୍ତି ସଂଯୋଗ କରାଯାଇନାହିଁ।',
            )}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
