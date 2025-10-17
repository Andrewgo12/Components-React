"use client"

import type React from "react"
import { useState } from "react"
import * as Icons from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Type, Palette, Box, Move, Sparkles, Code2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { InspectorProps } from "@/types/component"
import { CodeExporter } from "../code-exporter"
import { AdvancedEditor } from "../advanced-editor"

import { BasicControls } from "./basic-controls"
import { TypographyControls } from "./typography-controls"
import { LayoutControls } from "./layout-controls"
import { ColorControls } from "./color-controls"
import { BorderControls } from "./border-controls"
import { EffectsControls } from "./effects-controls"
import { TransformControls } from "./transform-controls"

export function Inspector({ selectedComponent, onUpdateComponent }: InspectorProps) {
  const [activeTab, setActiveTab] = useState<string>("basics")
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [isCodeExporterOpen, setIsCodeExporterOpen] = useState(false)
  const [isAdvancedEditorOpen, setIsAdvancedEditorOpen] = useState(false)

  const tabs = [
    { id: "basics", label: "Básicos", icon: Box },
    { id: "ui", label: "Magic UI", icon: Palette },
    { id: "backgrounds", label: "Fondos", icon: Move },
    { id: "templates", label: "Templates", icon: Type },
    { id: "effects", label: "Efectos", icon: Sparkles }
  ]

  const currentTab = tabs.find(tab => tab.id === activeTab)

  const updateProp = (path: string[], value: any) => {
    if (!selectedComponent?.id || !path.length) return

    try {
      const newProps = { ...selectedComponent.props }
      let current: any = newProps

      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i]
        if (key) {
          if (!current[key] || typeof current[key] !== 'object') {
            current[key] = {}
          }
          current = current[key]
        }
      }

      const lastKey = path[path.length - 1]
      if (lastKey) {
        current[lastKey] = value
        onUpdateComponent(selectedComponent.id, { props: newProps })
      }
    } catch (error) {
      // Error updating component prop
    }
  }

  const updateEffect = (effectType: string, property: string, value: any) => {
    if (!selectedComponent?.id) return
    
    const newProps = { ...selectedComponent.props }
    if (!newProps.effects) newProps.effects = {}
    const effects = newProps.effects as Record<string, any>
    if (!effects[effectType]) effects[effectType] = { enabled: false }
    
    effects[effectType][property] = value
    onUpdateComponent(selectedComponent.id, { props: { ...newProps, effects } })
  }

  return (
    <aside className="w-80 glass-effect glass-effect-dark border-l shadow-premium flex flex-col overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="p-3 border-b">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-semibold text-foreground">Inspector</h2>
          <div className="flex items-center gap-1">
            {selectedComponent && (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => setIsCodeExporterOpen(true)}
                title="Exportar código"
              >
                <Code2 className="w-3.5 h-3.5" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{selectedComponent?.name || "Sin selección"}</p>
        
        {/* Botón Editor Visual Avanzado */}
        {selectedComponent && (
          <Button
            onClick={() => setIsAdvancedEditorOpen(true)}
            className="w-full mt-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
            size="sm"
          >
            <Icons.SettingsIcon className="w-4 h-4 mr-2" />
            ✨ Editor Visual Completo
          </Button>
        )}
      </div>

      {!selectedComponent ? (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <Icons.MousePointerIcon className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-sm text-muted-foreground mb-2">No hay componente seleccionado</p>
            <p className="text-xs text-muted-foreground">Haz clic en un componente del canvas para editarlo</p>
          </div>
        </div>
      ) : (
        <>
          {/* Tab Selector */}
          <div className="p-3 border-b bg-muted/30">
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger className="w-full h-9">
                <div className="flex items-center gap-2">
                  {currentTab && <currentTab.icon className="w-4 h-4" />}
                  <SelectValue placeholder="Seleccionar categoría" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <SelectItem key={tab.id} value={tab.id}>
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-3">
            {activeTab === "basics" && (
              <div className="space-y-4">
                <BasicControls
                  selectedComponent={selectedComponent}
                  updateProp={updateProp}
                  onUpdateComponent={onUpdateComponent}
                />
                <TypographyControls
                  selectedComponent={selectedComponent}
                  updateProp={updateProp}
                />
              </div>
            )}

            {activeTab === "ui" && (
              <div className="space-y-4">
                <ColorControls
                  selectedComponent={selectedComponent}
                  updateProp={updateProp}
                />
                <BorderControls
                  selectedComponent={selectedComponent}
                  updateProp={updateProp}
                />
              </div>
            )}

            {activeTab === "backgrounds" && (
              <div className="space-y-4">
                <LayoutControls
                  selectedComponent={selectedComponent}
                  updateProp={updateProp}
                />
                <TransformControls
                  selectedComponent={selectedComponent}
                  updateProp={updateProp}
                />
              </div>
            )}

            {activeTab === "templates" && (
              <div className="p-6 text-center">
                <Type className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-2">Plantillas</p>
                <p className="text-xs text-muted-foreground">Próximamente: Plantillas prediseñadas</p>
              </div>
            )}

            {activeTab === "effects" && (
              <div className="space-y-4">
                <EffectsControls
                  selectedComponent={selectedComponent}
                  updateEffect={updateEffect}
                />
              </div>
            )}
          </div>
        </>
      )}

      {/* Code Exporter Modal */}
      {selectedComponent && (
        <CodeExporter
          component={selectedComponent}
          isOpen={isCodeExporterOpen}
          onClose={() => setIsCodeExporterOpen(false)}
        />
      )}

      {/* Advanced Editor Modal */}
      {selectedComponent && (
        <AdvancedEditor
          component={selectedComponent}
          isOpen={isAdvancedEditorOpen}
          onClose={() => setIsAdvancedEditorOpen(false)}
          onUpdate={onUpdateComponent}
        />
      )}
    </aside>
  )
}