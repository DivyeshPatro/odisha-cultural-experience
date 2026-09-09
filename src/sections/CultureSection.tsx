import { useState } from 'react'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { Sheet } from '../components/Sheet'
import { SourceTag } from '../components/SourceTag'
import { ArtPlate } from '../components/Plates'
import { BandhaField, SauraBand } from '../components/Motifs'
import { PattachitraLab } from '../components/PattachitraLab'
import { IkatLab } from '../components/IkatLab'
import { ART_FORMS, ART_INTRO, type ArtForm } from '../data/art'
import { useLanguage } from '../context/LanguageContext'
import { usePassport } from '../hooks/usePassport'

export function CultureSection() {
  const [open, setOpen] = useState<ArtForm | null>(null)
  const { t } = useLanguage()
  const { discover } = usePassport()

  const handleOpenCard = (a: ArtForm) => {
    setOpen(a)
    discover(a.id)
  }

  return (
    <section id="culture" className="section culture" aria-labelledby="culture-title">
      <BandhaField className="culture__field" opacity={0.04} />
      <div className="wrap">
        <SectionHeader
          numeral="VI"
          eyebrow={t('Living Traditions & Visual Arts', 'ଜୀବନ୍ତ କଳା ଓ ପରମ୍ପରା')}
          title={<span id="culture-title">{t('Six traditions still being practised this afternoon', 'ଆଜି ବି ଜୀବନ୍ତ ଛଅଟି ଶ୍ରେଷ୍ଠ କଳା ପରମ୍ପରା')}</span>}
          lede={ART_INTRO}
        />

        <ul className="culture__grid">
          {ART_FORMS.map((a, i) => (
            <Reveal as="li" key={a.id} delay={(i % 3) * 70}>
              <button
                type="button"
                className="acard card"
                style={{ ['--acc' as string]: a.accent }}
                onClick={() => handleOpenCard(a)}
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

        {/* Interactive Pattachitra Lab & Ikat Weaving Studio */}
        <Reveal className="culture__labs-wrap" delay={150}>
          <PattachitraLab />
          <IkatLab />
        </Reveal>

        <Reveal className="culture__band">
          <SauraBand className="culture__saura" />
          <p className="culture__bandcap small">
            {t(
              'Saura iditals are painted on the walls of homes in southern Odisha for a birth, a harvest or a marriage.',
              'ଦକ୍ଷିଣ ଓଡ଼ିଶାରେ ସୌରା ଇଡିତାଲ୍ ଘର ଭିତ୍ତିରେ ଜନ୍ମ, ଅମଳ କିମ୍ବା ବିବାହ ସମୟରେ ଅଙ୍କାଯାଏ।',
            )}
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
            <h4>{t('Where it comes from', 'ଉତ୍ପତ୍ତି ସ୍ଥଳ')}</h4>
            <p>{open.origin}</p>
            <h4>{t('Why it matters', 'ଏହାର ମହତ୍ତ୍ୱ')}</h4>
            <p>{open.why}</p>
            <h4>{t('Today', 'ଆଜିର ସ୍ଥିତି')}</h4>
            <p>{open.today}</p>
            <SourceTag cite={open.cite} confidence={open.confidence} caveat={open.caveat} />
          </div>
        )}
      </Sheet>
    </section>
  )
}
