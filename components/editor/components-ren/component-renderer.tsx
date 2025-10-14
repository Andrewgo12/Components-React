"use client"

import React from 'react'
import { renderBasicComponents } from './basicos'
import { renderMagicUIComponents } from './magic-ui'
import { renderBackgroundComponents } from './fondos'
import { renderTemplateComponents } from './templates'
import { renderEffectComponents } from './efectos'
import * as Icons from '@/components/icons'

interface ComponentProps {
  props: any
  getEffectClasses: () => string
  getEffectStyles: () => any
}

interface ComponentRendererProps {
  component: any
  isSelected: boolean
  onSelect: () => void
  onDelete: () => void
  mode: 'design' | 'preview'
}

function renderAllComponents(type: string, componentProps: ComponentProps) {
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

export function ComponentRenderer({ component, isSelected, onSelect, onDelete, mode }: ComponentRendererProps) {
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

  const componentProps = {
    props: component.props || {},
    getEffectClasses,
    getEffectStyles
  }

  const renderedComponent = renderAllComponents(component.type, componentProps)

  return (
    <div
      className={`relative group transition-all duration-200 ${
        isSelected ? 'ring-2 ring-primary ring-offset-2' : ''
      }`}
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
    >
      {renderedComponent}
      
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
  )
}