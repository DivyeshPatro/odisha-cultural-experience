import { TempleSilhouette } from '../components/Motifs'
import { MAP_VIEWBOX, ODISHA_OUTLINE, ODISHA_PATH_LENGTH } from '../data/mapPlaces'
import { useLanguage } from '../context/LanguageContext'
import { scrollToId } from '../utils/scroll'

const MOTES = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 37 + 11) % 97}%`,
  delay: `${(i * 1.37) % 9}s`,
  duration: `${13 + ((i * 3) % 9)}s`,
  size: i % 3 === 0 ? 3 : 2,
  drift: `${((i % 5) - 2) * 22}px`,
}))

interface HeroProps {
  onStartJourney?: () => void
}

export function Hero({ onStartJourney }: HeroProps) {
  const { t } = useLanguage()

  return (
    <header className="hero" id="top">
      <div className="hero__bg" aria-hidden="true">
        {/* 1 — the wheel, turning behind everything */}
        <svg className="hero__wheel" viewBox="-260 -260 520 520" focusable="false">
          <g fill="none" stroke="currentColor">
            <circle r="250" strokeWidth="1.4" />
            <circle r="228" strokeWidth="0.7" opacity="0.65" />
            <circle r="196" strokeWidth="0.7" opacity="0.65" />
            <circle r="62" strokeWidth="1.1" />
            <circle r="20" strokeWidth="0.8" />
            {Array.from({ length: 8 }, (_, i) => i * 45).map((a) => (
              <g key={a} transform={`rotate(${a})`}>
                <path d="M0 -62 V-196" strokeWidth="3" />
                <circle cx="0" cy="-148" r="11" strokeWidth="1.2" />
              </g>
            ))}
            {Array.from({ length: 8 }, (_, i) => i * 45 + 22.5).map((a) => (
              <path key={a} d="M0 -62 V-196" strokeWidth="1" opacity="0.6" transform={`rotate(${a})`} />
            ))}
            {Array.from({ length: 24 }, (_, i) => i * 15).map((a) => (
              <circle key={a} cx="0" cy="-212" r="6" strokeWidth="0.9" transform={`rotate(${a})`} />
            ))}
          </g>
        </svg>

        {/* 2 — Odisha, drawing itself */}
        <svg
          className="hero__map"
          viewBox={MAP_VIEWBOX}
          focusable="false"
          style={{ ['--path-len' as string]: ODISHA_PATH_LENGTH }}
        >
          <path className="hero__mapglow" d={ODISHA_OUTLINE} />
          <path className="hero__mapline" d={ODISHA_OUTLINE} />
        </svg>

        {/* motes of light off the sea */}
        <div className="hero__motes">
          {MOTES.map((m, i) => (
            <span
              key={i}
              style={{
                left: m.left,
                width: m.size,
                height: m.size,
                animationDelay: m.delay,
                animationDuration: m.duration,
                ['--drift' as string]: m.drift,
              }}
            />
          ))}
        </div>

        {/* 3 — the skyline */}
        <TempleSilhouette className="hero__skyline" />
        <div className="hero__horizon" />
      </div>

      <div className="hero__inner wrap">
        <p className="hero__kicker">
          <span className="hero__tri" aria-hidden="true">
            <i /> <i /> <i />
          </span>
          {t('An interactive digital exhibition', 'ଏକ ଆକର୍ଷଣୀୟ ଡିଜିଟାଲ ପ୍ରଦର୍ଶନୀ')}
        </p>

        <h1 className="hero__title">
          <span className="hero__odia odia" lang="or">
            ଓଡ଼ିଶା
          </span>
          <span className="hero__word" aria-label="Odisha">
            {'ODISHA'.split('').map((c, i) => (
              <span key={i} style={{ animationDelay: `${420 + i * 70}ms` }} aria-hidden="true">
                {c}
              </span>
            ))}
          </span>
        </h1>

        <p className="hero__sub">
          {t('Where stone learned', 'ଯେଉଁଠି ପାଷାଣ')} <span className="gold">{t('to keep time', 'ସମୟ ଶିଖିଲା')}</span>
        </p>

        <p className="hero__lede">
          {t(
            'A thirteenth-century king built the sun a chariot in stone. Eight hundred years later the same state taught the world how to move a million people out of a cyclone\'s path in a day. Both of those are Odisha.',
            'ତ୍ରୟୋଦଶ ଶତାବ୍ଦୀର ଶାସକ ସୂର୍ଯ୍ୟଙ୍କ ପାଇଁ ପାଷାଣ ରଥ ଗଢ଼ିଥିଲେ। ଆଠ ଶହ ବର୍ଷ ପରେ ଏହି ମାଟି ବିପର୍ଯ୍ୟୟ ପରିଚାଳନାରେ ବିଶ୍ୱରେ ଉଦାହରଣ ସୃଷ୍ଟି କଲା।',
          )}
        </p>

        <div className="hero__cta">
          {onStartJourney ? (
            <button className="btn" type="button" onClick={onStartJourney}>
              {t('BEGIN THE JOURNEY', 'ଯାତ୍ରା ଆରମ୍ଭ କରନ୍ତୁ')}
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path
                  d="M12 5v14M6 13l6 6 6-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : (
            <button className="btn" type="button" onClick={() => scrollToId('sixty')}>
              {t('Discover Odisha', 'ଓଡ଼ିଶା ଆବିଷ୍କାର କରନ୍ତୁ')}
            </button>
          )}

          <button className="btn btn--ghost" type="button" onClick={() => scrollToId('wheel')}>
            {t('Explore Odisha ↓', 'ଓଡ଼ିଶା ଦେଖନ୍ତୁ ↓')}
          </button>
        </div>

        <p className="hero__meta small">
          {t('Twelve chapters · about eight minutes · sound optional', '୧୨ଟି ଅଧ୍ୟାୟ · ପ୍ରାୟ ୮ ମିନିଟ୍ · ଶବ୍ଦ ଇଚ୍ଛାଧୀନ')}
        </p>
      </div>
    </header>
  )
}
