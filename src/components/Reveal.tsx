import type { ElementType, ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

interface Props {
  children: ReactNode
  /** Stagger, in ms. Kept small — a long cascade reads as a slideshow. */
  delay?: number
  as?: ElementType
  className?: string
  id?: string
}

export function Reveal({ children, delay = 0, as: Tag = 'div', className = '', id }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`.trim()}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}
