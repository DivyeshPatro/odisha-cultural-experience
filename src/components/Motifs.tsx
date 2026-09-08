/* ------------------------------------------------------------------
   MOTIF VOCABULARY

   Every ornament on this site is drawn here, once, and reused. Nothing
   is an imported image. Three rules kept them from taking over:

     1. Motifs go on edges — dividers, corners, borders, rules. Never
        behind body text.
     2. Everything is one path colour at low opacity. No motif competes
        with content for attention.
     3. Each one is traceable to a real object: a temple frieze band, a
        Pattachitra border, a Saura wall figure, a Kalinga deul profile.
-------------------------------------------------------------------*/

interface DividerProps {
  /** Flip the frieze for the bottom edge of a section. */
  flip?: boolean
  className?: string
}

/**
 * The lotus-petal frieze band that runs around the plinth of a Kalinga
 * temple. Rendered as one tiled <pattern> — a single path, repeated by
 * the renderer, so it costs the same at 360px as at 2560px.
 */
export function Frieze({ flip = false, className = '' }: DividerProps) {
  const id = flip ? 'frieze-b' : 'frieze-t'
  return (
    // A wide viewBox plus `slice` rather than `none`: stretching a
    // carved petal horizontally to fit the viewport would turn the
    // frieze into a smear. This scales it uniformly and crops instead.
    <svg
      className={`motif motif--frieze ${className}`}
      viewBox="0 0 1440 26"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      style={flip ? { transform: 'scaleY(-1)' } : undefined}
    >
      <defs>
        <pattern id={id} width="24" height="26" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
            <path d="M1.5 24 C 3 9, 21 9, 22.5 24" />
            <path d="M7 24 C 8 15, 16 15, 17 24" opacity="0.7" />
            <circle cx="12" cy="5.5" r="1.6" fill="currentColor" stroke="none" opacity="0.85" />
          </g>
        </pattern>
      </defs>
      <rect width="1440" height="26" fill={`url(#${id})`} />
    </svg>
  )
}

/** The eight-petal rosette used as a section mark and list bullet. */
export function LotusMark({ size = 18, className = '' }: { size?: number; className?: string }) {
  const petals = Array.from({ length: 8 }, (_, i) => i * 45)
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="-24 -24 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        {petals.map((a) => (
          <path key={a} d="M0 -6 C 7 -13, 7 -19, 0 -22 C -7 -19, -7 -13, 0 -6 Z" transform={`rotate(${a})`} />
        ))}
        <circle r="5" />
      </g>
    </svg>
  )
}

/**
 * A Pattachitra edge. Real Pattachitra almost always seals the painting
 * inside a dense floral border — the border is not framing, it is part
 * of the work. Used on the art plates only.
 */
export function PattachitraEdge({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 14"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id="patta-edge" width="20" height="14" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="0.9">
            <path d="M0 7 Q 5 0, 10 7 T 20 7" />
            <path d="M0 7 Q 5 14, 10 7 T 20 7" opacity="0.55" />
            <circle cx="10" cy="7" r="1.1" fill="currentColor" stroke="none" />
          </g>
        </pattern>
      </defs>
      <rect width="200" height="14" fill="url(#patta-edge)" />
    </svg>
  )
}

/**
 * The Kalinga skyline: a curvilinear rekha deul (the tower over the
 * sanctum, with its ribbed profile, amalaka disc and kalasa finial)
 * beside a stepped pidha deul (the assembly hall in front of it).
 * This pairing is the signature of Odia temple architecture — Lingaraj,
 * Jagannath and Konark are all variations of it.
 */
export function TempleSilhouette({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 420 150"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="currentColor">
        {/* pidha deul — stepped pyramidal roof of the jagamohana */}
        <path d="M8 150 V112 h10 l4-13h10l4-12h10l4-11h30l4 11h10l4 12h10l4 13h10v38Z" opacity="0.85" />
        {/* rekha deul — the curvilinear tower */}
        <path d="M150 150 154 76 C158 50 168 30 182 18 h26 c14 12 24 32 28 58l4 74Z" />
        <ellipse cx="195" cy="16" rx="21" ry="6.5" />
        <path d="M190 12 v-7 a5 5 0 0 1 10 0 v7Z" />
        <circle cx="195" cy="2" r="3.2" />
        {/* a second, smaller shrine */}
        <path d="M268 150 271 104 C274 88 281 76 291 69h16c10 7 17 19 20 35l3 46Z" opacity="0.72" />
        <ellipse cx="299" cy="67" rx="14" ry="4.5" opacity="0.72" />
        <path d="M295 64v-5a4 4 0 0 1 8 0v5Z" opacity="0.72" />
        {/* boundary wall */}
        <path d="M0 150v-14h420v14Z" opacity="0.5" />
      </g>
    </svg>
  )
}

/**
 * Saura iditals are built from stick figures joined at the hands, drawn
 * inward from the frame. Used once, as a band in the art chapter — the
 * form belongs to a living Adivasi community and is not wallpaper.
 */
export function SauraBand({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 40"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id="saura" width="30" height="40" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
            <circle cx="15" cy="9" r="3" />
            <path d="M15 12v11" />
            <path d="M4 16 15 15 26 16" />
            <path d="M15 23 8 35M15 23 22 35" />
          </g>
        </pattern>
      </defs>
      <rect width="1440" height="40" fill="url(#saura)" />
    </svg>
  )
}

/**
 * The bandha (ikat) grid: the characteristic feathered diamond of a
 * Sambalpuri weave. Feathering is not a stylisation — it is what
 * happens when tie-dyed warp meets tie-dyed weft slightly out of
 * register, and it is the mark of a real bandha rather than a print.
 */
export function BandhaField({ className = '', opacity = 0.06 }: { className?: string; opacity?: number }) {
  return (
    <svg className={className} aria-hidden="true" focusable="false" style={{ opacity }}>
      <defs>
        <pattern id="bandha" width="48" height="48" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1.1">
            <path d="M24 6 42 24 24 42 6 24Z" />
            <path d="M24 15 33 24 24 33 15 24Z" />
            <path d="M0 0h2v2h-2ZM46 46h2v2h-2Z" fill="currentColor" />
          </g>
          <g fill="currentColor" opacity="0.8">
            <circle cx="24" cy="24" r="1.4" />
            <circle cx="0" cy="24" r="1" />
            <circle cx="48" cy="24" r="1" />
            <circle cx="24" cy="0" r="1" />
            <circle cx="24" cy="48" r="1" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bandha)" />
    </svg>
  )
}
