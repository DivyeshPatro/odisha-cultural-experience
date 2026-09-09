import { useState } from 'react'
import { ChapterHeader } from '../components/ChapterHeader'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { Sheet } from '../components/Sheet'
import { SourceTag } from '../components/SourceTag'
import { Frieze } from '../components/Motifs'
import { HERITAGE, type HeritageItem } from '../data/heritage'

/** Small drawn emblem per monument — a silhouette, not a photograph. */
function Emblem({ kind }: { kind: HeritageItem['art'] }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.3,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  const shapes: Record<HeritageItem['art'], JSX.Element> = {
    konark: (
      <g {...common}>
        <circle cx="30" cy="30" r="19" />
        <circle cx="30" cy="30" r="6" />
        {[0, 45, 90, 135].map((a) => (
          <path key={a} d="M30 11 V49" transform={`rotate(${a} 30 30)`} />
        ))}
        <path d="M8 52h44" strokeWidth="2" />
      </g>
    ),
    jagannath: (
      <g {...common}>
        <path d="M17 50V26a13 13 0 0 1 26 0v24Z" />
        <circle cx="24" cy="28" r="4" />
        <circle cx="36" cy="28" r="4" />
        <path d="M24 40q6 4 12 0" />
        <path d="M30 13V7" />
      </g>
    ),
    lingaraj: (
      <g {...common}>
        <path d="M14 52 16 28C18 18 23 12 30 8c7 4 12 10 14 20l2 24Z" />
        <ellipse cx="30" cy="8" rx="8" ry="2.6" />
        <path d="M30 5V2" />
        <path d="M8 52h44" strokeWidth="2" />
      </g>
    ),
    caves: (
      <g {...common}>
        <path d="M8 50h44V26L30 12 8 26Z" />
        <path d="M20 50V38a5 5 0 0 1 10 0v12M34 50V40a4 4 0 0 1 8 0v10" />
      </g>
    ),
    stupa: (
      <g {...common}>
        <path d="M12 50h36" strokeWidth="2" />
        <path d="M15 50V40a15 15 0 0 1 30 0v10Z" />
        <path d="M30 25V14M24 18h12M26 12h8" />
      </g>
    ),
    fort: (
      <g {...common}>
        <path d="M10 50V22h6v-6h6v6h8v-6h6v6h6v-6h6v6h6v28Z" />
        <path d="M26 50V38a4 4 0 0 1 8 0v12" />
      </g>
    ),
    dam: (
      <g {...common}>
        <path d="M8 24h44v6H8Z" />
        <path d="M12 30v20M22 30v20M32 30v20M42 30v20M50 30v20" />
        <path d="M6 18q8-6 16 0t16 0 16 0" />
      </g>
    ),
    sand: (
      <g {...common}>
        <path d="M6 46q10-16 24-16t24 16" />
        <path d="M6 52h48" strokeWidth="2" />
        <circle cx="30" cy="24" r="6" />
        <path d="M22 34q8-6 16 0" />
      </g>
    ),
  }
  return (
    <svg viewBox="0 0 60 60" width="52" height="52" aria-hidden="true" focusable="false" className="emblem">
      {shapes[kind]}
    </svg>
  )
}

export function HeritageSection() {
  const [open, setOpen] = useState<HeritageItem | null>(null)

  return (
    <section id="heritage" className="section heritage" aria-labelledby="heritage-title">
      <Frieze className="heritage__frieze" />
      <div className="wrap">
        <ChapterHeader
          numberStr="03"
          numeral="III"
          titleEn="BUILT HERITAGE"
          titleOr="ଐତିହାସିକ କୀର୍ତ୍ତିରାଜି"
          prologueEn="Nine centuries of masons, and one emperor who changed his mind."
          prologueOr="ଶିଳ୍ପୀଙ୍କ ପ୍ରତିଭା ଓ ପ୍ରାଚୀନ ଓଡ଼ିଶାର କାଳଜୟୀ ସ୍ଥାପତ୍ୟ।"
          accentColor="var(--terracotta-main)"
        />

        <SectionHeader
          numeral="IV"
          eyebrow="Walk through history"
          title={<span id="heritage-title">Nine centuries of masons, and one emperor who changed his mind</span>}
          lede="Odisha's built heritage runs from rock-cut monks' cells carved before the common era to a dam finished in 1957. These eight are the ones worth knowing. Open any of them."
        />

        <ul className="heritage__grid">
          {HERITAGE.map((h, i) => (
            <Reveal as="li" key={h.id} delay={(i % 4) * 60}>
              <button
                type="button"
                className="hcard card"
                onClick={() => setOpen(h)}
                aria-haspopup="dialog"
              >
                <span className="hcard__top">
                  <Emblem kind={h.art} />
                  <span className="hcard__era">{h.era}</span>
                </span>
                <span className="hcard__name">
                  {h.name}
                  {h.odia && (
                    <span className="hcard__odia odia" lang="or">
                      {h.odia}
                    </span>
                  )}
                </span>
                <span className="hcard__place">{h.place}</span>
                <span className="hcard__hook">{h.hook}</span>
                <span className="hcard__more">
                  Open
                  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>
      <Frieze flip className="heritage__frieze heritage__frieze--b" />

      <Sheet
        open={!!open}
        onClose={() => setOpen(null)}
        title={open?.name ?? ''}
        eyebrow={open ? `${open.place} · ${open.era}` : undefined}
      >
        {open && (
          <div className="sheetbody">
            <p className="sheetbody__hook">{open.hook}</p>
            <h4>What it is</h4>
            <p>{open.significance}</p>
            <h4>Why an outsider should care</h4>
            <p>{open.outsider}</p>
            <h4>One detail</h4>
            <p>{open.detail}</p>
            <SourceTag cite={open.cite} confidence={open.confidence} caveat={open.caveat} />
          </div>
        )}
      </Sheet>
    </section>
  )
}
