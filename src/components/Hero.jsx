import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Spline from '@splinetool/react-spline'

export default function Hero({ fullName = 'Mr. [Full Name]' }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.6])

  useEffect(() => {
    // Prevent scroll jank on mobile by hinting GPU accel
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <section ref={containerRef} className="relative h-[90vh] w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Neon gradient aura overlay (non-blocking) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_30%,rgba(168,85,247,0.25),transparent),radial-gradient(40%_30%_at_70%_70%,rgba(59,130,246,0.25),transparent)]" />

      <motion.div style={{ y, opacity }} className="relative z-10 h-full flex items-center">
        <div className="mx-auto max-w-7xl px-6">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
            {fullName}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.9 }} className="mt-5 max-w-2xl text-lg sm:text-xl text-white/80">
            Designer–Engineer crafting immersive, cinematic experiences at the edge of art and technology.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9 }} className="mt-8 flex gap-4">
            <a href="#projects" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-6 py-3 text-white shadow-[0_0_30px_rgba(168,85,247,0.6)]">
              View Work
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 backdrop-blur">
              Get in touch
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Subtle parallax foreground glows */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />
    </section>
  )
}
