import type { Claim, SourceKey } from './sources'

/* ------------------------------------------------------------------
   ODISHA IN 60 SECONDS
   For the visitor who arrives knowing nothing. Numbers here animate,
   so every one of them must be a measured figure — never a rounded
   marketing number.
-------------------------------------------------------------------*/

export interface StatFact {
  id: string
  /** The animated number. Omit for facts that aren't numeric. */
  value?: number
  decimals?: number
  prefix?: string
  suffix?: string
  /** Shown instead of a counter when the fact is not a single number. */
  display?: string
  label: string
  note: string
  cite: SourceKey[]
  confidence: Claim['confidence']
  caveat?: string
}

export const OPENING_LINE =
  'A state on India’s eastern coast, roughly the size of Nepal, where a 13th-century king had his masons build the sun god a chariot — twenty-four stone wheels, seven horses — and then let the sea weather it for eight hundred years.'

export const QUICK_FACTS: StatFact[] = [
  {
    id: 'capital',
    display: 'Bhubaneswar',
    label: 'Capital',
    note: 'Called the temple city — it once held several hundred temples in the Ekamra Kshetra precinct, and now runs on IT parks and India’s busiest hockey stadium.',
    cite: ['odisha-tourism'],
    confidence: 'verified',
  },
  {
    id: 'area',
    value: 155707,
    suffix: ' km²',
    label: 'Land area',
    note: 'Larger than Greece. Larger than England. Roughly 4.7% of India.',
    cite: ['orienvis-demography'],
    confidence: 'verified',
  },
  {
    id: 'people',
    value: 4.19,
    decimals: 2,
    suffix: ' crore',
    label: 'People (2011 Census)',
    note: '41,974,218 at the last full census — more people than Canada, in a state most of the world cannot place on a map.',
    cite: ['orienvis-demography'],
    confidence: 'verified',
  },
  {
    id: 'coast',
    value: 480,
    suffix: ' km',
    label: 'Coastline',
    note: 'The long-standing official figure used by the state. A 2023–24 national re-survey at higher resolution puts Odisha’s coast closer to 575 km, because a finer ruler measures more creek and inlet.',
    cite: ['osdma-profile', 'moes-coastline'],
    confidence: 'contested',
    caveat:
      'Two official figures coexist: ~480 km (long-standing state figure) and ~575 km (2023–24 higher-resolution national survey). Both are government sources; they measure at different resolutions.',
  },
  {
    id: 'districts',
    value: 30,
    label: 'Districts',
    note: 'From the Bengal-border rice country of Balasore to the Bastar-facing hills of Malkangiri.',
    cite: ['orienvis-demography'],
    confidence: 'verified',
  },
  {
    id: 'formed',
    display: '1 April 1936',
    label: 'Formed',
    note: 'The first province in India carved out on the basis of language. Every linguistic state that followed — Andhra, Maharashtra, Gujarat — walked through a door Odisha opened.',
    cite: ['orissa-review'],
    confidence: 'verified',
  },
  {
    id: 'language',
    display: 'Odia — ଓଡ଼ିଆ',
    label: 'Language',
    note: 'Granted classical language status by the Government of India in 2014 — the sixth Indian language to receive it, and the first outside the Dravidian family besides Sanskrit.',
    cite: ['orissa-review-odia'],
    confidence: 'verified',
  },
  {
    id: 'unesco',
    value: 1,
    label: 'UNESCO World Heritage Site',
    note: 'The Sun Temple at Konârak, inscribed in 1984. The Ekamra Kshetra temples of Bhubaneswar and the Chilika lagoon sit on India’s tentative list.',
    cite: ['unesco-konark'],
    confidence: 'verified',
  },
]

/* The four "you did not know this" cards — the hooks that make an
   outsider lean in. Kept to four; a fifth dilutes all of them. */
export interface HookFact {
  id: string
  headline: string
  body: string
  cite: SourceKey[]
  confidence: Claim['confidence']
  caveat?: string
  tone: 'gold' | 'lagoon' | 'sindoor' | 'indigo'
}

export const HOOK_FACTS: HookFact[] = [
  {
    id: 'turtles',
    headline: 'Half a million turtles arrive on the same beach, on the same nights, every year.',
    body: 'The Gahirmatha coast is the largest known mass-nesting rookery for the Olive Ridley sea turtle on Earth. They come ashore in an *arribada* — a synchronised arrival — and lay in a window of a few nights. Odisha protects the whole stretch as a marine sanctuary.',
    cite: ['wii-turtles', 'odisha-tourism'],
    confidence: 'verified',
    tone: 'lagoon',
  },
  {
    id: 'tenner',
    headline: 'You have been carrying a piece of Odisha in your wallet since 2018.',
    body: 'The reverse of the ₹10 note in the Mahatma Gandhi (New) Series carries the Sun Temple at Konark. The Reserve Bank of India chose it as a motif of the country’s cultural heritage. Look at the chocolate-brown note again — that is Odisha, in every pocket in India.',
    cite: ['rbi-ten'],
    confidence: 'verified',
    tone: 'gold',
  },
  {
    id: 'cyclone',
    headline: 'A state that lost about ten thousand people to one storm now moves a million in a day.',
    body: 'The 1999 super cyclone was the worst in India’s recorded history. Twenty years later, before Cyclone Fani, Odisha evacuated roughly 1.2 million people — and the UN’s disaster-risk agency publicly held it up as a model.',
    cite: ['undrr-fani', 'mei-disasters'],
    confidence: 'verified',
    tone: 'sindoor',
  },
  {
    id: 'hockey',
    headline: 'When India’s hockey team walks out, an Indian state’s name is on the shirt.',
    body: 'Since 2018 Odisha has been the official sponsor of the Indian men’s and women’s hockey teams — a state government backing a national side, extended in 2023 for a further ten years to 2033. No other Indian state has done this.',
    cite: ['hockey-india'],
    confidence: 'verified',
    tone: 'indigo',
  },
]
