import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaYoutube, FaInstagram, FaFacebookF } from 'react-icons/fa'
import { SiTiktok, SiPinterest } from 'react-icons/si'
import { FaXTwitter } from 'react-icons/fa6'
import { FiActivity } from 'react-icons/fi'

const PLATFORMS = [
  { name: 'YouTube', icon: FaYoutube, color: '#FF0000' },
  { name: 'TikTok', icon: SiTiktok, color: '#ffffff' },
  { name: 'Instagram', icon: FaInstagram, color: '#E1306C' },
  { name: 'Facebook', icon: FaFacebookF, color: '#1877F2' },
  { name: 'X', icon: FaXTwitter, color: '#ffffff' },
  { name: 'Pinterest', icon: SiPinterest, color: '#E60023' },
]

export default function PlatformStatus() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="glass-card rounded-2xl p-4 mb-2 shadow-xl shadow-black/30 min-w-[160px]"
          >
            <p className="text-white text-xs font-heading font-semibold mb-3">Platform Status</p>
            <div className="flex flex-col gap-2.5">
              {PLATFORMS.map(({ name, icon: Icon, color }) => (
                <div key={name} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Icon size={12} style={{ color }} />
                    <span className="text-[#D9E2EC] text-xs">{name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
                    <span className="text-emerald-400 text-[10px] font-medium">Online</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="glass-card rounded-2xl p-3 flex items-center gap-2 hover:border-[#2D9CDB]/40 transition-all shadow-xl shadow-black/20 group"
      >
        <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
        <FiActivity size={14} className="text-[#829AB1] group-hover:text-white transition-colors" />
        <span className="text-[#829AB1] text-xs group-hover:text-white transition-colors hidden sm:block">Status</span>
      </button>
    </div>
  )
}
