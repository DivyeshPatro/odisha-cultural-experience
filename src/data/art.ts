import type { Claim, SourceKey } from './sources'

export interface ArtForm {
  id: string
  name: string
  odia?: string
  kind: 'Dance' | 'Painting' | 'Textile' | 'Craft'
  hook: string
  origin: string
  why: string
  today: string
  cite: SourceKey[]
  confidence: Claim['confidence']
  caveat?: string
  /** Which bespoke SVG plate illustrates this form. */
  plate: 'odissi' | 'pattachitra' | 'saura' | 'sambalpuri' | 'talapatra' | 'filigree'
  accent: string
}

export const ART_FORMS: ArtForm[] = [
  {
    id: 'odissi',
    name: 'Odissi',
    odia: 'ଓଡ଼ିଶୀ',
    kind: 'Dance',
    hook: 'The dance was already carved into the temple walls before it was written down.',
    origin:
      'Odissi is one of the classical dance forms of India recognised by the Sangeet Natak Akademi. Its lineage runs through the maharis — women who danced in the Jagannath temple — and the gotipuas, boys trained to dance in female costume outside it. The form as performed today was reconstructed and codified through the 1950s by a generation of gurus, working from temple sculpture, palm-leaf treatises and surviving practice.',
    why: 'Its signature is the tribhanga — the body broken into three bends at neck, torso and knee. You can find that exact stance held in stone on the walls of Konark and the Bhubaneswar temples. The sculpture and the dance are the same grammar in two materials.',
    today:
      'Taught worldwide. Kelucharan Mohapatra, one of the gurus central to its revival, received the first Sangeet Natak Akademi Award for Odissi in 1966.',
    cite: ['sna', 'orissa-review'],
    confidence: 'verified',
    caveat:
      'Odissi’s continuity with ancient temple dance is well supported by sculpture and text, but the repertoire performed today is a mid-20th-century reconstruction. That reconstruction is a documented historical event, not a weakness — and it is stated here rather than glossed over.',
    plate: 'odissi',
    accent: 'var(--sindoor)',
  },
  {
    id: 'pattachitra',
    name: 'Pattachitra',
    odia: 'ପଟ୍ଟଚିତ୍ର',
    kind: 'Painting',
    hook: 'Cloth, tamarind glue, stone and shell for colour. No pencil, no outline, no correction.',
    origin:
      'Patta means cloth, chitra means picture. The painter prepares the surface himself: layers of cloth bonded with tamarind-seed paste and chalk, then burnished with a stone until it takes a line. Pigments are mineral and organic — conch white, lamp black, hingula red, haritala yellow. The subjects are overwhelmingly Jagannath, Krishna and the epics. Odisha Pattachitra holds a registered Geographical Indication.',
    why: 'The painter starts with the brush. There is no under-drawing to correct against. Every border — and the borders are dense, floral, unbroken — is committed on the first pass.',
    today:
      'Raghurajpur, a village near Puri, is a designated heritage crafts village where nearly every household paints. It functions as a working settlement, not a museum.',
    cite: ['gi-registry', 'odisha-tourism'],
    confidence: 'verified',
    plate: 'pattachitra',
    accent: 'var(--gold)',
  },
  {
    id: 'saura',
    name: 'Saura Painting',
    kind: 'Painting',
    hook: 'Painted on a mud wall, for a birth or a harvest, and not intended to be sold.',
    origin:
      'The Saura are an Adivasi community of southern Odisha — Rayagada, Gajapati, Ganjam, Koraput. Their wall paintings, called iditals, are made for specific occasions: a birth, a marriage, a harvest, a new house. Stick-figure humans, animals, trees and houses fill a bordered field, drawn inward from the frame.',
    why: 'It is ritual before it is art. The idital is made to be efficacious, addressed to ancestors and deities. That it is also visually extraordinary is, from inside the tradition, beside the point.',
    today:
      'Saura motifs now appear on textiles, stationery and walls far outside Odisha. Attribution and fair payment to Saura artists is a live issue in Indian craft policy, and worth naming.',
    cite: ['odisha-tourism', 'orissa-review'],
    confidence: 'verified',
    plate: 'saura',
    accent: 'var(--terracotta)',
  },
  {
    id: 'sambalpuri',
    name: 'Sambalpuri Bandha',
    kind: 'Textile',
    hook: 'The pattern is dyed into the thread before a single thread is woven.',
    origin:
      'Bandha is Odisha’s tie-dye resist technique — internationally called ikat. Warp and weft yarns are tied and dyed to a plan, then woven so the dyed segments meet and resolve into the motif on the loom. It is worked in Sambalpur, Bargarh, Balangir, Boudh and Sonepur. Sambalpuri Bandha holds a registered Geographical Indication.',
    why: 'The weaver has to hold the finished image in their head and work backwards to where each colour must sit on an untied thread. The characteristic slight feathering at the edge of every motif is the signature of the method — it cannot be faked by printing, and printed imitations are exactly why the GI exists.',
    today:
      'Sambalpuri saris are worn across India. Handloom cooperatives in western Odisha remain among the state’s largest non-farm rural employers.',
    cite: ['gi-registry', 'odisha-tourism'],
    confidence: 'verified',
    plate: 'sambalpuri',
    accent: 'var(--indigo)',
  },
  {
    id: 'talapatra',
    name: 'Talapatra Chitra',
    kind: 'Craft',
    hook: 'Engraved into a palm leaf with an iron stylus, then rubbed with soot to make the line appear.',
    origin:
      'Tala is palm, patra is leaf. Odisha’s manuscript tradition wrote and drew on cured palm leaves with an iron stylus; the incised line is invisible until soot or charcoal paste is rubbed across the surface and wiped away. Leaves are stitched into folding panels. Entire epics survive this way.',
    why: 'You are looking at India’s pre-paper information technology. Palm-leaf manuscripts kept Odia literature, astronomy, medicine and the Jagannath ritual calendar intact for centuries in a climate that destroys paper.',
    today:
      'Practised commercially at Raghurajpur and Puri, and pursued seriously as a conservation problem — digitising and stabilising surviving manuscript collections is ongoing work.',
    cite: ['odisha-tourism', 'orissa-review'],
    confidence: 'verified',
    plate: 'talapatra',
    accent: 'var(--leaf)',
  },
  {
    id: 'filigree',
    name: 'Rupa Tarakasi',
    kind: 'Craft',
    hook: 'Silver drawn into wire finer than thread, then coiled into a whole object.',
    origin:
      'Cuttack’s silver filigree. Tara means wire, kasi means work. Silver is drawn down to hair-fine wire and then bent, coiled and soldered into a structure that is mostly air. It is used for jewellery, for ceremonial objects, and famously for the enormous silver backdrops built for Cuttack’s Durga Puja pandals.',
    why: 'It holds a Geographical Indication tag — a legal recognition that this technique belongs to this city. There are perhaps a few thousand people alive who can do it at the top level.',
    today:
      'Under real pressure from machine-made imitation. The GI is a defensive instrument, and buying from Cuttack workshops directly is the practical version of caring about it.',
    cite: ['gi-registry'],
    confidence: 'verified',
    plate: 'filigree',
    accent: 'var(--parchment-dim)',
  },
]

export const ART_INTRO =
  'Odisha does not have a folk-art scene. It has an unbroken production line that has been running for centuries and is still running — in villages you can drive to this afternoon, in houses where the person painting learned it from the person who taught the person who taught them.'
