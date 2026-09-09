import { useState } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import { ChapterNavigator } from './components/ChapterNavigator'
import { JourneyMode } from './components/JourneyMode'
import { KioskMode } from './components/KioskMode'
import { Nav } from './components/Nav'
import { ScrollWheel } from './components/ScrollWheel'
import { Hero } from './sections/Hero'
import { SixtySeconds } from './sections/SixtySeconds'
import { WheelSection } from './sections/WheelSection'
import { LandSection } from './sections/LandSection'
import { HeritageSection } from './sections/HeritageSection'
import { FaithSection } from './sections/FaithSection'
import { CultureSection } from './sections/CultureSection'
import { FoodSection } from './sections/FoodSection'
import { HeroesSection } from './sections/HeroesSection'
import { NatureSection } from './sections/NatureSection'
import { ResilienceSection } from './sections/ResilienceSection'
import { ModernSection } from './sections/ModernSection'
import { OneIndiaSection } from './sections/OneIndiaSection'
import { MoreExperiencesSection } from './sections/MoreExperiencesSection'
import { Footer } from './sections/Footer'
import { useActiveSection } from './hooks/useActiveSection'
import { CHAPTERS } from './data/nav'
import { useAmbience } from './hooks/useAmbience'

const IDS = CHAPTERS.map((c) => c.id)

function ExhibitionContent() {
  const [journeyOpen, setJourneyOpen] = useState(false)
  const [kioskActive, setKioskActive] = useState(false)
  const activeSectionId = useActiveSection(IDS)
  const { strike } = useAmbience()

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <ChapterNavigator activeId={activeSectionId} />
      <Nav
        onStartJourney={() => setJourneyOpen(true)}
        onToggleKiosk={() => setKioskActive(!kioskActive)}
      />
      <ScrollWheel />
      <KioskMode
        isKioskActive={kioskActive}
        onToggleKiosk={() => setKioskActive(!kioskActive)}
      />
      <JourneyMode
        isOpen={journeyOpen}
        onClose={() => setJourneyOpen(false)}
        onStrikeBell={strike}
      />
      <div className="shell">
        <Hero onStartJourney={() => setJourneyOpen(true)} />
        <main id="main">
          <SixtySeconds />
          <WheelSection />
          <LandSection />
          <HeritageSection />
          <FaithSection />
          <CultureSection />
          <FoodSection />
          <HeroesSection />
          <NatureSection />
          <ResilienceSection />
          <ModernSection />
          <MoreExperiencesSection />
          <OneIndiaSection />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <ExhibitionContent />
    </LanguageProvider>
  )
}
