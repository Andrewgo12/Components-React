"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Eye, EyeOff, Image as ImageIcon, Link } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface AdvancedEditorProps {
  component: any
  isOpen: boolean
  onClose: () => void
  onUpdate: (componentId: string, updates: any) => void
}

export function AdvancedEditor({ component, isOpen, onClose, onUpdate }: AdvancedEditorProps) {
  const [editedComponent, setEditedComponent] = useState(component)
  const [activeTab, setActiveTab] = useState("content")

  useEffect(() => {
    setEditedComponent(component)
  }, [component])

  if (!component) return null

  const handleSave = () => {
    onUpdate(component.id, editedComponent)
    onClose()
  }

  const updateProp = (path: string, value: any) => {
    setEditedComponent((prev: any) => {
      const newComponent = { ...prev }
      const keys = path.split('.')
      let current: any = newComponent

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i]
        if (key && !current[key]) {
          current[key] = {}
        }
        if (key) {
          current = current[key]
        }
      }

      const lastKey = keys[keys.length - 1]
      if (lastKey) {
        current[lastKey] = value
      }
      return newComponent
    })
  }

  const getProp = (path: string, defaultValue: any = '') => {
    const keys = path.split('.')
    let current = editedComponent

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key]
      } else {
        return defaultValue
      }
    }

    return current ?? defaultValue
  }

  const addInternalElement = (type: string) => {
    const newElement = {
      id: `${type}-${Date.now()}`,
      type,
      text: `Nuevo ${type}`,
      content: `Contenido de ${type}`,
      visible: true
    }

    const children = getProp('props.children', [])
    const newChildren = Array.isArray(children) ? [...children, newElement] : [newElement]
    updateProp('props.children', newChildren)
  }

  const removeInternalElement = (index: number) => {
    const children = getProp('props.children', [])
    if (Array.isArray(children)) {
      const newChildren = children.filter((_: any, i: number) => i !== index)
      updateProp('props.children', newChildren)
    }
  }

  const updateInternalElement = (index: number, updates: any) => {
    const children = getProp('props.children', [])
    if (Array.isArray(children)) {
      const newChildren = [...children]
      newChildren[index] = { ...newChildren[index], ...updates }
      updateProp('props.children', newChildren)
    }
  }

  const renderContentTab = () => (
    <div className="space-y-4">
      {/* Nombre del componente */}
      <div>
        <Label className="text-xs font-semibold mb-1.5 block">Nombre del componente</Label>
        <Input
          value={getProp('name', '')}
          onChange={(e) => updateProp('name', e.target.value)}
          placeholder="Nombre del componente"
          className="h-9"
        />
      </div>

      <Separator />

      {/* Texto principal - SIEMPRE VISIBLE */}
      <div>
        <Label className="text-xs font-semibold mb-1.5 block">📝 Texto Principal</Label>
        <Textarea
          value={getProp('props.text', '')}
          onChange={(e) => updateProp('props.text', e.target.value)}
          placeholder="Escribe el texto del componente..."
          rows={3}
          className="resize-none"
        />
      </div>

      {/* Título - SIEMPRE VISIBLE */}
      <div>
        <Label className="text-xs font-semibold mb-1.5 block">🏷️ Título</Label>
        <Input
          value={getProp('props.title', '')}
          onChange={(e) => updateProp('props.title', e.target.value)}
          placeholder="Título del componente"
          className="h-9"
        />
      </div>

      {/* Descripción - SIEMPRE VISIBLE */}
      <div>
        <Label className="text-xs font-semibold mb-1.5 block">📄 Descripción</Label>
        <Textarea
          value={getProp('props.description', '')}
          onChange={(e) => updateProp('props.description', e.target.value)}
          placeholder="Descripción detallada..."
          rows={4}
          className="resize-none"
        />
      </div>

      {/* Contenido - SIEMPRE VISIBLE */}
      <div>
        <Label className="text-xs font-semibold mb-1.5 block">📋 Contenido</Label>
        <Textarea
          value={getProp('props.content', '')}
          onChange={(e) => updateProp('props.content', e.target.value)}
          placeholder="Contenido adicional del componente..."
          rows={4}
          className="resize-none"
        />
      </div>

      {/* Placeholder */}
      <div>
        <Label className="text-xs font-semibold mb-1.5 block">💬 Placeholder</Label>
        <Input
          value={getProp('props.placeholder', '')}
          onChange={(e) => updateProp('props.placeholder', e.target.value)}
          placeholder="Texto de placeholder"
          className="h-9"
        />
      </div>

      {/* Label */}
      <div>
        <Label className="text-xs font-semibold mb-1.5 block">🔖 Etiqueta (Label)</Label>
        <Input
          value={getProp('props.label', '')}
          onChange={(e) => updateProp('props.label', e.target.value)}
          placeholder="Etiqueta del componente"
          className="h-9"
        />
      </div>

      {/* Badge Text */}
      <div>
        <Label className="text-xs font-semibold mb-1.5 block">🏅 Texto de Badge</Label>
        <Input
          value={getProp('props.badgeText', '')}
          onChange={(e) => updateProp('props.badgeText', e.target.value)}
          placeholder="Texto para badge"
          className="h-9"
        />
      </div>

      {/* Price */}
      <div>
        <Label className="text-xs font-semibold mb-1.5 block">💰 Precio</Label>
        <Input
          value={getProp('props.price', '')}
          onChange={(e) => updateProp('props.price', e.target.value)}
          placeholder="$99"
          className="h-9"
        />
      </div>

      {/* Count/Number */}
      <div>
        <Label className="text-xs font-semibold mb-1.5 block">🔢 Número/Contador</Label>
        <Input
          value={getProp('props.count', '') || getProp('props.number', '')}
          onChange={(e) => {
            updateProp('props.count', e.target.value)
            updateProp('props.number', e.target.value)
          }}
          placeholder="123"
          className="h-9"
        />
      </div>

      {/* Initials */}
      <div>
        <Label className="text-xs font-semibold mb-1.5 block">👤 Iniciales</Label>
        <Input
          value={getProp('props.initials', '')}
          onChange={(e) => updateProp('props.initials', e.target.value)}
          placeholder="AB"
          className="h-9"
          maxLength={3}
        />
      </div>

      {/* Helper Text */}
      <div>
        <Label className="text-xs font-semibold mb-1.5 block">ℹ️ Texto de Ayuda</Label>
        <Input
          value={getProp('props.helperText', '')}
          onChange={(e) => updateProp('props.helperText', e.target.value)}
          placeholder="Texto de ayuda o sugerencia"
          className="h-9"
        />
      </div>

      {/* Element ID */}
      <div>
        <Label className="text-xs font-semibold mb-1.5 block">🆔 ID del Elemento</Label>
        <Input
          value={getProp('props.elementId', '')}
          onChange={(e) => updateProp('props.elementId', e.target.value)}
          placeholder="id-unico"
          className="h-9 font-mono"
        />
      </div>
    </div>
  )

  const renderStyleTab = () => (
    <div className="space-y-4">
      {/* Colores */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Colores</h3>
        
        {/* Background Color */}
        <div className="flex items-center gap-3">
          <Label className="w-32 text-xs">Fondo</Label>
          <Input
            type="color"
            value={getProp('props.backgroundColor', '#ffffff')}
            onChange={(e) => updateProp('props.backgroundColor', e.target.value)}
            className="w-16 h-8"
          />
          <Input
            value={getProp('props.backgroundColor', '#ffffff')}
            onChange={(e) => updateProp('props.backgroundColor', e.target.value)}
            className="flex-1 h-8 text-xs"
          />
        </div>

        {/* Text Color */}
        <div className="flex items-center gap-3">
          <Label className="w-32 text-xs">Texto</Label>
          <Input
            type="color"
            value={getProp('props.color', '#000000')}
            onChange={(e) => updateProp('props.color', e.target.value)}
            className="w-16 h-8"
          />
          <Input
            value={getProp('props.color', '#000000')}
            onChange={(e) => updateProp('props.color', e.target.value)}
            className="flex-1 h-8 text-xs"
          />
        </div>

        {/* Border Color */}
        <div className="flex items-center gap-3">
          <Label className="w-32 text-xs">Borde</Label>
          <Input
            type="color"
            value={getProp('props.borderColor', '#e5e7eb')}
            onChange={(e) => updateProp('props.borderColor', e.target.value)}
            className="w-16 h-8"
          />
          <Input
            value={getProp('props.borderColor', '#e5e7eb')}
            onChange={(e) => updateProp('props.borderColor', e.target.value)}
            className="flex-1 h-8 text-xs"
          />
        </div>

        {/* Hover Background Color */}
        <div className="flex items-center gap-3">
          <Label className="w-32 text-xs">Hover Fondo</Label>
          <Input
            type="color"
            value={getProp('props.hoverBackgroundColor', '#f3f4f6')}
            onChange={(e) => updateProp('props.hoverBackgroundColor', e.target.value)}
            className="w-16 h-8"
          />
          <Input
            value={getProp('props.hoverBackgroundColor', '#f3f4f6')}
            onChange={(e) => updateProp('props.hoverBackgroundColor', e.target.value)}
            className="flex-1 h-8 text-xs"
          />
        </div>
      </div>

      <Separator />

      {/* Tipografía */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Tipografía</h3>

        {/* Font Size */}
        <div className="flex items-center gap-3">
          <Label className="w-32 text-xs">Tamaño</Label>
          <Input
            type="range"
            min="8"
            max="72"
            value={getProp('props.fontSize', 16)}
            onChange={(e) => updateProp('props.fontSize', parseInt(e.target.value))}
            className="flex-1"
          />
          <Input
            type="number"
            value={getProp('props.fontSize', 16)}
            onChange={(e) => updateProp('props.fontSize', parseInt(e.target.value))}
            className="w-16 h-8 text-xs"
          />
          <span className="text-xs">px</span>
        </div>

        {/* Font Weight */}
        <div className="flex items-center gap-3">
          <Label className="w-32 text-xs">Peso</Label>
          <Select
            value={getProp('props.fontWeight', '400')}
            onValueChange={(value) => updateProp('props.fontWeight', value)}
          >
            <SelectTrigger className="flex-1 h-8 text-xs">
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

        {/* Font Family */}
        <div className="flex items-center gap-3">
          <Label className="w-32 text-xs">Fuente</Label>
          <Select
            value={getProp('props.fontFamily', 'Inter, system-ui, sans-serif')}
            onValueChange={(value) => updateProp('props.fontFamily', value)}
          >
            <SelectTrigger className="flex-1 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Inter, system-ui, sans-serif">Inter</SelectItem>
              <SelectItem value="'Roboto', sans-serif">Roboto</SelectItem>
              <SelectItem value="'Open Sans', sans-serif">Open Sans</SelectItem>
              <SelectItem value="'Montserrat', sans-serif">Montserrat</SelectItem>
              <SelectItem value="'Poppins', sans-serif">Poppins</SelectItem>
              <SelectItem value="'Playfair Display', serif">Playfair Display</SelectItem>
              <SelectItem value="'Georgia', serif">Georgia</SelectItem>
              <SelectItem value="'Courier New', monospace">Courier New</SelectItem>
              <SelectItem value="'Monaco', monospace">Monaco</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Letter Spacing */}
        <div className="flex items-center gap-3">
          <Label className="w-32 text-xs">Espaciado</Label>
          <Input
            type="range"
            min="-2"
            max="10"
            step="0.5"
            value={getProp('props.letterSpacing', 0)}
            onChange={(e) => updateProp('props.letterSpacing', parseFloat(e.target.value))}
            className="flex-1"
          />
          <Input
            type="number"
            value={getProp('props.letterSpacing', 0)}
            onChange={(e) => updateProp('props.letterSpacing', parseFloat(e.target.value))}
            className="w-16 h-8 text-xs"
          />
          <span className="text-xs">px</span>
        </div>

        {/* Line Height */}
        <div className="flex items-center gap-3">
          <Label className="w-32 text-xs">Altura línea</Label>
          <Input
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={getProp('props.lineHeight', 1.5)}
            onChange={(e) => updateProp('props.lineHeight', parseFloat(e.target.value))}
            className="flex-1"
          />
          <span className="text-xs w-12">{getProp('props.lineHeight', 1.5)}</span>
        </div>

        {/* Text Align */}
        <div className="flex items-center gap-3">
          <Label className="w-32 text-xs">Alineación</Label>
          <Select
            value={getProp('props.textAlign', 'left')}
            onValueChange={(value) => updateProp('props.textAlign', value)}
          >
            <SelectTrigger className="flex-1 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Izquierda</SelectItem>
              <SelectItem value="center">Centro</SelectItem>
              <SelectItem value="right">Derecha</SelectItem>
              <SelectItem value="justify">Justificado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Text Transform */}
        <div className="flex items-center gap-3">
          <Label className="w-32 text-xs">Transformar</Label>
          <Select
            value={getProp('props.textTransform', 'none')}
            onValueChange={(value) => updateProp('props.textTransform', value)}
          >
            <SelectTrigger className="flex-1 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Normal</SelectItem>
              <SelectItem value="uppercase">MAYÚSCULAS</SelectItem>
              <SelectItem value="lowercase">minúsculas</SelectItem>
              <SelectItem value="capitalize">Capitalizar</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Text Decoration */}
        <div className="flex items-center gap-3">
          <Label className="w-32 text-xs">Decoración</Label>
          <Select
            value={getProp('props.textDecoration', 'none')}
            onValueChange={(value) => updateProp('props.textDecoration', value)}
          >
            <SelectTrigger className="flex-1 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Ninguna</SelectItem>
              <SelectItem value="underline">Subrayado</SelectItem>
              <SelectItem value="line-through">Tachado</SelectItem>
              <SelectItem value="overline">Sobre línea</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Font Style */}
        <div className="flex items-center gap-3">
          <Label className="w-32 text-xs">Estilo</Label>
          <Select
            value={getProp('props.fontStyle', 'normal')}
            onValueChange={(value) => updateProp('props.fontStyle', value)}
          >
            <SelectTrigger className="flex-1 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="italic">Itálica</SelectItem>
              <SelectItem value="oblique">Oblicua</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* Sombras */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Sombras y Efectos</h3>

        {/* Shadow */}
        <div className="flex items-center gap-3">
          <Label className="w-32 text-xs">Sombra</Label>
          <Switch
            checked={getProp('props.shadow', false)}
            onCheckedChange={(checked) => updateProp('props.shadow', checked)}
          />
        </div>

        {/* Scale */}
        <div className="flex items-center gap-3">
          <Label className="w-32 text-xs">Escala</Label>
          <Input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={getProp('props.scale', 1)}
            onChange={(e) => updateProp('props.scale', parseFloat(e.target.value))}
            className="flex-1"
          />
          <span className="text-xs w-12">{getProp('props.scale', 1)}</span>
        </div>

        {/* Hover Scale */}
        <div className="flex items-center gap-3">
          <Label className="w-32 text-xs">Hover Escala</Label>
          <Input
            type="range"
            min="0.8"
            max="1.5"
            step="0.05"
            value={getProp('props.hoverScale', 1)}
            onChange={(e) => updateProp('props.hoverScale', parseFloat(e.target.value))}
            className="flex-1"
          />
          <span className="text-xs w-12">{getProp('props.hoverScale', 1)}</span>
        </div>
      </div>
    </div>
  )

  const renderElementsTab = () => {
    const children = getProp('props.children', [])
    const childrenArray = Array.isArray(children) ? children : []

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">🧩 Elementos Internos</h3>
          <Button
            size="sm"
            onClick={() => addInternalElement('text')}
            className="h-8"
          >
            <Plus className="h-4 w-4 mr-1" />
            Agregar
          </Button>
        </div>

        {childrenArray.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <div className="text-muted-foreground text-sm mb-3">
              No hay elementos internos
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => addInternalElement('text')}
            >
              <Plus className="h-4 w-4 mr-1" />
              Crear primer elemento
            </Button>
          </div>
        ) : (
          <ScrollArea className="h-[450px]">
            <div className="space-y-3">
              {childrenArray.map((child: any, index: number) => (
                <div key={index} className="border rounded-xl p-4 space-y-3 bg-card hover:border-primary/50 transition-colors">
                  {/* Header del elemento */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="font-mono text-xs">
                        {child.type || 'elemento'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">#{index + 1}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateInternalElement(index, { visible: !child.visible })}
                        className="h-7 w-7 p-0"
                        title={child.visible !== false ? 'Ocultar' : 'Mostrar'}
                      >
                        {child.visible !== false ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeInternalElement(index)}
                        className="h-7 w-7 p-0 text-red-600 hover:text-red-700"
                        title="Eliminar"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Propiedades del elemento */}
                  <div className="space-y-3 pl-2 border-l-2 border-primary/20">
                    {/* Tipo de elemento */}
                    <div>
                      <Label className="text-xs font-semibold mb-1.5 block">Tipo de Elemento</Label>
                      <Select
                        value={child.type || 'text'}
                        onValueChange={(value) => updateInternalElement(index, { type: value })}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">📄 Texto</SelectItem>
                          <SelectItem value="button">🔘 Botón</SelectItem>
                          <SelectItem value="badge">🏷️ Badge</SelectItem>
                          <SelectItem value="icon">⭐ Icono</SelectItem>
                          <SelectItem value="image">🖼️ Imagen</SelectItem>
                          <SelectItem value="link">🔗 Enlace</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Contenido de texto */}
                    <div>
                      <Label className="text-xs font-semibold mb-1.5 block">Contenido</Label>
                      <Textarea
                        value={child.text || child.content || ''}
                        onChange={(e) => updateInternalElement(index, { text: e.target.value, content: e.target.value })}
                        className="h-20 text-xs resize-none"
                        placeholder="Escribe el contenido aquí..."
                      />
                    </div>

                    {/* Estilos del elemento */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs font-semibold mb-1.5 block">Color de Fondo</Label>
                        <div className="flex gap-1">
                          <Input
                            type="color"
                            value={child.backgroundColor || '#ffffff'}
                            onChange={(e) => updateInternalElement(index, { backgroundColor: e.target.value })}
                            className="w-12 h-7 p-0"
                          />
                          <Input
                            value={child.backgroundColor || '#ffffff'}
                            onChange={(e) => updateInternalElement(index, { backgroundColor: e.target.value })}
                            className="flex-1 h-7 text-xs"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs font-semibold mb-1.5 block">Color de Texto</Label>
                        <div className="flex gap-1">
                          <Input
                            type="color"
                            value={child.color || '#000000'}
                            onChange={(e) => updateInternalElement(index, { color: e.target.value })}
                            className="w-12 h-7 p-0"
                          />
                          <Input
                            value={child.color || '#000000'}
                            onChange={(e) => updateInternalElement(index, { color: e.target.value })}
                            className="flex-1 h-7 text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Tamaño de fuente */}
                    <div>
                      <Label className="text-xs font-semibold mb-1.5 block">Tamaño de Fuente</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="range"
                          min="8"
                          max="48"
                          value={child.fontSize || 14}
                          onChange={(e) => updateInternalElement(index, { fontSize: parseInt(e.target.value) })}
                          className="flex-1 h-6"
                        />
                        <Input
                          type="number"
                          value={child.fontSize || 14}
                          onChange={(e) => updateInternalElement(index, { fontSize: parseInt(e.target.value) })}
                          className="w-16 h-7 text-xs"
                        />
                        <span className="text-xs">px</span>
                      </div>
                    </div>

                    {/* Posicionamiento */}
                    <div>
                      <Label className="text-xs font-semibold mb-1.5 block">Alineación</Label>
                      <Select
                        value={child.align || 'left'}
                        onValueChange={(value) => updateInternalElement(index, { align: value })}
                      >
                        <SelectTrigger className="h-7 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">⬅️ Izquierda</SelectItem>
                          <SelectItem value="center">↔️ Centro</SelectItem>
                          <SelectItem value="right">➡️ Derecha</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Espaciado */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs font-semibold mb-1.5 block">Padding</Label>
                        <Input
                          type="number"
                          value={child.padding || 0}
                          onChange={(e) => updateInternalElement(index, { padding: parseInt(e.target.value) })}
                          className="h-7 text-xs"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-semibold mb-1.5 block">Margin</Label>
                        <Input
                          type="number"
                          value={child.margin || 0}
                          onChange={(e) => updateInternalElement(index, { margin: parseInt(e.target.value) })}
                          className="h-7 text-xs"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    {/* Border Radius */}
                    <div>
                      <Label className="text-xs font-semibold mb-1.5 block">Border Radius</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="range"
                          min="0"
                          max="50"
                          value={child.borderRadius || 0}
                          onChange={(e) => updateInternalElement(index, { borderRadius: parseInt(e.target.value) })}
                          className="flex-1 h-6"
                        />
                        <span className="text-xs w-12">{child.borderRadius || 0}px</span>
                      </div>
                    </div>

                    {/* Peso de fuente */}
                    <div>
                      <Label className="text-xs font-semibold mb-1.5 block">Peso de Fuente</Label>
                      <Select
                        value={child.fontWeight?.toString() || '400'}
                        onValueChange={(value) => updateInternalElement(index, { fontWeight: value })}
                      >
                        <SelectTrigger className="h-7 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="300">Light (300)</SelectItem>
                          <SelectItem value="400">Normal (400)</SelectItem>
                          <SelectItem value="500">Medium (500)</SelectItem>
                          <SelectItem value="600">Semi Bold (600)</SelectItem>
                          <SelectItem value="700">Bold (700)</SelectItem>
                          <SelectItem value="800">Extra Bold (800)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    )
  }

  const renderAdvancedTab = () => (
    <ScrollArea className="h-[500px]">
      <div className="space-y-4 pr-4">
        {/* Efectos Visuales */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm">Efectos Visuales</h3>

          {/* Glow Effect */}
          <div className="space-y-2 p-3 border rounded-lg bg-card">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold">Efecto Glow</Label>
              <Switch
                checked={getProp('effects.glow.enabled', false)}
                onCheckedChange={(checked) => updateProp('effects.glow.enabled', checked)}
              />
            </div>
            {getProp('effects.glow.enabled', false) && (
              <div className="space-y-2 pl-2">
                <div className="flex items-center gap-2">
                  <Label className="w-20 text-xs">Intensidad</Label>
                  <Input
                    type="range"
                    min="0"
                    max="100"
                    value={getProp('effects.glow.intensity', 50)}
                    onChange={(e) => updateProp('effects.glow.intensity', parseInt(e.target.value))}
                    className="flex-1 h-6"
                  />
                  <span className="text-xs w-10">{getProp('effects.glow.intensity', 50)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="w-20 text-xs">Color</Label>
                  <Input
                    type="color"
                    value={getProp('effects.glow.color', '#3b82f6')}
                    onChange={(e) => updateProp('effects.glow.color', e.target.value)}
                    className="w-14 h-7"
                  />
                  <Input
                    value={getProp('effects.glow.color', '#3b82f6')}
                    onChange={(e) => updateProp('effects.glow.color', e.target.value)}
                    className="flex-1 h-7 text-xs"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label className="w-20 text-xs">Blur</Label>
                  <Input
                    type="range"
                    min="0"
                    max="50"
                    value={getProp('effects.glow.blur', 10)}
                    onChange={(e) => updateProp('effects.glow.blur', parseInt(e.target.value))}
                    className="flex-1 h-6"
                  />
                  <span className="text-xs w-10">{getProp('effects.glow.blur', 10)}px</span>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="w-20 text-xs">Spread</Label>
                  <Input
                    type="range"
                    min="0"
                    max="30"
                    value={getProp('effects.glow.spread', 0)}
                    onChange={(e) => updateProp('effects.glow.spread', parseInt(e.target.value))}
                    className="flex-1 h-6"
                  />
                  <span className="text-xs w-10">{getProp('effects.glow.spread', 0)}px</span>
                </div>
              </div>
            )}
          </div>
          {/* Shimmer Effect */}
          <div className="space-y-2 p-3 border rounded-lg bg-card">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold">Efecto Shimmer</Label>
              <Switch
                checked={getProp('effects.shimmer.enabled', false)}
                onCheckedChange={(checked) => updateProp('effects.shimmer.enabled', checked)}
              />
            </div>
            {getProp('effects.shimmer.enabled', false) && (
              <div className="space-y-2 pl-2">
                <div className="flex items-center gap-2">
                  <Label className="w-20 text-xs">Velocidad</Label>
                  <Input
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.5"
                    value={getProp('effects.shimmer.speed', 2)}
                    onChange={(e) => updateProp('effects.shimmer.speed', parseFloat(e.target.value))}
                    className="flex-1 h-6"
                  />
                  <span className="text-xs w-10">{getProp('effects.shimmer.speed', 2)}s</span>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="w-20 text-xs">Ancho</Label>
                  <Input
                    type="range"
                    min="10"
                    max="100"
                    value={getProp('effects.shimmer.width', 50)}
                    onChange={(e) => updateProp('effects.shimmer.width', parseInt(e.target.value))}
                    className="flex-1 h-6"
                  />
                  <span className="text-xs w-10">{getProp('effects.shimmer.width', 50)}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="w-20 text-xs">Ángulo</Label>
                  <Input
                    type="range"
                    min="0"
                    max="90"
                    value={getProp('effects.shimmer.angle', 45)}
                    onChange={(e) => updateProp('effects.shimmer.angle', parseInt(e.target.value))}
                    className="flex-1 h-6"
                  />
                  <span className="text-xs w-10">{getProp('effects.shimmer.angle', 45)}°</span>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="w-20 text-xs">Color</Label>
                  <Input
                    type="color"
                    value={getProp('effects.shimmer.color', '#ffffff')}
                    onChange={(e) => updateProp('effects.shimmer.color', e.target.value)}
                    className="w-14 h-7"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Gradient Effect */}
          <div className="space-y-2 p-3 border rounded-lg bg-card">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold">Efecto Gradiente</Label>
              <Switch
                checked={getProp('effects.gradient.enabled', false)}
                onCheckedChange={(checked) => updateProp('effects.gradient.enabled', checked)}
              />
            </div>
            {getProp('effects.gradient.enabled', false) && (
              <div className="space-y-2 pl-2">
                <div className="flex items-center gap-2">
                  <Label className="w-20 text-xs">Tipo</Label>
                  <Select
                    value={getProp('effects.gradient.type', 'linear')}
                    onValueChange={(value) => updateProp('effects.gradient.type', value)}
                  >
                    <SelectTrigger className="flex-1 h-7 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="linear">Lineal</SelectItem>
                      <SelectItem value="radial">Radial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="w-20 text-xs">Dirección</Label>
                  <Input
                    type="range"
                    min="0"
                    max="360"
                    value={getProp('effects.gradient.direction', 45)}
                    onChange={(e) => updateProp('effects.gradient.direction', parseInt(e.target.value))}
                    className="flex-1 h-6"
                  />
                  <span className="text-xs w-10">{getProp('effects.gradient.direction', 45)}°</span>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="w-20 text-xs">Color 1</Label>
                  <Input
                    type="color"
                    value={getProp('effects.gradient.color1', '#3b82f6')}
                    onChange={(e) => updateProp('effects.gradient.color1', e.target.value)}
                    className="w-14 h-7"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label className="w-20 text-xs">Color 2</Label>
                  <Input
                    type="color"
                    value={getProp('effects.gradient.color2', '#8b5cf6')}
                    onChange={(e) => updateProp('effects.gradient.color2', e.target.value)}
                    className="w-14 h-7"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label className="w-20 text-xs">Color 3</Label>
                  <Input
                    type="color"
                    value={getProp('effects.gradient.color3', '#ec4899')}
                    onChange={(e) => updateProp('effects.gradient.color3', e.target.value)}
                    className="w-14 h-7"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label className="w-20 text-xs">Velocidad</Label>
                  <Input
                    type="range"
                    min="1"
                    max="10"
                    value={getProp('effects.gradient.speed', 3)}
                    onChange={(e) => updateProp('effects.gradient.speed', parseInt(e.target.value))}
                    className="flex-1 h-6"
                  />
                  <span className="text-xs w-10">{getProp('effects.gradient.speed', 3)}s</span>
                </div>
              </div>
            )}
          </div>
          {/* Particles Effect */}
          <div className="space-y-2 p-3 border rounded-lg bg-card">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold">Efecto Partículas</Label>
              <Switch
                checked={getProp('effects.particles.enabled', false)}
                onCheckedChange={(checked) => updateProp('effects.particles.enabled', checked)}
              />
            </div>
            {getProp('effects.particles.enabled', false) && (
              <div className="space-y-2 pl-2">
                <div className="flex items-center gap-2">
                  <Label className="w-20 text-xs">Cantidad</Label>
                  <Input
                    type="range"
                    min="5"
                    max="50"
                    value={getProp('effects.particles.count', 20)}
                    onChange={(e) => updateProp('effects.particles.count', parseInt(e.target.value))}
                    className="flex-1 h-6"
                  />
                  <span className="text-xs w-10">{getProp('effects.particles.count', 20)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="w-20 text-xs">Tamaño</Label>
                  <Input
                    type="range"
                    min="1"
                    max="10"
                    value={getProp('effects.particles.size', 2)}
                    onChange={(e) => updateProp('effects.particles.size', parseInt(e.target.value))}
                    className="flex-1 h-6"
                  />
                  <span className="text-xs w-10">{getProp('effects.particles.size', 2)}px</span>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="w-20 text-xs">Velocidad</Label>
                  <Input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.5"
                    value={getProp('effects.particles.speed', 1)}
                    onChange={(e) => updateProp('effects.particles.speed', parseFloat(e.target.value))}
                    className="flex-1 h-6"
                  />
                  <span className="text-xs w-10">{getProp('effects.particles.speed', 1)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="w-20 text-xs">Color</Label>
                  <Input
                    type="color"
                    value={getProp('effects.particles.color', '#ffffff')}
                    onChange={(e) => updateProp('effects.particles.color', e.target.value)}
                    className="w-14 h-7"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label className="w-20 text-xs">Tipo</Label>
                  <Select
                    value={getProp('effects.particles.type', 'dots')}
                    onValueChange={(value) => updateProp('effects.particles.type', value)}
                  >
                    <SelectTrigger className="flex-1 h-7 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dots">Puntos</SelectItem>
                      <SelectItem value="squares">Cuadrados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="space-y-2 p-3 border rounded-lg bg-card">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold">Filtros CSS</Label>
              <Switch
                checked={getProp('effects.filters.enabled', false)}
                onCheckedChange={(checked) => updateProp('effects.filters.enabled', checked)}
              />
            </div>
            {getProp('effects.filters.enabled', false) && (
              <div className="space-y-2 pl-2">
                <div className="flex items-center gap-2">
                  <Label className="w-20 text-xs">Blur</Label>
                  <Input
                    type="range"
                    min="0"
                    max="20"
                    value={getProp('effects.filters.blur', 0)}
                    onChange={(e) => updateProp('effects.filters.blur', parseInt(e.target.value))}
                    className="flex-1 h-6"
                  />
                  <span className="text-xs w-10">{getProp('effects.filters.blur', 0)}px</span>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="w-20 text-xs">Brillo</Label>
                  <Input
                    type="range"
                    min="0"
                    max="200"
                    value={getProp('effects.filters.brightness', 100)}
                    onChange={(e) => updateProp('effects.filters.brightness', parseInt(e.target.value))}
                    className="flex-1 h-6"
                  />
                  <span className="text-xs w-10">{getProp('effects.filters.brightness', 100)}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="w-20 text-xs">Contraste</Label>
                  <Input
                    type="range"
                    min="0"
                    max="200"
                    value={getProp('effects.filters.contrast', 100)}
                    onChange={(e) => updateProp('effects.filters.contrast', parseInt(e.target.value))}
                    className="flex-1 h-6"
                  />
                  <span className="text-xs w-10">{getProp('effects.filters.contrast', 100)}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="w-20 text-xs">Saturación</Label>
                  <Input
                    type="range"
                    min="0"
                    max="200"
                    value={getProp('effects.filters.saturate', 100)}
                    onChange={(e) => updateProp('effects.filters.saturate', parseInt(e.target.value))}
                    className="flex-1 h-6"
                  />
                  <span className="text-xs w-10">{getProp('effects.filters.saturate', 100)}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="w-20 text-xs">Tono</Label>
                  <Input
                    type="range"
                    min="0"
                    max="360"
                    value={getProp('effects.filters.hueRotate', 0)}
                    onChange={(e) => updateProp('effects.filters.hueRotate', parseInt(e.target.value))}
                    className="flex-1 h-6"
                  />
                  <span className="text-xs w-10">{getProp('effects.filters.hueRotate', 0)}°</span>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="w-20 text-xs">Sepia</Label>
                  <Input
                    type="range"
                    min="0"
                    max="100"
                    value={getProp('effects.filters.sepia', 0)}
                    onChange={(e) => updateProp('effects.filters.sepia', parseInt(e.target.value))}
                    className="flex-1 h-6"
                  />
                  <span className="text-xs w-10">{getProp('effects.filters.sepia', 0)}%</span>
                </div>
              </div>
            )}
          </div>
          {/* Transform 3D */}
          <div className="space-y-2 p-3 border rounded-lg bg-card">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold">Transformación 3D</Label>
              <Switch
                checked={getProp('effects.transform3d.enabled', false)}
                onCheckedChange={(checked) => updateProp('effects.transform3d.enabled', checked)}
              />
            </div>
            {getProp('effects.transform3d.enabled', false) && (
              <div className="space-y-2 pl-2">
                <div className="flex items-center gap-2">
                  <Label className="w-20 text-xs">Rotate X</Label>
                  <Input
                    type="range"
                    min="-180"
                    max="180"
                    value={getProp('effects.transform3d.rotateX', 0)}
                    onChange={(e) => updateProp('effects.transform3d.rotateX', parseInt(e.target.value))}
                    className="flex-1 h-6"
                  />
                  <span className="text-xs w-10">{getProp('effects.transform3d.rotateX', 0)}°</span>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="w-20 text-xs">Rotate Y</Label>
                  <Input
                    type="range"
                    min="-180"
                    max="180"
                    value={getProp('effects.transform3d.rotateY', 0)}
                    onChange={(e) => updateProp('effects.transform3d.rotateY', parseInt(e.target.value))}
                    className="flex-1 h-6"
                  />
                  <span className="text-xs w-10">{getProp('effects.transform3d.rotateY', 0)}°</span>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="w-20 text-xs">Rotate Z</Label>
                  <Input
                    type="range"
                    min="-180"
                    max="180"
                    value={getProp('effects.transform3d.rotateZ', 0)}
                    onChange={(e) => updateProp('effects.transform3d.rotateZ', parseInt(e.target.value))}
                    className="flex-1 h-6"
                  />
                  <span className="text-xs w-10">{getProp('effects.transform3d.rotateZ', 0)}°</span>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="w-20 text-xs">Perspectiva</Label>
                  <Input
                    type="range"
                    min="100"
                    max="2000"
                    value={getProp('effects.transform3d.perspective', 1000)}
                    onChange={(e) => updateProp('effects.transform3d.perspective', parseInt(e.target.value))}
                    className="flex-1 h-6"
                  />
                  <span className="text-xs w-10">{getProp('effects.transform3d.perspective', 1000)}px</span>
                </div>
              </div>
            )}
          </div>

          {/* Animación */}
          <div className="space-y-2 p-3 border rounded-lg bg-card">
            <h3 className="font-semibold text-xs">Configuración de Animación</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="w-24 text-xs">Duración</Label>
                <Input
                  type="range"
                  min="100"
                  max="2000"
                  step="100"
                  value={getProp('props.animationDuration', 300)}
                  onChange={(e) => updateProp('props.animationDuration', parseInt(e.target.value))}
                  className="flex-1 h-6"
                />
                <span className="text-xs w-12">{getProp('props.animationDuration', 300)}ms</span>
              </div>
              <div className="flex items-center gap-2">
                <Label className="w-24 text-xs">Easing</Label>
                <Select
                  value={getProp('props.animationEasing', 'ease')}
                  onValueChange={(value) => updateProp('props.animationEasing', value)}
                >
                  <SelectTrigger className="flex-1 h-7 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linear">Linear</SelectItem>
                    <SelectItem value="ease">Ease</SelectItem>
                    <SelectItem value="ease-in">Ease In</SelectItem>
                    <SelectItem value="ease-out">Ease Out</SelectItem>
                    <SelectItem value="ease-in-out">Ease In Out</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  )

  const renderLayoutTab = () => (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm">Dimensiones y Espaciado</h3>

      {/* Ancho y Alto */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs">Ancho</Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={getProp('props.width', '')}
              onChange={(e) => updateProp('props.width', e.target.value ? parseInt(e.target.value) : undefined)}
              className="flex-1"
              placeholder="Auto"
            />
            <span className="text-xs text-muted-foreground">px</span>
          </div>
        </div>
        <div>
          <Label className="text-xs">Alto</Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={getProp('props.height', '')}
              onChange={(e) => updateProp('props.height', e.target.value ? parseInt(e.target.value) : undefined)}
              className="flex-1"
              placeholder="Auto"
            />
            <span className="text-xs text-muted-foreground">px</span>
          </div>
        </div>
      </div>

      {/* Padding */}
      <div>
        <Label className="text-xs mb-2 block">Padding</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            value={getProp('props.paddingX', '')}
            onChange={(e) => updateProp('props.paddingX', e.target.value ? parseInt(e.target.value) : undefined)}
            placeholder="Horizontal"
            className="text-xs"
          />
          <Input
            type="number"
            value={getProp('props.paddingY', '')}
            onChange={(e) => updateProp('props.paddingY', e.target.value ? parseInt(e.target.value) : undefined)}
            placeholder="Vertical"
            className="text-xs"
          />
        </div>
      </div>

      {/* Margin */}
      <div>
        <Label className="text-xs mb-2 block">Margin</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            value={getProp('props.marginX', '')}
            onChange={(e) => updateProp('props.marginX', e.target.value ? parseInt(e.target.value) : undefined)}
            placeholder="Horizontal"
            className="text-xs"
          />
          <Input
            type="number"
            value={getProp('props.marginY', '')}
            onChange={(e) => updateProp('props.marginY', e.target.value ? parseInt(e.target.value) : undefined)}
            placeholder="Vertical"
            className="text-xs"
          />
        </div>
      </div>

      <Separator />

      {/* Border Radius */}
      <div>
        <Label className="text-xs">Border Radius</Label>
        <div className="flex items-center gap-3 mt-2">
          <Input
            type="range"
            min="0"
            max="50"
            value={getProp('props.borderRadius', 0)}
            onChange={(e) => updateProp('props.borderRadius', parseInt(e.target.value))}
            className="flex-1"
          />
          <Input
            type="number"
            value={getProp('props.borderRadius', 0)}
            onChange={(e) => updateProp('props.borderRadius', parseInt(e.target.value))}
            className="w-20"
          />
          <span className="text-xs">px</span>
        </div>
      </div>

      {/* Border Width */}
      <div>
        <Label className="text-xs">Border Width</Label>
        <div className="flex items-center gap-3 mt-2">
          <Input
            type="range"
            min="0"
            max="10"
            value={getProp('props.borderWidth', 0)}
            onChange={(e) => updateProp('props.borderWidth', parseInt(e.target.value))}
            className="flex-1"
          />
          <Input
            type="number"
            value={getProp('props.borderWidth', 0)}
            onChange={(e) => updateProp('props.borderWidth', parseInt(e.target.value))}
            className="w-20"
          />
          <span className="text-xs">px</span>
        </div>
      </div>

      {/* Border Color */}
      {getProp('props.borderWidth', 0) > 0 && (
        <div>
          <Label className="text-xs">Border Color</Label>
          <div className="flex gap-2 mt-2">
            <Input
              type="color"
              value={getProp('props.borderColor', '#e5e7eb')}
              onChange={(e) => updateProp('props.borderColor', e.target.value)}
              className="w-16 h-10"
            />
            <Input
              value={getProp('props.borderColor', '#e5e7eb')}
              onChange={(e) => updateProp('props.borderColor', e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
      )}

      <Separator />

      {/* Opacity */}
      <div>
        <Label className="text-xs">Opacidad</Label>
        <div className="flex items-center gap-3 mt-2">
          <Input
            type="range"
            min="0"
            max="100"
            value={(getProp('props.opacity', 1) * 100)}
            onChange={(e) => updateProp('props.opacity', parseInt(e.target.value) / 100)}
            className="flex-1"
          />
          <span className="text-xs w-12">{Math.round(getProp('props.opacity', 1) * 100)}%</span>
        </div>
      </div>
    </div>
  )
  const renderDataTab = () => {
    return (
      <ScrollArea className="h-[500px]">
        <div className="space-y-4 pr-4">
          <h3 className="font-semibold text-sm">💾 Datos y Contenido Visual</h3>

          {/* Imágenes - SIEMPRE VISIBLE */}
          <div className="space-y-3 p-4 border rounded-xl bg-card">
            <h4 className="font-semibold text-xs">🖼️ Imágenes</h4>
            
            <div>
              <Label className="text-xs font-semibold mb-1.5 block">URL de Imagen Principal</Label>
              <div className="flex gap-2">
                <Input
                  value={getProp('props.src', '') || getProp('props.imageUrl', '') || getProp('props.image', '')}
                  onChange={(e) => {
                    updateProp('props.src', e.target.value)
                    updateProp('props.imageUrl', e.target.value)
                    updateProp('props.image', e.target.value)
                  }}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="flex-1 h-8 text-xs"
                />
                <Button size="sm" variant="outline" className="h-8">
                  <ImageIcon className="w-3 h-3" />
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold mb-1.5 block">Texto Alternativo (Alt)</Label>
              <Input
                value={getProp('props.alt', '')}
                onChange={(e) => updateProp('props.alt', e.target.value)}
                placeholder="Descripción de la imagen"
                className="h-8 text-xs"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold mb-1.5 block">Logo/Avatar URL</Label>
              <Input
                value={getProp('props.logo', '') || getProp('props.avatar', '')}
                onChange={(e) => {
                  updateProp('props.logo', e.target.value)
                  updateProp('props.avatar', e.target.value)
                }}
                placeholder="https://ejemplo.com/logo.png"
                className="h-8 text-xs"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold mb-1.5 block">Imagen de Fondo URL</Label>
              <Input
                value={getProp('props.backgroundImage', '')}
                onChange={(e) => updateProp('props.backgroundImage', e.target.value)}
                placeholder="https://ejemplo.com/fondo.jpg"
                className="h-8 text-xs"
              />
            </div>
          </div>

          {/* Enlaces y URLs - SIEMPRE VISIBLE */}
          <div className="space-y-3 p-4 border rounded-xl bg-card">
            <h4 className="font-semibold text-xs">🔗 Enlaces y URLs</h4>
            
            <div>
              <Label className="text-xs font-semibold mb-1.5 block">URL/Enlace Principal</Label>
              <div className="flex gap-2">
                <Input
                  value={getProp('props.href', '') || getProp('props.url', '') || getProp('props.link', '')}
                  onChange={(e) => {
                    updateProp('props.href', e.target.value)
                    updateProp('props.url', e.target.value)
                    updateProp('props.link', e.target.value)
                  }}
                  placeholder="https://ejemplo.com"
                  className="flex-1 h-8 text-xs"
                />
                <Button size="sm" variant="outline" className="h-8">
                  <Link className="w-3 h-3" />
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold mb-1.5 block">Destino del Enlace (Target)</Label>
              <Select
                value={getProp('props.target', '_self')}
                onValueChange={(value) => updateProp('props.target', value)}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="_self">Misma pestaña</SelectItem>
                  <SelectItem value="_blank">Nueva pestaña</SelectItem>
                  <SelectItem value="_parent">Ventana padre</SelectItem>
                  <SelectItem value="_top">Ventana principal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs font-semibold mb-1.5 block">Email</Label>
              <Input
                value={getProp('props.email', '')}
                onChange={(e) => updateProp('props.email', e.target.value)}
                placeholder="contacto@ejemplo.com"
                className="h-8 text-xs"
                type="email"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold mb-1.5 block">Teléfono</Label>
              <Input
                value={getProp('props.phone', '')}
                onChange={(e) => updateProp('props.phone', e.target.value)}
                placeholder="+1 234 567 8900"
                className="h-8 text-xs"
                type="tel"
              />
            </div>
          </div>

          {/* Íconos - SIEMPRE VISIBLE */}
          <div className="space-y-3 p-4 border rounded-xl bg-card">
            <h4 className="font-semibold text-xs">⭐ Íconos</h4>
            
            <div>
              <Label className="text-xs font-semibold mb-1.5 block">Nombre del Ícono</Label>
              <Input
                value={getProp('props.icon', '')}
                onChange={(e) => updateProp('props.icon', e.target.value)}
                placeholder="ej: star, heart, check"
                className="h-8 text-xs"
              />
              <p className="text-[10px] text-muted-foreground mt-1">Lucide icon name</p>
            </div>

            <div>
              <Label className="text-xs font-semibold mb-1.5 block">Tamaño del Ícono</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="range"
                  min="12"
                  max="64"
                  value={getProp('props.iconSize', 24)}
                  onChange={(e) => updateProp('props.iconSize', parseInt(e.target.value))}
                  className="flex-1 h-6"
                />
                <span className="text-xs w-12">{getProp('props.iconSize', 24)}px</span>
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold mb-1.5 block">Color del Ícono</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={getProp('props.iconColor', '#000000')}
                  onChange={(e) => updateProp('props.iconColor', e.target.value)}
                  className="w-14 h-8 p-0"
                />
                <Input
                  value={getProp('props.iconColor', '#000000')}
                  onChange={(e) => updateProp('props.iconColor', e.target.value)}
                  className="flex-1 h-8 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Listas y Arrays - SIEMPRE VISIBLE */}
          <div className="space-y-3 p-4 border rounded-xl bg-card">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-xs">📋 Listas de Items</h4>
              <Button
                size="sm"
                onClick={() => {
                  const items = getProp('props.items', [])
                  const newArray = Array.isArray(items) ? [...items, 'Nuevo item'] : ['Nuevo item']
                  updateProp('props.items', newArray)
                }}
                className="h-7"
              >
                <Plus className="w-3 h-3 mr-1" />
                Agregar Item
              </Button>
            </div>

            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {(() => {
                  const items = getProp('props.items', [])
                  const itemsArray = Array.isArray(items) ? items : []

                  if (itemsArray.length === 0) {
                    return (
                      <div className="text-center py-6 text-xs text-muted-foreground border-2 border-dashed rounded">
                        No hay items. Haz clic en &quot;Agregar Item&quot;
                      </div>
                    )
                  }

                  return itemsArray.map((item: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 p-2 border rounded bg-background">
                      <span className="text-xs text-muted-foreground w-6">#{index + 1}</span>
                      <Input
                        value={typeof item === 'string' ? item : item.text || item.label || item.name || ''}
                        onChange={(e) => {
                          const newItems = [...itemsArray]
                          if (typeof item === 'string') {
                            newItems[index] = e.target.value
                          } else {
                            newItems[index] = { ...item, text: e.target.value, label: e.target.value, name: e.target.value }
                          }
                          updateProp('props.items', newItems)
                        }}
                        className="flex-1 h-7 text-xs"
                        placeholder="Texto del item"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          const newItems = itemsArray.filter((_: any, i: number) => i !== index)
                          updateProp('props.items', newItems)
                        }}
                        className="h-7 w-7 p-0 text-red-600"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))
                })()}
              </div>
            </ScrollArea>
          </div>

          {/* Features */}
          <div className="space-y-3 p-4 border rounded-xl bg-card">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-xs">✨ Características (Features)</h4>
              <Button
                size="sm"
                onClick={() => {
                  const features = getProp('props.features', [])
                  const newArray = Array.isArray(features) ? [...features, 'Nueva característica'] : ['Nueva característica']
                  updateProp('props.features', newArray)
                }}
                className="h-7"
              >
                <Plus className="w-3 h-3 mr-1" />
                Agregar
              </Button>
            </div>

            <ScrollArea className="h-[150px]">
              <div className="space-y-2">
                {(() => {
                  const features = getProp('props.features', [])
                  const featuresArray = Array.isArray(features) ? features : []

                  if (featuresArray.length === 0) {
                    return (
                      <div className="text-center py-4 text-xs text-muted-foreground border-2 border-dashed rounded">
                        No hay características
                      </div>
                    )
                  }

                  return featuresArray.map((feature: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 p-2 border rounded bg-background">
                      <Input
                        value={typeof feature === 'string' ? feature : feature.text || feature.label || ''}
                        onChange={(e) => {
                          const newFeatures = [...featuresArray]
                          if (typeof feature === 'string') {
                            newFeatures[index] = e.target.value
                          } else {
                            newFeatures[index] = { ...feature, text: e.target.value, label: e.target.value }
                          }
                          updateProp('props.features', newFeatures)
                        }}
                        className="flex-1 h-7 text-xs"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          const newFeatures = featuresArray.filter((_: any, i: number) => i !== index)
                          updateProp('props.features', newFeatures)
                        }}
                        className="h-7 w-7 p-0 text-red-600"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))
                })()}
              </div>
            </ScrollArea>
          </div>

          {/* Configuraciones adicionales */}
          <div className="space-y-3 p-4 border rounded-xl bg-card">
            <h4 className="font-semibold text-xs">⚙️ Configuración</h4>
            
            <div>
              <Label className="text-xs font-semibold mb-1.5 block">Estado (State)</Label>
              <Select
                value={getProp('props.state', 'default')}
                onValueChange={(value) => updateProp('props.state', value)}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Predeterminado</SelectItem>
                  <SelectItem value="active">Activo</SelectItem>
                  <SelectItem value="disabled">Deshabilitado</SelectItem>
                  <SelectItem value="loading">Cargando</SelectItem>
                  <SelectItem value="success">Éxito</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs font-semibold mb-1.5 block">Variante</Label>
              <Select
                value={getProp('props.variant', 'default')}
                onValueChange={(value) => updateProp('props.variant', value)}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="primary">Primary</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="outline">Outline</SelectItem>
                  <SelectItem value="ghost">Ghost</SelectItem>
                  <SelectItem value="destructive">Destructive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs font-semibold mb-1.5 block">Tamaño</Label>
              <Select
                value={getProp('props.size', 'default')}
                onValueChange={(value) => updateProp('props.size', value)}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xs">Extra Small (XS)</SelectItem>
                  <SelectItem value="sm">Small (SM)</SelectItem>
                  <SelectItem value="default">Default (MD)</SelectItem>
                  <SelectItem value="lg">Large (LG)</SelectItem>
                  <SelectItem value="xl">Extra Large (XL)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold">Visible</Label>
              <Switch
                checked={getProp('props.visible', true)}
                onCheckedChange={(checked) => updateProp('props.visible', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold">Deshabilitado</Label>
              <Switch
                checked={getProp('props.disabled', false)}
                onCheckedChange={(checked) => updateProp('props.disabled', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold">Solo lectura</Label>
              <Switch
                checked={getProp('props.readOnly', false)}
                onCheckedChange={(checked) => updateProp('props.readOnly', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold">Requerido</Label>
              <Switch
                checked={getProp('props.required', false)}
                onCheckedChange={(checked) => updateProp('props.required', checked)}
              />
            </div>
          </div>

          {/* Valores y Datos */}
          <div className="space-y-3 p-4 border rounded-xl bg-card">
            <h4 className="font-semibold text-xs">💡 Valores</h4>
            
            <div>
              <Label className="text-xs font-semibold mb-1.5 block">Valor (Value)</Label>
              <Input
                value={getProp('props.value', '')}
                onChange={(e) => updateProp('props.value', e.target.value)}
                placeholder="Valor del componente"
                className="h-8 text-xs"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold mb-1.5 block">Valor Predeterminado</Label>
              <Input
                value={getProp('props.defaultValue', '')}
                onChange={(e) => updateProp('props.defaultValue', e.target.value)}
                placeholder="Valor por defecto"
                className="h-8 text-xs"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold mb-1.5 block">Mínimo</Label>
              <Input
                type="number"
                value={getProp('props.min', '')}
                onChange={(e) => updateProp('props.min', e.target.value ? parseInt(e.target.value) : undefined)}
                placeholder="0"
                className="h-8 text-xs"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold mb-1.5 block">Máximo</Label>
              <Input
                type="number"
                value={getProp('props.max', '')}
                onChange={(e) => updateProp('props.max', e.target.value ? parseInt(e.target.value) : undefined)}
                placeholder="100"
                className="h-8 text-xs"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold mb-1.5 block">Paso (Step)</Label>
              <Input
                type="number"
                value={getProp('props.step', '')}
                onChange={(e) => updateProp('props.step', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="1"
                className="h-8 text-xs"
                step="0.1"
              />
            </div>
          </div>
        </div>
      </ScrollArea>
    )
  }

  const renderLivePreview = () => {
    const { renderAllComponents } = require('./components-ren/component-renderer')
    
    const getEffectClasses = () => {
      if (!editedComponent.effects) return ''
      const classes = []
      if (editedComponent.effects.glow?.enabled) classes.push('glow-effect')
      if (editedComponent.effects.shimmer?.enabled) classes.push('shimmer-effect')
      if (editedComponent.effects.glass?.enabled) classes.push('glass-effect')
      return classes.join(' ')
    }

    const getEffectStyles = () => {
      const styles: any = {}
      
      if (editedComponent.effects?.glow?.enabled) {
        const { intensity = 50, color = '#3b82f6', blur = 10, spread = 0 } = editedComponent.effects.glow
        styles.boxShadow = `0 0 ${blur}px ${spread}px ${color}${Math.round(intensity * 2.55).toString(16).padStart(2, '0')}`
      }
      
      if (editedComponent.effects?.glass?.enabled) {
        styles.backdropFilter = `blur(${editedComponent.effects.glass.blur || 10}px)`
        styles.backgroundColor = `rgba(255, 255, 255, ${(editedComponent.effects.glass.opacity || 80) / 100})`
      }

      if (editedComponent.effects?.filters?.enabled) {
        const filters = []
        const f = editedComponent.effects.filters
        if (f.blur) filters.push(`blur(${f.blur}px)`)
        if (f.brightness !== 100) filters.push(`brightness(${f.brightness / 100})`)
        if (f.contrast !== 100) filters.push(`contrast(${f.contrast / 100})`)
        if (f.saturate !== 100) filters.push(`saturate(${f.saturate / 100})`)
        if (f.hueRotate) filters.push(`hue-rotate(${f.hueRotate}deg)`)
        if (f.sepia) filters.push(`sepia(${f.sepia / 100})`)
        if (filters.length > 0) styles.filter = filters.join(' ')
      }

      if (editedComponent.effects?.transform3d?.enabled) {
        const transforms = []
        const t = editedComponent.effects.transform3d
        if (t.rotateX) transforms.push(`rotateX(${t.rotateX}deg)`)
        if (t.rotateY) transforms.push(`rotateY(${t.rotateY}deg)`)
        if (t.rotateZ) transforms.push(`rotateZ(${t.rotateZ}deg)`)
        if (transforms.length > 0) {
          styles.transform = transforms.join(' ')
          styles.transformStyle = 'preserve-3d'
        }
        if (t.perspective) styles.perspective = `${t.perspective}px`
      }
      
      return styles
    }
    
    return (
      <div className="h-full flex flex-col">
        <div className="p-3 border-b bg-muted/30">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Vista Previa en Tiempo Real
          </h3>
          <p className="text-[10px] text-muted-foreground mt-1">
            Los cambios se actualizan automáticamente
          </p>
        </div>
        <div className="flex-1 p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 overflow-auto">
          <div className="flex items-center justify-center min-h-full">
            <div 
              className="transition-all duration-200 shadow-2xl"
              style={{
                transform: `scale(${Math.min(1, 500 / Math.max(editedComponent.props?.width || 300, editedComponent.props?.height || 200))})`,
                transformOrigin: 'center'
              }}
            >
              {renderAllComponents(editedComponent.type, {
                props: {
                  ...(editedComponent.props || {}),
                  mode: 'preview'
                },
                getEffectClasses,
                getEffectStyles
              })}
            </div>
          </div>
        </div>
        <div className="p-3 border-t bg-muted/30">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Actualización automática</span>
            </div>
            {(editedComponent.props?.width || editedComponent.props?.height) && (
              <span className="font-mono text-muted-foreground">
                {editedComponent.props?.width || 'auto'} × {editedComponent.props?.height || 'auto'}
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
  <Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent
    className="
      overflow-hidden 
      flex flex-col 
      p-0 
      rounded-2xl 
      shadow-2xl 
      w-[98vw] h-[96vh]
      max-w-none max-h-none
      rounded-xl 
      bg-background 
      overflow-hidden 
      shadow-2xl
    
    "
  >
    <DialogHeader className="px-8 pt-6 pb-4 border-b">
      <DialogTitle className="text-3xl font-bold">
        ✨ Editor Visual Completo: {component.name || component.type}
      </DialogTitle>
      <DialogDescription className="text-base leading-relaxed">
        Edita visualmente todos los aspectos del componente — los cambios se reflejan en tiempo real en el panel derecho.
      </DialogDescription>
    </DialogHeader>

    {/* Cuerpo principal */}
    <div className="flex-1 overflow-auto flex flex-col lg:flex-row">
      {/* Panel de Controles */}
      <div className="w-full lg:w-[60%] border-b lg:border-b-0 lg:border-r flex flex-col">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 overflow-hidden flex flex-col"
        >
          <div className="px-6 py-3 border-b bg-muted/20">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1">
              <TabsTrigger value="content" className="text-sm py-3 px-4">
                📝 Contenido
              </TabsTrigger>
              <TabsTrigger value="style" className="text-sm py-3 px-4">
                🎨 Estilos
              </TabsTrigger>
              <TabsTrigger value="layout" className="text-sm py-3 px-4">
                📐 Layout
              </TabsTrigger>
              <TabsTrigger value="elements" className="text-sm py-3 px-4">
                🧩 Elementos
              </TabsTrigger>
              <TabsTrigger value="data" className="text-sm py-3 px-4">
                💾 Datos
              </TabsTrigger>
              <TabsTrigger value="advanced" className="text-sm py-3 px-4">
                ⚡ Efectos
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-6 space-y-6">
              <TabsContent value="content">{renderContentTab()}</TabsContent>
              <TabsContent value="style">{renderStyleTab()}</TabsContent>
              <TabsContent value="layout">{renderLayoutTab()}</TabsContent>
              <TabsContent value="elements">{renderElementsTab()}</TabsContent>
              <TabsContent value="data">{renderDataTab()}</TabsContent>
              <TabsContent value="advanced">{renderAdvancedTab()}</TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </div>

      {/* Panel de Vista Previa */}
      <div className="w-full lg:w-[40%] flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 overflow-auto">
        {renderLivePreview()}
      </div>
    </div>

    {/* Footer */}
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t bg-muted/20">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Badge variant="outline" className="font-mono">
          {component.type}
        </Badge>
        <span>•</span>
        <span>ID: {component.id}</span>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={handleSave} className="min-w-[120px]">
          💾 Guardar cambios
        </Button>
      </div>
    </div>
  </DialogContent>
</Dialog>

  )
}
