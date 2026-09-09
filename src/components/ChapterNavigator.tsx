import { CHAPTERS } from '../data/nav'
import { useLanguage } from '../context/LanguageContext'
import { scrollToId } from '../utils/scroll'

interface ChapterNavigatorProps {
  activeId: string
}

export function ChapterNavigator({ activeId }: ChapterNavigatorProps) {
  const { lang } = useLanguage()

  return (
    <nav className="chapnav" aria-label="Exhibition Chapter Rail">
      <div className="chapnav__rail">
        {CHAPTERS.map((chap, idx) => {
          const isActive = chap.id === activeId
          const indexStr = String(idx + 1).padStart(2, '0')
          return (
            <button
              key={chap.id}
              type="button"
              className={`chapnav__item ${isActive ? 'is-active' : ''}`}
              onClick={() => scrollToId(chap.id)}
              aria-current={isActive ? 'true' : undefined}
              title={`${indexStr} ${chap.label}`}
            >
              <span className="chapnav__num">{indexStr}</span>
              <span className="chapnav__label">{lang === 'or' ? chap.numeral : chap.label}</span>
              <span className="chapnav__dot" aria-hidden="true" />
            </button>
          )
        })}
      </div>
    </nav>
  )
}
