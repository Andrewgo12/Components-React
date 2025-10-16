"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import * as Icons from "@/components/icons"
import { useState, useEffect, useMemo, memo, useDeferredValue } from "react"

interface SidebarProps {
  onAddComponent: (type: string) => void
}

const basicComponents = [
  // 25 componentes básicos exactos del archivo basicos.tsx
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
  { id: "textarea", name: "Textarea", icon: Icons.FileTextIcon, color: "from-indigo-500 to-blue-600" },
  { id: "select", name: "Select", icon: Icons.ChevronDownIcon, color: "from-teal-500 to-cyan-600" },
  { id: "progress", name: "Progress", icon: Icons.LoaderIcon, color: "from-emerald-500 to-green-600" },
  { id: "alert", name: "Alert", icon: Icons.InfoIcon, color: "from-yellow-500 to-amber-600" },
  { id: "list", name: "Lista", icon: Icons.LayersIcon, color: "from-violet-500 to-purple-600" },
  { id: "table", name: "Tabla", icon: Icons.GridIcon, color: "from-slate-500 to-gray-600" },
  { id: "tabs", name: "Tabs", icon: Icons.LayersIcon, color: "from-blue-500 to-indigo-600" },
  { id: "accordion", name: "Accordion", icon: Icons.ChevronDownIcon, color: "from-purple-500 to-pink-600" },
  { id: "modal", name: "Modal", icon: Icons.SquareIcon, color: "from-red-500 to-pink-500" },
  { id: "dropdown", name: "Dropdown", icon: Icons.ChevronDownIcon, color: "from-green-500 to-teal-500" },
  { id: "spinner", name: "Spinner", icon: Icons.LoaderIcon, color: "from-blue-400 to-cyan-400" },
  { id: "skeleton", name: "Skeleton", icon: Icons.SquareIcon, color: "from-gray-400 to-slate-400" },
  { id: "tooltip", name: "Tooltip", icon: Icons.InfoIcon, color: "from-yellow-400 to-orange-400" },
  { id: "notification", name: "Notification", icon: Icons.BellIcon, color: "from-green-400 to-emerald-400" }
]

const magicUIComponents = [
  // 25 componentes Magic UI exactos del archivo magic-ui.tsx
  { id: "glow-button", name: "Botón Glow", icon: Icons.ZapIcon, color: "from-yellow-500 via-orange-500 to-red-500" },
  { id: "shimmer-button", name: "Shimmer", icon: Icons.SparklesIcon, color: "from-pink-500 via-purple-500 to-indigo-500" },
  { id: "ripple-button", name: "Ripple", icon: Icons.WavesIcon, color: "from-cyan-500 via-blue-500 to-indigo-500" },
  { id: "magnetic-button", name: "Magnetic", icon: Icons.MousePointerIcon, color: "from-red-500 via-pink-500 to-purple-500" },
  { id: "loading-button", name: "Loading", icon: Icons.LoaderIcon, color: "from-blue-500 via-indigo-500 to-purple-500" },
  { id: "glass-card", name: "Glass Card", icon: Icons.SquareIcon, color: "from-blue-400 via-cyan-400 to-teal-400" },
  { id: "fade-card", name: "Fade Card", icon: Icons.SquareIcon, color: "from-gray-500 via-slate-500 to-zinc-500" },
  { id: "gradient-text", name: "Texto Gradiente", icon: Icons.PaletteIcon, color: "from-blue-500 via-purple-500 to-pink-500" },
  { id: "typewriter-text", name: "Typewriter", icon: Icons.TypeIcon, color: "from-green-500 via-teal-500 to-cyan-500" },
  { id: "glow-text", name: "Glow Text", icon: Icons.TypeIcon, color: "from-pink-500 via-rose-500 to-red-500" },
  { id: "neon-badge", name: "Neon Badge", icon: Icons.ZapIcon, color: "from-pink-500 via-purple-500 to-blue-500" },
  { id: "count-badge", name: "Count Badge", icon: Icons.StarIcon, color: "from-orange-500 to-red-500" },
  { id: "rotate-icon", name: "Rotate Icon", icon: Icons.LoaderIcon, color: "from-indigo-500 via-purple-500 to-pink-500" },
  { id: "icon-glow", name: "Icon Glow", icon: Icons.StarIcon, color: "from-yellow-500 to-orange-500" },
  { id: "particle-button", name: "Particle Button", icon: Icons.SparklesIcon, color: "from-indigo-600 to-purple-600" },
  { id: "flip-card", name: "Flip Card", icon: Icons.CreditCardIcon, color: "from-indigo-500 to-purple-600" },
  { id: "hologram-card", name: "Hologram Card", icon: Icons.SparklesIcon, color: "from-cyan-500 to-blue-500" },
  { id: "number-ticker", name: "Number Ticker", icon: Icons.ChartIcon, color: "from-emerald-500 to-teal-600" },
  { id: "pulse-badge", name: "Pulse Badge", icon: Icons.CircleIcon, color: "from-red-500 to-pink-500" },
  { id: "floating-icon", name: "Floating Icon", icon: Icons.HeartIcon, color: "from-pink-500 to-rose-500" },
  { id: "wave-text", name: "Wave Text", icon: Icons.WavesIcon, color: "from-indigo-500 to-blue-600" },
  { id: "crystal-button", name: "Crystal Button", icon: Icons.SparklesIcon, color: "from-cyan-300 to-blue-400" },
  { id: "morphing-card", name: "Morphing Card", icon: Icons.ExpandIcon, color: "from-teal-500 to-cyan-500" },
  { id: "neon-text", name: "Neon Text", icon: Icons.ZapIcon, color: "from-pink-500 to-purple-500" },
  { id: "floating-button", name: "Floating Button", icon: Icons.MousePointerIcon, color: "from-blue-500 via-cyan-500 to-teal-500" }
]

const backgroundComponents = [
  // 25 componentes de fondos exactos del archivo fondos.tsx
  { id: "bg-dots", name: "Dots", icon: Icons.GridIcon, color: "from-slate-500 to-slate-600" },
  { id: "bg-grid", name: "Grid", icon: Icons.GridIcon, color: "from-zinc-500 to-zinc-600" },
  { id: "bg-lines", name: "Lines", icon: Icons.MinusIcon, color: "from-green-500 to-emerald-500" },
  { id: "bg-polka", name: "Polka Dots", icon: Icons.CircleIcon, color: "from-pink-500 to-rose-500" },
  { id: "bg-mesh", name: "Mesh", icon: Icons.GridIcon, color: "from-orange-500 to-red-500" },
  { id: "bg-aurora", name: "Aurora", icon: Icons.SparklesIcon, color: "from-purple-500 via-pink-500 to-blue-500" },
  { id: "bg-waves", name: "Waves", icon: Icons.WavesIcon, color: "from-teal-500 to-blue-500" },
  { id: "bg-stars", name: "Stars", icon: Icons.StarIcon, color: "from-purple-900 to-black" },
  { id: "bg-nebula", name: "Nebula", icon: Icons.SparklesIcon, color: "from-purple-600 to-pink-600" },
  { id: "bg-galaxy", name: "Galaxy", icon: Icons.SparklesIcon, color: "from-indigo-900 to-black" },
  { id: "bg-matrix", name: "Matrix", icon: Icons.GridIcon, color: "from-green-500 to-teal-500" },
  { id: "bg-circuit", name: "Circuit", icon: Icons.ZapIcon, color: "from-blue-400 to-indigo-400" },
  { id: "bg-glitch", name: "Glitch", icon: Icons.ZapIcon, color: "from-red-400 to-pink-400" },
  { id: "bg-particles", name: "Particles", icon: Icons.SparklesIcon, color: "from-blue-500 to-cyan-500" },
  { id: "bg-rain", name: "Rain", icon: Icons.MinusIcon, color: "from-gray-600 to-gray-800" },
  { id: "bg-hexagon", name: "Hexagon", icon: Icons.SquareIcon, color: "from-yellow-400 to-orange-500" },
  { id: "bg-circles", name: "Circles", icon: Icons.CircleIcon, color: "from-indigo-900 to-purple-400" },
  { id: "bg-gradient", name: "Gradient", icon: Icons.PaletteIcon, color: "from-pink-500 to-purple-500" },
  { id: "bg-plasma", name: "Plasma", icon: Icons.SparklesIcon, color: "from-pink-500 to-red-500" },
  { id: "bg-rainbow", name: "Rainbow", icon: Icons.PaletteIcon, color: "from-red-500 to-violet-500" },
  { id: "bg-ripple", name: "Ripple", icon: Icons.WavesIcon, color: "from-cyan-400 to-blue-600" },
  { id: "bg-matrix-rain", name: "Matrix Rain", icon: Icons.CodeIcon, color: "from-green-400 to-teal-500" },
  { id: "bg-cosmic-dust", name: "Cosmic Dust", icon: Icons.SparklesIcon, color: "from-purple-900 to-blue-900" },
  { id: "bg-chevron", name: "Chevron", icon: Icons.ChevronRightIcon, color: "from-purple-500 to-violet-500" },
  { id: "bg-zigzag", name: "Zigzag", icon: Icons.ZapIcon, color: "from-lime-500 to-green-500" }
]

const templateComponents = [
  // 25 componentes de templates exactos del archivo templates.tsx
  { id: "login-form", name: "Login", icon: Icons.UserIcon, color: "from-blue-600 to-purple-600" },
  { id: "signup-form", name: "Signup", icon: Icons.UserIcon, color: "from-purple-600 to-pink-600" },
  { id: "pricing-card", name: "Pricing", icon: Icons.CreditCardIcon, color: "from-green-600 to-teal-600" },
  { id: "profile-card", name: "Profile", icon: Icons.UserIcon, color: "from-blue-500 to-indigo-500" },
  { id: "stats-card", name: "Estadísticas", icon: Icons.ChartIcon, color: "from-blue-600 to-cyan-600" },
  { id: "navbar", name: "Navbar", icon: Icons.LayersIcon, color: "from-indigo-600 to-blue-600" },
  { id: "sidebar", name: "Sidebar", icon: Icons.SquareIcon, color: "from-purple-300 to-violet-300" },
  { id: "blog-card", name: "Blog", icon: Icons.FileTextIcon, color: "from-slate-600 to-gray-600" },
  { id: "product-card", name: "Product", icon: Icons.SquareIcon, color: "from-blue-600 to-indigo-600" },
  { id: "dashboard-widget", name: "Dashboard", icon: Icons.ChartIcon, color: "from-purple-200 to-violet-200" },
  { id: "contact-form", name: "Contacto", icon: Icons.MailIcon, color: "from-teal-600 to-cyan-600" },
  { id: "newsletter-signup", name: "Newsletter", icon: Icons.MailIcon, color: "from-pink-600 to-rose-600" },
  { id: "testimonial-card", name: "Testimonial", icon: Icons.StarIcon, color: "from-yellow-600 to-orange-600" },
  { id: "notification-toast", name: "Notification", icon: Icons.BellIcon, color: "from-green-200 to-emerald-200" },
  { id: "cart-item", name: "Cart Item", icon: Icons.SquareIcon, color: "from-orange-500 to-red-500" },
  { id: "hero-section", name: "Hero Section", icon: Icons.SquareIcon, color: "from-blue-600 to-purple-600" },
  { id: "feature-card", name: "Feature Card", icon: Icons.ZapIcon, color: "from-blue-100 to-indigo-200" },
  { id: "team-member", name: "Team Member", icon: Icons.UserIcon, color: "from-purple-500 to-pink-500" },
  { id: "metric-card", name: "Métrica", icon: Icons.ChartIcon, color: "from-orange-200 to-red-200" },
  { id: "chat-message", name: "Chat Message", icon: Icons.MessageCircleIcon, color: "from-blue-500 to-indigo-500" },
  { id: "social-post", name: "Social Post", icon: Icons.SquareIcon, color: "from-pink-300 to-purple-300" },
  { id: "progress-tracker", name: "Progress", icon: Icons.LoaderIcon, color: "from-blue-500 to-cyan-500" },
  { id: "comparison-table", name: "Comparación", icon: Icons.GridIcon, color: "from-violet-500 to-purple-500" },
  { id: "error-page", name: "Error Page", icon: Icons.AlertTriangleIcon, color: "from-red-500 to-pink-500" },
  { id: "loading-skeleton", name: "Loading", icon: Icons.LoaderIcon, color: "from-gray-400 to-slate-400" }
]

const effectsComponents = [
  // 25 componentes de efectos exactos del archivo efectos.tsx
  { id: "effect-glow", name: "Glow", icon: Icons.SparklesIcon, color: "from-yellow-400 to-orange-400" },
  { id: "effect-shimmer", name: "Shimmer", icon: Icons.ZapIcon, color: "from-blue-400 to-cyan-400" },
  { id: "effect-neon", name: "Neon", icon: Icons.ZapIcon, color: "from-pink-400 to-purple-400" },
  { id: "effect-ripple", name: "Ripple", icon: Icons.WavesIcon, color: "from-blue-400 to-indigo-400" },
  { id: "effect-glass", name: "Glass", icon: Icons.SquareIcon, color: "from-teal-400 to-cyan-400" },
  { id: "effect-crystal", name: "Crystal", icon: Icons.SparklesIcon, color: "from-cyan-300 to-blue-300" },
  { id: "effect-particle", name: "Particle", icon: Icons.SparklesIcon, color: "from-yellow-400 to-amber-400" },
  { id: "effect-stardust", name: "Stardust", icon: Icons.SparklesIcon, color: "from-yellow-200 to-amber-200" },
  { id: "effect-matrix", name: "Matrix", icon: Icons.GridIcon, color: "from-green-400 to-teal-400" },
  { id: "effect-glitch", name: "Glitch", icon: Icons.ZapIcon, color: "from-red-400 to-pink-400" },
  { id: "effect-lightning", name: "Lightning", icon: Icons.ZapIcon, color: "from-yellow-400 to-purple-400" },
  { id: "effect-3d", name: "3D Effect", icon: Icons.SquareIcon, color: "from-purple-600 to-pink-600" },
  { id: "effect-morph", name: "Morph", icon: Icons.SparklesIcon, color: "from-teal-400 to-green-400" },
  { id: "effect-wave", name: "Wave", icon: Icons.WavesIcon, color: "from-cyan-400 to-teal-400" },
  { id: "effect-distortion", name: "Distorsión", icon: Icons.WavesIcon, color: "from-pink-500 to-violet-500" },
  { id: "effect-fire", name: "Fire", icon: Icons.ZapIcon, color: "from-red-600 to-orange-500" },
  { id: "effect-magnetic", name: "Magnetic", icon: Icons.MagnetIcon, color: "from-purple-600 to-indigo-600" },
  { id: "effect-lightning-storm", name: "Lightning Storm", icon: Icons.ZapIcon, color: "from-yellow-500 to-purple-500" },
  { id: "effect-plasma-orb", name: "Plasma Orb", icon: Icons.SparklesIcon, color: "from-pink-500 to-purple-500" },
  { id: "effect-pulse", name: "Pulse", icon: Icons.CircleIcon, color: "from-red-400 to-pink-400" },
  { id: "effect-bounce", name: "Bounce", icon: Icons.MousePointerIcon, color: "from-green-400 to-emerald-400" },
  { id: "effect-rotate", name: "Rotate", icon: Icons.LoaderIcon, color: "from-purple-400 to-violet-400" },
  { id: "effect-scale", name: "Scale", icon: Icons.MousePointerIcon, color: "from-orange-400 to-red-400" },
  { id: "effect-slide", name: "Slide", icon: Icons.MoveIcon, color: "from-indigo-400 to-blue-400" },
  { id: "effect-fade", name: "Fade", icon: Icons.CircleIcon, color: "from-gray-400 to-zinc-400" }
]

interface FolderItem {
  id: string
  name: string
  components: string[]
  isOpen: boolean
}

export function Sidebar({ onAddComponent }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("basic")
  const [folders, setFolders] = useState<FolderItem[]>([{ id: "1", name: "Mi Proyecto", components: [], isOpen: true }])

  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(searchQuery.trim().toLowerCase()), 150)
    return () => clearTimeout(id)
  }, [searchQuery])

  const categories = [
    { id: "basic", label: "Básicos", components: basicComponents },
    { id: "magic", label: "Magic UI", components: magicUIComponents },
    { id: "backgrounds", label: "Fondos", components: backgroundComponents },
    { id: "templates", label: "Templates", components: templateComponents },
    { id: "effects", label: "Efectos", components: effectsComponents }
  ]

  const currentCategory = categories.find(cat => cat.id === activeCategory)

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

  const filteredComponents = useMemo(() => {
    const list = currentCategory?.components || []
    if (!debouncedQuery) return list
    return list.filter((comp) => comp.name.toLowerCase().includes(debouncedQuery))
  }, [currentCategory, debouncedQuery])

  const ComponentGrid = memo(({ components }: { components: any[] }) => (
    <div className="grid grid-cols-3 gap-2">
      {components.map((component) => {
        const isLongName = component.name.length > 8
        const isVeryLongName = component.name.length > 12
        
        return (
          <div key={component.id} className="group">
            <Tooltip>
              <TooltipTrigger asChild>
                <Card
                  className="relative p-2.5 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group border border-border/30 hover:border-border/60 bg-gradient-to-br from-background/80 to-muted/20 backdrop-blur-sm overflow-hidden"
                  onClick={() => onAddComponent(component.id)}
                >
                  {/* Fondo decorativo */}
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                    <div className={`w-full h-full bg-gradient-to-br ${component.color}`} />
                  </div>
                  
                  {/* Contenido */}
                  <div className="relative z-10 flex flex-col items-center space-y-2">
                    {/* Icono con contenedor mejorado */}
                    <div className="relative">
                      <div
                        className={`w-8 h-8 rounded-xl bg-gradient-to-br ${component.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200 ring-1 ring-white/20`}
                      >
                        <component.icon className="w-4 h-4 text-white drop-shadow-sm" />
                      </div>
                      {/* Glow effect */}
                      <div className={`absolute inset-0 w-8 h-8 rounded-xl bg-gradient-to-br ${component.color} opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-200`} />
                    </div>
                    
                    {/* Nombre con mejor tipografía */}
                    <div className="text-center w-full">
                      <p className={`font-semibold text-foreground leading-tight transition-colors group-hover:text-primary ${
                        isVeryLongName ? 'text-[8px]' : isLongName ? 'text-[9px]' : 'text-[10px]'
                      }`}>
                        {component.name}
                      </p>
                    </div>
                  </div>
                  
                  {/* Indicador de hover */}
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  
                  {/* Borde animado */}
                  <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-primary/20 transition-colors duration-200" />
                </Card>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs z-50">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded bg-gradient-to-br ${component.color} flex items-center justify-center`}>
                    <component.icon className="w-2.5 h-2.5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">{component.name}</p>
                    <p className="text-[10px] text-muted-foreground">Click para agregar al canvas</p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
        )
      })}
    </div>
  ))

  return (
    <TooltipProvider>
      <aside className="w-[312px] bg-background/95 backdrop-blur-sm border-r flex flex-col overflow-hidden">
        <div className="p-2 border-b">
          <h2 className="text-xs font-semibold text-foreground mb-2">Componentes</h2>

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

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Category Selector */}
          <div className="p-2 border-b">
            <Select value={activeCategory} onValueChange={setActiveCategory}>
              <SelectTrigger className="w-full h-8">
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-3">
            {activeCategory === "magic" && (
              <div className="mb-3 p-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Componentes con animaciones premium estilo Magic UI
                </p>
              </div>
            )}
            {activeCategory === "backgrounds" && (
              <div className="mb-3 p-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Fondos animados y patrones decorativos
                </p>
              </div>
            )}
            {activeCategory === "templates" && (
              <div className="mb-3 p-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Componentes completos listos para usar
                </p>
              </div>
            )}
            {activeCategory === "effects" && (
              <div className="mb-3 p-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/20">
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Arrastra efectos sobre componentes para aplicarlos
                </p>
              </div>
            )}
            
            <ComponentGrid components={useDeferredValue(filteredComponents)} />
          </div>
        </div>

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
