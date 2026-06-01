import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'
import { useLang } from '../context/LanguageContext'
import { useTranslations } from '../utils/translations'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export default function FAQ() {
  const lang = useLang()
  const t = useTranslations(lang).faq
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <section id="faq" className="relative py-20 px-4 overflow-hidden">
      <div className="nebula-blob w-64 h-64 bg-[#2D9CDB] -left-10 bottom-0" aria-hidden="true" />

      <div className="max-w-2xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="text-center mb-10"
        >
          <span className="section-badge mb-4 inline-flex">{t.badge}</span>
          <h2 className="text-3xl sm:text-[2.75rem] font-heading font-bold mb-3 leading-tight">
            {t.title1} <span className="text-gradient">{t.titleAccent}</span>
          </h2>
          <p className="text-[#829AB1] text-base">{t.sub}</p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={lang}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.14 }}
            className="glass-card rounded-2xl overflow-hidden"
          >
            {t.items.map((faq, i) => (
                <div key={`${lang}-${i}`} className="border-b border-white/5 last:border-b-0">
                  <button
                    className="w-full flex items-start gap-4 px-6 py-4 text-left hover:bg-white/3 transition-colors group"
                    onClick={() => setExpanded(expanded === i ? null : i)}
                  >
                    <span className="flex-1 text-sm font-medium text-[#D9E2EC] group-hover:text-white transition-colors leading-relaxed">
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: expanded === i ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-[#829AB1] flex-shrink-0 mt-0.5"
                    >
                      <FiChevronDown size={15} />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {expanded === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-4 text-sm text-[#829AB1] leading-relaxed border-l-2 border-[#2D9CDB]/35 ml-6">
                          {faq.a}
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
