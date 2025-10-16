"use client"

import { useState, useRef, useEffect } from "react"

interface ResizableWrapperProps {
  children: React.ReactNode
  componentId: string
  width?: number
  height?: number
  onResize: (id: string, width: number, height: number) => void
  isSelected: boolean
}

type ResizeHandle = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw'

export function ResizableWrapper({
  children,
  componentId,
  width: initialWidth,
  height: initialHeight,
  onResize,
  isSelected
}: ResizableWrapperProps) {
  const [isResizing, setIsResizing] = useState(false)
  const [currentHandle, setCurrentHandle] = useState<ResizeHandle | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const startPosRef = useRef({ x: 0, y: 0 })
  const startSizeRef = useRef({ width: 0, height: 0 })
  const didAutosizeRef = useRef(false)

  // Auto-size on mount when no explicit width/height provided
  useEffect(() => {
    if (didAutosizeRef.current) return
    if (initialWidth && initialHeight) return
    if (!containerRef.current) return

    const raf = requestAnimationFrame(() => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const measuredW = Math.max(50, Math.ceil(rect.width))
      const measuredH = Math.max(50, Math.ceil(rect.height))
      if ((!initialWidth || !initialHeight) && (measuredW || measuredH)) {
        didAutosizeRef.current = true
        onResize(componentId, initialWidth || measuredW, initialHeight || measuredH)
      }
    })
    return () => cancelAnimationFrame(raf)
  }, [componentId, initialWidth, initialHeight, onResize])

  useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!currentHandle || !containerRef.current) return

      const deltaX = e.clientX - startPosRef.current.x
      const deltaY = e.clientY - startPosRef.current.y

      let newWidth = startSizeRef.current.width
      let newHeight = startSizeRef.current.height

      // Calcular nuevas dimensiones según el handle
      switch (currentHandle) {
        case 'e': // Este (derecha)
          newWidth = Math.max(50, startSizeRef.current.width + deltaX)
          break
        case 'w': // Oeste (izquierda)
          newWidth = Math.max(50, startSizeRef.current.width - deltaX)
          break
        case 's': // Sur (abajo)
          newHeight = Math.max(50, startSizeRef.current.height + deltaY)
          break
        case 'n': // Norte (arriba)
          newHeight = Math.max(50, startSizeRef.current.height - deltaY)
          break
        case 'se': // Sureste (esquina inferior derecha)
          newWidth = Math.max(50, startSizeRef.current.width + deltaX)
          newHeight = Math.max(50, startSizeRef.current.height + deltaY)
          break
        case 'sw': // Suroeste (esquina inferior izquierda)
          newWidth = Math.max(50, startSizeRef.current.width - deltaX)
          newHeight = Math.max(50, startSizeRef.current.height + deltaY)
          break
        case 'ne': // Noreste (esquina superior derecha)
          newWidth = Math.max(50, startSizeRef.current.width + deltaX)
          newHeight = Math.max(50, startSizeRef.current.height - deltaY)
          break
        case 'nw': // Noroeste (esquina superior izquierda)
          newWidth = Math.max(50, startSizeRef.current.width - deltaX)
          newHeight = Math.max(50, startSizeRef.current.height - deltaY)
          break
      }

      onResize(componentId, Math.round(newWidth), Math.round(newHeight))
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      setCurrentHandle(null)
      document.body.style.cursor = 'default'
      document.body.style.userSelect = 'auto'
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, currentHandle, componentId, onResize])

  const handleResizeStart = (e: React.MouseEvent, handle: ResizeHandle) => {
    e.stopPropagation()
    e.preventDefault()

    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    
    setIsResizing(true)
    setCurrentHandle(handle)
    startPosRef.current = { x: e.clientX, y: e.clientY }
    startSizeRef.current = { 
      width: initialWidth || rect.width, 
      height: initialHeight || rect.height 
    }

    // Cambiar cursor según el handle
    const cursors: Record<ResizeHandle, string> = {
      n: 'ns-resize',
      s: 'ns-resize',
      e: 'ew-resize',
      w: 'ew-resize',
      ne: 'nesw-resize',
      nw: 'nwse-resize',
      se: 'nwse-resize',
      sw: 'nesw-resize'
    }
    document.body.style.cursor = cursors[handle]
    document.body.style.userSelect = 'none'
  }

  const handleStyle = "absolute bg-blue-500 hover:bg-blue-600 transition-colors z-50"
  const cornerSize = "w-3 h-3 rounded-full"
  const edgeThickness = "2px"

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      style={{
        width: initialWidth ? `${initialWidth}px` : 'auto',
        height: initialHeight ? `${initialHeight}px` : 'auto',
        minWidth: initialWidth ? `${initialWidth}px` : '120px',
        minHeight: initialHeight ? `${initialHeight}px` : '48px'
      }}
    >
      <div 
        className="w-full h-full overflow-hidden"
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        {children}
      </div>

      {/* Mostrar handles solo si está seleccionado */}
      {isSelected && (
        <>
          {/* Handles de esquinas */}
          <div
            className={`${handleStyle} ${cornerSize} -top-1.5 -left-1.5 cursor-nwse-resize`}
            onMouseDown={(e) => handleResizeStart(e, 'nw')}
            title="Redimensionar desde esquina superior izquierda"
          />
          <div
            className={`${handleStyle} ${cornerSize} -top-1.5 -right-1.5 cursor-nesw-resize`}
            onMouseDown={(e) => handleResizeStart(e, 'ne')}
            title="Redimensionar desde esquina superior derecha"
          />
          <div
            className={`${handleStyle} ${cornerSize} -bottom-1.5 -left-1.5 cursor-nesw-resize`}
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
            title="Redimensionar desde esquina inferior izquierda"
          />
          <div
            className={`${handleStyle} ${cornerSize} -bottom-1.5 -right-1.5 cursor-nwse-resize`}
            onMouseDown={(e) => handleResizeStart(e, 'se')}
            title="Redimensionar desde esquina inferior derecha"
          />

          {/* Handles de bordes */}
          <div
            className={`${handleStyle} cursor-ns-resize`}
            style={{
              top: '-2px',
              left: '20%',
              right: '20%',
              height: edgeThickness
            }}
            onMouseDown={(e) => handleResizeStart(e, 'n')}
            title="Redimensionar altura (arriba)"
          />
          <div
            className={`${handleStyle} cursor-ns-resize`}
            style={{
              bottom: '-2px',
              left: '20%',
              right: '20%',
              height: edgeThickness
            }}
            onMouseDown={(e) => handleResizeStart(e, 's')}
            title="Redimensionar altura (abajo)"
          />
          <div
            className={`${handleStyle} cursor-ew-resize`}
            style={{
              left: '-2px',
              top: '20%',
              bottom: '20%',
              width: edgeThickness
            }}
            onMouseDown={(e) => handleResizeStart(e, 'w')}
            title="Redimensionar ancho (izquierda)"
          />
          <div
            className={`${handleStyle} cursor-ew-resize`}
            style={{
              right: '-2px',
              top: '20%',
              bottom: '20%',
              width: edgeThickness
            }}
            onMouseDown={(e) => handleResizeStart(e, 'e')}
            title="Redimensionar ancho (derecha)"
          />

          {/* Indicador de dimensiones mientras se redimensiona */}
          {isResizing && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-50">
              {initialWidth}px × {initialHeight}px
            </div>
          )}
        </>
      )}
    </div>
  )
}
