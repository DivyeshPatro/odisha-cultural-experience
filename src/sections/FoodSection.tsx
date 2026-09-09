import { useState } from 'react'
import { ChapterHeader } from '../components/ChapterHeader'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { SourceTag } from '../components/SourceTag'
import { FoodPlate } from '../components/Plates'
import { DISHES, FOOD_INTRO, MAHAPRASAD_NOTE } from '../data/food'
import { useLanguage } from '../context/LanguageContext'
import { usePassport } from '../hooks/usePassport'

export function FoodSection() {
  const [i, setI] = useState(0)
  const [filterPreference, setFilterPreference] = useState<string>('all')
  const { t } = useLanguage()
  const { discover } = usePassport()

  const handleSelectDish = (idx: number) => {
    setI(idx)
    discover(DISHES[idx].id)
  }

  const dish = DISHES[i]
  const n = DISHES.length

  return (
    <section id="food" className="section section--tint food" aria-labelledby="food-title">
      <div className="wrap">
        <ChapterHeader
          numberStr="07"
          numeral="VII"
          titleEn="CULINARY HERITAGE"
          titleOr="ଓଡ଼ିଆ ଆହାର"
          prologueEn="Gentle spicing, mustard paste, fermentations, and ancient earthenware temple kitchens."
          prologueOr="ସରଳ ସ୍ୱାଦ, ପଖାଳ, ଛେନାପୋଡ଼ ଓ ପୃଥିବୀର ବୃହତ୍ତମ ମନ୍ଦିର ରୋଷେଇଘର।"
          accentColor="var(--terracotta-main)"
        />

        <SectionHeader
          numeral="VII"
          eyebrow={t('A TASTE OF ODISHA', 'ଓଡ଼ିଆ ଆହାର')}
          title={<span id="food-title">{t('Not the Indian food you have eaten', 'ଶୁଦ୍ଧ ଦେଶୀ ସ୍ୱାଦ ଓ ପରମ୍ପରା')}</span>}
          lede={FOOD_INTRO}
        />

        {/* Preference Discovery Assistant */}
        <div className="food__pref-bar">
          <span className="food__pref-label">{t('I WANT...', 'ମୁଁ ଖୋଜୁଛି...')}</span>
          <button
            type="button"
            className={`chip ${filterPreference === 'all' ? 'is-on' : ''}`}
            onClick={() => setFilterPreference('all')}
          >
            {t('All Dishes', 'ସମସ୍ତ ଆହାର')}
          </button>
          <button
            type="button"
            className={`chip ${filterPreference === 'sweet' ? 'is-on' : ''}`}
            onClick={() => {
              setFilterPreference('sweet')
              const sweetIdx = DISHES.findIndex((d) => d.id === 'chhena-poda' || d.id === 'rasagola')
              if (sweetIdx !== -1) handleSelectDish(sweetIdx)
            }}
          >
            {t('Something Sweet', 'ମିଠା')}
          </button>
          <button
            type="button"
            className={`chip ${filterPreference === 'cooling' ? 'is-on' : ''}`}
            onClick={() => {
              setFilterPreference('cooling')
              const coolIdx = DISHES.findIndex((d) => d.id === 'pakhala')
              if (coolIdx !== -1) handleSelectDish(coolIdx)
            }}
          >
            {t('Something Cooling', 'ଶୀତଳ')}
          </button>
          <button
            type="button"
            className={`chip ${filterPreference === 'festive' ? 'is-on' : ''}`}
            onClick={() => {
              setFilterPreference('festive')
              const festIdx = DISHES.findIndex((d) => d.id === 'mahaprasad')
              if (festIdx !== -1) handleSelectDish(festIdx)
            }}
          >
            {t('Festive / Sacred', 'ପବିତ୍ର')}
          </button>
        </div>

        <div className="food__stage">
          <div className="food__carousel" aria-hidden="true">
            {DISHES.map((d, k) => {
              let off = k - i
              if (off > n / 2) off -= n
              if (off < -n / 2) off += n
              return (
                <div
                  key={d.id}
                  className={`food__slot ${off === 0 ? 'is-front' : ''}`}
                  style={{
                    ['--off' as string]: off,
                    ['--abs' as string]: Math.abs(off),
                    ['--acc' as string]: d.accent,
                  }}
                >
                  <FoodPlate name={d.plate} accent={d.accent} />
                </div>
              )
            })}
            <div className="food__stand" />
          </div>

          <div className="food__detail">
            <p className="food__kind">{dish.kind}</p>
            <h3 className="food__name">
              {dish.name}
              {dish.odia && (
                <span className="food__odia odia" lang="or">
                  {dish.odia}
                </span>
              )}
            </h3>
            <p className="food__hook">{dish.hook}</p>
            <p className="food__what">{dish.what}</p>

            <div className="food__cols">
              <div>
                <h4>{t('Ingredients', 'ସାମଗ୍ରୀ')}</h4>
                <ul className="food__ing">
                  {dish.ingredients.map((ing) => (
                    <li key={ing}>{ing}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>{t('When', 'କେବେ')}</h4>
                <p>{dish.when}</p>
                <h4>{t('Where', 'କେଉଁଠି')}</h4>
                <p>{dish.where}</p>
              </div>
            </div>

            <SourceTag cite={dish.cite} confidence={dish.confidence} caveat={dish.caveat} />
          </div>
        </div>

        <div className="food__picker" role="tablist" aria-label="Dishes">
          {DISHES.map((d, k) => (
            <button
              key={d.id}
              role="tab"
              type="button"
              aria-selected={k === i}
              tabIndex={k === i ? 0 : -1}
              className={`food__pick ${k === i ? 'is-on' : ''}`}
              style={{ ['--acc' as string]: d.accent }}
              onClick={() => handleSelectDish(k)}
            >
              {d.name}
            </button>
          ))}
        </div>

        <Reveal className="food__temple">
          <p>{MAHAPRASAD_NOTE.text}</p>
          <SourceTag cite={MAHAPRASAD_NOTE.cite} confidence={MAHAPRASAD_NOTE.confidence} />
        </Reveal>
      </div>
    </section>
  )
}
