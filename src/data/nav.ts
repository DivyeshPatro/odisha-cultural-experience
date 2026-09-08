export interface Chapter {
  id: string
  /** Roman numeral shown in the overlay menu. */
  numeral: string
  label: string
  /** The narrative line, shown in the chapter menu. */
  line: string
}

/* The exhibition is a route, not a stack of cards. These are the rooms,
   in the order a visitor walks them. */
export const CHAPTERS: Chapter[] = [
  { id: 'sixty', numeral: 'I', label: 'Odisha in 60 Seconds', line: 'Start here if the name is new to you.' },
  { id: 'wheel', numeral: 'II', label: 'The Wheel', line: 'Turn a Konark wheel. It is also the map of this site.' },
  { id: 'land', numeral: 'III', label: 'The Land', line: 'Coast, lagoon, delta, hills — and where everything is.' },
  { id: 'heritage', numeral: 'IV', label: 'Stone', line: 'Nine centuries of temples, caves and edicts.' },
  { id: 'faith', numeral: 'V', label: 'Jagannath', line: 'Three chariots, rebuilt from scratch every year.' },
  { id: 'culture', numeral: 'VI', label: 'Art', line: 'Odissi, Pattachitra, Saura, bandha, palm leaf, silver.' },
  { id: 'food', numeral: 'VII', label: 'Taste', line: 'Burnt cheese, fermented rice, and no garam masala.' },
  { id: 'heroes', numeral: 'VIII', label: 'Heroes', line: 'From a rebellion in 1817 to a boatman in 1938.' },
  { id: 'nature', numeral: 'IX', label: 'Wild', line: 'Dolphins, crocodiles, black tigers, half a million turtles.' },
  { id: 'resilience', numeral: 'X', label: 'Resilience', line: 'How a state cut a cyclone’s death toll by three orders of magnitude.' },
  { id: 'modern', numeral: 'XI', label: 'Odisha Now', line: 'Missiles, hockey, ore, and an exported method.' },
  { id: 'more', numeral: 'XII', label: 'More Experiences', line: 'Three standalone interactive explorations.' },
  { id: 'india', numeral: 'XIII', label: 'One India', line: 'Where this all joins the larger story.' },
]

/** Shown inline in the top bar on wide screens. */
export const PRIMARY_NAV = ['wheel', 'land', 'heritage', 'culture', 'heroes', 'modern']
