import { useState } from 'react'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { SourceTag } from '../components/SourceTag'
import { FoodPlate } from '../components/Plates'
import { DISHES, FOOD_INTRO, MAHAPRASAD_NOTE } from '../data/food'

/**
 * A carousel of dishes on a turning stand. The selected dish sits at the
 * front; the others are ranged behind it in a shallow arc. Selection is
 * driven by real buttons, so it works on a keyboard and reads correctly
 * to a screen reader — the arc is purely visual.
 */
export function FoodSection() {
  const [i, setI] = useState(0)
  const dish = DISHES[i]
  const n = DISHES.length

  return (
    <section id="food" className="section section--tint food" aria-labelledby="food-title">
      <div className="wrap">
        <SectionHeader
          numeral="VII"
          eyebrow="A taste of Odisha"
          title={<span id="food-title">Not the Indian food you have eaten</span>}
          lede={FOOD_INTRO}
        />

        <div className="food__stage">
          <div className="food__carousel" aria-hidden="true">
            {DISHES.map((d, k) => {
              // shortest signed distance around the ring
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
                <h4>In it</h4>
                <ul className="food__ing">
                  {dish.ingredients.map((ing) => (
                    <li key={ing}>{ing}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>When</h4>
                <p>{dish.when}</p>
                <h4>Where</h4>
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
              onClick={() => setI(k)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') setI((v) => (v + 1) % n)
                if (e.key === 'ArrowLeft') setI((v) => (v - 1 + n) % n)
              }}
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
