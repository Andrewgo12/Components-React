"use client"

import { useLiveEffects } from "@/hooks/use-live-effects"
import { useLiveUpdates } from "@/hooks/use-live-updates"
import { generateStyles } from "./style-engine"
import { generateDynamicStyles, generateDynamicClasses, generateDynamicAttributes } from "@/lib/style-generator"
import { forceApplyStyles } from "@/lib/force-styles"
import { useEffect, useRef, useState } from "react"
import { renderBasicComponents } from "./components-ren/basicos"
import { renderMagicUIComponents } from "./components-ren/magic-ui"
import { renderBackgroundComponents } from "./components-ren/fondos"
import { renderTemplateComponents } from "./components-ren/templates"
import { renderEffectComponents } from "./components-ren/efectos"
import { AdvancedEditor } from "./advanced-editor"

interface ComponentRendererProps {
  component: any
  isSelected: boolean
  onSelect: () => void
  onDelete: () => void
  onUpdate?: (componentId: string, updates: any) => void
  mode: "design" | "preview"
}

export function ComponentRenderer({
  component,
  isSelected,
  onSelect,
  onDelete,
  onUpdate,
  mode,
}: ComponentRendererProps) {
  const { type, props, effects = {} } = component
  const effectsRef = useLiveEffects(effects)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  
  // Hook para actualizaciones en vivo del inspector
  useLiveUpdates(component)
  
  // Forzar aplicación de estilos cuando cambien las props
  useEffect(() => {
    if (containerRef.current) {
      forceApplyStyles(containerRef.current, props)
    }
  }, [props])

  // Generar estilos usando el motor de estilos completo + estilos dinámicos del inspector
  const { style: generatedStyles, className: generatedClasses } = generateStyles(props)
  const dynamicStyles = generateDynamicStyles(props)
  const dynamicClasses = generateDynamicClasses(props)
  const dynamicAttributes = generateDynamicAttributes(props)
  
  const getEffectStyles = () => {
    const styles: any = { 
      ...generatedStyles,
      ...dynamicStyles // Aplicar estilos del inspector inmediatamente
    }

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
    const classes: string[] = [generatedClasses, dynamicClasses]

    if (effects.shimmer?.enabled) {
      classes.push('relative overflow-hidden')
    }
    if (effects.ripple?.enabled) {
      classes.push('relative overflow-hidden cursor-pointer')
    }
    if (effects.borderBeam?.enabled) {
      classes.push('relative')
    }

    return classes.filter(Boolean).join(' ')
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
    props: {
      ...props,
      ...dynamicAttributes // Aplicar atributos del inspector
    },
    getEffectClasses,
    getEffectStyles
  }

  const renderComponent = () => {
    // Componentes Básicos
    const basicComponent = renderBasicComponents(type, componentProps)
    if (basicComponent) return basicComponent

    // Magic UI Components
    const magicComponent = renderMagicUIComponents(type, componentProps)
    if (magicComponent) return magicComponent

    // Fondos
    const backgroundComponent = renderBackgroundComponents(type, componentProps)
    if (backgroundComponent) return backgroundComponent

    // Templates
    const templateComponent = renderTemplateComponents(type, componentProps)
    if (templateComponent) return templateComponent

    // Efectos
    const effectComponent = renderEffectComponents(type, componentProps)
    if (effectComponent) return effectComponent

    // Componente por defecto si no se encuentra
    return (
      <div className={`p-4 rounded-lg border border-dashed ${componentProps.getEffectClasses()}`} style={componentProps.getEffectStyles()}>
        <p className="text-sm text-muted-foreground">Componente: {type}</p>
      </div>
    )
  }

  const renderedComponent = renderComponent()

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (mode === "design") {
      e.stopPropagation()
      setIsEditorOpen(true)
    }
  }

  const handleUpdateComponent = (componentId: string, updates: any) => {
    if (onUpdate) {
      onUpdate(componentId, updates)
    }
  }

  return (
    <>
      <div
        ref={(el) => {
          if (effectsRef) (effectsRef as any).current = el
          if (containerRef) containerRef.current = el
        }}
        data-component-id={component.id}
        className={`relative ${mode === "design" ? "cursor-pointer" : ""} ${
          isSelected ? "ring-2 ring-blue-500" : ""
        }`}
        onClick={mode === "design" ? onSelect : undefined}
        onDoubleClick={handleDoubleClick}
        title={mode === "design" ? "Doble clic para editar" : ""}
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

      {/* Editor Avanzado */}
      {onUpdate && (
        <AdvancedEditor
          component={component}
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          onUpdate={handleUpdateComponent}
        />
      )}
    </>
  )
}