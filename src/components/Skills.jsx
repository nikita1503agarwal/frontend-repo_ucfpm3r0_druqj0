import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function Gauge({ label, value, color }) {
  const circumference = 2 * Math.PI * 42
  const dash = (value / 100) * circumference
  return (
    <div className="flex flex-col items-center">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="42" stroke="rgba(255,255,255,0.1)" strokeWidth="10" fill="none" />
        <motion.circle
          cx="60" cy="60" r="42" stroke={color}
          strokeWidth="10" fill="none" strokeDasharray={`${dash} ${circumference}`}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }}
          strokeLinecap="round"
        />
      </svg>
      <div className="-mt-8 text-2xl font-bold text-white">{value}%</div>
      <div className="mt-2 text-white/70 text-sm">{label}</div>
    </div>
  )
}

export default function Skills() {
  const items = [
    { label: 'Creative Coding', value: 95, color: '#a855f7' },
    { label: '3D / WebGL', value: 88, color: '#60a5fa' },
    { label: 'UX Motion', value: 92, color: '#22d3ee' },
    { label: 'AI Integration', value: 86, color: '#f472b6' },
  ]

  return (
    <section className="relative py-20 bg-slate-950">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(50%_50%_at_20%_10%,rgba(99,102,241,0.2),transparent),radial-gradient(40%_40%_at_80%_80%,rgba(236,72,153,0.15),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">Skills & Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((s) => (
            <Gauge key={s.label} {...s} />
          ))}
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            '10+ years crafting immersive products',
            '50+ shipped experiences across web & mobile',
            'Work featured in Awwwards, Dribbble, FWA',
          ].map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-xl border border-white/10 bg-white/5 p-5 text-white/80">
              {t}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
