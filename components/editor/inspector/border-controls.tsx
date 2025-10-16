"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Square, RotateCcw, Copy } from "lucide-react"

interface BorderControlsProps {
  selectedComponent: any
  updateProp: (path: string[], value: any) => void
}

export function BorderControls({ selectedComponent, updateProp }: BorderControlsProps) {
  const borderPresets = [
    { name: "Sin Borde", style: "none", width: 0 },
    { name: "Sólido", style: "solid", width: 1 },
    { name: "Punteado", style: "dotted", width: 2 },
    { name: "Discontinuo", style: "dashed", width: 2 },
    { name: "Doble", style: "double", width: 3 },
    { name: "Relieve", style: "ridge", width: 2 },
    { name: "Hundido", style: "groove", width: 2 }
  ]

  const shadowPresets = [
    { name: "Sutil", x: 0, y: 1, blur: 3, spread: 0, color: "rgba(0,0,0,0.1)" },
    { name: "Suave", x: 0, y: 4, blur: 6, spread: -1, color: "rgba(0,0,0,0.1)" },
    { name: "Mediana", x: 0, y: 10, blur: 15, spread: -3, color: "rgba(0,0,0,0.1)" },
    { name: "Grande", x: 0, y: 20, blur: 25, spread: -5, color: "rgba(0,0,0,0.1)" },
    { name: "Extrema", x: 0, y: 25, blur: 50, spread: -12, color: "rgba(0,0,0,0.25)" },
    { name: "Interna", x: 0, y: 2, blur: 4, spread: 0, color: "rgba(0,0,0,0.06)", inset: true }
  ]

  const resetBorders = () => {
    updateProp(["borderWidth"], 0)
    updateProp(["borderStyle"], "none")
    updateProp(["borderColor"], "#000000")
    updateProp(["borderRadius"], 0)
  }

  const resetShadows = () => {
    updateProp(["boxShadow"], { enabled: false })
  }

  const applyShadowPreset = (preset: any) => {
    updateProp(["boxShadow"], {
      enabled: true,
      x: preset.x,
      y: preset.y,
      blur: preset.blur,
      spread: preset.spread || 0,
      color: preset.color,
      inset: preset.inset || false
    })
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="p-3 bg-gradient-to-br from-amber-50/80 to-orange-50/80 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl border border-amber-200/50 dark:border-amber-800/30">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-200 flex items-center gap-2">
            <Square className="h-4 w-4" />
            Bordes y Sombras
          </h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetBorders}
            className="h-7 w-7 p-0 hover:bg-amber-100 dark:hover:bg-amber-900/50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Border Radius */}
      <div className="p-3 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl border border-blue-200/50 dark:border-blue-800/30">
        <h4 className="text-sm font-semibold mb-3 text-blue-800 dark:text-blue-200">Radio de Borde</h4>
        <div>
          <Label className="text-xs font-medium text-blue-700 dark:text-blue-300">Todos: {selectedComponent.props.borderRadius || 0}px</Label>
          <Slider
            value={[selectedComponent.props.borderRadius || 0]}
            onValueChange={(values) => updateProp(["borderRadius"], values[0])}
            min={0}
            max={100}
            step={1}
            className="mt-2"
          />
        </div>
        
        {/* Radios Individuales */}
        <div className="grid grid-cols-4 gap-2 mt-3">
          <div>
            <Label className="text-[10px] text-blue-700 dark:text-blue-300">TL</Label>
            <Input
              type="number"
              value={selectedComponent.props.borderTopLeftRadius || 0}
              onChange={(e) => updateProp(["borderTopLeftRadius"], parseInt(e.target.value))}
              className="h-7 text-xs mt-1 bg-white/60 dark:bg-gray-800/60 border-blue-200 dark:border-blue-700"
              min={0}
              max={100}
            />
          </div>
          <div>
            <Label className="text-[10px] text-blue-700 dark:text-blue-300">TR</Label>
            <Input
              type="number"
              value={selectedComponent.props.borderTopRightRadius || 0}
              onChange={(e) => updateProp(["borderTopRightRadius"], parseInt(e.target.value))}
              className="h-7 text-xs mt-1 bg-white/60 dark:bg-gray-800/60 border-blue-200 dark:border-blue-700"
              min={0}
              max={100}
            />
          </div>
          <div>
            <Label className="text-[10px] text-blue-700 dark:text-blue-300">BL</Label>
            <Input
              type="number"
              value={selectedComponent.props.borderBottomLeftRadius || 0}
              onChange={(e) => updateProp(["borderBottomLeftRadius"], parseInt(e.target.value))}
              className="h-7 text-xs mt-1 bg-white/60 dark:bg-gray-800/60 border-blue-200 dark:border-blue-700"
              min={0}
              max={100}
            />
          </div>
          <div>
            <Label className="text-[10px] text-blue-700 dark:text-blue-300">BR</Label>
            <Input
              type="number"
              value={selectedComponent.props.borderBottomRightRadius || 0}
              onChange={(e) => updateProp(["borderBottomRightRadius"], parseInt(e.target.value))}
              className="h-7 text-xs mt-1 bg-white/60 dark:bg-gray-800/60 border-blue-200 dark:border-blue-700"
              min={0}
              max={100}
            />
          </div>
        </div>
      </div>

      {/* Border Width y Style */}
      <div className="p-3 bg-gradient-to-br from-emerald-50/80 to-green-50/80 dark:from-emerald-950/30 dark:to-green-950/30 rounded-xl border border-emerald-200/50 dark:border-emerald-800/30">
        <h4 className="text-sm font-semibold mb-3 text-emerald-800 dark:text-emerald-200">Grosor y Estilo</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs font-medium text-emerald-700 dark:text-emerald-300">Grosor: {selectedComponent.props.borderWidth || 0}px</Label>
            <Slider
              value={[selectedComponent.props.borderWidth || 0]}
              onValueChange={(values) => updateProp(["borderWidth"], values[0])}
              min={0}
              max={20}
              step={1}
              className="mt-2"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-emerald-700 dark:text-emerald-300">Estilo</Label>
            <Select
              value={selectedComponent.props.borderStyle || "solid"}
              onValueChange={(value) => updateProp(["borderStyle"], value)}
            >
              <SelectTrigger className="h-8 text-xs mt-2 bg-white/60 dark:bg-gray-800/60 border-emerald-200 dark:border-emerald-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Ninguno</SelectItem>
                <SelectItem value="solid">Sólido</SelectItem>
                <SelectItem value="dashed">Discontinuo</SelectItem>
                <SelectItem value="dotted">Punteado</SelectItem>
                <SelectItem value="double">Doble</SelectItem>
                <SelectItem value="groove">Hundido</SelectItem>
                <SelectItem value="ridge">Relieve</SelectItem>
                <SelectItem value="inset">Incrustado</SelectItem>
                <SelectItem value="outset">Sobresaliente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Presets de Borde */}
        <div className="grid grid-cols-3 gap-2 mt-3">
          {borderPresets.map((preset, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => {
                updateProp(["borderStyle"], preset.style)
                updateProp(["borderWidth"], preset.width)
              }}
              className="h-8 text-xs border-emerald-200 hover:bg-emerald-100 dark:border-emerald-700 dark:hover:bg-emerald-900/50"
            >
              {preset.name}
            </Button>
          ))}
        </div>

        {/* Border Color */}
        <div className="mt-3">
          <Label className="text-xs font-medium text-emerald-700 dark:text-emerald-300">Color del Borde</Label>
          <div className="flex gap-2 mt-1.5">
            <Input
              type="color"
              value={selectedComponent.props.borderColor || "#000000"}
              onChange={(e) => updateProp(["borderColor"], e.target.value)}
              className="h-8 w-12 p-1 cursor-pointer border-emerald-200 dark:border-emerald-700"
            />
            <Input
              value={selectedComponent.props.borderColor || "#000000"}
              onChange={(e) => updateProp(["borderColor"], e.target.value)}
              className="h-8 text-xs flex-1 bg-white/60 dark:bg-gray-800/60 border-emerald-200 dark:border-emerald-700"
              placeholder="#000000"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigator.clipboard.writeText(selectedComponent.props.borderColor || "#000000")}
              className="h-8 w-8 p-0 border-emerald-200 hover:bg-emerald-100 dark:border-emerald-700 dark:hover:bg-emerald-900/50"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Box Shadow */}
      <div className="p-3 bg-gradient-to-br from-purple-50/80 to-violet-50/80 dark:from-purple-950/30 dark:to-violet-950/30 rounded-xl border border-purple-200/50 dark:border-purple-800/30">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-purple-800 dark:text-purple-200">Sombra (Box Shadow)</h4>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={resetShadows}
              className="h-6 w-6 p-0 hover:bg-purple-100 dark:hover:bg-purple-900/50"
            >
              <RotateCcw className="h-3 w-3" />
            </Button>
            <Switch
              checked={selectedComponent.props.boxShadow?.enabled || false}
              onCheckedChange={(checked) => updateProp(["boxShadow", "enabled"], checked)}
            />
          </div>
        </div>
        
        {selectedComponent.props.boxShadow?.enabled && (
          <div className="space-y-3">
            {/* Presets de Sombra */}
            <div>
              <Label className="text-xs font-medium text-purple-700 dark:text-purple-300 mb-2 block">Presets</Label>
              <div className="grid grid-cols-2 gap-2">
                {shadowPresets.map((preset, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => applyShadowPreset(preset)}
                    className="h-7 text-xs border-purple-200 hover:bg-purple-100 dark:border-purple-700 dark:hover:bg-purple-900/50"
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Controles Manuales */}
            <div className="grid grid-cols-4 gap-2">
              <div>
                <Label className="text-[10px] text-purple-700 dark:text-purple-300">X: {selectedComponent.props.boxShadow?.x || 0}</Label>
                <Slider
                  value={[selectedComponent.props.boxShadow?.x || 0]}
                  onValueChange={([value]) => updateProp(["boxShadow", "x"], value)}
                  min={-50}
                  max={50}
                  step={1}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-[10px] text-purple-700 dark:text-purple-300">Y: {selectedComponent.props.boxShadow?.y || 0}</Label>
                <Slider
                  value={[selectedComponent.props.boxShadow?.y || 0]}
                  onValueChange={([value]) => updateProp(["boxShadow", "y"], value)}
                  min={-50}
                  max={50}
                  step={1}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-[10px] text-purple-700 dark:text-purple-300">Blur: {selectedComponent.props.boxShadow?.blur || 0}</Label>
                <Slider
                  value={[selectedComponent.props.boxShadow?.blur || 0]}
                  onValueChange={([value]) => updateProp(["boxShadow", "blur"], value)}
                  min={0}
                  max={100}
                  step={1}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-[10px] text-purple-700 dark:text-purple-300">Spread: {selectedComponent.props.boxShadow?.spread || 0}</Label>
                <Slider
                  value={[selectedComponent.props.boxShadow?.spread || 0]}
                  onValueChange={([value]) => updateProp(["boxShadow", "spread"], value)}
                  min={-50}
                  max={50}
                  step={1}
                  className="mt-1"
                />
              </div>
            </div>
            
            {/* Color y Opciones */}
            <div className="space-y-2">
              <div>
                <Label className="text-xs font-medium text-purple-700 dark:text-purple-300">Color de Sombra</Label>
                <div className="flex gap-2 mt-1.5">
                  <Input
                    type="color"
                    value={selectedComponent.props.boxShadow?.color?.replace(/rgba?\([^)]+\)/, '#000000') || "#000000"}
                    onChange={(e) => updateProp(["boxShadow", "color"], e.target.value)}
                    className="h-8 w-12 p-1 cursor-pointer border-purple-200 dark:border-purple-700"
                  />
                  <Input
                    value={selectedComponent.props.boxShadow?.color || "rgba(0,0,0,0.1)"}
                    onChange={(e) => updateProp(["boxShadow", "color"], e.target.value)}
                    className="h-8 text-xs flex-1 bg-white/60 dark:bg-gray-800/60 border-purple-200 dark:border-purple-700"
                    placeholder="rgba(0,0,0,0.1)"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-2 bg-white/40 dark:bg-gray-800/40 rounded-lg">
                <Label className="text-xs font-medium text-purple-700 dark:text-purple-300">Sombra Interna</Label>
                <Switch
                  checked={selectedComponent.props.boxShadow?.inset || false}
                  onCheckedChange={(checked) => updateProp(["boxShadow", "inset"], checked)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}