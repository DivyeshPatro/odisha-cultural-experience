import { StrictMode, useEffect, useRef, useState, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { ArtPlate, type ArtPlateName } from './components/Plates'
import { Frieze, LotusMark, SauraBand } from './components/Motifs'
import './styles/qr-experiences.css'

const BASE_URL = 'https://divyeshpatro.github.io/odisha-cultural-experience/'
type AudioWindow = Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }
const getAudioConstructor = () => window.AudioContext ?? (window as AudioWindow).webkitAudioContext

function ExperienceShell({ children, tone }: { children: ReactNode; tone: string }) {
  return (
    <main className={`xpage xpage--${tone}`}>
      <div className="xpage__grain" aria-hidden="true" />
      <Frieze className="xpage__frieze" />
      <nav className="xnav" aria-label="Experience navigation">
        <a href="../qr/">All four trails</a>
        <a href={BASE_URL}>Full exhibition</a>
      </nav>
      {children}
      <footer className="xfooter"><span>Odisha · India</span><span>Independence Day 2026</span></footer>
    </main>
  )
}

const PHRASES = [
  { odia: 'ନମସ୍କାର! ଓଡ଼ିଶାକୁ ଆପଣଙ୍କୁ ସ୍ୱାଗତ।', roman: 'Namaskara! Odishaku apananku swagata.', meaning: 'Hello! Welcome to Odisha.', note: 'Begin here' },
  { odia: 'ଆପଣ କେମିତି ଅଛନ୍ତି?', roman: 'Apana kemiti achhanti?', meaning: 'How are you?', note: 'A warm first question' },
  { odia: 'ମୁଁ ଭଲ ଅଛି।', roman: 'Mun bhala achhi.', meaning: 'I am well.', note: 'The everyday reply' },
  { odia: 'ଜୟ ଜଗନ୍ନାଥ!', roman: 'Jai Jagannatha!', meaning: 'Hail Jagannath!', note: 'Greeting, blessing, farewell' },
  { odia: 'ବାର ମାସରେ ତେର ପର୍ବ।', roman: 'Bara masare tera parba.', meaning: 'Thirteen festivals in twelve months.', note: 'A beloved Odia saying' },
  { odia: 'ଓଡ଼ିଆ ଭାରି ବଢ଼ିଆ।', roman: 'Odia bhari badhia.', meaning: 'Odia is truly wonderful.', note: 'Say it with feeling' },
]

function strikeBell() {
  const AudioCtor = getAudioConstructor()
  if (!AudioCtor) return
  const context = new AudioCtor()
  const now = context.currentTime
  const bus = context.createGain()
  const compressor = context.createDynamicsCompressor()
  bus.gain.setValueAtTime(1.8, now)
  bus.gain.exponentialRampToValueAtTime(0.0001, now + 4.5)
  compressor.threshold.value = -16
  compressor.knee.value = 10
  compressor.ratio.value = 6
  compressor.attack.value = 0.004
  compressor.release.value = 0.2
  bus.connect(compressor).connect(context.destination)
  ;[[262, 0.48], [723, 0.25], [1415, 0.12], [2340, 0.06]].forEach(([frequency, volume]) => {
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.frequency.value = frequency
    gain.gain.value = volume
    oscillator.connect(gain).connect(bus)
    oscillator.start(now)
    oscillator.stop(now + 4.6)
  })
  window.setTimeout(() => void context.close(), 5000)
}

function getLocalVoice(targetLang: string) {
  if (!('speechSynthesis' in window)) return null
  const voices = window.speechSynthesis.getVoices()
  return voices.find(v => v.lang === targetLang) ||
         voices.find(v => v.lang === 'en-IN') ||
         voices.find(v => v.lang.includes('IN')) ||
         null
}

function ListenOdisha() {
  const [active, setActive] = useState(0)
  const [speaking, setSpeaking] = useState(false)

  useEffect(() => () => window.speechSynthesis?.cancel(), [])

  const speak = (index: number) => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    setActive(index)
    const utterance = new SpeechSynthesisUtterance(PHRASES[index].odia)
    const voice = getLocalVoice('or-IN')
    if (voice) utterance.voice = voice
    utterance.lang = voice ? voice.lang : 'or-IN'
    utterance.rate = 0.78
    utterance.volume = 1
    utterance.onstart = () => setSpeaking(true)
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)
    window.speechSynthesis.speak(utterance)
  }

  return (
    <ExperienceShell tone="listen">
      <header className="xhead listen__head">
        <div>
          <p className="xeyebrow"><LotusMark size={16} /> Words of welcome</p>
          <h1>Listen Odisha</h1>
          <p className="xodia" lang="or">ଓଡ଼ିଶାକୁ ଶୁଣନ୍ତୁ</p>
        </div>
        <button className="bell" type="button" onClick={strikeBell} aria-label="Ring the temple bell">
          <svg className="bell__shape" viewBox="0 0 72 72" aria-hidden="true">
            <path d="M18 50h36M23 48V32c0-9 5-16 13-16s13 7 13 16v16M31 16c0-4 2-6 5-6s5 2 5 6M32 56c1 4 3 6 6 6s5-2 6-6" />
            <path d="M18 50c3-3 5-7 5-12M54 50c-3-3-5-7-5-12" opacity=".65" />
          </svg>
          <span>Ring to begin</span>
        </button>
      </header>

      <section className="listen__stage" aria-live="polite">
        <div className={`voiceprint ${speaking ? 'is-speaking' : ''}`} aria-hidden="true">
          {Array.from({ length: 28 }, (_, index) => <span key={index} style={{ '--bar': index } as React.CSSProperties} />)}
        </div>
        <p className="listen__note">{PHRASES[active].note}</p>
        <p className="listen__odia" lang="or">{PHRASES[active].odia}</p>
        <p className="listen__roman">{PHRASES[active].roman}</p>
        <p className="listen__meaning">{PHRASES[active].meaning}</p>
        <button className="listen__play" type="button" onClick={() => speak(active)}>
          <span aria-hidden="true">{speaking ? '■' : '▶'}</span> {speaking ? 'Speaking' : 'Hear this line'}
        </button>
      </section>

      <section className="phraseboard" aria-label="Odia phraseboard">
        <p className="phraseboard__title">Lines you will hear everywhere</p>
        <div className="phraseboard__grid">
          {PHRASES.map((phrase, index) => (
            <button key={phrase.odia} className={`phrase ${active === index ? 'is-active' : ''}`} type="button" onClick={() => speak(index)}>
              <span className="phrase__number">{String(index + 1).padStart(2, '0')}</span>
              <span className="phrase__odia" lang="or">{phrase.odia}</span>
              <span className="phrase__meaning">{phrase.meaning}</span>
              <span className="phrase__sound" aria-hidden="true">▶</span>
            </button>
          ))}
        </div>
        <p className="xdisclaimer">Pronunciation uses the Odia voice available on your device. Voice quality varies by phone and browser.</p>
      </section>
    </ExperienceShell>
  )
}

const MINUTE_STORIES = [
  { time: '00', title: 'The eastern threshold', stat: '155,707 km²', body: 'Odisha faces the Bay of Bengal between Bengal and Andhra Pradesh: coast, river delta, plateau and Eastern Ghats in one state.', tone: 'gold' },
  { time: '08', title: 'A language made a state', stat: '1 April 1936', body: 'Odisha became India’s first province formed on a linguistic basis. Odia later received classical-language status in 2014.', tone: 'sindoor' },
  { time: '15', title: 'A sun chariot in stone', stat: '24 wheels · 7 horses', body: 'The 13th-century Sun Temple at Konark imagines Surya’s chariot at monumental scale. UNESCO inscribed it in 1984.', tone: 'gold' },
  { time: '23', title: 'Jagannath leaves home', stat: '3 new chariots', body: 'At Puri, three chariots are built from scratch each year and pulled by hand along the Bada Danda during Rath Yatra.', tone: 'sindoor' },
  { time: '30', title: 'Culture is still at work', stat: 'Cloth · stone · silver', body: 'Odissi, Pattachitra, Sambalpuri bandha, palm-leaf engraving and Cuttack filigree are living practices, not museum remains.', tone: 'indigo' },
  { time: '38', title: 'Water writes the landscape', stat: '480 km coast', body: 'Chilika became India’s first Ramsar wetland in 1981. Gahirmatha hosts the world’s largest known Olive Ridley mass-nesting rookery.', tone: 'lagoon' },
  { time: '45', title: 'A history of resistance', stat: '1817 Paika rising', body: 'The Paika rebellion preceded 1857 by four decades. Odisha’s freedom story runs through Bakshi Jagabandhu, Gopabandhu and Rama Devi.', tone: 'indigo' },
  { time: '53', title: 'Preparedness became power', stat: '1.2 million moved', body: 'Before Cyclone Fani in 2019, Odisha evacuated roughly 1.2 million people. Its disaster model is now studied internationally.', tone: 'lagoon' },
]

const SIXTY_DURATION = 60000

function SixtySecondOdisha() {
  const [elapsed, setElapsed] = useState(0)
  const [playing, setPlaying] = useState(false)
  const active = Math.min(MINUTE_STORIES.length - 1, Math.floor(elapsed / 7500))
  const story = MINUTE_STORIES[active]

  useEffect(() => {
    if (!playing) return
    let lastTick = performance.now()
    const timer = window.setInterval(() => {
      const now = performance.now()
      const delta = now - lastTick
      lastTick = now
      setElapsed((prev) => {
        let next = prev + delta
        const currentBox = Math.floor(prev / 7500)
        const nextBoundary = (currentBox + 1) * 7500
        
        if (next >= nextBoundary && window.speechSynthesis?.speaking) {
          next = nextBoundary - 1
        }
        
        if (next >= SIXTY_DURATION) {
          setPlaying(false)
          return SIXTY_DURATION
        }
        return next
      })
    }, 50)
    return () => window.clearInterval(timer)
  }, [playing])

  useEffect(() => {
    if (!playing) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel()
      return
    }
    if (!('speechSynthesis' in window)) return
    
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(`${story.title}. ${story.body}`)
    const voice = getLocalVoice('en-IN')
    if (voice) utterance.voice = voice
    utterance.lang = voice ? voice.lang : 'en-IN'
    utterance.rate = 1.25
    utterance.volume = 1.0
    window.speechSynthesis.speak(utterance)
  }, [active, playing, story.title, story.body])

  const toggle = () => {
    if (playing) setPlaying(false)
    else {
      if (elapsed >= SIXTY_DURATION) setElapsed(0)
      setPlaying(true)
    }
  }

  return (
    <ExperienceShell tone="sixty">
      <header className="xhead minute__head">
        <div>
          <p className="xeyebrow"><LotusMark size={16} /> The essential state</p>
          <h1>Odisha in 60 seconds</h1>
          <p className="xodia" lang="or">ଷାଠିଏ ସେକେଣ୍ଡରେ ଓଡ଼ିଶା</p>
        </div>
        <div className="minute__clock" style={{ '--progress': `${elapsed / SIXTY_DURATION}` } as React.CSSProperties}>
          <span>{Math.max(0, Math.ceil((SIXTY_DURATION - elapsed) / 1000))}</span><small>seconds</small>
        </div>
      </header>

      <section className={`minute__story minute__story--${story.tone}`} aria-live="polite">
        <p className="minute__time">{story.time} sec</p>
        <div className="minute__copy">
          <p className="minute__chapter">{String(active + 1).padStart(2, '0')} / 08</p>
          <h2>{story.title}</h2>
          <p className="minute__stat">{story.stat}</p>
          <p className="minute__body">{story.body}</p>
        </div>
        <button className="minute__control" type="button" onClick={toggle} aria-label={playing ? 'Pause one-minute story' : 'Play one-minute story'}>
          <span aria-hidden="true">{playing ? 'Ⅱ' : '▶'}</span>
          <span>{playing ? 'Pause' : elapsed >= duration ? 'Again' : elapsed > 0 ? 'Continue' : 'Start the minute'}</span>
        </button>
      </section>

      <div className="minute__progress" aria-hidden="true"><span style={{ width: `${(elapsed / SIXTY_DURATION) * 100}%` }} /></div>
      <nav className="minute__chapters" aria-label="One-minute chapters">
        {MINUTE_STORIES.map((item, index) => (
          <button key={item.title} type="button" className={index === active ? 'is-active' : ''} onClick={() => { setPlaying(false); setElapsed(index * 7500) }}>
            <span>{item.time}</span><strong>{item.title}</strong>
          </button>
        ))}
      </nav>
      <p className="minute__more">One minute gives you the map. <a href={BASE_URL}>The full exhibition gives you the terrain.</a></p>
    </ExperienceShell>
  )
}

interface FolkForm {
  name: string
  odia: string
  region: string
  hook: string
  detail: string
  plate: ArtPlateName
  accent: string
}

const FOLK_FORMS: FolkForm[] = [
  { name: 'Dalkhai', odia: 'ଡାଲଖାଇ', region: 'Western Odisha', hook: 'A festival begins with a call: Dalkhai bo!', detail: 'Young women dance in linked formations while dhol, nishan, tasa and mahuri drive the song. It is closely associated with Sambalpuri-speaking western Odisha.', plate: 'sambalpuri', accent: 'var(--sindoor-soft)' },
  { name: 'Ghumura', odia: 'ଘୁମୁରା', region: 'Kalahandi', hook: 'The drum is worn on the body; rhythm becomes movement.', detail: 'Performers carry the distinctive pitcher-shaped ghumura drum from the neck. The vigorous ensemble is often read through martial movement and ceremonial procession.', plate: 'saura', accent: 'var(--gold)' },
  { name: 'Mayurbhanj Chhau', odia: 'ମୟୂରଭଞ୍ଜ ଛଉ', region: 'Mayurbhanj', hook: 'A martial dance where the face remains visible.', detail: 'Unlike the masked Chhau styles of Seraikella and Purulia, Mayurbhanj Chhau is traditionally unmasked. Leaps, stances and combat grammar carry character and story.', plate: 'odissi', accent: 'var(--lagoon-soft)' },
  { name: 'Gotipua', odia: 'ଗୋଟିପୁଅ', region: 'Puri district', hook: 'Dance, song and acrobatics in a living lineage.', detail: 'Boys trained in female costume perform devotional repertoire and demanding bandha acrobatics. The tradition is an important strand in the modern history of Odissi.', plate: 'pattachitra', accent: 'var(--sindoor-soft)' },
  { name: 'Paika Akhada', odia: 'ପାଇକ ଆଖଡ଼ା', region: 'Coastal Odisha', hook: 'The dance floor is also a training ground.', detail: 'Sword, shield and staff drills preserve the movement vocabulary of Odisha’s historical paik militia through public martial performance.', plate: 'talapatra', accent: 'var(--leaf)' },
  { name: 'Ranapa', odia: 'ରଣପା', region: 'Ganjam', hook: 'Balance becomes spectacle, high above the ground.', detail: 'Performers dance on tall wooden stilts, turning a practical skill into a public display of rhythm, agility and collective balance.', plate: 'filigree', accent: 'var(--parchment-dim)' },
]

const RHYTHMS = [
  { id: 'dalkhai', name: 'Dalkhai pulse', instrument: 'Dhol · nishan · tasa', tempo: 112, beats: [2, 0, 1, 0, 2, 1, 0, 1] },
  { id: 'ghumura', name: 'Ghumura march', instrument: 'Ghumura ensemble', tempo: 96, beats: [2, 1, 0, 1, 2, 0, 1, 1] },
  { id: 'akhada', name: 'Akhada cadence', instrument: 'Drum · martial step', tempo: 124, beats: [2, 0, 2, 1, 0, 1, 2, 0] },
]

function FolkOdisha() {
  const [selected, setSelected] = useState(0)
  const [rhythm, setRhythm] = useState<string | null>(null)
  const [beat, setBeat] = useState(-1)
  const [volume, setVolume] = useState(200)
  const audio = useRef<AudioContext | null>(null)
  const volumeRef = useRef(2.0)
  const timer = useRef<any>(0)
  const form = FOLK_FORMS[selected]

  const stopRhythm = () => {
    window.clearInterval(timer.current)
    timer.current = 0
    setRhythm(null)
    setBeat(-1)
  }

  useEffect(() => () => {
    window.clearInterval(timer.current)
    void audio.current?.close()
  }, [])

  const hit = (accent: number) => {
    const AudioCtor = getAudioConstructor()
    if (!AudioCtor) return
    if (!audio.current) audio.current = new AudioCtor()
    const context = audio.current
    if (context.state === 'suspended') void context.resume()
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    const attack = context.createOscillator()
    const attackGain = context.createGain()
    const compressor = context.createDynamicsCompressor()
    const now = context.currentTime
    oscillator.type = accent === 2 ? 'sine' : 'triangle'
    oscillator.frequency.setValueAtTime(accent === 2 ? 150 : 220, now)
    oscillator.frequency.exponentialRampToValueAtTime(accent === 2 ? 70 : 105, now + 0.2)
    gain.gain.setValueAtTime((accent === 2 ? 0.62 : 0.38) * volumeRef.current, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28)

    attack.type = 'triangle'
    attack.frequency.setValueAtTime(accent === 2 ? 920 : 680, now)
    attack.frequency.exponentialRampToValueAtTime(260, now + 0.045)
    attackGain.gain.setValueAtTime((accent === 2 ? 0.24 : 0.15) * volumeRef.current, now)
    attackGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055)

    compressor.threshold.value = -18
    compressor.knee.value = 10
    compressor.ratio.value = 8
    compressor.attack.value = 0.003
    compressor.release.value = 0.16
    compressor.connect(context.destination)
    oscillator.connect(gain).connect(compressor)
    attack.connect(attackGain).connect(compressor)
    oscillator.start(now)
    attack.start(now)
    oscillator.stop(now + 0.3)
    attack.stop(now + 0.06)
  }

  const playRhythm = (id: string) => {
    if (rhythm === id) { stopRhythm(); return }
    stopRhythm()
    const pattern = RHYTHMS.find((item) => item.id === id)!
    let index = 0
    const next = () => {
      setBeat(index)
      if (pattern.beats[index]) hit(pattern.beats[index])
      index = (index + 1) % pattern.beats.length
    }
    setRhythm(id)
    next()
    timer.current = window.setInterval(next, 30000 / pattern.tempo)
  }

  return (
    <ExperienceShell tone="folk">
      <header className="xhead folk__head">
        <div>
          <p className="xeyebrow"><LotusMark size={16} /> Music in the body</p>
          <h1>Folk music & dance</h1>
          <p className="xodia" lang="or">ଓଡ଼ିଶାର ଲୋକକଳା</p>
        </div>
        <p className="folk__intro">Not one folk tradition, but many landscapes moving differently: western fields, southern hills, coastal akhadas and temple towns.</p>
      </header>

      <section className="folkstage" style={{ '--folk-accent': form.accent } as React.CSSProperties}>
        <div className="folkstage__art"><ArtPlate name={form.plate} accent={form.accent} /></div>
        <div className="folkstage__copy">
          <p className="folkstage__region">{form.region}</p>
          <h2>{form.name} <span lang="or">{form.odia}</span></h2>
          <p className="folkstage__hook">{form.hook}</p>
          <p className="folkstage__detail">{form.detail}</p>
        </div>
      </section>

      <div className="folkforms" role="tablist" aria-label="Odisha movement traditions">
        {FOLK_FORMS.map((item, index) => (
          <button key={item.name} type="button" role="tab" aria-selected={selected === index} className={selected === index ? 'is-active' : ''} onClick={() => setSelected(index)}>
            <span>{String(index + 1).padStart(2, '0')}</span><strong>{item.name}</strong><small>{item.region}</small>
          </button>
        ))}
      </div>

      <section className="rhythmlab" aria-labelledby="rhythm-title">
        <div className="rhythmlab__head">
          <div><p className="xeyebrow">Interactive rhythm room</p><h2 id="rhythm-title">Feel the pattern</h2></div>
          <div className="rhythmlab__controls">
            <label htmlFor="rhythm-volume"><span>Output</span><strong>{volume}%</strong></label>
            <input
              id="rhythm-volume"
              type="range"
              min="50"
              max="250"
              step="5"
              value={volume}
              onChange={(event) => {
                const next = Number(event.target.value)
                setVolume(next)
                volumeRef.current = next / 100
              }}
            />
          </div>
        </div>
        <p className="rhythmlab__note">Synthesized rhythm sketches, not archival or field recordings. Tap a pattern to hear it.</p>
        <div className="rhythmlab__grid">
          {RHYTHMS.map((item) => (
            <button key={item.id} type="button" className={rhythm === item.id ? 'is-playing' : ''} onClick={() => playRhythm(item.id)}>
              <span className="rhythm__play" aria-hidden="true">{rhythm === item.id ? '■' : '▶'}</span>
              <span><strong>{item.name}</strong><small>{item.instrument} · {item.tempo} BPM</small></span>
              <span className="rhythm__beats" aria-hidden="true">{item.beats.map((value, index) => <i key={index} className={rhythm === item.id && beat === index ? 'is-hit' : ''} data-accent={value} />)}</span>
            </button>
          ))}
        </div>
        <SauraBand className="rhythmlab__band" />
      </section>
    </ExperienceShell>
  )
}

const path = window.location.pathname
const experience = path.includes('/listen/')
  ? <ListenOdisha />
  : path.includes('/sixty/')
    ? <SixtySecondOdisha />
    : <FolkOdisha />

createRoot(document.getElementById('root')!).render(<StrictMode>{experience}</StrictMode>)
