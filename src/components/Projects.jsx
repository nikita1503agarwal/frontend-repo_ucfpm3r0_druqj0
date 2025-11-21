import { motion } from 'framer-motion'

const Card = ({ project, i }) => (
  <motion.a
    href={project.demo_url || '#'}
    target="_blank"
    rel="noreferrer"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ delay: i * 0.06, duration: 0.6 }}
    className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-fuchsia-400/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]"
  >
    <div className="aspect-video overflow-hidden">
      <img src={project.image_url} alt={project.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
    </div>
    <div className="p-5">
      <h3 className="text-white text-xl font-semibold">{project.title}</h3>
      <p className="mt-2 text-white/70 text-sm">{project.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.tags?.map((t) => (
          <span key={t} className="text-xs rounded-full bg-white/5 px-2 py-1 border border-white/10">{t}</span>
        ))}
      </div>
    </div>
    {/* Futuristic hover sheen */}
    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(60%_60%_at_30%_0%,rgba(168,85,247,0.35),transparent_60%),radial-gradient(40%_40%_at_80%_80%,rgba(59,130,246,0.25),transparent_60%)]" />
  </motion.a>
)

export default function Projects({ items = [] }) {
  return (
    <section id="projects" className="relative py-20 bg-gradient-to-b from-black to-slate-950">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Selected Work</h2>
          <p className="mt-2 text-white/70">Interactive previews with cinematic motion and 3D touches.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p, i) => (
            <Card key={p.title + i} project={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
