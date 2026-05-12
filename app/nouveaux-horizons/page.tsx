'use client'
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import BackBar from "@/components/BackBar"

const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then(m => m.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then(m => m.Popup), { ssr: false })

const CENTER: [number, number] = [48.7699, 1.9553]
const ZOOM = 14

const POPS = ['P', 'O', 'P', ' ', 'P', 'O', 'P', ' ', 'P', 'O', 'P', ' ', 'P', 'O', 'P']

export default function NouveauxHorizonsPage() {
  const [mounted, setMounted] = useState(false)
  const [L, setL] = useState<any>(null)

  useEffect(() => {
    import("leaflet").then(mod => {
      setL(mod.default)
      delete (mod.default.Icon.Default.prototype as any)._getIconUrl
      mod.default.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      })
      setMounted(true)
    })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <BackBar title="🏗️ Nouveaux Horizons" />

      {/* Bannière bâtiment */}
      <div className="relative bg-gradient-to-br from-amber-600 via-orange-500 to-red-600 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect x='60' y='60' width='80' height='120' fill='%23fff'/%3E%3Crect x='70' y='40' width='20' height='20' fill='%23fff'/%3E%3Crect x='110' y='40' width='20' height='20' fill='%23fff'/%3E%3Crect x='90' y='30' width='20' height='10' fill='%23fff'/%3E%3Crect x='50' y='70' width='15' height='20' fill='%23ddd'/%3E%3Crect x='135' y='70' width='15' height='20' fill='%23ddd'/%3E%3Crect x='30' y='100' width='40' height='80' fill='%23ccc'/%3E%3Crect x='130' y='110' width='50' height='70' fill='%23ccc'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 text-center">
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-lg">
            Nouveaux Horizons
          </h1>
          <p className="text-amber-200 text-sm sm:text-base mt-2 font-light">
            Projet Élancourt 78990
          </p>
        </div>
      </div>

      {/* Titre animé POP POP POP POP */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <div className="flex justify-center flex-wrap gap-1 sm:gap-2">
            {POPS.map((char, i) => (
              <span
                key={i}
                className="inline-block text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-500 to-red-600 pop-char"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Carte Élancourt */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-700">📍 Plan — Élancourt 78990</h2>
            <p className="text-xs text-gray-400 mt-0.5">Yvelines, Île-de-France</p>
          </div>
          <div className="h-[400px] sm:h-[500px] bg-gray-200 relative">
            {mounted && L ? (
              <MapContainer center={CENTER} zoom={ZOOM} className="h-full w-full" scrollWheelZoom={true}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={CENTER}>
                  <Popup>
                    🏗️ Nouveaux Horizons<br />Élancourt 78990
                  </Popup>
                </Marker>
              </MapContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Chargement de la carte...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Infos projet */}
      <div className="max-w-4xl mx-auto px-6 pb-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: '📍', label: 'Adresse', value: 'Élancourt, 78990' },
          { icon: '🏗️', label: 'Type', value: 'Construction neuve' },
          { icon: '📐', label: 'Surface', value: 'En développement' },
        ].map(info => (
          <div key={info.label} className="bg-white rounded-xl shadow-sm p-4 text-center">
            <p className="text-2xl">{info.icon}</p>
            <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">{info.label}</p>
            <p className="font-semibold text-gray-700 text-sm mt-0.5">{info.value}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes popIn {
          0%   { transform: scale(0) rotate(-10deg); opacity: 0; }
          60%  { transform: scale(1.3) rotate(3deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .pop-char {
          animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
