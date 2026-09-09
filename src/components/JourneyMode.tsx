import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { scrollToId } from '../utils/scroll'

interface JourneyModeProps {
  isOpen: boolean
  onClose: () => void
  onStrikeBell?: () => void
}

const JOURNEY_STEPS = [
  {
    chapterId: 'sixty',
    titleEn: 'The Eastern Threshold',
    titleOr: 'ପୂର୍ବ ଦିଗନ୍ତ',
    timeEst: '00:45',
    textEn: 'Odisha faces the Bay of Bengal between Bengal and Andhra Pradesh: 480 km of coast, river deltas, and the ancient Eastern Ghats.',
    textOr: 'ଓଡ଼ିଶା ବଙ୍ଗୋପସାଗର କୂଳରେ ଅବସ୍ଥିତ: ୪୮୦ କିମି ସମୁଦ୍ର ତଟ, ନଦୀ ଉପତ୍ୟକା, ଏବଂ ପ୍ରାଚୀନ ପୂର୍ବଘାଟ ପର୍ବତମାଳା।',
    accent: '#e0a548',
  },
  {
    chapterId: 'wheel',
    titleEn: 'Where Stone Keeps Time',
    titleOr: 'ପାଷାଣରେ ସମୟ',
    timeEst: '01:30',
    textEn: 'At Konark, 24 carved stone wheels turn with the sun. Each spoke measures the Praharas of day and night in stone.',
    textOr: 'କୋଣାର୍କରେ ୨୪ଟି ଖୋଦିତ ପାଷାଣ ଚକ ସୂର୍ଯ୍ୟଙ୍କ ଗତି ସହ ଘୂରୁଛି। ପ୍ରତି ଅର ଦିନ ଓ ରାତିର ପ୍ରହର ମାପିଥାଏ।',
    accent: '#e0a548',
  },
  {
    chapterId: 'heritage',
    titleEn: 'Nine Centuries of Kalinga Architecture',
    titleOr: 'କଳିଙ୍ଗ ସ୍ଥାପତ୍ୟ',
    timeEst: '02:45',
    textEn: 'From Ashoka’s Dhauli rock edicts (261 BCE) to the towering spires of Lingaraj and Konark—stone became sacred story.',
    textOr: 'ଧାଉଳିର ଅଶୋକ ଶିଳାଲେଖଠାରୁ ଲିଙ୍ଗରାଜ ଓ କୋଣାର୍କର ଚୂଡ଼ା ପର୍ଯ୍ୟନ୍ତ—ପାଷାଣରେ ଲେଖାହେଲା ପବିତ୍ର ଗାଥା।',
    accent: '#f7d18a',
  },
  {
    chapterId: 'faith',
    titleEn: 'The Living Chariots of Puri',
    titleOr: 'ରଥଯାତ୍ରା',
    timeEst: '03:50',
    textEn: 'Every year at Rath Yatra, three massive wooden chariots are built anew from raw timber and pulled by hand along the Bada Danda.',
    textOr: 'ପ୍ରତିବର୍ଷ ରଥଯାତ୍ରାରେ ତିନୋଟି ବିଶାଳ କାଷ୍ଠ ରଥ ନୂତନ ଭାବେ ନିର୍ମିତ ହୋଇ ବଡ଼ଦାଣ୍ଡରେ ଟଣାଯାଏ।',
    accent: '#b8362b',
  },
  {
    chapterId: 'culture',
    titleEn: 'Pattachitra & Living Traditions',
    titleOr: 'ପଟ୍ଟଚିତ୍ର ଓ ଲୋକକଳା',
    textEn: 'Palm-leaf engraving, Sambalpuri Ikat weaving, and Cuttack silver filigree—crafts passed hand to hand across generations.',
    textOr: 'ତାଳପତ୍ର ଖୋଦେଇ, ସମ୍ବଲପୁରୀ ଇକତ ବୁଣା ଏବଂ କଟକୀ ତାରକାସି—ପିଢ଼ି ପିଢ଼ି ଧରି ବଞ୍ଚିରହିଥିବା କଳା।',
    accent: '#2b4a7a',
  },
  {
    chapterId: 'food',
    titleEn: 'The Sacred Kitchen & Cooling Rice',
    titleOr: 'ଓଡ଼ିଆ ଆହାର',
    textEn: 'From temple Mahaprasad baked in earthen pots to fermented Pakhala Bhata on warm summer afternoons—pure, earth-bound flavor.',
    textOr: 'ମାଟି ପାତ୍ରରେ ସିଦ୍ଧ ମହାପ୍ରସାଦଠାରୁ ଗ୍ରୀଷ୍ମ ଦିନର ପଖାଳ ଭାତ ପର୍ଯ୍ୟନ୍ତ—ଶୁଦ୍ଧ ଦେଶୀ ସ୍ୱାଦ।',
    accent: '#e0a548',
  },
  {
    chapterId: 'heroes',
    titleEn: 'The Paika Rising of 1817',
    titleOr: 'ପାଇକ ବିଦ୍ରୋହ',
    textEn: 'Four decades before 1857, Bakshi Jagabandhu led Odisha’s Paika warriors against British rule in one of India’s earliest armed rebellions.',
    textOr: '୧୮୫୭ ପୂର୍ବରୁ ବକ୍ସି ଜଗବନ୍ଧୁଙ୍କ ନେତୃତ୍ୱରେ ପାଇକ ବୀରମାନେ ବ୍ରିଟିଶ ଶାସନ ବିରୋଧରେ ସଂଗ୍ରାମ କରିଥିଲେ।',
    accent: '#b8362b',
  },
  {
    chapterId: 'nature',
    titleEn: 'Half a Million Turtles at Gahirmatha',
    titleOr: 'ଗହିରମଥାର ସାମୁଦ୍ରିକ କୂର୍ମ',
    textEn: 'Chilika Lagoon’s dolphins and Gahirmatha’s beaches—where hundreds of thousands of Olive Ridley sea turtles arrive each night.',
    textOr: 'ଚିଲିକାର ଇରାବତୀ ଡଲଫିନ୍‌ ଏବଂ ଗହିରମଥା କୂଳରେ ଲକ୍ଷ ଲକ୍ଷ ଅଲିଭ୍‌ ରିଡ୍‌ଲେ କୂର୍ମଙ୍କ ଆଗମନ।',
    accent: '#2f8f86',
  },
  {
    chapterId: 'resilience',
    titleEn: 'A Cyclone Model for the World',
    titleOr: 'ବିପର୍ଯ୍ୟୟ ପରିଚାଳନା',
    textEn: 'From the 1999 Super Cyclone to evacuating 1.2 million people before Cyclone Fani in 2019—Odisha turned vulnerability into strength.',
    textOr: '୧୯୯୯ ମହାବାତ୍ୟାରୁ ଶିକ୍ଷାଲାଭ କରି ୨୦୧୯ ଫଣୀ ପୂର୍ବରୁ ୧୨ ଲକ୍ଷ ଲୋକଙ୍କୁ ନିରାପଦ ସ୍ଥାନକୁ ସ୍ଥାନାନ୍ତର କରି ବିଶ୍ୱରେ ଉଦାହରଣ ସୃଷ୍ଟି।',
    accent: '#5fb8ad',
  },
  {
    chapterId: 'modern',
    titleEn: 'Steel, Space & The Future',
    titleOr: 'ଆଧୁନିକ ଓଡ଼ିଶା',
    textEn: 'India’s metallurgical heartland, Paradip’s deepwater port, national scientific institutes, and global sports leadership.',
    textOr: 'ଭାରତର ଇସ୍ପାତ ପ୍ରାଣକେନ୍ଦ୍ର, ପାରାଦ୍ୱୀପ ବନ୍ଦର, ବୈଜ୍ଞାନିକ ଗବେଷଣା ଏବଂ ହକି ଖେଳର ନେତୃତ୍ୱ।',
    accent: '#ff9933',
  },
]

export function JourneyMode({ isOpen, onClose, onStrikeBell }: JourneyModeProps) {
  const [stepIndex, setStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const { t } = useLanguage()

  const current = JOURNEY_STEPS[stepIndex]

  useEffect(() => {
    if (!isOpen || !isPlaying) return
    const timer = window.setInterval(() => {
      setStepIndex((prev) => {
        if (prev < JOURNEY_STEPS.length - 1) return prev + 1
        setIsPlaying(false)
        return prev
      })
    }, 12000)
    return () => window.clearInterval(timer)
  }, [isOpen, isPlaying, stepIndex])

  if (!isOpen) return null

  const handleNext = () => {
    if (stepIndex < JOURNEY_STEPS.length - 1) {
      setStepIndex(stepIndex + 1)
      onStrikeBell?.()
    }
  }

  const handlePrev = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1)
    }
  }

  const handleJumpToSection = () => {
    onClose()
    scrollToId(current.chapterId)
  }

  return (
    <div className="journey-modal" role="dialog" aria-modal="true" aria-label="Guided Exhibition Journey">
      <div className="journey-modal__scrim" onClick={onClose} />
      <div className="journey-modal__panel" style={{ '--j-accent': current.accent } as React.CSSProperties}>
        <header className="journey-modal__head">
          <div className="journey-modal__kicker">
            <span className="journey-modal__badge">JOURNEY MODE</span>
            <span>CHAPTER {String(stepIndex + 1).padStart(2, '0')} / {String(JOURNEY_STEPS.length).padStart(2, '0')}</span>
          </div>
          <button className="journey-modal__close" type="button" onClick={onClose} aria-label="Exit Journey Mode">
            ✕
          </button>
        </header>

        <div className="journey-modal__body">
          <h2 className="journey-modal__title">{t(current.titleEn, current.titleOr)}</h2>
          <p className="journey-modal__text">{t(current.textEn, current.textOr)}</p>
        </div>

        <div className="journey-modal__progress-bar">
          <div
            className="journey-modal__progress-fill"
            style={{ width: `${((stepIndex + 1) / JOURNEY_STEPS.length) * 100}%` }}
          />
        </div>

        <footer className="journey-modal__foot">
          <div className="journey-modal__nav">
            <button type="button" onClick={handlePrev} disabled={stepIndex === 0} className="journey-btn">
              ← Prev
            </button>
            <button type="button" onClick={() => setIsPlaying(!isPlaying)} className="journey-btn journey-btn--play">
              {isPlaying ? '⏸ Pause' : '▶ Play'}
            </button>
            <button type="button" onClick={handleNext} disabled={stepIndex === JOURNEY_STEPS.length - 1} className="journey-btn">
              Next →
            </button>
          </div>
          <button type="button" onClick={handleJumpToSection} className="journey-btn journey-btn--gold">
            Explore Section ↓
          </button>
        </footer>
      </div>
    </div>
  )
}
