import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function PlanningPage() {
  const session = await auth()
  if (!session) redirect('/login')

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Planning</h1>
        <p className="text-gray-500 mb-6">Calendrier et gestion des rendez-vous.</p>
        <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400">
          <p className="text-lg">📅 Aucun rendez-vous planifié.</p>
          <p className="text-sm mt-1">Créez une nouvelle entrée pour ajouter des événements au planning.</p>
        </div>
      </div>
    </div>
  )
}
