import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/')({
  component: Portfolio,
})

/* ─── Scroll reveal hook ─── */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' },
    )
    const els = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right')
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

/* ─── Progress bar component ─── */
function ProgressBar({ label, percent, color = '#0A66C2' }: { label: string; percent: number; color?: string }) {
  const [filled, setFilled] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setFilled(true) }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-semibold text-foreground">{label}</span>
        <span className="text-sm font-bold" style={{ color }}>{percent}%</span>
      </div>
      <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1500 ease-out"
          style={{ width: filled ? `${percent}%` : '0%', background: `linear-gradient(90deg, ${color}, ${color}cc)`, transitionDuration: '1.4s' }}
        />
      </div>
    </div>
  )
}

/* ─── Circular progress ─── */
function CircleProgress({ label, percent, color = '#0A66C2' }: { label: string; percent: number; color?: string }) {
  const [filled, setFilled] = useState(false)
  const ref = useRef<SVGSVGElement>(null)
  const r = 36
  const circ = 2 * Math.PI * r
  const offset = circ - (filled ? percent / 100 : 0) * circ
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setFilled(true) }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20">
        <svg ref={ref} className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={r} fill="none" stroke="currentColor" strokeWidth="7" className="text-secondary opacity-50" />
          <circle
            cx="40" cy="40" r={r} fill="none" stroke={color} strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1.4s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold" style={{ color }}>{percent}%</span>
        </div>
      </div>
      <span className="text-xs font-semibold text-center text-foreground/80 leading-tight max-w-[80px]">{label}</span>
    </div>
  )
}

/* ─── Timeline item ─── */
function TimelineItem({
  year, title, org, orgUrl, delay = 0, icon = '🎓', color = '#0A66C2',
}: {
  year: string; title: string; org: string; orgUrl?: string; delay?: number; icon?: string; color?: string;
}) {
  return (
    <div className="scroll-reveal flex gap-4 md:gap-6" style={{ transitionDelay: `${delay}ms` }}>
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-lg flex-shrink-0 z-10"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}99)`, boxShadow: `0 4px 15px ${color}40` }}>
          {icon}
        </div>
        <div className="w-0.5 bg-gradient-to-b from-blue-400 to-transparent flex-1 mt-2 min-h-8" />
      </div>
      <div className="pb-8 flex-1">
        <div className="rounded-xl p-4 md:p-5 border border-border/60 bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          style={{ boxShadow: '0 2px 15px rgba(10,102,194,0.06)' }}>
          <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ background: color }}>{year}</span>
          </div>
          <h3 className="font-semibold text-foreground mt-2 text-sm md:text-base leading-snug">{title}</h3>
          {orgUrl ? (
            <a href={orgUrl} target="_blank" rel="noopener noreferrer"
              className="text-sm font-medium mt-1 inline-flex items-center gap-1 hover:underline"
              style={{ color }}>
              {org} ↗
            </a>
          ) : (
            <p className="text-sm mt-1" style={{ color }}>{org}</p>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Expertise card ─── */
function ExpertiseCard({ title, icon, desc, color = '#0A66C2' }: { title: string; icon: string; desc: string; color?: string }) {
  return (
    <div className="expertise-card scroll-reveal rounded-2xl p-6 border border-border/60 bg-card group cursor-default">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform group-hover:scale-110"
        style={{ background: `linear-gradient(135deg, ${color}20, ${color}10)` }}>
        {icon}
      </div>
      <h3 className="font-bold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
      <div className="mt-4 h-1 w-0 group-hover:w-full transition-all duration-500 rounded-full" style={{ background: color }} />
    </div>
  )
}

/* ─── Mindmap ─── */
function Mindmap() {
  const nodes = [
    { label: 'Engagement\nhumanitaire', angle: 0, color: '#0A66C2' },
    { label: "Sens de\nl'écoute", angle: 40, color: '#1d4ed8' },
    { label: 'Empathie', angle: 80, color: '#16A34A' },
    { label: 'Communication\nSBCC', angle: 120, color: '#22C55E' },
    { label: 'Santé\ncommunautaire', angle: 160, color: '#0A66C2' },
    { label: 'DSSR / PF', angle: 200, color: '#16A34A' },
    { label: 'Professionnalisme\n& éthique', angle: 240, color: '#1d4ed8' },
    { label: 'Travail\nen équipe', angle: 280, color: '#0A66C2' },
    { label: 'Gestion\ndu stress', angle: 320, color: '#22C55E' },
  ]

  return (
    <div className="relative w-full max-w-2xl mx-auto" style={{ height: '480px' }}>
      {/* Center node */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="w-28 h-28 rounded-full flex items-center justify-center text-center shadow-2xl animate-pulse-glow"
          style={{ background: 'linear-gradient(135deg, #0A66C2, #1E3A8A)' }}>
          <span className="text-white text-xs font-bold leading-tight px-2">Abdoulaye<br />Lankoandé</span>
        </div>
      </div>

      {/* SVG lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 480">
        {nodes.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180
          const cx = 250 + 165 * Math.cos(rad)
          const cy = 240 + 165 * Math.sin(rad)
          return (
            <line key={i}
              x1="250" y1="240"
              x2={cx} y2={cy}
              stroke={node.color} strokeWidth="1.5" strokeOpacity="0.5"
              strokeDasharray="4 3"
            />
          )
        })}
      </svg>

      {/* Branch nodes */}
      {nodes.map((node, i) => {
        const rad = (node.angle * Math.PI) / 180
        const cx = 50 + 33 * (1 + Math.cos(rad)) * (100 / 100)
        const cy = 50 + 33 * (1 + Math.sin(rad)) * (100 / 100)
        return (
          <div key={i}
            className="absolute mindmap-node"
            style={{
              left: `${50 + 38 * Math.cos(rad)}%`,
              top: `${50 + 34.5 * Math.sin(rad)}%`,
              transform: 'translate(-50%, -50%)',
              animationDelay: `${i * 0.3}s`,
            }}>
            <div className="rounded-xl px-3 py-2 text-center text-xs font-semibold text-white shadow-lg cursor-default hover:scale-110 transition-transform"
              style={{ background: `linear-gradient(135deg, ${node.color}, ${node.color}cc)`, minWidth: '80px', boxShadow: `0 4px 15px ${node.color}40` }}>
              {node.label.split('\n').map((l, j) => <div key={j}>{l}</div>)}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ─── Main component ─── */
export default function Portfolio() {
  useScrollReveal()
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showBackTop, setShowBackTop] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') { setDarkMode(true); document.documentElement.classList.add('dark') }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    const onScroll = () => {
      setShowBackTop(window.scrollY > 400)
      const sections = ['hero', 'mission', 'timeline', 'mindmap', 'langues', 'expertise', 'contact']
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveSection(id); break }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  const navLinks = [
    { id: 'mission', label: 'Mission' },
    { id: 'timeline', label: 'Parcours' },
    { id: 'expertise', label: 'Expertise' },
    { id: 'langues', label: 'Langues' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <div className={`min-h-screen bg-background text-foreground transition-colors duration-300`}>

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <button onClick={() => scrollTo('hero')} className="font-bold text-lg" style={{ color: '#0A66C2' }}>
            AL
          </button>
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)}
                className={`nav-link text-sm font-medium transition-colors ${activeSection === l.id ? 'text-[#0A66C2]' : 'text-foreground/70 hover:text-foreground'}`}>
                {l.label}
              </button>
            ))}
            <button onClick={() => setDarkMode(!darkMode)}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-lg hover:bg-secondary transition-colors">
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
          {/* Mobile */}
          <div className="flex items-center gap-3 md:hidden">
            <button onClick={() => setDarkMode(!darkMode)} className="text-xl">{darkMode ? '☀️' : '🌙'}</button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-foreground p-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden mobile-menu-enter bg-background/95 backdrop-blur-xl border-b border-border/50 px-4 pb-4">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)}
                className="block w-full text-left py-3 text-sm font-medium border-b border-border/30 last:border-0 text-foreground/80 hover:text-[#0A66C2] transition-colors">
                {l.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="hero-gradient min-h-screen flex flex-col items-center justify-center text-white relative overflow-hidden pt-16">
        {/* Background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute rounded-full opacity-10"
              style={{
                width: `${Math.random() * 60 + 20}px`,
                height: `${Math.random() * 60 + 20}px`,
                background: i % 2 === 0 ? '#3B82F6' : '#22C55E',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 2}s infinite`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
          {/* Photo with orbit */}
          <div className="relative mb-8 animate-float" style={{ width: '180px', height: '180px' }}>
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full animate-pulse-glow" style={{ borderRadius: '50%' }} />
            {/* Orbit container */}
            <div className="absolute inset-[-16px] rounded-full" style={{ zIndex: 5 }}>
              <div className="animate-orbit">
                <div className="w-3 h-3 bg-white rounded-full shadow-lg" style={{ boxShadow: '0 0 10px 3px rgba(255,255,255,0.8)' }} />
              </div>
            </div>
            {/* Blue ring */}
            <div className="absolute inset-[-6px] rounded-full border-2 border-blue-400/60"
              style={{ animation: 'spinSlow 10s linear infinite' }}>
              <div className="w-2.5 h-2.5 bg-blue-300 rounded-full absolute -top-1.5 left-1/2 -translate-x-1/2" />
            </div>
            {/* Photo */}
            <img
              src="/abdoulaye-profile.jpg"
              alt="Abdoulaye Lankoandé"
              className="w-full h-full object-cover rounded-full border-4 border-white/20 relative z-10"
              style={{ boxShadow: '0 0 40px rgba(59,130,246,0.5)' }}
            />
          </div>

          {/* Name */}
          <h1 className="text-4xl md:text-6xl font-black mb-3 tracking-tight animate-fade-in-up"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
            ABDOULAYE LANKOANDÉ
          </h1>

          {/* Title */}
          <p className="text-base md:text-lg font-medium text-blue-100/90 max-w-2xl leading-relaxed mb-8 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}>
            Juriste en DSSR & droits humains | Santé communautaire | Changement social | Protection des populations vulnérables | Digital Health | Systèmes de santé
            <span className="text-green-300"> | </span>
            Expérience en santé communautaire & communication sociale
            <span className="text-green-300"> | </span>
            Approche terrain orientée impact et relation usager
          </p>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {['Youth Engagement', 'Public Health', 'SBCC', 'SSR/PF', 'Burkina Faso'].map((t) => (
              <span key={t} className="px-3 py-1 rounded-full text-xs font-semibold border border-white/20 bg-white/10 text-white backdrop-blur-sm">{t}</span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button onClick={() => scrollTo('contact')}
              className="cta-btn px-7 py-3.5 rounded-full text-sm font-bold text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
              style={{ background: 'linear-gradient(135deg, #16A34A, #22C55E)', boxShadow: '0 8px 25px rgba(22,163,74,0.4)' }}>
              ✉️ Me contacter
            </button>
            <button onClick={() => scrollTo('timeline')}
              className="cta-btn px-7 py-3.5 rounded-full text-sm font-bold bg-white/15 border border-white/30 text-white hover:bg-white/25 hover:-translate-y-1 transition-all backdrop-blur-sm">
              📋 Voir mon parcours
            </button>
            <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer"
              className="cta-btn px-7 py-3.5 rounded-full text-sm font-bold text-white hover:-translate-y-1 transition-all"
              style={{ background: 'linear-gradient(135deg, #0A66C2, #1d4ed8)', boxShadow: '0 8px 25px rgba(10,102,194,0.4)' }}>
              🔗 LinkedIn
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-soft">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1.5">
            <div className="w-1 h-3 bg-white/60 rounded-full" style={{ animation: 'float 1.5s ease-in-out infinite' }} />
          </div>
        </div>

        {/* Wave bottom */}
        <div className="wave-divider">
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-12 md:h-20 fill-background">
            <path d="M0,40 C300,80 900,0 1200,40 L1200,80 L0,80 Z" />
          </svg>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section id="mission" className="py-24 section-gradient-blue relative">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14 scroll-reveal">
            <span className="text-sm font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 inline-block"
              style={{ background: 'linear-gradient(135deg, #0A66C220, #0A66C210)', color: '#0A66C2', border: '1px solid #0A66C230' }}>
              Mission & Valeurs
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mt-3">Mes engagements et ambitions</h2>
            <div className="w-16 h-1.5 rounded-full mx-auto mt-4" style={{ background: 'linear-gradient(90deg, #0A66C2, #16A34A)' }} />
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="scroll-reveal-left space-y-5">
              <p className="text-foreground/80 leading-relaxed text-base">
                Je m'engage à faire tomber les barrières qui empêchent les adolescents et les jeunes d'accéder aux services de santé dont ils ont besoin.
              </p>
              <p className="text-foreground/80 leading-relaxed text-base">
                À l'interface entre santé communautaire, communication sociale et accompagnement direct, j'ai contribué à informer, orienter et soutenir de nombreux jeunes confrontés à des obstacles liés à l'accès, à la stigmatisation ou au manque d'information.
              </p>
              <p className="text-foreground/80 leading-relaxed text-base">
                Ces expériences m'ont permis de développer une compréhension fine des comportements, des besoins réels des jeunes et des dynamiques communautaires qui influencent leur recours aux services de santé.
              </p>
              <p className="text-foreground/80 leading-relaxed text-base">
                Aujourd'hui, je m'intéresse particulièrement aux approches innovantes qui combinent engagement communautaire, solutions digitales et coordination d'acteurs pour renforcer les écosystèmes de santé.
              </p>
            </div>

            <div className="scroll-reveal-right space-y-4">
              <div className="rounded-2xl p-6 border border-blue-200/60 dark:border-blue-900/40"
                style={{ background: 'linear-gradient(135deg, #0A66C210, #0A66C205)' }}>
                <div className="text-2xl mb-3">🎯</div>
                <h3 className="font-bold text-foreground mb-2">Mon objectif</h3>
                <p className="text-foreground/75 leading-relaxed text-sm">
                  Contribuer à des initiatives à fort impact capables d'améliorer durablement l'accès et l'utilisation des services de santé pour les jeunes.
                </p>
              </div>

              {[
                { icon: '🌍', title: 'Impact communautaire', desc: 'Intervenir directement sur le terrain auprès des populations jeunes' },
                { icon: '💡', title: 'Innovation digitale', desc: 'Combiner outils numériques et approches traditionnelles' },
                { icon: '🤝', title: 'Partenariat multi-acteurs', desc: 'Coordonner les acteurs pour renforcer les écosystèmes de santé' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-4 rounded-xl border border-border/40 bg-card hover:shadow-md transition-all">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-0.5">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section id="timeline" className="py-24 bg-background relative">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-14 scroll-reveal">
            <span className="text-sm font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 inline-block"
              style={{ background: 'linear-gradient(135deg, #16A34A20, #16A34A10)', color: '#16A34A', border: '1px solid #16A34A30' }}>
              Formation & Certifications
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mt-3">Parcours Académique</h2>
            <div className="w-16 h-1.5 rounded-full mx-auto mt-4" style={{ background: 'linear-gradient(90deg, #0A66C2, #16A34A)' }} />
          </div>

          <TimelineItem delay={0} icon="🏆" year="2019–2023" color="#0A66C2"
            title="Licence professionnelle en Droit privé, option Droit des Affaires"
            org="Université Libre du Burkina" orgUrl="https://universitelibreduburkina.org/" />

          <TimelineItem delay={100} icon="🛡️" year="Juillet 2024" color="#dc2626"
            title="Formation sur la Sécurité Personnelle sur un Terrain en environnement volatile et la Gestion de sécurité ONG"
            org="MSI Burkina Faso" orgUrl="https://www.mariestopes.bf/" />

          <TimelineItem delay={150} icon="📋" year="24–26 Juin 2024" color="#0A66C2"
            title="Atelier de formation des téléconseillers en techniques d'écoute, d'orientation et de référencement en matière de DSSR"
            org="SOGOB – Société des Gynécologues et Obstétriciens du Burkina" orgUrl="https://sogob.org/" />

          <TimelineItem delay={200} icon="🏥" year="2024" color="#16A34A"
            title="Formation des téléconseillers en Techniques d'Écoute, d'Orientation et de Référencement en DSSR"
            org="Direction de la Santé de la Famille" orgUrl="https://www.dsfburkina.org/qui-sommes-nous/" />

          <TimelineItem delay={250} icon="📞" year="Depuis 2019" color="#0A66C2"
            title="Prestation de service en qualité de téléconseiller"
            org="Marie Stopes Burkina Faso" orgUrl="https://www.mariestopes.bf/" />

          <TimelineItem delay={300} icon="🎓" year="Avr–Oct 2019" color="#7c3aed"
            title="Stage au centre de contact"
            org="Marie Stopes Burkina Faso" orgUrl="https://www.mariestopes.bf/" />

          <TimelineItem delay={350} icon="💻" year="Juin–Août 2018" color="#0A66C2"
            title="Formation en Microsoft Word, Excel, PowerPoint 2016 (niveau avancé) et connaissance générale du micro-ordinateur"
            org="Centre de formation informatique" />

          <TimelineItem delay={400} icon="📊" year="20 Juin 2021" color="#16A34A"
            title="Formation sur la thématique de gestion de projet"
            org="Association SOS Burkina" orgUrl="https://web.facebook.com/burkinasos/" />

          <TimelineItem delay={450} icon="🌱" year="30 Mai–5 Juin 2021" color="#22C55E"
            title="Formation sur l'incubation des jeunes entrepreneurs en agroécologie et agriculture biologique"
            org="Association Béo-Néere" orgUrl="https://beoneere-agroecologie.bf/" />

          <TimelineItem delay={500} icon="🐓" year="20–21 Mars 2021" color="#f59e0b"
            title="Formation en élevage avicole et piscicole"
            org="Ferme Onésime BF" orgUrl="https://web.facebook.com/Onesime.elevage/" />

          <TimelineItem delay={550} icon="💼" year="21 Avril 2016" color="#0A66C2"
            title="Formation sur la technique de recherche d'emploi et d'auto-emploi"
            org="InnovAfrik" orgUrl="https://innovafrika.com/" />

          <TimelineItem delay={600} icon="⭐" year="13 Février 2016" color="#7c3aed"
            title='Séminaire : "Les secrets indispensables du succès"'
            org="Séminaire professionnel" />
        </div>
      </section>

      {/* ── MINDMAP ── */}
      <section id="mindmap" className="py-24 section-gradient-blue">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14 scroll-reveal">
            <span className="text-sm font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 inline-block"
              style={{ background: 'linear-gradient(135deg, #0A66C220, #0A66C210)', color: '#0A66C2', border: '1px solid #0A66C230' }}>
              Carte mentale
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mt-3">Mes qualités</h2>
            <div className="w-16 h-1.5 rounded-full mx-auto mt-4" style={{ background: 'linear-gradient(90deg, #0A66C2, #16A34A)' }} />
          </div>
          <div className="scroll-reveal">
            <Mindmap />
          </div>
        </div>
      </section>

      {/* ── LANGUES ── */}
      <section id="langues" className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14 scroll-reveal">
            <span className="text-sm font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 inline-block"
              style={{ background: 'linear-gradient(135deg, #16A34A20, #16A34A10)', color: '#16A34A', border: '1px solid #16A34A30' }}>
              Multilinguisme
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mt-3">Langues maîtrisées</h2>
            <div className="w-16 h-1.5 rounded-full mx-auto mt-4" style={{ background: 'linear-gradient(90deg, #0A66C2, #16A34A)' }} />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Progress bars */}
            <div className="scroll-reveal-left space-y-2">
              <ProgressBar label="Mooré" percent={100} color="#0A66C2" />
              <ProgressBar label="Gulmancema" percent={100} color="#1E3A8A" />
              <ProgressBar label="Français" percent={95} color="#16A34A" />
              <ProgressBar label="Anglais" percent={45} color="#7c3aed" />
              <ProgressBar label="Dioula" percent={45} color="#f59e0b" />
              <ProgressBar label="Fulfuldé" percent={40} color="#0A66C2" />
            </div>

            {/* Circle charts */}
            <div className="scroll-reveal-right">
              <div className="grid grid-cols-3 gap-6 justify-items-center">
                <CircleProgress label="Mooré" percent={100} color="#0A66C2" />
                <CircleProgress label="Gulmancema" percent={100} color="#1E3A8A" />
                <CircleProgress label="Français" percent={95} color="#16A34A" />
                <CircleProgress label="Anglais" percent={45} color="#7c3aed" />
                <CircleProgress label="Dioula" percent={45} color="#f59e0b" />
                <CircleProgress label="Fulfuldé" percent={40} color="#0A66C2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERTISE ── */}
      <section id="expertise" className="py-24 section-gradient-blue">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14 scroll-reveal">
            <span className="text-sm font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 inline-block"
              style={{ background: 'linear-gradient(135deg, #0A66C220, #0A66C210)', color: '#0A66C2', border: '1px solid #0A66C230' }}>
              Domaines
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mt-3">Domaines d'expertise</h2>
            <div className="w-16 h-1.5 rounded-full mx-auto mt-4" style={{ background: 'linear-gradient(90deg, #0A66C2, #16A34A)' }} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <ExpertiseCard title="Youth Engagement" icon="👥" color="#0A66C2"
              desc="Mobilisation et engagement des adolescents et jeunes dans les programmes de santé" />
            <ExpertiseCard title="SBCC" icon="📢" color="#1E3A8A"
              desc="Communication pour le changement social et comportemental en santé" />
            <ExpertiseCard title="Santé communautaire" icon="🏘️" color="#16A34A"
              desc="Interventions de proximité et renforcement des systèmes communautaires" />
            <ExpertiseCard title="SSR / PF" icon="💊" color="#22C55E"
              desc="Santé sexuelle et reproductive, planning familial et droits DSSR" />
            <ExpertiseCard title="Santé mentale" icon="🧠" color="#7c3aed"
              desc="Écoute psychosociale, orientation et accompagnement des jeunes vulnérables" />
            <ExpertiseCard title="Téléconseil" icon="📞" color="#0A66C2"
              desc="Techniques d'écoute, d'orientation et de référencement à distance" />
            <ExpertiseCard title="Santé numérique" icon="💻" color="#1E3A8A"
              desc="Solutions digitales pour améliorer l'accès aux informations et services de santé" />
            <ExpertiseCard title="Systèmes de santé" icon="🏥" color="#16A34A"
              desc="Compréhension des écosystèmes et coordination des acteurs de la santé" />
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14 scroll-reveal">
            <span className="text-sm font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 inline-block"
              style={{ background: 'linear-gradient(135deg, #16A34A20, #16A34A10)', color: '#16A34A', border: '1px solid #16A34A30' }}>
              Restons connectés
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mt-3">Me contacter</h2>
            <div className="w-16 h-1.5 rounded-full mx-auto mt-4" style={{ background: 'linear-gradient(90deg, #0A66C2, #16A34A)' }} />
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Info */}
            <div className="scroll-reveal-left space-y-5">
              <p className="text-foreground/75 leading-relaxed">
                Disponible pour des opportunités de collaboration, des projets de santé communautaire, ou tout échange professionnel en lien avec l'engagement des jeunes et l'accès aux services de santé.
              </p>

              {[
                { icon: '📧', label: 'Email', value: 'lankoandeabdoulayebf@gmail.com', href: 'mailto:lankoandeabdoulayebf@gmail.com' },
                { icon: '📞', label: 'Téléphone', value: '+226 70 15 39 36', href: 'tel:+22670153936' },
                { icon: '📍', label: 'Localisation', value: 'Saaba, Ouagadougou, Burkina Faso', href: null },
                { icon: '🔗', label: 'LinkedIn', value: 'linkedin.com/in/abdoulaye-lankoane', href: 'https://www.linkedin.com/feed/' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card hover:shadow-md transition-all group">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #0A66C215, #0A66C208)' }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="text-sm font-semibold hover:underline" style={{ color: '#0A66C2' }}>
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="scroll-reveal-right">
              <form className="rounded-2xl p-6 md:p-8 border border-border/60 bg-card shadow-lg space-y-5"
                onSubmit={(e) => { e.preventDefault(); alert('Message envoyé ! Je vous répondrai dans les plus brefs délais.') }}>
                <h3 className="font-bold text-foreground text-lg">Envoyer un message</h3>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Nom complet</label>
                  <input type="text" required placeholder="Votre nom"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 transition-all"
                    style={{ '--tw-ring-color': '#0A66C250' } as React.CSSProperties} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Email</label>
                  <input type="email" required placeholder="votre@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 transition-all"
                    style={{ '--tw-ring-color': '#0A66C250' } as React.CSSProperties} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Sujet</label>
                  <input type="text" required placeholder="Objet de votre message"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 transition-all"
                    style={{ '--tw-ring-color': '#0A66C250' } as React.CSSProperties} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Message</label>
                  <textarea required rows={4} placeholder="Votre message..."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 transition-all resize-none"
                    style={{ '--tw-ring-color': '#0A66C250' } as React.CSSProperties} />
                </div>
                <button type="submit"
                  className="cta-btn w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-xl"
                  style={{ background: 'linear-gradient(135deg, #0A66C2, #1E3A8A)', boxShadow: '0 8px 25px rgba(10,102,194,0.35)' }}>
                  ✉️ Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a0f2e 0%, #0d1b4b 50%, #0a1628 100%)' }}>
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="text-4xl mb-4">💙</div>
          <blockquote className="text-lg md:text-xl font-medium text-blue-100/90 italic max-w-2xl mx-auto leading-relaxed mb-8">
            "Améliorer l'accès des jeunes à la santé aujourd'hui, c'est construire des communautés plus fortes demain."
          </blockquote>
          <div className="flex justify-center gap-4 mb-8">
            <a href="mailto:lankoandeabdoulayebf@gmail.com"
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm bg-white/10 hover:bg-white/20 transition-all hover:scale-110 border border-white/20">
              📧
            </a>
            <a href="tel:+22670153936"
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm bg-white/10 hover:bg-white/20 transition-all hover:scale-110 border border-white/20">
              📞
            </a>
            <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm bg-white/10 hover:bg-white/20 transition-all hover:scale-110 border border-white/20">
              🔗
            </a>
            <a href={`https://wa.me/22670153936`} target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm bg-white/10 hover:bg-white/20 transition-all hover:scale-110 border border-white/20">
              💬
            </a>
          </div>
          <div className="border-t border-white/10 pt-6">
            <p className="text-blue-200/50 text-sm">
              © {new Date().getFullYear()} Abdoulaye Lankoandé · Ouagadougou, Burkina Faso
            </p>
            <p className="text-blue-200/30 text-xs mt-1">Youth Engagement & Public Health Specialist</p>
          </div>
        </div>
      </footer>

      {/* ── FLOATING: WhatsApp ── */}
      <a href="https://wa.me/22670153936" target="_blank" rel="noopener noreferrer"
        className="whatsapp-btn fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-2xl text-white shadow-lg"
        aria-label="WhatsApp">
        💬
      </a>

      {/* ── FLOATING: Back to top ── */}
      {showBackTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="back-top-btn fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg"
          aria-label="Retour en haut">
          ↑
        </button>
      )}
    </div>
  )
}
