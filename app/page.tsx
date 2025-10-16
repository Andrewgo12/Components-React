"use client"

import { useState, useEffect, useCallback, useRef, useMemo } from "react"
import { Topbar } from "@/components/editor/topbar"
import { Sidebar } from "@/components/editor/sidebar"
import { Canvas } from "@/components/editor/canvas"
import { Inspector } from "@/components/editor/inspector/inspector"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { ErrorBoundary } from "@/components/error-boundary"
import { ClientOnly } from "@/components/client-only"
import { validateComponentType } from "@/lib/validation"



export default function EditorPage() {
  const [selectedComponent, setSelectedComponent] = useState<any>(null)
  const [components, setComponents] = useState<any[]>([])
  const [zoom, setZoom] = useState(100)
  const [showGrid, setShowGrid] = useState(true)

  const [mode, setMode] = useState<"design" | "preview">("preview")
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
    } catch {
      // Failed to load autosaved project
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
        title: "⚠️ Error",
        description: "Tipo de componente no válido",
      })
      return
    }

    const componentCount = components.length
    const newComponent = {
      id: `${type}-${Date.now()}`,
      type,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${componentCount + 1}`,
      props: getDefaultProps(type),
      position: { x: 200, y: 150 },
      locked: false,
      hidden: false,
    }

    setComponents(prev => [...prev, newComponent])
    setSelectedComponent(newComponent)
    setTimeout(() => {
      toast({
        title: "Componente agregado",
        description: `${newComponent.name} agregado al canvas`,
        variant: "default",
      })
    }, 0)
  }, [components.length, toast])

  const handleUpdateComponent = useCallback((id: string, updates: any) => {
    setComponents(prev => {
      const newComponents = prev.map((c) => {
        if (c.id === id) {
          const updatedComponent = { ...c, ...updates }
          // Forzar re-render inmediato
          if (selectedComponent?.id === id) {
            setSelectedComponent(updatedComponent)
          }
          return updatedComponent
        }
        return c
      })
      return newComponents
    })
  }, [selectedComponent])

  const handleDeleteComponent = useCallback((id?: string) => {
    const componentId = id || selectedComponent?.id
    if (!componentId) return
    
    const component = components.find((c) => c.id === componentId)
    setComponents(prev => prev.filter((c) => c.id !== componentId))
    
    if (selectedComponent?.id === componentId) {
      setSelectedComponent(null)
    }

    toast({
      title: "🗑️ Componente eliminado",
      description: `${component?.name} eliminado del canvas`,
    })
  }, [selectedComponent, components, toast])

  const handleAlignComponents = useCallback((alignment: string) => {
    if (!selectedComponent) return

    const canvasWidth = 1000
    const canvasHeight = 600
    const componentWidth = 200
    const componentHeight = 100

    const currentPos = selectedComponent.position || { x: 0, y: 0 }
    const newPosition = { ...currentPos }

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

    setComponents(prev => [...prev, newComponent])
    setSelectedComponent(newComponent)

    toast({
      title: "Componente duplicado",
      description: `${selectedComponent.name} duplicado`,
      variant: "default",
    })
  }, [selectedComponent, toast])

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

  const handleFlipHorizontal = useCallback(() => {
    if (!selectedComponent) return
    const currentTransform = selectedComponent.props.transform || { scaleX: 1, scaleY: 1 }
    handleUpdateComponent(selectedComponent.id, { 
      props: { 
        ...selectedComponent.props, 
        transform: { ...currentTransform, scaleX: currentTransform.scaleX * -1 }
      }
    })
    toast({ description: "🔄 Elemento volteado horizontalmente", variant: "default" })
  }, [selectedComponent, handleUpdateComponent, toast])

  const handleMoveForward = useCallback(() => {
    if (!selectedComponent) return
    const currentIndex = components.findIndex(c => c.id === selectedComponent.id)
    if (currentIndex < components.length - 1) {
      const newComponents = [...components]
      const temp = newComponents[currentIndex]
      newComponents[currentIndex] = newComponents[currentIndex + 1]
      newComponents[currentIndex + 1] = temp
      setComponents(newComponents)
      toast({ description: "⬆️ Elemento movido adelante", variant: "default" })
    }
  }, [selectedComponent, components, toast])

  const handleMoveBackward = useCallback(() => {
    if (!selectedComponent) return
    const currentIndex = components.findIndex(c => c.id === selectedComponent.id)
    if (currentIndex > 0) {
      const newComponents = [...components]
      const temp = newComponents[currentIndex]
      newComponents[currentIndex] = newComponents[currentIndex - 1]
      newComponents[currentIndex - 1] = temp
      setComponents(newComponents)
      toast({ description: "⬇️ Elemento movido atrás", variant: "default" })
    }
  }, [selectedComponent, components, toast])

  const handleArrangeComponents = useCallback(() => {
    if (components.length === 0) return
    const arranged = components.map((comp, index) => ({
      ...comp,
      position: { 
        x: 50 + (index % 4) * 180, 
        y: 50 + Math.floor(index / 4) * 120 
      }
    }))
    setComponents(arranged)
    toast({ description: "📐 Elementos organizados automáticamente", variant: "default" })
  }, [components, toast])

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

  const memoizedTopbar = useMemo(() => (
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
      onUndo={handleUndo}
      onRedo={handleRedo}
      onFlipHorizontal={handleFlipHorizontal}
      onMoveForward={handleMoveForward}
      onMoveBackward={handleMoveBackward}
      onArrangeComponents={handleArrangeComponents}
    />
  ), [zoom, mode, components, selectedComponent, showGrid, handleAlignComponents, handleDuplicateComponent, handleDeleteComponent, handleToggleLock, handleToggleVisibility, handleUndo, handleRedo, handleFlipHorizontal, handleMoveForward, handleMoveBackward, handleArrangeComponents])

  const memoizedSidebar = useMemo(() => (
    <Sidebar onAddComponent={handleAddComponent} />
  ), [handleAddComponent])

  const memoizedCanvas = useMemo(() => (
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
  ), [components, selectedComponent, zoom, showGrid, mode, handleUpdateComponent, handleDeleteComponent])

  const memoizedInspector = useMemo(() => (
    <Inspector selectedComponent={selectedComponent} onUpdateComponent={handleUpdateComponent} />
  ), [selectedComponent, handleUpdateComponent])

  return (
    <ErrorBoundary>
      <ClientOnly fallback={<div className="h-screen flex items-center justify-center">Cargando...</div>}>
        <div className={`h-screen flex flex-col bg-gradient-to-br from-muted/30 via-background to-muted/20 ${mode === 'design' ? 'editor-mode' : ''}`}>
          {memoizedTopbar}

          <div className="flex-1 flex overflow-hidden">
            {memoizedSidebar}
            {memoizedCanvas}
            {mode === 'design' ? memoizedInspector : null}
          </div>

          <Toaster />
        </div>
      </ClientOnly>
    </ErrorBoundary>
  )
}

function getDefaultProps(type: string) {
  const baseEffects = {
    glow: { enabled: false, intensity: 50, color: '#3b82f6' },
    shimmer: { enabled: false, speed: 2 },
    ripple: { enabled: false, duration: 600 },
    gradient: { enabled: false, type: 'linear', color1: '#3b82f6', color2: '#8b5cf6' },
    borderBeam: { enabled: false, width: 2, color: '#3b82f6' },
    glass: { enabled: false, blur: 10, opacity: 80 },
    transform3d: { enabled: false, rotateX: 0, rotateY: 0, perspective: 1000 }
  }

  const defaults: Record<string, any> = {
    // Componentes Básicos
    button: { text: "Button", colors: { background: "#3b82f6", text: "#ffffff" }, effects: baseEffects, width: 160, height: 48 },
    input: { placeholder: "Ingresa texto...", type: "text", colors: { background: "#ffffff", text: "#000000", border: "#e5e7eb" }, width: 320, height: 48 },
    card: { title: "Card Title", description: "Card description", colors: { background: "#ffffff", text: "#000000" }, effects: baseEffects, width: 384, height: 256 },
    badge: { text: "Badge", colors: { background: "#f3f4f6", text: "#374151" }, width: 120, height: 32 },
    text: { text: "Sample text", fontSize: 16, color: "#000000", width: 200, height: 32 },
    image: { src: "", alt: "Image", width: 240, height: 160 },
    checkbox: { label: "Checkbox", checked: false, width: 160, height: 32 },
    radio: { label: "Radio", checked: false, width: 160, height: 32 },
    toggle: { enabled: false, width: 80, height: 32 },
    slider: { min: 0, max: 100, value: 50, width: 240, height: 32 },
    avatar: { initials: "AB", colors: { background: "#3b82f6", text: "#ffffff" }, width: 64, height: 64 },
    divider: { color: "#e5e7eb", thickness: 1, width: 320, height: 8 },
    textarea: { placeholder: "Enter message...", rows: 4, width: 360, height: 120 },
    select: { options: ["Option 1", "Option 2", "Option 3"], placeholder: "Select option", width: 240, height: 48 },
    progress: { value: 60, max: 100, color: "#3b82f6", width: 240, height: 16 },
    alert: { message: "Alert message", type: "info", color: "#3b82f6", width: 360, height: 80 },
    list: { items: ["Item 1", "Item 2", "Item 3"], width: 300, height: 140 },
    table: { headers: ["Name", "Status"], rows: [["John", "Active"], ["Jane", "Pending"]], width: 480, height: 240 },
    tabs: { tabs: ["Tab 1", "Tab 2", "Tab 3"], active: 0, width: 400, height: 120 },
    breadcrumb: { items: ["Home", "Category", "Current"], width: 400, height: 32 },
    pagination: { current: 1, total: 10, width: 360, height: 48 },
    accordion: { title: "Section 1", content: "Content for section 1", width: 400, height: 160 },
    modal: { title: "Modal Title", content: "Modal content", width: 420, height: 280 },
    dropdown: { items: ["Profile", "Settings", "Logout"], width: 200, height: 40 },
    spinner: { size: "md", color: "#3b82f6", width: 40, height: 40 },
    skeleton: { lines: 3, animated: true, width: 320, height: 96 },
    switch: { label: "Switch", enabled: false, width: 80, height: 32 },
    tooltip: { text: "Tooltip text", content: "Hover me", width: 200, height: 48 },
    form: { title: "Form", fields: ["Field 1", "Field 2"], width: 480, height: 360 },

    // Magic UI Components (with ideal sizes)
    "glow-button": { text: "Glow Button", glowColor: "#3b82f6", intensity: 50, effects: baseEffects, width: 200, height: 56 },
    "shimmer-button": { text: "Shimmer Button", speed: 2, effects: baseEffects, width: 200, height: 56 },
    "ripple-button": { text: "Ripple Button", rippleColor: "#ffffff", effects: baseEffects, width: 200, height: 56 },
    "magnetic-button": { text: "Magnetic", magnetStrength: 1.05, effects: baseEffects, width: 200, height: 56 },
    "liquid-button": { text: "Liquid", flowSpeed: 1000, effects: baseEffects, width: 200, height: 56 },
    "morphing-button": { text: "Morph", morphSpeed: 500, effects: baseEffects, width: 200, height: 56 },
    "elastic-button": { text: "Elastic", elasticity: 1.1, effects: baseEffects, width: 200, height: 56 },
    "neon-button": { text: "Neon", neonColor: "#8b5cf6", effects: baseEffects, width: 200, height: 56 },
    "gradient-border-button": { text: "Gradient Border", gradientColors: ["#ec4899", "#8b5cf6", "#3b82f6"], effects: baseEffects, width: 220, height: 56 },
    "loading-button": { text: "Loading...", isLoading: true, effects: baseEffects, width: 200, height: 56 },
    "glass-card": { title: "Glass Card", description: "Glass morphism effect", blur: 10, opacity: 80, effects: baseEffects, width: 384, height: 256 },
    "bounce-card": { title: "Bounce!", description: "Bounce effect", bounceHeight: 10, effects: baseEffects, width: 320, height: 200 },
    "animated-card": { title: "Animated Card", description: "With unique effects", animationType: "rotate", effects: baseEffects, width: 320, height: 200 },
    "hover-card": { title: "Hover Card", description: "Elevates on hover", hoverHeight: 8, effects: baseEffects, width: 320, height: 200 },
    "tilt-card": { title: "Tilt Card", description: "Tilt effect on hover", tiltAngle: 3, effects: baseEffects, width: 320, height: 200 },
    "expand-card": { title: "Expand Card", description: "Expands on hover", expandScale: 1.1, effects: baseEffects, width: 320, height: 200 },
    "parallax-card": { title: "Parallax Card", description: "Parallax background effect", parallaxSpeed: 0.5, effects: baseEffects, width: 384, height: 256 },
    "reveal-card": { title: "Reveal Card", description: "Reveals content on hover", revealDirection: "up", effects: baseEffects, width: 320, height: 200 },
    "fade-card": { title: "Fade Effect", description: "Hover to fade", fadeOpacity: 0.5, effects: baseEffects, width: 224, height: 160 },
    "gradient-text": { text: "Gradient Text", gradientColors: ["#3b82f6", "#8b5cf6", "#ec4899"], effects: baseEffects, width: 320, height: 64 },
    "typewriter-text": { text: "$ echo 'Hello World'", speed: 100, effects: baseEffects, width: 360, height: 64 },
    "glow-text": { text: "Glow Text", glowColor: "#ec4899", intensity: 20, effects: baseEffects, width: 320, height: 64 },
    "marquee-text": { text: "✨ Moving text ✨", speed: 50, effects: baseEffects, width: 360, height: 64 },
    "slide-text": { text: "Sliding text", slideDistance: 8, effects: baseEffects, width: 320, height: 64 },
    "neon-badge": { text: "Neon Badge", neonColor: "#ec4899", effects: baseEffects, width: 120, height: 32 },
    "pulse-badge": { text: "LIVE", pulseColor: "#ef4444", effects: baseEffects, width: 120, height: 32 },
    "notification-badge": { count: 3, color: "#ef4444", effects: baseEffects, width: 120, height: 32 },
    "status-badge": { text: "Online", status: "active", effects: baseEffects, width: 120, height: 32 },
    "progress-badge": { text: "Loading...", progress: 75, effects: baseEffects, width: 140, height: 32 },
    "count-badge": { count: "99+", color: "#f59e0b", effects: baseEffects, width: 80, height: 32 },
    "rotate-icon": { size: "lg", rotationSpeed: 2, effects: baseEffects, width: 96, height: 96 },
    "icon-spin": { icon: "loader", speed: 1, effects: baseEffects, width: 96, height: 96 },
    "icon-bounce": { icon: "zap", bounceHeight: 5, effects: baseEffects, width: 96, height: 96 },
    "icon-pulse": { icon: "heart", pulseScale: 1.1, effects: baseEffects, width: 96, height: 96 },
    "icon-glow": { icon: "star", glowColor: "#fbbf24", effects: baseEffects, width: 96, height: 96 },
    "particle-button": { text: "Particles", particleCount: 6, effects: baseEffects, width: 200, height: 56 },
    "scale-button": { text: "Scale Effect", scaleAmount: 1.1, effects: baseEffects, width: 200, height: 56 },
    "number-ticker": { number: "1,234", animationSpeed: 1000, effects: baseEffects, width: 240, height: 96 },
    "wave-button": { text: "Wave", waveSpeed: 1000, effects: baseEffects, width: 200, height: 56 },
    "glitch-button": { text: "Glitch", glitchIntensity: 0.5, effects: baseEffects, width: 200, height: 56 },
    "crystal-button": { text: "Crystal", crystalColor: "#06b6d4", effects: baseEffects, width: 200, height: 56 },
    "plasma-button": { text: "Plasma", plasmaColors: ["#ec4899", "#8b5cf6"], effects: baseEffects, width: 200, height: 56 },
    "aurora-button": { text: "Aurora", auroraColors: ["#10b981", "#14b8a6"], effects: baseEffects, width: 200, height: 56 },
    "meteor-button": { text: "Meteor", meteorColor: "#f97316", effects: baseEffects, width: 200, height: 56 },
    "quantum-button": { text: "Quantum", quantumColor: "#8b5cf6", effects: baseEffects, width: 200, height: 56 },
    "flip-card": { frontText: "Front", backText: "Back", flipDirection: "horizontal", effects: baseEffects, width: 384, height: 224 },
    "floating-button": { text: "Floating", hasNotification: true, floatHeight: 10, effects: baseEffects, width: 200, height: 56 },

    // Fondos (ideal canvas preview sizes)
    "bg-dots": { dotSize: 2, dotColor: "#3b82f6", spacing: 20, backgroundColor: "#f8fafc", width: 640, height: 400 },
    "bg-grid": { lineColor: "#3b82f6", lineWidth: 1, spacing: 20, backgroundColor: "#f8fafc", width: 640, height: 400 },
    "bg-lines": { lineColor: "#e74c3c", angle: 45, spacing: 10, backgroundColor: "#ecf0f1", width: 640, height: 400 },
    "bg-chevron": { colors: ["#f59e0b", "#fbbf24"], spacing: 20, backgroundColor: "#fef3c7", width: 640, height: 400 },
    "bg-zigzag": { colors: ["#667eea", "#764ba2"], size: 20, backgroundColor: "#f8fafc", width: 640, height: 400 },
    "bg-cross": { crossColor: "#3b82f6", size: 30, backgroundColor: "#f1f5f9", width: 640, height: 400 },
    "bg-polka": { dotColor: "#ec4899", dotSize: 6, spacing: 25, backgroundColor: "#fdf2f8", width: 640, height: 400 },
    "bg-mesh": { colors: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4"], size: 20, backgroundColor: "#f8f9fa", width: 640, height: 400 },
    "bg-aurora": { colors: ["#8b5cf6", "#ec4899", "#3b82f6"], intensity: 70, backgroundColor: "#1e1b4b", width: 768, height: 480 },
    "bg-waves": { waveColor: "#3b82f6", waveHeight: 16, backgroundColor: "#1e40af", width: 640, height: 400 },
    "bg-watercolor": { colors: ["#ff6b6b", "#4ecdc4", "#45b7d1"], opacity: 30, width: 640, height: 400 },
    "bg-marble": { colors: ["#f8f9fa", "#e9ecef", "#dee2e6", "#ced4da"], size: 20, width: 640, height: 400 },
    "bg-stars": { starCount: 25, starColor: "#fbbf24", backgroundColor: "#1e1b4b", width: 768, height: 480 },
    "bg-cosmic": { particleCount: 50, colors: ["#8b5cf6", "#3b82f6", "#1e1b4b"], width: 768, height: 480 },
    "bg-nebula": { colors: ["#8b5cf6", "#ec4899", "#3b82f6"], cloudCount: 8, backgroundColor: "#000000", width: 768, height: 480 },
    "bg-galaxy": { starCount: 30, colors: ["#fef08a", "#fbbf24"], backgroundColor: "#1e1b4b", width: 768, height: 480 },
    "bg-matrix": { textColor: "#10b981", speed: 2, backgroundColor: "#000000", width: 768, height: 480 },
    "bg-circuit": { circuitColor: "#10b981", complexity: 20, backgroundColor: "#1f2937", width: 640, height: 400 },
    "bg-binary": { textColor: "#10b981", speed: 1, backgroundColor: "#000000", width: 640, height: 400 },
    "bg-glitch": { glitchColors: ["#ef4444", "#06b6d4"], intensity: 15, backgroundColor: "#000000", width: 640, height: 400 },
    "bg-particles": { particleCount: 20, particleColor: "#ffffff", backgroundColor: "#000000", width: 640, height: 400 },
    "bg-snow": { flakeCount: 30, flakeColor: "#ffffff", backgroundColor: "#e5e7eb", width: 640, height: 400 },
    "bg-rain": { dropCount: 25, dropColor: "#3b82f6", backgroundColor: "#4b5563", width: 640, height: 400 },
    "bg-hexagon": { hexColor: "#f59e0b", size: 32, backgroundColor: "#fbbf24", width: 640, height: 400 },
    "bg-triangles": { triangleColor: "#06b6d4", count: 20, backgroundColor: "#14b8a6", width: 640, height: 400 },
    "bg-circles": { circleColor: "#8b5cf6", count: 15, backgroundColor: "#312e81", width: 640, height: 400 },
    "bg-diamond": { diamondColor: "#ec4899", size: 16, backgroundColor: "#be185d", width: 640, height: 400 },
    "bg-gradient": { colors: ["#ec4899", "#8b5cf6", "#3b82f6"], direction: "to-br", width: 640, height: 400 },
    "bg-plasma": { colors: ["#ff006e", "#8338ec", "#3a86ff"], backgroundColor: "#000000", width: 640, height: 400 },
    "bg-rainbow": { colors: ["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#9400d3"], speed: 3, width: 640, height: 400 },
    "bg-ripple": { rippleColor: "#ffffff", rippleCount: 5, backgroundColor: "#06b6d4", width: 640, height: 400 },

    // Templates (ideal sizes)
    "login-form": { title: "Sign In", emailPlaceholder: "Email", passwordPlaceholder: "Password", buttonText: "Sign In", width: 450, height: 560 },
    "signup-form": { title: "Create Account", fields: ["Full Name", "Email", "Password"], buttonText: "Sign Up", width: 384, height: 440 },
    "pricing-card": { title: "Pro Plan", price: "$29", period: "month", features: ["Unlimited users", "24/7 support"], buttonText: "Choose Plan", width: 384, height: 560 },
    "profile-card": { name: "John Doe", role: "Frontend Developer", initials: "JD", colors: ["#3b82f6", "#8b5cf6"], width: 320, height: 220 },
    "stats-card": { title: "Total Sales", value: "$12,345", change: "+12%", trend: "up", width: 288, height: 200 },
    "navbar": { logo: "Logo", links: ["Home", "Products", "Contact"], buttonText: "Sign In", width: 800, height: 72 },
    "sidebar": { items: [{icon: "home", text: "Dashboard"}, {icon: "users", text: "Users"}, {icon: "settings", text: "Settings"}], width: 256, height: 384 },
    "blog-card": { title: "Article Title", description: "Brief article description...", date: "2 days ago", buttonText: "Read more", width: 384, height: 340 },
    "product-card": { title: "Premium Product", price: "$99.99", description: "Product description", buttonText: "Add to cart", width: 320, height: 360 },
    "dashboard-widget": { title: "Analytics", metrics: [{label: "Visitors", value: "1,234"}, {label: "Conversions", value: "567"}], width: 288, height: 200 },
    "contact-form": { title: "Contact Us", fields: ["Name", "Email", "Message"], buttonText: "Send message", width: 384, height: 360 },
    "newsletter-signup": { title: "Subscribe to Newsletter", description: "Get the latest news", placeholder: "your@email.com", buttonText: "Subscribe", width: 384, height: 240 },
    "testimonial-card": { rating: 5, text: "Excellent service, highly recommended.", author: "María García", role: "Satisfied Customer", width: 384, height: 260 },
    "notification-toast": { type: "success", title: "Success!", message: "Operation completed successfully", width: 320, height: 120 },
    "cart-item": { name: "Example Product", variant: "Size: M, Color: Blue", price: "$29.99", quantity: 1, width: 384, height: 160 },
    "hero-section": { title: "Welcome to Our Product", subtitle: "The perfect solution for your needs", buttons: ["Start Free", "View Demo"], width: 800, height: 600 },
    "feature-card": { icon: "zap", title: "Fast and Efficient", description: "Optimized for maximum performance", width: 320, height: 200 },
    "team-member": { name: "Jane Smith", role: "CEO & Founder", initials: "JS", socials: ["twitter", "linkedin"], width: 320, height: 160 },
    "faq-item": { question: "How does the product work?", answer: "Our product uses advanced technology to provide the best possible experience.", width: 480, height: 220 },
    "timeline-item": { title: "Important Milestone", time: "2 hours ago", description: "Description of the event or milestone achieved.", width: 480, height: 220 },
    "metric-card": { icon: "users", value: "2,543", label: "Active Users", change: "+5%", width: 288, height: 160 },
    "chat-message": { author: "User", message: "Hello! How are you?", time: "5 min ago", avatar: "U", width: 400, height: 120 },
    "weather-widget": { temperature: "22°C", location: "Madrid, Spain", condition: "Sunny", wind: "5 km/h", width: 320, height: 200 },
    "music-player": { title: "Favorite Song", artist: "Example Artist", controls: ["previous", "play", "next"], width: 360, height: 200 },
    "file-item": { name: "document.pdf", size: "2.4 MB", modified: "1 hour ago", type: "pdf", width: 360, height: 120 },
    "invoice-item": { service: "Consulting Service", quantity: "5 hours", rate: "$100/hour", total: "$500.00", width: 384, height: 200 },
    "progress-tracker": { title: "Project Progress", progress: 75, completed: 3, total: 4, width: 384, height: 200 },
    "comparison-table": { plans: [{name: "Basic", price: "$9"}, {name: "Pro", price: "$29"}, {name: "Enterprise", price: "$99"}], width: 640, height: 320 },
    "promo-banner": { text: "Special offer! 50% discount", buttonText: "View offer", colors: ["#10b981", "#3b82f6"], width: 640, height: 160 },
    "breadcrumb-nav": { items: ["Home", "Products", "Details"], width: 480, height: 32 },
    "pagination-nav": { current: 2, total: 10, showPrevNext: true, width: 360, height: 48 },
    "filter-sidebar": { title: "Filters", categories: ["Electronics", "Clothing"], priceRange: [0, 1000], width: 320, height: 480 },

    // Efectos (ideal demo sizes)
    "effect-glow": { glowColor: "#3b82f6", intensity: 30, spread: 60, width: 320, height: 200 },
    "effect-shimmer": { speed: 2, color: "#ffffff", opacity: 30, width: 320, height: 200 },
    "effect-neon": { neonColor: "#ff00ff", intensity: 20, blur: 10, width: 320, height: 200 },
    "effect-bloom": { brightness: 1.5, contrast: 1.2, bloomColor: "#ffffff", width: 320, height: 200 },
    "effect-laser": { laserColors: ["#ef4444", "#22d3ee"], laserStrokeWidth: [2, 1], intensity: 20, width: 320, height: 200 },
    "effect-ripple": { rippleColor: "#ffffff", count: 3, delay: 0.5, width: 320, height: 200 },
    "effect-pulse": { pulseColor: "#ef4444", speed: 1, scale: 1.1, width: 320, height: 200 },
    "effect-bounce": { bounceHeight: 10, speed: 1, width: 320, height: 200 },
    "effect-rotate": { speed: 2, direction: "clockwise", width: 320, height: 200 },
    "effect-scale": { scaleAmount: 1.1, duration: 300, width: 320, height: 200 },
    "effect-fade": { fadeOpacity: 0.5, duration: 500, width: 320, height: 200 },
    "effect-slide": { slideDistance: 8, direction: "right", duration: 300, width: 320, height: 200 },
    "effect-swing": { swingAngle: 15, duration: 2000, width: 320, height: 200 },
    "effect-glass": { blur: 10, opacity: 10, borderOpacity: 20, width: 320, height: 200 },
    "effect-frost": { blur: 4, opacity: 30, width: 320, height: 200 },
    "effect-crystal": { crystalCount: 8, crystalColor: "#ffffff", opacity: 20, width: 320, height: 200 },
    "effect-particle": { particleCount: 12, particleColor: "#ffffff", animationDelay: 0.1, width: 320, height: 200 },
    "effect-sparks": { sparkCount: 15, sparkColor: "#fbbf24", glowIntensity: 4, width: 320, height: 200 },
    "effect-stardust": { starCount: 30, starColor: "#fef08a", glowIntensity: 2, width: 320, height: 200 },
    "effect-matrix": { textColor: "#10b981", speed: 1, columns: 8, width: 320, height: 200 },
    "effect-cyberpunk": { borderColor: "#06b6d4", glowIntensity: 20, pulseSpeed: 1, width: 320, height: 200 },
    "effect-hologram": { colors: ["#06b6d4", "#3b82f6"], scanlineSpeed: 2, width: 320, height: 200 },
    "effect-glitch": { glitchColors: ["#ef4444", "#06b6d4"], intensity: 0.5, width: 320, height: 200 },
    "effect-lightning": { lightningColor: "#fbbf24", boltCount: 4, animationDelay: 0.3, width: 320, height: 200 },
    "effect-plasma": { plasmaColors: ["#ff006e", "#8338ec"], animationSpeed: 2, width: 320, height: 200 },
    "effect-energy": { energyColor: "#ffffff", particleCount: 6, opacity: 60, width: 320, height: 200 },
    "effect-3d": { rotateY: 12, perspective: 1000, transformStyle: "preserve-3d", width: 384, height: 240 },
    "effect-tilt": { tiltAngle: 6, scale: 1.05, duration: 300, width: 320, height: 200 },
    "effect-flip": { flipDirection: "horizontal", duration: 700, width: 384, height: 240 },
    "effect-morph": { morphShape: "rounded-full", duration: 1000, width: 320, height: 200 },
    "effect-wave": { waveColor: "#1e40af", waveHeight: 8, width: 320, height: 200 },
    "effect-liquid": { liquidColor: "#ffffff", bubbleCount: 5, opacity: 20, width: 320, height: 200 },
    "effect-flow": { flowColor: "#ffffff", streamCount: 4, speed: 3, width: 320, height: 200 },
    "effect-distortion": { skewAngle: 12, colors: ["#ec4899", "#8b5cf6"], width: 320, height: 200 },
    "effect-chromatic": { offsetX: 0.5, colors: ["#ef4444", "#3b82f6"], width: 320, height: 200 },
    "effect-aberration": { offsetX: 2, offsetY: 1, colors: ["#ef4444", "#06b6d4"], width: 320, height: 200 },
    "effect-fire": { fireColors: ["#dc2626", "#f97316", "#fbbf24"], flameCount: 8, width: 320, height: 200 },
    "effect-ice": { iceColor: "#ffffff", crystalCount: 6, opacity: 60, width: 320, height: 200 },
    "effect-smoke": { smokeColor: "#9ca3af", cloudCount: 10, opacity: 40, width: 320, height: 200 },
    "effect-magnetic": { magnetStrength: 1.1, rotateAngle: 2, duration: 300, width: 320, height: 200 },
    "effect-elastic": { scaleActive: 0.9, scaleHover: 1.25, duration: 200, width: 320, height: 200 },
    "effect-gravity": { particleCount: 8, fallSpeed: 2, particleColor: "#ffffff", width: 320, height: 200 }
  }

  return defaults[type] || { text: type, colors: { background: "#f3f4f6", text: "#374151" } }
}
