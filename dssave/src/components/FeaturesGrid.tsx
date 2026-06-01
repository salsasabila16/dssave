import { motion } from 'framer-motion'
import { FiCheckCircle, FiShield, FiMonitor, FiMusic } from 'react-icons/fi'
import { useLang } from '../context/LanguageContext'
import { useTranslations } from '../utils/translations'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

export default function FeaturesGrid() {
  const lang = useLang()
  const t = useTranslations(lang).features

  const [f0, f1, f2, f3] = t.items

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp} custom={0}
          className="text-center mb-14"
        >
          <span className="section-badge mb-4 inline-flex">{t.badge}</span>
          <h2 className="text-3xl sm:text-[2.75rem] font-heading font-bold mb-3 leading-tight">
            {t.title1} <span className="text-gradient">{t.titleAccent}</span>
          </h2>
          <p className="text-[#829AB1] text-base max-w-md mx-auto">{t.sub}</p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Card 1 — Tanpa Watermark */}
          <motion.div
            custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            className="group glass-card rounded-3xl p-7 relative overflow-hidden cursor-default border border-[#00D2FF]/15 hover:border-[#00D2FF]/35 transition-all duration-400"
          >
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#00D2FF]/5 blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#00D2FF]/10 transition-colors duration-500" />
            <div className="relative z-10">
              <div className="w-11 h-11 rounded-2xl bg-[#00D2FF]/10 border border-[#00D2FF]/20 flex items-center justify-center mb-5">
                <FiCheckCircle size={20} color="#00D2FF" />
              </div>
              <h3 className="font-heading font-bold text-white text-xl mb-1.5">{f0.title}</h3>
              <p className="text-[#829AB1] text-sm leading-relaxed mb-6">{f0.desc}</p>

              {/* Visual: file status chips */}
              <div className="flex flex-col gap-2">
                {['video.mp4', 'clip.mp4', 'reel.mp4'].map((name, i) => (
                  <div key={name} className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/4 border border-white/6">
                    <span className="text-[#829AB1] text-xs font-mono">{name}</span>
                    <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                      CLEAN
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2 — Aman & Terlindungi */}
          <motion.div
            custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            className="group glass-card rounded-3xl p-7 relative overflow-hidden cursor-default border border-[#0B8FFF]/15 hover:border-[#0B8FFF]/35 transition-all duration-400"
          >
            <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-[#0B8FFF]/5 blur-2xl translate-y-1/2 -translate-x-1/4 group-hover:bg-[#0B8FFF]/10 transition-colors duration-500" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-11 h-11 rounded-2xl bg-[#0B8FFF]/10 border border-[#0B8FFF]/20 flex items-center justify-center mb-5">
                <FiShield size={20} color="#0B8FFF" />
              </div>
              <h3 className="font-heading font-bold text-white text-xl mb-3">{f1.title}</h3>
              <p className="text-[#829AB1] text-sm leading-7">{f1.desc}</p>
            </div>
          </motion.div>

          {/* Card 3 — Unduhan HD */}
          <motion.div
            custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            className="group glass-card rounded-3xl p-7 relative overflow-hidden cursor-default border border-[#2D9CDB]/15 hover:border-[#2D9CDB]/35 transition-all duration-400"
          >
            <div className="absolute top-0 left-1/2 w-40 h-40 rounded-full bg-[#2D9CDB]/5 blur-2xl -translate-y-1/2 -translate-x-1/2 group-hover:bg-[#2D9CDB]/10 transition-colors duration-500" />
            <div className="relative z-10">
              <div className="w-11 h-11 rounded-2xl bg-[#2D9CDB]/10 border border-[#2D9CDB]/20 flex items-center justify-center mb-5">
                <FiMonitor size={20} color="#2D9CDB" />
              </div>
              <h3 className="font-heading font-bold text-white text-xl mb-1.5">{f2.title}</h3>
              <p className="text-[#829AB1] text-sm leading-relaxed mb-6">{f2.desc}</p>

              {/* Visual: quality tiers */}
              <div className="flex flex-col gap-2.5">
                {[
                  { q: '360p', label: 'SD',  w: 'w-1/3',  opacity: 'opacity-40' },
                  { q: '720p', label: 'HD',  w: 'w-2/3',  opacity: 'opacity-70' },
                  { q: '1080p',label: 'FHD', w: 'w-full', opacity: 'opacity-100' },
                ].map(({ q, label, w, opacity }) => (
                  <div key={q} className="flex items-center gap-3">
                    <span className={`text-[11px] font-bold font-mono text-[#2D9CDB] w-12 flex-shrink-0 ${opacity}`}>{q}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-white/5">
                      <div className={`h-full rounded-full bg-[#2D9CDB] ${w} ${opacity} transition-all duration-700`} />
                    </div>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#2D9CDB]/12 text-[#2D9CDB] ${opacity}`}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 4 — Format & Audio */}
          <motion.div
            custom={4} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            className="group glass-card rounded-3xl p-7 relative overflow-hidden cursor-default border border-[#38BDF8]/15 hover:border-[#38BDF8]/35 transition-all duration-400"
          >
            <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-[#38BDF8]/5 blur-2xl translate-y-1/3 translate-x-1/3 group-hover:bg-[#38BDF8]/10 transition-colors duration-500" />
            <div className="relative z-10">
              <div className="w-11 h-11 rounded-2xl bg-[#38BDF8]/10 border border-[#38BDF8]/20 flex items-center justify-center mb-5">
                <FiMusic size={20} color="#38BDF8" />
              </div>
              <h3 className="font-heading font-bold text-white text-xl mb-1.5">{f3.title}</h3>
              <p className="text-[#829AB1] text-sm leading-relaxed mb-6">{f3.desc}</p>

              {/* Visual: format chips + waveform */}
              <div className="flex flex-wrap gap-2 mb-4">
                {['MP4 360p', 'MP4 720p', 'MP4 1080p', 'MP3', 'MP2'].map((fmt) => (
                  <span
                    key={fmt}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-semibold font-mono border"
                    style={{ background: 'rgba(56,189,248,0.07)', borderColor: 'rgba(56,189,248,0.18)', color: '#38BDF8' }}
                  >
                    {fmt}
                  </span>
                ))}
              </div>
              {/* Mini waveform */}
              <div className="flex items-end gap-[3px] h-6 opacity-40">
                {[3, 5, 8, 12, 9, 14, 10, 7, 11, 6, 9, 13, 8, 5, 4, 7, 10, 8, 6, 4].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm bg-[#38BDF8]" style={{ height: `${h * 1.5}px` }} />
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
