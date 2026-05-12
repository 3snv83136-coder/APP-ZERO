'use client'

interface Content {
  titre?: string
  description?: string
  contenu?: string
  [k: string]: any
}

interface Props {
  data: Content
  onChange: (c: Content) => void
}

export default function GenerationPreview({ data, onChange }: Props) {
  const titre = data?.titre ?? ''
  const description = data?.description ?? ''
  const contenu = data?.contenu ?? ''

  function update(field: keyof Content, value: string) {
    onChange({ ...data, [field]: value })
  }

  const fieldClass = "w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
  const labelClass = "block text-xs font-semibold text-gray-600 mb-1"

  return (
    <div className="space-y-6">
      <div>
        <label className={labelClass}>Titre</label>
        <input
          value={titre}
          onChange={e => update('titre', e.target.value)}
          className={fieldClass}
          placeholder="Titre du contenu généré"
        />
      </div>
      <div>
        <label className={labelClass}>Description</label>
        <textarea
          value={description}
          onChange={e => update('description', e.target.value)}
          rows={2}
          className={fieldClass}
          placeholder="Description courte"
        />
      </div>
      <div>
        <label className={labelClass}>Contenu</label>
        <textarea
          value={contenu}
          onChange={e => update('contenu', e.target.value)}
          rows={8}
          className={`${fieldClass} font-mono text-xs`}
          placeholder="Contenu généré..."
        />
      </div>
    </div>
  )
}
