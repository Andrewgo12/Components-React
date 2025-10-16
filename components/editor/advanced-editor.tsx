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
        <Label>Nombre del componente</Label>
        <Input
          value={getProp('name', '')}
          onChange={(e) => updateProp('name', e.target.value)}
          placeholder="Nombre del componente"
        />
      </div>

      {/* Texto principal */}
      {(getProp('props.text') !== undefined || component.type.includes('text') || component.type.includes('button')) && (
        <div>
          <Label>Texto</Label>
          <Input
            value={getProp('props.text', '')}
            onChange={(e) => updateProp('props.text', e.target.value)}
            placeholder="Texto del componente"
          />
        </div>
      )}

      {/* Contenido */}
      {getProp('props.content') !== undefined && (
        <div>
          <Label>Contenido</Label>
          <Textarea
            value={getProp('props.content', '')}
            onChange={(e) => updateProp('props.content', e.target.value)}
            placeholder="Contenido del componente"
            rows={4}
          />
        </div>
      )}

      {/* Título */}
      {getProp('props.title') !== undefined && (
        <div>
          <Label>Título</Label>
          <Input
            value={getProp('props.title', '')}
            onChange={(e) => updateProp('props.title', e.target.value)}
            placeholder="Título"
          />
        </div>
      )}

      {/* Descripción */}
      {getProp('props.description') !== undefined && (
        <div>
          <Label>Descripción</Label>
          <Textarea
            value={getProp('props.description', '')}
            onChange={(e) => updateProp('props.description', e.target.value)}
            placeholder="Descripción"
            rows={3}
          />
        </div>
      )}

      {/* Placeholder */}
      {getProp('props.placeholder') !== undefined && (
        <div>
          <Label>Placeholder</Label>
          <Input
            value={getProp('props.placeholder', '')}
            onChange={(e) => updateProp('props.placeholder', e.target.value)}
            placeholder="Texto de placeholder"
          />
        </div>
      )}
    </div>
  )

  const renderStyleTab = () => (
    <div className="space-y-4">
      {/* Colores */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Colores</h3>
        
        {/* Color de fondo */}
        {getProp('props.colors.background') !== undefined && (
          <div className="flex items-center gap-3">
            <Label className="w-32">Fondo</Label>
            <Input
              type="color"
              value={getProp('props.colors.background', '#ffffff')}
              onChange={(e) => updateProp('props.colors.background', e.target.value)}
              className="w-20 h-10"
            />
            <Input
              value={getProp('props.colors.background', '#ffffff')}
              onChange={(e) => updateProp('props.colors.background', e.target.value)}
              className="flex-1"
            />
          </div>
        )}

        {/* Color de texto */}
        {getProp('props.colors.text') !== undefined && (
          <div className="flex items-center gap-3">
            <Label className="w-32">Texto</Label>
            <Input
              type="color"
              value={getProp('props.colors.text', '#000000')}
              onChange={(e) => updateProp('props.colors.text', e.target.value)}
              className="w-20 h-10"
            />
            <Input
              value={getProp('props.colors.text', '#000000')}
              onChange={(e) => updateProp('props.colors.text', e.target.value)}
              className="flex-1"
            />
          </div>
        )}

        {/* Color de borde */}
        {getProp('props.colors.border') !== undefined && (
          <div className="flex items-center gap-3">
            <Label className="w-32">Borde</Label>
            <Input
              type="color"
              value={getProp('props.colors.border', '#e5e7eb')}
              onChange={(e) => updateProp('props.colors.border', e.target.value)}
              className="w-20 h-10"
            />
            <Input
              value={getProp('props.colors.border', '#e5e7eb')}
              onChange={(e) => updateProp('props.colors.border', e.target.value)}
              className="flex-1"
            />
          </div>
        )}

        {/* Color simple */}
        {getProp('props.color') !== undefined && (
          <div className="flex items-center gap-3">
            <Label className="w-32">Color</Label>
            <Input
              type="color"
              value={getProp('props.color', '#000000')}
              onChange={(e) => updateProp('props.color', e.target.value)}
              className="w-20 h-10"
            />
            <Input
              value={getProp('props.color', '#000000')}
              onChange={(e) => updateProp('props.color', e.target.value)}
              className="flex-1"
            />
          </div>
        )}
      </div>

      <Separator />

      {/* Tamaños */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Tamaños</h3>

        {/* Tamaño de fuente */}
        {getProp('props.fontSize') !== undefined && (
          <div className="flex items-center gap-3">
            <Label className="w-32">Tamaño de fuente</Label>
            <Input
              type="number"
              value={getProp('props.fontSize', 16)}
              onChange={(e) => updateProp('props.fontSize', parseInt(e.target.value))}
              className="flex-1"
              min="8"
              max="72"
            />
            <span className="text-sm text-muted-foreground">px</span>
          </div>
        )}

        {/* Ancho */}
        {getProp('props.width') !== undefined && (
          <div className="flex items-center gap-3">
            <Label className="w-32">Ancho</Label>
            <Input
              type="number"
              value={getProp('props.width', 200)}
              onChange={(e) => updateProp('props.width', parseInt(e.target.value))}
              className="flex-1"
              min="0"
            />
            <span className="text-sm text-muted-foreground">px</span>
          </div>
        )}

        {/* Alto */}
        {getProp('props.height') !== undefined && (
          <div className="flex items-center gap-3">
            <Label className="w-32">Alto</Label>
            <Input
              type="number"
              value={getProp('props.height', 150)}
              onChange={(e) => updateProp('props.height', parseInt(e.target.value))}
              className="flex-1"
              min="0"
            />
            <span className="text-sm text-muted-foreground">px</span>
          </div>
        )}
      </div>
    </div>
  )

  const renderElementsTab = () => {
    const children = getProp('props.children', [])
    const childrenArray = Array.isArray(children) ? children : []

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">Elementos internos</h3>
          <Button
            size="sm"
            onClick={() => addInternalElement('text')}
            className="h-8"
          >
            <Plus className="h-4 w-4 mr-1" />
            Agregar elemento
          </Button>
        </div>

        {childrenArray.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No hay elementos internos. Haz clic en &quot;Agregar elemento&quot; para crear uno.
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <div className="space-y-3">
              {childrenArray.map((child: any, index: number) => (
                <div key={index} className="border rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{child.type || 'elemento'}</Badge>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateInternalElement(index, { visible: !child.visible })}
                        className="h-7 w-7 p-0"
                      >
                        {child.visible !== false ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeInternalElement(index)}
                        className="h-7 w-7 p-0 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <Label className="text-xs">Tipo</Label>
                      <Select
                        value={child.type || 'text'}
                        onValueChange={(value) => updateInternalElement(index, { type: value })}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Texto</SelectItem>
                          <SelectItem value="button">Botón</SelectItem>
                          <SelectItem value="badge">Badge</SelectItem>
                          <SelectItem value="icon">Icono</SelectItem>
                          <SelectItem value="image">Imagen</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-xs">Texto</Label>
                      <Input
                        value={child.text || child.content || ''}
                        onChange={(e) => updateInternalElement(index, { text: e.target.value, content: e.target.value })}
                        className="h-8 text-xs"
                        placeholder="Texto del elemento"
                      />
                    </div>

                    {child.type === 'button' && (
                      <div>
                        <Label className="text-xs">Color</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={child.color || '#3b82f6'}
                            onChange={(e) => updateInternalElement(index, { color: e.target.value })}
                            className="w-16 h-8"
                          />
                          <Input
                            value={child.color || '#3b82f6'}
                            onChange={(e) => updateInternalElement(index, { color: e.target.value })}
                            className="flex-1 h-8 text-xs"
                          />
                        </div>
                      </div>
                    )}
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
    <div className="space-y-4">
      {/* Efectos */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Efectos</h3>

        {/* Glow */}
        {getProp('effects.glow') !== undefined && (
          <div className="space-y-2 p-3 border rounded-lg">
            <div className="flex items-center justify-between">
              <Label>Efecto Glow</Label>
              <Switch
                checked={getProp('effects.glow.enabled', false)}
                onCheckedChange={(checked) => updateProp('effects.glow.enabled', checked)}
              />
            </div>
            {getProp('effects.glow.enabled', false) && (
              <div className="space-y-2 pl-4">
                <div className="flex items-center gap-3">
                  <Label className="w-24 text-xs">Intensidad</Label>
                  <Input
                    type="range"
                    min="0"
                    max="100"
                    value={getProp('effects.glow.intensity', 50)}
                    onChange={(e) => updateProp('effects.glow.intensity', parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-xs w-12">{getProp('effects.glow.intensity', 50)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Label className="w-24 text-xs">Color</Label>
                  <Input
                    type="color"
                    value={getProp('effects.glow.color', '#3b82f6')}
                    onChange={(e) => updateProp('effects.glow.color', e.target.value)}
                    className="w-16 h-8"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Glass */}
        {getProp('effects.glass') !== undefined && (
          <div className="space-y-2 p-3 border rounded-lg">
            <div className="flex items-center justify-between">
              <Label>Efecto Glass</Label>
              <Switch
                checked={getProp('effects.glass.enabled', false)}
                onCheckedChange={(checked) => updateProp('effects.glass.enabled', checked)}
              />
            </div>
            {getProp('effects.glass.enabled', false) && (
              <div className="space-y-2 pl-4">
                <div className="flex items-center gap-3">
                  <Label className="w-24 text-xs">Blur</Label>
                  <Input
                    type="range"
                    min="0"
                    max="30"
                    value={getProp('effects.glass.blur', 10)}
                    onChange={(e) => updateProp('effects.glass.blur', parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-xs w-12">{getProp('effects.glass.blur', 10)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Label className="w-24 text-xs">Opacidad</Label>
                  <Input
                    type="range"
                    min="0"
                    max="100"
                    value={getProp('effects.glass.opacity', 80)}
                    onChange={(e) => updateProp('effects.glass.opacity', parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-xs w-12">{getProp('effects.glass.opacity', 80)}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Shimmer */}
        {getProp('effects.shimmer') !== undefined && (
          <div className="space-y-2 p-3 border rounded-lg">
            <div className="flex items-center justify-between">
              <Label>Efecto Shimmer</Label>
              <Switch
                checked={getProp('effects.shimmer.enabled', false)}
                onCheckedChange={(checked) => updateProp('effects.shimmer.enabled', checked)}
              />
            </div>
            {getProp('effects.shimmer.enabled', false) && (
              <div className="space-y-2 pl-4">
                <div className="flex items-center gap-3">
                  <Label className="w-24 text-xs">Velocidad</Label>
                  <Input
                    type="range"
                    min="1"
                    max="5"
                    step="0.5"
                    value={getProp('effects.shimmer.speed', 2)}
                    onChange={(e) => updateProp('effects.shimmer.speed', parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-xs w-12">{getProp('effects.shimmer.speed', 2)}s</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
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
    // Detectar si el componente tiene arrays editables
    const hasItems = getProp('props.items') !== undefined
    const hasFeatures = getProp('props.features') !== undefined
    const hasOptions = getProp('props.options') !== undefined
    const hasLinks = getProp('props.links') !== undefined

    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-sm">Datos y Listas</h3>

        {/* Items/Features/Options */}
        {(hasItems || hasFeatures || hasOptions) && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs">
                {hasItems ? 'Items' : hasFeatures ? 'Features' : 'Options'}
              </Label>
              <Button
                size="sm"
                onClick={() => {
                  const key = hasItems ? 'props.items' : hasFeatures ? 'props.features' : 'props.options'
                  const current = getProp(key, [])
                  const newArray = Array.isArray(current) ? [...current, 'Nuevo item'] : ['Nuevo item']
                  updateProp(key, newArray)
                }}
                className="h-7"
              >
                <Plus className="w-3 h-3 mr-1" />
                Agregar
              </Button>
            </div>

            <ScrollArea className="h-[300px]">
              <div className="space-y-2">
                {(() => {
                  const key = hasItems ? 'props.items' : hasFeatures ? 'props.features' : 'props.options'
                  const items = getProp(key, [])
                  const itemsArray = Array.isArray(items) ? items : []

                  return itemsArray.map((item: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 p-2 border rounded">
                      <Input
                        value={typeof item === 'string' ? item : item.text || item.label || ''}
                        onChange={(e) => {
                          const newItems = [...itemsArray]
                          if (typeof item === 'string') {
                            newItems[index] = e.target.value
                          } else {
                            newItems[index] = { ...item, text: e.target.value, label: e.target.value }
                          }
                          updateProp(key, newItems)
                        }}
                        className="flex-1 h-8 text-xs"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          const newItems = itemsArray.filter((_: any, i: number) => i !== index)
                          updateProp(key, newItems)
                        }}
                        className="h-8 w-8 p-0 text-red-600"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))
                })()}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Links/URLs */}
        {hasLinks && (
          <div className="space-y-3">
            <Label className="text-xs">Enlaces</Label>
            <div className="space-y-2">
              {(() => {
                const links = getProp('props.links', [])
                const linksArray = Array.isArray(links) ? links : []
                
                return linksArray.map((link: any, index: number) => (
                  <div key={index} className="space-y-2 p-3 border rounded">
                    <Input
                      value={link.text || ''}
                      onChange={(e) => {
                        const newLinks = [...linksArray]
                        newLinks[index] = { ...link, text: e.target.value }
                        updateProp('props.links', newLinks)
                      }}
                      placeholder="Texto del enlace"
                      className="text-xs"
                    />
                    <Input
                      value={link.url || ''}
                      onChange={(e) => {
                        const newLinks = [...linksArray]
                        newLinks[index] = { ...link, url: e.target.value }
                        updateProp('props.links', newLinks)
                      }}
                      placeholder="URL"
                      className="text-xs"
                    />
                  </div>
                ))
              })()}
            </div>
          </div>
        )}

        {/* Imagen URL */}
        {(getProp('props.src') !== undefined || getProp('props.imageUrl') !== undefined) && (
          <div>
            <Label className="text-xs">URL de Imagen</Label>
            <div className="flex gap-2 mt-2">
              <Input
                value={getProp('props.src') || getProp('props.imageUrl') || ''}
                onChange={(e) => {
                  updateProp('props.src', e.target.value)
                  updateProp('props.imageUrl', e.target.value)
                }}
                placeholder="https://ejemplo.com/imagen.jpg"
                className="flex-1"
              />
              <Button size="sm" variant="outline" className="h-10">
                <ImageIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Alt Text para imágenes */}
        {getProp('props.alt') !== undefined && (
          <div>
            <Label className="text-xs">Texto Alternativo (Alt)</Label>
            <Input
              value={getProp('props.alt', '')}
              onChange={(e) => updateProp('props.alt', e.target.value)}
              placeholder="Descripción de la imagen"
              className="mt-2"
            />
          </div>
        )}

        {/* URL/Href */}
        {(getProp('props.href') !== undefined || getProp('props.url') !== undefined) && (
          <div>
            <Label className="text-xs">URL/Enlace</Label>
            <div className="flex gap-2 mt-2">
              <Input
                value={getProp('props.href') || getProp('props.url') || ''}
                onChange={(e) => {
                  updateProp('props.href', e.target.value)
                  updateProp('props.url', e.target.value)
                }}
                placeholder="https://ejemplo.com"
                className="flex-1"
              />
              <Button size="sm" variant="outline" className="h-10">
                <Link className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Si no hay datos editables */}
        {!hasItems && !hasFeatures && !hasOptions && !hasLinks && 
         getProp('props.src') === undefined && getProp('props.href') === undefined && (
          <div className="text-center py-8 text-muted-foreground text-sm">
            Este componente no tiene datos editables en esta sección
          </div>
        )}
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Editar Componente: {component.name || component.type}</DialogTitle>
          <DialogDescription>
            Edita todas las propiedades del componente de forma visual
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="content">Contenido</TabsTrigger>
            <TabsTrigger value="style">Estilos</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="elements">Elementos</TabsTrigger>
            <TabsTrigger value="data">Datos</TabsTrigger>
            <TabsTrigger value="advanced">Avanzado</TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 mt-4">
            <TabsContent value="content" className="mt-0 px-1">
              {renderContentTab()}
            </TabsContent>

            <TabsContent value="style" className="mt-0 px-1">
              {renderStyleTab()}
            </TabsContent>

            <TabsContent value="layout" className="mt-0 px-1">
              {renderLayoutTab()}
            </TabsContent>

            <TabsContent value="elements" className="mt-0 px-1">
              {renderElementsTab()}
            </TabsContent>

            <TabsContent value="data" className="mt-0 px-1">
              {renderDataTab()}
            </TabsContent>

            <TabsContent value="advanced" className="mt-0 px-1">
              {renderAdvancedTab()}
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Guardar cambios
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
