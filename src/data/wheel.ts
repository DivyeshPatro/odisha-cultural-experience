import type { Claim, SourceKey } from './sources'

/* ------------------------------------------------------------------
   THE KONARK WHEEL — the site's signature interaction.

   Why eight sectors, and not six or ten:

   Each of the twenty-four wheels on the Konark temple plinth carries
   eight major spokes and eight minor ones. The eight major spokes are
   traditionally read as the eight *praharas* — the three-hour watches
   the Indian day is divided into. So the wheel is not decoration; it
   is a diagram of a day.

   The exhibition borrows that structure literally: eight watches,
   eight chapters. Turning the wheel turns the day.

   Note the honesty flag on the symbolism — the *geometry* is measured
   fact, the *meaning* is a traditional reading. The UI says so.
-------------------------------------------------------------------*/

export interface WheelSpoke {
  id: string
  /** Devanagari-free short Odia label, shown small under the English. */
  odia: string
  prahara: string
  title: string
  line: string
  /** Section id to scroll to. `null` = this sector's story lives in the wheel panel itself. */
  target: string | null
  glyph: 'temple' | 'sun' | 'chakra' | 'brush' | 'pot' | 'flame' | 'turtle' | 'rocket'
}

export const WHEEL_SPOKES: WheelSpoke[] = [
  {
    id: 'time',
    odia: 'ସମୟ',
    prahara: 'First watch — sunrise',
    title: 'Time',
    line: 'The wheel you are holding is a clock. Read how it tells the hour.',
    target: null,
    glyph: 'sun',
  },
  {
    id: 'stone',
    odia: 'ପଥର',
    prahara: 'Second watch — mid-morning',
    title: 'Stone',
    line: 'Konark, Lingaraj, the caves of Udayagiri. Nine centuries of masons.',
    target: 'heritage',
    glyph: 'temple',
  },
  {
    id: 'faith',
    odia: 'ଶ୍ରଦ୍ଧା',
    prahara: 'Third watch — noon',
    title: 'Faith',
    line: 'Jagannath, and the only deity in the world whose chariots are rebuilt from scratch each year.',
    target: 'faith',
    glyph: 'chakra',
  },
  {
    id: 'art',
    odia: 'କଳା',
    prahara: 'Fourth watch — afternoon',
    title: 'Art',
    line: 'Odissi in the temple corridor. Pattachitra on treated cloth. Saura on a mud wall.',
    target: 'culture',
    glyph: 'brush',
  },
  {
    id: 'taste',
    odia: 'ସ୍ୱାଦ',
    prahara: 'Fifth watch — dusk',
    title: 'Taste',
    line: 'Rice left in water overnight. Cheese burnt on purpose. A cuisine built on patience.',
    target: 'food',
    glyph: 'pot',
  },
  {
    id: 'freedom',
    odia: 'ସ୍ୱାଧୀନତା',
    prahara: 'Sixth watch — early night',
    title: 'Freedom',
    line: 'A rebellion in 1817. A twelve-year-old boatman in 1938. Odisha did not wait its turn.',
    target: 'heroes',
    glyph: 'flame',
  },
  {
    id: 'wild',
    odia: 'ପ୍ରକୃତି',
    prahara: 'Seventh watch — deep night',
    title: 'Wild',
    line: 'A lagoon of dolphins, a mangrove of crocodiles, and half a million turtles that navigate back.',
    target: 'nature',
    glyph: 'turtle',
  },
  {
    id: 'now',
    odia: 'ଆଜି',
    prahara: 'Eighth watch — before dawn',
    title: 'Now',
    line: 'Missiles tested off its coast. Hockey on its shirt. The world studying its cyclone drill.',
    target: 'modern',
    glyph: 'rocket',
  },
]

/* The "Time" sector's own content — the wheel explaining itself. */
export interface WheelReading {
  heading: string
  body: string
  confidence: Claim['confidence']
  cite: SourceKey[]
  caveat?: string
}

export const WHEEL_READINGS: WheelReading[] = [
  {
    heading: 'Twenty-four wheels, seven horses',
    body: 'The temple was built as a chariot for Surya, the sun. Twelve pairs of carved stone wheels line the plinth and seven horses strain at the front. It was raised under Narasimhadeva I of the Eastern Ganga dynasty, around 1250 CE.',
    confidence: 'verified',
    cite: ['unesco-konark', 'moc-konark'],
  },
  {
    heading: 'Eight major spokes, eight minor',
    body: 'Each wheel is about 3 metres across, with eight thick spokes and eight thin ones between them, and a rim of carved medallions. The geometry is exact and repeated twenty-four times.',
    confidence: 'verified',
    cite: ['unesco-konark', 'moc-konark'],
  },
  {
    heading: 'It is read as a sundial',
    body: 'The eight major spokes are traditionally read as the eight praharas — the three-hour watches of the Indian day — and guides at the site still demonstrate reading the hour from the shadow the axle throws across the spokes.',
    confidence: 'interpretation',
    cite: ['odisha-tourism', 'moc-konark'],
    caveat:
      'The wheels’ dimensions and count are measured fact. That they were *designed* as functional sundials is a traditional and widely repeated reading, not a claim made by an inscription at the site. The site itself calls the temple a representation of Surya’s chariot.',
  },
  {
    heading: 'What the twenty-four means',
    body: 'The number 24 is variously read as the fortnights of the year, or the hours of a day. Scholars have not settled it — and the temple left no inscription that explains itself.',
    confidence: 'interpretation',
    cite: ['unesco-konark'],
    caveat:
      'Multiple symbolic readings are in circulation for the 24 wheels. None is established by primary evidence. Presented here as competing interpretations, which is what they are.',
  },
]
