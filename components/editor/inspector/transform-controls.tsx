"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Move, FlipHorizontal, FlipVertical, RotateCcw } from "lucide-react"

interface TransformControlsProps {
  selectedComponent: any
  updateProp: (path: string[], value: any) => void
}

export function TransformControls({ selectedComponent, updateProp }: TransformControlsProps) {
  const transformPresets = [
    { name: "Reset", transform: "none" },
    { name: "Rotar 45°", transform: "rotate(45deg)" },
    { name: "Rotar 90°", transform: "rotate(90deg)" },
    { name: "Escalar 1.2x", transform: "scale(1.2)" },
    { name: "Inclinar X", transform: "skewX(15deg)" },
    { name: "Inclinar Y", transform: "skewY(15deg)" },
    { name: "Flip H", transform: "scaleX(-1)" },
    { name: "Flip V", transform: "scaleY(-1)" }
  ]

  const resetTransform = () => {
    updateProp(["transform"], "none")
    updateProp(["transformOrigin"], "center")
    updateProp(["rotate"], 0)
    updateProp(["scaleX"], 1)
    updateProp(["scaleY"], 1)
    updateProp(["translateX"], 0)
    updateProp(["translateY"], 0)
    updateProp(["skewX"], 0)
    updateProp(["skewY"], 0)
  }

  const applyTransform = () => {
    const transforms = []
    
    if (selectedComponent.props.translateX || selectedComponent.props.translateY) {
      transforms.push(`translate(${selectedComponent.props.translateX || 0}px, ${selectedComponent.props.translateY || 0}px)`)
    }
    
    if (selectedComponent.props.rotate) {
      transforms.push(`rotate(${selectedComponent.props.rotate}deg)`)
    }
    
    if (selectedComponent.props.scaleX !== 1 || selectedComponent.props.scaleY !== 1) {
      transforms.push(`scale(${selectedComponent.props.scaleX || 1}, ${selectedComponent.props.scaleY || 1})`)
    }
    
    if (selectedComponent.props.skewX) {
      transforms.push(`skewX(${selectedComponent.props.skewX}deg)`)
    }
    
    if (selectedComponent.props.skewY) {
      transforms.push(`skewY(${selectedComponent.props.skewY}deg)`)
    }
    
    updateProp(["transform"], transforms.length > 0 ? transforms.join(" ") : "none")
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="p-3 bg-gradient-to-br from-cyan-50/80 to-sky-50/80 dark:from-cyan-950/30 dark:to-sky-950/30 rounded-xl border border-cyan-200/50 dark:border-cyan-800/30">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-cyan-800 dark:text-cyan-200 flex items-center gap-2">
            <Move className="h-4 w-4" />
            Transformaciones
          </h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetTransform}
            className="h-7 w-7 p-0 hover:bg-cyan-100 dark:hover:bg-cyan-900/50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Presets de Transformación */}
      <div className="p-3 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl border border-indigo-200/50 dark:border-indigo-800/30">
        <h4 className="text-sm font-semibold mb-3 text-indigo-800 dark:text-indigo-200">Presets Rápidos</h4>
        <div className="grid grid-cols-4 gap-2">
          {transformPresets.map((preset, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => updateProp(["transform"], preset.transform)}
              className="h-8 text-xs border-indigo-200 hover:bg-indigo-100 dark:border-indigo-700 dark:hover:bg-indigo-900/50"
            >
              {preset.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Posición (Translate) */}
      <div className="p-3 bg-gradient-to-br from-emerald-50/80 to-green-50/80 dark:from-emerald-950/30 dark:to-green-950/30 rounded-xl border border-emerald-200/50 dark:border-emerald-800/30">
        <h4 className="text-sm font-semibold mb-3 text-emerald-800 dark:text-emerald-200">Posición</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs font-medium text-emerald-700 dark:text-emerald-300">X: {selectedComponent.props.translateX || 0}px</Label>
            <Slider
              value={[selectedComponent.props.translateX || 0]}
              onValueChange={(values) => {
                updateProp(["translateX"], values[0])
                applyTransform()
              }}
              min={-200}
              max={200}
              step={1}
              className="mt-2"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-emerald-700 dark:text-emerald-300">Y: {selectedComponent.props.translateY || 0}px</Label>
            <Slider
              value={[selectedComponent.props.translateY || 0]}
              onValueChange={(values) => {
                updateProp(["translateY"], values[0])
                applyTransform()
              }}
              min={-200}
              max={200}
              step={1}
              className="mt-2"
            />
          </div>
        </div>
      </div>

      {/* Rotación */}
      <div className="p-3 bg-gradient-to-br from-orange-50/80 to-amber-50/80 dark:from-orange-950/30 dark:to-amber-950/30 rounded-xl border border-orange-200/50 dark:border-orange-800/30">
        <h4 className="text-sm font-semibold mb-3 text-orange-800 dark:text-orange-200">Rotación</h4>
        <div>
          <Label className="text-xs font-medium text-orange-700 dark:text-orange-300">Ángulo: {selectedComponent.props.rotate || 0}°</Label>
          <Slider
            value={[selectedComponent.props.rotate || 0]}
            onValueChange={(values) => {
              updateProp(["rotate"], values[0])
              applyTransform()
            }}
            min={-180}
            max={180}
            step={1}
            className="mt-2"
          />
        </div>
        
        {/* Botones de rotación rápida */}
        <div className="flex gap-2 mt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const newRotate = (selectedComponent.props.rotate || 0) - 90
              updateProp(["rotate"], newRotate)
              applyTransform()
            }}
            className="h-8 px-3 text-xs border-orange-200 hover:bg-orange-100 dark:border-orange-700 dark:hover:bg-orange-900/50"
          >
            -90°
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const newRotate = (selectedComponent.props.rotate || 0) + 90
              updateProp(["rotate"], newRotate)
              applyTransform()
            }}
            className="h-8 px-3 text-xs border-orange-200 hover:bg-orange-100 dark:border-orange-700 dark:hover:bg-orange-900/50"
          >
            +90°
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              updateProp(["rotate"], 0)
              applyTransform()
            }}
            className="h-8 px-3 text-xs border-orange-200 hover:bg-orange-100 dark:border-orange-700 dark:hover:bg-orange-900/50"
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Escala */}
      <div className="p-3 bg-gradient-to-br from-rose-50/80 to-pink-50/80 dark:from-rose-950/30 dark:to-pink-950/30 rounded-xl border border-rose-200/50 dark:border-rose-800/30">
        <h4 className="text-sm font-semibold mb-3 text-rose-800 dark:text-rose-200">Escala</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs font-medium text-rose-700 dark:text-rose-300">X: {selectedComponent.props.scaleX || 1}</Label>
            <Slider
              value={[selectedComponent.props.scaleX || 1]}
              onValueChange={(values) => {
                updateProp(["scaleX"], values[0])
                applyTransform()
              }}
              min={0.1}
              max={3}
              step={0.1}
              className="mt-2"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-rose-700 dark:text-rose-300">Y: {selectedComponent.props.scaleY || 1}</Label>
            <Slider
              value={[selectedComponent.props.scaleY || 1]}
              onValueChange={(values) => {
                updateProp(["scaleY"], values[0])
                applyTransform()
              }}
              min={0.1}
              max={3}
              step={0.1}
              className="mt-2"
            />
          </div>
        </div>
        
        {/* Mantener proporción */}
        <div className="flex items-center justify-between mt-3 p-2 bg-white/40 dark:bg-gray-800/40 rounded-lg">
          <Label className="text-xs font-medium text-rose-700 dark:text-rose-300">Mantener Proporción</Label>
          <Switch
            checked={selectedComponent.props.maintainAspectRatio || false}
            onCheckedChange={(checked) => {
              updateProp(["maintainAspectRatio"], checked)
              if (checked) {
                const scale = selectedComponent.props.scaleX || 1
                updateProp(["scaleY"], scale)
                applyTransform()
              }
            }}
          />
        </div>
        
        {/* Botones de escala rápida */}
        <div className="flex gap-2 mt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              updateProp(["scaleX"], -1)
              if (selectedComponent.props.maintainAspectRatio) updateProp(["scaleY"], -1)
              applyTransform()
            }}
            className="h-8 px-2 border-rose-200 hover:bg-rose-100 dark:border-rose-700 dark:hover:bg-rose-900/50"
          >
            <FlipHorizontal className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              updateProp(["scaleY"], -1)
              if (selectedComponent.props.maintainAspectRatio) updateProp(["scaleX"], -1)
              applyTransform()
            }}
            className="h-8 px-2 border-rose-200 hover:bg-rose-100 dark:border-rose-700 dark:hover:bg-rose-900/50"
          >
            <FlipVertical className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              updateProp(["scaleX"], 1)
              updateProp(["scaleY"], 1)
              applyTransform()
            }}
            className="h-8 px-3 text-xs border-rose-200 hover:bg-rose-100 dark:border-rose-700 dark:hover:bg-rose-900/50"
          >
            1:1
          </Button>
        </div>
      </div>

      {/* Inclinación (Skew) */}
      <div className="p-3 bg-gradient-to-br from-violet-50/80 to-purple-50/80 dark:from-violet-950/30 dark:to-purple-950/30 rounded-xl border border-violet-200/50 dark:border-violet-800/30">
        <h4 className="text-sm font-semibold mb-3 text-violet-800 dark:text-violet-200">Inclinación</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs font-medium text-violet-700 dark:text-violet-300">X: {selectedComponent.props.skewX || 0}°</Label>
            <Slider
              value={[selectedComponent.props.skewX || 0]}
              onValueChange={(values) => {
                updateProp(["skewX"], values[0])
                applyTransform()
              }}
              min={-45}
              max={45}
              step={1}
              className="mt-2"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-violet-700 dark:text-violet-300">Y: {selectedComponent.props.skewY || 0}°</Label>
            <Slider
              value={[selectedComponent.props.skewY || 0]}
              onValueChange={(values) => {
                updateProp(["skewY"], values[0])
                applyTransform()
              }}
              min={-45}
              max={45}
              step={1}
              className="mt-2"
            />
          </div>
        </div>
      </div>

      {/* Origen de Transformación */}
      <div className="p-3 bg-gradient-to-br from-teal-50/80 to-cyan-50/80 dark:from-teal-950/30 dark:to-cyan-950/30 rounded-xl border border-teal-200/50 dark:border-teal-800/30">
        <h4 className="text-sm font-semibold mb-3 text-teal-800 dark:text-teal-200">Origen de Transformación</h4>
        <Select
          value={selectedComponent.props.transformOrigin || "center"}
          onValueChange={(value) => updateProp(["transformOrigin"], value)}
        >
          <SelectTrigger className="h-8 text-xs bg-white/60 dark:bg-gray-800/60 border-teal-200 dark:border-teal-700">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="top left">Superior Izquierda</SelectItem>
            <SelectItem value="top center">Superior Centro</SelectItem>
            <SelectItem value="top right">Superior Derecha</SelectItem>
            <SelectItem value="center left">Centro Izquierda</SelectItem>
            <SelectItem value="center">Centro</SelectItem>
            <SelectItem value="center right">Centro Derecha</SelectItem>
            <SelectItem value="bottom left">Inferior Izquierda</SelectItem>
            <SelectItem value="bottom center">Inferior Centro</SelectItem>
            <SelectItem value="bottom right">Inferior Derecha</SelectItem>
          </SelectContent>
        </Select>
        
        {/* Origen personalizado */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div>
            <Label className="text-xs font-medium text-teal-700 dark:text-teal-300">X Personalizado</Label>
            <Input
              value={selectedComponent.props.transformOriginX || ""}
              onChange={(e) => updateProp(["transformOriginX"], e.target.value)}
              className="h-8 text-xs mt-1.5 bg-white/60 dark:bg-gray-800/60 border-teal-200 dark:border-teal-700"
              placeholder="50%, 10px"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-teal-700 dark:text-teal-300">Y Personalizado</Label>
            <Input
              value={selectedComponent.props.transformOriginY || ""}
              onChange={(e) => updateProp(["transformOriginY"], e.target.value)}
              className="h-8 text-xs mt-1.5 bg-white/60 dark:bg-gray-800/60 border-teal-200 dark:border-teal-700"
              placeholder="50%, 10px"
            />
          </div>
        </div>
      </div>

      {/* Transformación 3D */}
      <div className="p-3 bg-gradient-to-br from-slate-50/80 to-gray-50/80 dark:from-slate-950/30 dark:to-gray-950/30 rounded-xl border border-slate-200/50 dark:border-slate-800/30">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Transformación 3D</h4>
          <Switch
            checked={selectedComponent.props.enable3D || false}
            onCheckedChange={(checked) => updateProp(["enable3D"], checked)}
          />
        </div>
        
        {selectedComponent.props.enable3D && (
          <div className="space-y-3">
            <div>
              <Label className="text-xs font-medium text-slate-700 dark:text-slate-300">Perspectiva: {selectedComponent.props.perspective || 1000}px</Label>
              <Slider
                value={[selectedComponent.props.perspective || 1000]}
                onValueChange={(values) => updateProp(["perspective"], values[0])}
                min={100}
                max={2000}
                step={50}
                className="mt-2"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label className="text-xs font-medium text-slate-700 dark:text-slate-300">Rotar X: {selectedComponent.props.rotateX || 0}°</Label>
                <Slider
                  value={[selectedComponent.props.rotateX || 0]}
                  onValueChange={(values) => updateProp(["rotateX"], values[0])}
                  min={-180}
                  max={180}
                  step={5}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-xs font-medium text-slate-700 dark:text-slate-300">Rotar Y: {selectedComponent.props.rotateY || 0}°</Label>
                <Slider
                  value={[selectedComponent.props.rotateY || 0]}
                  onValueChange={(values) => updateProp(["rotateY"], values[0])}
                  min={-180}
                  max={180}
                  step={5}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-xs font-medium text-slate-700 dark:text-slate-300">Rotar Z: {selectedComponent.props.rotateZ || 0}°</Label>
                <Slider
                  value={[selectedComponent.props.rotateZ || 0]}
                  onValueChange={(values) => updateProp(["rotateZ"], values[0])}
                  min={-180}
                  max={180}
                  step={5}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}