'use client'

import { Share2 } from 'lucide-react'

const PROFILE_IMAGE = "/images/Gallery/ivan_dibujo.png"

export function LinkinbioHeader() {
  return (
    <header className="fixed top-0 w-full z-50 bg-bg-light/80 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200">
            <img 
              src={PROFILE_IMAGE} 
              alt="Ivan Navincopa" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="font-sans text-lg font-bold tracking-tight text-primary">
            Ivan Navincopa
          </span>
        </div>
        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <Share2 className="w-5 h-5 text-primary" />
        </button>
      </div>
    </header>
  )
}
