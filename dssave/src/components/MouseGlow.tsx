import { useEffect, useRef } from 'react'

export default function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const raf = useRef<number>(0)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.setProperty('--mouse-x', `${e.clientX}px`)
          ref.current.style.setProperty('--mouse-y', `${e.clientY}px`)
        }
      })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{
        background: 'radial-gradient(600px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(45,156,219,0.07), transparent 80%)',
      }}
    />
  )
}
