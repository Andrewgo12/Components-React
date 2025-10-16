"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Palette, Copy, RotateCcw } from "lucide-react"

interface ColorControlsProps {
  selectedComponent: any
  updateProp: (path: string[], value: any) => void
}

export function ColorControls({ selectedComponent, updateProp }: ColorControlsProps) {
  const colorPresets = [
    { name: "Transparente", value: "transparent" },
    { name: "Blanco", value: "#ffffff" },
    { name: "Negro", value: "#000000" },
    { name: "Gris", value: "#6b7280" },
    { name: "Azul", value: "#3b82f6" },
    { name: "Verde", value: "#10b981" },
    { name: "Rojo", value: "#ef4444" },
    { name: "Amarillo", value: "#f59e0b" },
    { name: "Púrpura", value: "#8b5cf6" },
    { name: "Rosa", value: "#ec4899" }
  ]

  const gradientPresets = [
    { name: "Azul a Púrpura", value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
    { name: "Rosa a Naranja", value: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
    { name: "Verde a Azul", value: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
    { name: "Dorado", value: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)" },
    { name: "Atardecer", value: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)" }
  ]

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color)
  }

  const resetColors = () => {
    updateProp(["color"], "#000000")
    updateProp(["backgroundColor"], "transparent")
    updateProp(["opacity"], 1)
  }

  const backgroundImage = selectedComponent.props.backgroundImage
  const isGradientEnabled = typeof backgroundImage === 'string' && backgroundImage.includes('gradient')

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="p-3 bg-gradient-to-br from-rose-50/80 to-pink-50/80 dark:from-rose-950/30 dark:to-pink-950/30 rounded-xl border border-rose-200/50 dark:border-rose-800/30">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-rose-800 dark:text-rose-200 flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Colores y Fondos
          </h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetColors}
            className="h-7 w-7 p-0 hover:bg-rose-100 dark:hover:bg-rose-900/50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Color de Texto */}
      <div className="p-3 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl border border-blue-200/50 dark:border-blue-800/30">
        <h4 className="text-sm font-semibold mb-3 text-blue-800 dark:text-blue-200">Color de Texto</h4>
        <div className="flex gap-2 mb-3">
          <Input
            type="color"
            value={selectedComponent.props.color || "#000000"}
            onChange={(e) => updateProp(["color"], e.target.value)}
            className="h-9 w-14 p-1 cursor-pointer border-blue-200 dark:border-blue-700"
          />
          <Input
            value={selectedComponent.props.color || "#000000"}
            onChange={(e) => updateProp(["color"], e.target.value)}
            className="h-9 text-xs flex-1 bg-white/60 dark:bg-gray-800/60 border-blue-200 dark:border-blue-700"
            placeholder="#000000"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyColor(selectedComponent.props.color || "#000000")}
            className="h-9 w-9 p-0 border-blue-200 hover:bg-blue-100 dark:border-blue-700 dark:hover:bg-blue-900/50"
          >
            <Copy className="h-3.5 w-3.5" />
          </Button>
        </div>
        
        <div className="grid grid-cols-5 gap-2">
          {colorPresets.slice(0, 10).map((preset, index) => (
            <button
              key={index}
              onClick={() => updateProp(["color"], preset.value)}
              className="h-8 w-full rounded-lg border-2 border-white dark:border-gray-700 hover:scale-105 transition-all duration-200 shadow-sm"
              style={{ backgroundColor: preset.value === "transparent" ? "#f3f4f6" : preset.value }}
              title={preset.name}
            />
          ))}
        </div>
      </div>

      {/* Color de Fondo */}
      <div className="p-3 bg-gradient-to-br from-emerald-50/80 to-green-50/80 dark:from-emerald-950/30 dark:to-green-950/30 rounded-xl border border-emerald-200/50 dark:border-emerald-800/30">
        <h4 className="text-sm font-semibold mb-3 text-emerald-800 dark:text-emerald-200">Color de Fondo</h4>
        <div className="flex gap-2 mb-3">
          <Input
            type="color"
            value={selectedComponent.props.backgroundColor || "#ffffff"}
            onChange={(e) => updateProp(["backgroundColor"], e.target.value)}
            className="h-9 w-14 p-1 cursor-pointer border-emerald-200 dark:border-emerald-700"
          />
          <Input
            value={selectedComponent.props.backgroundColor || "#ffffff"}
            onChange={(e) => updateProp(["backgroundColor"], e.target.value)}
            className="h-9 text-xs flex-1 bg-white/60 dark:bg-gray-800/60 border-emerald-200 dark:border-emerald-700"
            placeholder="#ffffff"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyColor(selectedComponent.props.backgroundColor || "#ffffff")}
            className="h-9 w-9 p-0 border-emerald-200 hover:bg-emerald-100 dark:border-emerald-700 dark:hover:bg-emerald-900/50"
          >
            <Copy className="h-3.5 w-3.5" />
          </Button>
        </div>
        
        <div className="grid grid-cols-5 gap-2">
          {colorPresets.map((preset, index) => (
            <button
              key={index}
              onClick={() => updateProp(["backgroundColor"], preset.value)}
              className="h-8 w-full rounded-lg border-2 border-white dark:border-gray-700 hover:scale-105 transition-all duration-200 shadow-sm"
              style={{ backgroundColor: preset.value === "transparent" ? "#f3f4f6" : preset.value }}
              title={preset.name}
            />
          ))}
        </div>
      </div>

      {/* Gradientes */}
      <div className="p-3 bg-gradient-to-br from-purple-50/80 to-violet-50/80 dark:from-purple-950/30 dark:to-violet-950/30 rounded-xl border border-purple-200/50 dark:border-purple-800/30">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-purple-800 dark:text-purple-200 flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Gradientes
          </h4>
          <Switch
            checked={isGradientEnabled}
            onCheckedChange={(checked) => {
              if (!checked) {
                updateProp(["backgroundImage"], "none")
              }
            }}
          />
        </div>
        
        <div className="space-y-2">
          {gradientPresets.map((preset, index) => (
            <button
              key={index}
              onClick={() => updateProp(["backgroundImage"], preset.value)}
              className="h-10 w-full rounded-lg border-2 border-white dark:border-gray-700 hover:scale-[1.02] transition-all duration-200 text-xs text-white font-semibold flex items-center justify-center shadow-lg"
              style={{ background: preset.value }}
            >
              {preset.name}
            </button>
          ))}
        </div>
        
        <div className="mt-3 p-3 bg-white/40 dark:bg-gray-800/40 rounded-lg">
          <Label className="text-xs font-medium text-purple-700 dark:text-purple-300">Gradiente Personalizado</Label>
          <Input
            value={typeof backgroundImage === 'string' ? backgroundImage : ""}
            onChange={(e) => updateProp(["backgroundImage"], e.target.value)}
            className="h-8 text-xs mt-1.5 bg-white/60 dark:bg-gray-800/60 border-purple-200 dark:border-purple-700"
            placeholder="linear-gradient(45deg, #ff0000, #0000ff)"
          />
        </div>
      </div>

      {/* Opacidad */}
      <div className="p-3 bg-gradient-to-br from-amber-50/80 to-orange-50/80 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl border border-amber-200/50 dark:border-amber-800/30">
        <h4 className="text-sm font-semibold mb-3 text-amber-800 dark:text-amber-200">Opacidad</h4>
        <div>
          <Label className="text-xs font-medium text-amber-700 dark:text-amber-300">Opacidad General: {Math.round((selectedComponent.props.opacity || 1) * 100)}%</Label>
          <Slider
            value={[(selectedComponent.props.opacity || 1) * 100]}
            onValueChange={(values) => updateProp(["opacity"], (values[0] ?? 100) / 100)}
            min={0}
            max={100}
            step={1}
            className="mt-2"
          />
        </div>
      </div>
    </div>
  )
}