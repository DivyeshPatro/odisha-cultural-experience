import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { SourceTag } from '../components/SourceTag'
import {
  RESILIENCE_HONESTY,
  RESILIENCE_STEPS,
  RESILIENCE_THESIS,
  UN_RECOGNITION_NOTE,
} from '../data/resilience'

const TONE_LABEL: Record<string, string> = {
  loss: 'The cost',
  learning: 'The decision',
  system: 'The machinery',
  proof: 'The test',
}

export function ResilienceSection() {
  return (
    <section id="resilience" className="section section--deep resil" aria-labelledby="resil-title">
      {/* A cyclone spiral, very faint, behind the whole chapter. */}
      <svg className="resil__spiral" viewBox="-200 -200 400 400" aria-hidden="true" focusable="false">
        {[0, 120, 240].map((rot) => (
          <path
            key={rot}
            transform={`rotate(${rot})`}
            d="M0 0 C 40 -10, 78 -46, 88 -96 C 96 -140, 74 -178, 30 -190"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        ))}
        <circle r="16" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>

      <div className="wrap">
        <SectionHeader
          numeral="X"
          eyebrow="Odisha's superpower"
          title={<span id="resil-title">It learned. That is the whole story.</span>}
          lede={RESILIENCE_THESIS}
        />

        <ol className="resil__track">
          {RESILIENCE_STEPS.map((s, i) => (
            <Reveal as="li" key={s.id} delay={i * 60} className={`rstep rstep--${s.tone}`}>
              <div className="rstep__spine" aria-hidden="true">
                <span className="rstep__node" />
              </div>
              <div className="rstep__card card">
                <p className="rstep__tone">{TONE_LABEL[s.tone]}</p>
                <p className="rstep__year">{s.year}</p>
                <h3 className="rstep__title">{s.title}</h3>
                {s.figure && (
                  <p className="rstep__figure">
                    <strong>{s.figure}</strong>
                    <span>{s.figureLabel}</span>
                  </p>
                )}
                <p className="rstep__body">{s.body}</p>
                <SourceTag cite={s.cite} confidence={s.confidence} caveat={s.caveat} />
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="resil__foot">
          <Reveal className="resil__honesty">
            <h3>What has not been solved</h3>
            <p>{RESILIENCE_HONESTY.text}</p>
            <SourceTag cite={RESILIENCE_HONESTY.cite} confidence={RESILIENCE_HONESTY.confidence} />
          </Reveal>

          <Reveal className="resil__un" delay={80}>
            <h3>About the phrase “UN-recognised”</h3>
            <p>{UN_RECOGNITION_NOTE.text}</p>
            <SourceTag
              cite={UN_RECOGNITION_NOTE.cite}
              confidence={UN_RECOGNITION_NOTE.confidence}
              caveat={UN_RECOGNITION_NOTE.caveat}
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
