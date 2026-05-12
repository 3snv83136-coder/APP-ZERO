import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function ClientsPage() {
  const session = await auth()
  if (!session) redirect('/login')

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Clients</h1>
        <p className="text-gray-500 mb-6">Gérez votre annuaire clients.</p>
        <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400">
          <p className="text-lg">👥 Aucun client enregistré.</p>
          <p className="text-sm mt-1">Les clients seront ajoutés automatiquement lors de la création d&apos;entrées.</p>
        </div>
      </div>
    </div>
  )
}
