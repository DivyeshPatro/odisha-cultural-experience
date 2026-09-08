export type GlyphName =
  | 'temple'
  | 'sun'
  | 'chakra'
  | 'brush'
  | 'pot'
  | 'flame'
  | 'turtle'
  | 'rocket'
  | 'hockey'
  | 'ore'
  | 'shield'

/** Single-stroke pictograms on a 24-grid. Drawn, not imported. */
const PATHS: Record<GlyphName, JSX.Element> = {
  temple: (
    <>
      <path d="M12 2.5 13.6 5H10.4Z" />
      <path d="M7.5 21V10.5c0-3 1.8-5 4.5-5.5 2.7.5 4.5 2.5 4.5 5.5V21" />
      <path d="M4 21h16M9.8 21v-5.5a2.2 2.2 0 0 1 4.4 0V21" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.6v2.6M12 18.8v2.6M2.6 12h2.6M18.8 12h2.6M5.4 5.4l1.9 1.9M16.7 16.7l1.9 1.9M18.6 5.4l-1.9 1.9M7.3 16.7l-1.9 1.9" />
    </>
  ),
  chakra: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.4" />
      <path d="M12 3v6.6M12 14.4V21M3 12h6.6M14.4 12H21M5.6 5.6 10.3 10.3M13.7 13.7l4.7 4.7M18.4 5.6 13.7 10.3M10.3 13.7l-4.7 4.7" />
    </>
  ),
  brush: (
    <>
      <path d="M15.5 3.6 20.4 8.5 10 18.9l-4.9-4.9Z" />
      <path d="m5.1 14-2.3 6.2 6.2-2.3" />
      <path d="M13.4 5.7 18.3 10.6" />
    </>
  ),
  pot: (
    <>
      <path d="M6 9.5h12M8.2 9.5C5.6 11 4.4 13.4 4.9 16.2c.5 2.8 3.3 4.8 7.1 4.8s6.6-2 7.1-4.8c.5-2.8-.7-5.2-3.3-6.7" />
      <path d="M9 9.5V7.2c0-1.2 1.3-2.2 3-2.2s3 1 3 2.2v2.3" />
      <path d="M12 5V2.8" />
    </>
  ),
  flame: (
    <>
      <path d="M12 21c3.6 0 6-2.4 6-5.6 0-4-3.2-6-4.4-10.4-2 1.6-3.2 3.6-3.2 5.6 0 1.4-.8 2-1.6 1.2-.6-.6-.8-1.6-.8-2.4C6.4 11.2 6 13.4 6 15.4 6 18.6 8.4 21 12 21Z" />
    </>
  ),
  turtle: (
    <>
      <path d="M4.6 14.4c0-4.1 3.3-7 7.4-7s7.4 2.9 7.4 7Z" />
      <path d="M12 7.4v7M8 8.4l-1.4 6M16 8.4l1.4 6" />
      <path d="M19.4 12.6c1.2-.4 2.4.2 2.6 1.3M4.6 12.6c-1.2-.4-2.4.2-2.6 1.3" />
      <path d="M6.4 14.4 5 17.6M17.6 14.4 19 17.6" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 2.4c3 2.6 4.5 6.1 4.5 10.2L12 17.2l-4.5-4.6C7.5 8.5 9 5 12 2.4Z" />
      <circle cx="12" cy="9.6" r="1.9" />
      <path d="M7.5 12.6 4.4 15v3.6l3.4-2M16.5 12.6l3.1 2.4v3.6l-3.4-2" />
      <path d="M10.4 19.2 12 22l1.6-2.8" />
    </>
  ),
  hockey: (
    <>
      <path d="M4.6 3.6v9.2c0 3.2 2.6 5.8 5.8 5.8s5.8-2.6 5.8-5.8V9.4" />
      <circle cx="18.8" cy="18.4" r="2.2" />
      <path d="M16.6 9.4h4.8" />
    </>
  ),
  ore: (
    <>
      <path d="M12 2.8 20.4 8v8L12 21.2 3.6 16V8Z" />
      <path d="M12 2.8v8.4M12 11.2 3.6 8M12 11.2 20.4 8M12 11.2v10" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.6 20 5.6v6.2c0 4.6-3.2 8.2-8 9.6-4.8-1.4-8-5-8-9.6V5.6Z" />
      <path d="m8.4 12 2.6 2.6 4.6-5" />
    </>
  ),
}

export function Glyph({ name, size = 22 }: { name: GlyphName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  )
}
