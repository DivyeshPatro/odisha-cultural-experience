import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { usePassport } from '../hooks/usePassport'

interface Question {
  id: string
  questionEn: string
  questionOr: string
  options: { textEn: string; textOr: string; correct?: boolean }[]
  explanationEn: string
  explanationOr: string
  passportKey: string
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 'q1',
    questionEn: 'How many carved stone wheels are on the Konark Sun Temple chariot?',
    questionOr: 'କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିର ରଥରେ କେତୋଟି ଖୋଦିତ ପାଷାଣ ଚକ ଅଛି?',
    options: [
      { textEn: '12 wheels', textOr: '୧୨ଟି ଚକ' },
      { textEn: '18 wheels', textOr: '୧୮ଟି ଚକ' },
      { textEn: '24 wheels', textOr: '୨୪ଟି ଚକ', correct: true },
      { textEn: '32 wheels', textOr: '୩୨ଟି ଚକ' },
    ],
    explanationEn: 'The 24 wheels represent the 24 hours of the day (and 12 pairs of months), acting as ancient solar sundials.',
    explanationOr: '୨୪ଟି ଚକ ଦିନର ୨୪ ଘଣ୍ଟା ଏବଂ ୧୨ ଯୋଡ଼ା ମାସର ସୂଚକ ଭାବେ ସୂର୍ଯ୍ୟ ଘଡ଼ି କାର୍ଯ୍ୟ କରେ।',
    passportKey: 'quiz',
  },
  {
    id: 'q2',
    questionEn: 'Which coastal sanctuary in Odisha is the world’s largest mass nesting site for Olive Ridley turtles?',
    questionOr: 'ଓଡ଼ିଶାର କେଉଁ ସମୁଦ୍ର କୂଳ ଅଲିଭ୍‌ ରିଡ୍‌ଲେ କୂର୍ମଙ୍କ ବିଶ୍ୱର ବୃହତ୍ତମ ଗଣ ଅଣ୍ଡାଦାନ ସ୍ଥଳ?',
    options: [
      { textEn: 'Chilika Lagoon', textOr: 'ଚିଲିକା ହ୍ରଦ' },
      { textEn: 'Gahirmatha Marine Sanctuary', textOr: 'ଗହିରମଥା ସାମୁଦ୍ରିକ ଅଭୟାରଣ୍ୟ', correct: true },
      { textEn: 'Similipal Reserve', textOr: 'ଶିମିଳିପାଳ ଅଭୟାରଣ୍ୟ' },
      { textEn: 'Bhitarkanika', textOr: 'ଭିତରକନିକା' },
    ],
    explanationEn: 'Gahirmatha hosts hundreds of thousands of Olive Ridley turtles every year during their mass nesting phenomenon (Arribada).',
    explanationOr: 'ଗହିରମଥା କୂଳକୁ ପ୍ରତିବର୍ଷ ଲକ୍ଷ ଲକ୍ଷ ଅଲିଭ୍‌ ରିଡ୍‌ଲେ କୂର୍ମ ଅଣ୍ଡାଦାନ ପାଇଁ ଆସନ୍ତି।',
    passportKey: 'gahirmatha',
  },
  {
    id: 'q3',
    questionEn: 'What year did Odisha become India’s first province formed on a linguistic basis?',
    questionOr: 'କେଉଁ ବର୍ଷ ଓଡ଼ିଶା ଭାରତର ପ୍ରଥମ ଭାଷାଭିତ୍ତିକ ପ୍ରଦେଶ ଭାବେ ଗଠିତ ହୋଇଥିଲା?',
    options: [
      { textEn: '1817', textOr: '୧୮୧୭' },
      { textEn: '1936 (1st April)', textOr: '୧୯୩୬ (୧ ଅପ୍ରେଲ)', correct: true },
      { textEn: '1947', textOr: '୧୯୪୭' },
      { textEn: '1950', textOr: '୧୯୫୦' },
    ],
    explanationEn: 'On 1 April 1936, Odisha became India’s first linguistic state—celebrated every year as Utkala Dibasa.',
    explanationOr: '୧ ଅପ୍ରେଲ ୧୯୩୬ରେ ଓଡ଼ିଶା ଭାଷାଭିତ୍ତିକ ପ୍ରଦେଶ ହେଲା, ଯାହା ଉତ୍କଳ ଦିବସ ଭାବେ ପାଳିତ।',
    passportKey: 'sixty',
  },
]

export function CulturalQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const { t } = useLanguage()
  const { discover } = usePassport()

  const q = QUIZ_QUESTIONS[currentIdx]

  const handleSelect = (idx: number) => {
    if (isAnswered) return
    setSelectedOpt(idx)
    setIsAnswered(true)
    if (q.options[idx].correct) {
      discover(q.passportKey)
      discover('quiz')
    }
  }

  const handleNext = () => {
    setSelectedOpt(null)
    setIsAnswered(false)
    setCurrentIdx((prev) => (prev + 1) % QUIZ_QUESTIONS.length)
  }

  return (
    <div className="quiz-box card">
      <div className="quiz-box__head">
        <span className="quiz-box__kicker">EXHIBITION TRIVIA</span>
        <h4>{t('Can You Read Odisha?', 'ଓଡ଼ିଶାକୁ ଚିହ୍ନିଛନ୍ତି କି?')}</h4>
      </div>

      <div className="quiz-box__question">
        <p>{t(q.questionEn, q.questionOr)}</p>
      </div>

      <div className="quiz-box__options">
        {q.options.map((opt, i) => {
          let stateClass = ''
          if (isAnswered) {
            if (opt.correct) stateClass = 'is-correct'
            else if (selectedOpt === i) stateClass = 'is-wrong'
          }
          return (
            <button
              key={i}
              type="button"
              className={`quiz-opt ${stateClass} ${selectedOpt === i ? 'is-selected' : ''}`}
              onClick={() => handleSelect(i)}
            >
              <span>{t(opt.textEn, opt.textOr)}</span>
            </button>
          )
        })}
      </div>

      {isAnswered && (
        <div className="quiz-box__explanation">
          <p>{t(q.explanationEn, q.explanationOr)}</p>
          <button type="button" className="btn btn--ghost" onClick={handleNext}>
            {t('Next Question →', 'ପରବର୍ତ୍ତୀ ପ୍ରଶ୍ନ →')}
          </button>
        </div>
      )}
    </div>
  )
}
