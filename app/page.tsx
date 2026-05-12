'use client'
import { useEffect, useState } from "react"
import Link from "next/link"

type Tool = {
  href: string
  emoji: string
  label: string
  desc: string
  bg: string
  text: 'white' | 'black'
}

const TOOLS: Tool[] = [
  { href: '/nouveau',      emoji: '📝', label: 'Nouveau',       desc: 'Créer une nouvelle entrée',   bg: 'bg-gradient-to-br from-blue-500 to-blue-700',      text: 'white' },
  { href: '/historique',   emoji: '📚', label: 'Historique',    desc: 'Consulter les entrées passées', bg: 'bg-gradient-to-br from-slate-400 to-slate-600',  text: 'white' },
  { href: '/statistiques', emoji: '📊', label: 'Statistiques',  desc: 'Tableau de bord & KPIs',       bg: 'bg-gradient-to-br from-rose-500 to-rose-700',      text: 'white' },
  { href: '/clients',      emoji: '👥', label: 'Clients',       desc: 'Gérer vos clients',            bg: 'bg-gradient-to-br from-teal-500 to-teal-700',      text: 'white' },
  { href: '/planning',     emoji: '📅', label: 'Planning',      desc: 'Calendrier & rendez-vous',     bg: 'bg-gradient-to-br from-emerald-500 to-emerald-700', text: 'white' },
  { href: '/weed',         emoji: '🌿', label: 'Weed',          desc: 'Calculateur de neurones',      bg: 'bg-gradient-to-br from-green-700 to-green-900',    text: 'white' },
  { href: '/nouveaux-horizons', emoji: '🏗️', label: 'Horizons', desc: 'Nouveaux Horizons · Élancourt', bg: 'bg-gradient-to-br from-amber-500 to-orange-700', text: 'white' },
  { href: '/mail',         emoji: '📧', label: 'Emails',        desc: 'Emails envoyés',               bg: 'bg-gradient-to-br from-cyan-500 to-cyan-700',      text: 'white' },
]

const SPLASH_DURATION = 11000

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const [phase, setPhase] = useState<'fly' | 'impact' | 'crack' | 'reveal'>('fly')

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('app_splash_seen') === '1') {
      setShowSplash(false)
      return
    }
    sessionStorage.setItem('app_splash_seen', '1')

    const t1 = setTimeout(() => setPhase('impact'), 1320)
    const t2 = setTimeout(() => setPhase('crack'), 2200)
    const t3 = setTimeout(() => setPhase('reveal'), 3960)
    const t4 = setTimeout(() => setShowSplash(false), SPLASH_DURATION)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [])

  if (showSplash) {
    return (
      <main className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0a0f1a] overflow-hidden transition-opacity duration-700 ${phase === 'reveal' ? 'opacity-0' : 'opacity-100'}`}>
        {/* Fond drapeau marocain */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${phase !== 'fly' ? 'opacity-100' : 'opacity-0'}`} style={{ background: 'linear-gradient(180deg, #c1272d 0%, #8b0000 100%)' }} />

        {/* Étoile marocaine (pentagramme vert) */}
        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-1000 ${phase === 'crack' || phase === 'reveal' ? 'opacity-30 scale-100' : 'opacity-0 scale-50'}`}>
          <svg viewBox="0 0 200 200" className="w-32 h-32 sm:w-48 sm:h-48">
            <polygon
              points="100,10 118,65 176,65 129,100 147,156 100,122 53,156 71,100 24,65 82,65"
              fill="none"
              stroke="#006233"
              strokeWidth="6"
              strokeLinejoin="miter"
            />
            <polygon
              points="100,10 118,65 176,65 129,100 147,156 100,122 53,156 71,100 24,65 82,65"
              fill="none"
              stroke="#006233"
              strokeWidth="6"
              strokeLinejoin="miter"
              transform="rotate(180 100 100)"
            />
          </svg>
        </div>

        {/* Flash impact */}
        {phase === 'impact' && (
          <div className="absolute inset-0 bg-white animate-flash pointer-events-none" />
        )}

        {/* Cercles de verre brisé */}
        {phase === 'crack' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i / 8) * Math.PI * 2
              const dist = 120 + Math.random() * 200
              const size = 20 + Math.random() * 60
              return (
                <div
                  key={i}
                  className="absolute bg-white/10 rounded-full"
                  style={{
                    width: size,
                    height: size,
                    left: `calc(50% + ${Math.cos(angle) * dist}px - ${size / 2}px)`,
                    top: `calc(50% + ${Math.sin(angle) * dist}px - ${size / 2}px)`,
                    animation: `shatterFrag 1.2s ease-out ${i * 0.05}s forwards`,
                  }}
                />
              )
            })}
            {/* Lignes de fissure */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={`crack-${i}`}
                className="absolute bg-white/20"
                style={{
                  height: 1,
                  width: 80 + Math.random() * 160,
                  left: `${20 + Math.random() * 60}%`,
                  top: `${10 + Math.random() * 80}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  animation: `crackLine 1s ease-out ${i * 0.08}s forwards`,
                }}
              />
            ))}
          </div>
        )}

        {/* Texte */}
        <div className={`relative z-10 text-center px-4 ${phase === 'impact' ? 'animate-shake' : ''}`}>
          <h1 className={`text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-none transition-all duration-1000 ${
            phase === 'fly' ? 'animate-flyIn' : phase === 'impact' ? 'scale-110' : phase === 'crack' ? 'scale-100 text-white/90' : 'scale-100'
          }`}
          style={phase === 'crack' ? { textShadow: '0 0 30px rgba(255,255,255,0.4), 2px 2px 0 rgba(255,255,255,0.1), -1px -1px 0 rgba(255,255,255,0.05)' } : {}}
          >
            Eric Ingrand
          </h1>
          <p className={`mt-4 text-lg sm:text-2xl text-blue-300 font-light tracking-wide transition-all duration-1000 delay-300 ${
            phase === 'crack' || phase === 'reveal' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Intelligence Of Weed Of Marocco
          </p>
        </div>

        <style jsx>{`
          @keyframes flyIn {
            0%   { transform: translateY(-120vh) scale(0.3); opacity: 0; filter: blur(8px); }
            60%  { transform: translateY(5vh) scale(1.05); opacity: 1; filter: blur(0); }
            80%  { transform: translateY(-2vh) scale(0.98); }
            100% { transform: translateY(0) scale(1); opacity: 1; filter: blur(0); }
          }
          .animate-flyIn {
            animation: flyIn 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
          }

          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10% { transform: translateX(-6px); }
            20% { transform: translateX(6px); }
            30% { transform: translateX(-4px); }
            40% { transform: translateX(4px); }
            50% { transform: translateX(-2px); }
            60% { transform: translateX(2px); }
          }
          .animate-shake {
            animation: shake 0.4s ease-out;
          }

          @keyframes flash {
            0% { opacity: 1; }
            100% { opacity: 0; }
          }
          .animate-flash {
            animation: flash 0.3s ease-out forwards;
          }

          @keyframes shatterFrag {
            0% { transform: scale(0) translate(0, 0); opacity: 0.8; }
            100% { transform: scale(1) translate(0, 0); opacity: 0; }
          }

          @keyframes crackLine {
            0% { opacity: 0; transform: scaleX(0); }
            50% { opacity: 0.6; transform: scaleX(1); }
            100% { opacity: 0; transform: scaleX(1); }
          }
        `}</style>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-[#1e3a5f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6 flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-3 app-drop">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-none">APP-ZERO</h1>
            <div className="hidden sm:block text-[10px] uppercase tracking-[0.25em] text-white/60 font-semibold">
              Votre entreprise
            </div>
          </div>
          <div className="text-[11px] text-white/70">
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </div>
        </div>
      </header>

      <div className="relative z-10">
        <div className="px-4 sm:px-6 pt-6 sm:pt-8 pb-12 buttons-reveal">
          <div className="max-w-7xl mx-auto">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500 font-semibold mb-4 px-1">Modules</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {TOOLS.map(t => {
                const textColor = t.text === 'white' ? 'text-white' : 'text-black'
                const descColor = t.text === 'white' ? 'text-white/80' : 'text-black/70'
                return (
                  <Link
                    key={t.href}
                    href={t.href}
                    className={`group relative rounded-3xl overflow-hidden aspect-square flex flex-col justify-end p-5 sm:p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${t.bg}`}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none select-none absolute -top-4 -right-4 sm:-top-6 sm:-right-6 text-[140px] sm:text-[170px] leading-none opacity-25 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500"
                    >
                      {t.emoji}
                    </span>
                    <div className={`relative z-10 ${textColor}`}>
                      <div className="text-xl sm:text-2xl font-black leading-tight tracking-tight drop-shadow-sm">
                        {t.label}
                      </div>
                      <div className={`text-xs sm:text-sm mt-1 leading-snug ${descColor}`}>
                        {t.desc}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes softFadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .app-drop      { opacity: 0; animation: softFadeUp 0.4s ease-out 0.05s forwards; }
        .buttons-reveal { opacity: 0; animation: softFadeUp 0.4s ease-out 0.15s forwards; }

        @media (prefers-reduced-motion: reduce) {
          .app-drop, .buttons-reveal {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </main>
  )
}
