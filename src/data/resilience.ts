import type { Claim, SourceKey } from './sources'

/* ------------------------------------------------------------------
   ODISHA'S SUPERPOWER — RESILIENCE

   This is the section most likely to slide into promotional language,
   so it is written under a hard rule: state the death tolls first.
   The achievement is only legible against what it cost to learn.

   Where sources disagree on a toll (1999 especially), the range is
   shown rather than the flattering end of it.
-------------------------------------------------------------------*/

export interface ResilienceStep {
  id: string
  year: string
  title: string
  body: string
  /** Headline figure for the step, if there is a defensible one. */
  figure?: string
  figureLabel?: string
  tone: 'loss' | 'learning' | 'system' | 'proof'
  cite: SourceKey[]
  confidence: Claim['confidence']
  caveat?: string
}

export const RESILIENCE_STEPS: ResilienceStep[] = [
  {
    id: '1999',
    year: '29 October 1999',
    title: 'The super cyclone',
    body: 'A storm with winds above 250 km/h made landfall near Paradip and stalled over the coast. A storm surge pushed several kilometres inland. Communications, roads and power were destroyed; relief could not reach the worst-hit blocks for days. It remains the deadliest cyclone in India’s recorded history.',
    figure: '~10,000',
    figureLabel: 'lives lost',
    tone: 'loss',
    cite: ['orissa-review-cyclone', 'mei-disasters'],
    confidence: 'contested',
    caveat:
      'Tolls differ between sources: the official state figure is often cited around 8,200–9,900, and independent estimates run to roughly 10,000. The range is stated rather than a single number, because the counting itself was disrupted by the disaster.',
  },
  {
    id: 'osdma',
    year: '1999–2000',
    title: 'Odisha builds an institution',
    body: 'In the immediate aftermath the state constituted a dedicated disaster management authority — OSDMA — the first body of its kind set up by an Indian state. It predates the national framework. The decision was to treat cyclones as a permanent operating condition rather than a recurring emergency.',
    tone: 'learning',
    cite: ['osdma-profile', 'mei-disasters'],
    confidence: 'verified',
  },
  {
    id: 'shelters',
    year: '2000s',
    title: 'Concrete, on stilts, within walking distance',
    body: 'Multipurpose cyclone shelters were built along the coast — raised concrete structures used as schools or community halls the rest of the year. Each is tied to a defined set of villages and a maintenance committee. The design constraint that mattered most was not engineering; it was that people had to be able to walk there in the time available.',
    tone: 'system',
    cite: ['osdma-profile'],
    confidence: 'verified',
  },
  {
    id: 'warning',
    year: '2000s–2010s',
    title: 'Early warning, in the local language, to the last mile',
    body: 'The India Meteorological Department’s track and intensity forecasting improved sharply, and Odisha built the delivery layer underneath it: sirens, targeted SMS in Odia, radio, and volunteers going door to door. A forecast that does not reach a fisherman’s house is not a warning.',
    tone: 'system',
    cite: ['osdma-profile', 'worldbank-phailin'],
    confidence: 'verified',
  },
  {
    id: 'phailin',
    year: '12 October 2013',
    title: 'Cyclone Phailin — the first real test',
    body: 'A very severe cyclonic storm of comparable intensity to 1999 hit the same coast. Close to a million people were moved out of its path beforehand. Damage was severe. The death toll was in the dozens, not the thousands. The World Bank documented it as a case of a disaster averted.',
    figure: '~1 million',
    figureLabel: 'evacuated before landfall',
    tone: 'proof',
    cite: ['worldbank-phailin', 'ncrmp-phailin'],
    confidence: 'verified',
    caveat:
      'Reported deaths from Phailin are commonly given as around 44 in Odisha. Damage to housing, crops and infrastructure was nonetheless very large — a low death toll is not the same as a small disaster.',
  },
  {
    id: 'fani',
    year: '3 May 2019',
    title: 'Cyclone Fani — 1.2 million people, roughly 24 hours',
    body: 'An extremely severe cyclonic storm made landfall at Puri. In the day before it hit, the state moved about 1.2 million people into shelters — with tens of thousands of volunteers, thousands of emergency workers, around 7,000 kitchens and 9,000 shelters, and millions of targeted messages. The UN’s disaster risk reduction office publicly praised the operation and the accuracy of the IMD’s warnings.',
    figure: '1.2 million',
    figureLabel: 'moved in about a day',
    tone: 'proof',
    cite: ['undrr-fani', 'unicef-fani'],
    confidence: 'verified',
    caveat:
      'Fani was not a zero-casualty event — deaths were reported in Odisha, with figures revised upward in the weeks after landfall. The verified claim is the scale and speed of the evacuation, and the UN’s public commendation of the approach. "Zero casualty" is the name of the policy, not a description of the outcome.',
  },
]

export const RESILIENCE_THESIS =
  'Odisha does not survive cyclones by being lucky. It survives them because after 1999 it decided the death toll was a policy failure rather than an act of god, and then spent twenty years building the machinery to prove it.'

export const RESILIENCE_HONESTY: Claim = {
  text: 'What has fallen dramatically is deaths. What has not fallen is damage — to housing, crops, power networks and livelihoods, which still runs into the thousands of crores per major storm. Odisha has solved the part of the problem that kills people, and is still working on the part that impoverishes them.',
  confidence: 'verified',
  cite: ['ncrmp-phailin', 'mei-disasters'],
}

export const UN_RECOGNITION_NOTE: Claim = {
  text: 'The frequently repeated shorthand "UN-recognised disaster management" refers, most concretely, to public commendation by the UN Office for Disaster Risk Reduction — including a statement by the Secretary-General’s Special Representative for Disaster Risk Reduction after Cyclone Fani in May 2019 describing India’s zero-casualty approach as a major contribution to the Sendai Framework.',
  confidence: 'verified',
  cite: ['undrr-fani'],
  caveat:
    'This is public commendation and citation as a model — it is not a formal UN award to the state of Odisha. Claims that Odisha "won a UN award" for disaster management circulate widely and are not supported by a specific verifiable award record, so this site does not make that claim.',
}
