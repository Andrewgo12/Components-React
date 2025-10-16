"use client"

import React, { useState, memo } from 'react'
import { renderBasicComponents } from './basicos'
import { renderMagicUIComponents } from './magic-ui'
import { renderBackgroundComponents } from './fondos'
import { renderTemplateComponents } from './templates'
import { renderEffectComponents } from './efectos'
import { ComponentWrapper } from './component-wrapper'
import * as Icons from '@/components/icons'
import { AdvancedEditor } from '../advanced-editor'

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
  const [isEditorOpen, setIsEditorOpen] = useState(false)

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

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (mode === 'design') {
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
        className={`relative group transition-all duration-200 ${
          isSelected ? 'ring-2 ring-primary ring-offset-2' : ''
        }`}
        style={{
          width: component.props?.width ? `${component.props.width}px` : 'auto',
          height: component.props?.height ? `${component.props.height}px` : 'auto',
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'stretch'
        }}
        onClick={(e) => {
          e.stopPropagation()
          onSelect()
        }}
        onDoubleClick={handleDoubleClick}
        title={mode === 'design' ? 'Doble clic para editar' : ''}
      >
        <div style={{ width: '100%', height: '100%', display: 'flex' }}>
          {renderedComponent}
        </div>
        
        {isSelected && mode === 'design' && (
          <div className="absolute -top-2 -right-2 flex gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
              }}
              className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
            >
              <Icons.XIcon className="w-3 h-3" />
            </button>
          </div>
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