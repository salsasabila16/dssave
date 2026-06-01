import { motion } from 'framer-motion'
import { FiLayers, FiMonitor, FiZap, FiUserX, FiSmartphone, FiLock } from 'react-icons/fi'
import { useLang } from '../context/LanguageContext'
import { useTranslations } from '../utils/translations'

const CARDS = [
  { Icon: FiLayers,    color: '#2D9CDB', num: '01' },
  { Icon: FiMonitor,   color: '#00D2FF', num: '02' },
  { Icon: FiZap,       color: '#0B8FFF', num: '03' },
  { Icon: FiUserX,     color: '#38BDF8', num: '04' },
  { Icon: FiSmartphone,color: '#2D9CDB', num: '05' },
  { Icon: FiLock,      color: '#00D2FF', num: '06' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

export default function UniquenessSection() {
  const lang = useLang()
  const t = useTranslations(lang).uniqueness

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mb-16"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="section-badge mb-4 inline-flex">{t.badge}</span>
              <h2 className="text-3xl sm:text-[2.75rem] font-heading font-bold leading-tight">
                {t.title1} <span className="text-gradient">{t.titleAccent}</span>
              </h2>
            </div>
            <p className="text-[#829AB1] text-sm max-w-xs leading-relaxed sm:text-right pb-1">
              {t.sub}
            </p>
          </div>
          {/* Garis pembatas */}
          <div className="mt-8 h-px bg-gradient-to-r from-[#2D9CDB]/40 via-[#00D2FF]/20 to-transparent" />
        </motion.div>

        {/* Grid kartu */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}
          variants={stagger}
          className="uniqueness-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-3xl overflow-hidden border border-[rgba(255,255,255,0.08)]"
        >
          {t.items.map((item, i) => {
            const { Icon, color, num } = CARDS[i]
            const isLast = i === t.items.length - 1
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className={`uniqueness-card group relative p-7 flex flex-col gap-5 cursor-default transition-colors duration-300 ${
                  isLast && t.items.length % 3 !== 0 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Nomor + ikon */}
                <div className="flex items-start justify-between">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: `${color}14`,
                      border: `1.5px solid ${color}28`,
                      boxShadow: `0 0 20px ${color}10`,
                    }}
                  >
                    <Icon size={22} style={{ color }} />
                  </div>
                  <span
                    className="font-heading font-bold text-[1.8rem] leading-none opacity-10 group-hover:opacity-20 transition-opacity duration-300 select-none"
                    style={{ color }}
                  >
                    {num}
                  </span>
                </div>

                {/* Teks */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-heading font-semibold text-white text-[1rem] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[#829AB1] text-sm leading-relaxed">{item.desc}</p>
                </div>

                {/* Garis bawah saat hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
                  style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                />
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
