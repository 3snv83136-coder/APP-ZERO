'use client'
import { useState, useRef, useEffect } from "react"
import BackBar from "@/components/BackBar"

const MAX_THC = 500
const NEURON_COUNT = 120

interface NeuronData {
  id: number
  x: number
  y: number
  size: number
  delay: number
}

function NeuronDot({ data, alive }: { data: NeuronData; alive: boolean }) {
  return (
    <div
      className="absolute rounded-full transition-all duration-700 ease-out"
      style={{
        left: `${data.x}%`,
        top: `${data.y}%`,
        width: data.size,
        height: data.size,
        opacity: alive ? 0.9 : 0.08,
        transform: alive ? 'scale(1)' : 'scale(0.3)',
        background: alive
          ? 'radial-gradient(circle at 30% 30%, #a3e635, #4ade80, #166534)'
          : 'radial-gradient(circle at 30% 30%, #3f6212, #14532d)',
        boxShadow: alive ? '0 0 6px #4ade80, 0 0 12px #22c55e' : 'none',
        transitionDelay: `${data.delay}ms`,
      }}
    />
  )
}

export default function WeedPage() {
  const [thc, setThc] = useState(50)
  const [mounted, setMounted] = useState(false)
  const neuronData = useRef<NeuronData[]>([])

  useEffect(() => {
    const arr: NeuronData[] = []
    for (let i = 0; i < NEURON_COUNT; i++) {
      arr.push({
        id: i,
        x: Math.random() * 92 + 2,
        y: Math.random() * 88 + 4,
        size: Math.random() * 6 + 3,
        delay: Math.random() * 300,
      })
    }
    neuronData.current = arr
    setMounted(true)
  }, [])

  const neuronsAlive = Math.max(0, Math.round(NEURON_COUNT * (1 - thc / MAX_THC)))
  const neuronsDead = NEURON_COUNT - neuronsAlive
  const healthScore = Math.max(0, Math.round(100 - (thc / MAX_THC) * 100))

  const healthLabel =
    healthScore >= 80 ? 'Excellent 😇' :
    healthScore >= 60 ? 'Bon 🙂' :
    healthScore >= 40 ? 'Moyen 😐' :
    healthScore >= 20 ? 'Dégradé 😟' :
    'Critique 💀'

  const healthColor =
    healthScore >= 60 ? 'text-green-400' :
    healthScore >= 30 ? 'text-yellow-400' :
    'text-red-500'

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0a1f0a] via-[#0d2e0d] to-[#061206]">
      <BackBar title="🌿 Weed" />
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cpath d='M100 20 Q120 10 140 20 Q160 40 140 70 Q160 90 140 110 Q120 130 100 110 Q80 130 60 110 Q40 90 60 70 Q40 40 60 20 Q80 10 100 20Z' fill='%2322c55e' opacity='0.3'/%3E%3Cpath d='M100 30 L105 50 L125 55 L108 70 L112 90 L100 80 L88 90 L92 70 L75 55 L95 50Z' fill='%234ade80' opacity='0.2'/%3E%3C/svg%3E")`,
        backgroundSize: '120px 120px',
      }} />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl sm:text-4xl font-black text-green-400 text-center tracking-tight drop-shadow-lg">
          🌿 Calculateur de Neurones
        </h1>
        <p className="text-green-300/60 text-center text-sm mt-2">
          Intelligence Of Weed Of Marocco
        </p>

        <div className="mt-8 bg-black/30 backdrop-blur rounded-2xl p-6 border border-green-800/50">
          <label className="block text-green-300 text-sm font-semibold mb-3">
            THC ingurgité — <span className="text-green-400 font-bold">{thc} mg</span>
          </label>
          <input
            type="range"
            min={0}
            max={MAX_THC}
            value={thc}
            onChange={e => setThc(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              accentColor: '#22c55e',
              background: `linear-gradient(to right, #22c55e 0%, #22c55e ${(thc / MAX_THC) * 100}%, #1a3a1a ${(thc / MAX_THC) * 100}%, #1a3a1a 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-green-600 mt-1">
            <span>0 mg</span>
            <span>500 mg</span>
          </div>
        </div>

        <div className="mt-6 bg-black/40 backdrop-blur rounded-2xl p-4 border border-green-800/50 relative h-80 overflow-hidden">
          {mounted && neuronData.current.map((n, i) => (
            <NeuronDot key={n.id} data={n} alive={i < neuronsAlive} />
          ))}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div className="bg-black/60 rounded-xl px-4 py-2">
              <div className="text-xs text-green-500 uppercase tracking-wider">Neurones actifs</div>
              <div className="text-2xl font-black text-green-400">{neuronsAlive}<span className="text-sm text-green-600">/{NEURON_COUNT}</span></div>
            </div>
            <div className="bg-black/60 rounded-xl px-4 py-2">
              <div className="text-xs text-red-500 uppercase tracking-wider">Détruits</div>
              <div className="text-2xl font-black text-red-500">{neuronsDead}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-black/40 backdrop-blur rounded-2xl p-6 border border-green-800/50 text-center">
          <p className="text-green-400/60 text-xs uppercase tracking-widest mb-2">Indice Santé (factice)</p>
          <div className={`text-4xl font-black ${healthColor} drop-shadow-lg`}>
            {healthLabel}
          </div>
          <div className="mt-3 w-full bg-black/50 rounded-full h-3 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${healthScore}%`,
                background: healthScore >= 60
                  ? 'linear-gradient(90deg, #22c55e, #4ade80)'
                  : healthScore >= 30
                  ? 'linear-gradient(90deg, #eab308, #facc15)'
                  : 'linear-gradient(90deg, #ef4444, #dc2626)',
              }}
            />
          </div>
          <p className="text-green-400/40 text-xs mt-2">{healthScore}% de capacité neuronale restante</p>
          <p className="text-green-600/30 text-[10px] mt-8 italic">
            * Ce calculateur est purement fictif et humoristique. Aucune valeur scientifique.
          </p>
        </div>
      </div>
    </div>
  )
}
