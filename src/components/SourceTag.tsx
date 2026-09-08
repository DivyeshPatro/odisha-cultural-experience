import { SOURCES, type Confidence, type SourceKey } from '../data/sources'

interface Props {
  cite: SourceKey[]
  confidence: Confidence
  caveat?: string
  align?: 'left' | 'right'
}

const LABEL: Record<Confidence, string> = {
  verified: 'Verified',
  interpretation: 'Interpretation',
  contested: 'Figures differ',
}

/**
 * The credibility affordance. A `<details>` element, so keyboard and
 * screen-reader behaviour is native and correct with no ARIA at all —
 * and so the caveat is real text in the document rather than a tooltip
 * that only exists on hover.
 */
export function SourceTag({ cite, confidence, caveat, align = 'left' }: Props) {
  const sources = cite.map((k) => SOURCES[k]).filter(Boolean)

  return (
    <details className={`srctag srctag--${confidence} srctag--${align}`}>
      <summary>
        <span className="srctag__dot" aria-hidden="true" />
        <span>{LABEL[confidence]}</span>
        <span className="srctag__count">{sources.length} source{sources.length === 1 ? '' : 's'}</span>
      </summary>
      <div className="srctag__body">
        {caveat && <p className="srctag__caveat">{caveat}</p>}
        <ul className="srctag__list">
          {sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                <span className={`srctag__tier srctag__tier--${s.tier}`}>{s.tier}</span>
                <span>
                  <strong>{s.org}</strong> — {s.title}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </details>
  )
}
