'use client'
import BackBar from "@/components/BackBar"

const MOCK_CLIENTS = [
  { id: '1', nom: 'Dupont SARL', email: 'contact@dupont.fr', telephone: '01 23 45 67 89', ville: 'Paris' },
  { id: '2', nom: 'Martin Elec', email: 'info@martin-elec.fr', telephone: '04 56 78 90 12', ville: 'Lyon' },
  { id: '3', nom: 'Bernard Plomberie', email: 'bernard@plomberie.fr', telephone: '03 21 54 98 76', ville: 'Marseille' },
  { id: '4', nom: 'Petit & Fils', email: 'contact@petit-fils.fr', telephone: '02 34 56 78 90', ville: 'Toulon' },
]

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BackBar title="👥 Clients" />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">👥 Clients</h1>
        <p className="text-gray-500 mb-6">Annuaire clients (données de démonstration).</p>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Nom</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Email</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Téléphone</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Ville</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_CLIENTS.map(c => (
                <tr key={c.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-800">{c.nom}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 hidden sm:table-cell">{c.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 hidden md:table-cell">{c.telephone}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{c.ville}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-400 mt-3 italic">* Données mockées — sera remplacé par Supabase</p>
      </div>
    </div>
  )
}
