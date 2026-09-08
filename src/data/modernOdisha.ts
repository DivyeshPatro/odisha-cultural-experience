import type { Claim, SourceKey } from './sources'

export interface ModernPillar {
  id: string
  label: string
  title: string
  hook: string
  body: string
  points: { text: string; confidence: Claim['confidence']; caveat?: string }[]
  cite: SourceKey[]
  accent: string
  glyph: 'rocket' | 'hockey' | 'ore' | 'shield'
}

export const MODERN_PILLARS: ModernPillar[] = [
  {
    id: 'science',
    label: 'Science & defence',
    title: 'India tests its missiles off this coast',
    hook: 'An island off Odisha carries the name of the man who built India’s missile programme — because that is where it was tested.',
    body: 'The Integrated Test Range, run by DRDO, operates from Chandipur on the Odisha coast and from an island offshore. That island was Wheeler Island, named after a British officer. On 4 September 2015 it was renamed Abdul Kalam Island, after the aerospace engineer and President who had worked on India’s missile development.',
    points: [
      {
        text: 'The Integrated Test Range is one of India’s principal missile test facilities, sited on the Odisha coast.',
        confidence: 'verified',
      },
      {
        text: 'Wheeler Island was renamed Abdul Kalam Island in September 2015.',
        confidence: 'verified',
      },
      {
        text: 'Odisha also hosts significant higher-education and research institutions, including an IIT at Bhubaneswar, NISER, and the Institute of Physics.',
        confidence: 'verified',
      },
    ],
    cite: ['drdo-itr'],
    accent: 'var(--indigo)',
    glyph: 'rocket',
  },
  {
    id: 'hockey',
    label: 'Sport',
    title: 'A state that put its own name on the national shirt',
    hook: 'Corporate sponsors back national teams. In India’s case, for hockey, a state government does.',
    body: 'Since 2018 Odisha has been the official sponsor of the Indian men’s and women’s hockey teams. The original agreement ran five years; in 2023 it was extended for a further ten, to 2033. Odisha also built the Kalinga Stadium hockey complex in Bhubaneswar and the Birsa Munda stadium in Rourkela, and has hosted the men’s Hockey World Cup.',
    points: [
      {
        text: 'Odisha has sponsored the Indian national hockey teams — men’s and women’s, senior and junior — since 2018, extended in 2023 through to 2033.',
        confidence: 'verified',
      },
      {
        text: 'Bhubaneswar’s Kalinga Stadium is the national hockey teams’ principal training and match venue and hosted the Hockey World Cup.',
        confidence: 'verified',
      },
      {
        text: 'Hockey in Odisha is not only an investment story — Sundargarh district in the state’s west has produced a remarkable number of India internationals, and the game there long predates the sponsorship.',
        confidence: 'verified',
      },
    ],
    cite: ['hockey-india'],
    accent: 'var(--lagoon)',
    glyph: 'hockey',
  },
  {
    id: 'resources',
    label: 'Industry & resources',
    title: 'The ground India builds itself out of',
    hook: 'Almost all of India’s chromite is here. So is a large share of its bauxite, iron ore and nickel.',
    body: 'Odisha holds a disproportionate share of India’s mineral reserves, and a correspondingly large share of national mineral production. That has made it central to Indian steel and aluminium, and it is the reason for Paradip and Dhamra ports on its coast. It is also the source of the state’s hardest political questions — land, displacement, and where the value of extracted ore actually lands.',
    points: [
      {
        text: 'Odisha holds the overwhelming majority of India’s chromite reserves, and large shares of its bauxite, iron ore, nickel, manganese and coal.',
        confidence: 'verified',
      },
      {
        text: 'Paradip and Dhamra on the Odisha coast are among India’s major cargo ports, handling bulk mineral and petroleum traffic.',
        confidence: 'verified',
      },
      {
        text: 'The widely repeated line that "Odisha contributes 42% of India’s natural resource extraction" is a garbling of a real figure. What is reported is Odisha’s share of India’s *mineral production* — not of all natural resources, and not a fixed constant. It moves year to year with output and prices.',
        confidence: 'contested',
        caveat:
          'The often-quoted "42%" traces to reporting on Odisha’s share of Indian mineral production in a particular year. It is not a stable statistic, and it does not mean "42% of India’s natural resources". Reserve shares by mineral are the better-founded numbers and are what this site leads with.',
      },
      {
        text: 'Mining-led growth in Odisha carries documented costs: displacement, forest loss and long-running disputes over consent in Adivasi areas. A section on Odisha’s minerals that does not say so is an advertisement, not a description.',
        confidence: 'verified',
      },
    ],
    cite: ['odisha-mines', 'odisha-planning-minerals'],
    accent: 'var(--terracotta)',
    glyph: 'ore',
  },
  {
    id: 'model',
    label: 'Governance',
    title: 'An export that isn’t a commodity',
    hook: 'The most valuable thing Odisha currently sends out of the state is a method.',
    body: 'Odisha’s cyclone preparedness model — early warning delivered to the last mile, pre-positioned shelters, standing volunteer networks, evacuation as routine rather than emergency — is studied and cited internationally as a working template for a low-cost, high-coverage disaster response system.',
    points: [
      {
        text: 'The UN Office for Disaster Risk Reduction publicly commended India’s zero-casualty approach after Cyclone Fani in 2019.',
        confidence: 'verified',
      },
      {
        text: 'Odisha established the first state-level disaster management authority in India, in the wake of the 1999 super cyclone.',
        confidence: 'verified',
      },
    ],
    cite: ['undrr-fani', 'osdma-profile', 'mei-disasters'],
    accent: 'var(--gold)',
    glyph: 'shield',
  },
]

export const MODERN_INTRO =
  'It is easy to file Odisha under heritage and stop there. That would miss where India tests its missiles, who pays for its hockey team, where a large fraction of its ore comes out of the ground, and which state the UN pointed at when it wanted an example of disaster preparedness that works.'

export const TENNER_STORY: Claim = {
  text: 'The Reserve Bank of India issued the ₹10 note of the Mahatma Gandhi (New) Series in January 2018 with the Sun Temple at Konark as the motif on its reverse — chosen, in the RBI’s words, to depict the country’s cultural heritage. It is the most widely distributed image of Odisha in existence, and almost nobody holding one knows what they are looking at.',
  confidence: 'verified',
  cite: ['rbi-ten'],
}
