import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiDownload, FiMusic, FiLink, FiAlertCircle, FiLoader, FiCheckCircle } from 'react-icons/fi'
import { useLang } from '../context/LanguageContext'
import { useTranslations } from '../utils/translations'

const FORMATS = [
  { label: 'MP4 360p',  tag: 'SD',    color: 'rgba(130,154,177,0.25)' },
  { label: 'MP4 720p',  tag: 'HD',    color: 'rgba(45,156,219,0.22)'  },
  { label: 'MP4 1080p', tag: 'FHD',   color: 'rgba(0,210,255,0.2)'   },
  { label: 'MP3 Audio', tag: 'MP3',   color: 'rgba(11,143,255,0.22)'  },
  { label: 'WAV Audio', tag: 'WAV',   color: 'rgba(11,143,255,0.15)'  },
]

type Status = 'idle' | 'loading' | 'ready' | 'downloading' | 'error'
interface VideoInfo { title: string; thumbnail: string | null; uploader: string; platform: string }

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

export default function Hero() {
  const lang = useLang()
  const t    = useTranslations(lang).hero

  const [url,             setUrl]            = useState('')
  const [format,          setFormat]         = useState('MP4 1080p')
  const [status,          setStatus]         = useState<Status>('idle')
  const [info,            setInfo]           = useState<VideoInfo | null>(null)
  const [errMsg,          setErrMsg]         = useState('')
  const [downloadingType, setDownloadingType] = useState<'video' | 'audio' | null>(null)

  const handleUrlChange = (val: string) => {
    setUrl(val); setInfo(null); setStatus('idle'); setErrMsg('')
  }

  const fetchInfo = async () => {
    if (!url.trim()) return
    setStatus('loading'); setErrMsg('')
    try {
      const res  = await fetch(`/api/info?url=${encodeURIComponent(url.trim())}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Gagal membaca info video')
      setInfo(data); setStatus('ready')
    } catch (e: unknown) {
      setErrMsg(e instanceof Error ? e.message : 'URL tidak valid atau video tidak tersedia')
      setStatus('error')
    }
  }

  const handleDownload = async (type: 'video' | 'audio') => {
    if (!url.trim()) { setErrMsg(t.pasteUrlFirst); setStatus('error'); return }
    if (status !== 'ready') await fetchInfo()
    setStatus('downloading')
    setDownloadingType(type)
    const selectedFormat = type === 'audio'
      ? (format.includes('Audio') ? format : 'MP3 Audio')
      : (format.includes('Audio') ? 'MP4 1080p' : format)

    const apiUrl = `/api/download?url=${encodeURIComponent(url.trim())}&format=${encodeURIComponent(selectedFormat)}`

    if (type === 'audio') {
      // fetch + blob: error handling penuh, file audio biasanya kecil
      try {
        const res = await fetch(apiUrl)
        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: 'Gagal mengunduh audio' }))
          setErrMsg(err.error ?? 'Gagal mengunduh audio')
          setStatus('error')
          return
        }
        const blob = await res.blob()
        const ext  = selectedFormat.includes('WAV') ? 'wav' : 'mp3'
        const objUrl = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = objUrl
        a.download = `dssave_audio.${ext}`
        a.click()
        URL.revokeObjectURL(objUrl)
      } catch {
        setErrMsg('Gagal mengunduh audio. Coba lagi.')
        setStatus('error')
        return
      }
    } else {
      // anchor tag: video bisa besar, biarkan browser stream langsung
      const a = document.createElement('a')
      a.href = apiUrl
      a.download = ''
      document.body.appendChild(a); a.click(); document.body.removeChild(a)
    }

    setTimeout(() => { setStatus('ready'); setDownloadingType(null) }, 2000)
  }

  const isAudioFormat = format.includes('Audio')
  const isLoading     = status === 'loading' || status === 'downloading'

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-16">

      {/* Nebula blobs */}
      <div className="nebula-blob w-[520px] h-[520px] bg-[#1A4973] -top-32 -left-48" aria-hidden="true" />
      <div className="nebula-blob w-[400px] h-[400px] bg-[#0B8FFF] top-1/4 -right-32"  aria-hidden="true" />
      <div className="nebula-blob w-[300px] h-[300px] bg-[#00D2FF] bottom-0 left-1/4" style={{ opacity: 0.09 }} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 flex flex-col items-center text-center">

        {/* Badge */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mb-6">
          <span className="section-badge">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] pulse-dot inline-block" />
            {t.badge}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="text-[2.6rem] sm:text-6xl md:text-[4.2rem] font-heading font-bold leading-[1.08] tracking-tight mb-5"
        >
          {t.headline1}
          <br />
          <span className="text-gradient">{t.headlineAccent}</span>
          <br />
          {t.headline2}
        </motion.h1>

        {/* Sub */}
        <motion.p
          custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="text-[#829AB1] text-base sm:text-[1.05rem] leading-relaxed max-w-xl mb-8"
        >
          {t.sub}
        </motion.p>

        {/* Input box */}
        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="w-full max-w-2xl mb-3" id="hero-input">
          <div className={`glass-card rounded-2xl p-2 flex flex-col sm:flex-row gap-2 shadow-2xl transition-all duration-300 ${
            status === 'error' ? 'border-red-400/40 shadow-red-500/8' :
            status === 'ready' ? 'border-[#00D2FF]/30 shadow-[#00D2FF]/8' :
            'border-[#2D9CDB]/15 shadow-[#2D9CDB]/8'
          }`}>
            {/* URL input */}
            <label className="flex items-center gap-3 flex-1 px-4 py-2 cursor-text">
              <FiLink size={15} className="text-[#829AB1] flex-shrink-0" />
              <input
                type="url"
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                onBlur={() => url.trim() && status === 'idle' && fetchInfo()}
                onKeyDown={(e) => e.key === 'Enter' && fetchInfo()}
                placeholder={t.placeholder}
                className="bg-transparent flex-1 text-white placeholder:text-[#829AB1]/60 outline-none text-sm min-w-0"
                aria-label="URL Video"
              />
              <div className="flex-shrink-0">
                {status === 'loading' && (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                    <FiLoader size={15} className="text-[#2D9CDB]" />
                  </motion.div>
                )}
                {status === 'ready' && <FiCheckCircle size={15} className="text-[#00D2FF]" />}
                {status === 'error'  && <FiAlertCircle size={15} className="text-red-400" />}
              </div>
            </label>

            {/* Buttons */}
            <div className="flex gap-2 px-1 pb-1 sm:pb-0 sm:pr-1 sm:py-1">
              <button
                onClick={() => handleDownload('video')}
                disabled={isLoading}
                className="glow-button flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {downloadingType === 'video'
                  ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}><FiLoader size={14} /></motion.div>
                  : <FiDownload size={14} />}
                {downloadingType === 'video' ? t.processing : t.downloadVideo}
              </button>
              <button
                onClick={() => handleDownload('audio')}
                disabled={isLoading}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm border border-[#2D9CDB]/35 text-[#2D9CDB] hover:bg-[#2D9CDB]/10 transition-all whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {downloadingType === 'audio'
                  ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}><FiLoader size={14} /></motion.div>
                  : <FiMusic size={13} />}
                {downloadingType === 'audio' ? t.processingAudio : t.audio}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Video info preview */}
        <AnimatePresence>
          {info && status === 'ready' && (
            <motion.div key="info"
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-2xl mb-3"
            >
              <div className="glass-card rounded-xl px-4 py-3 flex items-center gap-3 border border-[#00D2FF]/20">
                {info.thumbnail && <img src={info.thumbnail} alt="" className="w-12 h-8 object-cover rounded-lg flex-shrink-0" />}
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-white text-xs font-semibold truncate">{info.title}</p>
                  <p className="text-[#829AB1] text-[11px] truncate">{info.uploader} · {info.platform}</p>
                </div>
                <FiCheckCircle size={16} className="text-[#00D2FF] flex-shrink-0" />
              </div>
            </motion.div>
          )}
          {status === 'error' && errMsg && (
            <motion.div key="error"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl mb-3"
            >
              <div className="glass-card rounded-xl px-4 py-2.5 flex items-center gap-2 border border-red-400/25">
                <FiAlertCircle size={14} className="text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-xs">{errMsg}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Format chips */}
        <motion.div
          custom={4} variants={fadeUp} initial="hidden" animate="visible"
          className="w-full max-w-2xl mb-8"
        >
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span className="text-[11px] text-[#829AB1] font-medium">{t.format}</span>
            <div className="flex flex-wrap gap-1.5">
              {FORMATS.map((f) => {
                const active  = format === f.label
                const isAudio = f.label.includes('Audio')
                return (
                  <button
                    key={f.label}
                    onClick={() => setFormat(f.label)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium border transition-all ${
                      active
                        ? isAudio
                          ? 'border-[#0B8FFF]/55 bg-[#0B8FFF]/12 text-[#0B8FFF]'
                          : 'border-[#2D9CDB]/55 bg-[#2D9CDB]/12 text-[#2D9CDB]'
                        : 'border-white/10 text-[#829AB1] hover:border-white/22 hover:text-white'
                    }`}
                  >
                    {f.label}
                    <span
                      className="text-[9px] font-bold px-1 py-0.5 rounded tracking-wide"
                      style={{ background: f.color, color: active ? '#fff' : '#aac' }}
                    >
                      {f.tag}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
          {isAudioFormat && (
            <p className="text-[10px] text-[#829AB1] mt-1.5 text-left pl-0.5">
              {t.audioHint}
            </p>
          )}
        </motion.div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#060f1e]/50 to-transparent pointer-events-none" />
    </section>
  )
}
