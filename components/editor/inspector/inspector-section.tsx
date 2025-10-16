"use client"

import type React from "react"
import { ChevronDown } from "lucide-react"

interface InspectorSectionProps {
  title: string
  icon?: any
  isExpanded: boolean
  onToggle: () => void
  children: React.ReactNode
}

const sectionStyles = {
  "Básico": "bg-gradient-to-br from-blue-50/90 to-indigo-100/90 border-blue-200/70 dark:from-blue-950/40 dark:to-indigo-950/40 dark:border-blue-800/50",
  "Tipografía": "bg-gradient-to-br from-emerald-50/90 to-teal-100/90 border-emerald-200/70 dark:from-emerald-950/40 dark:to-teal-950/40 dark:border-emerald-800/50",
  "Layout y Tamaño": "bg-gradient-to-br from-purple-50/90 to-violet-100/90 border-purple-200/70 dark:from-purple-950/40 dark:to-violet-950/40 dark:border-purple-800/50",
  "Colores": "bg-gradient-to-br from-rose-50/90 to-pink-100/90 border-rose-200/70 dark:from-rose-950/40 dark:to-pink-950/40 dark:border-rose-800/50",
  "Bordes y Sombras": "bg-gradient-to-br from-amber-50/90 to-orange-100/90 border-amber-200/70 dark:from-amber-950/40 dark:to-orange-950/40 dark:border-amber-800/50",
  "Transformaciones": "bg-gradient-to-br from-cyan-50/90 to-sky-100/90 border-cyan-200/70 dark:from-cyan-950/40 dark:to-sky-950/40 dark:border-cyan-800/50",
  "Efectos y Animaciones": "bg-gradient-to-br from-fuchsia-50/90 to-purple-100/90 border-fuchsia-200/70 dark:from-fuchsia-950/40 dark:to-purple-950/40 dark:border-fuchsia-800/50"
}

const iconStyles = {
  "Básico": "text-blue-600 dark:text-blue-400",
  "Tipografía": "text-emerald-600 dark:text-emerald-400",
  "Layout y Tamaño": "text-purple-600 dark:text-purple-400",
  "Colores": "text-rose-600 dark:text-rose-400",
  "Bordes y Sombras": "text-amber-600 dark:text-amber-400",
  "Transformaciones": "text-cyan-600 dark:text-cyan-400",
  "Efectos y Animaciones": "text-fuchsia-600 dark:text-fuchsia-400"
}

export function InspectorSection({
  title,
  icon: Icon,
  isExpanded,
  onToggle,
  children,
}: InspectorSectionProps) {
  const sectionStyle = sectionStyles[title as keyof typeof sectionStyles] || sectionStyles["Básico"]
  const iconStyle = iconStyles[title as keyof typeof iconStyles] || iconStyles["Básico"]

  return (
    <div className={`border rounded-xl overflow-hidden backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 ${sectionStyle}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-white/50 dark:hover:bg-black/20 transition-all duration-200 group"
      >
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="p-2 rounded-lg bg-white/70 dark:bg-black/30 shadow-sm group-hover:scale-110 transition-transform duration-200 border border-white/50 dark:border-black/20">
              <Icon className={`w-4 h-4 ${iconStyle}`} />
            </div>
          )}
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
            {title}
          </span>
        </div>
        <div className="p-1 rounded-md bg-white/50 dark:bg-black/20 group-hover:bg-white/70 dark:group-hover:bg-black/30 transition-all duration-200">
          <ChevronDown
            className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-all duration-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 ${
              isExpanded ? "rotate-180 scale-110" : ""
            }`}
          />
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-white/40 dark:border-black/20 bg-white/30 dark:bg-black/10 animate-in slide-in-from-top-2 duration-300">
          <div className="p-4">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}