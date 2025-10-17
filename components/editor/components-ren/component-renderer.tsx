"use client"

import React, { memo } from 'react'
import { renderBasicComponents } from './basicos'
import { renderMagicUIComponents } from './magic-ui'
import { renderBackgroundComponents } from './fondos'
import { renderTemplateComponents } from './templates'
import { renderEffectComponents } from './efectos'
import { ComponentWrapper } from './component-wrapper'
import * as Icons from '@/components/icons'

interface ComponentProps {
  props: any
  getEffectClasses: () => string
  getEffectStyles: () => any
}

const areEqual = (prev: ComponentRendererProps, next: ComponentRendererProps) => {
  // Evitar re-render si no cambian las piezas que afectan la UI.
  return (
    prev.component === next.component &&
    prev.isSelected === next.isSelected &&
    prev.mode === next.mode
  )
}

export const ComponentRenderer = memo(ComponentRendererInner, areEqual)

interface ComponentRendererProps {
  component: any
  isSelected: boolean
  onSelect: () => void
  onDelete: () => void
  onUpdate?: (componentId: string, updates: any) => void
  mode: 'design' | 'preview'
}

export function renderAllComponents(type: string, componentProps: ComponentProps) {
  const { props } = componentProps
  
  // Componentes Básicos
  const basicComponent = renderBasicComponents(type, componentProps)
  if (basicComponent) return <ComponentWrapper width={props.width} height={props.height}>{basicComponent}</ComponentWrapper>

  // Magic UI Components
  const magicComponent = renderMagicUIComponents(type, componentProps)
  if (magicComponent) return <ComponentWrapper width={props.width} height={props.height}>{magicComponent}</ComponentWrapper>

  // Fondos
  const backgroundComponent = renderBackgroundComponents(type, componentProps)
  if (backgroundComponent) return <ComponentWrapper width={props.width} height={props.height}>{backgroundComponent}</ComponentWrapper>

  // Templates
  const templateComponent = renderTemplateComponents(type, componentProps)
  if (templateComponent) return <ComponentWrapper width={props.width} height={props.height}>{templateComponent}</ComponentWrapper>

  // Efectos
  const effectComponent = renderEffectComponents(type, componentProps)
  if (effectComponent) return <ComponentWrapper width={props.width} height={props.height}>{effectComponent}</ComponentWrapper>

  // Componente por defecto si no se encuentra
  return (
    <ComponentWrapper width={props.width} height={props.height}>
      <div className={`p-4 rounded-lg border border-dashed ${componentProps.getEffectClasses()}`} style={componentProps.getEffectStyles()}>
        <p className="text-sm text-muted-foreground">Componente: {type}</p>
      </div>
    </ComponentWrapper>
  )
}

function ComponentRendererInner({ component, isSelected, onSelect, onDelete, onUpdate, mode }: ComponentRendererProps) {
  const getEffectClasses = () => {
    if (!component.effects) return ''
    
    const classes = []
    if (component.effects.glow) classes.push('glow-effect')
    if (component.effects.shimmer) classes.push('shimmer-effect')
    if (component.effects.ripple) classes.push('ripple-effect')
    if (component.effects.glass) classes.push('glass-effect')
    
    return classes.join(' ')
  }

  const getEffectStyles = () => {
    const styles: any = {}
    
    if (component.effects?.glow) {
      styles.boxShadow = `0 0 20px ${component.effects.glowColor || '#3b82f6'}`
    }
    
    if (component.effects?.glass) {
      styles.backdropFilter = 'blur(10px)'
      styles.backgroundColor = 'rgba(255, 255, 255, 0.1)'
    }
    
    return styles
  }

  // Función para actualizar texto inline
  const handleTextUpdate = (path: string, newValue: string) => {
    if (onUpdate) {
      const keys = path.split('.')
      const updates: any = { ...component }
      let current = updates
      
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i]
        if (key && !current[key]) {
          current[key] = {}
        }
        if (key) {
          current = current[key]
        }
      }
      
      const lastKey = keys[keys.length - 1]
      if (lastKey) {
        current[lastKey] = newValue
      }
      
      onUpdate(component.id, updates)
    }
  }

  const componentProps = {
    props: {
      ...(component.props || {}),
      mode,
      // Inyectar función de actualización de texto
      onUpdateText: (newText: string) => handleTextUpdate('props.text', newText),
      onUpdateTitle: (newTitle: string) => handleTextUpdate('props.title', newTitle),
      onUpdateDescription: (newDesc: string) => handleTextUpdate('props.description', newDesc),
      onUpdateContent: (newContent: string) => handleTextUpdate('props.content', newContent),
      onUpdatePlaceholder: (newPlaceholder: string) => handleTextUpdate('props.placeholder', newPlaceholder),
    },
    getEffectClasses,
    getEffectStyles
  }

  const renderedComponent = renderAllComponents(component.type, componentProps)

  return (
    <>
      <div
        className={`relative group transition-all duration-200 ${
          isSelected ? 'ring-2 ring-primary ring-offset-2 shadow-lg' : 'hover:ring-1 hover:ring-primary/30'
        }`}
        style={{
          width: component.props?.width ? `${component.props.width}px` : 'auto',
          height: component.props?.height ? `${component.props.height}px` : 'auto',
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'stretch',
          cursor: mode === 'design' ? 'pointer' : 'default'
        }}
        onClick={(e) => {
          e.stopPropagation()
          onSelect()
        }}
        title={mode === 'design' ? 'Clic para seleccionar - Edita en el Inspector' : ''}
      >
        <div style={{ width: '100%', height: '100%', display: 'flex' }}>
          {renderedComponent}
        </div>
        
        {/* Badges y controles cuando está seleccionado */}
        {isSelected && mode === 'design' && (
          <>
            {/* Badge superior izquierdo con nombre del componente */}
            <div className="absolute -top-8 left-0 bg-primary text-primary-foreground px-2 py-1 rounded-t text-xs font-semibold shadow-md flex items-center gap-2">
              <span>{component.name || component.type}</span>
              <span className="opacity-60">•</span>
              <span className="opacity-80 text-[10px]">Edita en el Inspector →</span>
            </div>

            {/* Controles superiores derechos */}
            <div className="absolute -top-2 -right-2 flex gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete()
                }}
                className="w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors shadow-lg"
                title="Eliminar"
              >
                <Icons.XIcon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Dimensiones en la esquina inferior derecha */}
            {(component.props?.width || component.props?.height) && (
              <div className="absolute -bottom-6 right-0 bg-muted text-muted-foreground px-2 py-1 rounded-b text-[10px] font-mono shadow-sm">
                {component.props?.width || 'auto'} × {component.props?.height || 'auto'}
              </div>
            )}
          </>
        )}

        {/* Indicador de hover cuando NO está seleccionado */}
        {!isSelected && mode === 'design' && (
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded" />
        )}
      </div>
    </>
  )
}