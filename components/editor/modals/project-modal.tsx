"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { useState } from "react"

interface ProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectModal({ open, onOpenChange }: ProjectModalProps) {
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Gestión de Proyectos</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Acciones */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo
            </Button>
            <Button variant="outline" size="sm">
              Guardar
            </Button>
            <Button variant="outline" size="sm">
              Cargar
            </Button>
            <Button variant="outline" size="sm">
              Importar
            </Button>
            <Button variant="outline" size="sm">
              Exportar
            </Button>
          </div>

          {/* Proyectos guardados */}
          <div>
            <h3 className="text-sm font-medium mb-3">Proyectos Guardados</h3>
            <div className="border rounded-lg p-4 bg-muted/50">
              <p className="text-sm text-muted-foreground text-center">No hay proyectos guardados</p>
            </div>
          </div>

          {/* Crear nuevo proyecto */}
          <div>
            <h3 className="text-sm font-medium mb-3">Crear Nuevo Proyecto</h3>
            <div className="space-y-3">
              <div>
                <Label className="text-xs">Nombre</Label>
                <Input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Mi Proyecto"
                  className="h-9"
                />
              </div>
              <div>
                <Label className="text-xs">Descripción</Label>
                <Input
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Descripción del proyecto"
                  className="h-9"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancelar
                </Button>
                <Button>Crear</Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
