"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Zap, Sparkles, Palette, Star, Wand2, RotateCw } from "lucide-react"

interface EffectsControlsProps {
  selectedComponent: any
  updateEffect: (effectType: string, property: string, value: any) => void
}

export function EffectsControls({ selectedComponent, updateEffect }: EffectsControlsProps) {
  const effectPresets = {
    glow: [
      { name: "Sutil", intensity: 30, color: "#3b82f6", blur: 10 },
      { name: "Medio", intensity: 60, color: "#8b5cf6", blur: 20 },
      { name: "Intenso", intensity: 90, color: "#ec4899", blur: 30 },
      { name: "Neón", intensity: 100, color: "#00ff88", blur: 25 }
    ],
    shimmer: [
      { name: "Lento", speed: 3, angle: 45, width: 30 },
      { name: "Normal", speed: 2, angle: 45, width: 50 },
      { name: "Rápido", speed: 1, angle: 45, width: 70 },
      { name: "Diagonal", speed: 2, angle: 135, width: 40 }
    ],
    filters: [
      { name: "Blur", filter: "blur(4px)" },
      { name: "Brillo", filter: "brightness(1.2)" },
      { name: "Contraste", filter: "contrast(1.3)" },
      { name: "Saturación", filter: "saturate(1.5)" },
      { name: "Sepia", filter: "sepia(0.8)" },
      { name: "Vintage", filter: "sepia(0.5) contrast(1.2) brightness(1.1)" }
    ]
  }

  const resetEffects = () => {
    updateEffect('glow', 'enabled', false)
    updateEffect('shimmer', 'enabled', false)
    updateEffect('gradient', 'enabled', false)
    updateEffect('blur', 'enabled', false)
    updateEffect('particle', 'enabled', false)
  }

  return (
    <div className="space-y-4">
      {/* Header con Reset */}
      <div className="p-3 bg-gradient-to-br from-fuchsia-50/80 to-pink-50/80 dark:from-fuchsia-950/30 dark:to-pink-950/30 rounded-xl border border-fuchsia-200/50 dark:border-fuchsia-800/30">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-fuchsia-800 dark:text-fuchsia-200 flex items-center gap-2">
            <Wand2 className="h-4 w-4" />
            Efectos y Filtros
          </h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetEffects}
            className="h-7 w-7 p-0 hover:bg-fuchsia-100 dark:hover:bg-fuchsia-900/50"
          >
            <RotateCw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Efecto Glow */}
      <div className="p-3 bg-gradient-to-br from-yellow-50/80 to-orange-50/80 dark:from-yellow-950/30 dark:to-orange-950/30 rounded-xl border border-yellow-200/50 dark:border-yellow-800/30">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <h4 className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">Efecto Glow</h4>
          </div>
          <Switch
            checked={selectedComponent.props.effects?.glow?.enabled || false}
            onCheckedChange={(checked) => updateEffect('glow', 'enabled', checked)}
          />
        </div>

        {selectedComponent.props.effects?.glow?.enabled && (
          <div className="space-y-2 mt-2">
            {/* Presets de Glow */}
            <div>
              <Label className="text-[10px] text-muted-foreground mb-1 block">Presets</Label>
              <div className="grid grid-cols-2 gap-1">
                {effectPresets.glow.map((preset, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      updateEffect('glow', 'intensity', preset.intensity)
                      updateEffect('glow', 'color', preset.color)
                      updateEffect('glow', 'blur', preset.blur)
                    }}
                    className="h-6 text-xs"
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-[10px] text-muted-foreground">
                  Intensidad: {selectedComponent.props.effects?.glow?.intensity || 50}%
                </Label>
                <Slider
                  value={[selectedComponent.props.effects?.glow?.intensity || 50]}
                  onValueChange={(value) => updateEffect('glow', 'intensity', value[0])}
                  min={0}
                  max={100}
                  step={5}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-[10px] text-muted-foreground">
                  Blur: {selectedComponent.props.effects?.glow?.blur || 10}px
                </Label>
                <Slider
                  value={[selectedComponent.props.effects?.glow?.blur || 10]}
                  onValueChange={(value) => updateEffect('glow', 'blur', value[0])}
                  min={0}
                  max={50}
                  step={1}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label className="text-[10px] text-muted-foreground">Color</Label>
              <div className="flex gap-1 mt-1">
                <Input
                  type="color"
                  value={selectedComponent.props.effects?.glow?.color || "#3b82f6"}
                  onChange={(e) => updateEffect('glow', 'color', e.target.value)}
                  className="h-7 w-10 p-0.5 cursor-pointer"
                />
                <Input
                  value={selectedComponent.props.effects?.glow?.color || "#3b82f6"}
                  onChange={(e) => updateEffect('glow', 'color', e.target.value)}
                  className="h-7 text-xs flex-1"
                />
              </div>
            </div>

            <div>
              <Label className="text-[10px] text-muted-foreground">
                Spread: {selectedComponent.props.effects?.glow?.spread || 0}px
              </Label>
              <Slider
                value={[selectedComponent.props.effects?.glow?.spread || 0]}
                onValueChange={(value) => updateEffect('glow', 'spread', value[0])}
                min={0}
                max={20}
                step={1}
                className="mt-1"
              />
            </div>
          </div>
        )}
      </div>

      {/* Efecto Shimmer */}
      <div className="p-2.5 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-lg border border-blue-500/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <Label className="text-xs font-medium">Efecto Shimmer</Label>
          </div>
          <Switch
            checked={selectedComponent.props.effects?.shimmer?.enabled || false}
            onCheckedChange={(checked) => updateEffect('shimmer', 'enabled', checked)}
          />
        </div>

        {selectedComponent.props.effects?.shimmer?.enabled && (
          <div className="space-y-2 mt-2">
            {/* Presets de Shimmer */}
            <div>
              <Label className="text-[10px] text-muted-foreground mb-1 block">Presets</Label>
              <div className="grid grid-cols-2 gap-1">
                {effectPresets.shimmer.map((preset, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      updateEffect('shimmer', 'speed', preset.speed)
                      updateEffect('shimmer', 'angle', preset.angle)
                      updateEffect('shimmer', 'width', preset.width)
                    }}
                    className="h-6 text-xs"
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-[10px] text-muted-foreground">
                  Velocidad: {selectedComponent.props.effects?.shimmer?.speed || 2}s
                </Label>
                <Slider
                  value={[selectedComponent.props.effects?.shimmer?.speed || 2]}
                  onValueChange={(values) => updateEffect('shimmer', 'speed', values[0])}
                  min={0.5}
                  max={5}
                  step={0.1}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-[10px] text-muted-foreground">
                  Ángulo: {selectedComponent.props.effects?.shimmer?.angle || 45}°
                </Label>
                <Slider
                  value={[selectedComponent.props.effects?.shimmer?.angle || 45]}
                  onValueChange={(values) => updateEffect('shimmer', 'angle', values[0])}
                  min={0}
                  max={360}
                  step={15}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label className="text-[10px] text-muted-foreground">
                Ancho: {selectedComponent.props.effects?.shimmer?.width || 50}%
              </Label>
              <Slider
                value={[selectedComponent.props.effects?.shimmer?.width || 50]}
                onValueChange={(values) => updateEffect('shimmer', 'width', values[0])}
                min={10}
                max={100}
                step={5}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-[10px] text-muted-foreground">Color del Shimmer</Label>
              <Input
                type="color"
                value={selectedComponent.props.effects?.shimmer?.color || "#ffffff"}
                onChange={(e) => updateEffect('shimmer', 'color', e.target.value)}
                className="h-7 w-full p-0.5 mt-1 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      {/* Gradiente Animado */}
      <div className="p-2.5 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-lg border border-purple-500/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Palette className="w-3.5 h-3.5 text-purple-500" />
            <Label className="text-xs font-medium">Gradiente Animado</Label>
          </div>
          <Switch
            checked={selectedComponent.props.effects?.gradient?.enabled || false}
            onCheckedChange={(checked) => updateEffect('gradient', 'enabled', checked)}
          />
        </div>

        {selectedComponent.props.effects?.gradient?.enabled && (
          <div className="space-y-2 mt-2">
            <div className="grid grid-cols-2 gap-2">
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
              <div>
                <Label className="text-[10px] text-muted-foreground">
                  Velocidad: {selectedComponent.props.effects?.gradient?.speed || 3}s
                </Label>
                <Slider
                  value={[selectedComponent.props.effects?.gradient?.speed || 3]}
                  onValueChange={(values) => updateEffect('gradient', 'speed', values[0])}
                  min={1}
                  max={10}
                  step={0.5}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1">
              <div>
                <Label className="text-[10px] text-muted-foreground">Color 1</Label>
                <Input
                  type="color"
                  value={selectedComponent.props.effects?.gradient?.color1 || "#3b82f6"}
                  onChange={(e) => updateEffect('gradient', 'color1', e.target.value)}
                  className="h-7 w-full p-0.5 mt-1 cursor-pointer"
                />
              </div>
              <div>
                <Label className="text-[10px] text-muted-foreground">Color 2</Label>
                <Input
                  type="color"
                  value={selectedComponent.props.effects?.gradient?.color2 || "#8b5cf6"}
                  onChange={(e) => updateEffect('gradient', 'color2', e.target.value)}
                  className="h-7 w-full p-0.5 mt-1 cursor-pointer"
                />
              </div>
              <div>
                <Label className="text-[10px] text-muted-foreground">Color 3</Label>
                <Input
                  type="color"
                  value={selectedComponent.props.effects?.gradient?.color3 || "#ec4899"}
                  onChange={(e) => updateEffect('gradient', 'color3', e.target.value)}
                  className="h-7 w-full p-0.5 mt-1 cursor-pointer"
                />
              </div>
            </div>

            <div>
              <Label className="text-[10px] text-muted-foreground">
                Dirección: {selectedComponent.props.effects?.gradient?.direction || 45}°
              </Label>
              <Slider
                value={[selectedComponent.props.effects?.gradient?.direction || 45]}
                onValueChange={(values) => updateEffect('gradient', 'direction', values[0])}
                min={0}
                max={360}
                step={15}
                className="mt-1"
              />
            </div>
          </div>
        )}
      </div>

      <Separator />

      {/* Efectos de Blur y Filtros */}
      <div className="p-2.5 bg-gradient-to-r from-gray-500/5 to-slate-500/5 rounded-lg border border-gray-500/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Wand2 className="w-3.5 h-3.5 text-gray-500" />
            <Label className="text-xs font-medium">Filtros CSS</Label>
          </div>
          <Switch
            checked={selectedComponent.props.effects?.filters?.enabled || false}
            onCheckedChange={(checked) => updateEffect('filters', 'enabled', checked)}
          />
        </div>

        {selectedComponent.props.effects?.filters?.enabled && (
          <div className="space-y-2 mt-2">
            {/* Presets de Filtros */}
            <div>
              <Label className="text-[10px] text-muted-foreground mb-1 block">Presets</Label>
              <div className="grid grid-cols-2 gap-1">
                {effectPresets.filters.map((preset, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => updateEffect('filters', 'custom', preset.filter)}
                    className="h-6 text-xs"
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Controles Individuales */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-[10px] text-muted-foreground">
                  Blur: {selectedComponent.props.effects?.filters?.blur || 0}px
                </Label>
                <Slider
                  value={[selectedComponent.props.effects?.filters?.blur || 0]}
                  onValueChange={(values) => updateEffect('filters', 'blur', values[0])}
                  min={0}
                  max={20}
                  step={0.5}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-[10px] text-muted-foreground">
                  Brillo: {selectedComponent.props.effects?.filters?.brightness || 100}%
                </Label>
                <Slider
                  value={[selectedComponent.props.effects?.filters?.brightness || 100]}
                  onValueChange={(values) => updateEffect('filters', 'brightness', values[0])}
                  min={0}
                  max={200}
                  step={5}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-[10px] text-muted-foreground">
                  Contraste: {selectedComponent.props.effects?.filters?.contrast || 100}%
                </Label>
                <Slider
                  value={[selectedComponent.props.effects?.filters?.contrast || 100]}
                  onValueChange={(values) => updateEffect('filters', 'contrast', values[0])}
                  min={0}
                  max={200}
                  step={5}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-[10px] text-muted-foreground">
                  Saturación: {selectedComponent.props.effects?.filters?.saturate || 100}%
                </Label>
                <Slider
                  value={[selectedComponent.props.effects?.filters?.saturate || 100]}
                  onValueChange={(values) => updateEffect('filters', 'saturate', values[0])}
                  min={0}
                  max={200}
                  step={5}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-[10px] text-muted-foreground">
                  Matiz: {selectedComponent.props.effects?.filters?.hueRotate || 0}°
                </Label>
                <Slider
                  value={[selectedComponent.props.effects?.filters?.hueRotate || 0]}
                  onValueChange={(values) => updateEffect('filters', 'hueRotate', values[0])}
                  min={0}
                  max={360}
                  step={15}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-[10px] text-muted-foreground">
                  Sepia: {selectedComponent.props.effects?.filters?.sepia || 0}%
                </Label>
                <Slider
                  value={[selectedComponent.props.effects?.filters?.sepia || 0]}
                  onValueChange={(values) => updateEffect('filters', 'sepia', values[0])}
                  min={0}
                  max={100}
                  step={5}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Filtro Personalizado */}
            <div>
              <Label className="text-[10px] text-muted-foreground">Filtro CSS Personalizado</Label>
              <Input
                value={selectedComponent.props.effects?.filters?.custom || ""}
                onChange={(e) => updateEffect('filters', 'custom', e.target.value)}
                className="h-7 text-xs mt-1"
                placeholder="blur(2px) brightness(1.1) contrast(1.2)"
              />
            </div>
          </div>
        )}
      </div>

      {/* Efectos de Partículas */}
      <div className="p-2.5 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-lg border border-green-500/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Star className="w-3.5 h-3.5 text-green-500" />
            <Label className="text-xs font-medium">Efectos de Partículas</Label>
          </div>
          <Switch
            checked={selectedComponent.props.effects?.particles?.enabled || false}
            onCheckedChange={(checked) => updateEffect('particles', 'enabled', checked)}
          />
        </div>

        {selectedComponent.props.effects?.particles?.enabled && (
          <div className="space-y-2 mt-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-[10px] text-muted-foreground">Tipo</Label>
                <Select
                  value={selectedComponent.props.effects?.particles?.type || "dots"}
                  onValueChange={(value) => updateEffect('particles', 'type', value)}
                >
                  <SelectTrigger className="h-7 text-xs mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dots">Puntos</SelectItem>
                    <SelectItem value="stars">Estrellas</SelectItem>
                    <SelectItem value="bubbles">Burbujas</SelectItem>
                    <SelectItem value="snow">Nieve</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-[10px] text-muted-foreground">
                  Cantidad: {selectedComponent.props.effects?.particles?.count || 50}
                </Label>
                <Slider
                  value={[selectedComponent.props.effects?.particles?.count || 50]}
                  onValueChange={(values) => updateEffect('particles', 'count', values[0])}
                  min={10}
                  max={200}
                  step={10}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-[10px] text-muted-foreground">
                  Velocidad: {selectedComponent.props.effects?.particles?.speed || 1}
                </Label>
                <Slider
                  value={[selectedComponent.props.effects?.particles?.speed || 1]}
                  onValueChange={(values) => updateEffect('particles', 'speed', values[0])}
                  min={0.1}
                  max={5}
                  step={0.1}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-[10px] text-muted-foreground">
                  Tamaño: {selectedComponent.props.effects?.particles?.size || 2}px
                </Label>
                <Slider
                  value={[selectedComponent.props.effects?.particles?.size || 2]}
                  onValueChange={(values) => updateEffect('particles', 'size', values[0])}
                  min={1}
                  max={10}
                  step={0.5}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label className="text-[10px] text-muted-foreground">Color de Partículas</Label>
              <Input
                type="color"
                value={selectedComponent.props.effects?.particles?.color || "#ffffff"}
                onChange={(e) => updateEffect('particles', 'color', e.target.value)}
                className="h-7 w-full p-0.5 mt-1 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      {/* Transformaciones 3D */}
      <Separator />
      <div className="p-2.5 bg-gradient-to-r from-indigo-500/5 to-blue-500/5 rounded-lg border border-indigo-500/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <RotateCw className="w-3.5 h-3.5 text-indigo-500" />
            <Label className="text-xs font-medium">Transformaciones 3D</Label>
          </div>
          <Switch
            checked={selectedComponent.props.effects?.transform3d?.enabled || false}
            onCheckedChange={(checked) => updateEffect('transform3d', 'enabled', checked)}
          />
        </div>

        {selectedComponent.props.effects?.transform3d?.enabled && (
          <div className="space-y-2 mt-2">
            <div className="grid grid-cols-3 gap-1">
              <div>
                <Label className="text-[10px] text-muted-foreground">
                  Rotar X: {selectedComponent.props.effects?.transform3d?.rotateX || 0}°
                </Label>
                <Slider
                  value={[selectedComponent.props.effects?.transform3d?.rotateX || 0]}
                  onValueChange={(values) => updateEffect('transform3d', 'rotateX', values[0])}
                  min={-180}
                  max={180}
                  step={5}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-[10px] text-muted-foreground">
                  Rotar Y: {selectedComponent.props.effects?.transform3d?.rotateY || 0}°
                </Label>
                <Slider
                  value={[selectedComponent.props.effects?.transform3d?.rotateY || 0]}
                  onValueChange={(values) => updateEffect('transform3d', 'rotateY', values[0])}
                  min={-180}
                  max={180}
                  step={5}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-[10px] text-muted-foreground">
                  Rotar Z: {selectedComponent.props.effects?.transform3d?.rotateZ || 0}°
                </Label>
                <Slider
                  value={[selectedComponent.props.effects?.transform3d?.rotateZ || 0]}
                  onValueChange={(values) => updateEffect('transform3d', 'rotateZ', values[0])}
                  min={-180}
                  max={180}
                  step={5}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label className="text-[10px] text-muted-foreground">
                Perspectiva: {selectedComponent.props.effects?.transform3d?.perspective || 1000}px
              </Label>
              <Slider
                value={[selectedComponent.props.effects?.transform3d?.perspective || 1000]}
                onValueChange={(values) => updateEffect('transform3d', 'perspective', values[0])}
                min={100}
                max={2000}
                step={50}
                className="mt-1"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}