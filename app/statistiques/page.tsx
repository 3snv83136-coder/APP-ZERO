'use client'
import { useState, useEffect } from "react"

type Entry = {
  id: string
  title: string
  description: string
  date: string
}

const STORAGE_KEY = 'app_demo_entries'

export default function StatistiquesPage() {
  const [entries, setEntries] = useState<Entry[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      setEntries(raw ? JSON.parse(raw) : [])
    } catch { setEntries([]) }
  }, [])

  const total = entries.length
  const thisMonth = entries.filter(e => e.date.startsWith(new Date().toISOString().slice(0, 7))).length
  const avgDescLength = total > 0 ? Math.round(entries.reduce((s, e) => s + (e.description?.length || 0), 0) / total) : 0

  const stats = [
    { label: 'Total entrées', value: total, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Ce mois', value: thisMonth, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Moy. desc.', value: `${avgDescLength} car.`, color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Dernière', value: entries[0]?.date || '—', color: 'text-amber-600', bg: 'bg-amber-50' },
  ]

  // Données mockées pour le graphique
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin']
  const mockData = [3, 7, 4, 8, total || 2, 5]
  const maxVal = Math.max(...mockData, 1)

  return (
    <div className="min-h-screen bg-gray-50">
      <BackBar title="📊 Statistiques" />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">📊 Statistiques</h1>
        <p className="text-gray-500 mb-6">Aperçu de votre activité.</p>

        {/* Cartes stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {stats.map(s => (
            <div key={s.label} className={`${s.bg} rounded-xl p-4`}>
              <p className="text-xs text-gray-500 uppercase tracking-wide">{s.label}</p>
              <p className={`text-2xl font-black mt-1 ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Graphique mock */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">Activité mensuelle</h3>
          <div className="flex items-end gap-3 h-40">
            {months.map((m, i) => (
              <div key={m} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-gray-500">{mockData[i]}</span>
                <div
                  className="w-full bg-blue-500 rounded-t-lg transition-all duration-500"
                  style={{ height: `${(mockData[i] / maxVal) * 100}%` }}
                />
                <span className="text-xs text-gray-400">{m}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4 italic">* Données de démonstration</p>
        </div>
      </div>
    </div>
  )
}
