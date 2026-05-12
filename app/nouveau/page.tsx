'use client'
import { useState, useEffect } from "react"
import BackBar from "@/components/BackBar"

type Entry = {
  id: string
  title: string
  description: string
  date: string
}

const STORAGE_KEY = 'app_demo_entries'

function loadEntries(): Entry[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function saveEntries(entries: Entry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export default function NouveauPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')
  const [entries, setEntries] = useState<Entry[]>([])

  useEffect(() => { setEntries(loadEntries()) }, [])

  function handleSave() {
    if (!title.trim()) return
    const entry: Entry = {
      id: Date.now().toString(36),
      title: title.trim(),
      description: description.trim(),
      date: new Date().toISOString().slice(0, 10),
    }
    const updated = [entry, ...entries]
    saveEntries(updated)
    setEntries(updated)
    setMessage('✅ Enregistré avec succès.')
    setTitle('')
    setDescription('')
    setTimeout(() => setMessage(''), 3000)
  }

  function handleDelete(id: string) {
    const updated = entries.filter(e => e.id !== id)
    saveEntries(updated)
    setEntries(updated)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BackBar title="📝 Nouvelle entrée" />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">📝 Nouvelle entrée</h1>

        {/* Formulaire */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Titre de l'entrée"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description détaillée..."
              rows={4}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {message && (
            <p className={`text-sm font-medium ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
          <button
            onClick={handleSave}
            disabled={!title.trim()}
            className="w-full bg-blue-700 text-white py-2.5 rounded-lg hover:bg-blue-800 disabled:opacity-40 font-semibold transition"
          >
            Enregistrer
          </button>
        </div>

        {/* Liste */}
        {entries.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Dernières entrées ({entries.length})
            </h2>
            {entries.map(entry => (
              <div key={entry.id} className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-start gap-3">
                <div>
                  <h3 className="font-semibold text-gray-800">{entry.title}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{entry.description || '—'}</p>
                  <p className="text-xs text-gray-400 mt-1">{entry.date}</p>
                </div>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="text-red-400 hover:text-red-600 text-sm shrink-0 transition"
                >
                  🗑
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
