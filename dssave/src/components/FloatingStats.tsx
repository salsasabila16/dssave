import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiDownload, FiX } from 'react-icons/fi'

export default function FloatingStats() {
  const [count, setCount] = useState(500247)
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => { if (!dismissed) setVisible(true) }, 3500)
    return () => clearTimeout(t)
  }, [dismissed])

  useEffect(() => {
    if (!visible) return
    const interval = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 3) + 1)
    }, 2800)
    return () => clearInterval(interval)
  }, [visible])

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-20 left-4 sm:bottom-6 sm:left-6 z-40 glass-card rounded-2xl px-4 py-3 shadow-2xl shadow-black/35 border border-[#2D9CDB]/18"
        >
          <button
            onClick={() => { setDismissed(true); setVisible(false) }}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#102A43] border border-white/12 flex items-center justify-center text-[#829AB1] hover:text-white transition-colors"
          >
            <FiX size={9} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#2D9CDB]/18 border border-[#2D9CDB]/28 flex items-center justify-center">
              <FiDownload size={14} className="text-[#2D9CDB]" />
            </div>
            <div>
              <motion.span
                key={count}
                initial={{ y: -6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-white text-sm font-heading font-bold block"
              >
                {count.toLocaleString('id-ID')}
              </motion.span>
              <p className="text-[#829AB1] text-[11px]">total unduhan berhasil</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
