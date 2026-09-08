/* ------------------------------------------------------------------
   THE MAP

   A hand-built SVG, not a GIS layer. There is no tile server, no
   Leaflet, no external request.

   The *geometry* lives in `geo.ts` and is generated from real boundary
   data — see the note at the top of that file. The *content* below is
   authored. Pin coordinates are produced by running each place's real
   longitude and latitude through `projectOdisha()`, so Puri sits on the
   coast because Puri is on the coast, not because it looked right.
-------------------------------------------------------------------*/

export {
  ODISHA_VIEWBOX as MAP_VIEWBOX,
  ODISHA_OUTLINE,
  ODISHA_PATH_LENGTH,
  CHILIKA_SHAPE,
  RIVERS,
  projectOdisha,
} from './geo'

export interface Place {
  id: string
  name: string
  /** ODISHA_VIEWBOX units — from projectOdisha(lon, lat). */
  x: number
  y: number
  /** The real coordinates the pin was projected from. */
  lonLat: [number, number]
  kind: 'city' | 'heritage' | 'nature' | 'industry'
  tag: string
  blurb: string
  /** Section id this place links into. */
  target?: string
  /** Bias the label to one side so pins near the edge stay readable. */
  side?: 'left' | 'right'
  /** Nudge the label vertically to break up a collision. */
  dy?: number
}

export const PLACES: Place[] = [
  {
    id: 'bhubaneswar',
    name: 'Bhubaneswar',
    lonLat: [85.8245, 20.2961],
    x: 478,
    y: 269,
    kind: 'city',
    tag: 'Capital · Temple city',
    blurb:
      'The Lingaraj temple and the Ekamra Kshetra precinct; the Ashokan edicts and Shanti Stupa at Dhauli just south; the Kalinga Stadium; an IIT. A city where the 7th century and the IT sector share a postcode.',
    target: 'heritage',
    side: 'left',
  },
  {
    id: 'cuttack',
    name: 'Cuttack',
    lonLat: [85.8792, 20.4625],
    x: 484,
    y: 250,
    kind: 'city',
    tag: 'Silver filigree · Barabati',
    blurb:
      'Odisha’s capital until the 1940s. Barabati Fort on the Mahanadi, the Bali Jatra fair remembering Kalinga’s trade with Bali and Java, and tarakasi — the GI-tagged silver filigree of this city.',
    target: 'culture',
    side: 'left',
  },
  {
    id: 'puri',
    name: 'Puri',
    lonLat: [85.8312, 19.8135],
    x: 479,
    y: 323,
    kind: 'heritage',
    tag: 'Jagannath · Rath Yatra',
    blurb:
      'One of the four Char Dham. The Jagannath temple, the annual chariot festival, the sand art on the beach, and the crafts village of Raghurajpur a short drive inland.',
    target: 'faith',
    side: 'left',
    dy: 14,
  },
  {
    id: 'konark',
    name: 'Konark',
    lonLat: [86.0945, 19.8876],
    x: 507,
    y: 315,
    kind: 'heritage',
    tag: 'UNESCO World Heritage',
    blurb:
      'The Sun Temple — a chariot for Surya built in stone around 1250 CE, with twenty-four carved wheels. Inscribed by UNESCO in 1984. It is on the back of the ₹10 note.',
    target: 'wheel',
  },
  {
    id: 'chilika',
    name: 'Chilika',
    lonLat: [85.35, 19.72],
    x: 428,
    y: 333,
    kind: 'nature',
    tag: 'Lagoon · Ramsar 1981',
    blurb:
      'Asia’s largest brackish-water lagoon and India’s first Ramsar site. Irrawaddy dolphins near Satpada; a winter arrival of migratory birds from as far as Siberia and the Caspian.',
    target: 'nature',
    side: 'left',
  },
  {
    id: 'paradip',
    name: 'Paradip',
    lonLat: [86.6106, 20.3167],
    x: 561,
    y: 267,
    kind: 'industry',
    tag: 'Port',
    blurb:
      'A major cargo port moving bulk minerals and petroleum. It is also where the 1999 super cyclone made landfall — the two facts sit uncomfortably together and both are true.',
    target: 'resilience',
  },
  {
    id: 'gahirmatha',
    name: 'Gahirmatha',
    lonLat: [86.9, 20.75],
    x: 592,
    y: 218,
    kind: 'nature',
    tag: 'Olive Ridley rookery',
    blurb:
      'The largest known mass-nesting beach for the Olive Ridley sea turtle on Earth, protected as a marine sanctuary since 1997. Bhitarkanika’s mangroves and crocodiles sit just inland.',
    target: 'nature',
  },
  {
    id: 'simlipal',
    name: 'Simlipal',
    lonLat: [86.35, 21.9],
    x: 534,
    y: 89,
    kind: 'nature',
    tag: 'Tiger reserve',
    blurb:
      'Sal forest and waterfalls across roughly 2,750 km² in the north, part of a UNESCO-recognised biosphere reserve, and the world’s best-known site for pseudo-melanistic — near-black — tigers.',
    target: 'nature',
  },
  {
    id: 'rourkela',
    name: 'Rourkela',
    lonLat: [84.854, 22.2604],
    x: 375,
    y: 48,
    kind: 'industry',
    tag: 'Steel · Hockey',
    blurb:
      'One of independent India’s first public-sector steel towns. In neighbouring Sundargarh district, hockey is the ordinary village game — which is why so many India internationals come from here.',
    target: 'modern',
  },
  {
    id: 'sambalpur',
    name: 'Sambalpur',
    lonLat: [83.9812, 21.4669],
    x: 283,
    y: 137,
    kind: 'city',
    tag: 'Bandha ikat · Hirakud',
    blurb:
      'Western Odisha. The home of Sambalpuri bandha — tie-dyed thread woven into pattern — and of Veer Surendra Sai’s long resistance. The Hirakud dam holds back the Mahanadi just upstream.',
    target: 'culture',
    side: 'left',
  },
  {
    id: 'berhampur',
    name: 'Berhampur',
    lonLat: [84.7941, 19.3149],
    x: 369,
    y: 379,
    kind: 'city',
    tag: 'Silk · Southern coast',
    blurb:
      'Southern Odisha’s commercial centre, known for Berhampuri patta silk. The Rushikulya river mouth nearby is the other great Olive Ridley nesting beach.',
    target: 'nature',
    side: 'left',
  },
  {
    id: 'koraput',
    name: 'Koraput',
    lonLat: [82.7108, 18.8117],
    x: 148,
    y: 435,
    kind: 'nature',
    tag: 'Eastern Ghats · Adivasi Odisha',
    blurb:
      'The southern highlands. Koraput, Rayagada and Gajapati are the heartland of Odisha’s Adivasi communities — including the Saura, whose wall paintings are among India’s most distinctive art traditions.',
    target: 'culture',
    side: 'right',
  },
]

export const MAP_NOTE =
  'Boundary simplified from open data for display. Rivers and the Chilika lagoon are schematic. Not a survey map.'
