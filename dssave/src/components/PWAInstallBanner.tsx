import { motion, AnimatePresence } from 'framer-motion'
import { FiDownloadCloud, FiX } from 'react-icons/fi'
import { usePWAInstall } from '../hooks/usePWAInstall'

export default function PWAInstallBanner() {
  const { isInstallable, isInstalled, install } = usePWAInstall()

  return (
    <AnimatePresence>
      {isInstallable && !isInstalled && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pointer-events-none"
        >
          <div className="glass-card rounded-2xl p-4 flex items-center gap-4 max-w-lg mx-auto shadow-2xl shadow-black/40 pointer-events-auto border border-[#2D9CDB]/25">
            <div className="w-10 h-10 rounded-xl glow-button flex items-center justify-center flex-shrink-0">
              <FiDownloadCloud size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold">Install DSSAVE App</p>
              <p className="text-[#829AB1] text-xs">Add to home screen for the best experience</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={install}
                className="glow-button text-xs px-4 py-2 rounded-xl"
              >
                Install
              </button>
              <button
                onClick={() => window.dispatchEvent(new Event('pwa-banner-dismiss'))}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#829AB1] hover:text-white hover:bg-white/8 transition-all"
              >
                <FiX size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
