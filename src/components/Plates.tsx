/* ------------------------------------------------------------------
   THE PLATES

   Every "image" on this site is one of these: a drawn SVG panel, in the
   idiom of the thing it depicts. There is a deliberate reason for that
   choice, and it is not only licensing.

   A stock photograph of Odisha would be someone else's framing of it.
   These are line drawings in the visual grammar the state actually
   uses — Pattachitra's sealed floral border and heavy outline, Saura's
   stick figures, the feathered diamond of a bandha weave. They also
   weigh a few kilobytes each, scale to any screen, and cannot 404.

   The README documents exactly where to drop real photographs if you
   want them, and what licences to check.
-------------------------------------------------------------------*/

interface PlateProps {
  className?: string
  accent?: string
}

/** The Pattachitra frame every plate sits inside. */
function Frame({ accent = 'var(--gold)' }: { accent?: string }) {
  return (
    <>
      <rect x="3" y="3" width="194" height="194" rx="2" fill="none" stroke={accent} strokeWidth="1.6" opacity="0.55" />
      <rect x="10" y="10" width="180" height="180" rx="1" fill="none" stroke={accent} strokeWidth="0.7" opacity="0.4" />
      {/* corner rosettes — Pattachitra seals its corners, always */}
      {[
        [14, 14, 0],
        [186, 14, 90],
        [186, 186, 180],
        [14, 186, 270],
      ].map(([x, y, r]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r})`} stroke={accent} fill="none" opacity="0.7">
          <path d="M0 9 C 5 9, 9 5, 9 0" strokeWidth="0.9" />
          <circle r="2.2" strokeWidth="0.8" />
        </g>
      ))}
    </>
  )
}

const wrap = (className: string, accent: string | undefined, children: React.ReactNode) => (
  <svg className={`plate ${className}`} viewBox="0 0 200 200" aria-hidden="true" focusable="false">
    <rect width="200" height="200" fill="none" />
    {children}
    <Frame accent={accent} />
  </svg>
)

/* ================= ART PLATES ================= */

/** The Jagannath triad — the single most recognisable image Odisha has. */
function PattachitraPlate({ className = '', accent }: PlateProps) {
  const eye = (cx: number, cy: number, rx: number, ry: number, fill: string) => (
    <>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#f5ecdb" stroke="#1a1610" strokeWidth="1.6" />
      <circle cx={cx} cy={cy} r={ry * 0.5} fill={fill} />
    </>
  )
  return wrap(
    `plate--patta ${className}`,
    accent,
    <>
      <rect x="10" y="10" width="180" height="180" fill="#e7d7b4" opacity="0.07" />
      {/* Balabhadra — white */}
      <g transform="translate(56 108)">
        <path d="M-27 44 V-6 a27 27 0 0 1 54 0 V44 Z" fill="#efe6d2" stroke="#1a1610" strokeWidth="2" />
        <path d="M-27 12 h-14M27 12 h14" stroke="#1a1610" strokeWidth="4" strokeLinecap="round" />
        {eye(-11, -4, 8, 5.5, '#1a1610')}
        {eye(11, -4, 8, 5.5, '#1a1610')}
        <path d="M-11 16 Q 0 23, 11 16" fill="none" stroke="#1a1610" strokeWidth="2" strokeLinecap="round" />
        <path d="M0 -22 v-9M-5 -24 l-3-7M5 -24 l3-7" stroke="#b8362b" strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* Subhadra — yellow, smaller, between them */}
      <g transform="translate(100 118)">
        <path d="M-19 34 V-2 a19 19 0 0 1 38 0 V34 Z" fill="#e0a548" stroke="#1a1610" strokeWidth="2" />
        {eye(-7.5, -2, 5.5, 4.5, '#1a1610')}
        {eye(7.5, -2, 5.5, 4.5, '#1a1610')}
        <path d="M-7 13 Q 0 18, 7 13" fill="none" stroke="#1a1610" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M0 -16 v-7" stroke="#b8362b" strokeWidth="1.8" strokeLinecap="round" />
      </g>
      {/* Jagannath — dark */}
      <g transform="translate(144 108)">
        <path d="M-27 44 V-6 a27 27 0 0 1 54 0 V44 Z" fill="#241d16" stroke="#1a1610" strokeWidth="2" />
        <path d="M-27 12 h-14M27 12 h14" stroke="#241d16" strokeWidth="4" strokeLinecap="round" />
        {eye(-11, -4, 9, 9, '#1a1610')}
        {eye(11, -4, 9, 9, '#1a1610')}
        <path d="M-12 20 Q 0 27, 12 20" fill="none" stroke="#f5ecdb" strokeWidth="2" strokeLinecap="round" />
        <path d="M0 -24 v-8M-6 -26 l-3-6M6 -26 l3-6" stroke="#b8362b" strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* creeper border along the base, as on a real patta */}
      <g stroke="var(--gold)" fill="none" strokeWidth="0.9" opacity="0.6">
        {Array.from({ length: 9 }, (_, i) => 22 + i * 18).map((x) => (
          <path key={x} d={`M${x} 172 q 9 -9, 18 0`} />
        ))}
      </g>
      <text x="100" y="36" textAnchor="middle" className="plate__cap">
        ଜଗନ୍ନାଥ · ବଳଭଦ୍ର · ସୁଭଦ୍ରା
      </text>
    </>,
  )
}

/**
 * Odissi, drawn as bas-relief in a temple niche rather than as a
 * diagram — because that is literally where the pose is found. The
 * figure holds tribhanga: the body broken into three bends at neck,
 * torso and knee, weight off-centre, which is the stance you can go and
 * find carved on the walls at Konark.
 *
 * A filled silhouette, not a line figure: the first attempt was drawn
 * as sticks and read as a school diagram.
 */
function OdissiPlate({ className = '', accent }: PlateProps) {
  return wrap(
    `plate--odissi ${className}`,
    accent,
    <>
      {/* the niche the dancer stands in */}
      <path
        d="M60 176 V100 C60 72, 78 50, 100 50 C122 50, 140 72, 140 100 V176 Z"
        fill="#1d1610"
        stroke="var(--gold-deep)"
        strokeWidth="1"
        opacity="0.9"
      />
      <path
        d="M60 100 C60 72, 78 50, 100 50 C122 50, 140 72, 140 100"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="0.8"
        opacity="0.5"
      />

      <g fill="#e9dcc1">
        {/* tahia — the tall white flower crown worn in Odissi */}
        <g stroke="#e9dcc1" strokeWidth="1.5" strokeLinecap="round" fill="none">
          <path d="M96 66 V55M96 66 90 57M96 66 102 57M96 66 87 61M96 66 105 61" />
        </g>
        {/* head, tilted — the first bend */}
        <ellipse cx="96" cy="76" rx="9.4" ry="11" transform="rotate(-11 96 76)" />
        <path d="M92 86h9l1.5 6h-11Z" />

        {/* torso, leaning the other way — the second bend */}
        <path d="M88.5 90 C85 100, 91 108, 98.5 113 L114 113 C115.5 104, 108 95, 103 90 Z" />

        {/* right arm raised into pataka */}
        <path d="M109 91 C121 88, 135 77, 144 65 L150.5 70 C142 84, 127 96, 113 100 Z" />
        <path d="M145 66 146 57M149 68 153 60M141 63 137 55" stroke="#e9dcc1" strokeWidth="2" strokeLinecap="round" />
        {/* left arm carried across the body */}
        <path d="M91 93 C81 96, 70 101, 59.5 100.5 L58.5 108 C71 109, 84 105, 94 101.5 Z" />
        <path d="M57 101 49 98M57 105 48 105M58 109 50 112" stroke="#e9dcc1" strokeWidth="2" strokeLinecap="round" />

        {/* the sari, flaring from the hip — the third bend puts the
            weight on the right leg and throws the skirt off-axis */}
        <path d="M92 110 H120 C129 128, 135 149, 135 164 H77 C77 149, 83 128, 92 110 Z" />
        {/* feet, flat — araimandi */}
        <path d="M86 164 84 174h14l-2-10Z" />
        <path d="M114 164 116 174h14l-2-10Z" />
      </g>

      {/* the pleated fan between the knees, and the jewellery */}
      <g stroke="var(--gold-deep)" fill="none" strokeWidth="0.9">
        <path d="M106 118 92 164M106 118 121 164" />
        {Array.from({ length: 5 }, (_, i) => i).map((i) => (
          <path key={i} d={`M${106 - i * 3.2} ${124 + i * 8} ${106 + i * 3.6} ${124 + i * 8}`} opacity="0.65" />
        ))}
      </g>
      <g stroke="var(--gold)" fill="none" strokeWidth="1.6" strokeLinecap="round">
        <path d="M91 93 Q 96 99, 104 93" />
        <path d="M91.5 110.5 H120" />
        <path d="M84 172 H97M115 172 H128" />
        <path d="M62 103 h-4M141 70 l4 -4" />
      </g>

      <text x="100" y="192" textAnchor="middle" className="plate__cap">
        tribhanga
      </text>
    </>,
  )
}

/** A Saura idital: figures joined at the hands around a tree of life. */
function SauraPlate({ className = '', accent }: PlateProps) {
  const fig = (x: number, y: number, s = 1) => (
    <g key={`${x}-${y}`} transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cy="-14" r="3.6" />
      <path d="M0 -10 v12" />
      <path d="M-9 -5 0 -6 9 -5" />
      <path d="M0 2 -7 13M0 2 7 13" />
    </g>
  )
  return wrap(
    `plate--saura ${className}`,
    accent,
    <g stroke="var(--cream)" fill="none" strokeWidth="1.5" strokeLinecap="round">
      {/* tree of life */}
      <path d="M100 168 V96" strokeWidth="2.4" />
      <path d="M100 130 C 84 122, 76 108, 76 92M100 130 C 116 122, 124 108, 124 92" />
      <path d="M100 112 C 88 104, 84 92, 86 80M100 112 C 112 104, 116 92, 114 80" />
      {[
        [76, 92],
        [124, 92],
        [86, 80],
        [114, 80],
        [100, 96],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="6" />
      ))}
      {/* dancers around it */}
      {[
        [46, 160],
        [72, 172],
        [128, 172],
        [154, 160],
        [40, 96],
        [160, 96],
      ].map(([x, y]) => fig(x, y, 1))}
      {/* the frame is drawn inward, as an idital is */}
      <g opacity="0.5" strokeWidth="1">
        <path d="M28 28 h144 v144 h-144 Z" />
        {Array.from({ length: 12 }, (_, i) => 32 + i * 12).map((x) => (
          <path key={x} d={`M${x} 28 v6 M${x} 172 v-6`} />
        ))}
      </g>
      <text x="100" y="20" textAnchor="middle" className="plate__cap" stroke="none">
        idital
      </text>
    </g>,
  )
}

/** The feathered diamond of a Sambalpuri bandha weave. */
function SambalpuriPlate({ className = '', accent }: PlateProps) {
  const feather = (cx: number, cy: number, r: number) => (
    <g key={`${cx}-${cy}-${r}`}>
      <path d={`M${cx} ${cy - r} L${cx + r} ${cy} L${cx} ${cy + r} L${cx - r} ${cy} Z`} />
      {/* the tell-tale bleed at every edge */}
      {Array.from({ length: 6 }, (_, i) => (i + 1) / 7).map((t) => (
        <g key={t} opacity={0.75}>
          <path d={`M${cx - r * t} ${cy - r * (1 - t)} l-3 -3`} />
          <path d={`M${cx + r * t} ${cy - r * (1 - t)} l3 -3`} />
          <path d={`M${cx - r * t} ${cy + r * (1 - t)} l-3 3`} />
          <path d={`M${cx + r * t} ${cy + r * (1 - t)} l3 3`} />
        </g>
      ))}
    </g>
  )
  return wrap(
    `plate--bandha ${className}`,
    accent,
    <g stroke="var(--lagoon-soft)" fill="none" strokeWidth="1.1" strokeLinecap="round">
      {feather(100, 100, 40)}
      <g stroke="var(--gold)">
        {feather(46, 52, 17)}
        {feather(154, 52, 17)}
        {feather(46, 148, 17)}
        {feather(154, 148, 17)}
      </g>
      {/* warp threads, showing the resist bands */}
      <g stroke="var(--parchment-dim)" opacity="0.28" strokeWidth="0.8" strokeDasharray="9 6">
        {Array.from({ length: 13 }, (_, i) => 22 + i * 13).map((x) => (
          <path key={x} d={`M${x} 14 V186`} />
        ))}
      </g>
      <circle cx="100" cy="100" r="6" stroke="var(--sindoor)" />
      <text x="100" y="192" textAnchor="middle" className="plate__cap" stroke="none">
        bandha
      </text>
    </g>,
  )
}

/** A stitched palm-leaf folio, incised and inked. */
function TalapatraPlate({ className = '', accent }: PlateProps) {
  return wrap(
    `plate--tala ${className}`,
    accent,
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(0 ${44 + i * 42})`}>
          <rect x="22" y="0" width="156" height="32" rx="3" fill="#c8b98d" opacity="0.16" />
          <rect x="22" y="0" width="156" height="32" rx="3" fill="none" stroke="var(--leaf)" strokeWidth="1" opacity="0.7" />
          {/* the binding hole */}
          <circle cx="52" cy="16" r="3" fill="none" stroke="var(--leaf)" strokeWidth="1" />
          {/* incised script — abstracted, not fake Odia text */}
          <g stroke="var(--parchment)" strokeWidth="1.1" fill="none" opacity="0.72" strokeLinecap="round">
            <path d="M66 9 h96" />
            {Array.from({ length: 14 }, (_, k) => 68 + k * 7).map((x) => (
              <path key={x} d={`M${x} 9 v9 q 3.4 5, 6 0`} />
            ))}
            <path d="M66 26 h74" opacity="0.5" />
          </g>
        </g>
      ))}
      {/* the cord that ties the folios together */}
      <path d="M52 44 V170" stroke="var(--gold)" strokeWidth="1.4" fill="none" opacity="0.6" />
      <text x="100" y="30" textAnchor="middle" className="plate__cap">
        ତାଳପତ୍ର
      </text>
    </g>,
  )
}

/** Drawn silver wire, coiled into a form that is mostly air. */
function FiligreePlate({ className = '', accent }: PlateProps) {
  const coil = (cx: number, cy: number, r: number, turns = 3) => {
    let d = `M${cx} ${cy}`
    const steps = turns * 24
    for (let i = 1; i <= steps; i++) {
      const t = i / steps
      const a = t * turns * Math.PI * 2
      const rr = r * t
      d += ` L${(cx + Math.cos(a) * rr).toFixed(1)} ${(cy + Math.sin(a) * rr).toFixed(1)}`
    }
    return d
  }
  return wrap(
    `plate--filigree ${className}`,
    accent,
    <g stroke="#d8d2c4" fill="none" strokeWidth="0.85" strokeLinecap="round">
      <circle cx="100" cy="100" r="62" strokeWidth="1.6" />
      <circle cx="100" cy="100" r="52" opacity="0.7" />
      {Array.from({ length: 8 }, (_, i) => i * 45).map((a) => (
        <g key={a} transform={`translate(100 100) rotate(${a})`}>
          <path d={coil(0, -36, 11)} opacity="0.9" />
          <path d="M0 -52 q 7 -9, 0 -17 q -7 8, 0 17" />
        </g>
      ))}
      <path d={coil(100, 100, 22, 4)} stroke="var(--gold)" opacity="0.85" />
      <text x="100" y="192" textAnchor="middle" className="plate__cap" stroke="none">
        tarakasi
      </text>
    </g>,
  )
}

export type ArtPlateName = 'odissi' | 'pattachitra' | 'saura' | 'sambalpuri' | 'talapatra' | 'filigree'

const ART_PLATES: Record<ArtPlateName, (p: PlateProps) => JSX.Element> = {
  odissi: OdissiPlate,
  pattachitra: PattachitraPlate,
  saura: SauraPlate,
  sambalpuri: SambalpuriPlate,
  talapatra: TalapatraPlate,
  filigree: FiligreePlate,
}

export function ArtPlate({ name, ...rest }: PlateProps & { name: ArtPlateName }) {
  const P = ART_PLATES[name]
  return <P {...rest} />
}

/* ================= FOOD PLATES ================= */

export type FoodPlateName = 'chhenapoda' | 'pakhala' | 'dahibara' | 'dalma' | 'manda'

const salLeaf = (
  <g fill="none" stroke="var(--leaf)" strokeWidth="1.1" opacity="0.75">
    <path d="M28 150 C 56 120, 144 120, 172 150 C 144 178, 56 178, 28 150 Z" />
    <path d="M28 150 H172" opacity="0.5" />
  </g>
)

const FOOD_PLATES: Record<FoodPlateName, JSX.Element> = {
  chhenapoda: (
    <>
      {salLeaf}
      <ellipse cx="100" cy="132" rx="52" ry="17" fill="#2a1b10" />
      <path d="M48 132 V96 a52 22 0 0 1 104 0 v36 Z" fill="#3a2413" />
      <ellipse cx="100" cy="96" rx="52" ry="20" fill="#54331a" />
      {/* the burnt top, which is the entire point of the dish */}
      <ellipse cx="100" cy="96" rx="44" ry="15.5" fill="#1d120a" />
      <g fill="none" stroke="#8a5a2c" strokeWidth="1" opacity="0.8">
        <path d="M66 94 q 14 -7, 30 -2 t 34 -1" />
        <path d="M72 102 q 16 5, 30 1 t 28 -3" />
      </g>
      <g fill="#c9a15c">
        <circle cx="86" cy="92" r="2.4" />
        <circle cx="112" cy="98" r="2.1" />
        <circle cx="100" cy="88" r="1.8" />
      </g>
    </>
  ),
  pakhala: (
    <>
      <path d="M46 108 h108 l-11 56 a10 10 0 0 1 -10 8 H67 a10 10 0 0 1 -10 -8 Z" fill="#2b2a26" />
      <ellipse cx="100" cy="108" rx="54" ry="15" fill="#3a3833" />
      {/* the water, which is the dish */}
      <ellipse cx="100" cy="110" rx="47" ry="12" fill="#c9cfc4" opacity="0.5" />
      <g fill="#f0ead9" opacity="0.9">
        {[
          [86, 112],
          [98, 108],
          [110, 113],
          [92, 116],
          [106, 105],
          [118, 110],
          [78, 108],
        ].map(([x, y]) => (
          <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="4.2" ry="2.2" transform={`rotate(${(x % 5) * 12} ${x} ${y})`} />
        ))}
      </g>
      {/* green chilli and a curry leaf on the rim */}
      <path d="M138 100 q 14 -6, 20 -20" fill="none" stroke="#6d8c3e" strokeWidth="4" strokeLinecap="round" />
      <path d="M158 80 l3 -6" fill="none" stroke="#4d6a28" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M52 96 q -10 -10, -4 -22 q 12 4, 4 22Z" fill="#4d6a28" opacity="0.85" />
    </>
  ),
  dahibara: (
    <>
      <path d="M42 104 h116 l-12 60 a11 11 0 0 1 -11 9 H65 a11 11 0 0 1 -11 -9 Z" fill="#241f19" />
      <ellipse cx="100" cy="104" rx="58" ry="16" fill="#33291f" />
      <ellipse cx="100" cy="106" rx="51" ry="13" fill="#e9e2cf" opacity="0.62" />
      {/* the vadas, collapsed and soaked */}
      {[
        [82, 104, 15],
        [116, 108, 14],
        [99, 96, 13],
      ].map(([x, y, r]) => (
        <g key={`${x}-${y}`}>
          <ellipse cx={x} cy={y} rx={r} ry={r * 0.42} fill="#b98b52" />
          <ellipse cx={x} cy={y - 1.5} rx={r * 0.4} ry={r * 0.16} fill="#8d6432" />
        </g>
      ))}
      {/* aloo dum, dark with tamarind */}
      {[
        [70, 112],
        [130, 100],
        [104, 114],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="7.5" fill="#8c3d1c" />
      ))}
      {/* sev */}
      <g stroke="#e0a548" strokeWidth="1.1" fill="none" opacity="0.9">
        {Array.from({ length: 10 }, (_, i) => 66 + i * 7).map((x) => (
          <path key={x} d={`M${x} 92 q 4 6, 8 2`} />
        ))}
      </g>
    </>
  ),
  dalma: (
    <>
      <path d="M50 96 C 34 112, 36 148, 58 162 C 78 175, 122 175, 142 162 C 164 148, 166 112, 150 96 Z" fill="#2c2118" />
      <path d="M46 96 h108" stroke="#4a3826" strokeWidth="5" strokeLinecap="round" fill="none" />
      <ellipse cx="100" cy="99" rx="50" ry="12" fill="#d3922f" opacity="0.55" />
      {/* the vegetables, whole, which is how dalma is */}
      {[
        [78, 100, '#e0a548', 8],
        [104, 96, '#6d8c3e', 7],
        [124, 102, '#c05e34', 7.5],
        [92, 104, '#b98b52', 6],
      ].map(([x, y, f, r]) => (
        <circle key={`${x}-${y}`} cx={x as number} cy={y as number} r={r as number} fill={f as string} />
      ))}
      {/* the tempering going in */}
      <path d="M150 82 q 16 -14, 22 -34" stroke="#8a7a5d" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <g fill="#3a2413">
        <circle cx="146" cy="86" r="1.6" />
        <circle cx="139" cy="92" r="1.4" />
        <circle cx="152" cy="92" r="1.2" />
      </g>
    </>
  ),
  manda: (
    <>
      {salLeaf}
      {[
        [72, 126, 22],
        [128, 126, 22],
        [100, 108, 25],
      ].map(([x, y, r]) => (
        <g key={`${x}-${y}`}>
          <path
            d={`M${x - r} ${y + r * 0.5} a ${r} ${r * 1.05} 0 0 1 ${r * 2} 0 Z`}
            fill="#efe6d2"
            stroke="#c9bda4"
            strokeWidth="1"
          />
          <path d={`M${x} ${y - r * 0.55} v-6`} stroke="#c9bda4" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path
            d={`M${x - r * 0.55} ${y + r * 0.45} q ${r * 0.55} -${r * 0.35}, ${r * 1.1} 0`}
            fill="none"
            stroke="#d8cdb4"
            strokeWidth="0.8"
          />
        </g>
      ))}
      <g fill="#a9762c" opacity="0.85">
        <circle cx="100" cy="150" r="2.4" />
        <circle cx="88" cy="154" r="1.9" />
        <circle cx="113" cy="153" r="2.1" />
      </g>
    </>
  ),
}

export function FoodPlate({ name, className = '', accent }: PlateProps & { name: FoodPlateName }) {
  return wrap(`plate--food ${className}`, accent, FOOD_PLATES[name])
}
