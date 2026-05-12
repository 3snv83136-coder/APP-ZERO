'use client'
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function NouveauPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  if (!session) {
    router.push('/login')
    return null
  }

  async function handleSave() {
    if (!title.trim()) return
    setSaving(true)
    setMessage('')
    try {
      // TODO: Brancher votre API de sauvegarde
      await new Promise(r => setTimeout(r, 500))
      setMessage('Enregistré avec succès.')
      setTitle('')
      setDescription('')
    } catch {
      setMessage('Erreur lors de l\'enregistrement.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Nouvelle entrée</h1>
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
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
              rows={5}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {message && (
            <p className={`text-sm ${message.includes('Erreur') ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </p>
          )}
          <button
            onClick={handleSave}
            disabled={saving || !title.trim()}
            className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 disabled:opacity-50"
          >
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </div>
    </div>
  )
}
