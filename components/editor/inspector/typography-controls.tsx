"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Type, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react"

interface TypographyControlsProps {
  selectedComponent: any
  updateProp: (path: string[], value: any) => void
}

export function TypographyControls({ selectedComponent, updateProp }: TypographyControlsProps) {
  return (
    <div className="space-y-4">
      {/* Familia de Fuente */}
      <div className="p-3 bg-gradient-to-br from-emerald-50/80 to-green-50/80 dark:from-emerald-950/30 dark:to-green-950/30 rounded-xl border border-emerald-200/50 dark:border-emerald-800/30">
        <h4 className="text-sm font-semibold mb-3 text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
          <Type className="h-4 w-4" />
          Familia de Fuente
        </h4>
        <Select
          value={selectedComponent.props.fontFamily || "Inter"}
          onValueChange={(value) => updateProp(["fontFamily"], value)}
        >
          <SelectTrigger className="h-9 text-xs bg-white/60 dark:bg-gray-800/60 border-emerald-200 dark:border-emerald-700">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Inter">Inter</SelectItem>
            <SelectItem value="Roboto">Roboto</SelectItem>
            <SelectItem value="Poppins">Poppins</SelectItem>
            <SelectItem value="Montserrat">Montserrat</SelectItem>
            <SelectItem value="Playfair Display">Playfair Display</SelectItem>
            <SelectItem value="JetBrains Mono">JetBrains Mono</SelectItem>
            <SelectItem value="Fira Code">Fira Code</SelectItem>
            <SelectItem value="Source Code Pro">Source Code Pro</SelectItem>
            <SelectItem value="Georgia">Georgia</SelectItem>
            <SelectItem value="Times New Roman">Times New Roman</SelectItem>
            <SelectItem value="Arial">Arial</SelectItem>
            <SelectItem value="Helvetica">Helvetica</SelectItem>
            <SelectItem value="system-ui">System UI</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tamaño y Peso */}
      <div className="p-3 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl border border-blue-200/50 dark:border-blue-800/30">
        <h4 className="text-sm font-semibold mb-3 text-blue-800 dark:text-blue-200">Tamaño y Peso</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs font-medium text-blue-700 dark:text-blue-300">Tamaño: {selectedComponent.props.fontSize || 16}px</Label>
            <Slider
              value={[selectedComponent.props.fontSize || 16]}
              onValueChange={(values) => updateProp(["fontSize"], values[0])}
              min={8}
              max={120}
              step={1}
              className="mt-2"
            />
            <Input
              type="number"
              value={selectedComponent.props.fontSize || 16}
              onChange={(e) => updateProp(["fontSize"], parseInt(e.target.value))}
              className="h-7 text-xs mt-2 bg-white/60 dark:bg-gray-800/60 border-blue-200 dark:border-blue-700"
              min={8}
              max={120}
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-blue-700 dark:text-blue-300">Peso: {selectedComponent.props.fontWeight || 400}</Label>
            <Slider
              value={[selectedComponent.props.fontWeight || 400]}
              onValueChange={(values) => updateProp(["fontWeight"], values[0])}
              min={100}
              max={900}
              step={100}
              className="mt-2"
            />
            <Select
              value={String(selectedComponent.props.fontWeight || 400)}
              onValueChange={(value) => updateProp(["fontWeight"], parseInt(value))}
            >
              <SelectTrigger className="h-7 text-xs mt-2 bg-white/60 dark:bg-gray-800/60 border-blue-200 dark:border-blue-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="100">Thin (100)</SelectItem>
                <SelectItem value="200">Extra Light (200)</SelectItem>
                <SelectItem value="300">Light (300)</SelectItem>
                <SelectItem value="400">Normal (400)</SelectItem>
                <SelectItem value="500">Medium (500)</SelectItem>
                <SelectItem value="600">Semi Bold (600)</SelectItem>
                <SelectItem value="700">Bold (700)</SelectItem>
                <SelectItem value="800">Extra Bold (800)</SelectItem>
                <SelectItem value="900">Black (900)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Estilos de Texto */}
      <div className="p-3 bg-gradient-to-br from-purple-50/80 to-violet-50/80 dark:from-purple-950/30 dark:to-violet-950/30 rounded-xl border border-purple-200/50 dark:border-purple-800/30">
        <h4 className="text-sm font-semibold mb-3 text-purple-800 dark:text-purple-200">Estilos de Texto</h4>
        <div className="flex gap-2">
          <Button
            variant={selectedComponent.props.fontStyle === 'italic' ? "default" : "outline"}
            size="sm"
            onClick={() => updateProp(["fontStyle"], selectedComponent.props.fontStyle === 'italic' ? 'normal' : 'italic')}
            className="h-8 w-8 p-0 border-purple-200 hover:bg-purple-100 dark:border-purple-700 dark:hover:bg-purple-900/50"
          >
            <Italic className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant={selectedComponent.props.fontWeight >= 600 ? "default" : "outline"}
            size="sm"
            onClick={() => updateProp(["fontWeight"], selectedComponent.props.fontWeight >= 600 ? 400 : 700)}
            className="h-8 w-8 p-0 border-purple-200 hover:bg-purple-100 dark:border-purple-700 dark:hover:bg-purple-900/50"
          >
            <Bold className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant={selectedComponent.props.textDecoration === 'underline' ? "default" : "outline"}
            size="sm"
            onClick={() => updateProp(["textDecoration"], selectedComponent.props.textDecoration === 'underline' ? 'none' : 'underline')}
            className="h-8 w-8 p-0 border-purple-200 hover:bg-purple-100 dark:border-purple-700 dark:hover:bg-purple-900/50"
          >
            <Underline className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Espaciado */}
      <div className="p-3 bg-gradient-to-br from-orange-50/80 to-amber-50/80 dark:from-orange-950/30 dark:to-amber-950/30 rounded-xl border border-orange-200/50 dark:border-orange-800/30">
        <h4 className="text-sm font-semibold mb-3 text-orange-800 dark:text-orange-200">Espaciado y Altura</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs font-medium text-orange-700 dark:text-orange-300">Espaciado: {selectedComponent.props.letterSpacing || 0}px</Label>
            <Slider
              value={[selectedComponent.props.letterSpacing || 0]}
              onValueChange={(values) => updateProp(["letterSpacing"], values[0])}
              min={-5}
              max={10}
              step={0.1}
              className="mt-2"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-orange-700 dark:text-orange-300">Altura Línea: {selectedComponent.props.lineHeight || 1.5}</Label>
            <Slider
              value={[selectedComponent.props.lineHeight || 1.5]}
              onValueChange={(values) => updateProp(["lineHeight"], values[0])}
              min={0.5}
              max={4}
              step={0.1}
              className="mt-2"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div>
            <Label className="text-xs font-medium text-orange-700 dark:text-orange-300">Espaciado Palabras: {selectedComponent.props.wordSpacing || 0}px</Label>
            <Slider
              value={[selectedComponent.props.wordSpacing || 0]}
              onValueChange={(values) => updateProp(["wordSpacing"], values[0])}
              min={-10}
              max={20}
              step={1}
              className="mt-2"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-orange-700 dark:text-orange-300">Indentación: {selectedComponent.props.textIndent || 0}px</Label>
            <Slider
              value={[selectedComponent.props.textIndent || 0]}
              onValueChange={(values) => updateProp(["textIndent"], values[0])}
              min={0}
              max={100}
              step={5}
              className="mt-2"
            />
          </div>
        </div>
      </div>

      {/* Alineación */}
      <div className="p-3 bg-gradient-to-br from-teal-50/80 to-cyan-50/80 dark:from-teal-950/30 dark:to-cyan-950/30 rounded-xl border border-teal-200/50 dark:border-teal-800/30">
        <h4 className="text-sm font-semibold mb-3 text-teal-800 dark:text-teal-200">Alineación de Texto</h4>
        <div className="flex gap-2">
          <Button
            variant={selectedComponent.props.textAlign === 'left' ? "default" : "outline"}
            size="sm"
            onClick={() => updateProp(["textAlign"], "left")}
            className="h-8 w-8 p-0 border-teal-200 hover:bg-teal-100 dark:border-teal-700 dark:hover:bg-teal-900/50"
          >
            <AlignLeft className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant={selectedComponent.props.textAlign === 'center' ? "default" : "outline"}
            size="sm"
            onClick={() => updateProp(["textAlign"], "center")}
            className="h-8 w-8 p-0 border-teal-200 hover:bg-teal-100 dark:border-teal-700 dark:hover:bg-teal-900/50"
          >
            <AlignCenter className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant={selectedComponent.props.textAlign === 'right' ? "default" : "outline"}
            size="sm"
            onClick={() => updateProp(["textAlign"], "right")}
            className="h-8 w-8 p-0 border-teal-200 hover:bg-teal-100 dark:border-teal-700 dark:hover:bg-teal-900/50"
          >
            <AlignRight className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant={selectedComponent.props.textAlign === 'justify' ? "default" : "outline"}
            size="sm"
            onClick={() => updateProp(["textAlign"], "justify")}
            className="h-8 w-8 p-0 border-teal-200 hover:bg-teal-100 dark:border-teal-700 dark:hover:bg-teal-900/50"
          >
            <AlignJustify className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Transformación y Decoración */}
      <div className="p-3 bg-gradient-to-br from-rose-50/80 to-pink-50/80 dark:from-rose-950/30 dark:to-pink-950/30 rounded-xl border border-rose-200/50 dark:border-rose-800/30">
        <h4 className="text-sm font-semibold mb-3 text-rose-800 dark:text-rose-200">Transformación y Decoración</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs font-medium text-rose-700 dark:text-rose-300">Transformación</Label>
            <Select
              value={selectedComponent.props.textTransform || "none"}
              onValueChange={(value) => updateProp(["textTransform"], value)}
            >
              <SelectTrigger className="h-8 text-xs mt-1.5 bg-white/60 dark:bg-gray-800/60 border-rose-200 dark:border-rose-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Normal</SelectItem>
                <SelectItem value="uppercase">MAYÚSCULAS</SelectItem>
                <SelectItem value="lowercase">minúsculas</SelectItem>
                <SelectItem value="capitalize">Capitalizar</SelectItem>
                <SelectItem value="full-width">Ancho Completo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs font-medium text-rose-700 dark:text-rose-300">Decoración</Label>
            <Select
              value={selectedComponent.props.textDecoration || "none"}
              onValueChange={(value) => updateProp(["textDecoration"], value)}
            >
              <SelectTrigger className="h-8 text-xs mt-1.5 bg-white/60 dark:bg-gray-800/60 border-rose-200 dark:border-rose-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Ninguna</SelectItem>
                <SelectItem value="underline">Subrayado</SelectItem>
                <SelectItem value="overline">Línea Superior</SelectItem>
                <SelectItem value="line-through">Tachado</SelectItem>
                <SelectItem value="underline overline">Ambas Líneas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Configuraciones Avanzadas */}
      <div className="p-3 bg-gradient-to-br from-slate-50/80 to-gray-50/80 dark:from-slate-950/30 dark:to-gray-950/30 rounded-xl border border-slate-200/50 dark:border-slate-800/30">
        <h4 className="text-sm font-semibold mb-3 text-slate-800 dark:text-slate-200">Configuraciones Avanzadas</h4>
        <div className="space-y-3">
          <div>
            <Label className="text-xs font-medium text-slate-700 dark:text-slate-300">Dirección del Texto</Label>
            <Select
              value={selectedComponent.props.direction || "ltr"}
              onValueChange={(value) => updateProp(["direction"], value)}
            >
              <SelectTrigger className="h-8 text-xs mt-1.5 bg-white/60 dark:bg-gray-800/60 border-slate-200 dark:border-slate-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ltr">Izquierda a Derecha</SelectItem>
                <SelectItem value="rtl">Derecha a Izquierda</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs font-medium text-slate-700 dark:text-slate-300">Modo de Escritura</Label>
            <Select
              value={selectedComponent.props.writingMode || "horizontal-tb"}
              onValueChange={(value) => updateProp(["writingMode"], value)}
            >
              <SelectTrigger className="h-8 text-xs mt-1.5 bg-white/60 dark:bg-gray-800/60 border-slate-200 dark:border-slate-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="horizontal-tb">Horizontal</SelectItem>
                <SelectItem value="vertical-rl">Vertical (Derecha)</SelectItem>
                <SelectItem value="vertical-lr">Vertical (Izquierda)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs font-medium text-slate-700 dark:text-slate-300">Desbordamiento de Texto</Label>
            <Select
              value={selectedComponent.props.textOverflow || "clip"}
              onValueChange={(value) => updateProp(["textOverflow"], value)}
            >
              <SelectTrigger className="h-8 text-xs mt-1.5 bg-white/60 dark:bg-gray-800/60 border-slate-200 dark:border-slate-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clip">Cortar</SelectItem>
                <SelectItem value="ellipsis">Puntos Suspensivos</SelectItem>
                <SelectItem value="fade">Desvanecer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center justify-between p-2 bg-white/40 dark:bg-gray-800/40 rounded-lg">
              <Label className="text-xs font-medium text-slate-700 dark:text-slate-300">Ajuste de Texto</Label>
              <Switch
                checked={selectedComponent.props.whiteSpace !== 'nowrap'}
                onCheckedChange={(checked) => updateProp(["whiteSpace"], checked ? 'normal' : 'nowrap')}
              />
            </div>
            <div className="flex items-center justify-between p-2 bg-white/40 dark:bg-gray-800/40 rounded-lg">
              <Label className="text-xs font-medium text-slate-700 dark:text-slate-300">Selección Usuario</Label>
              <Switch
                checked={selectedComponent.props.userSelect !== 'none'}
                onCheckedChange={(checked) => updateProp(["userSelect"], checked ? 'auto' : 'none')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}