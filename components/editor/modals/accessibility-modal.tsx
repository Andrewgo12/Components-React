"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertTriangle, Info } from "lucide-react"

interface AccessibilityModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AccessibilityModal({ open, onOpenChange }: AccessibilityModalProps) {
  const overallScore = 85
  const scoreGrade = "B+"

  const categories = [
    { name: "Contraste de Colores", score: 95, grade: "A", status: "success" },
    { name: "Navegación por Teclado", score: 78, grade: "B", status: "warning" },
    { name: "Etiquetas Alt", score: 100, grade: "A", status: "success" },
    { name: "Estructura Semántica", score: 72, grade: "B-", status: "warning" },
    { name: "Focus Indicators", score: 90, grade: "A", status: "success" },
  ]

  const issues = [
    { type: "warning", message: "Botón sin aria-label en línea 45" },
    { type: "warning", message: "Contraste insuficiente: #666 sobre #ccc (2.1:1)" },
    { type: "info", message: "Considerar agregar skip links" },
    { type: "info", message: "Mejorar orden de tabulación" },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-success" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-warning" />
      default:
        return <Info className="w-4 h-4 text-muted-foreground" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Checker de Accesibilidad WCAG</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Score general */}
          <div className="border rounded-lg p-6 bg-gradient-to-br from-primary/10 to-secondary/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold">Score General: {scoreGrade}</h3>
                <p className="text-sm text-muted-foreground">({overallScore}/100)</p>
              </div>
              <div className="w-20 h-20 rounded-full border-4 border-primary flex items-center justify-center">
                <span className="text-2xl font-bold">{scoreGrade}</span>
              </div>
            </div>
            <Progress value={overallScore} className="h-3" />
          </div>

          {/* Categorías */}
          <div>
            <h3 className="text-sm font-medium mb-3">Categorías Evaluadas:</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="border rounded-lg p-3 bg-muted/30 flex items-center justify-between animate-in fade-in slide-in-from-left"
                >
                  <div className="flex items-center gap-3 flex-1">
                    {getStatusIcon(category.status)}
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={category.score} className="w-32 h-2" />
                    <Badge variant="outline" className="w-12 justify-center">
                      {category.grade}
                    </Badge>
                    <span className="text-xs text-muted-foreground w-16 text-right">({category.score}/100)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Problemas detectados */}
          <div>
            <h3 className="text-sm font-medium mb-3">Problemas Detectados:</h3>
            <div className="border rounded-lg p-4 bg-muted/30 space-y-2">
              {issues.map((issue, index) => (
                <div key={index} className="flex items-start gap-2 text-sm animate-in fade-in slide-in-from-left">
                  {issue.type === "warning" ? (
                    <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                  ) : (
                    <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  )}
                  <span className="text-muted-foreground">{issue.message}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Acciones */}
          <div className="flex justify-end gap-2">
            <Button variant="outline">Exportar</Button>
            <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
