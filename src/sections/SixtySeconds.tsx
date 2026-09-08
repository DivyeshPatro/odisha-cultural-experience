import { Counter } from '../components/Counter'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { SourceTag } from '../components/SourceTag'
import { HOOK_FACTS, OPENING_LINE, QUICK_FACTS } from '../data/facts'

export function SixtySeconds() {
  return (
    <section id="sixty" className="section section--tint sixty" aria-labelledby="sixty-title">
      <div className="wrap">
        <SectionHeader
          numeral="I"
          eyebrow="Odisha in 60 seconds"
          title={<span id="sixty-title">If the name is new to you, start here</span>}
          lede={OPENING_LINE}
        />

        <ul className="sixty__grid">
          {QUICK_FACTS.map((f, i) => (
            <Reveal as="li" key={f.id} delay={i * 55} className="sixty__cell">
              <p className="sixty__value">
                {f.display ? (
                  <span className={f.id === 'language' ? 'odia' : undefined}>{f.display}</span>
                ) : (
                  <Counter value={f.value!} decimals={f.decimals} prefix={f.prefix} suffix={f.suffix} />
                )}
              </p>
              <p className="sixty__label">{f.label}</p>
              <p className="sixty__note">{f.note}</p>
              <SourceTag cite={f.cite} confidence={f.confidence} caveat={f.caveat} />
            </Reveal>
          ))}
        </ul>

        <div className="sixty__hooks">
          <Reveal>
            <p className="sixty__hookslead">
              <span className="gold">Four things</span> that are true about Odisha and are not widely known
              outside it.
            </p>
          </Reveal>
          <ul className="rail sixty__hookgrid">
            {HOOK_FACTS.map((h, i) => (
              <Reveal as="li" key={h.id} delay={i * 70} className={`hook card hook--${h.tone}`}>
                <h3 className="hook__headline">{h.headline}</h3>
                <p className="hook__body">{h.body.replace(/\*/g, '')}</p>
                <SourceTag cite={h.cite} confidence={h.confidence} caveat={h.caveat} />
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
