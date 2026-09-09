import { useCallback, useEffect, useRef, useState } from 'react'
import { WheelArt } from '../components/KonarkWheel'
import { Glyph } from '../components/Glyph'
import { ChapterHeader } from '../components/ChapterHeader'
import { SectionHeader } from '../components/SectionHeader'
import { SourceTag } from '../components/SourceTag'
import { Reveal } from '../components/Reveal'
import { WHEEL_READINGS, WHEEL_SPOKES } from '../data/wheel'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useLanguage } from '../context/LanguageContext'
import { usePassport } from '../hooks/usePassport'
import { angleDelta, clamp, scrollToId } from '../utils/scroll'

const STEP = 360 / WHEEL_SPOKES.length // 45°

const indexFromAngle = (deg: number) =>
  ((-Math.round(deg / STEP) % WHEEL_SPOKES.length) + WHEEL_SPOKES.length) % WHEEL_SPOKES.length

const angleForIndex = (i: number, from: number) => {
  const base = -i * STEP
  return base + 360 * Math.round((from - base) / 360)
}

export function WheelSection() {
  const reduced = useReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)
  const rotorRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()
  const { discover } = usePassport()

  const angle = useRef(0)
  const drag = useRef<{ id: number; last: number; t: number; v: number; moved: boolean } | null>(null)

  const [active, setActive] = useState(0)
  const [touched, setTouched] = useState(false)

  const setRot = useCallback((deg: number, animate: boolean) => {
    const rotor = rotorRef.current
    if (!rotor) return
    angle.current = deg
    rotor.style.transition = animate
      ? 'transform 520ms cubic-bezier(0.16, 1, 0.3, 1)'
      : 'none'
    rotor.style.setProperty('--rot', `${deg}deg`)
  }, [])

  useEffect(() => {
    setRot(0, false)
  }, [setRot])

  const goTo = useCallback(
    (i: number, markTouched = true) => {
      setActive(i)
      if (markTouched) {
        setTouched(true)
        discover('konark')
        discover('wheel')
      }
      setRot(angleForIndex(i, angle.current), !reduced)
    },
    [reduced, setRot, discover],
  )

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 12) return
      e.preventDefault()
      const dir = e.deltaY > 0 ? 1 : -1
      goTo((active + dir + WHEEL_SPOKES.length) % WHEEL_SPOKES.length)
    }

    stage.addEventListener('wheel', onWheel, { passive: false })
    return () => stage.removeEventListener('wheel', onWheel)
  }, [active, goTo])

  const handleReset = () => {
    goTo(0)
  }

  /* ---- pointer rotation ------------------------------------------- */

  const pointerAngle = (e: React.PointerEvent) => {
    const box = stageRef.current!.getBoundingClientRect()
    const cx = box.left + box.width / 2
    const cy = box.top + box.height / 2
    return (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI
  }

  const onDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return
    if ((e.target as Element).closest('.kw__tab')) return
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    drag.current = { id: e.pointerId, last: pointerAngle(e), t: performance.now(), v: 0, moved: false }
    setRot(angle.current, false)
  }

  const onMove = (e: React.PointerEvent) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    const now = performance.now()
    const a = pointerAngle(e)
    const delta = angleDelta(d.last, a)
    const dt = Math.max(1, now - d.t)

    d.last = a
    d.t = now
    d.v = delta / dt

    if (Math.abs(delta) > 0.4) d.moved = true

    setRot(angle.current + delta, false)
    const next = indexFromAngle(angle.current)
    setActive((cur) => (cur === next ? cur : next))
    if (!touched) {
      setTouched(true)
      discover('konark')
    }
  }

  const onUp = (e: React.PointerEvent) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    drag.current = null
    try {
      ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    } catch {
      /* pointer released */
    }
    const projected = angle.current + (reduced ? 0 : clamp(d.v * 190, -360, 360))
    const snapped = Math.round(projected / STEP) * STEP
    setRot(snapped, !reduced)
    setActive(indexFromAngle(snapped))
  }

  const spoke = WHEEL_SPOKES[active]

  // Calculate traditional Odia time metrics (Danda = 24 minutes, Pala = 24 seconds)
  const currentPraharaNum = active + 1
  const dandaEquivalent = currentPraharaNum * 7.5 // 7.5 Dandas per Prahara

  return (
    <section id="wheel" className="section section--tint wheelsec" aria-labelledby="wheel-title">
      <div className="wrap">
        <ChapterHeader
          numberStr="02"
          numeral="II"
          titleEn="TIME & SOLAR PRECISION"
          titleOr="ସମୟ ଓ ସୂର୍ଯ୍ୟ ପରିଭ୍ରମଣ"
          prologueEn="Look closer. This is not mere decoration — it is a 13th-century architectural masterpiece measuring solar movement."
          prologueOr="ଏହା କେବଳ କାରୁକାର୍ଯ୍ୟ ନୁହେଁ, ପ୍ରାଚୀନ କୋଣାର୍କର ଚକ୍ରରେ ଲୁଚି ରହିଛି ସୂର୍ଯ୍ୟଙ୍କ ଗତି ଓ ସମୟ ଗଣନାର ପ୍ରାଚୀନ ରହସ୍ୟ।"
          accentColor="var(--gold-main)"
        />

        <SectionHeader
          numeral="II"
          eyebrow={t('READ TIME LIKE THE SUN', 'ସୂର୍ଯ୍ୟ ଘଡ଼ିରେ ସମୟ')}
          title={
            <span id="wheel-title">
              {t('Eight spokes. Eight watches of the day. ', 'ଆଠଟି ଅର। ଦିନର ଆଠଟି ପ୍ରହର। ')}
              <span className="gold">{t('Turn it.', 'ଏହାକୁ ଘୁରାନ୍ତୁ।')}</span>
            </span>
          }
          lede={t(
            'Each of the twenty-four wheels at Konark carries eight major spokes, traditionally read as the eight praharas—the three-hour watches an Indian day is divided into.',
            'କୋଣାର୍କର ପ୍ରତି ଚକରେ ଆଠଟି ପ୍ରଧାନ ଅର ରହିଛି, ଯାହା ପ୍ରାଚୀନ କାଳରେ ଦିନ ଓ ରାତିର ପ୍ରହର ମାପିବାକୁ ବ୍ୟବହୃତ ହେଉଥିଲା।',
          )}
        />

        <div className="wheelsec__grid">
          <Reveal className="wheelsec__stagewrap">
            <div
              ref={stageRef}
              className={`kw ${touched ? 'is-touched' : ''}`}
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
            >
              <div className="kw__gnomon" aria-hidden="true">
                <svg viewBox="0 0 28 40" width="28" height="40">
                  <path d="M14 40 4 12 14 0l10 12Z" fill="currentColor" opacity="0.9" />
                  <path d="M14 34 9 14l5-7 5 7Z" fill="var(--ink-900)" opacity="0.55" />
                </svg>
              </div>

              <div ref={rotorRef} className="kw__rotor">
                <WheelArt active={active} />

                <div
                  className="kw__tabs"
                  role="tablist"
                  aria-label="Chapters of the exhibition"
                >
                  {WHEEL_SPOKES.map((s, i) => {
                    const deg = i * STEP
                    return (
                      <button
                        key={s.id}
                        id={`kw-tab-${i}`}
                        role="tab"
                        type="button"
                        aria-selected={i === active}
                        aria-controls="kw-panel"
                        className={`kw__tab ${i === active ? 'is-active' : ''}`}
                        style={{
                          transform: `rotate(${deg}deg) translateY(calc(var(--kw-r) * -1)) rotate(${-deg}deg)`,
                        }}
                        onClick={() => goTo(i)}
                      >
                        <span className="kw__tabinner" aria-hidden="true">
                          <Glyph name={s.glyph} size={19} />
                        </span>
                        <span className="sr-only">{s.title}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <p className={`kw__hint ${touched ? 'is-gone' : ''}`} aria-hidden="true">
                {t('tap or drag', 'ଟ୍ୟାପ୍ କିମ୍ବା ଘୁରାନ୍ତୁ')}
              </p>
            </div>

            <div className="wheel-reset-wrap">
              <button type="button" className="btn btn--ghost" onClick={handleReset}>
                {t('Reset Wheel Position ↺', 'ଚକର ସ୍ଥିତି ପୁନଃସେଟ୍ ↺')}
              </button>
            </div>
          </Reveal>

          <div className="wheelsec__panel" id="kw-panel" role="tabpanel">
            <div className="wheelsec__solar-meta">
              <span className="srctag__tier">{t('Solar Calculation', 'ସୌର ମାପ')}</span>
              <span>
                {t('Prahara', 'ପ୍ରହର')} {currentPraharaNum} · {dandaEquivalent} {t('Dandas', 'ଦଣ୍ଡ')}
              </span>
            </div>

            <p className="wheelsec__prahara">{spoke.prahara}</p>
            <h3 className="wheelsec__title">
              {spoke.title}
              <span className="wheelsec__odia odia">{spoke.odia}</span>
            </h3>
            <p className="wheelsec__line">{spoke.line}</p>

            {spoke.target ? (
              <button className="btn wheelsec__go" type="button" onClick={() => scrollToId(spoke.target!)}>
                {t('Open this chapter', 'ଏହି ଅଧ୍ୟାୟ ଦେଖନ୍ତୁ')} →
              </button>
            ) : (
              <ul className="wheelsec__readings">
                {WHEEL_READINGS.map((r) => (
                  <li key={r.heading}>
                    <h4>{r.heading}</h4>
                    <p>{r.body}</p>
                    <SourceTag cite={r.cite} confidence={r.confidence} caveat={r.caveat} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
