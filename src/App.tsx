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

export default function App() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Nav />
      <ScrollWheel />
      <div className="shell">
        <Hero />
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
