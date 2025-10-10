"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import * as Icons from "@/components/icons"
import { useState, useEffect, useCallback } from "react"
import { CodeModal } from "./modals/code-modal"
import { ProjectModal } from "./modals/project-modal"
import { ShortcutsModal } from "./modals/shortcuts-modal"
import { IconLibraryModal } from "./modals/icon-library-modal"
import { TimelineModal } from "./modals/timeline-modal"
import { PerformanceModal } from "./modals/performance-modal"
import { AccessibilityModal } from "./modals/accessibility-modal"
import { ExportModal } from "./modals/export-modal"
import { useToast } from "@/hooks/use-toast"

interface TopbarProps {
  zoom: number
  onZoomChange: (zoom: number) => void
  mode: "design" | "preview"
  onModeChange: (mode: "design" | "preview") => void
  components: any[]
  selectedComponent: any
  onAlignComponents?: (alignment: string) => void
  onDuplicateComponent?: () => void
  onDeleteComponent?: () => void
  onToggleLock?: () => void
  onToggleVisibility?: () => void
  showGrid?: boolean
  onToggleGrid?: () => void
}

export function Topbar({
  zoom,
  onZoomChange,
  mode,
  onModeChange,
  components,
  selectedComponent,
  onAlignComponents,
  onDuplicateComponent,
  onDeleteComponent,
  onToggleLock,
  onToggleVisibility,
  showGrid,
  onToggleGrid,
}: TopbarProps) {
  const [showCodeModal, setShowCodeModal] = useState(false)
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [showShortcutsModal, setShowShortcutsModal] = useState(false)
  const [showIconLibraryModal, setShowIconLibraryModal] = useState(false)
  const [showTimelineModal, setShowTimelineModal] = useState(false)
  const [showPerformanceModal, setShowPerformanceModal] = useState(false)
  const [showAccessibilityModal, setShowAccessibilityModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [autoSaveEnabled] = useState(true)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleAutoSave = useCallback(async () => {
    if (components.length === 0) return
    
    setIsSaving(true)
    try {
      const projectData = {
        components,
        settings: { zoom, showGrid, mode },
        timestamp: new Date().toISOString()
      }
      localStorage.setItem('componentsr-autosave', JSON.stringify(projectData))
      
      await new Promise((resolve) => setTimeout(resolve, 500))
      setLastSaved(new Date())
    } catch {
      // Auto-save failed silently
    } finally {
      setIsSaving(false)
    }
  }, [components, zoom, showGrid, mode])

  useEffect(() => {
    if (!autoSaveEnabled) return

    const autoSaveInterval = setInterval(handleAutoSave, 30000)
    return () => clearInterval(autoSaveInterval)
  }, [autoSaveEnabled, handleAutoSave])

  const handleSave = async () => {

    setIsSaving(true)
    try {
      const projectData = {
        components,
        settings: { zoom, showGrid, mode },
        timestamp: new Date().toISOString(),
        name: `Proyecto ${new Date().toLocaleDateString()}`
      }
      
      // Save to localStorage with timestamp
      const savedProjects = JSON.parse(localStorage.getItem('componentsr-projects') || '[]')
      savedProjects.push(projectData)
      localStorage.setItem('componentsr-projects', JSON.stringify(savedProjects))
      
      await new Promise((resolve) => setTimeout(resolve, 500))
      setLastSaved(new Date())
      
      toast({
        title: "💾 Guardado!",
        description: "Proyecto guardado con éxito",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar el proyecto",
        variant: "destructive"
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <TooltipProvider>
      <header className="h-12 bg-background/95 backdrop-blur-sm border-b flex items-center justify-between px-3 z-50">
        {/* Logo y título - más compacto */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm">
            <Icons.LayersIcon className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold">React Editor</h1>
            {lastSaved && (
              <p className="text-[10px] text-muted-foreground">
                {isSaving ? "Guardando..." : `Guardado ${new Date(lastSaved).toLocaleTimeString()}`}
              </p>
            )}
          </div>
        </div>

        {/* Controles centrales - más compactos */}
        <div className="flex items-center gap-1">
          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-muted rounded-md p-0.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-xs"
                  onClick={() => onZoomChange(Math.max(25, zoom - 25))}
                >
                  -
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Reducir zoom (Ctrl+-)</p>
              </TooltipContent>
            </Tooltip>
            <span className="text-xs px-2 min-w-[3rem] text-center font-mono">{zoom}%</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-xs"
                  onClick={() => onZoomChange(Math.min(200, zoom + 25))}
                >
                  +
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Aumentar zoom (Ctrl+=)</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="w-px h-4 bg-border mx-1" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0"
                onClick={() => {}}
              >
                <Icons.UndoIcon className="w-3.5 h-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Deshacer (Ctrl+Z)</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0"
                onClick={() => {}}
              >
                <Icons.RedoIcon className="w-3.5 h-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Rehacer (Ctrl+Y)</p>
            </TooltipContent>
          </Tooltip>

          <div className="w-px h-4 bg-border mx-1" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                disabled={!selectedComponent}
                onClick={onDuplicateComponent}
              >
                <Icons.MoveIcon className="w-3.5 h-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Duplicar</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                disabled={!selectedComponent}
                onClick={onDeleteComponent}
              >
                <Icons.TrashIcon className="w-3.5 h-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Eliminar</p>
            </TooltipContent>
          </Tooltip>

          <div className="w-px h-4 bg-border mx-1" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={showGrid ? "default" : "ghost"} 
                size="sm" 
                className="h-7 w-7 p-0" 
                onClick={onToggleGrid}
              >
                <Icons.GridIcon className="w-3.5 h-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Toggle Grid (Ctrl+&apos;)</p>
            </TooltipContent>
          </Tooltip>

          {/* Alignment Controls */}
          {selectedComponent && (
            <>
              <div className="w-px h-4 bg-border mx-1" />
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => onAlignComponents?.('left')}
                  >
                    <div className="w-3 h-3 border-l-2 border-current" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Alinear izquierda</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => onAlignComponents?.('center')}
                  >
                    <div className="w-3 h-3 border-x-2 border-current" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Centrar horizontal</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => onAlignComponents?.('right')}
                  >
                    <div className="w-3 h-3 border-r-2 border-current" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Alinear derecha</p>
                </TooltipContent>
              </Tooltip>

              <div className="w-px h-4 bg-border mx-1" />

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={selectedComponent?.locked ? "default" : "ghost"}
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={onToggleLock}
                  >
                    {selectedComponent?.locked ? (
                      <Icons.LockIcon className="w-3.5 h-3.5" />
                    ) : (
                      <Icons.LockIcon className="w-3.5 h-3.5 opacity-50" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">{selectedComponent?.locked ? 'Desbloquear' : 'Bloquear'} (Ctrl+L)</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={selectedComponent?.hidden ? "default" : "ghost"}
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={onToggleVisibility}
                  >
                    {selectedComponent?.hidden ? (
                      <Icons.EyeIcon className="w-3.5 h-3.5 opacity-50" />
                    ) : (
                      <Icons.EyeIcon className="w-3.5 h-3.5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">{selectedComponent?.hidden ? 'Mostrar' : 'Ocultar'} (Ctrl+H)</p>
                </TooltipContent>
              </Tooltip>
            </>
          )}

          <div className="w-px h-4 bg-border mx-1" />

          {/* Modo diseño/preview - más compacto */}
          <div className="flex items-center gap-0.5 bg-muted rounded-md p-0.5">
            <Button
              variant={mode === "design" ? "default" : "ghost"}
              size="sm"
              onClick={() => onModeChange("design")}
              className="text-[11px] h-6 px-2"
            >
              Diseño
            </Button>
            <Button
              variant={mode === "preview" ? "default" : "ghost"}
              size="sm"
              onClick={() => onModeChange("preview")}
              className="text-[11px] h-6 px-2"
            >
              Preview
            </Button>
          </div>
        </div>

        {/* Acciones principales - más compactas */}
        <div className="flex items-center gap-1.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCodeModal(true)}
                className="gap-1.5 h-7 text-xs px-2"
              >
                <Icons.CodeIcon className="w-3 h-3" />
                Código
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Ver código generado</p>
            </TooltipContent>
          </Tooltip>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowProjectModal(true)}
            className="gap-1.5 h-7 text-xs px-2"
          >
            <Icons.FolderIcon className="w-3 h-3" />
            Proyectos
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowExportModal(true)}
            className="gap-1.5 h-7 text-xs px-2"
          >
            Exportar
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            className="gap-1.5 h-7 text-xs px-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white"
            disabled={isSaving}
          >
            <Icons.SaveIcon className="w-3 h-3" />
            Guardar
          </Button>
        </div>
      </header>

      <CodeModal open={showCodeModal} onOpenChange={setShowCodeModal} components={components} />
      <ProjectModal open={showProjectModal} onOpenChange={setShowProjectModal} />
      <ShortcutsModal open={showShortcutsModal} onOpenChange={setShowShortcutsModal} />
      <IconLibraryModal open={showIconLibraryModal} onOpenChange={setShowIconLibraryModal} />
      <TimelineModal open={showTimelineModal} onOpenChange={setShowTimelineModal} />
      <PerformanceModal open={showPerformanceModal} onOpenChange={setShowPerformanceModal} />
      <AccessibilityModal open={showAccessibilityModal} onOpenChange={setShowAccessibilityModal} />
      <ExportModal open={showExportModal} onOpenChange={setShowExportModal} components={components} />
    </TooltipProvider>
  )
}
