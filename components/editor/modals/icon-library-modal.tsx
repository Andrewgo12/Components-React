"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Home,
  User,
  Settings,
  Mail,
  Phone,
  Save,
  Search,
  Heart,
  Star,
  Folder,
  File,
  Edit,
  Trash2,
  Copy,
  Camera,
  Music,
  Video,
  ShoppingCart,
  CreditCard,
  FileText,
  Volume2,
  Monitor,
  Smartphone,
  Tablet,
  Watch,
  Printer,
  Download,
  Upload,
  Share2,
  Send,
  MessageSquare,
  MessageCircle,
  Users,
  UserPlus,
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Plus,
  Minus,
  X,
  Check,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Menu,
  Grid,
  List,
  Layout,
  Bookmark,
  Flag,
  Gift,
  Package,
  Truck,
  Leaf,
  TreePine,
  Flower,
  Sun,
  Moon,
  Cloud,
  CloudRain,
} from "lucide-react"
import { useState } from "react"

interface IconLibraryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const iconCategories = {
  UI: [
    { name: "Home", icon: Home },
    { name: "User", icon: User },
    { name: "Settings", icon: Settings },
    { name: "Search", icon: Search },
    { name: "Menu", icon: Menu },
    { name: "Grid", icon: Grid },
    { name: "List", icon: List },
    { name: "Layout", icon: Layout },
  ],
  Comunicación: [
    { name: "Mail", icon: Mail },
    { name: "Phone", icon: Phone },
    { name: "MessageSquare", icon: MessageSquare },
    { name: "MessageCircle", icon: MessageCircle },
    { name: "Send", icon: Send },
    { name: "Share2", icon: Share2 },
  ],
  Archivos: [
    { name: "Folder", icon: Folder },
    { name: "File", icon: File },
    { name: "FileText", icon: FileText },
    { name: "Save", icon: Save },
    { name: "Download", icon: Download },
    { name: "Upload", icon: Upload },
  ],
  Edición: [
    { name: "Edit", icon: Edit },
    { name: "Trash2", icon: Trash2 },
    { name: "Copy", icon: Copy },
    { name: "Plus", icon: Plus },
    { name: "Minus", icon: Minus },
    { name: "X", icon: X },
    { name: "Check", icon: Check },
  ],
  Flechas: [
    { name: "ArrowRight", icon: ArrowRight },
    { name: "ArrowLeft", icon: ArrowLeft },
    { name: "ArrowUp", icon: ArrowUp },
    { name: "ArrowDown", icon: ArrowDown },
    { name: "ChevronRight", icon: ChevronRight },
    { name: "ChevronLeft", icon: ChevronLeft },
    { name: "ChevronUp", icon: ChevronUp },
    { name: "ChevronDown", icon: ChevronDown },
  ],
  Media: [
    { name: "Camera", icon: Camera },
    { name: "Music", icon: Music },
    { name: "Video", icon: Video },
    { name: "Volume2", icon: Volume2 },
  ],
  Comercio: [
    { name: "ShoppingCart", icon: ShoppingCart },
    { name: "CreditCard", icon: CreditCard },
    { name: "Package", icon: Package },
    { name: "Truck", icon: Truck },
    { name: "Gift", icon: Gift },
  ],
  Social: [
    { name: "Heart", icon: Heart },
    { name: "Star", icon: Star },
    { name: "Users", icon: Users },
    { name: "UserPlus", icon: UserPlus },
    { name: "Bookmark", icon: Bookmark },
    { name: "Flag", icon: Flag },
  ],
  Dispositivos: [
    { name: "Monitor", icon: Monitor },
    { name: "Smartphone", icon: Smartphone },
    { name: "Tablet", icon: Tablet },
    { name: "Watch", icon: Watch },
    { name: "Printer", icon: Printer },
  ],
  Alertas: [
    { name: "AlertCircle", icon: AlertCircle },
    { name: "AlertTriangle", icon: AlertTriangle },
    { name: "Info", icon: Info },
    { name: "CheckCircle", icon: CheckCircle },
    { name: "XCircle", icon: XCircle },
  ],
  Naturaleza: [
    { name: "Sun", icon: Sun },
    { name: "Moon", icon: Moon },
    { name: "Cloud", icon: Cloud },
    { name: "CloudRain", icon: CloudRain },
    { name: "Leaf", icon: Leaf },
    { name: "TreePine", icon: TreePine },
    { name: "Flower", icon: Flower },
  ],
}

export function IconLibraryModal({ open, onOpenChange }: IconLibraryModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos")
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [iconSize, setIconSize] = useState(24)

  const allIcons = Object.values(iconCategories).flat()
  const filteredIcons =
    selectedCategory === "Todos" ? allIcons : iconCategories[selectedCategory as keyof typeof iconCategories] || []

  const searchedIcons = filteredIcons.filter((icon) => icon.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Librería de Iconos ({allIcons.length}+ iconos)</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Búsqueda */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar iconos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Categorías */}
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedCategory === "Todos" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory("Todos")}
            >
              Todos
            </Badge>
            {Object.keys(iconCategories).map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Grid de iconos */}
          <ScrollArea className="h-[400px] border rounded-lg p-4">
            <div className="grid grid-cols-8 gap-3">
              {searchedIcons.map((icon) => {
                const IconComponent = icon.icon
                return (
                  <button
                    key={icon.name}
                    onClick={() => setSelectedIcon(icon.name)}
                    className={`p-3 rounded-lg border-2 transition-all hover:scale-110 hover:shadow-lg animate-in fade-in zoom-in ${
                      selectedIcon === icon.name
                        ? "border-primary bg-primary/10"
                        : "border-transparent hover:border-border"
                    }`}
                    title={icon.name}
                  >
                    <IconComponent className="w-6 h-6 mx-auto" />
                  </button>
                )
              })}
            </div>
          </ScrollArea>

          {/* Configuración del icono seleccionado */}
          {selectedIcon && (
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Icono seleccionado: {selectedIcon}</p>
                  <div className="flex gap-2 mt-2">
                    {[16, 20, 24, 32].map((size) => (
                      <Button
                        key={size}
                        variant={iconSize === size ? "default" : "outline"}
                        size="sm"
                        onClick={() => setIconSize(size)}
                      >
                        {size}px
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => onOpenChange(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => onOpenChange(false)}>Aplicar</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
