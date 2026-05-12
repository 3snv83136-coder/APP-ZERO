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
  { href: '/mail',         emoji: '📧', label: 'Emails',        desc: 'Emails envoyés',               bg: 'bg-gradient-to-br from-cyan-500 to-cyan-700',      text: 'white' },
]

const SPLASH_DURATION = 5000

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), SPLASH_DURATION - 600)
    const hideTimer = setTimeout(() => setShowSplash(false), SPLASH_DURATION)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (showSplash) {
    return (
      <main className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-800 via-blue-600 to-blue-900 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
        <div className="text-center px-4 splash-enter">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-lg">
            Eric Ingrand
          </h1>
          <p className="mt-4 text-lg sm:text-2xl text-blue-200 font-light tracking-wide">
            Intelligence Of Weed Of Marocco
          </p>
          <div className="mt-10 flex justify-center gap-2">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-white/60 animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes splashFadeUp {
            from { opacity: 0; transform: translateY(20px) scale(0.95); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
          .splash-enter {
            animation: splashFadeUp 0.8s ease-out forwards;
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
