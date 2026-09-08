import type { Claim, SourceKey } from './sources'

export interface EcoSite {
  id: string
  name: string
  kind: string
  hook: string
  body: string
  stat?: { value: string; label: string }
  cite: SourceKey[]
  confidence: Claim['confidence']
  caveat?: string
  accent: string
}

export const ECO_SITES: EcoSite[] = [
  {
    id: 'chilika',
    name: 'Chilika',
    kind: 'Brackish lagoon',
    hook: 'Asia’s largest brackish-water lagoon, and India’s first Ramsar site.',
    body: 'Chilika is a shallow lagoon on the coast where fresh river water and the Bay of Bengal meet and never fully mix. That instability is the whole point — salinity shifts through the year and the lagoon supports an unusual range of life because of it. It was designated India’s first Wetland of International Importance under the Ramsar Convention in 1981.',
    stat: { value: '1981', label: 'India’s first Ramsar site' },
    cite: ['chilika-cda', 'ramsar-chilika'],
    confidence: 'verified',
    accent: 'var(--lagoon)',
  },
  {
    id: 'dolphins',
    name: 'Irrawaddy Dolphins',
    kind: 'Resident population',
    hook: 'A blunt-headed river dolphin that lives here and almost nowhere else in these numbers.',
    body: 'Chilika holds what has been reported as the single largest known population of Irrawaddy dolphins in the world, concentrated near the Satpada channel where the lagoon meets the sea. They are not river dolphins in the Gangetic sense and not open-ocean dolphins — they are a brackish specialist, which is exactly what Chilika is.',
    cite: ['mongabay-dolphins', 'chilika-cda'],
    confidence: 'verified',
    caveat:
      'Population estimates come from periodic censuses by the Chilika Development Authority and vary year to year. "Single largest known habitat" reflects reported census comparisons, not a permanent ranking.',
    accent: 'var(--lagoon-soft)',
  },
  {
    id: 'birds',
    name: 'The Migration',
    kind: 'Winter arrival',
    hook: 'Birds arrive here from the Caspian, from Lake Baikal, from the Kyrgyz steppe.',
    body: 'Every winter Chilika fills with migratory waterbirds flying the Central Asian flyway — from as far as Siberia, the Aral and Caspian seas, Central Asia and the Himalaya. The lagoon regularly records well over a hundred and fifty species in peak season, and the annual census is a fixture of Indian conservation.',
    stat: { value: '160+', label: 'bird species in peak season' },
    cite: ['chilika-cda'],
    confidence: 'verified',
    accent: 'var(--indigo)',
  },
  {
    id: 'turtles',
    name: 'The Olive Ridleys',
    kind: 'Mass nesting',
    hook: 'They come ashore in their hundreds of thousands, and they come ashore together.',
    body: 'The Gahirmatha coast, with Rushikulya and Devi river mouth, is the most important mass-nesting ground on Earth for the Olive Ridley sea turtle. The females arrive in an arribada — a synchronised mass arrival compressed into a few nights — dig, lay and return to the sea. Gahirmatha has been protected as a marine sanctuary since 1997, and fishing is restricted through the nesting season to keep trawl nets off the approach.',
    stat: { value: '#1', label: 'largest known Olive Ridley rookery on Earth' },
    cite: ['wii-turtles', 'odisha-tourism'],
    confidence: 'verified',
    caveat:
      'Nesting counts vary enormously year to year — in some seasons the arribada does not occur at Gahirmatha at all. Any single headline number would be misleading, so none is used.',
    accent: 'var(--gold)',
  },
  {
    id: 'bhitarkanika',
    name: 'Bhitarkanika',
    kind: 'Mangrove',
    hook: 'India’s second-largest mangrove forest, full of saltwater crocodiles.',
    body: 'A dense mangrove system in the Brahmani–Baitarani delta, threaded with creeks and holding a significant population of estuarine crocodiles, along with kingfishers, water monitors and enormous congregations of waterbirds. It is a Ramsar site. Mangroves are also, incidentally, the best cyclone barrier the coast has — a fact Odisha now takes literally.',
    cite: ['odisha-tourism', 'osdma-profile'],
    confidence: 'verified',
    accent: 'var(--leaf)',
  },
  {
    id: 'simlipal',
    name: 'Simlipal',
    kind: 'Tiger reserve & biosphere',
    hook: 'Sal forest, waterfalls, elephants, tigers — and melanistic tigers found nowhere else.',
    body: 'Simlipal, in Mayurbhanj in the north, is a tiger reserve and part of a UNESCO-recognised biosphere reserve, spread over roughly 2,750 km² of sal forest and grassland. It is the best-known site in the world for pseudo-melanistic tigers — animals whose stripes have broadened until the coat reads almost black.',
    stat: { value: '2,750 km²', label: 'biosphere reserve' },
    cite: ['odisha-tourism'],
    confidence: 'verified',
    accent: 'var(--stone-200)',
  },
  {
    id: 'satkosia',
    name: 'Satkosia Gorge',
    kind: 'River gorge',
    hook: 'The Mahanadi narrows and cuts a gorge fourteen miles long through the Eastern Ghats.',
    body: 'Satkosia — literally "seven kos", an old measure of about fourteen miles — is where the Mahanadi is squeezed through a gorge in the Eastern Ghats. It is a tiger reserve and one of the more important habitats in India for the gharial and the mugger crocodile.',
    cite: ['odisha-tourism'],
    confidence: 'verified',
    accent: 'var(--terracotta)',
  },
]

export const NATURE_INTRO =
  'Odisha runs from a 480-kilometre coast, through a delta of four major river systems, up into the sal forests of the Eastern Ghats. That range is why a state this size holds a lagoon full of dolphins, a mangrove full of crocodiles and a hill forest with black-coated tigers, all within a day’s drive of each other.'

export const TURTLE_STORY: Claim[] = [
  {
    text: 'Female Olive Ridleys return to nest on or near the beach where they themselves hatched, navigating across open ocean to get there.',
    confidence: 'verified',
    cite: ['wii-turtles'],
  },
  {
    text: 'They arrive together. An arribada compresses the nesting of hundreds of thousands of turtles into a handful of nights on a few kilometres of sand.',
    confidence: 'verified',
    cite: ['wii-turtles'],
  },
  {
    text: 'The eggs incubate for around seven to eight weeks. Hatchlings emerge at night and orient to the brightest horizon — which is why coastal lighting is a genuine conservation problem, not a fussy one.',
    confidence: 'verified',
    cite: ['wii-turtles'],
  },
  {
    text: 'Odisha closes stretches of coast to mechanised fishing through the nesting season and runs patrols. The trade-off — a fishing community’s season against a turtle population — is real, and managing it is the actual work of conservation here.',
    confidence: 'verified',
    cite: ['odisha-tourism'],
  },
]
