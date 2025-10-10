"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import * as Icons from "@/components/icons"

interface ShortcutsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const shortcuts = [
  {
    category: "General",
    items: [
      { keys: ["Ctrl", "S"], description: "Guardar proyecto" },
      { keys: ["Ctrl", "Z"], description: "Deshacer" },
      { keys: ["Ctrl", "Y"], description: "Rehacer" },
      { keys: ["Ctrl", "N"], description: "Nuevo proyecto" },
      { keys: ["Ctrl", "O"], description: "Abrir proyecto" },
    ],
  },
  {
    category: "Componentes",
    items: [
      { keys: ["Ctrl", "D"], description: "Duplicar componente seleccionado" },
      { keys: ["Del"], description: "Eliminar componente seleccionado" },
      { keys: ["Ctrl", "C"], description: "Copiar componente" },
      { keys: ["Ctrl", "V"], description: "Pegar componente" },
      { keys: ["Ctrl", "X"], description: "Cortar componente" },
    ],
  },
  {
    category: "Organización",
    items: [
      { keys: ["Ctrl", "G"], description: "Agrupar componentes" },
      { keys: ["Ctrl", "Shift", "G"], description: "Desagrupar componentes" },
      { keys: ["Ctrl", "L"], description: "Bloquear/Desbloquear componente" },
      { keys: ["Ctrl", "H"], description: "Mostrar/Ocultar componente" },
    ],
  },
  {
    category: "Vista",
    items: [
      { keys: ["Ctrl", "'"], description: "Toggle Grid" },
      { keys: ["Ctrl", "R"], description: "Toggle Reglas" },
      { keys: ["Ctrl", "+"], description: "Zoom in" },
      { keys: ["Ctrl", "-"], description: "Zoom out" },
      { keys: ["Ctrl", "0"], description: "Reset zoom (100%)" },
      { keys: ["Space"], description: "Pan (mantener presionado)" },
    ],
  },
  {
    category: "Navegación",
    items: [
      { keys: ["Tab"], description: "Seleccionar siguiente componente" },
      { keys: ["Shift", "Tab"], description: "Seleccionar componente anterior" },
      { keys: ["Esc"], description: "Deseleccionar componente" },
      { keys: ["↑", "↓", "←", "→"], description: "Mover componente seleccionado" },
    ],
  },
  {
    category: "Herramientas",
    items: [
      { keys: ["V"], description: "Herramienta de selección" },
      { keys: ["T"], description: "Herramienta de texto" },
      { keys: ["R"], description: "Herramienta de rectángulo" },
      { keys: ["O"], description: "Herramienta de círculo" },
      { keys: ["I"], description: "Herramienta de imagen" },
    ],
  },
]

export function ShortcutsModal({ open, onOpenChange }: ShortcutsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto glass-effect">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <Icons.KeyboardIcon className="w-5 h-5 text-white" />
            </div>
            Atajos de Teclado
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {shortcuts.map((section, sectionIndex) => (
            <div
              key={section.category}
              className="space-y-3 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${sectionIndex * 100}ms` }}
            >
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Icons.CommandIcon className="w-4 h-4 text-primary" />
                {section.category}
              </h3>

              <div className="space-y-2">
                {section.items.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group animate-in fade-in slide-in-from-left-2"
                    style={{ animationDelay: `${sectionIndex * 100 + index * 50}ms` }}
                  >
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {shortcut.description}
                    </span>

                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, keyIndex) => (
                        <div key={keyIndex} className="flex items-center gap-1">
                          <Badge
                            variant="outline"
                            className="px-2 py-1 text-xs font-mono bg-background shadow-sm border-2"
                          >
                            {key}
                          </Badge>
                          {keyIndex < shortcut.keys.length - 1 && (
                            <span className="text-xs text-muted-foreground">+</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-blue-500">Tip:</span> Presiona{" "}
            <Badge variant="outline" className="mx-1 px-2 py-0.5 text-xs font-mono">
              ?
            </Badge>{" "}
            en cualquier momento para ver esta lista de atajos.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
