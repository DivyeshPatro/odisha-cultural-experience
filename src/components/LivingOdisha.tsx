import { useLanguage } from '../context/LanguageContext'
import { usePassport } from '../hooks/usePassport'

interface Person {
  id: string
  roleEn: string
  roleOr: string
  nameEn: string
  nameOr: string
  locationEn: string
  locationOr: string
  storyEn: string
  storyOr: string
  accent: string
  icon?: string
}

const PEOPLE: Person[] = [
  {
    id: 'weaver',
    roleEn: 'THE MASTER WEAVER',
    roleOr: 'ମୁଖ୍ୟ ତନ୍ତୁବାୟ',
    nameEn: 'Sambalpuri Ikat Artisan',
    nameOr: 'ସମ୍ବଲପୁରୀ ଇକତ ଶିଳ୍ପୀ',
    locationEn: 'Bargarh & Sonepur',
    locationOr: 'ବରଗଡ଼ ଓ ସୋନପୁର',
    storyEn: 'Counting exact threads before dyeing, transforming mathematical precision into living silk and cotton patterns.',
    storyOr: 'ବୁଣା ହେବା ପୂର୍ବରୁ ସୂତାରେ ମାପି ଗଣ୍ଠି ଦେଇ ସୁନ୍ଦର ଇକତ ନକ୍ସା ପ୍ରସ୍ତୁତ କରନ୍ତି।',
    accent: '#e0a548',
    icon: '🧵',
  },
  {
    id: 'dancer',
    roleEn: 'THE ODISSI DANCER',
    roleOr: 'ଓଡ଼ିଶୀ ନୃତ୍ୟାଙ୍ଗନା',
    nameEn: 'Devotional Sculptural Movement',
    nameOr: 'ଭକ୍ତିରସାତ୍ମକ ନୃତ୍ୟ',
    locationEn: 'Puri & Bhubaneswar',
    locationOr: 'ପୁରୀ ଓ ଭୁବନେଶ୍ୱର',
    storyEn: 'Translating ancient temple relief sculptures into fluid Tribhanga postures and intricate Mahari gestures.',
    storyOr: 'ମନ୍ଦିର ଗାତ୍ରର ଶିଳ୍ପମୂର୍ତ୍ତିକୁ ତ୍ରିଭଙ୍ଗୀ ଠାଣି ଓ ଭାବପୂର୍ଣ୍ଣ ମୁଦ୍ରାରେ ଜୀବନ୍ତ କରନ୍ତି।',
    accent: '#b8362b',
  },
  {
    id: 'cook',
    roleEn: 'THE HERITAGE COOK',
    roleOr: 'ସେବାୟତ ସୂପକାର',
    nameEn: 'Ananda Bazar Mahaprasad Custodian',
    nameOr: 'ଆନନ୍ଦ ବଜାର ମହାପ୍ରସାଦ',
    locationEn: 'Jagannath Temple, Puri',
    locationOr: 'ଶ୍ରୀମନ୍ଦିର, ପୁରୀ',
    storyEn: 'Baking 56 sacred dishes in earthen pots stacked seven-high over wood fires, preserving ancient culinary rites.',
    storyOr: 'ସାତଟି ମାଟି କୁଡୁଆ ଉପରକୁ ଉପର ରଖି କାଠ ନିଆଁରେ ୫୬ ଭୋଗ ପ୍ରସ୍ତୁତ କରନ୍ତି।',
    accent: '#e0a548',
  },
  {
    id: 'guardian',
    roleEn: 'THE FOREST & SEA GUARDIAN',
    roleOr: 'ପ୍ରକୃତି ରକ୍ଷକ',
    nameEn: 'Gahirmatha Turtle Protector',
    nameOr: 'ଗହିରମଥା କୂର୍ମ ସୁରକ୍ଷାକାରୀ',
    locationEn: 'Gahirmatha & Chilika',
    locationOr: 'ଗହିରମଥା ଓ ଚିଲିକା',
    storyEn: 'Patrolling coastal nesting beaches night after night to protect half a million nesting Olive Ridley sea turtles.',
    storyOr: 'ରାତି ତମାମ ସମୁଦ୍ର କୂଳରେ ଜଗି ରହି ଲକ୍ଷ ଲକ୍ଷ ସାମୁଦ୍ରିକ କୂର୍ମଙ୍କୁ ସୁରକ୍ଷା ଦିଅନ୍ତି।',
    accent: '#2f8f86',
  },
  {
    id: 'scientist',
    roleEn: 'THE MODERN SCIENTIST',
    roleOr: 'ଆଧୁନିକ ବୈଜ୍ଞାନିକ',
    nameEn: 'Space & Metallurgy Researcher',
    nameOr: 'ମହାକାଶ ଓ ଧାତୁବିଦ୍ୟା ଗବେଷକ',
    locationEn: 'Bhubaneswar & NISER',
    locationOr: 'ଭୁବନେଶ୍ୱର',
    storyEn: 'Advancing satellite technology and advanced alloy engineering from Odisha’s premier research institutes.',
    storyOr: 'ଉଚ୍ଚ ଗବେଷଣା ପ୍ରତିଷ୍ଠାନରୁ ମହାକାଶ ଏବଂ ଧାତୁବିଦ୍ୟାରେ ନୂତନ ଜ୍ଞାନକୌଶଳ ବିକାଶ।',
    accent: '#ff9933',
  },
]

export function LivingOdisha() {
  const { t } = useLanguage()
  const { discover } = usePassport()

  const handleSelectPerson = (id: string) => {
    discover(id)
  }

  return (
    <div className="living-people">
      <div className="living-people__head">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
          <span className="eyebrow">{t('LIVING ODISHA', 'ଜୀବନ୍ତ ଓଡ଼ିଶା')}</span>
          <span className="chip" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem', minHeight: 'auto', opacity: 0.85 }}>
            {t('Cultural Archetypes', 'ପ୍ରତିନିଧିମୂଳକ ବ୍ୟକ୍ତିତ୍ୱ')}
          </span>
        </div>
        <h3>{t('The People Behind the Culture', 'କଳା ଓ ସଂସ୍କୃତିର ଜୀବନ୍ତ କାରିଗର')}</h3>
        <p className="living-people__lede">
          {t(
            'Odisha is not only cut in ancient stone—it lives today in the hands, voices, and dedication of its artisans, dancers, cooks, guardians, and scientists.',
            'ଓଡ଼ିଶା କେବଳ ପ୍ରାଚୀନ ପାଷାଣରେ ସୀମିତ ନୁହେଁ—ଏହା ଆଜି ବି ଶିଳ୍ପୀ, ନୃତ୍ୟଶିଳ୍ପୀ, ସୂପକାର, ରକ୍ଷକ ଏବଂ ବୈଜ୍ଞାନିକଙ୍କ ହାତରେ ଜୀବନ୍ତ।',
          )}
        </p>
      </div>

      <div className="living-people__grid">
        {PEOPLE.map((p) => (
          <div
            key={p.id}
            className="person-card card"
            style={{ '--p-accent': p.accent } as React.CSSProperties}
            onClick={() => handleSelectPerson(p.id)}
          >
            <div className="person-card__icon">{p.icon}</div>
            <span className="person-card__role">{t(p.roleEn, p.roleOr)}</span>
            <h4 className="person-card__name">{t(p.nameEn, p.nameOr)}</h4>
            <p className="person-card__loc">📍 {t(p.locationEn, p.locationOr)}</p>
            <p className="person-card__story">{t(p.storyEn, p.storyOr)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
