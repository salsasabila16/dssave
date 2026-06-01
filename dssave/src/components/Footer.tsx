export default function Footer() {
  return (
    <footer className="border-t border-white/6" style={{ background: 'rgba(6,15,30,0.9)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Kiri: Logo */}
        <div className="flex items-center gap-2">
          <img src="/src/assets/dssave.png" alt="DSSAVE" className="w-6 h-6 rounded-lg object-contain" />
          <span className="text-sm font-heading font-bold text-gradient">DSSAVE</span>
        </div>

        {/* Kanan: Copyright */}
        <p className="text-[#829AB1] text-xs">
          © 2026 DSSAVE. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
