import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaYoutube, FaInstagram, FaFacebookF } from 'react-icons/fa'
import { SiTiktok, SiPinterest } from 'react-icons/si'
import { FaXTwitter } from 'react-icons/fa6'
import { FiChevronDown, FiCheck } from 'react-icons/fi'
import { useLang } from '../context/LanguageContext'
import { useTranslations } from '../utils/translations'

const PLATFORM_ICONS: Record<string, { Icon: React.ComponentType<{ size?: number; color?: string }>, color: string }> = {
  YouTube:       { Icon: FaYoutube,   color: '#FF0000' },
  TikTok:        { Icon: SiTiktok,    color: '#ffffff' },
  Instagram:     { Icon: FaInstagram, color: '#E1306C' },
  Facebook:      { Icon: FaFacebookF, color: '#1877F2' },
  'X (Twitter)': { Icon: FaXTwitter,  color: '#ffffff' },
  Pinterest:     { Icon: SiPinterest, color: '#E60023' },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export default function HowToUse() {
  const lang = useLang()
  const t    = useTranslations(lang).howToUse
  const [activePlatform, setActivePlatform] = useState(0)
  const [expandedStep,   setExpandedStep]   = useState<number | null>(null)

  const platform = t.platforms[activePlatform]

  return (
    <section id="how-to-use" className="relative py-20 px-4 overflow-hidden">
      <div className="nebula-blob w-64 h-64 bg-[#2D9CDB] left-1/2 -translate-x-1/2 -top-8" aria-hidden="true" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="text-center mb-10"
        >
          <span className="section-badge mb-4 inline-flex">{t.badge}</span>
          <h2 className="text-3xl sm:text-[2.75rem] font-heading font-bold mb-3 leading-tight">
            {t.title1} <span className="text-gradient">{t.titleAccent}</span>
          </h2>
          <p className="text-[#829AB1] text-base max-w-lg mx-auto">{t.sub}</p>
        </motion.div>

        {/* Platform Tabs */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {t.platforms.map((p, i) => {
            const platformData = PLATFORM_ICONS[p.name]
            const isActive     = activePlatform === i
            return (
              <button
                key={p.name}
                onClick={() => { setActivePlatform(i); setExpandedStep(null) }}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                  isActive
                    ? 'text-white border-[#2D9CDB]/45 bg-[#2D9CDB]/12 shadow-md shadow-[#2D9CDB]/10'
                    : 'text-[#829AB1] border-white/8 hover:border-white/20 hover:text-[#D9E2EC]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="tab-bg"
                    className="absolute inset-0 rounded-xl bg-[#2D9CDB]/10 border border-[#2D9CDB]/35"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {platformData && (
                    <platformData.Icon size={13} color={isActive ? platformData.color : undefined} />
                  )}
                  {p.name}
                </span>
              </button>
            )
          })}
        </motion.div>

        {/* Accordion */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${lang}-${activePlatform}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="glass-card rounded-2xl overflow-hidden"
          >
            {platform.steps.map((step, i) => (
              <div key={i} className="border-b border-white/5 last:border-b-0">
                <button
                  className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-white/3 transition-colors group"
                  onClick={() => setExpandedStep(expandedStep === i ? null : i)}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all ${
                    expandedStep === i
                      ? 'bg-[#2D9CDB] text-white'
                      : 'bg-[#2D9CDB]/15 border border-[#2D9CDB]/40 text-[#2D9CDB] group-hover:bg-[#2D9CDB]/25 group-hover:text-[#00D2FF]'
                  }`}>
                    {expandedStep === i ? <FiCheck size={13} /> : i + 1}
                  </div>
                  <span className={`flex-1 text-sm font-medium transition-colors ${
                    expandedStep === i ? 'text-white' : 'text-[#D9E2EC]'
                  }`}>
                    {step.title}
                  </span>
                  <motion.span
                    animate={{ rotate: expandedStep === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[#829AB1] flex-shrink-0"
                  >
                    <FiChevronDown size={15} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {expandedStep === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-4 pl-[4.25rem] text-sm text-[#829AB1] leading-relaxed border-l-2 border-[#2D9CDB]/30 ml-10 mr-6">
                        {step.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
