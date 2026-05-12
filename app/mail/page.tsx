'use client'

const MOCK_EMAILS = [
  { id: '1', to: 'dupont@example.fr', subject: 'Confirmation intervention', date: '2026-05-12', status: 'Envoyé' },
  { id: '2', to: 'martin@example.fr', subject: 'Devis N°2026-042', date: '2026-05-11', status: 'Envoyé' },
  { id: '3', to: 'bernard@example.fr', subject: 'Facture N°2026-038', date: '2026-05-10', status: 'Ouvert' },
]

const statusColors: Record<string, string> = {
  Envoyé: 'bg-green-100 text-green-700',
  Ouvert: 'bg-blue-100 text-blue-700',
  Échec: 'bg-red-100 text-red-700',
}

export default function MailPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BackBar title="📧 Emails" />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">📧 Emails</h1>
        <p className="text-gray-500 mb-6">Historique des emails envoyés (données de démonstration).</p>

        <div className="space-y-2">
          {MOCK_EMAILS.map(email => (
            <div key={email.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500 truncate">À : {email.to}</p>
                <h3 className="font-semibold text-gray-800 truncate">{email.subject}</h3>
              </div>
              <div className="text-right shrink-0">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[email.status] || 'bg-gray-100'}`}>
                  {email.status}
                </span>
                <p className="text-xs text-gray-400 mt-1">{email.date}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-3 italic">* Données mockées — sera remplacé par Resend + Supabase</p>
      </div>
    </div>
  )
}
