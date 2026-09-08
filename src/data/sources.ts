/* ------------------------------------------------------------------
   SOURCE REGISTRY

   Every factual claim rendered on this site carries a `cite` array of
   keys into this map, plus a `confidence` level. The UI surfaces both.

   confidence levels
   -----------------
   'verified'       Corroborated against an official / institutional source
                    named below. Safe to state plainly.
   'interpretation' Widely held scholarly or traditional reading, not a
                    measured fact. The UI labels these "interpretation".
   'contested'      Figures differ meaningfully between sources, or the
                    popular phrasing of the claim is looser than the
                    evidence supports. The UI shows the range and the
                    caveat rather than picking a flattering number.

   Nothing on this site is rated 'verified' on the strength of a blog.
-------------------------------------------------------------------*/

export type Confidence = 'verified' | 'interpretation' | 'contested'

export interface Source {
  org: string
  title: string
  url: string
  /** 'official' = government / UN / UNESCO / institutional primary source */
  tier: 'official' | 'academic' | 'press'
}

export const SOURCES: Record<string, Source> = {
  'unesco-konark': {
    org: 'UNESCO World Heritage Centre',
    title: 'Sun Temple, Konârak (inscribed 1984)',
    url: 'https://whc.unesco.org/en/list/246/',
    tier: 'official',
  },
  'moc-konark': {
    org: 'Ministry of Culture, Government of India',
    title: 'Sun Temple, Konârak',
    url: 'https://culture.gov.in/sun-temple-konarak',
    tier: 'official',
  },
  'odisha-tourism': {
    org: 'Odisha Tourism, Government of Odisha',
    title: 'Official state tourism portal',
    url: 'https://odishatourism.gov.in/',
    tier: 'official',
  },
  'odisha-tourism-dhauli': {
    org: 'Odisha Tourism, Government of Odisha',
    title: 'Dhauligiri — Buddhist sites',
    url: 'https://odishatourism.gov.in/content/tourism/en/discover/attractions/buddhist-sites/dhauligiri.html',
    tier: 'official',
  },
  'rathjatra-nic': {
    org: 'Government of Odisha (rathjatra.nic.in)',
    title: 'Rath Jatra, Festival of Chariots at Puri — the chariots',
    url: 'https://rathjatra.nic.in/chariots.html',
    tier: 'official',
  },
  'osdma-profile': {
    org: 'Odisha State Disaster Management Authority',
    title: 'State Profile',
    url: 'https://www.osdma.org/state-profile/',
    tier: 'official',
  },
  'chilika-cda': {
    org: 'Chilika Development Authority, Government of Odisha',
    title: 'Chilika — Asia’s largest brackish water lagoon',
    url: 'http://www.chilika.com/',
    tier: 'official',
  },
  'odisha-mines': {
    org: 'Directorate of Mines & Geology, Government of Odisha',
    title: 'Compendium of Mineral Resources of Odisha',
    url: 'https://www.odishaminerals.gov.in/sites/Download/Compendium_of_Mineral_Resources_in_Odisha.pdf',
    tier: 'official',
  },
  'odisha-planning-minerals': {
    org: 'Planning & Convergence Dept., Government of Odisha',
    title: 'Economic Survey — Ch. 10, Mineral Resources',
    url: 'https://pc.odisha.gov.in/sites/default/files/2020-03/eco-10CFA.pdf',
    tier: 'official',
  },
  'rbi-ten': {
    org: 'Reserve Bank of India',
    title: '₹10 banknote, Mahatma Gandhi (New) Series — Sun Temple, Konark motif',
    url: 'https://paisaboltahai.rbi.org.in/rupees-ten.aspx',
    tier: 'official',
  },
  'orissa-review': {
    org: 'Odisha Review (Government of Odisha monthly)',
    title: 'State government journal — history & culture archive',
    url: 'https://magazines.odisha.gov.in/',
    tier: 'official',
  },
  'orissa-review-cyclone': {
    org: 'Odisha Review, Government of Odisha',
    title: 'Cyclonic Hazards in Odisha and its Mitigation (Jan 2016)',
    url: 'https://magazines.odisha.gov.in/Orissareview/2016/Jan/engpdf/38-42.pdf',
    tier: 'official',
  },
  'orissa-review-odia': {
    org: 'Odisha Review, Government of Odisha',
    title: 'Classical Status to Odia Language (March 2014)',
    url: 'https://magazines.odisha.gov.in/Orissareview/2014/mar/engpdf/55-59.pdf',
    tier: 'official',
  },
  'undrr-fani': {
    org: 'UN Office for Disaster Risk Reduction (statement by SRSG Mami Mizutori)',
    title: 'UN agency praises India’s zero-casualty approach after Cyclone Fani, May 2019',
    url: 'https://www.aljazeera.com/news/2019/05/cyclone-fani-praise-india-response-devastating-storm-190505072941472.html',
    tier: 'press',
  },
  'unicef-fani': {
    org: 'UNICEF India',
    title: 'Cyclone Fani Situation Report #2, 12 May 2019',
    url: 'https://www.unicef.org/media/82111/file/India-Cyclone-Fani-SitRep-12-May-2019.pdf',
    tier: 'official',
  },
  'worldbank-phailin': {
    org: 'The World Bank',
    title: 'India Averts Devastation from Cyclone Phailin',
    url: 'https://www.worldbank.org/en/results/2014/04/10/india-averts-cyclone-phailin-devastation',
    tier: 'official',
  },
  'ncrmp-phailin': {
    org: 'National Cyclone Risk Mitigation Project, Government of India',
    title: 'Cyclone Phailin in Odisha, October 2013 — Rapid Damage and Needs Assessment',
    url: 'https://ncrmp.gov.in/wp-content/uploads/2014/03/Odisha-Phailin-report-Final.pdf',
    tier: 'official',
  },
  'mei-disasters': {
    org: 'Middle East Institute (peer-reviewed policy analysis)',
    title: 'Learning from Deaths in Disasters: The Case of Odisha, India',
    url: 'https://mei.edu/publication/learning-deaths-disasters-case-odisha-india/',
    tier: 'academic',
  },
  'orienvis-demography': {
    org: 'ENVIS Centre, Government of Odisha',
    title: 'Odisha — Demography (Census 2011)',
    url: 'https://orienvis.nic.in/index1.aspx?lid=343&mid=1&langid=1&linkid=234',
    tier: 'official',
  },
  'mongabay-dolphins': {
    org: 'Mongabay India',
    title: 'Chilika emerges as single largest habitat of Irrawaddy dolphins in the world',
    url: 'https://india.mongabay.com/2018/03/chilika-lake-emerges-as-single-largest-habitat-of-irrawaddy-dolphins-in-the-world/',
    tier: 'press',
  },
  'ramsar-chilika': {
    org: 'Ramsar Convention on Wetlands',
    title: 'Chilika Lake — India’s first Ramsar site (1981)',
    url: 'https://rsis.ramsar.org/ris/229',
    tier: 'official',
  },
  'gi-registry': {
    org: 'Geographical Indications Registry, Government of India',
    title: 'Registered GIs — Odisha Pattachitra, Sambalpuri Bandha, Rupa Tarakasi',
    url: 'https://ipindia.gov.in/registered-gls.htm',
    tier: 'official',
  },
  'sna': {
    org: 'Sangeet Natak Akademi, Government of India',
    title: 'Classical dance forms of India — Odissi',
    url: 'https://sangeetnatak.gov.in/',
    tier: 'official',
  },
  'drdo-itr': {
    org: 'Defence Research & Development Organisation',
    title: 'Integrated Test Range (ITR), Chandipur / Abdul Kalam Island',
    url: 'https://www.drdo.gov.in/drdo/labs-and-establishments/integrated-test-range-itr',
    tier: 'official',
  },
  'hockey-india': {
    org: 'Hockey India / Government of Odisha',
    title: 'Odisha’s sponsorship of the Indian hockey teams, extended 2023–2033',
    url: 'https://hockeyindia.org/',
    tier: 'official',
  },
  'padma-awards': {
    org: 'Ministry of Home Affairs, Government of India',
    title: 'Padma Awards directory',
    url: 'https://padmaawards.gov.in/',
    tier: 'official',
  },
  'moes-coastline': {
    org: 'Ministry of Earth Sciences / Space Applications Centre',
    title: 'Revised national coastline length assessment (2023–24 survey)',
    url: 'https://www.moes.gov.in/',
    tier: 'official',
  },
  'wii-turtles': {
    org: 'Wildlife Institute of India / Odisha Forest Dept.',
    title: 'Olive Ridley mass nesting (arribada) monitoring, Gahirmatha & Rushikulya',
    url: 'https://wii.gov.in/',
    tier: 'official',
  },
}

export type SourceKey = keyof typeof SOURCES

/** A single labelled, cited claim. The atom the whole site is built from. */
export interface Claim {
  text: string
  confidence: Confidence
  cite: SourceKey[]
  /** Shown when confidence !== 'verified' — explains exactly what is uncertain. */
  caveat?: string
}
