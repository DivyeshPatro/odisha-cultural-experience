import type { Claim, SourceKey } from './sources'

export interface Hero {
  id: string
  name: string
  odia?: string
  life: string
  /** Where they sit on the timeline rail. */
  year: number
  yearLabel: string
  role: string
  hook: string
  did: string
  /** Why they matter to someone reading this in 2026. */
  now: string
  cite: SourceKey[]
  confidence: Claim['confidence']
  caveat?: string
  accent: string
}

/* ------------------------------------------------------------------
   Portraits: this section deliberately uses drawn emblem plates rather
   than photographs. Rights-cleared portraits of several of these
   figures are difficult to source correctly, and a wrong or
   misattributed face is a worse failure than an honest emblem.
   See README → "Adding photographs".
-------------------------------------------------------------------*/

export const HEROES: Hero[] = [
  {
    id: 'jagabandhu',
    name: 'Buxi Jagabandhu Bidyadhar',
    life: 'd. 1829',
    year: 1817,
    yearLabel: '1817',
    role: 'Commander of the Paikas of Khurda',
    hook: 'Forty years before 1857, a militia in Khurda took up arms against the East India Company.',
    did: 'The Paikas were a hereditary warrior class who held land in return for military service to the king of Khurda. When the Company dismantled that system — stripping the Paikas of their land and imposing a salt monopoly and a cash revenue regime — Jagabandhu, the king’s Buxi or commander, led them into open revolt in March 1817. The rising spread across Khurda and towards Puri and Cuttack before the Company put it down; the revolt was broken by 1819, and Jagabandhu surrendered in 1825.',
    now: 'The Paika rebellion is now taught as one of the earliest organised armed challenges to Company rule in India. Whether it should be called a "first war of independence" is argued about — but the fact that a large, coordinated, land-based revolt happened here in 1817 is not.',
    cite: ['orissa-review'],
    confidence: 'contested',
    caveat:
      'The 1817 date and the course of the revolt are well documented. The framing of the Paika rebellion as India’s "first war of independence" is a contested historiographical claim, advanced by some historians and by the Odisha government, and disputed by others. This site states the events and flags the framing.',
    accent: 'var(--terracotta)',
  },
  {
    id: 'surendra',
    name: 'Veer Surendra Sai',
    odia: 'ବୀର ସୁରେନ୍ଦ୍ର ସାଏ',
    life: '23 Jan 1809 — 28 Feb 1884',
    year: 1857,
    yearLabel: '1827–1864',
    role: 'Leader of the Sambalpur resistance',
    hook: 'He spent the larger part of his adult life either fighting the Company or in its jails, and never stopped.',
    did: 'Surendra Sai contested the Company’s installation of a ruler in Sambalpur and was imprisoned at Hazaribagh in 1840. He was freed in 1857 when the uprising reached the jail, returned to western Odisha and fought a long guerrilla campaign from the forests and hills. He was taken again in 1864 and held at Asirgarh Fort, where he died in 1884.',
    now: 'Sambalpur University, and a great deal else in western Odisha, carries his name. He is the reason the freedom struggle in Odisha cannot be told as a coastal story — the west fought its own long war.',
    cite: ['orissa-review'],
    confidence: 'verified',
    accent: 'var(--sindoor)',
  },
  {
    id: 'gopabandhu',
    name: 'Pandit Gopabandhu Das',
    odia: 'ଉତ୍କଳମଣି ଗୋପବନ୍ଧୁ ଦାସ',
    life: '9 Oct 1877 — 17 Jun 1928',
    year: 1921,
    yearLabel: '1909–1928',
    role: 'Utkalmani — teacher, editor, organiser',
    hook: 'He built a school under trees, then a newspaper, then a political movement — in that order.',
    did: 'Gopabandhu founded the Satyabadi school at Sakhigopal, run in the open air on a model of nationalist education, and later the Odia daily Samaj. He led relief work during floods and famine, entered the Non-Cooperation Movement, and became the first president of the Congress organisation in Odisha. Subhas Chandra Bose described him as the father of the national movement in Odisha.',
    now: 'Samaj is still published. The template he set — that political freedom needed literacy, relief work and a press before it needed speeches — is why he is called Utkalmani, the gem of Utkal.',
    cite: ['orissa-review'],
    confidence: 'verified',
    accent: 'var(--gold)',
  },
  {
    id: 'ramadevi',
    name: 'Rama Devi Chaudhury',
    odia: 'ରମାଦେବୀ',
    life: '1899 — 1985',
    year: 1930,
    yearLabel: '1921–1947',
    role: 'Maa — organiser of the Salt Satyagraha in Odisha',
    hook: 'Married at fifteen. In the independence movement by twenty-two. Called simply "Maa" for the rest of her life.',
    did: 'Rama Devi and her husband Gopabandhu Chaudhury gave up his colonial service position and entered the Non-Cooperation Movement in 1921. She organised women across Odisha into the movement and was central to the salt satyagraha on the Odisha coast in 1930, at Inchudi and elsewhere. She was jailed. After independence she worked on Bhoodan, on women’s education, and on relief.',
    now: 'Rama Devi Women’s University in Bhubaneswar is named for her. She is the answer to anyone who assumes the Odisha freedom story is a list of men.',
    cite: ['orissa-review'],
    confidence: 'verified',
    caveat:
      'Birth given as 3 December 1899 in most accounts; death in 1985. Day-level dates for her death vary slightly between sources, so only the years are stated.',
    accent: 'var(--sindoor-soft)',
  },
  {
    id: 'bajirout',
    name: 'Baji Rout',
    odia: 'ବାଜି ରାଉତ',
    life: '5 Oct 1926 — 11 Oct 1938',
    year: 1938,
    yearLabel: '1938',
    role: 'Boatman. Twelve years old.',
    hook: 'He was asked to row British police across a river at night. He said no. They shot him.',
    did: 'Baji Rout was a boy from Nilakanthapur in Dhenkanal, part of the Banar Sena — the children’s wing of the Prajamandal movement against the princely administration. On the night of 11 October 1938, at the Nilakanthapur ghat on the Brahmani river, he was on watch. Armed police demanded he ferry them across. He refused. He was shot and killed. He was twelve years old.',
    now: 'He is remembered as the youngest martyr of India’s freedom movement. The Odia poet Sachi Routray wrote a long poem about his death that generations of Odia schoolchildren have learned. Nothing here is a quotation attributed to Baji Rout, because he did not leave one — he left a refusal.',
    cite: ['orissa-review'],
    confidence: 'verified',
    accent: 'var(--lagoon-soft)',
  },
  {
    id: 'parbati',
    name: 'Parbati Giri',
    odia: 'ପାର୍ବତୀ ଗିରି',
    life: '1926 — 1995',
    year: 1942,
    yearLabel: '1942–1995',
    role: 'Quit India organiser, western Odisha',
    hook: 'Sixteen years old in the Quit India movement. Spent the next fifty years on the people it left behind.',
    did: 'Parbati Giri joined the Quit India movement in 1942 at sixteen, in the Bargarh region of western Odisha, and was imprisoned for it. After independence she did not take office. She founded and ran an orphanage at Paikmal and worked on the rehabilitation of women and destitute children in western Odisha for the rest of her life.',
    now: 'She is often called the Mother Teresa of western Odisha. The more useful thing to notice is what she chose after 1947 — that for a certain kind of person the freedom struggle did not end on 15 August, it just changed job description.',
    cite: ['orissa-review'],
    confidence: 'verified',
    caveat:
      'Birth is generally given as 19 January 1926 and death as 17 August 1995. Year-level dates are stated here; day-level dates appear consistently but in secondary sources.',
    accent: 'var(--leaf)',
  },
]

export const HEROES_INTRO =
  'Odisha’s resistance did not begin in 1857 and it did not run on a single track. A land militia rose in 1817. A guerrilla campaign held out in the western hills for decades. A schoolmaster built a newspaper. A woman organised the coast for the salt march. A twelve-year-old refused to row a boat.'

export const HEROES_CLOSER: Claim = {
  text: 'Odisha became a separate province on 1 April 1936 — the first in India constituted on the basis of language. That was itself the outcome of a decades-long movement, and it happened eleven years before independence.',
  confidence: 'verified',
  cite: ['orissa-review'],
}

export const HERO_SOURCE_NOTE: SourceKey[] = ['orissa-review']
