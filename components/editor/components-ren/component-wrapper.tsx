"use client"

import React, { useRef, useEffect, useState } from 'react'

interface ComponentWrapperProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  width?: number
  height?: number
}

/**
 * Wrapper que hace que cualquier componente ocupe el 100% del espacio disponible
 * y se ajuste automáticamente al redimensionar.
 * También pasa las dimensiones reales a los componentes hijos para escalado proporcional.
 */
export function ComponentWrapper({ children, className = '', style = {}, width, height }: ComponentWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: width || 0, height: height || 0 })

  useEffect(() => {
    if (!containerRef.current) return

    let rafId: number | null = null
    const updateDimensions = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setDimensions({
        width: width || rect.width,
        height: height || rect.height,
      })
    }
    const scheduleUpdate = () => {
      if (rafId != null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        updateDimensions()
      })
    }

    updateDimensions()

    // Observar cambios de tamaño
    const resizeObserver = new ResizeObserver(scheduleUpdate)
    resizeObserver.observe(containerRef.current)

    return () => {
      resizeObserver.disconnect()
      if (rafId != null) cancelAnimationFrame(rafId)
    }
  }, [width, height])

  // Clonar children y pasar dimensiones
  const childrenWithDimensions = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      // Evitar pasar props internas a elementos DOM nativos
      if (typeof child.type === 'string') {
        return child
      }
      return React.cloneElement(child as React.ReactElement<any>, {
        ['data-container-width']: dimensions.width,
        ['data-container-height']: dimensions.height,
      })
    }
    return child
  })

  return (
    <div
      ref={containerRef}
      className={`w-full h-full flex items-center justify-center ${className}`}
      style={{
        width: '100%',
        height: '100%',
        minWidth: '100%',
        minHeight: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
    >
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'stretch', justifyContent: 'stretch' }}>
        {childrenWithDimensions}
      </div>
    </div>
  )
}

/**
 * Wrapper específico para componentes que deben llenar todo el espacio
 */
export function FullSizeWrapper({ children, className = '' }: ComponentWrapperProps) {
  return (
    <div
      className={`${className}`}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  )
}
