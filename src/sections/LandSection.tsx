import { useState } from 'react'
import { ChapterHeader } from '../components/ChapterHeader'
import { SectionHeader } from '../components/SectionHeader'
import { Reveal } from '../components/Reveal'
import { CHILIKA_SHAPE, MAP_NOTE, MAP_VIEWBOX, ODISHA_OUTLINE, PLACES, RIVERS } from '../data/mapPlaces'
import { useLanguage } from '../context/LanguageContext'
import { usePassport } from '../hooks/usePassport'
import { scrollToId } from '../utils/scroll'

const KIND_LABEL: Record<string, { en: string; or: string }> = {
  city: { en: 'City & Culture', or: 'ସହର ଓ ସଂସ୍କୃତି' },
  heritage: { en: 'Sacred Heritage', or: 'ଐତିହ୍ୟ' },
  nature: { en: 'Eco Sanctuary', or: 'ପ୍ରକୃତି' },
  industry: { en: 'Ports & Industry', or: 'ବନ୍ଦର ଓ ଶିଳ୍ପ' },
}

export function LandSection() {
  const [openId, setOpenId] = useState<string>('konark')
  const [kindFilter, setKindFilter] = useState<string>('all')
  const { t } = useLanguage()
  const { discover } = usePassport()

  const handleSelectPlace = (id: string) => {
    setOpenId(id)
    discover(id)
  }

  const filteredPlaces = kindFilter === 'all' ? PLACES : PLACES.filter((p) => p.kind === kindFilter)
  const open = PLACES.find((p) => p.id === openId) ?? PLACES[0]

  return (
    <section id="land" className="section landsec" aria-labelledby="land-title">
      <div className="wrap">
        <ChapterHeader
          numberStr="01"
          numeral="I"
          titleEn="THE LAND"
          titleOr="ଓଡ଼ିଶାର ଭୂମି"
          prologueEn="Before stone, there was water. Before monuments, there was movement across coasts, lagoons, and hills."
          prologueOr="ସମୁଦ୍ର ତଟ, ଚିଲିକା ହ୍ରଦ, ନଦୀ ଉପତ୍ୟକା ଏବଂ ପ୍ରାଚୀନ ପର୍ବତମାଳାର ପ୍ରାକୃତିକ ସମ୍ଭାର।"
          accentColor="var(--teal-main)"
        />

        <SectionHeader
          numeral="III"
          eyebrow={t('TRAVEL ACROSS ODISHA', 'ଓଡ଼ିଶା ପରିଭ୍ରମଣ')}
          title={
            <span id="land-title">
              {t(
                'A coast, a lagoon, a delta, and hills behind all three',
                'ସମୁଦ୍ର ତଟ, ଚିଲିକା ହ୍ରଦ, ନଦୀ ଉପତ୍ୟକା ଏବଂ ପ୍ରାଚୀନ ପର୍ବତମାଳା',
              )}
            </span>
          }
          lede={t(
            'Odisha sits on the Bay of Bengal between Bengal and Andhra, with the Eastern Ghats at its back. Four major rivers build the delta the state lives on. Select a destination to explore.',
            'ବଙ୍ଗୋପସାଗର କୂଳରେ ଅବସ୍ଥିତ ଓଡ଼ିଶା। ପ୍ରଧାନ ନଦୀସମୂହ ଏହାର ଉପତ୍ୟକା ଗଠନ କରିଛନ୍ତି। ସ୍ଥାନ ବାଛି ଅନୁଧ୍ୟାନ କରନ୍ତୁ।',
          )}
        />

        {/* Category filter bar */}
        <div className="landsec__filters">
          {['all', 'heritage', 'nature', 'city', 'industry'].map((cat) => (
            <button
              key={cat}
              type="button"
              className={`chip ${kindFilter === cat ? 'is-on' : ''}`}
              onClick={() => setKindFilter(cat)}
            >
              {cat === 'all'
                ? t('All 12 Destinations', 'ସମସ୍ତ ୧୨ ସ୍ଥାନ')
                : t(KIND_LABEL[cat]?.en ?? cat, KIND_LABEL[cat]?.or ?? cat)}
            </button>
          ))}
        </div>

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

                <ellipse
                  className="odmap__sea"
                  cx="620"
                  cy="330"
                  rx="230"
                  ry="240"
                  fill="url(#od-sea)"
                  aria-hidden="true"
                />

                <path d={ODISHA_OUTLINE} className="odmap__land" fill="url(#od-fill)" />
                <path d={ODISHA_OUTLINE} className="odmap__edge" fill="none" />

                <g className="odmap__rivers" aria-hidden="true">
                  {RIVERS.map((d) => (
                    <path key={d} d={d} fill="none" />
                  ))}
                </g>

                <path d={CHILIKA_SHAPE} className="odmap__lagoon" aria-hidden="true" />

                <g className="odmap__pins">
                  {filteredPlaces.map((p) => {
                    const isOpen = p.id === openId
                    return (
                      <g
                        key={p.id}
                        className={`odmap__pin odmap__pin--${p.kind} ${isOpen ? 'is-open' : ''}`}
                        transform={`translate(${p.x} ${p.y})`}
                        onClick={() => handleSelectPlace(p.id)}
                        style={{ cursor: 'pointer' }}
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

            <ul className="landsec__chips" aria-label="Places in Odisha">
              {filteredPlaces.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    className={`chip chip--${p.kind} ${p.id === openId ? 'is-on' : ''}`}
                    aria-pressed={p.id === openId}
                    onClick={() => handleSelectPlace(p.id)}
                  >
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="landsec__readout" delay={100}>
            <div className={`placecard placecard--${open.kind}`} key={open.id}>
              <p className="placecard__kind">{t(KIND_LABEL[open.kind]?.en ?? open.kind, KIND_LABEL[open.kind]?.or ?? open.kind)}</p>
              <h3 className="placecard__name">{open.name}</h3>
              <p className="placecard__tag">{open.tag}</p>
              <p className="placecard__blurb">{open.blurb}</p>
              {open.target && (
                <button className="linkish" type="button" onClick={() => scrollToId(open.target!)}>
                  {t('Read the chapter', 'ଅଧ୍ୟାୟ ପଢ଼ନ୍ତୁ')} →
                </button>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
