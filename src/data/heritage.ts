import type { Claim, SourceKey } from './sources'

export interface HeritageItem {
  id: string
  name: string
  odia?: string
  place: string
  era: string
  /** One sentence, shown on the closed card. Must earn the tap. */
  hook: string
  significance: string
  /** The question the spec insisted on: why should an outsider care? */
  outsider: string
  /** A single detail that sticks. */
  detail: string
  cite: SourceKey[]
  confidence: Claim['confidence']
  caveat?: string
  art: 'konark' | 'jagannath' | 'lingaraj' | 'caves' | 'stupa' | 'fort' | 'dam' | 'sand'
}

export const HERITAGE: HeritageItem[] = [
  {
    id: 'konark',
    name: 'Konark Sun Temple',
    odia: 'କୋଣାର୍କ',
    place: 'Konark, Puri district',
    era: 'c. 1250 CE',
    hook: 'A king ordered a chariot for the sun and had it built at full scale, in stone.',
    significance:
      'Raised under Narasimhadeva I of the Eastern Ganga dynasty around 1250 CE, the temple is a monumental representation of Surya’s chariot: twenty-four carved wheels along the plinth, seven horses at the front. UNESCO inscribed it as a World Heritage Site in 1984. The main tower has collapsed; the surviving jagamohana still stands close to the sea that has been sandblasting it for eight centuries.',
    outsider:
      'It is on the back of the ₹10 note. It is the source of the wheel used in Indian tourism iconography worldwide. If you have ever seen a photograph captioned "India" that was not the Taj Mahal, there is a fair chance it was this wheel.',
    detail:
      'European sailors called it the Black Pagoda and used it as a navigation landmark — it stood dark against the coast where the white Jagannath temple at Puri stood pale.',
    cite: ['unesco-konark', 'moc-konark'],
    confidence: 'verified',
    art: 'konark',
  },
  {
    id: 'jagannath',
    name: 'Jagannath Temple, Puri',
    odia: 'ଶ୍ରୀ ମନ୍ଦିର',
    place: 'Puri',
    era: '12th century CE',
    hook: 'One of the four Char Dham. Its kitchen is among the largest in the world.',
    significance:
      'The temple of Jagannath, with his siblings Balabhadra and Subhadra, is one of the four Char Dham pilgrimage seats of Hinduism. Unlike almost every other major Indian temple, the deities are carved from wood, not stone — and are ritually renewed. The temple’s kitchen cooks the mahaprasad in earthen pots over wood fire and serves it to enormous numbers of pilgrims daily.',
    outsider:
      'The English word "juggernaut" comes from Jagannath — from European accounts of the chariot festival. The word entered English before most of Europe could find Odisha on a map.',
    detail:
      'Jagannath iconography is not a stylisation of a human form the way most temple sculpture is. The form is its own tradition — round-eyed, armless at the wrist, unmistakable. It is the single most recognisable image Odisha has given India.',
    cite: ['odisha-tourism', 'rathjatra-nic'],
    confidence: 'verified',
    art: 'jagannath',
  },
  {
    id: 'lingaraj',
    name: 'Lingaraj Temple',
    odia: 'ଲିଙ୍ଗରାଜ',
    place: 'Bhubaneswar',
    era: 'c. 1100 CE',
    hook: 'The temple that taught Konark how to stand.',
    significance:
      'Built around 1100 CE, the Lingaraj is the mature statement of the Kalinga architectural style — the towered deul over the sanctum, the pyramid-roofed jagamohana in front. Konark, raised a century and a half later, follows its architectural grammar. The temple anchors the Ekamra Kshetra precinct of Bhubaneswar, a dense cluster of stone temples spanning several centuries.',
    outsider:
      'Bhubaneswar is one of very few cities on earth where you can walk from a 7th-century temple to an 11th-century one to a 21st-century IT campus in about twenty minutes.',
    detail:
      'Kalinga architecture is one of the three great classical temple idioms of India, alongside Nagara and Dravida. Most people outside India have heard of exactly zero of them, and most people inside India have heard of two.',
    cite: ['unesco-konark', 'odisha-tourism'],
    confidence: 'verified',
    caveat:
      'Construction dates for Lingaraj are given as c. 1100 CE by most architectural surveys; earlier phases of the complex are older. Precise dating of individual structures within the precinct varies between sources.',
    art: 'lingaraj',
  },
  {
    id: 'caves',
    name: 'Udayagiri & Khandagiri Caves',
    place: 'Bhubaneswar',
    era: '2nd–1st century BCE',
    hook: 'Rock-cut cells for Jain monks — and India’s earliest royal autobiography.',
    significance:
      'Twin hills honeycombed with rock-cut cells carved for Jain ascetics. In one of them — Hathigumpha, the Elephant Cave — seventeen lines of Brahmi script in Prakrit record the reign of King Kharavela of Kalinga. It is one of the earliest autobiographical royal inscriptions in Indian history.',
    outsider:
      'Before there was a Taj Mahal, before there was a Konark, there was a king here who wrote down what he did and had it cut into a cliff so it would outlast him. It did. It is still legible.',
    detail:
      'The cells are deliberately small and low. They were not built to impress anyone. They were built for monks to sit in.',
    cite: ['orissa-review', 'odisha-tourism'],
    confidence: 'contested',
    caveat:
      'Kharavela’s reign is usually placed in the 2nd–1st century BCE, but the absolute chronology is genuinely disputed among historians; estimates for his accession range across roughly a century. The inscription itself is not in dispute — its dating is.',
    art: 'caves',
  },
  {
    id: 'dhauli',
    name: 'Dhauli & the Ashokan Edicts',
    place: 'Dhauli, near Bhubaneswar',
    era: '3rd century BCE; stupa 1972',
    hook: 'The battlefield that changed an emperor’s mind — and India’s.',
    significance:
      'Dhauli, on the Daya river, is associated with the Kalinga War fought by Ashoka around 261 BCE. Rock edicts carved here in the aftermath record an emperor turning from conquest to dhamma. On the hill above, the white Shanti Stupa — the Peace Pagoda — was built in 1972 by the Japan Buddha Sangha together with the Kalinga Nippon Buddha Sangha.',
    outsider:
      'The Ashoka Chakra at the centre of the Indian flag traces back to Ashokan pillar capitals. The emperor whose wheel India put on its flag was turned into that emperor here, on this river, by what Kalinga cost him.',
    detail:
      'The Dhauli edicts are unusual: two of the standard rock edicts are replaced with separate ones addressed specifically to the officials of the newly conquered territory, on the treatment of its people.',
    cite: ['odisha-tourism-dhauli', 'orissa-review'],
    confidence: 'verified',
    caveat:
      'The date of the Kalinga War (c. 261 BCE) is a scholarly reconstruction from Ashokan edicts and regnal years, not a recorded calendar date.',
    art: 'stupa',
  },
  {
    id: 'barabati',
    name: 'Barabati Fort',
    place: 'Cuttack',
    era: '14th century CE',
    hook: 'A moat, a gate, and the earthworks of the city that ran Odisha for six hundred years.',
    significance:
      'The fort at Cuttack, on the Mahanadi, was the seat of power for successive dynasties from the 14th century. What survives is largely the moat and the gateway; the fabric above ground is gone. Cuttack remained the capital of Odisha until Bhubaneswar was built in the 1940s.',
    outsider:
      'Cuttack is also the home of tarakasi — silver filigree so fine it is worked in drawn wire. That craft holds a Geographical Indication tag, which is India’s legal statement that this technique belongs to this place.',
    detail:
      'Cuttack’s Bali Jatra fair on the Mahanadi commemorates Odisha’s ancient maritime trade with Bali, Java and Sumatra. Kalinga’s sailors ran that route. The festival kept the memory when the ships stopped.',
    cite: ['odisha-tourism', 'gi-registry'],
    confidence: 'verified',
    art: 'fort',
  },
  {
    id: 'hirakud',
    name: 'Hirakud Dam',
    place: 'Sambalpur, on the Mahanadi',
    era: 'Inaugurated 1957',
    hook: 'Independent India’s first great river-valley project, and it was built here.',
    significance:
      'Hirakud was the first major multipurpose river-valley project undertaken by India after independence, inaugurated by Jawaharlal Nehru in January 1957. It dams the Mahanadi for flood control, irrigation and power. Counting the main dam together with its flanking dykes, the structure runs to roughly 25 km.',
    outsider:
      'This is what "temples of modern India" meant in practice. It is also a real reckoning: the reservoir submerged villages, and the displacement is part of the record, not a footnote to it.',
    detail:
      'Hirakud is often described as the longest dam in the world. That superlative depends entirely on counting the earthen dykes as part of the dam, and other structures compete on the same definition — so the site states the measured length rather than the ranking.',
    cite: ['odisha-tourism'],
    confidence: 'contested',
    caveat:
      '"Longest dam in the world" is widely repeated but definitionally unstable — it depends on whether flanking dykes count as dam. The measured length (main dam ~4.8 km; ~25 km including dykes) is the defensible statement, so that is what is used here.',
    art: 'dam',
  },
  {
    id: 'sandart',
    name: 'The Sand Art of Puri',
    place: 'Puri beach',
    era: 'Contemporary',
    hook: 'An art form that is deliberately destroyed by the tide, every single day.',
    significance:
      'Puri beach is the home of India’s best-known sand-sculpture tradition. Sudarsan Pattnaik, born in Puri in 1977, was awarded the Padma Shri in 2014 for his work in the form, and has represented India at international sand-sculpture championships.',
    outsider:
      'Odisha’s heritage is usually described as stone — permanent, eight centuries old. This is the opposite instinct from the same coast: make something extraordinary in the morning and let the sea take it by evening. Both are Odisha.',
    detail:
      'It is taught. There is a sand art institute on the Puri seafront, and school-age students train there. This is not a busker’s trick; it is a transmitted craft.',
    cite: ['padma-awards', 'odisha-tourism'],
    confidence: 'verified',
    art: 'sand',
  },
]

/* ------------------------------------------------------------------
   FAITH — Jagannath culture and the Rath Yatra.
   Kept as its own chapter rather than a heritage card, because
   reducing it to a monument would misrepresent what it is.
-------------------------------------------------------------------*/

export interface Chariot {
  name: string
  deity: string
  wheels: number
  heightFt: number
  colours: string
  meaning: string
}

export const CHARIOTS: Chariot[] = [
  {
    name: 'Nandighosa',
    deity: 'Jagannath',
    wheels: 16,
    heightFt: 45,
    colours: 'red and yellow',
    meaning: 'The tumultuous sound',
  },
  {
    name: 'Taladhwaja',
    deity: 'Balabhadra',
    wheels: 14,
    heightFt: 44,
    colours: 'red and blue',
    meaning: 'The one with the palm tree on its flag',
  },
  {
    name: 'Darpadalana',
    deity: 'Subhadra',
    wheels: 12,
    heightFt: 43,
    colours: 'red and black',
    meaning: 'Trampler of pride',
  },
]

/** The route the chariots are pulled along, once a year. */
export const RATH_ROUTE = {
  from: 'Shree Mandir',
  to: 'Gundicha Temple',
  road: 'Bada Danda — the Grand Road, Puri',
  distance: 'about 3 km',
  note: 'The chariots are pulled by hand along the Bada Danda from the Jagannath temple to the Gundicha temple, and back again nine days later. No engine is involved at any point.',
  confidence: 'verified' as const,
  cite: ['rathjatra-nic', 'odisha-tourism'] as SourceKey[],
}

export const FAITH_NOTES: Claim[] = [
  {
    text: 'The three chariots are not stored and reused. They are built from scratch every year for the festival, and dismantled after it. The wood, the carpenters’ families, the measurements — all of it is handed down.',
    confidence: 'verified',
    cite: ['rathjatra-nic'],
  },
  {
    text: 'Nandighosa, Jagannath’s chariot, stands about 45 feet tall on sixteen wheels, each roughly seven feet across. Balabhadra’s Taladhwaja has fourteen wheels, Subhadra’s Darpadalana twelve.',
    confidence: 'verified',
    cite: ['rathjatra-nic'],
  },
  {
    text: 'The English word "juggernaut" — an unstoppable force — derives from Jagannath, by way of European travellers’ accounts of the chariot procession.',
    confidence: 'verified',
    cite: ['odisha-tourism'],
  },
  {
    text: 'Jagannath worship is widely understood as a synthesis: tribal, Vaishnava, Shaiva, Buddhist and Jain strands are all identified in it by scholars. It is one of the reasons the tradition is described as distinctly Odia rather than a regional variant of something else.',
    confidence: 'interpretation',
    cite: ['orissa-review'],
    caveat:
      'The syncretic origins of Jagannath worship are a mainstream scholarly reading with a long literature, but the relative weight of each strand is actively debated. Presented as scholarly interpretation, not settled fact.',
  },
]
