import { motion } from 'framer-motion'
import { useCountUp } from '../hooks/useCountUp'
import { FiDownload, FiUsers, FiActivity, FiLayers } from 'react-icons/fi'

const STATS = [
  { value: 500000, suffix: '+', display: '500K+', label: 'Unduhan Berhasil', Icon: FiDownload, color: '#2D9CDB' },
  { value: 50000, suffix: '+', display: '50K+', label: 'Pengguna Aktif', Icon: FiUsers, color: '#0B8FFF' },
  { value: 999, suffix: '%', display: '99.9%', label: 'Uptime Server', Icon: FiActivity, color: '#00D2FF', isFloat: true },
  { value: 6, suffix: '', display: '6', label: 'Platform Didukung', Icon: FiLayers, color: '#2D9CDB' },
]

function StatCard({ stat }: { stat: typeof STATS[number] }) {
  const { count, ref } = useCountUp(stat.isFloat ? 999 : stat.value, 2200)

  const displayCount = stat.isFloat
    ? (count / 10).toFixed(1)
    : count >= 1000
    ? (count / 1000).toFixed(0) + 'K'
    : count.toString()

  return (
    <div ref={ref} className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col items-center text-center group relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl"
        style={{ background: `radial-gradient(circle at bottom, ${stat.color}08, transparent 70%)` }}
      />
      <div
        className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${stat.color}18`, border: `1px solid ${stat.color}28` }}
      >
        <stat.Icon size={20} color={stat.color} />
      </div>
      <div className="relative z-10 text-4xl sm:text-5xl font-heading font-bold text-gradient mb-1.5 leading-none">
        {displayCount}
        <span className="text-2xl sm:text-3xl">{stat.suffix}</span>
      </div>
      <p className="relative z-10 text-[#829AB1] text-sm font-medium mt-1">{stat.label}</p>
    </div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

export default function Statistics() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="nebula-blob w-72 h-72 bg-[#00D2FF] -right-16 top-1/2 -translate-y-1/2" aria-hidden="true" />
      <div className="nebula-blob w-64 h-64 bg-[#0B8FFF] -left-16 top-1/2 -translate-y-1/2" aria-hidden="true" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <span className="section-badge mb-4 inline-flex">Dalam Angka</span>
          <h2 className="text-3xl sm:text-[2.75rem] font-heading font-bold mb-3 leading-tight">
            Dipercaya <span className="text-gradient">Ribuan Pengguna</span>
          </h2>
          <p className="text-[#829AB1] text-base max-w-md mx-auto">
            Bergabunglah dengan komunitas yang terus berkembang setiap harinya.
          </p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {STATS.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp}>
              <StatCard stat={stat} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
