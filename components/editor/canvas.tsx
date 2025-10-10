"use client"

import type React from "react"

import { ComponentRenderer } from "./component-renderer"
import * as Icons from "@/components/icons"
import { useState, useEffect } from "react"

interface CanvasProps {
  components: any[]
  selectedComponent: any
  onSelectComponent: (component: any) => void
  onUpdateComponent: (id: string, updates: any) => void
  onDeleteComponent: (id: string) => void
  zoom: number
  showGrid: boolean
  mode: "design" | "preview"
}

export function Canvas({
  components,
  selectedComponent,
  onSelectComponent,
  onUpdateComponent,
  onDeleteComponent,
  zoom,
  showGrid,
  mode,
}: CanvasProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [draggedComponent, setDraggedComponent] = useState<any>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleDragStart = (e: React.DragEvent, component: any) => {
    setDraggedComponent(component)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (!draggedComponent) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / (zoom / 100)
    const y = (e.clientY - rect.top) / (zoom / 100)

    onUpdateComponent(draggedComponent.id, {
      position: { x: Math.max(0, x - 50), y: Math.max(0, y - 25) }
    })

    setDraggedComponent(null)
  }

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onSelectComponent(null)
    }
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-2 border-b glass-effect glass-effect-dark flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground">Zoom: {zoom}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-muted-foreground">
            {components.length} componente{components.length !== 1 ? "s" : ""}
          </span>
          {selectedComponent && (
            <>
              <span className="text-[9px] text-muted-foreground">•</span>
              <span className="text-[9px] text-primary font-medium">
                {selectedComponent.name}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 relative">
        {showGrid && (
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, oklch(0.90 0 0) 1px, transparent 1px),
                linear-gradient(to bottom, oklch(0.90 0 0) 1px, transparent 1px)
              `,
              backgroundSize: "16px 16px",
            }}
          />
        )}

        {isLoading ? (
          <div className="relative h-full bg-white dark:bg-card rounded-lg shadow-premium-lg p-6 flex items-center justify-center animate-in fade-in duration-300">
            <div className="text-center">
              <Icons.LoaderIcon className="w-6 h-6 animate-spin text-primary mx-auto mb-3" />
              <p className="text-[10px] text-muted-foreground">Cargando canvas...</p>
            </div>
          </div>
        ) : (
          <div
            className="relative h-full bg-white dark:bg-card rounded-lg shadow-premium-lg p-4 animate-in fade-in zoom-in-95 duration-300 transition-transform"
            style={{ 
              transform: `scale(${zoom / 100})`, 
              transformOrigin: "top left",
              width: `${10000 / zoom}%`,
              height: `${10000 / zoom}%`
            }}
          >
            <div 
              className="relative w-full h-full min-h-[600px] transition-colors"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={handleCanvasClick}
            >
              {components.length === 0 ? (
                <div className="absolute inset-0 flex items-center justify-center animate-in fade-in duration-300">
                  <div className="text-center">
                    <Icons.LayersIcon className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-1">Canvas vacío</p>
                    <p className="text-xs text-muted-foreground">Arrastra componentes desde el panel lateral</p>
                  </div>
                </div>
              ) : (
                components
                  .filter(component => !component.hidden)
                  .map((component) => (
                  <div
                    key={component.id}
                    className={`absolute transition-all duration-200 ${
                      component.locked ? 'cursor-not-allowed' : 'cursor-move'
                    } ${
                      component.locked ? 'opacity-75' : 'opacity-100'
                    }`}
                    style={{
                      left: `${component.position?.x || 0}px`,
                      top: `${component.position?.y || 0}px`,
                      zIndex: selectedComponent?.id === component.id ? 10 : 1,
                      pointerEvents: component.locked && mode === 'design' ? 'none' : 'auto'
                    }}
                    draggable={!component.locked && mode === 'design'}
                    onDragStart={(e) => !component.locked && handleDragStart(e, component)}
                  >
                    <ComponentRenderer
                      component={component}
                      isSelected={selectedComponent?.id === component.id}
                      onSelect={() => !component.locked && onSelectComponent(component)}

                      onDelete={() => onDeleteComponent(component.id)}
                      mode={mode}
                    />
                    {component.locked && mode === 'design' && (
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs">
                        <Icons.LockIcon className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
