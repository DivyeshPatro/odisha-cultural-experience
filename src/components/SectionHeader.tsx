import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { LotusMark } from './Motifs'

interface Props {
  numeral: string
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
  align?: 'left' | 'center'
}

export function SectionHeader({ numeral, eyebrow, title, lede, align = 'left' }: Props) {
  return (
    <header className={`sechead sechead--${align}`}>
      <Reveal>
        <p className="sechead__eyebrow">
          <LotusMark size={14} />
          <span className="sechead__numeral">{numeral}</span>
          <span>{eyebrow}</span>
        </p>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="sechead__title">{title}</h2>
      </Reveal>
      {lede && (
        <Reveal delay={150}>
          <p className="sechead__lede">{lede}</p>
        </Reveal>
      )}
    </header>
  )
}
