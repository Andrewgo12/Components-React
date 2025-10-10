"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import * as Icons from "@/components/icons"
import { useState } from "react"

interface SidebarProps {
  onAddComponent: (type: string) => void
}

const basicComponents = [
  { id: "button", name: "Botón", icon: Icons.MousePointerIcon, color: "from-blue-500 to-blue-600" },
  { id: "input", name: "Input", icon: Icons.TypeIcon, color: "from-purple-500 to-purple-600" },
  { id: "card", name: "Card", icon: Icons.SquareIcon, color: "from-green-500 to-green-600" },
  { id: "badge", name: "Badge", icon: Icons.CircleIcon, color: "from-orange-500 to-orange-600" },
  { id: "text", name: "Texto", icon: Icons.FileTextIcon, color: "from-pink-500 to-pink-600" },
  { id: "image", name: "Imagen", icon: Icons.ImageIcon, color: "from-cyan-500 to-cyan-600" },
  { id: "checkbox", name: "Checkbox", icon: Icons.CheckIcon, color: "from-green-500 to-emerald-600" },
  { id: "radio", name: "Radio", icon: Icons.CircleIcon, color: "from-blue-500 to-indigo-600" },
  { id: "toggle", name: "Toggle", icon: Icons.ToggleIcon, color: "from-purple-500 to-violet-600" },
  { id: "slider", name: "Slider", icon: Icons.SlidersIcon, color: "from-orange-500 to-red-600" },
  { id: "avatar", name: "Avatar", icon: Icons.UserIcon, color: "from-pink-500 to-rose-600" },
  { id: "divider", name: "Divider", icon: Icons.MinusIcon, color: "from-gray-500 to-slate-600" },
]

const magicUIComponents = [
  {
    id: "animated-card",
    name: "Card Animada",
    icon: Icons.SparklesIcon,
    color: "from-purple-500 via-pink-500 to-red-500",
  },
  { id: "glow-button", name: "Botón Glow", icon: Icons.ZapIcon, color: "from-yellow-500 via-orange-500 to-red-500" },
  {
    id: "gradient-text",
    name: "Texto Gradiente",
    icon: Icons.PaletteIcon,
    color: "from-blue-500 via-purple-500 to-pink-500",
  },
  {
    id: "border-beam",
    name: "Border Beam",
    icon: Icons.SparklesIcon,
    color: "from-cyan-500 via-blue-500 to-purple-500",
  },
  {
    id: "shimmer-button",
    name: "Shimmer",
    icon: Icons.SparklesIcon,
    color: "from-pink-500 via-purple-500 to-indigo-500",
  },
  {
    id: "animated-input",
    name: "Input Animado",
    icon: Icons.TypeIcon,
    color: "from-green-500 via-teal-500 to-cyan-500",
  },
  { id: "glass-card", name: "Glass Card", icon: Icons.SquareIcon, color: "from-blue-400 via-cyan-400 to-teal-400" },
  { id: "neon-badge", name: "Neon Badge", icon: Icons.ZapIcon, color: "from-pink-500 via-purple-500 to-blue-500" },
]

const backgroundComponents = [
  { id: "bg-dots", name: "Dots", icon: Icons.GridIcon, color: "from-slate-500 to-slate-600" },
  { id: "bg-grid", name: "Grid", icon: Icons.GridIcon, color: "from-zinc-500 to-zinc-600" },
  { id: "bg-aurora", name: "Aurora", icon: Icons.SparklesIcon, color: "from-purple-500 via-pink-500 to-blue-500" },
  {
    id: "bg-gradient-animated",
    name: "Gradiente",
    icon: Icons.PaletteIcon,
    color: "from-orange-500 via-red-500 to-pink-500",
  },
  {
    id: "bg-particles",
    name: "Partículas",
    icon: Icons.SparklesIcon,
    color: "from-blue-500 via-purple-500 to-pink-500",
  },
  { id: "bg-waves", name: "Waves", icon: Icons.WavesIcon, color: "from-cyan-500 via-blue-500 to-indigo-500" },
]

const templateComponents = [
  { id: "login-form", name: "Login", icon: Icons.UserIcon, color: "from-blue-600 to-purple-600" },
  { id: "signup-form", name: "Signup", icon: Icons.UserIcon, color: "from-purple-600 to-pink-600" },
  { id: "pricing-card", name: "Pricing", icon: Icons.CreditCardIcon, color: "from-green-600 to-teal-600" },
  { id: "notification", name: "Notificación", icon: Icons.BellIcon, color: "from-orange-600 to-red-600" },
  { id: "profile-card", name: "Perfil", icon: Icons.UserIcon, color: "from-indigo-600 to-purple-600" },
  { id: "stats-card", name: "Estadísticas", icon: Icons.ChartIcon, color: "from-blue-600 to-cyan-600" },
]

const effectsComponents = [
  { id: "effect-glow", name: "Glow", icon: Icons.SparklesIcon, color: "from-yellow-400 to-orange-400" },
  { id: "effect-shimmer", name: "Shimmer", icon: Icons.ZapIcon, color: "from-blue-400 to-cyan-400" },
  { id: "effect-gradient", name: "Gradiente", icon: Icons.PaletteIcon, color: "from-pink-400 to-purple-400" },
  { id: "effect-pulse", name: "Pulse", icon: Icons.CircleIcon, color: "from-red-400 to-pink-400" },
  { id: "effect-float", name: "Float", icon: Icons.MoveIcon, color: "from-green-400 to-teal-400" },
  { id: "effect-ripple", name: "Ripple", icon: Icons.CircleIcon, color: "from-blue-400 to-indigo-400" },
]

interface FolderItem {
  id: string
  name: string
  components: string[]
  isOpen: boolean
}

export function Sidebar({ onAddComponent }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [folders, setFolders] = useState<FolderItem[]>([{ id: "1", name: "Mi Proyecto", components: [], isOpen: true }])

  const toggleFolder = (folderId: string) => {
    setFolders((prev) => prev.map((f) => (f.id === folderId ? { ...f, isOpen: !f.isOpen } : f)))
  }

  const addFolder = () => {
    const newFolder: FolderItem = {
      id: Date.now().toString(),
      name: `Carpeta ${folders.length + 1}`,
      components: [],
      isOpen: true,
    }
    setFolders([...folders, newFolder])
  }

  const deleteFolder = (folderId: string) => {
    setFolders((prev) => prev.filter((f) => f.id !== folderId))
  }

  const filterComponents = (components: any[]) => {
    return components.filter((comp) => comp.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  const ComponentGrid = ({ components }: { components: any[] }) => (
    <div className="grid grid-cols-3 gap-2">
      {components.map((component, index) => (
        <div
          key={component.id}
          className="animate-in fade-in zoom-in-95 duration-200"
          style={{ animationDelay: `${index * 15}ms` }}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Card
                className="p-2 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 group border-border/50"
                onClick={() => onAddComponent(component.id)}
              >
                <div
                  className={`w-8 h-8 rounded-lg bg-gradient-to-br ${component.color} flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform shadow-md`}
                >
                  <component.icon className="w-4 h-4 text-white" />
                </div>
                <p className="text-[10px] font-medium text-foreground truncate leading-tight text-center">
                  {component.name}
                </p>
              </Card>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs">
              <p className="text-xs">Click para agregar {component.name}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      ))}
    </div>
  )

  return (
    <TooltipProvider>
      <aside className="w-[280px] glass-effect glass-effect-dark border-r shadow-premium flex flex-col animate-in fade-in slide-in-from-left-4 duration-300">
        <div className="p-3 border-b">
          <h2 className="text-sm font-semibold text-foreground mb-2">Componentes</h2>

          <div className="relative">
            <Icons.SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 text-xs"
            />
          </div>
        </div>

        <Tabs defaultValue="basic" className="flex-1 flex flex-col overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide px-2 pt-2">
            <TabsList className="inline-flex h-8 gap-1 w-max">
              <TabsTrigger value="basic" className="text-[10px] px-3">
                Básicos
              </TabsTrigger>
              <TabsTrigger value="magic" className="text-[10px] px-3">
                Magic UI
              </TabsTrigger>
              <TabsTrigger value="backgrounds" className="text-[10px] px-3">
                Fondos
              </TabsTrigger>
              <TabsTrigger value="templates" className="text-[10px] px-3">
                Templates
              </TabsTrigger>
              <TabsTrigger value="effects" className="text-[10px] px-3">
                Efectos
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="basic" className="p-3 mt-0">
              <ComponentGrid components={filterComponents(basicComponents)} />
            </TabsContent>

            <TabsContent value="magic" className="p-3 mt-0">
              <div className="mb-3 p-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Componentes con animaciones premium estilo Magic UI
                </p>
              </div>
              <ComponentGrid components={filterComponents(magicUIComponents)} />
            </TabsContent>

            <TabsContent value="backgrounds" className="p-3 mt-0">
              <div className="mb-3 p-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Fondos animados y patrones decorativos
                </p>
              </div>
              <ComponentGrid components={filterComponents(backgroundComponents)} />
            </TabsContent>

            <TabsContent value="templates" className="p-3 mt-0">
              <div className="mb-3 p-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Componentes completos listos para usar
                </p>
              </div>
              <ComponentGrid components={filterComponents(templateComponents)} />
            </TabsContent>

            <TabsContent value="effects" className="p-3 mt-0">
              <div className="mb-3 p-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/20">
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Arrastra efectos sobre componentes para aplicarlos
                </p>
              </div>
              <ComponentGrid components={filterComponents(effectsComponents)} />
            </TabsContent>
          </div>
        </Tabs>

        <div className="border-t p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-foreground">Carpetas</span>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={addFolder}>
              <Icons.PlusIcon className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="space-y-1 max-h-32 overflow-y-auto">
            {folders.map((folder) => (
              <div key={folder.id} className="flex items-center gap-1 group">
                <button
                  onClick={() => toggleFolder(folder.id)}
                  className="flex-1 flex items-center gap-1.5 p-1.5 rounded hover:bg-accent transition-colors"
                >
                  {folder.isOpen ? (
                    <Icons.FolderOpenIcon className="w-3.5 h-3.5 text-blue-500" />
                  ) : (
                    <Icons.FolderIcon className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                  <span className="text-[10px] text-foreground truncate">{folder.name}</span>
                  <span className="text-[9px] text-muted-foreground ml-auto">{folder.components.length}</span>
                </button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => deleteFolder(folder.id)}
                >
                  <Icons.TrashIcon className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </TooltipProvider>
  )
}
