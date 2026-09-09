import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

const IKAT_STEPS = [
  {
    step: 1,
    titleEn: '1. Thread Preparation',
    titleOr: '୧. ସୂତା ପ୍ରସ୍ତୁତି',
    descEn: 'High-count cotton or silk threads are wound onto frames in warps and wefts.',
    descOr: 'ସୂତା ଏବଂ ରେଶମ ସୂତାକୁ ଫ୍ରେମ୍‌ରେ ମାପ ଅନୁସାରେ ସଜାଡ଼ି ରଖାଯାଏ।',
  },
  {
    step: 2,
    titleEn: '2. Precision Tying (Bandha)',
    titleOr: '୨. ସୂତା ବାନ୍ଧିବା (ବନ୍ଧ)',
    descEn: 'Artisans tie rubber wraps tightly around thread bundles according to calculated mathematical designs.',
    descOr: 'ଗାଣିତିକ ନକ୍ସା ଅନୁସାରେ ଗଣ୍ଠି ବନ୍ଧାଯାଏ ଯାହା ରଙ୍ଗ ପଶିବାକୁ ଦିଏନାହିଁ।',
  },
  {
    step: 3,
    titleEn: '3. Natural Dyeing',
    titleOr: '୩. ପ୍ରାକୃତିକ ରଙ୍ଗ',
    descEn: 'Bundles are submerged in natural dyes. Only untied sections absorb pigment.',
    descOr: 'ସୂତାକୁ ପ୍ରାକୃତିକ ରଙ୍ଗରେ ବୁଡ଼ାଯାଏ, ବନ୍ଧା ଯାଇଥିବା ସ୍ଥାନ ରଙ୍ଗମୁକ୍ତ ରହେ।',
  },
  {
    step: 4,
    titleEn: '4. Untying (Unwrapping)',
    titleOr: '୪. ଗଣ୍ଠି ଫିଟାଇବା',
    descEn: 'Wraps are removed to reveal precise resist-dyed patterns along the thread length.',
    descOr: 'ଗଣ୍ଠି ଖୋଲିବା ପରେ ସୂତାରେ ସୁନ୍ଦର ରଙ୍ଗୀନ ନକ୍ସା ପ୍ରକାଶ ପାଏ।',
  },
  {
    step: 5,
    titleEn: '5. Weaving on Pit Loom',
    titleOr: '୫. ତନ୍ତରେ ବୁଣା',
    descEn: 'Dyed warp and weft threads are aligned on pit looms, forming feather-edged Sambalpuri motifs.',
    descOr: 'ତନ୍ତରେ ପ୍ରସ୍ତୁତ ସୂତା ସଜାଡ଼ି ସୁନ୍ଦର ସମ୍ବଲପୁରୀ ବନ୍ଧ ନକ୍ସା ପ୍ରସ୍ତୁତ ହୁଏ।',
  },
]

export function IkatLab() {
  const [activeStep, setActiveStep] = useState(0)
  const { t } = useLanguage()

  const current = IKAT_STEPS[activeStep]

  return (
    <div className="ikat-lab">
      <div className="ikat-lab__head">
        <p className="ikat-lab__eyebrow">Textile Craft Process</p>
        <h3>{t('Sambalpuri Bandha — Ikat Weaving', 'ସମ୍ବଲପୁରୀ ବାନ୍ଧ ଶିଳ୍ପ')}</h3>
        <p className="ikat-lab__lede">
          {t(
            'Discover how threads are tied and dyed before weaving to create Odisha’s iconic Ikat patterns.',
            'ଜାଣନ୍ତୁ କିପରି ବୁଣା ହେବା ପୂର୍ବରୁ ସୂତାରେ ବାନ୍ଧ ଓ ରଙ୍ଗ ଦେଇ ନକ୍ସା ତିଆରି ହୁଏ।',
          )}
        </p>
      </div>

      <div className="ikat-lab__stepper">
        {IKAT_STEPS.map((s, idx) => (
          <button
            key={s.step}
            type="button"
            className={`ikat-step-btn ${idx === activeStep ? 'is-active' : ''}`}
            onClick={() => setActiveStep(idx)}
          >
            <span className="ikat-step-num">0{s.step}</span>
            <span className="ikat-step-label">{t(s.titleEn.split('. ')[1], s.titleOr.split('. ')[1])}</span>
          </button>
        ))}
      </div>

      <div className="ikat-lab__stage">
        <div className="ikat-lab__info">
          <h4>{t(current.titleEn, current.titleOr)}</h4>
          <p>{t(current.descEn, current.descOr)}</p>
        </div>

        {/* Visual Animated Thread Grid */}
        <div className="ikat-lab__visual" data-step={current.step}>
          <svg viewBox="0 0 300 160" className="ikat-svg" role="img" aria-label="Ikat Thread Animation">
            <rect width="300" height="160" fill="#14110c" rx="6" />

            {/* Warp threads */}
            {Array.from({ length: 15 }, (_, i) => (
              <line
                key={i}
                x1={20 + i * 18}
                y1="10"
                x2={20 + i * 18}
                y2="150"
                stroke={activeStep >= 2 ? (i % 2 === 0 ? '#b8362b' : '#e0a548') : '#8f7a5d'}
                strokeWidth={activeStep === 1 ? '3' : '1.5'}
                strokeDasharray={activeStep === 1 ? '12 8' : 'none'}
              />
            ))}

            {/* Weft pattern alignment */}
            {activeStep >= 4 &&
              Array.from({ length: 8 }, (_, j) => (
                <path
                  key={j}
                  d={`M 10 ${20 + j * 16} L 290 ${20 + j * 16}`}
                  stroke="#e0a548"
                  strokeWidth="2"
                  strokeDasharray="16 12"
                  opacity="0.85"
                />
              ))}
          </svg>
        </div>
      </div>
    </div>
  )
}
