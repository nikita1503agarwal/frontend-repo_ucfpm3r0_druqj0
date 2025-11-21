import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const baseUrl = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])
  const [form, setForm] = useState({ name: '', email: '', subject: '', body: '' })
  const [loading, setLoading] = useState(false)
  const [suggestion, setSuggestion] = useState(null)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    // Fetch suggestion based on current form content
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`${baseUrl}/ai/suggest`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)
        })
        if (res.ok) setSuggestion(await res.json())
      } catch {}
    }, 400)
    return () => clearTimeout(timeout)
  }, [form, baseUrl])

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      const res = await fetch(`${baseUrl}/contact`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)
      })
      if (res.ok) {
        setStatus({ ok: true, msg: 'Thanks! Your message has been received.' })
        setForm({ name: '', email: '', subject: '', body: '' })
      } else {
        setStatus({ ok: false, msg: 'Something went wrong. Please try again.' })
      }
    } catch (e) {
      setStatus({ ok: false, msg: 'Network error. Try again later.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative py-20 bg-black">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(60%_60%_at_80%_10%,rgba(236,72,153,0.16),transparent_60%),radial-gradient(50%_50%_at_10%_80%,rgba(59,130,246,0.18),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Let’s build something extraordinary</h2>
          <p className="mt-3 text-white/70">Tell me about your idea. The form learns from what you type and suggests a friendly, polished message you can use.</p>

          {suggestion && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
              <div className="text-white/60">Suggested subject</div>
              <div className="text-white font-medium">{suggestion.subject}</div>
              <div className="mt-3 text-white/60">Suggested message</div>
              <pre className="whitespace-pre-wrap text-white/80">{suggestion.message}</pre>
            </motion.div>
          )}
        </div>

        <form onSubmit={onSubmit} className="relative rounded-2xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="rounded-lg bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-fuchsia-400/60" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="rounded-lg bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-fuchsia-400/60" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input className="md:col-span-2 rounded-lg bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-fuchsia-400/60" placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
            <textarea rows="6" className="md:col-span-2 rounded-lg bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-fuchsia-400/60" placeholder="Tell me about your project" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
          </div>
          <div className="mt-4 flex items-center gap-4">
            <button disabled={loading} className="rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-6 py-3 font-semibold text-white shadow-[0_0_30px_rgba(168,85,247,0.6)] disabled:opacity-60">
              {loading ? 'Sending…' : 'Send message'}
            </button>
            {status && (
              <span className={status.ok ? 'text-emerald-400' : 'text-rose-400'}>{status.msg}</span>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
