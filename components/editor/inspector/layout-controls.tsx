"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Layout } from "lucide-react"

interface LayoutControlsProps {
  selectedComponent: any
  updateProp: (path: string[], value: any) => void
}

export function LayoutControls({ selectedComponent, updateProp }: LayoutControlsProps) {
  const presetSizes = [
    { label: "Auto", value: "auto" },
    { label: "100%", value: "100%" },
    { label: "50%", value: "50%" },
    { label: "25%", value: "25%" },
    { label: "200px", value: "200px" },
    { label: "100px", value: "100px" }
  ]

  const resetSpacing = (type: 'margin' | 'padding') => {
    updateProp([`${type}Top`], "0")
    updateProp([`${type}Right`], "0")
    updateProp([`${type}Bottom`], "0")
    updateProp([`${type}Left`], "0")
  }

  return (
    <div className="space-y-4">
      {/* Dimensiones */}
      <div className="p-3 bg-gradient-to-br from-purple-50/80 to-violet-50/80 dark:from-purple-950/30 dark:to-violet-950/30 rounded-xl border border-purple-200/50 dark:border-purple-800/30">
        <h4 className="text-sm font-semibold mb-3 text-purple-800 dark:text-purple-200 flex items-center gap-2">
          <Layout className="h-4 w-4" />
          Dimensiones
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs font-medium text-purple-700 dark:text-purple-300">Ancho</Label>
            <div className="flex gap-2 mt-1.5">
              <Input
                value={selectedComponent.props.width || "auto"}
                onChange={(e) => updateProp(["width"], e.target.value)}
                className="h-8 text-xs flex-1 bg-white/60 dark:bg-gray-800/60 border-purple-200 dark:border-purple-700"
                placeholder="auto, 100px, 50%"
              />
              <Select
                value={selectedComponent.props.width || "auto"}
                onValueChange={(value) => updateProp(["width"], value)}
              >
                <SelectTrigger className="h-8 w-20 text-xs border-purple-200 dark:border-purple-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {presetSizes.map(size => (
                    <SelectItem key={size.value} value={size.value}>{size.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="text-xs font-medium text-purple-700 dark:text-purple-300">Alto</Label>
            <div className="flex gap-2 mt-1.5">
              <Input
                value={selectedComponent.props.height || "auto"}
                onChange={(e) => updateProp(["height"], e.target.value)}
                className="h-8 text-xs flex-1 bg-white/60 dark:bg-gray-800/60 border-purple-200 dark:border-purple-700"
                placeholder="auto, 100px, 50%"
              />
              <Select
                value={selectedComponent.props.height || "auto"}
                onValueChange={(value) => updateProp(["height"], value)}
              >
                <SelectTrigger className="h-8 w-20 text-xs border-purple-200 dark:border-purple-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {presetSizes.map(size => (
                    <SelectItem key={size.value} value={size.value}>{size.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Dimensiones Mínimas y Máximas */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div>
            <Label className="text-xs font-medium text-purple-700 dark:text-purple-300">Ancho Mínimo</Label>
            <Input
              value={selectedComponent.props.minWidth || "0"}
              onChange={(e) => updateProp(["minWidth"], e.target.value)}
              className="h-8 text-xs mt-1.5 bg-white/60 dark:bg-gray-800/60 border-purple-200 dark:border-purple-700"
              placeholder="0, 100px"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-purple-700 dark:text-purple-300">Ancho Máximo</Label>
            <Input
              value={selectedComponent.props.maxWidth || "none"}
              onChange={(e) => updateProp(["maxWidth"], e.target.value)}
              className="h-8 text-xs mt-1.5 bg-white/60 dark:bg-gray-800/60 border-purple-200 dark:border-purple-700"
              placeholder="none, 500px"
            />
          </div>
        </div>
      </div>

      {/* Display y Posicionamiento */}
      <div className="p-3 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl border border-blue-200/50 dark:border-blue-800/30">
        <h4 className="text-sm font-semibold mb-3 text-blue-800 dark:text-blue-200">Display y Posición</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs font-medium text-blue-700 dark:text-blue-300">Display</Label>
            <Select
              value={selectedComponent.props.display || "block"}
              onValueChange={(value) => updateProp(["display"], value)}
            >
              <SelectTrigger className="h-8 text-xs mt-1.5 bg-white/60 dark:bg-gray-800/60 border-blue-200 dark:border-blue-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="block">Block</SelectItem>
                <SelectItem value="inline">Inline</SelectItem>
                <SelectItem value="inline-block">Inline Block</SelectItem>
                <SelectItem value="flex">Flex</SelectItem>
                <SelectItem value="inline-flex">Inline Flex</SelectItem>
                <SelectItem value="grid">Grid</SelectItem>
                <SelectItem value="inline-grid">Inline Grid</SelectItem>
                <SelectItem value="table">Table</SelectItem>
                <SelectItem value="table-cell">Table Cell</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs font-medium text-blue-700 dark:text-blue-300">Posición</Label>
            <Select
              value={selectedComponent.props.position || "relative"}
              onValueChange={(value) => updateProp(["position"], value)}
            >
              <SelectTrigger className="h-8 text-xs mt-1.5 bg-white/60 dark:bg-gray-800/60 border-blue-200 dark:border-blue-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="static">Static</SelectItem>
                <SelectItem value="relative">Relative</SelectItem>
                <SelectItem value="absolute">Absolute</SelectItem>
                <SelectItem value="fixed">Fixed</SelectItem>
                <SelectItem value="sticky">Sticky</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Margin */}
      <div className="p-3 bg-gradient-to-br from-emerald-50/80 to-green-50/80 dark:from-emerald-950/30 dark:to-green-950/30 rounded-xl border border-emerald-200/50 dark:border-emerald-800/30">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">Margin</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => resetSpacing('margin')}
            className="h-6 px-2 text-xs hover:bg-emerald-100 dark:hover:bg-emerald-900/50"
          >
            Reset
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div>
            <Label className="text-[10px] text-emerald-700 dark:text-emerald-300">Top</Label>
            <Input
              value={selectedComponent.props.marginTop || "0"}
              onChange={(e) => updateProp(["marginTop"], e.target.value)}
              className="h-7 text-xs mt-1 bg-white/60 dark:bg-gray-800/60 border-emerald-200 dark:border-emerald-700"
              placeholder="0"
            />
          </div>
          <div>
            <Label className="text-[10px] text-emerald-700 dark:text-emerald-300">Right</Label>
            <Input
              value={selectedComponent.props.marginRight || "0"}
              onChange={(e) => updateProp(["marginRight"], e.target.value)}
              className="h-7 text-xs mt-1 bg-white/60 dark:bg-gray-800/60 border-emerald-200 dark:border-emerald-700"
              placeholder="0"
            />
          </div>
          <div>
            <Label className="text-[10px] text-emerald-700 dark:text-emerald-300">Bottom</Label>
            <Input
              value={selectedComponent.props.marginBottom || "0"}
              onChange={(e) => updateProp(["marginBottom"], e.target.value)}
              className="h-7 text-xs mt-1 bg-white/60 dark:bg-gray-800/60 border-emerald-200 dark:border-emerald-700"
              placeholder="0"
            />
          </div>
          <div>
            <Label className="text-[10px] text-emerald-700 dark:text-emerald-300">Left</Label>
            <Input
              value={selectedComponent.props.marginLeft || "0"}
              onChange={(e) => updateProp(["marginLeft"], e.target.value)}
              className="h-7 text-xs mt-1 bg-white/60 dark:bg-gray-800/60 border-emerald-200 dark:border-emerald-700"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Padding */}
      <div className="p-3 bg-gradient-to-br from-orange-50/80 to-amber-50/80 dark:from-orange-950/30 dark:to-amber-950/30 rounded-xl border border-orange-200/50 dark:border-orange-800/30">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-orange-800 dark:text-orange-200">Padding</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => resetSpacing('padding')}
            className="h-6 px-2 text-xs hover:bg-orange-100 dark:hover:bg-orange-900/50"
          >
            Reset
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div>
            <Label className="text-[10px] text-orange-700 dark:text-orange-300">Top</Label>
            <Input
              value={selectedComponent.props.paddingTop || "0"}
              onChange={(e) => updateProp(["paddingTop"], e.target.value)}
              className="h-7 text-xs mt-1 bg-white/60 dark:bg-gray-800/60 border-orange-200 dark:border-orange-700"
              placeholder="0"
            />
          </div>
          <div>
            <Label className="text-[10px] text-orange-700 dark:text-orange-300">Right</Label>
            <Input
              value={selectedComponent.props.paddingRight || "0"}
              onChange={(e) => updateProp(["paddingRight"], e.target.value)}
              className="h-7 text-xs mt-1 bg-white/60 dark:bg-gray-800/60 border-orange-200 dark:border-orange-700"
              placeholder="0"
            />
          </div>
          <div>
            <Label className="text-[10px] text-orange-700 dark:text-orange-300">Bottom</Label>
            <Input
              value={selectedComponent.props.paddingBottom || "0"}
              onChange={(e) => updateProp(["paddingBottom"], e.target.value)}
              className="h-7 text-xs mt-1 bg-white/60 dark:bg-gray-800/60 border-orange-200 dark:border-orange-700"
              placeholder="0"
            />
          </div>
          <div>
            <Label className="text-[10px] text-orange-700 dark:text-orange-300">Left</Label>
            <Input
              value={selectedComponent.props.paddingLeft || "0"}
              onChange={(e) => updateProp(["paddingLeft"], e.target.value)}
              className="h-7 text-xs mt-1 bg-white/60 dark:bg-gray-800/60 border-orange-200 dark:border-orange-700"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Flexbox Controls */}
      {selectedComponent.props.display === 'flex' && (
        <div className="p-3 bg-gradient-to-br from-cyan-50/80 to-sky-50/80 dark:from-cyan-950/30 dark:to-sky-950/30 rounded-xl border border-cyan-200/50 dark:border-cyan-800/30">
          <h4 className="text-sm font-semibold mb-3 text-cyan-800 dark:text-cyan-200">Flexbox</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-medium text-cyan-700 dark:text-cyan-300">Dirección</Label>
              <Select
                value={selectedComponent.props.flexDirection || "row"}
                onValueChange={(value) => updateProp(["flexDirection"], value)}
              >
                <SelectTrigger className="h-8 text-xs mt-1.5 bg-white/60 dark:bg-gray-800/60 border-cyan-200 dark:border-cyan-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="row">Fila</SelectItem>
                  <SelectItem value="row-reverse">Fila Inversa</SelectItem>
                  <SelectItem value="column">Columna</SelectItem>
                  <SelectItem value="column-reverse">Columna Inversa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs font-medium text-cyan-700 dark:text-cyan-300">Justificar</Label>
              <Select
                value={selectedComponent.props.justifyContent || "flex-start"}
                onValueChange={(value) => updateProp(["justifyContent"], value)}
              >
                <SelectTrigger className="h-8 text-xs mt-1.5 bg-white/60 dark:bg-gray-800/60 border-cyan-200 dark:border-cyan-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flex-start">Inicio</SelectItem>
                  <SelectItem value="flex-end">Final</SelectItem>
                  <SelectItem value="center">Centro</SelectItem>
                  <SelectItem value="space-between">Espacio Entre</SelectItem>
                  <SelectItem value="space-around">Espacio Alrededor</SelectItem>
                  <SelectItem value="space-evenly">Espacio Uniforme</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}