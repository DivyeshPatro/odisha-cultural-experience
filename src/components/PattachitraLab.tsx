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
  const [figure, setFigure] = useState(FIGURES[1].id) // Default to Jagannath Shrine
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
        <div className="patta-lab__controls" role="region" aria-label={t('Pattachitra Studio Controls', 'ପଟ୍ଟଚିତ୍ର ଷ୍ଟୁଡିଓ ନିୟନ୍ତ୍ରଣ')}>
          <div className="patta-lab__group">
            <label id="patta-border-label">{t('1. Select Border Motif', '୧. ସୀମାରେଖା ବାଛନ୍ତୁ')}</label>
            <div className="patta-lab__options" role="group" aria-labelledby="patta-border-label">
              {BORDERS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  className={`patta-btn ${border === b.id ? 'is-active' : ''}`}
                  aria-pressed={border === b.id}
                  onClick={() => setBorder(b.id)}
                >
                  {t(b.nameEn, b.nameOr)}
                </button>
              ))}
            </div>
          </div>

          <div className="patta-lab__group">
            <label id="patta-figure-label">{t('2. Select Central Figure', '୨. କେନ୍ଦ୍ରୀୟ ଚିତ୍ର ବାଛନ୍ତୁ')}</label>
            <div className="patta-lab__options" role="group" aria-labelledby="patta-figure-label">
              {FIGURES.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`patta-btn ${figure === f.id ? 'is-active' : ''}`}
                  aria-pressed={figure === f.id}
                  onClick={() => setFigure(f.id)}
                >
                  {t(f.nameEn, f.nameOr)}
                </button>
              ))}
            </div>
          </div>

          <div className="patta-lab__group">
            <label id="patta-pigment-label">{t('3. Select Natural Pigment Tone', '୩. ପ୍ରାକୃତିକ ରଙ୍ଗ ବାଛନ୍ତୁ')}</label>
            <div className="patta-lab__swatches" role="group" aria-labelledby="patta-pigment-label">
              {PIGMENTS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`patta-swatch ${pigment === p.id ? 'is-active' : ''}`}
                  style={{ backgroundColor: p.color }}
                  aria-pressed={pigment === p.id}
                  aria-label={t(p.nameEn, p.nameOr)}
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
            {/* Background Canvas */}
            <rect width="320" height="320" fill="#100d0a" rx="8" />

            {/* Outer Sealed Border Lines */}
            <rect x="12" y="12" width="296" height="296" fill="none" stroke={currentPigment.color} strokeWidth="3" rx="4" />
            <rect x="20" y="20" width="280" height="280" fill="none" stroke={currentPigment.color} strokeWidth="1" strokeOpacity="0.6" />

            {/* Border Motif Geometry */}
            {border === 'lotus' && (
              <g stroke={currentPigment.color} fill="none" strokeWidth="1" opacity="0.75">
                {/* Corner Lotus Seals */}
                {[[24, 24], [296, 24], [296, 296], [24, 296]].map(([x, y], i) => (
                  <g key={i} transform={`translate(${x} ${y})`}>
                    <circle r="6" fill="#100d0a" stroke={currentPigment.color} strokeWidth="1" />
                    <path d="M -4 0 C -4 -4 4 -4 4 0 C 4 4 -4 4 -4 0" fill={currentPigment.color} />
                  </g>
                ))}
                {/* Repeating Lotus Scallops */}
                <path d="M 32 20 Q 40 14 48 20 Q 56 14 64 20 Q 72 14 80 20 Q 88 14 96 20 Q 104 14 112 20 Q 120 14 128 20 Q 136 14 144 20 Q 152 14 160 20 Q 168 14 176 20 Q 184 14 192 20 Q 200 14 208 20 Q 216 14 224 20 Q 232 14 240 20 Q 248 14 256 20 Q 264 14 272 20 Q 280 14 288 20" />
                <path d="M 32 300 Q 40 306 48 300 Q 56 306 64 300 Q 72 306 80 300 Q 88 306 96 300 Q 104 306 112 300 Q 120 306 128 300 Q 136 306 144 300 Q 152 306 160 300 Q 168 306 176 300 Q 184 306 192 300 Q 200 306 208 300 Q 216 306 224 300 Q 232 306 240 300 Q 248 306 256 300 Q 264 306 272 300 Q 280 306 288 300" />
              </g>
            )}

            {border === 'saura' && (
              <g stroke={currentPigment.color} fill={currentPigment.color} opacity="0.7">
                {/* Triangular Saw-tooth Saura Border */}
                {Array.from({ length: 17 }, (_, i) => 24 + i * 16).map((x) => (
                  <polygon key={`t-${x}`} points={`${x},20 ${x + 8},12 ${x + 16},20`} />
                ))}
                {Array.from({ length: 17 }, (_, i) => 24 + i * 16).map((x) => (
                  <polygon key={`b-${x}`} points={`${x},300 ${x + 8},308 ${x + 16},300`} />
                ))}
              </g>
            )}

            {border === 'diamond' && (
              <g stroke={currentPigment.color} fill="none" strokeWidth="1" opacity="0.8">
                {Array.from({ length: 15 }, (_, i) => 28 + i * 18).map((x) => (
                  <polygon key={`d-${x}`} points={`${x},16 ${x + 6},20 ${x},24 ${x - 6},20`} fill={currentPigment.color} />
                ))}
                {Array.from({ length: 15 }, (_, i) => 28 + i * 18).map((x) => (
                  <polygon key={`db-${x}`} points={`${x},296 ${x + 6},300 ${x},304 ${x - 6},300`} fill={currentPigment.color} />
                ))}
              </g>
            )}

            {/* Inner Prabhavali Circular Frame */}
            <circle cx="160" cy="160" r="92" fill="none" stroke={currentPigment.color} strokeWidth="1.5" opacity="0.35" />
            <circle cx="160" cy="160" r="88" fill="none" stroke={currentPigment.color} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />

            {/* CENTRAL FIGURE 1: SURYA SUN GOD */}
            {figure === 'surya' && (
              <g stroke={currentPigment.color} fill="none">
                {/* Outer Rays and Lotus Petals */}
                {Array.from({ length: 16 }, (_, i) => {
                  const angle = (i * 22.5 * Math.PI) / 180
                  const x1 = 160 + 52 * Math.cos(angle)
                  const y1 = 160 + 52 * Math.sin(angle)
                  const x2 = 160 + 74 * Math.cos(angle)
                  const y2 = 160 + 74 * Math.sin(angle)
                  return (
                    <g key={i}>
                      <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={i % 2 === 0 ? '2' : '1.2'} />
                      {i % 2 === 0 && <circle cx={x2} cy={y2} r="3" fill={currentPigment.color} />}
                    </g>
                  )
                })}
                {/* Solar Concentric Rings */}
                <circle cx="160" cy="160" r="50" strokeWidth="2" />
                <circle cx="160" cy="160" r="42" strokeWidth="1" strokeDasharray="4 2" />
                <circle cx="160" cy="160" r="28" strokeWidth="1.8" />
                {/* Central Solar Medallion */}
                <circle cx="160" cy="160" r="14" fill={currentPigment.color} />
                <circle cx="160" cy="160" r="6" fill="#100d0a" />
                {/* Spoke Linework */}
                {Array.from({ length: 8 }, (_, i) => {
                  const angle = (i * 45 * Math.PI) / 180
                  const x1 = 160 + 14 * Math.cos(angle)
                  const y1 = 160 + 14 * Math.sin(angle)
                  const x2 = 160 + 28 * Math.cos(angle)
                  const y2 = 160 + 28 * Math.sin(angle)
                  return <line key={`s-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#100d0a" strokeWidth="1.5" />
                })}
              </g>
            )}

            {/* CENTRAL FIGURE 2: JAGANNATH SHRINE (LORD JAGANNATH IN PATTACHITRA IDIOM) */}
            {figure === 'jagannath' && (
              <g transform="translate(0, 0)">
                {/* Temple Shrine Archway (Deula / Prabhavali Frame) */}
                <path
                  d="M 88 240 V 126 Q 88 72 160 46 Q 232 72 232 126 V 240 Z"
                  fill="#100d0a"
                  stroke={currentPigment.color}
                  strokeWidth="1.8"
                  opacity="0.9"
                />
                <path
                  d="M 96 240 V 128 Q 96 78 160 54 Q 224 78 224 128 V 240"
                  fill="none"
                  stroke={currentPigment.color}
                  strokeWidth="0.8"
                  strokeDasharray="4 3"
                  opacity="0.5"
                />

                {/* Shrine Top Finial (Neelachakra & Kalasa) */}
                <path d="M 160 46 V 32" stroke={currentPigment.color} strokeWidth="2" />
                <circle cx="160" cy="30" r="6" fill="none" stroke={currentPigment.color} strokeWidth="1.5" />
                <path d="M 160 24 L 160 20 M 154 30 L 150 30 M 166 30 L 170 30" stroke={currentPigment.color} strokeWidth="1.5" />

                {/* Ratnavedi Sacred Shrine Pedestal (Multi-tiered Base) */}
                <path
                  d="M 94 238 L 226 238 L 216 218 L 104 218 Z"
                  fill={currentPigment.color}
                  stroke="#f5ecdb"
                  strokeWidth="1.5"
                />
                <rect x="110" y="208" width="100" height="10" fill={currentPigment.color} stroke="#f5ecdb" strokeWidth="1.2" />
                <circle cx="160" cy="226" r="3.5" fill="#f5ecdb" />

                {/* Sacred Srimukha Head Icon (Dominant Sacred Domed Face Shape) */}
                <path
                  d="M 112 208 V 138 C 112 94 208 94 208 138 V 208 Z"
                  fill={currentPigment.color}
                  stroke="#f5ecdb"
                  strokeWidth="1.8"
                />

                {/* Outstretched Sacred Idol Stump-Arms (Integrated Puri Sacred Silhouette) */}
                <path d="M 84 148 H 112 V 170 H 84 Z" fill={currentPigment.color} stroke="#f5ecdb" strokeWidth="1.5" />
                <path d="M 208 148 H 236 V 170 H 208 Z" fill={currentPigment.color} stroke="#f5ecdb" strokeWidth="1.5" />

                {/* Kirita (Crown) Ornamental Linework */}
                <path d="M 124 114 Q 160 96 196 114" fill="none" stroke="#f5ecdb" strokeWidth="1.8" />
                <path d="M 134 106 Q 160 92 186 106" fill="none" stroke="#f5ecdb" strokeWidth="1.2" />
                <path d="M 144 100 Q 160 88 176 100" fill="none" stroke="#f5ecdb" strokeWidth="0.9" strokeDasharray="2 2" />

                {/* Divine Chaka Akhi (Commanding Large Round Eyes - Dominating Srimukha Face) */}
                {/* Left Chaka Akhi */}
                <circle cx="136" cy="146" r="16.5" fill="#f5ecdb" stroke={currentPigment.color} strokeWidth="2.2" />
                <circle cx="136" cy="146" r="10.5" fill={currentPigment.color} />
                <circle cx="136" cy="146" r="5" fill="#100d0a" />
                <circle cx="136" cy="146" r="1.8" fill="#f5ecdb" />

                {/* Right Chaka Akhi */}
                <circle cx="184" cy="146" r="16.5" fill="#f5ecdb" stroke={currentPigment.color} strokeWidth="2.2" />
                <circle cx="184" cy="146" r="10.5" fill={currentPigment.color} />
                <circle cx="184" cy="146" r="5" fill="#100d0a" />
                <circle cx="184" cy="146" r="1.8" fill="#f5ecdb" />

                {/* Srimukha Vaishnava Urdhva Pundra Tilak (Forehead Sacred Mark) */}
                <path
                  d="M 154 130 C 154 108 160 96 160 96 C 160 96 166 108 166 130 Z"
                  fill="#f5ecdb"
                  stroke={currentPigment.color}
                  strokeWidth="1"
                />
                <line x1="160" y1="98" x2="160" y2="128" stroke={currentPigment.color} strokeWidth="2" />

                {/* NOTE: Zero mouth / lip line to prevent any character mouth or smile interpretation */}

                {/* Sacred Pedestal Linework & Floral Garland Accents */}
                <path d="M 120 194 Q 160 206 200 194" fill="none" stroke="#f5ecdb" strokeWidth="1.5" />
                <line x1="160" y1="200" x2="160" y2="238" stroke="#f5ecdb" strokeWidth="1.5" strokeDasharray="3 3" />
              </g>
            )}

            {/* CENTRAL FIGURE 3: ODISSI DANCER (TRIBHANGA POSE) */}
            {figure === 'dancer' && (
              <g stroke={currentPigment.color} fill="none" strokeLinecap="round">
                {/* Tahia (Traditional White Flower Crown) */}
                <g stroke="#f5ecdb" strokeWidth="1.5">
                  <path d="M 160 76 V 62 M 160 76 L 152 64 M 160 76 L 168 64 M 160 76 L 146 70 M 160 76 L 174 70" />
                </g>

                {/* Head (First Bend - Neck) */}
                <ellipse cx="156" cy="88" rx="10" ry="12" fill={currentPigment.color} transform="rotate(-10 156 88)" />

                {/* Torso & Waist (Second Bend) */}
                <path d="M 152 100 C 144 114 150 128 158 136 L 176 136 C 178 122 170 110 164 100 Z" fill={currentPigment.color} strokeWidth="1.5" />

                {/* Right Arm in Pataka Mudra */}
                <path d="M 170 102 Q 186 96 200 80" strokeWidth="2.5" />
                <path d="M 200 80 L 204 70 M 200 80 L 208 74" strokeWidth="1.5" />

                {/* Left Arm across body */}
                <path d="M 150 104 Q 134 112 120 112" strokeWidth="2.5" />
                <path d="M 120 112 L 112 106 M 120 112 L 110 112" strokeWidth="1.5" />

                {/* Pleated Fan Skirt (Cuncha) & Aramandi Knees (Third Bend) */}
                <path d="M 150 136 H 182 L 202 198 H 130 Z" fill={currentPigment.color} strokeWidth="1.5" />

                {/* Skirt Pleat Linework */}
                <g stroke="#100d0a" strokeWidth="1.2" opacity="0.7">
                  <line x1="166" y1="136" x2="142" y2="198" />
                  <line x1="166" y1="136" x2="166" y2="198" />
                  <line x1="166" y1="136" x2="190" y2="198" />
                </g>

                {/* Feet in Aramandi Posture */}
                <path d="M 142 198 L 134 212 H 152 L 148 198 Z" fill={currentPigment.color} />
                <path d="M 190 198 L 186 212 H 204 L 196 198 Z" fill={currentPigment.color} />

                {/* Jewelry Highlights */}
                <path d="M 150 136 H 182" stroke="#f5ecdb" strokeWidth="2" />
                <path d="M 134 210 H 152 M 186 210 H 204" stroke="#f5ecdb" strokeWidth="2" />
              </g>
            )}

            {/* CENTRAL FIGURE 4: TREE OF LIFE (KALPAVRIKSHA) */}
            {figure === 'tree' && (
              <g stroke={currentPigment.color} fill="none" strokeLinecap="round">
                {/* Pedestal / Roots Base */}
                <path d="M 130 236 C 145 226, 175 226, 190 236" strokeWidth="2" />
                {/* Central Sacred Trunk */}
                <path d="M 160 230 V 130" strokeWidth="3.5" />

                {/* Primary Symmetrical Arching Branches */}
                <path d="M 160 180 C 120 170, 100 140, 96 110" strokeWidth="2.2" />
                <path d="M 160 180 C 200 170, 220 140, 224 110" strokeWidth="2.2" />
                <path d="M 160 156 C 130 140, 114 116, 120 90" strokeWidth="2" />
                <path d="M 160 156 C 190 140, 206 116, 200 90" strokeWidth="2" />
                <path d="M 160 135 C 145 110, 150 90, 160 70" strokeWidth="1.8" />

                {/* Terminal Lotus Buds & Foliage Dots */}
                {[
                  [96, 110],
                  [224, 110],
                  [120, 90],
                  [200, 90],
                  [160, 70],
                ].map(([cx, cy], i) => (
                  <g key={i}>
                    <circle cx={cx} cy={cy} r="6" fill={currentPigment.color} />
                    <circle cx={cx} cy={cy} r="2.5" fill="#100d0a" />
                  </g>
                ))}

                {/* Roosting Birds (Mayura/Peacock Silhouettes) */}
                <path d="M 112 136 Q 104 126 114 120 Q 124 126 122 134 Z" fill={currentPigment.color} />
                <path d="M 208 136 Q 216 126 206 120 Q 196 126 198 134 Z" fill={currentPigment.color} />
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

