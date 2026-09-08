import { useState } from 'react'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { Sheet } from '../components/Sheet'
import { SourceTag } from '../components/SourceTag'
import { ArtPlate } from '../components/Plates'
import { BandhaField, SauraBand } from '../components/Motifs'
import { ART_FORMS, ART_INTRO, type ArtForm } from '../data/art'

export function CultureSection() {
  const [open, setOpen] = useState<ArtForm | null>(null)

  return (
    <section id="culture" className="section culture" aria-labelledby="culture-title">
      {/* A bandha weave behind the chapter, at 4% — present as texture,
          never as pattern competing with the text. */}
      <BandhaField className="culture__field" opacity={0.04} />
      <div className="wrap">
        <SectionHeader
          numeral="VI"
          eyebrow="Feel the culture"
          title={<span id="culture-title">Six traditions still being practised this afternoon</span>}
          lede={ART_INTRO}
        />

        <ul className="culture__grid">
          {ART_FORMS.map((a, i) => (
            <Reveal as="li" key={a.id} delay={(i % 3) * 70}>
              <button
                type="button"
                className="acard card"
                style={{ ['--acc' as string]: a.accent }}
                onClick={() => setOpen(a)}
                aria-haspopup="dialog"
              >
                <span className="acard__plate">
                  <ArtPlate name={a.plate} accent={a.accent} />
                </span>
                <span className="acard__meta">
                  <span className="acard__kind">{a.kind}</span>
                  <span className="acard__name">
                    {a.name}
                    {a.odia && (
                      <span className="acard__odia odia" lang="or">
                        {a.odia}
                      </span>
                    )}
                  </span>
                  <span className="acard__hook">{a.hook}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>

        <Reveal className="culture__band">
          <SauraBand className="culture__saura" />
          <p className="culture__bandcap small">
            Saura iditals are painted on the walls of homes in southern Odisha for a birth, a harvest or a
            marriage. The figures are drawn joined, inward from the frame.
          </p>
        </Reveal>
      </div>

      <Sheet
        open={!!open}
        onClose={() => setOpen(null)}
        title={open?.name ?? ''}
        eyebrow={open?.kind}
        accent={open?.accent}
      >
        {open && (
          <div className="sheetbody">
            <div className="sheetbody__plate">
              <ArtPlate name={open.plate} accent={open.accent} />
            </div>
            <p className="sheetbody__hook">{open.hook}</p>
            <h4>Where it comes from</h4>
            <p>{open.origin}</p>
            <h4>Why it matters</h4>
            <p>{open.why}</p>
            <h4>Today</h4>
            <p>{open.today}</p>
            <SourceTag cite={open.cite} confidence={open.confidence} caveat={open.caveat} />
          </div>
        )}
      </Sheet>
    </section>
  )
}
