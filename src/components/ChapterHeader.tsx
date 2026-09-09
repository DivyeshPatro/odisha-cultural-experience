import { useLanguage } from '../context/LanguageContext'

interface ChapterHeaderProps {
  numeral: string
  numberStr: string
  titleEn: string
  titleOr: string
  prologueEn: string
  prologueOr: string
  accentColor?: string
}

export function ChapterHeader({
  numeral,
  numberStr,
  titleEn,
  titleOr,
  prologueEn,
  prologueOr,
  accentColor = 'var(--gold)',
}: ChapterHeaderProps) {
  const { t } = useLanguage()

  return (
    <div className="chaphead" style={{ '--chap-accent': accentColor } as React.CSSProperties}>
      <div className="chaphead__meta">
        <span className="chaphead__num">CHAPTER {numberStr}</span>
        <span className="chaphead__roman">{numeral}</span>
      </div>
      <h2 className="chaphead__title">
        {t(titleEn, titleOr)}
      </h2>
      <p className="chaphead__prologue">
        {t(prologueEn, prologueOr)}
      </p>
      <div className="chaphead__rule" aria-hidden="true" />
    </div>
  )
}
