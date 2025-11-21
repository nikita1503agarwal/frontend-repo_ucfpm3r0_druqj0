import { useEffect, useMemo, useState } from 'react'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Testimonials from './components/Testimonials'

function App() {
  const baseUrl = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])
  const [projects, setProjects] = useState([])
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [pRes, tRes] = await Promise.all([
          fetch(`${baseUrl}/projects`),
          fetch(`${baseUrl}/testimonials`),
        ])
        if (pRes.ok) setProjects(await pRes.json())
        if (tRes.ok) setTestimonials(await tRes.json())
      } catch (e) {
        // fallback no-op
      }
    }
    fetchAll()
  }, [baseUrl])

  useEffect(() => {
    // Small personalization: record first landing
    const sessionId = localStorage.getItem('session_id') || crypto.randomUUID()
    localStorage.setItem('session_id', sessionId)
    fetch(`${baseUrl}/interactions`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ session_id: sessionId, event: 'visit', path: '/' }) }).catch(() => {})
  }, [baseUrl])

  return (
    <div className="min-h-screen bg-black text-white font-[Inter,ui-sans-serif,system-ui]">
      <Hero />
      <Projects items={projects} />
      <Skills />
      <Testimonials items={testimonials} />
      <footer className="py-10 text-center text-white/60 bg-black/80 border-t border-white/10">
        © {new Date().getFullYear()} Mr. [Full Name]. All rights reserved.
      </footer>
    </div>
  )
}

export default App
