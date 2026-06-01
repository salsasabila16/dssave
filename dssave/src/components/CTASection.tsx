import { motion } from 'framer-motion'
import { FiDownload, FiArrowRight } from 'react-icons/fi'
import { useLang } from '../context/LanguageContext'
import { useTranslations } from '../utils/translations'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

export default function CTASection() {
  const lang = useLang()
  const t = useTranslations(lang).cta

  return (
    <section className="relative py-16 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="cta-panel relative rounded-3xl overflow-hidden px-8 py-16 sm:px-16 sm:py-20">

          {/* Dark mode: animated rings */}
          <div className="cta-rings absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
            <motion.div
              animate={{ scale: [1, 1.07, 1], opacity: [0.08, 0.16, 0.08] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-[420px] h-[420px] rounded-full border border-[#2D9CDB]/35"
            />
            <motion.div
              animate={{ scale: [1, 1.12, 1], opacity: [0.05, 0.1, 0.05] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
              className="absolute w-[580px] h-[580px] rounded-full border border-[#2D9CDB]/20"
            />
          </div>

          {/* Light mode: decorative dots */}
          <div className="cta-dots absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="absolute top-6 right-12 w-24 h-24 rounded-full bg-white/10" />
            <div className="absolute bottom-8 left-10 w-16 h-16 rounded-full bg-white/8" />
            <div className="absolute top-1/2 right-6 w-8 h-8 rounded-full bg-white/12" />
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <motion.h2
              custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}
              className="cta-title text-4xl sm:text-5xl md:text-[3.2rem] font-heading font-bold leading-[1.08] tracking-tight mb-5"
            >
              {t.title1}{' '}
              <span className="cta-accent">{t.titleAccent}</span>
            </motion.h2>

            <motion.p
              custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}
              className="cta-sub text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10"
            >
              {t.sub}
            </motion.p>

            <motion.div
              custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}
            >
              <a
                href="#home"
                className="cta-btn inline-flex items-center gap-3 px-9 py-4 rounded-2xl text-base font-bold"
              >
                <FiDownload size={18} />
                {t.primary}
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <FiArrowRight size={17} />
                </motion.span>
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
