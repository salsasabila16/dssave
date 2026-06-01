import { motion } from 'framer-motion'
import { useLang } from '../context/LanguageContext'
import { useTranslations } from '../utils/translations'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export default function SparkSection() {
  const lang = useLang()
  const t = useTranslations(lang).spark

  return (
    <section id="contact" className="relative py-20 px-4 overflow-hidden">
      <div className="nebula-blob w-96 h-96 bg-[#0B8FFF] -left-16 top-0" aria-hidden="true" />
      <div className="nebula-blob w-64 h-64 bg-[#2D9CDB] right-0 bottom-0" aria-hidden="true" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left: Text */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <span className="section-badge mb-5 inline-flex">{t.badge}</span>
            <h2 className="text-3xl sm:text-[2.75rem] font-heading font-bold mb-6 leading-tight">
              {t.title} <span className="text-gradient">{t.titleAccent}</span>
            </h2>
            <p className="text-[#829AB1] text-base leading-relaxed mb-4">{t.body1}</p>
            <p className="text-[#829AB1] text-base leading-relaxed">{t.body2}</p>
          </motion.div>

          {/* Right: Orbit visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center"
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72">
              {/* Core glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#2D9CDB]/18 to-[#0B8FFF]/18 blur-3xl" />
              {/* Center */}
              <div className="absolute inset-[18%] flex items-center justify-center">
                <img src="/src/assets/dssave.png" alt="DSSAVE" className="w-full h-full object-cover rounded-full" />
              </div>
              {/* Orbit 1 */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-6 rounded-full border border-[#2D9CDB]/18"
              >
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#2D9CDB] shadow-md shadow-[#2D9CDB]/70" />
              </motion.div>
              {/* Orbit 2 */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-1 rounded-full border border-[#0B8FFF]/12"
              >
                <div className="absolute top-3 -right-1.5 w-2.5 h-2.5 rounded-full bg-[#0B8FFF] shadow-md shadow-[#0B8FFF]/60" />
              </motion.div>
              {/* Orbit 3 */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-3 rounded-full border border-[#00D2FF]/08"
              >
                <div className="absolute bottom-6 right-6 w-2 h-2 rounded-full bg-[#00D2FF]/75" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
