/* ------------------------------------------------------------------
   ONE INDIA

   The closing image is a real map of India with every state drawn and
   Odisha lit — geometry from `geo.ts`. An earlier version used a
   hand-drawn silhouette; it was not good enough to close on.

   The threads below are authored, and each one links back into the
   chapter that earns it.
-------------------------------------------------------------------*/

export { INDIA_VIEWBOX, INDIA_STATES, ODISHA_STATE_ID } from './geo'

export interface Thread {
  id: string
  label: string
  line: string
  target: string
}

/** The threads that run from this state into the national story. */
export const THREADS: Thread[] = [
  {
    id: 'freedom',
    label: 'Freedom',
    line: 'A land militia rose here in 1817, forty years before 1857.',
    target: 'heroes',
  },
  {
    id: 'language',
    label: 'Language',
    line: 'The first Indian province drawn on linguistic lines, in 1936 — the precedent every later state used.',
    target: 'sixty',
  },
  {
    id: 'peace',
    label: 'The Chakra',
    line: 'Ashoka turned from war to dhamma after Kalinga. India put his wheel at the centre of its flag.',
    target: 'heritage',
  },
  {
    id: 'science',
    label: 'Science',
    line: 'India tests its missiles off this coast, from an island named for Abdul Kalam.',
    target: 'modern',
  },
  {
    id: 'sport',
    label: 'Sport',
    line: 'An Indian state pays for the national hockey team, to 2033.',
    target: 'modern',
  },
  {
    id: 'industry',
    label: 'Industry',
    line: 'Most of India’s chromite, and much of its bauxite and iron ore, comes out of this ground.',
    target: 'modern',
  },
  {
    id: 'resilience',
    label: 'Resilience',
    line: 'A cyclone evacuation model the UN pointed at as an example for everyone else.',
    target: 'resilience',
  },
  {
    id: 'culture',
    label: 'Culture',
    line: 'Odissi is one of India’s classical dance forms. Jagannath gave English the word juggernaut.',
    target: 'culture',
  },
]
