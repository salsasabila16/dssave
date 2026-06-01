import { useState, useEffect } from 'react'
import './App.css'
import { LanguageContext } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProblemSection from './components/ProblemSection'
import UniquenessSection from './components/UniquenessSection'
import HowToUse from './components/HowToUse'
import FeaturesGrid from './components/FeaturesGrid'
import SparkSection from './components/SparkSection'
import FAQ from './components/FAQ'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import MouseGlow from './components/MouseGlow'


function Divider() {
  return <div className="section-divider mx-auto max-w-xl" />
}

export default function App() {
  const [isDark, setIsDark] = useState(true)
  const [lang,   setLang]   = useState<'en' | 'id'>('id')

  useEffect(() => {
    document.body.classList.toggle('light-mode', !isDark)
    document.body.classList.toggle('galaxy-bg', isDark)
    return () => {
      document.body.classList.remove('light-mode', 'galaxy-bg')
    }
  }, [isDark])

  return (
    <LanguageContext.Provider value={lang}>
      <div className={`relative min-h-screen ${isDark ? 'galaxy-bg' : 'light-mode'}`}>
        <div className="stars-layer" aria-hidden="true" />
        {isDark && <MouseGlow />}
        <Navbar isDark={isDark} onToggleTheme={() => setIsDark((d) => !d)} currentLang={lang} onToggleLang={() => setLang((l) => l === 'id' ? 'en' : 'id')} />
        <main key={lang}>
          <Hero />
          <Divider />
          <ProblemSection />
          <Divider />
          <UniquenessSection />
          <Divider />
          <HowToUse />
          <Divider />
          <FeaturesGrid />
          <Divider />
          <SparkSection />
          <Divider />
          <FAQ />
          <Divider />
          <CTASection />
        </main>
        <Footer />
      </div>
    </LanguageContext.Provider>
  )
}
