'use client'
import Link from "next/link"

export default function BackBar({ title }: { title: string }) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
        <Link href="/" className="text-gray-500 hover:text-gray-800 transition p-1 -ml-1 rounded-lg hover:bg-gray-100">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </Link>
        <span className="text-sm font-semibold text-gray-600">{title}</span>
      </div>
    </div>
  )
}
