import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QRCodeSVG } from 'qrcode.react'
import { WheelArt } from './components/KonarkWheel'
import { Frieze, LotusMark } from './components/Motifs'
import './styles/qr.css'

const BASE_URL = 'https://divyeshpatro.github.io/odisha-cultural-experience/'

const FACTS = [
  { value: '24', label: 'stone wheels at Konark', tone: 'gold' },
  { value: '8', label: 'prahara in a day', tone: 'sindoor' },
  { value: '480 km', label: 'historic coastline measure', tone: 'lagoon' },
  { value: '30', label: 'districts to discover', tone: 'indigo' },
]

const DESTINATIONS = [
  { number: '01', title: 'Enter Odisha', odia: 'ଓଡ଼ିଶା', line: 'The complete interactive exhibition', url: BASE_URL, tone: 'gold' },
  { number: '02', title: 'Listen Odisha', odia: 'ଶୁଣନ୍ତୁ', line: 'Welcome, greetings and living Odia', url: `${BASE_URL}listen/`, tone: 'sindoor' },
  { number: '03', title: 'Odisha in 60 sec', odia: 'ଜାଣନ୍ତୁ', line: 'One minute. Eight essential stories.', url: `${BASE_URL}sixty/`, tone: 'lagoon' },
  { number: '04', title: 'Folk music & dance', odia: 'ଲୋକକଳା', line: 'Rhythm, movement and living tradition', url: `${BASE_URL}folk/`, tone: 'indigo' },
]

function QrDisplay() {
  return (
    <main className="qrpage">
      <div className="qrpage__grain" aria-hidden="true" />
      <WheelArt active={0} className="qrpage__wheel" />
      <Frieze className="qrpage__frieze" />

      <section className="qrpage__content" aria-labelledby="qr-title">
        <header className="qrpage__intro">
          <p className="qrpage__eyebrow"><LotusMark size={16} /> Independence Day 2026</p>
          <h1 id="qr-title">Odisha</h1>
          <p className="qrpage__odia">ଓଡ଼ିଶା</p>
          <p className="qrpage__line">Four doors into one Odisha.</p>
          <p className="qrpage__lede">
            Choose a trail. Enter the full exhibition, hear the language, meet the state in one minute,
            or step into the rhythm of its living traditions.
          </p>
        </header>

        <div className="qrpage__destinations" aria-label="Choose an Odisha experience">
          {DESTINATIONS.map((destination) => (
            <article key={destination.number} className={`qrchoice qrchoice--${destination.tone}`}>
              <a className="qrchoice__code" href={destination.url} aria-label={`Open ${destination.title}`}>
                <QRCodeSVG
                  value={destination.url}
                  size={180}
                  level="H"
                  bgColor="#f5ecdb"
                  fgColor="#100d0a"
                  marginSize={2}
                  title={`QR code for ${destination.title}`}
                />
              </a>
              <div className="qrchoice__copy">
                <p className="qrchoice__number">{destination.number}</p>
                <h2>{destination.title}</h2>
                <p className="qrchoice__odia" lang="or">{destination.odia}</p>
                <p className="qrchoice__line">{destination.line}</p>
              </div>
            </article>
          ))}
        </div>

        <dl className="qrpage__facts" aria-label="Odisha at a glance">
          {FACTS.map((fact) => (
            <div key={fact.label} className={`qrpage__fact qrpage__fact--${fact.tone}`}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
              <span className="qrpage__factline" aria-hidden="true" />
            </div>
          ))}
        </dl>
      </section>

      <footer className="qrpage__foot">
        <span>An interactive digital cultural exhibition</span>
        <span>Odisha · India</span>
      </footer>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QrDisplay />
  </StrictMode>,
)