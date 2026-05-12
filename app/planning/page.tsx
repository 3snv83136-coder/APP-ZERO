'use client'

const MOCK_EVENTS = [
  { id: '1', title: 'RDV Dupont SARL', date: '2026-05-14', time: '09:00', type: 'Intervention' },
  { id: '2', title: 'Maintenance Martin Elec', date: '2026-05-15', time: '14:00', type: 'Maintenance' },
  { id: '3', title: 'Devis Bernard Plomberie', date: '2026-05-16', time: '11:00', type: 'Devis' },
  { id: '4', title: 'Urgence Petit & Fils', date: '2026-05-17', time: '08:30', type: 'Urgence' },
  { id: '5', title: 'Suivi chantier Toulon', date: '2026-05-20', time: '10:00', type: 'Suivi' },
]

const typeColors: Record<string, string> = {
  Intervention: 'bg-blue-100 text-blue-700',
  Maintenance: 'bg-emerald-100 text-emerald-700',
  Devis: 'bg-amber-100 text-amber-700',
  Urgence: 'bg-red-100 text-red-700',
  Suivi: 'bg-violet-100 text-violet-700',
}

export default function PlanningPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BackBar title="📅 Planning" />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">📅 Planning</h1>
        <p className="text-gray-500 mb-6">Prochains rendez-vous (données de démonstration).</p>

        <div className="space-y-3">
          {MOCK_EVENTS.map(event => (
            <div key={event.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
              <div className="text-center shrink-0 w-14">
                <p className="text-xs text-gray-400 uppercase">
                  {new Date(event.date).toLocaleDateString('fr-FR', { weekday: 'short' })}
                </p>
                <p className="text-xl font-black text-gray-700">
                  {new Date(event.date).getDate()}
                </p>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{event.title}</h3>
                <p className="text-sm text-gray-500">{event.time}</p>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${typeColors[event.type] || 'bg-gray-100 text-gray-600'}`}>
                {event.type}
              </span>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-3 italic">* Données mockées — sera remplacé par Supabase</p>
      </div>
    </div>
  )
}
