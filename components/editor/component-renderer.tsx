"use client"

import { useLiveEffects } from "@/hooks/use-live-effects"
import { renderAllComponents } from "./components-ren/component-renderer"

interface ComponentRendererProps {
  component: any
  isSelected: boolean
  onSelect: () => void
  onDelete: () => void
  mode: "design" | "preview"
}

export function ComponentRenderer({
  component,
  isSelected,
  onSelect,
  onDelete,
  mode,
}: ComponentRendererProps) {
  const { type, props, effects = {} } = component
  const effectsRef = useLiveEffects(effects)

  const getEffectStyles = () => {
    const styles: any = {}

    if (effects.glow?.enabled) {
      const intensity = effects.glow.intensity || 50
      const color = effects.glow.color || '#3b82f6'
      styles.boxShadow = `0 0 ${intensity}px ${color}40, 0 0 ${intensity * 2}px ${color}20`
      styles.filter = `drop-shadow(0 0 ${intensity / 2}px ${color})`
    }

    if (effects.glass?.enabled) {
      const blur = effects.glass.blur || 10
      const opacity = (effects.glass.opacity || 80) / 100
      styles.backdropFilter = `blur(${blur}px)`
      styles.backgroundColor = `rgba(255, 255, 255, ${opacity * 0.1})`
      styles.border = '1px solid rgba(255, 255, 255, 0.2)'
    }

    if (effects.transform3d?.enabled) {
      const rotateX = effects.transform3d.rotateX || 0
      const rotateY = effects.transform3d.rotateY || 0
      const perspective = effects.transform3d.perspective || 1000
      styles.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      styles.transformStyle = 'preserve-3d'
    }

    if (effects.gradient?.enabled) {
      const color1 = effects.gradient.color1 || '#3b82f6'
      const color2 = effects.gradient.color2 || '#8b5cf6'
      const type = effects.gradient.type || 'linear'
      
      if (type === 'linear') {
        styles.background = `linear-gradient(135deg, ${color1}, ${color2})`
      } else if (type === 'radial') {
        styles.background = `radial-gradient(circle, ${color1}, ${color2})`
      } else if (type === 'conic') {
        styles.background = `conic-gradient(${color1}, ${color2}, ${color1})`
      }
    }

    return styles
  }

  const getEffectClasses = () => {
    const classes: string[] = []

    if (effects.shimmer?.enabled) {
      classes.push('relative overflow-hidden')
    }
    if (effects.ripple?.enabled) {
      classes.push('relative overflow-hidden cursor-pointer')
    }
    if (effects.borderBeam?.enabled) {
      classes.push('relative')
    }

    return classes.join(' ')
  }

  const renderEffectOverlays = () => {
    const overlays = []

    if (effects.shimmer?.enabled) {
      overlays.push(
        <div
          key="shimmer"
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{ 
            animation: `shimmer ${effects.shimmer.speed || 2}s linear infinite`,
            animationDelay: '0s'
          }}
        />
      )
    }

    if (effects.borderBeam?.enabled) {
      const width = effects.borderBeam.width || 2
      const color = effects.borderBeam.color || '#3b82f6'
      overlays.push(
        <div
          key="border-beam"
          className="absolute inset-0 rounded-inherit pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            padding: `${width}px`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            animation: 'border-beam 2s linear infinite'
          }}
        />
      )
    }

    return overlays
  }

  const componentProps = {
    props,
    getEffectClasses,
    getEffectStyles
  }

  const renderedComponent = renderAllComponents(type, componentProps)

  return (
    <div
      ref={effectsRef as any}
      className={`relative ${mode === "design" ? "cursor-pointer" : ""} ${
        isSelected ? "ring-2 ring-blue-500" : ""
      }`}
      onClick={mode === "design" ? onSelect : undefined}
    >
      {renderedComponent}
      {renderEffectOverlays()}
      
      {mode === "design" && isSelected && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 z-10"
        >
          ×
        </button>
      )}
    </div>
  )
}