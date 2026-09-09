import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

const BORDERS = [
  { id: 'lotus', nameEn: 'Lotus Petals', nameOr: 'ପଦ୍ମ ପାଖୁଡ଼ା' },
  { id: 'saura', nameEn: 'Saura Triangles', nameOr: 'ସୌରା ତ୍ରିଭୁଜ' },
  { id: 'diamond', nameEn: 'Temple Diamond', nameOr: 'ମନ୍ଦିର ହୀରା' },
]

const FIGURES = [
  { id: 'surya', nameEn: 'Surya Sun God', nameOr: 'ସୂର୍ଯ୍ୟ ଦେବ' },
  { id: 'jagannath', nameEn: 'Jagannath Shrine', nameOr: 'ଜଗନ୍ନାଥ' },
  { id: 'dancer', nameEn: 'Odissi Dancer', nameOr: 'ଓଡ଼ିଶୀ ନୃତ୍ୟାଙ୍ଗନା' },
  { id: 'tree', nameEn: 'Tree of Life', nameOr: 'ଜୀବନ ବୃକ୍ଷ' },
]

const PIGMENTS = [
  { id: 'hingula', nameEn: 'Hingula Red', nameOr: 'ହିଙ୍ଗୁଳ ଲାଲ୍', color: '#b8362b' },
  { id: 'haritala', nameEn: 'Haritala Yellow', nameOr: 'ହରିତାଳ ହଳଦିଆ', color: '#e0a548' },
  { id: 'nila', nameEn: 'Nila Indigo', nameOr: 'ନୀଳ ଇଣ୍ଡିଗୋ', color: '#2b4a7a' },
  { id: 'sankha', nameEn: 'Conch White', nameOr: 'ଶଙ୍ଖ ଧଳା', color: '#f5ecdb' },
]

export function PattachitraLab() {
  const [border, setBorder] = useState(BORDERS[0].id)
  const [figure, setFigure] = useState(FIGURES[0].id)
  const [pigment, setPigment] = useState(PIGMENTS[0].id)
  const { t } = useLanguage()

  const currentPigment = PIGMENTS.find((p) => p.id === pigment) ?? PIGMENTS[0]

  return (
    <div className="patta-lab">
      <div className="patta-lab__head">
        <div>
          <p className="patta-lab__eyebrow">Interactive Digital Studio</p>
          <h3>{t('Build a Pattachitra', 'ପଟ୍ଟଚିତ୍ର ନିର୍ମାଣ')}</h3>
          <p className="patta-lab__sub">
            {t(
              'Select border geometry, central sacred motif, and natural pigment tone.',
              'ସୀମାରେଖା, କେନ୍ଦ୍ରୀୟ ଚିତ୍ର ଏବଂ ପ୍ରାକୃତିକ ରଙ୍ଗ ବାଛନ୍ତୁ।',
            )}
          </p>
        </div>
      </div>

      <div className="patta-lab__grid">
        {/* Controls */}
        <div className="patta-lab__controls">
          <div className="patta-lab__group">
            <label>{t('1. Select Border Motif', '୧. ସୀମାରେଖା ବାଛନ୍ତୁ')}</label>
            <div className="patta-lab__options">
              {BORDERS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  className={`patta-btn ${border === b.id ? 'is-active' : ''}`}
                  onClick={() => setBorder(b.id)}
                >
                  {t(b.nameEn, b.nameOr)}
                </button>
              ))}
            </div>
          </div>

          <div className="patta-lab__group">
            <label>{t('2. Select Central Figure', '୨. କେନ୍ଦ୍ରୀୟ ଚିତ୍ର ବାଛନ୍ତୁ')}</label>
            <div className="patta-lab__options">
              {FIGURES.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`patta-btn ${figure === f.id ? 'is-active' : ''}`}
                  onClick={() => setFigure(f.id)}
                >
                  {t(f.nameEn, f.nameOr)}
                </button>
              ))}
            </div>
          </div>

          <div className="patta-lab__group">
            <label>{t('3. Select Natural Pigment Tone', '୩. ପ୍ରାକୃତିକ ରଙ୍ଗ ବାଛନ୍ତୁ')}</label>
            <div className="patta-lab__swatches">
              {PIGMENTS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`patta-swatch ${pigment === p.id ? 'is-active' : ''}`}
                  style={{ backgroundColor: p.color }}
                  onClick={() => setPigment(p.id)}
                  title={t(p.nameEn, p.nameOr)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Canvas Output */}
        <div className="patta-lab__stage" style={{ '--patta-color': currentPigment.color } as React.CSSProperties}>
          <svg className="patta-canvas" viewBox="0 0 320 320" role="img" aria-label="Digital Pattachitra Composition">
            <rect width="320" height="320" fill="#100d0a" rx="8" />
            <rect x="12" y="12" width="296" height="296" fill="none" stroke={currentPigment.color} strokeWidth="3" rx="4" />
            <rect x="20" y="20" width="280" height="280" fill="none" stroke={currentPigment.color} strokeWidth="1" strokeDasharray={border === 'lotus' ? '6 4' : border === 'saura' ? '10 4' : '4 4'} />

            {/* Central figure illustration */}
            <circle cx="160" cy="160" r="85" fill="none" stroke={currentPigment.color} strokeWidth="2" opacity="0.6" />

            {figure === 'surya' && (
              <g stroke={currentPigment.color} fill="none" strokeWidth="2">
                <circle cx="160" cy="160" r="45" />
                <circle cx="160" cy="160" r="20" />
                {Array.from({ length: 12 }, (_, i) => {
                  const angle = (i * 30 * Math.PI) / 180
                  const x1 = 160 + 45 * Math.cos(angle)
                  const y1 = 160 + 45 * Math.sin(angle)
                  const x2 = 160 + 65 * Math.cos(angle)
                  const y2 = 160 + 65 * Math.sin(angle)
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
                })}
              </g>
            )}

            {figure === 'jagannath' && (
              <g fill={currentPigment.color}>
                <rect x="130" y="120" width="60" height="80" rx="6" />
                <circle cx="145" cy="148" r="10" fill="#100d0a" />
                <circle cx="175" cy="148" r="10" fill="#100d0a" />
                <circle cx="145" cy="148" r="4" fill={currentPigment.color} />
                <circle cx="175" cy="148" r="4" fill={currentPigment.color} />
                <path d="M 140 180 Q 160 195 180 180" fill="none" stroke="#100d0a" strokeWidth="3" />
              </g>
            )}

            {figure === 'dancer' && (
              <g stroke={currentPigment.color} fill="none" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="160" cy="115" r="14" fill={currentPigment.color} />
                <path d="M 160 130 L 160 185 L 140 230 M 160 185 L 180 230" />
                <path d="M 130 145 Q 160 135 190 145" />
                <circle cx="160" cy="100" r="6" strokeWidth="1.5" />
              </g>
            )}

            {figure === 'tree' && (
              <g stroke={currentPigment.color} fill="none" strokeWidth="2.5">
                <path d="M 160 240 L 160 140 M 160 190 Q 120 160 110 130 M 160 170 Q 200 140 210 110 M 160 150 Q 130 110 140 90 M 160 150 Q 190 110 180 90" />
                <circle cx="110" cy="130" r="5" fill={currentPigment.color} />
                <circle cx="210" cy="110" r="5" fill={currentPigment.color} />
                <circle cx="140" cy="90" r="5" fill={currentPigment.color} />
                <circle cx="180" cy="90" r="5" fill={currentPigment.color} />
              </g>
            )}
          </svg>
          <p className="patta-lab__caption">
            {t('Digital composition inspired by traditional Odia Pattachitra.', 'ପ୍ରାଚୀନ ଓଡ଼ିଆ ପଟ୍ଟଚିତ୍ର ଶୈଳୀରୁ ପ୍ରେରିତ।')}
          </p>
        </div>
      </div>
    </div>
  )
}
