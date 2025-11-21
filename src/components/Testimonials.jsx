import { motion } from 'framer-motion'

export default function Testimonials({ items = [] }) {
  return (
    <section className="relative py-20 bg-gradient-to-b from-slate-950 to-black">
      <div className="absolute inset-0 pointer-events-none bg-[conic-gradient(from_180deg_at_50%_50%,rgba(168,85,247,0.08),transparent_40%,rgba(59,130,246,0.08),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">What People Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-white/5 p-6 text-white">
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(60%_60%_at_20%_0%,rgba(59,130,246,0.18),transparent_60%),radial-gradient(40%_40%_at_100%_100%,rgba(168,85,247,0.18),transparent_60%)]" />
              <div className="relative flex items-center gap-3">
                <img src={t.avatar_url} alt={t.author} className="h-12 w-12 rounded-full ring-2 ring-cyan-300/30" />
                <div>
                  <div className="font-semibold">{t.author}</div>
                  <div className="text-white/70 text-sm">{t.role}</div>
                </div>
              </div>
              <p className="relative mt-4 text-white/90">“{t.quote}”</p>
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-400/10 blur-2xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
