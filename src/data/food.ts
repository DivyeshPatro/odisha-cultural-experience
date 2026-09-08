import type { Claim, SourceKey } from './sources'

export interface Dish {
  id: string
  name: string
  odia?: string
  kind: string
  hook: string
  what: string
  ingredients: string[]
  when: string
  where: string
  cite: SourceKey[]
  confidence: Claim['confidence']
  caveat?: string
  plate: 'chhenapoda' | 'pakhala' | 'dahibara' | 'dalma' | 'manda'
  accent: string
}

export const DISHES: Dish[] = [
  {
    id: 'chhenapoda',
    name: 'Chhena Poda',
    odia: 'ଛେନା ପୋଡ଼',
    kind: 'Dessert',
    hook: 'Its name means "burnt cheese". The burning is the entire point.',
    what: 'Fresh chhena — soft, unpressed curd cheese — is kneaded with sugar and semolina, poured into a mould lined with sal leaf, and baked slowly over embers until the outside caramelises to near-black. The scorched crust against the barely-set interior is the dish. Anything paler is a different, worse dessert.',
    ingredients: ['Fresh chhena', 'Sugar', 'Semolina (sooji)', 'Cardamom', 'Cashew and raisin', 'Sal leaf'],
    when: 'Festivals, weddings, and any occasion in Odisha that requires a sweet to be taken seriously.',
    where:
      'Credited to a confectioner in Dasapalla, Nayagarh district, in the early 20th century — the story is that it began with leftover chhena left near a dying fire overnight.',
    cite: ['odisha-tourism'],
    confidence: 'contested',
    caveat:
      'The Dasapalla / Sudarshan Sahu origin story is widely and consistently reported in Indian food writing but rests on oral tradition rather than a documentary record. Presented here as attribution, not established fact.',
    plate: 'chhenapoda',
    accent: 'var(--gold-deep)',
  },
  {
    id: 'pakhala',
    name: 'Pakhala Bhata',
    odia: 'ପଖାଳ ଭାତ',
    kind: 'Everyday staple',
    hook: 'Cooked rice, left in water overnight. A whole climate strategy disguised as lunch.',
    what: 'Rice is cooked, cooled, covered in water and left — for hours, or until the next morning. It ferments lightly. It is eaten cold, with the water, and with salt, green chilli, a little curd, and fried or mashed sides: badi chura, saga bhaja, fried fish. On a 42°C afternoon in coastal Odisha, it is the correct thing to eat and nothing else comes close.',
    ingredients: ['Rice', 'Water', 'Curd (optional)', 'Green chilli', 'Curry leaf and mustard tempering', 'Salt'],
    when: 'Summer, daily. Odisha marks Pakhala Dibasa — Pakhala Day — on 20 March.',
    where:
      'Coastal and inland Odisha alike, and cousins of the dish exist across eastern India. Odisha is where it has a public holiday-adjacent identity.',
    cite: ['odisha-tourism'],
    confidence: 'verified',
    plate: 'pakhala',
    accent: 'var(--lagoon)',
  },
  {
    id: 'dahibara',
    name: 'Dahibara Aloo Dum',
    odia: 'ଦହିବରା ଆଳୁଦମ',
    kind: 'Street food',
    hook: 'Cuttack’s contribution to civilisation, sold from a bicycle-mounted pot.',
    what: 'Soft lentil fritters soaked until they collapse, drowned in thin spiced curd water, then loaded with a dark, tamarind-sharp potato curry, ghuguni, chopped onion and sev. It arrives as a single bowl of contradictory textures and is eaten standing up.',
    ingredients: ['Urad dal vada', 'Thin spiced dahi', 'Aloo dum', 'Ghuguni (white peas)', 'Tamarind', 'Sev and onion'],
    when: 'Morning to night. It is a breakfast, a snack and a dinner, depending on how the day is going.',
    where: 'Cuttack owns it outright. Bhubaneswar has excellent versions and does not claim invention.',
    cite: ['odisha-tourism'],
    confidence: 'verified',
    plate: 'dahibara',
    accent: 'var(--sindoor)',
  },
  {
    id: 'dalma',
    name: 'Dalma',
    odia: 'ଡାଲମା',
    kind: 'Everyday staple',
    hook: 'Lentils and vegetables cooked together in one pot, with no onion and no garlic.',
    what: 'Toor or moong dal is boiled with raw banana, pumpkin, papaya, yam and brinjal, then finished with a tempering of panch phutana, dried red chilli and — crucially — grated coconut and a pinch of roasted cumin. No onion, no garlic. That restraint is what makes it temple food, and it is also why it tastes clean rather than thin.',
    ingredients: ['Toor or moong dal', 'Raw banana, pumpkin, yam, brinjal', 'Panch phutana', 'Grated coconut', 'Ghee'],
    when: 'Daily, and as part of the mahaprasad offered at the Jagannath temple.',
    where: 'Statewide. It is the dish an Odia household will make when someone is unwell, and when someone is celebrating.',
    cite: ['odisha-tourism'],
    confidence: 'verified',
    plate: 'dalma',
    accent: 'var(--leaf)',
  },
  {
    id: 'manda',
    name: 'Manda Pitha',
    odia: 'ମଣ୍ଡା ପିଠା',
    kind: 'Festival sweet',
    hook: 'Steamed rice-flour dumplings, filled with coconut and jaggery, shaped by hand.',
    what: 'A soft rice-flour casing is shaped into a dome by hand, filled with coconut cooked down with jaggery and cardamom, sealed and steamed. Pitha is a whole category in Odisha — chakuli, arisa, kakara, poda — and manda is the one made when the festival matters.',
    ingredients: ['Rice flour', 'Grated coconut', 'Jaggery', 'Cardamom', 'Ghee'],
    when: 'Manabasa Gurubara, Prathamastami, Raja and Ganesh Chaturthi.',
    where: 'Made at home rather than bought. That is part of its meaning.',
    cite: ['odisha-tourism'],
    confidence: 'verified',
    plate: 'manda',
    accent: 'var(--terracotta)',
  },
]

export const FOOD_INTRO =
  'Odia food is not the Indian food you have eaten. Very little chilli heat, almost no cream, mustard and panch phutana instead of garam masala, and a genuine reverence for the fermented and the cold. It is the cuisine of a hot, wet, rice-growing coast — and it was shaped by a temple kitchen that has been cooking at scale for centuries.'

export const MAHAPRASAD_NOTE: Claim = {
  text: 'The mahaprasad of the Jagannath temple is cooked in stacked earthen pots over wood fire, and the food is treated as consecrated. Odia domestic cooking — no onion, no garlic in a whole class of dishes, heavy use of the steam-and-stack method — carries the temple kitchen’s fingerprints into ordinary homes.',
  confidence: 'verified',
  cite: ['odisha-tourism', 'rathjatra-nic'],
}
