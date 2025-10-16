"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Eye, EyeOff, Lock, Unlock, RotateCcw } from "lucide-react"

interface BasicControlsProps {
  selectedComponent: any
  updateProp: (path: string[], value: any) => void
  onUpdateComponent: (id: string, updates: any) => void
}

export function BasicControls({ selectedComponent, updateProp, onUpdateComponent }: BasicControlsProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const resetComponent = () => {
    onUpdateComponent(selectedComponent.id, {
      name: `Componente ${Date.now()}`,
      props: { ...selectedComponent.props, className: "", elementId: "" }
    })
  }

  return (
    <div className="space-y-4">
      {/* Información del Componente */}
      <div className="p-3 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl border border-blue-200/50 dark:border-blue-800/30">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <Badge variant="outline" className="text-xs font-medium bg-white/60 dark:bg-gray-800/60">
              {selectedComponent.type}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetComponent}
            className="h-7 w-7 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="text-xs text-muted-foreground font-mono bg-white/40 dark:bg-gray-800/40 px-2 py-1 rounded">
          ID: {selectedComponent.id}
        </div>
      </div>

      {/* Identificación */}
      <div className="p-3 bg-gradient-to-br from-emerald-50/80 to-teal-50/80 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-xl border border-emerald-200/50 dark:border-emerald-800/30">
        <h4 className="text-sm font-semibold mb-3 text-emerald-800 dark:text-emerald-200">Identificación</h4>
        
        <div className="space-y-3">
          <div>
            <Label className="text-xs font-medium text-emerald-700 dark:text-emerald-300">Nombre del Componente</Label>
            <div className="flex gap-2 mt-1.5">
              <Input
                value={selectedComponent.name}
                onChange={(e) => onUpdateComponent(selectedComponent.id, { name: e.target.value })}
                className="h-8 text-xs flex-1 bg-white/60 dark:bg-gray-800/60 border-emerald-200 dark:border-emerald-700"
                placeholder="Mi Componente"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(selectedComponent.name)}
                className="h-8 w-8 p-0 border-emerald-200 hover:bg-emerald-100 dark:border-emerald-700 dark:hover:bg-emerald-900/50"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div>
            <Label className="text-xs font-medium text-emerald-700 dark:text-emerald-300">ID del Elemento</Label>
            <div className="flex gap-2 mt-1.5">
              <Input
                value={selectedComponent.props.elementId || ""}
                onChange={(e) => updateProp(["elementId"], e.target.value)}
                className="h-8 text-xs flex-1 bg-white/60 dark:bg-gray-800/60 border-emerald-200 dark:border-emerald-700"
                placeholder="unique-element-id"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateProp(["elementId"], `id-${Date.now()}`)}
                className="h-8 px-3 text-xs border-emerald-200 hover:bg-emerald-100 dark:border-emerald-700 dark:hover:bg-emerald-900/50"
              >
                Auto
              </Button>
            </div>
          </div>

          <div>
            <Label className="text-xs font-medium text-emerald-700 dark:text-emerald-300">Clases CSS</Label>
            <div className="flex gap-2 mt-1.5">
              <Input
                value={selectedComponent.props.className || ""}
                onChange={(e) => updateProp(["className"], e.target.value)}
                className="h-8 text-xs flex-1 bg-white/60 dark:bg-gray-800/60 border-emerald-200 dark:border-emerald-700"
                placeholder="class1 class2 class3"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(selectedComponent.props.className || "")}
                className="h-8 w-8 p-0 border-emerald-200 hover:bg-emerald-100 dark:border-emerald-700 dark:hover:bg-emerald-900/50"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-3 bg-gradient-to-br from-purple-50/80 to-violet-50/80 dark:from-purple-950/30 dark:to-violet-950/30 rounded-xl border border-purple-200/50 dark:border-purple-800/30">
        <h4 className="text-sm font-semibold mb-3 text-purple-800 dark:text-purple-200">Contenido</h4>
        <div>
          <Label className="text-xs font-medium text-purple-700 dark:text-purple-300">Texto del Componente</Label>
          <Textarea
            value={selectedComponent.props.text || selectedComponent.props.placeholder || selectedComponent.props.children || ""}
            onChange={(e) => {
              const value = e.target.value
              if (selectedComponent.props.text !== undefined) updateProp(["text"], value)
              if (selectedComponent.props.placeholder !== undefined) updateProp(["placeholder"], value)
              if (selectedComponent.props.children !== undefined) updateProp(["children"], value)
            }}
            className="h-20 text-xs mt-1.5 resize-none bg-white/60 dark:bg-gray-800/60 border-purple-200 dark:border-purple-700"
            placeholder="Escribe el contenido aquí..."
          />
        </div>
      </div>

      {/* Posicionamiento */}
      <div className="p-3 bg-gradient-to-br from-orange-50/80 to-amber-50/80 dark:from-orange-950/30 dark:to-amber-950/30 rounded-xl border border-orange-200/50 dark:border-orange-800/30">
        <h4 className="text-sm font-semibold mb-3 text-orange-800 dark:text-orange-200">Posicionamiento</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs font-medium text-orange-700 dark:text-orange-300">Z-Index: {selectedComponent.props.zIndex || 0}</Label>
            <Slider
              value={[selectedComponent.props.zIndex || 0]}
              onValueChange={(values) => updateProp(["zIndex"], values[0])}
              min={-100}
              max={1000}
              step={1}
              className="mt-2"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-orange-700 dark:text-orange-300">Orden: {selectedComponent.props.order || 0}</Label>
            <Slider
              value={[selectedComponent.props.order || 0]}
              onValueChange={(values) => updateProp(["order"], values[0])}
              min={-10}
              max={20}
              step={1}
              className="mt-2"
            />
          </div>
        </div>
      </div>

      {/* Estados y Comportamiento */}
      <div className="p-3 bg-gradient-to-br from-rose-50/80 to-pink-50/80 dark:from-rose-950/30 dark:to-pink-950/30 rounded-xl border border-rose-200/50 dark:border-rose-800/30">
        <h4 className="text-sm font-semibold mb-3 text-rose-800 dark:text-rose-200">Estados y Comportamiento</h4>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center justify-between p-2 bg-white/40 dark:bg-gray-800/40 rounded-lg">
              <Label className="text-xs font-medium flex items-center gap-1.5 text-rose-700 dark:text-rose-300">
                {selectedComponent.props.visible !== false ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                Visible
              </Label>
              <Switch
                checked={selectedComponent.props.visible !== false}
                onCheckedChange={(checked) => updateProp(["visible"], checked)}
              />
            </div>
            <div className="flex items-center justify-between p-2 bg-white/40 dark:bg-gray-800/40 rounded-lg">
              <Label className="text-xs font-medium flex items-center gap-1.5 text-rose-700 dark:text-rose-300">
                {selectedComponent.props.disabled ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
                Habilitado
              </Label>
              <Switch
                checked={!selectedComponent.props.disabled}
                onCheckedChange={(checked) => updateProp(["disabled"], !checked)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center justify-between p-2 bg-white/40 dark:bg-gray-800/40 rounded-lg">
              <Label className="text-xs font-medium text-rose-700 dark:text-rose-300">Interactivo</Label>
              <Switch
                checked={selectedComponent.props.interactive !== false}
                onCheckedChange={(checked) => updateProp(["interactive"], checked)}
              />
            </div>
            <div className="flex items-center justify-between p-2 bg-white/40 dark:bg-gray-800/40 rounded-lg">
              <Label className="text-xs font-medium text-rose-700 dark:text-rose-300">Seleccionable</Label>
              <Switch
                checked={selectedComponent.props.selectable !== false}
                onCheckedChange={(checked) => updateProp(["selectable"], checked)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Propiedades Específicas del Componente */}
      {selectedComponent.type === "button" && (
        <div className="p-3 bg-gradient-to-br from-indigo-50/80 to-blue-50/80 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-xl border border-indigo-200/50 dark:border-indigo-800/30">
          <h4 className="text-sm font-semibold mb-3 text-indigo-800 dark:text-indigo-200">Propiedades del Botón</h4>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-medium text-indigo-700 dark:text-indigo-300">Padding X: {selectedComponent.props.paddingX || 32}px</Label>
                <Slider
                  value={[selectedComponent.props.paddingX || 32]}
                  onValueChange={(values) => updateProp(["paddingX"], values[0])}
                  min={8}
                  max={80}
                  step={4}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-xs font-medium text-indigo-700 dark:text-indigo-300">Padding Y: {selectedComponent.props.paddingY || 12}px</Label>
                <Slider
                  value={[selectedComponent.props.paddingY || 12]}
                  onValueChange={(values) => updateProp(["paddingY"], values[0])}
                  min={4}
                  max={32}
                  step={2}
                  className="mt-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-medium text-indigo-700 dark:text-indigo-300">Hover Scale: {selectedComponent.props.hoverScale || 1.05}</Label>
                <Slider
                  value={[selectedComponent.props.hoverScale || 1.05]}
                  onValueChange={(values) => updateProp(["hoverScale"], values[0])}
                  min={0.9}
                  max={1.2}
                  step={0.05}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-xs font-medium text-indigo-700 dark:text-indigo-300">Duración: {selectedComponent.props.animationDuration || 300}ms</Label>
                <Slider
                  value={[selectedComponent.props.animationDuration || 300]}
                  onValueChange={(values) => updateProp(["animationDuration"], values[0])}
                  min={100}
                  max={1000}
                  step={50}
                  className="mt-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center justify-between p-2 bg-white/40 dark:bg-gray-800/40 rounded-lg">
                <Label className="text-xs font-medium text-indigo-700 dark:text-indigo-300">Mostrar Icono</Label>
                <Switch
                  checked={selectedComponent.props.showIcon || false}
                  onCheckedChange={(checked) => updateProp(["showIcon"], checked)}
                />
              </div>
              <div className="flex items-center justify-between p-2 bg-white/40 dark:bg-gray-800/40 rounded-lg">
                <Label className="text-xs font-medium text-indigo-700 dark:text-indigo-300">Efecto Shimmer</Label>
                <Switch
                  checked={selectedComponent.props.showShimmer || false}
                  onCheckedChange={(checked) => updateProp(["showShimmer"], checked)}
                />
              </div>
            </div>
            <div>
              <Label className="text-xs font-medium text-indigo-700 dark:text-indigo-300">Color Hover</Label>
              <Input
                type="color"
                value={selectedComponent.props.hoverBackgroundColor || "#1e40af"}
                onChange={(e) => updateProp(["hoverBackgroundColor"], e.target.value)}
                className="h-8 mt-1.5 bg-white/60 dark:bg-gray-800/60 border-indigo-200 dark:border-indigo-700"
              />
            </div>
          </div>
        </div>
      )}

      {selectedComponent.type === "input" && (
        <div className="p-3 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border border-green-200/50 dark:border-green-800/30">
          <h4 className="text-sm font-semibold mb-3 text-green-800 dark:text-green-200">Propiedades del Input</h4>
          <div className="space-y-3">
            <div>
              <Label className="text-xs font-medium text-green-700 dark:text-green-300">Tipo de Input</Label>
              <Select value={selectedComponent.props.inputType || "text"} onValueChange={(value) => updateProp(["inputType"], value)}>
                <SelectTrigger className="h-8 text-xs mt-1.5 bg-white/60 dark:bg-gray-800/60 border-green-200 dark:border-green-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Texto</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="password">Contraseña</SelectItem>
                  <SelectItem value="number">Número</SelectItem>
                  <SelectItem value="tel">Teléfono</SelectItem>
                  <SelectItem value="url">URL</SelectItem>
                  <SelectItem value="search">Búsqueda</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-medium text-green-700 dark:text-green-300">Ancho: {selectedComponent.props.width || 320}px</Label>
                <Slider
                  value={[selectedComponent.props.width || 320]}
                  onValueChange={(values) => updateProp(["width"], values[0])}
                  min={200}
                  max={600}
                  step={20}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-xs font-medium text-green-700 dark:text-green-300">Alto: {selectedComponent.props.height || 48}px</Label>
                <Slider
                  value={[selectedComponent.props.height || 48]}
                  onValueChange={(values) => updateProp(["height"], values[0])}
                  min={32}
                  max={80}
                  step={4}
                  className="mt-2"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs font-medium text-green-700 dark:text-green-300">Texto de Ayuda</Label>
              <Input
                value={selectedComponent.props.helperText || ""}
                onChange={(e) => updateProp(["helperText"], e.target.value)}
                className="h-8 text-xs mt-1.5 bg-white/60 dark:bg-gray-800/60 border-green-200 dark:border-green-700"
                placeholder="Texto de ayuda opcional"
              />
            </div>
            <div className="flex items-center justify-between p-2 bg-white/40 dark:bg-gray-800/40 rounded-lg">
              <Label className="text-xs font-medium text-green-700 dark:text-green-300">Mostrar Icono</Label>
              <Switch
                checked={selectedComponent.props.showIcon || false}
                onCheckedChange={(checked) => updateProp(["showIcon"], checked)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Accesibilidad */}
      <div className="p-3 bg-gradient-to-br from-cyan-50/80 to-sky-50/80 dark:from-cyan-950/30 dark:to-sky-950/30 rounded-xl border border-cyan-200/50 dark:border-cyan-800/30">
        <h4 className="text-sm font-semibold mb-3 text-cyan-800 dark:text-cyan-200">Accesibilidad</h4>
        <div className="space-y-3">
          <div>
            <Label className="text-xs font-medium text-cyan-700 dark:text-cyan-300">Texto Alternativo</Label>
            <Input
              value={selectedComponent.props.alt || ""}
              onChange={(e) => updateProp(["alt"], e.target.value)}
              className="h-8 text-xs mt-1.5 bg-white/60 dark:bg-gray-800/60 border-cyan-200 dark:border-cyan-700"
              placeholder="Descripción para lectores de pantalla"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-cyan-700 dark:text-cyan-300">Título (Tooltip)</Label>
            <Input
              value={selectedComponent.props.title || ""}
              onChange={(e) => updateProp(["title"], e.target.value)}
              className="h-8 text-xs mt-1.5 bg-white/60 dark:bg-gray-800/60 border-cyan-200 dark:border-cyan-700"
              placeholder="Tooltip del elemento"
            />
          </div>
        </div>
      </div>
    </div>
  )
}