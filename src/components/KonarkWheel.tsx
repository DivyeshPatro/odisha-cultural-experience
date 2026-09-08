/* ------------------------------------------------------------------
   THE WHEEL — drawn to Konark's own anatomy.

   Looked at closely, a Konark wheel is a very specific object and not a
   generic chakra. Every element below is there because it is on the
   stone:

     · a broad outer band carved with a repeating creeper motif
     · a ring of medallions inside it — twenty-four of them here, for
       the twenty-four wheels along the temple plinth
     · eight major spokes, tapered, each swelling into a carved bead
       roughly two-thirds of the way out
     · eight thin minor spokes between them, tipped with a leaf
     · a hub carved as an eight-petal lotus around a raised axle

   The relief is faked the cheap and effective way: the whole carving is
   drawn twice, once in shadow offset two units down, once in light. No
   filters, no blur, nothing that costs a compositor pass on a phone.
-------------------------------------------------------------------*/

const R_OUTER = 250
const R_BAND_IN = 228
const R_MEDALLION = 212
const R_RIM_IN = 196
const R_HUB = 62
const R_BEAD = 148

const majorSpoke = (() => {
  // Half-widths at the hub, along the shaft, at the bead, and at the rim.
  const hw = { hub: 12, shaft: 9, bead: 17, tip: 7 }
  return [
    `M${-hw.hub} ${-R_HUB}`,
    `L${-hw.shaft} ${-(R_BEAD - 32)}`,
    `L${-hw.bead} ${-(R_BEAD - 12)}`,
    `L${-hw.bead} ${-(R_BEAD + 12)}`,
    `L${-hw.shaft} ${-(R_BEAD + 32)}`,
    `L${-hw.tip} ${-R_RIM_IN}`,
    `L${hw.tip} ${-R_RIM_IN}`,
    `L${hw.shaft} ${-(R_BEAD + 32)}`,
    `L${hw.bead} ${-(R_BEAD + 12)}`,
    `L${hw.bead} ${-(R_BEAD - 12)}`,
    `L${hw.shaft} ${-(R_BEAD - 32)}`,
    `L${hw.hub} ${-R_HUB}`,
    'Z',
  ].join(' ')
})()

const minorSpoke = [
  `M-4 ${-R_HUB}`,
  `L-4 ${-(R_RIM_IN - 22)}`,
  `L-8 ${-(R_RIM_IN - 14)}`,
  `L0 ${-R_RIM_IN}`,
  `L8 ${-(R_RIM_IN - 14)}`,
  `L4 ${-(R_RIM_IN - 22)}`,
  `L4 ${-R_HUB}`,
  'Z',
].join(' ')

const lotusPetal = `M0 -18 C 11 -30, 11 -44, 0 -52 C -11 -44, -11 -30, 0 -18 Z`

const EIGHT = [0, 45, 90, 135, 180, 225, 270, 315]
const TWENTY_FOUR = Array.from({ length: 24 }, (_, i) => i * 15)
const CREEPER = Array.from({ length: 48 }, (_, i) => i * 7.5)

interface Props {
  /** 0–7, which sector currently sits under the gnomon. */
  active: number
  className?: string
}

export function WheelArt({ active, className = '' }: Props) {
  const carving = (
    <>
      {/* outer band: creeper marks */}
      <g className="kw-creeper">
        {CREEPER.map((a) => (
          <path
            key={a}
            d={`M0 ${-R_BAND_IN - 3} q 4 -8, 0 -16`}
            transform={`rotate(${a})`}
            fill="none"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* twenty-four medallions — one for each wheel on the plinth */}
      <g className="kw-medallions">
        {TWENTY_FOUR.map((a) => (
          <g key={a} transform={`rotate(${a})`}>
            <circle cx="0" cy={-R_MEDALLION} r="8" />
            <circle cx="0" cy={-R_MEDALLION} r="3.4" className="kw-medallion-pip" />
          </g>
        ))}
      </g>

      {/* eight minor spokes */}
      <g className="kw-minor">
        {EIGHT.map((a) => (
          <path key={a} d={minorSpoke} transform={`rotate(${a + 22.5})`} />
        ))}
      </g>

      {/* eight major spokes, each with its carved bead */}
      <g className="kw-major">
        {EIGHT.map((a, i) => (
          <g key={a} transform={`rotate(${a})`} className={i === active ? 'is-active' : undefined}>
            <path d={majorSpoke} />
            <circle cx="0" cy={-R_BEAD} r="11.5" className="kw-bead" />
            <circle cx="0" cy={-R_BEAD} r="4.5" className="kw-bead-pip" />
            <path d={`M-6 ${-(R_RIM_IN - 26)} H6`} strokeWidth="2" />
          </g>
        ))}
      </g>

      {/* hub: eight-petal lotus around a raised axle */}
      <g className="kw-hub">
        <circle r={R_HUB} />
        <circle r={R_HUB - 13} className="kw-hub-inner" />
        {EIGHT.map((a) => (
          <path key={a} d={lotusPetal} transform={`rotate(${a})`} className="kw-petal" />
        ))}
        <circle r="15" className="kw-axle" />
        <circle r="6" className="kw-axle-pip" />
      </g>
    </>
  )

  return (
    <svg
      className={`kw-art ${className}`}
      viewBox="-262 -262 524 524"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="kw-stone" cx="42%" cy="30%" r="78%">
          <stop offset="0%" stopColor="#f4d79a" />
          <stop offset="42%" stopColor="#d9a24d" />
          <stop offset="78%" stopColor="#9c6b2e" />
          <stop offset="100%" stopColor="#5c3d1c" />
        </radialGradient>
        <radialGradient id="kw-glow" cx="50%" cy="50%" r="50%">
          <stop offset="55%" stopColor="rgba(224,165,72,0)" />
          <stop offset="88%" stopColor="rgba(224,165,72,0.16)" />
          <stop offset="100%" stopColor="rgba(224,165,72,0)" />
        </radialGradient>
      </defs>

      <circle r={R_OUTER + 8} fill="url(#kw-glow)" />

      {/* rim */}
      <circle r={R_OUTER} className="kw-rim-outer" />
      <circle r={R_BAND_IN} className="kw-rim-mid" />
      <circle r={R_RIM_IN} className="kw-rim-in" />

      {/* the carving, twice: shadow beneath, light above */}
      <g className="kw-shadow" transform="translate(0 3)">
        {carving}
      </g>
      <g className="kw-light">{carving}</g>
    </svg>
  )
}

/* ------------------------------------------------------------------
   MiniWheel — the same wheel at 40px.

   Not a scaled copy: at this size the 24 medallions, the carved beads
   and the doubled shadow pass all collapse into mud. This keeps only
   what survives — the rim, eight major spokes, eight minor ones, twelve
   rim studs and the lotus hub — at about 45 nodes instead of 300, which
   matters because this one is on screen for the entire visit.
-------------------------------------------------------------------*/
export function MiniWheel({ className = '' }: { className?: string }) {
  return (
    <svg className={`mkw ${className}`} viewBox="-54 -54 108 108" aria-hidden="true" focusable="false">
      <circle className="mkw-rim" r="46" />
      <circle className="mkw-rim2" r="36" />
      {/* eight studs, not twenty-four: at 40px the finer ring turned into
          a grey haze around the rim */}
      {EIGHT.map((a) => (
        <circle key={a} className="mkw-stud" cx="0" cy="-41" r="3.4" transform={`rotate(${a + 22.5})`} />
      ))}
      {EIGHT.map((a) => (
        <path key={a} className="mkw-minor" d="M-2.2 -16 H2.2 L1.6 -35 H-1.6 Z" transform={`rotate(${a + 22.5})`} />
      ))}
      {EIGHT.map((a) => (
        <path
          key={a}
          className="mkw-major"
          d="M-5 -16 H5 L4 -26 L6 -29 L6 -32 L3.6 -35 H-3.6 L-6 -32 L-6 -29 L-4 -26 Z"
          transform={`rotate(${a})`}
        />
      ))}
      <circle className="mkw-hub" r="16" />
      {EIGHT.map((a) => (
        <path key={a} className="mkw-petal" d="M0 -4.5 C 3.4 -7.5, 3.4 -11.5, 0 -14 C -3.4 -11.5, -3.4 -7.5, 0 -4.5 Z" transform={`rotate(${a})`} />
      ))}
      <circle className="mkw-axle" r="4.4" />
    </svg>
  )
}
