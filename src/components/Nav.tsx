import { useEffect, useState } from 'react'
import { CHAPTERS, PRIMARY_NAV } from '../data/nav'
import { useActiveSection } from '../hooks/useActiveSection'
import { useScrollLock } from '../hooks/useScrollLock'
import { useAmbience } from '../hooks/useAmbience'
import { useLanguage } from '../context/LanguageContext'
import { scrollToId } from '../utils/scroll'
import { LotusMark } from './Motifs'
import { PresentMode } from './PresentMode'

const IDS = CHAPTERS.map((c) => c.id)

interface NavProps {
  onStartJourney?: () => void
  onToggleKiosk?: () => void
}

export function Nav({ onStartJourney, onToggleKiosk }: NavProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const active = useActiveSection(IDS)
  const audio = useAmbience()
  const { lang, toggleLang } = useLanguage()

  useScrollLock(open)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const y = window.scrollY
        const max = document.documentElement.scrollHeight - window.innerHeight
        setScrolled(y > 40)
        setProgress(max > 0 ? Math.min(1, y / max) : 0)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    requestAnimationFrame(() => scrollToId(id))
  }

  return (
    <>
      <a className="skip-link" href="#sixty">
        Skip to content
      </a>

      <nav
        className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-menu' : ''}`}
        aria-label="Exhibition"
      >
        <div className="nav__bar wrap">
          <button className="nav__brand" type="button" onClick={() => scrollToId('top')}>
            <LotusMark size={17} />
            <span className="nav__wordmark">ODISHA</span>
            <span className="nav__odia odia" lang="or" aria-hidden="true">
              ଓଡ଼ିଶା
            </span>
          </button>

          <ul className="nav__links">
            {PRIMARY_NAV.map((id) => {
              const ch = CHAPTERS.find((c) => c.id === id)!
              return (
                <li key={id}>
                  <button
                    type="button"
                    className={`nav__link ${active === id ? 'is-active' : ''}`}
                    aria-current={active === id ? 'true' : undefined}
                    onClick={() => go(id)}
                  >
                    {ch.label}
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="nav__tools">
            {/* Language Switcher */}
            <button
              type="button"
              className="nav__lang"
              onClick={toggleLang}
              title={lang === 'en' ? 'Switch to Odia' : 'Switch to English'}
            >
              <span className="odia">{lang === 'en' ? 'ଓଡ଼ିଶା' : 'EN'}</span>
            </button>

            {/* Guided Journey Mode button */}
            {onStartJourney && (
              <button
                type="button"
                className="nav__journey"
                onClick={onStartJourney}
                title="Begin guided 8-minute exhibition tour"
              >
                <span>Journey</span>
              </button>
            )}

            {onToggleKiosk && (
              <button
                type="button"
                className="nav__lang"
                onClick={onToggleKiosk}
                title="Toggle Exhibition Kiosk Mode"
              >
                <span>Kiosk</span>
              </button>
            )}

            <PresentMode
              soundSupported={audio.supported}
              startSound={audio.start}
              stopSound={audio.stop}
            />

            {audio.supported && (
              <button
                type="button"
                className={`nav__sound ${audio.playing ? 'is-on' : ''}`}
                onClick={audio.toggle}
                aria-pressed={audio.playing}
                title={audio.playing ? 'Stop sound' : 'Play the sea and a temple bell'}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M4 9.5h3.5L12 5.5v13L7.5 14.5H4Z" />
                  {audio.playing ? (
                    <>
                      <path d="M15.6 9.2a4 4 0 0 1 0 5.6" />
                      <path d="M18.3 6.6a7.7 7.7 0 0 1 0 10.8" />
                    </>
                  ) : (
                    <path d="M16.5 9.8 21 14.2M21 9.8l-4.5 4.4" />
                  )}
                </svg>
                <span className="nav__soundlabel">{audio.playing ? 'Sound on' : 'Sound'}</span>
              </button>
            )}

            <button
              type="button"
              className="nav__menu"
              aria-expanded={open}
              aria-controls="chapter-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="nav__menulabel">Chapters</span>
              <span className={`nav__burger ${open ? 'is-x' : ''}`} aria-hidden="true">
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>

        <div className="nav__progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
      </nav>

      <div
        id="chapter-menu"
        className={`chmenu ${open ? 'is-open' : ''}`}
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Chapters"
      >
        <div className="chmenu__inner wrap">
          <p className="chmenu__eyebrow">Twelve chapters</p>
          <ul className="chmenu__list">
            {CHAPTERS.map((c, i) => (
              <li key={c.id} style={{ ['--i' as string]: i }}>
                <button
                  type="button"
                  className={`chmenu__item ${active === c.id ? 'is-active' : ''}`}
                  onClick={() => go(c.id)}
                >
                  <span className="chmenu__num">{c.numeral}</span>
                  <span className="chmenu__body">
                    <span className="chmenu__label">{c.label}</span>
                    <span className="chmenu__line">{c.line}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className="chmenu__close btn btn--ghost" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
      </div>
    </>
  )
}
