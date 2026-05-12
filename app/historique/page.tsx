'use client'
import { useState, useEffect } from "react"

type Entry = {
  id: string
  title: string
  description: string
  date: string
}

const STORAGE_KEY = 'app_demo_entries'

export default function HistoriquePage() {
  const [entries, setEntries] = useState<Entry[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      setEntries(raw ? JSON.parse(raw) : [])
    } catch { setEntries([]) }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">📚 Historique</h1>
        <p className="text-gray-500 mb-6">Toutes les entrées enregistrées.</p>

        {entries.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400">
            <p className="text-lg">Aucune entrée pour le moment.</p>
            <p className="text-sm mt-1">Créez votre première entrée depuis le module Nouveau.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map(entry => (
              <div key={entry.id} className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">{entry.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{entry.description || '—'}</p>
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">{entry.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
