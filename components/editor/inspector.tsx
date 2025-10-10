"use client"

import type React from "react"
import * as Icons from "@/components/icons"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { ChevronDown, Sparkles, Zap, Palette, Box, Droplets, Snowflake, Layers, Sun, Moon } from "lucide-react"
import { useState } from "react"

interface InspectorProps {
  selectedComponent: any
  onUpdateComponent: (id: string, updates: any) => void
}

export function Inspector({ selectedComponent, onUpdateComponent }: InspectorProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["basic", "effects"])
  const [theme, setTheme] = useState<"light" | "dark">("light")

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const updateProp = (path: string[], value: any) => {
    if (!selectedComponent?.id || !path.length) {
      // Invalid component or path for prop update
      return
    }

    try {
      const newProps = { ...selectedComponent.props }
      let current = newProps

      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) current[path[i]] = {}
        current = current[path[i]]
      }

      current[path[path.length - 1]] = value
      
      // Update component immediately for real-time preview
      onUpdateComponent(selectedComponent.id, { props: newProps })
    } catch (error) {
      // Failed to update component prop
    }
  }

  const updateEffect = (effectType: string, property: string, value: any) => {
    if (!selectedComponent?.id) return
    
    const newProps = { ...selectedComponent.props }
    if (!newProps.effects) newProps.effects = {}
    if (!newProps.effects[effectType]) newProps.effects[effectType] = { enabled: false }
    
    newProps.effects[effectType][property] = value
    onUpdateComponent(selectedComponent.id, { props: newProps })
  }

  return (
    <aside className="w-80 glass-effect glass-effect-dark border-l shadow-premium flex flex-col overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Header compacto */}
      <div className="p-3 border-b">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-semibold text-foreground">Inspector</h2>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">{selectedComponent?.name || "Sin selección"}</p>
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
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {/* Sección Básico */}
          <InspectorSection
            title="Básico"
            isExpanded={expandedSections.includes("basic")}
            onToggle={() => toggleSection("basic")}
          >
            <div className="space-y-2.5">
              <div>
                <Label className="text-xs">Nombre</Label>
                <Input
                  value={selectedComponent.name}
                  onChange={(e) => onUpdateComponent(selectedComponent.id, { name: e.target.value })}
                  className="h-8 text-xs mt-1"
                />
              </div>

              {selectedComponent.type === "button" && (
                <div>
                  <Label className="text-xs">Texto</Label>
                  <Input
                    value={selectedComponent.props.text}
                    onChange={(e) => updateProp(["text"], e.target.value)}
                    className="h-8 text-xs mt-1"
                  />
                </div>
              )}

              {selectedComponent.type === "input" && (
                <div>
                  <Label className="text-xs">Placeholder</Label>
                  <Input
                    value={selectedComponent.props.placeholder}
                    onChange={(e) => updateProp(["placeholder"], e.target.value)}
                    className="h-8 text-xs mt-1"
                  />
                </div>
              )}
            </div>
          </InspectorSection>

          {/* Sección Efectos y Animaciones estilo Magic UI */}
          <InspectorSection
            title="Efectos y Animaciones"
            icon={Sparkles}
            isExpanded={expandedSections.includes("effects")}
            onToggle={() => toggleSection("effects")}
          >
            <div className="space-y-3">
              {/* Efecto Glow */}
              <div className="p-2.5 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 rounded-lg border border-yellow-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icons.ZapIcon className="w-3.5 h-3.5 text-yellow-500" />
                    <Label className="text-xs font-medium">Glow Effect</Label>
                  </div>
                  <Switch
                    checked={selectedComponent.props.effects?.glow?.enabled || false}
                    onCheckedChange={(checked) => updateEffect('glow', 'enabled', checked)}
                  />
                </div>

                {selectedComponent.props.effects?.glow?.enabled && (
                  <div className="space-y-2 mt-2">
                    <div>
                      <Label className="text-[10px] text-muted-foreground">
                        Intensidad: {selectedComponent.props.effects?.glow?.intensity || 50}%
                      </Label>
                      <Slider
                        value={[selectedComponent.props.effects?.glow?.intensity || 50]}
                        onValueChange={([value]) => updateEffect('glow', 'intensity', value)}
                        min={0}
                        max={100}
                        step={5}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-[10px] text-muted-foreground">Color</Label>
                      <div className="flex gap-1.5 mt-1">
                        <Input
                          type="color"
                          value={selectedComponent.props.effects?.glow?.color || "#3b82f6"}
                          onChange={(e) => updateEffect('glow', 'color', e.target.value)}
                          className="h-7 w-10 p-0.5"
                        />
                        <Input
                          value={selectedComponent.props.effects?.glow?.color || "#3b82f6"}
                          onChange={(e) => updateEffect('glow', 'color', e.target.value)}
                          className="h-7 text-xs flex-1"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Efecto Shimmer */}
              <div className="p-2.5 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-lg border border-blue-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icons.SparklesIcon className="w-3.5 h-3.5 text-blue-500" />
                    <Label className="text-xs font-medium">Shimmer Effect</Label>
                  </div>
                  <Switch
                    checked={selectedComponent.props.effects?.shimmer?.enabled || false}
                    onCheckedChange={(checked) => updateEffect('shimmer', 'enabled', checked)}
                  />
                </div>

                {selectedComponent.props.effects?.shimmer?.enabled && (
                  <div className="space-y-2 mt-2">
                    <div>
                      <Label className="text-[10px] text-muted-foreground">
                        Velocidad: {selectedComponent.props.effects?.shimmer?.speed || 2}s
                      </Label>
                      <Slider
                        value={[selectedComponent.props.effects?.shimmer?.speed || 2]}
                        onValueChange={([value]) => updateEffect('shimmer', 'speed', value)}
                        min={1}
                        max={5}
                        step={0.5}
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Efecto Ripple */}
              <div className="p-2.5 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-lg border border-cyan-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icons.CircleIcon className="w-3.5 h-3.5 text-cyan-500" />
                    <Label className="text-xs font-medium">Ripple Effect</Label>
                  </div>
                  <Switch
                    checked={selectedComponent.props.effects?.ripple?.enabled || false}
                    onCheckedChange={(checked) => updateEffect('ripple', 'enabled', checked)}
                  />
                </div>

                {selectedComponent.props.effects?.ripple?.enabled && (
                  <div className="space-y-2 mt-2">
                    <div>
                      <Label className="text-[10px] text-muted-foreground">
                        Duración: {selectedComponent.props.effects?.ripple?.duration || 600}ms
                      </Label>
                      <Slider
                        value={[selectedComponent.props.effects?.ripple?.duration || 600]}
                        onValueChange={([value]) => updateEffect('ripple', 'duration', value)}
                        min={300}
                        max={1200}
                        step={100}
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Gradiente Animado */}
              <div className="p-2.5 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-lg border border-purple-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icons.PaletteIcon className="w-3.5 h-3.5 text-purple-500" />
                    <Label className="text-xs font-medium">Gradiente Animado</Label>
                  </div>
                  <Switch
                    checked={selectedComponent.props.effects?.gradient?.enabled || false}
                    onCheckedChange={(checked) => updateEffect('gradient', 'enabled', checked)}
                  />
                </div>

                {selectedComponent.props.effects?.gradient?.enabled && (
                  <div className="space-y-2 mt-2">
                    <div>
                      <Label className="text-[10px] text-muted-foreground">Tipo</Label>
                      <Select
                        value={selectedComponent.props.effects?.gradient?.type || "linear"}
                        onValueChange={(value) => updateEffect('gradient', 'type', value)}
                      >
                        <SelectTrigger className="h-7 text-xs mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="linear">Linear</SelectItem>
                          <SelectItem value="radial">Radial</SelectItem>
                          <SelectItem value="conic">Cónico</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5">
                      <div>
                        <Label className="text-[10px] text-muted-foreground">Color 1</Label>
                        <Input
                          type="color"
                          value={selectedComponent.props.effects?.gradient?.color1 || "#3b82f6"}
                          onChange={(e) => updateEffect('gradient', 'color1', e.target.value)}
                          className="h-7 w-full p-0.5 mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-[10px] text-muted-foreground">Color 2</Label>
                        <Input
                          type="color"
                          value={selectedComponent.props.effects?.gradient?.color2 || "#8b5cf6"}
                          onChange={(e) => updateEffect('gradient', 'color2', e.target.value)}
                          className="h-7 w-full p-0.5 mt-1"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Border Beam */}
              <div className="p-2.5 bg-gradient-to-r from-green-500/5 to-teal-500/5 rounded-lg border border-green-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icons.SquareIcon className="w-3.5 h-3.5 text-green-500" />
                    <Label className="text-xs font-medium">Border Beam</Label>
                  </div>
                  <Switch
                    checked={selectedComponent.props.effects?.borderBeam?.enabled || false}
                    onCheckedChange={(checked) => updateEffect('borderBeam', 'enabled', checked)}
                  />
                </div>

                {selectedComponent.props.effects?.borderBeam?.enabled && (
                  <div className="space-y-2 mt-2">
                    <div>
                      <Label className="text-[10px] text-muted-foreground">
                        Grosor: {selectedComponent.props.effects?.borderBeam?.width || 2}px
                      </Label>
                      <Slider
                        value={[selectedComponent.props.effects?.borderBeam?.width || 2]}
                        onValueChange={([value]) => updateEffect('borderBeam', 'width', value)}
                        min={1}
                        max={8}
                        step={1}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-[10px] text-muted-foreground">Color</Label>
                      <Input
                        type="color"
                        value={selectedComponent.props.effects?.borderBeam?.color || "#3b82f6"}
                        onChange={(e) => updateEffect('borderBeam', 'color', e.target.value)}
                        className="h-7 w-full p-0.5 mt-1"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Efecto Glass Morphism */}
              <div className="p-2.5 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-lg border border-blue-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icons.SparklesIcon className="w-3.5 h-3.5 text-blue-500" />
                    <Label className="text-xs font-medium">Glass Morphism</Label>
                  </div>
                  <Switch
                    checked={selectedComponent.props.effects?.glass?.enabled || false}
                    onCheckedChange={(checked) => updateEffect('glass', 'enabled', checked)}
                  />
                </div>

                {selectedComponent.props.effects?.glass?.enabled && (
                  <div className="space-y-2 mt-2">
                    <div>
                      <Label className="text-[10px] text-muted-foreground">
                        Blur: {selectedComponent.props.effects?.glass?.blur || 10}px
                      </Label>
                      <Slider
                        value={[selectedComponent.props.effects?.glass?.blur || 10]}
                        onValueChange={([value]) => updateEffect('glass', 'blur', value)}
                        min={0}
                        max={30}
                        step={2}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-[10px] text-muted-foreground">
                        Opacidad: {selectedComponent.props.effects?.glass?.opacity || 80}%
                      </Label>
                      <Slider
                        value={[selectedComponent.props.effects?.glass?.opacity || 80]}
                        onValueChange={([value]) => updateEffect('glass', 'opacity', value)}
                        min={0}
                        max={100}
                        step={5}
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Efecto 3D Transform */}
              <div className="p-2.5 bg-gradient-to-r from-purple-500/5 to-violet-500/5 rounded-lg border border-purple-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icons.LayersIcon className="w-3.5 h-3.5 text-purple-500" />
                    <Label className="text-xs font-medium">3D Transform</Label>
                  </div>
                  <Switch
                    checked={selectedComponent.props.effects?.transform3d?.enabled || false}
                    onCheckedChange={(checked) => updateEffect('transform3d', 'enabled', checked)}
                  />
                </div>

                {selectedComponent.props.effects?.transform3d?.enabled && (
                  <div className="space-y-2 mt-2">
                    <div>
                      <Label className="text-[10px] text-muted-foreground">
                        Rotate X: {selectedComponent.props.effects?.transform3d?.rotateX || 0}°
                      </Label>
                      <Slider
                        value={[selectedComponent.props.effects?.transform3d?.rotateX || 0]}
                        onValueChange={([value]) => updateEffect('transform3d', 'rotateX', value)}
                        min={-45}
                        max={45}
                        step={5}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-[10px] text-muted-foreground">
                        Rotate Y: {selectedComponent.props.effects?.transform3d?.rotateY || 0}°
                      </Label>
                      <Slider
                        value={[selectedComponent.props.effects?.transform3d?.rotateY || 0]}
                        onValueChange={([value]) => updateEffect('transform3d', 'rotateY', value)}
                        min={-45}
                        max={45}
                        step={5}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-[10px] text-muted-foreground">
                        Perspectiva: {selectedComponent.props.effects?.transform3d?.perspective || 1000}px
                      </Label>
                      <Slider
                        value={[selectedComponent.props.effects?.transform3d?.perspective || 1000]}
                        onValueChange={([value]) => updateEffect('transform3d', 'perspective', value)}
                        min={500}
                        max={2000}
                        step={100}
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </InspectorSection>

          {/* Sección Colores */}
          <InspectorSection
            title="Colores"
            isExpanded={expandedSections.includes("colors")}
            onToggle={() => toggleSection("colors")}
          >
            <div className="space-y-2.5">
              <div>
                <Label className="text-xs">Fondo</Label>
                <div className="flex gap-1.5 mt-1">
                  <Input
                    type="color"
                    value={selectedComponent.props.colors?.background || "#3b82f6"}
                    onChange={(e) => updateProp(["colors", "background"], e.target.value)}
                    className="h-7 w-10 p-0.5"
                  />
                  <Input
                    value={selectedComponent.props.colors?.background || "#3b82f6"}
                    onChange={(e) => updateProp(["colors", "background"], e.target.value)}
                    className="h-7 text-xs flex-1"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs">Texto</Label>
                <div className="flex gap-1.5 mt-1">
                  <Input
                    type="color"
                    value={selectedComponent.props.colors?.text || "#ffffff"}
                    onChange={(e) => updateProp(["colors", "text"], e.target.value)}
                    className="h-7 w-10 p-0.5"
                  />
                  <Input
                    value={selectedComponent.props.colors?.text || "#ffffff"}
                    onChange={(e) => updateProp(["colors", "text"], e.target.value)}
                    className="h-7 text-xs flex-1"
                  />
                </div>
              </div>
            </div>
          </InspectorSection>

          {/* Sección Tipografía */}
          {selectedComponent.props.typography && (
            <InspectorSection
              title="Tipografía"
              isExpanded={expandedSections.includes("typography")}
              onToggle={() => toggleSection("typography")}
            >
              <div className="space-y-2.5">
                <div>
                  <Label className="text-xs">Tamaño: {selectedComponent.props.typography.size}px</Label>
                  <Slider
                    value={[selectedComponent.props.typography.size]}
                    onValueChange={([value]) => updateProp(["typography", "size"], value)}
                    min={10}
                    max={32}
                    step={1}
                    className="mt-1"
                  />
                </div>
              </div>
            </InspectorSection>
          )}

          {/* Sección Espaciado */}
          {selectedComponent.props.spacing && (
            <InspectorSection
              title="Espaciado"
              isExpanded={expandedSections.includes("spacing")}
              onToggle={() => toggleSection("spacing")}
            >
              <div className="space-y-2.5">
                {selectedComponent.props.spacing.paddingX !== undefined && (
                  <div>
                    <Label className="text-xs">Padding X: {selectedComponent.props.spacing.paddingX}px</Label>
                    <Slider
                      value={[selectedComponent.props.spacing.paddingX]}
                      onValueChange={([value]) => updateProp(["spacing", "paddingX"], value)}
                      min={0}
                      max={48}
                      step={4}
                      className="mt-1"
                    />
                  </div>
                )}

                {selectedComponent.props.spacing.paddingY !== undefined && (
                  <div>
                    <Label className="text-xs">Padding Y: {selectedComponent.props.spacing.paddingY}px</Label>
                    <Slider
                      value={[selectedComponent.props.spacing.paddingY]}
                      onValueChange={([value]) => updateProp(["spacing", "paddingY"], value)}
                      min={0}
                      max={48}
                      step={4}
                      className="mt-1"
                    />
                  </div>
                )}
              </div>
            </InspectorSection>
          )}

          {/* Sección Bordes */}
          {selectedComponent.props.border && (
            <InspectorSection
              title="Bordes y Sombras"
              isExpanded={expandedSections.includes("border")}
              onToggle={() => toggleSection("border")}
            >
              <div className="space-y-2.5">
                <div>
                  <Label className="text-xs">Radio: {selectedComponent.props.border.radius}px</Label>
                  <Slider
                    value={[selectedComponent.props.border.radius]}
                    onValueChange={([value]) => updateProp(["border", "radius"], value)}
                    min={0}
                    max={24}
                    step={2}
                    className="mt-1"
                  />
                </div>
              </div>
            </InspectorSection>
          )}

          {/* Sección Animaciones */}
          {selectedComponent.props.animation && (
            <InspectorSection
              title="Animaciones"
              isExpanded={expandedSections.includes("animation")}
              onToggle={() => toggleSection("animation")}
            >
              <div className="space-y-2.5">
                <div>
                  <Label className="text-xs">Hover Scale: {selectedComponent.props.animation.hoverScale}x</Label>
                  <Slider
                    value={[selectedComponent.props.animation.hoverScale * 100]}
                    onValueChange={([value]) => updateProp(["animation", "hoverScale"], value / 100)}
                    min={100}
                    max={120}
                    step={1}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-xs">Duración: {selectedComponent.props.animation.duration}ms</Label>
                  <Slider
                    value={[selectedComponent.props.animation.duration]}
                    onValueChange={([value]) => updateProp(["animation", "duration"], value)}
                    min={50}
                    max={500}
                    step={10}
                    className="mt-1"
                  />
                </div>
              </div>
            </InspectorSection>
          )}
        </div>
      )}
    </aside>
  )
}

function InspectorSection({
  title,
  icon: Icon,
  isExpanded,
  onToggle,
  children,
}: {
  title: string
  icon?: any
  isExpanded: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-2.5 hover:bg-accent transition-colors"
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-3.5 h-3.5 text-muted-foreground" />}
          <span className="text-xs font-medium text-foreground">{title}</span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>

      {isExpanded && (
        <div className="p-2.5 border-t animate-in fade-in slide-in-from-top-2 duration-200">{children}</div>
      )}
    </div>
  )
}
