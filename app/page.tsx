"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Topbar } from "@/components/editor/topbar"
import { Sidebar } from "@/components/editor/sidebar"
import { Canvas } from "@/components/editor/canvas"
import { Inspector } from "@/components/editor/inspector"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { ErrorBoundary } from "@/components/error-boundary"
import { validateComponentType } from "@/lib/validation"

import type { ComponentProps } from "@/types"

export default function EditorPage() {
  const [selectedComponent, setSelectedComponent] = useState<any>(null)
  const [components, setComponents] = useState<any[]>([])
  const [zoom, setZoom] = useState(100)
  const [showGrid, setShowGrid] = useState(true)
  const [showRulers, setShowRulers] = useState(true)
  const [mode, setMode] = useState<"design" | "preview">("design")
  const [history, setHistory] = useState<any[][]>([[]])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [isUndoRedo, setIsUndoRedo] = useState(false)
  const { toast } = useToast()

  const isUpdatingHistory = useRef(false)

  // Load autosaved project on startup
  useEffect(() => {
    try {
      const autosaved = localStorage.getItem('componentsr-autosave')
      if (autosaved) {
        const projectData = JSON.parse(autosaved)
        if (projectData.components && projectData.components.length > 0) {
          setComponents(projectData.components)
          if (projectData.settings) {
            setZoom(projectData.settings.zoom || 100)
            setShowGrid(projectData.settings.showGrid ?? true)
            setMode(projectData.settings.mode || 'design')
          }
          toast({
            title: '📁 Proyecto cargado',
            description: 'Se ha restaurado tu última sesión',
          })
        }
      }
    } catch (error) {
      console.error('Failed to load autosaved project:', error)
    }
  }, [toast])

  const updateHistory = useCallback((newComponents: any[]) => {
    if (isUpdatingHistory.current || isUndoRedo) return
    
    isUpdatingHistory.current = true
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(JSON.parse(JSON.stringify(newComponents)))
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)

    setTimeout(() => {
      isUpdatingHistory.current = false
    }, 100)
  }, [history, historyIndex, isUndoRedo])

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      setIsUndoRedo(true)
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setComponents(JSON.parse(JSON.stringify(history[newIndex])))
      setSelectedComponent(null)
      toast({ description: "⏪ Acción deshecha", variant: "default" })
      setTimeout(() => setIsUndoRedo(false), 100)
    }
  }, [historyIndex, history, toast])

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setIsUndoRedo(true)
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setComponents(JSON.parse(JSON.stringify(history[newIndex])))
      setSelectedComponent(null)
      toast({ description: "⏩ Acción rehecha", variant: "default" })
      setTimeout(() => setIsUndoRedo(false), 100)
    }
  }, [historyIndex, history, toast])

  useEffect(() => {
    updateHistory(components)
  }, [components, updateHistory])

  const handleAddComponent = useCallback((type: string) => {
    if (!validateComponentType(type)) {
      toast({
        title: "Error",
        description: "Tipo de componente no válido",
        variant: "destructive",
      })
      return
    }

    const componentCount = components.length
    const newComponent = {
      id: `${type}-${Date.now()}`,
      type,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${componentCount + 1}`,
      props: getDefaultProps(type),
      position: { x: 100 + componentCount * 20, y: 100 + componentCount * 20 },
      locked: false,
      hidden: false,
    }
    setComponents(prev => [...prev, newComponent])
    setSelectedComponent(newComponent)

    toast({
      title: "Componente agregado",
      description: `${newComponent.name} agregado al canvas`,
      variant: "default",
    })
  }, [components.length, toast])

  const handleUpdateComponent = (id: string, updates: any) => {
    setComponents(components.map((c) => (c.id === id ? { ...c, ...updates } : c)))
    if (selectedComponent?.id === id) {
      setSelectedComponent({ ...selectedComponent, ...updates })
    }
  }

  const handleDeleteComponent = useCallback(() => {
    if (!selectedComponent) return
    const component = components.find((c) => c.id === selectedComponent.id)
    setComponents(components.filter((c) => c.id !== selectedComponent.id))
    setSelectedComponent(null)

    toast({
      title: "Componente eliminado",
      description: `${component?.name} eliminado del canvas`,
      variant: "destructive",
    })
  }, [selectedComponent, components, toast])

  const handleAlignComponents = useCallback((alignment: string) => {
    if (!selectedComponent) return

    const canvasWidth = 1000
    const canvasHeight = 600
    const componentWidth = 200
    const componentHeight = 100

    const currentPos = selectedComponent.position || { x: 0, y: 0 }
    let newPosition = { ...currentPos }

    switch (alignment) {
      case "left":
        newPosition.x = 20
        break
      case "center":
        newPosition.x = (canvasWidth - componentWidth) / 2
        break
      case "right":
        newPosition.x = canvasWidth - componentWidth - 20
        break
      case "top":
        newPosition.y = 20
        break
      case "middle":
        newPosition.y = (canvasHeight - componentHeight) / 2
        break
      case "bottom":
        newPosition.y = canvasHeight - componentHeight - 20
        break
    }

    handleUpdateComponent(selectedComponent.id, { position: newPosition })
    toast({
      description: `Componente alineado a ${alignment}`,
      variant: "default",
    })
  }, [selectedComponent, handleUpdateComponent, toast])

  const handleDuplicateComponent = useCallback(() => {
    if (!selectedComponent) return

    const newComponent = {
      ...JSON.parse(JSON.stringify(selectedComponent)),
      id: `${selectedComponent.type}-${Date.now()}`,
      name: `${selectedComponent.name}-copy`,
      position: {
        x: selectedComponent.position.x + 20,
        y: selectedComponent.position.y + 20,
      },
    }

    setComponents([...components, newComponent])
    setSelectedComponent(newComponent)

    toast({
      title: "Componente duplicado",
      description: `${selectedComponent.name} duplicado`,
      variant: "default",
    })
  }, [selectedComponent, components, toast])

  const handleToggleLock = useCallback(() => {
    if (!selectedComponent) return
    const newLocked = !selectedComponent.locked
    handleUpdateComponent(selectedComponent.id, { locked: newLocked })
    toast({
      description: newLocked ? "🔒 Componente bloqueado" : "🔓 Componente desbloqueado",
      variant: "default",
    })
  }, [selectedComponent, handleUpdateComponent, toast])

  const handleToggleVisibility = useCallback(() => {
    if (!selectedComponent) return
    const newHidden = !selectedComponent.hidden
    handleUpdateComponent(selectedComponent.id, { hidden: newHidden })
    toast({
      description: newHidden ? "👁️‍🗨️ Componente oculto" : "👁️ Componente visible",
      variant: "default",
    })
  }, [selectedComponent, handleUpdateComponent, toast])

  const keyboardHandlers = useRef({
    duplicate: handleDuplicateComponent,
    delete: handleDeleteComponent,
    lock: handleToggleLock,
    visibility: handleToggleVisibility,
  })

  useEffect(() => {
    keyboardHandlers.current = {
      duplicate: handleDuplicateComponent,
      delete: handleDeleteComponent,
      lock: handleToggleLock,
      visibility: handleToggleVisibility,
    }
  }, [handleDuplicateComponent, handleDeleteComponent, handleToggleLock, handleToggleVisibility])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Save project
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault()
        toast({ description: "Proyecto guardado", variant: "default" })
        return
      }
      
      // Duplicate component
      if (e.ctrlKey && e.key === "d" && selectedComponent) {
        e.preventDefault()
        keyboardHandlers.current.duplicate()
        return
      }
      
      // Delete component
      if (e.key === "Delete" && selectedComponent) {
        e.preventDefault()
        keyboardHandlers.current.delete()
        return
      }
      
      // Toggle lock
      if (e.ctrlKey && e.key === "l" && selectedComponent) {
        e.preventDefault()
        keyboardHandlers.current.lock()
        return
      }
      
      // Toggle visibility
      if (e.ctrlKey && e.key === "h" && selectedComponent) {
        e.preventDefault()
        keyboardHandlers.current.visibility()
        return
      }
      
      // Toggle grid
      if (e.ctrlKey && e.key === "'") {
        e.preventDefault()
        setShowGrid((prev) => !prev)
        return
      }
      
      // Zoom controls
      if (e.ctrlKey && e.key === "=") {
        e.preventDefault()
        setZoom(prev => Math.min(200, prev + 25))
        return
      }
      
      if (e.ctrlKey && e.key === "-") {
        e.preventDefault()
        setZoom(prev => Math.max(25, prev - 25))
        return
      }
      
      // Reset zoom
      if (e.ctrlKey && e.key === "0") {
        e.preventDefault()
        setZoom(100)
        return
      }
      
      // Undo
      if (e.ctrlKey && e.key === "z" && !e.shiftKey) {
        e.preventDefault()
        handleUndo()
        return
      }
      
      // Redo
      if (e.ctrlKey && (e.key === "y" || (e.key === "z" && e.shiftKey))) {
        e.preventDefault()
        handleRedo()
        return
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toast, selectedComponent, setZoom, setShowGrid, handleUndo, handleRedo])

  return (
    <ErrorBoundary>
      <div className="h-screen flex flex-col bg-gradient-to-br from-muted/30 via-background to-muted/20">
        <Topbar
          zoom={zoom}
          onZoomChange={setZoom}
          mode={mode}
          onModeChange={setMode}
          components={components}
          selectedComponent={selectedComponent}
          onAlignComponents={handleAlignComponents}
          onDuplicateComponent={handleDuplicateComponent}
          onDeleteComponent={handleDeleteComponent}
          onToggleLock={handleToggleLock}
          onToggleVisibility={handleToggleVisibility}
          showGrid={showGrid}
          onToggleGrid={() => setShowGrid(!showGrid)}

        />

        <div className="flex-1 flex overflow-hidden">
          <Sidebar onAddComponent={handleAddComponent} />

          <Canvas
            components={components}
            selectedComponent={selectedComponent}
            onSelectComponent={setSelectedComponent}
            onUpdateComponent={handleUpdateComponent}
            onDeleteComponent={handleDeleteComponent}
            zoom={zoom}
            showGrid={showGrid}
            mode={mode}
          />

          <Inspector selectedComponent={selectedComponent} onUpdateComponent={handleUpdateComponent} />
        </div>

        <Toaster />
      </div>
    </ErrorBoundary>
  )
}

function getDefaultProps(type: string) {
  const basePosition = { x: 100, y: 100 }
  const defaults: Record<string, any> = {
    button: {
      text: "Click me",
      variant: "primary",
      size: "md",
      colors: { background: "#3b82f6", text: "#ffffff", border: "#1d4ed8" },
      typography: { size: 16, weight: "semibold", family: "Inter" },
      spacing: { paddingX: 16, paddingY: 8 },
      border: { radius: 8, width: 0 },
      animation: { hoverScale: 1.03, duration: 180 },
      effects: {
        glow: { enabled: false, intensity: 50, color: '#3b82f6' },
        shimmer: { enabled: false, speed: 2 },
        ripple: { enabled: false, duration: 600 },
        gradient: { enabled: false, type: 'linear', color1: '#3b82f6', color2: '#8b5cf6' },
        borderBeam: { enabled: false, width: 2, color: '#3b82f6' },
        glass: { enabled: false, blur: 10, opacity: 80 },
        transform3d: { enabled: false, rotateX: 0, rotateY: 0, perspective: 1000 }
      }
    },
    input: {
      placeholder: "Ingresa texto...",
      type: "text",
      colors: { background: "#ffffff", text: "#000000", border: "#e5e7eb" },
      spacing: { paddingX: 12, paddingY: 8 },
      border: { radius: 6, width: 1 },
    },
    card: {
      title: "Título de la tarjeta",
      description: "Descripción de la tarjeta",
      colors: { background: "#ffffff", text: "#000000" },
      spacing: { padding: 16 },
      border: { radius: 12, width: 1 },
      effects: {
        glow: { enabled: false, intensity: 30, color: '#3b82f6' },
        glass: { enabled: false, blur: 10, opacity: 80 },
        transform3d: { enabled: false, rotateX: 0, rotateY: 0, perspective: 1000 }
      }
    },
    badge: {
      text: "Badge",
      variant: "default",
      colors: { background: "#f3f4f6", text: "#374151" },
      spacing: { paddingX: 8, paddingY: 4 },
      border: { radius: 4 },
    },
    marquee: {
      text: "Texto en movimiento",
      speed: 20,
    },
    typewriter: {
      text: "Efecto de escritura...",
    },
    "number-ticker": {
      number: "1,234",
      position: basePosition,
    },
    "ripple-button": {
      text: "Ripple Button",
      position: basePosition,
    },
    "glow-card": {
      title: "Glow Card",
      description: "Card con efecto glow",
      position: basePosition,
    },
    "gradient-text": {
      text: "Texto con Gradiente",
      position: basePosition,
    },
    "shimmer-button": {
      text: "Shimmer Button",
      position: basePosition,
    },
    "icon-badge": {
      text: "Icon Badge",
      position: basePosition,
    },
    "dots-bg": { position: basePosition },
    "grid-bg": { position: basePosition },
    "aurora-bg": { position: basePosition },
    "particles-bg": { position: basePosition },
    "bento-grid": { position: basePosition },
    "login-form": { position: basePosition },
    "pricing-card": { position: basePosition },
    "glow-button": { text: "Glow Button", position: basePosition },
    "glass-card": { title: "Glass Card", description: "Efecto glass", position: basePosition },
    "neon-badge": { text: "Neon Badge", position: basePosition },
    "bg-dots": { position: basePosition },
    "bg-grid": { position: basePosition },
    "bg-aurora": { position: basePosition },
    "signup-form": { position: basePosition },
    "profile-card": { position: basePosition },
    "stats-card": { position: basePosition },
    notification: {
      title: "Notificación",
      message: "Mensaje de notificación",
    },
  }

  return defaults[type] || {}
}
