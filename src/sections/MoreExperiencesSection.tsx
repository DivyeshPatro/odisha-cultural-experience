import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'

export function MoreExperiencesSection() {
  return (
    <section id="more" className="section section--tint" aria-labelledby="more-title">
      <div className="wrap">
        <SectionHeader
          numeral="XIII"
          eyebrow="Beyond the main exhibition"
          title={<span id="more-title">More to Explore</span>}
          lede="Three standalone interactive experiences diving deeper into the state's culture and rhythms."
        />

        <ul className="rail">
          <Reveal as="li" className="hook card hook--indigo" delay={0}>
            <h3 className="hook__headline">Listen Odisha</h3>
            <p className="hook__body">Hear the sounds of the Odia language and practice everyday phrases with our interactive pronunciation board.</p>
            <a href="listen/" style={{ display: 'inline-block', marginTop: '1.5rem', fontWeight: 600, textDecoration: 'underline' }}>Try Listen Odisha &rarr;</a>
          </Reveal>
          <Reveal as="li" className="hook card hook--sindoor" delay={100}>
            <h3 className="hook__headline">60 Seconds</h3>
            <p className="hook__body">A rapid-fire, one-minute animated tour of the essential facts about the state of Odisha.</p>
            <a href="sixty/" style={{ display: 'inline-block', marginTop: '1.5rem', fontWeight: 600, textDecoration: 'underline' }}>Watch 60 Seconds &rarr;</a>
          </Reveal>
          <Reveal as="li" className="hook card hook--gold" delay={200}>
            <h3 className="hook__headline">Folk Rhythms</h3>
            <p className="hook__body">An interactive drum machine featuring the cadences of Odisha's traditional dance and martial beats.</p>
            <a href="folk/" style={{ display: 'inline-block', marginTop: '1.5rem', fontWeight: 600, textDecoration: 'underline' }}>Play Folk Rhythms &rarr;</a>
          </Reveal>
        </ul>
      </div>
    </section>
  )
}
