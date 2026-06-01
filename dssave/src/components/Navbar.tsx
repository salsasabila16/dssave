import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiDownload, FiMenu, FiX, FiSun, FiMoon, FiChevronDown } from 'react-icons/fi'
import { useLang } from '../context/LanguageContext'
import { useTranslations } from '../utils/translations'

interface NavbarProps {
  isDark: boolean
  onToggleTheme: () => void
  currentLang: 'en' | 'id'
  onToggleLang: () => void
}

const PLATFORM_NAMES = ['YouTube', 'TikTok', 'Instagram', 'Facebook', 'X (Twitter)', 'Pinterest']

export default function Navbar({ isDark, onToggleTheme, currentLang, onToggleLang }: NavbarProps) {
  const lang = useLang()
  const t = useTranslations(lang).nav
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const NAV_LINKS = [
    { label: t.home, href: '#home' },
    { label: t.about, href: '#about' },
    { label: t.howToUse, href: '#how-to-use', hasDropdown: true },
    { label: t.faq, href: '#faq' },
    { label: t.contact, href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-[#0A192F]/92 backdrop-blur-xl border-[#2D9CDB]/10 shadow-xl shadow-black/25'
          : 'bg-transparent border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 flex-shrink-0 group">
          <img src="/src/assets/dssave.png" alt="DSSAVE" className="w-8 h-8 rounded-xl object-contain" />
          <span className="text-xl font-heading font-bold text-gradient tracking-wide">DSSAVE</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {NAV_LINKS.map((link) =>
            link.hasDropdown ? (
              <div key={link.label} className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-sm text-[#D9E2EC] hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  {link.label}
                  <motion.span animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <FiChevronDown size={13} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-44 glass-card rounded-xl overflow-hidden shadow-2xl shadow-black/40 border border-[#2D9CDB]/15"
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      {PLATFORM_NAMES.map((p) => (
                        <a
                          key={p}
                          href="#how-to-use"
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-2.5 text-sm text-[#D9E2EC] hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {p}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-2 text-sm text-[#D9E2EC] hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </a>
            )
          )}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-2.5 flex-shrink-0">
          {/* Toggle bahasa */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#D9E2EC] hover:text-white hover:bg-white/8 transition-all border border-white/10"
            aria-label="Ganti bahasa"
          >
            <span className="text-base leading-none">{currentLang === 'id' ? '🇮🇩' : '🇺🇸'}</span>
            {currentLang === 'id' ? 'ID' : 'EN'}
          </button>
          <button
            onClick={onToggleTheme}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[#D9E2EC] hover:text-white hover:bg-white/8 transition-all border border-white/10"
            aria-label="Ganti tema"
          >
            {isDark ? <FiSun size={15} /> : <FiMoon size={15} />}
          </button>
          <a
            href="#hero-input"
            className="glow-button flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold"
          >
            <FiDownload size={13} />
            {t.downloadNow}
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onToggleTheme}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[#D9E2EC] hover:bg-white/8 transition-all"
          >
            {isDark ? <FiSun size={15} /> : <FiMoon size={15} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[#D9E2EC] hover:bg-white/8 transition-all border border-white/10"
          >
            {mobileOpen ? <FiX size={17} /> : <FiMenu size={17} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="lg:hidden overflow-hidden glass-card border-t border-white/5"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-3 text-sm text-[#D9E2EC] hover:text-white hover:bg-white/5 transition-colors rounded-xl"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 flex flex-col gap-2 border-t border-white/8 mt-1">
                <button
                  onClick={() => { onToggleLang(); setMobileOpen(false) }}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm text-[#D9E2EC] border border-white/10 hover:bg-white/5 transition-all"
                >
                  <span className="text-base">{currentLang === 'id' ? '🇮🇩' : '🇺🇸'}</span>
                  {currentLang === 'id' ? 'Bahasa Indonesia' : 'English'}
                </button>
                <a
                  href="#hero-input"
                  onClick={() => setMobileOpen(false)}
                  className="glow-button flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm"
                >
                  <FiDownload size={14} />
                  {t.downloadNow}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
