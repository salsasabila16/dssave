import { motion } from 'framer-motion'
import {
  FiAlertOctagon, FiClock, FiEyeOff, FiShield, FiZapOff, FiGrid,
} from 'react-icons/fi'
import { useLang } from '../context/LanguageContext'
import { useTranslations } from '../utils/translations'

const ICONS  = [FiAlertOctagon, FiClock, FiEyeOff, FiShield, FiZapOff, FiGrid]
const COLORS = ['#FF6B6B', '#FFB347', '#A78BFA', '#F87171', '#FBBF24', '#60A5FA']

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
}

export default function ProblemSection() {
  const lang = useLang()
  const t    = useTranslations(lang).problem

  return (
    <section id="about" className="relative py-20 px-4 overflow-hidden">
      <div className="nebula-blob w-64 h-64 bg-[#FF6B6B] -left-16 top-8" aria-hidden="true" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <span className="section-badge mb-4 inline-flex">{t.badge}</span>
          <h2 className="text-3xl sm:text-[2.75rem] font-heading font-bold mb-3 leading-tight">
            {t.title1} <span className="text-gradient">{t.titleAccent}</span> {t.title2}
          </h2>
          <p className="text-[#829AB1] text-base max-w-lg mx-auto leading-relaxed">{t.sub}</p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {t.items.map((item, i) => {
            const Icon  = ICONS[i]
            const color = COLORS[i]
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden group cursor-default"
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle at top left, ${color}0A, transparent 65%)` }}
                />
                <div className="relative z-10">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${color}18`, border: `1px solid ${color}2E` }}
                  >
                    <Icon size={20} color={color} />
                  </div>
                  <h3 className="font-heading text-[0.9rem] font-semibold text-white mb-1.5">{item.title}</h3>
                  <p className="text-[#829AB1] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.p
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
          className="text-center text-[#829AB1] text-sm mt-10"
        >
          {t.footer}
        </motion.p>
      </div>
    </section>
  )
}
